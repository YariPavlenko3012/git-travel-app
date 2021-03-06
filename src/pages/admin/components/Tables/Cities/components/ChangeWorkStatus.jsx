import {Select} from "antd";
import React from "react";
import CityService from "../../../../../../services/admin/city.service";

export default function ChangeWorkStatus({ cityId }){

    const changeStatus = async (status) => {
        await CityService.updateWorkStatus(cityId, status)
    }

    return (
        <Select
            size="large"
            style={{width: 150}}
            options={[{value: "pending", label: "Pending"}, {value: "in_progress", label: "In progress"}, {value: "done", label: "Done"}]}
            onChange={changeStatus}
        />
    )
}
