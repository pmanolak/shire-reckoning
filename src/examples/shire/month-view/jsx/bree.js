/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { ShireCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Shire Calendar / Month View / source / jsx",

    parameters: {
        chromatic: { disableSnapshot: true },
    },
};

export const WithBreeMonthAndWeekdayNames = () => (
    <ShireCalendar
        region={ShireCalendar.REGION_NAMES_BREE}
        caption={true}
        className="shire-calendar"
    />
);

WithBreeMonthAndWeekdayNames.storyName = "with Bree month and weekday names";
