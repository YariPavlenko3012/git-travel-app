/**
 * external libs
 */
import React, {useContext} from 'react';
/**
 * components
 */
import ExcursionPage from "../components/ExcursionPage";
/**
 * enums
 */
import ExcursionPageTypeEnum from "../../../../../enums/ExcursionPageType";
/**
 * services
 */
import ExcursionService from "../../../../../services/admin/excursion.service";
/**
 * context
 */
import {AlertContext} from "../../../../context/alert.context";


export default function ExcursionsCreate() {
    const {setAlertSuccess} = useContext(AlertContext)

    const createExcursion = async (excursionFormData) => {
        const requestExcursionFormData = JSON.parse(JSON.stringify(excursionFormData))

        requestExcursionFormData.items = excursionFormData.items.reduce((itemResult, day) => ([
            ...itemResult,
            ...day,
        ]), [])


        await ExcursionService.create(requestExcursionFormData)
        setAlertSuccess("Excursion successfully created")
    }

    return (
        <ExcursionPage pageType={ExcursionPageTypeEnum.create} handler={createExcursion}/>
    )
}
