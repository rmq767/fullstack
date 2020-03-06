<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
}
.avue-upload__avatar {
  height: auto !important;
  /* 上传图片 */
}
</style>
