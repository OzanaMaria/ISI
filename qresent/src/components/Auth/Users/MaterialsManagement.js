import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import firebase from 'firebase/compat/app'
import { database } from "../../../firebase";
import { useHistory } from "react-router-dom";
import './../SignUp/SignUp.css';
import './Users.css'
import { CheckIfUserIsStudent } from '../../../utils/utils.js';

export default function MaterialsManagement() {
    const nameRef = useRef();
    const emailRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    
    function handleSubmit(e) {
        e.preventDefault()

        const userData = {
            courses: [],
            name: nameRef.current.value
        }

        {
            database.ref('materials').push(userData);
        }

        try {
            setError("");
            setLoading(true);
            history.push("/admin")
        } catch(e) {
            setError(e.message);
        }

        setLoading(false);
    }

    function redirectToPage() {
        history.push("/admin")
    }

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Card id='card-container-signup'>
                <Card.Title style={{"marginBottom": -30, "marginTop": 20}}>Add material</Card.Title>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" ref={nameRef} required />
                        </Form.Group>
            
                        <div className="row">
                            <Button className="col-md mr-3 ml-4 users-button" disabled={loading} variant="primary" type="submit">
                                Add new material
                            </Button>
                            <Button className="col-md mr-3 ml-4 users-button" variant="primary" onClick={redirectToPage}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}