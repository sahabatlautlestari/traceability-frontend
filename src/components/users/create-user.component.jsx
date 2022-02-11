import React , {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username : '',
      firstName : '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      company: -1,
      isAdmin: false,
      companies: [],
    }
  }
  

  componentDidMount() {
    axios.get('http://localhost:5000/companies')
      .then(res => {
        if(res.data['values'].length > 0){
          this.setState({
            companies: res.data['values'],
            company: res.data['values'][0].id,
          })
        }
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeCompany(e) {
    this.setState({
      company: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      company: this.state.company,
      isAdmin: this.state.isAdmin
    }
    
    axios.post('http://localhost:5000/users', user)
      .then(res => console.log(res.data));

    window.location = '/users';
  }

  render () {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Company: </label>
            <select required 
              className="form-control" 
              //ref="userInput"
              value={this.state.company}
              onChange={this.onChangeCompany}>
                {
                  this.state.companies.map((cmpn) => {
                    return <option key={cmpn.id} value={cmpn.id}>{cmpn.name}</option>
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Username: </label>
            <input type="text"
              required
              className="form-control" 
              value={this.state.username}
              onChange={this.onChangeUsername} 
            />
          </div>
          <div className="form-group">
            <label>First Name: </label>
            <input type="text"
              required
              className="form-control" 
              value={this.state.firstName}
              onChange={this.onChangeFirstName} 
            />
          </div>
          <div className="form-group">
            <label>Last Name : </label>
            <input type="text" 
              className="form-control" 
              value={this.state.lastName}
              onChange={this.onChangeLastName} 
            />
          </div>
          <div className="form-group">
            <label>Email : </label>
            <input type="text" 
              className="form-control" 
              value={this.state.email}
              onChange={this.onChangeEmail} 
            />
          </div>
          <div className="form-group">
            <label>Phone : </label>
            <input type="text" 
              className="form-control" 
              value={this.state.phone}
              onChange={this.onChangePhone} 
            />
          </div>
          <div className="form-group">
            <label>Password : </label>
            <input type="password" 
              className="form-control" 
              value={this.state.password}
              onChange={this.onChangePassword} 
            />
          </div>
          <div className="form-group">
            <label>Confirm Password : </label>
            <input type="password" 
              className="form-control" 
              value={this.state.confirmPassword}
              onChange={this.onChangeConfirmPassword} 
            />
          </div>
          <br/>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}