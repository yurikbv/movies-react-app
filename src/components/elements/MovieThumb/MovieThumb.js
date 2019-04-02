import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './MovieThumb.css';

const MovieThumb = ({clickable, image, movieId, movieName, category}) => {
  return (
    <div className="rmdb-moviethumb">
      {clickable ?
        <Link to={{pathname: category === 'movie' ? `/${movieId}` : `/shows/${movieId}`, movieName}}>
          <img src={image} alt="moviethumb"/>
        </Link>
        : <img src={image} alt="moviethumb"/>}
    </div>
  );
};

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string,
  clickable: PropTypes.bool
};

export default MovieThumb;
