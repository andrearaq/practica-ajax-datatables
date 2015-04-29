<?php
/** 
 * Clase para usar la base de datos Dental - de clinicas y doctores
 * @author Andrea Gutierrez
 * @version 1.0
 */
class DB {
    /**
     * funcion que ejecuta la consulta: insert, delete o update
     * @param string $sql consulta a ejecutar
     * @return array con resultado consulta
     */
    protected static function ejecutaConsulta($sql) {
        $opc = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
        $dsn = "mysql:host=localhost;dbname=dental";
        $usuario = 'magutierrez_adm';
        $contrasena = 'admindaw2015';
       
        try {
            $dwes = new PDO($dsn, $usuario, $contrasena, $opc);
            $dwes->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $dwes->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $resultado = null;
            if (isset($dwes))
               $resultado = $dwes->query($sql);
        } 
        catch(Exception $e) {
            echo 'Exception -> ';
            var_dump($e->getMessage());
        }
        
        return $resultado;
    }
    /**
     * funcion para borrar un doctor de la tabla doctores
     * @param int $codigo id_doctor a borrar
     * @return array con resultado delete
     */
    public static function borrarDoctor($codigo) {
        $sql = "DELETE FROM doctores WHERE id_doctor=".$codigo.";";
        $resultado = self::ejecutaConsulta ($sql);
        
	    return $resultado;
    }
    /**
     * funcion para modificar los datos de un doctor
     * @param int $codigo id_doctor
     * @param string $nombre nombre doctor
     * @param string $numcolegiado numero colegiado
     * @return array resultado update
     */
    public static function editarDoctor($codigo, $nombre, $numcolegiado) { 
        
        $sql = "UPDATE doctores SET nombre= '".$nombre."', numcolegiado='".$numcolegiado."' WHERE id_doctor=".$codigo.";";

        $resultado = self::ejecutaConsulta ($sql);

    	return $resultado;           
    }
    /**
     * funcion para agregar un doctor a la tabla doctores
     * @param int $codigo id_doctor
     * @param string $nombre
     * @param string $numcolegiado
     * @return array resultado insert
     */
    public static function nuevoDoctor($codigo, $nombre, $numcolegiado) {
        
        $sql = "INSERT INTO doctores (id_doctor, nombre, numcolegiado) VALUES";
        $sql .= "(".$codigo.",'".$nombre."','".$numcolegiado."');";
        
        $resultado = self::ejecutaConsulta ($sql);
    	return $resultado;
        
    }
    /**
     * funcion para saber ultimo id_doctor
     * @return int id_doctor
     */
    public static function ultimoDoctor(){
        $sql = "SELECT MAX(id_doctor) as id_doctor FROM doctores;";
        $resultado = self::ejecutaconsulta($sql);
         if (isset($resultado)){
            while ($row = $resultado->fetch()) {
            	$id_doctor = $row['id_doctor'];
            }
            return $id_doctor;
        }
    }
    /**
     * funcion para borrar las clinicas de un doctor
     * @param int $codigo id_doctor
     * @return array resultado delete
     */
    public static function borrarClinicas($codigo) {
        $sql = "DELETE FROM clinica_doctor WHERE id_doctor=".$codigo.";";

        $resultado = self::ejecutaConsulta ($sql);
        
        return $resultado;
    }
    /**
     * funcion para agregar nuevas clinicas a la tabla clinica_doctor
     * @param int $codigo id_doctor
     * @param int $numdoctor numero doctor
     * @param int $clinica id_clinica
     * @return array resultado insert
     */
    public static function nuevaClinica($codigo, $numdoctor, $clinica){
        $sql = "INSERT INTO clinica_doctor (id_doctor, id_clinica, numdoctor) VALUES";
        $sql.= "(".$codigo.",".$clinica.",".$numdoctor.");";

        $resultado = self::ejecutaConsulta($sql);
        return $resultado;
    }
    /**
     * funcion para recuperar todas las clinicas de la tabla clinicas
     * @return array resultado select
     */
    //cargar todas las clinicas para ponerlas en el multiselect
    public static function cargarClinicas(){
        $sql = "SELECT id_clinica, nombre FROM clinicas;";
        $resultado = self::ejecutaConsulta($sql);
      
        return $resultado;
    }
}

?>
