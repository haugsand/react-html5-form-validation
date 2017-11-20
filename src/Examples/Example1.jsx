import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example1 extends Component {

    fields = {
        fieldName: '', 
        fieldDescription: ''
    };

    submitForm = data => {
        alert(JSON.stringify(data, null, 4));
    };

    render() {
        return (
            <FormValidated fields={this.fields} onSubmit={this.submitForm}>
                <fieldset id="example1">

                    <div className="field">
                        <label htmlFor="fieldName">Navn</label>
                        <input
                            id="fieldName"
                            type="text"
                            minLength="3"
                            required
                        />
                        <p data-errorfor="fieldName" className="field__errormessage" />
                    </div>

                    <div className="field">
                        <label htmlFor="fieldDescription">
                            Beskrivelse (frivillig)
                        </label>
                        <input id="fieldDescription" type="text" />
                        <p data-errorfor="fieldDescription" className="field__errormessage" />
                    </div>

                    <input type="submit" value="Submit" />

                </fieldset>
            </FormValidated>
        );
    }
}

export default Example1;
