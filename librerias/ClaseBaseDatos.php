<?php

/*
 * todo: verificar si es posible que en la parte cuando se realiza una llamada
 *       a la funcion query que cuando hay error retorna una cadena en blanco
 *       ahora retorne un array o array json indicando el error.
 */
error_reporting(0);

date_default_timezone_set("America/Guayaquil");

/**
 * Clase que maneja la conexion con la Base de Datos
 *
 * Clase que controla todo lo relacionado con la conexion
 * Permite la conexion y desconexion de la base de datos
 * Permite ejecutar sentencias sql enviadas como parametro desde la aplicacion 
 * Manejo de Control de Errores
 * Envio de los resultados desde la base de datos en forma de arreglos o en 
 * formato JSON
 * La conexion se la realiza de acuerdo a los parametros establecidos en el 
 * archivo de configuraciones "config.inc.php"   
 * 
 * @author Juan Pablo Sanchez
 * @version 1.0.1, 2016-07-28
 */
class ClaseBaseDatos {

    /**
     * Devuelve la conexion a una base de datos
     * @var conexion 
     */
    private $mssql;

    /**
     * Nombre del Servidor
     * @var string 
     */
    private $servidor;

    /**
     * Nombre de la base de datos
     * @var string 
     */
    private $base;

    /**
     * Nombre del usuario de base que se va a conectar
     * @var string 
     */
    private $usuario;

    /**
     * Clave para conectarse a la base de datos
     * @var string 
     */
    private $clave;

    /**
     * Establece el servidor o base de datos con el cual se va a establecer
     * conexion, esto es para el caso en el que se tengan que trabajar en la 
     * misma aplicacion conectandose con bases de datos ubicadas en distintos
     * servidores.
     * @param string $s de acuerdo a este parametro establecemos el servidor
     * con al cual nos vamos a conectar, esto es en el caso de que existan
     * varios servidores y necesitemos conectarnos con uno especifico 
     */
    public function __construct($s = '') {
        switch ($s) {
            case '':
                $this->servidor = _SERVIDOR;
                $this->base = _BASE;
                $this->usuario = _USUARIO;
                $this->clave = _CLAVE;
                break;
            case 'I':
                $this->servidor = _SERVIDORI;
                $this->base = _BASEI;
                $this->usuario = _USUARIOI;
                $this->clave = _CLAVEI;
                break;
        }

        $this->mssql = $this->conectarse();
    }

    /**
     * Establece la conexion con la base de datos
     * @return odbc_connect
     */
    private function conectarse() {
        return odbc_connect("Driver={SQL Server};Server=$this->servidor;Database=$this->base;", $this->usuario, $this->clave);
    }

    /**
     * Cierra la conexion con la base de datos     
     */
    public function desconectarse() {
        odbc_close($this->mssql);
    }

    /**
     * Indica si se produjo un error al realizar la conexion con la base de datos
     * y devuelde el codigo del error
     * @return odbc_error
     */
    public function getErrorConexionNo() {
        return odbc_error();
    }

    /**
     * Retorna el mensaje de error que se presento al conectarse con la base de
     * datos en formato json
     * @return json
     */
    public function getErrorConexionJson() {
        $o = array(
            "success" => false,
            "message" => array("reason" => utf8_encode($this->getErrorConexionMsj()))
        );

        return json_encode($o);
    }

    /**
     * Retorna el mensaje de error que se presento al conectarse con la base de
     * datos (une en una cadena el codigo y el mensaje de error)
     * @return string
     */
    private function getErrorConexionMsj() {
        return odbc_error() . ' - ' . odbc_errormsg();
    }

    /**
     * Retorna el numero de codigo de error en el caso de que exista un error
     * al ejecutar una sentencia sql
     * @return int
     */
    public function getErrorNo() {
        return odbc_error();
    }

    /**
     * Retorna el mensaje de error que se presenta al ejecutar una sentencia
     * sql o store procedure, lo retorna como un string simple
     */
    public function getErrorMsj() {
        return odbc_error() . ' - ' . odbc_errormsg();
    }

    /**
     * Retorna el mensaje de error que se presenta al ejecutar una sentencia
     * sql o un store procedure, se lo retorna en formato JSON
     * @param string $query mensaje adicional que se enviara al mensaje de 
     * error, generalmente es la consulta o sp que genero el error al ejecutarse
     * @return json
     */
    public function getErrorMsjJson($query = "") {
        if ($query != "") {
            $query = ' query: ' . $query;
        }

        $o = array(
            "success" => false,
            "message" => array("reason" => utf8_encode($this->getErrorMsj()) . $query)
        );

        return json_encode($o);
    }

    /**
     * Activa o desactiva el modo 'auto-commit' en consultas para la conexión a 
     * la base de datos. Cuando existe un proceso que involucra transacciones a
     * varias tablas y en los que se llama varias veces a la funcion query es
     * recomendable setear el parametro $autocommit en false, para que si existe
     * un error no se grabe en ninguna de las tablas al momento de realizar el
     * correspondiente rollback
     * @param boolean $autocommit true activa el autocommit false lo desactiva
     */
    public function autocommit($autocommit = false) {
//        $this->mssql->autocommit(FALSE);
        odbc_autocommit($this->mssql, $autocommit);
    }

    /**
     * Confirma los cambios realizados a la base de datos.     
     */
    public function commit() {
//        $this->mssql->commit();
        odbc_commit($this->mssql);
    }

    /**
     * Revierte los cambios realizados a la base de datos.
     */
    public function rollback() {
//        $this->mssql->rollback();
        odbc_rollback($this->mssql);
    }

    /**
     * Retorna un conjunto de resultados producto de ejecutar una sentencia
     * sql o un store procedure 
     * @param string $query la sentencia sql o sp que se va a ejecutar
     * @return array o string vacio si hay un error
     */
    public function query($query) {
        $nombreFichero = "log.txt";

        $gestor = fopen($nombreFichero, "a+") or die("Problemas en la creacion");
        fwrite($gestor, '--------------------------------------------------------------------------------');
        fwrite($gestor, "\r\n");
        fwrite($gestor, '-- ' . date("d m Y H:i:s:ms") . " - ");
        fwrite($gestor, "\r\n");
        fwrite($gestor, $query);
        fwrite($gestor, "\r\n");
        //fclose($gestor);


        $result = odbc_exec($this->mssql, $query);

        if (odbc_error()) {
            fwrite($gestor, "-- Error: " . utf8_encode($this->getErrorMsj()));
            fwrite($gestor, "\r\n");
            fclose($gestor);
            return "";
        } else {
            $registros = array();
            while ($row = odbc_fetch_array($result)) {
                $registros[] = array_map('utf8_encode', $row);
            }

            fclose($gestor);
            return $registros;
        }
    }

    /**
     * Retorna un conjunto de resultados producto de ejecutar una sentencia
     * sql o un store procedure 
     * @param string $query la sentencia sql o sp que se va a ejecutar
     * @return json o string vacio si hay un error 
     */
    public function queryJson($query, $mensaje = '') {
        $result = $this->query($query);

        if ($result[0]['MENSAJE']) {
            $mensaje = $result[0]['MENSAJE'];
        }

        if ($result != "") {
            $o = array(
                "success" => true,
                "total" => count($result),
                "totalFiltro" => count($result),
                "data" => $result,
                "message" => array("reason" => $mensaje)
            );

            return json_encode($o);
        } else {
            return "";
        }
    }

    /**
     * Retorna una cadena sin caracteres especiales 
     * @param string $str el texto del cual se va a eliminar los caracteres
     * especiales    
     * @return string
     */
    public function decodeUnicode($str) {
        $str = utf8_decode(preg_replace_callback('/u([0-9a-fA-F]{4})/', function ($match) {
                    return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UTF-16BE');
                }, $str));

        return $str;
    }

}

?>
