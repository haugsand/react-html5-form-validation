import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example4 extends Component {

    fieldList = [
        "fieldAnimal"
    ];

    submitForm = data => {
        alert(JSON.stringify(data, null, 4));
    };

    render() {
        return (
            <FormValidated fieldList={this.fieldList} onSubmit={this.submitForm} >
                <fieldset>

                    <div className="field">
                        <p>Hva er ditt favorittdyr?</p>
                        <label htmlFor="valueHorse">
                            <input
                                id="valueHorse"
                                name="fieldAnimal"
                                type="radio"
                                value="Horse"
                                required
                            />
                            Hest
                        </label>
                        <label htmlFor="valueFox">
                            <input
                                id="valueFox"
                                name="fieldAnimal"
                                type="radio"
                                value="Fox"
                            />
                            Rev
                        </label>
                        <label htmlFor="valueBeaver">
                            <input
                                id="valueBeaver"
                                name="fieldAnimal"
                                type="radio"
                                value="Beaver"
                            />
                            Bever
                        </label>
                        <p data-errorfor="fieldAnimal" className="field__errormessage" />
                    </div>

                    <input type="submit" value="Submit" />

                </fieldset>
            </FormValidated>
        );
    }
}

export default Example4;
