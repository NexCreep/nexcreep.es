var searchParam = new URLSearchParams(window.location.search)

async function getLang ({langID}){
    try {
        var res = await $.ajax({url: `./assets/lang/${langID}.json`, type: "get", dataType: "json"})
        
    } catch (err) {
        console.error("An error ocurred in langHandler: " + err);
        var res = {"error": err}
    }

    return res
}

export default async function langHandler()  {
    var langMap = {
        en: "en_UK",
        es: "es_ES"
    }
    var langID = "en"

    if ((searchParam.has("lang") && searchParam.get("lang").toLowerCase() === "es")) {
        langID = "es"
        
    }

    return await getLang({langID: langMap[langID]})
}
