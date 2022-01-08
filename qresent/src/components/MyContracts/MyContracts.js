import React, { Component} from 'react';
import Card2 from '../Card2/Card';
import img1 from '../Dashboard/react-logo.png';
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import { database, auth } from "../../firebase";
import '../Dashboard/Dashboard.css';
import { Link, useHistory } from "react-router-dom";

class MyContracts extends Component{
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
        
        const contractsRefs = database.ref('contract');
        const clientsOfferRefs = database.ref('materii');
        const email = auth.currentUser.email;
        let profCoursesList = [];
        let searchL = "";

        if(CheckIfUserIsStudent(email)) {
            console.log('aici');
            let studentCoursesList = [];
            

            await contractsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    console.log('aici');
                    
                    console.log(childData.email_client);
                    console.log(email);
                    if(childData.email_client === email){
                        coursesList.push(childData);
                    }
                    
                });

                this.setState({ courses : coursesList, email: email });
            });
        } else {
            
            
            const searchword = database.ref('search');
            await contractsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    
                    if(childData.email_transportator === email) {
                        console.log(childData);
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
                            <h4 className="card-title">Nu sunteti inrolat inca la niciun curs</h4>
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

export default MyContracts;