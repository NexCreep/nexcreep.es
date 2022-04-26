import ghDelivery from './Helpers/githubDelivery'

//Container html
var deliveredProjectHTML = false;
var projectHTML = '' +
                '<?xml version="1.0" encoding="utf-8"?>' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
                'style="margin: auto; background: transparent; display: block;' +
                'shape-rendering: auto;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">' +
                '<circle cx="50" cy="50" r="32" stroke-width="8" stroke="#40e0d0" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">' +
                '<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>' +
                '</svg>'

async function updateInner( inner ){
    var container = $("#container")

    if (data === undefined || data === null){
        container.text("No data found - 404 👻")
        return;
    }

    switch (inner) {
        case "About":
            container.html(`<p class="text-2xl font-semibold">${data.About.t01}</p>`)
            data.About.pa01.map( line => {
                container.append(
                    `<p class="line">${line}</p>`
                )
            }) 
            break;

        case "Projects":
            container.html(projectHTML);
            if (!deliveredProjectHTML) {
                projectHTML = "";

                var resHTML = await ghDelivery()
                projectHTML = '<div class="overflow-y-scroll h-[600px] grid-col-4 grid-flow-row">'
                resHTML.map( repoHTML =>{
                    projectHTML += repoHTML
                })
                projectHTML += '</div>'

                deliveredProjectHTML = true
                container.html(projectHTML)

            }
            break;

        case "Studies":
            container.text(inner);
            break;

        default:
            container.text("null")
            break;
    }
}

var data;

$.ajax({url: "/assets/lang/en_UK.json", type: "get", dataType: "json"})
    .then((raw) => { 
        data = raw;
        var active = $(".active")[0]
        if (active.getAttribute("data-tab-name") != undefined) 
               updateInner(active.getAttribute("data-tab-name"))
        

    })
    .catch((err) => { throw err })


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
        updateInner(eventElement.getAttribute("data-tab-name"))
    }
})