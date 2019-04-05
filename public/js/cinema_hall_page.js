'use strict';

class CinemaHallPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seance: this.props.selectedSeance,
            seats: [],
            selectedSeats: {}
        };

        this.state.movie = this.props.cinema.state.movies.find(function(movie){
            return this.state.seance.movie_id == movie.id;
        }, this);

        this.state.cinema_hall = this.props.cinema.state.cinema_halls.find(function(cinema_hall){
            return this.state.seance.cinema_hall_id == cinema_hall.id;
        }, this);

        let date = new Date();
        date.setDate(new Date().getDate() + this.props.cinema.state.dayShift);
        date = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        const seance_id = this.state.seance.id;
        const self = this;

        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function(){
            self.setState({seats: self.prepareData(JSON.parse(this.responseText))});
        });
        xhr.open("GET", "/api/tickets/get_available?movie_seance_id=" + seance_id + "&date=" + date);
        xhr.send();
    }

    prepareData(data) {
        let result = {};
        for(let seat of data)
        {
            result[seat.row+"_"+seat.seat] = seat;
        }
        return result;
    }

    selectSeat( seat )
    {
        if( this.state.selectedSeats[seat.id] == undefined )
            this.state.selectedSeats[seat.id] = seat;
        else
            delete this.state.selectedSeats[seat.id];
        this.forceUpdate();
    }

    renderSeats()
    {
        const rows = [];

        for( let i = 1; i <= this.state.cinema_hall.length; i++ )
        {
            const seats = [];

            for(let j = 1; j <= this.state.cinema_hall.width; j++)
            {
                let className = "buying-scheme__chair ";
                const seat = this.state.seats[i+"_"+j];

                if( seat != undefined )
                {
                    if( this.state.selectedSeats[seat.id] != undefined ) className += 'buying-scheme__chair_selected';
                    else if( !seat.isAvailable ) className += 'buying-scheme__chair_taken';
                    else if( seat.isVip ) className += 'buying-scheme__chair_vip';
                    else className += 'buying-scheme__chair_standart';
                }
                else className += 'buying-scheme__chair_disabled';

                seats.push(
                    <span
                        className={className}
                        onClick={()=>{ if( seat != undefined && seat.isAvailable ) this.selectSeat.bind(this)( seat ) }}
                        ></span>
                            );
            }

            rows.push(<div className="buying-scheme__row">{seats}</div>);
        }

        return rows;
    }

    renderScheme()
    {
        return (
            <div className="buying-scheme">
                <div className="buying-scheme__wrapper">
                    {this.renderSeats()}
                </div>
                <div className="buying-scheme__legend">
                    <div className="col">
                        <p className="buying-scheme__legend-price"><span
                            className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно
                            (<span className="buying-scheme__legend-value">{this.state.cinema_hall.price}</span>руб)</p>
                        <p className="buying-scheme__legend-price"><span
                            className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP
                            (<span className="buying-scheme__legend-value">{this.state.cinema_hall.price_vip}</span>руб)</p>
                    </div>
                    <div className="col">
                        <p className="buying-scheme__legend-price"><span
                            className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                        <p className="buying-scheme__legend-price"><span
                            className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>
                    </div>
                </div>
            </div>
        );
    }

    render()
    {
        console.warn(this.state.seats);
        return (
            <main>
                <section className="buying">
                    <div className="buying__info">
                        <div className="buying__info-description">
                            <h2 className="buying__info-title">{this.state.movie.name}</h2>
                            <p className="buying__info-start">Начало сеанса: {this.state.seance.time.substr(0, 5)}</p>
                            <p className="buying__info-hall">{this.state.cinema_hall.title}</p>
                        </div>
                        <div className="buying__info-hint">
                            <p>Тапните дважды,<br />чтобы увеличить</p>
                        </div>
                    </div>
                    {this.renderScheme()}
                    <button className="acceptin-button" onClick={()=>{
                        console.warn(this.state.selectedSeats);
                        if( Object.keys(this.state.selectedSeats).length )
                            this.props.cinema.setState({page: 'payment', selectedSeats: this.state.selectedSeats});
                    }}>Забронировать</button>
                </section>
            </main>
        );
    }
}