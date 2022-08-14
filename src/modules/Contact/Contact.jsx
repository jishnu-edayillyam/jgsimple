import React, { useState } from "react";
import Email from "../../components/Email/Email";
import "./style.scss";

const Contact = () => {
  const [displayEmailModal, setDisplayEmailModal] = useState(false);
  // const [isContentLoading, setIsContentLoading] = useState(true);
  // const [isLoadingEndAnimation, setIsLoadingEndAnimation] = useState(false);

  return (
    <>
      {displayEmailModal && (
        <Email closeEmailModal={() => setDisplayEmailModal(false)} />
      )}
      <div className="contact-page">
        <div className="text-contents">
          <h1>CONTACT US</h1>
          <section className="email-social-media-container">
            <button
              type="button"
              className="email-button"
              onClick={() => setDisplayEmailModal(true)}
            >
              <img src="email_logo.svg" alt="email-logo" />
              EMAIL US
            </button>
            <div className="social-media">
              <button type="button">
                <img
                  src="instagram_logo.svg"
                  alt="instagram_logo"
                  className="social-media-icon"
                />
              </button>
              <button type="button">
                <img
                  src="facebook_logo.svg"
                  alt="facebook_logo"
                  className="social-media-icon"
                />
              </button>
            </div>
          </section>
        </div>
        <div className="location-map">
          Map Loading...
          <iframe
            title="JG Architects office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d973.9253029131024!2d75.0680768291936!3d12.469607999449169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDI4JzEwLjYiTiA3NcKwMDQnMDcuMSJF!5e0!3m2!1sen!2sin!4v1632578708554!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
        {/* <footer>Developed by Jishnu Edayillyam</footer> */}
      </div>
    </>
  );
};

export default Contact;
