import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example8 extends Component {

    state = {
        expandForm: false,
        fieldList: [
            "fieldResignation"
        ]
    };

    toggleExpandForm = element => {

        if (element.id === 'valueOtherexplanation') {
            this.setState(prevState => ({
                expandForm: true,
                fieldList: [
                    "fieldResignation",
                    "fieldExplanation"
                ]
            }));
        } else {
            this.setState(prevState => ({
                expandForm: false,
                fieldList: [
                    "fieldResignation"
                ]
            })); 
        }
    };

    onChange = {
        fieldResignation: this.toggleExpandForm
    };

    submitForm = data => {
        alert(JSON.stringify(data, null, 4));
    };

    render() {

        //console.log(this.state);
        return (
            <FormValidated fieldList={this.state.fieldList} onSubmit={this.submitForm} onChange={this.onChange} >
                <fieldset>

                    <div className="field">
                        <p>Hvorfor avslutter du abonnementet?</p>
                        <label htmlFor="valueNouse">
                            <input
                                id="valueNouse"
                                name="fieldResignation"
                                type="radio"
                                value="No use"
                                required
                            />
                            Jeg har ikke bruk for det lenger
                        </label>
                        <label htmlFor="valueBetteralternative">
                            <input
                                id="valueBetteralternative"
                                name="fieldResignation"
                                type="radio"
                                value="Better alternative"
                            />
                            Jeg har funnet et bedre alternativ
                        </label>
                        <label htmlFor="valueOtherexplanation">
                            <input
                                id="valueOtherexplanation"
                                name="fieldResignation"
                                type="radio"
                                value="Other"
                            />
                            Annet årsak
                        </label>
                        <p data-errorfor="fieldResignation" className="field__errormessage" />
                    </div>

                    {this.state.expandForm && (
                        <div className="field">
                            <label htmlFor="fieldExplanation">Skriv inn begrunnelse</label>
                            <input
                                id="fieldExplanation"
                                type="text"
                                required
                            />
                            <p data-errorfor="fieldExplanation" className="field__errormessage" />
                        </div>
                    )}

                    <input type="submit" value="Submit" />

                </fieldset>
            </FormValidated>
        );
    }
}

export default Example8;
