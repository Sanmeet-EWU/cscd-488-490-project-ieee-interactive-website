import React, { useState } from "react";
import "./ContactForm.css";
import { FaUser, FaEnvelope, FaPhone, FaComment } from "react-icons/fa";
import Spokane from "../../Assets/Spokane.jpeg";
import axios from "axios";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setResponseMessage("");

    try {
      const response = await axios.post("https://api.web3forms.com/submit", {
        access_key: "1abead61-53e5-41c3-b880-49824781db40",
        ...formData,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to send your message.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error sending your message. Please try again later.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className="contact-page"
      style={{
        backgroundImage: `url(${Spokane})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <FaEnvelope />
              <span>IEEESpokane@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-icon">
                <FaUser />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="input-icon">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="input-icon">
                <FaPhone />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <div className="input-icon textarea-icon">
                <FaComment />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>

          {responseMessage && (
            <div
              className={`response-message ${responseMessage.includes("successfully") ? "success-message" : ""}`}
            >
              <p>{responseMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
