/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
/**
 * components
 */
import TableSights from '../../../components/Tables/Sights';
/**
 * services
 */
import SightService from "../../../../../services/admin/sight.service";

export default function SightList() {
    const [sight, setSight] = useState(null);

    const getSight = async (params = {}) => {
        const copyParams = JSON.parse(JSON.stringify(params));

        if(copyParams.filters?.city) {
            copyParams.city_name = copyParams.filters.city[0];
        }

        setSight(await SightService.list(copyParams))
    };

    useEffect(() => {
        getSight();
    }, []);

    if(!sight) {
        return <div>Loader...</div>
    }

    return (
      <div>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              Sight
          </h3>
          <TableSights sightList={sight} getSight={getSight}/>
      </div>
    )
}
