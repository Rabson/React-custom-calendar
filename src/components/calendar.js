import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Week from './week'

class calendar extends Component {

    DaysLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    constructor() {
        super();

        this.state = {
            details: {},
            month: moment(),
            selected: moment().startOf('day'),
            weeks: [],
            direction: 1
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }


    componentDidMount() {
        this.getAttandance(moment().month() + 1)

    }
    previous() {
        const {
            month,
        } = this.state;
        this.setState({
            month: month.subtract(1, 'month'),
            direction: 0
        });
        this.getAttandance(this.state.month.month() - 1)

    }

    next() {
        const {
            month,
        } = this.state;

        this.setState({
            month: month.add(1, 'month'),
            direction: 1
        });
        this.getAttandance(this.state.month.month() + 1)
    }


    getAttandance = (month) => {
        axios.get(`https://lnq0ncqltg.execute-api.ap-south-1.amazonaws.com/dev/DummyApi/Attendance/Student?month=${month}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                this.setState({ details: res.data });
                this.renderWeeks(res.data);
            });
    }


    renderWeeks(data) {
        let weeks = [];
        let done = false;
        let date = this.state.month.clone().startOf("month").add("w" - 1).day("Sunday");
        let count = 0;
        let monthIndex = date.month();

        const {
            month,
        } = this.state;

        while (!done) {
            weeks.push(
                <Week key={date}
                    date={date.clone()}
                    month={month}
                    direction={this.state.direction}
                    lateDays={data.lateDays}
                    absentDays={data.absentDays}
                />
            );

            date.add(1, "w");

            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        this.setState({ weeks })

    };

    renderMonthLabel() {
        const {
            month,
        } = this.state;

        return <div>{month.format("MMMM YYYY")}</div>;
    }

    render() {
        return (
            <div>
                <div className="panel-heading">
                    <h1 >
                        {this.state.details.name}
                    </h1>
                    <h3>{this.state.details.section}  {this.state.details.class}</h3>
                </div>

                <div id="calendar" >

                    <div id="calendar_header">
                        <i className="arrow fa fa-angle-left" onClick={this.previous} />

                        {this.renderMonthLabel()}
                        <i className="arrow fa fa-angle-right" onClick={this.next} />
                    </div>
                    
                    <div id="calendar_weekdays" >
                        {
                            this.DaysLabels.map((value, key) => {
                                return <div style={this.daysStyle} key={key} >{value.substring(0, 3)}</div>
                            })
                        }
                    </div>

                    {this.state.weeks}

                </div>
            </div>
        );
    }
}

export default calendar;

