const web3 = require('./web3')


/**
 * This function return event object of certain event hapen in the interim fromBlock to Latest
 * @param {ETH address} address  .
 * @param {Contract ABI} abi.
 * @param {ETH block number} fromBlock set certain FromBlock.
 * @param {eventName} eventName set certain event name like Deposit, Trade ect.
 */

module.exports = async (address, abi, fromBlock, eventName) => {
const isAddress =	web3.utils.isAddress(address)
if(isAddress){
const contract = new web3.eth.Contract(abi, address)

 try {
   let getEvent = await contract.getPastEvents(
    eventName,
    {
      fromBlock: fromBlock,
      toBlock: 'latest'
    }
   )
  return getEvent
  }
  catch(err){
  return new Error(err);
}
}
else{
	return new Error("Not correct address");
}
}
