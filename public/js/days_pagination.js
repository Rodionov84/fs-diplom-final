'use strict';

class DaysPagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0
        };
    }

    renderDays()
    {
        const tooday = new Date();
        
        const days = [];

        const daysRender = this.state.page == 0 ? 7 : 6;
        for (let i = 0; i < daysRender; i++)
        {
            const shift = i + this.state.page * 6 + ( this.state.page > 0 ? 1 : 0 );
            let dayClass = "page-nav__day" + ( shift == 0 ? " page-nav__day_today" : "" );
            if( shift == this.props.cinema.state.dayShift )
                dayClass += ' page-nav__day_chosen';
            const date = new Date();
            date.setDate(tooday.getDate() + shift);
            days.push(
                <a
                    key={`pagination-day-${i}`}
                    className={dayClass}
                    href="#"
                    onClick={()=>{ this.props.selectDay.bind(this.props.cinema)(shift); }}
                >
                    <span className="page-nav__day-week">
                        {this.getWeekday( date.getDay() )}
                    </span>
                    <span className="page-nav__day-number">
                        {date.getDate()}
                    </span>
                </a>
            );
        }
        
        return days;
    }

    render()
    {
        return (
            <nav className="page-nav">
                {(()=>{
                    if( this.state.page > 0 ) {
                        return (
                            <a
                                className="page-nav__day page-nav__day_prev"
                                href="#"
                                onClick={()=>{ this.setState({page: this.state.page-1}); }}
                            ></a>
                        );
                    }
                })()}
                {this.renderDays()}
                <a
                    className="page-nav__day page-nav__day_next"
                    href="#"
                    onClick={()=>{ this.setState({page: this.state.page+1}); }}
                ></a>
            </nav>
        );
    }

    getWeekday( dayNumber )
    {
        switch (dayNumber) {
            case 0:
                return "Вс";
            case 1:
                return "Пн";
            case 2:
                return "Вт";
            case 3:
                return "Ср";
            case 4:
                return "Чт";
            case 5:
                return "Пт";
            case 6:
                return "Сб";
        }
    }
}