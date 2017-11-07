import React, { Component } from "react";
import update from "immutability-helper";

import {
    initFieldsDefaultState,
    getValidatedState
} from "./validation";


function elementIsAField(element) {
    const fieldElements = [
        "input", 
        "select", 
        "textarea"
    ];
    return fieldElements.indexOf(element) > -1;
}

function inputTypeIsUnsupported(type) {
    const unSupportedInputTypes = [
        "button", 
        "hidden", 
        "image", 
        "reset", 
        "submit"
    ];
    return unSupportedInputTypes.indexOf(type) > -1;
}

function childIsNotAnElement(child) {
    return !child.props;
}

function elementIsErrorMessage(element) {
    return element.props["data-errorfor"];
}

function elementHasChildren(element) {
    return element.props.children;
}


class FormValidated extends Component {
    state = initFieldsDefaultState(this.props.fieldList);

    updateField = (fieldId, newState) => {
        this.setState(prevState =>
            update(prevState, {
                [fieldId]: { $merge: newState }
            })
        );
    };

    validateField = (fieldId, field) => {
        // .setCustomValidity()
        this.updateField(fieldId, getValidatedState(field));
    };

    handleSubmit = e => {
        e.preventDefault();



        let isValid = true;

        this.props.fieldList.forEach(fieldId => {
            if (this.refs[fieldId]) {
                const field = this.refs[fieldId];

                if (!field.validity.valid) {
                    isValid = false;
                }

                this.validateField(fieldId, field);
            }
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
            this.updateField(field.id, {value: field.value});
        } else {
            this.updateField(field.id, {value: field.value});
            this.validateField(field.id, field);
        }

        if (this.props.onChange && this.props.onChange[field.id]) {
            this.props.onChange[field.id](field);
        }
    };

    handleInputBlur = e => {
        const field = e.target;
        this.validateField(field.id, field);

        if (this.props.onBlur && this.props.onBlur[field.id]) {
            this.props.onBlur[field.id](field);
        }
    };

    handleRadioChange = e => {
        const field = e.target;
        this.updateField(field.name, {value: field.value});
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

            if (childIsNotAnElement(child)) {
                return child;
            }

            if (elementIsAField(child.type)) {

                if (inputTypeIsUnsupported(child.props.type)) {
                    return React.cloneElement(child, {});
                }

                if (["radio"].indexOf(child.props.type) > -1) {
                    const fieldId = child.props.name;

                    const props = {
                        checked: this.state[fieldId].value === child.props.value,
                        onChange: this.handleRadioChange
                    };

                    if (child.props.required) {
                        props.ref = fieldId;
                        props["aria-invalid"] = !this.state[fieldId].valid;
                        props["aria-errormessage"] = fieldId + "-errormessage";
                    }

                    return React.cloneElement(child, props);
                } 

                const constraints = this.getConstraints(child.props);
                const fieldId = child.props.id;

                let fieldClassNames = this.state[fieldId].valid
                    ? "field--valid"
                    : "field--invalid";
                if (child.props.className) {
                    fieldClassNames += " " + child.props.className;
                }

                const props = {
                    ref: fieldId,
                    className: fieldClassNames,
                    onChange: this.handleInputChange,
                    onBlur: this.handleInputBlur,
                    value: this.state[fieldId].value,
                    "aria-invalid": !this.state[fieldId].valid,
                    "aria-errormessage": fieldId + "-errormessage",
                    ...constraints
                };

                return React.cloneElement(child, props);

            } 

            if (elementIsErrorMessage(child)) {
                const fieldId = child.props["data-errorfor"];
                const props = {
                    id: fieldId + "-errormessage",
                    role: "alert"
                };
                return React.cloneElement(child, props, this.state[fieldId].errorMessage);
            } 

            if (elementHasChildren(child)) { 
                const grandChildren = this.addPropsToChildren(child.props.children);
                return React.cloneElement(child, {}, grandChildren);
            }

            return React.cloneElement(child, {});
        });

        return childrenWithProps;
    };

    render() {

        return (
            <form onSubmit={this.handleSubmit} noValidate>
                {this.addPropsToChildren(this.props.children)}
            </form>
        );
    }
}

export default FormValidated;
