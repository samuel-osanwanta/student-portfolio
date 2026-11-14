// Contact form validation
const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");
const fields = ["name", "email", "phone", "message"];

function setError(id, msg) {
  document.getElementById(id + "-error").textContent = msg;
  document.getElementById(id).classList.toggle("invalid", msg !== "");
}

function validate() {
  let valid = true;
  const values = {};
  fields.forEach(function (id) {
    values[id] = document.getElementById(id).value.trim();
    setError(id, "");
  });

  if (values.name === "") { setError("name", "Enter your name."); valid = false; }

  if (values.email === "") {
    setError("email", "Enter your email address."); valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    setError("email", "Enter a valid email, like name@example.com."); valid = false;
  }

  if (values.phone === "") {
    setError("phone", "Enter your phone number."); valid = false;
  } else if (!/^\d+$/.test(values.phone)) {
    setError("phone", "Use digits only, with no spaces, dashes or plus sign."); valid = false;
  }

  if (values.message === "") { setError("message", "Enter your message."); valid = false; }

  return { valid: valid, values: values };
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  success.textContent = "";
  const result = validate();
  if (result.valid) {
    success.textContent = "Thanks, " + result.values.name + ". Your message passed every check.";
    form.reset();
  } else {
    const firstBad = form.querySelector(".invalid");
    if (firstBad) firstBad.focus();
  }
});

fields.forEach(function (id) {
  document.getElementById(id).addEventListener("input", function () { setError(id, ""); });
});
