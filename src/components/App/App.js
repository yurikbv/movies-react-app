import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import NotFound from "../elements/NotFound/NotFound";
import Movie from "../Movie/Movie";

class App extends React.Component{

  state = {
    category: 'movie'
  };

  setCategory = category => {
    if(category !== this.state.category){
      localStorage.setItem('HomeState','');
      this.setState({category});
    }
  };

  render() {

    const {category} = this.state;

    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            <Route path="/" exact render={ props => (<Home
              {...props}
              category={category}
              setCategory={this.setCategory}
            />)}/>
            <Route path="/:movieId" exact render={props => (<Movie
              {...props}
              category={category}/>)}/>
            <Route component={NotFound}/>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  };
}


export default App;
