import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {GET_LOGOS} from '../queries';


class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container" style={{ marginTop: "50px" }}>
                            <div className="row">
                                <div className="col s4">
                                    <h3>Recent Work</h3>
                                    {data.logos.sort((logo1, logo2) => logo1.lastUpdate == logo2.lastUpdate ? 0 : (
                                        logo1.lastUpdate > logo2.lastUpdate ? -1 : 1)).map(
                                            // the dates can be compared with >, regardless
                                            // of whether they are ISO strings or datetime objects, the larger one
                                            // will be the one with the higher date. We want the larger one to be considered "smaller" by comparator
                                            (logo, index) => (
                                                <div key={index} className='home_logo_link'
                                                    style={{ cursor: "pointer" }}>
                                                    <Link to={`/view/${logo._id}`}>{logo.text}</Link>
                                                </div>
                                            ))}
                                </div>
                                <div className="col s8">
                                    <div id="home_banner_container">
                                        GoLogoLo<br />
                                    Logo Maker
                                </div>
                                    <div>
                                        <br />
                                        <Link id="add_logo_button" to="/create" className="btn btn-success">Create a New Logo</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
