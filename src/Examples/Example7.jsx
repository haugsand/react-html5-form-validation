import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example7 extends Component {

    fields = {
        fieldUsername: ''
    };

    submitForm = data => {
        alert(JSON.stringify(data, null, 4));
    };

    checkValidity = value => {
        return new Promise((resolve, reject) => {
            let errorMessage = '';
            if (value.toLowerCase() === 'magnus') {
                errorMessage = 'The username "' + value + '" is not available.';
            }
            resolve(errorMessage);
        });
    };

    customValidation = {
        fieldUsername: this.checkValidity
    };

    render() {
        return (
            <FormValidated 
                fields={this.fields} 
                onSubmit={this.submitForm} 
                customValidation={this.customValidation} 
            >
                <fieldset>

                    <div className="field">
                        <label htmlFor="fieldUsername">Brukernavn</label>
                        <input
                            id="fieldUsername"
                            type="text"
                            required
                        />
                        <p data-errorfor="fieldUsername" className="field__errormessage" />
                    </div>

                    <input type="submit" value="Submit" />

                </fieldset>
            </FormValidated>
        );
    }
}

export default Example7;
