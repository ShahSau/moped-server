"use strict"

//the function ensures mopedId,topspeed and itemsInStock are number
const adapt=(item)=>{
    return {
        mopedId:+item.mopedId,
        name:item.name,
        rating:item.rating,
        topspeed:+item.topspeed,
        itemsInStock:+item.itemsInStock
    }
}
module.exports={ adapt }