<?php

include '../../librerias/ClaseGenerica.php';

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : null);

switch ($action) {
    case 'verificarSesionValida':
        verificarSesionValida();
        break;
}

function verificarSesionValida() {
    $se_codigo = $_POST['se_codigo'];  

    $objetoSesion = new claseSesion();
    $result = $objetoSesion->verificaSesionValida($se_codigo);
    
    echo $result;
}
