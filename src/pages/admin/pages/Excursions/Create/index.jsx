/**
 * external libs
 */
import React from 'react';
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


export default function ExcursionsCreate() {
    const createExcursion = async (excursionFormData) => {
        const requestExcursionFormData = JSON.parse(JSON.stringify(excursionFormData))

        requestExcursionFormData.items = excursionFormData.items.reduce((itemResult, day) => ([
            ...itemResult,
            ...day,
        ]), [])


        await ExcursionService.create(requestExcursionFormData)
    }

    return (
        <ExcursionPage pageType={ExcursionPageTypeEnum.create} handler={createExcursion}/>
    )
}
