import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">                
                <div className="container">
                    <Link to="/" className="navbar-brand">TraceTales</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/companies" className="nav-link">Company</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/users" className="nav-link">User</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/buyers" className="nav-link">Buyer</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/trace" className="nav-link">Trace</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}