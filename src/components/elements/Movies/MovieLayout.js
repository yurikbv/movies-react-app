import React from 'react';
import Movie from "../../Movie/Movie";

const MovieLayout = (params) => {
  return (
    <Movie category="movie" {...params}/>
  );
};

export default MovieLayout;
