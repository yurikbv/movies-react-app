import React, {Component} from 'react';
import {Button, Segment} from "semantic-ui-react";

class Buttons extends Component {

  state = {
    currentButton: 1
  };

  handleClick = (category,currentButton) => {
    currentButton !== this.state.currentButton && this.setState({currentButton});
    this.props.setCategory(category);
  };

  render() {
    const {currentButton} = this.state;

    return (
      <Segment>
        <Button.Group className="category-buttons">
          <Button
            size="large"
            color="green"
            disabled={currentButton === 1}
            onClick={() => this.handleClick('movie',1)}
          >Movies
          </Button>
          <Button
            size="large"
            color="green"
            disabled={currentButton === 2}
            onClick={() => this.handleClick('tv',2)}
          >TV Shows
          </Button>
        </Button.Group>
      </Segment>
    );
  }
}

export default Buttons;