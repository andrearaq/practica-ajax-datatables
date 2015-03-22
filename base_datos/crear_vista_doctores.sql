/*orden para crear la vista de doctores*/
create view vdoctores as
select a.id_doctor, a.nombre, a.numcolegiado, group_concat(b.nombre) from doctores as a, clinicas as b,clinica_doctor as c
where a.id_doctor = c.id_doctor
and b.id_clinica = c.id_clinica
group by a.nombre
order by a.nombre;
