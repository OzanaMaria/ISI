import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Subject.css";
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
      attendance: []
    }
  }
  
  togglePopupQr = (e, option) => {
    this.setState({ isOpen: !this.state.isOpen });
    this.setState({ time: Math.floor(new Date().getTime() / 1000) });
    this.setState({ optionChosen: option });
  }

  addContract = (e) => {
    // const refs = database.ref('contract');
    // console.log(this.state.materieKey);
    // refs.child(this.state.materieKey).push(this.state.email, this.state.currentCourse.arr_date);
    ver = true;
  }

  async componentDidMount() {
    const refs = database.ref('materii');
    const refs2 = database.ref('transpOffer');
    const email = auth.currentUser.email;
    const refscont = database.ref('contract');
    console.log(email);
    if(!CheckIfUserIsStudent(email)){
    await refs.on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();

        if(childData.id === this.props.match.params.id) {
          this.setState({ currentCourse : childData, email: email});
          this.setState({materieKey : childSnapshot.key});
        }
        console.log(ver);
        if(ver){
          console.log(childSnapshot.key);
          refscont.push({'id': childData.id,   
                        'email_client':childData.email, 
                        'email_transportator':email,
                        'arr_date':childData.arr_date,
                        'arr_place':childData.arr_place,
                        'dep_date':childData.dep_date, 
                        'dep_place':childData.dep_place, 
                        'max_arr_date':childData.max_arr_date,
                        'max_dep_date':childData.max_dep_date});
          
          ver = false;
          refs.child(childSnapshot.key).remove();
          
        }
      });
    });
  }else{
    await refs2.on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();
       // console.log(childData.id);
        console.log(this.props.match.params.id);
        if(childData.id === this.props.match.params.id) {
          this.setState({ currentCourse : childData, email: email});
          this.setState({materieKey : childSnapshot.key});
        }
        console.log( childData);
        if(ver){
          console.log(childSnapshot.key);
          refscont.push({'id':childData.id, 
                        'email_client':email, 
                        'email_transportator':childData.email, 
                        'arr_date':childData.arr_date,
                        'arr_place':childData.arr_place, 
                        'dep_date':childData.dep_date, 
                        'dep_place':childData.dep_place, 
                        'max_arr_date':childData.max_arr_date,
                        'max_dep_date':childData.max_dep_date});
          
          ver = false;
          refs2.child(childSnapshot.key).remove();
        }
      });
    });
  }
   
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
                <h3>Oferta {this.state.currentCourse.id}</h3>
                <div>
                  {this.state.currentCourse.general_info}
                </div>
              </div>

              <div className="row">
                <h3>Informatii generale</h3>
                <div>
                Email : {this.state.email}
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
            <div className="container buttons-section">
          <div className="row">
           

            <Link style={{textDecoration: "none", color: "#ffffff", width: "50%"}} to={{pathname: `/#`}}>
              <Button className="col-auto subject-button" variant="dark" onClick={(e) => this.addContract(e)}>Contract</Button>
            </Link>
            
          </div>
        </div>

        
           

          </div>
        </div>
      </div>
    );
  }
}

export default Subject;