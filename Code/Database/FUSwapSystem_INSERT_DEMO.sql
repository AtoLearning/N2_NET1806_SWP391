INSERT INTO City(CityName) values
(N'Thành phố Hà Nội');

INSERT INTO District(CityID, DistrictName) values
(1, N'Quận Ba Đình'),
(1, N'Quận Hoàn Kiếm');

INSERT INTO Ward(WardName) values
(N'Phường Phúc Xá'),
(N'Phường Phúc Tân');

INSERT INTO District_Ward(DistrictID, WardID) values 
(1, 1),
(1, 2);

INSERT INTO Manager(MUserName, Password, GivenName, FamilyName, Picture, isAdmin, isAvailable, ManagerMUserName) values
('admin', 'admin@123', N'Phạm', N'Thủy', '', 1, 1, 'admin'),
('mod1', 'mod1@123', N'Gia', N'Bảo', '', 0, 1, 'admin'),
('mod2', 'mod2@123', N'Lê', N'Tưởng', '', 0, 1, 'admin');

INSERT INTO Category(CateName, isAvailable, isDelete, MUserName) values
(N'Công nghệ thông tin', 1, 0, 'admin'),
(N'Kinh doanh', 1, 0, 'admin'),
(N'Mỹ thuật', 1, 0, 'admin');