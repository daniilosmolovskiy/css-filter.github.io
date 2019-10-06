'use strict';

window.URL = window.URL || window.webkitURL;

const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem"),
  fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

fileElem.onchange = function() {
    handleFiles(this.files);
    console.log(this.files);
    if (this.files[0].size >= 304096) { 
      alert( 
        "File too Big, please select a file less than 4mb"); 
        return;
  } else if (file < 2048) { 
      alert( 
        "File too small, please select a file greater than 2mb"); 
  } else { 
      document.getElementById('size').innerHTML = '<b>'
      + file + '</b> KB'; 
  };
  handleFiles(); 
};

function handleFiles(files) {
  if (!files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
    fileList.innerHTML = "Original Image";
    for (let i = 0; i < files.length; i++) {
      const image = document.createElement("div");
      image.classList.add('originalImage');
      fileList.appendChild(image);
      
      //create divs for filtered image
      const imageFiltered = document.createElement("div");
      imageFiltered.classList.add('filteredImage');
      fileList.appendChild(imageFiltered);
      
      const img = document.createElement("img");
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 260;
      img.onload = function() {
        window.URL.revokeObjectURL(this.src);
      }

      const filters = ['Blur', 'Brightness', 'Contrast', 'Grayscale', 'HueRotate', 'Invert', 'Opacity', 'Saturate', 'Sepia', 'DropShadow'];

      filters.forEach(function(filter){
        let currentFilter = 'imageClone' + filter;
        currentFilter = img.cloneNode(false);

        currentFilter.classList.add(filter);  
        console.log(filter);

        let filterNode = document.createElement('p');
        let filterNodeName = document.createElement('h2');
        filterNode.innerHTML = currentFilter;
        imageFiltered.appendChild(currentFilter);
      });

      image.appendChild(img);
      const info = document.createElement("span");
      info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
      image.appendChild(info);
    }
  }
}