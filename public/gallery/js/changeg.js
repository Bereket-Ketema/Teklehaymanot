document.getElementById('changeForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form default submission

  const formData = new FormData(this);
  const data = {
    currentUsername: formData.get('currentUsername'),
    currentPassword: formData.get('currentPassword'),
    newUsername: formData.get('newUsername'),
    newPassword: formData.get('newPassword'),
  };

  try {
    const res = await fetch('/change-gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    
    // Show alert with message
    alert(text);

    // Optional: reload page after successful change
    if (text.includes('✅')) {
      setTimeout(() => location.reload(), 1500);
    }

  } catch (err) {
    console.error('Request failed', err);
    alert('🚨 መረጃው ማስተካከል አልተቻለም');
  }
});