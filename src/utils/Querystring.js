import qs from 'qs'


export class QueryString {
    static stringify(obj) {
        return qs.stringify(obj, { encode: false })
    }
    
    static parseQueryString(queryString) {
        return qs.parse(queryString.slice(1))
    }
}
