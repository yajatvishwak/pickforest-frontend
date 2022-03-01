// AUTH : boolean

import { writable } from "svelte/store";



const AUTH = writable(localStorage.getItem("AUTH") || false );
AUTH.subscribe(val => localStorage.setItem("AUTH", val));


const USERID = writable(localStorage.getItem("USERID") || "" );
USERID.subscribe(val => localStorage.setItem("USERID", val));

// const EMAIL = writable(localStorage.getItem("EMAIL") || false );
// EMAIL.subscribe(val => localStorage.setItem("EMAIL", val));
const PFP_LINK = writable(localStorage.getItem("PFP_LINK") || "" );
PFP_LINK.subscribe(val => localStorage.setItem("PFP_LINK", val));

const USERNAME = writable(localStorage.getItem("USERNAME") || "" );
USERNAME.subscribe(val => localStorage.setItem("USERNAME", val));

const ONBOARDING = writable(localStorage.getItem("ONBOARDING") || "" );
ONBOARDING.subscribe(val => localStorage.setItem("ONBOARDING", val));

const REACTIVE_STATES = {
    "AUTH": AUTH,
    "USERID": USERID,
    "PFP_LINK": PFP_LINK,
    "USERNAME": USERNAME,
    "ONBOARDING": ONBOARDING, 
}


export function initStore(){
    localStorage.setItem("JWT", "")
    localStorage.setItem("ONBOARDING", true)
    localStorage.setItem("AUTH", false)
    localStorage.setItem("USERID", "")
    localStorage.setItem("PFP_LINK", "")
    localStorage.setItem("USERNAME", "")
    AUTH.set(false)
    ONBOARDING.set(true)
    USERID.set("")
    PFP_LINK.set("")
    USERNAME.set("")   
}
export function setValue(key, value){
    if(key in REACTIVE_STATES){
        REACTIVE_STATES[key].set(value)
    }else{
        localStorage.setItem(key,JSON.stringify(value))
    }
}

export function getValue(key){
    return JSON.parse(localStorage.getItem(key))
}