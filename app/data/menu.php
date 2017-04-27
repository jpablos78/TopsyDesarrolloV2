<?php

include '../../librerias/ClaseGenerica.php';

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : null);

switch ($action) {
    case 'getMenu':
        getMenu();
        break;
    case 'getMenuFavoritos':
        getMenuFavoritos();
        break;
}

function adj_tree(&$tree, $item) {
    $i = $item['MN_CODIGO'];
    $p = $item['MN_COD_PADRE'];
    $tree[$i] = isset($tree[$i]) ? $item + $tree[$i] : $item;

    $tree[$p]['children'][] = &$tree[$i];
}

function getMenu() {
    $us_codigo = $_POST['us_codigo'];

    $objetoBaseDatos = new claseBaseDatos();

    if ($objetoBaseDatos->getErrorConexionNo()) {
        echo $objetoBaseDatos->getErrorConexionJson();
    } else {
        $query = "
                EXEC SP_MENU
                @US_CODIGO = '$us_codigo',                                
                @OPERACION = 'QM'               
                ";

        $result = $objetoBaseDatos->query($query);

        if ($objetoBaseDatos->getErrorNo()) {
            echo $objetoBaseDatos->getErrorMsjJson($query);
        } else {
            $tree = array();

            foreach ($result as $key => $rows) {
                $leaf = true;
                $expanded = false;
                if ($rows['MN_TIPO'] == 'P') {
                    $leaf = false;
                }

                $arr = array(
                    'MN_CODIGO' => $rows['MN_CODIGO'],
                    'MN_COD_PADRE' => $rows['MN_COD_PADRE'],
                    'text' => $rows['MN_NOMBRE'],
                    'MN_TIPO' => $rows['MN_TIPO'],
                    'iconCls' => trim($rows['MN_ICONO']),
                    'MN_CLASE' => trim($rows['MN_CLASE']),
                    'MN_RUTA' => trim($rows['MN_RUTA']),
                    'leaf' => $leaf,
                    'EXPANDED' => $expanded,
                );
                
                 if (($rows['MN_TIPO'] == 'P')) {
                    $arr = $arr + array('children' => array());
                }
                
                adj_tree($tree, $arr);

                //array_push($tree, $arr);
            }
            
            $nodes = $tree[1];            

            echo json_encode($nodes);
        }
    }
}

function getMenuFavoritos() {
    $us_codigo = $_POST['us_codigo'];

    $objetoBaseDatos = new claseBaseDatos();

    if ($objetoBaseDatos->getErrorConexionNo()) {
        echo $objetoBaseDatos->getErrorConexionJson();
    } else {
        $query = "
                EXEC SP_MENU_FAVORITOS
                @US_CODIGO = '$us_codigo',                                
                @OPERACION = 'QMF'               
                ";

        $result = $objetoBaseDatos->query($query);

        if ($objetoBaseDatos->getErrorNo()) {
            echo $objetoBaseDatos->getErrorMsjJson($query);
        } else {
            $tree = array();

            foreach ($result as $key => $rows) {
                $leaf = true;
                $expanded = false;

                $arr = array(
                    'MN_CODIGO' => $rows['MN_CODIGO'],
                    'MN_COD_PADRE' => $rows['MN_COD_PADRE'],
                    'text' => $rows['MN_NOMBRE'],
                    'MN_TIPO' => $rows['MN_TIPO'],
                    'iconCls' => trim($rows['MN_ICONO']),
                    'MN_CLASE' => trim($rows['MN_CLASE']),
                    'MN_RUTA' => trim($rows['MN_RUTA']),
                    'leaf' => $leaf,
                    'EXPANDED' => $expanded,
                );

                array_push($tree, $arr);
            }

            $result = json_encode($tree);
            echo $result;
            $this->objetoBaseDatos->desconectarse();
        }
    }
}
