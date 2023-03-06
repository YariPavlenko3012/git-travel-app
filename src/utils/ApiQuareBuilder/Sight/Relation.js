import merge from "deepmerge";
import {IsRelation} from "../Filters";

class CountryRelation {
    constructor(...relationParams) {
        return new IsRelation(
            'city',
            [],
            [
                new IsRelation(
                    'state',
                    [],
                   [
                       new IsRelation(
                           'country',
                           relationParams,
                       )
                   ]
                )
            ]
        )
    }
}

class StateRelation {
    constructor(...relationParams) {
        return new IsRelation(
            'city',
            [],
            [
                new IsRelation(
                    'state',
                    relationParams,
                )
            ]
        )
    }
}

class CityRelation {
    constructor(...relationParams) {
        return new IsRelation(
            'city',
            relationParams,
        )
    }
}

export {
    CountryRelation,
    StateRelation,
    CityRelation,
}
