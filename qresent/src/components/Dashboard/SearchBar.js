import React, { Component} from 'react';
import { database, auth } from "../../firebase";
import './SearchBar.css';
import app from "../../firebase.js"
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
const db = app.database(); 


function SearchBar(){

    const [searchTerm, setSearchTerm] = useState('');
    const SearchBarDropdown = (props) =>{
        return(
        <div className='search-bar-dropdown'> 
            <input type="text" className="form-control" placeholder="Search"/>
            <ul className="list-group">
                <button type="button" className="list-group-item list-group-item-action">Vestibulum at eros</button>
            </ul>
        </div>);
    };
    return (
        <>
         <div className='SearchBar container mt-2 mb-3'>
            <input type="text" placeholder="Search Contacts" className="prompt"
            onChange={(event) => {
                setSearchTerm(event.target.value);
               // console.log(searchTerm);
              // searchTerm =
              if(searchTerm!="")
                db.ref("search").child('-Ms_mawlSAPNdVeXvEnJ').update({'searchWord':searchTerm});
            }}/>
            
            <i className="search icon"></i>
        </div>  
        </>
    )
}
export default SearchBar;

