CREATE DATABASE FUSwapSystemTest;
go

USE FUSwapSystemTest;
go

CREATE TABLE tblRole(
  RoleID      int IDENTITY,
  RoleName    nvarchar(10) NOT NULL,
  PRIMARY KEY (RoleID));
CREATE TABLE tblCategory (
  CateID      int IDENTITY, 
  CateName    nvarchar(30) NOT NULL, 
  IsAvailable bit NOT NULL, 
  MUserName   varchar(30), 
  PRIMARY KEY (CateID));
CREATE TABLE tblCity (
  CityID   int IDENTITY, 
  CityName nvarchar(100) NOT NULL, 
  PRIMARY KEY (CityID));
CREATE TABLE tblCustomer (
  CUserName   varchar(50), 
  GivenName   nvarchar(30) NOT NULL, 
  FamilyName  nvarchar(30) NOT NULL, 
  Nickname    nvarchar(10) NOT NULL,
  Avatar	  varchar(350) NOT NULL,  
  Coins       float NOT NULL, 
  Points      float NOT NULL, 
  strAddress  nvarchar(200) NOT NULL, 
  DOB         date NOT NULL, 
  IsVerified  bit NOT NULL, 
  IsAvailable bit NOT NULL, 
  MUserName   varchar(30),
  RoleID	  int,
  PRIMARY KEY (CUserName));
CREATE TABLE tblDistrict (
  DistrictID   int IDENTITY, 
  DistrictName nvarchar(100) NOT NULL, 
  CityID       int, 
  PRIMARY KEY (DistrictID));
CREATE TABLE tblWardByDistrict (
  DistrictID int, 
  WardID     int, 
  PRIMARY KEY (DistrictID, WardID));
CREATE TABLE tblFeedback (
  FeedbackID   bigint IDENTITY, 
  Content      nvarchar(200) NOT NULL, 
  CreateAt	   date NOT NULL, 
  CUserName    varchar(50), 
  PRIMARY KEY (FeedbackID));
CREATE TABLE tblManager (
  MUserName        varchar(30), 
  strPassword      varchar(20) NOT NULL, 
  Nickname         nvarchar(10) NOT NULL, 
  FullName         nvarchar(100) NOT NULL, 
  Avatar           varchar(350) NULL, 
  Phone			   varchar(10) NOT NULL,
  IsAvailable      bit NOT NULL,  
  DOB              date NOT NULL, 
  ManagerMUserName varchar(30),
  PRIMARY KEY (MUserName));
CREATE TABLE tblPost (
  PostID        bigint IDENTITY,
  SpecialPostID varchar(5) NOT NULL,
  Tittle        nvarchar(100) NOT NULL, 
  Content       nvarchar(200) NOT NULL, 
  IsAvailable   bit NOT NULL,  
  IsExchange    bit NOT NULL, 
  UnitPrice     float NOT NULL, 
  PostCoin      float NOT NULL, 
  CreateAt      date NOT NULL, 
  MUserName     varchar(30), 
  CUserName     varchar(50), 
  FeedbackID	bigint NULL,
  TransID	    bigint NULL,
  PostAddressID bigint, 
  CateID        int, 
  PRIMARY KEY (PostID));
CREATE TABLE tblPostAddress (
  PostAddressID bigint IDENTITY, 
  StreetNumber  varchar(50) NOT NULL, 
  Street        nvarchar(150) NOT NULL, 
  WardID        int, 
  DistrictID    int, 
  CityID        int, 
  PRIMARY KEY (PostAddressID));
CREATE TABLE tblReport (
  ReportID		bigint IDENTITY,
  ReportName	nvarchar(50) NOT NULL,
  Content		nvarchar(200) NOT NULL, 
  ReportStatus  nvarchar(30) NOT NULL, 
  ReportImage	varchar(350) NOT NULL, 
  CreateAt		date NOT NULL, 
  MUserName		varchar(30), 
  CUserName		varchar(50), 
  PRIMARY KEY (ReportID));
CREATE TABLE tblTransaction (
  TransID         bigint IDENTITY, 
  CreateAt        date NOT NULL, 
  Consumer        varchar(50) NOT NULL, 
  Supplier        varchar(50) NOT NULL, 
  PostID          bigint, 
  PRIMARY KEY (TransID));
CREATE TABLE tblWard (
  WardID   int IDENTITY, 
  WardName nvarchar(100), 
  PRIMARY KEY (WardID));
CREATE TABLE tblManagerRole (
  MUserName   varchar(30),
  RoleID      int,
  PRIMARY KEY (MUserName, RoleID));
ALTER TABLE tblCustomer ADD CONSTRAINT FKCustomer393390 FOREIGN KEY (MUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblPost ADD CONSTRAINT FKPost719752 FOREIGN KEY (MUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblCategory ADD CONSTRAINT FKCategory58042 FOREIGN KEY (MUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblReport ADD CONSTRAINT FKReport101973 FOREIGN KEY (MUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblPost ADD CONSTRAINT FKPost463187 FOREIGN KEY (CUserName) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblPost ADD CONSTRAINT FKPost896368 FOREIGN KEY (TransID) REFERENCES tblTransaction (TransID);
ALTER TABLE tblReport ADD CONSTRAINT FKReport358538 FOREIGN KEY (CUserName) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblFeedback ADD CONSTRAINT FKFeedback814255 FOREIGN KEY (CUserName) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblPost ADD CONSTRAINT FKPost138133 FOREIGN KEY (PostAddressID) REFERENCES tblPostAddress (PostAddressID);
ALTER TABLE tblPostAddress ADD CONSTRAINT FKPostAddres809418 FOREIGN KEY (CityID) REFERENCES tblCity (CityID);
ALTER TABLE tblPostAddress ADD CONSTRAINT FKPostAddres43697 FOREIGN KEY (DistrictID) REFERENCES tblDistrict (DistrictID);
ALTER TABLE tblPostAddress ADD CONSTRAINT FKPostAddres628776 FOREIGN KEY (WardID) REFERENCES tblWard (WardID);
ALTER TABLE tblPost ADD CONSTRAINT FKPost738984 FOREIGN KEY (CateID) REFERENCES tblCategory (CateID);
ALTER TABLE tblPost ADD CONSTRAINT FKPost896853 FOREIGN KEY (FeedbackID) REFERENCES tblFeedback (FeedbackID);
ALTER TABLE tblTransaction ADD CONSTRAINT FKTransactio71904 FOREIGN KEY (Consumer) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblTransaction ADD CONSTRAINT FKTransactio355745 FOREIGN KEY (Supplier) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblManager ADD CONSTRAINT FKManager173667 FOREIGN KEY (ManagerMUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblDistrict ADD CONSTRAINT FKDistrict133351 FOREIGN KEY (CityID) REFERENCES tblCity (CityID);
ALTER TABLE tblWardByDistrict ADD CONSTRAINT FKDistrict_W223992 FOREIGN KEY (DistrictID) REFERENCES tblDistrict (DistrictID);
ALTER TABLE tblWardByDistrict ADD CONSTRAINT FKDistrict_W924874 FOREIGN KEY (WardID) REFERENCES tblWard (WardID);
ALTER TABLE tblCustomer ADD CONSTRAINT FKCustomer_C589635 FOREIGN KEY (RoleID) REFERENCES tblRole (RoleID);
ALTER TABLE tblManagerRole ADD CONSTRAINT FKManagerRole_MR85693 FOREIGN KEY (MUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblManagerRole ADD CONSTRAINT FKManagerRole_MR78565 FOREIGN KEY (RoleID) REFERENCES tblRole (RoleID);
	