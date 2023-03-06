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
import {useParams} from "react-router-dom";


export default function ExcursionsEdit() {
    const {excursionId} = useParams();
    const {setAlertSuccess} = useContext(AlertContext)

    const updateExcursion = async (excursionFormData) => {
        await ExcursionService.update(excursionId, excursionFormData)
        setAlertSuccess("Excursion successfully edited")
    }

    return (
        <ExcursionPage pageType={ExcursionPageTypeEnum.edit} handler={updateExcursion}/>
    )
}

