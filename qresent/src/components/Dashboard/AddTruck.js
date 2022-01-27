import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContexts";
import { Link, useHistory } from "react-router-dom";
import { database } from "../../firebase";
import '../Auth/SignUp/SignUp.css';
import { id } from "date-fns/locale";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddOffer() {
    
    const status = useRef();
    const trucktype = useRef();
    const emailRef = useRef();
    const nameRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        const userData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            trucktype : trucktype.current.value,
            status : status.current.value,
        }
        database.ref('trucks').push(userData);
    
    }

    return (
        <>
            <Card id='card-container-signup'>
                <Card.Body>
                    <h2 className="text-center mb-4">New Truck</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                    <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" ref={nameRef} required />
                        </Form.Group>
                    <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="trucktype">
                            <Form.Label>Truck type</Form.Label>
                            <Form.Select ref={trucktype} required>
                                <option>Select option</option>
                                <option>Toyota Tacoma</option>
                                <option>GMC Sierra 1500</option>
                                <option>Chevrolet Colorado</option>
                                <option>Ford F-250</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group id="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select ref={status} required>
                            <option>Select option</option>
                            <option>Empty</option>
                            <option>Full</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Button onClick = {history.goBack} disabled={loading} className="w-100 auth-button" type="submit">
                            Submit request!
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}