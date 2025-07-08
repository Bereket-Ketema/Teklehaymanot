document.getElementById('suggestionForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = new URLSearchParams(formData);

  try {
    const response = await fetch('/submit-suggestion', {
      method: 'POST',
      body: data,
    });

    const message = await response.text();
    alert(message); // Show the server message

    // ✅ Only redirect if it was a success message
    if (message.includes('እናመሰግናለን ሀሳብዎ ተቀባይነት አግኝቷል!') || message.includes('🎉')) {
      setTimeout(() => {
        window.location.href = '/'; // Homepage
      }, 3000);
    }

  } catch (error) {
    console.error('Registration error:', error);
    alert('😢 ስህተት ተፈጥሯል።ሀሳቡን ማስቀመጥ አልተቻለም እባክዎን እንደገና ይሞክሩ።');
  }
});