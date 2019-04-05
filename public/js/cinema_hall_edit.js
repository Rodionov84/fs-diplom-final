'use strict';

class CinemaHallEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cinema_halls: props.cinema_halls,
            width: "",
            length: "",
            seats_update: {},
            seats_delete: {},
            seats_cache: {},
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if( nextProps.index != this.props.index )
        {
            nextState.width = "";
            nextState.length = "";
            nextState.seats_update = {};
            nextState.seats_delete = {};
        }
        return true;
    }

    save() {
        if( this != undefined )
        {
            const self = this;
            const cinema_hall = this.state.cinema_halls[this.props.index];
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function(){
                const upd_cinema_hall = JSON.parse(this.responseText);
                if( upd_cinema_hall != undefined && upd_cinema_hall.id != undefined )
                {
                    self.state.width = "";
                    self.state.length = "";
                    self.state.cinema_halls[self.props.index] = upd_cinema_hall;
                    delete self.state.seats_cache["cinema_hall_"+upd_cinema_hall.id];
                    self.state.cinema_halls.forceUpdate();
                }
            });
            xhr.open("PUT", "/api/cinema_halls/update");
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.token); 
            xhr.send(
                "id=" + cinema_hall.id +
                "&width=" + this.state.width +
                "&length=" + this.state.length +
                "&seats_update=" + JSON.stringify(this.state.seats_update) +
                "&seats_delete=" + JSON.stringify(this.state.seats_delete)
            );
        }
    }

    render() {
        const cinema_hall = this.state.cinema_halls[this.props.index];
        if( cinema_hall == undefined ) return "";

        return (
            <div>
                <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
                <div className="conf-step__legend">
                    <label className="conf-step__label">
                        Рядов, шт
                        <input
                            type="text"
                            className="conf-step__input"
                            placeholder={cinema_hall.length}
                            value={this.state.length}
                            onChange={event=>{ this.setState({length: event.target.value}); }}/>
                    </label>
                    <span className="multiplier">x</span>
                    <label className="conf-step__label">
                        Мест, шт
                        <input
                            type="text"
                            className="conf-step__input"
                            placeholder={cinema_hall.width}
                            value={this.state.width}
                            onChange={event=>{ this.setState({width: event.target.value}); }}  />
                    </label>
                </div>
                <CinemaHallSeats
                    cinema_hall={cinema_hall}
                    update={this.state.seats_update}
                    delete={this.state.seats_delete}
                    cache={this.state.seats_cache}
                    token={this.props.token}
                />
                <fieldset className="conf-step__buttons text-center">
                    <button
                        className="conf-step__button conf-step__button-regular"
                        onClick={()=>{ this.setState({width: "", length: ""}); }}>Отмена</button>
                    <input
                        type="submit"
                        value="Сохранить"
                        className="conf-step__button conf-step__button-accent"
                        onClick={()=>{
                            this.save.bind(this)();
                        }}
                    />
                </fieldset>
            </div>
        );
    }
}