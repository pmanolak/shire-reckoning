/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import { GondorCalendar } from "../../../../lib";

storiesOf(
    "Shire Reckoning: Gondor Calendar / Month View / source / jsx",
    module
).add("Stewards' Reckoning in Quenya", () => (
    <GondorCalendar
        reckoning={GondorCalendar.RECKONING_STEWARDS}
        caption={true}
        className="shire-calendar"
    />
));
