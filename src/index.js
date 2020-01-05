import React from 'react';
import ReactDOM from 'react-dom';


import Header from './common/header/header';
import LoginForm from "./common/auth/login_form";
import SignupForm from "./common/auth/signup_form";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Collection from "./collection";
import Market from "./market";
import Work from "./work";


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
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    console.log(json.username);
                    this.setState({
                        username: json.username,
                        money: json.money,
                        gems: json.gems,
                        experience: json.experience
                    });
                });
        }
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
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
                    username: json.user.username
                });
            });
    };

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

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {
        let form;
        switch (this.state.displayed_form) {
            case 'login':
                form = <LoginForm handle_login={this.handle_login} />;
                break;
            case 'signup':
                form = <SignupForm handle_signup={this.handle_signup} />;
                break;
            default:
                form = null;
        }
        return (
            <Router>
                <Header
                    logged_in={this.state.logged_in}
                    username={this.state.logged_in ? this.state.username : null}
                    money={this.state.logged_in ? this.state.money : null}
                    gems={this.state.logged_in ? this.state.gems : null}
                    experience={this.state.logged_in ? this.state.experience : null}
                    display_form={this.display_form}
                    handle_logout={this.handle_logout}
                />
                {form}
                <Switch>
                    <Route path='/collection' component={Collection} />
                    <Route path='/market' component={Market} />
                    <Route path='/work' component={Work} />
                </Switch>
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
