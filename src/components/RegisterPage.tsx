import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useReducer, useState } from 'react';
import { auth, db } from '../main';
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [professionalIdentifier, setProfessionalIdentifier] = useState<string>("");
  const navigate = useNavigate();


  const handleClickRegister = async () => {
    const userCreate = await createUserWithEmailAndPassword(auth, email, password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })

    if (userCreate){
      const userCreateDoc = await addDoc(collection(db, 'users'), {
        uid: userCreate.user.uid,
        type: "PROVIDER",
        professionalIdentifier: professionalIdentifier
      })
      .catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage)
        console.log(error);
      })

      if (userCreateDoc) {
        navigate("/login");
      }
    }
  }

  const handleChangeEmail = (event: any) => {
    setEmail(event.currentTarget.value)
  }

  const handleChangePassword = (event: any) => {
    setPassword(event.currentTarget.value)
  }

  const handleChangeProfessionalIdentifier = (event: any) => {
    setProfessionalIdentifier(event.currentTarget.value)
  }

  const handleClickButtonLogin = (event: any) => {
    navigate("/login");
  }

  return (
    <main className="main">
      <div className='container'>
        <section className="wrapper">
          <div className="form">
            <h1 className="text text-large">Provider without account ? Register 👀</h1>
            <p className="text text-normal">You have account ?
              <span>
                <a onClick={handleClickButtonLogin} style={{cursor:'pointer'}} className="text text-links">Login</a>
              </span>
            </p>
            <div className="input-control">
              <label htmlFor="username" hidden>Username</label>
              <input
              type="text"
              id="username"
              name="username"
              className="input-field"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Email Address">
              </input>
            </div>

            <div className="input-control">
              <label htmlFor="password" hidden>Password</label>
              <input type="password"
              id="password"
              name="password"
              className="input-field"
              value={password}
              onChange={handleChangePassword}
              placeholder="Password">
              </input>
            </div>

            <div className="input-control">
              <label htmlFor="professionalIdentifier" hidden>Professional identifier</label>
              <input type="professionalIdentifier"
              id="professionalIdentifier"
              name="professionalIdentifier"
              className="input-field"
              value={professionalIdentifier}
              onChange={handleChangeProfessionalIdentifier}
              placeholder="Professional identifier">
              </input>
            </div>

            <button className="input-submit" onClick={handleClickRegister}>Regsiter</button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default RegisterPage;
