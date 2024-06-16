INSERT INTO City(CityName) values
('Thành phố Hà Nội');

INSERT INTO District(CityID, DistrictName) values
(1, 'Quận Ba Đình'),
(1, 'Quận Hoàn Kiếm');

INSERT INTO Ward(WardName) values
('Phường Phúc Xá'),
('Phường Phúc Tân');

INSERT INTO District_Ward(DistrictID, WardID) values 
(1, 1),
(1, 2);

INSERT INTO Manager(MUserName, Password, GivenName, FamilyName, Picture, isAdmin, isAvailable, ManagerMUserName) values
('admin', 'admin@123', 'Pham', 'Thuy', '', 1, 1, 'admin'),
('mod1', 'mod1@123', 'Gia', 'Bao', '', 0, 1, 'admin'),
('mod2', 'mod2@123', 'Le', 'Tuong', '', 0, 1, 'admin');

INSERT INTO Category(CateName, isAvailable, isDelete, MUserName) values
(N'Công nghệ thông tin', 1, 0, 'admin'),
(N'Kinh doanh', 1, 0, 'admin'),
(N'Mỹ thuật', 1, 0, 'admin');