// export default class ApiSightQueryBuilder {
//     static countryInclude(object) {
//         return {
//             include: {
//                 city: {
//                     include: {
//                         state: {
//                             include: {
//                                 country: {
//                                     object
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     static stateInclude(object) {
//         return {
//             include: {
//                 city: {
//                     include: {
//                         state: {
//                             object
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     static cityInclude(object) {
//         return {
//             include: {
//                 city: {
//                     object
//                 }
//             }
//         }
//     }
//     static sightIcnlude(object) {
//         return {
//             include: {
//                 object
//             }
//         }
//     }
//     static cityRelation(object) {
//         return {
//             relation: {
//                 city: {
//                     object
//                 }
//             }
//         }
//     }
// }
//
// class CountryIncludeQueryBuilderEnums {
//   static get translate() {return "translate"}
//   static get current() {return "current"}
//   static get oficialLanguage() {return "oficialLanguage"}
// }
// class CityIncludeQueryBuilderEnums {
//   static get translate() {return "translate"}
//   static get current() {return "current"}
//   static get oficialLanguage() {return "oficialLanguage"}
// }
// class SightIncludeQueryBuilderEnums {
//   static get translate() {return "translate"}
//   static get current() {return "current"}
//   static get oficialLanguage() {return "oficialLanguage"}
// }
//
// class EqQueryBuilder {
//     constructor(obj) {
//         this.equal = obj;
//     }
// }
// class NotNullQueryBuilder {
//
// }
// class isNullQueryBuilder {
//
// }
//
//
// function Filter(...argument) {
//     return merge(argument)
// }
//
// new Filter({
//     ApiSightQueryBuilder.countryInclude([CountryIncludeQueryBuilderEnums.translate, CountryIncludeQueryBuilderEnums.oficialLanguage]),
//     ApiSightQueryBuilder.stateInclude([CountryIncludeQueryBuilderEnums.translate]),
// })
//

