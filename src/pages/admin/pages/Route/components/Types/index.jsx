/**
 * external libs
 */
import React, {useContext} from 'react';
/**
 * styles
 */
import styles from "./index.module.scss";
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../../../utils/PlaceTypeTranslate";
/**
 * context
 */
import {DictionaryContext} from "../../../../../context/dictionary.context";

export default function GoogleTypes({setPlaceTypes, placeTypes}) {
    const {dictionary} = useContext(DictionaryContext)

    return (
        <div className={styles.typeWrapper}>
            {dictionary.place_types.google_list.map( type => (
                <div className={`${styles.typeWrapper__type} ${placeTypes.includes(type) && styles.active}`} onClick={() => setPlaceTypes(type)}>
                    {PlaceTypeTranslate.getTranslateForType(type)}
                </div>
            ))}
        </div>
    )
}
