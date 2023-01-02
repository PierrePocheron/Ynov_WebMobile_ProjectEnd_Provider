import { ProviderId } from 'firebase/auth';
import { collection, addDoc, updateDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../main';


const MyAppointmentMapsPage = () => {

  const navigate = useNavigate();
  const currentProvider = auth.currentUser

  useEffect(() => {
    if (!auth.currentUser){
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
  </main>
  )

}
export default MyAppointmentMapsPage;
