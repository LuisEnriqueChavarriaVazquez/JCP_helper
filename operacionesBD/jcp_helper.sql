drop database jcp_helper_db;
create database if not exists jcp_helper_db;
use jcp_helper_db;

create table Alumnos(
 IDAlumno int not null auto_increment,
 Nombre varchar(60),
 Alias varchar(60) ,
 Foto varchar(100),
 correo varchar(100),
 contra varchar(100),
 area varchar(60),
 escuela varchar (100),
 descripcion varchar(100),
 primary key (IDAlumno)
);

create table Docentes(
IDDocente int not null auto_increment,
Nombre varchar(60),
 Alias varchar(60) ,
 Foto varchar(100),
 correo varchar(100),
 contra varchar(100),
 unidad_academica varchar (100),
 descripcion varchar(100),
  primary key (IDDocente)
);

create table Cuestionarios(
IDCuestionario int not null auto_increment,
Titulo varchar(100),
Fecha datetime,
Autor varchar(60),
Temas varchar (60),
Tipo varchar(60),
Lenguaje varchar(60),
Preguntas text,
primary key (IDCuestionario)
);

create table Notificaciones_Alumno(
 IDAlumno int not null,
 IDNotificacion_Alumno int not null,
 Texto varchar(100),
 primary key (IDAlumno,IDNotificacion_Alumno),
 foreign key (IDAlumno) references Alumnos(IDAlumno)
);

create table Notificaciones_Docente(
 IDDocente int not null,
 IDNotificacion_Docente int not null ,
 Texto varchar(100),
 primary key (IDDocente,IDNotificacion_Docente),
 foreign key (IDDocente) references Docentes(IDDocente)
);

create table Grupos(
   IDGrupo int auto_increment not null,
   IDDocente int not null,
   Nombre varchar (60),
   Descripcion varchar(100),
   Fondo varchar (600),
   Codigo varchar (60),
   Lenguajes varchar (60),
   Temas varchar (60),
   primary key (IDGrupo),
   foreign key (IDDocente) references Docentes(IDDocente)
);


create table Alumnos_hacen_Cuestionario(
  IDCuestionario int not null,
  IDAlumno int not null,
  Resultado_general float,
  Resultado_por_tipo_pregunta varchar (100),
  Respuestas text,
  primary key (IDCuestionario,IDAlumno),
  foreign key (IDAlumno) references Alumnos(IDAlumno),
  foreign key (IDCuestionario) references Cuestionarios(IDCuestionario)
);

create table Grupos_Alumnos(
   IDDocente int not null,
   IDGrupo int not null,
  IDAlumno int not null,
   primary key (IDGrupo,IDAlumno,IDDocente),
   foreign key (IDDocente,IDGrupo) references Grupos(IDDocente,IDGrupo),
   foreign key (IDAlumno) references Alumnos(IDAlumno)
);

create table Contacto_Alumno(
   IDAlumno int not null,
   Tipo_Contacto varchar (100),
   Contacto varchar (100),
   primary key (IDAlumno ,Tipo_Contacto,Contacto),
   foreign key (IDAlumno) references Alumnos(IDAlumno)
);

create table Contacto_Docente(
   IDDocente int not null,
   Tipo_Contacto varchar (100),
   Contacto varchar (100),
   primary key (IDDocente ,Tipo_Contacto,Contacto),
   foreign key (IDDocente) references Docentes(IDDocente)
);