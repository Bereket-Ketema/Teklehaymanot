function submitForms() {
  const childForms = document.querySelectorAll('.child-form');
  const confirmationInputs = document.querySelectorAll('#confirmationSection input, #confirmationSection select');
  const globalFields = {};

  // collect confirmation fields
  confirmationInputs.forEach(input => {
    globalFields[input.name] = input.type === 'checkbox' ? input.checked : input.value.trim();
  });

  const childrenData = [];
  let missingFields = [];

  childForms.forEach((form, idx) => {
    const inputs = form.querySelectorAll('input, select');
    const child = {};
    inputs.forEach(input => {
      const value = input.value.trim();
      child[input.name] = value;

      if (!value) {
        missingFields.push(`${input.name}`);
      }
    });
    childrenData.push({ ...child, ...globalFields });
  });

  // ✅ Validation before submit
  if (missingFields.length > 0) {
    alert("⚠️ እባክዎ መረጃዎቹን በሙሉ ያስገቡ። የሚጎዱት:\n- " + missingFields.join("\n- "));
    return;
  }

  console.log("📦 የሚልኩት መረጃ:", childrenData);

  // send to backend
  fetch('/baptism', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ children: childrenData })
  })
  .then(res => res.ok ? res.text() : res.text().then(msg => Promise.reject(msg)))
  .then(message => {
    alert(message);
    console.log("✅ ከserver የመጣ መልእክት:", message);

    // clear form after success
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.querySelectorAll('select').forEach(select => select.value = '');
  })
  .catch(err => {
    alert(err); // already Amharic from backend
    console.error("🚨 የfetch ስህተት:", err);
  });
}
