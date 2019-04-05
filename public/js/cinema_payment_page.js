'use strict';

class CinemaPaymentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seance: this.props.selectedSeance,
            selectedSeats: this.props.selectedSeats,
            price: 0
        };

        this.state.movie = this.props.cinema.state.movies.find(function(movie){
            return this.state.seance.movie_id == movie.id;
        }, this);

        this.state.cinema_hall = this.props.cinema.state.cinema_halls.find(function(cinema_hall){
            return this.state.seance.cinema_hall_id == cinema_hall.id;
        }, this);

        for( const seat_id in this.state.selectedSeats )
        {
            this.state.price += parseFloat( this.state.selectedSeats[seat_id].isVip ? this.state.cinema_hall.price_vip : this.state.cinema_hall.price );
        }
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
                        <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
                    </header>

                    <div className="ticket__info-wrapper">
                        <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{this.state.movie.name}</span>
                        </p>
                        <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">{this.renderSelectedSeatsList()}</span>
                        </p>
                        <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{this.state.cinema_hall.title}</span></p>
                        <p className="ticket__info">Начало сеанса: <span
                            className="ticket__details ticket__start">{this.state.seance.time.substr(0, 5)}</span></p>
                        <p className="ticket__info">Стоимость: <span
                            className="ticket__details ticket__cost">{this.state.price}</span> рублей</p>

                        <button className="acceptin-button" onClick={()=>{ this.props.cinema.setState({page: 'ticket'}); }}>
                            Получить код бронирования
                        </button>

                        <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на
                            почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
                        <p className="ticket__hint">Приятного просмотра!</p>
                    </div>
                </section>
            </main>
        );
    }
}