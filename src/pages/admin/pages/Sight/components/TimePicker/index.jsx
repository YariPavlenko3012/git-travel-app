/**
 * external libs
 */
import React from 'react';
import moment from 'moment'
import { TimePicker } from 'antd';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function TimePickerUI({ setValue, name, value }){

    const changeTime = (day, key, currentValue) => {
        let opening_hours = value;

        if(!opening_hours){
            opening_hours = {}
        }

        if(!opening_hours[day]){
            opening_hours[day] = {}
        }

        opening_hours[day][key] = currentValue;

        setValue(name, opening_hours)
    }

    console.log(value, "value")

    return (
        <div style={{display: "flex", gap: 15}}>
            {days.map( (day, index) => (
                <div style={{display: "flex", flexDirection: "column",  gap: "15px", margin: "15px 0"}}>
                    <div style={{width: 90, fontSize: 17, fontWeight: 800}}>
                        {day}:
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div>
                            Open time
                        </div>
                        <TimePicker showNow={false}
                                    format="HH:mm"
                                    defaultValue={value && moment(value[day].open || null, 'HH:mm')}
                                    showTime={{ format: 'HH:mm' }}
                                    onChange={(_,time) => changeTime(day, "open", time)} />
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div>
                            Close time
                        </div>
                        <TimePicker showNow={false}
                                    format="HH:mm"
                                    defaultValue={value && moment(value[day].close || null, 'HH:mm')}
                                    showTime={{ format: 'HH:mm' }}
                                    onChange={(_,time) => changeTime(day, "close", time)} />
                    </div>
                </div>
            ))}

        </div>
    )
}
