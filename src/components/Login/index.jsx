import React from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import LoginForm from './LoginForm';

export default function Login () {
  return (
    <Container className="vh-80">
      <Row className="pt-5 justify-content-center">
        <Col lg="5">
          <Card className="mb-5">
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
