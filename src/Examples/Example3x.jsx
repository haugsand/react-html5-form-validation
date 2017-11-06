import React, { Component } from "react";
import FormValidated from "./../FormValidated/FormValidated";

class Example1 extends Component {
    fieldList = [
        "fieldName",
        "fieldDescription",
        "fieldDeposit",
        "fieldTotalAmount"
    ];

    submitForm = data => {
        console.log("Valid form: ");
        console.log(data);
    };

    saveField = data => {
        console.log("Field onBlur: ");
        console.log(data.value);
    };

    checkValidity = value => {
        if (value === "magnus") {
            return "The username is not available";
        } else {
            return "";
        }
    };

    onBlur = {
        fieldName: this.saveField
    };

    customValidity = {
        fieldDescription: this.checkValidity
    };

    render() {
        return (
            <FormValidated
                fieldList={this.fieldList}
                onSubmit={this.submitForm}
                onBlur={this.onBlur}
                customValidity={this.customValidity}
            >
                <div>
                    <label htmlFor="fieldName">Navn</label>
                    <input id="fieldName" type="text" minLength="3" required />
                    <p data-errorfor="fieldName" />
                </div>

                <div>
                    <label htmlFor="fieldDescription">
                        Beskrivelse (frivillig)
                    </label>
                    <input id="fieldDescription" type="text" />
                    <p data-errorfor="fieldDescription" />
                </div>

                <div>
                    <label htmlFor="fieldTotalAmount">Totalt behov</label>
                    <input
                        id="fieldTotalAmount"
                        type="number"
                        min="5"
                        required
                    />
                    <p data-errorfor="fieldTotalAmount" />
                </div>

                <div>
                    <label htmlFor="fieldDeposit">Innskudd</label>
                    <input
                        id="fieldDeposit"
                        type="number"
                        min="5"
                        data-constraint-max="fieldTotalAmount"
                        required
                    />
                    <p data-errorfor="fieldDeposit" />
                </div>

                <input type="submit" value="Submit" />
            </FormValidated>
        );
    }
}

export default Example1;
