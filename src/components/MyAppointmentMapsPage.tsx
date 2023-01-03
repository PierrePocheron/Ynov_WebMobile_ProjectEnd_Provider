import { ProviderId } from 'firebase/auth';
import { collection, addDoc, updateDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../main';
import Map, { MapLayerMouseEvent, Marker } from 'react-map-gl';

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
  <main className="main">
    <section className="wrapper">
      <div className="form">
        <h1 className="text text-large">My appointment Maps🚗</h1>
      </div>
    </section>


    <section className="grid-container">
      <button className="input-warning" onClick={handleClickButtonMyAppointment}>See appointments</button>
    </section>

    <Map
      initialViewState={{
        latitude: 45.75,
        longitude: 4.85,
        zoom: 11
      }}
      mapboxAccessToken={apiKey}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onClick={handleClickOnMap}
    >
      {isMarkerSet() &&
          <Marker longitude={marker?.longitude} latitude={marker?.latitude} anchor="bottom" >

          </Marker>
      }
    </Map>

  </main>
  )

}
export default MyAppointmentMapsPage;
