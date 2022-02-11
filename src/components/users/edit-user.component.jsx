import React , {Component} from 'react';
import axios from 'axios';
import md5 from 'crypto-js/md5';

export default class EditUser extends Component {
  
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
      id:-1,
      username : '',
      firstName : '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      company: -1,
      lastLogin: '',
      status:'',
      resetPasswordToken:'',
      resetPasswordExpires:'',
      isAdmin: false,
      created:'',
      updated:'',
      prevPass:'',
      companies: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/companies')
      .then(res => {
        if(res.data['values'].length > 0){
          this.setState({
            companies: res.data['values'],
          })
        }
      })
    
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
    .then(res => {
      if(res.data['values'].length > 0)
      {
        const userData = res.data['values'][0];
        this.setState({
          id: userData.id,
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          prevPass: userData.password,
          company: userData.company,
          lastLogin: userData.lastLogin,
          status:userData.status,
          resetPasswordToken:userData.resetPasswordToken,
          resetPasswordExpires:userData.resetPasswordExpires,
          isAdmin: userData.isAdmin,
          created:userData.created,
          updated:userData.updated,
        })}
      })
      .catch((err)=>{
        console.log(err);
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
    var userPassword = this.state.prevPass;
    if(this.state.password !== '' && this.state.password === this.state.confirmPassword) {
      userPassword = md5(this.state.password);
    }
    const user = {
      id: this.state.id,
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      password: userPassword,
      company: this.state.company,
      lastLogin:  this.state.lastLogin,
      status: this.state.status,
      resetPasswordToken: this.state.resetPasswordToken,
      resetPasswordExpires: this.state.resetPasswordExpires,
      isAdmin: this.state.isAdmin,
      created: this.state.created,
      updated: this.state.updated,
    }
    
    axios.put('http://localhost:5000/users/', user)
      .then(res => console.log(res.data));

    window.location = '/user';
  }

  render () {
    return (
      <div>
      <h3>Edit User</h3>
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
          <input type="submit" value="Update User" className="btn btn-primary" />
        </div>
      </form>
      </div>
    )
  }
}