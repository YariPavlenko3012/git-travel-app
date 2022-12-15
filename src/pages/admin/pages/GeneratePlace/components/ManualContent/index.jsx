/**
 * external libs
 */
import React, { useState, useEffect, useContext } from 'react';
import {Button, Select} from 'antd';
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../../../utils/PlaceTypeTranslate";
/**
 * services
 */
import CityService from "../../../../../../services/admin/city.service";
import GenerationPlaceService from "../../../../../../services/admin/generationPlace.service";
/**
 * enums
 */
import GenerationTypeEnums from "../../../../../../enums/GenerationType";
/**
 * context
 */
import {DictionaryContext} from "../../../../../context/dictionary.context";

export default function ManualContent({ generatePlacesByCity, countryId, typeColor, generationFinishCity, mapRef }){
    const [city, setCity] = useState(null)
    const [cityList, setCityList] = useState(null)
    const {dictionary} = useContext(DictionaryContext)

    const getCity = async (cityId) => {
        setCity(await CityService.show(cityId))
    }

    const getCityList = async () => {
        const { data } = await GenerationPlaceService.cityWhiteList({
            country_id: countryId,
            type: GenerationTypeEnums.manual,
            per_page: 1000000
        })

        setCityList(data.map(({id, name}) => ({value: id, label: name})));
    }

    const startManualGenerate = async () => {
        if(!city){
            return;
        }

        const {failed} = await generatePlacesByCity(city, dictionary.place_types.manual.map(({value}) => value))

        if (failed) {
            console.log('failed END')
            return;
        }

        await generationFinishCity(city.id, GenerationTypeEnums.manual, dictionary.place_types.manual.map(({value}) => value))
    }

    useEffect(() => {
        if (!city) {
            return
        }

        new window.google.maps.Rectangle({
            strokeColor: "#001529",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#001529",
            fillOpacity: 0.35,
            map: mapRef.current,
            bounds: {
                north: city.geometry.north, //noth lat
                south: city.geometry.south, //south lat
                east: city.geometry.east, //noth lng
                west: city.geometry.west, //south lng
            },
        });
    }, [city])

    useEffect(() => {
        getCityList()
    }, [])


    if(!cityList){
        return null
    }

    return (
        <div>
            <div style={{display: "flex", gap: 10, alignItems: "center", marginBottom: -10}}>
                <Button type="primary" onClick={startManualGenerate} disabled={city === null} style={{width: "100%"}}>Manual generation</Button>
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
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 15, marginBottom: 10}}>
                {Object.keys(typeColor).map(type => (
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div style={{width: 10, height: 10, backgroundColor: typeColor[type]}}/>
                        <span> :{PlaceTypeTranslate.getTranslateForType(type)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
