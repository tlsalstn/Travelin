import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MapPage from './MapPage';
import MainPage from './MainPage';
import AuthPage from './AuthPage';

export const Root: React.FC = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/map" component={MapPage} />
        </Switch>
    </Router>
);