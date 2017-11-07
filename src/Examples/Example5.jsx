import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example5 extends Component {

    fieldList = [
        "fieldNorwegian",
        "fieldEnglish",
        "fieldGerman",
        "fieldFrench"
    ];

    submitForm = data => {
        alert(JSON.stringify(data, null, 4));
    };

    render() {
        return (
            <FormValidated fieldList={this.fieldList} onSubmit={this.submitForm} >
                <fieldset>

                    <div className="field">

                        <p>Hvilke språk kan du?</p>
                        <label htmlFor="fieldNorwegian">
                            <input
                                id="fieldNorwegian"
                                name="fieldLanguages"
                                type="checkbox"
                            />
                            Norsk
                        </label>
                        <p data-errorfor="fieldNorwegian" className="field__errormessage" />

                        <label htmlFor="fieldEnglish">
                            <input
                                id="fieldEnglish"
                                name="fieldLanguages"
                                type="checkbox"
                                required
                            />
                            Engelsk
                        </label>
                        <p data-errorfor="fieldEnglish" className="field__errormessage" />

                        <label htmlFor="fieldGerman">
                            <input
                                id="fieldGerman"
                                name="fieldLanguages"
                                type="checkbox"
                            />
                            Tysk
                        </label>
                        <p data-errorfor="fieldGerman" className="field__errormessage" />

                        <label htmlFor="fieldFrench">
                            <input
                                id="fieldFrench"
                                name="fieldLanguages"
                                type="checkbox"
                            />
                            Fransk
                        </label>
                        <p data-errorfor="fieldFrench" className="field__errormessage" />

                    </div>

                    <input type="submit" value="Submit" />

                </fieldset>
            </FormValidated>
        );
    }
}

export default Example5;
