const numChildrenInput = document.getElementById('numChildren');
const formContainer = document.getElementById('formContainer');

numChildrenInput.addEventListener('input', () => {
  const num = parseInt(numChildrenInput.value);
  formContainer.innerHTML = '';

  if (!isNaN(num) && num > 0) {
    for (let i = 1; i <= num; i++) {
      const childDiv = document.createElement('div');
      childDiv.className = 'child-form';
      childDiv.innerHTML = `
        <h3>ልጅ ${i}</h3>
        <fieldset>
          <legend>1. የግለሰቡ መረጃ</legend>
          <label>ስም: <input type="text" name="ስም" required></label>
          <label>የአባት ስም: <input type="text" name="የአባት_ስም"></label>
          <label>የአያት ስም: <input type="text" name="የአያት_ስም"></label>
          <label>የእናት ሙሉ ስም: <input type="text" name="የእናት_ስም"></label>
          <label>የክርስትና ስም: <input type="text" name="የክርስትና_ስም"></label>
          <label>ፆታ:
            <select name="ፆታ" required>
              <option value="">--ይምረጡ--</option>
              <option>ወንድ</option>
              <option>ሴት</option>
            </select>
          </label>
          <label>የትውልድ ቀን:<input type="text" name="የትውልድ_ቀን" placeholder="14/06/1990" pattern="\\d{2}/\\d{2}/\\d{4}" required></label>
          <label>እድሜ: <input type="number" name="እድሜ" required></label>
        </fieldset>

        <fieldset>
          <legend>3. የመገኛ አድራሻ</legend>
          <label>ስልክ ቁጥር: <input type="tel" name="ስልክ_ቁጥር" required></label>
        </fieldset>
      `;
      formContainer.appendChild(childDiv);
    }

    // Show confirmation and submit
    document.getElementById('confirmationSection').style.display = 'block';
    document.getElementById('submitBtn').style.display = 'inline-block';
  } else {
    document.getElementById('confirmationSection').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
  }
});



function submitForms() {

  const phone = document.querySelector("input[name='ስልክ_ቁጥር']").value;
  // 2. Phone validation
  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phone)) {
    alert("የስልክ ቁጥሩ ትክክለኛ አይደለም። 10 አሃዞች መኖሩ አለበት።");
    return;
  }
  const childForms = document.querySelectorAll('.child-form');
  const confirmationInputs = document.querySelectorAll('#confirmationSection input');
  const globalFields = {};

  // Get shared confirmation fields (ማስገባት_ቀን, ፊርማ, እርግጠኝነት)
  confirmationInputs.forEach(input => {
    globalFields[input.name] = input.type === 'checkbox' ? input.checked : input.value.trim();
  });

  const childrenData = [];

  childForms.forEach(form => {
    const inputs = form.querySelectorAll('input, select');
    const child = {};

    inputs.forEach(input => {
      child[input.name] = input.value.trim();
    });

    // Merge confirmation values into each child object
    childrenData.push({ ...child, ...globalFields });
  });

  // Send to /child as array
  fetch('/child', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ children: childrenData })
  })
  .then(res => res.ok ? res.text() : Promise.reject(res))
  .then(message => {
    alert(message);
    console.log("✅ Server response:", message);
  })
  .catch(err => {
    alert("❌ ማስገባት አልተሳካም።");
    console.error(err);
  });
}
