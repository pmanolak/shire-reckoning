/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import {
    TRADITIONAL_RULES,
    REFORMED_RULES,
    RivendellMonths,
    makeRivendellCalendarDates
} from '../RivendellReckoning';

import { fullYearDate, datesMatch } from '../Utils';

import RivendellCalendar from '../ui/RivendellCalendar';
import '../ui/tolkien-calendars.css';

import LanguagePicker from './controls/LanguagePicker';
import MonthViewPicker from './controls/MonthViewPicker';
import StartDatePicker from './controls/StartDatePicker';

class RivendellCalendarWithControls extends Component {
    constructor(props) {
        super(props);

        let calendarControls = props.calendarControls !== false;
        let language         = props.language || LanguagePicker.QUENYA;
        let calendarRules    = props.calendarRules || RivendellCalendar.TRADITIONAL_RULES;
        let startDay         = props.startDay || 22;
        let startDate        = props.startDate || fullYearDate(1, 2, startDay);
        let today            = props.date || new Date();

        let calendar = makeRivendellCalendarDates(today, startDate, calendarRules);
        let monthView = props.yearView ? -1 : calendar.todayRivendell.month;

        this.state = {
            calendarControls: calendarControls,
            calendar:         calendar,
            today:            today,
            monthView:        monthView,
            calendarRules:    calendarRules,
            startDate:        startDate,
            language:         language
        };

        this.makeCalendarDates     = this.makeCalendarDates.bind(this);
        this.onMonthViewChange     = this.onMonthViewChange.bind(this);
        this.onViewCalendarMonth   = this.onViewCalendarMonth.bind(this);
        this.onCalendarStartChange = this.onCalendarStartChange.bind(this);
        this.onCalendarRulesChange = this.onCalendarRulesChange.bind(this);
        this.onLanguageChange      = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;
        let calendar = this.state.calendar;

        if (nextProps.startDay && !nextProps.startDate) {
            startDate = new Date(startDate);
            startDate.setDate(nextProps.startDay);
        }

        if (!datesMatch(startDate, this.state.startDate) ||
            !datesMatch(today, this.state.today) ||
            !datesMatch(today, calendar.today)) {
            calendar = makeRivendellCalendarDates(today, startDate, this.state.calendarRules);
        }

        this.setState({
            today:     today,
            calendar:  calendar,
            startDate: startDate,
            monthView: this.state.monthView < 0 || nextProps.yearView ? -1 : calendar.todayRivendell.month
        });
    }

    makeCalendarDates(today, startDate) {
        return makeRivendellCalendarDates(today, startDate, this.state.calendarRules);
    }

    onMonthViewChange(calendar, monthView) {
        this.setState({
            calendar: calendar,
            monthView: monthView
        });
    }

    onViewCalendarMonth(calendar) {
        this.setState({
            calendar: calendar,
            monthView: calendar.todayRivendell.month
        });
    }

    onCalendarStartChange(startDate) {
        let calendar = makeRivendellCalendarDates(this.state.calendar.today, startDate, this.state.calendarRules);

        this.setState({
            startDate: startDate,
            calendar: calendar
        });
    }

    onCalendarRulesChange(event) {
        let calendarRules = event.target.value;
        let startDay = calendarRules === REFORMED_RULES ? 25 : 22;
        let startDate = new Date(this.state.startDate);
        startDate.setDate(startDay);
        let calendar = makeRivendellCalendarDates(this.state.calendar.today, startDate, calendarRules);

        this.setState({
            calendarRules: calendarRules,
            startDate: startDate,
            calendar: calendar
        });
    }

    onLanguageChange(event) {
        this.setState({language: event.target.value});
    }

    renderCalendarControls() {
        let language = this.state.language;
        let monthNames = RivendellMonths.map(function(month) {
            return month[language];
        });

        return (
            <tr>
                <th className='rivendell-calendar-controls'>
                    <StartDatePicker month="March"
                                     startRange={19}
                                     endRange={29}
                                     startDate={this.state.startDate}
                                     onCalendarStartChange={this.onCalendarStartChange} />
                    <select className="rivendell-rules-select"
                            value={this.state.calendarRules}
                            onChange={this.onCalendarRulesChange} >
                        <option value={TRADITIONAL_RULES}>Traditional Rules</option>
                        <option value={REFORMED_RULES}>Reformed Rules</option>
                    </select>
                </th>
                <th className='rivendell-calendar-controls month-picker-container'>
                    <MonthViewPicker monthNames={monthNames}
                                     monthLabel="Season"
                                     today={this.state.today}
                                     calendar={this.state.calendar}
                                     startDate={this.state.startDate}
                                     monthView={this.state.monthView}
                                     makeCalendarDates={this.makeCalendarDates}
                                     onMonthViewChange={this.onMonthViewChange}
                                     onViewCalendarMonth={this.onViewCalendarMonth} />
                </th>
                <th className='rivendell-calendar-controls' >
                    <LanguagePicker language={this.state.language}
                                    onLanguageChange={this.onLanguageChange} />
                </th>
            </tr>
        );
    }

    render() {
        let controls = this.state.calendarControls ? this.renderCalendarControls() : null;
        let caption = null;
        if (this.props.caption) {
            caption = (
                <caption className='rivendell-caption'>{
                    this.props.caption === true ? "Rivendell Reckoning" : this.props.caption
                }</caption>
            );
        }

        return (
            <table className={this.props.className} >
                {caption}
                <thead>
                    {controls}
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="3" className="shire-calendar-wrapper-cell" >
                            <RivendellCalendar
                                className="shire-calendar rivendell-calendar"
                                calendar={this.state.calendar}
                                date={this.state.today}
                                language={this.state.language}
                                monthView={this.state.monthView}
                                yearView={this.state.monthView < 0} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default RivendellCalendarWithControls;