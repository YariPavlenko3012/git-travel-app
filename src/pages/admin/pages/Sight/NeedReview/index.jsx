/**
 * external libs
 */
import React, {useRef, useEffect, useState, useMemo} from 'react'
import {Button, Select as SelectAntd, Tooltip} from "antd";
/**
 * services
 */
import SightService from "../../../../../services/admin/sight.service";
import DictionaryService from "../../../../../services/dictionary.service";
/**
 * components
 */
import Table from "../../../../../components/Table";
import SelectCountry from "./components/SelectCountry";
/**
 * utils
 */
import Select from "../../../../../utils/Select";
import {ADMIN_MAKE_EDIT_SIGHT_URI} from "../../../../../constants/admin/uri.constant";
import {EditOutlined} from "@ant-design/icons";
import GoogleClient from "../../../../../utils/GoogleClient";

export default function NeedReview(){
    const [sights, setSights] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const [cityList, setCityList] = useState([])
    const [currentSight, setCurrentSight] = useState(null)
    const [newCityId, setNewCityId] = useState(null)
    const markerRef = useRef(null);
    const squareRef = useRef([]);
    const mapBlockRef = useRef(null);
    const mapRef = useRef(null);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'New City',
            dataIndex: 'city',
            key: 'city',
            render: (_, sight) => {
                if(sight.id !== currentSight?.id){
                    return <div>{sight.city.name}</div>
                }

                return (
                    <SelectAntd
                        size="large"
                        placeholder={"Select city"}
                        options={Select.optionsByRow(cityList, "id", "name")}
                        showSearch={true}
                        defaultValue={sight.city.id}
                        style={{minWidth: "200px"}}
                        filterOption={(text, {value, label}) => {
                            const textLowerCase = text.trim().toLowerCase()
                            const labelLowerCase = label.toLowerCase()
                            const valueLowerCase = value.toString().toLowerCase()
                            return labelLowerCase.includes(textLowerCase) || valueLowerCase.includes(text)
                        }}
                        onChange={setNewCityId}
                    />
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, sight) => (
                <div>
                    {currentSight?.id !== sight.id && (
                        <Tooltip title="Review sight">
                            <Button type="primary" onClick={() => selectSight(sight.id)} icon={<EditOutlined/>} size={20}/>
                        </Tooltip>
                    )}
                    {currentSight?.id === sight.id && (
                        <Button type="primary" onClick={changeSightCity}>Change sight</Button>
                    )}
                </div>
            )
        },
    ]

    const changeSightCity = async () => {
        if(!currentSight){
            return;
        }

        await SightService.needReview(currentSight.id, {city_id: newCityId})
        await getSightWithNeedReview()

        setCurrentSight(null)
        setNewCityId(null)
    }

    const selectSight = async (sightId) => {
        if(markerRef.current){
            markerRef.current.setMap(null)
        }

        const newCurrentSight = sights.data.find(({id}) => id === sightId)

        await getCityListBySight(newCurrentSight.id)

        markerRef.current = GoogleClient.getMarker(
            mapRef.current,
            {
                lat: newCurrentSight.latitude,
                lng: newCurrentSight.longitude
            },
        )

        mapRef.current.setCenter(markerRef.current.getPosition())
        mapRef.current.setZoom(11)

        setNewCityId(newCurrentSight.city.id)
        setCurrentSight(newCurrentSight)
    }

    const getCityListBySight = async (sightId) => {
        const cities = await SightService.getCitiesBySight(sightId);

        squareRef.current.map( square => square.setMap(null))
        squareRef.current = cities.map( city => GoogleClient.getRectangle(
            mapRef.current,
            city.geometry
        ))

        setCityList(cities)
    }

    const getSightWithNeedReview = async (params) => {
        setIsReady(false)
        setSights(await SightService.list({ ...params, per_page: 5, eq: {need_review: 1}  }))
        setIsReady(true)
    }

    const mapInit = async (geometry = {}) => {
        const opt = {
            center: {lat: 51.514316, lng: -0.129761},
            zoom: 4,
            restriction: {
                latLngBounds: {
                    ...geometry
                },
                strictBounds: true
            },
        }

        mapRef.current = new window.google.maps.Map(mapBlockRef.current, opt)
    }

    useEffect(() => {
        getSightWithNeedReview()
        mapInit()
    }, [])


    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20}}>
                <h3>Need Review Sights</h3>
            </div>
            <div ref={mapBlockRef} style={{width: "100%", height: 500}}/>
            {sights && (
                <Table data={sights}
                       columns={columns}
                       loader={!isReady}
                       fetchingData={getSightWithNeedReview}
                />
            )}
        </div>
    )
}
