import GenerationPlaceService from "../services/admin/generationPlace.service";
import ExcursionRouteTypeEnum from "../enums/ExcursionRouteType";
import {QueryString} from "./Querystring";

export default class GoogleClient {
    static key = process.env.REACT_APP_GEOCODING_API

    static getGeometryForCity(latitude, longitude) {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&key=${this.key}`)
            .then(res => res.json())
            .then(city => {
                if (city.results[0]) {
                    const {northeast, southwest} = city.results[0].geometry.viewport;

                    return {
                        north: northeast.lat, //noth lat up
                        east: northeast.lng, //noth lng right
                        south: southwest.lat, //south lat down
                        west: southwest.lng, //south lng left
                    }
                }

                return null
            })
    }

    static getGeometryForCountry(latitude, longitude) {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=country&key=${this.key}`)
            .then(res => res.json())
            .then(country => {
                if (country.results[0]) {
                    const {northeast, southwest} = country.results[0].geometry.viewport;

                    return {
                        north: northeast.lat, //noth lat up
                        east: northeast.lng, //noth lng right
                        south: southwest.lat, //south lat down
                        west: southwest.lng, //south lng left
                    }
                }

                return null
            })
    }

    static async getPhotoFile (photo_ref){
        try {
            await new Promise(resolve => setTimeout(resolve, 400))
            const file = await GenerationPlaceService.downloadImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&sensor=false&maxheight=800&photo_reference=${photo_ref}&key=${this.key}`)

            return file?.id ? file : null;
        } catch (e) {
            return null
        }
    }

    static async getPhotosId( photosList ){
        let filesIds = [];
        const shortPhotosList = photosList?.filter((_, index) => index === 0) || [];

        if(!shortPhotosList.length) {
            return []
        }

        for (let i = 0; i < shortPhotosList.length; i++) {
            const photoReference = shortPhotosList[i].photo_reference;
            const file = await this.getPhotoFile(photoReference)

            if (file.id) {
                filesIds = [...filesIds, file.id]
            }
        }

        return filesIds
    }

    static getPlaceDetails( placeId, fields, props = {} ){
        const defaultFields = [
            'international_phone_number',
            'opening_hours',
            'website',
            'geometry',
            'type',
            'photo',
            'formatted_address',
            'address_components',
            'name',
            'place_id',
        ]

        const requestDetailPlace = {
            placeId: placeId,
            fields: fields || defaultFields
        };

        return fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${requestDetailPlace.placeId}&fields=${requestDetailPlace.fields.join(",")}&key=${this.key}`)
            .then(res => res.json())
            .then(res => {
                if(res.status === "OK"){
                    return res.result;
                }

                if(["ZERO_RESULTS", "NOT_FOUND"].includes(res.status)){
                    return null
                }

                return {
                    failed: true,
                    message: res.status
                }
            })
            .catch( error => ({
                failed: true,
                message: error
            }))
    }

    static getDirection( params ){
        const currentParams = {
            key: this.key,
            ...params,
        }
        const url = `https://maps.googleapis.com/maps/api/directions/json?${QueryString.stringify(currentParams)}`

        return fetch(url)
            .then(res => res.json())
            .then(direction => {
                if(direction.status === "OK"){
                    return direction;
                }

                if(["ZERO_RESULTS", "NOT_FOUND"].includes(direction.status)){
                    return null
                }

                return {
                    failed: true,
                    message: direction.status
                }
            })
            .catch( error => ({
                failed: true,
                message: error
            }))
    }

    static getBounds(north, south, east, west) {
        const bounds = new window.google.maps.LatLngBounds();

        bounds.extend(new window.google.maps.LatLng(north, east));
        bounds.extend(new window.google.maps.LatLng(south, west));

        return bounds;
    }

    static getMarker(map, position = {}, icon = null, props){
        return new window.google.maps.Marker({
            position: position,
            icon,
            map,
            ...props
        })
    }

    static getRectangle( map, bounds, color = "blue", props = {} ){
        return new window.google.maps.Rectangle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            bounds: bounds.getNorthEast ? GoogleClient.parseBounds(bounds) : bounds,
            map,
            ...props,
        });
    }

    static getPolyline( map, path, props = {} ){
        return new window.google.maps.Polyline({
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 3,
            geodesic: true,
            path,
            map,
            ...props,
        })
    }

    static generateCustomMarker(color = "black") {
        const pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";
        const labelOriginFilled = new window.google.maps.Point(12, 9);


        return {
            path: pinSVGFilled,
            anchor: new window.google.maps.Point(12, 17),
            fillOpacity: 1,
            fillColor: color,
            strokeWeight: 2,
            strokeColor: "white",
            scale: 2,
            labelOrigin: labelOriginFilled
        };
    }

    static parseBounds( bounds ){
        return {
            north: bounds.getNorthEast().lat(), //noth lat
            south: bounds.getSouthWest().lat(), //south lat
            east: bounds.getNorthEast().lng(), //noth lng
            west: bounds.getSouthWest().lng() //south lng
        }
    }

    static parseOpeningHours( openingHours ){
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let formatOpeningHours = null

        if(openingHours){
            if(openingHours.length === 1 && openingHours[0].close === undefined){
                formatOpeningHours = days.reduce((result, day ) => ({
                    ...result,
                    [day]: {
                        open: "00:00",
                        close: "00:00"
                    }
                }), {})

                return formatOpeningHours
            }

            formatOpeningHours = openingHours.reduce( (result, openHour) => ({
                ...result,
                [days[openHour.open.day]]: {
                    open: `${openHour.open.time.slice(0, 2)}:${openHour.open.time.slice(2, 4)}`,
                    close: `${openHour.close.time.slice(0, 2)}:${openHour.close.time.slice(2, 4)}`,
                }
            }), {})

            return formatOpeningHours
        }

        return formatOpeningHours
    }

}
