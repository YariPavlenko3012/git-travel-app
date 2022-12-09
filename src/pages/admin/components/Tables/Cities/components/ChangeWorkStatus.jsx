import {Select} from "antd";
import React from "react";
import CityService from "../../../../../../services/admin/city.service";
import CityWorkStatusEnum from "../../../../../../enums/CityWorkStatus";

export default function ChangeWorkStatus({cityId, getCity, workStatus = null}) {

    const changeStatus = async (status) => {
        await CityService.updateWorkStatus(cityId, status)
        await getCity()
    }

    return (
        <Select
            size="large"
            value={workStatus}
            style={{width: 150}}
            options={[
                {value: CityWorkStatusEnum.pending, label: "Pending"},
                {value: CityWorkStatusEnum.inProgress, label: "In progress"},
                {value: CityWorkStatusEnum.done, label: "Done"}
            ]}
            onChange={changeStatus}
        />
    )
}
