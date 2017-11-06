/* eslint import/no-webpack-loader-syntax: off */

import React, { Component } from "react";

import CodeBlock from "./CodeBlock";

import Example1 from "./Examples/Example1";
import Example2 from "./Examples/Example2";
import Example3 from "./Examples/Example3";

import ex1 from "!raw-loader!./Examples/Example1.jsx";
import ex2 from "!raw-loader!./Examples/Example2.jsx";
import ex3 from "!raw-loader!./Examples/Example3.jsx";


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
                    <h2>Hvordan bruke komponenten</h2>

                    <h3>Oppsett av skjema</h3>

                    <ul>
                        <li>Oppgi id på alle elementer.</li>
                        <li>Legg til data-errorfor for feilmeldinger</li>
                    </ul>

                    <h3>Oppsett av komponent</h3>

                    <ul>
                        <li>Erstatt form med FormValidated.</li>
                        <li>Angi fieldList. En liste med id-er.</li>
                        <li>Oppgi onSubmit. Mottar et objekt med alle skjemaverdier.</li>
                    </ul>
                </section>


                <section>
                    <h2><span>Eksempel 1 </span>Enkelt skjema</h2>

                    <p>Test.</p>

                    <ul>
                        <li>Det ene felter er obligatorisk, og må ha minst tre tegn.</li>
                        <li>Det andre feltet er frivillig å fylle ut.</li>
                    </ul>

                    <Example1 />

                    <CodeBlock input={ex1} language="js" />

                </section>


                <section>
                    <h2><span>Eksempel 2 </span>Skjema med avhengigheter mellom felter</h2>

                    <p>Test.</p>

                    <ul>
                        <li>Total etterspørsel må være større enn 5.</li>
                        <li>Minste beløp må være større enn 5, og mindre enn total etterspørsel.</li>
                        <li>Største beløp må være større enn minste beløp, og mindre enn total etterspørsel.</li>
                        <li>Alle tre felter er obligatoriske.</li>
                    </ul>

                    <Example2 />

                    <CodeBlock input={ex2} language="js" />

                </section>


                <section>
                    <h2><span>Eksempel 3 </span>Send oppdateringer til morkomponenten</h2>

                    <p>Noen ganger er det relevant å </p>

                    <ul>
                        <li>Hver gang det skjer en endring i input-feltet, skal morkomponenten bli oppdatert.</li>
                        <li>Morkomponentens state skal kun oppdateres om feltet har en gyldig verdi.</li>
                    </ul>

                    <Example3 />

                    <CodeBlock input={ex3} language="js" />

                </section>

            </main>
        );
    }
}

export default App;
