import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContexts";
import { Link, useHistory } from "react-router-dom";
import { database } from "../../firebase";
import '../Auth/SignUp/SignUp.css';
import Dashboard from "./Dashboard.js";
import { id } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Add() {
    const [deptDate, setStartDate] = useState();
    const [maxDeptDate, setmaxDeptDate] = useState();
    const [arrDate, setarrDate] = useState();
    const [maxArrDate, setmaxArrDate] = useState();
    let dep_date ;
    const dep_place = useRef();
    let max_dep_date;
    const arr_place = useRef();
    let arr_date;
    let max_arr_date;
    const material = useRef("");
    
    const emailRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        {dep_date = JSON.stringify(deptDate).substring(1,11)}
        {max_dep_date = JSON.stringify(maxDeptDate).substring(1,11)}
        {arr_date = JSON.stringify(arrDate).substring(1,11)}
        {max_arr_date = JSON.stringify(maxArrDate).substring(1,11)}
        database.ref('materii').push({
            email: emailRef.current.value,
            dep_date:  dep_date,
            dep_place: dep_place.current.value,
            max_dep_date : max_dep_date,
            arr_place : arr_place.current.value,
            arr_date : arr_date,
            max_arr_date :max_arr_date,
            id :id.current.value,
            material : material.current.value,
            
        });
    
    }
    let materialsList = [];
    let materialsNameList = [];
    const materialsRefs = database.ref('materials');

    materialsRefs.on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            materialsNameList.push(childData);
            console.log(childData);
        });
    }); 
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
                            <DatePicker type="dep_date" selected={deptDate} dateFormat="dd-MM-yyyy" onChange={(date) => setStartDate(date)}  />
                            
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
                            <DatePicker type="max_dep_date" selected={maxDeptDate} dateFormat="dd-MM-yyyy" onChange={(date) => setmaxDeptDate(date)}  />
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
                            <DatePicker type="arr_date" selected={arrDate} dateFormat="dd-MM-yyyy" onChange={(date) => setarrDate(date)}  />
                        </Form.Group>
                        <Form.Group id="max_arr_date">
                            <Form.Label>Maximum Arrival Date</Form.Label>
                            <DatePicker type="max_arr_date" selected={maxArrDate} dateFormat="dd-MM-yyyy" onChange={(date) => setmaxArrDate(date)}  />
                        </Form.Group>
                        <Form.Group id="material">
                            <Form.Label>Material</Form.Label>
                            <Form.Select ref={material} required>
                                <option>Select option</option>
                                {materialsNameList.map((val) => <option value={val.name}>{val.name}</option>)}
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