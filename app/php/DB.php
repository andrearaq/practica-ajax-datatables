<?php
require_once('Clases.php');

class DB {
    
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

    public static function borrarDoctor($codigo) {
        $sql = "DELETE FROM doctores WHERE id_doctor='".$codigo."';";
        $resultado = self::ejecutaConsulta ($sql);
        
	    return $resultado;
    }
    
    public static function editarDoctor($datos) { 
        
        $sql = "UPDATE doctores SET
                nombre = '".$nombre ."',
                numcolegiado = '".$numcolegiado ."'
                WHERE id_doctor=" . $codigo;
        $resultado = self::ejecutaConsulta ($sql);

    	if(isset($resultado)) {
                
    	}
        
           
    }
     
    public static function nuevoDoctor($codigo) {
        
        $sql = "INSERT id_doctor, nombre, numcolegiado INTO doctores VALUES (?,?,?);";
        
        $resultado = self::ejecutaConsulta ($sql);
        

    	if(isset($resultado)) {
                
    	}
        
    }
    
    public static function nuevaClinica($datos){
        $sql = "INSERT id_doctor, id_clinica, numdoctor INTO clinica_doctor ";
        $sql.= "VALUES (?, ?, ?);";
        
        $resultado = self::ejecutaConsulta($sql);
        if(isset($resultado)) {
            
	    }
    }
    
    public static function cargarClinicas(){
        $sql = "SELECT id_clinica, nombre FROM clinicas;";
        $resultado = self::ejecutaConsulta($sql);
      
        return $resultado;
    }
}

?>
