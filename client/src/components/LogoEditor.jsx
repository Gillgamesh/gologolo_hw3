import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import TextWorkspace from './TextWorkspace';
import {FIELDS, DEFAULT_LOGO} from '../constants';

const Input = (props) => {
    // defaultValue
    // value
    // label
    // min - max
    return (
        <React.Fragment>
            <div className="row">
                <label> {props.label} </label>
            </div>
            <div className="row" style={{marginBottom: '5px'}}>
                <input
                    type={props.type}
                    value={props.value}
                    min={(!!props.min && props.type === "number" && props.min) || undefined}
                    max={(!!props.max && props.type === "number" && props.max) || undefined}
                    onChange={(event) => {
                        if (props.type !== "number")
                            return props.onChange(event);
                        let value = parseInt(event.target.value);
                        if ((!props.min || props.min <= value)
                            && (0 <= value)
                            && (!props.max || props.max >= value)
                        )
                            props.onChange(event);
                    }
                    }
                />
            </div>
        </React.Fragment>
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
        let fields = FIELDS;
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
                                        label={logoProperty.label}
                                        type={logoProperty.type}
                                        key={logoProperty.name}
                                    />
                                ) : (
                                        <Input
                                            value={this.state.logo[logoProperty.name]}
                                            onChange={this.handleNumericPropChange(logoProperty.name)}
                                            type={logoProperty.type}
                                            label={logoProperty.label}
                                            key={logoProperty.name}
                                            min={logoProperty.min ? logoProperty.min : undefined}
                                            max={logoProperty.max ? logoProperty.max : undefined}
                                        />
                                    )
                            })
                        }

                        <div className="row">
                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={() => this.props.submit(this.state.logo)}
                                disabled={!(this.state.logo.text)}
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