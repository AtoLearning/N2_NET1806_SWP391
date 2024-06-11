CREATE DATABASE FUSwapSystem;
go

USE FUSwapSystem;
go

CREATE TABLE Category (
  CateID      int IDENTITY NOT NULL, 
  CateName    nvarchar(20) NOT NULL, 
  isAvailable bit NOT NULL, 
  isDelete    bit NOT NULL, 
  MUserName   varchar(30) NOT NULL, 
  PRIMARY KEY (CateID));
CREATE TABLE City (
  CityID   int IDENTITY NOT NULL, 
  CityName nvarchar(50) NOT NULL, 
  PRIMARY KEY (CityID));
CREATE TABLE Customer (
  CUserName   varchar(30) NOT NULL, 
  GivenName   nvarchar(30) NOT NULL, 
  FamilyName  nvarchar(30) NOT NULL, 
  Picture     varchar(200) NULL, 
  isAvailable bit NOT NULL, 
  Wallet      int NOT NULL, 
  Points      int NOT NULL, 
  isVerified  bit NOT NULL, 
  Address     nvarchar(100) NULL, 
  DOB         date NULL, 
  MUserName   varchar(30) NOT NULL, 
  PRIMARY KEY (CUserName));
CREATE TABLE District (
  DistrictID   int IDENTITY NOT NULL, 
  DistrictName nvarchar(50) NOT NULL, 
  CityID       int NOT NULL, 
  PRIMARY KEY (DistrictID));
CREATE TABLE District_Ward (
  DistrictID int NOT NULL, 
  WardID     int NOT NULL, 
  PRIMARY KEY (DistrictID, 
  WardID));
CREATE TABLE Feedback (
  FeedbackID   int IDENTITY NOT NULL, 
  FeedbackText nvarchar(200) NOT NULL, 
  [Date]       date NOT NULL, 
  CUserName    varchar(30) NOT NULL, 
  PostID       int NOT NULL, 
  PRIMARY KEY (FeedbackID));
CREATE TABLE Manager (
  MUserName        varchar(30) NOT NULL, 
  Password         varchar(20) NOT NULL, 
  GivenName        nvarchar(30) NOT NULL, 
  FamilyName       nvarchar(30) NOT NULL, 
  Picture          varchar(200) NULL, 
  isAvailable      bit NOT NULL, 
  isAdmin          bit NOT NULL, 
  DOB              date NULL, 
  ManagerMUserName varchar(30) NOT NULL, 
  PRIMARY KEY (MUserName));
CREATE TABLE Post (
  PostID        int IDENTITY NOT NULL, 
  Tittle        nvarchar(100) NOT NULL, 
  Description   nvarchar(200) NOT NULL, 
  isAvailable   bit NOT NULL, 
  isDelete      bit NOT NULL, 
  isExchange    bit NOT NULL, 
  UnitPrice     float(10) NOT NULL, 
  FeeOfPost     float(10) NOT NULL, 
  [Date]        date NOT NULL, 
  MUserName     varchar(30) NOT NULL, 
  CUserName     varchar(30) NOT NULL, 
  PostAddressID int NOT NULL, 
  CateID        int NOT NULL, 
  PRIMARY KEY (PostID));
CREATE TABLE Post_PostService (
  PostPostID               int NOT NULL, 
  PostServicePostServiceID int NOT NULL, 
  PRIMARY KEY (PostPostID, 
  PostServicePostServiceID));
CREATE TABLE PostAddress (
  PostAddressID int IDENTITY NOT NULL, 
  StreetNumber  varchar(255) NOT NULL, 
  Street        nvarchar(120) NOT NULL, 
  WardID        int NOT NULL, 
  DistrictID    int NOT NULL, 
  CityID        int NOT NULL, 
  PRIMARY KEY (PostAddressID));
CREATE TABLE PostService (
  PostServiceID int IDENTITY NOT NULL, 
  Name          nvarchar(25) NOT NULL, 
  Description   nvarchar(100) NOT NULL, 
  UnitPrice     float(10) NOT NULL, 
  Priority      int NOT NULL, 
  [Date]        date NOT NULL, 
  isAvailable   bit NOT NULL, 
  isDelete      bit NOT NULL, 
  MUserName     varchar(30) NOT NULL, 
  PRIMARY KEY (PostServiceID));
CREATE TABLE Report (
  ReportID   int IDENTITY NOT NULL, 
  ReportText nvarchar(200) NOT NULL, 
  Status     nvarchar(15) NOT NULL, 
  Image      varchar(100) NOT NULL, 
  [Date]     date NOT NULL, 
  MUserName  varchar(30) NOT NULL, 
  CUserName  varchar(30) NOT NULL, 
  PRIMARY KEY (ReportID));
CREATE TABLE ServiceOrder (
  ServiceOrderID int IDENTITY NOT NULL, 
  TotalPrice     float(10) NOT NULL, 
  [Date]         int NOT NULL, 
  CUserName      varchar(30) NOT NULL, 
  PRIMARY KEY (ServiceOrderID));
CREATE TABLE ServiceOrder_PostService (
  ServiceOrderServiceOrderID int NOT NULL, 
  PostServicePostServiceID   int NOT NULL, 
  PRIMARY KEY (ServiceOrderServiceOrderID, 
  PostServicePostServiceID));
CREATE TABLE [Transaction] (
  TransID         int IDENTITY NOT NULL, 
  [Date]          date NOT NULL, 
  FirstCUserName  varchar(30) NOT NULL, 
  SecondCUserName varchar(30) NOT NULL, 
  PostPostID      int NOT NULL, 
  PRIMARY KEY (TransID));
CREATE TABLE Voucher (
  VoucherID   int IDENTITY NOT NULL, 
  UnitPoint   int NOT NULL, 
  Discount    float(10) NOT NULL, 
  [Date]      date NOT NULL, 
  isAvailable bit NOT NULL, 
  isDelete    bit NOT NULL, 
  MUserName   varchar(30) NOT NULL, 
  PRIMARY KEY (VoucherID));
CREATE TABLE Voucher_Customer (
  VoucherVoucherID  int NOT NULL, 
  CustomerCUserName varchar(30) NOT NULL, 
  PRIMARY KEY (VoucherVoucherID, 
  CustomerCUserName));
CREATE TABLE Ward (
  WardID   int IDENTITY NOT NULL, 
  WardName nvarchar(50) NOT NULL, 
  PRIMARY KEY (WardID));
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
ALTER TABLE [Transaction] ADD CONSTRAINT FKTransactio71904 FOREIGN KEY (FirstCUserName) REFERENCES Customer (CUserName);
ALTER TABLE [Transaction] ADD CONSTRAINT FKTransactio355745 FOREIGN KEY (SecondCUserName) REFERENCES Customer (CUserName);
ALTER TABLE Manager ADD CONSTRAINT FKManager173667 FOREIGN KEY (ManagerMUserName) REFERENCES Manager (MUserName);
ALTER TABLE Post_PostService ADD CONSTRAINT FKPost_PostS939301 FOREIGN KEY (PostPostID) REFERENCES Post (PostID);
ALTER TABLE Post_PostService ADD CONSTRAINT FKPost_PostS956358 FOREIGN KEY (PostServicePostServiceID) REFERENCES PostService (PostServiceID);
ALTER TABLE ServiceOrder_PostService ADD CONSTRAINT FKServiceOrd488214 FOREIGN KEY (ServiceOrderServiceOrderID) REFERENCES ServiceOrder (ServiceOrderID);
ALTER TABLE ServiceOrder_PostService ADD CONSTRAINT FKServiceOrd184579 FOREIGN KEY (PostServicePostServiceID) REFERENCES PostService (PostServiceID);
ALTER TABLE Voucher_Customer ADD CONSTRAINT FKVoucher_Cu393522 FOREIGN KEY (VoucherVoucherID) REFERENCES Voucher (VoucherID);
ALTER TABLE Voucher_Customer ADD CONSTRAINT FKVoucher_Cu789935 FOREIGN KEY (CustomerCUserName) REFERENCES Customer (CUserName);
ALTER TABLE Voucher ADD CONSTRAINT FKVoucher634371 FOREIGN KEY (MUserName) REFERENCES Manager (MUserName);
ALTER TABLE [Transaction] ADD CONSTRAINT FKTransactio184168 FOREIGN KEY (PostPostID) REFERENCES Post (PostID);
ALTER TABLE District ADD CONSTRAINT FKDistrict133351 FOREIGN KEY (CityID) REFERENCES City (CityID);
ALTER TABLE District_Ward ADD CONSTRAINT FKDistrict_W223992 FOREIGN KEY (DistrictID) REFERENCES District (DistrictID);
ALTER TABLE District_Ward ADD CONSTRAINT FKDistrict_W924874 FOREIGN KEY (WardID) REFERENCES Ward (WardID);
