export default class PlaceTypeEnum{
    static get reserve(){ return "reserve" }
    static get botanical_garden(){ return "botanical_garden" }
    static get beach(){ return "beach" }
    static get mountains(){ return "mountains" }
    static get sea(){ return "sea" }
    static get lake(){ return "lake" }
    static get restaurant(){ return "restaurant" }
    static get art_gallery(){ return "art_gallery" }
    static get tourist_attraction(){ return "tourist_attraction" }
    static get campground(){ return "campground" }
    static get church(){ return "church" }
    static get mosque(){ return "mosque" }
    static get museum(){ return "museum" }
    static get theater(){ return "theater" }
    static get park(){ return "park" }
    static get place_of_view(){ return "place_of_view" }

    static get googleTypesListManual(){
        return [
        ]
    }
    static get googleTypesListAutomatic(){
        return [
        ]
    }
    static get googleTypesList(){
        return [
        ]
    }

    static get customTypesList(){
        return [
            PlaceTypeEnum.reserve,
            PlaceTypeEnum.botanical_garden,
            PlaceTypeEnum.beach,
            PlaceTypeEnum.mountains,
            PlaceTypeEnum.sea,
            PlaceTypeEnum.lake,
            PlaceTypeEnum.restaurant,
            PlaceTypeEnum.art_gallery,
            PlaceTypeEnum.tourist_attraction,
            PlaceTypeEnum.campground,
            PlaceTypeEnum.church,
            PlaceTypeEnum.mosque,
            PlaceTypeEnum.museum,
            PlaceTypeEnum.theater,
            PlaceTypeEnum.park,
            PlaceTypeEnum.place_of_view,
        ]
    }

    static get list(){
        return [
            ...PlaceTypeEnum.customTypesList,
            ...PlaceTypeEnum.googleTypesList,
        ]
    }
}
