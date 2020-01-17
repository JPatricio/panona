import React from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

import Collection from "../../collection";
import Market from "../../market";
import Work from "../../work";

import Login from "../auth/login";
import SignupForm from "../auth/signup_form";

export default function Routes({ appProps }) {
    return (
        <Switch>
            <Route path='/collection' component={Collection} />
            <Route path='/market' component={Market} />
            <Route path='/work' component={Work} />

            <PrivateRoute path="/login" exact component={Login} appProps={appProps} />
            <Route path="/Register" component={SignupForm}/>

            <Route component={NotFound} />
        </Switch>
    );
}