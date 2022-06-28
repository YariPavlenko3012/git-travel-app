export default class Select {
    static optionsByRow (data, value, label) {
        return data.map( item => ({
            label: label.split('.').reduce((accum, prev) => accum[prev], item),
            value: value.split('.').reduce((accum, prev) => accum[prev], item)
        }))
    }
}

