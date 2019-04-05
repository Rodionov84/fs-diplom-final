'use strict';

class MoviesEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cinema_halls: props.cinema_halls,
            movies: props.movies,
            movie_seances: props.movie_seances,

            isActiveMovieForm: false,
            movieForm_name: "",
            movieForm_description: "",
            movieForm_duration: "",
            movieForm_country: "",
            movieForm_poster: "",
            movieForm_seance_cinema_hall: "",
            movieForm_seance_time: "",
            movieForm_seances: []
        };
    }

    add() {
        if( this.state.movieForm_name == "" ||
            this.state.movieForm_duration == "" ||
            this.state.movieForm_description == "" ||
            this.state.movieForm_country == "" ||
            this.state.movieForm_poster == ""
        )
        {
            return;
        }

        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function(){
            const response = JSON.parse(this.responseText);
            if( response != undefined && response.movie != undefined && response.movie.id != undefined )
            {
                self.state.movies.push(response.movie);
                self.state.movie_seances.pushArray(response.seances);
                self.setState({isActiveMovieForm: false});
            }
        });
        xhr.open("POST", "/api/movies/add");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader("Authorization", "Bearer " + this.props.token); 
        xhr.send(
            "name=" + this.state.movieForm_name + "&" +
            "description=" + this.state.movieForm_description + "&" +
            "duration=" + this.state.movieForm_duration + "&" +
            "country=" + this.state.movieForm_country + "&" +
            "poster=" + this.state.movieForm_poster + "&" +
            "seances=" + JSON.stringify(this.state.movieForm_seances));
    }

    remove(movie_id, index) {
        if( confirm("Вы действительно хотите удалить фильм?") )
        {
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", "/api/movies/remove");
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.token); 
            xhr.send("id=" + movie_id);
            this.state.movie_seances.deleteByMovieId(movie_id);
            this.state.movies.deleteIndex(index);
        }
    }

    addNewMovie(moviesEdit) {
        moviesEdit.setState({
            isActiveMovieForm: true,
            movieForm_name: "",
            movieForm_description: "",
            movieForm_duration: "",
            movieForm_country: "",
            movieForm_poster: "",
            movieForm_seance_cinema_hall: "",
            movieForm_seance_time: "",
            movieForm_seances: []
        });
    }

    movieForm_addSeance() {
        this.state.movieForm_seances.push({
            id: null,
            cinema_hall_id: this.state.movieForm_seance_cinema_hall,
            time: this.state.movieForm_seance_time
        });
        this.state.movieForm_seance_cinema_hall = "";
        this.state.movieForm_seance_time = "";
        this.forceUpdate();
    }

    movieForm_removeSeance(index) {
        delete this.state.movieForm_seances[index];
        this.forceUpdate();
    }

    hexByInteger(number) {
        const colors = ['D7CD89', 'BD89D7', 'D79389', 'D789AE', '9689D7', '89BAD7', 'D789CC', '89D7C9', '89D79B', '91D789', 'C4D789'];
        return `#${colors[number % colors.length]}`;
    }

    renderMovieForm() {
        if( !this.state.isActiveMovieForm ) {
            return (
                <p className="conf-step__paragraph">
                    <button
                        className="conf-step__button conf-step__button-accent"
                        onClick={()=>{ this.addNewMovie(this) }}>Добавить фильм</button>
                </p>
            );
        }

        return(
            <div className="conf-step__wrapper">
                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Название
                        <input
                            type="text"
                            className="conf-step__input"
                            style={{width: 300}}
                            value={this.state.movieForm_name}
                            onChange={event=>{ this.setState({movieForm_name: event.target.value}) }}
                        />
                    </label>
                </div>
                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Описание
                        <textarea
                            className="conf-step__input"
                            style={{width: 300}}
                            value={this.state.movieForm_description}
                            onChange={event=>{ this.setState({movieForm_description: event.target.value}) }}
                        ></textarea>
                    </label>
                </div>
                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Длительность
                        <input
                            type="text"
                            className="conf-step__input"
                            value={this.state.movieForm_duration}
                            onChange={event=>{ this.setState({movieForm_duration: event.target.value}) }}
                        />
                    </label>
                </div>
                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Страна
                        <input
                            type="text"
                            className="conf-step__input"
                            value={this.state.movieForm_country}
                            onChange={event=>{ this.setState({movieForm_country: event.target.value}) }}
                        />
                    </label>
                </div>
                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Постер
                        <input
                            type="text"
                            className="conf-step__input"
                            value={this.state.movieForm_poster}
                            onChange={event=>{ this.setState({movieForm_poster: event.target.value}) }}
                        />
                    </label>
                </div>

                <p className="conf-step__paragraph">Список сеансов:</p>
                <ul className="conf-step__list">
                    {this.state.movieForm_seances.map(function(seance, index){
                        let cinema_hall = this.state.cinema_halls.getById( seance.cinema_hall_id );
                        return(
                            <li key={`movie-form-seance-${index}`}>
                                {cinema_hall.title} - {seance.time}
                                <button
                                    className="conf-step__button conf-step__button-trash"
                                    onClick={()=>{ this.movieForm_removeSeance.bind(this)(index); }}
                                ></button>
                            </li>
                        );
                    }, this)}

                </ul>

                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Кинозал
                        <select
                            className="conf-step__input"
                            style={{width: 300}}
                            onChange={event=>{ this.setState({movieForm_seance_cinema_hall: event.target.value}) }}
                            value={this.state.movieForm_seance_cinema_hall}
                        >
                            <option value=""></option>
                            {this.state.cinema_halls.map(function(cinema_hall, index){
                                return (<option
                                    key={`movie-form-cinema-hall-${index}`}
                                    value={cinema_hall.id}
                                >{cinema_hall.title}</option>);
                            })}
                        </select>
                    </label>
                </div>

                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Время
                        <input
                            type="time"
                            className="conf-step__input"
                            style={{width: 140}}
                            value={this.state.movieForm_seance_time}
                            onChange={event=>{ this.setState({movieForm_seance_time: event.target.value}) }}
                        />
                    </label>
                </div>

                <button
                    className="conf-step__button conf-step__button-regular"
                    style={{marginTop: 0, width: 140}}
                    onClick={()=>{ this.movieForm_addSeance.bind(this)(); }}
                >Добавить
                </button>

                <fieldset className="conf-step__buttons text-center">
                    <button
                        className="conf-step__button conf-step__button-regular"
                        onClick={()=>{ this.setState({isActiveMovieForm: false}); }}>Отмена</button>
                    <input
                        type="submit"
                        value="Сохранить"
                        className="conf-step__button conf-step__button-accent"
                        onClick={()=>{ this.add.bind(this)(); }}
                    />
                </fieldset>
            </div>
        );
    }

    renderMovies() {
        return (
            <div className="conf-step__movies">
                {Array.prototype.map.call(this.state.movies, this.renderMovieItem, this)}
            </div>
        );
    }

    renderMovieItem(movie, index ) {
        let ending = "";
        const duration = movie.duration;
             
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
        return(
            <div
                key={`movie-item-${movie.id}`}
                className="conf-step__movie"
                onDoubleClick={()=>{ this.remove.bind(this)(movie.id, index); }}
                style={{backgroundColor: this.hexByInteger(movie.id)}}
            >
                <img className="conf-step__movie-poster" alt="poster" src={movie.poster}/>
                <h3 className="conf-step__movie-title">{movie.name}</h3>
                <p className="conf-step__movie-duration">{duration} минут{ending} </p>
            </div>
        );
    }

    render() {
        return (
            <div className="conf-step__wrapper">
                {this.renderMovieForm()}

                {this.renderMovies()}

                <MoviesSeancesTimeline
                    cinema_halls={this.state.cinema_halls}
                    movies={this.state.movies}
                    movie_seances={this.state.movie_seances}
                    hexGenerator={this.hexByInteger}
                />
            </div>
       );
    }
}