/**
 * Copyright (C) Paul Sarando
 * Distributed under the Eclipse Public License (http://www.eclipse.org/legal/epl-v10.html).
 */
import React from "react";

import { fullYearDate } from "../Utils";
import "./examples.css";

const CalendarCellStyle = {
    verticalAlign: "top",
};

const CaptionCellStyle = {
    verticalAlign: "top",
    padding: "1rem",
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
};

const DateNumberInput = (props: any) => (
    <input type="number" className="date-time-input" step={1} {...props} />
);

const DateMonthSelect = (props: any) => (
    <select className="date-time-input" {...props}>
        <option value="0">Jan</option>
        <option value="1">Feb</option>
        <option value="2">Mar</option>
        <option value="3">Apr</option>
        <option value="4">May</option>
        <option value="5">Jun</option>
        <option value="6">Jul</option>
        <option value="7">Aug</option>
        <option value="8">Sep</option>
        <option value="9">Oct</option>
        <option value="10">Nov</option>
        <option value="11">Dec</option>
    </select>
);

const parseDatePickerChangedDate = (
    year: number,
    month: number,
    day: number
) => {
    if (0 <= day && day <= 32) {
        const currentDate = fullYearDate(year, month, day);

        if (!isNaN(currentDate.getFullYear())) {
            return currentDate;
        }
    }

    return null;
};

interface DatePickerProps {
    date: Date;
    onDateChanged: (date: Date) => void;
    className?: string;
}

const DatePicker = (props: DatePickerProps) => {
    const { date: currentDate, className = "gregorian-date-picker" } = props;

    const resetDate = () => {
        props.onDateChanged(new Date());
    };

    const onMonthChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = currentDate.getFullYear();
        const month = parseInt(event.target.value, 10);
        const day = currentDate.getDate();

        onDateChanged(year, month, day);
    };

    const onDayChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const day = parseInt(event.target.value, 10);

        onDateChanged(year, month, day);
    };

    const onYearChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const year = parseInt(event.target.value, 10);
        const month = currentDate.getMonth();
        const day = currentDate.getDate();

        onDateChanged(year, month, day);
    };

    const onDateChanged = (year: number, month: number, day: number) => {
        const currentDate = parseDatePickerChangedDate(year, month, day);

        if (currentDate) {
            props.onDateChanged(currentDate);
        }
    };

    return (
        <table className={className}>
            <tbody>
                <tr>
                    <th>Gregorian Date:</th>
                    <th>
                        <DateMonthSelect
                            value={currentDate.getMonth()}
                            onChange={onMonthChanged}
                        />
                    </th>
                    <th>
                        <DateNumberInput
                            value={currentDate.getDate()}
                            onChange={onDayChanged}
                        />
                    </th>
                    <th>
                        <DateNumberInput
                            value={currentDate.getFullYear()}
                            onChange={onYearChanged}
                        />
                    </th>
                    <th>
                        <button className="today-button" onClick={resetDate}>
                            <span className="today-button-txt">Today</span>
                        </button>
                    </th>
                </tr>
            </tbody>
        </table>
    );
};

const Badges = () => (
    <>
        <a
            href="https://www.npmjs.org/package/shire-reckoning"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                src="https://img.shields.io/npm/v/shire-reckoning.svg?logo=npm"
                alt="[npm version]"
            />
        </a>
        &nbsp;
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            <img
                src="https://img.shields.io/npm/dependency-version/shire-reckoning/peer/react.svg?logo=react"
                alt="[react dependency version]"
            />
        </a>
    </>
);

const DisplayTableRows = ({ rows }: { rows: React.ReactNode[][] }) => (
    <table
        border={1}
        cellPadding={2}
        style={{ margin: "1em", fontFamily: "monospace" }}
    >
        <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.map((cell, index) => (
                        <td key={index}>{cell}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

interface DisplayTableMapProps {
    rowKeys: string[];
    colKeys: string[];
    table: { [row: string]: { [col: string]: React.ReactNode } };
}
const DisplayTableMap = ({ rowKeys, colKeys, table }: DisplayTableMapProps) => (
    <table
        border={1}
        cellPadding={2}
        style={{ margin: "1em", fontFamily: "monospace", whiteSpace: "pre" }}
    >
        <tbody>
            <tr>
                <th></th>
                {colKeys.map((head) => (
                    <th key={head}>{head}</th>
                ))}
            </tr>
            {rowKeys.map((row) => (
                <tr key={row} style={{ textAlign: "right" }}>
                    <th>{row}</th>
                    {colKeys.map((col) => (
                        <td key={col}>{table[row][col]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export {
    Badges,
    CalendarCellStyle,
    CaptionCellStyle,
    DateMonthSelect,
    DateNumberInput,
    DatePicker,
    DisplayTableMap,
    DisplayTableRows,
    parseDatePickerChangedDate,
};
