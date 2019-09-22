/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

const secondAgeStartDate = new Date(0, 11, 23, 0, 0, 0);
secondAgeStartDate.setFullYear(0, 11, 23);

const ta3019 = new Date(3441 + 3019, 2, 14);

storiesOf(
    "Shire Reckoning: Shire Calendar / Traditional Rules / source / javascript",
    module
).add("for T.A. 3019: date of the destruction of the One Ring", () =>
    React.createElement(TolkienCalendars.ShireCalendar, {
        caption: "Shire Reckoning for T.A. 3019",
        calendarRules:
            TolkienCalendars.GondorCalendar.RECKONING_RULES_TRADITIONAL,
        region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
        yearView: true,
        date: ta3019,
        startDate: secondAgeStartDate,
        className: "shire-calendar",
    })
);
