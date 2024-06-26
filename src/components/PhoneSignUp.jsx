import React, { useState } from "react";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-input-2";
import OTPInput from "otp-input-react";
import "react-phone-input-2/lib/style.css";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firbase";

import "../styles/PhoneSignUp.css";

const PhoneSignUp = () => {
  const [value, setValue] = useState("");
  const [otp, setOTP] = useState("");
  const [showOTP, setShowOTP] = useState(true);
  const [showVerify, setShowVerify] = useState(false);
  const [conff, setConff] = useState("");

  function setUpRecaptcha(value) {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {}
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, value, recaptchaVerifier);
  }

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(value);

    try {
      const res = await setUpRecaptcha(value);
      console.log(res);
      setConff(res);
      setShowOTP(false);
    } catch (error) {
      console.log(error);
      setShowOTP(false);
    }
  };

  const varifyOtp = async (e) => {
    e.preventDefault();
    try {
      await conff.confirm(otp);
      setShowVerify(true);
    } catch (error) {
      console.log(error);
      setShowVerify(false);
    }
  };

  const onchangeOtp = (e) => {
    setOTP(e.target.value);
  };
  return (
    <div className="phone-input-container">
      {showOTP ? (
        <form className="form-container" onSubmit={getOtp}>
          <h1 className="heading">Loging with Phone Number</h1>
          <div className="phone-label-container">
            <label htmlFor="phone" className="lable">
              Phone Number
            </label>
            <PhoneInput
              id="phone"
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
              country={"in"}
              autoFocus="on"
              inputStyle={{
                background: "transparent",
                border: "none",
                color: "#0ef",
                fontSize: "20px",
                width: "100%",
                height: "100%",
              }}
              dropdownStyle={{ color: "#000", background: "#0ef" }}
              className="phone-input"
            />
            <div id="recaptcha-container" />
          </div>
          <button type="submit" className="submit-btn">
            Get OTP
          </button>
        </form>
      ) : (
        <form className="form-container" onSubmit={varifyOtp}>
          <div className="varity-container">
            <label htmlFor="otp" className="lable">
              Varify OTP
            </label>
            <OTPInput
              value={otp}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              // secure
            />
            {/* <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={onchangeOtp}
              className="phone-input"
            /> */}
          </div>
          <button type="submit" className="submit-btn">
            Varify Otp
          </button>
        </form>
      )}
      {showVerify ? (
        <div>
          <p className="veriy-page">☠️☠️ verifycaation success ☠️☠️</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PhoneSignUp;
