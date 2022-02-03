import React from "react";
import axios from "axios"
import { Container, Row, Col } from 'reactstrap';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody } from 'reactstrap';
class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        moviesList: ['tt2294629'],
        searchTerm: 'batman'
    }
}

    search = event => {
        event.preventDefault();
        axios
            .get(
                `https://www.omdbapi.com/?apikey=b81336c7&s=${
                    this.state.searchTerm
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                if (!res.Search) {
                    this.setState({ moviesList: [] });
                    return;
                }

                const moviesList = res.Search.map(movie => movie.imdbID);
                this.setState({
                    moviesList
                });
            });
    };

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    render() {
        const mysearch ={
            padding: "10px",
            margin: "auto 20px",
        }
       const search ={
            padding: "9px 26px",
            background: "#3fdb3f",
            color: "#ffffff",
            border: "2px solid #403c3c"
        }
        const { moviesList } = this.state;

        return (
            <div className="mydivvvv">
                <Row className="m-0">
                
                </Row>
               
                    <Col md="12" sm="12">
                    <form onSubmit={this.search}>
                    <input
                    style={mysearch}
                        placeholder="Please Search a movie"
                        onChange={this.handleChange}
                    />
                    <button style={search}type="submit">Search
                        <i className="fa fa-search" />
                    </button>
                </form>
                   { moviesList.map(movie => (
                        <MovieCard movieID={movie} key={movie} />
                    ))
                }
                </Col>
              
            </div>
        );
    }
}

class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
        movieData: {}
    }
}

    componentDidMount() {
        axios
            .get(
                `https://www.omdbapi.com/?apikey=b81336c7&i=${
                    this.props.movieID
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ movieData: res });
            });
    }

    render() {
        const {
            Title,
            Released,
            Genre,
            Plot,
            Poster,
            imdbRating
        } = this.state.movieData;

        if (!Poster || Poster === 'N/A') {
            return null;
        }
        const mystyle = {
            color: "white",
            backgroundColor: "#4f6173",
            padding: "10px",
            margin:"10px",

          };
          const myimg={
              width:"100%",
              height:"275px"
          };
         const cardtext = {
            textalign: "justify",
            fontsize: "16px",
        };
        const cardsubtitle ={
            fontWeight: "600",
        };
        const cardtitle= {
            fontsize: "18px",
            fontweight: "800",
        }
        return (
       <Col md="4" sm="4">
         <CardDeck>
      <Card style={mystyle}>
        <CardImg   style={myimg} src ={Poster} alt="Card image cap" />
        <CardBody className="m-5">
          <CardTitle style={cardtitle}>{Title}</CardTitle>
          <CardSubtitle style={cardsubtitle}>Released Date: {Released}</CardSubtitle>
          <CardText style={cardtext}>{Plot && Plot.substr(0, 100)}</CardText>
         
        </CardBody>
      </Card>
      </CardDeck>
          
            {/* <div className="movie-card-container">
                <div className="image-container">
                    <img src ={Poster}/>
                </div>
                <div className="movie-info">
                    <h2>Movie Details</h2>
                    <div>
                        <h1>{Title}</h1>
                        <small>Released Date: {Released}</small>
                    </div>
                    <h4>Rating: {imdbRating} / 10</h4>
                    <p>{Plot && Plot.substr(0, 350)}</p>
                    <div className="tags-container">
                        {Genre && Genre.split(', ').map(g => <span>{g}</span>)}
                    </div>
                </div>
            </div>
           */}
           </Col>
          
         
        );
    }
}

export default MoviesList;
