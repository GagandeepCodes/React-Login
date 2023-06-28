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
                <label htmlFor="username" className="usertext">
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
                    placeholder="Enter Username"
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

                <label htmlFor="password" className="pwdtext">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>

                <input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />

                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                <label htmlFor="confirm_pwd" className="con_pwdtext">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>

                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>

                <p>
                    Already registered?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <a href="#">Sign In</a>
                    </span>
                    </p>
            </form>
        </section>
    )
  }
