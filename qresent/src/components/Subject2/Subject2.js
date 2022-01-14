import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Subject2.css";
import { database, auth } from "../../firebase";
import Popup from "../Popup/Popup";
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import { Link } from "react-router-dom";
import AttendancePDF from "../AttendancePDF/AttendancePDF.js";
import { PDFDownloadLink } from '@react-pdf/renderer';
import EditProfile from "./EditProfile";
import { format } from "date-fns";

const GENERATE_QR_OPTION = "GenerateQR";
const STATISTICS_OPTION = "Statistics";
let ver = false;
class Subject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCourse: {},
      email: "",
      isOpen: false,
      time: "",
      optionChosen: "",
      attendance: [],
    }
  }
  

  async componentDidMount() {
    const refs = database.ref('contract');
    const email = auth.currentUser.email;
    
    await refs.on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        console.log("aici");
        const childData = childSnapshot.val();
        console.log(childData);
        if(childData.id=== this.props.match.params.id) {
          console.log(childData);

          this.setState({ currentCourse : childData, email: email});
          this.setState({materieKey : childSnapshot.key});
        }
        
        
      });
    });
  }


  render() {
    let keys;

    if(this.state.currentCourse.scores) {
      keys = Object.keys(this.state.currentCourse.scores);
    }
    
    return (
      <div className="container">
        <div className="container d-flex justify-content-center">
          <div className="row" id="descriptionSubject">
            <div className="col-md-8">
              <div className="row">
                <h3>Contractul {this.state.currentCourse.id}</h3>
              </div>

              <div className="row">
                <h3>General Info</h3>
                <div>
                Email Transporter: {this.state.currentCourse.email_transportator}
                </div>
                <div>
                Email Client : {this.state.currentCourse.email_client}
                </div>
                <div>
                Arrival Date : {this.state.currentCourse.arr_date}
                </div>
                <div>
                Arrival Place : {this.state.currentCourse.arr_place}
                </div>
                <div>
                Maxim Arrival Date : {this.state.currentCourse.max_arr_date}
                </div>
                <div>
                Departure Date : {this.state.currentCourse.dep_date}
                </div>
                <div>
                Departure Place : {this.state.currentCourse.dep_place}
                </div>
                <div>
                Maxim Departure Date : {this.state.currentCourse.max_dep_date}
                </div>
                
              </div>
            </div>
            <Link style={{textDecoration: "none", color: "#ffffff", width: "50%"}} to={{pathname: '/ShowMap'}}>
                  <Button className="col-md" variant="dark">See where your package is!</Button>
            </Link>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Subject;