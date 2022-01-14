import React from 'react';
import { database } from "../../firebase";
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const Table2 = props => {
  const student = props.student;

  function changeUserStatus() {
    let Refs = "";
    let entry = "";
    
    Refs = database.ref('materials');

      Refs.on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            if(childData.name === student.name) {
              entry = childSnapshot.key;
            }
        });
      });
      database.ref('/materials').child(entry).remove();
      console.log("deleted" + database.ref('/materials').child(entry).name);
      window.location.reload(false);
  }

  return(
       <tr>
          <th scope="row"> </th>
          <td>{props.student.name}</td>
          <td>
            {
              <Button className="btn-outline-danger mr-1 ml-3"  variant="outline-danger" onClick={() => changeUserStatus()}>Delete material</Button>
            }
          </td>
        </tr> 
  );
}
  
export default Table2;