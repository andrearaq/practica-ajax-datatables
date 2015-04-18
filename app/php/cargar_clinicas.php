<?php  
// Cargar clinicas
    header("Access-Control-Allow-Origin: *");  // permite usar CORS
    include('DB.php');
    $clinicas = DB::cargarClinicas();

    $datos="<option value='0'>Elige clinica...</option>";
    foreach ($clinicas as $id_clinica => $nombre) {
        $datos .="<option value='".$id_clinica."'>".$nombre."</option>";
    }
   
   echo $datos;
   
?>