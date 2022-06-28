export class QueryString {
    static stringify(obj, prefix) {
        const self = QueryString;
        const str = [];
        for (const p in obj) {
            if(obj.hasOwnProperty(p)) {
                const k = prefix ? prefix : p;
                const v = obj[p];
                str.push(
                    v !== null && typeof v === 'object'
                        ? self.stringify(v, k)
                        : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
                );
            }
        }
        return str.join('&');
    }

    static parseQueryString(queryString) {
        let cleanString = queryString.slice(1)
        if(typeof cleanString != "string" || !cleanString.length) return {};
        const s = cleanString.split("&");
        const s_length = s.length;
        let bit, query = {}, first, second;
        for (let i = 0; i < s_length; i++) {
            bit = s[i].split("=");
            first = decodeURIComponent(bit[0]);
            if(first.length == 0) continue;
            second = decodeURIComponent(bit[1]);
            if(typeof query[first] == "undefined") query[first] = second;
            else if(query[first] instanceof Array) query[first].push(second);
            else query[first] = [query[first], second];
        }
        return query;
    }
}
