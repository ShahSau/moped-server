"use strict";
//requiring fs.promise which is an alternative set of asynchronous file system methods that return Promise
const fs = require("fs").promises;

//reading data from storage
async function readStorage(path) {
  try {
    const data = fs.readFile(path, "utf8");
    return JSON.parse(data); // converting from JSON format to javascript object
  } catch (err) {
    console.log(err.message);
    return []; //if error return empty array
  }
}

//writing data to storage
async function writeStorage(path, data){
    try{
        //converting javascript to json format and while converting, inserting 4 space characters for each white space
        await fs.writeFile(path, JSON.stringify(data,null,4),{
            encoding:"utf8",
            flag:"w"
        })
        return true
    }catch(err){
        console.log(err.message);
        return false
    }
}
