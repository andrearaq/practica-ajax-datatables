<?php

class DB {
    //funcion que ejecuta la consulta: insert, delete o update
    protected static function ejecutaConsulta($sql) {
        $opc = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
        $dsn = "mysql:host=localhost;dbname=dental";
        $usuario = 'magutierrez_adm';
        $contrasena = 'admindaw2015';
       
        $dwes = new PDO($dsn, $usuario, $contrasena, $opc);
        $resultado = null;
        if (isset($dwes))
           $resultado = $dwes->query($sql);
        return $resultado;
    }
    //borrar un doctor
    public static function borrarDoctor($codigo) {
       // $sql = "DELETE FROM doctores WHERE id_doctor=".$codigo.";";
        $sql = "DELETE FROM doctores WHERE nombre='".$codigo."';";
        $resultado = self::ejecutaConsulta ($sql);
        
	    return $resultado;
    }
    //modificar datos de los doctores
    public static function editarDoctor($nombre, $numcolegiado, $codigo) { 
        
        $sql = "UPDATE doctores SET
                nombre = '".$nombre ."',
                numcolegiado = ".$numcolegiado ."
                WHERE id_doctor= ". $codigo.";";
        $resultado = self::ejecutaConsulta ($sql);

    	return $resultado;           
    }
    // insertar nuevo doctor
    public static function nuevoDoctor($codigo, $nombre, $numcolegiado) {
        
        $sql = "INSERT INTO doctores (id_doctor, nombre, numcolegiado) VALUES";
        $sql .= "(".$codigo.",'".$nombre."',".$numcolegiado.");";
        
        $resultado = self::ejecutaConsulta ($sql);
    	return $resultado;
        
    }
    // borrar las clinicas de un doctor
    public static function borrarClinicas($codigo) {
        $sql = "DELETE FROM clinica_doctor WHERE id_doctor=".$codigo.";";

        $resultado = self::ejecutaConsulta ($sql);
        
        return $resultado;
    }
    // insertar nueva clinica
    public static function nuevaClinica($codigo, $numdoctor, $clinica){
        $sql = "INSERT INTO clinica_doctor (id_doctor, id_clinica, numdoctor) VALUES";
        $sql.= "(".$codigo.",".$clinica.",".$numdoctor.");";

        $resultado = self::ejecutaConsulta($sql);
        return $resultado;
    }
    //cargar todas las clinicas para ponerlas en el multiselect
    public static function cargarClinicas(){
        $sql = "SELECT id_clinica, nombre FROM clinicas;";
        $resultado = self::ejecutaConsulta($sql);
      
        return $resultado;
    }
}

?>
