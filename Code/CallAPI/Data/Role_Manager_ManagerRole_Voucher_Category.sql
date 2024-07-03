INSERT INTO tblRole(RoleName) VALUES 
('ADMIN'),
('MODERATOR'),
('CUSTOMER');

INSERT INTO tblManager(MUserName, strPassword, Nickname, FullName, Avatar, Phone, IsAvailable, DOB, ManagerMUserName) VALUES
('admin', 'admin@123', N'Ato', N'Nguyễn Trần Gia Bảo', 
'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/test%2Favt1.jpg?alt=media&token=1ecfe044-64c5-402c-aef2-f0e782cf69bd', 
'', 1, '20000520', 'admin'),

('mod1', 'mod1@123', N'Minh Thuận', N'Lê Ngọc Minh Thuận', 
'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/test%2Favt2.jpg?alt=media&token=68697b69-69e9-43dc-93c0-922040e6f391', 
'', 1, '19881004', 'admin'),

('mod2', 'mod2@123', N'Alex', N'Phạm Thị Thùy Trinh', 
'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/test%2Favt3.jpeg?alt=media&token=339040e0-df23-4f7f-9ba6-6ebcbf608a3b', 
'', 1, '20030315', 'admin');

INSERT INTO tblManagerRole(MUserName, RoleID) VALUES
('admin', 1),
('admin', 2),
('admin', 3),
('mod1', 2),
('mod1', 3),
('mod2', 2),
('mod2', 3);

INSERT INTO tblCategory (CateName, IsAvailable, MUserName) VALUES
(N'Men Clothes', 1, 'admin'),
(N'Women Clothes', 1, 'admin'),
(N'Computer & Accessories', 1, 'admin'),
(N'Consumer Electronics', 1, 'admin'),
(N'Home Appliances', 1, 'admin'),
(N'Book & Stationery', 1, 'admin'),
(N'Food', 1, 'admin'),
(N'Beauty', 1, 'admin'),
(N'Fashion Accessories', 1, 'admin'),
(N'Automotive', 1, 'admin'),
(N'Sport & Outdoor', 1, 'admin');