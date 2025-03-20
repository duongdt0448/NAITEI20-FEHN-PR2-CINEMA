<template>
    <div class="movie-card">
      <div class="poster-wrapper">
        <img :src="movie.image" :alt="movie.title" class="movie-poster" />
        <button class="buy-ticket">MUA VÉ NGAY</button>
      </div>
      <div class="movie-info">
        <span class="badge rating">{{ movie.age_restriction }}</span>
        <span class="badge lang">{{ movie.language[0] }}</span>
        <span class="badge format">{{ movie.formats[0] }}</span>

        <h3 class="movie-title">{{ movie.title }}</h3>
        <p class="genre">Thể loại phim: <span class="genre-text">{{ movie.genre[0] }}</span></p>


      </div>
    </div>
  </template>

  <script>
  export default {
    props: {
      movie: Object,
    },
  };
  </script>

  <style scoped>
        .movie-card {
          width: 100%;
          max-width: 250px;
          border-radius: 10px;
          overflow: hidden;
          text-align: center;
          background: white;
          display: flex;
          flex-direction: column;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .poster-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
        }

        .movie-poster {
          width: 100%;
          border-radius: 10px;
          transition: transform 0.3s ease;
        }

        .poster-wrapper:hover .movie-poster {
          filter: brightness(0.7);
        }

        .buy-ticket {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: #90C63F;
          color: white;
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .poster-wrapper:hover .buy-ticket {
          opacity: 1;
        }

        .movie-info {
          background: white;
          color: black;
          padding: 10px;
          border-radius: 0 0 10px 10px;
          text-align: left;
          flex-grow: 1;
        }

        .badge {
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 3px;
          display: inline-block;
          margin: 5px 3px;
        }

        .rating {
          background: red;
          color: white;
        }

        .lang {
          background: black;
          color: white;
        }

        .format {
          background: #90C63F;
          color: white;
        }
        .movie-title{

            color: #72be43;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
            display: block;
        }
        .genre-text{
          color: #72be43;
        }
</style>
