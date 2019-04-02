import React from 'react';
import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = ({movie, category}) => {

  let path = category === 'movie' ? '/' : '/shows/' ;
  return (

    <div className="rmdb-navigation">
      <div className="rmdb-navigation-content">
        <Link to={path}>
          <p>Home</p>
        </Link>
        <p>/</p>
        <p>{movie}</p>
      </div>
    </div>
  );
};

export default Navigation;
