/**
 * external libs
 */
import React, {useMemo} from 'react';
import {Form} from "antd";
/**
 * components
 */
import FieldSelectCity from "../../../../../../components/Select/City";
import FieldSelectCountry from "../../../../../../components/Select/Country";
import FormUI from "../../../../../../components/Form";

export default function GeoSelectForm({countryId, cityId, getCountry, getCity }) {
    const citySearchParams = useMemo(() => ({
        eq: {
            country_id: countryId
        }
    }), [countryId])

    return (
        <FormUI onSubmit={() => {
        }}
                initialValues={{}}
                render={({handleSubmit}) => (
                    <Form onFinish={handleSubmit} layout="vertical">
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectCountry name="countryId"
                                                    required={true}
                                                    onChange={getCountry}
                                                    defaultValue={countryId}
                                                    disabled={true}
                                                    select={{
                                                        showSearch: true,
                                                    }}/>
                            </div>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectCity name="cityId"
                                                 required={true}
                                                 onChange={getCity}
                                                 defaultValue={cityId}
                                                 searchParams={citySearchParams}
                                                 select={{
                                                     showSearch: true,
                                                 }}/>
                            </div>
                        </div>
                    </Form>
                )}
        />
    )
}
