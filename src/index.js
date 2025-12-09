import { validateIp, newUtc, getAddress, getClientAddress, addOffset } from './helpers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = new URL('../images/icon-location.svg', import.meta.url).href;

const ipInput = document.querySelector('.input');
const btn = document.querySelector('.button');

const ipInfo = document.getElementById('ip');
const locationInfo = document.getElementById('location');
const timezoneInfo = document.getElementById('timezone');
const ispInfo = document.getElementById('isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
    iconAnchor: [15, 40]
});

const mapArea = document.querySelector('.map__container');
const map = L.map(mapArea);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: ''
}).addTo(map);
const marker = L.marker([0, 0], { icon: markerIcon }).addTo(map);

function getData() {
    if (validateIp(ipInput.value)) {
        getAddress(ipInput.value)
            .then(setInfo);
    }
}

function handleKey(event) {
    if (event.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    const { country, city, longitude, latitude } = mapData.location;

    ipInfo.innerText = mapData.ip_address;
    locationInfo.innerText = country + ' ' + city;
    timezoneInfo.innerText = newUtc(mapData.timezone.utc_offset);
    ispInfo.innerText = mapData.asn.name;

    map.setView([latitude, longitude], 13);
    marker.setLatLng([latitude, longitude]);
    if (matchMedia('(max-width: 1023px)').matches) {
        addOffset(map);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getClientAddress().then(setInfo);
});