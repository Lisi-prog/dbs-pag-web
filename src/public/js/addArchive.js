function addArchive(){

    //Formulario
    var formElement = document.createElement("form");
    formElement.setAttribute("method","POST");
    formElement.setAttribute("action","/addArchive");
    //formElement.setAttribute("enctype","multipart/form-data");

    var titleField = document.createElement("input");
    titleField.setAttribute("type", "text");
    titleField.setAttribute("name", "title");
    titleField.setAttribute("class", "form-control");
    titleField.setAttribute("placeholder", "Titulo");

    var descripField = document.createElement("textarea");
    descripField.setAttribute("type", "text");
    descripField.setAttribute("name", "description");
    descripField.setAttribute("class", "form-control");
    descripField.setAttribute("placeholder", "Descripcion");

    var urlField = document.createElement("input");
    urlField.setAttribute("type", "text");
    urlField.setAttribute("name", "url");
    urlField.setAttribute("class", "form-control");
    urlField.setAttribute("placeholder", "URL");

    var btnAgree = document.createElement("button");
    btnAgree.setAttribute("type", "submit");
    btnAgree.setAttribute("class", "btn btn-success m-2");
    btnAgree.setAttribute("onclick", "loader();")
    btnAgree.innerHTML = "Subir";

    var btnCancel = document.createElement("button");
    btnCancel.setAttribute("type", "button");
    btnCancel.setAttribute("class", "btn btn-danger m-2");
    btnCancel.setAttribute("onclick", "cerrarForm()");
    btnCancel.innerHTML = "Cancelar";

    formElement.appendChild(titleField);
    formElement.appendChild(descripField);
    formElement.appendChild(urlField);
    formElement.appendChild(btnAgree);
    formElement.appendChild(btnCancel);
    //--------------------------------------------------------

    var divElement = document.createElement("div");
    divElement.setAttribute("class","col-md-4 offset-md-4 mt-3");
    divElement.setAttribute("id","newArchive");

    var divElementHead = document.createElement("div");
    divElementHead.setAttribute("class","card-header bg-dark text-white text-center");

    var h3Div = document.createElement("h3");
    h3Div.innerHTML = "Nuevo Archivo";

    divElementHead.appendChild(h3Div);

    var divElementBody = document.createElement("div");
    divElementBody.setAttribute("class","card-body bg-dark");


    var divElementFormGroup1 = document.createElement("div");
    divElementFormGroup1.setAttribute("class","form-group p-2");

    var divElementFormGroup2 = document.createElement("div");
    divElementFormGroup2.setAttribute("class","form-group p-2");

    var divElementFormGroup3 = document.createElement("div");
    divElementFormGroup3.setAttribute("class","form-group p-2");

    var divElementFormGroup4 = document.createElement("div");
    divElementFormGroup4.setAttribute("class","form-group p-2");

    divElementFormGroup1.appendChild(titleField);
    divElementFormGroup2.appendChild(descripField);
    divElementFormGroup3.appendChild(urlField);
    divElementFormGroup4.appendChild(btnAgree);
    divElementFormGroup4.appendChild(btnCancel);

    formElement.appendChild(divElementFormGroup1);
    formElement.appendChild(divElementFormGroup2);
    formElement.appendChild(divElementFormGroup3);
    formElement.appendChild(divElementFormGroup4);
    
    divElementBody.appendChild(formElement);


    ;
    divElement.appendChild(divElementHead);
    divElement.appendChild(divElementBody);
    //divElement.appendChild(formElement);

    var node = document.getElementById("contenedor");
    var bandera = document.getElementById("newArchive");
    if(!bandera){
        node.insertBefore(divElement, document.getElementById("archivos"));
    }else{
        node.removeChild(bandera);
    }
}

function cerrarForm(){
    var node = document.getElementById("contenedor");
    var bandera = document.getElementById("newArchive");
    node.removeChild(bandera);
}