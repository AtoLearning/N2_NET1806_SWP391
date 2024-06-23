CREATE DATABASE FUSwapSystem;
go

USE FUSwapSystem;
go

CREATE TABLE ROLE(
  RoleID      int IDENTITY,
  RoleName    nvarchar(10) NOT NULL,
  PRIMARY KEY (RoleID));
CREATE TABLE Category (
  CateID      int IDENTITY, 
  CateName    nvarchar(30) NOT NULL, 
  IsAvailable bit NOT NULL, 
  MUserName   varchar(30), 
  PRIMARY KEY (CateID));
CREATE TABLE City (
  CityID   int IDENTITY, 
  CityName nvarchar(100) NOT NULL, 
  PRIMARY KEY (CityID));
CREATE TABLE Customer (
  CUserName   varchar(50), 
  GivenName   nvarchar(30) NOT NULL, 
  FamilyName  nvarchar(30) NOT NULL, 
  Nickname    nvarchar(10) NOT NULL,
  Avatar	  varchar(350) NOT NULL,  
  Coins       float NOT NULL, 
  Points      float NOT NULL, 
  Address     nvarchar(200) NOT NULL, 
  DOB         date NOT NULL, 
  IsVerified  bit NOT NULL, 
  IsAvailable bit NOT NULL, 
  MUserName   varchar(30),
  RoleID	  int,
  PRIMARY KEY (CUserName));
CREATE TABLE District (
  DistrictID   int IDENTITY, 
  DistrictName nvarchar(50) NOT NULL, 
  CityID       int, 
  PRIMARY KEY (DistrictID));
CREATE TABLE WardByDistrict (
  DistrictID int, 
  WardID     int, 
  PRIMARY KEY (DistrictID, WardID));
CREATE TABLE Feedback (
  FeedbackID   int IDENTITY, 
  Content      nvarchar(200) NOT NULL, 
  CreateAt	   date NOT NULL, 
  CUserName    varchar(50), 
  PostID       varchar(5), 
  PRIMARY KEY (FeedbackID));
CREATE TABLE Manager (
  MUserName        varchar(30), 
  Password         varchar(20) NOT NULL, 
  Nickname         nvarchar(10) NOT NULL, 
  FullName         nvarchar(100) NOT NULL, 
  Avatar           varchar(350) NULL, 
  IsAvailable      bit NOT NULL,  
  DOB              date NOT NULL, 
  ManagerMUserName varchar(30),
  PRIMARY KEY (MUserName));
CREATE TABLE Post (
  PostID        varchar(5), 
  Tittle        nvarchar(100) NOT NULL, 
  Description   nvarchar(200) NOT NULL, 
  IsAvailable   bit NOT NULL,  
  IsExchange    bit NOT NULL, 
  UnitPrice     float NOT NULL, 
  PostCoin      float NOT NULL, 
  CreateAt      date NOT NULL, 
  MUserName     varchar(30), 
  CUserName     varchar(50), 
  PostAddressID int, 
  CateID        int, 
  PRIMARY KEY (PostID));
CREATE TABLE PostServiceDetails (
  PostID               varchar(5), 
  PostServiceID		   int, 
  PRIMARY KEY (PostID, PostServiceID));
CREATE TABLE PostAddress (
  PostAddressID int IDENTITY, 
  StreetNumber  varchar(50) NOT NULL, 
  Street        nvarchar(150) NOT NULL, 
  WardID        int, 
  DistrictID    int, 
  CityID        int, 
  PRIMARY KEY (PostAddressID));
CREATE TABLE PostService (
  PostServiceID int IDENTITY, 
  Name          nvarchar(50) NOT NULL, 
  Content       nvarchar(150) NOT NULL, 
  UnitCoin      float NOT NULL, 
  Priority      int NOT NULL, 
  CreateAt      date NOT NULL, 
  IsAvailable   bit NOT NULL,  
  MUserName     varchar(30), 
  PRIMARY KEY (PostServiceID));
CREATE TABLE Report (
  ReportID   int IDENTITY,
  Name		 nvarchar(50) NOT NULL,
  Content    nvarchar(200) NOT NULL, 
  Status     nvarchar(30) NOT NULL, 
  Image      varchar(350) NOT NULL, 
  CreateAt     date NOT NULL, 
  MUserName  varchar(30), 
  CUserName  varchar(50), 
  PRIMARY KEY (ReportID));
CREATE TABLE ServiceOrder (
  ServiceOrderID int IDENTITY, 
  TotalCoin      float NOT NULL, 
  CreateAt       date NOT NULL, 
  CUserName      varchar(50), 
  PRIMARY KEY (ServiceOrderID));
CREATE TABLE ServiceOrderDetails (
  ServiceOrderID  int, 
  PostServiceID   int, 
  PRIMARY KEY (ServiceOrderID, PostServiceID));
CREATE TABLE [Transaction] (
  TransID         int IDENTITY, 
  CreateAt        date NOT NULL, 
  Consumer        varchar(50) NOT NULL, 
  Supplier        varchar(50) NOT NULL, 
  PostID          varchar(5), 
  PRIMARY KEY (TransID));
CREATE TABLE Voucher (
  VoucherID   int IDENTITY,
  Name        nvarchar(50) NOT NULL,
  Content	  nvarchar(150) NOT NULL,
  UnitPoint   float NOT NULL, 
  Discount    float NOT NULL,
  Type		  nvarchar(30) NOT NULL,
  CreateAt    date NOT NULL, 
  IsAvailable bit NOT NULL,  
  MUserName   varchar(30), 
  PRIMARY KEY (VoucherID));
CREATE TABLE CustomerVoucher (
  VoucherID  int, 
  CUserName  varchar(50), 
  PRIMARY KEY (VoucherID, CUserName));
CREATE TABLE Ward (
  WardID   int IDENTITY, 
  WardName nvarchar(100), 
  PRIMARY KEY (WardID));
CREATE TABLE ManagerRole (
  MUserName   varchar(30),
  RoleID      int,
  PRIMARY KEY (MUserName, RoleID));
ALTER TABLE Customer ADD CONSTRAINT FKCustomer393390 FOREIGN KEY (MUserName) REFERENCES Manager (MUserName);
ALTER TABLE Post ADD CONSTRAINT FKPost719752 FOREIGN KEY (MUserName) REFERENCES Manager (MUserName);
ALTER TABLE PostService ADD CONSTRAINT FKPostServic54562 FOREIGN KEY (MUserName) REFERENCES Manager (MUserName);
ALTER TABLE Category ADD CONSTRAINT FKCategory58042 FOREIGN KEY (MUserName) REFERENCES Manager (MUserName);
ALTER TABLE Report ADD CONSTRAINT FKReport101973 FOREIGN KEY (MUserName) REFERENCES Manager (MUserName);
ALTER TABLE Post ADD CONSTRAINT FKPost463187 FOREIGN KEY (CUserName) REFERENCES Customer (CUserName);
ALTER TABLE Report ADD CONSTRAINT FKReport358538 FOREIGN KEY (CUserName) REFERENCES Customer (CUserName);
ALTER TABLE Feedback ADD CONSTRAINT FKFeedback814255 FOREIGN KEY (CUserName) REFERENCES Customer (CUserName);
ALTER TABLE Feedback ADD CONSTRAINT FKFeedback434768 FOREIGN KEY (PostID) REFERENCES Post (PostID);
ALTER TABLE Post ADD CONSTRAINT FKPost138133 FOREIGN KEY (PostAddressID) REFERENCES PostAddress (PostAddressID);
ALTER TABLE PostAddress ADD CONSTRAINT FKPostAddres809418 FOREIGN KEY (CityID) REFERENCES City (CityID);
ALTER TABLE PostAddress ADD CONSTRAINT FKPostAddres43697 FOREIGN KEY (DistrictID) REFERENCES District (DistrictID);
ALTER TABLE PostAddress ADD CONSTRAINT FKPostAddres628776 FOREIGN KEY (WardID) REFERENCES Ward (WardID);
ALTER TABLE Post ADD CONSTRAINT FKPost738984 FOREIGN KEY (CateID) REFERENCES Category (CateID);
ALTER TABLE ServiceOrder ADD CONSTRAINT FKServiceOrd410399 FOREIGN KEY (CUserName) REFERENCES Customer (CUserName);
ALTER TABLE [Transaction] ADD CONSTRAINT FKTransactio71904 FOREIGN KEY (Consumer) REFERENCES Customer (CUserName);
ALTER TABLE [Transaction] ADD CONSTRAINT FKTransactio355745 FOREIGN KEY (Supplier) REFERENCES Customer (CUserName);
ALTER TABLE Manager ADD CONSTRAINT FKManager173667 FOREIGN KEY (ManagerMUserName) REFERENCES Manager (MUserName);
ALTER TABLE PostServiceDetails ADD CONSTRAINT FKPost_PostS939301 FOREIGN KEY (PostID) REFERENCES Post (PostID);
ALTER TABLE PostServiceDetails ADD CONSTRAINT FKPost_PostS956358 FOREIGN KEY (PostServiceID) REFERENCES PostService (PostServiceID);
ALTER TABLE ServiceOrderDetails ADD CONSTRAINT FKServiceOrd488214 FOREIGN KEY (ServiceOrderID) REFERENCES ServiceOrder (ServiceOrderID);
ALTER TABLE ServiceOrderDetails ADD CONSTRAINT FKServiceOrd184579 FOREIGN KEY (PostServiceID) REFERENCES PostService (PostServiceID);
ALTER TABLE CustomerVoucher ADD CONSTRAINT FKVoucher_Cu393522 FOREIGN KEY (VoucherID) REFERENCES Voucher (VoucherID);
ALTER TABLE CustomerVoucher ADD CONSTRAINT FKVoucher_Cu789935 FOREIGN KEY (CUserName) REFERENCES Customer (CUserName);
ALTER TABLE Voucher ADD CONSTRAINT FKVoucher634371 FOREIGN KEY (MUserName) REFERENCES Manager (MUserName);
ALTER TABLE [Transaction] ADD CONSTRAINT FKTransactio184168 FOREIGN KEY (PostID) REFERENCES Post (PostID);
ALTER TABLE District ADD CONSTRAINT FKDistrict133351 FOREIGN KEY (CityID) REFERENCES City (CityID);
ALTER TABLE WardByDistrict ADD CONSTRAINT FKDistrict_W223992 FOREIGN KEY (DistrictID) REFERENCES District (DistrictID);
ALTER TABLE WardByDistrict ADD CONSTRAINT FKDistrict_W924874 FOREIGN KEY (WardID) REFERENCES Ward (WardID);
ALTER TABLE Customer ADD CONSTRAINT FKCustomer_C589635 FOREIGN KEY (RoleID) REFERENCES Role (RoleID);
ALTER TABLE ManagerRole ADD CONSTRAINT FKManagerRole_MR85693 FOREIGN KEY (MUserName) REFERENCES Manager (MUserName);
ALTER TABLE ManagerRole ADD CONSTRAINT FKManagerRole_MR78565 FOREIGN KEY (RoleID) REFERENCES Role (RoleID);
