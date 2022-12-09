/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
/**
 * components
 */
import SightsTable from "../../../../components/Tables/Sights";

export default function SightTab({ getSights }) {
    const [sights, setSights] = useState(null);

    const getSightsHandler = async (params) => {
        setSights(await getSights(params))
    };

    useEffect(() => {
        getSightsHandler();
    }, []);

    if(!sights){
        return null
    }

    return (
        <SightsTable sightList={sights} getSight={getSightsHandler}/>
    )
}
