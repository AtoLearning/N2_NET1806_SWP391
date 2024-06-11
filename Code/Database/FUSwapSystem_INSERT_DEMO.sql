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