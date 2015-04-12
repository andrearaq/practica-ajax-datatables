<?php

/* 
 * Clases de las tablas de la base de datos de la clinica Dental
 */

class Doctor {
    protected $id_doctor;
    protected $nombre;
    protected $numcolegiado;
    
    public function getidDoctor() {return $this->id_doctor; }
    public function getnombre() {return $this->nombre; }
    public function getnumcolegiado() {return $this->numcolegiado; }
    
    public function __construct($row) {
        $this->id_doctor = $row['id'];
        $this->nombre = $row['nombre'];
        $this->numcolegiado = $row['ncol'];
    }
}