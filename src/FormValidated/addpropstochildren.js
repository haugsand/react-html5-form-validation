import { Children, cloneElement } from "react";


// TODO: Add file


const TEXT_FIELDS = [
    "date",
    "datetime-local",
    "email",
    "month",
    "number",
    "password",
    "search",
    "tel",
    "text",
    "time",
    "url",
    "week",
    "textarea"
];


function elementIsTextField(element) {
    return TEXT_FIELDS.indexOf(element.props.type) > -1;
}

function elementIsRadioField(element) {
    return element.props.type === 'radio';
}

function elementIsCheckboxField(element) {
    return element.props.type === 'checkbox';
}

function elementIsSelectField(element) {
    return element.type === 'select';
}

function elementIsColorField(element) {
    return element.props.type === 'color';
}

function elementHasChildren(element) { 
    return element && element.props && element.props.children;
}

function elementIsErrorMessage(element) { 
    return element && element.props && element.props["data-errorfor"];
}

function elementIsInFieldList(element, state) {
    if (element && element.props) {
        const fieldList = Object.keys(state);
        if (fieldList.indexOf(element.props.id) > -1 || fieldList.indexOf(element.props.name) > -1) {
            return true;
        }
    }
    return false;
}





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


    return Children.map(children, child => {


        if (elementIsInFieldList(child, state)) {

            if (elementIsRadioField(child)) {
                const constraints = getConstraints(child.props, state);
                const fieldId = child.props.name;

                const props = {
                    checked: state[fieldId].value === child.props.value,
                    onChange: handles.radioChange,
                    ...constraints
                };

                if (child.props.required) {
                    props["aria-invalid"] = !state[fieldId].valid;
                    props["aria-errormessage"] = fieldId + "-errormessage";
                }

                return cloneElement(child, props);
            } 

            if (elementIsCheckboxField(child)) {
                const constraints = getConstraints(child.props, state);
                const fieldId = child.props.id;

                const props = {
                    checked: state[fieldId].value === true,
                    onChange: handles.checkboxChange,
                    "aria-invalid": !state[fieldId].valid,
                    "aria-errormessage": fieldId + "-errormessage",
                    ...constraints
                };

                return cloneElement(child, props);
            } 

            if (elementIsSelectField(child)) {
                const constraints = getConstraints(child.props, state);
                const fieldId = child.props.id;

                const props = {
                    onChange: handles.selectChange,
                    value: state[fieldId].value,
                    "aria-invalid": !state[fieldId].valid,
                    "aria-errormessage": fieldId + "-errormessage",
                    ...constraints
                };
                return cloneElement(child, props);
            }

            if (elementIsColorField(child)) {
                const constraints = getConstraints(child.props, state);
                const fieldId = child.props.id;

                const props = {
                    onChange: handles.colorChange,
                    value: state[fieldId].value,
                    ...constraints
                };
                return cloneElement(child, props);
            }

            if (elementIsTextField(child)) {
                const constraints = getConstraints(child.props, state);
                const fieldId = child.props.id;

                const props = {
                    onChange: handles.inputChange,
                    onBlur: handles.inputBlur,
                    value: state[fieldId].value,
                    "aria-invalid": !state[fieldId].valid,
                    "aria-errormessage": fieldId + "-errormessage",
                    ...constraints
                };
                return cloneElement(child, props);
            }
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
