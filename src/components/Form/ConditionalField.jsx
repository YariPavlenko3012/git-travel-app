import {useEffect} from 'react';

export default function ConditionalField({ children, checkValue, name, resetValue }) {
    useEffect(() => {
        resetValue(name)
    }, [checkValue]);

    return checkValue ? children : null;
}
