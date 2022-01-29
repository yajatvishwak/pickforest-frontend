import { writable } from 'svelte/store';

export const darkmode = writable(localStorage.getItem("darkmode") || "");
darkmode.subscribe(val => {
    let root = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)
    if(val)
        root.classList.add('dark')
    else
        root.classList.remove('dark')
    localStorage.setItem("darkmode", val)
})