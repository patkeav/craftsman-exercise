<template>
  <div id="nav">
   <h1>Search Stephen King Books!</h1>
  </div>
  <router-view />
</template>

<style lang="scss">
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
img {
  max-width: 100%;
  display: block;
}

.button {
  width: 250px;
  background-color: cornflowerblue;
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
  &:after {
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
  &:hover::after {
    top: 25px;
    transition: top 250ms;
  }
}
</style>
