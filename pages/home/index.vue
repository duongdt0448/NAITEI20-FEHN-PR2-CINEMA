<template>
    <div>
        <div class="container ">

            <h2 class="title">PHIM ĐANG CHIẾU</h2>
            <Slick/>

            <h2 class="title">COMBO ĐẶC BIỆT</h2>
            <Slick1/>


            <h2 class="title">KHUYẾN MÃI</h2>
            <Slick2/>

        </div>
        <FooterComponent />
    </div>
</template>

<style>

.container {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    width: 100%;
    margin-left: 50px;
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


<script>
import Slick from "../../components/SlickComponent/Slick.vue";
import Slick1 from "../../components/SlickComponent/Slick1.vue";
import Slick2 from "../../components/SlickComponent/Slick2.vue";
export default {
    components: {

        Slick1,
        Slick,
        Slick2
    },
};
</script>
