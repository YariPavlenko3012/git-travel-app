import {Select} from "antd";
import React from "react";
import SightWorkStatusEnum from "../../../../../../enums/SightWorkStatus";
import SightService from "../../../../../../services/admin/sight.service";

export default function ChangeWorkStatus({ sightId, getSight, workStatus = null }){

    const changeStatus = async (status) => {
        await SightService.updateWorkStatus(sightId, status)
        await getSight()
    }

    return (
        <Select
            size="large"
            value={workStatus}
            style={{width: 150}}
            options={[{value: SightWorkStatusEnum.pending, label: "Pending"}, {value: SightWorkStatusEnum.done, label: "Done"}]}
            onChange={changeStatus}
        />
    )
}
