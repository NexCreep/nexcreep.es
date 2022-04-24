function updateInner( inner ){
    var container = $("#container")

    switch (inner) {
        case "About":
            container.text(inner);
            break;
        case "Projects":
            container.text(inner);
            break;
        case "Studies":
            container.text(inner);
            break;
        default:
            container.text("null")
            break;
    }
}

$(".tab").click(function (event) {
    var eventElement = event.target

    if ( !eventElement.classList.contains("active") ){
        $(".active").removeClass("active")
        eventElement.classList.add("active")
        updateInner(eventElement.innerText)
    }
})