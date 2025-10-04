
    // Prevent back navigation after logout
    window.addEventListener("pageshow", function (event) {
      if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
          window.location.href = "/adming.html";
        }
      }
    });

document.getElementById('uploadForm').onsubmit = async function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
      const text = await res.text();
      alert(text);
      this.reset();
    };
