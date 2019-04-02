import React, {Component} from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE} from "../../config";
import './Home.css';
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Spinner from "../elements/Spinner/Spinnder";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import Buttons from "../elements/Buttons";

class Home extends Component {

  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: '',
    category: this.props.category
  };

  componentDidMount() {
    if(localStorage.getItem('HomeState') &&
      JSON.parse(localStorage.getItem('HomeState')).category === this.state.category
    ){
      const state = JSON.parse(localStorage.getItem('HomeState'));
      this.setState({...state});
    }else {
      this.setState({loading: true});
      const endpoint = `${API_URL}${this.state.category}/popular?api_key=${API_KEY}&language=en-Us&page=1`;
      this.fetchItems(endpoint);
    }
  }

  searchItems = searchTerm => {
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });

    let endpoint = searchTerm === ''
      ? `${API_URL}${this.state.category}/popular?api_key=${API_KEY}&language=en-Us&page=1`
      : `${API_URL}search/${this.state.category}?api_key=${API_KEY}&language=en-Us&query=${searchTerm}`;

    this.fetchItems(endpoint);
  };

  loadMoreItems = () => {
    this.setState({loading: true});

    let endpoint = this.state.searchTerm === ''
      ? `${API_URL}${this.state.category}/popular?api_key=${API_KEY}&language=en-Us&page=${this.state.currentPage + 1}`
      : `${API_URL}search/${this.state.category}?api_key=${API_KEY}&language=en-Us&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;

    this.fetchItems(endpoint);
  };

  fetchItems = async endpoint => {
    const {movies, heroImage, searchTerm} = this.state;

    const result = await (await fetch(endpoint)).json().catch(err => console.error(err));

    this.setState({
      movies: [...movies, ...result.results],
      heroImage: heroImage || result.results[0],
      loading: false,
      currentPage: result.page,
      totalPages: result.total_pages
    }, () => {
      searchTerm === '' && localStorage.setItem('HomeState',JSON.stringify(this.state));
    })
  };

  render() {
    const {heroImage, loading, searchTerm, movies, currentPage, totalPages, category} = this.state;
    return (
      <div className="rmdb-home">

        { this.state.heroImage &&
        <div>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}/${heroImage.backdrop_path}`}
            title={heroImage.original_title}
            text={heroImage.overview}
          />
          <SearchBar callback={this.searchItems}/>
          <Buttons/>

        </div> }
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? 'Search Result' : 'Popular movies'}
            loading={loading}
          >
            {movies.map((element,i) => (
              <MovieThumb
                key={i}
                clickable={true}
                image={element.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${element.poster_path}`
                  : './images/no_image.jpg'}
                movieId={element.id}
                movieName={category === 'movie' ? element.original_title : element.original_name}
                category={category}
              />
            ))}
          </FourColGrid>
          {loading && <Spinner/>}
          {currentPage <= totalPages && !loading && <LoadMoreBtn
            loadMore={this.loadMoreItems} text="Load More"
          />
          }
        </div>
      </div>
    );
  }
}

export default Home;