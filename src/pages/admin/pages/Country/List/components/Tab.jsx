/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
/**
 * components
 */
import CountryTable from '../../../../components/Tables/Countries'

export default function CountryTab({ getCountry }) {
    const [country, setCountry] = useState(null);

    const getCountryHandler = async (params = {}) => {
        setCountry(await getCountry(params))
    };

    useEffect(() => {
        getCountryHandler();
    }, []);

    if(!country) {
        return <div>Loader...</div>
    }

    return (
        <CountryTable countryList={country} getCountry={getCountryHandler}/>
    )
}
