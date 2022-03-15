<template>
  <div class="home">
    <h1>Welcome to Patrick Keaveny's skills assessment for Craftsman+!</h1>
    <p>I really enjoyed talking with Jess about Craftsman+, and had a lot of fun building the following app.</p>
    <p>
      Unfortunately, the Superhero API doesn't appear to work with Facebook anymore, so I went with the Books API from
      Google.
    </p>
    <p>
      I also filtered by Stephen King to keep the data set large enough to be meaningful, but not so large as to
      adversely affect performance.
    </p>
    <p>You can see the completed list of Books (and requirements outlined in the Readme) at the button below.</p>
    <router-link :to="{ name: 'Books' }" class="button">Take me there!</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {},
});
</script>
<style scoped>
.home {
  color: #fff;
}
.button {
  margin: 15px auto;
  display: block;
}
</style>
