
    // Prevent back navigation after logout
    window.addEventListener("pageshow", function (event) {
      if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
          window.location.href = "../admin.html";
        }
      }
    });

    // Fetch data from backend
    fetch('/api/death')
      .then(res => res.json())
      .then(data => {
        const tbody = document.getElementById('peopleBody');
        data.forEach(person => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${person.ስም}</td>
            <td>${person.የአባት_ስም}</td>
            <td>${person.የአያት_ስም}</td>
            <td>${person.የእናት_ስም}</td>
            <td>${person.የክርስትና_ስም}</td>
            <td>${person.የባለቤት_ስም}</td>
            <td>${person.ልጆች_ብዛት}</td>
            <td>${person.እድሜ}</td>
            <td>${person.ፆታ}</td>
            <td>${person.ንሰሃ_አሎት}</td>
            <td>${person.ንሰሃ_አባት}</td>
            <td>${person.የቤት_ቁጥር}</td>
            <td>${person.ቀጠና}</td>
            <td>${person.የትምህርት_ደረጃ}</td>
            <td>${person.ሙያ}</td>
            <td>${person.ስልክ_ቁጥር}</td>
            <td><button onclick="deletePerson(${person.id})">🗑️</button></td>
          `;
          tbody.appendChild(tr);
        });
      });

    function deletePerson(id) {
      if (confirm("እርግጠኛ ነህ እንደምታስወግድ?")) {
        fetch(`/api/death/${id}`, { method: 'DELETE' })
          .then(() => location.reload());
      }
    }
