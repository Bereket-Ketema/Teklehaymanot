
    // Prevent back navigation after logout
    window.addEventListener("pageshow", function (event) {
      if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
          window.location.href = "../admin.html";
        }
      }
    });

