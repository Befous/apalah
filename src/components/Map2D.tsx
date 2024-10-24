'use client'
import React, { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import 'ol/ol.css'

const Map2D = () => {
    const mapRef = useRef(null)
    useEffect(() => {
        if (mapRef.current) {
            const ol2dMap = new Map({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: fromLonLat([0, 0]),
                    zoom: 2,
                }),
            })
            return () => ol2dMap.setTarget(undefined)
        }
    }, [])

    return (
        <div className="flex justify-center items-center h-screen">
            <div ref={mapRef} className="w-3/4 h-4/5"></div>
        </div>
    )
}

export default Map2D