<?php
/** 
 * Fichero para editar datos del doctor a partir de los datos del formulario
 * Modificar Doctor
 * @author Andrea Gutierrez
 * @version 1.0
 * include clase DB
 * @return array json
 */
    include("DB.php" );
    $id_doctor = $_POST["id_doctor"];
    $nombre = strtoupper($_POST["nombre"]);
    $numcoleg = $_POST["numcolegiado"];
    $clinicas = $_POST["clinicas"];

    $respuesta=DB::editarDoctor($id_doctor,$nombre,$numcoleg);
    if(!$respuesta){
        $mensaje="Imposible modificar datos doctor.";
        $estado=1;
    }
    else {
        // actualizar las clínicas del doctor modificado
        // primero se borran todas las clínicas de ese doctor y a continuación se insertan las clínicas
        // sean las mismas o sean diferentes
        $respuesta=DB::borrarClinicas($id_doctor);
        if(!$respuesta){
            $mensaje="Imposible borrar las clinicas.";
            $estado=1;
        }
        else {
                // ahora se insertan las clinicas del doctor
                foreach ($clinicas as $key => $clinica) {
                        $respuesta=DB::nuevaClinica($id_doctor, (int)$numcoleg, $clinica);
            if (!$respuesta) {
                $mensaje = "Error al agregar clinica.";
                $estado  = 1;
            } else {
                $estado  = 0;
                $mensaje = "Datos modificados con exito";
            }    
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