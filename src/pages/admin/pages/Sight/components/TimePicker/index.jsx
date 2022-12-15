/**
 * external libs
 */
import React, {useMemo} from 'react';
import moment from 'moment'
import {TimePicker, Checkbox} from 'antd';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function TimePickerUI({setValue, name, value}) {
    const checked = () => {
        if (!value) {
            return false
        }
        const allDaysInOpenHours = Object.keys(value)

        if (allDaysInOpenHours.length !== days.length) {
            return false
        }

        const haveNotAroundTheClockDay = allDaysInOpenHours.some(day => {
            const {open, close} = value[day];

            return (!open || !close) || (open !== "00:00" || close !== "00:00")
        })

        return !haveNotAroundTheClockDay;
    };

    const setDayAndNightWork = () => {
        let opening_hours = days.reduce((openHours, day) => ({
            ...openHours,
            [day]: {
                open: "00:00",
                close: "00:00",
            }
        }), {});

        console.log(opening_hours, "opening_hours")

        setValue(name, opening_hours)
    }

    const changeTime = (day, key, currentValue) => {
        let opening_hours = value;

        if (!opening_hours) {
            opening_hours = {}
        }

        if (!opening_hours[day]) {
            opening_hours[day] = {}
        }

        opening_hours[day][key] = currentValue;

        setValue(name, opening_hours)
    }

    return (
        <div style={{marginBottom: 30}}>
            <div style={{display: "flex", gap: 15, marginBottom: 10}}>
                {days.map((day, index) => (
                    <div style={{display: "flex", flexDirection: "column", gap: "15px", margin: "15px 0"}}>
                        <div style={{width: 90, fontSize: 17, fontWeight: 800}}>
                            {day}:
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div>
                                Open time
                            </div>
                            <TimePicker showNow={false}
                                        format="HH:mm"
                                        value={value && value[day]?.open && moment(value[day].open || null, 'HH:mm')}
                                        showTime={{format: 'HH:mm'}}
                                        onChange={(_, time) => changeTime(day, "open", time)}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div>
                                Close time
                            </div>
                            <TimePicker showNow={false}
                                        format="HH:mm"
                                        value={value && value[day]?.close && moment(value[day].close || null, 'HH:mm')}
                                        showTime={{format: 'HH:mm'}}
                                        onChange={(_, time) => changeTime(day, "close", time)}/>
                        </div>
                    </div>
                ))}
            </div>
            <Checkbox checked={checked()} onChange={setDayAndNightWork}>
                Around the clock (круглосуточно)
            </Checkbox>
        </div>
    )
}
