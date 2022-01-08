import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContexts";
import { Link, useHistory } from "react-router-dom";
import { database } from "../../firebase";
import '../Auth/SignUp/SignUp.css';
import Dashboard from "./Dashboard.js";
import { id } from "date-fns/locale";

export default function Add() {
    
    const dep_date = useRef();
    const dep_place = useRef();
    const max_dep_date = useRef();
    const arr_place = useRef();
    const arr_date = useRef();
    const max_arr_date = useRef();
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        const userData = {
            email: emailRef.current.value,
            dep_date: dep_date.current.value,
            dep_place: dep_place.current.value,
            max_dep_date : max_dep_date.current.value,
            arr_place : arr_place.current.value,
            arr_date : arr_date.current.value,
            max_arr_date :max_arr_date.current.value,
            id :id.current.value
            
        }
        database.ref('materii').push(userData);
    
    }

    return (
        <>
            <Card id='card-container-signup'>
                <Card.Body>
                    <h2 className="text-center mb-4">Transport Request</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                    <Form.Group id="id">
                            <Form.Label>Nume</Form.Label>
                            <Form.Control type="id" ref={id} required />
                        </Form.Group>
                    <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="dep_date">
                            <Form.Label>Departure Date</Form.Label>
                            <Form.Control type="dep_date" ref={dep_date} required />
                        </Form.Group>

                        <Form.Group id="dep_place">
                            <Form.Label>Departure Place</Form.Label>
                            <Form.Select ref={dep_place} required>
                                <option>Select option</option>
                                <option>Bucharest</option>
                                <option>Cluj</option>
                                <option>Brasov</option>
                                <option>Iasi</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group id="max_dep_date">
                            <Form.Label>Maximum Departure Date</Form.Label>
                            <Form.Control type="max_dep_date" ref={max_dep_date} required />
                        </Form.Group>
                        <Form.Group id="arr_place">
                            <Form.Label>Arrival Place</Form.Label>
                            <Form.Select ref={arr_place} required>
                                <option>Select option</option>
                                <option>Bucharest</option>
                                <option>Cluj</option>
                                <option>Brasov</option>
                                <option>Iasi</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group id="arr_date">
                            <Form.Label>Arrival Date</Form.Label>
                            <Form.Control type="arr_date" ref={arr_date} required />
                        </Form.Group>
                        <Form.Group id="max_arr_date">
                            <Form.Label>Maximum Arrival Date</Form.Label>
                            <Form.Control type="max_arr_date" ref={max_arr_date} required />
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