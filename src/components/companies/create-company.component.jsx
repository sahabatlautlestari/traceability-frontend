import React , {Component} from 'react';
import axios from 'axios';

export default class CreateCompany extends Component {
  
  constructor(props) {
    super(props);

    this.onChangeCompanyCode = this.onChangeCompanyCode.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeCompanyLatitude = this.onChangeCompanyLatitude.bind(this);
    this.onChangeCompanyLongitude = this.onChangeCompanyLongitude.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      companyCode: '',
      companyName : '',
      latitude : '',
      longitude: '',
    }
  }
  

  // componentDidMount() {
  //   axios.get('http://localhost:5000/companies')
  //     .then(res => {
  //       if(res.data['values'].length > 0){
  //         this.setState({
  //           companies: res.data['values'],
  //           company: res.data['values'][0].id,
  //         })
  //       }
  //     })
  // }

  onChangeCompanyCode(e) {
    this.setState({
      companyCode: e.target.value
    });
  }
  onChangeCompanyName(e) {
    this.setState({
      companyName: e.target.value
    });
  }

  onChangeCompanyLatitude(e) {
    this.setState({
      latitude: e.target.value
    });
  }

  onChangeCompanyLongitude(e) {
    this.setState({
      longitude: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      companyCode: this.state.companyCode,
      companyName: this.state.companyName,
      location: {
        latitude: this.state.latitude, 
        longitude: this.state.longitude,
      },
    };
    
    axios.post('http://localhost:5000/companies', user)
      .then(res => console.log(res.data));

    window.location = '/companies';
  }

  render () {
    return (
      <div>
        <h3>Create New Company</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Company Code: </label>
            <input type="text"
              required
              className="form-control" 
              value={this.state.companyCode}
              onChange={this.onChangeCompanyCode} 
            />
          </div>
          <div className="form-group">
            <label>Company Name: </label>
            <input type="text"
              required
              className="form-control" 
              value={this.state.companyName}
              onChange={this.onChangeCompanyName} 
            />
          </div>
          <div className="form-group">
            <label>Company Latitude: </label>
            <input type="text"
              required
              className="form-control" 
              value={this.state.latitude}
              onChange={this.onChangeCompanyLatitude} 
            />
          </div>
          <div className="form-group">
            <label>Company Longitude : </label>
            <input type="text" 
              className="form-control" 
              value={this.state.longitude}
              onChange={this.onChangeCompanyLongitude} 
            />
          </div>
          <br/>
          <div className="form-group">
            <input type="submit" value="Create Company" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}