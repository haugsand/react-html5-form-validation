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
                            Norsk <span data-errorfor="fieldNorwegian" className="field__errormessage" />
                        </label>
                        

                        <label htmlFor="fieldEnglish">
                            <input
                                id="fieldEnglish"
                                name="fieldLanguages"
                                type="checkbox"
                                required
                            />
                            Engelsk <span data-errorfor="fieldEnglish" className="field__errormessage" />
                        </label>
                        

                        <label htmlFor="fieldGerman">
                            <input
                                id="fieldGerman"
                                name="fieldLanguages"
                                type="checkbox"
                            />
                            Tysk <span data-errorfor="fieldGerman" className="field__errormessage" />
                        </label>
                        

                        <label htmlFor="fieldFrench">
                            <input
                                id="fieldFrench"
                                name="fieldLanguages"
                                type="checkbox"
                            />
                            Fransk <span data-errorfor="fieldFrench" className="field__errormessage" />
                        </label>
                        

                    </div>

                    <input type="submit" value="Submit" />

                </fieldset>
            </FormValidated>
        );
    }
}

export default Example5;
