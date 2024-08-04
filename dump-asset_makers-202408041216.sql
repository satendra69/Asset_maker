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
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det`
--

LOCK TABLES `ltg_det` WRITE;
/*!40000 ALTER TABLE `ltg_det` DISABLE KEYS */;
INSERT INTO `ltg_det` VALUES (30,'46514','46545','<p>Test Villa3 Desc</p>\n','VS villas','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1230','5000 per Sq-Ft','upcoming','7','5','4','2024','300*300','4','yes','900 sqft','yes','yes','12','4','undefined','undefined','south','verified','3','12','fully-furnished','included','12','undefined','new_property','undefined','15','BBMU','200','study_room, store_room, servant_room, drawing_room, private_garden, terrace_garden, private_jacuzzi','About Project/Builder\nProject/Builder Details\n','Amphi Theatre, Acupressure walkway, Basketball Court, Billiards, Bar/Lounge, Food Court, Domestic Help Room, Community Hall, Yoga room, Senior Citizen Seating Facilities, Squash Court, Under Ground Drainage, Office Cubicles, 24 Hrs Backup, Gazebo, Ladies Pool, Swimming Pool, Society Office, Intercom, Mini Soccer Ground, Foosball, Footpaths, Cafeteria','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 15:52:47','2024-08-02 20:08:54',13,'July'),(29,'12301','12301','<p>test apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desc</p>\r\n','38V3+CM Pasighat','38V3+CM Pasighat','791102','28.093521400699853','95.30422521023759','undefined','1290','5000 per Sq-Ft','under_construction','3','3','3','2008','undefined','undefined','undefined','undefined','undefined','undefined','12','12','3','3','North-East','verified','3','12','Fully Furnished','Included','12','15','New Property','12','15','BBMU','200','Pooja Room, Study Room, Store Room, Servant Room, drawing_room, private_garden, terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','About Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder Details','Acupressure walkway, Black top roads, Community Hall, Foosball, Gymnasium, Maingate Arch, Rain Water Harvesting, Street Lights, Under Ground Drainage, Yoga room','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 15:42:52','2024-08-02 20:26:42',12,'undefined'),(43,'1230','1230','<p>Test Apartment6 Desc</p>\n','VS test1 apartment','V.S.Epitome apartments, Mumbai','560093','17.38714','78.491684','undefined','12900','5000 per Sq-Ft','ready_to_move','4','4','4','2024','undefined','undefined','undefined','undefined','undefined','undefined','12','12','3','4','South','Verified','4','12','Fully Furnished','Included','12','12','New Property','12','15','BBMU','200','Pooja Room, Study Room, Store Room, drawing_room','About Project/Builder\nProject/Builder Details\n','Acupressure walkway, Badminton Court, Cafeteria, Clinic, Concierge Services, CCTV Surveillance, Black top roads, Amphi Theatre','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-31 11:12:43','2024-07-31 11:12:43',16,'undefined'),(42,'12301','12301','<p>test apart advantages desc</p>\n','VS test1 apartment test apart advantages desc','V.S.Epitome apartments, Varsova Layout','560093','17.38714','78.491684','undefined','12900','5000 per Sq-Ft','ready_to_move','3','3','3','2008','undefined','undefined','undefined','undefined','undefined','undefined','12','4','3','2','West','verified','3','12','Fully Furnished','Included','12','15','New Property','12','15','BBMU','200','Pooja Room, Study Room, Store Room, drawing_room, terrace_garden, private_garden','About Project/Builder\nProject/Builder Details','Acupressure walkway, Concierge Services, Basketball Court, Drainage, Pets Allowed, Kids Play Area, Spa/ Saloon, Swimming Pool, Yoga room, Street Lights, Under Ground Drainage, Gymnasium','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-31 01:28:33','2024-07-31 01:35:50',15,'undefined'),(44,'1000000000','1000000001','<p>Test Villa6 Desc</p>\n','VS villas','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details\n','12900','5000 per Sq-Ft','ready_to_move','8','5','3','2024','300*300','3','yes','900 sqft','yes','yes','12','4','undefined','undefined','west','verified','4','12','fully-furnished','included','12','undefined','new_property','undefined','15','BBMU','200','pooja_room, study_room, store_room, terrace_garden, private_pool','About Project/Builder\nProject/Builder Details\n','Acupressure walkway, Badminton Court, Amphi Theatre, Black top roads, Foosball, Guest Launch, Footpaths, Golf Course, Gym, Food Court','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-31 11:16:24','2024-07-31 11:16:24',17,'July'),(31,'1000000000','1000000001','<p>Test Villa4 Desc</p>\n','VS villas','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1230','5000 per Sq-Ft','ready_to_move','7','4','6','2008','300*300','3','no','900 sqft','yes','yes','12','4','undefined','undefined','north-east','verified','5','12','fully-furnished','included','12','undefined','new_property','undefined','15','BBMU','200','pooja_room, study_room, store_room, servant_room','About Project/Builder\nProject/Builder Details','CCTV Surveillance, Concierge Services, Black top roads, Badminton Court, Acupressure walkway, Amphi Theatre, Basketball Court, Billiards, Club House, Concrete Roads, Community Hall, Children’s Play Area, Bar/Lounge, Basement, Gym, Golf Course, Guest Launch, Gazebo, Elevator','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 15:59:52','2024-07-31 01:55:31',14,'July'),(19,'1230','12301','<p>Test Apartment4 Desc</p>\n','VS test2 apartment','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','undefined','12900','5000 per Sq-Ft','ready_to_move','19','17','11','2024','undefined','undefined','undefined','undefined','undefined','undefined','12','4','3','4','North-West','verified','8','12','Semi Furnished','Included','12','15','Resale','12','15','BBMU','200','private_garden, terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','About Project/Builder\nProject/Builder Details','Badminton Court, Black top roads, Billiards, Bar/Lounge, Children’s Play Area, Club House, Basketball Court, Basement, Security, Steam / Jaccuzi, Library, Home Theatre, Health Facilities, Toddlers Pool, Yoga room, Street Lights, Garden','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 14:26:24','2024-07-31 01:53:23',9,'undefined'),(47,'123011','123011','<p>test apart for images desc <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span> <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>  <span style=\"color: rgb(0,0,0);background-color: rgb(245,243,243);font-size: medium;font-family: Source Sans 3\", sans-serif;\">test apart for images desc</span>&nbsp;&nbsp;</p>\n','826M+8QP, Railway Sta Rd, Govind Nagar, Lakkhi Bagh, Dehradun, Uttarakhand 248001, India','826M+8QP, Railway Sta Rd, Govind Nagar, Lakkhi Bagh, Dehradun, Uttarakhand 248001, India','248001','30.3108256','78.03444259999999','undefined','1290','5000 per Sq-Ft','ready_to_move','3','3','3','2024','undefined','undefined','undefined','undefined','undefined','undefined','12','12','3','3','North','Verified','3','12','Fully Furnished','Included','12','15','New Property','12','15','BBMU','200','Pooja Room, Study Room, Store Room, Servant Room, drawing_room, private_garden, terrace_garden, private_pool, vaastu_compliant, private_jacuzzi','About Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder DetailsAbout Project/Builder\nProject/Builder Details','Acupressure walkway, Amphi Theatre, Children’s Play Area, Drainage, Guest Launch, Home Theatre, Maze Garden, Steam / Jaccuzi, Piped Gas, Under Ground Drainage, Rain Water Harvesting, Party Hall, Yoga room, Under Ground Electricity','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-08-02 03:02:51','2024-08-02 03:31:02',18,'undefined');
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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_commercial_properties`
--

LOCK TABLES `ltg_det_commercial_properties` WRITE;
/*!40000 ALTER TABLE `ltg_det_commercial_properties` DISABLE KEYS */;
INSERT INTO `ltg_det_commercial_properties` VALUES (36,'1000000000','1000000001','<p>Test Comm Prop3 Desc</p>\n','14-172, Shamshabad, Hyderabad, Telangana 501218, India','14-172, Shamshabad, Hyderabad, Telangana 501218, India','501218','17.26530654311873','78.39353946805153','1290','5000 per Sq-Ft','ready_to_move','2024','4','pooja_room, study_room, store_room, private_pool','fully-furnished','15','12','5','200','new_property','12','BBMU','15','12','excluded','verified','Acupressure walkway, Badminton Court, Cafeteria, Clinic, Elevator, Foosball, Golf Course, Health Facilities, Food Court, Community Hall, Yoga room','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 16:22:49','2024-08-02 20:33:24',2),(37,'1230134','2335355','<p>Test Comm Prop4 Desc</p>\n','XM4C+WQH, Arakeri, Karnataka 586104, India','XM4C+WQH, Arakeri, Karnataka 586104, India','586104','16.957191504029','75.67214588354494','12900','5000 per Sq-Ft','ready_to_move','2008','6','pooja_room, study_room, store_room, private_garden, terrace_garden','fully-furnished','14','12','5','200','resale','12','BBMU','15','12','excluded','verified','Acupressure walkway, Badminton Court, Cafeteria, Clinic, Concierge Services, CCTV Surveillance, Black top roads, Amphi Theatre, Basketball Court, Billiards, Club House, Bar/Lounge, Basement, Drainage, Domestic Help Room, Piped Gas, Pharmacy, Society Office','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 16:26:36','2024-08-02 18:06:13',3);
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
  `ltg_det_penthouses_property_address_details` text,
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
  `ltg_det_penthouses_about_project_builder` text,
  `ltg_det_penthouses_property_video_url` varchar(255) DEFAULT NULL,
  `ltg_det_audit_user` varchar(255) DEFAULT NULL,
  `ltg_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ltg_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ltg_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ltg_det_RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_penthouses`
--

LOCK TABLES `ltg_det_penthouses` WRITE;
/*!40000 ALTER TABLE `ltg_det_penthouses` DISABLE KEYS */;
INSERT INTO `ltg_det_penthouses` VALUES (40,'1000000000','2344232323','<p>Test Pent House 3 Desc</p>\n','VS pent houses','V.S.Epitome apartments, Mumbai','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details\n','1230','5000 per Sq-Ft','ready_to_move','7','7','8','2024','yes','north','yes','yes','6','fully-furnished','yes','new_property','verified','study_room, store_room, servant_room, drawing_room, terrace_garden, private_pool','3','12','July','BBMU','12','excluded','15','200','Cricket Practice Pitch, Concierge Services, Clinic, Creche, Elevator, Foosball, Gym, Food Court, Drainage, Yoga room','About Project/Builder\nProject/Builder Details\n','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 16:39:01','2024-08-02 20:34:16',2),(41,'1000000000','1000000001','<p>Test Pent House4 Desc</p>\n','VS pent houses','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','12900','5000 per Sq-Ft','ready_to_move','6','5','6','2024','yes','east','yes','yes','3','fully-furnished','yes','new_property','verified','private_pool, private_jacuzzi','4','12','July','BBMU','12','excluded','15','200','Children’s Play Area, Bar/Lounge, Basement, Basketball Court, Billiards, Club House, Helipad, Intercom, 24 Hrs Backup, Garden, Foosball, Guest Launch','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 16:42:48','2024-07-31 01:51:19',3);
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
  `ltg_det_plot_property_address_details` text,
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
  `ltg_det_plot_about_project_builder` text,
  `ltg_det_plot_property_video_url` varchar(255) DEFAULT NULL,
  `ltg_det_audit_user` varchar(255) DEFAULT NULL,
  `ltg_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ltg_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ltg_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ltg_det_RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_plots`
--

LOCK TABLES `ltg_det_plots` WRITE;
/*!40000 ALTER TABLE `ltg_det_plots` DISABLE KEYS */;
INSERT INTO `ltg_det_plots` VALUES (32,'12301','12301','<p>Test Plot3 Desc</p>\n','VS plots','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1530','5000 per Sq-Ft','ready_to_move','300*300','5','3','north','yes','yes','yes','12','new_property','included','12','BBMU','2024','200','15','Acupressure walkway, Badminton Court, Amphi Theatre, Black top roads, Footpaths, Domestic Help Room, Kids Play Area, Pets Allowed, Steam / Jaccuzi, Senior Citizen Seating Facilities, Swimming Pool, Party Hall, Volleyball Court, Yoga room, Under Ground Drainage, Laundry Service','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 16:02:54','2024-07-31 01:56:16',8),(33,'12301','12301','<p>Test Plot4 Desc</p>\n','VS plots','V.S.Epitome apartments, Mumbai','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details\n','1230','5000 per Sq-Ft','under_construction','300*300','4','2','north','no','no','yes','12','new_property','excluded','12','BBMU','2024','200','15','Community Hall, Children’s Play Area, Bar/Lounge, Basement, Creche, Guest Launch, Gym, Ladies Pool, Public Transport Available, Jogging Track, Supermarket, Piped Gas, Senior Citizen Seating Facilities, Yoga room, Table Tennis, Under Ground Drainage','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 16:06:49','2024-08-02 20:35:41',9),(45,'12301','12301','<p>Test Plot6 Desc</p>\n','Pomonastrasse 12, 3930 Visp, Switzerland','Pomonastrasse 12, 3930 Visp, Switzerland','3930','46.3011378','7.8635004','Property Address (If any more detailed)\nProperty Address Details\n','1230','5000 per Sq-Ft','under_construction','300*300','3','2','north','yes','yes','yes','12','new_property','included','12','BBMU','2024','200','15','Society Boundary Wall, Senior Citizen Seating Facilities, Society Office, Swimming Pool, Street Lights, Supermarket','About Project/Builder\nProject/Builder Details\n','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-31 11:20:23','2024-08-02 19:36:33',10);
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
  `ltg_det_row_house_property_address_details` text,
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
  `ltg_det_row_house_about_project_builder` text,
  `ltg_det_row_house_property_video_url` varchar(255) DEFAULT NULL,
  `ltg_det_audit_user` varchar(255) DEFAULT NULL,
  `ltg_det_create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ltg_det_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ltg_det_RowID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ltg_det_RowID`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_row_houses`
--

LOCK TABLES `ltg_det_row_houses` WRITE;
/*!40000 ALTER TABLE `ltg_det_row_houses` DISABLE KEYS */;
INSERT INTO `ltg_det_row_houses` VALUES (46,'1000000000','1000000001','<p>Test RowHouse6 Desc</p>\n','VS row houses','V.S.Epitome apartments, Mumbai','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1290','5000 per Sq-Ft','ready_to_move','4','4','4','2024','300*300','300','yes','north-west','yes','yes','4','study_room, store_room, servant_room, private_garden, private_pool, terrace_garden','12','fully-furnished','verified','3','12','July','included','new_property','BBMU','200','15','Amphi Theatre, Black top roads, CCTV Surveillance, Club House, Billiards, Basketball Court','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-31 11:24:24','2024-07-31 11:24:24',7),(34,'1230132','1230132','<p>Test Row House3 Desc</p>\n','VS row houses','V.S.Epitome apartments, Bhopal','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','12900','5000 per Sq-Ft','ready_to_move','4','4','6','2024','300*300','300','yes','north','yes','yes','4','pooja_room, study_room, store_room, servant_room','12','fully-furnished','verified','4','12','July','included','new_property','BBMU','200','15','Badminton Court, Acupressure walkway, Amphi Theatre, Black top roads, Billiards, Club House, CCTV Surveillance, Concierge Services, Cricket Practice Pitch, Kids Play Area, Library, Gym, Rain Water Harvesting, Steam / Jaccuzi, Under Ground Drainage, Squash Court, Swimming Pool, Under Ground Water Supply, Yoga room, Volleyball Court, Society Boundary Wall','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 16:10:23','2024-07-31 01:57:50',5),(35,'12301','12301','<p>Test Row House4 Desc</p>\n','89, Shishak Colony, Kalmana Market, Kalmana, Nagpur, Maharashtra 440008, India','89, Shishak Colony, Kalmana Market, Kalmana, Nagpur, Maharashtra 440008, India','440008','21.161168508054637','79.15086368750002','Property Address (If any more detailed)\nProperty Address Details','1230','5000 per Sq-Ft','under_construction','5','5','5','2024','300*300','300','yes','west','yes','yes','7','terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','12','fully-furnished','verified','2','12','July','excluded','new_property','BBMU','200','15','Piped Gas, Library, Helipad, Intercom, Maze Garden, Senior Citizen Seating Facilities, Society Boundary Wall, Swimming Pool, Society Office, Supermarket, Table Tennis, Street Lights','About Project/Builder\nProject/Builder Details\n','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 16:14:03','2024-08-02 20:07:45',6);
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_villaments`
--

LOCK TABLES `ltg_det_villaments` WRITE;
/*!40000 ALTER TABLE `ltg_det_villaments` DISABLE KEYS */;
INSERT INTO `ltg_det_villaments` VALUES (38,'1000000000','1000000001','<p>Test Villament3 Desc</p>\n','CG4F+5X Ghati Subramanya, Karnataka, India','CG4F+5X Ghati Subramanya, Karnataka, India','561203','17.38714','77.52488712500002','Property Address (If any more detailed)\nProperty Address Details\n','1230','5000 per Sq-Ft','ready_to_move','6','6','7','2024','300','3','3','north','yes','yes','5','12','yes','fully-furnished','verified','pooja_room, study_room, store_room, servant_room','July','12','new_property','included','BBMU','200','15','Cafeteria, Clinic, CCTV Surveillance, Concierge Services, Foosball, Guest Launch, Golf Course, Footpaths','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 16:31:22','2024-08-02 20:05:44',3),(39,'1000000000','2344232222','<p>Test Villament4 Desc</p>\n','Shop No 102 Plot No 5 Tata Colony, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051, India','Shop No 102 Plot No 5 Tata Colony, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051, India','400051','19.06062459450083','72.85707096289065','Property Address (If any more detailed)\nProperty Address Details','12900','5000 per Sq-Ft','ready_to_move','6','6','6','2024','300','7','3','west','yes','yes','5','12','yes','fully-furnished','verified','terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','July','12','new_property','included','BBMU','200','15','Black top roads, Foosball, Cricket Practice Pitch, Concierge Services, CCTV Surveillance, Footpaths, Golf Course, Domestic Help Room, Concrete Roads','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 16:35:37','2024-08-02 18:07:12',4);
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
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_mst`
--

LOCK TABLES `ltg_mst` WRITE;
/*!40000 ALTER TABLE `ltg_mst` DISABLE KEYS */;
INSERT INTO `ltg_mst` VALUES (36,'Test Comm Prop3','Master','CommercialProperties','true','hyderabad','buy','\"[{\"name\":\"Test Comm Prop3\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:52:49','2024-08-02 15:03:24'),(29,'test apart','Master','Apartments','true','hyderabad','rent','\"[{\"name\":\"test apart 1111111\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:12:52','2024-08-02 14:56:42'),(37,'Test Comm Prop4','AssetMakers','CommercialProperties','false','tirupati','rent','\"[{\"name\":\"Test Comm Prop4\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:56:36','2024-08-02 12:36:13'),(38,'Test Villament3','Master','Villaments','true','hyderabad','buy','\"[{\"name\":\"Test Villament3\",\"color\":\"blue\"}]\"','admin','2024-07-30 11:01:22','2024-08-02 14:35:44'),(39,'Test Villament4','AssetMakers','Villaments','false','bengaluru','buy','\"[{\"name\":\"Test Villament4\",\"color\":\"blue\"}]\"','admin','2024-07-30 11:05:37','2024-08-02 12:37:12'),(40,'Test Pent House 3','Master','PentHouses','false','hyderabad','buy','\"[{\"name\":\"Test Pent House 3\",\"color\":\"blue\"}]\"','admin','2024-07-30 11:09:01','2024-08-02 15:04:13'),(41,'Test Pent House4','AssetMakers','PentHouses','false','tirupati','rent','\"[{\"name\":\"Test Pent House4\",\"color\":\"blue\"}]\"','admin','2024-07-30 11:12:48','2024-07-30 20:21:19'),(35,'Test Row House4','AssetMakers','RowHouses','false','hyderabad','rent','\"[{\"name\":\"Test Row House4\",\"color\":\"green\"}]\"','admin','2024-07-30 10:44:03','2024-08-02 14:37:45'),(19,'Test Apartment4','Master','Apartments','false','bengaluru','buy','\"[{\"name\":\"Test Apartment4\",\"color\":\"green\"}]\"','admin','2024-07-30 08:56:24','2024-07-30 20:23:23'),(30,'Test Villa3','Master','Villas','true','bengaluru','buy','\"[{\"name\":\"Test Villa3\",\"color\":\"green\"}]\"','admin','2024-07-30 10:22:47','2024-08-02 14:38:54'),(31,'Test Villa4','Master','Villas','false','hyderabad','buy','\"[{\"name\":\"Test Villa4\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:29:52','2024-07-30 20:25:31'),(32,'Test Plot3','Master','Plots','true','hyderabad','buy','\"[{\"name\":\"Test Plot3\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:32:54','2024-07-30 20:26:16'),(33,'Test Plot4','AssetMakers','Plots','false','hyderabad','rent','\"[{\"name\":\"Test Plot4\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:36:49','2024-08-02 15:05:41'),(34,'Test Row House3','Master','RowHouses','true','tirupati','buy','\"[{\"name\":\"Test Row House3\",\"color\":\"red\"}]\"','admin','2024-07-30 10:40:23','2024-07-30 20:27:50'),(42,'test apart advantages','AssetMakers','Apartments','true','bengaluru','buy','\"[{\"name\":\"test1\",\"color\":\"blue\"}]\"','admin','2024-07-30 19:58:33','2024-07-30 20:05:50'),(43,'Test Apartment6','AssetMakers','Apartments','true','hyderabad','rent','[{\"name\":\"Test Apartment6\",\"color\":\"blue\"}]','admin','2024-07-31 05:42:42','2024-07-31 05:42:42'),(44,'Test Villa6','Master','Villas','false','bengaluru','buy','[{\"name\":\"Test Villa6\",\"color\":\"blue\"}]','admin','2024-07-31 05:46:24','2024-07-31 05:46:24'),(45,'Test Plot6','Master','Plots','true','hyderabad','buy','\"[{\"name\":\"Test Plot6\",\"color\":\"blue\"}]\"','admin','2024-07-31 05:50:23','2024-08-02 14:06:33'),(46,'Test RowHouse6','AssetMakers','RowHouses','false','tirupati','buy','[{\"name\":\"Test RowHouse6\",\"color\":\"blue\"}]','admin','2024-07-31 05:54:24','2024-07-31 05:54:24'),(47,'test apart for images','Master','Apartments','true','tirupati','buy','\"[{\"name\":\"test apart for images 1\",\"color\":\"blue\"}]\"','admin','2024-08-01 21:32:51','2024-08-01 22:01:02');
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
) ENGINE=MyISAM AUTO_INCREMENT=616 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_ref`
--

LOCK TABLES `ltg_ref` WRITE;
/*!40000 ALTER TABLE `ltg_ref` DISABLE KEYS */;
INSERT INTO `ltg_ref` VALUES (41,'pexels-photo-276724.webp','\\images\\watermarked-pexels-photo-276724.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',400),(41,'pexels-photo-2062426.webp','\\images\\watermarked-pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',401),(41,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','Gallery','admin','2024-07-29 18:30:00',399),(41,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','MasterPlan','admin','2024-07-29 18:30:00',463),(41,'pexels-photo-271816.webp','\\images\\watermarked-pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',398),(41,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',462),(33,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',334),(33,'pexels-photo-1918291.jpeg','\\images\\watermarked-pexels-photo-1918291.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',335),(38,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-29 18:30:00',456),(29,'pexels-photo-1918291.jpeg','\\images\\pexels-photo-1918291.jpeg','Gallery','admin','2024-07-30 18:30:00',560),(39,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',457),(34,'pexels-photo-2062426.webp','\\images\\watermarked-pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',340),(34,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',341),(41,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',461),(40,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-07-29 18:30:00',460),(35,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','Gallery','admin','2024-07-29 18:30:00',347),(35,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',468),(36,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','Gallery','admin','2024-07-29 18:30:00',353),(36,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','MasterPlan','admin','2024-07-29 18:30:00',355),(42,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',444),(42,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',445),(42,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-07-29 18:30:00',441),(42,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-29 18:30:00',442),(42,'pexels-photo-1918291.jpeg','\\images\\pexels-photo-1918291.jpeg','MasterPlan','admin','2024-07-29 18:30:00',443),(37,'pexels-photo-271816.webp','\\images\\watermarked-pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',362),(37,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','Gallery','admin','2024-07-29 18:30:00',363),(37,'pexels-photo-276625.webp','\\images\\watermarked-pexels-photo-276625.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',364),(37,'pexels-photo-276724.webp','\\images\\watermarked-pexels-photo-276724.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',365),(42,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',439),(42,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-07-29 18:30:00',440),(38,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-08-01 18:30:00',601),(38,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-29 18:30:00',372),(40,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','MasterPlan','admin','2024-08-01 18:30:00',602),(38,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',375),(37,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',449),(37,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',450),(37,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','MasterPlan','admin','2024-07-29 18:30:00',451),(38,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',452),(39,'pexels-photo-271816.webp','\\images\\watermarked-pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',380),(39,'pexels-photo-2062426.webp','\\images\\watermarked-pexels-photo-2062426.webp','Gallery','admin','2024-07-29 18:30:00',381),(39,'pexels-photo-276625.webp','\\images\\watermarked-pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',382),(39,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','MasterPlan','admin','2024-07-29 18:30:00',383),(39,'pexels-photo-276724.webp','\\images\\watermarked-pexels-photo-276724.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',384),(39,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',385),(29,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','MasterPlan','admin','2024-07-30 18:30:00',562),(36,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','Main','admin','2024-07-30 18:30:00',540),(36,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',447),(40,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',393),(29,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',305),(40,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Main','admin','2024-07-29 18:30:00',458),(29,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-29 18:30:00',303),(33,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','Gallery','admin','2024-07-29 18:30:00',331),(42,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-29 18:30:00',438),(19,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-07-29 18:30:00',470),(29,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','Main','admin','2024-07-30 18:30:00',548),(32,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','Gallery','admin','2024-07-29 18:30:00',325),(35,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',467),(19,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-07-29 18:30:00',471),(32,'pexels-photo-271816.webp','\\images\\watermarked-pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',324),(31,'pexels-photo-1918291.jpeg','\\images\\watermarked-pexels-photo-1918291.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',319),(29,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','Gallery','admin','2024-07-30 18:30:00',561),(31,'pexels-photo-271816.webp','\\images\\watermarked-pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',314),(31,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','Gallery','admin','2024-07-29 18:30:00',315),(31,'pexels-photo-276625.webp','\\images\\watermarked-pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',316),(31,'pexels-photo-2062426.webp','\\images\\watermarked-pexels-photo-2062426.webp','MasterPlan','admin','2024-07-29 18:30:00',317),(31,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',318),(35,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',465),(35,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','MasterPlan','admin','2024-07-29 18:30:00',466),(35,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',464),(38,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-29 18:30:00',454),(29,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','Gallery','admin','2024-07-30 18:30:00',559),(42,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-29 18:30:00',436),(19,'pexels-photo-2062426.webp','\\images\\watermarked-pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',420),(19,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',421),(19,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Main','admin','2024-07-29 18:30:00',469),(19,'pexels-photo-276724.webp','\\images\\watermarked-pexels-photo-276724.webp','MasterPlan','admin','2024-07-29 18:30:00',418),(19,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-29 18:30:00',419),(33,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-08-01 18:30:00',615),(30,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',476),(30,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',477),(30,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','MasterPlan','admin','2024-07-29 18:30:00',479),(30,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',481),(33,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','MasterPlan','admin','2024-08-01 18:30:00',603),(31,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',483),(32,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',484),(32,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',485),(32,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','MasterPlan','admin','2024-07-29 18:30:00',486),(32,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',487),(32,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',488),(33,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',489),(34,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',490),(34,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-07-29 18:30:00',491),(34,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-07-29 18:30:00',492),(34,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','MasterPlan','admin','2024-07-29 18:30:00',493),(34,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','MasterPlan','admin','2024-07-29 18:30:00',494),(43,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-30 18:30:00',495),(43,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','Gallery','admin','2024-07-30 18:30:00',496),(43,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','Gallery','admin','2024-07-30 18:30:00',497),(43,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','MasterPlan','admin','2024-07-30 18:30:00',498),(43,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','MasterPlan','admin','2024-07-30 18:30:00',499),(43,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',500),(43,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-30 18:30:00',501),(33,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-08-01 18:30:00',612),(44,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-30 18:30:00',506),(44,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-07-30 18:30:00',507),(44,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-07-30 18:30:00',508),(44,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-30 18:30:00',509),(44,'pexels-photo-1918291.jpeg','\\images\\pexels-photo-1918291.jpeg','MasterPlan','admin','2024-07-30 18:30:00',510),(44,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','FloorAreaPlan','admin','2024-07-30 18:30:00',511),(44,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',512),(44,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-30 18:30:00',514),(44,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-30 18:30:00',516),(45,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-30 18:30:00',517),(45,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Gallery','admin','2024-07-30 18:30:00',518),(45,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','Gallery','admin','2024-07-30 18:30:00',519),(45,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','MasterPlan','admin','2024-07-30 18:30:00',520),(45,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','MasterPlan','admin','2024-07-30 18:30:00',521),(45,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',522),(45,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','FloorAreaPlan','admin','2024-07-30 18:30:00',523),(46,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','Main','admin','2024-07-30 18:30:00',528),(46,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','Gallery','admin','2024-07-30 18:30:00',529),(46,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','Gallery','admin','2024-07-30 18:30:00',530),(46,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','MasterPlan','admin','2024-07-30 18:30:00',531),(46,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-30 18:30:00',532),(46,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','FloorAreaPlan','admin','2024-07-30 18:30:00',533),(46,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',534),(46,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-30 18:30:00',536),(46,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-30 18:30:00',538),(36,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','MasterPlan','admin','2024-07-30 18:30:00',543),(36,'pexels-photo-1918291.jpeg','\\images\\pexels-photo-1918291.jpeg','MasterPlan','admin','2024-07-30 18:30:00',544),(36,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',545),(36,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',546),(29,'developers-onepager.pdf','\\images\\processed-developers-onepager.pdf','Brochure','admin','2024-08-01 18:30:00',604),(29,'developers-onepager-thumbnail.png','/images/developers-onepager-thumbnail.png','Brochure','admin','2024-08-01 18:30:00',605),(29,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-30 18:30:00',563),(29,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',565),(29,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',566),(47,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-07-31 18:30:00',599),(47,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-31 18:30:00',592),(47,'pexels-photo-1918291.jpeg','\\images\\pexels-photo-1918291.jpeg','MasterPlan','admin','2024-07-31 18:30:00',593),(47,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-31 18:30:00',594),(47,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-31 18:30:00',595),(47,'developers-onepager.pdf','\\images\\processed-developers-onepager.pdf','Brochure','admin','2024-07-31 18:30:00',578),(47,'OneSignal Overview 23\'.pdf','\\images\\processed-OneSignal Overview 23\'.pdf','Brochure','admin','2024-07-31 18:30:00',579),(47,'developers-onepager-thumbnail.png','/images/developers-onepager-thumbnail.png','Brochure','admin','2024-07-31 18:30:00',580),(47,'OneSignal Overview 23\'-thumbnail.png','/images/OneSignal Overview 23\'-thumbnail.png','Brochure','admin','2024-07-31 18:30:00',581),(47,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-07-31 18:30:00',598),(47,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-31 18:30:00',589);
/*!40000 ALTER TABLE `ltg_ref` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (31,'devesh11','deveshjoshi013@gmail.com','$2b$10$5V7zguGN7peoViaUgQYMgurThTkeIcMYyfvJZB2beTWzGz5ehgFhy','\"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png\\\"',1);
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

-- Dump completed on 2024-08-04 12:16:43
