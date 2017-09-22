/**
 * Copyright (C) 2016 Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React, { Component } from 'react';
import { getDateColor, GregorianDateDisplay } from './DateCell';

class IntercalaryDay extends Component {
    render() {
        let dateTitle = this.props.description;
        let currentDate = this.props.currentDate;

        let gregorianDate = this.props.gregorian;
        let dayColor = getDateColor('holiday', gregorianDate, currentDate);

        if (this.props.dayExtra) {
            let gregorianExtra = this.props.gregorianExtra;
            dayColor = getDateColor(dayColor, gregorianExtra, currentDate);

            return (
                <td className={`${dayColor} intercalary-multi-day`} title={dateTitle} >
                    <span className={this.props.dayClassName} >
                        {this.props.name}
                    </span>
                    <br />
                    <GregorianDateDisplay date={gregorianDate} />
                    <hr className="intercalary-day-separator" />
                    <span className={this.props.dayExtraClassName} >
                        {this.props.dayExtra}
                    </span>
                    <br />
                    <GregorianDateDisplay date={gregorianExtra} />
                </td>
            );
        }

        return (
            <td className={dayColor} title={dateTitle} >
                {this.props.name}
                <br />
                <GregorianDateDisplay date={gregorianDate} />
            </td>
        );
    }
}

export default IntercalaryDay;
