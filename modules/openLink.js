/*===========================================================================================\
|                                         CLASS                                              |  
|         Convirte un Objeto a String, elimina caracteres especiales y prepara               |
|                       el dataJson (paramertos), para enviar.                               |
\===========================================================================================*/

const cadenaParametros = () =>{

    let strOpenLink = new classOpenLink()

    let objDatosConsul = datosConsulta();
    let stringDatosConsul = JSON.stringify(objDatosConsul);
    stringDatosConsul = strOpenLink.updateCharacter(stringDatosConsul);
    stringDatosConsul = JSON.parse(stringDatosConsul);
    const queryData = strOpenLink.cadenaOpenLink(stringDatosConsul)

    return "&datosJson=[{" + queryData + "}]"
}

export default class classOpenLink{
    constructor(){
    }
    updateCharacter(registro){
        return registro.replace(/[^a-zA-Z 0-9,_"{}:]+/g, '');
    }
    datosOpenLink(objDatos){
        let strCadena = [];
        for (let iCiclo in objDatos)
        strCadena.push(`${encodeURIComponent(iCiclo)}` + '=' + `${encodeURIComponent(objDatos[iCiclo])}`);
        return strCadena.join('&');
    }
    cadenaOpenLink(objDatos){
        let strCadena = [];
        for (let iCiclo in objDatos)
        strCadena.push(`${encodeURIComponent(iCiclo)}` + ':' + `%22${encodeURIComponent(objDatos[iCiclo])}%22`);
        return strCadena.join(',');
    }
}

/*===========================================================================================\
|                                     Funcion de Parametros                                  |
\===========================================================================================*/

function parametrosURl(){
    const cUserName = "07omcosme" // document.getElementById('inputName').value;

    var objExtraParams = {
        openLinkServidor : '10.61.11.53',            //'10.61.11.34'
        openLinkServicio : 'OPENLINK_WS_PRUEBAS',    // ACP_WS_PRODUCCION
        openLinkPrograma : 'openLink.html',
        codPrograma      : 'openLinkExterno',
        codProcedimiento : 'ejecutaAppServer',
        usuarioActivo    : cUserName,
        codEmpresa       : 'CRGMEX',
        codSistema       : 'ACP'
    };
    return objExtraParams
}

function datosConsulta(){

    const cUserName = "07omcosme" // document.getElementById('inputName').value;
    const cUserPass = "Copamex96" // document.getElementById('passUser').value;

    var aParamsApi = new Array();
    aParamsApi[0] = new Object();
    aParamsApi[0].codEmpresa          = 'CRGMEX';
    aParamsApi[0].codSistema          = 'ACP'; 
    aParamsApi[0].codEmpresaSel       = 'CRGMEX'; 
    aParamsApi[0].codSucursalSel      = '14';
    aParamsApi[0].clavePersona   	  = cUserName;
    aParamsApi[0].codEmpresaActiva    = 'CRGMEX';
    aParamsApi[0].codSucursalActiva   = '';
    aParamsApi[0].AppServerApi        = 'api_AccesoPortal';
    aParamsApi[0].AppServerProcedure  = 'validaAcceso';
    aParamsApi[0].acceso              = cUserPass;                        // document.getElementById("nrTransaccion").value;
   // var strJson = JSON.stringify (aParamsApi);
    return aParamsApi
}

export {cadenaParametros, parametrosURl}