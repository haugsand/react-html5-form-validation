/* eslint import/no-webpack-loader-syntax: off */

import React, { Component } from "react";

import CodeBlock from "./CodeBlock";

import Example1 from "./Examples/Example1";
import Example2 from "./Examples/Example2";
import Example3 from "./Examples/Example3";
import Example4 from "./Examples/Example4";

import ex1 from "!raw-loader!./Examples/Example1.jsx";
import ex2 from "!raw-loader!./Examples/Example2.jsx";
import ex3 from "!raw-loader!./Examples/Example3.jsx";
import ex4 from "!raw-loader!./Examples/Example4.jsx";


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

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th colSpan="7">Attributt</th>
                                </tr>
                                <tr>
                                    <th>Element</th>
                                    <th><code>required</code></th>
                                    <th><code>pattern</code></th>
                                    <th><code>maxlength</code></th>
                                    <th><code>minlength</code></th>
                                    <th><code>min</code></th>
                                    <th><code>max</code></th>
                                    <th><code>step</code></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox">input checkbox</a></td>
                                    <td>&#10003;</td><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date">input date</a></td>
                                    <td>&#10003;</td><td></td><td></td><td></td><td>&#10003;</td><td>&#10003;</td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local">input datetime-local</a></td>
                                    <td>&#10003;</td><td></td><td></td><td></td><td>&#10003;</td><td>&#10003;</td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email">input email</a></td>
                                    <td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file">input file</a></td>
                                    <td>&#10003;</td><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month">input month</a></td>
                                    <td>&#10003;</td><td></td><td></td><td></td><td>&#10003;</td><td>&#10003;</td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number">input number</a></td>
                                    <td>&#10003;</td><td></td><td></td><td></td><td>&#10003;</td><td>&#10003;</td><td>&#10003;</td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password">input password</a></td>
                                    <td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio">input radio</a></td>
                                    <td>&#10003;</td><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range">input range</a></td>
                                    <td></td><td></td><td></td><td></td><td>&#10003;</td><td>&#10003;</td><td>&#10003;</td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search">input search</a></td>
                                    <td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel">input tel</a></td>
                                    <td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text">input text</a></td>
                                    <td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time">input time</a></td>
                                    <td>&#10003;</td><td></td><td></td><td></td><td>&#10003;</td><td>&#10003;</td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url">input url</a></td>
                                    <td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td>&#10003;</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week">input week</a></td>
                                    <td>&#10003;</td><td></td><td></td><td></td><td>&#10003;</td><td>&#10003;</td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">textarea</a></td>
                                    <td>&#10003;</td><td></td><td>&#10003;</td><td>&#10003;</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select">select</a></td>
                                    <td>&#10003;</td><td></td><td></td><td></td><td></td><td></td><td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <h3>Avhengigheter mellom felter</h3>

                    <p>Tekst.</p>


                    <h3>Asynkron validering med egne feilmeldinger</h3>

                    <p>Tekst.</p>



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

                    <CodeBlock input={ex1} />

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

                    <CodeBlock input={ex2} />

                </section>


                <section>
                    <h2><span>Eksempel 3 </span>Send oppdateringer til morkomponenten</h2>

                    <p>Noen ganger er det relevant å </p>


                    <ul>
                        <li>Hver gang det skjer en endring i input-feltet, skal morkomponenten bli oppdatert.</li>
                        <li>Morkomponentens state skal kun oppdateres om feltet har en gyldig verdi.</li>
                    </ul>

                    <Example3 />

                    <CodeBlock input={ex3} />

                </section>

                <section>
                    <h2><span>Eksempel 4 </span>Radio-knapper</h2>
                    <p>Bruk name istedet for id.</p>

                    <ul>
                        <li>Radio-knapper grupperes ved å ha lik name-attributt.</li>
                        <li>Det er name-attributten, ikke id, som skal sendes inn i fieldList.</li>
                        <li>For at gruppen skal valideres, må én av radio-knappene ha required-attributen.</li>
                        <li>Ikke la flere enn en radio-knapp i hver gruppe ha required-attributt.</li>
                    </ul>

                    <Example4 />

                    <CodeBlock input={ex4} />
                </section>

                <section>
                    <h2><span>Eksempel 5 </span>Gruppe med checkbox</h2>
                    <p>Minst x verdier, og/eller maks y verdier i en gruppe.</p>
                </section>

                <section>
                    <h2><span>Eksempel 6 </span>Asynkron, custom validation</h2>
                    <p>Bruk en ekstern tjeneste til å komme med egendefinerte feilmeldinger.</p>
                </section>

                <section>
                    <h2><span>Eksempel 7 </span>Dynamiske skjema</h2>
                    <p>Skjema-elementer vises/skjules avhengig av verdier i andre felt.</p>
                </section>

                <section>
                    <h2><span>Eksempel 8 </span>Standardverdier</h2>
                    <p>Nå er skjemaet helt tomt... </p>
                </section>

            </main>
        );
    }
}

export default App;
