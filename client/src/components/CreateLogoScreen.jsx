import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import {ADD_LOGO} from '../queries';
import {DEFAULT_LOGO} from '../constants';
import LogoEditor from'./LogoEditor';


class CreateLogoScreen extends Component {

    render() {
        let text, color, fontSize;
        return (
            <Mutation
                mutation={ADD_LOGO}
                onCompleted={(data) => this.props.history.push(
                    `/view/${data.addLogo._id}`
                )}
            >
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                                        </h3>
                            </div>
                            <div className="panel-body">
                                <div className="panel-body">
                                    <div className="container">
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again)</p>}
                                        <LogoEditor
                                            logo={DEFAULT_LOGO}
                                            submit={(newLogo) => {
                                                addLogo({ variables: { ...newLogo } })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;