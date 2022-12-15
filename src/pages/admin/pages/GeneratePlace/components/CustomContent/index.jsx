/**
 * external libs
 */
import React, {useEffect, useContext, useRef, useState} from 'react';
import {Button, Form, Radio} from 'antd';
/**
 * components
 */
import PlaceType from "../PlaceTypes";
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../../../utils/PlaceTypeTranslate";
/**
 * enums
 */
import GenerationPlaceService from "../../../../../../services/admin/generationPlace.service";
/**
 * enums
 */
import PlaceTypeEnum from "../../../../../../enums/PlaceType";
/**
 * context
 */
import {DictionaryContext} from "../../../../../context/dictionary.context";

const typeColor = {
    [PlaceTypeEnum.amusement_park]: "green",
    [PlaceTypeEnum.aquarium]: "red",
    [PlaceTypeEnum.tourist_attraction]: "gray",
    [PlaceTypeEnum.zoo]: "black",
    [PlaceTypeEnum.restaurant]: "blue",
}

export default function AutomaticContent({ getRectangle, countryId, mapRef }){
    const {dictionary} = useContext(DictionaryContext)
    const [placeTypes, setPlaceTypes] = useState(null)
    const [geometry, setGeometry] = useState(null)
    const rectangle = useRef(null)
    const timeOutId = useRef(null)
    const allGeneratedSquare = useRef([])

    const generateSquareByGeometry = async () => {
        //KIYV
        new window.google.maps.Rectangle({
            strokeColor: "blue",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "blue",
            fillOpacity: 0.35,
            map: mapRef.current,
            bounds: {
                north: 50.590798, //noth lat
                south: 50.213273, //south lat
                east: 30.825941, //noth lng
                west: 30.2394401, //south lng
            },
        });

        // const {failed, message, type} = await getRectangle(
        //     {
        //         geometry,
        //         cityId: null,
        //         placeTypes: placeTypes
        //     }
        // )
        //
        // if (failed) {
        //     // socket.emit('pushLog', {
        //     //     success: false,
        //     //     cityId: city.id,
        //     //     geometry_square: {
        //     //       ...geometry
        //     //     },
        //     //     message,
        //     //     type,
        //     // });
        //
        //     return {failed: true}
        // }

        // rectangle.current.setOptions({
        //     editable: false,
        //     draggable: false,
        // })
    }

    const  drawRec = () => {
        const center =  mapRef.current.getCenter();
        const maxHorizontalDif  = 0.4;
        const maxVerticalDif = 0.6;

        const squareSize = {
            north: center.lat() + maxHorizontalDif / 2, //noth lat
            south: center.lat() - maxHorizontalDif / 2, //south lat
            east: center.lng() + maxVerticalDif / 2, //noth lng = 0.05
            west: center.lng() - maxVerticalDif / 2, //south lng = 0.05
        };

        rectangle.current = new window.google.maps.Rectangle({
            bounds: squareSize,
            draggable: true,
            editable: true,
            map: mapRef.current,
        });

        rectangle.current.addListener("bounds_changed", () => {
            clearTimeout(timeOutId.current);
            timeOutId.current = setTimeout(() => {
                const bounds = rectangle.current.getBounds()
                const ne = bounds.getNorthEast();
                const sw = bounds.getSouthWest();
                const center = bounds.getCenter();
                const centerHorizontalLat = center.lat();
                const centerVerticalLng = center.lng();

                let newGeometry = {
                    north: ne.lat(),
                    south: sw.lat(),
                    east: ne.lng(),
                    west: sw.lng(),
                }

                if(geometry && geometry.north === newGeometry.north && geometry.east === newGeometry.east && geometry.west === newGeometry.west && geometry.south === newGeometry.south){
                    return;
                }

                const difHorizontal = newGeometry.north - newGeometry.south;
                const difVertical = newGeometry.east - newGeometry.west;

                const errorDifHorizontal = maxHorizontalDif < difHorizontal;
                const errorDifVertical = maxVerticalDif < difVertical;

                if(errorDifHorizontal){
                    newGeometry = {
                        ...newGeometry,
                        north: centerHorizontalLat - maxHorizontalDif / 2,
                        south: centerHorizontalLat + maxHorizontalDif / 2,
                    }
                }
                if(errorDifVertical){
                    newGeometry = {
                        ...newGeometry,
                        west: centerVerticalLng - maxVerticalDif / 2,
                        east: centerVerticalLng + maxVerticalDif / 2,
                    }
                }

                if(errorDifHorizontal || errorDifVertical){
                    setGeometry(newGeometry)
                    rectangle.current.setOptions({
                        bounds: newGeometry
                    })
                }
            },500);
        });
    }

    const  close = () => {

    }

    const drawSquareByPlaceType = async () => {
        if(!placeTypes){
            return;
        }

        allGeneratedSquare.current.forEach(( square ) => {
            square.setMap(null)
        })

        const {data} = await GenerationPlaceService.generatedSquare({
            eq: {
                country_id: countryId,
                type: placeTypes
            },
            per_page: 1000000,
        });


        allGeneratedSquare.current = data.map(({geometry}) => (
            new window.google.maps.Rectangle({
                strokeColor: "blue",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "blue",
                fillOpacity: 0.35,
                map: mapRef.current,
                bounds: geometry,
            })
        ))
    }

    useEffect(() => {
       drawSquareByPlaceType()
    }, [placeTypes])

    return (
        <div>
            <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                <Button type="primary" onClick={generateSquareByGeometry} style={{width: "100%"}}>Custom generation</Button>
                <Button type="primary" onClick={drawRec} style={{width: "100%"}}>Draw</Button>
                <Button type="primary" onClick={close} style={{width: "100%"}}>close</Button>
            </div>
            <PlaceType places={dictionary.place_types.list.map(({value}) => value)}
                       setPlaceTypes={setPlaceTypes}
                       placeTypes={placeTypes}
            />
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
