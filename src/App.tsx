import { Icon } from 'leaflet';
import './App.css';
import './leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState, TouchEvent } from 'react';
import {isMobileOS} from './commonUtils';

function App() {

  const [images, setImages] = useState<any[]>([]);
  const [open, setOpen] = useState<Boolean>(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [imageSource, setImageSource] = useState<string>('');
  const [imageCaption, setImageCaption] = useState<string>('');
  const [imagePosition, setImagePosition] = useState<string>('');
  const [currentIndexOfPhoto, setCurrentIndexOfPhoto] = useState<number>(0);

  function handleTouchStart(touchEvent: TouchEvent<HTMLDivElement>) {
      setTouchStart(touchEvent.targetTouches[0].clientX);
  }

  function handleTouchMove(touchEvent: TouchEvent<HTMLDivElement>) {
      setTouchEnd(touchEvent.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
      if (touchStart - touchEnd > 150) {
          // do your stuff here for left swipe
          // nextImage();
      }

      if (touchStart - touchEnd < -150) {
          // do your stuff here for right swipe
          // previousImage();
      }
  }

  const photoClicked = (photoIndex: number) => {
    if(photoIndex >= 0){
      setImageSource(images[photoIndex].imageLink);
      setImageCaption(images[photoIndex].title);
      setImagePosition(images[photoIndex].dataPosition);
      setCurrentIndexOfPhoto(photoIndex);  
      setOpen(true);
    }
  }

  const toggle = () => {
    setOpen(!open);
	}

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
    <div>
      <div id="map">
        <MapContainer center={isMobileOS() ? [0, -86.23992182162134] : [0, 0]} zoom={isMobileOS() ? 2 : 3} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {images.map((photo: any, index: number) => 
              <Marker position={photo.latlong} icon={customIcon} key={index}>
              <Popup>
                  <img src={photo.thumbnailLink} alt={photo.title} className="popUpImage" onClick={() => photoClicked(index)}/>
              </Popup>
            </Marker>
            )} 
        </MapContainer>      
      </div>
      <div className={open ? "fullScreenModal fullScreen" : "fullScreenModal"} style={{ backgroundImage: `url(${imageSource})` }}>
        <span className={open ? "close fullScreen" : "close"} onClick={toggle}>&times;</span>
        <div className={open ? "caption fullScreen" : "caption"}>{imageCaption}</div>
      </div>
    </div>
  );
}

export default App;
