/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { RivendellCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Rivendell Calendar / Season View / source / jsx",

    parameters: {
        options: { showPanel: true },
    },
};

export const WithReformedRulesStartingFromMarch25thInEnglish = () => (
    <RivendellCalendar
        caption={true}
        calendarRules={RivendellCalendar.REFORMED_RULES}
        startDay={25}
        language={RivendellCalendar.LANGUAGE_ENGLISH}
        className="shire-calendar"
    />
);

WithReformedRulesStartingFromMarch25thInEnglish.story = {
    name: "with Reformed Rules starting from March 25th, in English",
};
