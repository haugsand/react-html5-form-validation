/* eslint import/no-webpack-loader-syntax: off */

import React, { Component } from "react";

import CodeBlock from "./CodeBlock";
import Example1 from "./Examples/Example1";
import ex1 from "!raw-loader!./Examples/Example1.jsx";


class App extends Component {

    render() {
        return (
            <main>
                <header>
                    <h1>React HTML5 Form Validation</h1>

                    <p>Test.</p>
                </header>


                <section>
                    <h2>Bakgrunn</h2>

                    <ul>
                        <li>Valideringsregler angis ved standard HTML-attributter, direkte på elementene.</li>
                        <li>Valideringen skjer ved hjelp av Constraint Validation API</li>
                    </ul>
                </section>


                <section>
                    <h2>Valideringsregler</h2>


                    <h3>Når valideres det?</h3>

                    <ul>
                        <li>Etter at element har mistet fokus.</li>
                        <li>For hvert tastetrykk, om det finnes en feil.</li>
                        <li>Alle felter valideres onSubmit</li>
                    </ul>


                    <h3>Hva valideres?</h3>

                    <p>Alle HTML5-attributter</p>

                    <ul>
                        <li>max</li>
                        <li>min</li>
                    </ul>

                    <p>I tillegg et par ekstra funksjoner</p>

                    <ul>
                        <li>Avhengigheter mellom felter</li>
                        <li>Asynkron validering med egne feilmeldinger</li>
                    </ul>


                </section>


                <section>
                    <h2>Oppsett av skjema</h2>

                    <ul>
                        <li>Oppgi id på alle elementer.</li>
                        <li>Legg til data-errorfor for feilmeldinger</li>
                    </ul>
                </section>


                <section>
                    <h2>Oppsett av komponent</h2>

                    <ul>
                        <li>Erstatt form med FormValidated</li>
                        <li>Angi fieldList. En liste med id-er</li>
                        <li>Oppgi onSubmit. Mottar et objekt med alle skjemaverdier.</li>
                    </ul>
                </section>


                <section>
                    <h2>Eksempel 1: Enkelt skjema</h2>

                    <p>Test.</p>

                    <ol>
                        <li>Det ene felter er obligatorisk, og må ha minst tre tegn.</li>
                        <li>Det andre feltet er frivillig</li>
                    </ol>

                    <Example1 />

                    <CodeBlock input={ex1} language="js" />

                </section>


                <section>
                    <h2>Eksempel 2: Enkelt skjema</h2>

                    <p>Test.</p>
                </section>
            </main>
        );
    }
}

export default App;
