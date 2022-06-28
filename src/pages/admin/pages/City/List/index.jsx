/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
/**
 * components
 */
import CitiesTable from "../../../components/Tables/Cities";
/**
 * services
 */
import CityService from "../../../../../services/admin/city.service";

export default function CityList() {
    const [city, setCity] = useState(null);
    
    const getCity = async (params = {}) => {
        const copyParams = JSON.parse(JSON.stringify(params));
    
        if(copyParams.filters){
            if(copyParams.filters.country){
                copyParams.country_name = copyParams.filters.country[0];
            }
        
            if(copyParams.filters.name){
                copyParams.city_name = copyParams.filters.name[0];
            }
        }
        
        const cityList = await CityService.list(copyParams);
        setCity({
            data: cityList,
            meta: {
                current_page: 1,
                per_page: 1000000000,
                total: cityList.length,
            }
        })
    };
    
    useEffect(() => {
        getCity();
    }, []);
    
    if(!city) {
        return <div>Loader...</div>
    }
    
    return (
      <div style={{padding: 20}}>
          <h3 style={{marginBottom: 20}}>City</h3>
          <CitiesTable cityList={city} getCity={getCity}/>
      </div>
    )
}
