// AUTH : boolean

export function initStore(){
    localStorage.setItem("AUTH",false)
}
export function setValue(key, value){
    localStorage.setItem(key,JSON.parse(value))
}

export function getValue(key){
    return JSON.parse(localStorage.getItem(key))
}


