/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
import {useHistory} from 'react-router-dom'
/**
 * components
 */
import FieldSelectCountry from "../../../../../../components/Select/Country";
import FieldInput from "../../../../../../components/Form/FieldInput";
import UploadFiles from "../../../../../../components/UploadFiles";
import FormUI from "../../../../../../components/Form";
/**
 * services
 */
import CityService from "../../../../../../services/admin/city.service";
/**
 * constants
 */
import {ADMIN_MAKE_EDIT_CITY_URI} from "../../../../../../constants/admin/uri.constant";

export default function CreateCityForm({countryId}) {
    const history = useHistory();
    
    const createCity = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.files_ids = (copyValues.images || []).map(({id}) => id);
        
        const {id} = await CityService.create(copyValues);
        
        return history.push(ADMIN_MAKE_EDIT_CITY_URI(id))
    };
    
    
    return (
      <FormUI onSubmit={createCity}
              initialValues={{
                  country_id: countryId
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldSelectCountry name="country_id"
                                                required={true}
                                                disabled={true}
                                                select={{
                                                    showSearch: true,
                                                }}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Population"
                                        name="population"
                                        type="number"
                                        placeholder="Enter currency code (3 char)"
                                        required={true}/>
                        </div>
                    </div>
                    <UploadFiles name="images" fileName="images"/>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                </Form>
              )}
      />
    )
}
