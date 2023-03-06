// import merge from 'deepmerge'
//
// import {StateInclude, CityInclude, CountryInclude} from "./Sight/Include";
// import {StateRelation, CityRelation, CountryRelation} from "./Sight/Relation";
// import {CityIncludeEntity, StateIncludeEntity, CountryIncludeEntity} from "./IncludeEntity";
// import {Equal, Filter, In, IsRelation, NotNull} from "./Filters";
//
// const filter = new Filter(
//     new NotNull('capital_id'),
//     new CountryInclude(CountryIncludeEntity.translation, CountryIncludeEntity.officialLanguage),
//     new CountryRelation(CountryIncludeEntity.translation, CountryIncludeEntity.officialLanguage),
// );
//
//
//
//
// const values  = {
//     country_id: 1,
//     state_id: 1,
//     piopulation: {
//         min: 1,
//         max: 100
//     }
// }
//
// const filterNew = {
//     new CountryInclude(new Eq("countri", values.country_id), new Range(piopulation.min)),
//     new CountryInclude(new Eq("countri", values.country_id), new Range(piopulation.min)),
//     new CountryInclude(new Eq("countri", values.country_id), new Range(piopulation.min)),
//     new CountryInclude(new Eq("countri", values.country_id), new Range(piopulation.min)),
//     new CountryInclude(new Eq("countri", values.country_id), new Range(piopulation.min)),
//     new CountryInclude(new Eq("countri", values.country_id), new Range(piopulation.min)),
//     new CountryInclude(new Eq("countri", values.country_id), new Range(piopulation.min)),
// }
//
//
//
// filter.addNew(values)
//
// console.log(filter, "filter")
//
// // export default filter
export default {}
