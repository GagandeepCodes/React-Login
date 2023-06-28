import React from 'react'
import {useRef , useState,useEffect} from "react";
import {faCheck , faTimes , faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

export default function Register() {
    const userRef = useRef();
    const errRef = useRef();

    //user input field
    const [user,setUser] = useState('');
    const [validName,setValidName] = useState(false);
    const [userFocus,setUserFocus] = useState(false);

    //password input field
    const [pwd,setPwd] = useState('');
    const [validPwd,setValidPwd] = useState(false);
    const [pwdFocus,setPwdFocus] = useState(false);
    
    //match password field
    const [matchPwd,setMatchPwd] = useState('');
    const [validMatch,setValidMatch] = useState(false);
    const [matchFocus,setMatchFocus] = useState(false);

    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState(false);

    //setting the focus when the component loads
    //nothing in the dependency array , therefore it will only happen when the component loads
    useEffect(() => {
        userRef.current.focus();
    },[])

    //Everytime the user changes it will check the validation of the field input
    useEffect(() => {
        const result  = USER_REGEX.test(user);
        console.log(result);
        setValidName(result);
    }, [user]);

    //anytime pwd and matchpwd changes it will run again to check the validation
    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        setValidPwd(result);
        const match = pwd === matchPwd;
        console.log(match);
        setValidMatch(match);
    },[pwd,matchPwd]);
    
    //clear out the error message if user changes any of the field
    //if the error message is diplayed on the screen
    useEffect(()=>{
        setErrMsg('');
    },[user,pwd,matchPwd]);


    return (
        <section>
            <p ref = {errRef} className= {errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>
                {errMsg}
            </p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user 
                &&!validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 24 characters. <br />
                    Must begin with a letter. <br />
                    letters, numbers, underscores, hyphens allowed.
                </p>

            </form>
        </section>
    )
  }
