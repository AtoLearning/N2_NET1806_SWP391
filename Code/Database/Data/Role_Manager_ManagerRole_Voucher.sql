INSERT INTO Role(RoleName) VALUES 
('ADMIN'),
('MODERATOR'),
('CUSTOMER');

INSERT INTO Manager(MUserName, Password, Nickname, FullName, Avatar, IsAvailable, DOB, ManagerMUserName) VALUES
('admin', 'admin@123', N'Ato', N'Nguyễn Trần Gia Bảo', 
'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/test%2Favt1.jpg?alt=media&token=1ecfe044-64c5-402c-aef2-f0e782cf69bd', 
1, '20000520', 'admin'),

('mod1', 'mod1@123', N'Minh Thuận', N'Lê Ngọc Minh Thuận', 
'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/test%2Favt2.jpg?alt=media&token=68697b69-69e9-43dc-93c0-922040e6f391', 
1, '19881004', 'admin'),

('mod2', 'mod2@123', N'Alex', N'Phạm Thị Thùy Trinh', 
'https://firebasestorage.googleapis.com/v0/b/swp391-gea.appspot.com/o/test%2Favt3.jpeg?alt=media&token=339040e0-df23-4f7f-9ba6-6ebcbf608a3b', 
1, '20030315', 'admin');

INSERT INTO ManagerRole(MUserName, RoleID) VALUES
('admin', 1),
('admin', 2),
('admin', 3),
('mod1', 2),
('mod1', 3),
('mod2', 2),
('mod2', 3);

INSERT INTO Voucher(Name, Content, UnitPoint, Discount, Type, CreateAt, IsAvailable, MUserName) 
VALUES(N'Mừng bạn mới!', N'Mừng bạn mới!', 1, 50, N'Phần trăm', '20240621', 1, 'admin');
INSERT INTO Voucher(Name, Content, UnitPoint, Discount, Type, CreateAt, IsAvailable, MUserName) 
VALUES(N'Bạn đồng hành!', N'Bạn đồng hành!', 10, 80, N'Phần trăm', '20240621', 1, 'admin');
INSERT INTO Voucher(Name, Content, UnitPoint, Discount, Type, CreateAt, IsAvailable, MUserName) 
VALUES(N'Mãi keo cùng FUSwap!', N'Mãi keo cùng FUSwap!', 5, 3, N'Trừ thẳng', '20240621', 1, 'admin');
INSERT INTO Voucher(Name, Content, UnitPoint, Discount, Type, CreateAt, IsAvailable, MUserName) 
VALUES(N'Sinh nhật đáng iu cùng FUSwap!', N'Sinh nhật đáng iu cùng FUSwap!', 5, 5, N'Trừ thẳng', '20240621', 1, 'admin');
INSERT INTO Voucher(Name, Content, UnitPoint, Discount, Type, CreateAt, IsAvailable, MUserName) 
VALUES(N'Sale cuối năm cùng FUSwap!', N'Sale cuối năm cùng FUSwap!', 7, 60, N'Phần trăm', '20240621', 0, 'admin');