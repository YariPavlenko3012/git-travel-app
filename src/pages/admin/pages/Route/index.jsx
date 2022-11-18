/**
 * external libs
 */
import React, {useEffect, useRef, useState} from 'react';
/**
 * components
 */
import PlaceType from './components/Types'
/**
 * styles
 */
import styles from "./index.module.scss";
/**
 * enums
 */
import PlaceTypeEnum from '../../../../enums/PlaceType'
import SightService from "../../../../services/admin/sight.service";

export default function Route() {
    const [placeTypes, setPlaceTypes] = useState([])
    const mapBlockRef = useRef(null);
    const mapRef = useRef(null);

    const mapInit = () => {
        const opt = {
            center: {lat: 51.514316, lng: -0.129761},
            zoom: 4,
            restriction: {
                latLngBounds: {
                    north: 50.590798, //noth lat up
                    east: 30.825941, //noth lng right
                    south: 50.213273, //south lat down
                    west: 30.2394401, //south lng left
                },
                strictBounds: true
            },
        }

        mapRef.current = new window.google.maps.Map(mapBlockRef.current, opt)

        new window.google.maps.Marker({
            position: {
                lat: 50.4662711,
                lng: 30.5134968
            },
            map: mapRef.current,
        })
    }

    const selectPlaceTypes = ( type ) => {
        if(placeTypes.includes(type)){
            return setPlaceTypes(placeTypes.filter( placeType => placeType !== type))
        }

        setPlaceTypes([...placeTypes, type])
    }

    const getPlace = () => {
        SightService.list({
            city_id: 264
        })
    }


    useEffect(() => {
        // getGeometryForCity()

        mapInit()
        getPlace()
    }, [])

    return (
        <div>
            <div>
                Get place
            </div>
            <div ref={mapBlockRef} style={{width: "100%", height: 500}} />
            <PlaceType setPlaceTypes={selectPlaceTypes} placeTypes={placeTypes}/>
        </div>
    )
}
