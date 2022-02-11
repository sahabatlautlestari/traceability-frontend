import React , {Component} from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'

export default class ShowCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id:-1,
      code: '',
      name : '',
      address : '',
      email: '',
      phone: '',
      owner: '',
      releaseFolder: '',
      created:'',
      updated:'',
    }
  }
 
  componentDidMount() {
    axios.get('http://localhost:5000/companies/code/'+this.props.match.params.code)
    .then(res => {
      if(res.data['values'].length > 0)
      {
        const companyData = res.data['values'][0];
        this.setState({
          id: companyData.id,
          code: companyData.code,
          name: companyData.name,
          address: companyData.address,
          email: companyData.email,
          phone: companyData.phone,
          owner: companyData.owner,
          releaseFolder: companyData.releaseFolder,
          created: companyData.created,
          updated: companyData.updated,
        })}
      })
      .catch((err)=>{
        console.log(err);
      })
  }  

  render () {
    return (
      <h3>{this.state.name}</h3>
    )
  }
}