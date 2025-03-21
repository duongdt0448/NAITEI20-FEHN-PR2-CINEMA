<template>
  <div
    class="flex w-full bg-white rounded-2xl border border-gray-200 overflow-hidden p-5"
  >
    <div class="w-32 flex-2/12 px-1">
      <img :src="movie.poster" alt="Movie Poster" class="w-full rounded-xl" />
    </div>

    <div class="flex flex-col flex-grow ml-4 flex-10/12">
      <NuxtLink
        :to="movie.id ? `/movies/${movie.id}` : '#'"
        class="text-primary text-xl font-bold hover:underline"
      >
        {{ movie.title }}
      </NuxtLink>
      <p class="text-gray-800 text-base mt-3">{{ movie.description }}</p>

      <div class="text-gray-800 text-base mt-3">
        <p>
          <span class="font-semibold">Đạo diễn: </span>
          <span class="text-primary">
            {{ getDirectorName() }}
          </span>
        </p>

        <p>
          <span class="font-semibold">Diễn viên: </span>
          <span class="text-primary">
            {{ getActorNames() }}
          </span>
        </p>

        <p>
          <span class="font-semibold">Thể loại: </span>
          <span class="text-primary">
            {{ getGenreName() }}
          </span>
        </p>

        <p>
          <span class="font-semibold">Khởi chiếu: </span>
          {{ movie.releaseDate }} |
          <span class="font-semibold">Thời lượng: </span>
          {{ movie.duration }} phút
        </p>
      </div>

      <NuxtLink
        to="/movies"
        class="mt-3 inline-block text-sm text-gray-700 hover:underline"
      >
        <Button
          label="Chọn phim khác"
          variant="outlined"
          icon="pi pi-arrow-left"
          class="font-bold uppercase"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

// Helper methods to handle different data formats
function getDirectorName() {
  const director = props.movie.director;
  if (!director) return "";

  if (typeof director === "string") return director;
  if (Array.isArray(director)) return director.join(", ");
  if (director.name) return director.name;

  return "";
}

function getActorNames() {
  const actors = props.movie.actors;
  if (!actors) return "";

  if (Array.isArray(actors)) {
    return actors
      .map((actor) => (typeof actor === "string" ? actor : actor.name))
      .join(", ");
  }

  return typeof actors === "string" ? actors : "";
}

function getGenreName() {
  const genre = props.movie.genre;
  if (!genre) return "";

  if (typeof genre === "string") return genre;
  if (Array.isArray(genre)) return genre.join(", ");
  if (genre.name) return genre.name;

  return "";
}
</script>
