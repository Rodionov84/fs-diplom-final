'use strict';

class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cinema_halls: props.cinema_halls,
            movie: props.movie,
            movie_seances: props.movie_seances,
        };
        

    }

    selectSeance()
    {

    }

    renderSeances()
    {
        const cinema_halls_seances = [];

        this.state.cinema_halls.forEach(function(cinema_hall){
            const seances = this.state.movie_seances.filter(function(seance) {
                return seance.cinema_hall_id == cinema_hall.id && this.state.movie.id == seance.movie_id;
            }, this);

            if( seances.length )
            {
                cinema_halls_seances.push(
                    <div key={`seances-cinema_hall-${cinema_hall.id}`} className="movie-seances__hall">
                        <h3 className="movie-seances__hall-title">{cinema_hall.title}</h3>
                        <ul className="movie-seances__list">
                            {seances.map(function(seance) {
                                return (
                                    <li
                                        key={`seances-cinema_hall-${cinema_hall.id}-${seance.id}`}
                                        className="movie-seances__time-block">
                                        <a
                                            className="movie-seances__time"
                                            href="#"
                                            onClick={()=>
                                                this.props.cinema.selectSeance.bind(this.props.cinema)( seance )
                                            }
                                        >
                                            {seance.time.substr(0, 5)}
                                        </a>
                                    </li>
                                );
                            }, this)}
                        </ul>
                    </div>
                );
            }
        }, this);

        return cinema_halls_seances;
    }

    render() {
        let ending = "";
        const duration = this.state.movie.duration;
             
        if (duration % 100 < 11 || duration % 100 > 14) {
            if (duration % 10 == 1)
                ending = "а";
            else if (duration % 10 == 2) 
                ending = "ы";
            else if (duration % 10 == 3) 
                ending = "ы";
            else if (duration % 10 == 4) 
                ending = "ы"; 
        }

        return (
            <section className="movie">
                    <div className="movie__info">
                        <div className="movie__poster">
                            <img className="movie__poster-image" alt={this.state.movie.name} src={this.state.movie.poster} />
                        </div>
                        <div className="movie__description">
                            <h2 className="movie__title">{this.state.movie.name}</h2>
                            <p className="movie__synopsis">{this.state.movie.description}</p>
                            <div className="movie__data">
                                <span className="movie__data-duration"> {duration} минут{ending} </span>                        
                                <span className="movie__data-origin">{this.state.movie.country} </span>
                            </div>
                        </div>
                    </div>
                {this.renderSeances.bind(this)()}
                </section>
        );
    }
}