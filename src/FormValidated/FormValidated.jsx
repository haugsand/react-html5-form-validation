import React, { Component } from "react";
import update from "immutability-helper";

import {
    initFieldsDefaultState,
    getValidatedState,
    validateForm
} from "./validation";

class FormValidated extends Component {
    state = initFieldsDefaultState(this.props.fieldList);

    updateField = (fieldId, newState) => {
        this.setState(prevState =>
            update(prevState, {
                [fieldId]: { $merge: newState }
            })
        );
    };

    handleSubmit = e => {
        e.preventDefault();

        const fields = this.props.fieldList.map(fieldId => this.refs[fieldId]);
        const { isValid, newState } = validateForm(fields);

        Object.keys(newState).forEach(fieldId => {
            this.updateField(fieldId, newState[fieldId]);
        });

        if (isValid) {
            let values = {};
            Object.keys(this.state).forEach(key => {
                values[key] = this.state[key].value;
            });
            this.props.onSubmit(values);
        }
    };

    handleInputChange = e => {
        const field = e.target;

        if (this.state[field.id].valid) {
            this.updateField(field.id, {
                value: field.value
            });
        } else {
            this.updateField(field.id, getValidatedState(field));
        }
    };

    handleInputBlur = e => {
        const field = e.target;
        this.updateField(field.id, getValidatedState(field));

        if (this.props.onBlur && this.props.onBlur[field.id]) {
            this.props.onBlur[field.id](field);
        }
    };

    getConstraints = props => {
        const constraintsAttr = Object.keys(props)
            .filter(attr => attr.indexOf("data-constraint") === 0)
            .map(attr => attr.slice(16));

        let constraints = {};
        constraintsAttr.forEach(attr => {
            constraints[attr] = this.state[
                props["data-constraint-" + attr]
            ].value;
        });

        return constraints;
    };

    addPropsToChildren = children => {
        const childrenWithProps = React.Children.map(children, child => {
            if (child.type === "input" && child.props.type !== "submit") {
                const constraints = this.getConstraints(child.props);
                const fieldId = child.props.id;

                let fieldClassNames = this.state[fieldId].valid
                    ? "field--valid"
                    : "field--invalid";
                if (child.props.className) {
                    fieldClassNames += " " + child.props.className;
                }

                return React.cloneElement(child, {
                    ref: fieldId,
                    className: fieldClassNames,
                    onChange: this.handleInputChange,
                    onBlur: this.handleInputBlur,
                    value: this.state[fieldId].value,
                    "aria-invalid": !this.state[fieldId].valid,
                    "aria-errormessage": fieldId + "-errormessage",
                    ...constraints
                });
            } else if (child.props && child.props["data-errorfor"]) {
                const fieldId = child.props["data-errorfor"];
                return React.cloneElement(
                    child,
                    {
                        id: fieldId + "-errormessage",
                        role: "alert"
                    },
                    this.state[fieldId].errorMessage
                );
            } else {
                if (
                    child.props.children &&
                    typeof child.props.children !== "string"
                ) {
                    const grandChildren = this.addPropsToChildren(
                        child.props.children
                    );
                    return React.cloneElement(child, {}, grandChildren);
                } else {
                    return React.cloneElement(child, {});
                }
            }
        });

        return childrenWithProps;
    };

    render() {

        // TODO: Hva med felter som må valideres mot en ekstern tjeneste?
        //      data-constraint-function={this.external}? Som gir true eller false?
        //      Gjøres uten før komponenten, men fyller inn en input hidden?
        //      .setCustomValidity()
        // 
        //  Hva med en typehead?
        //  Hva med felter som åpnes når andre felter er åpne?
        //  Positive meldinger om felter er valid? 
        //  Skille mellom untouched og valid - Legg til "touched"


        return (
            <form onSubmit={this.handleSubmit} noValidate>
                {this.addPropsToChildren(this.props.children)}
            </form>
        );
    }
}

export default FormValidated;
