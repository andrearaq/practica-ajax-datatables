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
	if($respuesta==0){
	    $mensaje="Imposible borrar ese doctor.";
	    $estado=0;
	}
	else {
	    $estado=1;
	    $mensaje="Doctor borrado correctamente.";
	}
	$resultado = array();
	$resultado[] = array(
	    'mensaje' => $mensaje,
	    'estado' => $estado
	);
	echo json_encode($resultado);

?>