"use strict";
const { MESSAGES } = require("./statusCodes");
const {
  getAll,
  getOne,
  addOne,
  updateOne,
  removeOne,
} = require("./storageLayer");

module.exports = class DataStroage {
  getAll() {
    return getAll();
  }

  getOne(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("--empty--"));
      }
      const data = await getOne(id);
      if (data) {
        resolve(data);
      } else {
        reject(MESSAGES.NOT_FOUND(id));
      }
    });
  }
  insert(newObj) {
    return new Promise(async (resolve, reject) => {
      if (!newObj || !newObj.mopedId) {
        reject(MESSAGES.NOT_INSERTED());
      }
      const data = await getOne(newObj.mopedId);
      if (data) {
        reject(MESSAGES.ALREADY_IN_USE(newObj.mopedId));
      }
      if (await addOne(newObj)) {
        resolve(MESSAGES.INSERT_OK(newObj.mopedId));
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update(updateObj) {
    return new Promise(async (resolve, reject) => {
      if (!updateObj || !updateObj.mopedId) {
        reject(MESSAGES.NOT_UPDATED());
      }
      const data = await getOne(updateObj.mopedId);
      if (!data) {
        reject(MESSAGES.NOT_FOUND(updateObj.mopedId));
      }
      if (await updateOne(updateObj)) {
        resolve(MESSAGES.UPDATE_OK(updateObj.mopedId));
      } else {
        reject(MESSAGES.NOT_UPDATED());
      }
    });
  }

  remove(id){
      return new Promise(async(resolve,reject)=>{
          if(!id){
            reject(MESSAGES.NOT_FOUND("--empty--")); 
          }
          if(await removeOne(id)){
              resolve(MESSAGES.REMOVE_OK(id))
          }else{
              reject(MESSAGES.NOT_REMOVED(id))
          }
      })
  }
};
