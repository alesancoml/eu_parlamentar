-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: eu_parlamentar
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.29-MariaDB

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
-- Dumping data for table `questoes`
--

LOCK TABLES `questoes` WRITE;
/*!40000 ALTER TABLE `questoes` DISABLE KEYS */;
INSERT INTO `questoes` VALUES (1,'2015-09-09','PL 5735/13','Dentro da minirreforma eleitoral, deve ser proibido os partidos políticos receberem doações de empresas e pessoas físicas?','http://bit.ly/EP_Doacao','Proibir doações a partidos'),(2,'2016-04-17','DCR 1/2015','Na sua opinião, a presidente Dilma Roussef deve ser afastada do cargo para investigação de possível crime de responsabilidade em seu mandato?','http://bit.ly/EP_Dilma','Afastamento de Dilma'),(3,'2016-09-12','REP 1/2015','O mandato do ex-presidente da Câmara, Eduardo Cunha, deve ser cassado por ter mentido em depoimento à CPI da Petrobras, quando disse não possuir contas no exterior?','http://bit.ly/EP_Cunha','Cassar mandato de Cunha'),(4,'2016-10-25','PEC 241/2016','Você concorda com a PEC 241 (Teto dos Gastos Públicos), onde estabelece um limite para os gastos federais para os próximos 20 anos, a fim de recuperar a economia?','http://bit.ly/EP_Teto','Teto dos gastos públicos'),(5,'2017-03-22','PL 4302/1998','Você apoia o uso da terceirização em todas as áreas (atividade-fim e atividade-meio) das empresas?','http://bit.ly/EP_Terceirizacao','Terceirização em qualquer área'),(6,'2017-03-29','PEC 395/14','Você autoriza universidades públicas e institutos federais a cobrar por cursos de extensão e pós-graduação lato sensu (especializações)?','http://bit.ly/EP_Ensino','Especializações pagas'),(7,'2017-04-26','PL 6787/16','Você apoia o projeto de lei da reforma trabalhista (PL 6787/16), onde altera a Consolidação das Leis do Trabalho (CLT) para prever, entre outras medidas, a prevalência do acordo sobre a lei, regras para o trabalho intermitente e o fim da contribuição sindical obrigatória?','http://bit.ly/EP_Trabalhista','Reforma trabalhista'),(8,'2017-10-25','SIP 2/2017','Você é a favor do arquivamento da denúncia contra o presidente da República, Michel Temer, por organização criminosa e obstrução da Justiça?','http://bit.ly/EP_MTemer','Arquivar investigação Temer');
/*!40000 ALTER TABLE `questoes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-20 19:57:22
