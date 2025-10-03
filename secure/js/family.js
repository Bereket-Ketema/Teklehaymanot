window.onload = fetchAllFamilies;

function fetchAllFamilies() {
  fetch("/families")
    .then(res => {
      if (!res.ok) throw new Error("⚠️ የቤተሰቦች ዝርዝር ማግኘት አልተቻለም።");
      return res.json();
    })
    .then(families => {
      const container = document.getElementById("familiesContainer");
      container.innerHTML = "";

      if (families.length === 0) {
        container.innerHTML = "<p>❌ ምንም ቤተሰቦች አልተመዘገቡም።</p>";
        return;
      }

      families.forEach(family => {
        fetch(`/family/${family.id}/members`)
          .then(res => res.json())
          .then(members => {
            const block = document.createElement("div");
            block.className = "family-block";

            // Owner name
            block.innerHTML = `<div class="family-owner">👤 ቤተሰብ ባለቤት፡ ${family["ስም"]}</div>`;

            // Table
            if (members.length === 0) {
              block.innerHTML += "<p>❌ አባላት አልተገኙም።</p>";
            } else {
              const table = document.createElement("table");
              table.innerHTML = `
                <thead>
                  <tr>
                    <th>ስም</th>
                    <th>የአባት ስም</th>
                    <th>የእናት ስም</th>
                    <th>የክርስትና ስም</th>
                    <th>ግንኙነት</th>
                    <th>ፆታ</th>
                    <th>ቀን ልደት</th>
                    <th>እድሜ</th>
                    <th>የተመዘገበበት ቀን</th>
                  </tr>
                </thead>
                <tbody>
                  ${members.map(m => `
                    <tr>
                      <td>${m.name}</td>
                      <td>${m.father_name || '-'}</td>
                      <td>${m.mother_name || '-'}</td>
                      <td>${m.christian_name || '-'}</td>
                      <td>${m.relation}</td>
                      <td>${m.gender}</td>
                      <td>${m.birth_date || '-'}</td>
                      <td>${m.age || '-'}</td>
                      <td>${m.registered_date}</td>
                    </tr>
                  `).join('')}
                </tbody>
              `;
              block.appendChild(table);
            }

            container.appendChild(block);
          })
          .catch(err => console.error("🚨 Error fetching members:", err));
      });
    })
    .catch(err => {
      console.error("🚨 Error fetching families:", err);
      alert("⚠️ የቤተሰብ ዝርዝር ማግኘት አልተቻለም።");
    });
}

function logout() {
  window.location.href = "/admin";
}
