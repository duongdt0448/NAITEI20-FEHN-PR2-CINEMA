<template>
  <h2 class="title">PHIM ĐANG CHIẾU</h2>
  <Slick1 />

  <h2 class="title">COMBO ĐẶC BIỆT</h2>
  <Slick2 />

  <h2 class="title">KHUYẾN MÃI</h2>
  <Slick3 />

  <h2 class="title">TIN NỔI BẬT BHD STAR</h2>
  <Slick4 />
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.title {
  display: inline-block;
  padding: 8px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #72be43; /* Màu xanh lá */
  border: 1px solid #72be43; /* Viền xanh lá */
  border-radius: 10px; /* Bo góc */
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 50px auto; /* Canh giữa */
  text-align: center;
}
</style>
