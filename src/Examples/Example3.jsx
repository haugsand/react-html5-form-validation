import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example3 extends Component {

    state = {
        nibor: 0.81,
        interest: 0.75,
        comment: ''
    }

    fields = {
        fieldComment: '',
        fieldInterest: this.state.interest
    };

    submitForm = data => {
        alert(JSON.stringify(data, null, 4));
    };

    updateInterest = e => {
        if (e.validity.valid) {
            this.setState(prevState => ({
                interest: parseFloat(e.value)
            }));
        }
    };

    saveField = () => {
        this.setState(prevState => ({
            comment: 'Lagrer ...'
        }), () => {
            setTimeout(() => {
                this.setState(prevState => ({
                    comment: ''
                }))
            }, 1500);
        })
    }

    onBlur = {
        fieldComment: this.saveField
    };

    onChange = {
        fieldInterest: this.updateInterest
    };

    render() {

        const totalInterest = (this.state.nibor + this.state.interest).toFixed(2);

        return (
            <FormValidated 
                fields={this.fields} 
                onSubmit={this.submitForm} 
                onBlur={this.onBlur}
                onChange={this.onChange}
            >
                <fieldset>

                    <div className="field">
                        <label htmlFor="fieldComment">Kommentar</label>
                        <input
                            id="fieldComment"
                            type="text"
                            required
                        />
                        {this.state.comment}
                        <p data-errorfor="fieldComment" className="field__errormessage" />
                    </div>

                    <div className="field">
                        <label htmlFor="fieldInterest">Rentepåslag</label>
                        <input
                            id="fieldInterest"
                            type="number"
                            min="0"
                            step="0.01"
                            required
                        />
                        <input type="submit" value="Submit" />
                        <p data-errorfor="fieldInterest" className="field__errormessage" />
                    </div>
                    
                    <p>NIBOR-rente: <strong>{this.state.nibor}%</strong></p>
                    <p>Total rente: <strong>{totalInterest}%</strong></p>

                </fieldset>
            </FormValidated>
        );
    }
}

export default Example3;
