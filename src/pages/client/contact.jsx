import React from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  }
  return (
    <div id="contact" className="w-full bg-white py-16 px-4">
      <div className="mx-auto grid md:grid-cols-2 max-w-[1240px] gap-10 items-center justify-center">
        <div className="bg-blue-500 w-auto h-full rounded-2xl overflow-hidden">
          <iframe
            title="Male Maldives Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.70186414944172!2d73.50889804099003!3d4.1751709337685075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b3f7e5607d1f5e5%3A0x8ad8e99b5a051299!2zTWFsw6ksIE1hbGRpdmVz!5e0!3m2!1sen!2slk!4v1756233140602!5m2!1sen!2slk%22%20width=%22600%22%20height=%22450%22%20style=%22border:0;%22%20allowfullscreen=%22%22%20loading=%22lazy%22%20referrerpolicy=%22no-referrer-when-downgrade"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="bg-white w-full border border-gray-200 shadow-sm rounded-2xl p-8 space-y-6">
          {/* Heading */}
          <div>
            <h1 className="text-blue-500 text-3xl font-semibold">
              Get in touch
            </h1>
            <p className="text-gray-600 mt-2">
              We are here for you! How can we help you?
            </p>
          </div>

          {/* Input fields */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-white/70 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-200"
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white/70 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-200"
              required
            />

            <textarea
              placeholder="Message"
              rows={4}
              className="w-full bg-white/70 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-200 resize-none"
              required={true}
            />
          </div>

          {/* Button */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg py-3 text-white font-medium shadow-md" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
