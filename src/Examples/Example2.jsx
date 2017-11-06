import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example2 extends Component {
    fieldList = [
        "fieldTotalAmount",
        "fieldMinAmount",
        "fieldMaxAmount"
    ];

    submitForm = data => {
        alert(JSON.stringify(data, null, 4));
    };


    render() {
        return (
            <FormValidated fieldList={this.fieldList} onSubmit={this.submitForm} >
                <fieldset>

                    <div className="field">
                        <label htmlFor="fieldTotalAmount">Total etterspørsel</label>
                        <input
                            id="fieldTotalAmount"
                            type="number"
                            min="5"
                            required
                        />
                        <p data-errorfor="fieldTotalAmount" className="field__errormessage" />
                    </div>

                    <div className="field">
                        <label htmlFor="fieldMinAmount">Minste beløp</label>
                        <input
                            id="fieldMinAmount"
                            type="number"
                            min="5"
                            data-constraint-max="fieldTotalAmount"
                            required
                        />
                        <p data-errorfor="fieldMinAmount" className="field__errormessage" />
                    </div>

                    <div className="field">
                        <label htmlFor="fieldMaxAmount">Største beløp</label>
                        <input
                            id="fieldMaxAmount"
                            type="number"
                            data-constraint-min="fieldMinAmount"
                            data-constraint-max="fieldTotalAmount"
                            required
                        />
                        <p data-errorfor="fieldMaxAmount" className="field__errormessage" />
                    </div>

                    <input type="submit" value="Submit" />

                </fieldset>
            </FormValidated>
        );
    }
}

export default Example2;
