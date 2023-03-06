import merge from "deepmerge";

//Ище по дате которая начинается с value
class DateFrom {
    constructor(value) {
        this.dateFrom = value;
    }
}

//Ище по дате которая заканчивается с value
class DateTo {
    constructor(value) {
        this.dateTo = value;
    }
}

//Ище по полю которое равно велью
class Equal {
    constructor(key, value) {
        this.eq = {
            [key]: value
        };
    }
}

//Ище по полю в котором есть хоть одно из значений валью
class In {
    constructor(key, value) {
        this.in = {
            [key]: value
        };
    }
}

//Ище по полям которое равно нулу
class IsNull {
    constructor(value) {
        this.isNull = value;
    }
}


//Делает фильтрацию по связям
class IsRelation {
    constructor(key, value = [], nestedRelations = []) {
        this.relation = {
            [key]: {
                ...merge.all(value),
                ...nestedRelations.reduce((nestedResult, nestedRelation) => merge.all([nestedResult, nestedRelation]), {})
            },
        };
    }
}

//Подключает связи
class IsInclude {
    constructor(key, value = [], nestedIncludes = []) {
        this.include = {
            [key]: {
                ...value.reduce((results, includeValue) => merge.all([results, {[includeValue]: null}]), {}),
                ...nestedIncludes.reduce((nestedResult, nestedInclude) => merge.all([nestedResult, nestedInclude]), {})
            },
        };
    }
}


//Делает фильтрацию по несуществующим связям
class NoRelation {
    constructor(value) {
        this.noRelation = value;
    }
}

//Ищет по полю которое не равно value
class NotEqual {
    constructor(key, value) {
        this.neq = {
            [key]: value
        };
    }
}

//Ище по полям которое не равно нулу
class NotNull {
    constructor(value) {
        this.notNull = value;
    }
}

class Filter {
    constructor(...filters) {
        return merge.all(filters)
    }



    static addFilters(newFilter){
        this.filters = merge.all(this.filters, newFilter)
    }
}


export {
    DateFrom,
    DateTo,
    Equal,
    In,
    IsNull,
    IsInclude,
    IsRelation,
    NoRelation,
    NotEqual,
    NotNull,
    Filter,
}
