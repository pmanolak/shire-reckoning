/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import * as TolkienCalendars from "../../../../lib";

export default {
    title: "Shire Reckoning / Rivendell Calendar / Season View / source / javascript",

    parameters: {
        options: { showPanel: true },
    },
};

export const WithReformedRulesStartingFromMarch20thInSindarin = () =>
    React.createElement(TolkienCalendars.RivendellCalendar, {
        caption: true,
        calendarRules: TolkienCalendars.RivendellCalendar.REFORMED_RULES,
        startDay: 20,
        language: TolkienCalendars.RivendellCalendar.LANGUAGE_SINDARIN,
        className: "shire-calendar",
    });

WithReformedRulesStartingFromMarch20thInSindarin.story = {
    name: "with Reformed Rules starting from March 20th, in Sindarin",
};
