import PlaceTypeEnum from "../enums/PlaceType";
import FoursquarePlaceTypeEnum from "../enums/FoursquarePlaceType";

export default class PlaceTypeTranslate {
    static getTranslateForType( type ) {
        const typeObj = {
            [PlaceTypeEnum.reserve]: "Заповідник",
            [PlaceTypeEnum.botanical_garden]: "Ботанічний сад",
            [PlaceTypeEnum.beach]: "Пляж",
            [PlaceTypeEnum.mountains]: "Гори",
            [PlaceTypeEnum.sea]: "Море",
            [PlaceTypeEnum.lake]: "Озеро",
            [PlaceTypeEnum.art_gallery]: "Картинна галерея",
            [PlaceTypeEnum.tourist_attraction]: "Туристична пам'ятка",
            [PlaceTypeEnum.campground]: "Кемпінг",
            [PlaceTypeEnum.church]: "Церква",
            [PlaceTypeEnum.theater]: "Театр",
            [PlaceTypeEnum.mosque]: "Мечеть",
            [PlaceTypeEnum.museum]: "Музей",
            [PlaceTypeEnum.park]: "Парк",
            [PlaceTypeEnum.restaurant]: "Ресторан",
            [PlaceTypeEnum.place_of_view]: "Красивый вид",
        }

        return typeObj[type] || `ERROR ${type}`
    }

    static getTranslateForFoursquareType( type ) {
        const typeObj = {
            [FoursquarePlaceTypeEnum.place_of_view]: "Красивое место",
            [FoursquarePlaceTypeEnum.reserve]: "Природный заповедник",
            [FoursquarePlaceTypeEnum.botanical_garden]: "Батонический сад",
            [FoursquarePlaceTypeEnum.mountain]: "Гора",
            [FoursquarePlaceTypeEnum.lake]: "Озеро",
            [FoursquarePlaceTypeEnum.restaurant]: "Ресторан",
            [FoursquarePlaceTypeEnum.art_gallery]: "Арт галлерея",
            [FoursquarePlaceTypeEnum.building]: "Здание и сооружение",
            [FoursquarePlaceTypeEnum.castle]: "Замок",
            [FoursquarePlaceTypeEnum.garden]: "Сад",
            [FoursquarePlaceTypeEnum.historical_and_protected_object]: "Исторический объект и защещеные объекты",
            [FoursquarePlaceTypeEnum.monument]: "Памятник",
            [FoursquarePlaceTypeEnum.palace]: "Дворец",
            [FoursquarePlaceTypeEnum.square]: "Площадь",
            [FoursquarePlaceTypeEnum.art_museum]: "Музей искуств",
            [FoursquarePlaceTypeEnum.historical_museum]: "Исторческий музей",
            [FoursquarePlaceTypeEnum.science_museum]: "Музей наук",
            [FoursquarePlaceTypeEnum.theater]: "Теарт",
            [FoursquarePlaceTypeEnum.opera_theatre]: "Оперный театр",
            [FoursquarePlaceTypeEnum.forest]: "Лес",
            [FoursquarePlaceTypeEnum.national_park]: "Национальный парк",
            [FoursquarePlaceTypeEnum.natural_park]: "Природный парк",
        }

        return typeObj[type] || `ERROR ${type}`
    }
}
