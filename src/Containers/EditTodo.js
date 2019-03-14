import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './EditTodo.css';
import {
    Card, 
    CardBody,
    CardTitle,
    CardText,
    Button,
    InputGroup, 
    InputGroupAddon, 
    InputGroupText, 
    Input,
    Form,
} from 'reactstrap';
import { UPDATE_TODO } from '../Store/actions';
import { dispatch } from 'rxjs/internal/observable/range';

class EditTodo extends Component {
    state = {
        newTaskName: this.props.location.state.taskName,
        newTaskContent: this.props.location.state.taskContent,
        redirect: false,
    }

    handleRedirect = () => {
        const { taskName, taskContent, completed, id } = this.props.location.state;
        if (!this.props.location.state || this.state.redirect) {
            const newState = this.props.location.state;
            newState.taskName = this.state.newTaskName;
            newState.taskContent = this.state.newTaskContent;
            return <Redirect to={{
                            pathname: "/view_todo",
                            state: newState,
                        }}
                    />
        } else {
            return (
                <Fragment>
                    <h2 className="editTodo--header">Edit To-Do</h2>
                    <Card className="editTodo--card">
                        <CardBody>
                            <Form>
                                <InputGroup>
                                    <InputGroupAddon className="editTodo--addons" addonType="prepend">Title</InputGroupAddon>
                                    <Input value={this.state.newTaskName} onChange={this.handleUpdateTask('newTaskName')} placeholder={taskName} />
                                </InputGroup>
                                <hr/>
                                <InputGroup>
                                    <InputGroupAddon className="editTodo--addons" addonType="prepend">Content</InputGroupAddon>
                                    <Input className="viewTodo--textarea" type="textarea" value={this.state.newTaskContent} onChange={this.handleUpdateTask('newTaskContent')} placeholder={taskContent} />
                                </InputGroup>
                                <hr/>
                                <Button onClick={this.handleSubmitTask} color="success">Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Fragment>
            )
        }
    }

    handleUpdateTask = (fieldName) => (event) => {
        this.setState({ [fieldName]: event.target.value });
    }

    handleSubmitTask = () => {
        const newState = this.props.location.state;
        newState.taskName = this.state.newTaskName;
        newState.taskContent = this.state.newTaskContent;

        this.setState({ redirect: true });
        this.props.updateTodo(newState); 
    }

    render() {
        return (
            <section className="editTodo container">
                {this.handleRedirect()}
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTodo: (task) => dispatch({ type: UPDATE_TODO, payload: task }),
    }
}

export default connect(null, mapDispatchToProps)(EditTodo);