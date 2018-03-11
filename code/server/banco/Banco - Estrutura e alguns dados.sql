CREATE DATABASE  IF NOT EXISTS `eu_parlamentar` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `eu_parlamentar`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: eu_parlamentar
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contatos`
--

DROP TABLE IF EXISTS `contatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contatos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `estado` varchar(30) NOT NULL,
  `mensagem` varchar(2000) NOT NULL,
  `data` date NOT NULL,
  `respondido` varchar(1) NOT NULL,
  `resposta` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contatos`
--

LOCK TABLES `contatos` WRITE;
/*!40000 ALTER TABLE `contatos` DISABLE KEYS */;
/*!40000 ALTER TABLE `contatos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deputados`
--

DROP TABLE IF EXISTS `deputados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deputados` (
  `id_deputado` int(5) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `partido` varchar(15) NOT NULL,
  `estado` varchar(25) NOT NULL,
  `foto` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_deputado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deputados`
--

LOCK TABLES `deputados` WRITE;
/*!40000 ALTER TABLE `deputados` DISABLE KEYS */;
/*!40000 ALTER TABLE `deputados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estados` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_ibge` varchar(4) NOT NULL,
  `sigla` char(2) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `dtm_lcto` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
/*!40000 ALTER TABLE `estados` DISABLE KEYS */;
INSERT INTO `estados` VALUES (1,'12','AC','Acre','2018-02-07 14:26:41'),(2,'27','AL','Alagoas','2018-02-07 14:26:41'),(3,'13','AM','Amazonas','2018-02-07 14:26:41'),(4,'16','AP','Amapá','2018-02-07 14:26:41'),(5,'29','BA','Bahia','2018-02-07 14:26:41'),(6,'23','CE','Ceará','2018-02-07 14:26:41'),(7,'53','DF','Distrito Federal','2018-02-07 14:26:41'),(8,'32','ES','Espírito Santo','2018-02-07 14:26:41'),(9,'52','GO','Goiás','2018-02-07 14:26:41'),(10,'21','MA','Maranhão','2018-02-07 14:26:41'),(11,'31','MG','Minas Gerais','2018-02-07 14:26:41'),(12,'50','MS','Mato Grosso do Sul','2018-02-07 14:26:41'),(13,'51','MT','Mato Grosso','2018-02-07 14:26:42'),(14,'15','PA','Pará','2018-02-07 14:26:42'),(15,'25','PB','Paraíba','2018-02-07 14:26:42'),(16,'26','PE','Pernambuco','2018-02-07 14:26:42'),(17,'22','PI','Piauí','2018-02-07 14:26:42'),(18,'41','PR','Paraná','2018-02-07 14:26:42'),(19,'33','RJ','Rio de Janeiro','2018-02-07 14:26:42'),(20,'24','RN','Rio Grande do Norte','2018-02-07 14:26:42'),(21,'11','RO','Rondônia','2018-02-07 14:26:42'),(22,'14','RR','Roraima','2018-02-07 14:26:42'),(23,'43','RS','Rio Grande do Sul','2018-02-07 14:26:42'),(24,'42','SC','Santa Catarina','2018-02-07 14:26:42'),(25,'28','SE','Sergipe','2018-02-07 14:26:42'),(26,'35','SP','São Paulo','2018-02-07 14:26:42'),(27,'17','TO','Tocantins','2018-02-07 14:26:42');
/*!40000 ALTER TABLE `estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico`
--

DROP TABLE IF EXISTS `historico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_deputado` int(11) NOT NULL,
  `partido` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico`
--

LOCK TABLES `historico` WRITE;
/*!40000 ALTER TABLE `historico` DISABLE KEYS */;
/*!40000 ALTER TABLE `historico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opinioes`
--

DROP TABLE IF EXISTS `opinioes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opinioes` (
  `id_quest` int(3) NOT NULL,
  `id_usuar` int(12) NOT NULL,
  `id_estad` int(3) NOT NULL,
  `opiniao` varchar(20) NOT NULL,
  `data` datetime NOT NULL,
  KEY `fk_opinioes_1_idx` (`id_quest`),
  KEY `fk_opinioes_2_idx` (`id_usuar`),
  KEY `fk_opinioes_3_idx` (`id_estad`),
  CONSTRAINT `fk_opinioes_1` FOREIGN KEY (`id_quest`) REFERENCES `questoes` (`id_questao`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_opinioes_2` FOREIGN KEY (`id_usuar`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_opinioes_3` FOREIGN KEY (`id_estad`) REFERENCES `estados` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opinioes`
--

LOCK TABLES `opinioes` WRITE;
/*!40000 ALTER TABLE `opinioes` DISABLE KEYS */;
/*!40000 ALTER TABLE `opinioes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questoes`
--

DROP TABLE IF EXISTS `questoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questoes` (
  `id_questao` int(3) NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `pergunta` varchar(500) NOT NULL,
  `link` varchar(300) NOT NULL,
  `resumo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_questao`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questoes`
--

LOCK TABLES `questoes` WRITE;
/*!40000 ALTER TABLE `questoes` DISABLE KEYS */;
INSERT INTO `questoes` VALUES (1,'2015-06-10','PEC 182/2007','Você é a favor do voto facultativo para todas as idades? (fim do voto obrigatório).','http://bit.ly/EP_Voto','Fim do voto obrigatório'),(2,'2015-08-19','PEC 171/1993','Você reduziria a maioridade penal, de 18 para 16 anos, nos casos de crimes hediondos (estupro e latrocínio) e também para homicídio doloso e lesão corporal seguida de morte?','http://bit.ly/EP_Maioridade','Redução da maioridade penal'),(3,'2015-09-09','PL 5735/13','Dentro da minirreforma eleitoral, deve ser proibido os partidos políticos receberem doações de empresas e pessoas físicas?','http://bit.ly/EP_Doacao','Proibir doações a partidos'),(4,'2016-04-17','DCR 1/2015','Na sua opinião, a presidente Dilma Roussef deve ser afastada do cargo para investigação de possível crime de responsabilidade em seu mandato?','http://bit.ly/EP_Dilma','Afastamento de Dilma'),(5,'2016-09-12','REP 1/2015','O mandato do ex-presidente da Câmara, Eduardo Cunha, deve ser cassado por ter mentido em depoimento à CPI da Petrobras, quando disse não possuir contas no exterior?','http://bit.ly/EP_Cunha','Cassar mandato de Cunha'),(6,'2016-10-25','PEC 241/2016','Você concorda com a PEC 241 (Teto dos Gastos Públicos), onde estabelece um limite para os gastos federais para os próximos 20 anos, a fim de recuperar a economia?','http://bit.ly/EP_Teto','Teto dos gastos públicos'),(7,'2017-03-22','PL 4302/1998','Você apoia o uso da terceirização em todas as áreas (atividade-fim e atividade-meio) das empresas?','http://bit.ly/EP_Terceirizacao','Terceirização em qualquer área'),(8,'2017-03-29','PEC 395/14','Você autoriza universidades públicas e institutos federais a cobrar por cursos de extensão e pós-graduação lato sensu (especializações)?','http://bit.ly/EP_Ensino','Especializações pagas'),(9,'2017-04-26','PL 6787/16','Você apoia o projeto de lei da reforma trabalhista (PL 6787/16), onde altera a Consolidação das Leis do Trabalho (CLT) para prever, entre outras medidas, a prevalência do acordo sobre a lei, regras para o trabalho intermitente e o fim da contribuição sindical obrigatória?','http://bit.ly/EP_Trabalhista','Reforma trabalhista'),(10,'2017-10-25','SIP 2/2017','Você é a favor do arquivamento da denúncia contra o presidente da República, Michel Temer, por organização criminosa e obstrução da Justiça?','http://bit.ly/EP_MTemer','Arquivar investigação Temer');
/*!40000 ALTER TABLE `questoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(12) NOT NULL AUTO_INCREMENT,
  `uid` varchar(40) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `foto` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data` date NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votos`
--

DROP TABLE IF EXISTS `votos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `votos` (
  `id_quest` int(3) NOT NULL,
  `id_deput` int(5) NOT NULL,
  `voto` varchar(20) NOT NULL,
  KEY `fk_votos_1_idx` (`id_quest`),
  KEY `fk_votos_2_idx` (`id_deput`),
  CONSTRAINT `fk_votos_1` FOREIGN KEY (`id_quest`) REFERENCES `questoes` (`id_questao`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_votos_2` FOREIGN KEY (`id_deput`) REFERENCES `deputados` (`id_deputado`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votos`
--

LOCK TABLES `votos` WRITE;
/*!40000 ALTER TABLE `votos` DISABLE KEYS */;
/*!40000 ALTER TABLE `votos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-06 17:44:59
