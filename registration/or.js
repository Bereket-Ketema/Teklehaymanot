  // Handle conditional display of ንሰሃ አባት
  function checkNiseha() {
    var niseha = document.querySelector("select[name='ንሰሃ_አሎት']").value;
    var nisehaAbat = document.getElementById("ንሰሃ_አባት");
    if (niseha === "አለኝ") {
      nisehaAbat.style.display = "block";
    } else {
      nisehaAbat.style.display = "none";
    }
  }

  document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get all form values
    const dob = document.querySelector("input[name='የትውልድ_ቀን']").value;
    const age = parseInt(document.querySelector("input[name='እድሜ']").value);
    const phone = document.querySelector("input[name='ስልክ_ቁጥር']").value;
    const email = document.querySelector("input[name='ኢሜይል']").value;
    const children = parseInt(document.querySelector("input[name='ልጆች_ብዛት']").value);
    const yearsStay = parseInt(document.querySelector("input[name='የኖረው_ዘመን']").value);

    // 1. Date of Birth → Validate real age
    if (dob) {
      const parts = dob.split("/");
      const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
      const today = new Date();
      let live = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        live--;
      }
      if (live <= 0 || live > 120) {
        alert("Guyyaa dhalootaa sirrii galchaa.");
        return;
      }
    }

    // 2. Age validation
    if (isNaN(age) || age <= 0 || age > 120) {
      alert("Umrii sirrii galchaa");
      return;
    }

    // 3. Phone number
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      alert("Lakkoofsi bilbila sirrii miti. Lakkoofsi digitii 10 qabaachuu qaba.");
      return;
    }

    // 4. Email format
    if (email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Email sirrii galchaa");
      return;
    }

    // 5. Children validation (optional)
    if (!isNaN(children) && (children < 0 || children > 30)) {
      alert("Baay'ina ijoollee sirrii miti");
      return;
    }

    // 6. Years stayed validation (optional)
    if (!isNaN(yearsStay) && yearsStay < 0) {
      alert("Yeroo turan sirrii miti. Mee sirritti galchaa.");
      return;
    }

    // ✅ If all validations passed, continue to register
    const formData = new FormData(this);
    const data = new URLSearchParams(formData);

    try {
      const response = await fetch('/registeror', {
        method: 'POST',
        body: data,
      });

      const message = await response.text();
      alert(message); // Show server response

      // ✅ Redirect if success
      if (message.includes("Galmeen") || message.includes('🎉')) {
        setTimeout(() => {
          window.location.href = '/'; // Go to homepage
        }, 3000);
      }

    } catch (error) {
      console.error('Registration error:', error);
      alert("😢 Dogoggorri uumameera. Mee irra deebi'anii yaalaa");
    }
  });
