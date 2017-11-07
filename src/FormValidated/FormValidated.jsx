import React, { Component } from "react";
import { array, func, object } from 'prop-types';
import update from "immutability-helper";

import { getErrorMessage } from "./validation";






const fieldElements = [
    "input", 
    "select", 
    "textarea"
];

const unSupportedInputTypes = [
    "button", 
    "hidden", 
    "image", 
    "reset", 
    "submit"
];

function elementIsAField(element) { return fieldElements.indexOf(element) > -1; }
function inputTypeIsUnsupported(type) { return unSupportedInputTypes.indexOf(type) > -1; }
function childIsNotAnElement(child) { return !child.props; }
function elementIsErrorMessage(element) { return element.props["data-errorfor"]; }
function elementHasChildren(element) { return element.props.children; }







function getInitialState(fieldList, initialValues) {
    let initialState = {};

    fieldList.forEach(field => {
        initialState[field] = {
            value: "",
            errorMessage: false,
            valid: true
        };
    });

    Object.keys(initialValues).forEach(key => {
        initialState[key].value = initialValues[key];
    });

    return initialState;
}

function addCustomValidation(fieldId, field, customValidation) {
    return new Promise((resolve, reject) => {
        if (customValidation[fieldId]) {
            customValidation[fieldId](field.value)
                .then(errorMessage => {
                    field.setCustomValidity(errorMessage);
                    resolve(field);
                })
        } else {
            resolve(field);
        }
    });
}


function addOnBlur(fieldId, field, onBlur) {
    if (onBlur[fieldId]) {
        onBlur[fieldId](field);
    }
}

function addOnChange(fieldId, field, onChange) {
    if (onChange[fieldId]) {
        onChange[fieldId](field);
    }
}






class FormValidated extends Component {

    state = getInitialState(this.props.fieldList, this.props.initialValues);

    static propTypes = {
        fieldList: array.isRequired,
        onSubmit: func.isRequired,
        onBlur: object,
        onChange: object,
        initialValues: object,
        customValidation: object
    };

    static defaultProps = {
        onBlur: {},
        onChange: {},
        initialValues: {},
        customValidation: {}
    };

    updateField = (fieldId, newState) => {
        this.setState(prevState =>
            update(prevState, {
                [fieldId]: { $merge: newState }
            })
        );
    };

    validateField = (fieldId, field) => {
        addCustomValidation(fieldId, field, this.props.customValidation)
            .then(field => {
                this.updateField(fieldId, {
                    valid: field.validity.valid,
                    errorMessage: getErrorMessage(field)
                });
            })
    };

    handleSubmit = e => {
        e.preventDefault();

        let isValid = true;

        this.props.fieldList.forEach(fieldId => {
            if (this.refs[fieldId]) {
                const field = this.refs[fieldId];

                // TODO: Tar ikke hensyn til customValidation
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
        this.updateField(field.id, {value: field.value});
        if (!this.state[field.id].valid) {
            this.validateField(field.id, field);
        }
        addOnChange(field.id, field, this.props.onChange);
    };

    handleInputBlur = e => {
        const field = e.target;
        this.validateField(field.id, field);
        addOnBlur(field.id, field, this.props.onBlur);
    };

    handleRadioChange = e => {
        const field = e.target;
        this.updateField(field.name, {value: field.value});
    };

    handleCheckboxChange = e => {
        const field = e.target;
        this.updateField(field.id, {value: field.checked});
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

                if (["checkbox"].indexOf(child.props.type) > -1) {
                    const fieldId = child.props.id;

                    const props = {
                        checked: this.state[fieldId].value === true,
                        onChange: this.handleCheckboxChange,
                        "aria-invalid": !this.state[fieldId].valid,
                        "aria-errormessage": fieldId + "-errormessage"
                    };

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

        // TODO: Nå rendres hele skjemaet på nytt for hver endring i state. 
        // Kan dette optimaliseres?
        // console.log('Remder: ' + Date.now());

        return (
            <form onSubmit={this.handleSubmit} noValidate>
                {this.addPropsToChildren(this.props.children)}
            </form>
        );
    }
}

export default FormValidated;
