/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `dat_phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ma_nguoi_dat` int DEFAULT NULL,
  `ngay_den` date DEFAULT NULL,
  `ngay_di` date DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  CONSTRAINT `dat_phong_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`id`),
  CONSTRAINT `dat_phong_ibfk_2` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(255) DEFAULT NULL,
  `khach` int DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT NULL,
  `ban_la` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `dieu_hoa` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `bep` tinyint(1) DEFAULT NULL,
  `do_xe` tinyint(1) DEFAULT NULL,
  `ho_boi` tinyint(1) DEFAULT NULL,
  `ban_ui` tinyint(1) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_vi_tri` int DEFAULT NULL,
  `ma_nguoi_dung` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_vi_tri` (`ma_vi_tri`),
  KEY `ma_nguoi_dung` (`ma_nguoi_dung`),
  CONSTRAINT `phong_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `vi_tri` (`id`),
  CONSTRAINT `phong_ibfk_2` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vi_tri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
  `quoc_gia` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(1, 2, 1, '2024-02-07', 'ccccc', 0);
INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(3, 2, 3, '2024-02-07', 'bbbbbbbb', 5);
INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(5, 2, 1, '2024-02-07', 'abcabc', 3);
INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(6, 3, 1, '2024-02-07', 'aaasdadas', 3),
(7, 6, 1, '2024-02-07', 'bbbvcbvvb', 5),
(8, 7, 1, '2024-02-07', 'cccxcxcx', 2),
(9, 7, 2, '2024-02-07', 'ooooooo', 2),
(10, 6, 2, '2024-02-07', 'ytytyty', 5),
(11, 3, 2, '2024-02-07', 'qwqweqwe', 3);

INSERT INTO `dat_phong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`) VALUES
(1, 2, 2, '2024-12-21', '2024-12-29', 5);
INSERT INTO `dat_phong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`) VALUES
(2, 6, 2, '2023-09-29', '2023-10-01', 5);
INSERT INTO `dat_phong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`) VALUES
(3, 3, 2, '2024-11-14', '2024-11-19', 4);
INSERT INTO `dat_phong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`) VALUES
(6, 7, 2, NULL, NULL, 6),
(7, 7, 2, NULL, NULL, 6),
(8, 7, 2, '2024-12-24', '2024-12-27', 6),
(9, 6, 2, '2024-02-28', '2024-03-29', 10),
(10, 2, 2, '2024-02-11', '2024-02-17', 3);

INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `avatar`, `gender`, `role`) VALUES
(1, 'Test', 'test01@gmail.com', '$2b$10$t6j8XiSbbi8o18caUPosR.LaUQPG9OGPGuunQ28.kFJyYaDLWtnvS', '012345678', '20/12/1990', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707300631/node37-final-project-airbnb/nguoi-dung/jtdztd7qmh3sdzgfuvfb.jpg', 'Male', 'USER');
INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `avatar`, `gender`, `role`) VALUES
(2, 'Testee', 'test02@gmail.com', '$2b$10$TwLw1D16cNjCX3o6uqQHC.2FC243MhejacPZu3kFWs7b4CUOu3N0G', '012345678', '01/01/1990', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707387225/node37-final-project-airbnb/nguoi-dung/xu9dqmeerljtzjdkgiqq.jpg', 'Female', 'USER');
INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `avatar`, `gender`, `role`) VALUES
(3, 'Admin', 'admin01@gmail.com', '$2b$10$n.T4Cycpt.4G3orlkI0oCeof/e7Mv79BVpAzyFs7MsJJcjuuGkL32', '0987654321', '01/02/2000', NULL, 'Male', 'ADMIN');
INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `avatar`, `gender`, `role`) VALUES
(4, 'Second Admin', 'admin02@gmail.com', '$2b$10$CfNLpQryMm2N5gvoOMphxOQ1fNZBVCztC/GFllEZiBQsOUYHiIaEi', '0987456123', '01/11/1995', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707300511/node37-final-project-airbnb/nguoi-dung/ikfxom3akea10atepyep.jpg', 'Male', 'ADMIN'),
(8, 'User08', 'test03@gmail.com', '$2b$10$ItP9xvA5QtQ4hjEH3vCfd.2fhhRYN3ea7g.IopX2V9fFUE9QJ/5LS', '0912121212', '15/11/1997', NULL, 'Male', 'USER'),
(9, 'User New', 'test04@gmail.com', '$2b$10$KOqE0EQQmBgnfBXoVGk2E.1fgPgAuE5o3YZphhmDN2KkuJG6/Jud.', '0712121212', '10/02/1997', NULL, 'Female', 'USER'),
(10, 'NewNew', 'test05@gmail.com', '$2b$10$/3DNZyWn4acOHatdVTbOk.XWVEsCnqZRLBghOE4qN4x21ZXAEKkYy', '0555551212', '11/12/1994', NULL, 'Female', 'USER'),
(11, 'NewAdmin', 'admin03@gmail.com', '$2b$10$pM.SnJMbRLBQpUV.dopk/OPlWt7l7MTo2DOyjBwhV28mPzCu2a.ma', '078784545', '23/05/1994', NULL, 'Female', 'ADMIN');

INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`) VALUES
(2, 'STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ', 2, 1, 1, 1, 'Không gian riêng để làm việc\r\nMột khu vực chung có Wi-fi, phù hợp để làm việc.\r\nTự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nKim Nam là Chủ nhà siêu cấp\r\n.', 21, 1, 1, 1, 1, 1, 1, 0, 0, 0, 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707311540/node37-final-project-airbnb/phong/i058ovdjwbngyxp14ie4.jpg', 1, NULL);
INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`) VALUES
(3, 'Phòng sang trọng với ban công tại D.1 - 200m đến Bitexco', 3, 3, 3, 3, 'Emmy là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.\r\nTrải nghiệm nhận phòng tuyệt vời\r\n.', 17, 1, 1, 1, 1, 1, 1, 0, 0, 0, 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707311773/node37-final-project-airbnb/phong/zsk4pjwxh79mrzwtydfg.jpg', 1, NULL);
INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`) VALUES
(6, 'Phòng test số 2', 2, 1, 1, 1, 'mo ta phong 2', 20, 0, 1, 1, 1, 1, 1, 0, 0, 0, NULL, 7, NULL);
INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`) VALUES
(7, 'Phòng test số 3', 5, 3, 5, 2, 'mo ta phong 3', 30, 1, 1, 1, 1, 1, 1, 0, 0, 0, NULL, 7, NULL);

INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(1, 'Quận 1', 'Hồ Chí Minh', 'Việt Nam', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707292280/node37-final-project-airbnb/vi-tri/o5tyhit7uqeuhcreg984.jpg');
INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(5, 'Quận 10', 'Hồ Chí Minh', 'Việt Nam', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707290989/node37-final-project-airbnb/vi-tri/t2hs3abkcf0eumcnuyfl.jpg');
INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(6, 'Quận 9', 'Hồ Chí Minh', 'Việt Nam', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707292239/node37-final-project-airbnb/vi-tri/url3qbogpsg8na3d5fsn.jpg');
INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`) VALUES
(7, 'Quận Hoàn Kiếm', 'Hà Nội', 'Việt Nam', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707312082/node37-final-project-airbnb/vi-tri/bmduacgnmkgr5vub3l7s.jpg');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;