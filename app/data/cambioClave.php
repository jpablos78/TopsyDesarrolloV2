<?php

include '../../librerias/ClaseGenerica.php';

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : null);

switch ($action) {
    case 'cambioClave':
        cambioClave();
        break;
}

function cambioClave() {
    $S_se_codigo = $_POST['S_se_codigo'];
    $S_us_codigo = $_POST['S_us_codigo'];
    $mn_codigo = $_POST['mn_codigo'];

    $us_codigo = $_POST['us_codigo'];
    $us_pass = trim($_POST['us_pass']);
    $us_new_pass = trim($_POST['us_new_pass']);
    $us_login = trim($_POST['us_login']);

    $objetoSesion = new claseSesion();
    $result = $objetoSesion->verificaSesionPermiso($S_se_codigo, $S_us_codigo, $mn_codigo);

    $json = json_decode($result);

    if ($json->data[0]->OK == 'S') {
        $objetoBaseDatos = new claseBaseDatos();

        if ($objetoBaseDatos->getErrorConexionNo()) {
            echo $objetoBaseDatos->getErrorConexionJson();
        } else {
            $us_pass = crypt($us_pass, strtoupper($us_login));
            $us_new_pass = crypt($us_new_pass, strtoupper($us_login));

            $query = "EXEC SP_CAMBIO_CLAVE
                      @US_CODIGO = '$us_codigo',
                      @US_PASS = '$us_pass',
                      @US_PASS_NEW = '$us_new_pass', 
                      @US_ING_ACT = '$S_us_codigo',
                      @OPERACION = 'CCL'";

            $objetoBaseDatos->autocommit(false);
            $result = $objetoBaseDatos->queryJson($query);

            if ($objetoBaseDatos->getErrorNo()) {
                $objetoBaseDatos->rollback();
                echo $objetoBaseDatos->getErrorMsjJson($query);
            } else {
                echo $result;
                $objetoBaseDatos->commit();
            }

            $objetoBaseDatos->desconectarse();
        }
    } else {
        echo $result;
    }
}
