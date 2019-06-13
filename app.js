const getEvent = require('./getEvent')
const web3 = require('./web3')
const config = require('./config')
const _ = require('lodash')
const fs = require("fs")
const mysql = require('./mysql')

const bountyHash = "Qmedi1hcT7Rhx3vDqd1PUiamuNBevLJv5pRZfxKUbXxDQC"
const btcTalkHash = "QmfMkJr2LZBLSaDwCx5Pm4fCMKSaBnFpGMkaiyRF2Jrp2W"

let bountyArray = []
let btcTalkArray = []
let total = []
let totalTokens = 0

const getUsers = async () => {
let eventsObj = await getEvent(config.Address, config.ABI, "0", 'Drop')

if(!_.isEmpty(eventsObj)){
for(let i =0; i < eventsObj.length; i++){

let EventName = eventsObj[i].event
let txInfo = await web3.eth.getTransaction(eventsObj[i].transactionHash)
let UserAddress = txInfo.from

switch(eventsObj[i].returnValues[0]){
  case bountyHash:
  bountyArray.push(eventsObj[i].returnValues[1])
  mysql.insert(eventsObj[i].returnValues[1], web3.utils.hexToNumberString(eventsObj[i].returnValues[2]._hex))
  totalTokens = totalTokens + Number(web3.utils.fromWei(web3.utils.hexToNumberString(eventsObj[i].returnValues[2]._hex)))
  break;

  case btcTalkHash:
  btcTalkArray.push(eventsObj[i].returnValues[1])
  mysql.insert(eventsObj[i].returnValues[1], web3.utils.hexToNumberString(eventsObj[i].returnValues[2]._hex))
  totalTokens = totalTokens + Number(web3.utils.fromWei(web3.utils.hexToNumberString(eventsObj[i].returnValues[2]._hex)))
  break;

      }
    }
  }

fs.writeFile("./claimed_addresses/bounty.txt", bountyArray, (err) => {
  if (err) console.log(err)
  console.log("save bountyArray.")
})

fs.writeFile("./claimed_addresses/btc_talc.txt", btcTalkArray, (err) => {
  if (err) console.log(err)
  console.log("save btcTalkArray.")
})

console.log(bountyArray.length)
console.log(btcTalkArray.length)
console.log("totalTokens", totalTokens)

}

getUsers()
