/**
 * On this module you should write your answer to question #2.
 * This file would be executed with the following command:
 * $ node scritp.js BrowsingEvents.csv
 */

var fs = require("fs");
let converter = require('json-2-csv');

var csv = fs.readFileSync('./BrowsingEvents.csv', 'UTF-8');

const splitCsv = csv.split(/(\r)/);
const arrCsv = []
const setProductId = new Set()
const arrTrash = []

splitCsv.map((item) => {
    if (item != '\r') {
        item = item.slice(1)

        item = item.split(',')
        arrCsv.push({
            client: item[0],
            product_id: item[1],
            type: item[2],
            event: item[3]
        });
    }
})

arrCsv.shift()
arrCsv.pop()

arrCsv.map((item) => {
    if (item != null) {
        setProductId.add(item.product_id)
    }
})

const arrResponse = []
for (let item of setProductId) {
    arrResponse.push({
        product_id: item,
        clicks: 0,
        impressions: 0,
        ctr: 0
    })
}

arrCsv.map((item) => {

    const index = arrResponse
        .map((el) => el.product_id)
        .indexOf(item.product_id);

    const isRepeated = arrTrash.find(
        (trash) =>
            trash.client == item.client &&
            trash.product_id == item.product_id &&
            trash.type == item.type &&
            trash.event == item.event
    );


    if (!isRepeated) {
        if (item.event == "click") {
            arrResponse[index].clicks += 1
        } else if (item.event == "impression") {
            arrResponse[index].impressions += 1
        }

        arrResponse[index].ctr = (((arrResponse[index].clicks + arrResponse[index].impressions) / arrCsv.length) * 100).toFixed(4)
    }

    arrTrash.push(item)

})


converter.json2csv(arrResponse, (error, csv) => {
    console.log(csv)
})
// console.log(arrCsv);
