'use strict';

class CinemaHallsControll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cinema_halls: props.cinema_halls,
            isCreateForm: false,
            newCinemaHallTitle: "",
        };
    }

    createCinemaHall(title) {
        const self = this;
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function(){
            const cinema_hall = JSON.parse(this.responseText);
            if( cinema_hall != undefined && cinema_hall.id != undefined )
            {
                self.state.newCinemaHallTitle = "";
                self.state.isCreateForm = false;
                self.state.cinema_halls.push( cinema_hall );
            }
        });
        xhr.open("POST", "/api/cinema_halls/add");
        xhr.setRequestHeader("Authorization", "Bearer " + this.props.token); 
        xhr.send("title=" + title);
    }

    deleteCinemaHall( cinema_hall_index ) {
        if( confirm("Удалить?") ) {
            const id = this.state.cinema_halls[cinema_hall_index].id;
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", "/api/cinema_halls/remove");
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.token); 
            xhr.send("id=" + id);
            this.state.cinema_halls.deleteIndex(cinema_hall_index);
        }
    }

    renderCinemaHall( cinema_hall, index, cinemaHallsControll ) {
        return (
            <li key={`cinema-hall-${cinema_hall.id}`}>
                {cinema_hall.title}
                <button onClick={()=>{cinemaHallsControll.deleteCinemaHall(index)}} className="conf-step__button conf-step__button-trash" title="удалить" style={{marginLeft: 7}}></button>
            </li>
        );
    }

    renderCreateForm() {
        if( this.state.isCreateForm )
        {
            return (
                <div>
                    <p className="conf-step__paragraph">Создание нового кинозала:</p>
                    <div className="conf-step__legend">
                        <label className="conf-step__label">
                            Название:
                            <input
                                type="text"
                                className="conf-step__input"
                                style={{width: 300}}
                                value={this.state.newCinemaHallTitle}
                                onChange={event=>{ this.setState({newCinemaHallTitle: event.target.value}); }} /></label>
                    </div>

                    <fieldset className="conf-step__buttons text-center">
                        <button className="conf-step__button conf-step__button-regular" onClick={()=>{this.setState({isCreateForm: false})}}>Отмена</button>
                        <input
                            type="submit"
                            value="Сохранить"
                            className="conf-step__button conf-step__button-accent"
                            onClick={()=>{ this.createCinemaHall( this.state.newCinemaHallTitle ) }} />
                    </fieldset>
                </div>
            );
        }
        else
        {
            return (
                <button onClick={()=>{this.setState({isCreateForm: true})}} className="conf-step__button conf-step__button-accent">Создать зал</button>
            );
        }
    }

    render() {
        return (
            <div className="conf-step__wrapper">
                <p className="conf-step__paragraph">Доступные залы:</p>
                <ul className="conf-step__list">
                    {Array.prototype.map.call(this.state.cinema_halls, (value, index)=> this.renderCinemaHall(value, index, this))}
                </ul>
                {this.renderCreateForm()}
            </div>
        );
    }
}