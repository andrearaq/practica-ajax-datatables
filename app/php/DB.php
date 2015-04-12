<?php
require_once('Clases.php');

class DB {
    
    protected static function ejecutaConsulta($sql) {
        $opc = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
        $dsn = "mysql:host=localhost;dbname=dental";
        $usuario = 'root';
        $contrasena = 'daw2014';
        
        $dwes = new PDO($dsn, $usuario, $contrasena, $opc);
        $resultado = null;
        if (isset($dwes)) $resultado = $dwes->query($sql);
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
        $sql = "INSERT id_doctor, id_clinica, numdoctor INTRO clinica_doctor ";
        $sql.= "VALUES (?, ?, ?);";
        
        $resultado = self::ejecutaConsulta($sql);
        if(isset($resultado)) {
            
	}
    }
    
    public static function cargarClinicas(){
        $sql = "SELECT id_clinica, nombre FROM clinicas;";
        $resultado = self::ejecutarConsulta($sql);
        $clinicas = array();
        
        if (isset($resultado)){
            $row = $resultado->fetch();
            while ($row != null) {
                $clinicas[] = $row;
                $row = $resultado->fetch();
            }
        }
        return $clinicas;
    }
}

?>
