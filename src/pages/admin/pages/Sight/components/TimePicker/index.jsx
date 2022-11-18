/**
 * external libs
 */
import React from 'react';
import moment from 'moment'
import { TimePicker } from 'antd';

const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function TimePickerUI({ setValue, name, value }){

    const changeTime = (week, key, currentValue) => {
        let opening_hours = value;

        if(!opening_hours){
            opening_hours = {}
        }

        if(!opening_hours[week]){
            opening_hours[week] = {}
        }

        opening_hours[week][key] = currentValue;

        setValue(name, opening_hours)
    }

    return (
        <div>
            {weeks.map( (week, index) => (
                <div style={{display: "flex", alignItems: "flex-end", gap: "10px", marginBottom: 15}}>
                    <div style={{width: 90}}>
                        {week}:
                    </div>
                    {!value?.[week]?.day_off && (
                        <>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div>
                                    Open time
                                </div>
                                <TimePicker showNow={false}
                                            format="HH:mm"
                                    // defaultValue={moment('01:05', 'HH:mm')}
                                            showTime={{ format: 'HH:mm' }}
                                            onChange={(_,time) => changeTime(week, "open", time)} />
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div>
                                    Close time
                                </div>
                                <TimePicker showNow={false}
                                            format="HH:mm"
                                    // defaultValue={moment('01:05', 'HH:mm')}
                                            showTime={{ format: 'HH:mm' }}
                                            onChange={(_,time) => changeTime(week, "close", time)} />
                            </div>
                        </>
                    )}
                    <div onClick={() => changeTime(week, "day_off", !value?.[week]?.day_off)}>
                        Day off
                    </div>
                </div>
            ))}

        </div>
    )
}
