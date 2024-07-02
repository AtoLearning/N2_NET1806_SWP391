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
  PostID       bigint, 
  PRIMARY KEY (FeedbackID));
CREATE TABLE tblManager (
  MUserName        varchar(30), 
  strPassword      varchar(20) NOT NULL, 
  Nickname         nvarchar(10) NOT NULL, 
  FullName         nvarchar(100) NOT NULL, 
  Avatar           varchar(350) NULL, 
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
  PostAddressID bigint, 
  CateID        int, 
  PRIMARY KEY (PostID));
CREATE TABLE tblPostServiceDetails (
  PostID               bigint, 
  PostServiceID		   int, 
  PRIMARY KEY (PostID, PostServiceID));
CREATE TABLE tblPostAddress (
  PostAddressID bigint IDENTITY, 
  StreetNumber  varchar(50) NOT NULL, 
  Street        nvarchar(150) NOT NULL, 
  WardID        int, 
  DistrictID    int, 
  CityID        int, 
  PRIMARY KEY (PostAddressID));
CREATE TABLE tblPostService (
  PostServiceID		int IDENTITY, 
  PostServiceName   nvarchar(50) NOT NULL, 
  Content			nvarchar(150) NOT NULL, 
  UnitCoin			float NOT NULL, 
  intPriority		int NOT NULL, 
  CreateAt			date NOT NULL, 
  IsAvailable		bit NOT NULL,  
  MUserName			varchar(30), 
  PRIMARY KEY (PostServiceID));
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
CREATE TABLE tblServiceOrder (
  ServiceOrderID bigint IDENTITY, 
  TotalCoin      float NOT NULL, 
  CreateAt       date NOT NULL, 
  CUserName      varchar(50), 
  PRIMARY KEY (ServiceOrderID));
CREATE TABLE tblServiceOrderDetails (
  ServiceOrderID  bigint, 
  PostServiceID   int, 
  PRIMARY KEY (ServiceOrderID, PostServiceID));
CREATE TABLE tblTransaction (
  TransID         bigint IDENTITY, 
  CreateAt        date NOT NULL, 
  Consumer        varchar(50) NOT NULL, 
  Supplier        varchar(50) NOT NULL, 
  PostID          bigint, 
  PRIMARY KEY (TransID));
CREATE TABLE tblVoucher (
  VoucherID   int IDENTITY,
  VoucherName nvarchar(50) NOT NULL,
  Content	  nvarchar(150) NOT NULL,
  UnitPoint   float NOT NULL, 
  Discount    float NOT NULL,
  VoucherType nvarchar(30) NOT NULL,
  CreateAt    date NOT NULL, 
  IsAvailable bit NOT NULL,  
  MUserName   varchar(30), 
  PRIMARY KEY (VoucherID));
CREATE TABLE tblCustomerVoucher (
  VoucherID  int, 
  CUserName  varchar(50), 
  PRIMARY KEY (VoucherID, CUserName));
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
ALTER TABLE tblPostService ADD CONSTRAINT FKPostServic54562 FOREIGN KEY (MUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblCategory ADD CONSTRAINT FKCategory58042 FOREIGN KEY (MUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblReport ADD CONSTRAINT FKReport101973 FOREIGN KEY (MUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblPost ADD CONSTRAINT FKPost463187 FOREIGN KEY (CUserName) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblReport ADD CONSTRAINT FKReport358538 FOREIGN KEY (CUserName) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblFeedback ADD CONSTRAINT FKFeedback814255 FOREIGN KEY (CUserName) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblFeedback ADD CONSTRAINT FKFeedback434768 FOREIGN KEY (PostID) REFERENCES tblPost (PostID);
ALTER TABLE tblPost ADD CONSTRAINT FKPost138133 FOREIGN KEY (PostAddressID) REFERENCES tblPostAddress (PostAddressID);
ALTER TABLE tblPostAddress ADD CONSTRAINT FKPostAddres809418 FOREIGN KEY (CityID) REFERENCES tblCity (CityID);
ALTER TABLE tblPostAddress ADD CONSTRAINT FKPostAddres43697 FOREIGN KEY (DistrictID) REFERENCES tblDistrict (DistrictID);
ALTER TABLE tblPostAddress ADD CONSTRAINT FKPostAddres628776 FOREIGN KEY (WardID) REFERENCES tblWard (WardID);
ALTER TABLE tblPost ADD CONSTRAINT FKPost738984 FOREIGN KEY (CateID) REFERENCES tblCategory (CateID);
ALTER TABLE tblServiceOrder ADD CONSTRAINT FKServiceOrd410399 FOREIGN KEY (CUserName) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblTransaction ADD CONSTRAINT FKTransactio71904 FOREIGN KEY (Consumer) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblTransaction ADD CONSTRAINT FKTransactio355745 FOREIGN KEY (Supplier) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblManager ADD CONSTRAINT FKManager173667 FOREIGN KEY (ManagerMUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblPostServiceDetails ADD CONSTRAINT FKPost_PostS939301 FOREIGN KEY (PostID) REFERENCES tblPost (PostID);
ALTER TABLE tblPostServiceDetails ADD CONSTRAINT FKPost_PostS956358 FOREIGN KEY (PostServiceID) REFERENCES tblPostService (PostServiceID);
ALTER TABLE tblServiceOrderDetails ADD CONSTRAINT FKServiceOrd488214 FOREIGN KEY (ServiceOrderID) REFERENCES tblServiceOrder (ServiceOrderID);
ALTER TABLE tblServiceOrderDetails ADD CONSTRAINT FKServiceOrd184579 FOREIGN KEY (PostServiceID) REFERENCES tblPostService (PostServiceID);
ALTER TABLE tblCustomerVoucher ADD CONSTRAINT FKVoucher_Cu393522 FOREIGN KEY (VoucherID) REFERENCES tblVoucher (VoucherID);
ALTER TABLE tblCustomerVoucher ADD CONSTRAINT FKVoucher_Cu789935 FOREIGN KEY (CUserName) REFERENCES tblCustomer (CUserName);
ALTER TABLE tblVoucher ADD CONSTRAINT FKVoucher634371 FOREIGN KEY (MUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblTransaction ADD CONSTRAINT FKTransactio184168 FOREIGN KEY (PostID) REFERENCES tblPost (PostID);
ALTER TABLE tblDistrict ADD CONSTRAINT FKDistrict133351 FOREIGN KEY (CityID) REFERENCES tblCity (CityID);
ALTER TABLE tblWardByDistrict ADD CONSTRAINT FKDistrict_W223992 FOREIGN KEY (DistrictID) REFERENCES tblDistrict (DistrictID);
ALTER TABLE tblWardByDistrict ADD CONSTRAINT FKDistrict_W924874 FOREIGN KEY (WardID) REFERENCES tblWard (WardID);
ALTER TABLE tblCustomer ADD CONSTRAINT FKCustomer_C589635 FOREIGN KEY (RoleID) REFERENCES tblRole (RoleID);
ALTER TABLE tblManagerRole ADD CONSTRAINT FKManagerRole_MR85693 FOREIGN KEY (MUserName) REFERENCES tblManager (MUserName);
ALTER TABLE tblManagerRole ADD CONSTRAINT FKManagerRole_MR78565 FOREIGN KEY (RoleID) REFERENCES tblRole (RoleID);
	