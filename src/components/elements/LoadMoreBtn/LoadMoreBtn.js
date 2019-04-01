import React from 'react';
import './LoadMoreBtn.css';

const LoadMoreBtn = (props) => {

  return (
    <div className="rmdb-loadmorebtn" onClick={props.loadMore}>
      <p>{props.text}</p>
    </div>
  );
};

export default LoadMoreBtn;
