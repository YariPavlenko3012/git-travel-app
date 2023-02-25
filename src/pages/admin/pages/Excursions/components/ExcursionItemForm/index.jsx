/**
 * external libs
 */
import React, {useContext} from 'react';
import {Button, Form} from "antd";
/**
 * components
 */
import FieldSelectPlace from "../../../../../../components/Select/Sight";
import FieldInput from "../../../../../../components/Form/FieldInput";
import FormUI from "../../../../../../components/Form";
/**
 * utils
 */
import Select from "../../../../../../utils/Select";
/**
 * context
 */
import {DictionaryContext} from "../../../../../context/dictionary.context";
import SightService from "../../../../../../services/admin/sight.service";


export default function ExcursionItemForm({
                                              excursionFormData,
                                              generateRoutesByGoogle,
                                              setExcursionFormData,
                                              createActiveDay,
                                              setCreateActiveDay,
                                              cityId,
                                              places
                                          }) {
    const {dictionary} = useContext(DictionaryContext)

    const createDay = async (values) => {
        const copyExcursionFormData = JSON.parse(JSON.stringify(excursionFormData))
        const travelMode = dictionary.excursion_route_type.map(({value}) => value);

        if (!copyExcursionFormData.items[createActiveDay]) {
            copyExcursionFormData.items[createActiveDay] = []
        }

        const currentPlace = await SightService.show(values.place_id);

        let routes = travelMode.reduce((routesResult, travelMode) => ({
            ...routesResult,
            [travelMode]: {
                path: [],
                duration: 0,
                distance: 0,
            }
        }), {})

        copyExcursionFormData.items[createActiveDay] = [
            ...copyExcursionFormData.items[createActiveDay],
            {
                day: createActiveDay + 1,
                place: currentPlace,
                routes: routes,
                place_id: values.place_id,
                priority: copyExcursionFormData.items[createActiveDay].length + 1
            }
        ]

        const currentPlaceIndex = copyExcursionFormData.items[createActiveDay].length - 1

        await generateRoutesByGoogle(copyExcursionFormData, createActiveDay, currentPlaceIndex)

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
                                                  data={Select.optionsByRow(places.data, "id", "name")}
                                                  select={{
                                                      showSearch: true,
                                                  }}/>
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
