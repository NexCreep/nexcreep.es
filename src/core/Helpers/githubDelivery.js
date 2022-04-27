export default async function getGithubUserRepos() {
    const specialLangName = ["c#"]
    var formedHTML = [];

    try {
        var res = await $.ajax({url: "https://api.github.com/users/NexCreep/repos", type: "get", dataType: "json"})   

        res.sort((a, b) => {
            if (a.updated_at > b.updated_at) return -1;
            else if (a.updated_at < b.updated_at) return 1;
            else return 0
        })

        res.map(repo => {

            if (repo.stargazers_count >= 1 && repo.language != null) {
                formedHTML.push(
                    `   
        <a href="${repo.html_url}">
            <div class="shadow-lg p-8 mb-5 hover:bg-turq dark:text-white dark:shadow-lg rounded-lg sm:mx-2">
                <div class="text-2xl">${repo.full_name}</div>
                <div class="text-xl mt-2">${repo.description != null ? repo.description : "Amazing description 🌈"}</div>
                <div class="mt-5">
                    <div class="inline-block align-middle dark:text-turq">
                        <svg class="w-6 h-6">
                            <circle cx="50%" cy="50%" r="8" class="lang-circle lang-circle-${!specialLangName.includes(repo.language.toLowerCase()) ? repo.language.toLowerCase() : "cs"}" />
                        </svg>
                    </div>
                    <div class="inline-block align-middle text-lg">${repo.language != null ? repo.language : "👻😱👻"}</div>
                    <div class="inline-block align-middle ml-6 sm:ml-2 text-[#f00] dark:text-[#ff0]">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 
                        1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 
                        1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                    </div>
                    <div class="inline-block align-middle text-lg">${repo.stargazers_count}</div>
                </div>
            </div>
        </a>
                `
                )
            }
        })

        return formedHTML

    } catch (err) {
        console.error(err);
    }

    return formedHTML
}