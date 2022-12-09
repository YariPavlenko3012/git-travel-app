/**
 * external libs
 */
import React from 'react';
import {Button} from 'antd';
/**
 * enums
 */
import PlaceTypeEnum from "../../../../../../enums/PlaceType";
/**
 * enums
 */
import CityService from "../../../../../../services/admin/city.service";
import GenerationTypeEnums from "../../../../../../enums/GenerationType";
import GenerationPlaceService from "../../../../../../services/admin/generationPlace.service";
import PlaceTypeTranslate from "../../../../../../utils/PlaceTypeTranslate";


export default function AutomaticContent({ generatePlacesByCity, typeColor, countryId, generationFinishCity }){

    const startAutomaticGenerate = async () => {
        const {data} = await GenerationPlaceService.cityWhiteList({
            country_id: countryId,
            type: GenerationTypeEnums.automatic,
            per_page: 1000000
        })

        const dataSort = data.filter(({id}) => 264 === id)
        console.log(dataSort)

        for (let i = 0; i < dataSort.length; i++) {
            const city = dataSort[i];

            const {failed} = await generatePlacesByCity(city, PlaceTypeEnum.googleTypesListAutomatic)

            if (failed) {
                console.log('failed END')
                return;
            }

            console.log('FINISH')
            await generationFinishCity(city.id, GenerationTypeEnums.automatic, PlaceTypeEnum.googleTypesListAutomatic)
        }

        console.log("END")

        return;
    }

    return (
        <div>
            <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                <Button type="primary" onClick={() => startAutomaticGenerate(1)} style={{width: "100%"}}>Automatic generation</Button>

            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 15, marginTop: 10}}>
                {Object.keys(typeColor).map(type => {
                    return (
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{width: 10, height: 10, backgroundColor: typeColor[type]}}/>
                            <span> :{PlaceTypeTranslate.getTranslateForType(type)}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
