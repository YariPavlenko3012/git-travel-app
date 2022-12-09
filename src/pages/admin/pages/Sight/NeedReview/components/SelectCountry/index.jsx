/**
 * external libs
 */
import React from 'react'
import {Form} from "antd";
/**
 * componets
 */
import FieldSelectCountry from "../../../../../../../components/Select/Country";
import FormUI from "../../../../../../../components/Form";

export default function SelectCountry({ currentCountryId, setCurrentCountryId }){
    return (
        <FormUI onSubmit={() => {}}
                initialValues={{
                    country_id: currentCountryId
                }}
                render={({handleSubmit}) => (
                    <Form onFinish={handleSubmit} layout="vertical">
                        <FieldSelectCountry name="country_id"
                                            required={true}
                                            label={false}
                                            onChange={setCurrentCountryId}
                                            select={{
                                                showSearch: true,
                                                style: {minWidth: 200}
                                            }}/>
                    </Form>
                )}
        />
    )
}
