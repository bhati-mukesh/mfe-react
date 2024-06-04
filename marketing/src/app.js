import {
    StylesProvider,
    createGenerateClassName,
} from '@material-ui/core/styles';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Landing from './components/LandingPage';
import Pricing from './components/PricingPage';
import Test from './components/test';

const generateClassName = createGenerateClassName({
    productionPrefix: 'ma',
  });

console.log('>>>> Marketing App', APP_MODE, BUILD_INFO);
  
  export default ({ history }) => {
    return (
      <div>
        <StylesProvider generateClassName={generateClassName}>
          <Test />
          <Router history={history}>
            <Switch>
              <Route exact path="/pricing" component={Pricing} />
              <Route path="/" component={Landing} />
            </Switch>
          </Router>
        </StylesProvider>
      </div>
    );
  };