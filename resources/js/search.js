async function fillDL() {
    var json_card = await fetch('../json/card_data.json').then(e => e.json())
    var json_buddy = await fetch('../json/buddy_data.json').then(e => e.json())
    let input = document.getElementById('search')
    let val1 = Object.values(json_card)
    let val2 = Object.values(json_buddy)
    let val = val1.concat(val2)
    let dl = document.createElement('datalist')
    dl.id = 'data-search'
    val.forEach(e => {
        let option = document.createElement('option')
        option.value = e
        dl.appendChild(option)
    });
    input.appendChild(dl)
    input.addEventListener('input', async function(e) {
        if(this.value.length < 2)return
        let arr = []
        val.forEach((e, i) => {
            let searched = [...this.value].every(x => {
                let ea = [...e]
                let idx = ea.indexOf(x)
                if(~idx){
                    ea.splice(idx, 1);
                    return true;
                }
            })
            if (searched) arr.push(val[i])
        })
        let keyarr = []
    
        for (const key in json_card) {
            if (Object.hasOwnProperty.call(json_card, key)) {
                const element = json_card[key];
                let fidx = -1
                arr.forEach((v, i) => {
                    if (element === v) {
                        keyarr.push({key: key, value: element})
                        fidx = i
                    }
                })
                if (fidx != -1) {
                    arr.splice(fidx, 1)
                }
                if (arr.length == 0) {
                    break
                }
            }
        }
        for (const key in json_buddy) {
            if (Object.hasOwnProperty.call(json_buddy, key)) {
                const element = json_buddy[key];
                let fidx = -1
                arr.forEach((v, i) => {
                    if (element === v) {
                        keyarr.push({key: key, value: element})
                        fidx = i
                    }
                })
                if (fidx != -1) {
                    arr.splice(fidx, 1)
                }
                if (arr.length == 0) {
                    break
                }
            }
        }
        if(keyarr.length > 0){
            if(keyarr.length > 50)keyarr = keyarr.slice(0, 50);
            makecard(keyarr)
        }
    })
}

function makecard(keyarr) {
    let container = document.querySelector('.album .container')
    let cardarr = document.createElement('div')
    cardarr.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'
    keyarr.forEach(e => {
        let card = document.createElement('template')
        let imgsrc
        if(e.key.startsWith('b')){
            imgsrc = '/cardimg/buddy/'+e.key.substr(1)+e.value+'.png'
        } else {
            imgsrc = '/cardimg/'+e.key+e.value+'.webp'
        }
        console.log(imgsrc)
        let inner = `<a href="/Cardview/${e.key}"><div class="col">
            <div class="card shadow-sm">
            <img src="${imgsrc}"></img>
            <div class="card-body">
                <p class="card-text">${e.value}</p>
            </div>
            </div>
        </div></a>`
        card.innerHTML = inner;
        cardarr.appendChild(card.content.firstChild)
    });
    container.replaceChild(cardarr, container.firstChild)
}

fillDL()

makecard([
    {key: "10220001", value: "[慶福の初音]新春型ウアサハ2019"},
    {key: "10274005", value: "[次なる戦地へ]感謝型 傭兵アーサー2020"},
    {key: "10274001", value: "[永遠の観測者]感謝型ファルサリア2020"},
    {key: "10274011", value: "[偉大なる先達]感謝型 富豪アーサー2020"},
    {key: "10274012", value: "[秘薬を求めて]感謝型 盗賊アーサー2020"},
    {key: "10267003", value: "[花嫁アイドル]純白型 歌姫アーサー2020"},
    {key: "10274009", value: "[教官と家政婦]感謝型ウアサハ＆スカアハ"},
    {key: "10274003", value: "[騎士]感謝型コンスタンティン"},
    {key: "10274007", value: "[騎士]感謝型オイフェ"}
])