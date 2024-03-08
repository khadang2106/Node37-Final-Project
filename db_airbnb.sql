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
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `dat_phong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ma_nguoi_dat` int DEFAULT NULL,
  `ngay_den` date DEFAULT NULL,
  `ngay_di` date DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  CONSTRAINT `dat_phong_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`id`),
  CONSTRAINT `dat_phong_ibfk_2` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_vi_tri` (`ma_vi_tri`),
  KEY `ma_nguoi_dung` (`ma_nguoi_dung`),
  CONSTRAINT `phong_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `vi_tri` (`id`),
  CONSTRAINT `phong_ibfk_2` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vi_tri` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
  `quoc_gia` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `deleted_at`) VALUES
(1, 2, 1, '2024-02-07', 'ccccc', 0, NULL);
INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `deleted_at`) VALUES
(3, 2, 3, '2024-03-06', '2', 5, NULL);
INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `deleted_at`) VALUES
(5, 2, 1, '2024-02-07', 'abcabc', 3, NULL);
INSERT INTO `binh_luan` (`id`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`, `deleted_at`) VALUES
(6, 3, 1, '2024-02-07', 'aaasdadas', 3, NULL),
(7, 6, 1, '2024-02-07', 'bbbvcbvvb', 5, NULL),
(8, 7, 1, '2024-02-07', 'cccxcxcx', 2, '2024-03-07 13:14:41'),
(12, 6, 9, '2024-02-08', 'Testtttting commentttt', 5, NULL),
(13, 7, 9, '2024-02-08', 'aaaaaaa', 4, NULL),
(14, 7, 8, '2024-02-08', 'bbbbb', 4, '2024-03-07 13:33:13'),
(15, 2, 8, '2024-02-08', 'ccccc', 4, '2024-03-07 13:33:13'),
(21, 7, 1, '2024-02-11', 'aaaaa', 4, NULL);

INSERT INTO `dat_phong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`, `deleted_at`) VALUES
(11, 6, 4, '2024-02-28', '2024-03-29', 10, NULL);
INSERT INTO `dat_phong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`, `deleted_at`) VALUES
(12, 2, 4, '2024-05-14', '2024-05-19', 4, NULL);
INSERT INTO `dat_phong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`, `deleted_at`) VALUES
(19, 3, 8, '2024-04-07', '2024-04-11', 1, '2024-03-07 13:33:13');
INSERT INTO `dat_phong` (`id`, `ma_phong`, `ma_nguoi_dat`, `ngay_den`, `ngay_di`, `so_luong_khach`, `deleted_at`) VALUES
(20, 7, 9, '2024-04-07', '2024-04-11', 4, NULL),
(21, 2, 9, '2023-12-31', '2024-01-09', 7, NULL),
(23, 6, 3, '2024-10-21', '2024-10-29', 2, '2024-03-07 13:40:02');

INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `avatar`, `gender`, `role`, `deleted_at`) VALUES
(1, 'Test', 'test01@gmail.com', '$2b$10$t6j8XiSbbi8o18caUPosR.LaUQPG9OGPGuunQ28.kFJyYaDLWtnvS', '012345678', '20/12/1990', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707300631/node37-final-project-airbnb/nguoi-dung/jtdztd7qmh3sdzgfuvfb.jpg', 'Male', 'USER', NULL);
INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `avatar`, `gender`, `role`, `deleted_at`) VALUES
(3, 'Admin', 'admin01@gmail.com', '$2b$10$n.T4Cycpt.4G3orlkI0oCeof/e7Mv79BVpAzyFs7MsJJcjuuGkL32', '0987654321', '01/02/2000', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707398969/node37-final-project-airbnb/nguoi-dung/xhxrbnqq970znje8tmxh.jpg', 'Male', 'ADMIN', NULL);
INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `avatar`, `gender`, `role`, `deleted_at`) VALUES
(4, 'Second Admin', 'admin02@gmail.com', '$2b$10$CfNLpQryMm2N5gvoOMphxOQ1fNZBVCztC/GFllEZiBQsOUYHiIaEi', '0987456123', '01/11/1995', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707300511/node37-final-project-airbnb/nguoi-dung/ikfxom3akea10atepyep.jpg', 'Male', 'ADMIN', NULL);
INSERT INTO `nguoi_dung` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `avatar`, `gender`, `role`, `deleted_at`) VALUES
(8, 'User08', 'test03@gmail.com', '$2b$10$ItP9xvA5QtQ4hjEH3vCfd.2fhhRYN3ea7g.IopX2V9fFUE9QJ/5LS', '0912121212', '15/11/1997', NULL, 'Male', 'USER', '2024-03-07 13:33:13'),
(9, 'User New', 'test04@gmail.com', '$2b$10$KOqE0EQQmBgnfBXoVGk2E.1fgPgAuE5o3YZphhmDN2KkuJG6/Jud.', '0712121212', '10/02/1997', NULL, 'Female', 'USER', NULL),
(10, 'NewNew', 'test05@gmail.com', '$2b$10$/3DNZyWn4acOHatdVTbOk.XWVEsCnqZRLBghOE4qN4x21ZXAEKkYy', '0555551212', '11/12/1994', NULL, 'Female', 'USER', NULL),
(12, 'Testing', 'test07@gmail.com', '$2b$10$oNBDazEqMy5jEftXMyPlIuc6KjorcmKn7C2Gl/Dq3SOeltebdnpgW', '0123456111', '01/01/1997', NULL, 'Male', 'USER', NULL),
(13, 'TestingAdmin', 'admin04@gmail.com', '$2b$10$uaVoRnPQ0cfqo6NoAObajupgGIiCUdL4I.yqO9NxoQpEmutst0i9i', '0555555', '23/05/1994', NULL, 'Female', 'ADMIN', NULL),
(14, 'test', 'string', '$2b$10$ZJy2wm1mHUvzgsSk8rsOPOT.BIUAHk2Xy71Yoj.EEkMLWg3d8u8ue', '0123123123', 'string', NULL, 'string', 'string', '2024-03-07 12:54:48'),
(15, 'test', 'string01', '$2b$10$HLIgeHLetlmOi6COteCfwO3v2MDQ12wSGa/sj6mJSbUKWfX6eMeN2', 'string', 'string', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1709816725/node37-final-project-airbnb/nguoi-dung/zl8erl3tjvgear2fsv7y.jpg', 'string', 'string', NULL);

INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`, `deleted_at`) VALUES
(2, 'STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ', 2, 1, 1, 1, 'Không gian riêng để làm việc\r\nMột khu vực chung có Wi-fi, phù hợp để làm việc.\r\nTự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nKim Nam là Chủ nhà siêu cấp\r\n.', 200, 1, 1, 1, 1, 1, 1, 0, 0, 0, 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707311540/node37-final-project-airbnb/phong/i058ovdjwbngyxp14ie4.jpg', 1, NULL, NULL);
INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`, `deleted_at`) VALUES
(3, 'Phòng sang trọng với ban công tại D.1 - 200m đến Bitexco', 3, 3, 3, 3, 'Emmy là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.\r\nTrải nghiệm nhận phòng tuyệt vời\r\n.', 17, 1, 1, 1, 1, 1, 1, 0, 0, 0, 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707311773/node37-final-project-airbnb/phong/zsk4pjwxh79mrzwtydfg.jpg', 1, NULL, NULL);
INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`, `deleted_at`) VALUES
(6, 'Phòng test số 2', 2, 1, 1, 1, 'mo ta phong 2', 20, 0, 1, 1, 1, 1, 1, 0, 0, 0, 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707399334/node37-final-project-airbnb/phong/nyheg9zhla6ryrphdwqt.jpg', 7, NULL, NULL);
INSERT INTO `phong` (`id`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `wifi`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `ma_nguoi_dung`, `deleted_at`) VALUES
(7, 'Phòng test số 3', 5, 3, 5, 2, 'mo ta phong 3', 30, 1, 1, 1, 1, 1, 1, 0, 0, 0, NULL, 7, NULL, NULL),
(9, 'string', 0, 0, 0, 0, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, NULL, 5, NULL, NULL),
(10, 'string', 0, 0, 0, 0, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, NULL, 5, NULL, '2024-03-08 12:27:59'),
(11, 'test', 0, 0, 0, 0, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'http://res.cloudinary.com/dicixuz5j/image/upload/v1709901065/node37-final-project-airbnb/phong/idodsz2ajygaufwy4iir.jpg', 1, NULL, '2024-03-08 12:31:28');

INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `deleted_at`) VALUES
(1, 'Quận 1', 'Hồ Chí Minh', 'Việt Nam', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707292280/node37-final-project-airbnb/vi-tri/o5tyhit7uqeuhcreg984.jpg', NULL);
INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `deleted_at`) VALUES
(5, 'Quận 5', 'Hồ Chí Minh', 'Việt Nam', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707590777/node37-final-project-airbnb/vi-tri/bmvcct1euu63uuqqaziz.jpg', NULL);
INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `deleted_at`) VALUES
(7, 'Quận Hoàn Kiếm', 'Hà Nội', 'Việt Nam', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1709610727/node37-final-project-airbnb/vi-tri/scdk7foch0iexfw9abld.jpg', NULL);
INSERT INTO `vi_tri` (`id`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `deleted_at`) VALUES
(8, 'Vùng Tàu', 'Bà Rịa', 'Việt Nam', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1707399611/node37-final-project-airbnb/vi-tri/wi33rczffxwfn6tthiv4.jpg', NULL),
(9, 'Test Delete', 'Test', 'VN', NULL, '2024-02-10 18:32:08'),
(10, 'test 2', 'test', 'VN', NULL, '2024-02-10 18:34:42'),
(11, 'test 3', 'test', 'VN', NULL, '2024-02-10 18:37:56'),
(12, 'Quận Bình Thạnh', 'HCM', 'VN', 'http://res.cloudinary.com/dicixuz5j/image/upload/v1709901522/node37-final-project-airbnb/vi-tri/qoeygatk8pd4zcsmpqqn.jpg', '2024-03-08 12:40:07');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;