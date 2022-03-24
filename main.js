import classOpenLink from './modules/openLink.js';
import {cadenaParametros, parametrosURl} from './modules/openLink.js';

function loginCopamex(datosJson){

    if(cUserName && cUserPass != ''){
        console.log("Accesa a Portal");
       // location.replace = 'http://10.61.11.53:9180/copamex/web/apps/acp/load/index.html';

        location.replace('http://10.61.11.53:9180/copamex/web/apps/acp/acceso/index.html');

        // Ejecutar OpenLink...
    }
    else{
        alert("Ingresa datos de Inicio de Sesión");
    }
}

/*===========================================================================================\
|                                 Mostrar/Ocultar Contraseña                                 |
\===========================================================================================*/

window.openLink = function ()
{
    const strOpenLink = new classOpenLink()

    const urlOpenLink = strOpenLink.datosOpenLink(parametrosURl());
    const urlOpenLinkData = urlOpenLink + cadenaParametros();
    const urlJSP = 'http://10.61.11.53:9180/openLink/openLink.jsp?';

    const openLink = urlJSP + urlOpenLinkData;

    fetch(openLink, {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(function(datosJson){
        let retornoOpenLink = datosJson.success
        if(retornoOpenLink === false){
            erroresDatasul(datosJson)
            datosJson = datosJson
        } else if(retornoOpenLink === true){
            loginCopamex(datosJson)
        }
    })
}

/*===========================================================================================\
|                     Funcion Duevuelve ErrorDatasul en IziToast                             |
\===========================================================================================*/

const erroresDatasul = datosJson =>{
    let temp_tableError = datosJson.temp_mensaje_exec;
    return temp_tableError.map(temp_tableError => {
        const tipoMensaje = temp_tableError.tipomensaje
        if(tipoMensaje === "ERROR-DATASUL" || tipoMensaje === "ERROR"){      // Valida que sea Error DataSul
            const mensajeError  = temp_tableError.contenido;
            console.log(mensajeError);
            /*
            iziToast.show({
                timeout: 5000,
                progressBar: false,
                color: '#9E0101',
                titleColor: 'white',
                messageColor: 'white',
                position: 'topCenter',
                icon: 'fas fa-times-circle fa-2x fa-spin',
                iconColor: 'white',
                title: 'Error de Aplicación:',
                message: mensajeError,
            });
            */
        }
    })
}

/*===========================================================================================\
|                                 Mostrar/Ocultar Contraseña                                 |
\===========================================================================================*/

const toggle = document.querySelector(".toggle"),
       input = document.getElementById("passUser");

       toggle.addEventListener("click", () =>{
           if(input.type === "password"){
               input.type = "text";
               toggle.classList.replace("fa-eye-low-vision", "fa-eye");
           } else {
               input.type = "password";
               toggle.classList.replace("fa-eye", "fa-eye-low-vision");
           }
       })


