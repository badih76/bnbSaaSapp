"use client"

import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useCountries } from '@/data/getWorldCountries'
import { icon, LatLngExpression } from 'leaflet'

const ICON = icon({
    iconUrl: 'https://static.vecteezy.com/system/resources/thumbnails/021/563/516/small_2x/3d-icon-realistic-style-red-glossy-location-map-pin-gps-pointer-markers-illustration-for-destination-geo-tag-isolated-transparent-background-png.png',
    // 'https://static.vecteezy.com/system/resources/thumbnails/027/687/964/small_2x/red-location-marker-icon-on-transparent-background-free-png.png',
    iconSize: [45, 50]
})

interface IParams {
    country: string,
    lon: number | null,
    lat: number | null,
    zoom: number | null
}

function Map({ country, lon = null, lat = null, zoom = null }: IParams) {
    const { getCountryByValue } = useCountries();
    const defCoords = getCountryByValue(country && country !== "" ? country : "OM");
    const [ markerLocation ] = useState<LatLngExpression>(
        [ 
            lat === null ? defCoords!.latLang[0]! : lat, 
            lon === null ? defCoords!.latLang[1]! : lon
        ]); 

  return (
    <MapContainer scrollWheelZoom={false}
        className='h-[50vh] rounded-lg relative z-0'
        center={markerLocation ?? [52.505, -0.09]}
        zoom={zoom ?? 18}>
        <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={markerLocation ?? [52.505, -0.09]}
            icon={ICON}/>
    </MapContainer>
  )
}

export default Map