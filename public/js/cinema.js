'use strict';

class Cinema extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            cinema_halls: [],
            movies: [],
            movie_seances: [],

            dayShift: 0,
            selectedSeance: null,
            selectedSeats: null,

            page: 'index'
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

    selectDay(dayShift)
    {
        this.setState({dayShift: dayShift});
    }

    selectSeance( seance )
    {
        this.setState({page: 'hall', selectedSeance: seance});
    }

    render()
    {
        switch (this.state.page) {
            case 'index':
                return <CinemaIndexPage cinema={this} selectDay={this.selectDay} />;
            case 'hall':
                return <CinemaHallPage cinema={this} selectedSeance={this.state.selectedSeance}/>;
            case 'payment':
                return <CinemaPaymentPage cinema={this} selectedSeance={this.state.selectedSeance} selectedSeats={this.state.selectedSeats} />;
            case 'ticket':
                return <CinemaTicketPage cinema={this} selectedSeance={this.state.selectedSeance} selectedSeats={this.state.selectedSeats} />;
        }
        return '';
    }
}

const domContainer_cinema = document.querySelector('#cinema');
ReactDOM.render(
    React.createElement(Cinema),
    domContainer_cinema
);