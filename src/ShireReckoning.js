/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import {
    toDaysElapsed,
    daysElapsedToGregorianYear,
    daysElapsedToSecondAgeYear,
    getNewYearDate,
    getWeekDay,
    datesMatch,
    fullYearDate,
    getNextDate,
} from "./Utils";

import {
    RECKONING_RULES_GREGORIAN,
    RECKONING_RULES_TRADITIONAL,
    isMillennialLeapYear,
    isGondorLeapYear,
} from "./GondorReckoning";

const REGION_NAMES_TOLKIEN = "tolkien";
const REGION_NAMES_SHIRE = "shire";
const REGION_NAMES_BREE = "bree";

/**
 * @typedef {Object} ShireWeekday
 * @property {string} emoji - An icon representing this weekday.
 * @property {string} tolkien - The Gregorian substitution Tolkien used for this weekday name.
 * @property {string} shire - The Shire name for this weekday.
 * @property {string} bree - The Bree name for this weekday.
 * @property {string} description
 */

/**
 * Weekday names and descriptions
 * @constant
 * @type {ShireWeekday[]}
 */
const ShireWeekdays = [
    {
        emoji: "⭐",
        tolkien: "Saturday",
        shire: "Sterday",
        bree: "Sterday",
        // prettier-ignore
        description:
`Tolkien: Saturday
Shire: Sterday
Star Day. From the archaic Sterrendei (from Old English steorra dæg).`
    },
    {
        emoji: "☀️",
        tolkien: "Sunday",
        shire: "Sunday",
        bree: "Sunday",
        // prettier-ignore
        description:
`Tolkien: Sunday
Shire: Sunday
Sun Day. From the archaic Sunnendei (from Old English sunne dæg).`
    },
    {
        emoji: "🌙",
        tolkien: "Monday",
        shire: "Monday",
        bree: "Monday",
        // prettier-ignore
        description:
`Tolkien: Monday
Shire: Monday
Moon Day. From the archaic Monendei (from Old English mōna dæg).`
    },
    {
        emoji: "🌳",
        tolkien: "Tuesday",
        shire: "Trewsday",
        bree: "Trewsday",
        // prettier-ignore
        description:
`Tolkien: Tuesday
Shire: Trewsday
Trees Day. From the archaic Trewesdei (from Old English trēow dæg).`
    },
    {
        emoji: "🌌",
        tolkien: "Wednesday",
        shire: "Hevensday",
        bree: "Hevensday",
        // prettier-ignore
        description:
`Tolkien: Wednesday
Shire: Hevensday
Heavens Day. From the archaic Hevensdei (from Old English heofen dæg).`
    },
    {
        emoji: "🌊",
        tolkien: "Thursday",
        shire: "Mersday",
        bree: "Mersday",
        // prettier-ignore
        description:
`Tolkien: Thursday
Shire: Mersday
Sea Day. From the archaic Meresdei (from Old English mere dæg).`
    },
    {
        emoji: "🏔",
        tolkien: "Friday",
        shire: "Highday",
        bree: "Highday",
        // prettier-ignore
        description:
`Tolkien: Friday
Shire: Highday
High Day. From the archaic Hihdei (from Old English hēah dæg).`
    },
];

/**
 * @typedef {Object} ShireMonth
 * @property {string} emoji - An icon representing this month.
 * @property {string} tolkien - The Gregorian substitution Tolkien used for this month name.
 * @property {string} shire - The Shire name for this month.
 * @property {string} bree - The Bree name for this month.
 * @property {string} description
 * @property {string} className - UI-hint for styling this month.
 */

/**
 * Month names and descriptions.
 * @constant
 * @type {ShireMonth[]}
 */
const ShireMonths = [
    {
        emoji: "🌄",
        tolkien: "January",
        shire: "Afteryule",
        bree: "Frery",
        // prettier-ignore
        description:
`Tolkien: January
Shire: Afteryule
Bree: Frery
The month after the winter solstice (Midwinter),
from æfter Gēola 'after Winter Solstice',
and from frēorig 'freezing, frigid'.`,
        className: "afteryule",
    },
    {
        emoji: "🌧",
        tolkien: "February",
        shire: "Solmath",
        bree: "Solmath",
        // prettier-ignore
        description:
`Tolkien: February
Shire: Solmath
Bree: Solmath
From Solmōnað, perhaps from the Old English word for mud, 'sol'.
Muddy Month.`,
        className: "solmath",
    },
    {
        emoji: "🌬",
        tolkien: "March",
        shire: "Rethe",
        bree: "Rethe",
        // prettier-ignore
        description:
`Tolkien: March
Shire: Rethe
Bree: Rethe
From Hrēðmōnað 'glory-month'. Month of the Goddess Hrēþ or Hretha, according to the Venerable Bede.`,
        className: "rethe",
    },
    {
        emoji: "🌱",
        tolkien: "April",
        shire: "Astron",
        bree: "Chithing",
        // prettier-ignore
        description:
`Tolkien: April
Shire: Astron
Bree: Chithing
From Ēastermōnað 'Easter-month', named after the Goddess Ēostre,
and from cīþing 'growing thing' (cīþ 'young shoot, sprout').`,
        className: "astron",
    },
    {
        emoji: "🌼",
        tolkien: "May",
        shire: "Thrimidge",
        bree: "Thrimidge",
        // prettier-ignore
        description:
`Tolkien: May
Shire: Thrimidge
Bree: Thrimidge
The month of plenty, when cows were given three milkings (þri-milce) daily.`,
        className: "thrimidge",
    },
    {
        emoji: "☀️",
        tolkien: "June",
        shire: "Forelithe",
        bree: "Lithe",
        // prettier-ignore
        description:
`Tolkien: June
Shire: Forelithe
Bree: Lithe
The month before the summer solstice (Midsummer), when 'litha' (gentle or navigable) weather encouraged voyages.
From ǣrra Līða 'before Litha'.`,
        className: "forelithe",
    },
    {
        emoji: "🍃",
        tolkien: "July",
        shire: "Afterlithe",
        bree: "Mede",
        // prettier-ignore
        description:
`Tolkien: July
Shire: Afterlithe
Bree: Mede
The month after the summer solstice (Midsummer), from æfter Līða, and from mǣd 'mead, meadow'.`,
        className: "afterlithe",
    },
    {
        emoji: "🌿",
        tolkien: "August",
        shire: "Wedmath",
        bree: "Wedmath",
        // prettier-ignore
        description:
`Tolkien: August
Shire: Wedmath
Bree: Wedmath
When fields were beset by weeds, from Wēodmōnað 'weed-month'.`,
        className: "wedmath",
    },
    {
        emoji: "🍇",
        tolkien: "September",
        shire: "Halimath",
        bree: "Harvestmath",
        // prettier-ignore
        description:
`Tolkien: September
Shire: Halimath
Bree: Harvestmath
The holy month of offerings, from Hāligmōnað 'holy-month', and from Hærfestmōnað 'harvest-month'.`,
        className: "halimath",
    },
    {
        emoji: "🍂",
        tolkien: "October",
        shire: "Winterfilth",
        bree: "Wintring",
        // prettier-ignore
        description:
`Tolkien: October
Shire: Winterfilth
Bree: Wintring
The filling of winter's first full moon, according to the Venerable Bede.
Tolkien instead suggests the "filling" or completion of the year before Winter, after the harvest.
From Winterfylleð 'winter fullness', and wintrig 'wintry, winter'.`,
        className: "winterfilth",
    },
    {
        emoji: "🌫",
        tolkien: "November",
        shire: "Blotmath",
        bree: "Blooting",
        // prettier-ignore
        description:
`Tolkien: November
Shire: Blotmath
Bree: Blooting
From Blōtmōnað 'sacrifice-month'.`,
        className: "blotmath",
    },
    {
        emoji: "❄️",
        tolkien: "December",
        shire: "Foreyule",
        bree: "Yulemath",
        // prettier-ignore
        description:
`Tolkien: December
Shire: Foreyule
Bree: Yulemath
The month before the winter solstice (Midwinter),
from ǣrra Gēola 'before Winter Solstice', and from Gēolamōnað 'Yule-month'.`,
        className: "foreyule",
    },
];

/**
 * @typedef {Date} FirstShireNewYearDate
 * @default new Date(0, 11, 21, 0,0,0)
 *
 * The Gregorian Date corresponding to the first Shire New Year Date.
 * The default year is 0 in order to keep Shire leap-years in sync with Gregorian leap-years.
 */

/**
 * @param {FirstShireNewYearDate} [startDate]
 * @return {FirstShireNewYearDate} startDate if not null, otherwise the default first New Year Date.
 */
const getStartDate = startDate => {
    if (!startDate) {
        startDate = fullYearDate(0, 11, 21);
    }

    return startDate;
};

/**
 * @param {Date} today
 * @param {FirstShireNewYearDate} [startDate]
 * @param {GondorLeapYearRuleEnum} [rules=RECKONING_RULES_GREGORIAN]
 *
 * @return {Date} The Gregorian Date corresponding to the Shire New Year Date
 *                for the year of the given `today`.
 */
const getShireNewYearDate = (
    today,
    startDate,
    rules = RECKONING_RULES_GREGORIAN
) => {
    startDate = getStartDate(startDate);

    const getYearWithRemainder =
        rules === RECKONING_RULES_TRADITIONAL
            ? daysElapsedToSecondAgeYear
            : daysElapsedToGregorianYear;

    const yearWithRemainder = getYearWithRemainder(
        toDaysElapsed(startDate, today)
    );

    return getNewYearDate(startDate, today, yearWithRemainder.daysRemainder);
};

/**
 * @typedef {Object} ShireDate
 * @property {(number|string)} day - The number of the day of the month, if this date is not intercalary; otherwise, the name of the intercalary date.
 * @property {number} month - The month index of {@link ShireMonths}.
 * @property {number} weekDay - The weekday index of {@link ShireWeekdays}.
 * @property {Date} gregorian - The corresponding Gregorian date.
 */

/**
 * @typedef {Object} ShireCalendarYear
 * @property {number} year - The current Shire year.
 * @property {ShireDate[]} dates - The dates of this Shire calendar year.
 * @property {Date} today - The given Gregorian Date this calendar year was generated from.
 * @property {ShireDate} todayShire - The current Shire date corresponding to the given [today]{@link ShireCalendarYear#today}.
 */

/**
 * Generates a calendar year for the given Date `today`, according to the given `startDate`.
 *
 * @param {Date} today
 * @param {FirstShireNewYearDate} [startDate]
 * @param {GondorLeapYearRuleEnum} [rules=RECKONING_RULES_GREGORIAN]
 *
 * @return {ShireCalendarYear} The calendar year for the given `today`.
 */
const makeShireCalendarDates = (
    today,
    startDate,
    rules = RECKONING_RULES_GREGORIAN
) => {
    startDate = getStartDate(startDate);

    const reckonTraditional = rules === RECKONING_RULES_TRADITIONAL;

    const getYearWithRemainder = reckonTraditional
        ? daysElapsedToSecondAgeYear
        : daysElapsedToGregorianYear;

    const daysElapsed = toDaysElapsed(startDate, today);
    const yearWithRemainder = getYearWithRemainder(daysElapsed);
    const year = yearWithRemainder.year;

    let gregorianDate = getNewYearDate(
        startDate,
        today,
        yearWithRemainder.daysRemainder
    );

    let todayShire;
    let weekDay = 0;
    let shireReform = true;

    if (reckonTraditional) {
        // Shire-reform was enacted during the time of Isengrim II, sometime between T.A. 2683 - 2722.
        // So probably starting with one of these years (if Kings' weekdays were reckoned continuously from S.A. 1):
        // 2685 2691 2703 2714 2720
        shireReform = year >= 2703 + 3441;

        if (!shireReform) {
            weekDay = getWeekDay(
                daysElapsed,
                yearWithRemainder.daysRemainder,
                7
            );
        }
    }

    const dates = [
        {
            day: "2 Yule",
            month: 0,
            weekDay: weekDay++ % 7,
            gregorian: gregorianDate,
        },
    ];

    if (datesMatch(today, gregorianDate)) {
        todayShire = dates[0];
    }

    gregorianDate = getNextDate(gregorianDate);

    for (let month = 0; month < 12; month++) {
        for (
            let day = 1;
            day <= 30;
            day++, weekDay++, gregorianDate = getNextDate(gregorianDate)
        ) {
            dates.push({
                day: day,
                month: month,
                weekDay: weekDay % 7,
                gregorian: gregorianDate,
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length - 1];
            }
        }

        if (month === 5) {
            const millennialLeapYear =
                reckonTraditional && isMillennialLeapYear(year);

            dates.push({
                day: "1 Lithe",
                region: {
                    tolkien: "1 Lithe",
                    shire: "1 Lithe",
                    bree: "1 Summerday",
                },
                month: shireReform ? month : month + 1,
                weekDay: weekDay % 7,
                gregorian: gregorianDate,
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length - 1];
            }

            let summerday = 2;
            if (millennialLeapYear) {
                if (!shireReform) {
                    weekDay++;
                }

                gregorianDate = getNextDate(gregorianDate);
                dates.push({
                    day: "Overlithe",
                    region: {
                        tolkien: "Overlithe",
                        shire: "Overlithe",
                        bree: `${summerday++} Summerday`,
                    },
                    month: shireReform ? month : month + 1,
                    weekDay: weekDay % 7,
                    gregorian: gregorianDate,
                });

                if (datesMatch(today, gregorianDate)) {
                    todayShire = dates[dates.length - 1];
                }
            }

            if (!shireReform) {
                weekDay++;
            }

            gregorianDate = getNextDate(gregorianDate);
            dates.push({
                day: "Midyear's Day",
                month: shireReform && !millennialLeapYear ? month : month + 1,
                weekDay: weekDay % 7,
                gregorian: gregorianDate,
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length - 1];
            }

            summerday++;
            weekDay++;
            const leapYear = isGondorLeapYear(year, rules);
            if (leapYear) {
                gregorianDate = getNextDate(gregorianDate);
                dates.push({
                    day: "Overlithe",
                    region: {
                        tolkien: "Overlithe",
                        shire: "Overlithe",
                        bree: `${summerday++} Summerday`,
                    },
                    month: month + 1,
                    weekDay: weekDay % 7,
                    gregorian: gregorianDate,
                });

                if (datesMatch(today, gregorianDate)) {
                    todayShire = dates[dates.length - 1];
                }

                if (!shireReform) {
                    weekDay++;
                }
            }

            gregorianDate = getNextDate(gregorianDate);
            dates.push({
                day: "2 Lithe",
                region: {
                    tolkien: "2 Lithe",
                    shire: "2 Lithe",
                    bree: `${summerday++} Summerday`,
                },
                month: month + 1,
                weekDay: weekDay % 7,
                gregorian: gregorianDate,
            });

            if (datesMatch(today, gregorianDate)) {
                todayShire = dates[dates.length - 1];
            }

            gregorianDate = getNextDate(gregorianDate);
            weekDay++;
        }
    }

    dates.push({
        day: "1 Yule",
        month: 11,
        weekDay: weekDay % 7,
        gregorian: gregorianDate,
    });

    if (datesMatch(today, gregorianDate)) {
        todayShire = dates[dates.length - 1];
    }

    return {
        year,
        dates,
        today,
        todayShire,
    };
};

export {
    ShireWeekdays,
    ShireMonths,
    REGION_NAMES_TOLKIEN,
    REGION_NAMES_SHIRE,
    REGION_NAMES_BREE,
    getShireNewYearDate,
    makeShireCalendarDates,
};
