function addEvent(){

    //Formulario
    var formElement = document.createElement("form");
    formElement.setAttribute("method","POST");
    formElement.setAttribute("action","/addEvent");
    //formElement.setAttribute("enctype","multipart/form-data");

    var dateField = document.createElement("input");
    dateField.setAttribute("type", "text");
    dateField.setAttribute("name", "date");
    dateField.setAttribute("class", "form-control");
    dateField.setAttribute("placeholder", "Fecha");

    var ubicationField = document.createElement("input");
    ubicationField.setAttribute("type", "text");
    ubicationField.setAttribute("name", "ubication");
    ubicationField.setAttribute("class", "form-control");
    ubicationField.setAttribute("placeholder", "Ubicacion");

    var descripField = document.createElement("textarea");
    descripField.setAttribute("type", "text");
    descripField.setAttribute("name", "description");
    descripField.setAttribute("class", "form-control");
    descripField.setAttribute("style", "resize: none");
    descripField.setAttribute("placeholder", "Descripcion");

    var juezField = document.createElement("input");
    juezField.setAttribute("type", "text");
    juezField.setAttribute("name", "juez");
    juezField.setAttribute("class", "form-control");
    juezField.setAttribute("placeholder", "Juez/Organizacion");

    var cateField = document.createElement("input");
    cateField.setAttribute("type", "text");
    cateField.setAttribute("name", "category");
    cateField.setAttribute("class", "form-control");
    cateField.setAttribute("placeholder", "Categoria");

    var btnAgree = document.createElement("button");
    btnAgree.setAttribute("type", "submit");
    btnAgree.setAttribute("class", "btn btn-success m-2");
    btnAgree.innerHTML = "Subir";

    var btnCancel = document.createElement("button");
    btnCancel.setAttribute("type", "button");
    btnCancel.setAttribute("class", "btn btn-danger m-2");
    btnCancel.setAttribute("onclick", "cerrarForm()");
    btnCancel.innerHTML = "Cancelar";

    formElement.appendChild(dateField);
    formElement.appendChild(ubicationField);
    formElement.appendChild(descripField);
    formElement.appendChild(juezField);
    formElement.appendChild(cateField);
    formElement.appendChild(btnAgree);
    formElement.appendChild(btnCancel);
    //--------------------------------------------------------

    var divElement = document.createElement("div");
    divElement.setAttribute("class","col-md-4 offset-md-4");
    divElement.setAttribute("id","newEvent");

    var divElementHead = document.createElement("div");
    divElementHead.setAttribute("class","card-header bg-dark text-white text-center");

    var h3Div = document.createElement("h3");
    h3Div.innerHTML = "Nuevo Evento";

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

    var divElementFormGroup5 = document.createElement("div");
    divElementFormGroup5.setAttribute("class","form-group p-2");

    var divElementFormGroup6 = document.createElement("div");
    divElementFormGroup6.setAttribute("class","form-group p-2");

    divElementFormGroup1.appendChild(dateField);
    divElementFormGroup2.appendChild(ubicationField);
    divElementFormGroup3.appendChild(descripField);
    divElementFormGroup4.appendChild(juezField);
    divElementFormGroup5.appendChild(cateField);
    divElementFormGroup6.appendChild(btnAgree);
    divElementFormGroup6.appendChild(btnCancel);

    formElement.appendChild(divElementFormGroup1);
    formElement.appendChild(divElementFormGroup2);
    formElement.appendChild(divElementFormGroup3);
    formElement.appendChild(divElementFormGroup4);
    formElement.appendChild(divElementFormGroup5);
    formElement.appendChild(divElementFormGroup6);
    
    divElementBody.appendChild(formElement);


    ;
    divElement.appendChild(divElementHead);
    divElement.appendChild(divElementBody);
    //divElement.appendChild(formElement);

    var node = document.getElementById("contenedor");
    var bandera = document.getElementById("newEvent");
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