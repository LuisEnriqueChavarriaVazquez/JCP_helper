drop database jcp_helper_db;
create database if not exists jcp_helper_db;
use jcp_helper_db;

--Para los alumnos
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
 fondo varchar(800),
 primary key (IDAlumno)
);

--Para los docente
create table Docentes(
IDDocente int not null auto_increment,
Nombre varchar(60),
 Alias varchar(60) ,
 Foto varchar(100),
 correo varchar(100),
 contra varchar(100),
 unidad_academica varchar (100),
 descripcion varchar(100),
 fondo varchar(800),
 primary key (IDDocente)
);

--Para los grupos
create table Grupos(
   IDGrupo int auto_increment not null,
   IDDocente int not null,
   Nombre varchar (60),
   Descripcion varchar(100),
   Fondo varchar (800),
   Codigo varchar (60),
   Lenguajes varchar (60),
   Temas varchar (60),
   primary key (IDGrupo),
   foreign key (IDDocente) references Docentes(IDDocente) ON DELETE CASCADE
);

--Para la data de los cuestionario
create table Cuestionarios(
IDCuestionario int not null auto_increment,
IDGrupo int not null,
IDDocente int not null,
Titulo varchar(100),
Fecha varchar(100),
Autor varchar(60),
Temas varchar (60),
Tipo varchar(60),
Lenguaje varchar(60),
Preguntas varchar(200),
Orden varchar(60),
TiempoCuentaAtras varchar(30),
FechaLimiteRespuesta varchar(30),
HoraLimiteParaResolver varchar(30),
PreviewCuestionarioRuta varchar(150),
NumeroIntentosDisponibles varchar(10),
primary key (IDCuestionario,IDGrupo,IDDocente),
foreign key (IDGrupo) references Grupos(IDGrupo) ON DELETE CASCADE,
foreign key (IDDocente) references Docentes(IDDocente) ON DELETE CASCADE
);

--Para los post dentro de la app
create table PublicacionesDocente(
IDPublicacionDocente int not null auto_increment,
IDDocente int not null,
Titulo varchar(100),
Descripcion varchar(1000),
Foto varchar(1200),
primary key (IDPublicacionDocente, IDDocente),
foreign key (IDDocente) references Docentes(IDDocente) ON DELETE CASCADE
);

create table PublicacionesAlumno(
IDPublicacionAlumno int not null auto_increment,
IDAlumno int not null,
Titulo varchar(100),
Descripcion varchar(1000),
Foto varchar(1200),
primary key (IDPublicacionAlumno, IDAlumno),
foreign key (IDAlumno) references Alumnos(IDAlumno) ON DELETE CASCADE
);

create table ComentariosRetroalimentacion(
IDComentarioRetro int not null auto_increment,
IDGrupo int not null,
IDAlumno int not null,
Comentario varchar(300),
primary key (IDComentarioRetro, IDGrupo, IDAlumno),
foreign key (IDGrupo) references Grupos(IDGrupo) ON DELETE CASCADE,
foreign key (IDAlumno) references Alumnos(IDAlumno) ON DELETE CASCADE
);

create table Notificaciones_Alumno(
 IDAlumno int not null,
 IDNotificacion_Alumno int not null,
 Texto varchar(100),
 primary key (IDAlumno,IDNotificacion_Alumno),
 foreign key (IDAlumno) references Alumnos(IDAlumno) ON DELETE CASCADE
);

create table Notificaciones_Docente(
 IDDocente int not null,
 IDNotificacion_Docente int not null,
 Texto varchar(100),
 primary key (IDDocente,IDNotificacion_Docente),
 foreign key (IDDocente) references Docentes(IDDocente) ON DELETE CASCADE
);

create table Alumnos_hacen_Cuestionario(
  IDCuestionarioHecho varchar(50) not null,
  IDCuestionario int not null,
  IDAlumno int not null,
  Caducidad_cuestionario varchar(100),
  Revision_estado varchar(100),
  Aprobacion_estado varchar(20),
  Promedio_general varchar(50),
  Puntaje_general varchar(50),
  Puntaje_segmentado varchar(200),
  Tiempo_respuestas varchar(20),
  Ruta_resultados varchar (200),
  Numero_intentos varchar (10),
  Retraso_estado varchar (20),
  primary key (IDCuestionarioHecho, IDCuestionario,IDAlumno),
  foreign key (IDAlumno) references Alumnos(IDAlumno) ON DELETE CASCADE,
  foreign key (IDCuestionario) references Cuestionarios(IDCuestionario) ON DELETE CASCADE
);

create table Grupos_Alumnos(
   IDDocente int not null,
   IDGrupo int not null,
   IDAlumno int not null,
   primary key (IDGrupo,IDAlumno,IDDocente),
   foreign key (IDDocente,IDGrupo) references Grupos(IDDocente,IDGrupo) ON DELETE CASCADE,
   foreign key (IDAlumno) references Alumnos(IDAlumno) ON DELETE CASCADE
);

create table Contacto_Alumno(
   IDAlumno int not null,
   Tipo_Contacto varchar (100),
   Contacto varchar (100),
   primary key (IDAlumno ,Tipo_Contacto,Contacto),
   foreign key (IDAlumno) references Alumnos(IDAlumno) ON DELETE CASCADE
);

create table Contacto_Docente(
   IDDocente int not null,
   Tipo_Contacto varchar (100),
   Contacto varchar (100),
   primary key (IDDocente ,Tipo_Contacto,Contacto),
   foreign key (IDDocente) references Docentes(IDDocente) ON DELETE CASCADE
);

create table DocentesPoliticasPrivacidad(
IDPolitica int not null auto_increment,
IDDocente int not null,
Estado varchar(15),
primary key (IDPolitica,IDDocente),
foreign key (IDDocente) references Docentes(IDDocente) ON DELETE CASCADE
);