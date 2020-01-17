import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from './common/header/header';
import Routes from "./common/routing/Routes";
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: !!localStorage.getItem('token'),
            username: ''
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/myauth/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Probably a 401 unauthorized but build better error handling later');
                    }
                })
                .then(json => {
                    this.setState({
                        username: json.username,
                        money: json.money,
                        gems: json.gems,
                        experience: json.experience
                    });
                })
                .catch(error => this.setState({
                    logged_in: false
                }));
        }
    }

    handle_signup = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/myauth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    logged_in: true,
                    displayed_form: '',
                    username: json.username
                });
            });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '' });
    };

    handle_login = (response) => {
        console.log(response);

        localStorage.setItem('token', response.token);
        this.setState({
            logged_in: true,
            username: response.user.username
        });
    };

    render() {
        return (
            <Router>
                <Header
                    logged_in={this.state.logged_in}
                    username={this.state.logged_in ? this.state.username : null}
                    money={this.state.logged_in ? this.state.money : null}
                    gems={this.state.logged_in ? this.state.gems : null}
                    experience={this.state.logged_in ? this.state.experience : null}
                    handle_logout={this.handle_logout}
                />
                <Routes
                    appProps={{ handle_login: this.handle_login }}
                />
            </Router>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

export default Game;
