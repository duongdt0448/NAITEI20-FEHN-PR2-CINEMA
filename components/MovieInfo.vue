<template>
  <div class="grid grid-cols-12 gap-8 p-6 bg-white max-w-[72vw] mx-auto text-[#494949] text-base font-medium">
    <img :src="movie.poster_url" :alt="movie.title" class="col-span-4 w-110 h-auto rounded-xl" />
    <div class="col-span-5">
      <h1 class="text-3xl font-bold text-primary uppercase mb-6">{{ movie.title }}</h1>
      <p class="text-gray-700 mt-2">{{ movie.description }}</p>
      <div class="mt-4 space-y-4">
        <p>Phân loại:
          <span class="px-2 py-1 text-white rounded text-xs" style="background: linear-gradient(0deg, rgb(254, 45, 45) 15%, rgb(107, 0, 62) 100%);">{{ movie.classify }}</span>
        </p>
        <div class="flex gap-2">
          <p>Định dạng:</p>
          <div class="flex gap-2">
            <span v-for="(format, index) in movie.formats" :key="index"
                  class="px-1 py-1 bg-green-500 text-white rounded text-xs">
              {{ format }}
            </span>
          </div>
        </div>
        <p>Đạo diễn:
          <span class="text-primary">{{ movie.directors.join(', ') }}</span>
        </p>
        <p>Diễn viên:
          <span class="text-primary">{{ movie.actors.join(', ') }}</span>
        </p>
        <p>Thể loại:
          <span class="text-primary">{{ movie.genre.join(', ') }}</span>
        </p>
        <p>Khởi chiếu: <span>{{ formattedReleaseDate }}</span></p>
        <p>Thời lượng: <span>{{ movie.duration }} phút</span></p>
        <p>Ngôn ngữ: <span>{{ movie.language.join('/ ') }}</span></p>
      </div>

      <!-- Social Share -->
      <div class="flex gap-2 mt-4">
        <div class="relative group">
          <a href="https://www.facebook.com/sharer.php?u=https://www.bhdstar.vn/phim/the-snow-queen-and-the-princess/" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-blue-600 text-white rounded text-sm hover:bg-primary cursor-pointer flex items-center justify-center">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <span class="absolute left-1/2 -translate-x-1/2 -top-10 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
            Share on Facebook
          </span>
        </div>

        <div class="relative group">
          <a href="https://twitter.com/share?url=https://www.bhdstar.vn/phim/the-snow-queen-and-the-princess/" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-black text-white rounded text-sm hover:bg-primary cursor-pointer flex items-center justify-center">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <span class="absolute left-1/2 -translate-x-1/2 -top-10 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
            Share on Twitter
          </span>
        </div>

        <div class="relative group">
          <a href="https://pinterest.com/pin/create/button?url=https://www.bhdstar.vn/phim/the-snow-queen-and-the-princess/&media&description=THE%20SNOW%20QUEEN%20AND%20THE%20PRINCESS%3AC%C3%94NG%20CH%C3%9AA%20B%C4%82NG%20GI%C3%81" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-[#be0216] text-white rounded text-sm hover:bg-primary cursor-pointer flex items-center justify-center">
            <i class="fa-brands fa-pinterest"></i>
          </a>
          <span class="absolute left-1/2 -translate-x-1/2 -top-10 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
            Share on Pinterest
          </span>
        </div>

        <div class="relative group">
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://www.bhdstar.vn/phim/the-snow-queen-and-the-princess/&title=THE%20SNOW%20QUEEN%20AND%20THE%20PRINCESS%3AC%C3%94NG%20CH%C3%9AA%20B%C4%82NG%20GI%C3%81" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-[#006394] text-white rounded text-sm hover:bg-primary cursor-pointer flex items-center justify-center">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <span class="absolute left-1/2 -translate-x-1/2 -top-10 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
            Share on LinkedIn
          </span>
        </div>
      </div>

    </div>
    <div class="col-span-3">
      <img src="../assets/images/banner2.jpg" alt="Promotion" class="h-full" />
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: {
    movie: Object
  },
  computed: {
    formattedReleaseDate() {
      return this.movie.release_date ? format(new Date(this.movie.release_date), "dd/MM/yyyy") : "";
    }
  }
};
</script>
