export default class PlaceTypeEnum{
    static get reserve(){ return "reserve" }
    static get botanical_garden(){ return "botanical_garden" }
    static get beach(){ return "beach" }
    static get mountains(){ return "mountains" }
    static get sea(){ return "sea" }
    static get lake(){ return "lake" }
    static get amusement_park(){ return "amusement_park" }
    static get aquarium(){ return "aquarium" }
    static get art_gallery(){ return "art_gallery" }
    static get bus_station(){ return "bus_station" }
    static get tourist_attraction(){ return "tourist_attraction" }
    static get campground(){ return "campground" }
    static get church(){ return "church" }
    static get city_hall(){ return "city_hall" }
    static get mosque(){ return "mosque" }
    static get embassy(){ return "embassy" }
    static get museum(){ return "museum" }
    static get park(){ return "park" }
    static get parking(){ return "parking" }
    static get stadium(){ return "stadium" }
    static get subway_station(){ return "subway_station" }
    static get googleTypesList(){
        return [
            PlaceTypeEnum.amusement_park,
            PlaceTypeEnum.aquarium,
            PlaceTypeEnum.art_gallery,
            PlaceTypeEnum.bus_station,
            PlaceTypeEnum.tourist_attraction,
            PlaceTypeEnum.campground,
            PlaceTypeEnum.church,
            PlaceTypeEnum.city_hall,
            PlaceTypeEnum.mosque,
            PlaceTypeEnum.embassy,
            PlaceTypeEnum.museum,
            PlaceTypeEnum.park,
            PlaceTypeEnum.parking,
            PlaceTypeEnum.stadium,
            PlaceTypeEnum.subway_station,
        ]
    }
    static get list(){
        return [
            PlaceTypeEnum.reserve,
            PlaceTypeEnum.botanical_garden,
            PlaceTypeEnum.beach,
            PlaceTypeEnum.mountains,
            PlaceTypeEnum.sea,
            PlaceTypeEnum.lake,
            ...PlaceTypeEnum.googleTypesList,
        ]
    }
}
