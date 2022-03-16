function createPreview(file){
    var imgCodified = URL.createObjectURL(file);
    console.log(imgCodified);
    const node = document.getElementById("botonn");
    const img = $('<div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
    img.insertBefore(node, null);
  }

const myInput = document.getElementById('addPhoto01');

myInput.addEventListener("change", (evt) => {
    var files = evt.target.files; // FileList object
    var element;
    for(var i = 0; i < files.length; i++){
        element = files[i];
        createPreview(element);
    }
});


