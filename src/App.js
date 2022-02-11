import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import UsersList from './components/users/user-list.component';
import CreateUser from './components/users/create-user.component';
import EditUser from './components/users/edit-user.component';
import CompanyList from './components/companies/company-list.component';
import CreateCompany from './components/companies/create-company.component';
import EditCompany from './components/companies/edit-company.component';
import ShowCompany from './components/companies/show-company.component';
import Tracing from './components/tracing/tracing.component';


function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <div className="container">
        <Route path="/users" exact component={UsersList} />
        <Route path="/users/add" exact component={CreateUser} />
        <Route path="/users/edit/:id" exact component={EditUser} />
        <Route path="/companies" exact component={CompanyList} />
        <Route path="/companies/add" exact component={CreateCompany} />
        <Route path="/companies/:id/edit" exact component={EditCompany} />
        <Route path="/companies/:code" exact component={ShowCompany} />
        <Route path="/trace" exact component={Tracing} />
      </div>
    </Router>
  );
}

export default App;
