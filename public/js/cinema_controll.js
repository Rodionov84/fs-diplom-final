'use strict';

class CinemaControll extends React.Component {
    constructor(props) {
        super(props);

        //localStorage.removeItem('token');

        this.state = {
            isLoading: true,
            cinema_halls: [],
            movies: [],
            movie_seances: [],
            token: localStorage.getItem('token')
        };

        const self = this;

        this.state.cinema_halls.getById = function( id ) {
            for( let cinema_hall of self.state.cinema_halls )
            {
                if( cinema_hall.id == id ) {
                    return cinema_hall;
                }
            }
            return null;
        };
        this.state.cinema_halls.getIndexById = function( id ) {
            self.state.cinema_halls.forEach((cinema_hall, index)=>{
                if( cinema_hall.id == id ) {
                    return index;
                }
            })
            return null;
        };
        this.state.cinema_halls.push = function(e) {
            Array.prototype.push.call(self.state.cinema_halls, e);
            self.forceUpdate();
        };
        this.state.cinema_halls.deleteIndex = function(index) {
            //delete self.state.cinema_halls[index];
            self.state.cinema_halls.splice(index, 1);
            self.forceUpdate();
        };
        this.state.cinema_halls.forceUpdate = function (e) {
            self.forceUpdate();
        }

        this.state.movies.getById = function( id ) {
            for( let movie of self.state.movies )
            {
                if( movie.id == id ) {
                    return movie;
                }
            }
            return null;
        };
        this.state.movies.push = function(e) {
            Array.prototype.push.call(self.state.movies, e);
            self.forceUpdate();
        };
        this.state.movies.deleteIndex = function(index) {
            //delete self.state.movies[index];
            self.state.movies.splice(index, 1);
            self.forceUpdate();
        };

        this.state.movie_seances.getById = function( id ) {
            for( let movie_seance of self.state.movie_seances )
            {
                if( movie_seance.id == id ) {
                    return movie_seance;
                }
            }
            return null;
        };
        this.state.movie_seances.push = function(e) {
            Array.prototype.push.call(self.state.movie_seances, e);
            self.forceUpdate();
        };
        this.state.movie_seances.pushArray = function(e) {
            for(const item of e)
            {
                Array.prototype.push.call(self.state.movie_seances, item);
            }
            self.forceUpdate();
        };
        this.state.movie_seances.deleteIndex = function(index) {
            //delete self.state.movie_seances[index];
            self.state.movie_seances.splice(index, 1);
            self.forceUpdate();
        };
        this.state.movie_seances.deleteByMovieId = function(movie_id) {
            for (let index = 0; index < self.state.movie_seances.length; index++)
            {
                if( self.state.movie_seances[index].movie_id == movie_id )
                {
                    //delete self.state.movie_seances[index];
                    self.state.movie_seances.splice(index, 1);
                    index--;
                }
            }
            self.forceUpdate();
        };

        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function(){ self.loadingProgress.bind(self)(this.responseText) });
        xhr.open("GET", "/api/initial");
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token); 
        xhr.send();
    }

    loadingProgress(response) {
        const data = JSON.parse(response);

        if( data.cinema_halls != undefined )
        {
            Array.prototype.push.apply(this.state.cinema_halls, data.cinema_halls);
        }
        if( data.movies != undefined )
        {
            Array.prototype.push.apply(this.state.movies, data.movies);
        }
        if( data.movie_seances != undefined )
        {
            Array.prototype.push.apply(this.state.movie_seances, data.movie_seances);
        }

        this.setState({isLoading: false});
    }

    render() {
        if( this.state.token == null )
        {
            return (
                <section className="conf-step">
                    <header className="conf-step__header conf-step__header_opened">
                        <h2 className="conf-step__title">Авторизация</h2>
                    </header>
                    <CinemaAuth/>
                </section>
            );
        }

        return (
            <div>
                <section className="conf-step">
                    <header className="conf-step__header conf-step__header_closed">
                        <h2 className="conf-step__title">Управление залами</h2>
                    </header>
                    <CinemaHallsControll 
                        cinema_halls={this.state.cinema_halls} 
                        token={this.state.token} />
                </section>

                <section className="conf-step">
                    <header className="conf-step__header conf-step__header_closed">
                        <h2 className="conf-step__title">Конфигурация залов</h2>
                    </header>
                    <CinemaHallsWrap 
                        cinema_halls={this.state.cinema_halls} 
                        token={this.state.token} />
                </section>

                <section className="conf-step">
                    <header className="conf-step__header conf-step__header_closed">
                        <h2 className="conf-step__title">Конфигурация цен</h2>
                    </header>
                    <CinemaHallsPrice 
                        cinema_halls={this.state.cinema_halls} 
                        token={this.state.token} />
                </section>

                <section className="conf-step">
                    <header className="conf-step__header conf-step__header_closed">
                        <h2 className="conf-step__title">Сетка сеансов</h2>
                    </header>
                    <MoviesEdit
                        cinema_halls={this.state.cinema_halls}
                        movies={this.state.movies}
                        movie_seances={this.state.movie_seances}
                        token={this.state.token} />
                </section>

                <section className="conf-step">
                    <header className="conf-step__header conf-step__header_closed">
                        <h2 className="conf-step__title">Открыть продажи</h2>
                    </header>
                    <CinemaHallsOpenSales 
                        cinema_halls={this.state.cinema_halls} 
                        token={this.state.token} />
                </section>
            </div>
        );
    }

    componentDidMount() {
        // accorderon
        const headers = Array.from(document.querySelectorAll('.conf-step__header'));
        headers.forEach(header => header.addEventListener('click', () => {
            header.classList.toggle('conf-step__header_closed');
            header.classList.toggle('conf-step__header_opened');
        }));
    }
}

const domContainer_main = document.querySelector('#main');
ReactDOM.render(
    React.createElement(CinemaControll),
    domContainer_main
);