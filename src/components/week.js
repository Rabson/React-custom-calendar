import React, { Component } from 'react';
import moment from 'moment';

class Week extends Component {
    render() {
        let days = [];
        let {
            date, lateDays, absentDays, direction
        } = this.props;

        const {
            month,
        } = this.props;

        for (let i = 0; i < 7; i++) {
            let islate = false;
            let isAbesnt = false
            let day = {
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                date: date
            };

            for (let i = 0; i < lateDays.length; i++) {
                if (moment(lateDays[i], "YYYY-MM-DD").isSame(moment(`${date.year()}-${direction ? date.month() + 1 : date.month() - 1}-${date.date()}`, "YYYY-MM-DD"))) {
                    islate = true;
                }
            }
            if(!islate) {
                for (let i = 0; i < absentDays.length; i++) {
                    if (moment(absentDays[i], "YYYY-MM-DD").isSame(moment(`${date.year()}-${direction ? date.month() + 1 : date.month() - 1}-${date.date()}`, "YYYY-MM-DD"))) {
                        isAbesnt = true
                    }
                }
            }

            days.push(
                <div
                    key={date.toString()}
                    className={(day.isCurrentMonth ? "" : " different-month") + (isAbesnt ? " absent" : "") + (islate ? " late" : "")}
                ><span className="day"  > {day.number} </span> </div>
            );
            date = date.clone();
            date.add(1, "day");
        }

        return (
            <div id="calendar_content">
                {days}
            </div>
        );
    }

}

export default Week;