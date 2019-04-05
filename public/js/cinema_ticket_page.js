'use strict';

class CinemaTicketPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seance: this.props.selectedSeance,
            selectedSeats: this.props.selectedSeats,
            ticket: undefined
        };

        this.state.movie = this.props.cinema.state.movies.find(function(movie){
            return this.state.seance.movie_id == movie.id;
        }, this);

        this.state.cinema_hall = this.props.cinema.state.cinema_halls.find(function(cinema_hall){
            return this.state.seance.cinema_hall_id == cinema_hall.id;
        }, this);

        const self = this;
        let date = new Date();
        date.setDate(new Date().getDate() + this.props.cinema.state.dayShift);
        date = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        const seats = Object.keys(this.state.selectedSeats).join('_');
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function(){
            const response = JSON.parse(this.responseText);
            let ticket = null;

            if( response.status )
            {
                ticket = response.ticket;
            }
            self.setState({ticket: ticket});
        });
        xhr.open("POST", "/api/tickets/booking");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send("movie_seance_id=" + this.state.seance.id + "&date=" + date + "&seats=" + seats);
    }

    renderTicket()
    {
        if( this.state.ticket == undefined )
        {
            return "Бронирование...";
        }

        const ticketCode = "/ticket/" + this.state.ticket.code + ".png";
        return (
            <img className="ticket__info-qr" src={ticketCode} />
        );
    }

    renderSelectedSeatsList()
    {
        let seats = "";

        for( const seat_id in this.state.selectedSeats )
        {
            const seat = this.state.selectedSeats[seat_id];
            seats += ", ряд " + seat.row + " место " + seat.seat;
        }

        return seats.substr(2);
    }

    render() {
        return (
            <main>
                <section className="ticket">

                    <header className="tichet__check">
                        <h2 className="ticket__check-title">Электронный билет</h2>
                    </header>

                    <div className="ticket__info-wrapper">
                        <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{this.state.movie.name}</span>
                        </p>
                        <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{this.renderSelectedSeatsList()}</span>
                        </p>
                        <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{this.state.cinema_hall.title}</span></p>
                        <p className="ticket__info">Начало сеанса: <span
                            className="ticket__details ticket__start">{this.state.seance.time.substr(0, 5)}</span></p>

                        {this.renderTicket()}

                        <p className="ticket__hint">
                            Покажите QR-код нашему контроллеру для подтверждения бронирования.
                        </p>
                        <p className="ticket__hint">Приятного просмотра!</p>
                    </div>
                </section>
            </main>
        );
    }
}