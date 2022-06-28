/**
 * external libs
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {ADMIN_COUNTRY_LIST_URI} from "../../../../constants/admin/uri.constant";

export default function HomeScreen() {
    return (
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw"}}>
          <Link to={ADMIN_COUNTRY_LIST_URI} style={{backgroundColor: "blue", color: "white", width: 200, textAlign: "center", fontSize: 22}}>Go Start</Link>
      </div>
    )
}
