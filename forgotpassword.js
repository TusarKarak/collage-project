console.log("forgotpassword");
function sendOTP() {
  const email = document.getElementById("email").value;

  fetch("http://localhost:5000/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("message").innerText = data;
    if (data === "OTP sent") {
      document.getElementById("step1").style.display = "none";
      document.getElementById("step2").style.display = "block";
    }
  });
}

function resetPassword() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;
  const newPassword = document.getElementById("newPassword").value;

  fetch("http://localhost:5000/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword })
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("message").innerText = data;
   window.location.replace(localStorage.getItem('path'))
   localStorage.removeItem('path')
  });
}
