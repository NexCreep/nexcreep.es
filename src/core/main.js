import { event } from 'jquery';
import ghDelivery from './Helpers/githubDelivery'
import langHandler from './Helpers/langHandler';


//Lang data
var data;
//Container html
var deliveredProjectHTML = false;
var projectHTML;
var reposHTML = `

<svg class="translate-y-1/2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: transparent; display: block; shape-rendering: auto;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" r="32" stroke-width="8" stroke="#40e0d0" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
</svg>

`

function renderProject() {
    projectHTML = `

<div class="flex flex-wrap h-[600px] sm:h-0">
    <div class="flex-1 sm:basis-0 align-middle justify-center h-[300px] md:hidden">
        <svg class="fill-black dark:fill-white w-[100%] h-[100%]" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64">
            <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 
            0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 
            0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 
            0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 
            19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 
            5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 
            57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 
            37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"/>
        </svg>
        <div class="text-3xl text-center py-8 font-bold"><a class="hover:drop-shadow-lg hover:text-turq" href="https://github.com/NexCreep" target="_self">github/NexCreep</a></div>
    </div>
    <div class="flex-1 sm:basis-0 sm:w-full align-middle h-[300px]">
        ${reposHTML}
    </div>
</div>

                `
}

async function updateInner( inner ){
    var container = $("#container")

    if (data === undefined || data === null){
        container.text("No data found - 404 👻")
        return;
    }

    switch (inner) {
        case "w01":
            container.html(
                `<div class="grid grid-cols-2 md:grid-cols-1"><div id="aboutText"></div><div class="md:hidden about-img" id="aboutImg"><img src="./assets/coding.gif"/></div></div>`
            )
            var aboutText = $("#aboutText")
            aboutText.append(`<p class="text-3xl font-semibold">${data.About.t01}</p>`)
            
            data.About.pa01.map( line => {
                aboutText.append(
                    `   <p class="line text-xl sm:text-base">${line}</p>`
                )
            }) 
            break;

        case "w02":
            renderProject();
            container.html(projectHTML);
            if (!deliveredProjectHTML) {
                reposHTML = "";

                var resHTML = await ghDelivery()
                reposHTML = '<div class="overflow-y-scroll scroll-smooth h-[600px] grid-col-4 grid-flow-row">'
                resHTML.map( repoHTML =>{
                    reposHTML += repoHTML
                })
                reposHTML += '</div>'

                renderProject();

                deliveredProjectHTML = true
                container.html(projectHTML)

            }
            break;

        case "w03":
            container.html(
                `
                <div class = "p-20">
                    <div class='text-6xl font-semibold text-center'>🚧 Nothing to see here 🚧</div>
                    <div class='text-2xl font-semibold text-center pt-5'>This tab is under construnction</div>
                </div>
                `
            );
            break;

        default:
            container.text("null")
            break;
    }
}
async function main() {
    data = await langHandler()

    var langBtn = $("#change-lang")
    langBtn.text(data.langTo.toUpperCase())

    langBtn.click((event) => window.open(`./?lang=${data.langTo}`, '_self'))

    var tabs = $(".tab")
    tabs.map( index => {
        var tabId = tabs[index].getAttribute("data-tab-id")
        var tab = tabs[index]

        if (tab.innerText != data.Tabs[tabId])
            tab.innerText = data.Tabs[tabId]
        
        if (tab.getAttribute("data-tab-name") != data.Tabs[tabId])
            tab.setAttribute("data-tab-name", data.Tabs[tabId])
            
    })


    $(".tab").click((event) => {
        var eventElement = event.target
    
        const tabId = eventElement.getAttribute("data-tab-id")
    
        if (eventElement.innerText != data.Tabs[tabId])
            eventElement.innerText = data.Tabs[tabId]
        
        if (eventElement.getAttribute("data-tab-name") != data.Tabs[tabId])
            eventElement.setAttribute("data-tab-name", data.Tabs[tabId])
    
    
        if ( !eventElement.classList.contains("active") ){
            $(".active").removeClass("active")
            eventElement.classList.add("active")
            updateInner(tabId)
        }
    })


    var active = $(".active")[0]
    if (active.getAttribute("data-tab-name") != undefined) 
        updateInner(active.getAttribute("data-tab-id"))

}

$(document).ready(async () => {
    await main();
    setTimeout(() => {
        var body = $("#body")
        body.css("display", "block")
        setTimeout(() => body.css("opacity", 1), 100)
    }, 500)
})