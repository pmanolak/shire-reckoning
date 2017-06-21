/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';

import {
    RECKONING_KINGS,
    RECKONING_STEWARDS,
    RECKONING_NEW,
    RECKONING_RULES_TRADITIONAL,
    RECKONING_RULES_GREGORIAN,
    GondorWeekdays,
    GondorMonths,
    convertGondorianMonthIndex,
    makeGondorCalendarDates
} from '../GondorReckoning';

import { fullYearDate, datesMatch } from '../Utils';

import DateCell from './DateCell';
import IntercalaryDay from './IntercalaryDay';
import WeekDayHeaderCell, { addMonthFiller, addVerticalMonthFiller } from './WeekDayHeaderCell';
import './tolkien-calendars.css';

import LanguagePicker from './controls/LanguagePicker';
import MonthViewLayout, { VerticalLayoutFiller } from './controls/MonthViewLayout';
import MonthViewPicker from './controls/MonthViewPicker';
import StartDatePicker from './controls/StartDatePicker';

class GondorCalendar extends Component {
    static get RECKONING_KINGS() { return RECKONING_KINGS;}
    static get RECKONING_STEWARDS() { return RECKONING_STEWARDS;}
    static get RECKONING_NEW() { return RECKONING_NEW;}

    static get RECKONING_RULES_TRADITIONAL() { return RECKONING_RULES_TRADITIONAL; }
    static get RECKONING_RULES_GREGORIAN() { return RECKONING_RULES_GREGORIAN; }

    static get MONTH_VIEW_VERTICAL() { return MonthViewLayout.VERTICAL; }
    static get MONTH_VIEW_HORIZONTAL() { return MonthViewLayout.HORIZONTAL; }

    static get LANGUAGE_ENGLISH() { return LanguagePicker.ENGLISH; }
    static get LANGUAGE_QUENYA() { return LanguagePicker.QUENYA; }
    static get LANGUAGE_SINDARIN() { return LanguagePicker.SINDARIN; }

    constructor(props) {
        super(props);

        let calendarControls = props.calendarControls !== false;
        let language = props.language || LanguagePicker.QUENYA;
        let calendarRules = props.calendarRules || RECKONING_RULES_GREGORIAN;
        let today = props.date || new Date();
        let monthViewLayout = props.monthViewLayout || MonthViewLayout.VERTICAL;
        let reckoning = props.reckoning || RECKONING_STEWARDS;

        let startDay = props.startDay || 21;
        let startDate = props.startDate || fullYearDate(0, 11, startDay);
        let calendar = makeGondorCalendarDates(today, startDate, reckoning, calendarRules);
        let monthView = props.yearView ? -1 : calendar.todayGondor.month;

        this.state = {
            calendarControls: calendarControls,
            startDate: startDate,
            calendar: calendar,
            today: today,
            monthView: monthView,
            monthViewLayout: monthViewLayout,
            reckoning: reckoning,
            calendarRules: calendarRules,
            language: language
        };

        this.makeCalendarDates       = this.makeCalendarDates.bind(this);
        this.onMonthViewChange       = this.onMonthViewChange.bind(this);
        this.onViewCalendarMonth     = this.onViewCalendarMonth.bind(this);
        this.onCalendarStartChange   = this.onCalendarStartChange.bind(this);
        this.onStartMonthChange      = this.onStartMonthChange.bind(this);
        this.onMonthViewLayoutChange = this.onMonthViewLayoutChange.bind(this);
        this.onLanguageChange        = this.onLanguageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let today = nextProps.date || this.state.today;
        let startDate = nextProps.startDate || this.state.startDate;
        let language = nextProps.language || this.state.language;
        let reckoning = nextProps.reckoning || this.state.reckoning;
        let monthViewLayout = nextProps.monthViewLayout || this.state.monthViewLayout;
        let calendarRules = nextProps.calendarRules || this.state.calendarRules;
        let calendar = this.state.calendar;

        if (nextProps.startDay && !nextProps.startDate) {
            startDate = new Date(startDate);
            startDate.setDate(nextProps.startDay);
        }

        if (!datesMatch(startDate, this.state.startDate) ||
            !datesMatch(today, this.state.today) ||
            !datesMatch(today, calendar.today)) {
            calendar = makeGondorCalendarDates(today, startDate, reckoning, calendarRules);
        }

        this.setState({
            today: today,
            calendar: calendar,
            language: language,
            calendarRules: calendarRules,
            reckoning: reckoning,
            startDate: startDate,
            monthViewLayout: monthViewLayout,
            monthView: this.state.monthView < 0 || nextProps.yearView ? -1 : calendar.todayGondor.month
        });
    }

    makeCalendarDates(today, startDate) {
        return makeGondorCalendarDates(today, startDate, this.state.reckoning, this.state.calendarRules);
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
            monthView: calendar.todayGondor.month
        });
    }

    onCalendarStartChange(startDate) {
        let calendar = makeGondorCalendarDates(this.state.calendar.today,
                                               startDate,
                                               this.state.reckoning,
                                               this.state.calendarRules);

        this.setState({
            startDate: startDate,
            calendar: calendar
        });
    }

    onStartMonthChange(event) {
        let reckoning = event.target.value;
        let calendar = makeGondorCalendarDates(this.state.calendar.today,
                                               this.state.startDate,
                                               reckoning,
                                               this.state.calendarRules);
        let monthView = convertGondorianMonthIndex(this.state.reckoning,
                                                   reckoning,
                                                   this.state.monthView);

        this.setState({
            calendar: calendar,
            monthView: this.state.monthView < 0 ? -1 : monthView,
            reckoning: reckoning
        });
    }

    onMonthViewLayoutChange(event) {
        this.setState({monthViewLayout: event.target.value});
    }

    onLanguageChange(event) {
        this.setState({language: event.target.value});
    }

    renderDay(date, today) {
        let language = this.state.language;
        let reckoning = this.state.reckoning;
        let reckoningDesc =
            reckoning === RECKONING_NEW ?
                "New Reckoning" :
                reckoning === RECKONING_KINGS ?
                    "Kings' Reckoning" :
                    "Stewards' Reckoning";

        switch (date.day) {
            case "Yestarë":
                return (
                    <IntercalaryDay key="GondorianNewYear"
                                    name={language === LanguagePicker.ENGLISH ? "First Day" : "Yestarë"}
                                    description={reckoningDesc + " New Year's Day!"}
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Tuilérë":
                return (
                    <IntercalaryDay key="Stewards-Midspring"
                                    name={language === LanguagePicker.ENGLISH ? "Spring-day" : "Tuilérë"}
                                    description="Stewards' Midspring Day"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Cormarë":
                return (
                    <IntercalaryDay key={"Gondorian-Leapday" + date.weekDay}
                                    name={language === LanguagePicker.ENGLISH ? "Ringday" : "Cormarë"}
                                    description="Ring-bearer's Day"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Loëndë":
                return (
                    <IntercalaryDay key={"Gondorian-Midyear" + date.weekDay}
                                    name={language === LanguagePicker.ENGLISH ? "Midyear's Day" : "Loëndë"}
                                    description="Midyear's Day"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Enderë":
                return (
                    <IntercalaryDay key={"GondorianMiddleday-" + date.weekDay}
                                    name={language === LanguagePicker.ENGLISH ? "Middleday" : "Enderë"}
                                    description="Middleday"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Yáviérë":
                return (
                    <IntercalaryDay key={"Stewards-Midautumn"}
                                    name={language === LanguagePicker.ENGLISH ? "Autumn-day" : "Yáviérë"}
                                    description="Stewards' Midautumn Day"
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            case "Mettarë":
                return (
                    <IntercalaryDay key="GondorianNewYearsEve"
                                    name={language === LanguagePicker.ENGLISH ? "Last Day" : "Mettarë"}
                                    description={reckoningDesc + " New Year's Eve!"}
                                    currentDate={today}
                                    gregorian={date.gregorian} />
                );

            default:
                let startMonth = reckoning === RECKONING_NEW ? 3 : 0;
                let month = GondorMonths[(date.month+startMonth)%12];
                let weekday = GondorWeekdays[date.weekDay];

                return (
                    <DateCell key={date.day + month[language]}
                              date={date}
                              currentDate={today}
                              month={month[language]}
                              description={month.description}
                              weekday={weekday[language]}
                              className={month.className}/>
                );
        }
    }

    renderMonth() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;
        let monthView = this.state.monthView;

        let week = [];
        let weeks = [];

        let i = 0, date = dates[i];
        for (;
            i < dates.length && date.month !== monthView;
            i++, date = dates[i]) {
            // seek ahead to current month view
        }

        addMonthFiller(week, dates[i].weekDay);

        for (;
            i < dates.length && (monthView < 0 || monthView === dates[i].month);
            i++, date = dates[i]) {
            week.push(this.renderDay(date, today));

            if ((date.weekDay + 1) % 7 === 0) {
                weeks.push(<tr key={weeks.length} >{week}</tr>);
                week = [];
            }
        }

        // eslint-disable-next-line
        switch (monthView) {
            // no default case required
            case 2:
                if (date.day === "Tuilérë") {
                    week.push(this.renderDay(date, today));
                }

                break;

            case 5:
                date = dates[i];
                for (; date.day === "Enderë" || date.day === "Loëndë"; i++, date = dates[i]) {
                    week.push(this.renderDay(date, today));

                    if ((date.weekDay + 1) % 7 === 0) {
                        weeks.push(<tr key={weeks.length} >{week}</tr>);
                        week = [];
                    }
                }

                break;

            case 8:
                if (date.day === "Yáviérë") {
                    week.push(this.renderDay(date, today));
                }

                break;
        }

        if (week.length > 0) {
            weeks.push(<tr key={weeks.length} >{week}</tr>);
        }

        return weeks;
    }

    renderMonthVertical() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;
        let monthView = this.state.monthView;
        let language = this.state.language;

        let weeks = GondorWeekdays.map(function (weekday) {
            let weekdayName = weekday[language];
            return [(
                <WeekDayHeaderCell key={weekdayName}
                                   name={weekdayName}
                                   description={weekday.description}
                                   colSpan='2' />
            )];
        });

        let i = 0, date = dates[i];
        for (;
            i < dates.length && date.month !== monthView;
            i++, date = dates[i]) {
            // seek ahead to current month view
        }

        addVerticalMonthFiller(weeks, dates[i].weekDay);

        for (;
            i < dates.length && (monthView < 0 || monthView === dates[i].month);
            i++, date = dates[i]) {
            weeks[date.weekDay].push(this.renderDay(date, today));
        }

        // eslint-disable-next-line
        switch (monthView) {
            // no default case required
            case 2:
                if (date.day === "Tuilérë") {
                    weeks[date.weekDay].push(this.renderDay(date, today));
                }

                break;

            case 5:
                date = dates[i];
                for (; date.day === "Enderë" || date.day === "Loëndë"; i++, date = dates[i]) {
                    weeks[date.weekDay].push(this.renderDay(date, today));
                }

                break;
            case 8:
                if (date.day === "Yáviérë") {
                    weeks[date.weekDay].push(this.renderDay(date, today));
                }

                break;
        }

        if (weeks[0].length > 6) {
            weeks = GondorWeekdays.map(function (weekday, i) {
                let week = weeks[i];
                let weekdayName = weekday[language];

                week.shift();
                week.unshift(
                    <WeekDayHeaderCell key={weekdayName}
                                       name={weekdayName}
                                       description={weekday.description} />
                );

                return week;
            });
        }

        return weeks.map(function (week, i) {
            return (<tr key={i} >{week}</tr>);
        });
    }

    renderYear() {
        let today = this.state.today;
        let dates = this.state.calendar.dates;

        let week = [];
        let weeks = [];

        addMonthFiller(week, dates[0].weekDay);

        for (let i = 0, date = dates[i]; i < dates.length; i++, date = dates[i]) {
            week.push(this.renderDay(date, today));

            if ((date.weekDay + 1) % 7 === 0) {
                weeks.push(<tr key={weeks.length} >{week}</tr>);
                week = [];
            }
        }

        if (week.length > 0) {
            weeks.push(<tr key={weeks.length} >{week}</tr>);
        }

        return weeks;
    }

    renderCalendarControls() {
        let reckoning = this.state.reckoning;
        let startMonth = reckoning === RECKONING_NEW ? 3 : 0;
        let language = this.state.language;
        let monthNames = [];
        for (let i = startMonth; i < (GondorMonths.length + startMonth); i++) {
            monthNames.push(GondorMonths[i%12][language]);
        }

        return (
            <tr>
                <td colSpan='2' className='gondor-calendar-controls' >
                    <StartDatePicker month="December"
                                     startRange={18}
                                     endRange={25}
                                     startDate={this.state.startDate}
                                     onCalendarStartChange={this.onCalendarStartChange} />
                    <select className="gondor-rules-select"
                            value={reckoning}
                            onChange={this.onStartMonthChange} >
                        <option value={RECKONING_KINGS}>Kings' Reckoning</option>
                        <option value={RECKONING_STEWARDS}>Stewards' Reckoning</option>
                        <option value={RECKONING_NEW}>New Reckoning</option>
                    </select>
                </td>
                <td colSpan='3' className='gondor-calendar-controls month-picker-container' >
                    <MonthViewPicker monthNames={monthNames}
                                     today={this.state.today}
                                     calendar={this.state.calendar}
                                     startDate={this.state.startDate}
                                     monthView={this.state.monthView}
                                     makeCalendarDates={this.makeCalendarDates}
                                     onMonthViewChange={this.onMonthViewChange}
                                     onViewCalendarMonth={this.onViewCalendarMonth} />
                </td>
                <td className='gondor-calendar-controls' >
                    <LanguagePicker language={this.state.language}
                                    onLanguageChange={this.onLanguageChange} />
                </td>
                <td className='gondor-calendar-controls' >
                    <MonthViewLayout layout={this.state.monthViewLayout}
                                     onMonthViewLayoutChange={this.onMonthViewLayoutChange} />
                </td>
            </tr>
        );
    }

    render() {
        let language = this.state.language;
        let weekDayHeader = (
            <tr>
                {GondorWeekdays.map(function (weekday) {
                    let weekdayName = weekday[language];
                    return (
                        <WeekDayHeaderCell key={weekdayName}
                                           name={weekdayName}
                                           description={weekday.description} />
                    );
                })}
            </tr>
        );

        let weeks;
        if (this.state.monthView < 0) {
            weeks = this.renderYear();
        } else if (this.state.monthViewLayout === MonthViewLayout.VERTICAL) {
            weeks = this.renderMonthVertical();
            weekDayHeader = <VerticalLayoutFiller weekdays={GondorWeekdays} />;
        } else {
            weeks = this.renderMonth();
        }

        let controls = this.state.calendarControls ? this.renderCalendarControls() : null;

        let caption = null;
        if (this.props.caption) {
            let captionDisplay = this.props.caption;
            if (this.props.caption === true) {
                switch (this.state.reckoning) {
                    case RECKONING_KINGS:
                        captionDisplay = "Kings' Reckoning";
                        break;
                    case RECKONING_STEWARDS:
                        captionDisplay = "Stewards' Reckoning";
                        break;
                    case RECKONING_NEW:
                        captionDisplay = "New Reckoning";
                        break;
                    default:
                        captionDisplay = "Gondor Reckoning";
                        break;
                }
            }

            caption = (
                <caption className='gondor-caption'>{captionDisplay}</caption>
            );
        }

        return (
            <table className={this.props.className} >
                {caption}
                <thead>
                    {controls}
                    {weekDayHeader}
                </thead>
                <tbody>
                    {weeks}
                </tbody>
            </table>
        );
    }
}

export default GondorCalendar;
