import React, { Component } from "react";

import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/themes/prism.css';


class CodeBlock extends Component {

    componentDidUpdate() {
        Prism.highlightAll()
    }

    render() {

        const style = {
            margin: '4.8rem -12.8rem',
            padding: '4.8rem 3.2rem 4.8rem 12.8rem',
            width: 'calc(100% + 9.6rem)'
        };

        return (
            <pre style={style}>
                <code className={'language-jsx'}>
                    {this.props.input}
                </code>
            </pre>
        );
    }
}

export default CodeBlock;
