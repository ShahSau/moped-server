"use strict";

const path = require("path");
const { readStorage, writeStorage } = require("./readWrite");
const {jsonStorageFile, adapterFile} = require("./storageConfig.json")

const filePath = path.join(__dirname, jsonStorageFile)
const {adapt} = path.join(__dirname, adapterFile)

//getting all
async function getAll(){
    return readStorage(filePath)
}

//get one with specific id
async function getOne(id){
    const data = await readStorage(filePath)
    const one =await data.find(mop=>mop.mopedId === id) || null
    return one
}

//adding 
async function addOne(newMoped){
    const data = await readStorage(filePath)
    data.push(adapt(newMoped))
    const added = await writeStorage(filePath, data)
    return added
}

//update
async function updateOne(updatedMoped){
    const data = await readStorage(filePath)
    const oldInfo = data.find(mop=>mop.mopedId === id) || null
    if(oldInfo !== null){
        Object.assign(oldInfo, adapt(updatedMoped))
        const updated = await writeStorage(filePath, data)
        return updated
    }
    return false
}


//delete
async function removeOne(id){
    const data = await readStorage(filePath)
    const nonRemoved = data.filter(moped =>moped.mopedId !== id)
    if(data.length> nonRemoved.length){
        const newData = await writeStorage(filePath, nonRemoved)
        return newData
    }
    return false
}

module.exports={
    getAll,
    getOne,
    addOne,
    updateOne,
    removeOne
}