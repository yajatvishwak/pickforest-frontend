import App from './App.svelte';
import "@splidejs/splide/dist/css/splide.min.css";

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;