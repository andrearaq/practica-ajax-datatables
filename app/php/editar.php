<?php
// editar los datos del doctor: nombre y numero colegiado
	include("DB.php" );
	$id_doctor = $_POST["id_doctor"];
	$nombre = upper($_POST["nombre"]);
	$numcoleg = $_POST["numcolegiado"];
	$clinicas = $_POST["clinicas"];

	$respuesta=DB::editarDoctor($id_doctor,$nombre,$numcolegiado);
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
				$respuesta=DB::nuevaClinica($id_doctor, $numcolegiado, $clinica);
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