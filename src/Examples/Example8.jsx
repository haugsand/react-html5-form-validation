import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example8 extends Component {

    state = {
        expandForm: false,
        fields: {
            fieldResignation: ''
        }
    };

    toggleExpandForm = e => {

        if (e.value === 'other') {
            this.setState(prevState => ({
                expandForm: true,
                fields: {
                    fieldResignation: '',
                    fieldExplanation: ''
                }
            }));
        } else {
            this.setState(prevState => ({
                expandForm: false,
                fields: {
                    fieldResignation: ''
                }
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

        return (
            <FormValidated fields={this.state.fields} onSubmit={this.submitForm} onChange={this.onChange} >
                <fieldset id="example8">

                    <div className="field">
                        <label htmlFor="fieldResignation">
                            Hvorfor avslutter du abonnementet?
                        </label>

                        <select id="fieldResignation" required>
                            <option value="">Velg ...</option>
                            <option value="no-use">Jeg har ikke bruk for det lenger</option>
                            <option value="better-alternative">Jeg har funnet et bedre alternativ</option>
                            <option value="too-expensive">Abonnementet er for dyrt</option>
                            <option value="against-beliefs">Abonnementet strider imot min trosretning</option>
                            <option value="do-not-know">Jeg vet ikke</option>
                            <option value="other">Annen årsak</option>
                        </select>

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
