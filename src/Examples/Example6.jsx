import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example6 extends Component {

    fieldList = [
        "fieldPassword1", 
        "fieldPassword2"
    ];

    submitForm = data => {
        alert(JSON.stringify(data, null, 4));
    };

    render() {
        return (
            <FormValidated fieldList={this.fieldList} onSubmit={this.submitForm} >
                <fieldset>

                    <div className="field">
                        <label htmlFor="fieldPassword1">Nytt passord</label>
                        <input
                            id="fieldPassword1"
                            type="password"
                            minLength="8"
                            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                            title="Passordet må inneholde minst en liten bokstav, en stor bokstav og et tall."
                            required
                        />
                        <p data-errorfor="fieldPassword1" className="field__errormessage" />
                    </div>

                    <div className="field">
                        <label htmlFor="fieldPassword2">Gjenta passord</label>
                        <input
                            id="fieldPassword2"
                            type="password"
                            data-constraint-pattern="fieldPassword1"
                            required
                            title="Passordene må være like."
                        />
                        <p data-errorfor="fieldPassword2" className="field__errormessage" />
                    </div>

                    <input type="submit" value="Submit" />

                </fieldset>
            </FormValidated>
        );
    }
}

export default Example6;
