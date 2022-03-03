<script>
  import Router from "svelte-spa-router";
  import routes from "./router";
  import "toastify-js/src/toastify.css";
  //export let name;
</script>

<Router {routes} />

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  @import url("http://fonts.cdnfonts.com/css/gilroy-bold");
  @import url("https://fonts.googleapis.com/css2?family=Harmattan:wght@400;700&display=swap");
  * {
    font-family: "Gilroy-Regular", sans-serif;
  }
  body {
    @apply dark:bg-slate-900 dark:text-white;
    height: 100%;
    width: 100%;
    display: inline-table;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 7px;
  }

  ::-webkit-scrollbar-track {
    background-color: #797979;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #ffc400d3;
  }
</style>
