// Clinica Dental - listado de Doctores
// Andrea Gutierrez Muñoz
'use strict';

// funciona para separar en lineas las clinicas cargadas
function lista(datos) {
    var salida = datos.replace(/,/g, '</li><li>');
    return salida;
}
// cargar las clinicas en el select clinicas del formulario
$('#clinicas').load("php/cargar_clinicas.php");

$(document).ready(function() {
	$('#miTabla').DataTable({
		'processing': true,
		'serverSide': true,
		'ajax': 'php/cargar_doctores.php',
		'bJQueryUI': true,
		'bPaginate': true,
		'responsive': true,
		'bFilter': true,
		'bAutowidth': false,
		'bSort': true,
	 	'aaSorting': [[0, 'asc']],
	 	'language': {
			'sProcessing': 'Procesando...',
			'sLengthMenu': 'Mostrar _MENU_ registros',
			'sZeroRecords': 'No se encontraron resultados',
			'sEmptyTable': 'Ningún dato disponible en esta tabla',
			'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
			'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
			'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
			'sInfoPostFix': '',
			'sSearch': 'Buscar:',
			'sUrl': '',
			'sInfoThousands': ',',
			'sLoadingRecords': 'Cargando...',
			'oPaginate': {
				'sFirst': 'Primero',
				'sLast': 'Último',
				'sNext': 'Siguiente',
				'sPrevious': 'Anterior'
			},
			'oAria': {
				'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
				'sSortDescending': ': Activar para ordenar la columna de manera descendente'
			}
		},
	 	'columns': [
	 		{ 'data': 'nombre', 
	 		'render': function (data) {return '<a href="#" >' + data + '</a>'}
	 		},
	 		{ 'data': 'numcolegiado' },
	 		{ 'data': 'clinica',
				'render': function(data) {
					var fila=lista(data);
					return '<ul><li>' + fila + '</li><ul>';
				}
			},
			{ 'data': 'id_doctor',
			 'render': function(data) {
                   return '<a class="btn boton boton_ed" href=http://localhost/php/editar.php?id_doctor=' + data + '>Editar</a><a class="btn boton boton_bo" href=http://localhost/php/borrar.php?id_doctor=' + data + '>Borrar</a>';
               }
	 		} ] 
	});

	//validacion del formulario
	$('#formulario').validate({
	    focusCleanup: true,    //quita los errores al entrar en los campos de nuevo
	    rules: {
	        nombre: 'required'
	        }
	 });
});