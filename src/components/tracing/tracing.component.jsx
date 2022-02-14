import axios from 'axios';
import React, { Component } from 'react';

import {Table, Container, Row} from 'react-bootstrap';
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
      places: [
        {latitude: 1.44754, longitude: 125.20691},
        {latitude: -8.71443, longitude: 115.22037},
        {latitude: -7.25669, longitude: 112.6863},
      ],
      productCode: ''
    };
  }
  
  componentDidMount() {
    const { productCode } = this.props.match.params;
    axios.get(`http://tracetales.id:5005/trace/${productCode}`)
      .then(res => {        
        const _stages = res.data['data']['traces'];
        const _places = _stages.map(trace => trace.coordinate);
        this.setState({places: _places, productCode: productCode});
        this.setState({traces: _stages});
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
          <TracingMap defaultZoom={10} places={this.state.places}/>
          <p></p>
          <h1>Product Tracing {this.state.productCode}</h1>
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
          </Table>
          {/* <Nav justify variant="tabs" defaultActiveKey="/trace">
            <Nav.Item>
              <Nav.Link eventKey="Catch">Catch</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Landing">Landing</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Receiving">Receiving</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Cutting">Cutting</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Retouching">Retouching</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Packing">Packing</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/trace">Buyer</Nav.Link>
            </Nav.Item>
          </Nav> */}
        </Row>
      </Container>
      
    );
  }
}