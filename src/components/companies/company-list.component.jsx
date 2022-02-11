import React , {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

const Company = props => {
  return <tr>
    <td>{props.company.companyCode}</td>
    <td>{props.company.companyName}</td>
    <td>{props.company.location.latitude}</td>
    <td>{props.company.location.longitude}</td>
    <td>
      <Link to={`/companies/${props.company.id}/edit` }><FontAwesomeIcon className="c-warning" icon={faEdit}/></Link> | 
      <a href="/companies" onClick={()=>{props.deleteCompany(props.company.id)}}> <FontAwesomeIcon className="c-danger" icon={faTrash}/> </a> | 
      <Link to={"/companies/" + props.company.companyCode}><FontAwesomeIcon className="c-primary" icon={faSearch}/></Link>
    </td>
  </tr>
}

export default class CompanyList extends Component {
  constructor(props) {
    super(props);

    this.deleteCompany = this.deleteCompany.bind(this);

    this.state = {companies: []};
  }
 
  componentDidMount(){
    axios.get('http://localhost:5000/companies')
      .then(res => {
        this.setState({companies: res.data['data']['companies']})
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  addCompany() {
    window.location = '/companies/add';
  }

  deleteCompany(id) {
    axios.delete('http://localhost:5000/companies/'+id)
      .then(res => console.log(res.data));

    this.setState({
      companies: this.state.companies.filter(el => el.id !== id)
    });
  }

  CompanyList(){
    return this.state.companies.map(currentCompany => {
      return <Company 
        company={currentCompany} 
        deleteCompany={this.deleteCompany}
        key={currentCompany.id} />;
    })
  }

  render () {
    return (
      <div>
        <h3>Company List</h3>
        <button onClick={this.addCompany} className="btn btn-success"><FontAwesomeIcon icon={faPlus}/> Add Company</button>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.CompanyList()}
          </tbody>
        </table>
      </div>
    )
  }
}