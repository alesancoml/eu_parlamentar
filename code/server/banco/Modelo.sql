-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema eu_parlamentar
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eu_parlamentar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eu_parlamentar` DEFAULT CHARACTER SET utf8 ;
USE `eu_parlamentar` ;

-- -----------------------------------------------------
-- Table `eu_parlamentar`.`deputados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eu_parlamentar`.`deputados` (
  `id_deputado` INT(5) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `partido` VARCHAR(15) NOT NULL,
  `estado` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`id_deputado`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eu_parlamentar`.`questoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eu_parlamentar`.`questoes` (
  `id_questao` INT(3) NOT NULL AUTO_INCREMENT,
  `data` DATE NOT NULL,
  `codigo` VARCHAR(20) NOT NULL,
  `pergunta` VARCHAR(500) NOT NULL,
  `link` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id_questao`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eu_parlamentar`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eu_parlamentar`.`usuarios` (
  `id_usuario` INT(10) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `estado_user` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eu_parlamentar`.`opinioes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eu_parlamentar`.`opinioes` (
  `id_quest` INT(3) NOT NULL,
  `id_usuar` INT(10) NOT NULL,
  `opiniao` VARCHAR(3) NOT NULL,
  `data` DATE NOT NULL,
  INDEX `fk_opinioes_1_idx` (`id_quest` ASC),
  INDEX `fk_opinioes_2_idx` (`id_usuar` ASC),
  CONSTRAINT `fk_opinioes_1`
    FOREIGN KEY (`id_quest`)
    REFERENCES `eu_parlamentar`.`questoes` (`id_questao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_opinioes_2`
    FOREIGN KEY (`id_usuar`)
    REFERENCES `eu_parlamentar`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eu_parlamentar`.`votos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eu_parlamentar`.`votos` (
  `id_quest` INT(3) NOT NULL,
  `id_deput` INT(5) NOT NULL,
  `voto` VARCHAR(20) NOT NULL,
  INDEX `fk_votos_1_idx` (`id_quest` ASC),
  INDEX `fk_votos_2_idx` (`id_deput` ASC),
  CONSTRAINT `fk_votos_1`
    FOREIGN KEY (`id_quest`)
    REFERENCES `eu_parlamentar`.`questoes` (`id_questao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_votos_2`
    FOREIGN KEY (`id_deput`)
    REFERENCES `eu_parlamentar`.`deputados` (`id_deputado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
