import React, { useState } from "react";

// ContactForm component using Bootstrap classes for styling
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const validationErrors = {};
    if (!form.name.trim()) validationErrors.name = "Please enter your name";
    if (!form.email.trim()) {
      validationErrors.email = "Please enter your email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    ) {
      validationErrors.email = "Please enter a valid email address";
    }
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    console.log("Form submitted:", form);
    alert(`Thank you, ${form.name}! We'll get back to you soon.`);

    setForm({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-50 mx-auto mt-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="yourmail@example.com"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
