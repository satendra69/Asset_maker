-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: asset_makers
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (6,'mumbai','2024-04-02 12:15:17'),(8,'delhi','2024-04-02 12:23:52'),(15,'Chennai','2024-04-02 12:48:04'),(16,'Bengaluru','2024-04-02 12:48:42'),(17,'Hydrabad','2024-04-05 12:28:20'),(18,'Udaipur','2024-04-06 14:14:20'),(19,'satya','2024-05-04 19:14:32');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(800) NOT NULL,
  `address` longtext NOT NULL,
  `price` bigint NOT NULL,
  `bathrooms` int NOT NULL,
  `bedrooms` int NOT NULL,
  `furnished` tinyint NOT NULL DEFAULT '0',
  `parking` tinyint NOT NULL DEFAULT '0',
  `type` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `restaurant` varchar(45) NOT NULL,
  `bus` varchar(45) NOT NULL,
  `school` varchar(45) NOT NULL,
  `size` varchar(25) DEFAULT NULL,
  `flore` int NOT NULL,
  `cityId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `citiId_idx` (`cityId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `citiId` FOREIGN KEY (`cityId`) REFERENCES `cities` (`id`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (59,'City Palace','Future alike hill pull picture swim magic chain seed engineer nest outer raise bound easy poetry gain loud weigh me recognize farmer bare danger. actually put square leg vessels earth engine matter key cup indeed body film century shut place environment were stage vertical roof bottom lady function breeze darkness beside tin view local breathe carbon swam declared magnet escape has from pile apart route coffee storm someone hold space use ahead sheep jungle closely natural attached part top grain your grade trade corn salmon trouble new bend most teacher range anybody every seat fifteen eventually','1234 Broadway St,',1,1,1,1,1,'rent','Villa','2024-04-05 20:19:48','ds','100m away','250m away','127',1,8,13),(64,'asdsad','sad','ads',100000,1,1,1,1,'rent','asd','2024-04-08 14:53:03','sad','sad','ads','123sqrt',1,8,13);
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltg_det`
--

DROP TABLE IF EXISTS `ltg_det`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ltg_det` (
  `ltg_det_mstRowID` int NOT NULL,
  `ltg_det_sale_price` varchar(255) DEFAULT NULL,
  `ltg_det_suffix_price` varchar(255) DEFAULT NULL,
  `ltg_det_desc` text NOT NULL,
  `ltg_det_location` varchar(255) NOT NULL,
  `ltg_det_address` varchar(255) NOT NULL,
  `ltg_det_postal_code` varchar(255) NOT NULL,
  `ltg_det_latitude` varchar(255) NOT NULL,
  `ltg_det_longitude` varchar(255) NOT NULL,
  `ltg_det_property_address_details` text,
  `ltg_det_pmts_area_dts` varchar(255) NOT NULL,
  `ltg_det_pmts_rate_per_sq` varchar(255) NOT NULL,
  `ltg_det_pmts_status` varchar(255) NOT NULL,
  `ltg_det_pmts_bed_rom` varchar(255) NOT NULL,
  `ltg_det_pmts_bth_rom` varchar(255) NOT NULL,
  `ltg_det_pmts_car_park` varchar(255) NOT NULL,
  `ltg_det_pmts_year_build` varchar(255) NOT NULL,
  `ltg_det_plot_dimensions` varchar(255) DEFAULT NULL,
  `ltg_det_open_sides` varchar(255) DEFAULT NULL,
  `ltg_det_corner_villa` varchar(255) DEFAULT NULL,
  `ltg_det_plot_area` varchar(255) DEFAULT NULL,
  `ltg_det_gated_community` varchar(255) DEFAULT NULL,
  `ltg_det_over_looking` varchar(255) DEFAULT NULL,
  `ltg_det_totl_project_extent` varchar(255) DEFAULT NULL,
  `ltg_det_pmts_total_flrs` varchar(255) NOT NULL,
  `ltg_det_pmts_flat_on_flr` varchar(255) NOT NULL,
  `ltg_det_pmts_lfts_in_tower` varchar(255) NOT NULL,
  `ltg_det_pmts_main_dor_facing` varchar(255) NOT NULL,
  `ltg_det_pmts_property_flrg` varchar(255) NOT NULL,
  `ltg_det_pmts_balconies` varchar(255) NOT NULL,
  `ltg_det_pmts_approaching_road_width` varchar(255) NOT NULL,
  `ltg_det_pmts_furnishing` varchar(255) NOT NULL,
  `ltg_det_pmts_stamp_duty` varchar(255) NOT NULL,
  `ltg_det_pmts_tproject_evnt` varchar(255) NOT NULL,
  `ltg_det_pmts_totl_block` varchar(255) NOT NULL,
  `ltg_det_pmts_transaction_typ` varchar(255) NOT NULL,
  `ltg_det_pmts_total_towrs` varchar(255) NOT NULL,
  `ltg_det_pmts_total_phases` varchar(255) NOT NULL,
  `ltg_det_pmts_approval_authority` varchar(255) NOT NULL,
  `ltg_det_pmts_totalunits` varchar(255) NOT NULL,
  `ltg_det_pmts_other_advtages` text,
  `ltg_det_about_project_buder` text,
  `ltg_det_amenities` text,
  `ltg_det_property_video_url` varchar(255) NOT NULL,
  `ltg_det_audit_user` varchar(255) NOT NULL,
  `ltg_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ltg_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ltg_det_RowID` int NOT NULL AUTO_INCREMENT,
  `ltg_det_available_from` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ltg_det_RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det`
--

LOCK TABLES `ltg_det` WRITE;
/*!40000 ALTER TABLE `ltg_det` DISABLE KEYS */;
INSERT INTO `ltg_det` VALUES (1,'1000000000','1000000001','<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.</p>\r\n','VS test3 apartment','V.S.Epitome apartments, Mumbai','560093','17.37898229880208','78.49261302486495','undefined','1230 sqft','5000 per Sq-Ft','Ready to Move','10','3','3','2024','undefined','undefined','undefined','undefined','undefined','undefined','12','12','3','3','North','verified','5','12','Fully Furnished','Included','12','15','New Property','12','15','BBMU','200','Pooja Room, Study Room, Store Room, Servant Room, terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','About Project/Builder\r\nProject/Builder Details','Cafeteria, CCTV Surveillance, Black top roads, Billiards, Concrete Roads, Footpaths, Foosball, Cricket Practice Pitch, Creche, Yoga room, Maingate Arch, Indoor Games, Public Transport Available, Under Ground Drainage','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-24 15:11:21','2024-07-27 01:44:22',1,'undefined'),(2,'12301','12301','<p>Test Villa 3 Desc</p>\r\n','VS villas','V.S.Epitome apartments, Bhopal','560093','17.38176730309895','78.47289306030704','Property Address (If any more detailed)\r\nProperty Address Details','1230 sqft','5000 per Sq-Ft','under_construction','16','8','4','2008','300*300','2','yes','900 sqft','yes','yes','12','4','undefined','undefined','west','verified','6','12','semi-furnished','included','12','undefined','new_property','undefined','15','BBMU','200','store_room, servant_room, terrace_garden, private_jacuzzi','About Project/Builder\r\nProject/Builder Details','Maingate Arch, Mini Soccer Ground, Maze Garden, Pets Allowed, Piped Gas, Outdoor Gym, Office Cubicles, Laundry Service','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-24 15:17:44','2024-07-26 22:55:47',2,'July');
/*!40000 ALTER TABLE `ltg_det` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltg_det_commercial_properties`
--

DROP TABLE IF EXISTS `ltg_det_commercial_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ltg_det_commercial_properties` (
  `ltg_det_mstRowID` int NOT NULL,
  `ltg_det_comm_prop_sale_price` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_suffix_price` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_desc` text NOT NULL,
  `ltg_det_comm_prop_location` varchar(255) NOT NULL,
  `ltg_det_comm_prop_address` varchar(255) NOT NULL,
  `ltg_det_comm_prop_postal_code` varchar(255) NOT NULL,
  `ltg_det_comm_prop_latitude` varchar(255) NOT NULL,
  `ltg_det_comm_prop_longitude` varchar(255) NOT NULL,
  `ltg_det_comm_prop_pmts_area_dts` varchar(255) NOT NULL,
  `ltg_det_comm_prop_pmts_rate_per_sq` varchar(255) NOT NULL,
  `ltg_det_comm_prop_pmts_status` varchar(255) NOT NULL,
  `ltg_det_comm_prop_pmts_year_built` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_balconies` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_other_advantages` text,
  `ltg_det_comm_prop_pmts_furnishing` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_car_parking` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_total_floors` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_property_on_floor` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_total_units` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_transaction_type` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_approaching_road_width` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_approval_authority` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_total_phases` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_total_project_extent` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_stamp_duty_registration_charges` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_pmts_property_flooring` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_amenities` text,
  `ltg_det_comm_prop_about_project_builder` varchar(255) DEFAULT NULL,
  `ltg_det_comm_prop_property_video_url` varchar(255) DEFAULT NULL,
  `ltg_det_audit_user` varchar(255) DEFAULT NULL,
  `ltg_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ltg_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ltg_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ltg_det_RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_commercial_properties`
--

LOCK TABLES `ltg_det_commercial_properties` WRITE;
/*!40000 ALTER TABLE `ltg_det_commercial_properties` DISABLE KEYS */;
INSERT INTO `ltg_det_commercial_properties` VALUES (9,'1230','1230','<p>test  commertial properties description</p>\n','VS commertial properties','V.S.Epitome apartments, Varsova Layout','560093','14.44881037479587','79.99006907184479','1230 sqft','5000 per Sq-Ft','ready_to_move','2008','3','pooja_room, study_room, store_room, private_pool, private_jacuzzi, vaastu_compliant','fully-furnished','3','12','5','200','new_property','12','BBMU','15','12','included','verified','Acupressure walkway, Concierge Services, CCTV Surveillance, Street Lights, Yoga room, Health Facilities, Gym','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-24 15:41:45','2024-07-26 22:56:43',1);
/*!40000 ALTER TABLE `ltg_det_commercial_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltg_det_penthouses`
--

DROP TABLE IF EXISTS `ltg_det_penthouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ltg_det_penthouses` (
  `ltg_det_mstRowID` int NOT NULL,
  `ltg_det_penthouses_sale_price` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_suffix_price` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_desc` text NOT NULL,
  `ltg_det_penthouses_location` varchar(255) NOT NULL,
  `ltg_det_penthouses_address` varchar(255) NOT NULL,
  `ltg_det_penthouses_postal_code` varchar(255) NOT NULL,
  `ltg_det_penthouses_latitude` varchar(255) NOT NULL,
  `ltg_det_penthouses_longitude` varchar(255) NOT NULL,
  `ltg_det_penthouses_property_address_details` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_area_dts` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_rate_per_sq` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_status` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_bed_rooms` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_bath_rooms` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_car_parking` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_year_built` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_duplex` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_main_door_facing` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_gated_community` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_corner_penthouse` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_balconies` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_furnishing` varchar(255) NOT NULL,
  `ltg_det_penthouses_pmts_over_looking` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_transaction_type` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_property_flooring` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_other_advantages` text,
  `ltg_det_penthouses_pmts_no_of_open_sides` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_approaching_road_width` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_available_form` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_approval_authority` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_total_project_extent` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_stamp_duty_registration_charges` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_total_phases` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_pmts_total_units` varchar(255) DEFAULT NULL,
  `ltg_det_penthouses_amenities` text,
  `ltg_det_penthouses_about_project_builder` varchar(255) NOT NULL,
  `ltg_det_penthouses_property_video_url` varchar(255) DEFAULT NULL,
  `ltg_det_audit_user` varchar(255) DEFAULT NULL,
  `ltg_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ltg_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ltg_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ltg_det_RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_penthouses`
--

LOCK TABLES `ltg_det_penthouses` WRITE;
/*!40000 ALTER TABLE `ltg_det_penthouses` DISABLE KEYS */;
INSERT INTO `ltg_det_penthouses` VALUES (12,'1230','1230','<p>test pent houses description</p>\n','VS pent houses','V.S.Epitome apartments, Varsova Layout','560093','18.40665471391907','76.86892293493234','Property Address (If any more detailed)\nProperty Address Details','1230 sqft','5000 per Sq-Ft','ready_to_move','3','3','1','2008','yes','north-east','yes','yes','3','fully-furnished','yes','new_property','verified','pooja_room, study_room, store_room, servant_room, terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','3','12','July','BBMU','12','included','15','200','Acupressure walkway, Amphi Theatre, Footpaths, Children’s Play Area, Gymnasium, Mini Soccer Ground, Health Facilities, Public Transport Available, Toddlers Pool, Under Ground Drainage, Yoga room','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-24 16:00:08','2024-07-26 22:58:32',1);
/*!40000 ALTER TABLE `ltg_det_penthouses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltg_det_plots`
--

DROP TABLE IF EXISTS `ltg_det_plots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ltg_det_plots` (
  `ltg_det_mstRowID` int NOT NULL,
  `ltg_det_plot_sale_price` varchar(255) DEFAULT NULL,
  `ltg_det_plot_suffix_price` varchar(255) DEFAULT NULL,
  `ltg_det_plot_desc` text NOT NULL,
  `ltg_det_plot_location` varchar(255) NOT NULL,
  `ltg_det_plot_address` varchar(255) NOT NULL,
  `ltg_det_plot_postal_code` varchar(255) NOT NULL,
  `ltg_det_plot_latitude` varchar(255) NOT NULL,
  `ltg_det_plot_longitude` varchar(255) NOT NULL,
  `ltg_det_plot_property_address_details` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_area_dts` varchar(255) NOT NULL,
  `ltg_det_plot_pmts_rate_per_sq` varchar(255) NOT NULL,
  `ltg_det_plot_pmts_status` varchar(255) NOT NULL,
  `ltg_det_plot_pmts_plot_dimensions` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_floors_allowed_for_construction` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_no_of_open_sides` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_plot_facing` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_corner_plot` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_gated_community` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_boundary_wall_made` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_approaching_road_width` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_transaction_type` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_stamp_duty_registration_charges` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_total_project_extent` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_plot_approval_authority` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_year_built` varchar(255) NOT NULL,
  `ltg_det_plot_pmts_total_units` varchar(255) DEFAULT NULL,
  `ltg_det_plot_pmts_total_phases` varchar(255) DEFAULT NULL,
  `ltg_det_plot_amenities` text,
  `ltg_det_plot_about_project_builder` varchar(255) DEFAULT NULL,
  `ltg_det_plot_property_video_url` varchar(255) DEFAULT NULL,
  `ltg_det_audit_user` varchar(255) DEFAULT NULL,
  `ltg_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ltg_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ltg_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ltg_det_RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_plots`
--

LOCK TABLES `ltg_det_plots` WRITE;
/*!40000 ALTER TABLE `ltg_det_plots` DISABLE KEYS */;
INSERT INTO `ltg_det_plots` VALUES (7,'12301','12301','<p>Test Plots3 Desc</p>\n','VS plots','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1230 sqft','5000 per Sq-Ft','under_construction','300*300','4','3','south','yes','no','no','12','resale','excluded','12','BBMU','2024','200','15','Acupressure walkway, Badminton Court, Cafeteria, CCTV Surveillance','bout Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-24 15:30:31','2024-07-26 22:57:55',5);
/*!40000 ALTER TABLE `ltg_det_plots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltg_det_row_houses`
--

DROP TABLE IF EXISTS `ltg_det_row_houses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ltg_det_row_houses` (
  `ltg_det_mstRowID` int NOT NULL,
  `ltg_det_row_house_sale_price` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_suffix_price` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_desc` text NOT NULL,
  `ltg_det_row_house_location` varchar(255) NOT NULL,
  `ltg_det_row_house_address` varchar(255) NOT NULL,
  `ltg_det_row_house_postal_code` varchar(255) NOT NULL,
  `ltg_det_row_house_latitude` varchar(255) NOT NULL,
  `ltg_det_row_house_longitude` varchar(255) NOT NULL,
  `ltg_det_row_house_property_address_details` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_area_dts` varchar(255) NOT NULL,
  `ltg_det_row_house_pmts_rate_per_sq` varchar(255) NOT NULL,
  `ltg_det_row_house_pmts_status` varchar(255) NOT NULL,
  `ltg_det_row_house_pmts_bed_rooms` varchar(255) NOT NULL,
  `ltg_det_row_house_pmts_bath_rooms` varchar(255) NOT NULL,
  `ltg_det_row_house_pmts_car_parking` varchar(255) NOT NULL,
  `ltg_det_row_house_pmts_year_built` varchar(255) NOT NULL,
  `ltg_det_row_house_pmts_plot_dimensions` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_land_uds_area` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_over_looking` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_main_door_facing` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_corner_rowhouse` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_gated_community` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_balconies` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_other_advantages` text,
  `ltg_det_row_house_pmts_approaching_road_width` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_furnishing` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_property_flooring` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_no_of_open_sides` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_total_project_extent` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_available_from` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_stamp_duty_registration_charges` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_transaction_type` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_approval_authority` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_total_units` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_pmts_total_phases` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_amenities` text,
  `ltg_det_row_house_about_project_builder` varchar(255) DEFAULT NULL,
  `ltg_det_row_house_property_video_url` varchar(255) DEFAULT NULL,
  `ltg_det_audit_user` varchar(255) DEFAULT NULL,
  `ltg_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ltg_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ltg_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ltg_det_RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_row_houses`
--

LOCK TABLES `ltg_det_row_houses` WRITE;
/*!40000 ALTER TABLE `ltg_det_row_houses` DISABLE KEYS */;
INSERT INTO `ltg_det_row_houses` VALUES (8,'1230','1230','<p>Test row houses 3 description</p>\n','VS plots','V.S.Epitome apartments, Varsova Layout','560093','19.0857182655334','82.0235589706426','Property Address (If any more detailed)\nProperty Address Details','1230 sqft','5000 per Sq-Ft','ready_to_move','2','2','1','2024','300*300','300','yes','north-east','yes','yes','3','pooja_room, study_room, store_room, servant_room, terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','12','fully-furnished','verified','2','12','July','included','new_property','BBMU','200','15','Acupressure walkway, CCTV Surveillance, Basketball Court, Drainage, Kids Play Area, Jogging Track, 24 Hrs Backup, Rain Water Harvesting, Yoga room, Temple, Street Lights, Volleyball Court','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-24 15:37:24','2024-07-26 22:57:21',1);
/*!40000 ALTER TABLE `ltg_det_row_houses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltg_det_villaments`
--

DROP TABLE IF EXISTS `ltg_det_villaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ltg_det_villaments` (
  `ltg_det_mstRowID` int NOT NULL,
  `ltg_det_villaments_sale_price` varchar(255) DEFAULT NULL,
  `ltg_det_villaments_suffix_price` varchar(255) DEFAULT NULL,
  `ltg_det_villaments_desc` text NOT NULL,
  `ltg_det_villaments_location` varchar(255) NOT NULL,
  `ltg_det_villaments_address` varchar(255) NOT NULL,
  `ltg_det_villaments_postal_code` varchar(255) NOT NULL,
  `ltg_det_villaments_latitude` varchar(255) NOT NULL,
  `ltg_det_villaments_longitude` varchar(255) NOT NULL,
  `ltg_det_villaments_property_address_details` text,
  `ltg_det_villaments_pmts_area_dts` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_rate_per_sq` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_status` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_bed_rooms` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_bath_rooms` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_car_parking` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_year_built` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_land_uds_area` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_duplex` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_no_of_open_sides` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_main_door_facing` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_corner_villament` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_gated_community` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_balconies` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_approaching_road_width` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_over_looking` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_furnishing` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_property_flooring` varchar(255) DEFAULT NULL,
  `ltg_det_villaments_pmts_other_advantages` text,
  `ltg_det_villaments_pmts_available_from` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_total_project_extent` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_transaction_type` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_stamp_duty_registration_charges` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_approval_authority` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_total_units` varchar(255) NOT NULL,
  `ltg_det_villaments_pmts_total_phases` varchar(255) NOT NULL,
  `ltg_det_villaments_amenities` text,
  `ltg_det_villaments_about_project_builder` text,
  `ltg_det_villaments_property_video_url` varchar(255) DEFAULT NULL,
  `ltg_det_audit_user` varchar(255) DEFAULT NULL,
  `ltg_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ltg_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ltg_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ltg_det_RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_villaments`
--

LOCK TABLES `ltg_det_villaments` WRITE;
/*!40000 ALTER TABLE `ltg_det_villaments` DISABLE KEYS */;
INSERT INTO `ltg_det_villaments` VALUES (11,'12301','12301','<p>test  villaments description</p>\n','VS villaments','V.S.Epitome apartments, Varsova Layout','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1230 sqft','5000 per Sq-Ft','ready_to_move','3','4','2','2008','300','3','2','north-east','yes','yes','3','12','yes','fully-furnished','verified','pooja_room, study_room, store_room, terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','July','12','new_property','included','BBMU','200','15','Acupressure walkway, Black top roads, Gym, Maingate Arch, Laundry Service, Society Boundary Wall, Yoga room, Under Ground Drainage','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-24 15:56:10','2024-07-26 22:58:14',2);
/*!40000 ALTER TABLE `ltg_det_villaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltg_det_villas`
--

DROP TABLE IF EXISTS `ltg_det_villas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ltg_det_villas` (
  `ltg_det_mstRowID` int NOT NULL,
  `ltg_det_villa_sale_price` varchar(255) DEFAULT NULL,
  `ltg_det_villa_suffix_price` varchar(255) DEFAULT NULL,
  `ltg_det_villa_desc` text NOT NULL,
  `ltg_det_villa_location` varchar(255) NOT NULL,
  `ltg_det_villa_address` varchar(255) NOT NULL,
  `ltg_det_villa_postal_code` varchar(255) NOT NULL,
  `ltg_det_villa_latitude` varchar(255) NOT NULL,
  `ltg_det_villa_longitude` varchar(255) NOT NULL,
  `ltg_det_villa_property_address_details` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_area_dts` varchar(255) NOT NULL,
  `ltg_det_villa_pmts_rate_per_sq` varchar(255) NOT NULL,
  `ltg_det_villa_pmts_status` varchar(255) NOT NULL,
  `ltg_det_villa_pmts_bed_rooms` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_bath_rooms` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_car_parking` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_year_built` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_plot_dimensions` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_no_of_open_sides` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_main_door_facing` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_corner_villa` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_plot_area` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_balconies` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_furnishing` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_property_flooring` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_approaching_road_width` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_gated_community` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_over_looking` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_other_advantages` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_total_floors` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_transaction_type` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_available_from` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_stamp_duty_registration_charges` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_approval_authority` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_total_project_extent` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_total_units` varchar(255) DEFAULT NULL,
  `ltg_det_villa_pmts_total_phases` varchar(255) DEFAULT NULL,
  `ltg_det_villa_about_project_builder` varchar(255) NOT NULL,
  `ltg_det_villa_amenities` varchar(255) NOT NULL,
  `ltg_det_villa_property_video_url` varchar(255) NOT NULL,
  `ltg_det_audit_user` varchar(255) NOT NULL,
  `ltg_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ltg_det_RowID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_villas`
--

LOCK TABLES `ltg_det_villas` WRITE;
/*!40000 ALTER TABLE `ltg_det_villas` DISABLE KEYS */;
/*!40000 ALTER TABLE `ltg_det_villas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltg_mst`
--

DROP TABLE IF EXISTS `ltg_mst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ltg_mst` (
  `RowID` int NOT NULL AUTO_INCREMENT,
  `ltg_title` varchar(255) NOT NULL,
  `ltg_owner` varchar(255) NOT NULL,
  `ltg_type` varchar(255) NOT NULL,
  `ltg_mark_as_featured` varchar(255) DEFAULT NULL,
  `ltg_regions` varchar(255) NOT NULL,
  `ltg_categories` varchar(255) NOT NULL,
  `ltg_labels` varchar(255) NOT NULL,
  `ltg_audit_user` varchar(255) NOT NULL,
  `ltg_create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ltg_update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_mst`
--

LOCK TABLES `ltg_mst` WRITE;
/*!40000 ALTER TABLE `ltg_mst` DISABLE KEYS */;
INSERT INTO `ltg_mst` VALUES (1,'Test Apartment3','Master','Apartments','true','hyderabad','rent','\"[{\"name\":\"Test Apartment3\",\"color\":\"blue\"}]\"','admin','2024-07-24 09:41:21','2024-07-26 17:21:53'),(2,'Test Villa 3','AssetMakers','Villas','true','hyderabad','rent','\"[{\"name\":\"Test Villa 3\",\"color\":\"green\"}]\"','admin','2024-07-24 09:47:44','2024-07-26 17:25:47'),(9,'test  commertial properties3','AssetMakers','CommercialProperties','false','bengaluru','buy','\"[{\"name\":\"test  commertial properties\",\"color\":\"blue\"}]\"','admin','2024-07-24 10:11:45','2024-07-26 17:26:43'),(8,'Test row houses 3','AssetMakers','RowHouses','true','bengaluru','buy','\"[{\"name\":\"Test row houses 3\",\"color\":\"blue\"}]\"','admin','2024-07-24 10:07:24','2024-07-26 17:27:21'),(7,'Test Plots3','AssetMakers','Plots','true','tirupati','rent','\"[{\"name\":\"Test Plots3\",\"color\":\"green\"}]\"','admin','2024-07-24 10:00:31','2024-07-26 17:27:55'),(11,'test  villaments','AssetMakers','Villaments','true','bengaluru','buy','\"[{\"name\":\"test  villaments\",\"color\":\"blue\"}]\"','admin','2024-07-24 10:26:10','2024-07-26 17:28:14'),(12,'test pent houses 3','AssetMakers','PentHouses','true','bengaluru','buy','\"[{\"name\":\"test pent houses\",\"color\":\"blue\"}]\"','admin','2024-07-24 10:30:08','2024-07-26 17:28:32');
/*!40000 ALTER TABLE `ltg_mst` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ltg_ref`
--

DROP TABLE IF EXISTS `ltg_ref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ltg_ref` (
  `ltg_mstRowID` int NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `audit_user` varchar(255) NOT NULL,
  `audit_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=122 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_ref`
--

LOCK TABLES `ltg_ref` WRITE;
/*!40000 ALTER TABLE `ltg_ref` DISABLE KEYS */;
INSERT INTO `ltg_ref` VALUES (1,'admin-ajax (1).jpeg','\\images\\watermarked-admin-ajax (1).jpeg','Gallery','admin','2024-07-23 18:30:00',1),(1,'admin-ajax (2).jpeg','\\images\\watermarked-admin-ajax (2).jpeg','Gallery','admin','2024-07-25 18:30:00',107),(1,'admin-ajax (3).jpeg','\\images\\watermarked-admin-ajax (3).jpeg','MasterPlan','admin','2024-07-23 18:30:00',3),(1,'admin-ajax (4).jpeg','\\images\\watermarked-admin-ajax (4).jpeg','MasterPlan','admin','2024-07-23 18:30:00',4),(1,'admin-ajax (5).jpeg','\\images\\watermarked-admin-ajax (5).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',5),(1,'admin-ajax (6).jpeg','\\images\\watermarked-admin-ajax (6).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',6),(2,'admin-ajax (1).jpeg','\\images\\watermarked-admin-ajax (1).jpeg','Gallery','admin','2024-07-23 18:30:00',11),(2,'admin-ajax (2).jpeg','\\images\\watermarked-admin-ajax (2).jpeg','Gallery','admin','2024-07-23 18:30:00',12),(2,'admin-ajax (3).jpeg','\\images\\watermarked-admin-ajax (3).jpeg','MasterPlan','admin','2024-07-23 18:30:00',13),(2,'admin-ajax (4).jpeg','\\images\\watermarked-admin-ajax (4).jpeg','MasterPlan','admin','2024-07-23 18:30:00',14),(2,'admin-ajax (5).jpeg','\\images\\watermarked-admin-ajax (5).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',15),(2,'admin-ajax (6).jpeg','\\images\\watermarked-admin-ajax (6).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',16),(1,'Devesh-thumbnail.png','/images/Devesh-thumbnail.png','Brochure','admin','2024-07-25 18:30:00',121),(2,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-23 18:30:00',18),(1,'Devesh.pdf','\\images\\processed-Devesh.pdf','Brochure','admin','2024-07-25 18:30:00',120),(2,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-23 18:30:00',20),(11,'admin-ajax.jpeg','\\images\\watermarked-admin-ajax.jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',92),(11,'admin-ajax (6).jpeg','\\images\\watermarked-admin-ajax (6).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',91),(11,'admin-ajax (4).jpeg','\\images\\watermarked-admin-ajax (4).jpeg','MasterPlan','admin','2024-07-23 18:30:00',90),(11,'admin-ajax (3).jpeg','\\images\\watermarked-admin-ajax (3).jpeg','MasterPlan','admin','2024-07-23 18:30:00',89),(11,'admin-ajax (1).jpeg','\\images\\watermarked-admin-ajax (1).jpeg','Gallery','admin','2024-07-23 18:30:00',87),(11,'admin-ajax (2).jpeg','\\images\\watermarked-admin-ajax (2).jpeg','Gallery','admin','2024-07-23 18:30:00',88),(9,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-23 18:30:00',80),(9,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-23 18:30:00',78),(1,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-25 18:30:00',115),(9,'admin-ajax (4).jpeg','\\images\\watermarked-admin-ajax (4).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',76),(9,'admin-ajax (3).jpeg','\\images\\watermarked-admin-ajax (3).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',75),(9,'admin-ajax (2).jpeg','\\images\\watermarked-admin-ajax (2).jpeg','MasterPlan','admin','2024-07-23 18:30:00',74),(9,'admin-ajax (1).jpeg','\\images\\watermarked-admin-ajax (1).jpeg','MasterPlan','admin','2024-07-23 18:30:00',73),(9,'bengaluru1.jpg','\\images\\watermarked-bengaluru1.jpg','Gallery','admin','2024-07-23 18:30:00',72),(9,'Apartemnets-300x170.jpg','\\images\\watermarked-Apartemnets-300x170.jpg','Gallery','admin','2024-07-23 18:30:00',71),(8,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-23 18:30:00',70),(1,'admin-ajax (3).jpeg','\\images\\watermarked-admin-ajax (3).jpeg','FloorAreaPlan','admin','2024-07-25 18:30:00',119),(8,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-23 18:30:00',68),(1,'developers-onepager-thumbnail.png','/images/developers-onepager-thumbnail.png','Brochure','admin','2024-07-25 18:30:00',113),(8,'admin-ajax.jpeg','\\images\\watermarked-admin-ajax.jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',66),(8,'admin-ajax (6).jpeg','\\images\\watermarked-admin-ajax (6).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',65),(8,'admin-ajax (4).jpeg','\\images\\watermarked-admin-ajax (4).jpeg','MasterPlan','admin','2024-07-23 18:30:00',64),(8,'admin-ajax (3).jpeg','\\images\\watermarked-admin-ajax (3).jpeg','MasterPlan','admin','2024-07-23 18:30:00',63),(8,'admin-ajax (1).jpeg','\\images\\watermarked-admin-ajax (1).jpeg','Gallery','admin','2024-07-23 18:30:00',61),(8,'admin-ajax (2).jpeg','\\images\\watermarked-admin-ajax (2).jpeg','Gallery','admin','2024-07-23 18:30:00',62),(7,'admin-ajax (5).jpeg','\\images\\watermarked-admin-ajax (5).jpeg','Gallery','admin','2024-07-23 18:30:00',51),(7,'admin-ajax (6).jpeg','\\images\\watermarked-admin-ajax (6).jpeg','Gallery','admin','2024-07-23 18:30:00',52),(7,'admin-ajax (3).jpeg','\\images\\watermarked-admin-ajax (3).jpeg','MasterPlan','admin','2024-07-23 18:30:00',53),(7,'admin-ajax (4).jpeg','\\images\\watermarked-admin-ajax (4).jpeg','MasterPlan','admin','2024-07-23 18:30:00',54),(7,'admin-ajax (1).jpeg','\\images\\watermarked-admin-ajax (1).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',55),(7,'admin-ajax (2).jpeg','\\images\\watermarked-admin-ajax (2).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',56),(1,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-25 18:30:00',112),(1,'admin-ajax (5).jpeg','\\images\\watermarked-admin-ajax (5).jpeg','Gallery','admin','2024-07-25 18:30:00',116),(1,'admin-ajax (1).jpeg','\\images\\watermarked-admin-ajax (1).jpeg','FloorAreaPlan','admin','2024-07-25 18:30:00',117),(1,'admin-ajax (2).jpeg','\\images\\watermarked-admin-ajax (2).jpeg','FloorAreaPlan','admin','2024-07-25 18:30:00',118),(11,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-23 18:30:00',94),(1,'developers-onepager.pdf','\\images\\processed-developers-onepager.pdf','Brochure','admin','2024-07-25 18:30:00',110),(11,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-23 18:30:00',96),(12,'admin-ajax (1).jpeg','\\images\\watermarked-admin-ajax (1).jpeg','Gallery','admin','2024-07-23 18:30:00',97),(12,'admin-ajax (2).jpeg','\\images\\watermarked-admin-ajax (2).jpeg','Gallery','admin','2024-07-23 18:30:00',98),(12,'admin-ajax (3).jpeg','\\images\\watermarked-admin-ajax (3).jpeg','MasterPlan','admin','2024-07-23 18:30:00',99),(12,'admin-ajax (4).jpeg','\\images\\watermarked-admin-ajax (4).jpeg','MasterPlan','admin','2024-07-23 18:30:00',100),(12,'admin-ajax (6).jpeg','\\images\\watermarked-admin-ajax (6).jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',101),(12,'admin-ajax.jpeg','\\images\\watermarked-admin-ajax.jpeg','FloorAreaPlan','admin','2024-07-23 18:30:00',102),(1,'admin-ajax.jpeg','\\images\\watermarked-admin-ajax.jpeg','Gallery','admin','2024-07-25 18:30:00',109),(12,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-23 18:30:00',104),(1,'admin-ajax (6).jpeg','\\images\\watermarked-admin-ajax (6).jpeg','Gallery','admin','2024-07-25 18:30:00',108),(12,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-23 18:30:00',106);
/*!40000 ALTER TABLE `ltg_ref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` longtext NOT NULL,
  `name` varchar(45) NOT NULL,
  `number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `purpose` varchar(45) NOT NULL,
  `userId` int NOT NULL,
  `propertyId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userIdMessage_idx` (`userId`),
  KEY `propertyIdMeassage_idx` (`propertyId`),
  CONSTRAINT `propertyIdMeassage` FOREIGN KEY (`propertyId`) REFERENCES `listings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userIdMessage` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (8,'this is dummy message','Sachin Pandey','7668434576','1111sachin2021@gmail.com','buy',13,59);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(800) NOT NULL,
  `address` longtext NOT NULL,
  `price` bigint NOT NULL,
  `bathrooms` int NOT NULL,
  `bedrooms` int NOT NULL,
  `furnished` tinyint NOT NULL DEFAULT '0',
  `parking` tinyint NOT NULL DEFAULT '0',
  `type` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `restaurant` varchar(45) NOT NULL,
  `bus` varchar(45) NOT NULL,
  `school` varchar(45) NOT NULL,
  `size` varchar(25) DEFAULT NULL,
  `flore` int NOT NULL,
  `cityId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `citiId_idx` (`cityId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `prty_citiId` FOREIGN KEY (`cityId`) REFERENCES `cities` (`id`),
  CONSTRAINT `prty_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (59,'City Palace','Future alike hill pull picture swim magic chain seed engineer nest outer raise bound easy poetry gain loud weigh me recognize farmer bare danger. actually put square leg vessels earth engine matter key cup indeed body film century shut place environment were stage vertical roof bottom lady function breeze darkness beside tin view local breathe carbon swam declared magnet escape has from pile apart route coffee storm someone hold space use ahead sheep jungle closely natural attached part top grain your grade trade corn salmon trouble new bend most teacher range anybody every seat fifteen eventually','1234 Broadway St,',1,1,1,1,1,'rent','Villa','2024-04-05 20:19:48','ds','100m away','250m away','127',1,8,13),(64,'asdsad','sad','ads',100000,1,1,1,1,'rent','asd','2024-04-08 14:53:03','sad','sad','ads','123sqrt',1,8,13);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propertyimages`
--

DROP TABLE IF EXISTS `propertyimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propertyimages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) NOT NULL,
  `property_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id_idx` (`property_id`),
  CONSTRAINT `property_id` FOREIGN KEY (`property_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertyimages`
--

LOCK TABLES `propertyimages` WRITE;
/*!40000 ALTER TABLE `propertyimages` DISABLE KEYS */;
/*!40000 ALTER TABLE `propertyimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prty_det_apartment`
--

DROP TABLE IF EXISTS `prty_det_apartment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prty_det_apartment` (
  `prty_det_mstRowID` int NOT NULL,
  `prty_det_sale_price` varchar(255) DEFAULT NULL,
  `prty_det_suffix_price` varchar(255) DEFAULT NULL,
  `prty_det_desc` text NOT NULL,
  `prty_det_location` varchar(255) NOT NULL,
  `prty_det_address` varchar(255) NOT NULL,
  `prty_det_postal_code` varchar(255) NOT NULL,
  `prty_det_latitude` varchar(255) NOT NULL,
  `prty_det_longitude` varchar(255) NOT NULL,
  `prty_det_pmts_area_dts` varchar(255) NOT NULL,
  `prty_det_pmts_rate_per_sq` varchar(255) NOT NULL,
  `prty_det_pmts_status` varchar(255) NOT NULL,
  `prty_det_pmts_bed_rom` varchar(255) NOT NULL,
  `prty_det_pmts_bth_rom` varchar(255) NOT NULL,
  `prty_det_pmts_car_park` varchar(255) NOT NULL,
  `prty_det_pmts_year_build` varchar(255) NOT NULL,
  `prty_det_pmts_total_flrs` varchar(255) NOT NULL,
  `prty_det_pmts_flat_on_flr` varchar(255) NOT NULL,
  `prty_det_pmts_lfts_in_tower` varchar(255) NOT NULL,
  `prty_det_pmts_main_dor_facing` varchar(255) NOT NULL,
  `prty_det_pmts_property_flrg` varchar(255) NOT NULL,
  `prty_det_pmts_balconies` varchar(255) NOT NULL,
  `prty_det_pmts_approaching_road_width` varchar(255) NOT NULL,
  `prty_det_pmts_furnishing` varchar(255) NOT NULL,
  `prty_det_pmts_stamp_duty` varchar(255) NOT NULL,
  `prty_det_pmts_total_project_exnt` varchar(255) NOT NULL,
  `prty_det_pmts_total_blocks` varchar(255) NOT NULL,
  `prty_det_pmts_transaction_type` varchar(255) NOT NULL,
  `prty_det_pmts_total_towers` varchar(255) NOT NULL,
  `prty_det_pmts_total_phases` varchar(255) NOT NULL,
  `prty_det_pmts_approval_authority` varchar(255) NOT NULL,
  `prty_det_pmts_totalunits` varchar(255) NOT NULL,
  `prty_det_pmts_other_advtages` varchar(255) NOT NULL,
  `prty_det_about_project_builder` varchar(255) NOT NULL,
  `prty_det_amenities` varchar(255) NOT NULL,
  `prty_det_property_video_url` varchar(255) NOT NULL,
  `prty_det_audit_user` varchar(255) NOT NULL,
  `prty_det_enabled` tinyint NOT NULL DEFAULT '0',
  `prty_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prty_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prty_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`prty_det_RowID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prty_det_apartment`
--

LOCK TABLES `prty_det_apartment` WRITE;
/*!40000 ALTER TABLE `prty_det_apartment` DISABLE KEYS */;
/*!40000 ALTER TABLE `prty_det_apartment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prty_det_commercial_properties`
--

DROP TABLE IF EXISTS `prty_det_commercial_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prty_det_commercial_properties` (
  `prty_det_mstRowID` int NOT NULL,
  `prty_det_sale_price` varchar(255) DEFAULT NULL,
  `prty_det_suffix_price` varchar(255) DEFAULT NULL,
  `prty_det_desc` text NOT NULL,
  `prty_det_location` varchar(255) NOT NULL,
  `prty_det_address` varchar(255) NOT NULL,
  `prty_det_postal_code` varchar(255) NOT NULL,
  `prty_det_latitude` varchar(255) NOT NULL,
  `prty_det_longitude` varchar(255) NOT NULL,
  `prty_det_pmts_area_dts` varchar(255) NOT NULL,
  `prty_det_pmts_rate_per_sq` varchar(255) NOT NULL,
  `prty_det_pmts_status` varchar(255) NOT NULL,
  `prty_det_pmts_year_built` varchar(255) DEFAULT NULL,
  `prty_det_pmts_balconies` varchar(255) DEFAULT NULL,
  `prty_det_pmts_other_advantages` varchar(255) DEFAULT NULL,
  `prty_det_pmts_furnishing` varchar(255) DEFAULT NULL,
  `prty_det_pmts_car_parking` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_floors` varchar(255) DEFAULT NULL,
  `prty_det_pmts_property_on_floor` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_units` varchar(255) DEFAULT NULL,
  `prty_det_pmts_transaction_type` varchar(255) DEFAULT NULL,
  `prty_det_pmts_approaching_road_width` varchar(255) DEFAULT NULL,
  `prty_det_pmts_approval_authority` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_phases` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_project_extent` varchar(255) DEFAULT NULL,
  `prty_det_pmts_stamp_duty_registration_charges` varchar(255) DEFAULT NULL,
  `prty_det_pmts_property_flooring` varchar(255) DEFAULT NULL,
  `prty_det_amenities` varchar(255) DEFAULT NULL,
  `prty_det_about_project_builder` varchar(255) DEFAULT NULL,
  `prty_det_property_video_url` varchar(255) DEFAULT NULL,
  `prty_det_audit_user` varchar(255) DEFAULT NULL,
  `prty_det_enabled` tinyint NOT NULL DEFAULT '0',
  `prty_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prty_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prty_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`prty_det_RowID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prty_det_commercial_properties`
--

LOCK TABLES `prty_det_commercial_properties` WRITE;
/*!40000 ALTER TABLE `prty_det_commercial_properties` DISABLE KEYS */;
/*!40000 ALTER TABLE `prty_det_commercial_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prty_det_penthouses`
--

DROP TABLE IF EXISTS `prty_det_penthouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prty_det_penthouses` (
  `prty_det_mstRowID` int NOT NULL,
  `prty_det_sale_price` varchar(255) DEFAULT NULL,
  `prty_det_suffix_price` varchar(255) DEFAULT NULL,
  `prty_det_desc` text NOT NULL,
  `prty_det_location` varchar(255) NOT NULL,
  `prty_det_address` varchar(255) NOT NULL,
  `prty_det_postal_code` varchar(255) NOT NULL,
  `prty_det_latitude` varchar(255) NOT NULL,
  `prty_det_longitude` varchar(255) NOT NULL,
  `prty_det_property_address_details` varchar(255) DEFAULT NULL,
  `prty_det_pmts_area_dts` varchar(255) NOT NULL,
  `prty_det_pmts_rate_per_sq` varchar(255) NOT NULL,
  `prty_det_pmts_status` varchar(255) NOT NULL,
  `prty_det_pmts_bed_rooms` varchar(255) NOT NULL,
  `prty_det_pmts_bath_rooms` varchar(255) NOT NULL,
  `prty_det_pmts_car_parking` varchar(255) NOT NULL,
  `prty_det_pmts_year_built` varchar(255) NOT NULL,
  `prty_det_pmts_duplex` varchar(255) NOT NULL,
  `prty_det_pmts_main_door_facing` varchar(255) NOT NULL,
  `prty_det_pmts_gated_community` varchar(255) DEFAULT NULL,
  `prty_det_pmts_corner_penthouse` varchar(255) DEFAULT NULL,
  `prty_det_pmts_balconies` varchar(255) NOT NULL,
  `prty_det_pmts_furnishing` varchar(255) NOT NULL,
  `prty_det_pmts_over_looking` varchar(255) DEFAULT NULL,
  `prty_det_pmts_transaction_type` varchar(255) DEFAULT NULL,
  `prty_det_pmts_property_flooring` varchar(255) DEFAULT NULL,
  `prty_det_pmts_other_advantages` varchar(255) DEFAULT NULL,
  `prty_det_pmts_no_of_open_sides` varchar(255) DEFAULT NULL,
  `prty_det_pmts_approaching_road_width` varchar(255) DEFAULT NULL,
  `prty_det_pmts_available_form` varchar(255) DEFAULT NULL,
  `prty_det_pmts_approval_authority` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_project_extent` varchar(255) DEFAULT NULL,
  `prty_det_pmts_stamp_duty_registration_charges` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_phases` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_units` varchar(255) DEFAULT NULL,
  `prty_det_amenities` varchar(255) NOT NULL,
  `prty_det_about_project_builder` varchar(255) NOT NULL,
  `prty_det_property_video_url` varchar(255) DEFAULT NULL,
  `prty_det_audit_user` varchar(255) DEFAULT NULL,
  `prty_det_enabled` tinyint NOT NULL DEFAULT '0',
  `prty_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prty_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prty_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`prty_det_RowID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prty_det_penthouses`
--

LOCK TABLES `prty_det_penthouses` WRITE;
/*!40000 ALTER TABLE `prty_det_penthouses` DISABLE KEYS */;
/*!40000 ALTER TABLE `prty_det_penthouses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prty_det_plots`
--

DROP TABLE IF EXISTS `prty_det_plots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prty_det_plots` (
  `prty_det_mstRowID` int NOT NULL,
  `prty_det_sale_price` varchar(255) DEFAULT NULL,
  `prty_det_suffix_price` varchar(255) DEFAULT NULL,
  `prty_det_desc` text NOT NULL,
  `prty_det_location` varchar(255) NOT NULL,
  `prty_det_address` varchar(255) NOT NULL,
  `prty_det_postal_code` varchar(255) NOT NULL,
  `prty_det_latitude` varchar(255) NOT NULL,
  `prty_det_longitude` varchar(255) NOT NULL,
  `prty_det_property_address_details` varchar(255) DEFAULT NULL,
  `prty_det_pmts_area_dts` varchar(255) NOT NULL,
  `prty_det_pmts_rate_per_sq` varchar(255) NOT NULL,
  `prty_det_pmts_status` varchar(255) NOT NULL,
  `prty_det_pmts_plot_dimensions` varchar(255) DEFAULT NULL,
  `prty_det_pmts_floors_allowed_for_construction` varchar(255) DEFAULT NULL,
  `prty_det_pmts_no_of_open_sides` varchar(255) DEFAULT NULL,
  `prty_det_pmts_plot_facing` varchar(255) DEFAULT NULL,
  `prty_det_pmts_corner_plot` varchar(255) DEFAULT NULL,
  `prty_det_pmts_gated_community` varchar(255) DEFAULT NULL,
  `prty_det_pmts_boundary_wall_made` varchar(255) DEFAULT NULL,
  `prty_det_pmts_approaching_road_width` varchar(255) DEFAULT NULL,
  `prty_det_pmts_transaction_type` varchar(255) DEFAULT NULL,
  `prty_det_pmts_stamp_duty_registration_charges` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_project_extent` varchar(255) DEFAULT NULL,
  `prty_det_pmts_plot_approval_authority` varchar(255) DEFAULT NULL,
  `prty_det_pmts_year_built` varchar(255) NOT NULL,
  `prty_det_pmts_total_units` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_phases` varchar(255) DEFAULT NULL,
  `prty_det_amenities` varchar(255) DEFAULT NULL,
  `prty_det_about_project_builder` varchar(255) DEFAULT NULL,
  `prty_det_property_video_url` varchar(255) DEFAULT NULL,
  `prty_det_audit_user` varchar(255) DEFAULT NULL,
  `prty_det_enabled` tinyint NOT NULL DEFAULT '0',
  `prty_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prty_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prty_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`prty_det_RowID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prty_det_plots`
--

LOCK TABLES `prty_det_plots` WRITE;
/*!40000 ALTER TABLE `prty_det_plots` DISABLE KEYS */;
/*!40000 ALTER TABLE `prty_det_plots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prty_det_row_houses`
--

DROP TABLE IF EXISTS `prty_det_row_houses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prty_det_row_houses` (
  `prty_det_mstRowID` int NOT NULL,
  `prty_det_sale_price` varchar(255) DEFAULT NULL,
  `prty_det_suffix_price` varchar(255) DEFAULT NULL,
  `prty_det_desc` text NOT NULL,
  `prty_det_location` varchar(255) NOT NULL,
  `prty_det_address` varchar(255) NOT NULL,
  `prty_det_postal_code` varchar(255) NOT NULL,
  `prty_det_latitude` varchar(255) NOT NULL,
  `prty_det_longitude` varchar(255) NOT NULL,
  `prty_det_property_address_details` varchar(255) DEFAULT NULL,
  `prty_det_pmts_area_dts` varchar(255) NOT NULL,
  `prty_det_pmts_rate_per_sq` varchar(255) NOT NULL,
  `prty_det_pmts_status` varchar(255) NOT NULL,
  `prty_det_pmts_bed_rooms` varchar(255) NOT NULL,
  `prty_det_pmts_bath_rooms` varchar(255) NOT NULL,
  `prty_det_pmts_car_parking` varchar(255) NOT NULL,
  `prty_det_pmts_year_built` varchar(255) NOT NULL,
  `prty_det_pmts_plot_dimensions` varchar(255) DEFAULT NULL,
  `prty_det_pmts_land_uds_area` varchar(255) DEFAULT NULL,
  `prty_det_pmts_over_looking` varchar(255) DEFAULT NULL,
  `prty_det_pmts_main_door_facing` varchar(255) DEFAULT NULL,
  `prty_det_pmts_corner_rowhouse` varchar(255) DEFAULT NULL,
  `prty_det_pmts_gated_community` varchar(255) DEFAULT NULL,
  `prty_det_pmts_balconies` varchar(255) DEFAULT NULL,
  `prty_det_pmts_other_advantages` varchar(255) DEFAULT NULL,
  `prty_det_pmts_approaching_road_width` varchar(255) DEFAULT NULL,
  `prty_det_pmts_furnishing` varchar(255) DEFAULT NULL,
  `prty_det_pmts_property_flooring` varchar(255) DEFAULT NULL,
  `prty_det_pmts_no_of_open_sides` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_project_extent` varchar(255) DEFAULT NULL,
  `prty_det_pmts_available_from` varchar(255) DEFAULT NULL,
  `prty_det_pmts_stamp_duty_registration_charges` varchar(255) DEFAULT NULL,
  `prty_det_pmts_transaction_type` varchar(255) DEFAULT NULL,
  `prty_det_pmts_approval_authority` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_units` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_phases` varchar(255) DEFAULT NULL,
  `prty_det_amenities` varchar(255) DEFAULT NULL,
  `prty_det_about_project_builder` varchar(255) DEFAULT NULL,
  `prty_det_property_video_url` varchar(255) DEFAULT NULL,
  `prty_det_audit_user` varchar(255) DEFAULT NULL,
  `prty_det_enabled` tinyint NOT NULL DEFAULT '0',
  `prty_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prty_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prty_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`prty_det_RowID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prty_det_row_houses`
--

LOCK TABLES `prty_det_row_houses` WRITE;
/*!40000 ALTER TABLE `prty_det_row_houses` DISABLE KEYS */;
/*!40000 ALTER TABLE `prty_det_row_houses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prty_det_villaments`
--

DROP TABLE IF EXISTS `prty_det_villaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prty_det_villaments` (
  `prty_det_mstRowID` int NOT NULL,
  `prty_det_sale_price` varchar(255) DEFAULT NULL,
  `prty_det_suffix_price` varchar(255) DEFAULT NULL,
  `prty_det_desc` text NOT NULL,
  `prty_det_location` varchar(255) NOT NULL,
  `prty_det_address` varchar(255) NOT NULL,
  `prty_det_postal_code` varchar(255) NOT NULL,
  `prty_det_latitude` varchar(255) NOT NULL,
  `prty_det_longitude` varchar(255) NOT NULL,
  `prty_det_property_address_details` varchar(255) DEFAULT NULL,
  `prty_det_pmts_area_dts` varchar(255) NOT NULL,
  `prty_det_pmts_rate_per_sq` varchar(255) NOT NULL,
  `prty_det_pmts_status` varchar(255) NOT NULL,
  `prty_det_pmts_bed_rooms` varchar(255) NOT NULL,
  `prty_det_pmts_bath_rooms` varchar(255) NOT NULL,
  `prty_det_pmts_car_parking` varchar(255) NOT NULL,
  `prty_det_pmts_year_built` varchar(255) NOT NULL,
  `prty_det_pmts_land_uds_area` varchar(255) NOT NULL,
  `prty_det_pmts_duplex` varchar(255) NOT NULL,
  `prty_det_pmts_no_of_open_sides` varchar(255) NOT NULL,
  `prty_det_pmts_main_door_facing` varchar(255) NOT NULL,
  `prty_det_pmts_corner_villament` varchar(255) NOT NULL,
  `prty_det_pmts_gated_community` varchar(255) NOT NULL,
  `prty_det_pmts_balconies` varchar(255) NOT NULL,
  `prty_det_pmts_approaching_road_width` varchar(255) NOT NULL,
  `prty_det_pmts_over_looking` varchar(255) NOT NULL,
  `prty_det_pmts_furnishing` varchar(255) NOT NULL,
  `prty_det_pmts_property_flooring` varchar(255) DEFAULT NULL,
  `prty_det_pmts_other_advantages` varchar(255) DEFAULT NULL,
  `prty_det_pmts_available_from` varchar(255) NOT NULL,
  `prty_det_pmts_total_project_extent` varchar(255) NOT NULL,
  `prty_det_pmts_transaction_type` varchar(255) NOT NULL,
  `prty_det_pmts_stamp_duty_registration_charges` varchar(255) NOT NULL,
  `prty_det_pmts_approval_authority` varchar(255) NOT NULL,
  `prty_det_pmts_total_units` varchar(255) NOT NULL,
  `prty_det_pmts_total_phases` varchar(255) NOT NULL,
  `prty_det_amenities` varchar(255) NOT NULL,
  `prty_det_about_project_builder` varchar(255) NOT NULL,
  `prty_det_property_video_url` varchar(255) DEFAULT NULL,
  `prty_det_audit_user` varchar(255) DEFAULT NULL,
  `prty_det_enabled` tinyint NOT NULL DEFAULT '0',
  `prty_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prty_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prty_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`prty_det_RowID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prty_det_villaments`
--

LOCK TABLES `prty_det_villaments` WRITE;
/*!40000 ALTER TABLE `prty_det_villaments` DISABLE KEYS */;
/*!40000 ALTER TABLE `prty_det_villaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prty_det_villas`
--

DROP TABLE IF EXISTS `prty_det_villas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prty_det_villas` (
  `prty_det_mstRowID` int NOT NULL,
  `prty_det_sale_price` varchar(255) DEFAULT NULL,
  `prty_det_suffix_price` varchar(255) DEFAULT NULL,
  `prty_det_desc` text NOT NULL,
  `prty_det_location` varchar(255) NOT NULL,
  `prty_det_address` varchar(255) NOT NULL,
  `prty_det_postal_code` varchar(255) NOT NULL,
  `prty_det_latitude` varchar(255) NOT NULL,
  `prty_det_longitude` varchar(255) NOT NULL,
  `prty_det_property_address_details` varchar(255) DEFAULT NULL,
  `prty_det_pmts_area_dts` varchar(255) NOT NULL,
  `prty_det_pmts_rate_per_sq` varchar(255) NOT NULL,
  `prty_det_pmts_status` varchar(255) NOT NULL,
  `prty_det_pmts_bed_rooms` varchar(255) DEFAULT NULL,
  `prty_det_pmts_bath_rooms` varchar(255) DEFAULT NULL,
  `prty_det_pmts_car_parking` varchar(255) DEFAULT NULL,
  `prty_det_pmts_year_built` varchar(255) DEFAULT NULL,
  `prty_det_pmts_plot_dimensions` varchar(255) DEFAULT NULL,
  `prty_det_pmts_no_of_open_sides` varchar(255) DEFAULT NULL,
  `prty_det_pmts_main_door_facing` varchar(255) DEFAULT NULL,
  `prty_det_pmts_corner_villa` varchar(255) DEFAULT NULL,
  `prty_det_pmts_plot_area` varchar(255) DEFAULT NULL,
  `prty_det_pmts_balconies` varchar(255) DEFAULT NULL,
  `prty_det_pmts_furnishing` varchar(255) DEFAULT NULL,
  `prty_det_pmts_property_flooring` varchar(255) DEFAULT NULL,
  `prty_det_pmts_approaching_road_width` varchar(255) DEFAULT NULL,
  `prty_det_pmts_gated_community` varchar(255) DEFAULT NULL,
  `prty_det_pmts_over_looking` varchar(255) DEFAULT NULL,
  `prty_det_pmts_other_advantages` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_floors` varchar(255) DEFAULT NULL,
  `prty_det_pmts_transaction_type` varchar(255) DEFAULT NULL,
  `prty_det_pmts_available_from` varchar(255) DEFAULT NULL,
  `prty_det_pmts_stamp_duty_registration_charges` varchar(255) DEFAULT NULL,
  `prty_det_pmts_approval_authority` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_project_extent` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_units` varchar(255) DEFAULT NULL,
  `prty_det_pmts_total_phases` varchar(255) DEFAULT NULL,
  `prty_det_about_project_builder` varchar(255) NOT NULL,
  `prty_det_amenities` varchar(255) NOT NULL,
  `prty_det_property_video_url` varchar(255) NOT NULL,
  `prty_det_audit_user` varchar(255) NOT NULL,
  `prty_det_enabled` tinyint NOT NULL DEFAULT '0',
  `prty_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prty_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `prty_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`prty_det_RowID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prty_det_villas`
--

LOCK TABLES `prty_det_villas` WRITE;
/*!40000 ALTER TABLE `prty_det_villas` DISABLE KEYS */;
/*!40000 ALTER TABLE `prty_det_villas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prty_messages`
--

DROP TABLE IF EXISTS `prty_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prty_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` longtext NOT NULL,
  `name` varchar(45) NOT NULL,
  `number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `purpose` varchar(45) NOT NULL,
  `userId` int NOT NULL,
  `propertyId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userIdMessage_idx` (`userId`),
  KEY `propertyIdMeassage_idx` (`propertyId`),
  CONSTRAINT `prty_IdMeassage` FOREIGN KEY (`propertyId`) REFERENCES `property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prty_userIdMessage` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prty_messages`
--

LOCK TABLES `prty_messages` WRITE;
/*!40000 ALTER TABLE `prty_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `prty_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prty_mst`
--

DROP TABLE IF EXISTS `prty_mst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prty_mst` (
  `RowID` int NOT NULL AUTO_INCREMENT,
  `prty_title` varchar(255) NOT NULL,
  `prty_owner` varchar(255) NOT NULL,
  `prty_type` varchar(255) NOT NULL,
  `prty_mark_as_featured` varchar(255) DEFAULT NULL,
  `prty_regions` varchar(255) NOT NULL,
  `prty_categories` varchar(255) NOT NULL,
  `prty_labels` varchar(255) NOT NULL,
  `prty_audit_user` varchar(255) NOT NULL,
  `prty_create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prty_update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`RowID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prty_mst`
--

LOCK TABLES `prty_mst` WRITE;
/*!40000 ALTER TABLE `prty_mst` DISABLE KEYS */;
/*!40000 ALTER TABLE `prty_mst` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prty_ref`
--

DROP TABLE IF EXISTS `prty_ref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prty_ref` (
  `prty_mstRowID` int NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `audit_user` varchar(255) NOT NULL,
  `audit_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`RowID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prty_ref`
--

LOCK TABLES `prty_ref` WRITE;
/*!40000 ALTER TABLE `prty_ref` DISABLE KEYS */;
/*!40000 ALTER TABLE `prty_ref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prtyimages`
--

DROP TABLE IF EXISTS `prtyimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prtyimages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) NOT NULL,
  `property_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id_idx` (`property_id`),
  CONSTRAINT `prty_id` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prtyimages`
--

LOCK TABLES `prtyimages` WRITE;
/*!40000 ALTER TABLE `prtyimages` DISABLE KEYS */;
/*!40000 ALTER TABLE `prtyimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savedlisting`
--

DROP TABLE IF EXISTS `savedlisting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savedlisting` (
  `idSavedListing` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `property_id` int NOT NULL,
  PRIMARY KEY (`idSavedListing`),
  KEY `userId_idx` (`userId`),
  KEY `property_idSaved_idx` (`property_id`),
  CONSTRAINT `property_idSaved` FOREIGN KEY (`property_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userIdSaved` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savedlisting`
--

LOCK TABLES `savedlisting` WRITE;
/*!40000 ALTER TABLE `savedlisting` DISABLE KEYS */;
/*!40000 ALTER TABLE `savedlisting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savedprty`
--

DROP TABLE IF EXISTS `savedprty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savedprty` (
  `idSavedProperty` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `property_id` int NOT NULL,
  PRIMARY KEY (`idSavedProperty`),
  KEY `userId_idx` (`userId`),
  KEY `property_idSaved_idx` (`property_id`),
  CONSTRAINT `prty_idSaved` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prty_userIdSaved` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savedprty`
--

LOCK TABLES `savedprty` WRITE;
/*!40000 ALTER TABLE `savedprty` DISABLE KEYS */;
/*!40000 ALTER TABLE `savedprty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `avatar` varchar(200) DEFAULT '"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png\\"',
  `admin` tinyint NOT NULL DEFAULT '0',
  `phoneno` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Devesh Joshi','dev@dev.com','$2a$10$wq48a8T3M9ZA4dgeakzVueWbLMkyP8dMLObYqIGhWbTqD0SPSLSEy','\"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png\\\"',1,'+919818218929'),(13,'sachin08','1111sachin2021@gmail.com','$2a$10$cgWyjOZNVCqyyuPILD0WfOP6.791R1H.370m90fwSkiPjl3FGARca','https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',1,'7668434576'),(16,'sachin2','sachinpandey262523@gmail.com','$2a$10$sxR3CQnO1R0q94Zd3hRLYOI5FO98IOglPCGBkX/JYYIEeQHjdpbK6','\"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png\\\"',1,'7668434576');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'asset_makers'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-27  3:27:10
