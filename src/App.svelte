<script>
  import Router from "svelte-spa-router";
  import routes from "./router";
  //export let name;
</script>

<body>
  <Router {routes} />
</body>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  @import url("http://fonts.cdnfonts.com/css/gilroy-bold");
  @import url("https://fonts.googleapis.com/css2?family=Harmattan:wght@400;700&display=swap");
  * {
    font-family: "Gilroy-Regular", sans-serif;
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
