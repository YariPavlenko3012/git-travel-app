/**
 * external libs
 */
import React, {useEffect, useMemo, useState, useRef} from 'react';
import {Button, Form} from "antd";
import FieldSelectPlace from "../../../../../../components/Select/Sight";
import FieldInput from "../../../../../../components/Form/FieldInput";
import FormUI from "../../../../../../components/Form";
import DictionaryService from "../../../../../../services/dictionary.service";


export default function ExcursionItemForm({excursionFormData, setExcursionFormData, places, createActiveDay, setCreateActiveDay}){

    const createDay = (values) => {
        const copyExcursionFormData = JSON.parse(JSON.stringify(excursionFormData))

        if(!copyExcursionFormData.routes[createActiveDay]){
            copyExcursionFormData.routes[createActiveDay] = []
        }

        copyExcursionFormData.routes[createActiveDay] = [
            ...copyExcursionFormData.routes[createActiveDay],
            {
                day: createActiveDay + 1,
                description: values.description,
                place: places.find(({id}) => id === values.place_id),
                place_id: values.place_id,
                place_priority: copyExcursionFormData.routes[createActiveDay].length + 1
            }
        ]

        setExcursionFormData(copyExcursionFormData)
        setCreateActiveDay(null)
    }

    return (
        <FormUI onSubmit={createDay}
                initialValues={{}}
                render={({handleSubmit, submitting, form}) => (
                    <Form onFinish={handleSubmit} layout="vertical">
                        <div style={{display: "flex", flexWrap: "wrap", alignItems: "flex-end"}}>
                            <div style={{width: "calc(100% / 4 - 10px)", marginRight: 10}}>
                                <FieldSelectPlace name="place_id"
                                                  required={true}
                                                  options={places}
                                                  select={{
                                                      showSearch: true,
                                                  }}/>
                            </div>
                            <div style={{width: "calc(100% - 10px - (100% / 4 - 10px))"}}>
                                <FieldInput label="Description"
                                            name={`description`}
                                            placeholder={`Enter description`}
                                            required={true}/>

                            </div>
                        </div>
                        <div style={{display: "flex", marginBottom: 20, marginTop: -10, justifyContent: "flex-end"}}>
                            <Button variant="primary" htmlType="submit" disabled={submitting}>Create</Button>
                        </div>
                    </Form>
                )}
        />
    )
}
