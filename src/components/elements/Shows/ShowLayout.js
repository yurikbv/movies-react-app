import React from 'react';
import Movie from "../../Movie/Movie";

const ShowLayout = (params) => {
  return (
    <Movie category="tv" {...params}/>
  );
};

export default ShowLayout;
