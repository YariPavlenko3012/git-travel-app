import GenerationPlaceService from "../services/admin/generationPlace.service";
import ExcursionRouteTypeEnum from "../enums/ExcursionRouteType";
import {QueryString} from "./Querystring";

export default class FoursquareClient {
    static key = process.env.REACT_APP_FOURSQUARE_API

    static async getPlaces (searchParams = {}){
        // categories=${foursquareType}&ne=52.3679992%2C21.2710984&sw=52.0978767%2C20.8512898&limit=${limit}

        try {
            const {results} = await (await fetch(`https://api.foursquare.com/v3/places/search?${QueryString.stringify(searchParams)}`, {
                headers: {
                    Authorization: this.key,
                    accept: 'application/json'
                }
            })).json()

            return results

        } catch (e) {
            return []
        }
    }

    static async getPlacesDetails (foursquarePlaceId, fields = []){
        try {
            const placeDetails = await (await fetch(`https://api.foursquare.com/v3/places/${foursquarePlaceId}?${QueryString.stringify({fields: fields.join(",")})}`, {
                headers: {
                    Authorization: this.key,
                    accept: 'application/json'
                }
            })).json()

            console.log(placeDetails, "placeDetails")

            placeDetails.opening_hours = this.parseOpeningHours(placeDetails.hours.regular)
            delete placeDetails.hours;

            return placeDetails
        } catch (e) {
            return null
        }
    }

    static async getPhotoFile (photoUrl){
        try {
            await new Promise(resolve => setTimeout(resolve, 400))
            const file = await GenerationPlaceService.downloadImage(photoUrl)

            return file?.id ? file : null;
        } catch (e) {
            return null
        }
    }

    static async getPhotosId( foursquarePlaceId ){
        let photosList = [];
        let photos =  await fetch(`https://api.foursquare.com/v3/places/${foursquarePlaceId}/photos`, {
            headers: {
                Authorization: this.key,
                accept: 'application/json'
            }
        })

        if(photos.status === 200){
            photosList = await photos.json()
        }else{
            return []
        }

        let filesIds = [];
        const shortPhotosList = photosList?.filter((_, index) => index < 3) || [];

        if(!shortPhotosList.length) {
            return []
        }

        for (let i = 0; i < shortPhotosList.length; i++) {
            const photo = shortPhotosList[i];
            const photoUrl = `${photo.prefix}original${photo.suffix}`


            await new Promise(resolve => setTimeout(resolve, 400))
            const file = await this.getPhotoFile(photoUrl)

            if (file?.id) {
                filesIds = [...filesIds, file.id]
            }
        }

        return filesIds
    }

    static parseOpeningHours( openingHours ){
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        let formatOpeningHours = null

        if(openingHours){
            formatOpeningHours = openingHours.reduce( (result, openHour) => {
                const openTimeSplit = openHour.open.split('+')
                const closeTimeSplit = openHour.open.split('+')
                const openTimeFormat = openTimeSplit.length === 1 ? openTimeSplit[0] : openTimeSplit[1]
                const closeTimeFormat = closeTimeSplit.length === 1 ? closeTimeSplit[0] : closeTimeSplit[1]
                const openTime = openTimeFormat === "2359" ? "0000" : openTimeFormat
                const closeTime = closeTimeFormat === "2359" ? "0000" : closeTimeFormat

                return {
                    ...result,
                    [days[openHour.day - 1]]: {
                        open: `${openTime.slice(0, 2)}:${openTime.slice(2, 4)}`,
                        close: `${closeTime.slice(0, 2)}:${closeTime.slice(2, 4)}`,
                    }
                }
            }, {})

            return formatOpeningHours
        }

        return formatOpeningHours
    }

}
