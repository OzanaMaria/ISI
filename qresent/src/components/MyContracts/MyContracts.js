import React, { Component} from 'react';
import Card from '../Card/Card';
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
        const subjectsRefs = database.ref('contracte');
        const contractsRefs = database.ref('contracte');
        const clientsOfferRefs = database.ref('materii');
        const email = auth.currentUser.email;
        let profCoursesList = [];
        let searchL = "";

        if(CheckIfUserIsStudent(email)) {
            let studentCoursesList = [];
            const studentRefs = database.ref('students');

            await subjectsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const nume = childData.name;
                  //  console.log(childData);
                    
                        coursesList.push(childData);
                    
                });

                this.setState({ courses : coursesList, email: email });
            });
        } else {
            
            const profRefs = database.ref('professors');
            const searchword = database.ref('search');
            await profRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();

                    if(childData.email_transportator === email) {
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
            await searchword.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    
                    searchL = childData.searchWord;
                    console.log( searchL);
                    
                });

                this.setState({ searchTerm : searchL});
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
                            <div className="row" id="courses">stai o sec
                                {
                                    this.state.courses.filter(val=> {
                                         if(this.state.searchTerm ==" "){
                                            return val 
                                         }
                                        else
                                         if(val.email?.includes(this.state.searchTerm)){
                                            //console.log(this.state.searchTerm.search);
                                            return val
                                        }
                                    }).map(course => (
                                        <div className="col-md-4">
                                            <Card imgsrc={img1} course={course}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
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

export default MyContracts;