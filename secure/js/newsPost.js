  // Prevent back navigation after logout
    window.addEventListener("pageshow", function (event) {
      if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
          window.location.href = "../admin.html";
        }
      }
    });

document.getElementById('newsForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const res = await fetch('/news', {
      method: 'POST',
      body: formData
    });

    const message = await res.text();
    alert(message);

    if (res.ok) {
      form.reset();
    }
  } catch (err) {
    alert('🚨 Error occurred while posting the news.');
  }
});
