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
    $i = $item['mn_codigo'];
    $p = $item['mn_cod_padre'];
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
                    'mn_codigo' => $rows['MN_CODIGO'],
                    'mn_cod_padre' => $rows['MN_COD_PADRE'],
                    'text' => $rows['MN_NOMBRE'],
                    'mn_tipo' => $rows['MN_TIPO'],
                    'iconCls' => trim($rows['MN_ICONO']),
                    'mn_clase' => trim($rows['MN_CLASE']),
                    'mn_ruta' => trim($rows['MN_RUTA']),
                    'leaf' => $leaf,
                    'expanded' => $expanded,
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
                    'mn_codigo' => $rows['MN_CODIGO'],
                    'mn_cod_padre' => $rows['MN_COD_PADRE'],
                    'text' => $rows['MN_NOMBRE'],
                    'mn_tipo' => $rows['MN_TIPO'],
                    'iconCls' => trim($rows['MN_ICONO']),
                    'mn_clase' => trim($rows['MN_CLASE']),
                    'mn_ruta' => trim($rows['MN_RUTA']),
                    'leaf' => $leaf,
                    'expanded' => $expanded,
                );

                array_push($tree, $arr);
            }

            $result = json_encode($tree);
            echo $result;
            $this->objetoBaseDatos->desconectarse();
        }
    }
}
