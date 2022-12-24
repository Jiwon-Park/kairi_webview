async function fillDL() {
    let json_card = await fetch('../json/card_data.json').then(e => e.json())
    let json_buddy = await fetch('../json/buddy_data.json').then(e => e.json())

    let val = Object.values(json_card)
    let val2 = Object.values(json_buddy)
    let dl = document.createElement('datalist')
    dl.id = 'data-search'
    val.forEach(e => {
        let option = document.createElement('option')
        option.value = e
        dl.appendChild(option)
    });
    val2.forEach(e => {
        let option = document.createElement('option')
        option.value = e
        dl.appendChild(option)
    });
    document.getElementById('search').appendChild(dl)
}

fillDL()