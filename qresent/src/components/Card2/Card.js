import React from 'react';
import { Link } from "react-router-dom";
import './Card.css';

const Card = props => {

  return(
    <div className="card text-center shadow">
      <div className="overflow">
        <img src={props.imgsrc} alt="Image 1" className='card-img-top'/>
      </div>
      {console.log("cardcontract")}
      <div className="card-body text-dark">
        <h4 className="card-title">{ props.course.id }</h4>
        <p className="card-text text-secondary">
          Titular curs: { props.course.email }
        </p>
        <p className="card-text text-secondary">
          Departure time: { props.course.dep_date }
        </p>
        <Link className="btn btn-outline-success" to={{pathname: `/subject2/${props.course.id}`}}> More info </Link>
      </div>
    </div>
  );
}
  
export default Card;