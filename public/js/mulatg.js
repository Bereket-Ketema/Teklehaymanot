const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent default form submit

    const formData = new FormData(form);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    try {
      const res = await fetch('/gallery-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.redirected) {
        // Login success — follow redirect to secure page
        window.location.href = res.url;
      } else {
        // Login failed — get text and alert
        const text = await res.text();
        alert(text);
      }
    } catch (err) {
      alert('Server error, please try again later.');
    }
  });
