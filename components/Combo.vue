<template>
    <div class="card">
      <img :src="card.image" :alt="card.title" class="card-image" />
      <div class="card-content">
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-description">{{card.description}}</p>
      </div>
    </div>
  </template>
  
  <script >
    export default {
        props: {
          card: Object,
        },
      };
  </script>
  
  <style scoped>
  .card {
    width: auto;
    max-width: 390px;
    border-radius: 10px;
    overflow: hidden;
    background: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out;
    margin: 0px;
  
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .card-image {
    width: 100%;
    height: auto;
  }
  
  .card-content {
    padding: 15px;
    text-align: center;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: bold;
    color: #4caf50;
  }
  
  .card-description {
    font-size: 14px;
    color: #555;
    margin-top: 5px;
  }
  </style>
  