import React, { useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import PropTypes from "prop-types";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import "./style.scss";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_USER_ID,
} from "../../constants";

const Email = ({ closeEmailModal }) => {
  const form = useRef();
  const modalRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_USER_ID
      )
      .then(
        () => {
          form.current.reset();
        },
        () => {
          form.current.reset();
        }
      );
  };

  useEffect(() => {
    disableBodyScroll(modalRef.current, { reserveScrollBarGap: true });
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <>
      <button type="button" className="close-button" onClick={closeEmailModal}>
        <div />
        <div />
      </button>
      <div className="email-modal" ref={modalRef}>
        <form ref={form} onSubmit={sendEmail} className="email-form">
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              required
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email ID"
              required
            />
          </label>
          <label htmlFor="message">
            Message
            <textarea
              name="message"
              id="message"
              cols="100"
              placeholder="Write your message here..."
            />
          </label>
          <input type="submit" value="SEND" />
        </form>
      </div>
    </>
  );
};

Email.propTypes = {
  closeEmailModal: PropTypes.func.isRequired,
};

export default Email;
