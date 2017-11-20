import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example9 extends Component {

    state = {
        color: '#ff0000'
    }

    fields = {
        fieldColor: this.state.color, 
        fieldHidden: 'Secret message'
    };

    submitForm = data => {
        alert(JSON.stringify(data, null, 4));
    };

    updateColor = e => {
        this.setState(prevState => ({
            color: e.value
        }));
    };

    checkColor = value => {
        return new Promise((resolve, reject) => {
            let errorMessage = '';
            if (value.substr(-2) !== '00') {
                errorMessage = 'Fargekoden "' + value + '" slutter ikke med 00.';
            }
            resolve(errorMessage);
        });
    };

    customValidation = {
        fieldColor: this.checkColor
    };

    onChange = {
        fieldColor: this.updateColor
    };

    render() {
        return (
            <FormValidated 
                fields={this.fields} 
                onSubmit={this.submitForm} 
                onChange={this.onChange} 
                customValidation={this.customValidation}
            >
                <fieldset id="example9">

                    <div className="field">
                        <label htmlFor="fieldColor">
                            Velg farge en farge som slutter på &laquo;#00&raquo;
                        </label>
                        <input
                            id="fieldColor"
                            type="color"
                        /> {this.state.color}
                        <p data-errorfor="fieldColor" className="field__errormessage" />
                    </div>

                    <input type="hidden" id="fieldHidden" />

                    <input type="submit" value="Submit" />

                </fieldset>
            </FormValidated>
        );
    }
}

export default Example9;
