<template>
    <footer class="footer">
        <div class="footer-top">
            <div class="footer-section">
                <h3>VỀ BHD STAR</h3>
                <hr />
                <ul>
                    <li>Hệ thống rạp</li>
                    <li>Cụm rạp</li>
                    <li>Liên hệ</li>
                </ul>


                <img src="@/assets/images/thongbao.png" alt="Bộ Công Thương" class="gov-logo" />
            </div>

            <div class="footer-section">
                <h3>QUY ĐỊNH & ĐIỀU KHOẢN</h3>
                <hr />
                <ul>
                    <li>Quy định thành viên</li>
                    <li>Điều khoản</li>
                    <li>Hướng dẫn đặt vé trực tuyến</li>
                    <li>Quy định và chính sách chung</li>
                    <li>Chính sách bảo vệ thông tin cá nhân</li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>CHĂM SÓC KHÁCH HÀNG</h3>
                <hr />
                <ul>
                    <li><strong>Giờ làm việc:</strong> 9:00 - 22:00</li>
                    <li><strong>Email hỗ trợ:</strong> cskh@bhdstar.vn</li>
                    <li></li>
            
                </ul>
                
                <!-- <p><strong>Giờ làm việc:</strong> 9:00 - 22:00</p>
                <p><strong>Email hỗ trợ:</strong> cskh@bhdstar.vn</p>
                <div class="social-icons">
                    <img src="@/assets/images/facebook.png" alt="Facebook" />
                    <img src="@/assets/images/instagram.png" alt="Instagram" />
                    <img src="@/assets/images/tiktok.png" alt="TikTok" />
                    <img src="@/assets/images/youtube.png" alt="YouTube" />
                </div> -->
            </div>
        </div>

        <div class="footer-bottom">
            <div><img src="@/assets/images/bhd-logo.png" alt="BHD Star" class="footer-logo" /></div>
            <div>
                <p>
                    <strong>Công ty TNHH MTV Ngôi Sao Cineplex BHD Việt Nam</strong><br />
                    Giấy CNĐKDN: 0104597158. Đăng ký lần đầu ngày 15/04/2010<br />
                    Địa chỉ: Tầng 11, Tòa nhà Hồng Hà, Lý Thường Kiệt, Hoàn Kiếm, Hà Nội<br />
                    Hotline: 19002099<br />
                    COPYRIGHT 2010 BHD STAR. ALL RIGHTS RESERVED
                </p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #0c0c0c;

    color: white;
    padding: 30px 100px;

}

.footer-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid #333;
    padding-bottom: 20px;
}

.footer-section {
    width: 30%;
}

.footer-section h3 {
    font-weight: bold;
}

.footer-section hr {
    content: '';
    display: block;
    width: 117px;
    height: 12px;
    border-radius: 20px;
    border: 1px solid #90C63F;
    background: linear-gradient(180deg, #50B648 0%, #90C63F 59.90%, #B2EC0F 99.48%);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.10);
    margin-top: 16px;
    margin: 0px;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section ul li {
    margin: 8px 0;
}

.gov-logo {
    margin-top: 15px;
    width: 190px;
}

.social-icons img {
    width: 30px;
    margin-right: 10px;
    cursor: pointer;
}

.footer-bottom {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-top: 10px;
}

.footer-logo {
    width: 80px;
    margin-bottom: 10px;
}

.footer-menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
}

.footer-link {
    color: #ffffff;
    font-size: 16px;
    text-decoration: none;
    transition: 0.3s;
}

.footer-link:hover {
    color: #8fd744;
    /* Màu xanh khi hover */
}

.active {
    color: #8fd744;
    /* Màu xanh cho mục đang chọn */
    font-weight: bold;
}

.footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-section ul li {
    display: block;
    /* Đảm bảo mỗi mục là một hàng riêng */
    color: #ffffff;
    font-size: 16px;
    text-decoration: none;
    padding: 8px 0;
    /* Thêm khoảng cách giữa các dòng */
    transition: 0.3s;
    cursor: pointer;
}

.footer-section ul li:hover {
    color: #8fd744;
    /* Đổi màu khi hover */
}

.footer-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
}

.footer-section {
    flex: 1;
    min-width: 250px;
    /* Giữ khoảng cách giữa các cột */
    text-align: left;
    /* Căn trái nội dung */
}

.footer-section h3 {
    text-align: left;
    /* Căn tiêu đề theo lề trái */
}
</style>
