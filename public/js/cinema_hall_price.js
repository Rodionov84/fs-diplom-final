'use strict';

class CinemaHallPrice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cinema_halls: props.cinema_halls,

            price: "",
            price_vip: "",
        };
    }

    save() {
        if( this != undefined && ( this.state.price != "" || this.state.price_vip != "" ) )
        {
            const self = this;
            const cinema_hall = this.state.cinema_halls[this.props.index];
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function(){
                const upd_cinema_hall = JSON.parse(this.responseText);
                if( upd_cinema_hall != undefined && upd_cinema_hall.id != undefined )
                {
                    self.state.price = "";
                    self.state.price_vip = "";
                    self.state.cinema_halls[self.props.index] = upd_cinema_hall;
                    self.state.cinema_halls.forceUpdate();
                }
            });
            xhr.open("PUT", "/api/cinema_halls/update_price");
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.token); 
            xhr.send("id=" + cinema_hall.id + "&price=" + this.state.price + "&price_vip=" + this.state.price_vip);
        }
    }

    render() {
        const cinema_hall = this.state.cinema_halls[this.props.index];
        if( cinema_hall == undefined ) return "";

        return (
            <div>
                <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
                <div className = "conf-step__legend" >
                    <label className = "conf-step__label" >
                        Цена, рублей
                        <input
                            type = "text"
                            className = "conf-step__input"
                            value={this.state.price}
                            placeholder ={cinema_hall.price}
                            onChange={event=>{ this.setState({price: event.target.value}); }} />
                    </label> за <span className = "conf-step__chair conf-step__chair_standart" > </span> обычные кресла
                 </div>
                <div className = "conf-step__legend" >
                    <label className = "conf-step__label" > Цена, рублей
                        <input
                            type = "text"
                            className = "conf-step__input"
                            value={this.state.price_vip}
                            placeholder = {cinema_hall.price_vip}
                            onChange={event=>{ this.setState({price_vip: event.target.value}); }} />
                     </label> за <span className = "conf-step__chair conf-step__chair_vip" > </span> VIP кресла
                 </div>

                <fieldset className = "conf-step__buttons text-center" >
                    <button
                        className = "conf-step__button conf-step__button-regular"
                        onClick={()=>{ this.setState({price_vip: "", price: ""}); }}> Отмена </button>
                    <input
                        type="submit"
                        value="Сохранить"
                        className="conf-step__button conf-step__button-accent"
                        onClick={()=>{
                            this.save.bind(this)();
                        }}/>
                </fieldset>
            </div>
        );
    }
}