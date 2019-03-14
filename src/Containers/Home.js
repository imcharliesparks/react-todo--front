import React, { Component } from 'react'
import "./Home.css";
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';

import AuthForm from '../Components/AuthForm';

class Home extends Component {
    state = {
        authState: {
            signin: true,
        }
    }

    handleChangeFormType = () => {
        const newState = Object.assign({}, this.state.authState);
        newState.signin = !this.state.authState.signin;
        this.setState({ authState: newState });
    }

    render() {
        return (
            <Container className="home">
                <h2 className="home--header">Todo List</h2>
                {!this.props.user.isLoggedIn ?
                        <AuthForm signin={this.state.authState.signin} handleChangeFormType={this.handleChangeFormType} />
                    :
                        <h1>Add other stuff here</h1>
                }
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home);