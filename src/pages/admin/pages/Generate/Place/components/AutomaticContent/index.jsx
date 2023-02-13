/**
 * external libs
 */
import React, {useContext} from 'react';
import {Button} from 'antd';
/**
 * services
 */
import GenerationPlaceService from "../../../../../../../services/admin/generationPlace.service";
/**
 * enums
 */
import GenerationTypeEnums from "../../../../../../../enums/GenerationType";
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../../../../utils/PlaceTypeTranslate";
/**
 * context
 */
import {DictionaryContext} from "../../../../../../context/dictionary.context";


export default function AutomaticContent({ generatePlacesByCity, typeColor, countryId, generationFinishCity }){
    const {dictionary} = useContext(DictionaryContext)

    const startAutomaticGenerate = async () => {
        const {data} = await GenerationPlaceService.cityWhiteList({
            country_id: countryId,
            type: GenerationTypeEnums.automatic,
            per_page: 1000000
        })
        console.log(data, "dataSort")


        const dataSort = data.filter(({id}) => 454 === id)

        for (let i = 0; i < dataSort.length; i++) {
            const city = dataSort[i];

            const {failed} = await generatePlacesByCity(city, dictionary.place_types.automatic.map(({value}) => value))

            if (failed) {
                console.log('failed END')
                return;
            }

            console.log('FINISH')
            await generationFinishCity(city.id, GenerationTypeEnums.automatic, dictionary.place_types.automatic.map(({value}) => value))
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
