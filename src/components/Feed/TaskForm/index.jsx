import React, { useState } from 'react';
import { Alert, Card, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { createTask, fetchTasks } from '../../../redux/todo';

export default function TaskForm() {
  const initialForm = {
    email: '',
    name: '',
    text: '',
  };
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState(false);
  const [form, setForm] = useState(initialForm);
  const dispatch = useDispatch();

  const validateForm = () => {
    if (!form.email.trim().length || !form.name.trim().length || !form.text.trim().length) {
      setErrorMessage('All fields are required');
      return false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
      setErrorMessage('Invalid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(false);
    if (validateForm()) {
      await dispatch(createTask(form));
      await dispatch(fetchTasks());
      setErrorMessage(null);
      setSuccessMessage(true);
      setForm(initialForm);
    }
  };

  const changeHandler = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Card className="mb-5">
      <Card.Header>Create a new task</Card.Header>
      <Card.Body>
        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="info" onClose={() => setSuccessMessage(null)} dismissible>
            The task was successfully added
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="pt-2 pb-2">
            <Form.Control
              value={form.name}
              name="name"
              type="text"
              placeholder="Enter name"
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="pt-2 pb-2">
            <Form.Control
              value={form.email}
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="pt-2 pb-2">
            <Form.Control
              value={form.text}
              as="textarea"
              name="text"
              placeholder="Enter task text"
              onChange={changeHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
