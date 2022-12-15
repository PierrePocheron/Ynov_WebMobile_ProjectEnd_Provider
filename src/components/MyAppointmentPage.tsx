import { ProviderId } from 'firebase/auth';
import { collection, addDoc, updateDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../main';


const MyAppointmentPage = () => {

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


  return (
  <main className="main">
    <div className=''>
      <section className="wrapper">
        <div className="form">
          <h1 className="text text-large">My appointment 🚗</h1>
        </div>
      </section>
    </div>

    <button className="input-submit" onClick={(event:any) => setAppointmentTime('12')}>
              Refresh
          </button>

    <section className="grid-container">
      <p><i>Confirm time for appointments :</i></p>
      {listAppointment?.map(appointment =>
        <div className="wrapper">
          <div className="form">
          <h5 className=""><i>Appointment informations</i></h5>
          <span className="text-left">
            Date : <b><i>{appointment.data.date}</i></b>
            <br/>
            <br/>
            Patient 😷 : {appointment.patient.lastname} {appointment.patient.firstname}
            <br/>
            Address : {appointment.patient.address}
            <br/><br/>
          </span>

          {/* Choose time */}
          <div className="input-control">
            <label htmlFor="appointmentTime" hidden>Appointment Time</label>
            <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            className="input-field"
            style={{width:'auto'}}
            onChange={handleChangeTime}>
            </input>
          </div>
          <button className="input-submit" onClick={(event:any) => handleClickChooseTimeAppointment(event, appointment.id)}>
              Choose time
          </button>

        </div>
      </div>
      )}
    </section>
  </main>
  )

}
export default MyAppointmentPage;
