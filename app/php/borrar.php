<?php
// borrar el doctor de la tabla doctores
	include("DB.php" );

	if (isset($_REQUEST['id_doctor'])) {
    	// param was set in the query string
	    if (empty($_REQUEST['id_clinica'])) {
	        return "El parámetro id_doctor está vacío!";
	    }
	    $id_doctor = $_REQUEST['id_doctor'];
	}

	$query_res = DB::borrarDoctor($id_doctor);

	// Comprobar el resultado
	if (!$query_res) {
	    $mensaje = 'Error en la consulta: ' . mysql_error() . "\n";
	    $estado = mysql_errno();
	    }
	} else {
	    $mensaje = "Borrado el doctor correctamente";
	    $estado = 0;
	}
	$resultado = array();
	$resultado[] = array(
	    'mensaje' => $mensaje,
	    'estado' => $estado
	);
	echo json_encode($resultado);

?>