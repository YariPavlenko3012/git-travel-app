import PlaceTypeEnum from "./PlaceType";

export default class FoursquarePlaceTypeEnum {
    static get place_of_view(){return "place_of_view"}
    static get reserve(){return "reserve"}
    static get botanical_garden(){return "botanical_garden"}
    static get mountain(){return "mountain"}
    static get lake(){return "lake"}
    static get restaurant(){return "restaurant"}
    static get art_gallery(){return "art_gallery"}
    static get building(){return "building"}
    static get castle(){return "castle"}
    static get garden(){return "garden"}
    static get historical_and_protected_object(){return "historical_and_protected_object"}
    static get monument(){return "monument"}
    static get palace(){return "palace"}
    static get square(){return "square"}
    static get art_museum(){return "art_museum"}
    static get historical_museum(){return "historical_museum"}
    static get science_museum(){return "science_museum"}
    static get theater(){return "theater"}
    static get opera_theatre(){return "opera_theatre"}
    static get forest(){return "forest"}
    static get national_park(){return "national_park"}
    static get natural_park(){return "natural_park"}

    static get typeOriginIds() {
        return {
            [PlaceTypeEnum.reserve]: [16028],
            [PlaceTypeEnum.botanical_garden]: [16005],
            [PlaceTypeEnum.mountains]: [16027],
            [PlaceTypeEnum.lake]: [16023],
            [PlaceTypeEnum.restaurant]: [13065],
            [PlaceTypeEnum.art_gallery]: [10004],
            [PlaceTypeEnum.tourist_attraction]: [16007, 16011, 16017, 16020, 16026, 16031, 16041],
            [PlaceTypeEnum.museum]: [10028, 10030, 10031],
            [PlaceTypeEnum.theater]: [10043, 10042],
            [PlaceTypeEnum.park]: [16015, 16034, 16035],
            [PlaceTypeEnum.place_of_view]: [16046],
        }
    }

    static get typeIds() {
        return {
            [FoursquarePlaceTypeEnum.place_of_view]: 16046,
            [FoursquarePlaceTypeEnum.reserve]: 16028,
            [FoursquarePlaceTypeEnum.botanical_garden]: 16005,
            [FoursquarePlaceTypeEnum.mountain]: 16027,
            [FoursquarePlaceTypeEnum.lake]: 16023,
            [FoursquarePlaceTypeEnum.restaurant]: 13065,
            [FoursquarePlaceTypeEnum.art_gallery]: 10004,
            [FoursquarePlaceTypeEnum.building]: 16007,
            [FoursquarePlaceTypeEnum.castle]: 16011,
            [FoursquarePlaceTypeEnum.garden]: 16017,
            [FoursquarePlaceTypeEnum.historical_and_protected_object]: 16020,
            [FoursquarePlaceTypeEnum.monument]: 16026,
            [FoursquarePlaceTypeEnum.palace]: 16031,
            [FoursquarePlaceTypeEnum.square]: 16041,
            [FoursquarePlaceTypeEnum.art_museum]: 10028,
            [FoursquarePlaceTypeEnum.historical_museum]: 10030,
            [FoursquarePlaceTypeEnum.science_museum]: 10031,
            [FoursquarePlaceTypeEnum.theater]: 10043,
            [FoursquarePlaceTypeEnum.opera_theatre]: 10042,
            [FoursquarePlaceTypeEnum.forest]: 16015,
            [FoursquarePlaceTypeEnum.national_park]: 16034,
            [FoursquarePlaceTypeEnum.natural_park]: 16035,
        }
    }
}
