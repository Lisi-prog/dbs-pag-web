
function editON(){
  var i = document.createElement("i");
  i.setAttribute("class","fas fa-trash");
  var btn = document.createElement("button");
  btn.setAttribute("type","button");
  btn.setAttribute("class","btn btn-danger btn-lg");
  btn.setAttribute("style","position: absolute; right: 0px; top: 0px;");
  btn.setAttribute("id","editOn");

  btn.appendChild(i);

  var node = document.getElementById("card-photo-id");
  var bandera = document.getElementById("editOn");
  
    if(!bandera){
        node.insertBefore(btn, document.getElementById("agh"));
    }else{
        node.removeChild(bandera);
    }
}

function viewDelete(){
    var elms = document.getElementsByClassName("btn-danger");
    for(var i = 0; i < elms.length; i++){
        if(elms[i].style.display=='inline'){
            elms[i].style.display='none';
        }else{
            elms[i].style.display='inline';
        }
    }
}