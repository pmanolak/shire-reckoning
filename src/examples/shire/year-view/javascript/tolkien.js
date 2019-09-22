/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import * as TolkienCalendars from "../../../../lib";

storiesOf(
    "Shire Reckoning: Shire Calendar / Year View / source / javascript",
    module
).add("with Tolkien month and weekday names", () =>
    React.createElement(TolkienCalendars.ShireCalendar, {
        region: TolkienCalendars.ShireCalendar.REGION_NAMES_TOLKIEN,
        yearView: true,
        caption: true,
        className: "shire-calendar",
    })
);
