import React, {Component} from 'react';
import {API_URL, API_KEY} from "../../config";
import './Movie.css';
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Spinner from "../elements/Spinner/Spinnder";
import Actor from "../elements/Actor/Actor";

class Movie extends Component {

  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false,
    category: this.props.category
  };

  componentDidMount() {
    this.setState({loading: true});
    const endpoint = `${API_URL}${this.state.category}/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-Us`;
    this.fetchItems(endpoint);
  }

  fetchItems = async endpoint => {
    const result = await (await fetch(endpoint)).json().catch(err => console.error(err));
    if(result.status_code){
      // We dont find any movie
      this.setState({loading: false});
    } else {
      this.setState({movie: result});
      const creditsEndpoint = `${API_URL}${this.state.category}/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
      const creditsResult = await (await fetch(creditsEndpoint)).json().catch(err => console.error(err));
      const directors = creditsResult.crew.filter( member => member.job === 'Director');
      this.setState({
        actors: creditsResult.cast,
        directors,
        loading: false
      })
    }
  };

  render() {
    const {loading, movie, directors, actors, category} = this.state;
    return (
      <div className="rmdb-movie">
        {movie &&
        <div>
          <Navigation movie={this.props.location.movieName} category={category}/>
          <MovieInfo movie={movie} directors={directors}/>
          <MovieInfoBar
            time={movie.runtime}
            budget={movie.budget}
            revenue={movie.revenue}
          />
        </div>}

        {actors &&
          <div className="rmdb-movie-grid">
            <FourColGrid header={'Actors'}>
              {actors.map((actor,i) => (
                <Actor key={i} actor={actor}/>
              ))}
            </FourColGrid>
          </div>}
        {!actors && !loading && <h1>No Movie Found</h1>}
        {loading && <Spinner/>}
      </div>
    );
  }
}

export default Movie;