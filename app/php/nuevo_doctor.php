<?php
/** 
 * Fichero para agregar un nuevo doctor a partir de los datos del formulario
 * de Añadir Doctor
 * @author Andrea Gutierrez
 * @version 1.0
 * @return array json
 * include clase DB
 */
    include("DB.php" );
   
    $nombre = strtoupper($_POST["nombre"]);
    $numcoleg = $_POST["numcolegiado"];
    $clinicas = $_POST["clinicas"];

    $estado = 0;
    $id_doctor = DB::ultimoDoctor()+1;
    $respuesta=DB::nuevoDoctor($id_doctor,$nombre,$numcolegiado);
    if(!$respuesta){
        $mensaje="Imposible agregar doctor.";
        $estado=1;
    }
    else {
        // agregar las clinicas del nuevo doctor
        foreach ($clinicas as $key => $clinica) {
                $respuesta=DB::nuevaClinica($id_doctor, $numcolegiado, $clinica);
            if (!$respuesta) {
                $mensaje = "Error al agregar clinica.";
                $estado  = 1;
            } else {
                $estado  = 0;
                $mensaje = "Datos agregados con exito";
            }    
        }
    }
    $resultado = array();
    $resultado[] = array(
        'mensaje' => $mensaje,
        'estado' => $estado
    );

    echo json_encode($resultado);
?>