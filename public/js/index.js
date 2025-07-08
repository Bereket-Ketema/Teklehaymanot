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