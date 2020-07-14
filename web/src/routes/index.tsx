import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MapPage from './MapPage';
import MainPage from './MainPage';
import AuthPage from './AuthPage';
import MyPage from './MyPage';
import { SharePage, ShareInfoPage, ShareCreatePage } from './SharePage';

export const Root: React.FC = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/map" component={MapPage} />
            <Route exact path="/post/share" component={SharePage} />
            <Route path="/post/create" component={ShareCreatePage} />
            <Route path="/post/share/:id" component={ShareInfoPage} />
            <Route path="/mypage" component={MyPage} />
        </Switch>
    </Router>
);