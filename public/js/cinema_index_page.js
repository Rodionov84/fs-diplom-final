'use strict';

class CinemaIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cinema_halls: this.props.cinema.state.cinema_halls,
            movies: this.props.cinema.state.movies,
            movie_seances: this.props.cinema.state.movie_seances,
        };
    }

    renderMovie(movie)
    {
        return (
            <Movie
                key={`movie-${movie.id}`}
                cinema_halls={this.state.cinema_halls}
                movie={movie}
                movie_seances={this.state.movie_seances}
                cinema={this.props.cinema}
            />
        );
    }

    render()
    {
        return (
            <div>
                <DaysPagination selectDay={this.props.selectDay} cinema={this.props.cinema} />

                <main>
                    {this.state.movies.map(this.renderMovie, this)}
                </main>
            </div>
        );
    }
}