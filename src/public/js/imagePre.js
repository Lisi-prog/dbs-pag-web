function createPreview(file){
    var imgCodified = URL.createObjectURL(file);
    const newDiv = document.createElement("div");
    document.create
    const node = document.getElementById("boy");
    newDiv.classList.add("col-sm");
    newDiv.setAttribute("id","elementos");
    
    // const node = document.getElementById("botonn");
    // const img = '<div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img style="height:200px" src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>';
    const img = '<img style="height:200px" src="' + imgCodified + '" alt="Foto del usuario">';

    newDiv.innerHTML = img;
    node.appendChild(newDiv);
    // img.insertBefore(node, null);
  }

const myInput = document.getElementById('addPhoto01');

myInput.addEventListener("change", (evt) => {
    var files = evt.target.files; // FileList object

    const node = document.getElementById("boy");
    const child = document.getElementById("fondo-photo");

    if (child){
        node.removeChild(child);
    }else{
        node.innerHTML = "";     
    }

    var element;
    for(var i = 0; i < files.length; i++){
        element = files[i];
        createPreview(element);
    }
});


