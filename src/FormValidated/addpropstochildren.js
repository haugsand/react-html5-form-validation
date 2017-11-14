import { Children, cloneElement } from "react";

const fieldElements = [
    "input", 
    "select", 
    "textarea"
];

const unSupportedInputTypes = [
    "button", 
    "color",
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




function getConstraints(props, state) {
    const constraintsAttr = Object.keys(props)
        .filter(attr => attr.indexOf("data-constraint") === 0)
        .map(attr => attr.slice(16));

    let constraints = {};
    constraintsAttr.forEach(attr => {
        constraints[attr] = state[
            props["data-constraint-" + attr]
        ].value;
    });

    return constraints;
};



export function addPropsToChildren(children, state, handles) {



    //console.log(Object.keys(state));

    return Children.map(children, child => {


        // TODO: Skriv om. "return child" skal ikke gjentas.

        if (childIsNotAnElement(child)) {
            return child;
        }



        //console.log(child.props.name);
        //console.log(child.props.id);

        // TODO: Legg til støtte for input-felter som ikke er i fieldList
        //       if(elementIsInFieldList)


        if (elementIsAField(child.type)) {

            if (inputTypeIsUnsupported(child.props.type)) {
                return child;
            }


            if (["radio"].indexOf(child.props.type) > -1) {
                const fieldId = child.props.name;

                const props = {
                    checked: state[fieldId].value === child.props.value,
                    onChange: handles.radioChange
                };

                if (child.props.required) {
                    props.ref = fieldId;
                    props["aria-invalid"] = !state[fieldId].valid;
                    props["aria-errormessage"] = fieldId + "-errormessage";
                }

                return cloneElement(child, props);
            } 

            if (["checkbox"].indexOf(child.props.type) > -1) {
                const fieldId = child.props.id;

                const props = {
                    checked: state[fieldId].value === true,
                    onChange: handles.checkboxChange,
                    ref: fieldId,
                    "aria-invalid": !state[fieldId].valid,
                    "aria-errormessage": fieldId + "-errormessage"
                };

                return cloneElement(child, props);
            } 

            const constraints = getConstraints(child.props, state);
            const fieldId = child.props.id;

            const props = {
                ref: fieldId,
                onChange: handles.inputChange,
                onBlur: handles.inputBlur,
                value: state[fieldId].value,
                "aria-invalid": !state[fieldId].valid,
                "aria-errormessage": fieldId + "-errormessage",
                ...constraints
            };

            return cloneElement(child, props);

        } 

        if (elementIsErrorMessage(child)) {
            const fieldId = child.props["data-errorfor"];
            const props = {
                id: fieldId + "-errormessage",
                role: "alert"
            };
            return cloneElement(child, props, state[fieldId].errorMessage);
        } 

        if (elementHasChildren(child)) { 
            const grandChildren = addPropsToChildren(child.props.children, state, handles);
            return cloneElement(child, {}, grandChildren);
        }

        return child;
    });

};
