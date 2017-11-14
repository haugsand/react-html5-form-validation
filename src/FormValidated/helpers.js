export function getInitialState(fieldList, initialValues) {
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

export function addCustomValidation(fieldId, field, customValidation) {
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


export function addOnBlur(fieldId, field, onBlur) {
    if (onBlur[fieldId]) {
        onBlur[fieldId](field);
    }
}

export function addOnChange(fieldId, field, onChange) {
    if (onChange[fieldId]) {
        onChange[fieldId](field);
    }
}
