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
import UploadOrientalFile from "../../../../../../components/UploadOrientalFile";
import FileOrientationEnums from "../../../../../../enums/FileOrientation";

export default function UpdateCityForm({cityId, city, getCity}) {
    const updateCity = async (value) => {
        const copyValues = JSON.parse(JSON.stringify(value));
        copyValues.landscape_image = copyValues.landscape_image?.id || null;
        copyValues.portrait_image = copyValues.portrait_image?.id || null;

        await CityService.update(cityId, copyValues);
        await getCity(cityId)
    };

    return (
      <FormUI onSubmit={updateCity}
              initialValues={{
                  state_id: +city?.state?.id,
                  landscape_image: city.landscape_image,
                  portrait_image: city.portrait_image,
              }}
              render={({handleSubmit, submitting}) => (
                <Form onFinish={handleSubmit} layout="vertical">
                    <h5>General</h5>
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
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                        <div style={{marginRight: 10}}>
                            <UploadOrientalFile oriental={FileOrientationEnums.landscape} name="landscape_image"/>
                        </div>
                        <div style={{marginRight: 10}}>
                            <UploadOrientalFile oriental={FileOrientationEnums.portrait} name="portrait_image"/>
                        </div>
                    </div>
                    <Button variant="primary" htmlType="submit" disabled={submitting}>Update</Button>
                </Form>
              )}
      />
    )
}
