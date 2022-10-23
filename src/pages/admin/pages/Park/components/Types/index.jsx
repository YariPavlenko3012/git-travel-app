/**
 * external libs
 */
import React, {useEffect, useRef, useState} from 'react';
/**
 * styles
 */
import styles from "./index.module.scss";
/**
 * enums
 */
import PlaceTypeEnum from '../../../../../../enums/PlaceType'

export default function Park({setPlaceTypes, placeTypes}) {
    return (
        <div className={styles.typeWrapper}>
            {PlaceTypeEnum.googleTypesList.map( type => (
                <div className={`${styles.typeWrapper__type} ${placeTypes === type && styles.active}`} onClick={() => setPlaceTypes(type)}>
                    {type}
                </div>
            ))}
        </div>
    )
}
