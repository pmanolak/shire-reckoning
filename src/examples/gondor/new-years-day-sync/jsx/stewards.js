/**
 * Copyright (C) 2019 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { GondorCalendar } from "../../../../lib";

export default {
    title: "Shire Reckoning / Gondor Calendar / What if our years began at the same seasonal point? / source / jsx",

    parameters: {
        options: { showPanel: true },
    },
};

export const StewardsReckoningInEnglish = () => {
    const gregorianStartDate = new Date(1, 0, 1, 0, 0, 0);
    gregorianStartDate.setFullYear(1, 0, 1);

    return (
        <GondorCalendar
            reckoning={GondorCalendar.RECKONING_STEWARDS}
            language={GondorCalendar.LANGUAGE_ENGLISH}
            yearView={true}
            caption={true}
            startDate={gregorianStartDate}
            className="shire-calendar"
        />
    );
};

StewardsReckoningInEnglish.story = {
    name: "Stewards' Reckoning in English",
};
