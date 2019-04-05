'use strict';

class CinemaAuth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    auth()
    {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", 
            function() {
                const response = JSON.parse(this.responseText);

                if( response.token != undefined )
                {
                    localStorage.setItem('token', response.token);
                    window.location.reload(false); 
                }
            }
        );
        xhr.open("POST", "/api/login");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send("email=" + this.state.email + "&password=" + this.state.password);
    }

    render() {

        return (
            <div className="conf-step__wrapper">
                <label className="conf-step__label">
                        Email:
                        <input
                            type="text"
                            className="conf-step__input"
                            value={this.state.email}
                            onChange={event=>{ this.setState({email: event.target.value}); }}
                            style={{width: 220}}
                        />
                    </label>
                    <br/>
                    <label className="conf-step__label" style={{marginTop: 5}}>
                        Пароль:
                        <input
                            type="password"
                            className="conf-step__input"
                            // placeholder={cinema_hall.width}
                            value={this.state.password}
                            onChange={event=>{ this.setState({password: event.target.value}); }}
                            style={{width: 220}}
                        />
                        <input
                            type="submit"
                            value="Авторизоваться"
                            className="conf-step__button conf-step__button-accent"
                            onClick={()=>{ this.auth.bind(this)(); }} />
                    </label>
                </div>
        );
    }
}
