import merge from 'deepmerge'

class CountryIncludeEntity {
  static get translation() {return "translation"}
  static get translations() {return "translations"}
  static get currency() {return "currency"}
  static get officialLanguage() {return "officialLanguage"}
  static get portraitImage() {return "portraitImage"}
  static get landscapeImage() {return "landscapeImage"}
}
class StateIncludeEntity {
  static get translation() {return "translation"}
  static get translations() {return "translations"}
}
class CityIncludeEntity {
  static get translation() {return "translation"}
  static get translations() {return "translations"}
  static get portraitImage() {return "portraitImage"}
  static get landscapeImage() {return "landscapeImage"}
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
