import React, { Component} from 'react';
import Card from '../Card/Card';
import img1 from './react-logo.png';
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import { database, auth } from "../../firebase";
import './Dashboard.css'
import { Link, useHistory } from "react-router-dom";
import SearchBar from './SearchBar';
import AddContract from './AddContract';
import { Form } from "react-bootstrap";

let groupRef = 1;
let group = "";
class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            email: "",
            searchTerm: ""
            
        }
    }
    
    async setVal(e){
        if(e.target.value == 1){
            groupRef = 1;
        }
        else if(e.target.value == 2){
            groupRef = 2;
        }
        else if(e.target.value == 3){
            groupRef = 3;
        }
    }

    async componentDidMount() {
        let coursesList = [];
        const subjectsRefs = database.ref('transpOffer');
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
                        {!CheckIfUserIsStudent(this.state.email) && <SearchBar/>}
                        <Form>
                        <Form.Group id="group">
                            <Form.Select ref={group} onChange={this.setVal} required>
                                <option value = "1">email</option>
                                <option value = "2">Arrival date</option>
                                <option value = "3">Arrival place</option>
                            </Form.Select>
                        </Form.Group>
                        </Form>
                        <div className="container-fluid d-flex justify-content-center">
                            <div className="row" id="courses">
                                {
                                    this.state.courses.filter(val=> {
                                         if(this.state.searchTerm ==" "){
                                            return val 
                                         }
                                        else{
                                            if(groupRef == 1){
                                                if(val.email?.includes(this.state.searchTerm)){
                                                    //console.log(this.state.searchTerm.search);
                                                    return val
                                                }
                                            }else if(groupRef == 2){
                                                if(val.arr_date?.includes(this.state.searchTerm)){
                                                    //console.log(this.state.searchTerm.search);
                                                    return val
                                                }
                                            }else if(groupRef == 3){
                                                if(val.arr_place?.includes(this.state.searchTerm)){
                                                    //console.log(this.state.searchTerm.search);
                                                    return val
                                                }
                                            }
                                        }
                                    }).map(course => (
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
                        {CheckIfUserIsStudent(this.state.email) && <Link to="/addRequest">Add Transport Request</Link>}
                        {!CheckIfUserIsStudent(this.state.email) && <Link to="/addOffer">Add Transport Offer</Link>}
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