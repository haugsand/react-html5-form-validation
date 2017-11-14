
const e = {
    BAD_INPUT: 'Oppgi et gyldig tall.',
    FALLBACK_MESSAGE: 'Oppgi en gyldig verdi.',
    PATTERN_MISMATCH: 'Oppgi en verdi som passer det etterspurte mønsteret.',
    RANGE_OVERFLOW: max => `Oppgi et tall som er ${max} eller mindre.`,
    RANGE_UNDERFLOW: min => `Oppgi et tall som er ${min} eller større.`,
    STEP_MISMATCH: step => `Oppgi et tall som er delelig med ${step}.`,
    TOO_LONG: (maxLength, length) => `Verdien må ha maksimum ${maxLength} tegn. Den har nå ${length} tegn.`,
    TOO_SHORT: (minLength, length) => `Verdien må ha minst ${minLength} tegn. Den har nå ${length} tegn.`,
    TYPE_MISMATCH_EMAIL: 'Oppgi en gyldig e-postadresse.',
    TYPE_MISMATCH_URL: 'Oppgi en gyldig URL.',
    VALUE_MISSING: 'Dette feltet må fylles ut.'
}

export default e;