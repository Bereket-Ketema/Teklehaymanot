function checkNiseha() {
  var niseha = document.querySelector("select[name='ንሰሃ_አሎት']").value;
  var nisehaAbat = document.getElementById("ንሰሃ_አባት");
  if (niseha === "አለኝ") {
    nisehaAbat.style.display = "block";
  } else {
    nisehaAbat.style.display = "none";
  }
}

document.querySelector("form").addEventListener("submit", function (e) {
  const dob = document.querySelector("input[name='የትውልድ_ቀን']").value;
  const age = document.querySelector("input[name='እድሜ']").value;
  const phone = document.querySelector("input[name='ስልክ_ቁጥር']").value;
  const email = document.querySelector("input[name='ኢሜይል']").value;
  const children = document.querySelector("input[name='ልጆች_ብዛት']").value;
  const yearsStay = document.querySelector("input[name='የኖረው_ዘመን']").value;

  // 1. Age validation
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
      alert("እባክዎን ትክክለኛ የትውልድ ቀን ያስገቡ።");
      e.preventDefault();
      return;
    }
  }

  if (age <= 0 || age> 120) {
      alert("እባክዎን ትክክለኛ እድሜ ያስገቡ።");
      e.preventDefault();
      return;
    }
  // 2. Phone number validation (must be 10 digits)
  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phone)) {
    alert("የስልክ ቁጥሩ ትክክለኛ አይደለም። 10 አሃዞች መኖሩ አለበት።");
    e.preventDefault();
    return;
  }

  // 3. Email format validation (if provided)
  if (email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    alert("እባክዎን ትክክለኛ ኢሜይል ያስገቡ።");
    e.preventDefault();
    return;
  }

  // 4. Children count validation (if provided)
  if (children && (children < 0 || children > 30)) {
    alert("የልጆች ብዛት ትክክለኛ አይደለም።");
    e.preventDefault();
    return;
  }

  // 5. Years stayed validation (if provided)
  if (yearsStay && yearsStay < 0) {
    alert("የቆየበት ዘመን አይቀንም። እባክዎን ትክክለኛ ያስገቡ።");
    e.preventDefault();
    return;
  }

});