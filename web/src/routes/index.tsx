import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './MainPage';

export const Root: React.FC = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={MainPage} />
        </Switch>
    </Router>
);