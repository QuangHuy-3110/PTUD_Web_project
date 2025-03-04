<!-- <script>
  import AppHeader from "@/components/Addbook.vue";
  export default {
    components: {
      AppHeader,
    },
  };
</script> -->

<template>  
  <!-- <AppHeader/> -->
  <div id="app" >
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
<style>
  .page {
    max-width: 400px;
    margin: auto;
  }


</style>