/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
/**
 * components
 */
import FormUI from "../../../../../../components/Form";
import FieldInput from "../../../../../../components/Form/FieldInput";
/**
 * services
 */
import CityService from "../../../../../../services/admin/city.service";

export default function UpdateCityCabsForm({ city, cityId, getCity }) {
    const updateCityTaxi = async (value) => {
        Promise.all(value.cabs.map(cab => CityService.updateTaxi(cityId, cab.id, {
            city_id: cityId,
            name: cab.name,
            phone_number: cab.phone_number,
            id: cab.id,
        })))
        .then(() => getCity(cityId))
    };
    
    return (
      <FormUI onSubmit={updateCityTaxi}
              initialValues={{
                  cabs: city.cabs
              }}
              render={({handleSubmit, values}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    {values.cabs.map((cab, index) => (
                      <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                          <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                              <FieldInput label="Taxi name"
                                          name={`cabs.${index}.name`}
                                          placeholder="Enter taxi name"
                                          required={true}/>
                          </div>
                          <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                              <FieldInput label="Taxi phone number"
                                          name={`cabs.${index}.phone_number`}
                                          placeholder="Enter taxi phone"
                                          required={true}/>
                          </div>
                      </div>
                    ))}
                    <Button variant="primary" htmlType="submit">Update</Button>
                </Form>
              )}
      />
    )
}
