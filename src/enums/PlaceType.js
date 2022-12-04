export default class PlaceTypeEnum{
    static get reserve(){ return "reserve" }
    static get botanical_garden(){ return "botanical_garden" }
    static get beach(){ return "beach" }
    static get mountains(){ return "mountains" }
    static get sea(){ return "sea" }
    static get lake(){ return "lake" }
    static get amusement_park(){ return "amusement_park" }
    static get aquarium(){ return "aquarium" }
    static get restaurant(){ return "restaurant" }
    static get art_gallery(){ return "art_gallery" }
    static get tourist_attraction(){ return "tourist_attraction" }
    static get campground(){ return "campground" }
    static get church(){ return "church" }
    static get city_hall(){ return "city_hall" }
    static get mosque(){ return "mosque" }
    static get embassy(){ return "embassy" }
    static get museum(){ return "museum" }
    static get park(){ return "park" }
    static get zoo(){ return "zoo" }
    static get googleTypesList(){
        return [
            PlaceTypeEnum.amusement_park,
            PlaceTypeEnum.aquarium,
            PlaceTypeEnum.tourist_attraction,
            PlaceTypeEnum.zoo,
            PlaceTypeEnum.restaurant,
            PlaceTypeEnum.campground,
            PlaceTypeEnum.church,
            PlaceTypeEnum.city_hall,
            PlaceTypeEnum.mosque,
            PlaceTypeEnum.embassy,
            PlaceTypeEnum.art_gallery,
            PlaceTypeEnum.museum,
        ]
    }
    static get googleTypesListManual(){
        return [
            PlaceTypeEnum.amusement_park,
            PlaceTypeEnum.aquarium,
            PlaceTypeEnum.tourist_attraction,
            PlaceTypeEnum.zoo,
            PlaceTypeEnum.restaurant,
        ]
    }
    static get googleTypesListAutomatic(){
        return [
            PlaceTypeEnum.campground,
            PlaceTypeEnum.church,
            PlaceTypeEnum.city_hall,
            PlaceTypeEnum.mosque,
            PlaceTypeEnum.embassy,
            PlaceTypeEnum.art_gallery,
            PlaceTypeEnum.museum,
        ]
    }
    static get list(){
        return [
            PlaceTypeEnum.park,
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
