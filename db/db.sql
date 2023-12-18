/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 10.4.32-MariaDB : Database - asg_screening_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`asg_screening_db` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

/*Table structure for table `wallet` */

DROP TABLE IF EXISTS `wallet`;

CREATE TABLE `wallet` (
  `itemID` int(11) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/* Procedure structure for procedure `pd_deleteWalletItem` */

/*!50003 DROP PROCEDURE IF EXISTS  `pd_deleteWalletItem` */;

DELIMITER $$

/*!50003 CREATE PROCEDURE `pd_deleteWalletItem`(p_wallet_name varchar(255))
BEGIN
	
		delete from `wallet` where `itemName` = p_wallet_name;

	END */$$
DELIMITER ;

/* Procedure structure for procedure `pi_addWalletData` */

/*!50003 DROP PROCEDURE IF EXISTS  `pi_addWalletData` */;

DELIMITER $$

/*!50003 CREATE PROCEDURE `pi_addWalletData`(p_item_name varchar(255))
BEGIN
	
		declare aCnt int default 0;
		declare aMsg varchar(255) default 'Currency already added!';
		
		select count(*) into aCnt
		from `wallet`
		where `itemName` = p_item_name;
		
		if aCnt = 0 then 
			insert into `wallet`(`itemName`)values(p_item_name);
			set aMsg = 'Currency added successfully!';
		end if;
		
		select aMsg;

	END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getWalletData` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getWalletData` */;

DELIMITER $$

/*!50003 CREATE PROCEDURE `sp_getWalletData`()
BEGIN
	
		select `itemName` as `value` from `wallet`;

	END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
