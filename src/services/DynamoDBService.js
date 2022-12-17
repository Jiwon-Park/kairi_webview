const { ListTablesCommand, DynamoDB, BatchWriteItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb")
// const {readFile, read} = require('fs')

const client = new DynamoDB({region: 'ap-northeast-2'})
// const listtable = async () => {    
//     const command = new ListTablesCommand({ExclusiveStartTableName: undefined, Limit: 10})
//     const response = await client.send(command)
//     return response
// }

// const batchputitem = async(jsondataarr) => {
//     let params = {RequestItems: {CardData: []}}
//     jsondataarr.forEach(element => {
//         let request = {
//             PutRequest: {
//                 Item: element
//             }
//         }
//         params["RequestItems"]["CardData"].push(request)
//     });
    

//     let command = new BatchWriteItemCommand(params)
//     await client.send(command, function (err, data) {
//         if(err) {
//             console.log("Error", err)
//             params["RequestItems"]["CardData"].forEach(element => {
//                 console.log(element['PutRequest']['Item']['card_id'])
//             });
//         } else {
//             console.log("Success", data)
//             if (data['UnprocessedItems'] !== {}) {
//                 console.log(data['UnprocessedItems']['CardData'])
//             }
//         }
//     })
// }

const getitem = async(card_id, type='card') => {
    const params = {
        TableName: "CardData",
        Key: marshall({
            card_id: card_id,
            type: type
        })
    }
    const command = new GetItemCommand(params)
    const data = await client.send(command).then((o) => o, (err) => {
        console.log(err)
        return null
    })
    if (data['Item'] === undefined) {
        return undefined
    }
    // console.log(data['Item'])
    return unmarshall(data['Item'])
}

const sleep = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

module.exports = {
    getitem: getitem
}

// listtable().then((e) => {
//     console.log(e)
// })


// readFile("D:/Reversing/obb/py/CardData.json", 'utf-8', async function (err,data) {
//     if(err) {
//         return console.log(err)
//     }
//     let json = JSON.parse(data)
//     let arr = []
//     let card_id = '0'
//     let continue_flag = false
//     for (const key in json) {
//         if (Object.hasOwnProperty.call(json, key)) {
//             const element = json[key];
//             card_id = element['card_id']
//             arr.forEach(arr_object => {
//                 if(arr_object['card_id']['S'] === card_id){
//                     continue_flag = true
//                 }
//             });
//             if (continue_flag === true){
//                 continue_flag = false
//                 continue;
//             }
//             let item = {}
//             for(const key2 in element) {
//                 if (Object.hasOwnProperty.call(json, key)) {
//                     const element2 = element[key2]
//                     if (key2 === 'script') {
//                         let scriptset = element2.filter((e, idx) => {
//                             return element2.indexOf(e) === idx;
//                         })
//                         item[key2] = {SS: scriptset}
//                         //item[key2] = {SS: element2}
//                     } else {
//                         item[key2] = {S: element2}
//                     }
//                 }
//             }
//             arr.push(item)
//         }
//         if (arr.length == 25) {
//             await batchputitem(arr)
//             arr = []
//             await sleep(2000)
//         }
//     }
// })