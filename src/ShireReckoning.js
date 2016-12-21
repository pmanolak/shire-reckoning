/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import { datesMatch, getNextDate, isLeapYear } from './Utils';

const ShireWeekdays = [
    {
        tolkien: 'Saturday',
        shire: 'Sterday',
        bree: 'Sterday',
        description:
`Tolkien: Saturday
Shire: Sterday
Star Day. From the archaic Sterrendei (from Old English steorra dæg).`
    },
    {
        tolkien: 'Sunday',
        shire: 'Sunday',
        bree: 'Sunday',
        description:
`Tolkien: Sunday
Shire: Sunday
Sun Day. From the archaic Sunnendei (from Old English sunne dæg).`
    },
    {
        tolkien: 'Monday',
        shire: 'Monday',
        bree: 'Monday',
        description:
`Tolkien: Monday
Shire: Monday
Moon Day. From the archaic Monendei (from Old English mōna dæg).`
    },
    {
        tolkien: 'Tuesday',
        shire: 'Trewsday',
        bree: 'Trewsday',
        description:
`Tolkien: Tuesday
Shire: Trewsday
Trees Day. From the archaic Trewesdei (from Old English trēow dæg).`
    },
    {
        tolkien: 'Wednesday',
        shire: 'Hevensday',
        bree: 'Hevensday',
        description:
`Tolkien: Wednesday
Shire: Hevensday
Heavens Day. From the archaic Hevensdei (from Old English heofen dæg).`
    },
    {
        tolkien: 'Thursday',
        shire: 'Mersday',
        bree: 'Mersday',
        description:
`Tolkien: Thursday
Shire: Mersday
Sea Day. From the archaic Meresdei (from Old English mere dæg).`
    },
    {
        tolkien: 'Friday',
        shire: 'Highday',
        bree: 'Highday',
        description:
`Tolkien: Friday
Shire: Highday
High Day. From the archaic Hihdei (from Old English hēah dæg).`
    }
];

const ShireMonths = [
    {
        tolkien: 'January',
        shire: 'Afteryule',
        bree: 'Frery',
        description:
`Tolkien: January
Shire: Afteryule
Bree: Frery
The month after the winter solstice (Midwinter),
from æfter Gēola 'after Winter Solstice',
and from frēorig 'freezing, frigid'.`,
        className: "afteryule"
    },
    {
        tolkien: 'February',
        shire: 'Solmath',
        bree: 'Solmath',
        description:
`Tolkien: February
Shire: Solmath
Bree: Solmath
From Solmōnað, perhaps from the Old English word for mud, 'sol'.
Muddy Month.`,
        className: "solmath"
    },
    {
        tolkien: 'March',
        shire: 'Rethe',
        bree: 'Rethe',
        description:
`Tolkien: March
Shire: Rethe
Bree: Rethe
From Hrēðmōnað 'glory-month'. Month of the Goddess Hrēþ or Hretha, according to the Venerable Bede.
Month of Wildness or Roaring Winds.`,
        className: "rethe"
    },
    {
        tolkien: 'April',
        shire: 'Astron',
        bree: 'Chithing',
        description:
`Tolkien: April
Shire: Astron
Bree: Chithing
From Ēastermōnað 'Easter-month', named after the Goddess Ēostre,
and from cīþing 'growing thing' (cīþ 'young shoot, sprout').
Spring Month.`,
        className: "astron"
    },
    {
        tolkien: 'May',
        shire: 'Thrimidge',
        bree: 'Thrimidge',
        description:
`Tolkien: May
Shire: Thrimidge
Bree: Thrimidge
The month of plenty, when cows were given three milkings (þri-milce) daily.`,
        className: "thrimidge"
    },
    {
        tolkien: 'June',
        shire: 'Forelithe',
        bree: 'Lithe',
        description:
`Tolkien: June
Shire: Forelithe
Bree: Lithe
The month before the summer solstice (Midsummer), when litha (gentle, mild) weather encouraged voyages.
From ǣrra Līða 'before Litha'.
Calm or Navigable Month.`,
        className: "forelithe"
    },
    {
        tolkien: 'July',
        shire: 'Afterlithe',
        bree: 'Mede',
        description:
`Tolkien: July
Shire: Afterlithe
Bree: Mede
The month after the summer solstice (Midsummer), from æfter Līða, and from mǣd 'mead, meadow'.
Meadow Month.`,
        className: "afterlithe"
    },
    {
        tolkien: 'August',
        shire: 'Wedmath',
        bree: 'Wedmath',
        description:
`Tolkien: August
Shire: Wedmath
Bree: Wedmath
When fields were beset by weeds, from Wēodmōnað 'weed-month'.
Plant Month.`,
        className: "wedmath"
    },
    {
        tolkien: 'September',
        shire: 'Halimath',
        bree: 'Harvestmath',
        description:
`Tolkien: September
Shire: Halimath
Bree: Harvestmath
The holy month of offerings, from Hāligmōnað 'holy-month', and from Hærfestmōnað 'harvest-month'.
Harvest Month.`,
        className: "halimath"
    },
    {
        tolkien: 'October',
        shire: 'Winterfilth',
        bree: 'Wintring',
        description:
`Tolkien: October
Shire: Winterfilth
Bree: Wintring
The filling of winter's first full moon, according to the Venerable Bede.
Tolkien instead suggests the "filling" or completion of the year before Winter, after the harvest.
From Winterfylleð 'winter fullness', and wintrig 'wintry, winter'.
Wine Month.`,
        className: "winterfilth"
    },
    {
        tolkien: 'November',
        shire: 'Blotmath',
        bree: 'Blooting',
        description:
`Tolkien: November
Shire: Blotmath
Bree: Blooting
The Month of Sacrifice, from Blōtmōnað 'sacrifice-month'.`,
        className: "blotmath"
    },
    {
        tolkien: 'December',
        shire: 'Foreyule',
        bree: 'Yulemath',
        description:
`Tolkien: December
Shire: Foreyule
Bree: Yulemath
The month before the winter solstice (Midwinter),
from ǣrra Gēola 'before Winter Solstice', and from Gēolamōnað 'Yule-month'.`,
        className: "foreyule"
    }
];

const getShireNewYearDate = (today, startDay) => {
    let startYear = today.getFullYear();
    if (today.getMonth() < 11 || today.getDate() < startDay) {
        startYear--;
    }

    let newYearDate = new Date(startYear,11,startDay, 0,0,0);
    // reset full year for years 0-99
    newYearDate.setFullYear(startYear);

    return newYearDate;
};

const makeShireCalendarDates = (today, startDay) => {
    let gregorianDate = getShireNewYearDate(today, startDay);
    let todayShire;

    let dates = [{
        "day": "2 Yule",
        "month": 0,
        "weekDay": 0,
        "gregorian": gregorianDate
    }];

    if (datesMatch(today, gregorianDate)) {
        todayShire = dates[0];
    }

    gregorianDate = getNextDate(gregorianDate);

    for (let month = 0, weekDay = 1; month < 12; month++) {
        for (let day = 1; day <= 30; day++, weekDay++, gregorianDate = getNextDate(gregorianDate)) {
            dates.push({
                "day": day,
                "month": month,
                "weekDay": weekDay % 7,
                "gregorian": gregorianDate
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length-1];
            }
        }

        if (month === 5) {
            dates.push({
                "day": "1 Lithe",
                "region": {
                    "tolkien": "1 Lithe",
                    "shire": "1 Lithe",
                    "bree": "1 Summerday"
                },
                "month": month,
                "weekDay": weekDay % 7,
                "gregorian": gregorianDate
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length-1];
            }

            gregorianDate = getNextDate(gregorianDate);
            dates.push({
                "day": "Midyear's Day",
                "month": month,
                "weekDay": weekDay % 7,
                "gregorian": gregorianDate
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length-1];
            }

            weekDay++;
            let leapYear = isLeapYear(gregorianDate);
            if (leapYear) {
                gregorianDate = getNextDate(gregorianDate);
                dates.push({
                    "day": "Overlithe",
                    "region": {
                        "tolkien": "Overlithe",
                        "shire": "Overlithe",
                        "bree": "3 Summerday"
                    },
                    "month": month+1,
                    "weekDay": weekDay % 7,
                    "gregorian": gregorianDate
                });

                if (datesMatch(today, gregorianDate)) {
                    todayShire = dates[dates.length-1];
                }
            }

            gregorianDate = getNextDate(gregorianDate);
            dates.push({
                "day": "2 Lithe",
                "region": {
                    "tolkien": "2 Lithe",
                    "shire": "2 Lithe",
                    "bree": leapYear ? "4 Summerday" : "3 Summerday"
                },
                "month": month+1,
                "weekDay": weekDay % 7,
                "gregorian": gregorianDate
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length-1];
            }

            gregorianDate = getNextDate(gregorianDate);
            weekDay++;
        }
    }

    dates.push({
        "day": "1 Yule",
        "month": 11,
        "weekDay": 6,
        "gregorian": gregorianDate
    });

    if (datesMatch(today, gregorianDate)) {
        todayShire = dates[dates.length-1];
    }

    return {
        dates: dates,
        today: today,
        todayShire: todayShire
    };
};

export { ShireWeekdays, ShireMonths, getShireNewYearDate, makeShireCalendarDates };