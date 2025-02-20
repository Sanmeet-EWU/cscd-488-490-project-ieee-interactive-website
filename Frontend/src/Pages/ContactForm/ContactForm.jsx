import React, { useState } from "react";
import "./ContactForm.css";
import { FaUser, FaEnvelope, FaPhone, FaComment } from "react-icons/fa";
import Spokane from "../../Assets/Spokane.jpeg";
import request from "../../api/axiosConfig";

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
      request("post", "/send-email", {
        email: formData.email,
        subject: `Message from ${formData.name}`,
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nMessage: ${formData.message}`,
      });

      // Handle successful response
      setResponseMessage("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      // Handle error
      setResponseMessage(
        "There was an error sending your message. Please try again later.",
      );
      console.error("Error sending email:", error);
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
            <div className="response-message">
              <p>{responseMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
