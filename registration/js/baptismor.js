function submitForm() {
  console.log("👉 Submit button clicked!");

  const formContainer = document.getElementById('formContainer');
  const confirmationSection = document.getElementById('confirmationSection');

  const inputs = formContainer.querySelectorAll('input, select');
  const confirmationInputs = confirmationSection.querySelectorAll('input, select');

  const member = {};
  let missingFields = [];

  // collect normal inputs
  inputs.forEach(input => {
    member[input.name] = input.value.trim();
    if (!input.value.trim()) {
      missingFields.push(input.name);
    }
  });

  // collect confirmation inputs
  confirmationInputs.forEach(input => {
    if (input.type === 'checkbox') {
      member[input.name] = input.checked;
      if (!input.checked) {
        missingFields.push(input.name);
      }
    } else {
      member[input.name] = input.value.trim();
      if (!input.value.trim()) {
        missingFields.push(input.name);
      }
    }
  });

  // ✅ check if anything is missing
  if (missingFields.length > 0) {
    alert("⚠️ Odeeffannoo guutuu galchi. Itti aanan kana duwwaa dha: \n- " + missingFields.join("\n- "));
    return;
  }

  console.log("📦 Sending data:", member);

  fetch('/baptismor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member)
  })
  .then(res => res.ok ? res.text() : Promise.reject(res))
  .then(message => {
    alert(message);
    console.log("✅ Server response:", message);

    // clear form after success
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.getElementById('declaration').checked = false;
  })
  .catch(err => {
    alert("❌ Galmee hin milkoofne");
    console.error("🚨 Fetch error:", err);
  });
}
