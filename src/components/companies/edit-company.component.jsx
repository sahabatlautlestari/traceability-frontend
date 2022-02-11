import React , {Component} from 'react';
import axios from 'axios';

export default class EditCompany extends Component {
  
  constructor(props) {
    super(props);
    
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id:-1,
      companyCode: '',
      companyName : '',
      latitude : '',
      longitude: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/companies/'+this.props.match.params.id)
    .then(res => {
      if(res.data['status'] === 'success')
      {
        const companyData = res.data['data']['company'];
        this.setState({
          id: companyData.id,
          companyCode: companyData.companyCode,
          companyName: companyData.companyName,
          latitude: companyData.location.latitude,
          longitude: companyData.location.longitude,
        })}
      })
      .catch((err)=>{
        console.log(err);
      })
  }
  onChangeCode(e) {
    this.setState(
      {
        code: e.target.value
      }
    );
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeLatitude(e) {
    this.setState({
      latitude: e.target.value
    });
  }

  onChangeLongitude(e) {
    this.setState({
      longitude: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const company = {
      id: this.state.id,
      companyCode: this.state.companyCode,
      companyName: this.state.companyName,
      location: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      }
    }
    console.log(company);
    
    axios.put(`http://localhost:5000/companies/${this.state.id}`, company)
      .then(res => console.log(res.data));

    window.location = '/companies';
  }

  render () {
    return (
      <div>
      <h3>Edit Company</h3>
      <form onSubmit={this.onSubmit}>        
      <div className="form-group">
            <label>Company Code: </label>
            <input type="text"
              required
              className="form-control" 
              value={this.state.companyCode}
              onChange={this.onChangeCode} 
            />
          </div>
        <div className="form-group">
          <label>Company Name: </label>
          <input type="text"
            required
            className="form-control" 
            value={this.state.companyName}
            onChange={this.onChangeName} 
          />
        </div>
        <div className="form-group">
          <label>Company latitude: </label>
          <input type="text"
            required
            className="form-control" 
            value={this.state.latitude}
            onChange={this.onChangeLatitude} 
          />
        </div>
        <div className="form-group">
          <label>longitude : </label>
          <input type="text" 
            className="form-control" 
            value={this.state.longitude}
            onChange={this.onChangeLongitude} 
          />
        </div>
        <br/>
        <div className="form-group">
          <input type="submit" value="Update Company" className="btn btn-primary" />
        </div>
      </form>
      </div>
    )
  }
}