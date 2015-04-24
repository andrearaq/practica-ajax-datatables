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
	var listaTabla = $('#miTabla').DataTable({
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
			 		return '<button id="beditar" class="btn boton boton_ed">Editar</button><button id="bborrar" class="btn boton boton_bo">Borrar</button>'
                 //  return '<a class="btn boton boton_ed" id="beditar" href="#">Editar</a><a id="bborrar" class="btn boton boton_bo" href="#">Borrar</a>';
               }
	 		}],
	 	'columnDefs': [{       // impedir que se pueda ordenar por la columna Editar
            "targets": [3],
            "searchable": false,
            "orderable": false
        }]	 
	});

	//validacion del formulario
	var formulario = $('#formulario').validate({
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
	var listaClinicas = $("#clinicas").multiselect({
	   header: "Elige una clínica"
	});
	

    // ventana tipo dialog de jquery-ui para agregar o modificar doctores
    var ventanaDialogo = $("#formu").dialog({
		autoOpen: false,
		modal: true,
		width: 700,
		height: 400,
		resizable: false,
		position: { my: "center", at: "center", of: window },
		show: {
			effect: "blind",
			duration: 1000
		},
		hide: {
			effect: "fade",
			duration: 1000
		},
		buttons: {
			"Guardar": function () {
			// aquí codigo para guardar los datos
			$(this).dialog("close");
			},
			"Cancelar": function () {
				$(this).dialog("close");
			}
		},
		open: function(event, ui) { 

			$('#nombre').val('');
        	$('#numcolegiado').val('');
        	$('#clinicas').load("php/cargar_clinicas.php");
		},
		close: function() {
		}
	});

	var ventanaBorrar = $("#modalBorrar").dialog({
		autoOpen: false,
		modal: true,
		width: 500,
		height: 200,
		resizable: false,
		position: { my: "center", at: "center", of: window },
		show: {
			effect: "blind",
			duration: 1000
		},
		hide: {
			effect: "fade",
			duration: 1000
		},
		buttons: {
			"Borrar": function () {
			// aquí codigo para borrar el doctor
				var nRow = $("#miTabla").parents('tr')[0];
        		var aData = listaTabla.row(nRow).data();
        		var idDoctor = aData.id_doctor;
				$.ajax({
	               /*en principio el type para api restful sería delete pero no lo recogeríamos en $_REQUEST, así que queda como POST*/
	               type: 'POST',
	               dataType: 'json',
	               url: 'php/borrar.php',
	               //estos son los datos que queremos actualizar, en json:
	               data: {
	                   id_doctor: idDoctor
	               },
	               error: function(xhr, status, error) {
	                   //mostraríamos alguna ventana de alerta con el error
	                   alert("Ha entrado en error");
	               },
	               success: function(data) {
	                   //obtenemos el mensaje del servidor, es un array!!!
	                   //var mensaje = (data["mensaje"]) //o data[0], en función del tipo de array!!
	                   //actualizamos datatables:
	                   /*para volver a pedir vía ajax los datos de la tabla*/
	                   miTabla.fnDraw();
	               },
	               complete: {
	                   //si queremos hacer algo al terminar la petición ajax
	               }
	           });
				$(this).dialog("close");
			},
			"Cancelar": function () {
				$(this).dialog("close");
			}
		},
		open: function(event, ui) { 
			var nRow = $("#miTabla").parents('tr')[0];
        	var aData = listaTabla.row(nRow).data();
        	var idDoctor = aData.id_doctor;
        	$('#dborrar').html(aData.nombre);
		} 
	});
	// pulsacion del boton nuevo doctor
	$("#bnuevo").button().click(function (e) {
		e.preventDefault();
		$('#formu').dialog("option", "title", "Añadir Doctor");
		$("#formu").dialog("open");
	});
	//pulsacion boton Repositorio Github
	$('#brepositorio').button({
		icons: {
      		primary: 'ui-icon ui-icon-newwin'
   		}
	}).click(function(e){
		e.preventDefault();
   		alert("Me has pulsado bien!!");
	});
	$("#beditar").button();
	//pulsacion del boton editar doctor
	$('#miTabla').on('click', '#beditar', function (e) {
		e.preventDefault();
	//	var nfila = $(this).parents('tr')[0];
    //    var datosfila = listaTabla.row(nfila).data();
    //    console.log("valores fila: "+ datosfila.id_doctor);
       // $('#idDoctorEditar').val(aData.idDoctor);
    //    $('#nombre').val(datosfila.nombre);
     //   $('#numcolegiado').val(datosfila.numcolegiado);
		$('#formu').dialog("option", "title", "Modificar Doctor");
		$("#formu").dialog("open");
	});
	$("#bborrar").button();
	$('#miTabla').on('click', '#bborrar', function (e) {
		e.preventDefault();
		var nRow = $(this).parents('tr')[0];
        var aData = listaTabla.row(nRow).data();
        var idDoctor = aData.id_doctor;
        $('#dborrar').html(aData.nombre);
		$('#modalBorrar').dialog("option", "title", "Borrar Doctor");
		$("#modalBorrar").dialog("open");
	});

	// cargar las clinicas en el select clinicas del formulario
/*	function cargarClinicas() {
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/cargar_clinicas.php',
               async: false,
               //estos son los datos que queremos actualizar, en json:
               // {parametro1: valor1, parametro2, valor2, ….}
               //data: { id_clinica: id_clinica, nombre: nombre, ….,  id_tarifa: id_tarifa },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
               },
               success: function(data) {
                   $('#clinicas').empty();
                   $.each(data, function() {
                       $('#clinicas').append(
                           $('<option></option>').val(this.id_clinica).html(this.nombre)
                       );
                   });
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });
       }
    cargarClinicas();*/
});