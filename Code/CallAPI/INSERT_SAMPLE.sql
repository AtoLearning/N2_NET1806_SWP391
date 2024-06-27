INSERT INTO Manager(MUserName, Password, GivenName, FamilyName, Picture, isAvailable, isAdmin, DOB, ManagerMUserName) values
('admin', 'admin@123', N'Phạm', N'Thủy', 
'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/test%2Favt1.jpg?alt=media&token=1ecfe044-64c5-402c-aef2-f0e782cf69bd', 
1, 1, '20000520', 'admin'),

('mod1', 'mod1@123', N'Gia', N'Bảo', 
'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/test%2Favt2.jpg?alt=media&token=68697b69-69e9-43dc-93c0-922040e6f391', 
1, 0, '19881004', 'admin'),

('mod2', 'mod2@123', N'Lê', N'Tưởng', 
'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/test%2Favt3.jpeg?alt=media&token=339040e0-df23-4f7f-9ba6-6ebcbf608a3b', 
1, 0, '20030315', 'admin');

insert into Category(CateName, isAvailable, isDelete, MUserName) values 
(N'Công nghệ thông tin', 1, 0, 'admin'),
(N'Mỹ thuật', 1, 0, 'admin'),
(N'Đồ gia dụng', 1, 0, 'admin'),
(N'Sách giáo khoa', 1, 0, 'admin'),
(N'Đồ dùng cá nhân', 1, 0, 'admin');

select * from Category;

