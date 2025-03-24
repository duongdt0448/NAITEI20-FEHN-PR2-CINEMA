<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const config = {
  itemsToShow: 2,
  gap: 50,
  wrapAround: true,
};

const slides = [
  {
    image: "https://www.bhdstar.vn/wp-content/uploads/2023/09/aboutus1.jpg",
    alt: "BHD Star Cineplex",
    title: "BHD Star Cineplex",
    content: `BHD Star Cineplex được biết đến với cụm rạp đầu tiên với 5 phòng chiếu vào năm 2010.
    Từ 2014, BHD Star Cineplex là cụm rạp của doanh nghiệp Việt Nam duy nhất có sức phát triển mạnh mẽ,
    qua việc liên tục mở thêm các vị trí rạp mới, ở những khu vực đắc địa của Thành phố Hồ Chí Minh, Hà Nội,
    Huế và các tỉnh thành khác.

    Bên cạnh việc sẽ tiếp tục mở rộng ra các tỉnh thành khác, giá trị cốt lõi của thương hiệu BHD Star Cineplex
    là luôn luôn bảo đảm trải nghiệm của khách hàng qua chất lượng phục vụ, đồng nhất tại tất cả các cụm rạp.`,
  },
  {
    image: "https://www.bhdstar.vn/wp-content/uploads/2023/09/aboutus2.jpg",
    alt: "BHD Star Cineplex",
    content: `BHD có tên đầy đủ là Công ty TNHH Bình Hạnh Đan, thành lập vào năm 1996. Công ty có hoạt động về Gameshow truyền hình
    và các hoạt động về phim như sản xuất phim, hợp tác đưa phim nước ngoài về Việt Nam và mở các rạp chiếu phim gọi tên là BHD Star Cineplex.

    BHD Star Cineplex là một trong những cụm rạp đầu tiên. Luôn đặt trải nghiệm khách hàng lên hàng đầu nên BHD Star Cineplex
    ngày càng thu hút được đông đảo khách hàng và tiến thân trở thành cụm rạp hàng đầu Việt Nam.`,
  },
  {
    image: "https://www.bhdstar.vn/wp-content/uploads/2023/09/aboutus3.jpg",
    alt: "BHD Star Cineplex - trải nghiệm xem phim tuyệt vời cùng dịch vụ tốt nhất",
    content: `BHD Star Cineplex luôn được trang bị kỹ lưỡng về âm thanh hình ảnh luôn được áp dụng các công nghệ tối tân nhất
    mang lại trải nghiệm chân thật nhất, không gian thoải mái, sạch sẽ để khách hàng luôn yên tâm khi sử dụng dịch vụ
    và đội ngũ nhân viên được cam kết phục vụ đầy đủ, chuyên nghiệp thoả mãn các yêu cầu của khách hàng kịp thời.`,
  },
  {
    image: "https://www.bhdstar.vn/wp-content/uploads/2023/09/aboutus4.jpg",
    alt: "Không gian xem phim cực kỳ thoải mái, sạch sẽ tại BHD Star Cineplex",
    content: `BHD Star Cineplex Cinema là hệ thống cụm rạp cao cấp với chất lượng âm thanh và hình ảnh hiện đại,
    được thành lập vào năm 2010.`,
  },
];
</script>

<template>
  <div class="flex items-center justify-center p-8">
    <h1 class="text-2xl font-bold">Về chúng tôi</h1>
  </div>

  <div class="relative w-screen">
    <Carousel v-bind="config">
      <Slide v-for="(slide, index) in slides" :key="index">
        <div class="flex flex-col h-[700px] w-[950px]">
          <img
            :src="slide.image"
            :alt="slide.alt"
            class="h-[500px] object-cover"
          />
          <div class="mt-8 text-center">
            <p class="slide-content">{{ slide.content }}</p>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>

  <h2 class="title">KHUYẾN MÃI</h2>
  <Slick3 />
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

.carousel__slide--sliding {
  transition: opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition: opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel__slide--prev img,
.carousel__slide--next img {
  transform: scale(0.9);
  transition: transform 0.5s;
  opacity: 0.5;
}

.carousel__slide--prev .slide-content,
.carousel__slide--next .slide-content {
  display: none;
}
</style>
