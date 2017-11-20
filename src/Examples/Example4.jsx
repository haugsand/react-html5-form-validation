import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example4 extends Component {

    fields = {
        fieldAnimal: ''
    };

    submitForm = data => {
        alert(JSON.stringify(data, null, 4));
    };

    render() {
        return (
            <FormValidated fields={this.fields} onSubmit={this.submitForm} >
                <fieldset id="example4">

                    <div className="field">
                        <p>Hva er ditt favorittdyr?</p>
                        <label htmlFor="fieldAnimal">
                            <input
                                id="fieldAnimal"
                                name="fieldAnimal"
                                type="radio"
                                value="Horse"
                                required
                            />
                            Hest
                        </label>
                        <label htmlFor="fieldAnimal2">
                            <input
                                id="fieldAnimal2"
                                name="fieldAnimal"
                                type="radio"
                                value="Fox"
                            />
                            Rev
                        </label>
                        <label htmlFor="fieldAnimal3">
                            <input
                                id="fieldAnimal3"
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
