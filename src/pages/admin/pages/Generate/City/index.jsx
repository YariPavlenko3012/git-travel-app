/**
 * external libs
 */
import React, {useState} from 'react'
import {useParams} from "react-router-dom";
import {Button, List, Tooltip} from 'antd'
import {DeleteOutlined} from "@ant-design/icons";
/**
 * services
 */
import StateService from "../../../../../services/admin/state.service";
import CityService from "../../../../../services/admin/city.service";
/**
 * utils
 */
import GoogleClient from "../../../../../utils/GoogleClient";

export default function GenerateCity() {
    const [cities, setCities] = useState(null);
    const [equalGeometryCity, setEqualGeometryCity] = useState(null);
    const {countryId} = useParams();

    const generate = async (countryCode, minPopulation = 100000) => {
        if(!countryCode){
            return;
        }

        const isDemo = false;
        const url = isDemo ? "http://geodb-free-service.wirefreethought.com" : "https://wft-geo-db.p.rapidapi.com"
        const LIMIT_RATE = isDemo ? 10 : 100;

        const headers = {
            'X-RapidAPI-Key': '9b6599ddebmsh70080c0c4b276c4p172c5ajsn58e3d1228228',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        }
        let states = [];

        for (let i = 0; ; i++) {
            const resultState = await ((await fetch(`${url}/v1/geo/countries/${countryCode}/regions?limit=${LIMIT_RATE}&offset=${LIMIT_RATE * i}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                }
            })).json())
            states = [...states, ...resultState.data]

            const totalUploadState = LIMIT_RATE * (i + 1);
            if (totalUploadState >= resultState.metadata.totalCount) {
                break;
            }
        }

        let cities = []

        for (let i = 0; i < states.length; i++) {
            const stateIso = states[i].isoCode;
            for (let j = 0; ; j++) {
                const resultCity = await ((await fetch(`${url}/v1/geo/countries/${countryCode}/regions/${stateIso}/cities?minPopulation=${minPopulation}&hateoasMode=false&limit=${LIMIT_RATE}&offset=${LIMIT_RATE * j}`, {
                    headers: {
                        "Content-Type": "application/json",
                        ...headers
                    }
                })).json())
                cities = [...cities, ...resultCity.data
                    .filter(city => city.type === "CITY")
                    .filter(city => !["Białołęka", "Bemowo", "Żoliborz", "Włochy", "Ochota", "Ursus", "Wawer", "Mokotów", "Ursynów", "Wilanów"].includes(city.name))
                    .map(city => ({
                        ...city,
                        latitude: city.latitude,
                        longitude: city.longitude,
                        name: city.name.split(" County")[0],
                    }))]

                const totalUploadState = LIMIT_RATE * (j + 1);
                if (totalUploadState >= resultCity.metadata.totalCount) {
                    break;
                }
            }
        }

        console.log("Cities: ", cities)

        let newEqualGeometryCity = {}

        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];

            const cityData = {
                id: city.id,
                name: city.name,
            }

            await new Promise(resolve => setTimeout(resolve, 400))
            const geometry = await GoogleClient.getGeometryForCity(city.latitude, city.longitude)
            if (geometry) {
                cityData.geometry = geometry;
                cityData.latitude = city.latitude;
                cityData.longitude = city.longitude;


                const {north, east, south, west} = geometry;

                const geometryKey = `${north}x${east}:${south}x${west}`
                if (!newEqualGeometryCity[geometryKey]) {
                    newEqualGeometryCity[geometryKey] = []
                }

                newEqualGeometryCity[geometryKey] = [
                    ...newEqualGeometryCity[geometryKey],
                    cityData,
                ]
            }
            cities[i] = cityData
        }

        newEqualGeometryCity = Object.keys(newEqualGeometryCity).reduce((accum, key) => {
            if (accum[key].length <= 1) {
                delete accum[key]
            }

            return accum
        }, newEqualGeometryCity)

        setCities(cities)
        setEqualGeometryCity(Object.keys(newEqualGeometryCity).length ? newEqualGeometryCity : null)
    }

    const deleteCity = (id, size) => {
        let copyEqualGeometryCity = JSON.parse(JSON.stringify(equalGeometryCity))
        copyEqualGeometryCity[size] = copyEqualGeometryCity[size].filter(city => city.id !== id)

        if (copyEqualGeometryCity[size].length === 1) {
            delete copyEqualGeometryCity[size]
        }

        if (!Object.keys(copyEqualGeometryCity).length) {
            copyEqualGeometryCity = null;
        }

        setCities(cities.filter((city) => city.id !== id))

        setEqualGeometryCity(copyEqualGeometryCity)
    }

    const createCity = async () => {
        const {id: stateId} = await StateService.create({
            country_id: countryId,
            state_name: "TEST STATE FOR DELETE"
        })

        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];

            const cityRequest = {
                state_id: stateId,
                city_name: city.name,
                original_name: city.name,
                generation_count_of_squares: 2,
            }

            await new Promise(resolve => setTimeout(resolve, 400))
            if (city.geometry) {
                cityRequest.geometry = city.geometry;
                cityRequest.latitude = city.latitude;
                cityRequest.longitude = city.longitude;
            }

            const {id: cityId} = await CityService.create({city: cityRequest})

            console.log(`ID: ${cityId}. City: ${city}; ID_STAT: ${56}`)
        }
    }

    return (
        <div>
            {cities && (
                <div style={{fontSize: 20, fontWeight: 600, marginBottom: 30}}>
                    Will be added {cities.length} cities
                </div>
            )}
            {!cities && (
                <Button type="primary" onClick={() => generate("ES", 150000)}>
                    Generate cities
                </Button>
            )}
            {equalGeometryCity && (
                <div>
                    <div style={{fontWeight: 600, marginBottom: 10}}>Equal Geometry City (U need stay only 1 city)</div>
                    {Object.keys(equalGeometryCity).map(size => (
                        <List
                            key={size}
                            style={{
                                marginBottom: 10,
                                border: `2px solid ${equalGeometryCity[size].length === 1 ? "#6fda0c" : "red"}`
                            }}
                            header={<div>{size}</div>}
                            bordered
                            dataSource={equalGeometryCity[size]}
                            renderItem={(item) => (
                                <List.Item>
                                    {item.name}
                                    <Tooltip title="Delete City">
                                        <Button onClick={() => deleteCity(item.id, size)} style={{marginLeft: 20}}
                                                type="danger" icon={<DeleteOutlined/>} size={"small"}/>
                                    </Tooltip>
                                </List.Item>
                            )}
                        />
                    ))}
                </div>
            )}
            {cities && !equalGeometryCity && (
                <Button type="primary" onClick={createCity}>
                    Create {cities.length} cities
                </Button>
            )}
        </div>
    )
}
