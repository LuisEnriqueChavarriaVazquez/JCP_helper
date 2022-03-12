-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-03-2022 a las 00:43:44
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.3.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jcp_helper`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `idA` int(11) NOT NULL,
  `nombreA` varchar(150) NOT NULL,
  `aliasA` varchar(100) NOT NULL,
  `fotoA` blob NOT NULL,
  `correoA` varchar(100) NOT NULL,
  `passwordA` varchar(100) NOT NULL,
  `es_proc` varchar(150) NOT NULL,
  `grupo` varchar(10) DEFAULT NULL,
  `desc_alum` varchar(200) DEFAULT NULL,
  `area_esp_a` varchar(100) DEFAULT NULL,
  `correoA_alt` varchar(100) DEFAULT NULL,
  `linkedinA` varchar(150) DEFAULT NULL,
  `facebookA` varchar(150) DEFAULT NULL,
  `instagramA` varchar(150) DEFAULT NULL,
  `vkA` varchar(150) DEFAULT NULL,
  `telefonoA` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuestionarios`
--

CREATE TABLE `cuestionarios` (
  `idC` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `fecha` varchar(150) NOT NULL,
  `autor` varchar(150) NOT NULL,
  `temas` varchar(200) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `lenguaje` varchar(10) NOT NULL,
  `opciones` varchar(400) NOT NULL,
  `respuesta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `idG` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(150) NOT NULL,
  `Fondo` blob NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `lenguajes` varchar(100) NOT NULL,
  `temas` varchar(450) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `idN` int(11) NOT NULL,
  `texto` varchar(300) NOT NULL,
  `fecha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `idP` int(11) NOT NULL,
  `nombreP` varchar(150) NOT NULL,
  `aliasP` varchar(100) DEFAULT NULL,
  `fotoP` blob NOT NULL,
  `correoP` varchar(100) NOT NULL,
  `passwordP` varchar(100) NOT NULL,
  `correoP_alt` varchar(100) DEFAULT NULL,
  `linkedinP` varchar(150) DEFAULT NULL,
  `facebookP` varchar(150) DEFAULT NULL,
  `instagramP` varchar(150) DEFAULT NULL,
  `vkP` varchar(150) DEFAULT NULL,
  `telefonoP` varchar(20) DEFAULT NULL,
  `unidad_ac` varchar(100) NOT NULL,
  `desc_perfil_p` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idA`);

--
-- Indices de la tabla `cuestionarios`
--
ALTER TABLE `cuestionarios`
  ADD PRIMARY KEY (`idC`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`idG`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`idN`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`idP`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `idA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuestionarios`
--
ALTER TABLE `cuestionarios`
  MODIFY `idC` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `grupos`
--
ALTER TABLE `grupos`
  MODIFY `idG` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `idN` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `idP` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
