import { useRef, useState } from "react";
import Header from "./Header";
import { validateFormData } from "../utils/validateFormData";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {BACKGROUND_IMAGE, PROFILE_ICON} from "../utils/constant"

const Login = () => {
    const dispatch =useDispatch()

    const email=useRef("null");
    const name=useRef("null");
    const password=useRef("null");



    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errormessage,setErrorMessage]=useState(null)


    const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  
     };

     const submitFormData=()=>{
         const message = validateFormData (email.current.value,password.current.value);
        //  console.log(message);
        setErrorMessage(message)
       
        // console.log(email.current.value);
        // console.log(password.current.value);
        if(message) return;

        if(!isSignInForm)
        {
          // sign up form
          createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value, photoURL: PROFILE_ICON
            }).then(() => {
              const {uid,email,displayName,photoURL} = auth.currentUser;
              dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
              // Profile updated!
            }).catch((error) => {
              // An error occurred
              setErrorMessage(error.message)
            });
            

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+"-"+errorMessage);
          });
        
        }
        else
        {
          signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+"-"+errorMessage);
          });
          // sign in form
        }




     }




  return (
    <div>
      <Header />
      <div className="absolute w-screen">
        <img className="h-screen object-cover md:w-screen fixed"
          src={BACKGROUND_IMAGE}
          alt="Backgrond Logo"
        />
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="absolute p-12 bg-black top-40 mx-auto w-full md:w-3/12 text-white left-0 right-0 rounded-md bg-opacity-75">
        <h1 className="font-bold text-2xl my-3">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && <input
        ref={name}
          type="text"
          placeholder="Full Name"
          className="w-full my-4 p-3 rounded-md  bg-gray-500 placeholder:text-white outline-none text-md"
        />}
        <input
        ref={email}
          type="text"
          placeholder="Email Address"
          className="w-full my-4 p-3 rounded-md  bg-gray-500 placeholder:text-white outline-none text-md"
        />
        <input
        ref={password}
          type="password"
          placeholder="Password"
          className="w-full my-4 p-3 rounded-md bg-gray-500 placeholder:text-white outline-none text-md"
        />
        <p className="font-bold text-red-600 text-sm">{errormessage}</p>
        <button className="w-full bg-red-600 p-3 my-4 rounded-md" onClick={submitFormData}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignIn}>
          
          {isSignInForm
            ? "New to Netflix? Sign Up now"
            : "Already Registered? Sign In now"}{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
