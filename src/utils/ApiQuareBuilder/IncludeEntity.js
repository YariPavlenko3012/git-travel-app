import merge from 'deepmerge'

class CountryIncludeEntity {
  static get translation() {return "translation"}
  static get translations() {return "translations"}
  static get currency() {return "currency"}
  static get officialLanguage() {return "officialLanguageRelation"}
  static get portraitImage() {return "portraitImageRelation"}
  static get landscapeImage() {return "landscapeImageRelation"}
}
class StateIncludeEntity {
  static get translation() {return "translation"}
  static get translations() {return "translations"}
}
class CityIncludeEntity {
  static get translation() {return "translation"}
  static get translations() {return "translations"}
  static get portraitImage() {return "portraitImageRelation"}
  static get landscapeImage() {return "landscapeImageRelation"}
}
class SightIncludeEntity {
  static get translation() {return "translation"}
  static get translations() {return "translations"}
  static get images() {return "images"}
}


export {
  CountryIncludeEntity,
  StateIncludeEntity,
  CityIncludeEntity,
  SightIncludeEntity,
}
