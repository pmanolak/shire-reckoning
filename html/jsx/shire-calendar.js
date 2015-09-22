/**
 * Copyright (C) 2015 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 * With thanks to http://shire-reckoning.com/calendar.html for all the helpful info.
 */

$(document).ready(function() {
    var ShireCalendar = React.createClass({
        weekdays: [
            {name: 'Sterday',   description: "Stars of Varda Day (sterrendei)."},
            {name: 'Sunday',    description: "Sun Day (sunnendei)."},
            {name: 'Monday',    description: "Moon Day (monendei)."},
            {name: 'Trewsday',  description: "Two Trees of Valinor Day (trewesdei)."},
            {name: 'Hevensday', description: "Heavens Day (hevensdei)."},
            {name: 'Mersday',   description: "Sea Day (meresdei)."},
            {name: 'Highday',   description: "Valar Day (hihdei)."}
        ],

        months: [
            {
                name: 'Afteryule',
                description: "Afteryule:\nThe month after the winter solstice (Midwinter) feast of Gēola or Giúl (Yule).",
                className: "afteryule"
            },
            {
                name: 'Solmath',
                description: "Solmath:\nSol Month. The return of the sun (sol), or perhaps from the Old English word for mud.\nMuddy Month.",
                className: "solmath"
            },
            {
                name: 'Rethe',
                description: "Rethe:\nMonth of the Goddess Hrēþ or Hretha.\nMonth of Wildness.",
                className: "rethe"
            },
            {
                name: 'Astron',
                description: "Astron:\nSpring month.\nNamed after the Goddess Ēostre.",
                className: "astron"
            },
            {
                name: 'Thrimidge',
                description: "Thrimidge:\nThe month of plenty, when cows were given three milkings (thri+milching) daily.",
                className: "thrimidge"
            },
            {
                name: 'Forelithe',
                description: "Forelithe:\nThe month before the summer solstice (Midsummer), when gentle (Litha) weather encouraged voyages.\nCalm or Navigable Month.",
                className: "forelithe"
            },
            {
                name: 'Afterlithe',
                description: "Afterlithe:\nThe month after the summer solstice (Midsummer).\nMeadow Month.",
                className: "afterlithe"
            },
            {
                name: 'Wedmath',
                description: "Wedmath:\nWhen fields were beset by weeds (weod).\nPlant Month.",
                className: "wedmath"
            },
            {
                name: 'Halimath',
                description: "Halimath:\nThe holy (haleg) month of sacred rites.\nHarvest Month.",
                className: "halimath"
            },
            {
                name: 'Winterfilth',
                description: "Winterfilth:\nThe filling (fylleth) of winter's first full moon, according to Bede; Tolkien instead suggests the \"filling\" or completion of the year before Winter, after the harvest.\nWine Month.",
                className: "winterfilth"
            },
            {
                name: 'Blotmath',
                description: "Blotmath:\nThe month of blood (blod).\nMonth of Sacrifice or Slaughter.",
                className: "blotmath"
            },
            {
                name: 'Foreyule',
                description: "Foreyule:\nThe month before the solstice (Midwinter) feast of Gēola or Giúl (Yule).",
                className: "foreyule"
            }
        ],

        getInitialState: function() {
            return {date: new Date()};
        },

        getNewYearDate: function (today) {
            var startYear = today.getFullYear();
            if (today.getMonth() < 11 || today.getDate() < 21) {
                startYear--;
            }

            return new Date(startYear,11,21, 0,0,0);
        },

        makeCalendarDates: function(today) {
            var gregorianDate = this.getNewYearDate(today);

            var dates = [{
                "day": "2 Yule",
                "month": 0,
                "weekDay": 0,
                "gregorian": gregorianDate
            }];

            gregorianDate = this.getNextDate(gregorianDate);

            for (var month = 0, weekDay = 1; month < 12; month++) {
                for (var day = 1; day <= 30; day++, weekDay++, gregorianDate = this.getNextDate(gregorianDate)) {
                    dates.push({
                        "day": day,
                        "month": month,
                        "weekDay": weekDay % 7,
                        "gregorian": gregorianDate
                    });
                }

                if (month == 5) {
                    dates.push({
                        "day": "1 Lithe",
                        "month": month,
                        "weekDay": weekDay % 7,
                        "gregorian": gregorianDate
                    });

                    gregorianDate = this.getNextDate(gregorianDate);
                    dates.push({
                        "day": "Mid-Year's Day",
                        "month": month,
                        "weekDay": weekDay % 7,
                        "gregorian": gregorianDate
                    });

                    weekDay++;
                    if (this.isLeapYear(gregorianDate)) {
                        gregorianDate = this.getNextDate(gregorianDate);
                        dates.push({
                            "day": "OverLithe",
                            "month": month+1,
                            "weekDay": weekDay % 7,
                            "gregorian": gregorianDate
                        });
                    }

                    gregorianDate = this.getNextDate(gregorianDate);
                    dates.push({
                        "day": "2 Lithe",
                        "month": month+1,
                        "weekDay": weekDay % 7,
                        "gregorian": gregorianDate
                    });

                    gregorianDate = this.getNextDate(gregorianDate);
                    weekDay++;
                }
            }

            dates.push({
                "day": "1 Yule",
                "month": 11,
                "weekDay": 6,
                "gregorian": gregorianDate
            });

            return dates;
        },

        getNextDate: function(today) {
            var tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            return tomorrow;
        },

        isLeapYear: function(date) {
            var year = date.getFullYear();
            return !((year % 4) || (!(year % 100) && (year % 400)));
        },

        render: function () {
            var today = this.state.date;
            var dates = this.makeCalendarDates(today);
            var week = [];
            var weeks = [];

            for (var i = 0; i < dates.length; i++) {
                var date = dates[i];

                switch (date.day) {
                    case "2 Yule":
                        week.push(
                            <IntercalaryDay
                                key="2-Yule"
                                description="Midwinter: Shire New Year!"
                                currentDate={today}
                                dates={[date]} />
                        );

                        break;

                    case "1 Lithe":
                        week.push(
                            <IntercalaryDay
                                key="Midsummer"
                                description="Midsummer's Eve and Midsummer's Day!"
                                currentDate={today}
                                dates={[date, dates[++i]]} />
                        );

                        weeks.push(<tr key={"week-" + (weeks.length + 1)} >{week}</tr>);
                        week = [];

                        break;

                    case "OverLithe":
                        week.push(
                            <IntercalaryDay
                                key="OverLithe"
                                description="Shire Leap Day and Day after Midsummer."
                                currentDate={today}
                                dates={[date, dates[++i]]} />
                        );

                        break;

                    case "2 Lithe":
                        week.push(
                            <IntercalaryDay
                                key="2-Lithe"
                                description="Day after Midsummer."
                                currentDate={today}
                                dates={[date]} />
                        );

                        break;

                    case "1 Yule":
                        week.push(
                            <IntercalaryDay
                                key="1-Yule"
                                description="Shire New Year's Eve!"
                                currentDate={today}
                                dates={[date]} />
                        );

                        weeks.push(<tr key={"week-" + (weeks.length + 1)} >{week}</tr>);
                        week = [];

                        break;

                    default:
                        var month = this.months[date.month];

                        week.push(
                            <DateCell key={date.day + month.name}
                                      date={date}
                                      currentDate={today}
                                      month={month.name}
                                      description={month.description}
                                      weekday={this.weekdays[date.weekDay].name}
                                      className={month.className}/>
                        );

                        if ((date.weekDay + 1) % 7 === 0) {
                            weeks.push(<tr key={"week-" + (weeks.length + 1)} >{week}</tr>);
                            week = [];
                        }

                        break;
                }
            }

            return (
                <table className='shire-calendar' >
                    <thead>
                        <WeekDayHeader weekdays={this.weekdays} />
                    </thead>
                    <tbody>
                        {weeks}
                    </tbody>
                </table>
            );
        }
    });

    var WeekDayHeaderCell = React.createClass({
        render: function() {
            return (
                <td className='weekday-header' title={this.props.description} >
                    {this.props.name}
                </td>
            );
        }
    });

    var WeekDayHeader = React.createClass({
        render: function() {
            var weekDayNodes = this.props.weekdays.map(function (weekday) {
                return (
                    <WeekDayHeaderCell key={weekday.name}
                                       name={weekday.name}
                                       description={weekday.description} />
                );
            });

            return (
                <tr>{weekDayNodes}</tr>
            );
        }
    });

    var DateCell = React.createClass({
        render: function() {
            var date = this.props.date;
            var dateTitle = this.props.description;
            var className = this.props.className;
            var currentDate = this.props.currentDate;
            var gregorianDate = date.gregorian;
            var dayColor = getDateColor(className, gregorianDate, currentDate);

            return (
                <td className={dayColor} title={dateTitle + "\n" + this.props.weekday} >
                    {date.day} {(date.day == 1) ? this.props.month : ''}
                    <br />
                    ({gregorianDate.toDateString()})
                </td>
            );
        }
    });

    var IntercalaryDay = React.createClass({
        render: function() {
            var dateTitle = this.props.description;
            var currentDate = this.props.currentDate;

            var dates = this.props.dates;
            var date = dates[0];
            var gregorianDate = date.gregorian;
            var dayColor = getDateColor('holiday', gregorianDate, currentDate);

            if (dates.length > 1) {
                var date2 = dates[1];
                dayColor = getDateColor(dayColor, date2.gregorian, currentDate);

                return (
                    <td className={dayColor} title={dateTitle} >
                        {date.day}
                        <br />
                        ({gregorianDate.toDateString()})
                        <hr />
                        {date2.day}
                        <br />
                        ({date2.gregorian.toDateString()})
                    </td>
                );
            }

            return (
                <td className={dayColor} title={dateTitle} >
                    {date.day}
                    <br />
                    ({gregorianDate.toDateString()})
                </td>
            );
        }
    });

    React.render(
        <ShireCalendar />,
        document.getElementById("shire-calendar")
    );

    function getDateColor(monthColor, date1, date2) {
        if (datesMatch(date1, date2)) {
            return "highlight";
        }

        return monthColor;
    }

    function datesMatch(date1, date2) {
        return date1.getFullYear() == date2.getFullYear() &&
               date1.getMonth() == date2.getMonth() &&
               date1.getDate() == date2.getDate();
    }
});
