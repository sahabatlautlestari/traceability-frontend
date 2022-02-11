import React , {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const User = props => {
  return <tr>
    <td>{props.user.username}</td>
    <td>{props.user.email}</td>
    <td>{props.user.fullname}</td>
    <td>
      <Link to={"/users/edit/" + props.user.id}><FontAwesomeIcon className="c-warning" icon={faUserEdit}/></Link> | <a href="/users" onClick={()=>{props.deleteUser(props.user.id)}}><FontAwesomeIcon className="c-danger" icon={faTrash}/></a>
    </td>
  </tr>
}


export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = {users: []};
  }
 
  componentDidMount(){
    axios.get('http://localhost:5000/users')
      .then(res => {
        console.log(res.data);
        this.setState({users: res.data['data']['users']})
      })
      .catch(err => {
        console.log(err);
      });
  }

  
  addUser() {
    window.location = '/users/add';
  }

  deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(res => console.log(res.data));

    this.setState({
      users: this.state.users.filter(el => el.id !== id)
    });
  }

  UserList(){
    return this.state.users.map(currentUser => {
      return <User user={currentUser} 
        deleteUser={this.deleteUser}
        key={currentUser.id} />;
    })
  }

  render () {
    return (
      <div>
        <h3>User List</h3>
        <button onClick={this.addUser} className="btn btn-success "><FontAwesomeIcon icon={faUserPlus}/> Add User</button>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.UserList()}
          </tbody>
        </table>
      </div>
    )
  }
}