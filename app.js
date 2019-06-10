const getEvent = require('./getEvent')
const web3 = require('./web3')
const config = require('./config')
const _ = require('lodash')
const fs = require("fs")


const bountyHash = "Qmedi1hcT7Rhx3vDqd1PUiamuNBevLJv5pRZfxKUbXxDQC"
const btcTalkHash = "QmfMkJr2LZBLSaDwCx5Pm4fCMKSaBnFpGMkaiyRF2Jrp2W"

let bountyArray = []
let btcTalkArray = []

const getUsers = async () => {
let eventsObj = await getEvent(config.Address, config.ABI, "7422573", 'Drop')

if(!_.isEmpty(eventsObj)){
for(let i =0; i < eventsObj.length; i++){

let EventName = eventsObj[i].event
let txInfo = await web3.eth.getTransaction(eventsObj[i].transactionHash)
let UserAddress = txInfo.from

switch(eventsObj[i].returnValues[0]){
  case bountyHash:
  bountyArray.push(UserAddress)
  break;

  case btcTalkHash:
  btcTalkArray.push(UserAddress)
  break;

      }
    }
  }

fs.writeFile("bounty.txt", bountyArray, (err) => {
  if (err) console.log(err)
  console.log("save bountyArray.")
})

fs.writeFile("btc_talc.txt", btcTalkArray, (err) => {
  if (err) console.log(err)
  console.log("save btcTalkArray.")
})

console.log(bountyArray.length)
console.log(btcTalkArray.length)
}

getUsers()
