import React from 'react';
import PropTypes from 'prop-types';
import './FourColGrid.css';

const FourColGrid = (props) => {

  const renderElements = () => props.children.map((element, i) => (
      <div key={i} className="rmdb-grid-element">
        {element}
      </div>
    ));

  return (
    <div className="rmdb-grid">
      {props.header && !props.loading && <h1>{props.header}</h1>}
      <div className="rmdb-grid-content">
        {renderElements()}
      </div>
    </div>
  );
};

FourColGrid.propTypes = {
  header: PropTypes.string,
  loading: PropTypes.bool
};

export default FourColGrid;
