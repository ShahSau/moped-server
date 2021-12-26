"use strict"

//the function ensures mopedId,topspeed and itemsInStock are number
function adapt(item){
    return Object.assign(item,{
        mopedId:+item.mopedId,
        topspeed:+item.topspeed,
        itemsInStock:+item.itemsInStock
    })
}
module.exports={adapt}