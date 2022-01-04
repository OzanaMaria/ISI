import React, { Component} from 'react';
import Card from '../Card/Card';
import img1 from './react-logo.png';
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import { database, auth } from "../../firebase";
import './Dashboard.css'
import { Link, useHistory } from "react-router-dom";
import SearchBar from './SearchBar';
class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            email: ""
        }
    }

    async componentDidMount() {
        let coursesList = [];
        const subjectsRefs = database.ref('transpOffer');
        const clientsOfferRefs = database.ref('materii');
        const email = auth.currentUser.email;

        if(CheckIfUserIsStudent(email)) {
            let studentCoursesList = [];
            const studentRefs = database.ref('students');

            await subjectsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const nume = childData.name;
                    console.log(childData);
                    
                        coursesList.push(childData);
                    
                });

                this.setState({ courses : coursesList, email: email });
            });
        } else {
            let profCoursesList = [];
            const profRefs = database.ref('professors');

            await profRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();

                    if(childData.email === email) {
                        profCoursesList.push.apply(profCoursesList, childData.courses);  
                    }
                });
            });
            await clientsOfferRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const nume = childData.name;
                    coursesList.push(childData);
                    
                });

                this.setState({ courses : coursesList, email: email  });
            });
        }
    }

    render(){
        return(
            <div>
                {   
                    this.state.courses.length ? 
                    
                    (<div>
                        {!CheckIfUserIsStudent(this.state.email) && <SearchBar></SearchBar>}
                        <div className="container-fluid d-flex justify-content-center">
                            <div className="row" id="courses">
                                {
                                    this.state.courses.map(course => (
                                        <div className="col-md-4">
                                            <Card imgsrc={img1} course={course}/>
                                           
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {CheckIfUserIsStudent(this.state.email) && <Link to="/addRequest">Add Transport Request</Link>}
                        {!CheckIfUserIsStudent(this.state.email) && <Link to="/addOffer">Add Transport Offer</Link>}
                    </div>)
                    :     
                    (<div className="card text-center shadow">
                        <div className="card-body text-dark">
                            <h4 className="card-title">Nu exista oferte</h4>
                            <p className="card-text text-secondary">
                                Va rugam reveniti mai tarziu
                            </p>
                        </div>
                    </div>)
                }
            </div>
        );
    }
}

export default Dashboard;