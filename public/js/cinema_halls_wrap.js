'use strict';

class CinemaHallsWrap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected_index: 0,
            cinema_halls: props.cinema_halls
        };
    }

    renderCinemaHall(cinema_hall, index, cinemaHallsWrap ) {
        return(
            <li key={`cinema-hall-tab-${cinema_hall.id}`}>
                <input type="radio" className="conf-step__radio"
                       name="chairs-hall-edit"
                       value={index}
                       checked={index === cinemaHallsWrap.state.selected_index}
                       onChange={event=>{ this.setState({selected_index: parseInt(event.target.value)}); }} />
                <span className="conf-step__selector">{cinema_hall.title}</span>
            </li>
        );
    }

    render() {
        return (
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
                <ul className="conf-step__selectors-box">
                    {Array.prototype.map.call(this.state.cinema_halls, (value, index)=> this.renderCinemaHall(value, index, this))}
                </ul>
                <CinemaHallEdit
                    index={this.state.selected_index}
                    cinema_halls={this.state.cinema_halls}
                    token={this.props.token} />
            </div>
        );
    }
}