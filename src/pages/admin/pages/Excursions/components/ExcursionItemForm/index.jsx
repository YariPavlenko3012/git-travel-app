/**
 * external libs
 */
import React, {useEffect, useMemo, useState, useRef} from 'react';
import {Button, Form} from "antd";
import FieldSelectPlace from "../../../../../../components/Select/Sight";
import FieldInput from "../../../../../../components/Form/FieldInput";
import FormUI from "../../../../../../components/Form";
import Select from "../../../../../../utils/Select";
import {QueryString} from "../../../../../../utils/Querystring";
import ExcursionRouteTypeEnum from "../../../../../../enums/ExcursionRouteType";


export default function ExcursionItemForm({
                                              excursionFormData,
                                              setExcursionFormData,
                                              mapRef,
                                              markerListRef,
                                              polylineRef,
                                              places,
                                              createActiveDay,
                                              setCreateActiveDay
                                          }) {

    const createDay = async (values) => {
        const copyExcursionFormData = JSON.parse(JSON.stringify(excursionFormData))
        const travelMode = ["driving", "walking"];

        if (!copyExcursionFormData.routes[createActiveDay]) {
            copyExcursionFormData.routes[createActiveDay] = []
        }

        const currentPlace = places.find(({id}) => id === values.place_id);

        let routes = travelMode.reduce((routesResult, travelMode) => ({
            ...routesResult,
            [travelMode]: {
                path: [],
                duration: 0,
                distance: 0,
            }
        }), {})

        if (copyExcursionFormData.routes[createActiveDay].length)  {
            const lastPlace = copyExcursionFormData.routes[createActiveDay][copyExcursionFormData.routes[createActiveDay].length - 1]

            for (let i = 0; i < travelMode.length; i++) {
                const currentTravelMode = travelMode[i];
                const params = {
                    key: "AIzaSyApPL4vfjbQ_iVFrfE-97KN-ncf8i1NDLU",
                    destination: `${currentPlace.latitude},${currentPlace.longitude}`,
                    origin: `${lastPlace.place.latitude},${lastPlace.place.longitude}`,
                    travelMode: window.google.maps.TravelMode[currentTravelMode.toUpperCase()]
                }
                const url = `https://maps.googleapis.com/maps/api/directions/json?${QueryString.stringify(params)}`

                const route = await (await fetch(url)).json()

                console.log(route, "route")
                routes[currentTravelMode].path = route.routes[0].legs[0].steps.reduce((polylineResult, {polyline}) => {
                    const polylinePoints = window.google.maps.geometry.encoding.decodePath(polyline.points);
                    const polylineCoordinates = polylinePoints.map(polyline => `${polyline.lat()} ${polyline.lng()}`);

                    return [
                        ...polylineResult,
                        ...polylineCoordinates,
                    ]
                }, [])
                routes[currentTravelMode].duration = route.routes[0].legs[0].duration.value;
                routes[currentTravelMode].distance = route.routes[0].legs[0].distance.value;
            }

            if (polylineRef.current) {
                polylineRef.current.setMap(null)
            }

            polylineRef.current = new window.google.maps.Polyline({
                path: [
                    ...copyExcursionFormData.routes[createActiveDay].reduce((polylineResult, excursionItem) => {
                        return [
                            ...polylineResult,
                            ...excursionItem.routes[ExcursionRouteTypeEnum.walking].path
                        ]
                    }, []),
                    ...routes[ExcursionRouteTypeEnum.walking].path
                ].map(coordinate => {
                    const [lat, lng] = coordinate.split(" ")
                    return new window.google.maps.LatLng(lat, lng);
                }, []),
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                geodesic: true,
                map: mapRef.current
            });
        }

        copyExcursionFormData.routes[createActiveDay] = [
            ...copyExcursionFormData.routes[createActiveDay],
            {
                day: createActiveDay + 1,
                description: values.description || "",
                place: currentPlace,
                routes: routes,
                place_id: values.place_id,
                priority: copyExcursionFormData.routes[createActiveDay].length + 1
            }
        ]

        markerListRef.current = markerListRef.current.forEach(marker => {
            marker.setMap(null)
        })
        markerListRef.current = copyExcursionFormData.routes[createActiveDay].map(({place}) => {
            return new window.google.maps.Marker({
                position: {
                    lat: place.latitude,
                    lng: place.longitude
                },
                map: mapRef.current,
            })
        })


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
                                                  data={Select.optionsByRow(places, "id", "original_name")}
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
