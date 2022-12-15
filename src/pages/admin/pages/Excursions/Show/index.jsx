/**
 * external libs
 */
import React from 'react'
/**
 * components
 */
import ExcursionsPage from "../components/ExcursionPage";
/**
 * enums
 */
import ExcursionPageTypeEnum from "../../../../../enums/ExcursionPageType";

export default function ShowExcursion(){
    return (
        <ExcursionsPage pageType={ExcursionPageTypeEnum.show}/>
    )
}
