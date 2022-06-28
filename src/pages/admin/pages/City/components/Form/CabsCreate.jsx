/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
/**
 * components
 */
import FieldInput from "../../../../../../components/Form/FieldInput";
import FormUI from "../../../../../../components/Form";
/**
 * services
 */
import CityService from "../../../../../../services/admin/city.service";

export default function CreateCityCabsForm({ cityId, getCity }) {
    const createCityTaxi = async (value) => {
        await CityService.createTaxi(cityId, {city_id: cityId, ...value});
        await getCity(cityId)
    };
    
    return (
      <FormUI onSubmit={createCityTaxi}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Taxi name"
                                        name="name"
                                        placeholder="Enter taxi name"
                                        required={true}/>
                        </div>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldInput label="Taxi phone number"
                                        name="phone_number"
                                        placeholder="Enter taxi phone"
                                        required={true}/>
                        </div>
                    </div>
                    <Button variant="primary" htmlType="submit" disabled={!cityId}>Create</Button>
                </Form>
              )}
      />
    )
}
