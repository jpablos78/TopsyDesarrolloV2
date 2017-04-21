<?php

include '../../librerias/ClaseGenerica.php';

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : null);

switch ($action) {
    case 'login':
        login();
        break;
    case 'cerrarSesionActual':
        cerrarSesionActual();
        break;
}

function login() {
    $login = $_POST['login'];
    $clave = $_POST['clave'];

    session_start();
    $_SESSION['S_loginOk'] = 'NO';
    $_SESSION['S_us_codigo'] = '';
    $_SESSION['S_se_codigo'] = '';
    $_SESSION['S_us_login'] = '';
    $_SESSION['S_pe_codigo'] = '';
    $_SESSION['S_pe_desc'] = '';
    $_SESSION['S_us_nombres_apellidos'] = '';
    $_SESSION['S_cci_usuario'] = '';

    $objetoBaseDatos = new claseBaseDatos();

    if ($objetoBaseDatos->getErrorConexionNo()) {
        echo $objetoBaseDatos->getErrorConexionJson();
    } else {
        $password = crypt($clave, strtoupper($login));

        $query = "EXEC SP_LOGIN
                  @US_LOGIN = '$login',
                  @US_PASS = '$password',
                  @OPERACION = 'LOG'";

        $result = $objetoBaseDatos->query($query);

        if ($objetoBaseDatos->getErrorNo()) {
            echo $objetoBaseDatos->getErrorMsjJson($query);
        } else {
            $ok = $result[0]['OK'];
            $us_codigo = $result[0]['US_CODIGO'];
            $sesionIniciada = 'N';

            if ($ok == 'S') {
                $objetoSesion = new claseSesion();
                $resp = $objetoSesion->ingresarSesion($us_codigo);
                $json = json_decode($resp);
                $success = $json->success;

                if ($success) {
                    $sesionIniciada = "S";

                    $mensaje = array('reason' => 'OK');
                    $_SESSION['S_loginOk'] = 'SI';
                    $_SESSION['S_us_codigo'] = $us_codigo;
                    $_SESSION['S_se_codigo'] = $json->data[0]->SE_CODIGO;
                    $_SESSION['S_us_login'] = $json->data[0]->US_LOGIN;
                    $_SESSION['S_pe_codigo'] = $json->data[0]->PE_CODIGO;
                    $_SESSION['S_pe_desc'] = $json->data[0]->PE_DESC;
                    $_SESSION['S_us_nombres_apellidos'] = $json->data[0]->US_NOMBRES_APELLIDOS;
                    $_SESSION['S_cci_usuario'] = $json->data[0]->CCI_USUARIO;
                } else {
                    $success = false;
                    $mensaje = array("reason" => $json->message->reason);
                }
            } else {
                $success = false;
                $mensaje = array("reason" => 'Usuario o clave incorrectos');
            }

            $o = array(
                "success" => $success,
                "loginOk" => $_SESSION['S_loginOk'],
                //"data" => $registros,
                "sesionIniciada" => $sesionIniciada,
                "us_codigo" => $us_codigo,
                "se_codigo" => $_SESSION['S_se_codigo'],
                "us_login" => $_SESSION['S_us_login'],
                "pe_codigo" => $_SESSION['S_pe_codigo'],
                "pe_desc" => $_SESSION['S_pe_desc'],
                "us_nombres_apellidos" => $_SESSION['S_us_nombres_apellidos'],
                "cci_usuario" => $_SESSION['S_cci_usuario'],
                "message" => $mensaje
            );

            echo json_encode($o);
        }

        $objetoBaseDatos->desconectarse();
    }
}

function cerrarSesionActual() {
    $se_codigo = $_POST['se_codigo'];
    $us_codigo = $_POST['us_codigo'];

    $objetoSesion = new claseSesion();
    $result = $objetoSesion->cerrarSesionActual($se_codigo, $us_codigo);

    session_start();
    $_SESSION['S_loginOk'] = 'NO';
    $_SESSION['S_us_codigo'] = '';
    $_SESSION['S_se_codigo'] = '';
    $_SESSION['S_us_login'] = '';
    $_SESSION['S_pe_codigo'] = '';
    $_SESSION['S_pe_desc'] = '';
    $_SESSION['S_us_nombres_apellidos'] = '';
    $_SESSION['S_cci_usuario'] = '';

    echo $result;
}
