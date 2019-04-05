'use strict';

class CinemaHallsOpenSales extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected_index: 0,
            cinema_halls: props.cinema_halls
        };
    }

    renderCinemaHall(cinema_hall, index, cinemaHallsPrice ) {
        return(
            <li key={`cinema-hall-price-tab-${cinema_hall.id}`}>
                <input type="radio" className="conf-step__radio" name="chairs-hall-open" value={index} checked={index === this.state.selected_index} onChange={event=>{ this.setState({selected_index: parseInt(event.target.value)}); }} />
                <span className="conf-step__selector">{cinema_hall.title}</span>
            </li>
        );
    }

    toggle()
    {
        const cinema_hall = this.state.cinema_halls[ this.state.selected_index ];
        if( cinema_hall == undefined )
        {
            return;
        }

        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function(){
            const response = JSON.parse(this.responseText);
            if( response != undefined && response.status )
            {
                cinema_hall.isOpenSales = response.isOpenSales;
                self.forceUpdate();
            }
        });
        xhr.open("PUT", "/api/cinema_halls/openSales");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader("Authorization", "Bearer " + this.props.token); 
        xhr.send("id=" + cinema_hall.id + "&isOpenSales=" + (!cinema_hall.isOpenSales ? 1 : 0));
    }

    renderButton()
    {
        const cinema_hall = this.state.cinema_halls[ this.state.selected_index ];
        if( cinema_hall == undefined )
        {
            return;
        }

        const actionTitle =
            cinema_hall.isOpenSales
                ? "Закрыть продажу билетов"
                : "Открыть продажу билетов";

        return (
            <button
                className="conf-step__button conf-step__button-accent"
                onClick={()=>{ this.toggle.bind(this)(); }}
            >
                {actionTitle}
            </button>
        );
    }

    render() {
        return (
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Выберите зал для изменения статуса продаж:</p>
                <ul className="conf-step__selectors-box">
                    {Array.prototype.map.call(this.state.cinema_halls, (value, index)=> this.renderCinemaHall(value, index, this))}
                </ul>
                {this.renderButton()}
            </div>
        );
    }
}