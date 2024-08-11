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
INSERT INTO `ltg_det` VALUES (30,'46514','46545','<p>Test Villa3 Desc</p>\n','VS villas','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1230','5000 per Sq-Ft','upcoming','7','5','4','2024','300*300','4','yes','900 sqft','yes','yes','12','4','undefined','undefined','south','verified','3','12','fully-furnished','included','12','undefined','new_property','undefined','15','BBMU','200','study_room, store_room, servant_room, drawing_room, private_garden, terrace_garden, private_jacuzzi','About Project/Builder\nProject/Builder Details\n','Amphi Theatre, Acupressure walkway, Basketball Court, Billiards, Bar/Lounge, Food Court, Domestic Help Room, Community Hall, Yoga room, Senior Citizen Seating Facilities, Squash Court, Under Ground Drainage, Office Cubicles, 24 Hrs Backup, Gazebo, Ladies Pool, Swimming Pool, Society Office, Intercom, Mini Soccer Ground, Foosball, Footpaths, Cafeteria','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 15:52:47','2024-08-02 20:08:54',13,'July'),(29,'12301','12301','<p>test apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desctest apart desc</p>\r\n','38V3+CM Pasighat','38V3+CM Pasighat','791102','28.093521400699853','95.30422521023759','undefined','1290','5000 per Sq-Ft','under_construction','3','3','3','2008','undefined','undefined','undefined','undefined','undefined','undefined','12','12','3','3','North-East','verified','3','12','Fully Furnished','Included','12','15','New Property','12','15','BBMU','200','Pooja Room, Study Room, Store Room, Servant Room, drawing_room, private_garden, terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','About Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/BuilderAbout Project/Builder','Acupressure walkway, Black top roads, Community Hall, Foosball, Gymnasium, Maingate Arch, Rain Water Harvesting, Street Lights, Under Ground Drainage, Yoga room, Golf Course, Piped Gas, Water Overhead Tank','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 15:42:52','2024-08-07 11:24:44',12,'undefined'),(43,'1230','1230','<p>Test Apartment6 Desc</p>\n','VS test1 apartment','V.S.Epitome apartments, Mumbai','560093','17.38714','78.491684','undefined','12900','5000 per Sq-Ft','ready_to_move','4','4','4','2024','undefined','undefined','undefined','undefined','undefined','undefined','12','12','3','4','South','Verified','4','12','Fully Furnished','Included','12','12','New Property','12','15','BBMU','200','Pooja Room, Study Room, Store Room, drawing_room','About Project/Builder\nProject/Builder Details\n','Acupressure walkway, Badminton Court, Cafeteria, Clinic, Concierge Services, CCTV Surveillance, Black top roads, Amphi Theatre','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-31 11:12:43','2024-07-31 11:12:43',16,'undefined'),(44,'1000000000','1000000001','<p>Test Villa6 Desc</p>\n','VS villas','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details\n','12900','5000 per Sq-Ft','ready_to_move','8','5','3','2024','300*300','3','yes','900 sqft','yes','yes','12','4','undefined','undefined','west','verified','4','12','fully-furnished','included','12','undefined','new_property','undefined','15','BBMU','200','pooja_room, study_room, store_room, terrace_garden, private_pool','About Project/Builder\nProject/Builder Details\n','Acupressure walkway, Badminton Court, Amphi Theatre, Black top roads, Foosball, Guest Launch, Footpaths, Golf Course, Gym, Food Court','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-31 11:16:24','2024-07-31 11:16:24',17,'July'),(31,'1000000000','1000000001','<p>Test Villa4 Desc</p>\n','VS villas','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1230','5000 per Sq-Ft','ready_to_move','7','4','6','2008','300*300','3','no','900 sqft','yes','yes','12','4','undefined','undefined','north-east','verified','5','12','fully-furnished','included','12','undefined','new_property','undefined','15','BBMU','200','pooja_room, study_room, store_room, servant_room','About Project/Builder\nProject/Builder Details','CCTV Surveillance, Concierge Services, Black top roads, Badminton Court, Acupressure walkway, Amphi Theatre, Basketball Court, Billiards, Club House, Concrete Roads, Community Hall, Childrenâ€™s Play Area, Bar/Lounge, Basement, Gym, Golf Course, Guest Launch, Gazebo, Elevator','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-30 15:59:52','2024-07-31 01:55:31',14,'July'),(19,'1230','12301','<p>Test Apartment4 Desc</p>\n','VS test2 apartment','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','undefined','12900','5000 per Sq-Ft','ready_to_move','19','17','11','2024','undefined','undefined','undefined','undefined','undefined','undefined','12','4','3','4','North-West','verified','8','12','Semi Furnished','Included','12','15','Resale','12','15','BBMU','200','private_garden, terrace_garden, private_pool, private_jacuzzi, vaastu_compliant','About Project/Builder\nProject/Builder Details','Badminton Court, Black top roads, Billiards, Bar/Lounge, Childrenâ€™s Play Area, Club House, Basketball Court, Basement, Security, Steam / Jaccuzi, Library, Home Theatre, Health Facilities, Toddlers Pool, Yoga room, Street Lights, Garden','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 14:26:24','2024-07-31 01:53:23',9,'undefined');
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
INSERT INTO `ltg_det_plots` VALUES (32,'12301','12301','<p>Test Plot3 Desc</p>\n','VS plots','V.S.Epitome apartments, Bengaluru','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details','1530','5000 per Sq-Ft','ready_to_move','300*300','5','3','north','yes','yes','yes','12','new_property','included','12','BBMU','2024','200','15','Acupressure walkway, Badminton Court, Amphi Theatre, Black top roads, Footpaths, Domestic Help Room, Kids Play Area, Pets Allowed, Steam / Jaccuzi, Senior Citizen Seating Facilities, Swimming Pool, Party Hall, Volleyball Court, Yoga room, Under Ground Drainage, Laundry Service','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 16:02:54','2024-07-31 01:56:16',8),(33,'12301','12301','<p>Test Plot4 Desc</p>\n','VS plots','V.S.Epitome apartments, Mumbai','560093','17.38714','78.491684','Property Address (If any more detailed)\nProperty Address Details\n','1230','5000 per Sq-Ft','under_construction','300*300','4','2','north','no','no','yes','12','new_property','excluded','12','BBMU','2024','200','15','Community Hall, Childrenâ€™s Play Area, Bar/Lounge, Basement, Creche, Guest Launch, Gym, Ladies Pool, Public Transport Available, Jogging Track, Supermarket, Piped Gas, Senior Citizen Seating Facilities, Yoga room, Table Tennis, Under Ground Drainage','About Project/Builder\nProject/Builder Details','https://www.youtube.com/watch?v=WmJoVaSVKf8','admin','2024-07-30 16:06:49','2024-08-02 20:35:41',9),(45,'12301','12301','<p>Test Plot6 Desc</p>\n','Pomonastrasse 12, 3930 Visp, Switzerland','Pomonastrasse 12, 3930 Visp, Switzerland','3930','46.3011378','7.8635004','Property Address (If any more detailed)\nProperty Address Details\n','1230','5000 per Sq-Ft','under_construction','300*300','3','2','north','yes','yes','yes','12','new_property','included','12','BBMU','2024','200','15','Society Boundary Wall, Senior Citizen Seating Facilities, Society Office, Swimming Pool, Street Lights, Supermarket','About Project/Builder\nProject/Builder Details\n','https://www.youtube.com/watch?v=1EuNnZEp2sQ','admin','2024-07-31 11:20:23','2024-08-02 19:36:33',10);
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
INSERT INTO `testimonials` VALUES (1,'Sangeeta Goyal','IT Professional | Bengaluru','We are quite happy with the way Asset Makers team deal and navigate the real estate purchase or sale transaction with purchaser and seller, to be frank i experienced both the versions of property transactions with them and i am not much aware how does all this modalities work since i indulge in my IT domain. I do not stop referring them with in my references which is out of affection. Thanks !!',_binary 'ÿ\Øÿ\à\0JFIF\0\0\0\0\0\0ÿ\âøICC_PROFILE\0\0\0\è\0\0\0\0\0\0\0mntrRGB XYZ \Ù\0\0\0\0$\0acsp\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\ö\Ö\0\0\0\0\0\Ó-\0\0\0\0)ø=Ş¯\òU®xBú\äÊƒ9\r\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0desc\0\0D\0\0\0ybXYZ\0\0À\0\0\0bTRC\0\0\Ô\0\0dmdd\0\0	\à\0\0\0ˆgXYZ\0\0\nh\0\0\0gTRC\0\0\Ô\0\0lumi\0\0\n|\0\0\0meas\0\0\n\0\0\0$bkpt\0\0\n´\0\0\0rXYZ\0\0\n\È\0\0\0rTRC\0\0\Ô\0\0tech\0\0\n\Ü\0\0\0vued\0\0\n\è\0\0\0‡wtpt\0\0p\0\0\0cprt\0\0„\0\0\07chad\0\0¼\0\0\0,desc\0\0\0\0\0\0\0sRGB IEC61966-2-1 black scaled\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0XYZ \0\0\0\0\0\0$ \0\0„\0\0¶\Ïcurv\0\0\0\0\0\0\0\0\0\0\0\n\0\0\0\0\0#\0(\0-\02\07\0;\0@\0E\0J\0O\0T\0Y\0^\0c\0h\0m\0r\0w\0|\0\0†\0‹\0\0•\0š\0Ÿ\0¤\0©\0®\0²\0·\0¼\0Á\0\Æ\0\Ë\0\Ğ\0\Õ\0\Û\0\à\0\å\0\ë\0\ğ\0\ö\0û\r%+28>ELRY`gnu|ƒ‹’š¡©±¹Á\É\Ñ\Ù\á\é\òú&/8AKT]gqz„˜¢¬¶Á\Ë\Õ\à\ë\õ\0!-8COZfr~Š–¢®º\Ç\Ó\à\ìù -;HUcq~Œš¨¶\Ä\Ó\á\ğş\r+:IXgw†–¦µ\Å\Õ\å\ö\'7HYj{Œ¯À\Ñ\ã\õ+=Oat†™¬¿\Ò\åø2FZn‚–ª¾\Ò\çû		%	:	O	d	y		¤	º	\Ï	\å	û\n\n\'\n=\nT\nj\n\n˜\n®\n\Å\n\Ü\n\ó\"9Qi€˜°\È\áù*C\\u§À\Ù\ó\r\r\r&\r@\rZ\rt\r\r©\r\Ã\r\Ş\rø.Id›¶\Ò\î	%A^z–³\Ï\ì	&Ca~›¹\×\õ1OmŒª\É\è&Ed„£\Ã\ã#Ccƒ¤\Å\å\'Ij‹­\Î\ğ4Vx›½\à&Il²\ÖúAe‰®\Ò\÷@eŠ¯\Õú Ek‘·\İ\Z\Z*\ZQ\Zw\Z\Z\Å\Z\ì;cŠ²\Ú*R{£\Ì\õGp™\Ã\ì@j”¾\é>i”¿\ê  A l ˜ \Ä \ğ!!H!u!¡!\Î!û\"\'\"U\"‚\"¯\"\İ#\n#8#f#”#\Â#\ğ$$M$|$«$\Ú%	%8%h%—%\Ç%\÷&\'&W&‡&·&\è\'\'I\'z\'«\'\Ü(\r(?(q(¢(\Ô))8)k))\Ğ**5*h*›*\Ï++6+i++\Ñ,,9,n,¢,\×--A-v-«-\á..L.‚.·.\î/$/Z/‘/\Ç/ş050l0¤0\Û11J1‚1º1\ò2*2c2›2\Ô3\r3F33¸3\ñ4+4e44\Ø55M5‡5\Â5ı676r6®6\é7$7`7œ7\×88P8Œ8\È99B99¼9ù:6:t:²:\ï;-;k;ª;\è<\'<e<¤<\ã=\"=a=¡=\à> >`> >\à?!?a?¢?\â@#@d@¦@\çA)AjA¬A\îB0BrBµB\÷C:C}CÀDDGDŠD\ÎEEUEšE\ŞF\"FgF«F\ğG5G{GÀHHKH‘H\×IIcI©I\ğJ7J}J\ÄKKSKšK\âL*LrLºMMJM“M\ÜN%NnN·O\0OIO“O\İP\'PqP»QQPQ›Q\æR1R|R\ÇSS_SªS\öTBTT\ÛU(UuU\ÂVV\\V©V\÷WDW’W\àX/X}X\ËY\ZYiY¸ZZVZ¦Z\õ[E[•[\å\\5\\†\\\Ö]\']x]\É^\Z^l^½__a_³``W`ª`üaOa¢a\õbIbœb\ğcCc—c\ëd@d”d\ée=e’e\çf=f’f\èg=g“g\éh?h–h\ìiCiši\ñjHjŸj\÷kOk§kÿlWl¯mm`m¹nnkn\Äooxo\Ñp+p†p\àq:q•q\ğrKr¦ss]s¸ttpt\Ìu(u…u\áv>v›vøwVw³xxnx\Ìy*y‰y\çzFz¥{{c{\Â|!||\á}A}¡~~b~\Â#„\å€G€¨\nkÍ‚0‚’‚\ôƒWƒº„„€„\ã…G…«††r†×‡;‡ŸˆˆiˆÎ‰3‰™‰şŠdŠÊ‹0‹–‹üŒcŒÊ1˜ÿfÎ6nÖ‘?‘¨’’z’\ã“M“¶” ”Š”\ô•_•É–4–Ÿ—\n—u—\à˜L˜¸™$™™üšhšÕ›B›¯œœ‰œ\÷dÒ@®ŸŸ‹Ÿú i Ø¡G¡¶¢&¢–££v£\æ¤V¤Ç¥8¥©¦\Z¦‹¦ı§n§\à¨R¨Ä©7©©ªª««u«\é¬\\¬Ğ­D­¸®-®¡¯¯‹°\0°u°\ê±`±Ö²K²Â³8³®´%´œµµŠ¶¶y¶\ğ·h·\à¸Y¸Ñ¹J¹Âº;ºµ».»§¼!¼›½½¾\n¾„¾ÿ¿z¿\õÀpÀ\ìÁgÁ\ã\Â_\Â\Û\ÃX\Ã\Ô\ÄQ\Ä\Î\ÅK\Å\È\ÆF\Æ\Ã\ÇAÇ¿\È=È¼\É:É¹\Ê8Ê·\Ë6Ë¶\Ì5Ìµ\Í5Íµ\Î6Î¶\Ï7Ï¸\Ğ9Ğº\Ñ<Ñ¾\Ò?\ÒÁ\ÓD\Ó\Æ\ÔI\Ô\Ë\ÕN\Õ\Ñ\ÖU\Ö\Ø\×\\\×\à\Ød\Ø\è\Ùl\Ù\ñ\Úv\ÚûÛ€\ÜÜŠ\İİ–\ŞŞ¢\ß)ß¯\à6\à½\áD\á\Ì\âS\â\Û\ãc\ã\ë\äs\äü\å„\æ\r\æ–\ç\ç©\è2\è¼\éF\é\Ğ\ê[\ê\å\ëp\ëû\ì†\í\íœ\î(\î´\ï@\ï\Ì\ğX\ğ\å\ñr\ñÿ\òŒ\ó\ó§\ô4\ô\Â\õP\õ\Ş\öm\öû\÷Šøø¨ù8ù\ÇúWú\çûwüü˜ı)ıºşKş\Üÿmÿÿdesc\0\0\0\0\0\0\0.IEC 61966-2-1 Default RGB Colour Space - sRGB\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0XYZ \0\0\0\0\0\0b™\0\0·…\0\0\ÚXYZ \0\0\0\0\0\0\0\0\0P\0\0\0\0\0\0meas\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0XYZ \0\0\0\0\0\0\0\03\0\0¤XYZ \0\0\0\0\0\0o¢\0\08\õ\0\0sig \0\0\0\0CRT desc\0\0\0\0\0\0\0-Reference Viewing Condition in IEC 61966-2-1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0XYZ \0\0\0\0\0\0\ö\Ö\0\0\0\0\0\Ó-text\0\0\0\0Copyright International Color Consortium, 2009\0\0sf32\0\0\0\0\0D\0\0\ßÿÿ\ó&\0\0”\0\0ıÿÿû¡ÿÿı¢\0\0\Û\0\0Àuÿ\í\06Photoshop 3.0\08BIM\0\0\0\0\0g\0luFI5t09bZJ23z0OrRA1\0ÿ\Û\0C\0				\r\r\n\Z!\'\"#%%%),($+!$%$ÿ\Û\0C				$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ÿÀ\0\0–\0–\"\0ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0=\0\0\0\0\0!1AQ\"aq#2‘B¡±3RÁ$b\Â\Ñ\á\ğ\ñs‚’ÿ\Ä\0\Z\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0)\0\0\0\0\0\0\0!1A\"2Q#a¡±\á\ğÿ\Ú\0\0\0?\0µo¯K6º~o%d\óX\ìo—ƒ·p~¸«Ú¥\ÔZ|‘M2*\Ü\\ø¨w\Äg‘œ\÷\îOµ(h6©-\í\ìs%\öøYdA\\\Õ\Æ0H\÷¢š\æ¦fšc§\Ø\\Ç¾ªLEcFPA|§¯nk•“v\àûœ¸\â\ò*\öÿ\0İš…¥Š\İ\êV³Z‡`c\rc\ÆqÌŸ\éTo\îÿ\0h\Â\ö\Ú{`%\É*\Ü2	>†¹YK\ñVig\öš”(\Ë\"\à²@9À=³\ÈÇ­\éI\í\Z\êm6ş\â\ŞH·ù‘AŒ¹a»G\'\ïQæ‚‹úœŸ1SqBUJYü§Ó’W#\æ“\ÍŸ®úP® \é½?§\'}>%¹Kû¯•|\É\0£aƒ\Æ3œ\ã\ÔV\áw\Ä\Íü+M³\Ì\ê©Åºƒœ\õÛü\Ög\âL\ß\éº\ô3kr›‹y5»\Ì:\èÚƒ\äİ¾d•!¤nzƒ§\õx´\Ûhf‰¯¥ˆI\è@l0 \à\ö?Z\Şú\ç¡\æ\ê~Ÿ[‹’-P\í\òËµÑ°r¤\ö\ç5]z\Zã¬´‹A~fk%‰™cˆ¬l®0\îü\Ä\ã=ø\æš:R9\'u³\ä³Y³)€\Èd’„•‰9 7\×úQN{µ$¹6¥L\Í4¾”¶\Ó.­\ß\Ä9\ášI“øt\0u!p\ê\É\önOa\í@º¦\÷E\Ñ\ä’Û¥tå¶…T«\Î	c\ïŒ\ö§_›O\Ón#w”µ\ã\rû\åE\ä|\03\ô¬>\ïY¹Õ¦6\Úe¯™\Î‘šv(9rÿ\0\è~8$­\ö»Ô¯bÛ™˜ŸB+˜\æ\æ´Ì ü€ú}h\õ¯‡º\å\Úù·2*ø\Í\×t«\ZP\0;‘Ş¬Œ¢øG)¥l·¢ø—®\è3‡»i#\Ï\Í§rŸßµk:Oˆ·Z¥´.ú{47³,¨\ÆI\ã~µ\óÔ¬YF\Æ\ö\ô4ÿ\0\Ğ\İH–\ÚÎpøVmˆQp\ÍØƒ\íC›KQş\îzË”?\éZ½ø\×H\Üm\í[\Íi®\ãsr>n\ÜU¤\Ö\×R½Şš°¸¶ù¤ŠY\Ë1\É\í\îN\íKZ~½w\r£ÔŸ—\İ\"319>şœQ¶\é¨\Ò\í­\ö\Ù\Å#N›\â\à1\\œ\í\Û\ë\ß×µyF1\æGr:Á·6¬/ücPÕ´g\Õ\æÒ`´u¬¥Œj0\Ã\ñ0#\é\ÎqK\öº„\æv¼\Ö\íá¸ÿ\00\Ë8;›¶p?oJ\ã}­\ßj\Ğy®\æƒ\È&\Ü\Ø,x\Û&p3ş^FqB4%½º¸+h¦\âK9DªÅ¾U\ç“\õ\Ç4\ÌqZ»ã¸¼vú}\ÚN—¢¥\õ\ÎıUÚŠ0…B\ñ‚\ëR„\ÛhCM\Õ\ä†b·RI\0‘Ÿ¯\'\é\ëR’à¯²Y\à\ç¿\ô}.\óZi·z•Î¯&Ÿ3Fù\r™G\ã¸\ô\ÏşiŠ-i%±+¥j+yy4¢\Ïø%À\ïŒ\ö\ïŞ‘:EZ\Ô\\	,\â¼x2\òy¹a´w\È\öúšµu¡^iÚŒ<p\Åa|\â2²•¸#Š)c‹•±YT»´=Í µ•µ²\Û\Ëqks\ÃÊ¥–\ì8*d\'8ÿ\0_Z:ş\Ï=Õ•î§\Ïg\Ó+Ü¼w\'\ÎU \åT\ç€=\ó\ê3A\ô~¡¾ø[[˜\Ñ,\Îï†8\çy\Ï~sZ•&¥gÖ—¶\óEkøL¤7\Ë\î\Ø?§\èk\òN.™L³­X£.zo¦5C\à\ï®nngU%>t‚G\ç^\Ø\óL0Á¤øƒ¢C{*JŠdÜŠ\òb9\îG\ÓÚ»\ôîƒ¤\é²Iu§À‘‹•;q‚\Ë\ë\÷\æ®\é\Ú<–\ÜyIn\Êû\Ò8—n«\İ\ğ(»èš‘j\Ê(­¬\Ú8–\âù\n\Æ6l{\Ğ}&Y¡¸¸e\n\ã\Ì`Y†\Ï\æ98\õûı(\âL\0e\È\Ê\÷\Í%u6¾ú$W\÷J\é\"2a7\r¥H\î\îiS\ôjF!ã†¹üC©/R\'%#1Ï·z\ØÁü=d\İHy##\"‘ú¦ı\î\ï&™\É%\ä$\çÖ‹\ô¾‡¬a½€Dˆ9N\ã\î9®„¡Xª\èvşNš\İ\íå­„&K¹\Ò$\÷cŠU\Ôo4-v)-\Ë9V4L?|Q}[Nş\Ê\Øü«;F>fÁ¡šg@]\Çx.ŸRº\ÚZ2\ÙR>\Õ&7­¾K¥wHÈµ\İ]ù ”¤\åÑ…\Z\ğ\ê\ò\Ú.¡·†\õ\Ù-\åa¸“‘\Û­=u\ïMA¨[\Ú\Ç€oúR?S\Û\Ûi6šI·’\å˜+rF?¹ÿ\0Z¾9~H\ë\ì…\á–<‘t‘£\õ‘\Ñ\ö’A\æ\Ç5¼\Î\Ì\ğ\Ë$Ÿ)\\\ã”\Ü}*­\Ô\ó\ëR\Ş\İ\İ\õR-“¶’YJTw\Âú\ã½!\õN¿{\ÖW6’µ¬PMo–²C‘¼g?6Oqš+Óšº\èº4\Úf¥b·\ÑJ\å\Ëvt\'e~\à©\ãn\Ø\Ü5¸Õ¿\ßü‡:Ñ¬´£rn\å]]û¸¶\à‘\äı…\ğ\÷¨lt«Mf\îY´¤ †5?<\Ç$\ó‘\Û\íÖ–\Íş®\é5º\Ï<\Í2\ívf\ÜNNy\Ï\ßúÑ;¦nmQ¢\Ô#İ¹r7)\í\Å\òGMdn\ê&º®hjµ\ë:j=„w©#—2	\Õ\nœ~R\ô\÷©Y\ÚE\"+B¥¼¤bT¬\Ö!GÏ…\\—#füO¤mBµ$m“§%š2FWÃJ¯\Ö-¬iºl\Ñ\Åk@2|„—NH “µ}…[´yo-V\ÌÆ¥Â–2d\å¸\Í\Ô\õ\ó£\Ù=€fi\ñ\"³cFFikf\Ñ\å-u¾}\'}¬\é\÷\Æ4\Ï$\ÊÅŒc\ÏlqÚ´m+Ä«\Ûkˆ®uif1À±\r¬Kú\ÈA\ç?¯½f\İ¬C­j6Z-Ü‹m,\ÄC\ñG‘ŸB ­/ª|1»1|m¦­tb‚[{]\æ\ã\Ù\Æ\ïM\Øı)y ¶©„¥Wv7hzæ—¬°6š°®$;c`Fÿ\0R6œ{ù\Ó-­wm6&x¥Vm¨Kœ\Ø\Ïoµe\Ğ:¿L›}wX½c2y†\ÒY¤!¸\ä\İù<V©\êšE¤—¶4Ì’VLŠ;j™\ã\Õ\ğ\Ã\ír[\Ô\Z\â\ò\ê´˜[8§WÁ.›†GÓŒ\àŠ\Ê|`\Ö%·‰´\Ùd„\íeeÙ\Ä`\ç?­2t‡\\\'P\ècWš\×\á@™¢ ş2‚B·¸ş\õ’x¥\Ô_\Åu«Œ8h %¸\îzn87:aÃ«3Zq\æs\È\ÎMmZ.­dtKDƒn\×A\Û\ĞV\rr\æb[\ëM¯\Ä\ëüÿ\0\\œD\Ù\Æ\rYŸ\ĞO\ôo‹™)´ı›\rŞ¹fV8m\÷41\Ï~\õ-\õ\å}\Ö\ÆEg?)ş\ô*\ÏFºK5·TFq\æ2‚\Øûšü6v½=h\ä\ìY$·«W?U\è\ë4¢Š]a©¥¦š\Î\Ò*;°E$\ö$\Ò5Æ€zªx\ï¿h–c‘HhÀ\ö¾{\×N¥\Öb¾¼„\\¶-Q\÷\0˜Š`\ğÿ\0£P\ÔVx„66\ñ\"\ñ\æ\ò€½Y\ñ\ã¿d3¬™_G;—º\éˆd­\åB\á±\ìj•¿—-\ÓB@·j“\êqš+\âü·:¥¥ª¶ÊŠÑ\Øü\Ä\ì(L0\Ã-\ê,ƒ\æl?J\Çe³#Í‰)º<¦m®IUÛh®³Ô²\Çj³\İ$Iù¢WU\îXgŸÚ¼\É\0X%\Ú\ìX{P?OµÀ\ÆY[?¡¯G\ÒI‰X\ÚM•\í^\ÇV€\à\ËÀ\ã\"¥~xc\Ìu\0\ñ‡\Æ\Î\ã>\õ+\Ù>²qC!\Î;Y¡\ô~g­\êJ¼\ö\ácˆYO¡\ô\ÇÒ—z“FÓ¾68\ÖK›Ë…D¶S6\n\î\É \0\ÏrE0xe<ŸÄ¯·G\ÛÛ†¥Ş±Š\Şû]I^şb–¦\\\ö_ 5è·»C%\âT´\êø:ORM*\×J\Ò\îÍ´¬Ÿ\n‘¹\É\Æ\â\ç–À\Ï»cµ[>)jG©\æ+)<\ÉF±¥Ãˆ‘|\ÌS±b03\Å)M§\Çm{X¦F”P7|ı@«\ñi\Æ+§¸—‚\ÔA\ê}ÿ\0\ïŞ™5­š\'m\Åš‡Œ _\ØH\'\âB\ß\r$h”Äc}iqz›X\ê\ã®£;•†\r«9PW¶[Iú\Ğ\'²iIX(‰˜û}¨¾“1\Ñ.\Ş\à*b\Ãn\îÄ‘\È\÷>¿jCU]‚œ¥\ØQZ=c‚Í¥H£;…½x¤Î¡¹[«™v†\'š+ª\ê;¢|6I\'œ\Ò\ò\Ä\òü\í\Â/\Ì\Ìi˜#\\²Äª4™DMƒíš¦\Î\È\áÑŠ²œ‚;ƒV¯&J\äv\'¸\ò˜\ë£¹\"}\ğj;\×:Ô–±E+\Ç ûy?z»p—:¬¾eÌ¥ş”;£t\ñ%š‚¼MKi\äF\Üs\\©Ò“£¹½Uƒ´…¶\êMF1s‘kn\á™Gw?\åû{\Ó\ö¹y•h¶Vê±¢®¨ÀQ^zSOk=<H\ëµ\å%\Ï\ëÚº_hu%Ä°\Ìd\ò¶ùl[?QJrrtú6’\ä\È:—_‹X\Ôm\í +$v\íÌƒÕ‰\ägÛ\\¥Ü“‡RU½­\ëÿ\0O\æ9–\ç@¼AÁt³ıê­\áOSY˜\éÿ\0\n—·pùûÿ\0Ò¬N)THr)7l¦‰·Á<A5C\ÄDÎ™h\ÎOe\Ç\õ£Z}£Z«!VR¹HÁ‚øŠ|\İ.\ÍÀùI\ñW¡ù¡3_Fr\ğœüHÿ\0\ñÿ\0\ÅRºxKµF¦Y‚\óş\Õ)Y\ß\ò1ş:ş46\ôL\Ée¨j\òJp†<=\Î@ş¦“z¡¦}Y\Ü(ÿ\0<øË¢¾\Ë]A˜\ä²E\È»«Œı;%\ì\Í;\\\"d¤œERl‚\Ñ$\óc™ƒnC\òŒ\ñE\åÔ– ªŠ\ÆFs“Œ}^”\Ã\ñ+\ß\Ò3VOG¬²\à_€1\Î!\ÉÖµ.ÀX[\é\n:…\ãIdĞ†\Ê\0IûŸûf_-\ãXÊ’Lc‘\è}*\Õş‘eam,2·\á™Túw\Åsµ\Ô\ìc„\Æ0\ÊFXÀÒ‹\ãµh®G¿b¥ú<w>¹ı*¥xL>R\à\"úZ¹¬^A.§<¸!* \ôV3J\Ã\Ü{QB$\Òt¨\÷\É\íE´\r8^_\"·\å\ïTFV5»Ÿzs\è9n™T\îV\ÃS2Î¢À\ñ\ñm>G®Ÿ\Ò\Ö\Ò\ËØŠ+gfÚ…üp\"²@\â®\ô¾—\ñ·\Ö\ö¬>Br\Ş\Ø§&•š’‘Ä§ü4\nOÓŠ\å\ÓgNRQ\àY\Zu\Â\Çù6€8\É4XŒbC eg¿\'µ6|´h^X\ò1\É\æƒOb\Ğ\\§–\ácrO\Íü´Pƒ,=¸a{\ÃNpr03\é^\Ìÿ\0>d¸*¢\Õ\â\Ö\ÑV2L¥\É\íƒR\â\Ü2A>˜\îiœ‹t#ø•ce#Á©Dc€¹1H\ÍüüpN=x5‹\õùQ£Ú¢`r¹ÁüÜŒ\Ö\Ë\âN×´µƒa‰\÷m\0\Êrxû\ÖE\Õú\Õ\Üon“\Ê-ˆM©#?q\÷¦\ãd\É\òG†‘\Ë\Â(U\ãÔ‰!“ŸŞ¥u\ğª9,c\ÔE\ÌO	fLyŠW8Ï½J¿›¨$\Ğ`ü¸\Îx#û5hú}­\Â\Ø\Â#\Z\ó¥\'\Í:E—\Ñ3…PrY³\Çúšl\Öu«}=\ì\"F*\Ğ_„(€`\÷\î>µ‰9>\â\Ä\çQGy¼\ÛX^i\íwµ&kq\Şİ—ŠU#ŒNGÔœU^úkIc\ãFØ®Y¤,Ì eFs€9\Ï\íIz\Õ\ğ¼ˆ\ßˆ•\ò\"0†%\Ü\É\à`Ú©Å‹\Û:¾/Š ¶l¹ªX4$‘L\Ç\ä\áTşfÁÀş\ô”¯sÀ\Û:+¶@<Á\ÇQÁ¢–úƒ@—\nS°\Í\Ï43px\îo.šFÂŸ-7p¬H\ÅR\Õ!\ŞKpV·¹š\á\Ï\'&ª3˜Ø®\Ò\Í\îj\Ôj\ò6q\Üg\õ§O¼=—ª5:E\"\Ú7˜	\ö¤l¢¹>qA\Í\ğ/\èzH’¶\ŞK›\é›ª¼(­££:\0\é?%´\á\öYVbø\ì}¿l\Ó\æ“\ÑúV\n­½œA\Â\ò\är(ƒZû\rİ¿o\éR\ÎnExÒ@­LK†8T\ä0\Üş­MKŒ\às\éÚ‡\ÛE†\Ë\0¤\à\æ¬™H\ä¨>\àv \\7l´\ÒD\ñx\Ç\0\Z\ås³\r¤‡œ¨ª\è\ZG;nK·§\Ô\Õ{Q 4ø\rÔf\à}H\÷¢L®x-\Û4H\å6m\÷9\í]®™\"~TŸC\ë^K§²JqúĞ»©Ì¥cBIoJÛ¤obÆ¿l\÷w\é&[j\Ä\ÉÁ\õnsTm4G….	 ™%ßŒv\ÈÃ©46j\Ó\Ï\"G\ZY˜\ãÒ¸\ô\Å\×\ñ\İ\'\ã¢OÃ’FøûR­‹µ`\ËNŸ‡\İmÏ¨©M–\ö\0\ß-J\òfZ3\r#¨\ô\İF\Ò[+\èG\Ä\Â\â“\ß\èy¤m[©ouEË¨M;\0#s»\ä?@=©\ÆÇ¥\â¶v{†šv˜\ä“hÚ‡\ò\ç“\È\õ\â’5~š‡Iœ\Ã\ô¼œ4g ı\ê¼RŒem\r\ğ\óüsM¤\Ï:‡›ajşE\Ó4s|­@8\ÏoZ%\ë\Écä„+b8\÷¢v\Ú-\Å\ô°Ù™\n\ÆIÀÀcAÆ˜\Ï4\ö\Ç\Í\"v¦1¼\óU|\Ñ\í\\¾|\"¬¦.V#“‡\Ïl\×\ä“=Û½¼A°\â \æ\çGŸ\á^g,’\Ärc#ºûŠü\Ò`\İ\æJ%\Æ\Ä,q\É\Ç\×\õ¬sN<|l²\Ş5ÿ\0‘b\Üb@œn#·µ}O\Ğ==\Ó\ÖV\Ê7”®\Ä\ìy&¾PG1¾\óù\ñšú×¤uT\Ö:gM¿e\ãĞ‚?pjL¾\Æø \á\Ür20\Äú“Ÿ\í^fs‡*7[A^#r\Ò*’?8=şÿ\0\ô¯2H\ÈTXz})#R?m\É|œÿ\0{5\ï\ã8ú\×\ä¤E•ˆ\nGN\â\ñ~`§½`/³\íÉ›\ğĞ•„w\ç>\æ½\Ú\'—M !G\åû\ÕE™7\îq=+\ò\ãP\Ü»v\áPv¯XH¹w¨”S\ÙpI\ô4‰\Ögw¢2­‡–%u#s®\â¿a\ïG\Ë\\’9ÛI\õ¤Ô±µ\ê[›«‰%”\ÅÁù£en;cn2;\n\ÕÈ¼\ßXĞ¡¬j:±&\î\êiÙ†\ãÀûÂŸ:G\Ä]#¥\ô\ëm\"ù.`È²…\Ü\0,{Ï¥y\ÓúkB\İ1“\âT…$nP£rp)Q³Š\î\îF·¸Y#C±Xv¢tû%g\ĞúF¿a«[‰¬n¢¸B3”<¸\î*WÎ¶\Ñ]Y’a¸h\É%ŒÔ \×üŒl\ì‘\î-Vs\0wm\ïUkŒ p	˜µ¸b\Ò\î4›E‰=´R³}\×ş”\nQ¶\æT\Çf?Ş¶kƒq\É2¬naÓ¦–È”W*W¸\÷ş”¥i\Ô+%­Ñ½½gšAµ·œ\öúıi³]¼}?I¸¸\óª\ğ}‰\â±\Ùby\ä—\',Å‰>´\Ì0\Ù;&\òeRT\Ôu8\Õ\Ö\0Ü‚¹\'9§ºv\Ö\ó\Ãş§º¹M³K¶(‡`£wv\Ç\íAü6\ğ³S\ë\ä–x$‡J\á¸Ü¿\åOr~«\è]OO´Š\Ö+xR+{@Q(ÂŒ8úQä’„uC<h7\ögÊ—‰²\å\Ğ)\\|¸>œ\ö¯¥<\Z\ó_ 4\ä™J2w]\Çú\Ö®h7Zv«+\Ë	,…œc\Üÿ\0c_Dt\éw\ÓV²Æ•G`(rJ\ÒEJ\Z\Û¸X\ŞIo\ØWT\ñü\Ø\ÔVŒ9\0Á†My•F\á‡h9\Î„\ä\÷µ»¸;)v\ö£’\np3\ô2\æ\ÍL\ï\ÆhC‚^Á/¨3\r±)b}Z¼E­ ’G$ú{Qdü W\êÁ´\ò+R©tR¿ÿ\0b\Ò/®\íh\áfS\õÁ¬.d¶\Ü\Æ\ÅKXƒ\Ù\÷­[«&0hK´Ÿ1vqY2§›oJqL‰ş\È5j^H\Üo#p\çš\ZS\Ê,£\ĞÑ«CÁ\ÛC®­&\Õc\Ïp(E¦“)†$š•ø\ĞJ\á_\ö©D‘›\Z\'Y\Än\õ\r-m\Ğ4°[\Å#\Øn¯/§.\Ùgh\ÎK`“Hº·ˆ\×5aÁš_*5=\öıû\ÓK\êW—zD7:Œ\Úw˜Û¾3ÁÇ§3\Ù+‡Z¯b·T_X\ê	¨¹k h^g\0\Ü\Ñ\ß\n<2\Òdµ:¶»hÒ³K›x&?.\ÑØ²ı}\í^:†ú\Ö-kM’\å\"«²Œy¼mı·b¯\é\İmiap°]\ßGS0\n\Ì\ß\Í\éúWIj”POm·\è\Ô\ŞTˆQV$U\n¨ƒF;\é@/\æ\Ë2¿qV »2 cŒûŠ¯j¶z}³\Ü\ßLÆ¿\Î\Çµ\r\ì2*€ZÅŒ1•\ÙA\0‚\ÄŞ´\Õ\Ñf\Şm\Û\á~H°@_±\"±»®¬›©\Şh­•¡¶AŸ™\Æ{ŸùV­\á¬fß¥4\ö|\å\÷¹ı\\\Ñ\è\Ò\äZË»¨\ô4¾—²Ÿ—Ş¼ˆ•‘F00G\\W`¼n?~Gú¶v¯\íYF\Ù\à`8G\0\ãVDHÏ\õrO’0 `\õ\È\0+\É‹*´\"¹<X¢l*6\÷ªÎ¼QLªYü]Œ\ğ\î„½b–\ë63A:4R\Ç6\ÆC\é\Ío,2¬\Ó\Æ\r&xt\ÅÖ¬Q–\î~9+œı­l{¡\ñ\Ú\Ùz:[§­\õFP\÷\Z\Ç•Šq€;\Öuy\Õ\Övp‰$2±\Û\Í#K®ê·›Ä·³\ã¡°{8£}7\á\ßQ\õ)V´\Ó\äXIÿ\0a²1úÿ\0¦iª\n<¶D›}—}_yvÿ\0\ì±$\n=şbjVµÓ\éV0\Ö.$¼‡\åˆ\ìDûzŸû\â¥\É\Ğz3\Ğ\õ˜t\Â\ÒM\Ä2\Âs\Ï\é\Í]~¿Õ˜¢\Ïû¤\ãúÔ©MpM\ò,²Q¤ÁZ·¨\êˆ\Éuw#Fx(8_Ú†|2}jT¢I.“o–>\ôÏ‰\×\ÚE—\Ã^+\İ$+ˆX6{}G\õ¥£\ê­S©nL·\×`9HS„O°ÿ\0Z•(#›i)\ÉÆ›(\Ùjvy\Ê`\î\à\Í}7\Ğ\ğ‘\ÑúC3eš\ÕŸrFO\÷©R‡/C¼^\Ø\Ã¡B=1]bùG\ëR¥N=•Ù‹3d\ç¥J•¨b\è\ò{W)*Vš\0Ÿ0\êh_VZEu¡jHG·3ü§š•+Ë³%Ñ‘xem¨u]Ğº·†q¡t m­½FF}y5\ô>\0\\Â¥J\Üÿ\0™?Ä›°;T©R”ÿ\Ù',5,'2024-08-11 08:51:24'),(2,'Satish','Co-Founder & Director Silicon Mosaic Technologies Pvt Ltd | Bengaluru','We are quite happy with the way Asset Makers team deal and navigate the real estate purchase or sale transaction with purchaser and seller, to be frank i experienced both the versions of property transactions with them and i am not much aware how does all this modalities work since i indulge in my IT domain. I do not stop referring them with in my references which is out of affection. Thanks !!',_binary 'ÿ\Øÿ\à\0JFIF\0\0\0\0\0\0ÿ\Û\0C\0				\r\r\n\Z!\'\"#%%%),($+!$%$ÿ\Û\0C				$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ÿÀ\0\0–\0–\"\0ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0:\0	\0\0\0\0!1A\"Qaq2±#BRb‘ÁÑ¡²\á\ğ&Tr\ñÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0!\0\0\0\0\0\0\0\0\0\0!1A\"2Qÿ\Ú\0\0\0?\0‚\Ö%·2° @\Æ8\ï\ó\éAÁpDh£fş\Ñ{¸\ì\íZ™¥±‹\Ëo0yb3\Î\âZ\Ú\å>Î¦27\ÈI\õ(\à˜*\àü\Ñu\è\Ñ\Ùu2°Â§<—Îˆ³™Œx2ÁO>\ã=¾t=İ°\ò\ÕX•Ÿ\ÊznhH¢Ü‡z•¡+ˆ#\öÛ \ö·r—•@»r@\ã?O\ï[^i\ÚtFk¥k©£l”>¨˜1[\ëùTz]—¶Ugc°œ6{{R›È›t²·–Ğ½›u¤\Ç\Ó\r˜i\'\Å\ÈY’<\nf1™\ÙX(^€É¡\İÙ”‚q´c9\í[F¾c(\õn\êy\àÖ¨¤´+š\Z£’0i´‚:Q\n\ğ|¹_r“»\è~µ•kB¡IV4À¢\Æc›ƒ\Î)\ó…\÷Nqƒ[¢ZdgZ\ÅÅ”\ë¶U”´Cƒ })’`qfB°l\í<M€ù¨\"BX\çŒ\ô\Å\ö\ål-´ #\÷¾fŸ·¸–C~\ó\ç#\éŠd„{—R;\ØŒ\ïNL\ñ–uİŸº:ı(Q*\Û\Æ]6¹\n3“\ó\"ƒ–\èJ£+´\ö#½4b\"J\âd\Z\Å\Ï8=)ˆ\ÚTm\Ç#\æh˜™6\Í\ãa\rşiº+k\ËË‰’L\î\ÌKJ„3\ÎASş”ªf®¨\Ó}§Ò°Eˆ\Õ@\Ë\ï\ò­/\çƒytY¤U6Á\ëø\óPjR4D\Æ\Ä(<\nMÕ¦wBËŸ,a®I\é\íık±\'Wè¿‘(tÛ‹´yü–x\å9\àc=>Uqj‹$¬„¯€˜9\ÅJÅ¨\Îú‹¥\Õ\Ú\"\Édfh§µW\æ\å’\"\å½\'Ş³\Æù8¤;\ê\ÃU_\ì\åASPMLh:e½\ä‚\Öy\Ä\0£‘\ãİ±†G¿Óš¯\Ç~\ï†Ï«€p1\Å§\\\Ú\Ïp#¼Ş©\Ù\Ôü¸\ÍX•m2\Ç\ã¯C\á=F+he†\ö‘[’s\Îy\öü\ê!4«‹¹R\Ñ`Q Q–\r»\ny\0Ÿ~k2\ß\Û\ëFŠn&#¸\Ë+À@ùU\ïF‚>\Æ0¨¾c³c’iœ—\é#F,\\\Ù]³\ğ@eı£k[¯\Ü!&):ºF\Ş\Ô\æs\ó¤ù\åı7/\Z\rtP!\ğ}\ë»R\öşP€Û¸\èjÑ·œVM‘O\ò\ö	x°H\å\Ú\æ†útÅ¡VR*wş)§º\ó-b… ·_(\ñ*Y±\÷®™\âx »\ÓMÉ‰±¸\ê=«—\Ş8‰\İ@z¨\ÇAZ£&\Ñ\ÉÍƒK›\Å\ÊT\÷ş\İh)|\Ëi¼™”‡ˆ\Ê}\è\Í&\êK‚¶²\\ùh9PzÆ¤u\ì\Ò •\Z@B\ò¼\ç$R|\Ü%\ÆAX9\Å\Ê>ˆÁ}JÀ@\0$aÁ;€\ÇOj.\Çh”ll±ı\ìTPS–\Ø@›­\æùPRwûh»2\ôH˜’\\ú°À\ò1Ò•F\Çq%¸Ş…†A#9¨¢Y]“|RE†\õ7_j\"\ô—‚\r¡˜n\Ú\î\ó\ï\ô\ç\ñ¦\Ö\ém\á\ò¦–9J\ä(ÿ\0SY\ß\Æ\Ù£\Í\'9\Ç\Ğ\n\ËfŠ¡›‚#‡\ä\ò9\ïN\Ú\Ê6ˆ¸\Èi<ÿ\0qC\ß<ŠA\É¹¡r\í\Æ8\ö©\\•\0›°³¹Ô§)k’Ê™v2vş\İ)ù\Ö Á#\İ¼[§\æ£m\æÄ†Š\ãc2\ó‚AÁ\íŸ\ô©\'°‚\ëFû|0\İ3ù»‚b5\'$\0rI<R¸Œº&|-`d™c\Ò\É3€¤\÷ÿ\0¹®©\ÛG¤2Gq2Çœ\ä\Ôo\Âıuš;‹ø\Ú#h®ÁXv\ëı\ê3\ÅZ¹\Ôum\Ì\î\Ä\òNj\Í\'r£§‚.1,‰{ıÙ‘¸\÷¢\"¹›!\ÊZ+\İ\Å\ÛtX\ÇÆ­>†\òH\ËK \ç­,¢—F¼Rrì¸›˜\ï/\Ó5£z\òTUW¼¼·•\Ñe9\ì}©›\rrÿ\0q†k¶—ŒqøÔ„o`\É:uE\ËWg{	£\É\ät®q¬Fcx71\èAü*ÿ\0a<×–sEr\Ê\îˆHq\ÜbªRé¯¨h\ÖYd·mU\È\Æy\'Û¨­xå£™\å Q$\óÛ«Eiaq½\ö\í\Ü1Mı{‰\ó\Z’ ×¡§\ç’Ki^	]T/\Ëçš]B\Ñ|¶›2HH=¶~u$ø³-©\'Ë°=z\ÚûM¹	©@\ğİº6²c§\õ\Îj6&\ó=úÔ§|u)ÀuÜª0„”5•\Ã4\Ç\Ó\È\ô=Ò¬µE-[\ĞA’4`Å•p9\Î*nA‰|\Éû¹Ò«\"\ô\n*jv\ì\Ú<Ã€s\Ñhø®\í\ì]1	X.\İ\Í\Ó\ğ |û‹‹\ì¸\É\ÈÀ¾Z3ŸR\çh8&©e\ÈzY\ÖY\Ú)#\n\\R›Ê‚1—ûAË“½°zş\Õ\İ\ÖgIßB\ô\å\íL™¼\÷Rä§,z“\ÏZ”À9keu|e\ñ¼Îˆd`£$(\êjÁ\àË¼\Ìt»™v[\ÌA#oR9\0‘\Î2:{\ÔF•%¥\Éx†\àS\ĞN\ìA«=‡‡\õ‹\rKMÕ´\İ.s“0’\ã|\Ã= \ã>´^\ÕbT\Ó:·…\ã[>\ì’\Ì\åDY>\äd\ÔEŞ‰Åˆ\0zš–’f±³L‚¥œ¹R9tªî©­I[\õ®Z\ÑŞŠRmŒ®‹cÀ3™e\öªÁ¦\Ø%µ»\íL\é\ôª¤m4pa”¬Ç’ø\Í?i\ã	-\á1\\dÊ¼t\ëV4\ë`R\èvÿ\0G[–|>}¨\ô7f1¼C\rÁ\Ïz)µ¹¯°c‘NC\×\ëRºn¢·P+0Á\ï\õ¥N†IHM\ÓŸŠ2F\Â\0?•C\\kUd&q\ë}€˜\0g \äıx«L“/AÒ¨4½\íÖ¶\ä»s\ó<~Un&\äø£•\Æ^À\Z&l,’6=ø\Çù<P·V‹L\è\\·¿\\SFú\İSh@O~I£¬\Ğ:F¬\êV@N\àŸ\ò+s\Ñ\Æ@PJ˜\nO\Ë \ò½I\Û\ÉmF¸F¹Ü™À#\ğ¦#‚/²‰¤¤\à\ß\óA]O\"\á©CÕ‰\èh*—B\ôú\Â¶.2x\ÙÀ¥P3\Ì\ï\ô•Y@ ›tcn\ãœ\ò;QpAÀ$yÀm\Ø\ò\ğsÓ¯µ\å.WËŠ\ÕU»°\ê{S&\Z\ãª9Z4F&—v\æ47>q\È\Æİ´gc`¼\ã\ÍKYZ\Å{\åùÓˆc@	ıs\í\Ç|\Ó7Vj\\È§\ËFBêƒA\Æ1\õ¡¾ˆ\à“:/†|\á›\ë\rR¸\×\"³\ÄgÍ\"|\Ï0dú†x\'\Ó\Ó\ïW\é\Ş“I[ı7\í³\ËŒ\ñ\Ë\öœD’n\0³£\ò§ƒøœ\×°½ki\á ¾C+az\ğ{|\êÃ¯j6Ñ¿“oo=”’z]·+/np{Ÿ©§\ç\ê‡N¶tbk\áo\ê05¼“\"£N\ÒNJ­\ê–1·”\æ¡|?ª\Ü\ÜÙ½½\Ä\Ï)ˆú6p¾\Ãåš‘·s$¼“ŠÁ’5#«Š|¡cQ¾¬’l\ò\ĞFz0?m§\Æ\ö\ŞCøƒR¶\ñ\ï\\\rÖ²‰$8\ö£e±Jˆ‰5Xa“\Èx$<zy+£ä£¶}%¸¬\ÜÂ*	?*b\ÒS\ìû\nI;D_W¢m\ï\\\ó\Ç70\Û\ë\×*Œ\Í\'\0œ\ğ£\0­Nø›Vk[4Tm¬\ì:N*Ÿ~±\Ş\îvq½˜\í’\İy\êz\Õş<Z\Ù\Ï\ór&¸û‚\Öf·\Zƒ [q\'–g.y\Î>ş¢‹a\å!›q# Œ-5u­am`mm\Ñ`\È\ß\Z\á¤\Ï\ñg9\ëL\Ä\òˆ\Çrx>Õ¶J\ôs­.‡\Zü\Éq\å°;G¤ù\Ö!™d-ú“9\\şTUÅ¸HıQ»@B‘pˆv\ò3\íß¯µ:Gn\Ç “#“‡4RI\n\ĞU\ô#‘¿xg ûsŞ•2nY¤l.\Ğ;\ZT6F-®m4n±¬•\ŞG¤ÿ\0\Í¥iVwr<—RÊ¶ñœ±2\í\'\ÈÒ«\Ìe•\ĞI1Â€y\ö©}S\ì\à\ñ ‘ƒ\Û5[d&“\Ù=ú«O¹·škI|¡?\í\ç\Ô=Á\î\0\â¢\î|?y•½ıœ_h¶r\ê¬I¯N\ãš\ZK©.|\×PI\èG±úz6\Ö\ãS\Óm\àš\Å\çpß±[*s×§CÖªq®\nq— ı2\á\ôx¼\ãe\÷â˜\ØQ\õ\ä@ş•	~·\Z¥\á¹e|–}$\ç¶?\ï5!\ö+^\ÚwVX&…w\Í03\ó\ë“\í\ïQIc{,Œ\"¸TP–N\ã§„L\Ù`ğŒ¯¨\İ*ÛŸ\\e\ğ¨rG?‡Î¦(\Ù\ïV¯\Ñ\ÛF¶–Mrgj\Ç\Z[ü\çvK~BŠ\ñÇdÑ®\Z\æ\Ô3ZHx?À}/‘\ã\É.F¿*_FS¿^,)È­\ã\ñNq\Ü\Ó/a!\ÎPZ¼45š:\n,9u\ärOJlg;G$\ñZ\Å*úPŠ¸xGÀ·ú\Û-Äªm­s\÷\Ør~‚Œ\"\ò:ˆ³’‚¹ƒÅ·D^K§#´qP\÷\Z‡Ô¬?tÕ«\ã6–ş2Ô­-T•·\ñ\ÜúOÖ©v—!\í|‚9\\\õ\ï\í]5‚¦p§\')6iùXr@ÀU\ÅûE¶*\0€Ga@$›y\ÎEaK3\'q¿4\ÂQi\ğŞ¾úz\â\áMÅ“\ãÎ¶ß(3\ôíš‡\Ô/üÛ‰¼¬ù;‰@G v\é[=‘‚#$N\n†\ã¯=©»{s$\ÉYzT\×dm\ô(§.¾¢T\ö?/jTµ…ga\íŠvƒ\ïJ¢W²Y¤z›\İŠ™T\ğÎ¼­º$\Şb\É4\ğÀ\ã¨?\Ñ\Õ\æ\ò\Äj\Ä*Œ\n®İ²KkJ\ÂK,qjZpv8¸•£\ò\òF1\ó:oM\æn€,8À]ƒ¨S)n¤\ÒV\ëMQ[ \ó}\"@\Ü\Ëu&û™\ó\×\'­>\÷\â8\öF@°¨\Ã.E4^šg£¿F\ÈÀ\ğ\ö§7y.°\æ»ÕŒ7\ö\ÒA<j\ñ¸ÁR:\×$ı£Çƒ®_\Ş\ñ¿Úµ\Ö5]^\Ó@Ò®5+\é<»{t.\ç¹\Ça\ó«8ªØ©»\Ñ\É<[\á)ü=rdUi,\Üúø~F¢-t\é\õ	D6–¯<‡ QŸÿ\0*:\ó\ãeş³¨Ky%’}œ1E¸\áSù‡Bj\ç\ğ‹\â„~ Õ®4=N-\î_/j\è¡Dƒº\ã\ÜW!øx\ç“OGay9ahœ\ğ\Ç\Ãxm6]jŠ³L9¸Ÿ_sW¨¡X\Ô*€\0\ì(Ÿ/£\rª\Ç\ØWO\ãUs\'–YÉLø¯r\â6°{yŠ?¢Š¨\\iv\ì|\Ï\Ş\\g#\ã\İDj3\Ö.U²\Z\éÀ? qıª+’½\ê8¦W`’XÌœªù‹\î¼ÿ\0_jÀnv‘\Ín6¾\å;OÊŸ\êx¸…ù‡«x¿„°;i¤ƒ(du°H\ÏZz\â\éAi9\0ûQ_cŠPM»ƒ\ßi\à\Ğw6Œ’¨	!v8Á\è8¬\òƒ]†\Ì\à QhrF\ïÎ•k¦#&%t·a\×\ÌŸl`\ZU]¡”l‡\İKuk»ŠBºEFÛ©gŠÑ¹´C\È=E\0¡Ü‘Y›5š=1ú4LO…¯m\Ûÿ\0`È¿\ĞùU‡\Ç\òŸ³i)–´\ï\ã\÷›ş*©\ğ%_\n‡‰¶´\"\ç\åš\èQé¨›†Üœÿ\0Zi+THºvy«\\\Ñ\ÛÃš¬ºvr RGcS~Ñ®¼ÿ\0\×QedŠPa|r1\íDüaòŒ™ aº8_\ë\Éü±W/…–\ñ\İx:\0\ê\Ü\çq¬Æ”\Ù\ĞÉ™¼H\ìú&¢º®›\r\Ğg_Zû7qPŸ|Wƒ¼%©1w–Rş\'<\n\×Â“	d¶sˆŸ\Ô=®OúGk­qa¸oCËµ\ä9\'ò­‹£œ\Î\n\ó<²4®Ä³’\ÌOrk!±Ş˜¶\rJA\Öl\Ö\Í6Xâ±º \â¸(r\rIE¨‰,Ş¬tn\â \÷b¶YH\ïSMS!/q-\öA\Å\Âv*0G\ÔR¨Õ»1\÷¥U|\ÃÉ€[¦\Ô\Ò&¬L†ù\íZ\ãšÀ<f°\rB\æ²\r7š\È5zo\ô}\ğ¥¸şy?\Ük¢jW\Ğ\év·w—+t21ù\n\ç_£\Ûg\Â\ö\Ãù\åÿ\0u\ñ«[6ZH\Ó#b\ñ½Xş\ÍY\'\Æ668sš‰\Åu}RmcV»\Ôg$¼\òúd\ôü+¨|	¹Í¥fI!eY\ÙüW\"n;ş5\Ò~\Ü«\Ş\Â8Š\Øúù¬x\ÎÍ¹•ch\îf3Š\ó\Ç\ÍP\\x’\ÚÁNE¼[˜v?\à\n\ô\Ô\Â+W|\ô\ã¿\êÿ\0®¼Y©\ŞÊ´\ÅWÿ\0‘Àü«c\è\ç\"4ƒb´\Îkœ\Z¬cs0œdÕ\ÜS1€>µ¶j–æ±»¦\êÕŸ\0\Ğ	±m\ç\éJšC\ÏzU,†Q¸¤y\Í*TP½)\nTª\ÎiÖ•*„=+ú=?ş/ò´¿U¾3jow\â¿$\ä%¼J }y\'\ò¥J¦_\Éû(Rz—w¿j\èù\ñ\ç\ÊùŠT«.Ñ·\Ë_Vuoj’i^\Ôn\ã\Îø\àb>¸¯\ÈÄ–brI\Í*U¶G%\Zf–{R¥H1‚{\Ò\Í*T„M5#v\÷\â•*6ZT©Tÿ\Ù',5,'2024-08-11 08:52:12'),(5,'Krishna Prasad ','IT Entrepreneur, Gurgaon','I was quite happy with the transaction and professionalism.',_binary 'ÿ\Øÿ\à\0JFIF\0\0\0\0\0\0ÿ\Û\0C\0				\r\r\n\Z!\'\"#%%%),($+!$%$ÿ\Û\0C				$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ÿÀ\0\0–\0–\"\0ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\07\0\0\0\0\0\0!1AQ\"a2q‘BR¡±\Ñb#$3Crÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0$\0\0\0\0\0\0\0\0\0\0!1\"AQ3Raÿ\Ú\0\0\0?\0ù\Í	JEaXe\"Š‚hOh@€Ü©b\Ó\È\Îg\öW(­¦¦GD\Ö=Ç˜w&©G3‹Rh]_ømdÁ\ÇC¡ —4—\Ë}¿uŸU\Ã\ó\Ó\Æ\÷€\\\Ö%\Ø8R\Ú‰¥\"µ%$‘Œ–=ú*\å¸L¥\ÂD  A„!\0B€!@	“2Œ z„Ğ—(\Íæ¥ˆd\ã8Q4«–\ò\Ñ#[«H\Û<³\Ñ -Ò°\ì„r™?5p\\+e.‚ \è]§HË·\Û~}V\ï‡oÓºª°iˆ€{e{E§…,´%­4p\ÍÁÓ¾{®v1Ez¤l\Å\âº^\Ì\ò»MÁ­¤d\ÉO£aø}@r\Üƒ\ÉCUYOD\ê\É+*Ÿgn†4–¼\ì984\ì½v«†ãª†X\"‘­…\ç:Lc+Ÿw†VÉ¦\Ó-8\Ó\Èi?¾\éG›ş\Èu\â\â\ĞJúù‹L,m$	>~\ë2º›É•\àn\æ9/^\ã^’\ËMøº8\Øibç©£ ı:/)¹Á3e{\Ü\İ\r{²:\êß¢\ècÈ®vŒw™”Zš¤pÁ!1Lˆ€¥F€‰R B\0	\n8#)¹@( +N\ÅNjj4c¨\ì²A]7\Â\èk\ÕJ#¯“\ënw\Ç}²“z@‘\îülm¶8c¤7ª\ê\á}<N\Ã\Ş\Ü\õ\İy-Ê¶­\ÃË–Iiµz£‰®Ã±\ße\Ç\Ër¬Š IGzªt\ÚC\È?3•\Æı:¯“gK\ö%|Q\ô—1#q\Ë(wÿ\0\ÓvW„}»Mi…‘]\\j	vt\Æ\á°\æuc\n•¿‰khªY-E\î\àAw&»é’œøvû\"\ó\Ê|GV\Ú ¹Zç ¨Œ=’0‚U\óYk,\Ï\î\Ô\è\ØrO.ŸÁı×³Pø‡QGm‚x¢}\Ò7H\È^\ĞüJ\Ç8€6\Ær!\âL”u\×)\Ñ\ÏJùš\Ö\Ë2\ã±\å\Ğ}WC¸\á™2µ\\/0Ä\å±\è¡S\Ô4‰¨“Âi(e\"¤K\Ñ\"\0„ ‘\É*Bˆ„!!‡U\è\\!t4\ô¢yœ\öH4±®9\r.£†\ÜÊ›y;‰©d8m=\ÙQ\ä/\Í;\å£\Ü% ¡¾[a{¦m=[X\Z\à\áÈ…‰IÁvºi\Ëi\0®¸nXÁ\ğ0Ÿ\ÌG²¿K4u\ôMlšC\Z\Ğ5c%d\\­vj9ª­U²E5QÅ€0r\Ê\ç-\Ó\õÙ¯\ÕJŞT—†)¿\Æhhi l¯¡h-Œc\Ô1‡¨\'\ê¸ZŸlUU>e=c)\ÌrgÈŸc‡Nk\áş#¾T\ÖIo\õ$m™cÜ“\Û|\Ö\å\â:\ëe\ò\Z\Ú\É\ÛQ%cZ\ç\0	sF3\ö[ø¯\Zø²\n¢\è\êmV\nW\ËI cü©,\òF\Ü7\Üd\õ%À~\ë—\ñ4D.´•½‘\ÂKX\àH\É!ze†\ç\rE±€­£.+Œ¸nN\"¥ü4\ò\ãd¢gœd\á¹8\êİ¹\ÑZ”\ïG‡q\ìs\Çs{g™\Ó\É#\÷s,\ô\İr\Ëw®Ì»qL`ŒùQ‘È\×\êrV\nÙ‰jf\\­;m\n„ˆÊ™X!@„\n^ˆHt\0“šw\É&\è§–\ÛM\Î{t\ÄFüE.–\È1\Ìª&\òQi5¦4\Ú\å\ÙIz‚G˜_³[2²é§¼\Ü\é\îUÍ¥§v<¨\ô\ä€:ü\×-\ÃwP#€T´\É\Ú;/W¶›\rÎ™¯6\à‡i\'?ªÆ¡\ã\ÛKf\Ïuz\Ù\Ï\Ù`·r\ôƒ’\á\ê\İ\Î[\ß\÷JX«jWil˜‹\r\Ò\æ\åvœ<\Î¨h\nFc\õjÃ›¿\Ïä—Š\êmvš\Ó\Ãen˜\ìü.\È\ßßª—µR\áhƒI>Y³m\ò\é	sO¥\Ã+ƒñ‹‹®6j:h-\óEs%ŠSmÀ{\îUû\êz\ç6&jvp9,\ßª­Í£´p\ËK$¸Ò¹\õU…§>I{p\Ö|n~Š^<<·­\Ë^“³\Â\Í7*I\ât2:7\r\ÚTkSZ2‹”ˆB\0:#(B\0P„ Q\Õ4\ğ‚@—+Bpn}\ĞxH\ZU¶\Ğ\Ì\à]£\0u;*\Ó·\Ñ\ï=“\õ`u<#huM¶®°\È\Ğ\ÖM!K‹\\s\öj\Üÿ\0¸§‡@#OM—aı7pYø¯‡«Ë™ ü5L·\â†A\æ\0\á\÷ÁAY\\Uc®á»¬\Ö[\Å9‚ª=\Ú\ï\É3z=‡¨?²ÍŸ\Ûl¿›^¯³:\×ue1\Í\Î\\]Ÿ—\Ùl\Úi¯\\m_²š¢­ÿ\0«O!ÜƒÜ®\Ã\Ão\0\êx‰‘\İx€KGB\ì:(9I0\ïÿ\0û•\ê<i\Å\\1\àwQ\ÒA\ï”´‘\ì\é\ä\îO<¤©Ê¼‹’ª¸‡\ñ\ì\ón)¨ \ğ:\Ã¥’\Z\î,¬aü,vR\÷•\İ\ñ\Óß—u\à†¦z\Éå«ª™\ó\ÔN\ó$²<\å\Ïq\æJe\óˆ®|]}©¼İªQYR\íN\'“GF\Ğ26“\Ïa\ÕtpcXç‚šn\ß$u\ğGT\æhp\ã\î\\\Ô\ò@\í20´ş\ÅoQS‡»\Ì=N~ª¿-\Ì\Ğ=\Â/½\×A\×\ä\ğ…µ=™’‚øƒúN\áe\ÏK-;±#\÷\èVj\ÇS\Ù-\å\Â0 \0‚N`$\à¤|-[mÕ’>58‡OD†R[$—\Ôÿ\0Ku©q\r›~ª\ÜqI“\Ë\å\Æ\â¢p¹\Å2Gdoin[\àlr¸\r\÷Ü­X^Ê˜šøN z¨g¿G¨º“_a³\Ù?¤‰]M\Ä\ÜE+\Èe7\à˜\é\íƒt»9?BV\÷x\Åo¼\ñ=¾º¢\ÅI[` ¨\Ö\Ç\Ít¯¬v\î\\n³<*³š_\n®’S\ÄD\÷)^\Ú\ÉÛœ\ÇNİƒ3\İ\Ä¡\\oY\êª\ê\è\ìV\Êi#\×pk†[ß·5\Ë\Ëm½#g‚Z¬—\Ò>³¸\ñ–\İÂ\â‡V\Ä\ëg\'d\Í;9¤m~˜\î¾%\ã¾0¸ø‘\Ä\õš\÷=°“¢\í}\0\÷\ê}ÖŸ]\ëi,Tü	\r\ÊZ‹]¦WŒ\ì\éO0?\âÓœ\ä®y°¶6c[°\ã\ãlÁ\ê“ dÃ\Æ\á$™- m¨†©$‘Œf·9­™\'’–f\Ö8:&»\Ëo\ç#\Ç\Ù]ÿ\0	\"\Ô^–\á;\ä§5˜K\Ïe-\0F@)\ò\Å¬\ÃÀÁ\î sˆ\ä2ÀF\çw	¯\áe\ÕÙ\Ë\é\óÿ\0\Éä²¥…\ğ¼µ\í->\ë°\0¹¸+2\ëFN]P\ÜV_kr)³ÀB°–~lÃ³w+¢£Ê„\×\ÔVM¶D]\Ôÿ\0daÅ±ƒ·U³\él`¸5 •c¥q<›Ô§L¤’\ÆÓ‚Üœ_Ux‚š\é²È†–’Iù©\\\Ğp3\İ+@jG\ï\Ğ\'¤€\öşi¦\ğ\â\Åik˜cª’K•S\\Hüå±‚ycÓ\ó\ì\n\ã/üY%‹ˆ«ª\áo™Ti\İO	x\Ş\';³œ’@\ï¾wÀ\äº>­u7R\ÖÖ¼G\åÒ°ƒX†\ï\Ón\Ûúº/%»W:\åpšr}%\ä´c\0\ö\\¼8ÿ\0&F\ßGc=,><\ãûeF—8\ä\É)_—¤`aFde<fI¥£™+¤q\Èg¶\Ã4Œ’]O\r\ÛI>œ\÷Â¸Öµ \09aT€\ÉW ™\à\Çİ¬\ê\ïsş•‡¿Iv\õd ¸\0I8Qg~jµTù-ˆ\Üwù ”…NÀJ§\î\ì:+Œøp§%–7Ñ\÷PV3T^\Ê\Ü{5AU\ğz\\3x\Ò\â;!: 3\Çg.#\\šQ|\Ä\èC$\ò\àİªüùrUwŒB\ã\Ø)`9~}‚\ß(DúƒœJ’.;‚ò£º”²»Ê‹P¦JÄ€˜\÷Q\ÚZ9’ùsAi\È##\äš\ÙK$d€¥Á\Ø>\Ç)7\Ço“¸\ã«\ç\à\è ±R½»1¢l\r\Ú\0Ù¾\ßOl®»sN¨¨–¶¦J‰]—\È\â\âU*ª\İ0@\Ñ$\çŸf{•N(X\ãE\ŞFgš\İ\ÔT6\òt’é¼\Ïú\n´\ò\ÔH&«Æ¡»b\Ò\Ï\öSè©„L/•\î|¯9s\ÏU1{Fp	Vk}”\ngc}9\İ0’şEBFJx— €1²bÍ¥»,øe3\Ô\ÈY¹øA\ìª\å\ò\â$\ó\Â}¾/\"\0\Üú\êq\÷Q\ŞŞ†]ˆiØœ•j3•QŠ\Ì#8VA_„\í„Ê­\ÚJX‰\ÆÉµ°­+¢£’¯E\\£\ß(S]YŠœş \n*Õ´h‹u$ùdt\Âu3‰ˆ}Ğ…¶{\ìd\ç\Ó$vZGt!O\è\n–Ê’\è\å€\äù.À>Ç’¶ON\èB„t]\Ú\äúi[I\0Ä¯\Æd=3\ÙZ£¦m;4·s\Í\Î<\ÜP…\\½\Ó\Ø\Ë\í\ì¢.À%Vˆ‰\î\È)…úFP…j	–H\Øy9ÀªÖ†·\0!\n3\Û,g|\áZ„\ì„+\àƒ-\ÄvQ\ÔIBÿ\0EG;w•‡Ø¡\\œÿ\0\äe\ñ\Ñÿ\Ù',5,'2024-08-11 09:11:24');
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
