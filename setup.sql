CREATE DATABASE  IF NOT EXISTS `juventus` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `juventus`;
-- MySQL dump 10.13  Distrib 5.6.17, for osx10.6 (i386)
--
-- Host: localhost    Database: juventus
-- ------------------------------------------------------
-- Server version	5.6.20

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
  `totalgoal` int(11) DEFAULT '0',
  `totalwin` int(11) DEFAULT '0',
  `totalequal` int(11) DEFAULT '0',
  `totallose` int(11) DEFAULT '0',
  `totalgetgoal` int(11) DEFAULT '0',
  `totalmatch` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_groupmember_grouptable1_idx` (`grouptable_id`),
  KEY `fk_groupmember_player1_idx` (`player_id`),
  CONSTRAINT `fk_groupmember_grouptable1` FOREIGN KEY (`grouptable_id`) REFERENCES `grouptable` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_groupmember_player1` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupplayer`
--

LOCK TABLES `groupplayer` WRITE;
/*!40000 ALTER TABLE `groupplayer` DISABLE KEYS */;
INSERT INTO `groupplayer` VALUES (70,10,15,5,11,1,2,3,-7,6),(71,10,16,5,12,1,2,3,-4,6),(72,10,17,14,17,4,2,0,7,6),(73,10,18,8,15,2,2,2,4,6),(74,11,19,0,0,0,0,0,0,0),(75,12,20,16,17,5,1,0,11,6),(76,12,21,6,10,1,3,2,-2,6),(77,12,22,4,9,0,4,2,-3,6),(78,12,23,4,10,0,4,2,-6,6),(109,26,17,0,0,0,0,0,0,0),(110,26,18,0,0,0,0,0,0,0),(111,26,20,0,0,0,0,0,0,0),(112,26,21,0,0,0,0,0,0,0);
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
  `type` varchar(45) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_group_league1_idx` (`league_id`),
  CONSTRAINT `fk_group_league1` FOREIGN KEY (`league_id`) REFERENCES `league` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grouptable`
--

LOCK TABLES `grouptable` WRITE;
/*!40000 ALTER TABLE `grouptable` DISABLE KEYS */;
INSERT INTO `grouptable` VALUES (10,'A',5,NULL,NULL),(11,'A',6,NULL,NULL),(12,'B',5,NULL,NULL),(26,'4进2',5,'after',1);
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
  `description` varchar(545) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `league`
--

LOCK TABLES `league` WRITE;
/*!40000 ALTER TABLE `league` DISABLE KEYS */;
INSERT INTO `league` VALUES (5,'123748718','Estage','double',NULL),(6,'hhhszzz','Prepare','double','98128377ksjlajldklw');
/*!40000 ALTER TABLE `league` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaguestatus`
--

DROP TABLE IF EXISTS `leaguestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `leaguestatus` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `code` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaguestatus`
--

LOCK TABLES `leaguestatus` WRITE;
/*!40000 ALTER TABLE `leaguestatus` DISABLE KEYS */;
INSERT INTO `leaguestatus` VALUES (1,'建立',1,'Create'),(2,'报名中',2,'Prepare'),(5,'比赛中',3,'Groupstage'),(6,'比赛中',4,'Estage'),(7,'结束',5,'Finish');
/*!40000 ALTER TABLE `leaguestatus` ENABLE KEYS */;
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
  `homewin` int(11) DEFAULT '0',
  `awaywin` int(11) DEFAULT '0',
  `equal` int(11) DEFAULT '0',
  `homelose` int(11) DEFAULT '0',
  `awaylose` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_matchlist_league_idx` (`league_id`),
  KEY `fk_matchlist_grouptable1_idx` (`grouptable_id`),
  CONSTRAINT `fk_matchlist_grouptable1` FOREIGN KEY (`grouptable_id`) REFERENCES `grouptable` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_matchlist_league` FOREIGN KEY (`league_id`) REFERENCES `league` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=583 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchlist`
--

LOCK TABLES `matchlist` WRITE;
/*!40000 ALTER TABLE `matchlist` DISABLE KEYS */;
INSERT INTO `matchlist` VALUES (559,'1231','222',1,4,NULL,5,15,16,10,'2014-08-24 09:36:48',0,3,-3,3,0,1,0,1,0),(560,'1231','333',2,3,NULL,5,15,17,10,'2014-08-24 09:36:53',0,3,-1,1,0,1,0,1,0),(561,'1231','444',1,1,NULL,5,15,18,10,'2014-08-24 09:37:04',1,1,0,0,0,0,1,0,0),(562,'222','1231',2,2,NULL,5,16,15,10,'2014-08-24 09:36:59',1,1,0,0,0,0,1,0,0),(563,'222','333',2,3,NULL,5,16,17,10,'2014-08-24 09:37:09',0,3,-1,1,0,1,0,1,0),(564,'222','444',1,4,NULL,5,16,18,10,'2014-08-24 09:37:14',0,3,-3,3,0,1,0,1,0),(565,'333','1231',5,1,NULL,5,17,15,10,'2014-08-24 09:37:20',3,0,4,-4,1,0,0,0,1),(566,'333','222',2,2,NULL,5,17,16,10,'2014-08-24 09:37:25',1,1,0,0,0,0,1,0,0),(567,'333','444',3,2,NULL,5,17,18,10,'2014-08-24 09:39:39',3,0,1,-1,1,0,0,0,1),(568,'444','1231',3,4,NULL,5,18,15,10,'2014-08-24 09:37:39',0,3,-1,1,0,1,0,1,0),(569,'444','222',4,1,NULL,5,18,16,10,'2014-08-24 09:37:47',3,0,3,-3,1,0,0,0,1),(570,'444','333',1,1,NULL,5,18,17,10,'2014-08-24 09:37:54',1,1,0,0,0,0,1,0,0),(571,'aaa','bbb',2,1,NULL,5,20,21,12,'2014-08-24 09:43:29',3,0,1,-1,1,0,0,0,1),(572,'aaa','ccc',3,1,NULL,5,20,22,12,'2014-08-24 09:43:33',3,0,2,-2,1,0,0,0,1),(573,'aaa','ddd',4,1,NULL,5,20,23,12,'2014-08-24 09:43:38',3,0,3,-3,1,0,0,0,1),(574,'bbb','aaa',1,3,NULL,5,21,20,12,'2014-08-24 09:43:43',0,3,-2,2,0,1,0,1,0),(575,'bbb','ccc',2,1,NULL,5,21,22,12,'2014-08-24 09:43:48',3,0,1,-1,1,0,0,0,1),(576,'bbb','ddd',2,2,NULL,5,21,23,12,'2014-08-24 09:43:53',1,1,0,0,0,0,1,0,0),(577,'ccc','aaa',1,1,NULL,5,22,20,12,'2014-08-24 09:43:58',1,1,0,0,0,0,1,0,0),(578,'ccc','bbb',2,2,NULL,5,22,21,12,'2014-08-24 09:44:03',1,1,0,0,0,0,1,0,0),(579,'ccc','ddd',3,3,NULL,5,22,23,12,'2014-08-24 09:44:08',1,1,0,0,0,0,1,0,0),(580,'ddd','aaa',1,4,NULL,5,23,20,12,'2014-08-24 09:44:17',0,3,-3,3,0,1,0,1,0),(581,'ddd','bbb',2,2,NULL,5,23,21,12,'2014-08-24 09:44:22',1,1,0,0,0,0,1,0,0),(582,'ddd','ccc',1,1,NULL,5,23,22,12,'2014-08-24 09:44:26',1,1,0,0,0,0,1,0,0);
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
  `user_id` bigint(20) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_player_user1_idx` (`user_id`),
  CONSTRAINT `fk_player_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (15,'1231',NULL,NULL,'111',NULL,NULL,NULL,NULL),(16,'222',NULL,NULL,'111',NULL,NULL,NULL,NULL),(17,'333',NULL,NULL,'111',NULL,NULL,NULL,NULL),(18,'444',NULL,NULL,'111',NULL,NULL,NULL,NULL),(19,'1234567',NULL,NULL,NULL,NULL,3,NULL,'华北网通'),(20,'aaa',NULL,NULL,'123',NULL,NULL,NULL,NULL),(21,'bbb',NULL,NULL,'123',NULL,NULL,NULL,NULL),(22,'ccc',NULL,NULL,'123',NULL,NULL,NULL,NULL),(23,'ddd',NULL,NULL,'123',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `signuptable`
--

DROP TABLE IF EXISTS `signuptable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `signuptable` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `player_id` bigint(20) DEFAULT NULL,
  `league_id` bigint(20) DEFAULT NULL COMMENT '	',
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signuptable`
--

LOCK TABLES `signuptable` WRITE;
/*!40000 ALTER TABLE `signuptable` DISABLE KEYS */;
/*!40000 ALTER TABLE `signuptable` ENABLE KEYS */;
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
  `loginname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `profile_image_url` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'root','root','root',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'admin1','admin1234juventus','admin',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'zbhlove100','emJoaG1tMTk4NQ==','user','12345',NULL,'12345',NULL,NULL,NULL,'Active');
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

-- Dump completed on 2014-08-24 22:29:42
