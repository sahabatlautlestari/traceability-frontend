import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container} from 'react-bootstrap'

import MainNavbar from './components/main-navbar.component';
import Tracing from './components/tracing/tracing.component';
import Trace from './components/tracing/trace.component';
import { Switch } from 'react-router-dom';


function App() {
  return (
    <Router basename={"/tracego"}>
      <MainNavbar />
      <br/>
      <Container fluid="md">
        <Switch>
          <Route path='/:productCode' exact component={Tracing} />
          <Route path='/' exact component={Trace} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
