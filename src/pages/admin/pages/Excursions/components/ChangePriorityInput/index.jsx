import {Input} from "antd";
import React, {useEffect, useState} from "react";

export default function ({ priority, day, changePriority }){
    const [priorityValue, setPriorityValue] = useState(priority)

    const changePriorityHandler = (e) => {
        changePriority(day[0].day, priority, +e.target.value)
        setPriorityValue(priority)
    }

    const blurHandler = () => {
        if(priority !== priorityValue){
            setPriorityValue(priority)
        }
    }

    useEffect(() => {
        setPriorityValue(priority)
    }, [priority])

    return (
        <Input style={{width: 100}}
               value={priorityValue}
               onChange={e => setPriorityValue(+e.target.value)}
               onBlur={blurHandler}
               onPressEnter={changePriorityHandler}/>
    )
}
