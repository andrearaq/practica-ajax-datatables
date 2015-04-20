// Clinica Dental - listado de Doctores
// Andrea Gutierrez Muñoz
'use strict';

$(document).ready(function() {
	// funcion para separar en lineas las clinicas cargadas
	function lista(datos) {
	    var salida = datos.replace(/,/g, '</li><li>');
	    return salida;
	}
	// cargar las clinicas en el select clinicas del formulario
	$('#clinicas').load("php/cargar_clinicas.php");
	
	// configuracion de Datatable
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
	 		'render': function (data) {return '<a class="nomdoctor" href="#" >' + data + '</a>'}
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
                   return '<a class="btn boton boton_ed" id="beditar" href="#">Editar</a><a id="bborrar" class="btn boton boton_bo" href="#">Borrar</a>';
               }
	 		}],
	 	'columnDefs': [{       // impedir que se pueda ordenar por la columna Editar
            "targets": [3],
            "searchable": false,
            "orderable": false
        }]	 
	});

	//validacion del formulario
	$('#formulario').validate({
	    focusCleanup: true,    //quita los errores al entrar en los campos de nuevo
	    rules: {
	        nombre: {
	            required: true,
	            lettersonly: true
        	},
        	numcolegiado: {
        		digits: true
        	},
        	'clinicas[]': {
        		required: true,
        		minlenght: 1
        	}
        },
        messages: {
	        numcolegiado: {
	            digits: "El numero de colegiado debe tener digitos."
	        },
	        clinicas: "Selecciona al menos una clínica."
    	},  //fin messages
	    submitHandler: function() {
	    }
    });

	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z ñáéíóú]+$/i.test(value);
	}, "El nombre solo puede contener letras.");

	// multiselect de jquery-ui para seleccionar varias clinicas
	$("#clinicas").multiselect({
	   header: "Elige una clínica"
	});
	

    // ventana tipo dialog de jquery-ui para agregar o modificar doctores
    $("#formu").dialog({
		autoOpen: false,
		modal: true,
		width: 700,
		height: 400,
		buttons: {
			"Guardar": function () {
			// aquí codigo para guardar los datos
			$(this).dialog("close");
			},
			"Cancelar": function () {
				$(this).dialog("close");
			}
		},
		open: function() { 
			$('#nombre').val('');
        	$('#numcolegiado').val('');
        	$('#clinicas').load("php/cargar_clinicas.php");
		} 
	});

	$("#modalBorrar").dialog({
		autoOpen: false,
		modal: true,
		width: 500,
		height: 200,
		buttons: {
			"Borrar": function () {
			// aquí codigo para borrar el doctor
			$(this).dialog("close");
			},
			"Cancelar": function () {
				$(this).dialog("close");
			}
		},
		open: function() { 
			$("#dborrar").html($('#nombre').val());
		} 
	});
	// pulsacion del boton nuevo doctor
	$("#bnuevo").click(function (e) {
		e.preventDefault();
		$("#formu").dialog("option", "resizable", false);
		$('#formu').dialog("option", "title", "Añadir Doctor");
		$("#formu").dialog("open");
	});
	//pulsacion del boton editar doctor
	$('#miTabla').on('click', '#beditar', function (e) {
		e.preventDefault();
		$("#formu").dialog("option", "resizable", false);
		$('#formu').dialog("option", "title", "Modificar Doctor");
		$("#formu").dialog("open");
	});
	$('#miTabla').on('click', '#bborrar', function (e) {
		e.preventDefault();
		$("#modalBorrar").dialog("option", "resizable", false);
		$('#modalBorrar').dialog("option", "title", "Borrar Doctor");
		$("#modalBorrar").dialog("open");
	});
});