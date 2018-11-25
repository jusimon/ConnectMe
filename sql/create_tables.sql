
### Create corp_cust_tab


CREATE TABLE `mysql-prod`.`corp_tenancy_tab` (
   `tenancy_id` VARCHAR(40) NOT NULL,
   `tenancy_name` VARCHAR(40) NULL,
   `created_on` DATETIME NULL,
   `company_name` VARCHAR(40) NOT NULL,
    PRIMARY KEY (`tenancy_id`));

CREATE TABLE `mysql-prod`.`corp_tenancy_user_tab` (
  `user_uid` VARCHAR(40) NOT NULL,
  `first_name` VARCHAR(40) NULL,
  `last_name` VARCHAR(40) NULL,
  `email_id` VARCHAR(40) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `role` VARCHAR(15) NOT NULL,
  `created_on` DATETIME NOT NULL,
  `last_login` DATETIME NULL,
  `designation` VARCHAR(40) NULL,
  `tenancy_id` VARCHAR(40) NULL,
  `mobile_num` VARCHAR(15) NULL,
  PRIMARY KEY (`user_uid`),
  UNIQUE INDEX `email_id_UNIQUE` (`email_id` ASC) VISIBLE,
  CONSTRAINT `fk_corp_tenancy_user_tab_1`
    FOREIGN KEY (tenancy_id)
    REFERENCES `mysql-prod`.`corp_tenancy_tab` (tenancy_id));
