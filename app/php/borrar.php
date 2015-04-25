<?php
// borrar el doctor de la tabla doctores
	include("DB.php");

	if (isset($_REQUEST['id_doctor'])) {
    	// param was set in the query string
	    if (empty($_REQUEST['id_doctor'])) {
	        return "El parámetro id_doctor está vacío!";
	    }
	    $id_doctor = $_REQUEST['id_doctor'];
	}

	$respuesta = DB::borrarDoctor($id_doctor);

	// Comprobar el resultado
	if(!$respuesta){
	    $mensaje="Imposible borrar ese doctor.";
	    $estado=1;
	}
	else {
		// ahora se borran las clinicas de ese doctor
		$respuesta= DB::borrarClinicas($id_doctor);
		if(!$respuesta){
		    $mensaje="Imposible borrar las clinicas de ese doctor.";
		    $estado=1;
		}
		else {
		    $estado=0;
		    $mensaje="Clinicas de ese doctor borradas correctamente.";
		}
	}
	$resultado = array();
	$resultado[] = array(
	    'mensaje' => $mensaje,
	    'estado' => $estado
	);

	echo json_encode($resultado);

?>