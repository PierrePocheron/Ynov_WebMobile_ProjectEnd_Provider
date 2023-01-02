import { ProviderId } from 'firebase/auth';
import { collection, addDoc, updateDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../main';


const MyAppointmentMapsPage = () => {

  const navigate = useNavigate();
  const currentProvider = auth.currentUser
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [listAppointment, setListAppointment] = useState<any[]>();


  useEffect(() => {
    if (!auth.currentUser){
      navigate("/login")
    }

    const fetchData = async () => {
      const qAppointment = query(collection(db, 'appointments'),
                where('provider', '==', currentProvider?.uid),
                where('status', '==', 'WAITING_CONFIRMATION')
                );
      const getAppointments = await getDocs(qAppointment)

      const listAppointmentsTemp = await Promise.all(
        getAppointments.docs.map( async (appointment) => {

          var appointmentData = appointment.data()
          console.log(appointmentData.patient)

          const qPatient = query(collection(db, 'users'), where('uid', '==', appointmentData.patient));
          const getPatient = await getDocs(qPatient)

          var patientData = getPatient.docs.at(0)?.data()

          return ({
            id: appointment.id,
            data: appointmentData,
            patient: patientData,
          })
        })
      )
      setListAppointment(listAppointmentsTemp)
    }
    fetchData();
  }, [])


  const handleClickChooseTimeAppointment = async (event:any, appointmentId:string) => {
    const appointmentRef = doc(db, "appointments", appointmentId);

    const data = {
      time: appointmentTime,
      status: 'CONFIRMED'
    };

    updateDoc(appointmentRef, data)
    .then(docRef => {
        console.log("Time set for appointment");
    })
    .catch(error => {
        console.log(error);
    })
  }

  const handleChangeTime = (event: any) => {
    setAppointmentTime(event.currentTarget.value)
  }

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
