/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import { ShireCalendar } from "../../../../lib";

storiesOf(
    "Shire Reckoning: Shire Calendar / Month View / source / jsx",
    module
).add("with Shire month and weekday names", () => (
    <ShireCalendar caption={true} className="shire-calendar" />
));
