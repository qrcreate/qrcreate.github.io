var i = 0;
var txt = '<br>Makmur berarti sejahtera dan tentram menggambarkan <br>kehidupan anggotayang sangat senang jiwa dan raga';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    // Check if the current character is a line break
    if (txt.charAt(i) === "<" && txt.substr(i, 4) === "<br>") {
      document.getElementById("demo").innerHTML += '<br class="narrow-br">';
      i += 4; // Skip over the <br> tag
    } else {
      document.getElementById("demo").innerHTML += txt.charAt(i);
      i++;
    }
    setTimeout(typeWriter, speed);
  } else {
    // Reset the content and styles after the text is fully typed
    setTimeout(function() {
      var demoElement = document.getElementById("demo");
      demoElement.innerHTML = 'Filosofi Makmur'; // Clear the content
      demoElement.style.transform = 'scale(1)'; // Reset any transform (example: scale)
      demoElement.style.left = '0px'; // Reset position (example: left position)
      demoElement.style.top = '0px'; // Reset position (example: top position)
    }, 1000); // 1 second delay before resetting
  }
}