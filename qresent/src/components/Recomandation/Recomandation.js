import React, { Component} from 'react';
import Card2 from '../Card2/Card';
import img1 from '../Dashboard/react-logo.png';
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import { database, auth } from "../../firebase";
import '../Dashboard/Dashboard.css';
import { Link, useHistory } from "react-router-dom";

class Recomandation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            email: "",
            searchTerm: "",
        }
    }
    
    
    async componentDidMount() {
        let coursesList = [];
        
        const recomandationClient = database.ref('transpOffer');
        const recomandationTransp = database.ref('materii');
        const email = auth.currentUser.email;
        let profCoursesList = [];
        let searchL = "";

        if(CheckIfUserIsStudent(email)) {
            let studentCoursesList = [];
            

            await recomandationClient.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    if(childData.arr_place === "Pitesti"){
                        coursesList.push(childData);
                    }
                    
                });

                this.setState({ courses : coursesList, email: email });
            });
        } else {
            
            
            await recomandationTransp.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    
                    if(childData.arr_place === "Buzau") {
                        profCoursesList.push(childData);  
                    }
                });
                this.setState({ courses : profCoursesList, email: email });
            });
            
        }
    }
    render(){
        return(
            <div>
                {
                    this.state.courses.length ? 
                    (<div>
                        <div className="container-fluid d-flex justify-content-center">
                            <div className="row" id="courses">
                                {
                                    this.state.courses.map(course => (
                                        <div className="col-md-4">
                                            <Card2 imgsrc={img1} course={course}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        
                    </div>)
                    :     
                    (<div className="card text-center shadow">
                        <div className="card-body text-dark">
                            <h4 className="card-title">You don't have any recomandations!</h4>
                            <p className="card-text text-secondary">
                                Pls come back later!
                            </p>
                        </div>
                    </div>)
                }
            </div>
        );
    }
}

export default Recomandation;