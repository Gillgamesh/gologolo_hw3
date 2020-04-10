import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import {GET_LOGO, UPDATE_LOGO} from '../queries';
import LogoEditor from './LogoEditor';


class EditLogoScreen extends Component {
    render() {
        let text, color, fontSize;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body">                                            
                                            <div className="panel-body">
                                                <div className="container">
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again)</p>}
                                                    <LogoEditor
                                                        logo={data.logo}
                                                        submit={(newLogo) => {
                                                            updateLogo({ variables: { ...newLogo } })
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
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;