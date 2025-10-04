function addition(){
    const additional=document.getElementById("additional");
    const button=document.getElementById("btn");
    if (button.innerText === 'ተጨማሪ ያንብቡ') {
      additional.style.display='block';
      button.innerText = 'ዝጋ';
    } else {
      additional.style.display='none';
      button.innerText = 'ተጨማሪ ያንብቡ';
    }
}
function additions(){
    const additional=document.getElementById("additional");
    const button=document.getElementById("btn");
    if (button.innerText === 'Dabalata Dubissuf') {
      additional.style.display='block';
      button.innerText = 'cufi';
    } else {
      additional.style.display='none';
      button.innerText = 'Dabalata Dubissuf';
    }
}

  document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("mobileMenuToggle");
    const sideButtons = document.querySelector(".navigation-buttons");

    if (window.innerWidth <= 768) {
      menuBtn.addEventListener("click", function () {
        sideButtons.classList.toggle("show");
      });
    }
  });