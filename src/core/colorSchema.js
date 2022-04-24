import cookie from 'js-cookie'

const schemaClass = "dark";
var DOM = document.documentElement; 

const changeSchemaCookie = (set) =>{
    cookie.set("color-schema-dark", set)
}

const addDomClass = (className) => {
    DOM.classList.add(className)
    changeSchemaCookie(true)
    document.getElementById('change-color-schema').innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 
    6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
    `
}
const remDomClass = (className) => {
    DOM.classList.remove(className)
    changeSchemaCookie(false)
    document.getElementById('change-color-schema').innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 
    9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>
    `
}

const isSystemDark = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage)) && window.matchMedia('(prefers-color-scheme: dark)'.matches)

if ( isSystemDark && cookie.get("color-schema-dark") == "true" )
    addDomClass("dark")
else 
    remDomClass("dark");


var btnSchema = document.getElementById('change-color-schema')
if (btnSchema != undefined) {
    btnSchema.addEventListener('click', () => {
        var date = new Date(Date.now())
        console.log(`[${date.toUTCString()}] Swaped color schema`);
        
    
        if (DOM.classList.contains(schemaClass))
            remDomClass(schemaClass)
        else
            addDomClass(schemaClass)
        
    })
}
