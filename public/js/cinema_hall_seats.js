'use strict';

class CinemaHallSeats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        this.loadSeats(this.props.cinema_hall);
    }
    shouldComponentUpdate(nextProps) {
        this.loadSeats(nextProps.cinema_hall);
        return true;
    }

    loadSeats(cinema_hall) {
        if( this.props.cache["cinema_hall_" + cinema_hall.id] === undefined )
        {
            const self = this;
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function(){
                const cinema_hall_seats = JSON.parse(this.responseText);
                if( cinema_hall_seats != undefined )
                {
                    self.props.cache["cinema_hall_"+cinema_hall.id] = self.prepareData(cinema_hall_seats);
                    self.forceUpdate();
                }
            });
            xhr.open("GET", "/api/cinema_hall_seats?cinema_hall_id=" + cinema_hall.id);
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.token); 
            xhr.send();
        }
    }

    prepareData(data) {
        let result = {};
        for(let seat of data)
        {
            result[seat.row+"_"+seat.seat] = seat;
        }
        return result;
    }

    renderSeats() {
        const cinema_hall = this.props.cinema_hall;
        if( this.props.cache["cinema_hall_"+cinema_hall.id] === undefined )
        {
            return (
                "loading..."
            );
        }

        let rows = [];
        for(let i = 1; i <= cinema_hall.length; i++)
        {
            let seats = [];
            for( let j = 1; j <= cinema_hall.width; j++ )
            {
                let className = "conf-step__chair ";
                const seat = this.props.cache["cinema_hall_"+cinema_hall.id][i+"_"+j];
                const update_seat = this.props.update[i+"_"+j];
                const delete_seat = this.props.delete[i+"_"+j];

                if( ( update_seat == undefined && seat == undefined ) || delete_seat != undefined )
                    className += "conf-step__chair_disabled";
                else if(
                    ( update_seat != undefined && update_seat.isVip ) ||
                    ( seat != undefined && seat.isVip && update_seat == undefined )
                )
                    className += "conf-step__chair_vip";
                else
                    className += "conf-step__chair_standart";

                seats.push(
                    <span key={`cinema-hall-seat-${i}_${j}`} className={className} onClick={event=>{ this.seatChange(i, j) }}></span>
                );
            }
            rows.push(
                <div key={`cinema-hall-seat-row-${i}`} className="conf-step__row">
                    {seats}
                </div>
            );
        }
        return rows;
    }

    seatChange(row, seat) {
        const cinema_hall = this.props.cinema_hall;

        const cache_seat = this.props.cache["cinema_hall_"+cinema_hall.id][row+"_"+seat];
        const update_seat = this.props.update[row+"_"+seat];
        const delete_seat = this.props.delete[row+"_"+seat];

        if( ( update_seat == undefined && cache_seat == undefined ) || delete_seat != undefined )
        {
            // to standart
            this.props.update[row+"_"+seat] = {
                id: cache_seat != undefined ? cache_seat.id : 0,
                isVip: 0,
                row: row,
                seat: seat
            };

            if( delete_seat != undefined ) delete this.props.delete[row+"_"+seat];
        }
        else if(
            ( update_seat != undefined && update_seat.isVip == 0 ) ||
            ( update_seat == undefined && cache_seat.isVip == 0 )
        )
        {
            // to vip
            this.props.update[row+"_"+seat] = {
                id: cache_seat != undefined ? cache_seat.id : 0,
                isVip: 1,
                row: row,
                seat: seat
            };
        }
        else
        {
            delete this.props.update[row+"_"+seat];
            this.props.delete[row+"_"+seat] = {
                id: cache_seat != undefined ? cache_seat.id : 0,
                row: row,
                seat: seat
            };
        }
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
                <div className="conf-step__legend">
                    <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
                    <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
                    <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
                    <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
                 </div>

                <div className="conf-step__hall">
                    {this.renderSeats.bind(this)()}
                </div>
            </div>
        );
    }
}