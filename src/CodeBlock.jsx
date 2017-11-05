import React, { Component } from "react";

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';


class CodeBlock extends Component {

    componentDidUpdate() {
        Prism.highlightAll()
    }

    render() {

        const {
            input,
            language
        } = this.props;

        const style = {
            margin: '6.4rem -12.8rem',
            padding: '6.4rem 12.8rem'
        };

        return (
            <pre style={style}>
                <code className={'language-' + language}>
                    {input}
                </code>
            </pre>
        );
    }
}

export default CodeBlock;
