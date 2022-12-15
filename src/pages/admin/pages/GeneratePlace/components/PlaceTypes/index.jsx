/**
 * external libs
 */
import React, {useEffect, useRef, useState} from 'react';
/**
 * styles
 */
import styles from "./index.module.scss";
/**
 * utils
 */
import PlaceTypeTranslate from "../../../../../../utils/PlaceTypeTranslate";

export default function Park({setPlaceTypes, placeTypes, places}) {
    return (
        <div className={styles.typeWrapper}>
            {places.map( type => (
                <div className={`${styles.typeWrapper__type} ${placeTypes === type && styles.active}`} onClick={() => setPlaceTypes(type)}>
                    {PlaceTypeTranslate.getTranslateForType(type)}
                </div>
            ))}
        </div>
    )
}
