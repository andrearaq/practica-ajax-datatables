<?php  
// Cargar clinicas
    //header("Access-Control-Allow-Origin: *");  // permite usar CORS
    include('DB.php');
    $resultado = DB::cargarClinicas();
    $datos="";
    if (isset($resultado)){
            while ($row = $resultado->fetch()) {
               // $clinicas[] = $row;
            	$id_clinica = $row['id_clinica'];
            	$nombre = $row['nombre'];
            	$datos .="<option value='".$id_clinica."'>".$nombre."</option>";
            }
    }

   echo $datos;
  
  /*  $datos = array();
    if (isset($resultado)){
            while ($row = $resultado->fetch()) {
               // $clinicas[] = $row;
                $datos[] = array(
                'id_clinica' = $row['id_clinica'],
                'nombre' = $row['nombre']
                );
            }
    }

   echo json_encode($datos);*/
?>