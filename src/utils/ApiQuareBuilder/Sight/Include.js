import {IsInclude} from '../Filters'

class CountryInclude {
    constructor(...includeParams) {
        return new IsInclude(
            'city',
            [],
            [
                new IsInclude(
                    'state',
                    [],
                    [
                        new IsInclude(
                            'country',
                            includeParams
                        )
                    ]
                )
            ]
        )
    }
}

class StateInclude {
    constructor(...includeParams) {
        return new IsInclude(
            'city',
            [],
            [
                new IsInclude(
                    'state',
                    includeParams,
                )
            ]
        )
    }
}

class CityInclude {
    constructor(...includeParams) {
        return new IsInclude(
            'city',
            includeParams,
        )
    }
}

export {
    CountryInclude,
    StateInclude,
    CityInclude,
}
