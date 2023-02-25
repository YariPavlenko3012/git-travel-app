/**
 * external libs
 */
import {Select} from "antd";
import React, {useContext, useEffect, useState} from "react";
/**
 * context
 */
import {DictionaryContext} from "../../../../../context/dictionary.context";
/**
 * services
 */
import SightService from "../../../../../../services/admin/sight.service";

export default function ChangeWorkStatus({ sightId, getSight, workStatus: initialWorkStatus = null }){
    const [workStatus, setWorkStatus] = useState(initialWorkStatus)
    const {dictionary} = useContext(DictionaryContext)

    const changeStatus = async (status) => {
        setWorkStatus(status)
        await SightService.updateWorkStatus(sightId, status)
        if(getSight){
            await getSight()
        }
    }

    useEffect(() => {
        setWorkStatus(initialWorkStatus)
    }, [initialWorkStatus])

    return (
        <Select
            size="large"
            value={workStatus}
            style={{width: "100%"}}
            options={dictionary.work_statuses.sight}
            onChange={changeStatus}
        />
    )
}
