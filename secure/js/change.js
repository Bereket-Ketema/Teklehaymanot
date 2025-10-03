document.getElementById('changeForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    currentUsername: formData.get('currentUsername'),
    currentPassword: formData.get('currentPassword'),
    newUsername: formData.get('newUsername'),
    newPassword: formData.get('newPassword'),
  };

  try {
    const res = await fetch('/change-credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    alert(text);

    // If success → redirect to login page
    if (text.includes('✅')) {
      setTimeout(() => {
        window.location.href = '/admin.html'; // change path to your login page
      }, 1500);
    }

  } catch (err) {
    console.error('Request failed', err);
    alert('🚨 መረጃው ማስተካከል አልተቻለም');
  }
});
