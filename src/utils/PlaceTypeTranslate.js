import PlaceTypeEnum from "../enums/PlaceType";

export default class PlaceTypeTranslate {
    static getTranslateForType( type ) {
        const typeObj = {
            [PlaceTypeEnum.reserve]: "Заповідник",
            [PlaceTypeEnum.botanical_garden]: "Ботанічний сад",
            [PlaceTypeEnum.beach]: "Пляж",
            [PlaceTypeEnum.mountains]: "Гори",
            [PlaceTypeEnum.sea]: "Море",
            [PlaceTypeEnum.lake]: "Озеро",
            [PlaceTypeEnum.amusement_park]: "Парк розваг",
            [PlaceTypeEnum.aquarium]: "Акваріум",
            [PlaceTypeEnum.art_gallery]: "Картинна галерея",
            [PlaceTypeEnum.zoo]: "Зоопарк",
            [PlaceTypeEnum.tourist_attraction]: "Туристична пам'ятка",
            [PlaceTypeEnum.campground]: "Кемпінг",
            [PlaceTypeEnum.church]: "Церква",
            [PlaceTypeEnum.theater]: "Театр",
            [PlaceTypeEnum.mosque]: "Мечеть",
            [PlaceTypeEnum.embassy]: "Посольство",
            [PlaceTypeEnum.museum]: "Музей",
            [PlaceTypeEnum.park]: "Парк",
            [PlaceTypeEnum.restaurant]: "Ресторан",
        }

        return typeObj[type]
    }
}
