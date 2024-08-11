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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `listing_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (9,'Buy',NULL,NULL),(10,'Rent',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiries`
--

DROP TABLE IF EXISTS `inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `listing_type` varchar(50) NOT NULL,
  `property_id` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `purpose` varchar(50) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiries`
--

LOCK TABLES `inquiries` WRITE;
/*!40000 ALTER TABLE `inquiries` DISABLE KEYS */;
/*!40000 ALTER TABLE `inquiries` ENABLE KEYS */;
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
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det`
--

LOCK TABLES `ltg_det` WRITE;
/*!40000 ALTER TABLE `ltg_det` DISABLE KEYS */;
INSERT INTO `ltg_det` VALUES (30,'46514','46545','<p>Test Villa3 Desc</p>\n','VS villas','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1230','5000 per Sq-Ft','upcoming','7','5','4','2024','300*300','4','yes','900 sqft','yes','yes','12','4','undefined','undefined','south','verified','3','12','fully-furnished','included','12','undefined','new_property','undefined','15','BBMU','200','study_room, store_room, servant_room, drawing_room, private_garden, terrace_garden, private_jacuzzi','About Project/Builder\nProject/Builder Details\n','Amphi Theatre, Acupressure walkway, Basketball Court, Billiards, Bar/Lounge, Food Court, Domestic Help Room, Community Hall, Yoga room, Senior Citizen Seating Facilities, Squash Court, Under Ground Drainage, Office Cubicles, 24 Hrs Backup, Gazebo, Ladies Pool, Swimming Pool, Society Office, Intercom, Mini Soccer Ground, Foosball, Footpaths, Cafeteria','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 15:52:47','2024-08-02 20:08:54',13,'July'),(29,'12301','12301','<p>test apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desc</p>\r\n','38V3+CM Pasighat','38V3+CM Pasighat','791102','28.093521400699853','95.30422521023759','undefined','1290','5000 per Sq-Ft','under_construction','3','3','3','2008','undefined','undefined','undefined','undefined','undefined','undefined','12','12','3','3','North-East','verified','3','12','Fully Furnished','Included','12','15','New Property','12','15','BBMU','200','Pooja Room, Study Room, Store Room, Servant Room, drawing_room, private_garden, terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','About Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/Builder','Acupressure walkway, Black top roads, Community Hall, Foosball, Gymnasium, Maingate Arch, Rain Water Harvesting, Street Lights, Under Ground Drainage, Yoga room, Golf Course, Piped Gas, Water Overhead Tank','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 15:42:52','2024-08-07 11:24:44',12,'undefined'),(43,'1230','1230','<p>Test Apartment6 Desc</p>\n','VS test1 apartment','V.S.Epitome apartments, Mumbai','560093','17.38714','78.491684','undefined','12900','5000 per Sq-Ft','ready_to_move','4','4','4','2024','undefined','undefined','undefined','undefined','undefined','undefined','12','12','3','4','South','Verified','4','12','Fully Furnished','Included','12','12','New Property','12','15','BBMU','200','Pooja Room, Study Room, Store Room, drawing_room','About Project/Builder\nProject/Builder Details\n','Acupressure walkway, Badminton Court, Cafeteria, Clinic, Concierge Services, CCTV Surveillance, Black top roads, Amphi Theatre','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-31 11:12:43','2024-07-31 11:12:43',16,'undefined'),(44,'1000000000','1000000001','<p>Test Villa6 Desc</p>\n','VS villas','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details\n','12900','5000 per Sq-Ft','ready_to_move','8','5','3','2024','300*300','3','yes','900 sqft','yes','yes','12','4','undefined','undefined','west','verified','4','12','fully-furnished','included','12','undefined','new_property','undefined','15','BBMU','200','pooja_room, study_room, store_room, terrace_garden, private_pool','About Project/Builder\nProject/Builder Details\n','Acupressure walkway, Badminton Court, Amphi Theatre, Black top roads, Foosball, Guest Launch, Footpaths, Golf Course, Gym, Food Court','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-31 11:16:24','2024-07-31 11:16:24',17,'July'),(31,'1000000000','1000000001','<p>Test Villa4 Desc</p>\n','VS villas','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1230','5000 per Sq-Ft','ready_to_move','7','4','6','2008','300*300','3','no','900 sqft','yes','yes','12','4','undefined','undefined','north-east','verified','5','12','fully-furnished','included','12','undefined','new_property','undefined','15','BBMU','200','pooja_room, study_room, store_room, servant_room','About Project/Builder\nProject/Builder Details','CCTV Surveillance, Concierge Services, Black top roads, Badminton Court, Acupressure walkway, Amphi Theatre, Basketball Court, Billiards, Club House, Concrete Roads, Community Hall, Children’s Play Area, Bar/Lounge, Basement, Gym, Golf Course, Guest Launch, Gazebo, Elevator','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 15:59:52','2024-07-31 01:55:31',14,'July'),(19,'1230','12301','<p>Test Apartment4 Desc</p>\n','VS test2 apartment','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','undefined','12900','5000 per Sq-Ft','ready_to_move','19','17','11','2024','undefined','undefined','undefined','undefined','undefined','undefined','12','4','3','4','North-West','verified','8','12','Semi Furnished','Included','12','15','Resale','12','15','BBMU','200','private_garden, terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','About Project/Builder\nProject/Builder Details','Badminton Court, Black top roads, Billiards, Bar/Lounge, Children’s Play Area, Club House, Basketball Court, Basement, Security, Steam / Jaccuzi, Library, Home Theatre, Health Facilities, Toddlers Pool, Yoga room, Street Lights, Garden','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 14:26:24','2024-07-31 01:53:23',9,'undefined');
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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_det_commercial_properties`
--

LOCK TABLES `ltg_det_commercial_properties` WRITE;
/*!40000 ALTER TABLE `ltg_det_commercial_properties` DISABLE KEYS */;
INSERT INTO `ltg_det_commercial_properties` VALUES (36,'1000000000','1000000001','<p>Test Comm Prop3 Desc</p>\n','14-172, Shamshabad, Hyderabad, Telangana 501218, India','14-172, Shamshabad, Hyderabad, Telangana 501218, India','501218','17.26530654311873','78.39353946805153','1290','5000 per Sq-Ft','ready_to_move','2024','4','pooja_room, study_room, store_room, private_pool','fully-furnished','15','12','5','200','new_property','12','BBMU','15','12','excluded','verified','Acupressure walkway, Badminton Court, Cafeteria, Clinic, Elevator, Foosball, Golf Course, Health Facilities, Food Court, Community Hall, Yoga room','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 16:22:49','2024-08-04 18:26:03',2),(37,'1230134','2335355','<p>Test Comm Prop4 Desc</p>\n','XM4C+WQH, Arakeri, Karnataka 586104, India','XM4C+WQH, Arakeri, Karnataka 586104, India','586104','16.957191504029','75.67214588354494','12900','5000 per Sq-Ft','ready_to_move','2008','6','pooja_room, study_room, store_room, private_garden, terrace_garden','fully-furnished','14','12','5','200','resale','12','BBMU','15','12','excluded','verified','Acupressure walkway, Badminton Court, Cafeteria, Clinic, Concierge Services, CCTV Surveillance, Black top roads, Amphi Theatre, Basketball Court, Billiards, Club House, Bar/Lounge, Basement, Drainage, Domestic Help Room, Piped Gas, Pharmacy, Society Office','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 16:26:36','2024-08-02 18:06:13',3),(48,'12301','12301','<p>test comm prop 1</p>\n','Shop No 44, Beside Idea Cellular Ltd, Khan Lateef Khan Estate, Fateh Maidan, Club Road, Fateh Maidan, Abids, Hyderabad, Telangana 500001, India','Shop No 44, Beside Idea Cellular Ltd, Khan Lateef Khan Estate, Fateh Maidan, Club Road, Fateh Maidan, Abids, Hyderabad, Telangana 500001, India','500001','17.397296417098737','78.4741745395508','1290','5000 per Sq-Ft','ready_to_move','2024','2','pooja_room','fully-furnished','3','12','5','200','new_property','12','BBMU','15','12','included','verified','Acupressure walkway, Black top roads, Concrete Roads, Food Court, Garden, Elevator, Public Transport Available, Piped Gas, Ladies Pool, Senior Citizen Seating Facilities, Squash Court, Under Ground Drainage, Yoga room','\nUnder Ground Drainage\n\nVolleyball Court\n\nWater Overhead Tank\n\nYoga room\nAbout Project/Builder\nProject/Builder Details\nUnder Ground Drainage\n\nVolleyball Court\n\nWater Overhead Tank\n\nYoga room\nAbout Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-08-04 13:00:06','2024-08-04 13:00:06',4);
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
INSERT INTO `ltg_det_penthouses` VALUES (40,'1000000000','2344232323','<p>Test Pent House 3 Desc</p>\n','VS pent houses','V.S.Epitome apartments, Mumbai','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details\n','1230','5000 per Sq-Ft','ready_to_move','7','7','8','2024','yes','north','yes','yes','6','fully-furnished','yes','new_property','verified','study_room, store_room, servant_room, drawing_room, terrace_garden, private_pool','3','12','July','BBMU','12','excluded','15','200','Cricket Practice Pitch, Concierge Services, Clinic, Creche, Elevator, Foosball, Gym, Food Court, Drainage, Yoga room','About Project/Builder\nProject/Builder Details\n','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 16:39:01','2024-08-02 20:34:16',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_mst`
--

LOCK TABLES `ltg_mst` WRITE;
/*!40000 ALTER TABLE `ltg_mst` DISABLE KEYS */;
INSERT INTO `ltg_mst` VALUES (19,'Test Apartment4','Master','Apartments','false','bengaluru','buy','\"[{\"name\":\"Test Apartment4\",\"color\":\"green\"}]\"','admin','2024-07-30 08:56:24','2024-07-30 20:23:23'),(29,'test apart','Master','Apartments','true','hyderabad','rent','\"[{\"name\":\"test apart 1111111\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:12:52','2024-08-07 05:54:44'),(30,'Test Villa3','Master','Villas','true','bengaluru','buy','\"[{\"name\":\"Test Villa3\",\"color\":\"green\"}]\"','admin','2024-07-30 10:22:47','2024-08-02 14:38:54'),(31,'Test Villa4','Master','Villas','false','hyderabad','buy','\"[{\"name\":\"Test Villa4\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:29:52','2024-07-30 20:25:31'),(32,'Test Plot3','Master','Plots','true','hyderabad','buy','\"[{\"name\":\"Test Plot3\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:32:54','2024-07-30 20:26:16'),(33,'Test Plot4','AssetMakers','Plots','false','hyderabad','rent','\"[{\"name\":\"Test Plot4\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:36:49','2024-08-02 15:05:41'),(34,'Test Row House3','Master','RowHouses','true','tirupati','buy','\"[{\"name\":\"Test Row House3\",\"color\":\"red\"}]\"','admin','2024-07-30 10:40:23','2024-07-30 20:27:50'),(35,'Test Row House4','AssetMakers','RowHouses','false','hyderabad','rent','\"[{\"name\":\"Test Row House4\",\"color\":\"green\"}]\"','admin','2024-07-30 10:44:03','2024-08-02 14:37:45'),(36,'Test Comm Prop3','Master','CommercialProperties','true','hyderabad','buy','\"[{\"name\":\"Test Comm Prop3\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:52:49','2024-08-04 12:56:03'),(37,'Test Comm Prop4','AssetMakers','CommercialProperties','false','tirupati','rent','\"[{\"name\":\"Test Comm Prop4\",\"color\":\"blue\"}]\"','admin','2024-07-30 10:56:36','2024-08-02 12:36:13'),(38,'Test Villament3','Master','Villaments','true','hyderabad','buy','\"[{\"name\":\"Test Villament3\",\"color\":\"blue\"}]\"','admin','2024-07-30 11:01:22','2024-08-02 14:35:44'),(39,'Test Villament4','AssetMakers','Villaments','false','bengaluru','buy','\"[{\"name\":\"Test Villament4\",\"color\":\"blue\"}]\"','admin','2024-07-30 11:05:37','2024-08-02 12:37:12'),(40,'Test Pent House 3','Master','PentHouses','false','hyderabad','buy','\"[{\"name\":\"Test Pent House 3\",\"color\":\"blue\"}]\"','admin','2024-07-30 11:09:01','2024-08-02 15:04:13'),(43,'Test Apartment6','AssetMakers','Apartments','true','hyderabad','rent','[{\"name\":\"Test Apartment6\",\"color\":\"blue\"}]','admin','2024-07-31 05:42:42','2024-07-31 05:42:42'),(44,'Test Villa6','Master','Villas','false','bengaluru','buy','[{\"name\":\"Test Villa6\",\"color\":\"blue\"}]','admin','2024-07-31 05:46:24','2024-07-31 05:46:24'),(45,'Test Plot6','Master','Plots','true','hyderabad','buy','\"[{\"name\":\"Test Plot6\",\"color\":\"blue\"}]\"','admin','2024-07-31 05:50:23','2024-08-02 14:06:33'),(46,'Test RowHouse6','AssetMakers','RowHouses','false','tirupati','buy','[{\"name\":\"Test RowHouse6\",\"color\":\"blue\"}]','admin','2024-07-31 05:54:24','2024-07-31 05:54:24'),(48,'test comm prop','Master','CommercialProperties','true','bengaluru','buy','[{\"name\":\"test comm prop 1\",\"color\":\"blue\"}]','admin','2024-08-04 07:30:06','2024-08-04 07:30:06');
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
) ENGINE=MyISAM AUTO_INCREMENT=679 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ltg_ref`
--

LOCK TABLES `ltg_ref` WRITE;
/*!40000 ALTER TABLE `ltg_ref` DISABLE KEYS */;
INSERT INTO `ltg_ref` VALUES (33,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',334),(33,'pexels-photo-1918291.jpeg','\\images\\watermarked-pexels-photo-1918291.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',335),(39,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',457),(34,'pexels-photo-2062426.webp','\\images\\watermarked-pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',340),(34,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',341),(40,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-07-29 18:30:00',460),(35,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','Gallery','admin','2024-07-29 18:30:00',347),(35,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',468),(36,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','Gallery','admin','2024-07-29 18:30:00',353),(37,'pexels-photo-271816.webp','\\images\\watermarked-pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',362),(37,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','Gallery','admin','2024-07-29 18:30:00',363),(37,'pexels-photo-276625.webp','\\images\\watermarked-pexels-photo-276625.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',364),(37,'pexels-photo-276724.webp','\\images\\watermarked-pexels-photo-276724.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',365),(38,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-08-01 18:30:00',601),(38,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-29 18:30:00',372),(40,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','MasterPlan','admin','2024-08-01 18:30:00',602),(38,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',375),(37,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',449),(37,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',450),(37,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','MasterPlan','admin','2024-07-29 18:30:00',451),(38,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',452),(39,'pexels-photo-271816.webp','\\images\\watermarked-pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',380),(39,'pexels-photo-2062426.webp','\\images\\watermarked-pexels-photo-2062426.webp','Gallery','admin','2024-07-29 18:30:00',381),(39,'pexels-photo-276625.webp','\\images\\watermarked-pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',382),(39,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','MasterPlan','admin','2024-07-29 18:30:00',383),(39,'pexels-photo-276724.webp','\\images\\watermarked-pexels-photo-276724.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',384),(39,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',385),(36,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','Main','admin','2024-07-30 18:30:00',540),(36,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',447),(40,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',393),(40,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Main','admin','2024-07-29 18:30:00',458),(33,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','Gallery','admin','2024-07-29 18:30:00',331),(19,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-07-29 18:30:00',470),(32,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','Gallery','admin','2024-07-29 18:30:00',325),(35,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',467),(19,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-07-29 18:30:00',471),(32,'pexels-photo-271816.webp','\\images\\watermarked-pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',324),(31,'pexels-photo-1918291.jpeg','\\images\\watermarked-pexels-photo-1918291.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',319),(29,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','Main','admin','2024-08-06 18:30:00',675),(31,'pexels-photo-271816.webp','\\images\\watermarked-pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',314),(31,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','Gallery','admin','2024-07-29 18:30:00',315),(31,'pexels-photo-276625.webp','\\images\\watermarked-pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',316),(31,'pexels-photo-2062426.webp','\\images\\watermarked-pexels-photo-2062426.webp','MasterPlan','admin','2024-07-29 18:30:00',317),(31,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',318),(35,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',465),(35,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','MasterPlan','admin','2024-07-29 18:30:00',466),(35,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',464),(19,'pexels-photo-2062426.webp','\\images\\watermarked-pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',420),(19,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',421),(19,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Main','admin','2024-07-29 18:30:00',469),(19,'pexels-photo-276724.webp','\\images\\watermarked-pexels-photo-276724.webp','MasterPlan','admin','2024-07-29 18:30:00',418),(19,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-29 18:30:00',419),(29,'pexels-photo-2029667.jpeg','\\images\\watermarked-pexels-photo-2029667.jpeg','MasterPlan','admin','2024-08-06 18:30:00',677),(29,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-08-06 18:30:00',678),(30,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',476),(30,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Gallery','admin','2024-07-29 18:30:00',477),(30,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','MasterPlan','admin','2024-07-29 18:30:00',479),(30,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',481),(33,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','MasterPlan','admin','2024-08-01 18:30:00',603),(31,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',483),(32,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',484),(32,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','MasterPlan','admin','2024-07-29 18:30:00',485),(32,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','MasterPlan','admin','2024-07-29 18:30:00',486),(32,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-29 18:30:00',487),(32,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-29 18:30:00',488),(33,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',489),(34,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-29 18:30:00',490),(34,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-07-29 18:30:00',491),(34,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-07-29 18:30:00',492),(34,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','MasterPlan','admin','2024-07-29 18:30:00',493),(34,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','MasterPlan','admin','2024-07-29 18:30:00',494),(43,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-30 18:30:00',495),(43,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','Gallery','admin','2024-07-30 18:30:00',496),(43,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','Gallery','admin','2024-07-30 18:30:00',497),(43,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','MasterPlan','admin','2024-07-30 18:30:00',498),(43,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','MasterPlan','admin','2024-07-30 18:30:00',499),(43,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',500),(43,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','FloorAreaPlan','admin','2024-07-30 18:30:00',501),(29,'pexels-photo-1918291.jpeg','\\images\\pexels-photo-1918291.jpeg','Gallery','admin','2024-08-06 18:30:00',676),(44,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-30 18:30:00',506),(44,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-07-30 18:30:00',507),(44,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-07-30 18:30:00',508),(44,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-30 18:30:00',509),(44,'pexels-photo-1918291.jpeg','\\images\\pexels-photo-1918291.jpeg','MasterPlan','admin','2024-07-30 18:30:00',510),(44,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','FloorAreaPlan','admin','2024-07-30 18:30:00',511),(44,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',512),(29,'developersOnepager.pdf','\\images\\developersOnepager.pdf','Brochure','admin','2024-08-04 18:30:00',674),(45,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-07-30 18:30:00',517),(45,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Gallery','admin','2024-07-30 18:30:00',518),(45,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','Gallery','admin','2024-07-30 18:30:00',519),(45,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','MasterPlan','admin','2024-07-30 18:30:00',520),(45,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','MasterPlan','admin','2024-07-30 18:30:00',521),(45,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',522),(45,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','FloorAreaPlan','admin','2024-07-30 18:30:00',523),(48,'pexels-photo-1918291.jpeg','\\images\\watermarked-pexels-photo-1918291.jpeg','FloorAreaPlan','admin','2024-08-03 18:30:00',622),(48,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','Gallery','admin','2024-08-03 18:30:00',618),(48,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','MasterPlan','admin','2024-08-03 18:30:00',619),(46,'pexels-photo-2467285.jpeg','\\images\\pexels-photo-2467285.jpeg','Main','admin','2024-07-30 18:30:00',528),(46,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','Gallery','admin','2024-07-30 18:30:00',529),(46,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','Gallery','admin','2024-07-30 18:30:00',530),(46,'pexels-photo-276724.webp','\\images\\pexels-photo-276724.webp','MasterPlan','admin','2024-07-30 18:30:00',531),(46,'pexels-photo-1428348.jpeg','\\images\\pexels-photo-1428348.jpeg','MasterPlan','admin','2024-07-30 18:30:00',532),(46,'pexels-photo-2029667.jpeg','\\images\\pexels-photo-2029667.jpeg','FloorAreaPlan','admin','2024-07-30 18:30:00',533),(46,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',534),(36,'developersOnepager.pdf','\\images\\developersOnepager.pdf','Brochure','admin','2024-08-03 18:30:00',664),(48,'pexels-photo-1428348.jpeg','\\images\\watermarked-pexels-photo-1428348.jpeg','FloorAreaPlan','admin','2024-08-03 18:30:00',621),(36,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',545),(36,'pexels-photo-2062426.webp','\\images\\pexels-photo-2062426.webp','FloorAreaPlan','admin','2024-07-30 18:30:00',546),(48,'pexels-photo-2467285.jpeg','\\images\\watermarked-pexels-photo-2467285.jpeg','MasterPlan','admin','2024-08-03 18:30:00',620),(48,'pexels-photo-276625.webp','\\images\\pexels-photo-276625.webp','Gallery','admin','2024-08-03 18:30:00',617),(48,'pexels-photo-271816.webp','\\images\\pexels-photo-271816.webp','Main','admin','2024-08-03 18:30:00',616);
/*!40000 ALTER TABLE `ltg_ref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (2,'Bengaluru','',12.97159870,77.59456270,'Bengaluru, Karnataka, India'),(3,'Hyderabad','',17.40649800,78.47724390,'Hyderabad, Telangana, India'),(4,'Tirupati','',13.62875570,79.41917950,'Tirupati, Andhra Pradesh, India');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_properties`
--

DROP TABLE IF EXISTS `saved_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `property_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `saved_properties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `saved_properties_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `ltg_mst` (`RowID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_properties`
--

LOCK TABLES `saved_properties` WRITE;
/*!40000 ALTER TABLE `saved_properties` DISABLE KEYS */;
INSERT INTO `saved_properties` VALUES (16,31,43);
/*!40000 ALTER TABLE `saved_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `photo` blob,
  `rating` int NOT NULL DEFAULT '5',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,'Sangeeta Goyal','IT Professional | Bengaluru','We are quite happy with the way Asset Makers team deal and navigate the real estate purchase or sale transaction with purchaser and seller, to be frank i experienced both the versions of property transactions with them and i am not much aware how does all this modalities work since i indulge in my IT domain. I do not stop referring them with in my references which is out of affection. Thanks !!',_binary '�\��\�\0JFIF\0\0\0\0\0\0�\��ICC_PROFILE\0\0\0\�\0\0\0\0\0\0\0mntrRGB XYZ \�\0\0\0\0$\0acsp\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\�\�\0\0\0\0\0\�-\0\0\0\0)�=ޯ\�U�xB�\�ʃ9\r\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0desc\0\0D\0\0\0ybXYZ\0\0�\0\0\0bTRC\0\0\�\0\0dmdd\0\0	\�\0\0\0�gXYZ\0\0\nh\0\0\0gTRC\0\0\�\0\0lumi\0\0\n|\0\0\0meas\0\0\n�\0\0\0$bkpt\0\0\n�\0\0\0rXYZ\0\0\n\�\0\0\0rTRC\0\0\�\0\0tech\0\0\n\�\0\0\0vued\0\0\n\�\0\0\0�wtpt\0\0p\0\0\0cprt\0\0�\0\0\07chad\0\0�\0\0\0,desc\0\0\0\0\0\0\0sRGB IEC61966-2-1 black scaled\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0XYZ \0\0\0\0\0\0$�\0\0�\0\0�\�curv\0\0\0\0\0\0\0\0\0\0\0\n\0\0\0\0\0#\0(\0-\02\07\0;\0@\0E\0J\0O\0T\0Y\0^\0c\0h\0m\0r\0w\0|\0�\0�\0�\0�\0�\0�\0�\0�\0�\0�\0�\0�\0�\0�\0\�\0\�\0\�\0\�\0\�\0\�\0\�\0\�\0\�\0\�\0�\r%+28>ELRY`gnu|���������\�\�\�\�\�\��&/8AKT]gqz�������\�\�\�\�\�\0!-8COZfr~�����\�\�\�\�� -;HUcq~����\�\�\�\��\r+:IXgw����\�\�\�\�\'7HYj{����\�\�\�+=Oat����\�\��2FZn����\�\��		%	:	O	d	y	�	�	�	\�	\�	�\n\n\'\n=\nT\nj\n�\n�\n�\n\�\n\�\n\�\"9Qi���\�\��*C\\u���\�\�\r\r\r&\r@\rZ\rt\r�\r�\r\�\r\�\r�.Id��\�\�	%A^z��\�\�	&Ca~��\�\�1Om��\�\�&Ed��\�\�#Cc��\�\�\'Ij��\�\�4Vx��\�&Il��\��Ae��\�\�@e��\�� Ek��\�\Z\Z*\ZQ\Zw\Z�\Z\�\Z\�;c��\�*R{�\�\�Gp�\�\�@j��\�>i��\�  A l � \� \�!!H!u!�!\�!�\"\'\"U\"�\"�\"\�#\n#8#f#�#\�#\�$$M$|$�$\�%	%8%h%�%\�%\�&\'&W&�&�&\�\'\'I\'z\'�\'\�(\r(?(q(�(\�))8)k)�)\�**5*h*�*\�++6+i+�+\�,,9,n,�,\�--A-v-�-\�..L.�.�.\�/$/Z/�/\�/�050l0�0\�11J1�1�1\�2*2c2�2\�3\r3F33�3\�4+4e4�4\�55M5�5\�5�676r6�6\�7$7`7�7\�88P8�8\�99B99�9�:6:t:�:\�;-;k;�;\�<\'<e<�<\�=\"=a=�=\�> >`>�>\�?!?a?�?\�@#@d@�@\�A)AjA�A\�B0BrB�B\�C:C}C�DDGD�D\�EEUE�E\�F\"FgF�F\�G5G{G�HHKH�H\�IIcI�I\�J7J}J\�KKSK�K\�L*LrL�MMJM�M\�N%NnN�O\0OIO�O\�P\'PqP�QQPQ�Q\�R1R|R\�SS_S�S\�TBT�T\�U(UuU\�VV\\V�V\�WDW�W\�X/X}X\�Y\ZYiY�ZZVZ�Z\�[E[�[\�\\5\\�\\\�]\']x]\�^\Z^l^�__a_�``W`�`�aOa�a\�bIb�b\�cCc�c\�d@d�d\�e=e�e\�f=f�f\�g=g�g\�h?h�h\�iCi�i\�jHj�j\�kOk�k�lWl�mm`m�nnkn\�ooxo\�p+p�p\�q:q�q\�rKr�ss]s�ttpt\�u(u�u\�v>v�v�wVw�xxnx\�y*y�y\�zFz�{{c{\�|!|�|\�}A}�~~b~\�#�\�G���\n�k�͂0���\�W������\�G����r�ׇ;����i�Ή3�����d�ʋ0�����c�ʍ1�����f�Ώ6����n�֑?����z�\�M��� ���\��_�ɖ4���\n�u�\��L���$�����h�՛B������\��d�Ҟ@��������i�ءG���&����v�\�V�ǥ8���\Z�����n�\�R�ĩ7�������u�\�\\�ЭD���-������\0�u�\�`�ֲK�³8���%�������y�\�h�\�Y�ѹJ�º;���.���!������\n�����z�\��p�\��g�\�\�_\�\�\�X\�\�\�Q\�\�\�K\�\�\�F\�\�\�Aǿ\�=ȼ\�:ɹ\�8ʷ\�6˶\�5̵\�5͵\�6ζ\�7ϸ\�9к\�<Ѿ\�?\��\�D\�\�\�I\�\�\�N\�\�\�U\�\�\�\\\�\�\�d\�\�\�l\�\�\�v\��ۀ\�܊\�ݖ\�ޢ\�)߯\�6\�\�D\�\�\�S\�\�\�c\�\�\�s\��\�\�\r\�\�\�\�2\�\�F\�\�\�[\�\�\�p\��\�\�\�\�(\�\�@\�\�\�X\�\�\�r\��\�\�\�\�4\�\�\�P\�\�\�m\��\������8�\��W�\��w����)���K�\��m��desc\0\0\0\0\0\0\0.IEC 61966-2-1 Default RGB Colour Space - sRGB\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0XYZ \0\0\0\0\0\0b�\0\0��\0\0\�XYZ \0\0\0\0\0\0\0\0\0P\0\0\0\0\0\0meas\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0XYZ \0\0\0\0\0\0\0\03\0\0�XYZ \0\0\0\0\0\0o�\0\08\�\0\0�sig \0\0\0\0CRT desc\0\0\0\0\0\0\0-Reference Viewing Condition in IEC 61966-2-1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0XYZ \0\0\0\0\0\0\�\�\0\0\0\0\0\�-text\0\0\0\0Copyright International Color Consortium, 2009\0\0sf32\0\0\0\0\0D\0\0\���\�&\0\0�\0\0����������\0\0\�\0\0�u�\�\06Photoshop 3.0\08BIM\0\0\0\0\0g\0luFI5t09bZJ23z0OrRA1\0�\�\0C\0				\r\r\n\Z!\'\"#%%%),($+!$%$�\�\0C				$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$��\0\0�\0�\"\0�\�\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0=\0\0\0\0\0!1AQ\"aq#2��B��3R�$b\�\�\�\�\�s���\�\0\Z\0\0\0\0\0\0\0\0\0\0\0\0�\�\0)\0\0\0\0\0\0\0!1A\"2Q#a��\�\��\�\0\0\0?\0�o�K6�~o%d\�X\�o���p~��ڥ\�Z|�M2*\�\\��w\�g��\�\�O�(h6�-\�\�s%\��YdA\\\�\�0H\���\�f�c�\�\\Ǿ�LEcFPA|��nk��v\����\�\�*\��\0ݚ���\�\�V�Z�`c\rc\�q̟\�To\��\0�h\�\�\�{`%\�*\�2	>���YK\�Vig\���(\�\"\��@9�=�\�ǭ\�I\�\Z\�m6�\�\�H���A��a�G\'\�Q悋���1Sq�BU�J�Y��ӒW#\�\����P��\�?�\'}>%�K���|\�\0��a�\�3�\�\�V\�w\�\��+M�\�\��ź��\�ۏ�\�g\�L\�\�\�3kr��y�5�\�:�\�ڃ\�ݾ�d�!�nz��\�x�\�hf����I\�@l0 \�\�?Z\��\�\�\�~�[��-P\�\�˵Ѱr�\�\�5]z\Z㬴�A~fk%��c��l�0\��\�\�=�\�:R9\'u��\�Y�)�\�d�����9 7\��QN{�$�6�L\�4���\�.�\�\�9\�I��t�\0u�!p\�\�\�nOa\�@��\�E\�\�ۥt嶅T�\�	c\�\��_�O\�n#w��\�\r��\�E\�|\03\��>\�Y�զ6\�e��\���v(9r�\0\�~8$�\��ԯbۙ��B+��\�\�̏ ���}h\����\�\���2*�\�\�t��\ZP�\0;�ެ���G�)�l�����\�3��i#\�\��r�ߵk:O��Z��.�{47�,��\�I\�~�\�ԍ�YF\�\�\�4�\0\�\�H�\�Νp�Vm�Qp\�؃\�C�KQ�\�z˔?\�Z����\�H\�m\�[\�i�\�s�r>n\�U�\�\�R�ޚ������Y\�1\�\�\�N\�KZ~�w\r�ԟ�\�\"319>��Q�\��\�\�\�\�\�#N�\�\�1\\�\�\�\�\�׵yF1\�Gr:��6�/�cPմg\�\�ҝ`��u���j0\�\�0#\�\�qK\���\�v�\�\�Ḏ�\00\�8;��p?oJ\�}�\�j\�y�\�\�&\�\�,x\�&p3�^FqB4%���+h�\�K9D�žU\�\�\�4\�qZ�㸼v�}\�N���\�\��U�ڊ0�B\�\�R�\�hCM\�\�b�RI\0���\'\�\�R�௲Y\�\�\�}.\�Zi�z�ί&�3F�\r�G\�\�\��i�-i%�+�j+yy4�\��%�\�\�\�ޑ:EZ\�\\	,\�x2\�y�a�w\�\����u�^iڌ<p\�a|\�2���#�)c���YT��=͠����\�\�qks\�ʥ�\�8*d\'8�\0_Z:�\�=Օ\�g\�+ܼw\'\�U \�T\�=\�\�3A\�~���[[�\�,\�8�\�y\�~sZ��&�g֗�\�Ek�L�7\�\�\�?�\�k�\�N.�L��X�.zo�5C\�\�nngU%>t��G\�^\�\�L0�����C{*J�d܊\�b9\�G\�ڻ\�\�Iu�����;q�\�\�\�\�\�\�<�\�yIn�\��\�8�n�\�\�(�蚑j\�(��\�8�\��\n\�6�l{\�}&Y���e\n\�\�`Y�\�\�98\���(\�L\0e\�\�\�\�%u6��$W\�J\�\"2a7\r�H\�\�iS\�jF!ㆹ�C�/R\'%#1Ϸz�\���=d\�Hy##\"����\�\�&�\�%\�$\�֋\����a��D�9N\�\�9���X�\�v�N�\�\�孄&K�\�$\�c�U\�o4-v)-\�9V4L?|Q}[N��\�\���;F>f���g@]\�x.�R�\�Z2\�R>\�&7��K�wHȵ\�]����\�х\Z\�\�\�\�.���\�\�-\�a����\��=u\�MA�[\�\��o�R?S\�\�i6�I��\�+rF?��\0Z�9~H\�\�\�<�t��\��\�\��A\�\�5�\�\�\�\�$�)\\\�\�}*�\�\�\�R\�\�\�\�R-���YJ�Tw\��\�!\�N�{\�W6���PMo��C��g?6Oq�+Ӛ�\�4\�f�b�\�J\�\�vt\'e~\�\�n\�\�5�տ\���:�Ѭ��rn\�]]����\���\���\�\��lt�Mf\�Y�� �5?<\�$\�\�\�֖\���\�5�\�<\�2\�vf\�NNy\�\��э;�nmQ�\�#ݹr7)\�\�\�GMdn\�&��hj�\�:j=��w�#�2	\�\n�~R\�\��Y\�E\"+B���bT�\�!Gυ\\�#f��O�mB��$m��%�2FW�ÏJ�\�-�i�l\�\�k@2|��NH ��}�[�yo-V\�ƥ2d\�\�\�\�\�\�=��fi\�\"�cFFikf\�\�-u�}\'}�\�\�\�4\�$�\�Ōc\�lqڴm+ī\�k��uif1��\r�K�\�A\�?��f\��C�j6Z-܋m,\�C\�G��B��/�|1�1|m��t�b�[{]\�\�\�\�\�M\��)y ����Wv7hz旬�6����$;c`F�\0R6�{�\�-��wm6&x�Vm�K��\�\�o�e�\�:�L�}wX��c2y�\�Y�!�\�\��<V��\��E���4̒VL��;j�\�\�\�\�\�r[\�\Z\�\�\���[8�W�.��Gӌ\��\�|`\�%���\�d�\�eeٝ\�`\�?�2t�\\\'P\�cW�\�\�@����2�B���\��x�\�_\�u��8h�%�\�zn87:aë3�Zq\�s\�\�MmZ.�dtKD�n\�A\�\�V\rr\�b[\�M��\�\���\0\\�D\�\�\rY�\�O\�o��)���\r޹fV8m\�4�1\�~\�-\�\�}\�\�Eg?)�\�*\�F�K5�TFq\�2�\����6v�=h\�\�Y$��W?U\�\�4��]a����\�\�*;�E$\�$\�5ƀz�x\��h�c�Hh�\��{\�N�\�b���\\�-Q\�\0��`\��\0�P\�Vx�66\�\"\�\�\��Y\�\�d3��_G;���\�d��\�B\���\�j���-\�B@�j�\�q�+\���:�����ʊс\��\�\�(L0\�-\�,�\�l�?J\�e�#͉)�<��m�IUێh��Բ\�j�\�$I��WU\�Xg�ڼ\�\0X%\�\�X{P?O��\�Y[?��G\�I�X\�M�\�^\�V�\�\��\�\"�~xc\�u\0\�\�\�\�>\�+\�>�qC!�\�;Y�\�~�g�\�J�\�\�c�YO�\�\�җz�FӾ68\�K�˅D�S6\n\�\��\0\�rE0xe<�į�G\�ۆ�ޱ�\��]I^�b���\\\�_�5跻C%\�T�\��:ORM*\�J\�\�ʹ��\n��\�\�\�\��\��c�[>)jG�\�+)<\�F��È�|\�S�b03\�)M�\�m{�X�F�P7|�@�\�i\�+����\�A\�}�\0\�ޙ5��\'m\�����_\�H\'�\�B\�\r$h��ďc�}iqz�X\�\���;��\r�9PW�[�I�\�\'�iIX(���}���1\�.\�\�*b\�n\�đ\�\�>�jCU]���\�QZ=c�ͥH�;����x�Ρ�[��v�\'�+�\�;�|6I\'�\�\�\�\��\�\�/\�\�i�#\\�Ī4�DM�횦\�\�\�ъ���;�V�&J\�v\'�\�\��\"}\�j;\�:Ԗ�E+\� ��y?z�p�:��e̥���;�t\�%����MKi\�F\�s\\�ғ����U�����\�MF1s�kn\�Gw?\��{\�\��y�h�V걢���Q^zSOk=<H\�\�%\�\�ں_hu%İ\�d\��l�[?QJrrt�6�\�\�:�_�X\�m\�+$v\�̃Չ\�gہ\\�ܓ�RU��\��\0O\�9�\�@�A�t��ꎭ\�OSY�\��\0\n��p���\0ҬN)THr)7l����<�A5C\�DΙh\�Oe\�\��Z}�Z�!VR�H����|\�.\���I\�W���3_Fr\��H�\0\��\0\�R�xK�F�Y�\��\�)Y\�\�1�:�46\�L\�e�j\�Jp�<=\�@���z��}Y\�(�\0<�ˢ�\�]A�\�E\�����;%\�\�;\\\"d��ERl�\�$\�c��nC\�\�E\�Ԗ ��\�Fs��}^�\�\�+\�\�3VOG��\�_�1\�!\�֍�.�X[\�\n:�\�IdІ\�\0I���f_-\�XʒLc�\�}*\���eam,2��\�T�w\�s�\�\�c��\�0\�FX�ҋ\�h�G�b��<w>��*��xL>R\�\"�Z��^A.�<�!* \�V3J\�\�{QB$\�t�\�\�\�E�\r8^_\"�\�\�T�FV5��zs\�9n�T\�V\�S2΢�\�\�m>G��\�\�\�\�؊+gfڅ�p\"�@\�\���\�\�\��>Br\�\��&����ħ�4\nOӊ\�\�gNRQ\�Y\Zu\�\��6�8\�4X�bC eg�\'�6|�h^X\�1�\�\�Ob\�\\��\�crO\���P��,=�a{\�Npr03\�^\��\0>d�*��\�\�\�\�V2L�\�\�R\�\�2A>�\�i��t#��ce#��Dc��1H\���pN=x5�\��Q�ڢ`r���܌\�\�\�N״��a��\�m\0�\�rx�\�E\��\�\�on�\�-�M�#?q\��\�d\�\�G��\�\�(U\�ԉ!��ޥu\�9,c\�E\�O	fLy�W8ϽJ���$\�`��\�x�#�5h�}�\�\�\�#�\Z\�\'\�:E��\�3��PrY�\���l\�u�}=\�\"F*\�_�(�`\�\�>��9>\�\�\�QGy�\�X^i\�w�&kq\�ݗ�U#�NGԜU�^�kIc�\�FخY�,̠eFs�9\�\�Iz\�\�\���\�\"0�%\�\�\�`کŋ\�:�/���l��X4�$�L\�\�\�T�f���\���s�\�:+�@<�\�Q�����@�\nS�\�\�43px\�o.�F-7p�H\�R\�!\�KpV����\�\�\'&�3�خ\�\�\�j\�j\�6q\�g\��O�=��5:E\"\�7��	\��l��>qA\�\�/\�zH��\�K�\���(���:\0\�?%�\�\�YVb�\�}�l\�\�\��V�\n���A\�\�\�r(�Z�\rݿo\�R\�nExҏ@�LK�8T\�0\���MK�\�s\�ڇ\�E�\�\0�\��\��H\�>\�v�\\7l�\�D\�x\�\0\Z\�s�\r������\�\ZG;nK��\�\�{�Q 4�\rԝ�f\�}H\��L�x-\�4H\�6m\�9\�]��\"�~T�C\�^K���Jq�л�̥cBIoJۤobƿl\�w\�&[j\�\��\�nsTm4G�.	 �%ߌv\�é46j\�\�\"G\ZY�\�Ҹ\�\�\�\�\�\'\�OÒF���R���`\�N��\�mϨ�M�\�\0\�-J\�fZ3\r#�\�\�F\�[+\�G\�\�\��\�\�y�m[�ouE˨M;\0#s�\�?@=�\�ǥ\�v{��v�\�hڇ\�\�\�\�\�5~��I�\�\���4g �\�R�em\r\�\��sM�\�:��aj�E\�4s|���@8\�oZ%\�\�c䝄+b8\��v\�-\�\��ٙ\n\�I��cAƘ\�4\�\�\�\"v�1�\�U|\�\�\\�|\"��.V#��\�l\�\�=۽�A�\��\�\�G�\�^g,�\�rc#����\�`\�\�J%\�\�,q\�\�\�\��sN<|�l�\�5�\0�b\�b@�n#��}O\�==�\�\�V\�7��\�\�y&�PG1�\��\��פuT\�:gM��e�\�Ё�?pjL��\���\�\�r20\����\�^fs�*7[A^#r\�*�?8=��\0\��2H\�TXz})#R?m\�|��\0{5\�\�8�\�\��E��\nGN\�\�~`��`/��\�ɛ\�Е�w\�>\�\�\'�M !G\��\�E�7\�q�=+\�\�P\��v\�Pv�XH�w��S\�pI\�4�\�gw�2���%u#s�\�a\�G\�\\�9۞I\��Ա�\�[���%�\����en;cn2;\n\�ȼ\�XС�j:�&\�\�iن\���:G\�]#�\�\�m\"�.`Ȳ�\�\0,{�ϥy\��kB\�1�\�T�$nP��rp)Q��\�\�F��Y#C�Xv�t�%�g\��F�a�[��n��B3�<��\�*Wζ\�]Y�a�h\�%�Ԡ\���l\�\�-Vs\0wm\�Uk��p	���b\�\�4�E�=�R�}\���\nQ�\�T\�f?޶k�q\�2��naӦ�Ȕ�W*W�\����i\�+%�ѽ�g�A���\���i�]�}?I���\�\�}�\�\�b�y\�\',ŉ>�\�0\�;&\�eRT\�u8\�\�\0܂�\'9��v\�\�\�����M�K�(��`�wv\�\�A�6\�S\�\�x$�J���\�ܿ\�Or~��\�]OO��\�+xR+{@Q(8�Q䒄uC<h7\�gʗ��\�\�)\\|�>�\���<\Z\�_�4\�J2w]\��\��h7Zv�+\�	�,��c\��\0c_Dt\�w\�V�Ɓ��G`(rJ\�EJ\Z\��X\�Io\�W�T\��\�\�V�9\0��My�F\�h9�\��\�\����;)v\���\np3�\�2\�\�L\�\�hC�^�/�3\r�)b}Z�E� �G$�{Qd��W\���\�+R�tR��\0b\�/�\�h\�fS\����.d��\�\�\�KX��\�\��[�&0hK��1vqY2��oJqL���\�5j^H\�o#p\�\ZS\�,�\�ѫC�\�C����&\�c\�p(E��)�$���\�J\�_\��D��\Z\'Y\�n\�\r-m\�4�[\�#\�n�/�.\�gh\�K`�H���\�5a��_*5=\����\�K\�W�zD7:�\�w�۾3�ǧ3\�+�Z�b�T_X\�	��k �h^g\0\�\�\�\n<2\�d�:��hҳK�x&?.\�ز�}�\�^:��\�-kM�\�\"����y�m��b�\�\�miap�]\�GS0\n\�\�\�\��W�Ij�POm�\�\�\�T�QV$U\n��F;\�@/\�\�2�qV��2 c����j�z}�\�\�L�ƿ\�\��\r\�2*�ZŌ1�\�A\0�\�޴\�\�f\�m\�\�~H�@_�\"������\�h����A��\�{��V�\�fߥ4\�|\�\���\\\�\�\�\�Z˻�\�4�����޼���F00G\\W`�n?~G��v�\�YF\�\�`8G\0\�VDHώ\�rO�0�`�\�\�\0+\��*�\"�<X�l*6\��μQL�Y�]�\�\��b�\�6�3A:4R\�6\�C\�\�o,2�\�\�\r&xt\�֬Q�\�~9+���l{�\�\�\�z:[��\��FP\�\Z\����q�;\�uy\�\�vp��$2�\�\�#K�귛ķ��\���{8�}7\�\�Q\�)V�\�\�XI�\0a�1���\0�i�\n<�D�}�}_yv�\0\�$\n=�bjV�Ӟ\�V0\�.$���\�\�D�z��\�\�\�z3\�\��t\�\�M\�2\��s\�\�\�]~�՘��\���\��ԩMpM\�,�Q��Z���\�\�uw#Fx(8_چ|2}jT�I.��o�>\�ω\�\�E�\�^+\�$+�X6{}G\����\�S�nL�\�`9HS�O��\0Z�(#�i)\�ƛ(\�jvy\�`\�\�\�}7\�\�\��C3e�\��rFO\��R�/C�^\�\��B=1]b�G\�R�N=�ً3d\��J��b\�\�{W)*V��\0�0\�h_VZEu�jHG��3����+˳%ёxem�u]к��q�t m��FF}y5\�>\0\\¥J\��\0�?ě�;T�R��\�',5,'2024-08-11 08:51:24'),(2,'Satish','Co-Founder & Director Silicon Mosaic Technologies Pvt Ltd | Bengaluru','We are quite happy with the way Asset Makers team deal and navigate the real estate purchase or sale transaction with purchaser and seller, to be frank i experienced both the versions of property transactions with them and i am not much aware how does all this modalities work since i indulge in my IT domain. I do not stop referring them with in my references which is out of affection. Thanks !!',_binary '�\��\�\0JFIF\0\0\0\0\0\0�\�\0C\0				\r\r\n\Z!\'\"#%%%),($+!$%$�\�\0C				$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$��\0\0�\0�\"\0�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0:\0	\0\0\0\0!1A\"Qaq2��#BRb��ѡ�\�\�&Tr\��\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0!\0\0\0\0\0\0\0\0\0\0!1A\"2Q�\�\0\0\0?\0�\�%�2� @\�8\�\�\�A�pDh�f�\�{�\�\�Z����\�o0yb3\�\�Z\�\�>Φ27\�I\�(\���*\��\�u\�\�\�u2��<�Έ���x2��O>\�=�t=ݰ\�\�X���\�znhH�܇z���+��#\�۠\��r��@�r@\�?O\�[^i\�tFk�k��l�>��1[\��Tz]��Ugc��6{{R�țt���н�u�\�\�\r�i\'\�\�Y�<\nf1�\�X(^�ɡ\�ٔ�q�c9\�[F�c(\�n\�y\�֨��+�\Z��0i��:Q\n\�|�_r��\�~��kB�I��V4��\�c��\�)\��\�Nq�[�ZdgZ\�Ŕ\�U��C���})�`qfB�l\�<M���\"BX\�\�\�\�\�l-��#\��f����C~\�\�#\�d�{�R;\��\�NL\��uݟ�:�(Q*\�\�]6��\n3�\�\"��\�J�+�\�#�4b\"J\�d�\Z\�\�8=)�\�Tm\�#\�h��6�\�\�a\r�i�+k\�ˉ�L\�\�KJ�3\�AS���f��\�}�ҰE�\�@\�\�\�/\�ytY�U6�\��\�PjR4D\�\�(<\nMզwB˟,a�I\�\��k�\'W近(tۋ�y��x\�9\�c=>Uqj�$�����9\�JŨ\����\�\�\"\�dfh��W\�\�\"\��\'޳\��8�;\�\�U_\�\�AS�PMLh:e�\�\�y\�\0��\�ݱ�G�Ӛ�\�~\�ϫ�p1\��\\\�\�p#�ީ\�\���\�X�m�2\�\�C\�=F+he�\��[�s\�y\��\�!4���R\�`Q Q�\r�\ny\0�~k2\�\�\�F�n&�#�\�+�@�U\�F�>\�0��c�c�i��\�#F,\\\�]�\�@e���k[�\�!&):�F\�\�\�s\��\��7/\Z\rtP!\�}\��R\���P�۸\�jѷ��VM��O\�\�	x�H\�\�\��tšVR*w�)��\�-b���_(\�*�Y�\���\�x��\�Mɉ��\�=��\�8�\�@z�\�AZ�&\�\�͏�K�\�\�T\��\�h)|\�i������\�}\�\�&\�K���\\�h9PzƤu\�\� �\Z@B\�\�$R|\�%\�AX9\�\�>��}J�@\0$a�;�\�Oj.\�h�ll��\�TPS�\�@��\��PRw���h�2\�H��\\���\�1ҕF\�q%�ޅ�A#9��Y]�|RE�\�7_j\"\���\r���n\�\�\�\�\�\�\�\�\�m\�\�9J\�(�\0SY\�\�\��\�\'9\�\�\n\�f����#�\�\�9\�N\�\�6��\�i<�\0qC\�<�A\���r\�\�8\��\\�\0����ԧ)k�ʙv2v��\�)�\� �#\��[��\�m\�Ć�\�c2\�A�\�\��\'��\�F�|0\�3���b5\'$\0rI<R���&|-`d�c\�\�3��\��\0����\�G�2Gq2ǜ\�\�o\��u�;��\�#h��Xv\��\�3\�Z�\�um\�\�\�\�Nj\�\'r���.1,�{�ّ�\��\"���!�\�Z+\�\�\�tX\�ƭ>�\�H\�K \�,��F�Rr츛��\�/\�5�z\�TUW����\�e9\�}��\rr�\0q�k�����q�Ԅo`\�:uE\�Wg{	�\�\�t�q�Fcx71\�A�*�\0a<זsEr\�\�Hq\�b�R鯨h\�Yd��mU\�\�y\'ۨ�x壙\� Q$\�۫Eiaq�\�\�\�1M��{�\�\Z���ס�\�Ki^	]T/\�皐]B\�|��2HH=�~u$��-�\'˰=z\��M�	�@\�ݺ6�c�\�\�j6&\��=�Ԏ�|u)�uܪ0���5��\�4\�\�\�\�=�Ҭ�E-[\�A�4�`ŕp9\�*nA�|�\���ҫ\"\�\n*jv\�\�<Às\�h��\�\�]1	X.\�\�\�\�|����\�\�\���Z3�R\�h8&�e\�zY\�Y\�)#\n\\R�ʂ1��A˓���z�\�\�\�gI�ߐB\�\�\�L��\�R䐧,z�\�Z��9keu|e\�Έd`�$(\�j�\�˼\�t��v[\�A#oR9\0�\�2:{\�F�%�\�x�\�S\�N\�A�=��\��\rKMմ\�.s�0�\�|\�= \�>��^\�bT\�:��\�[>\�\�\�DY>\�d\�Eމň\0z���f��L����R9t�I[�\��Z\�ފRm���c�3�e\����\�%��\�L\�\���m4pa��ǒ�\�?i\�	-\�1\\dʼt\�V4\�`R�\�v�\0G[�|>}�\�7f1�C\r�\�z)�����c�NC\�\�R�n��P+0�\�\��N�IHM\���2F\�\0?�C\\kUd&q\�}���\0g�\��x�L�/AҨ�4��\�ֶ\��s\�<~Un&\����\�^�\Z&l,�6=�\��<P�V�L\�\\��\\SF�\�Sh@O~I��\�:F�\�V@N\��\�+s\�\�@PJ�\nO\� \��I\�\�mF�F��ܙ�#\�#�/����\�\�\�A]O\"\��CՉ\�h*�B\��\��.2x\���P3\�\�\��Y@ �tcn\�\�;QpA�$y�m\�\�\�sӯ�\�.Wˊ\�U��\�{S&\Z�\��9Z4F&�v\�47>q\�\�ݴgc`�\�\�KYZ\�{\��ӈc@	��s\�\�|\�7Vj\\ȧ\�FBꃞA\�1\����\��:/�|\�\�\rR�\�\"�\�g͎\"|\�0d��x\'\�\�\�W�\�\��I[�7\�\��\�\�\��D�n\0��\���\���ki\� �C+az\�{|\�ïj6ѿ�oo=��z�]�+/np{���\�\�N�t�bk\�o\�05��\"�N\�NJ�\��1��\�|?�\�\�ٽ�\�\�)��6p�\�嚑�s$�����5#��|�cQ���l\�\�Fz0?�m�\�\��\�C��R�\�\�\\\rֲ�$8\��e�J��5Xa�\�x�$<zy+�䣶}%��\�*	?*b\�S\��\nI;D_W�m�\�\\\�\�70\�\�\�*�\�\'\0�\�\0�N��Vk[4Tm�\�:N*�~�\�\�vq���\�\�y\�z\��<Z\�\�\�r&���\�f�\Z� [q\'�g.y\�>�����a\�!�q# �-5u�am`mm\�`\�\�\Z\�\�\�g9\�L\�\�\�rx>նJ\�s�.�\Z�\�q\�;G���\�!�d-��9\\�TUŸH�Q�@B�p�v\�3\�߯�:Gn\� �#���4RI\n\�U\�#��xg �sޕ2nY�l.\�;\ZT6F-�m�4n����\�G��\0\��iVwr<�Rʶ񜱎2\�\'\�ҫ\�e�\�I1y\��}S\�\�\� ��\�5[�d&�\�=��O���kI�|�?\�\�\�=�\�\0\�\�|?y����_h�r\�I�N\�\ZK�.|\�PI\�G��z6\�\�S\�m\��\�\�p߱[*sקC֪q��\nq���2\�\�x�\�e\�☍\�Q\�\�@��	~�\Z�\�e|�}$\�?\�5!\�+�^\�wVX&�w\��03\�\�\�\�QIc{,�\"�TP�N\���L\�`𝌯�\�*۟\\e\�r�G?�Φ�(\�\�V�\�\�F��Mrgj\�\Z[�\�vK~B�\�ǁdѮ\Z\�\�3ZHx?�}�/�\�\�.F�*_FS�^,)ȭ\�\�Nq\�\�/a!\�PZ�45��:\n,9u\�rOJlg;G$\�Z\�*�P��xG���\�-Īm�s\�\�r~��\"\�:������ŷD^K�#�qP\�\Z��Ԭ?tի\�6���2ԭ-T��\�\��O֩v�!\�|�9\\\�\�\�]5���p�\')6i�Xr@�U\��E�*\0�Ga@$��y\�EaK3\'q�4\�Qi\�޾�z\�\�Mœ\�ζ߁(3\�횇\�/�ۉ���;�@G v\�[=��#$N\n�\�=��{s$\�Y�zT\�dm\�(�.��T\�?/jT��ga\�v�\�J�W�Y�z�\���T\�μ��$\�b\�4\��\�?�\�\�\�\�\�j\�*�\n�ݲKkJ\�K,qjZpv8���\�\�F1\�:oM\�n�,8�]��S)n�\�V\�MQ[�\�}\"@\�\�u&���\�\�\'�>\�\�8\�F@��\�.E4^��g��F\��\�\��7y.�\�Ռ7\�\�A<j\��R:\�$��ǃ�_\�\�ڵ\�5]^\�@Ү5+\�<�{t.\�\�a\�8�ة�\�\�<[\�)�=rdUi,\���~F�-t\�\�	D6��<��Q��\0*:\�\�e���Ky%�}�1E�\�S��Bj\�\��\�~ ծ4=N-\�_/j\�D��\�\�W!�x\�OGay9a�h�\�\�\�xm6]j��L9��_sW��X\�*�\0\�(�/�\r�\�\�WO\�Us\'�YɞL��r\�6�{y�?���\\iv\�|\�\�\\g#\�\�Dj3\�.U�\Z\��? q��+��\�8�W`�X̜���\��\0_j��nv�\�n6�\�;Oʟ�\�x�����x���;i��(du��H\�Zz\�\�Ai9\0�Q_c�PM��\�i\�\�w6���	!v8�\�8�\�]�\�\� QhrF\�Εk�#&%t�a\�\��l`\ZU]��l�\�Kuk��B�EF۩g�ѹ��C\�=E\0�ܑY�5��=1�4LO��m\��\0`ȿ\��U�\�\��i)���\�\�\���*�\�%_\n�����\"\�\�\�Q騛�ܜ�\0Zi+TH�vy�\\\�\�Ú��vr�RGcS~Ѯ��\0\�Qed�Pa|r1\�D�a򏌙 a�8_\�\���W/��\�\�x:\0\�\�\�q��Ɣ\�\�ə�H\��&����\r\�g_Z�7qP�|W��%�1w�R�\'<\n\�	d�s��\�=��O�Gk�qa�oC˵\�9\'򭋣�\�\n\�<�4�ĳ�\�Ork!�ޘ�\rJA\�l\�\�6Xⱺ�\�(r\rIE��,ެtn\�\�b�YH\�SMS!/q-\�A�\�\�v*0G\�R�ջ1\��U|\�ɀ[�\�\�&�L��\�Z\��<f�\rB\�\r7�\�5zo\�}\��y?\�k�jW\�\�v�w�+t21�\n\�_�\�g\�\�\��\��\0u\�[6ZH\�#b\�X�\�Y\'\�668s��\�u}RmcV�\�g$�\��d\��+�|	�͞�fI!eY\��W\"n;�5\�~\��\�\�8�\����x�\�͹�ch\�f3�\�\�\�P\\x�\��NE�[�v?\�\n\�\�\�+W|\�\�\��\0��Y�\�ʴ\�W�\0����c\�\�\"4�b�\�k�\Z�cs0�d�Ր\�S1�>��j�汻�\�՟\0\�	�m\�\�J�C�\�zU,�Q��y\�*TP�)\nT�\�i֕*�=+�=?�/򴿝U�3jow\�$\�%�J�}y\'\�J�_\���(Rz�w�j\��\�\�\���T�.ѷ\�_Vuoj�i^\�n\�\��\�b>��\�ĖbrI\�*U�G%\Zf�{R�H1�{\�\�*T�M5#v\�\�*6ZT�T�\�',5,'2024-08-11 08:52:12'),(5,'Krishna Prasad ','IT Entrepreneur, Gurgaon','I was quite happy with the transaction and professionalism.',_binary '�\��\�\0JFIF\0\0\0\0\0\0�\�\0C\0				\r\r\n\Z!\'\"#%%%),($+!$%$�\�\0C				$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$��\0\0�\0�\"\0�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\07\0\0\0\0\0\0!1AQ\"a2q��BR��\�b#$3Cr�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0$\0\0\0\0\0\0\0\0\0\0!1\"AQ3Ra�\�\0\0\0?\0�\�	JEaXe\"���hOh@�ܩb�\�\�\�g\�W(���GD\�=ǘw&��G3�Rh]_�md�\�C���4�\�}�u�U\�\�\�\�\��\\\�%\�8R\���\"�%$����=�*\�L�\�D��A�!\0B�!@	���2��z�З(\�楈d\�8Q4��\�\�#�[�H\�<�\� -Ұ\��r�?5p\\+e.�� \�]��H˷\�~}V\�oӺ��i��{e{E��,�%�4p�\��Ӿ{�v1Ez�l\�\�^\�\�M���d�\�O�a�}@r\��\�CUYOD\�\�+*�gn�4��\�984\�v��㪆X\"���\�:Lc+�w�Vɦ\�-8\�\�i?�\�G��\�u\�\�\�J���L,m$	>~\�2��ɕ\�n\�9/^\�^�\�M��8\�ib穣 �:/)��3e{\�\�\r{�:\�ߢ\�cȮv�w��Z��p�!1L���F��R B\0�	\n8#)�@( +N\�Njj4c�\�A]7\�\�k\�J#��\�nw\�}��z@�\��lm�8c�7�\�\�}<N\�\�\�\�\�y-ʶ�\�˖Ii�z���ñ\�e\�\�r���IGz�t�\�C\�?3�\��:��gK\�%|Q\���1#q\�(�w�\0\�vW�}�Mi��]\\j	vt\�\�\�uc\n���kh�Y-E\�\�Aw&�钜�v�\"\�\�|GV\� �Z砨�=�0�U\�Yk,\�\�\�\�\�rO.���׳P��QGm�x�}\�7H\�^\��J\�8�6\�r!\�L�u\�)\�\�J��\�\�2\�\�\�}WC�\�2�\\�/0Ď\�\�S\�4����i(e\"�K\�\"\0� �\�*B���!!�U\�\\!t4\���y�\�H4��9\r��.��\�ʛy;��d8m=\�Q\�/�\�;\�\�%���[a{�m=[X\Z\�\�ȅ�I�v�i\�i\0��nX�\�0�\�G��K4u\�Ml�C\Z\�5c%d\\�vj9��U�E5Qŀ0r\�\�-\�\�ٯ\�JޏT��)�\�hhi�l��h-�c\�1��\'\�Z�lUU>e=c)\�rgȟc�Nk�\��#�T\�Io�\�$m�cܓ\��|\�\�\�:\�e\�\Z\�\�\�Q%cZ\�\0	sF3\�[��\Z��\n�\�\�mV\nW\�I c��,\�F\�7\�d\�%�~\�\�4D.����\�KX\�H\�!ze�\�\rE����.+��nN\"��4�\�\�d�g�d\�8\�ݹ�\�Z�\�G�q\�s\�s{g�\�\�#\�s,\�\�r\�w��̻qL��`��Q�ȁ\�\�rV\nىjf\\�;m\n��ʙX!@�\n^�Ht\0��w\�&\���\�M\�{t\�F�E.�\�1\��&\�Qi5�4\�\�\�Iz�G�_�[�2�駼\�\�\�Uͥ�v<�\�\�:�\�-\�wP#�T�\�\�;/W��\rΙ��6\��i\'?�ơ\�\�Kf\�uz\�\�\�`��r\�\�\�\�\�[\�\�JX�jWil��\r\�\�\�v�<\��h�\nFc\�jÛ�\�䗊\�mv�\�\�en�\��.\�\�ߪ��R\�h�I>Y�m\�\�	sO�\�+�񋋮6j:h-\�Es%�S�m�{\�U�\�z\�6&jvp9,\���ͣ�p\�K$�ҹ\�U��>I{p\�|n~�^<<��\�^��\�\�7*I\�t2:7\r\�TkSZ2���B\0:#(B\0P�� Q\�4\��@�+Bpn}\�xH\ZU�\�\�\�]�\0u;*\��\�\�=�\�`u<#huM���\�\�\�M!�K�\\s\�j\��\0���@#OM�a�7p�Y����˙ �5L�\�A\�\0\�\��AY\\Uc�Ử\�[\�9��=\�\�\�3z=��?�͟\�l��^��:\�ue1\�\�\\]���\�l\�i�\\m_�����\0�O!ܞ�ܮ\�\�o\0\�x��\�x�KGB\�:(9I0\��\0��\�<i\�\\1\�wQ\�A\����\�\�\�\�O<��ʼ�����\�\�\�n)��\�:\���\Z\�,�a�,vR\��\�\�\�ߗu\���z\�嫪�\�\�N\�$�<\�\�q\�Je\�|]}��ݪQYR\�N\'�GF�\��26�\�a\�tpcX炚n\�$u\�GT\�hp\�\�\\\�\�@\�20��\�oQS��\�=N~���-\�\�=\�/�\�A\�\�\���=������N\�e\�K-;�#\�\�Vj\�S\�-�\�\�0�\0��N`$\��|-[mՒ>58�OD�R[$�\��\0Ku�q\r��~�\�q�I�\�\�\�\��p�\�2Gdoin[\�lr�\r\�ܭX^ʘ��N�z�g��G���_a�\�?��]M\�\�E+\�e7\��\�\�t�9?BV\�x\�o�\�=���\�I[`��\�\�\�t��v\�\\n�<*��_\n��S\�D\�)^\�\�ۜ\�N݃3\�\��\\oY\�\�\�\�V\�i#\�pk�[߷5\�\�m�#g��Z��\�>��\�\�\�V\�\�g�\'d\�;9�m�~�\�%\�0���\�\��\�=����\�}\0\�\�}֟]\�i,T�	\r\�Z�]�W�\�\�O0?\�Ӝ\�y��6c�[�\�\�l�\� dÐ\�\�$�- m���$��f�9��\'���f\�8:&�\�o\�#\�\�]�\0	\"\�^�\�;\�5�K\�e-\0F@)\�\��\���\�s�\�2��F\�w	�\�e\�ف\�\�\��\0\�䲥�\�\�->\�\0��+2\�FN]�P\�V_kr)���B��~lów+���ʄ\�\�VM�D]\��\0daű��U�\�l`�5��c�q<�ԧL���\�ӂܜ_Ux��\�Ȇ��I��\\\�p3\�+@jG\�\�\'��\��i�\�\�\�ik�c��K�S\\H�层ycӝ\�\�\n\�/�Y%����\�o�Ti\�O	x\�\';���@\�w�\�>�u7R\�ּG\�Ұ��X�\�\�n\���/%�W:\�p�r}%\�c\0\�\\�8�\0&F\�Gc=,><\��eF�8\�\�)_��`aFde<fI���+�q\�g�\�4��]O\r\�I>�\�¸ֵ��\09aT�\�W �\�\�ݬ\�\�s����Iv\�d��\0I8Qg~j�T�-�\�w� ���N�J�\�\�:+��p�%�7с\�PV3T^\�\�{5AU\�z\\3�x\�\�;!:�3\�g.#\\�Q|\�\�C$�\�\�ݪ��rUw�B\�\�)`9~}�\�(D���J�.;�򣍺���ʋP�JĀ�\�Q�\�Z9����sAi\�##\�\�K$d���\�>\�)7\��o��\�\�\�\� �R��1�l\r\�\0پ\�Ol��sN�����J�]�\�\�\�U*�\�0@\�$\�f{�N(X\�E\�Fg�\�\�T6\�t�鍼\��\n�\�\�H&�ơ�b\�\�\�S詄L/�\�|�9s\�U1{Fp	Vk}�\ngc}9\�0��EBFJx� �1�bͥ�,�e3\�\�Y��A\��\�\�\�$\�\�}�/\"\0\���\�q\�Q\�ކ]�i؜�j3�Q�\�#8VA_�\�ʭ\�JX�\�ɵ��+�����E\\�\�(S]Y����\n*մh��u$�dt\�u3��}Ѕ�{\�d\�\�$vZGt!O\�\n�ʒ\�\�\��.�>ǒ�ON\�B�t]\�\��i[I\0į\�d=3\�Z��m;4�s\�\�<\�P�\\�\�\�\�\�\�.�%V��\�\�)��FP�j	�H\�y9��ֆ�\0!\n3\�,g|\�Z�\�+\��-\�vQ\�IB�\0EG;w��ء\\��\0\�e\�\��\�',5,'2024-08-11 09:11:24');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
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

-- Dump completed on 2024-08-11 15:53:59
