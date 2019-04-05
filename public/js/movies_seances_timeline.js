'use strict';

class MoviesSeancesTimeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cinema_halls: props.cinema_halls,
            movies: props.movies,
            movie_seances: props.movie_seances
        };
    }

    renderCinemaHallTimeline( cinema_hall ) {
        return(
            <div key={`cinema-hall-timeline-${cinema_hall.id}`} className="conf-step__seances-hall">
                <h3 className="conf-step__seances-title">{cinema_hall.title}</h3>
                <div className="conf-step__seances-timeline">
                    {this.state.movie_seances.map(function (movie_seance) {
                        if( movie_seance.cinema_hall_id == cinema_hall.id )
                        {
                            const movie = this.state.movies.getById( movie_seance.movie_id );
                            const width = movie.duration / 2;

                            const time = movie_seance.time.split(":");
                            const left = ( parseInt(time[0]) * 60 + parseInt(time[1]) ) / 2;

                            return (
                                <div
                                    key={`cinema-hall-timeline-seance-${movie_seance.id}`}
                                     className="conf-step__seances-movie"
                                    style={{width: width, backgroundColor: this.props.hexGenerator(movie.id), left: left}}>
                                    <p className="conf-step__seances-movie-title">{movie.name}</p>
                                    <p className="conf-step__seances-movie-start">{movie_seance.time.substr(0, 5)}</p>
                                </div>
                            );
                        }
                        return null;
                    }, this)}
                </div>
            </div>
        );
    }
    
    render() {
        return (
            <div className="conf-step__seances">
                {this.state.cinema_halls.map(this.renderCinemaHallTimeline, this)}
            </div>
        );
    }
}