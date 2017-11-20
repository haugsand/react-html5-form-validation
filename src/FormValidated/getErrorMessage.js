import e from "./errorMessages.no";

export default function getErrorMessage(field) {
    var validity = field.validity;

    if (validity.valid) {
        return "";
    }

    // <input required>: input == null
    if (validity.valueMissing) {
        return e.VALUE_MISSING;
    }

    // field.setCustomValidity(validationMessage)
    if (validity.customError) {
        return field.validationMessage;
    }

    if (validity.typeMismatch) {
        // <input type="email">: value not an email
        if (field.type === "email") {
            return e.TYPE_MISMATCH_EMAIL;
        }

        // <input type="url">: value not an url
        if (field.type === "url") {
            return e.TYPE_MISMATCH_URL;
        }
    }

    // <input minlength="10">: value.length < 10
    if (validity.tooShort) {
        return e.TOO_SHORT(field.getAttribute("minLength"), field.value.length);
    }

    // <input maxlength="19": value.length > 19
    if (validity.tooLong) {
        return e.TOO_LONG(field.getAttribute("maxLength"), field.value.length);
    }

    // <input type="number">: value not a number
    if (validity.badInput) {
        return e.BAD_INPUT;
    }

    // <input step="0.01">: value % 0.01 != 0
    if (validity.stepMismatch) {
        return e.STEP_MISMATCH(field.getAttribute("step"));
    }

    // <input max="10">: value > 10
    if (validity.rangeOverflow) {
        return e.RANGE_OVERFLOW(field.getAttribute("max"));
    }

    // <inout min="10">: value < 10
    if (validity.rangeUnderflow) {
        return e.RANGE_UNDERFLOW(field.getAttribute("min"));
    }

    // <input pattern="x">: value != x
    if (validity.patternMismatch) {
        // <input pattern="x" title="y">
        if (field.hasAttribute("title")) {
            return field.getAttribute("title");
        }

        return e.PATTERN_MISMATCH;
    }

    return e.FALLBACK_MESSAGE;
}
