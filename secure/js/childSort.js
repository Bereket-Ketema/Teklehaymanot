    // Prevent back navigation after logout
    window.addEventListener("pageshow", function (event) {
      if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
          window.location.href = "../admin.html";
        }
      }
    });



function updateValueInput() {
      const field = document.getElementById("fieldSelect").value;
      const container = document.getElementById("valueContainer");
      container.innerHTML = "";

      if (field === "ፆታ") {
        container.innerHTML = `
          <label>ዋጋ:</label>
          <select id="valueInput">
            <option value="ወንድ">ወንድ</option>
            <option value="ሴት">ሴት</option>
          </select>
        `;
      } else {
        container.innerHTML = `
          <label>ዋጋ:</label>
          <input type="text" id="valueInput" placeholder="የሚፈለግ ዋጋ እዚህ">
        `;
      }
    }


    function searchPeople() {
      const field = document.getElementById("fieldSelect").value.trim();
      const value = document.getElementById("valueInput")?.value.trim();

      if (!field || !value) {
        return alert("መስክና ዋጋ ሁለቱንም ያስገቡ");
      }

      fetch(`/api/children/filter?field=${encodeURIComponent(field)}&value=${encodeURIComponent(value)}`)
        .then(res => res.json())
        .then(data => {
          const tbody = document.getElementById("peopleBody");
          tbody.innerHTML = "";

          if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8">ምንም ውጤት አልተገኘም።</td></tr>`;
            return;
          }

          data.forEach(person => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${person.ስም}</td>
            <td>${person.የአባት_ስም}</td>
            <td>${person.የአያት_ስም}</td>
            <td>${person.የእናት_ስም}</td>
            <td>${person.የክርስትና_ስም}</td>
            <td>${person.እድሜ}</td>
            <td>${person.ፆታ}</td>
            <td>${person.ስልክ_ቁጥር}</td>
            <td><button onclick="deletePerson(${person.id})">🗑️</button></td>
            `;
            tbody.appendChild(tr);
          });
        })
        .catch(err => {
          alert("ስህተት ተፈጥሯል።");
          console.error(err);
        });
    }

    

    function deletePerson(id) {
      if (confirm("በእርግጥ ማስወገድ ትፈልጋለህ?")) {
        fetch(`/api/children/${id}`, { method: 'DELETE' })
          .then(() => searchPeople());
      }
    }