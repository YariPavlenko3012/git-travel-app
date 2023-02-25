export default class Select {
    static optionsByRow (data, value, label) {
        console.log(data)

        return data.map( item => ({
            label: label.split('.').reduce((accum, prev) => accum[prev], item),
            value: value.split('.').reduce((accum, prev) => accum[prev], item)
        }))
    }
}

