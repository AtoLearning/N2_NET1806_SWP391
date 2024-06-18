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