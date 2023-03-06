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
        await ExcursionService.create(excursionFormData)
        setAlertSuccess("Excursion successfully created")
    }

    return (
        <ExcursionPage pageType={ExcursionPageTypeEnum.create} handler={createExcursion}/>
    )
}
