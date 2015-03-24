<?php
	/*
	* DataTables example server-side processing script.
	*
	* Please note that this script is intentionally extremely simply to show how
	* server-side processing can be implemented, and probably shouldn't be used as
	* the basis for a large complex system. It is suitable for simple use cases as
	* for learning.
	*
	* See http://datatables.net/usage/server-side for full details on the server-
	* side processing requirements of DataTables.
	*
	* @license MIT - http://datatables.net/license_mit
	*/
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* Easy set variables
	*/
	// DB table to use
	$table = 'vdoctores';
	
	// productos es una vista de la tabla dwes
	// create view productos as
	// select a.cod, a.nombre_corto, a.PVP, b.nombre, b.unidades
	// from producto as a, familia as b, stock as c
	// where a.familia = b.cod and a.cod = c.producto


	// Table's primary key
	$primaryKey = 'id_doctor';
	// Array of database columns which should be read and sent back to DataTables.
	// The `db` parameter represents the column name in the database, while the `dt`
	// parameter represents the DataTables column identifier. In this case simple
	// indexes
	$columns = array(
	array( 'db' => 'id_doctor', 'dt' => 'id_doctor' ),
	array( 'db' => 'nombre', 'dt' => 'nombre' ),
	array( 'db' => 'numcolegiado', 'dt' => 'numcolegiado' ),
	array( 'db' => 'clinica', 'dt' => 'clinica' )
	);
	// SQL server connection information
	$sql_details = array(
	'user' => 'magutierrez_adm',
	'pass' => 'admindaw2015',
	'db' => 'dental',
	'host' => 'localhost'
	);
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	* If you just want to use the basic configuration for DataTables with PHP
	* server-side, there is no need to edit below this line.
	*/
	require( 'ssp.class.php' );
	echo json_encode(
		SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);