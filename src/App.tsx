import { Icon } from 'leaflet';
import './App.css';
import './leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import {isMobileOS} from './commonUtils';

function App() {

  const [images, setImages] = useState<any[]>([]);

  const getPhotos=()=>{

    fetch('https://raw.githubusercontent.com/pakalapati/data/main/WebsiteData.json')
    .then((response) => response.json())
    .then((responseJson) => {
        setImages(responseJson.thumbnails);        
      });

  }

  useEffect(() => {
    getPhotos();
  }, []);

  const customIcon = new Icon({
    iconUrl: "./locationPin.png",
    iconSize: [38, 38]
  });

  return (
    <div id="map">
      <MapContainer center={isMobileOS() ? [0, -86.23992182162134] : [0, 0]} zoom={isMobileOS() ? 2 : 3} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {images.map((photo: any, index: number) => 
            <Marker position={photo.latlong} icon={customIcon} key={index}>
            <Popup>
                <img src={photo.thumbnailLink} alt={photo.title} className="popUpImage"/>
            </Popup>
          </Marker>
          )} 
        
      </MapContainer>
    </div>
  );
}

export default App;
