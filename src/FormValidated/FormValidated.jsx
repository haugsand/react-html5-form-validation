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
function elementIsErrorMessage(element) { return element.props["data-errorfor"]; }
function elementHasChildren(element) { return element.props.children; }
function childIsNotAnElement(child) { if (child === null || !child.props) { return true; } }



function getInitialState(fieldList, initialValues) {
    let initialState = {
        fields: {}
    };

    fieldList.forEach(field => {
        initialState.fields[field] = {
            value: "",
            errorMessage: false,
            valid: true
        };
    });

    Object.keys(initialValues).forEach(key => {
        initialState.fields[key].value = initialValues[key];
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
                fields: { [fieldId]: { $merge: newState }} 
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
            Object.keys(this.state.fields).forEach(key => {
                values[key] = this.state.fields[key].value;
            });
            this.props.onSubmit(values);
        }
    };

    handleInputChange = e => {
        const field = e.target;
        this.updateField(field.id, {value: field.value});
        if (!this.state.fields[field.id].valid) {
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
        addOnChange(field.name, field, this.props.onChange);
    };

    handleCheckboxChange = e => {
        const field = e.target;
        this.updateField(field.id, {value: field.checked});
        this.validateField(field.id, field);
        addOnChange(field.id, field, this.props.onChange);
    };


    getConstraints = props => {
        const constraintsAttr = Object.keys(props)
            .filter(attr => attr.indexOf("data-constraint") === 0)
            .map(attr => attr.slice(16));

        let constraints = {};
        constraintsAttr.forEach(attr => {
            constraints[attr] = this.state.fields[
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

                // TODO: Legg til støtte for input-felter som ikke er i fieldList

                if (["radio"].indexOf(child.props.type) > -1) {
                    const fieldId = child.props.name;

                    const props = {
                        checked: this.state.fields[fieldId].value === child.props.value,
                        onChange: this.handleRadioChange
                    };

                    if (child.props.required) {
                        props.ref = fieldId;
                        props["aria-invalid"] = !this.state.fields[fieldId].valid;
                        props["aria-errormessage"] = fieldId + "-errormessage";
                    }

                    return React.cloneElement(child, props);
                } 

                if (["checkbox"].indexOf(child.props.type) > -1) {
                    const fieldId = child.props.id;

                    const props = {
                        checked: this.state.fields[fieldId].value === true,
                        onChange: this.handleCheckboxChange,
                        ref: fieldId,
                        "aria-invalid": !this.state.fields[fieldId].valid,
                        "aria-errormessage": fieldId + "-errormessage"
                    };

                    return React.cloneElement(child, props);
                } 

                const constraints = this.getConstraints(child.props);
                const fieldId = child.props.id;

                const props = {
                    ref: fieldId,
                    onChange: this.handleInputChange,
                    onBlur: this.handleInputBlur,
                    value: this.state.fields[fieldId].value,
                    "aria-invalid": !this.state.fields[fieldId].valid,
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
                return React.cloneElement(child, props, this.state.fields[fieldId].errorMessage);
            } 

            if (elementHasChildren(child)) { 
                const grandChildren = this.addPropsToChildren(child.props.children);
                return React.cloneElement(child, {}, grandChildren);
            }

            return React.cloneElement(child, {});
        });

        return childrenWithProps;
    };


    componentWillReceiveProps(nextProps) {

        // TODO: Mulig optimaliseringP Kontroller gamle mot nye props.

        let newState = getInitialState(nextProps.fieldList, nextProps.initialValues) 

        this.setState(prevState => {

            Object.keys(newState.fields).forEach(key => {
                if (prevState.fields[key]) {
                    newState.fields[key] = prevState.fields[key]
                }
            });

            return update(prevState, {
                fields: { $set: newState.fields }
            });
        });
    }


    render() {

        // TODO: Nå rendres hele skjemaet på nytt for hver endring i state. 
        // Kan dette optimaliseres?
        // State må endres pga. constraints
        // console.log('Remnder: ' + Date.now());
        // Kan flytte addPropsToChildren til ComponentWillMount. Referer til funksjon som henter state, 
        // i stedet for å hente verdien.


        return (
            <form onSubmit={this.handleSubmit} noValidate>
                {this.addPropsToChildren(this.props.children)}
            </form>
        );
    }
}

export default FormValidated;
