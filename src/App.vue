<template>
  <div id="nav">
    <h1>Step into the world of one Stephen King...</h1>
  </div>
  <router-view />
</template>

<style lang="scss">
body {
  margin: 0;
  background-color: #454545;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app * {
  box-sizing: border-box;
}

h1 {
  color: #fff
}

a {
    font-weight: bold;
    color: #eaa29e;
    text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

.button {
  width: 250px;
  background-color: #830c06;
  color: #fff;
  border-radius: 5px;
  appearance: none;
  -webkit-appearance: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  &--arrow::after {
    content: '';
    transform: translateY(0);
    border: 10px solid transparent;
    border-top-color: #fff;
    position: absolute;
    top: 20px;
    bottom: 0;
    right: 50px;
    margin: auto;
  }
  &--arrow:hover::after {
    top: 25px;
    transition: top 250ms;
  }
}
</style>
