export default class PlaceTypeEnum{
    static get reserve(){ return "reserve" }
    static get botanical_garden(){ return "botanical_garden" } // 1.5ч
    static get beach(){ return "beach" }  // 30мин
    static get mountains(){ return "mountains" }
    static get sea(){ return "sea" } // 30мин
    static get lake(){ return "lake" } // 2ч
    static get amusement_park(){ return "amusement_park" } // 2ч
    static get aquarium(){ return "aquarium" } // 2ч
    static get restaurant(){ return "restaurant" } // 2ч
    static get art_gallery(){ return "art_gallery" } // 2ч
    static get tourist_attraction(){ return "tourist_attraction" }
    static get campground(){ return "campground" }
    static get church(){ return "church" }
    static get mosque(){ return "mosque" }
    static get embassy(){ return "embassy" }
    static get museum(){ return "museum" }
    static get park(){ return "park" }
    static get zoo(){ return "zoo" }

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
            PlaceTypeEnum.embassy,
            PlaceTypeEnum.art_gallery,
            PlaceTypeEnum.museum,
        ]
    }
    static get googleTypesList(){
        return [
            ...PlaceTypeEnum.googleTypesListManual,
            ...PlaceTypeEnum.googleTypesListAutomatic,
        ]
    }
    static get customTypesList(){
        return [
            PlaceTypeEnum.park,
            PlaceTypeEnum.reserve,
            PlaceTypeEnum.botanical_garden,
            PlaceTypeEnum.beach,
            PlaceTypeEnum.mountains,
            PlaceTypeEnum.sea,
            PlaceTypeEnum.church,
            PlaceTypeEnum.mosque,
            PlaceTypeEnum.lake,
        ]
    }

    static get list(){
        return [
            ...PlaceTypeEnum.customTypesList,
            ...PlaceTypeEnum.googleTypesList,
        ]
    }
}
