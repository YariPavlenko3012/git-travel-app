/**
 * external libs
 */
import React, {useState, useEffect, useContext} from 'react';
import {Button, Input, Select} from 'antd';
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../../../../utils/PlaceTypeTranslate";
/**
 * services
 */
import CityService from "../../../../../../../services/admin/city.service";
import GenerationPlaceService from "../../../../../../../services/admin/generationPlace.service";
/**
 * enums
 */
import GenerationTypeEnums from "../../../../../../../enums/GenerationType";
import FoursquarePlaceTypeEnum from "../../../../../../../enums/FoursquarePlaceType";
/**
 * context
 */
import {DictionaryContext} from "../../../../../../context/dictionary.context";
import GoogleClient from "../../../../../../../utils/GoogleClient";

export default function ManualContent({generatePlacesByCity, generationFinishCity, countryId, setLoading, mapRef}) {
    const [countOfLimitSearch, setCountOfLimitSearch] = useState(0)
    const [cityList, setCityList] = useState([])
    const [city, setCity] = useState(null)
    const [types, setTypes] = useState([])
    const [type, setType] = useState(null)
    const {dictionary} = useContext(DictionaryContext)

    const getCity = async (cityId) => {
        const city = await CityService.show(cityId)

        await getType(city)
        setCity(city)
    }

    const getCityList = async () => {
        const {data} = await GenerationPlaceService.cityWhiteList({
            country_id: countryId,
            type: GenerationTypeEnums.manual,
            per_page: 1000000
        })

        setCityList(data.map(({id, name}) => ({value: id, label: name})));
    }

    const startManualGenerate = async () => {
        if (!city) {
            return;
        }

        if(countOfLimitSearch > 50){
            return;
        }

        const {failed} = await generatePlacesByCity(city, [type], countOfLimitSearch)

        setLoading(false)

        if (failed) {
            console.log('failed END')
            return;
        }

        await generationFinishCity(city.id, GenerationTypeEnums.manual, dictionary.place_types.list.map(({value}) => value))

        console.log("END")
    }

    const getType = async (city) => {
        const isGeneratedTypes = await GenerationPlaceService.generatedSquare({
            json: {geometry: city.geometry},
            eq: {
                type: Object.keys(FoursquarePlaceTypeEnum.typeIds).reduce((accum, key) => ([
                    ...accum,
                    FoursquarePlaceTypeEnum.typeIds[key]
                ]), [])
            }
        })

        const uniqTypesId = isGeneratedTypes.data.map(({type}) => +type)

        setTypes(Object.keys(FoursquarePlaceTypeEnum.typeIds).reduce((accum, key) => {
            if(uniqTypesId.includes(FoursquarePlaceTypeEnum.typeIds[key])){
                return accum
            }

            return [
                ...accum,
                {
                    value: FoursquarePlaceTypeEnum.typeIds[key],
                    label: PlaceTypeTranslate.getTranslateForFoursquareType([key])
                }
            ]
        }, []))
    }

    useEffect(() => {
        if (!city) {
            return
        }


        GoogleClient.getRectangle(
            mapRef.current,
            {
                north: city.geometry.north, //noth lat
                south: city.geometry.south, //south lat
                east: city.geometry.east, //noth lng
                west: city.geometry.west, //south lng
            },
            "#001529"
        )
    }, [city])

    useEffect(() => {
        getCityList()
    }, [])


    if (!cityList) {
        return null
    }

    return (
        <div>
            <div style={{display: "flex", gap: 10, alignItems: "center", marginBottom: -10}}>
                <Button type="primary"
                        onClick={startManualGenerate}
                        disabled={(city === null) || !type || !countOfLimitSearch}
                        style={{width: "100%"}}>Manual
                    generation</Button>
            </div>
            <div style={{margin: "20px 0"}}>
                <Select
                    size="large"
                    placeholder={"Select city"}
                    options={cityList}
                    showSearch={true}
                    style={{minWidth: "100%"}}
                    filterOption={(text, {value, label}) => {
                        const textLowerCase = text.trim().toLowerCase()
                        const labelLowerCase = label.toLowerCase()
                        const valueLowerCase = value.toString().toLowerCase()
                        return labelLowerCase.includes(textLowerCase) || valueLowerCase.includes(text)
                    }}
                    onChange={getCity}
                />
                {city && (
                    <>
                        <Select
                            size="large"
                            placeholder={"Select type"}
                            options={types}
                            showSearch={true}
                            style={{minWidth: "100%", marginTop: 8}}
                            filterOption={(text, {value, label}) => {
                                const textLowerCase = text.trim().toLowerCase()
                                const labelLowerCase = label.toLowerCase()
                                const valueLowerCase = value.toString().toLowerCase()
                                return labelLowerCase.includes(textLowerCase) || valueLowerCase.includes(text)
                            }}
                            onChange={setType}
                        />
                        {type && (
                            <Input
                                placeholder="Count of search (max 50)..."
                                value={countOfLimitSearch}
                                onChange={e => setCountOfLimitSearch(+e.target.value)}
                                style={{marginTop: 8, display: 'block'}}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
