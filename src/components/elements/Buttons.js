import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Buttons.css';
import {Button, Segment} from "semantic-ui-react";

class Buttons extends Component {

  handleClick = () => {
    localStorage.setItem('HomeState','');
  };

  render() {

    return (
      <Segment inverted>
        <Button.Group style={{background: '#21ba45'}}>
          <Link to="/" onClick={this.handleClick}>
            <Button color="green">Movie</Button>
          </Link>
          <Link to="/shows" onClick={this.handleClick}>
            <Button color="green" >TV Shows</Button>
          </Link>
        </Button.Group>
      </Segment>
    );
  }
}

export default Buttons;