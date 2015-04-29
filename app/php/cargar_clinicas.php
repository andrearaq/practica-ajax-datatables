<?php  
/** 
 * Fichero para cargar las clinicas existentes
 * @author Andrea Gutierrez
 * @version 1.0
 * @return array con los datos de las clinicas
 * include clase DB
 */
    //header("Access-Control-Allow-Origin: *");  // permite usar CORS
    include('DB.php');
    $resultado = DB::cargarClinicas();
    // si han recibido todas las clinicas correctamente seguimos
    if (isset($resultado)){
      // ponemos las clinicas en un array
      $clinicasTotal = array();
      while ($row = $resultado->fetch()) {
            $id = $row['id_clinica'];
            $clinicasTotal[$id] = $row['nombre'];
      }
        $datos="";
       // comprobamos si llegan clinicas previamente seleccionadas
      if (isset($_REQUEST['clinicas'])){
        $clinicas=$_REQUEST['clinicas'];
          foreach($clinicasTotal as $id_clinica=>$nombre){
               if(in_array($nombre,$clinicas)){
                $datos .="<option selected value='".$id_clinica."'>".$nombre."</option>";
               }
               else {
                $datos .="<option value='".$id_clinica."'>".$nombre."</option>";
               }
           }
      } else {
        foreach($clinicasTotal as $id_clinica=>$nombre){
            $datos .="<option value='".$id_clinica."'>".$nombre."</option>";
        }
      }
   }
   echo $datos;
  
?>