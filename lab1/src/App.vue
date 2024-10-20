<template>
  <div id="app">
    <!-- Header -->
    <header class="main-header">
      <div class="container">
        <h1 class="logo">Hollow Knight Mini Blog</h1>
        <nav>
          <ul class="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">Discussion</a></li>
            <li><a href="#">Fanart</a></li>
            <li><a href="#">Fandom</a></li>
            <li><a href="#">Sports</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <section class="blog-section">
      <div class="container">
        <div class="blog-grid">
          <div class="left-column">
            <div class="blog-card small-card">
              <img :src="require('@/assets/left1.png')" alt="Blog post image">
              <div class="blog-content">
                <h2 class="blog-title">Exploring the Vast Caverns of Hollow Knight</h2>
                <p class="blog-date">October 15, 2024</p>
              </div>
            </div>
            <div class="blog-card small-card">
              <img :src="require('@/assets/left2.jpg')" alt="Blog post image">
              <div class="blog-content">
                <h2 class="blog-title">Secrets Hidden in the Depths of Hallownest</h2>
                <p class="blog-date">October 16, 2024</p>
              </div>
            </div>
          </div>

          <div class="center-column">
            <div class="blog-card large-card">
              <img :src="require('@/assets/center.jpg')" alt="Blog post image">
              <div class="blog-content">
                <h2 class="blog-title">The Challenging Combat of Hollow Knight</h2>
                <p class="blog-date">October 17, 2024</p>
              </div>
            </div>
          </div>

          <div class="right-column">
            <div class="blog-card small-card">
              <img :src="require('@/assets/right1.jpg')" alt="Blog post image">
              <div class="blog-content">
                <h2 class="blog-title">Mastering the Nail: Hollow Knight’s Unique Combat</h2>
                <p class="blog-date">October 18, 2024</p>
              </div>
            </div>
            <div class="blog-card small-card">
              <img :src="require('@/assets/right2.jpg')" alt="Blog post image">
              <div class="blog-content">
                <h2 class="blog-title">Uncovering the Lore: The Story of Hollow Knight</h2>
                <p class="blog-date">October 19, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main-header {
  background-color: #f8f9fa;
  padding: 10px 0;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  list-style-type: none;
  display: flex;
  gap: 20px;
}

.nav-links li a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
}

.blog-section {
  padding: 40px 0;
}

.blog-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
}

.blog-card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.blog-card:hover {
  transform: scale(1.05);
}

.blog-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5); 
  color: white; 
  padding: 20px;
}

.blog-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
}

.blog-date {
  color: #ccc;
  font-size: 14px;
}

.small-card {
  height: 200px;
}

.small-card img {
  height: 100%;
}

.large-card {
  height: calc(200px * 2 + 20px); 
}

.large-card img {
  height: 100%;
  object-fit: cover;
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.center-column {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
