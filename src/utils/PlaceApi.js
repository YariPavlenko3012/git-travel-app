export default class PlaceApi {
    static getGeometryForCity(latitude, longitude) {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&key=AIzaSyApPL4vfjbQ_iVFrfE-97KN-ncf8i1NDLU`)
            .then(res => res.json())
            .then(city => {
                console.log(city)
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
}
