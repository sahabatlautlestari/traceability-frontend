import React from 'react';
import {Table, Container, Row} from 'react-bootstrap';
import SimpleMap from './simple-map.component';

export default function Tracing(props) {
  return (
    <Container>
      <Row>
        <SimpleMap/>
        <p></p>
        <h1>Product Tracing</h1>
        <Table>
          <thead>
              <th>Label</th>
              <th>Catch</th>
              <th>Landing</th>
              <th>Receiving</th>
              <th>Cutting</th>
              <th>Retouching</th>
              <th>Packing</th>
              <th>Buyer</th>
          </thead>
          <tbody>
            <tr></tr>
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