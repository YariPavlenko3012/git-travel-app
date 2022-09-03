/**
 * external libs
 */
import React, {useEffect, useState} from 'react';
/**
 * components
 */
import TableSights from '../../../components/Tables/Sights';
import FieldSelectSight from '../../../../../components/Select/Sight';
/**
 * services
 */
import SightService from "../../../../../services/admin/sight.service";
import {Form} from "antd";
import FormUI from "../../../../../components/Form";

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
        getSight({country_id: 1});
    }, []);

    if(!sight) {
        return <div>Loader...</div>
    }

    return (
      <div>
          <h3 style={{marginBottom: 20, display: "flex", justifyContent: "space-between"}}>
              Sight
              <FormUI onSubmit={() => {}}
                      render={({handleSubmit, values, submitting, form}) => (
                          <Form onFinish={handleSubmit} layout="vertical">
                             <div style={{width: 300}}>
                                 <FieldSelectSight name="sight"
                                                   required={true}
                                                   label={false}
                                                   select={{
                                                       showSearch: true,
                                                   }}/>
                             </div>
                          </Form>
                      )}
              />
          </h3>
          <TableSights sightList={sight} getSight={getSight}/>
      </div>
    )
}
