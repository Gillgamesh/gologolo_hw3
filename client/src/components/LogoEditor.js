import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import TextWorkspace from './TextWorkspace';

const Input = (props) => {
    // defaultValue
    // value
    // label
    return (
        <div className="row">
            <label htmlFor={props.type}>{props.label}: </label>
            <input
                type={props.type}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
};

class LogoEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: this.props.logo
        };
    }

    changeProp = (propName, newValue) => {
        let newLogo = {...this.state.logo};
        newLogo[propName] = newValue;
        this.setState({
            ...this.state, 
            logo: newLogo
        });
    }
    handleNumericPropChange = (propName) => (
        (event) => {
            let propValue = event.target.value;
            propValue = parseInt(propValue);
            this.changeProp(propName, propValue);
        }
    )
    handleStringPropChange = (propName) => (
        (event) => {
            let propValue = event.target.value;
            this.changeProp(propName, propValue)
        }
    )
    render() {
        let fields = [
            {
                label: "Text Color", 
                name: "color",
                type: "color"
            },
            {
                label: "Font Size",
                name: "fontSize",
                type: "number"
            },
        ]
        return (
            <div className="row">
                <div className="col-4">
                    <div className="container">
                        {
                            fields.map(logoProperty => {
                                return logoProperty.type !== "number" ? (
                                    <Input
                                        value={this.state.logo[logoProperty.name]}
                                        onChange={this.handleStringPropChange(logoProperty.name)}
                                        type={logoProperty.type}
                                        label={logoProperty.label}
                                        key={logoProperty.name}
                                    />
                                ) : (
                                        <Input
                                            value={this.state.logo[logoProperty.name]}
                                            onChange={this.handleNumericPropChange(logoProperty.name)}
                                            type={logoProperty.type}
                                            label={logoProperty.label}
                                            key={logoProperty.name}
                                        />
                                    )
                            })
                        }

                        <div className="row">
                            <button
                                type="submit"
                                className="btn btn-success"
                                onSubmit={() => this.props.submit(this.state.logo)}
                            >
                                Submit
                        </button>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <TextWorkspace
                        logo={this.state.logo}
                    />
                </div>
            </div>
        );
    }
}


export default LogoEditor;