<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once './librerias/ClaseGenerica.php';

$objetoBaseDatos = new ClaseBaseDatos();

if ($objetoBaseDatos->getErrorConexionNo()) {
    echo $objetoBaseDatos->getErrorConexionJson();
} else {
    echo 'conexion exitosa';

    $query = "select * from wp_usuarios";

//query que devuelve un array y como obtener valores
    $result = $objetoBaseDatos->query($query);

    if ($objetoBaseDatos->getErrorNo()) {
        echo $objetoBaseDatos->getErrorMsjJson();
    } else {
        echo 'ok';

        print_r($result);

//obtener un solo valor, util para querys que se conoce que solo devuelven
//un registro
        echo "<br><br>";
        echo $result[0]['us_email'];

//recorrer una consulta que devolvio un array
//con un for

        for ($i = 0; $i <= count($result); $i++) {
            echo "<br>";
            echo $result[$i]['us_email'];
        }

//recorrer una consulta que devolvio un array
//con un foreach
        echo "<br><br>foreach";
        foreach ($result as $key => $value) {
            echo "<br>";
            echo $value['us_email'] . ' - ' . $value['us_nombres'];
        }
    }


//query que devuelve un objeto json formado por el array de la consulta
    $result = $objetoBaseDatos->queryJson($query);

    echo "<br><br>json";
    if ($objetoBaseDatos->getErrorNo()) {
        echo $objetoBaseDatos->getErrorMsjJson();
    } else {
        echo $result;
    }


//query que devuelve un objeto json formado por el array de la consulta y 
//donde se le envia un mensaje de parametro
    $result = $objetoBaseDatos->queryJson($query, 'Mensaje enviado ...');

    echo "<br><br>json<br><br>";
    if ($objetoBaseDatos->getErrorNo()) {
        echo $objetoBaseDatos->getErrorMsjJson();
    } else {
        echo $result;
    }


    echo "<br><br>recorrer json php<br><br>";

//$records = json_decode(stripslashes($result));


    $records = json_decode(stripslashes($result));

//print_r($records);
//
    //en el caso de tener varios indices buscar el indice que tiene la data
//foreach ($records as $indice => $valor) {

    $array = json_decode(stripslashes($result));
    foreach ($array as $obj => $value) {
        echo 'indice: ' . $obj;
        echo "<br>";

//para buscar un obj json que tiene datos
        if ($obj == 'data') {
            echo "<br>dentro del objeto json 'data' <br>";
            foreach ($value as $indice => $valor) {
                echo "<br>";

                foreach ($valor as $key => $item) {
                    echo "<br>";
                    echo 'indice: ' . $obj . ' - campo: ' . $key . ' - valor: ' . $item;
                }
            }
        }

        echo "<br>";
    }


//apuntar directamente al objeto json que tiene la data 'data'

    echo "<br><br>apuntar directamente al objeto json que tiene la data 'data'<br><br>";

    $records = json_decode(stripslashes($result));
    $records = $records->data;

    //var_dump($records);

    foreach ($records as $key => $value) {
        foreach ($value as $indice => $valor) {
            echo 'indice: ' . $indice . ' - valor: ' . $valor . '<br>';
        }
        echo '<br>';
    }

    //apuntar directamente a un valor de un objeto json
    echo "<br><br>apuntar directamente a un valor de un objeto json<br><br>";

    $records = json_decode(stripslashes($result));
    echo 'campo total: ' . $records->total . '<br>';
    echo 'campo mensaje -> reason: ' . $records->message->reason . '<br>';
    echo 'campo data[2] -> us_apellidos: ' . $records->data[2]->us_apellidos . '<br>';
}
