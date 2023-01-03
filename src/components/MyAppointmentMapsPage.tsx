import { ProviderId } from 'firebase/auth';
import { collection, addDoc, updateDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../main';
import { Map, MapLayerMouseEvent, Marker, Popup } from 'react-map-gl';

type Coords = {
  latitude: number,
  longitude: number,
}

const MyAppointmentMapsPage = () => {

  const navigate = useNavigate();
  const currentProvider = auth.currentUser
  const [marker, setMarker] = useState<Coords | undefined>(undefined);
  const apiKey = import.meta.env.VITE_MAPBOXGL_API_KEY

  const handleClickOnMap = (event: MapLayerMouseEvent) => {
    setMarker({
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng,
    })
  }

  const isMarkerSet = (): boolean => {
    console.log('AH');
    console.log(marker);
    return marker !== undefined;
  }

  useEffect(() => {
    if (!currentProvider){
      navigate("/login")
    }
  }, [])


  const handleClickButtonMyAppointment = (event: any) => {
    navigate("/my-appointment");
  }


  return (
    <div>
    <Map
      initialViewState={{
        latitude: 45.75,
        longitude: 4.85,
        zoom: 11
      }}
      mapboxAccessToken={apiKey}
      style={{width: '70vw', height: '70vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onClick={handleClickOnMap}
    >
      <Marker
          latitude={44.69580}
          longitude={5.19775}
          color="#0000FF"
        >
        </Marker>
        <Marker
          latitude={45.68}
          longitude={4.88}
          color="#0000FF"
        >
        </Marker>

      {isMarkerSet() &&
          <Marker longitude={marker?.longitude} latitude={marker?.latitude} anchor="bottom" >

          </Marker>
      }

    </Map>
    </div>

  )

}
export default MyAppointmentMapsPage;
