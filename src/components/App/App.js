import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../elements/Header/Header';
import NotFound from "../elements/NotFound/NotFound";
import Movies from "../elements/Movies/Movies";
import MovieLayout from "../elements/Movies/MovieLayout";
import ShowLayout from "../elements/Shows/ShowLayout";
import Shows from "../elements/Shows/Shows";

class App extends React.Component{

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header/>
          <Switch>
            <Route path="/" exact component={Movies}/>
            <Route path="/shows" exact component={Shows}/>
            <Route path="/:movieId" exact component={MovieLayout}/>
            <Route path="/shows/:movieId" exact component={ShowLayout}/>
            <Route component={NotFound}/>
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  };
}


export default App;
