-- MySQL dump 10.13  Distrib 5.5.35, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: juventus
-- ------------------------------------------------------
-- Server version	5.5.35-0ubuntu0.12.04.2

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
-- Table structure for table `groupplayer`
--

DROP TABLE IF EXISTS `groupplayer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groupplayer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `grouptable_id` bigint(20) DEFAULT NULL,
  `player_id` bigint(20) DEFAULT NULL,
  `score` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_groupmember_grouptable1` (`grouptable_id`),
  KEY `fk_groupmember_player1` (`player_id`),
  CONSTRAINT `fk_groupmember_grouptable1` FOREIGN KEY (`grouptable_id`) REFERENCES `grouptable` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_groupmember_player1` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupplayer`
--

LOCK TABLES `groupplayer` WRITE;
/*!40000 ALTER TABLE `groupplayer` DISABLE KEYS */;
INSERT INTO `groupplayer` VALUES (4,2,2,0),(5,2,3,0),(6,2,7,0),(18,4,12,0),(19,4,13,0),(20,4,14,0),(25,3,8,0),(26,3,9,0),(27,3,10,0),(37,1,1,21),(38,1,5,1),(39,1,6,0),(40,1,8,1),(41,1,9,0),(42,1,10,0),(43,1,11,0),(44,1,12,1);
/*!40000 ALTER TABLE `groupplayer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grouptable`
--

DROP TABLE IF EXISTS `grouptable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grouptable` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `league_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_group_league1` (`league_id`),
  CONSTRAINT `fk_group_league1` FOREIGN KEY (`league_id`) REFERENCES `league` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grouptable`
--

LOCK TABLES `grouptable` WRITE;
/*!40000 ALTER TABLE `grouptable` DISABLE KEYS */;
INSERT INTO `grouptable` VALUES (1,'A',1),(2,'B',1),(3,'C',1),(4,'D',1);
/*!40000 ALTER TABLE `grouptable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `league`
--

DROP TABLE IF EXISTS `league`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `league` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `mode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `league`
--

LOCK TABLES `league` WRITE;
/*!40000 ALTER TABLE `league` DISABLE KEYS */;
INSERT INTO `league` VALUES (1,'1234','Active','double'),(2,'1345','Active','double');
/*!40000 ALTER TABLE `league` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchlist`
--

DROP TABLE IF EXISTS `matchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matchlist` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `homeplayername` varchar(45) DEFAULT NULL,
  `awayplayername` varchar(45) DEFAULT NULL,
  `homescore` int(11) DEFAULT '-1',
  `awayscore` int(11) DEFAULT '-1',
  `discription` varchar(255) DEFAULT NULL,
  `league_id` bigint(20) DEFAULT NULL,
  `homeplayerid` bigint(20) DEFAULT NULL,
  `awayplayerid` bigint(20) DEFAULT NULL,
  `grouptable_id` bigint(20) DEFAULT NULL,
  `updatetime` timestamp NULL DEFAULT NULL,
  `homegetscore` int(11) DEFAULT '0',
  `awaygetscore` int(11) DEFAULT '0',
  `homegetgoal` int(11) DEFAULT '0',
  `awaygetgoal` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_matchlist_league` (`league_id`),
  KEY `fk_matchlist_grouptable1` (`grouptable_id`),
  CONSTRAINT `fk_matchlist_league` FOREIGN KEY (`league_id`) REFERENCES `league` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_matchlist_grouptable1` FOREIGN KEY (`grouptable_id`) REFERENCES `grouptable` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=475 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchlist`
--

LOCK TABLES `matchlist` WRITE;
/*!40000 ALTER TABLE `matchlist` DISABLE KEYS */;
INSERT INTO `matchlist` VALUES (401,'下次随机','下次方法',-1,-1,NULL,1,12,13,4,NULL,0,0,0,0),(402,'下次随机','官方额',-1,-1,NULL,1,12,14,4,NULL,0,0,0,0),(403,'下次方法','下次随机',-1,-1,NULL,1,13,12,4,NULL,0,0,0,0),(404,'下次方法','官方额',-1,-1,NULL,1,13,14,4,NULL,0,0,0,0),(405,'官方额','下次随机',-1,-1,NULL,1,14,12,4,NULL,0,0,0,0),(406,'官方额','下次方法',-1,-1,NULL,1,14,13,4,NULL,0,0,0,0),(407,'kjow laso','范围问题',-1,-1,NULL,1,8,9,3,NULL,0,0,0,0),(408,'kjow laso','大家帮忙分析分析',-1,-1,NULL,1,8,10,3,NULL,0,0,0,0),(409,'范围问题','kjow laso',-1,-1,NULL,1,9,8,3,NULL,0,0,0,0),(410,'范围问题','大家帮忙分析分析',-1,-1,NULL,1,9,10,3,NULL,0,0,0,0),(411,'大家帮忙分析分析','kjow laso',-1,-1,NULL,1,10,8,3,NULL,0,0,0,0),(412,'大家帮忙分析分析','范围问题',-1,-1,NULL,1,10,9,3,NULL,0,0,0,0),(413,'33333333333333','zhangbohan',-1,-1,NULL,1,2,3,2,NULL,0,0,0,0),(414,'33333333333333','zzzzzzzzzzzzzzzzz',-1,-1,NULL,1,2,7,2,NULL,0,0,0,0),(415,'zhangbohan','33333333333333',-1,-1,NULL,1,3,2,2,NULL,0,0,0,0),(416,'zhangbohan','zzzzzzzzzzzzzzzzz',-1,-1,NULL,1,3,7,2,NULL,0,0,0,0),(417,'zzzzzzzzzzzzzzzzz','33333333333333',-1,-1,NULL,1,7,2,2,NULL,0,0,0,0),(418,'zzzzzzzzzzzzzzzzz','zhangbohan',-1,-1,NULL,1,7,3,2,NULL,0,0,0,0),(419,'11','naonao',2,2,NULL,1,1,5,1,'2014-08-15 12:05:13',1,1,0,0),(420,'11','xxaa',3,1,NULL,1,1,6,1,'2014-08-15 12:04:23',3,0,2,-2),(421,'11','kjow laso',1,1,NULL,1,1,8,1,'2014-08-15 12:05:21',1,1,0,0),(422,'11','范围问题',4,1,NULL,1,1,9,1,'2014-08-15 12:04:36',3,0,3,-3),(423,'11','大家帮忙分析分析',3,1,NULL,1,1,10,1,'2014-08-15 12:06:16',3,0,2,-2),(424,'11','阿斯顿我',3,1,NULL,1,1,11,1,'2014-08-15 12:05:32',3,0,2,-2),(425,'11','下次随机',1,1,NULL,1,1,12,1,'2014-08-15 12:07:12',1,1,0,0),(426,'naonao','11',2,4,NULL,1,5,1,1,'2014-08-15 11:57:07',0,3,-2,2),(427,'naonao','xxaa',-1,-1,NULL,1,5,6,1,NULL,0,0,0,0),(428,'naonao','kjow laso',-1,-1,NULL,1,5,8,1,NULL,0,0,0,0),(429,'naonao','范围问题',-1,-1,NULL,1,5,9,1,NULL,0,0,0,0),(430,'naonao','大家帮忙分析分析',-1,-1,NULL,1,5,10,1,NULL,0,0,0,0),(431,'naonao','阿斯顿我',-1,-1,NULL,1,5,11,1,NULL,0,0,0,0),(432,'naonao','下次随机',-1,-1,NULL,1,5,12,1,NULL,0,0,0,0),(433,'xxaa','11',1,3,NULL,1,6,1,1,'2014-08-15 11:57:12',0,3,-2,2),(434,'xxaa','naonao',-1,-1,NULL,1,6,5,1,NULL,0,0,0,0),(435,'xxaa','kjow laso',-1,-1,NULL,1,6,8,1,NULL,0,0,0,0),(436,'xxaa','范围问题',-1,-1,NULL,1,6,9,1,NULL,0,0,0,0),(437,'xxaa','大家帮忙分析分析',-1,-1,NULL,1,6,10,1,NULL,0,0,0,0),(438,'xxaa','阿斯顿我',-1,-1,NULL,1,6,11,1,NULL,0,0,0,0),(439,'xxaa','下次随机',-1,-1,NULL,1,6,12,1,NULL,0,0,0,0),(440,'kjow laso','11',-1,-1,NULL,1,8,1,1,NULL,0,0,0,0),(441,'kjow laso','naonao',-1,-1,NULL,1,8,5,1,NULL,0,0,0,0),(442,'kjow laso','xxaa',-1,-1,NULL,1,8,6,1,NULL,0,0,0,0),(443,'kjow laso','范围问题',-1,-1,NULL,1,8,9,1,NULL,0,0,0,0),(444,'kjow laso','大家帮忙分析分析',-1,-1,NULL,1,8,10,1,NULL,0,0,0,0),(445,'kjow laso','阿斯顿我',-1,-1,NULL,1,8,11,1,NULL,0,0,0,0),(446,'kjow laso','下次随机',-1,-1,NULL,1,8,12,1,NULL,0,0,0,0),(447,'范围问题','11',-1,-1,NULL,1,9,1,1,NULL,0,0,0,0),(448,'范围问题','naonao',-1,-1,NULL,1,9,5,1,NULL,0,0,0,0),(449,'范围问题','xxaa',-1,-1,NULL,1,9,6,1,NULL,0,0,0,0),(450,'范围问题','kjow laso',-1,-1,NULL,1,9,8,1,NULL,0,0,0,0),(451,'范围问题','大家帮忙分析分析',-1,-1,NULL,1,9,10,1,NULL,0,0,0,0),(452,'范围问题','阿斯顿我',-1,-1,NULL,1,9,11,1,NULL,0,0,0,0),(453,'范围问题','下次随机',-1,-1,NULL,1,9,12,1,NULL,0,0,0,0),(454,'大家帮忙分析分析','11',-1,-1,NULL,1,10,1,1,NULL,0,0,0,0),(455,'大家帮忙分析分析','naonao',-1,-1,NULL,1,10,5,1,NULL,0,0,0,0),(456,'大家帮忙分析分析','xxaa',-1,-1,NULL,1,10,6,1,NULL,0,0,0,0),(457,'大家帮忙分析分析','kjow laso',-1,-1,NULL,1,10,8,1,NULL,0,0,0,0),(458,'大家帮忙分析分析','范围问题',-1,-1,NULL,1,10,9,1,NULL,0,0,0,0),(459,'大家帮忙分析分析','阿斯顿我',-1,-1,NULL,1,10,11,1,NULL,0,0,0,0),(460,'大家帮忙分析分析','下次随机',-1,-1,NULL,1,10,12,1,NULL,0,0,0,0),(461,'阿斯顿我','11',-1,-1,NULL,1,11,1,1,NULL,0,0,0,0),(462,'阿斯顿我','naonao',-1,-1,NULL,1,11,5,1,NULL,0,0,0,0),(463,'阿斯顿我','xxaa',-1,-1,NULL,1,11,6,1,NULL,0,0,0,0),(464,'阿斯顿我','kjow laso',-1,-1,NULL,1,11,8,1,NULL,0,0,0,0),(465,'阿斯顿我','范围问题',-1,-1,NULL,1,11,9,1,NULL,0,0,0,0),(466,'阿斯顿我','大家帮忙分析分析',-1,-1,NULL,1,11,10,1,NULL,0,0,0,0),(467,'阿斯顿我','下次随机',-1,-1,NULL,1,11,12,1,NULL,0,0,0,0),(468,'下次随机','11',-1,-1,NULL,1,12,1,1,NULL,0,0,0,0),(469,'下次随机','naonao',-1,-1,NULL,1,12,5,1,NULL,0,0,0,0),(470,'下次随机','xxaa',-1,-1,NULL,1,12,6,1,NULL,0,0,0,0),(471,'下次随机','kjow laso',-1,-1,NULL,1,12,8,1,NULL,0,0,0,0),(472,'下次随机','范围问题',-1,-1,NULL,1,12,9,1,NULL,0,0,0,0),(473,'下次随机','大家帮忙分析分析',-1,-1,NULL,1,12,10,1,NULL,0,0,0,0),(474,'下次随机','阿斯顿我',-1,-1,NULL,1,12,11,1,NULL,0,0,0,0);
/*!40000 ALTER TABLE `matchlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `matchsum` int(11) DEFAULT NULL,
  `team` varchar(45) DEFAULT NULL,
  `qq` varchar(45) DEFAULT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'11',NULL,NULL,'22',NULL),(2,'33333333333333',NULL,NULL,'1234567',NULL),(3,'zhangbohan',NULL,NULL,'123455',NULL),(5,'naonao',NULL,NULL,'12345',NULL),(6,'xxaa',NULL,NULL,'7777777777',NULL),(7,'zzzzzzzzzzzzzzzzz',NULL,NULL,'7777777777',NULL),(8,'kjow laso',NULL,NULL,'7777777777',NULL),(9,'范围问题',NULL,NULL,'7777777777',NULL),(10,'大家帮忙分析分析',NULL,NULL,'22222222222',NULL),(11,'阿斯顿我',NULL,NULL,'234567',NULL),(12,'下次随机',NULL,NULL,'234567',NULL),(13,'下次方法',NULL,NULL,'2345672',NULL),(14,'官方额',NULL,NULL,'45555',NULL);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `qq` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'root','root','root',NULL),(2,'admin1','admin1234juventus','admin',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-08-15 20:07:22
