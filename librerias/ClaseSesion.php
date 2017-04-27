<?php

/**
 * Clase que maneja las sesiones de usuario
 *
 * Maneja las sesiones de usuario desde una base de datos.
 * Cuando el usuario ingresa exitosamente en el sistema se crea un registro en
 * una tabla de sesiones que identificara ese ingreso del usuario. 
 * Mientras esa sesion sea valida el usuario podra ingresar en las opciones en
 * las que tenga acceso y realizar transacciones, cuando esta sesion no sea
 * valida no podra realizar ninguna transaccion en el sistema
 * 
 * @author Juan Pablo Sanchez
 * @version 1.0.0, 2016-07-27
 */
include_once 'claseBaseDatos.php';
include_once 'Mobile-Detect-2.6.6/Mobile_Detect.php';

class ClaseSesion {

    /**
     * Registra una sesion en la base de datos para posteriormente con esta
     * sesion validar si el usuario puede realizar transacciones en el sistema
     * @param string $us_codigo codigo del usuario que inicia la sesion
     * @return json
     */
    function ingresarSesion($us_codigo) {
        $objetoBaseDatos = new claseBaseDatos();

        if ($objetoBaseDatos->getErrorConexionNo()) {
            return $objetoBaseDatos->getErrorConexionJson();
        } else {
            $detect = new Mobile_Detect();
            $se_dispositivo = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');

            $se_ip = $this->getIP();

            $query = "
                EXEC SP_SESION
                @US_CODIGO = '$us_codigo',                
                @SE_IP = '$se_ip', 
                @SE_DISPOSITIVO	= '$se_dispositivo',
                @US_ING_ACT = '$us_codigo',
                @OPERACION = 'I'               
                ";

            $objetoBaseDatos->autocommit(false);
            $result = $objetoBaseDatos->queryJson($query);

            if ($objetoBaseDatos->getErrorNo()) {
                $result = $objetoBaseDatos->getErrorMsjJson($query);
                $objetoBaseDatos->rollback();
            } else {
                $objetoBaseDatos->commit();
            }

            $objetoBaseDatos->desconectarse();
            return $result;
        }
    }

    /**
     * Verifica si la sesion del usuario es valida
     * @param string $se_codigo codigo de la sesion a verificar
     */
    function verificaSesionValida($se_codigo) {
        $objetoBaseDatos = new claseBaseDatos();

        if ($objetoBaseDatos->getErrorConexionNo()) {
            return $objetoBaseDatos->getErrorConexionJson();
        } else {
            $query = "
                EXEC SP_SESION
                @SE_CODIGO = '$se_codigo',                                
                @OPERACION = 'VSV'               
                ";

            $objetoBaseDatos->autocommit(false);
            $result = $objetoBaseDatos->queryJson($query);

            if ($objetoBaseDatos->getErrorNo()) {
                $result = $objetoBaseDatos->getErrorMsjJson($query);
                $objetoBaseDatos->rollback();
            } else {
                $objetoBaseDatos->commit();
            }

            $objetoBaseDatos->desconectarse();
            return $result;
        }
    }

    /**
     * Verifica si la sesion y los permisos que tiene un usuario en una opcion 
     * del menu son validos
     * @param string $se_codigo codigo de la sesion a verificar
     * @param string $us_codigo codigo del usuario
     * @param string $mn_codigo codigo de la opcion
     */
    function verificaSesionPermiso($se_codigo, $us_codigo, $mn_codigo) {
        $objetoBaseDatos = new claseBaseDatos();

        if ($objetoBaseDatos->getErrorConexionNo()) {
            return $objetoBaseDatos->getErrorConexionJson();
        } else {
            $query = "
                EXEC SP_SESION
                @SE_CODIGO = '$se_codigo',  
                @US_CODIGO = '$us_codigo',
                @MN_CODIGO = '$mn_codigo',
                @OPERACION = 'VSP'               
                ";

            $objetoBaseDatos->autocommit(false);
            $result = $objetoBaseDatos->queryJson($query);

            if ($objetoBaseDatos->getErrorNo()) {
                $result = $objetoBaseDatos->getErrorMsjJson($query);
                $objetoBaseDatos->rollback();
            } else {
                $objetoBaseDatos->commit();
            }

            $objetoBaseDatos->desconectarse();
            return $result;
        }
    }

    /**
     * Registra una sesion en la base de datos para posteriormente con esta
     * sesion validar si el usuario puede realizar transacciones en el sistema
     * @param string $se_codigo codigo de la sesion a cerrar
     * @param string $us_codigo usuario que cierra la sesion
     * @return json
     */
    public function cerrarSesionActual($se_codigo, $us_codigo) {
        $objetoBaseDatos = new claseBaseDatos();

        if ($objetoBaseDatos->getErrorConexionNo()) {
            return $objetoBaseDatos->getErrorConexionJson();
        } else {
            $query = "
                EXEC SP_SESION
                @SE_CODIGO = '$se_codigo',                
                @US_ING_ACT = '$us_codigo',
                @OPERACION = 'CSA'               
                ";

            $objetoBaseDatos->autocommit(false);
            $result = $objetoBaseDatos->queryJson($query);

            if ($objetoBaseDatos->getErrorNo()) {
                $result = $objetoBaseDatos->getErrorMsjJson($query);
                $objetoBaseDatos->rollback();
            } else {
                $objetoBaseDatos->commit();
            }

            $objetoBaseDatos->desconectarse();
            return $result;
        }
    }

    /**
     * Retorna una direccion IP
     * @return string
     */
    public function getIP() {
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $se_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if (isset($_SERVER ['HTTP_VIA']))
            $se_ip = $_SERVER['HTTP_VIA'];
        else if (isset($_SERVER ['REMOTE_ADDR']))
            $se_ip = $_SERVER['REMOTE_ADDR'];
        else
            $se_ip = null;
        return $se_ip;
    }

}

?>
