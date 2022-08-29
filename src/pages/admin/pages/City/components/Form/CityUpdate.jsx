/**
 * external libs
 */
import {Button, Form} from "antd";
import React from "react";
/**
 * components
 */
import FieldSelectState from "../../../../../../components/Select/State";
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
                  state_id: +city?.state?.id,
                  images: city.images
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                            <FieldSelectState name="state_id"
                                                required={true}
                                                disabled={true}
                                                select={{
                                                    showSearch: true,
                                                }}/>
                        </div>
                    </div>
                    <UploadFiles name="images" fileName="images" keyFiles="files_ids"/>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Update</Button>
                </Form>
              )}
      />
    )
}
