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
//	$('#clinicasE').load("php/cargar_clinicas.php");
//	$('#clinicasN').load("php/cargar_clinicas.php");
	
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
			 	return '<button id="beditar" class="btn boton boton_ed">Editar</button><button id="bborrar" class="btn boton boton_bo">Borrar</button>';
              }
	 		}],
	 	'columnDefs': [{       // impedir que se pueda ordenar por la columna Editar
            "targets": [3],
            "searchable": false,
            "orderable": false
        }]	 
	});

	//validacion del formulario de nuevo Doctor
	var formularioN = $('#formularioN').validate({
	  //  focusCleanup: true,    //quita los errores al entrar en los campos de nuevo
	    rules: {
	        nombreN: {
	            required: true,
	            lettersonly: true
        	},
        	numcolegiadoN: {
        		digits: true
        	},
        	'clinicasN[]': {
        		required: true,
        		minlenght: 1
        	}
        },
        messages: {
	        numcolegiadoN: {
	            digits: "El numero de colegiado debe tener digitos."
	        },
	        clinicasN: {
	        	required: "Selecciona al menos una clínica."
	        } 
    	},  //fin messages
	    submitHandler: function() {
	    	// aquí codigo para guardar los datos
			alert("entrado en submithandler del formulario");
        	var clinicas = $("#clinicasN").val();
        	var nombre = $("#nombreN").val();
        	var numcolegiado = $("#numcolegiadoN").val();
      
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/nuevo_doctor.php',
               //estos son los datos que queremos agregar, en json:
               data: {
                   nombre: nombre,
                   numcolegiado: numcolegiado,
                   clinicas: clinicas
               },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
                   $.growl.error({
            	// colocando el mensaje top centre ...
                    location: "tc",
                    message: "Error al añadir los datos del doctor." + error
                });
               },
               success: function(data) {
               	if (data[0].estado == 0) {
                    var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
                    $mitabla.fnDraw();
                    $.growl({
                        title: "Exito!",
                        // colocando el mensaje top centre ...
                        location: "tc",
                        size: "large",
                        style: "notice",
                        message: "Doctor añadido correctamente!!"
                    });
                } else {
                    $.growl.error({
                        // colocando el mensaje top centre ...
                        location: "tc",
                        message: "Error al añadir los datos del doctor." + data[0].mensaje
                    });
                } 
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });
	    },
	    errorPlacement: function(error, element){
	    	error.appendTo.next("span").append();
	    }

    });

	//validacion del formulario de editar Doctor
	var formularioE = $('#formularioE').validate({
	    focusCleanup: true,    //quita los errores al entrar en los campos de nuevo
	    rules: {
	        nombreE: {
	            required: true,
	            lettersonly: true
        	},
        	numcolegiadoE: {
        		digits: true
        	},
        	'clinicasE[]': {
        		required: true,
        		minlenght: 1
        	}
        },
        messages: {
	        numcolegiadoE: {
	            digits: "El numero de colegiado debe tener digitos."
	        },
	        clinicasE: "Selecciona al menos una clínica."
    	},  //fin messages
	    submitHandler: function() {
	    	$("#bGuardarE").attr("disabled", false);
	    }
    });

	// metodo para validar campos con lettersonly
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z ñáéíóú]+$/i.test(value);
	}, "El nombre solo puede contener letras.");

	// multiselect de jquery-ui para seleccionar varias clinicas
/*	$("#clinicasE").multiselect({
	   header: "Elige una clínica"
	});
	$("#clinicasN").multiselect({
	   header: "Elige una clínica"
	});*/
$("nuevoG").button();
	// ventana tipo dialog de jquery-ui para agregar doctores
    var ventanaDialogo = $("#formuNuevo").dialog({
		autoOpen: false,
		modal: true,
		width: 700,
		height: 500,
		resizable: false,
		position: { my: "center", at: "center", of: window },
		show: {
			effect: "blind",   // efecto al abrir la ventana dialog
			duration: 400
		},
		hide: {
			effect: "fade",     // efecto al cerrar la ventana dialog
			duration: 800
		},
		
	/*	buttons: {
			"Guardar": function () {  
			// aquí codigo para guardar los datos
			
            	var clinicas = $("#clinicasN").val();
            	var nombre = $("#nombreN").val();
            	var numcolegiado = $("#numcolegiadoN").val();
          
	           $.ajax({
	               type: 'POST',
	               dataType: 'json',
	               url: 'php/nuevo_doctor.php',
	               //estos son los datos que queremos agregar, en json:
	               data: {
	                   nombre: nombre,
	                   numcolegiado: numcolegiado,
	                   clinicas: clinicas
	               },
	               error: function(xhr, status, error) {
	                   //mostraríamos alguna ventana de alerta con el error
	                   $.growl.error({
                	// colocando el mensaje top centre ...
	                    location: "tc",
	                    message: "Error al añadir los datos del doctor." + error
	                });
	               },
	               success: function(data) {
	               	if (data[0].estado == 0) {
	                    var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
	                    $mitabla.fnDraw();
	                    $.growl({
	                        title: "Exito!",
	                        // colocando el mensaje top centre ...
	                        location: "tc",
	                        size: "large",
	                        style: "notice",
	                        message: "Doctor añadido correctamente!!"
	                    });
	                } else {
	                    $.growl.error({
	                        // colocando el mensaje top centre ...
	                        location: "tc",
	                        message: "Error al añadir los datos del doctor." + data[0].mensaje
	                    });
	                } 
	               },
	               complete: {
	                   //si queremos hacer algo al terminar la petición ajax
	               }
	           });
				$(this).dialog("close");
			},
			"Cancelar": function () {
				$(this).dialog("close");
				aform.resetForm();
			}
		},*/
		buttons:[
		/*{
		 //	id: "bGuardarN",
		 	text: "Guardar",
		 	//disabled: true,
		 	//click: $.noop,
            type: "submit",
            form: "formularioN",
            click: function(){
		 		$("#formularioN").submit();
		 	}
		 }, */
		 {
		 	id: "bCancelarN",
		 	text: "Cancelar",
		 	click:  function () {
				$(this).dialog("close");
				aform.resetForm();
			}
		 }],
		open: function(event, ui) {   
		// al abrir al ventana dialog se limpian los campos y se cargan las clinicas
		//	$(this).find("[type=submit]").hide();
        	$('#nombreN').val('');
        	$('#numcolegiadoN').val('');
        	//$('#clinicasN').multiselect('deselect_all');
        	$('#clinicasN option').removeAttr("selected");
        	$('#clinicasN').load("php/cargar_clinicas.php");
		},
		close: function() {
		}
	});

    // ventana tipo dialog de jquery-ui para modificar doctores
    var ventanaDialogo = $("#formuEditar").dialog({
		autoOpen: false,
		modal: true,
		width: 700,
		height: 400,
		resizable: false,
		position: { my: "center", at: "center", of: window },
		show: {
			effect: "blind",
			duration: 400
		},
		hide: {
			effect: "fade",
			duration: 800
		},
		buttons:[{
		 	id: "bGuardarE",
		 	text: "Guardar",
		 	//disabled: true,
		 	click: function(){
		 		// aquí codigo para guardar los datos
				var idDoctor = $("#id_DoctorE").html();
            	var clinicas = $("#clinicasE").val();
            	var nombre = $("#nombreE").val();
            	var numcolegiado = $("#numcolegiadoE").val();

	           $.ajax({
	               type: 'POST',
	               dataType: 'json',
	               url: 'php/editar.php',
	               //estos son los datos que queremos actualizar, en json:
	               data: {
	                   id_doctor: idDoctor,
	                   nombre: nombre,
	                   numcolegiado: numcolegiado,
	                   clinicas: clinicas
	               },
	               error: function(xhr, status, error) {
	                   //mostraríamos alguna ventana de alerta con el error
	                   $.growl.error({
                	// colocando el mensaje top centre ...
	                    location: "tc",
	                    message: "Error al modificar datos del doctor." + error
	                });
	               },
	               success: function(data) {
	               	if (data[0].estado == 0) {
	                    var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
	                    $mitabla.fnDraw();
	                    $.growl({
	                        title: "Exito!",
	                        // colocando el mensaje top centre ...
	                        location: "tc",
	                        size: "large",
	                        style: "notice",
	                        message: "Doctor modificado correctamente!!"
	                    });
	                    var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
	                    $mitabla.fnDraw();
	                } else {
	                    $.growl.error({
	                        // colocando el mensaje top centre ...
	                        location: "tc",
	                        message: "Error al modificar datos del doctor." + data[0].mensaje
	                    });
	                } 
	               },
	               complete: {
	                   //si queremos hacer algo al terminar la petición ajax
	               }
	           });
			  $(this).dialog("close");
			}
		 }, 
		 {
		 	id: "bCancelarE",
		 	text: "Cancelar",
		 	click:  function () {
				$(this).dialog("close");
			}
		 }],
		//},
		open: function(event, ui) { 
			// al abrir la ventana dialog se llenan los campos del formulario
			var nRow = $("#miTabla").parents('tr')[0];
        	var aData = listaTabla.row(nRow).data();
        	var clinicasOn = aData.clinica;
            var clinicasActivas = clinicasOn.split(',');
			$('#clinicasE').load("php/cargar_clinicas.php", {
				'clinicas': clinicasActivas
			});
        	$('#id_doctorE').html(aData.id_doctor);
	        $('#nombreE').val(aData.nombre);
	        $('#numcolegiadoE').val(aData.numcolegiado);
	        
		},
		close: function() {
		}
	});

    // ventana dialog para Borrar doctor
	var ventanaBorrar = $("#modalBorrar").dialog({
		autoOpen: false,
		modal: true,
		width: 500,
		height: 200,
		resizable: false,
		position: { my: "center", at: "center", of: window },
		show: {
			effect: "blind",
			duration: 400
		},
		hide: {
			effect: "fade",
			duration: 800
		},
		buttons: {
			"Borrar": function () {
			// aquí codigo para borrar el doctor
			//var nRow = $("#miTabla").parents('tr')[0];
        	//var aData = listaTabla.row(nRow).data();
        	
    		var nomDoctor = $('#dborrar').html();
    		//var idDoctor = aData.id_doctor;
    		var idDoctor = $('#doctorB').html();  // este elemento está oculto en la ventana
    		console.log("doctor a borrar "+idDoctor);
    		// se llama via ajax al fichero borrar.php para borrar el doctor
			$.ajax({
				url: 'php/borrar.php',
               	type: 'POST',
               	dataType: 'json',
               //estos son los datos que queremos actualizar, en json:
               data: {
                    id_doctor: idDoctor
               },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
                   $.growl.error({
                	// colocando el mensaje top centre ...
	                    location: "tc",
	                    message: "Error al borrar el doctor." + error
	                });
               },
               success: function(data) {
                   //obtenemos el mensaje del servidor, es un array!!!
                   //var mensaje = (data["mensaje"]) //o data[0], en función del tipo de array!!
                   //actualizamos datatables:
                   /*para volver a pedir vía ajax los datos de la tabla*/
                   if (data[0].estado == 0) {
	                    var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
	                    $mitabla.fnDraw();
	                    $.growl({
	                        title: "Exito!",
	                        // colocando el mensaje top centre ...
	                        location: "tc",
	                        size: "large",
	                        style: "notice",
	                        message: "Doctor borrado correctamente!!"
	                    });
	                  
	                } else {
	                    $.growl.error({
	                        // colocando el mensaje top centre ...
	                        location: "tc",
	                        message: "Error al borrar el doctor." + data[0].mensaje
	                    });
	                }
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
			// al abrir la ventana se muestra el nombre del doctor a borrar
			var nRow = $("#miTabla").parents('tr')[0];
        	var aData = listaTabla.row(nRow).data();
        	$('#dborrar').html(aData.nombre);
        	$('#doctorB').html(aData.id_doctor);
		} 
	});

	// pulsacion del boton nuevo doctor
	$("#bnuevo").button().click(function (e) {
		e.preventDefault();
		//$('#clinicasN').multiselect('deselect_all');
      	$('#clinicasN option').removeAttr("selected");
        $('#clinicasN').load("php/cargar_clinicas.php");
		$('#formuNuevo').dialog("option", "title", "Añadir Doctor");
		$('#formuNuevo').dialog("open");
	});

	//pulsacion boton Repositorio Github
	$('#brepositorio').button({
		icons: {
      		primary: 'ui-icon ui-icon-newwin'
   		}
	}).click(function(e){
		e.preventDefault();
   		location.href='https://github.com/andrearaq/practica-ajax-datatables';
	});

	// aplica formato boton al button Editar Doctor
	$("#beditar").button();
	//pulsacion del boton editar doctor
	$('#miTabla').on('click', '#beditar', function (e) {
		e.preventDefault();
		var nRow = $(this).parents('tr')[0];
        var aData = listaTabla.row(nRow).data();
        var clinicasOn = aData.clinica;
        var clinicasActivas = clinicasOn.split(',');
		$('#clinicasE').load("php/cargar_clinicas.php", {
			'clinicas': clinicasActivas
		});
		$('#id_doctorE').html(aData.id_doctor);
        $('#nombreE').val(aData.nombre);
        $('#numcolegiadoE').val(aData.numcolegiado);
     
		$('#formuEditar').dialog("option", "title", "Modificar Doctor");
		$("#formuEditar").dialog("open");
	});

	// pulsacion de un nombre de Doctor
	$('#miTabla').on('click', '.nomdoctor', function (e) {
		e.preventDefault();
		var nRow = $(this).parents('tr')[0];
        var aData = listaTabla.row(nRow).data();
		var clinicasOn = aData.clinica;
        var clinicasActivas = clinicasOn.split(',');
		$('#clinicasE').load("php/cargar_clinicas.php", {
			'clinicas': clinicasActivas
		});
        $('#nombreE').val(aData.nombre);
        $('#numcolegiadoE').val(aData.numcolegiado);
		$('#formuEditar').dialog("option", "title", "Modificar Doctor");
		$("#formuEditar").dialog("open");
	});

	// aplicar formato de botón al button Borrar Doctor
	$("#bborrar").button();
	// pulsacion del botón Borrar doctor
	$('#miTabla').on('click', '#bborrar', function (e) {
		e.preventDefault();
		var nRow = $(this).parents('tr')[0];
        var aData = listaTabla.row(nRow).data();
        $('#dborrar').html(aData.nombre);
        $('#doctorB').html(aData.id_doctor);
		$('#modalBorrar').dialog("option", "title", "Borrar Doctor");
		$("#modalBorrar").dialog("open");
	});

});