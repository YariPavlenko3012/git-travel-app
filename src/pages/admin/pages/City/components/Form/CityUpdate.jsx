/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
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

export default function UpdateCityForm({cityId, city, getCity}) {
    const updateCity = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.files_ids = (copyValues.images || []).map(({id}) => id);
        
        await CityService.update(cityId, copyValues);
        await getCity(cityId)
    };
    
    return (
      <FormUI onSubmit={updateCity}
              initialValues={{
                  country_id: +city.country.id,
                  population: city.population,
                  images: city.images
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldSelectCountry name="country_id"
                                                required={true}
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
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Update</Button>
                </Form>
              )}
      />
    )
}
