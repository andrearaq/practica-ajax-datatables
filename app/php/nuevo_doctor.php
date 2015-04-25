<?php
// agregar nuevo doctor
	include("DB.php" );
	$id_doctor = $_POST["id_doctor"];
	$nombre = upper($_POST["nombre"]);
	$numcoleg = $_POST["numcolegiado"];
	$clinicas = $_POST["clinicas"];

	$respuesta=DB::nuevoDoctor($nombre,$numcolegiado,$id_doctor);
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