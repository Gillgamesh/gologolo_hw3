import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Query, Mutation } from 'react-apollo';
import {GET_LOGO, DELETE_LOGO} from '../queries';
import {DEFAULT_LOGO, FIELDS} from '../constants';

import TextWorkspace from './TextWorkspace';

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ id: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/">Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-4">
                                                <dl>
                                                    {
                                                        FIELDS.map(field =>
                                                            (
                                                                <React.Fragment key={field.name}>
                                                                    <dt>{field.label}: </dt>
                                                                    <dd
                                                                    style={{
                                                                        color: field.type === 'color' ? data.logo[field.name] : 'black'
                                                                    }}
                                                                    >
                                                                        {data.logo[field.name]}
                                                                    </dd>
                                                                </React.Fragment>
                                                            )
                                                        )
                                                    } 
                                                    <dt>Last Updated:</dt>
                                                    <dd>{(new Date(data.logo.lastUpdate)).toString()}</dd>
                                                </dl>
                                                <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                                    {(removeLogo, { loading, error }) => (
                                                        <div>
                                                            <form
                                                                onSubmit={e => {
                                                                    e.preventDefault();
                                                                    removeLogo({ variables: { id: data.logo._id } });
                                                                }}>
                                                                <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                            </form>
                                                            {loading && <p>Loading...</p>}
                                                            {error && <p>Error :( Please try again</p>}
                                                        </div>
                                                    )}
                                                </Mutation>
                                            </div>
                                            <div className="col-8">
                                                <TextWorkspace
                                                    logo={{...DEFAULT_LOGO, ...data.logo}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;