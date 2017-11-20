export function getInitialState(fields) {
    let initialState = {
        fields: {}
    };

    Object.keys(fields).forEach(fieldId => {
        initialState.fields[fieldId] = {
            value: fields[fieldId],
            errorMessage: false,
            valid: true
        };
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
