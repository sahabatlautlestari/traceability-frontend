import axios from 'axios';
import React, { Component } from 'react';

import {Table, Container, Row} from 'react-bootstrap';
import NotFound from './not-found.component';
import TracingMap from './tracing-map.component';

const Trace = props => {
  const dateIn = new Date(props.trace.datein);
  return <tr>
    <td>{props.trace.no}</td>
    <td>{props.trace.stage}</td>
    <td>{props.trace.id}</td>
    <td>{props.trace.product}</td>
    <td>{dateIn.toLocaleDateString()} {dateIn.toLocaleTimeString()}</td>
    <td>{props.trace.location}</td>
    <td>{props.trace.weight}</td>
    <td>{props.trace.subject}</td>
    <td>{props.trace.note}</td>
  </tr>
}

export default class Tracing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      traces: [], 
      places: [],
      labels: [],
      productCode: '',
    };
  }
  
  componentDidMount() {
    const { productCode } = this.props.match.params;
    let _stages;
    let _places;
    let _labels;
    axios.get(`https://tracetales.id:5005/trace/${productCode}`)
      .then(res => {
        console.log(productCode);
        if(res.data['data']['traces'].length > 0) {
          _stages = res.data['data']['traces'];
          _places = _stages.map(trace => trace.coordinate);
          _labels = _stages.map(trace => trace.stage);
        }
        this.setState({traces: _stages, places: _places, productCode: productCode, labels: _labels});
      })
      .catch(err => {
        console.log(err);
      });
  }

  StageList() {
    return this.state.traces.map(currentStage => {
      return <Trace trace={currentStage}
        key={currentStage.no} />;
    })
  }

  render() {    
    return (
      <Container>
        <Row>
          {this.state.places.length > 0 ? <h1>Product Tracing {this.state.productCode}</h1> : <NotFound/>}
          {this.state.places.length > 0 && 
          <Table>
            <thead>
                <th>#</th>
                <th>Stage</th>
                <th>Process Id</th>
                <th>Product</th>
                <th>Process Date</th>
                <th>Location/Destination</th>
                <th>Weight</th>
                <th>Subject</th>
                <th>Note</th>
            </thead>
            <tbody>
              {
                this.StageList()
              }
            </tbody>
          </Table>}
          <p></p>
          {this.state.places.length > 0 && <TracingMap defaultZoom={5} places={this.state.places} labels={this.state.labels}/>}
        </Row>
      </Container>
      
    );
  }
}