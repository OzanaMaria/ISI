import React, { Component} from 'react';
import { database, auth } from "../../firebase";
import './SearchBar.css';
import { Link, useHistory } from "react-router-dom";
export default function SearchBar(){
    
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
            <h1>Search Bar</h1>
            <SearchBarDropdown/>     
        </div>  
        </>
    )
}
