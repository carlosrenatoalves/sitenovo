
let lista = document.getElementById("listadd");
let cadastrar = document.getElementById("cadastrar");
let excluir = document.getElementsByClassName("excluiritem")

let vector;
let id;

if (JSON.parse(localStorage.getItem('dados')) != null && JSON.parse(localStorage.getItem('dados')).length>0) {

    id = JSON.parse(localStorage.getItem('dados'))[JSON.parse(localStorage.getItem('dados')).length - 1].id + 1;
    vector = JSON.parse(localStorage.getItem('dados'));

} else {

    id = 0;
    vector = [];
}


cadastrar.addEventListener('click', () => {

    if( document.getElementById("luser2").value!="" && document.getElementById("lemail2").value!=""){

    let email = document.getElementById("lemail2").value;
    let nome = document.getElementById("luser2").value;
    let data = new Date();
    let dataformatada = data.getDate() + " / " + Number(data.getMonth() + 1) + " / " + data.getFullYear();

    vector.push({ id: id, nome: nome, email: email, data: dataformatada });

    armazena(vector);

    atualizaLista();

    id = JSON.parse(localStorage.getItem('dados'))[JSON.parse(localStorage.getItem('dados')).length - 1].id + 1;
    }else{
        alert("Digite um valor válido!!");
    }

});



function geralista(elemento) {

    let item = document.createElement("li");
    item.className = "lista4";

    let nometexto = document.createElement("span");
    nometexto.className = "textolista"
    let texto = document.createTextNode(elemento.nome);

    nometexto.appendChild(texto);

    let emailtexto = document.createElement("span");
    emailtexto.className = "textolista"
    let textoemail = document.createTextNode(elemento.email);

    let dataspan = document.createElement("span");
    dataspan.className = "textolista"
    let datatexto = document.createTextNode(elemento.data);

    emailtexto.appendChild(textoemail)

    item.appendChild(nometexto);
    item.appendChild(emailtexto)
    item.appendChild(datatexto)
    lista.appendChild(item);

    document.getElementById("luser2").value = "";
    document.getElementById("lemail2").value = "";

    let span = document.createElement("span");
    let txt = document.createTextNode("excluir");
    span.className = "excluiritem";
    span.setAttribute("onclick", "limparItem(" + `${elemento.id}` + ")");
    span.appendChild(txt);
    item.appendChild(span);

}

function atualizaLista() {


    lista.innerHTML = '';
    
    if (JSON.parse(localStorage.getItem('dados')) != null && JSON.parse(localStorage.getItem('dados')).length>0 ) {

        let dadosRecebidos = JSON.parse(localStorage.getItem('dados'));


        for (i = 0; i < dadosRecebidos.length; i++) {
            geralista(dadosRecebidos[i]);
        }
    }

}

function armazena(vetor) {

    let jsonvector = JSON.stringify(vetor);

    localStorage.setItem("dados", jsonvector);

}

function limparTudo() {
    lista.innerHTML = "";
    id = 0;
    localStorage.clear();
    vector = [];
}

function limparItem(index) {

    let dadosRecebidos = JSON.parse(localStorage.getItem('dados'));
    let temp = [];

    for (i = 0; i < dadosRecebidos.length; i++) {


        if (dadosRecebidos[i].id != index) {

            temp.push({ id: dadosRecebidos[i].id, nome: dadosRecebidos[i].nome, email: dadosRecebidos[i].email, data: dadosRecebidos[i].data });
        }

    }

    vector = temp;

    armazena(vector);

    if (JSON.parse(localStorage.getItem('dados')) != null && JSON.parse(localStorage.getItem('dados')).length>0) {

        id = JSON.parse(localStorage.getItem('dados'))[JSON.parse(localStorage.getItem('dados')).length - 1].id + 1;
        vector = JSON.parse(localStorage.getItem('dados'));
    
    } else {
    
        id = 0;
        vector = [];
    }

    atualizaLista();
}


function pesquisar() {

    if (JSON.parse(localStorage.getItem('dados')) != null) {

        let dadosRecebidos = JSON.parse(localStorage.getItem('dados'));
        let temp = [];
        let valor = document.getElementById("campopesquisar").value;

        for (i = 0; i < dadosRecebidos.length; i++) {

            if (dadosRecebidos[i].nome == valor || dadosRecebidos[i].email == valor ) {

                temp.push({ id: dadosRecebidos[i].id, nome: dadosRecebidos[i].nome, email: dadosRecebidos[i].email, data: dadosRecebidos[i].data });

            }

        }
            lista.innerHTML = '';
    
            for (i = 0; i < temp.length; i++) {
                geralista(temp[i]);
            }
        }

    }

function limpacampo(){
    document.getElementById("campopesquisar").value="";
}

function limparformulario(){
    document.getElementById("luser2").value="";
    document.getElementById("lemail2").value="";
}


atualizaLista();

