-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2023 a las 21:13:03
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cinelabutaca`
--
CREATE DATABASE IF NOT EXISTS `cinelabutaca` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cinelabutaca`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informacion`
--

CREATE TABLE `informacion` (
  `nombreCine` varchar(20) NOT NULL,
  `anoConstruccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `informacion`
--

INSERT INTO `informacion` (`nombreCine`, `anoConstruccion`) VALUES
('Cine La Butaca', 2005);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `idPelicula` int(11) NOT NULL,
  `nombrePelicula` varchar(40) NOT NULL,
  `duracion` double NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `descripcion` varchar(400) NOT NULL,
  `proyectadas` int(11) NOT NULL,
  `nombreSala` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`idPelicula`, `nombrePelicula`, `duracion`, `imagen`, `descripcion`, `proyectadas`, `nombreSala`) VALUES
(1, 'Avatar 2. El camino del agua', 192, '../img/Avatar_El_sentido_del_agua.jpg', 'Jake Sully y Ney\'tiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las regiones de Pandora cuando una antigua amenaza reaparece.', 1, 'Sala 1'),
(2, 'Babylon', 189, '../img/Babylon.jpg', 'La decadencia, la depravación y los excesos escandalosos provocan el ascenso y la caída de varios ambiciosos soñadores en el Hollywood de los años veinte.', 2, 'Sala 2'),
(3, 'Los renglones torcidos de Dios', 154, '../img/Los_renglones_torcidos_de_Dios.jpg', 'Alice, investigadora privada, ingresa en un hospital psiquiátrico simulando una paranoia. Su objetivo es recabar pruebas del caso en el que trabaja: la muerte de un interno en circunstancias poco claras.', 3, 'Sala 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecciones`
--

CREATE TABLE `proyecciones` (
  `idProyeccion` int(11) NOT NULL,
  `idPelicula` int(11) NOT NULL,
  `idSala` int(11) NOT NULL,
  `entradasVendidas` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `idSala` int(11) NOT NULL,
  `nombreSala` varchar(40) NOT NULL,
  `filas` int(11) NOT NULL,
  `Columnas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`idSala`, `nombreSala`, `filas`, `Columnas`) VALUES
(1, 'Sala 1', 8, 9),
(2, 'Sala 2', 8, 9),
(3, 'Sala 3', 8, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombreUsuario` varchar(40) NOT NULL,
  `passwordUsuario` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombreUsuario`, `passwordUsuario`) VALUES
('Paco', '123'),
('Celia', '1234');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
