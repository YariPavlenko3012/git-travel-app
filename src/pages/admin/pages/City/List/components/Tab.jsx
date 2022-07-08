/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
/**
 * components
 */
import CitiesTable from "../../../../components/Tables/Cities";

export default function CityTab({ getCity }) {
    const [city, setCity] = useState(null);

    const getCityHandler = async (params) => {
        setCity(await getCity(params))
    };

    useEffect(() => {
        getCityHandler();
    }, []);

    if(!city){
        return null
    }

    return (
        <CitiesTable cityList={city} getCity={getCityHandler}/>
    )
}
