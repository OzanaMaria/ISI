import React, { Component} from 'react';
import Table from './Table.js';
import { database } from "../../firebase";
import { Link } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';
import Table2 from './Table2.js';

class AdminDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            studentList: [],
            teachersList: [],
            materialsList: []
        }
    }

    async componentDidMount() {
        let teachersNameList = [];
        const teachersRefs = database.ref('professors');
        let studentNameList = [];
        const studentRefs = database.ref('students');
        let materialsNameList = [];
        const materialsRefs = database.ref('materials');
        await studentRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                studentNameList.push(childData);
            });
            this.setState({ studentList : studentNameList});
        });

        await teachersRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                teachersNameList.push(childData);
            });
            this.setState({ teachersList : teachersNameList});
        }); 

        await materialsRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                materialsNameList.push(childData);
            });
            this.setState({ materialsList : materialsNameList});
        }); 
    }

    render(){
        return (
            <> 
            <div className="container buttons-section users-management">
                    <div className="row">
                        <Link className="btn btn-outline-success col-md mr-5 ml-6" to={{pathname: "/addStudent"}}> Add client </Link>
                        <Link className="btn btn-outline-success col-md mr-5 ml-6" to={{pathname: "/addTeacher"}}> Add transporter </Link>
                        <Link className="btn btn-outline-success col-md mr-5 ml-6" to={{pathname: "/addMaterial"}}> Add material </Link>
                    </div>
            </div>  
            <div className="container mt-5">
            <Tabs defaultActiveKey="students" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="students" title="Clients">
                    {this.state.studentList.length &&
                        <table className="table" > 
                        <thead style={{backgroundColor: "rgba(33, 37, 41)", color: "white"}}>
                            <th></th>
                            <th scope="col">Nume</th>
                            <th scope="col">Email</th>
                            <th scope="col">Operatii tabel</th>
                        </thead>
                        <tbody>
                            {
                                this.state.studentList.map(student => (
                                    <Table student={student}/>
                                ))
                            }
                        </tbody>
                        </table>
                    }
                </Tab>
                <Tab eventKey="teachers" title="Transporters">
                    {this.state.teachersList.length &&
                    
                    <table className="table" > 
                    <thead style={{backgroundColor: "rgba(33, 37, 41)", color: "white"}}>
                        <th></th>
                        <th scope="col">Nume</th>
                        <th scope="col">Email</th>
                        <th scope="col">Operatii tabel</th>
                    </thead>
                    <tbody>
                        {
                            this.state.teachersList.map(student => (
                                <Table student={student}/>
                            ))
                        }
                    </tbody>
                    </table>
                }
                </Tab>
                <Tab eventKey="materials" title="Materials">
                    {this.state.materialsList.length &&
                    
                    <table className="table" > 
                    <thead style={{backgroundColor: "rgba(33, 37, 41)", color: "white"}}>
                        <th></th>
                        <th scope="col">Nume</th>
                    </thead>
                    <tbody>
                        {
                            this.state.materialsList.map(student => (
                                <Table2 student={student}/>
                            ))
                        }
                    </tbody>
                    </table>
                }
                </Tab>
            </Tabs>
            </div>
            </>
        );
    }
}

export default AdminDashboard;