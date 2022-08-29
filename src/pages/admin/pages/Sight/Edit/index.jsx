/**
 * external libs
 */
import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
/**
 * components
 */
import SightUpdateForm from '../components/Form/SightUpdate'
import LanguageUpdateForm from '../components/Form/LanguageUpdate'
/**
 * service
 */
import SightService from "../../../../../services/admin/sight.service";
/**
 * constants
 */
import {ADMIN_MAKE_SHOW_SIGHT_URI} from "../../../../../constants/admin/uri.constant";


export default function SightUpdate() {
    const [sight, setSight] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const {sightId} = useParams();

    const getSight = async () => {
        setIsReady(false);
        setSight(await SightService.show(sightId));
        setIsReady(true);
    };

    useEffect(() => {
        getSight()
    }, []);

    if (!isReady) {
        return <div>Loader...</div>
    }

    return (
        <div>
            <div style={{fontSize: 24, fontWeight: 800, marginBottom: 10}}>
                <Link to={ADMIN_MAKE_SHOW_SIGHT_URI(sightId)}> {"<-"} Go to view sight</Link>
            </div>
            <div style={{paddingBottom: 30}}>
                <SightUpdateForm sight={sight} sightId={sightId} getSight={getSight}/>
            </div>
            <div style={{paddingBottom: 30}}>
                <LanguageUpdateForm sightId={sightId} sight={sight} getSight={getSight}/>
            </div>
        </div>
    )
}
