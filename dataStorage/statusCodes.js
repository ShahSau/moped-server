"use strict";

const CODES = {
  PROGRAM_ERROR: 0,
  NOT_FOUND: 1,
  INSERT_OK: 2,
  NOT_INSERTED: 3,
  ALREADY_IN_USE: 4,
  REMOVE_OK: 5,
  NOT_REMOVED: 6,
  UPDATE_OK: 7,
  NOT_UPDATED: 8,
};

const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "sorry! There is an error in the program",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }),
  NOT_FOUND: (id) => ({
    message: `Sorry, moped with id: ${id} not found!`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  INSERT_OK: (id) => ({
    message: `Moped with id:${id} is added.`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
  NOT_INSERTED: () => ({
    message: "Something went wrong, Moped with id:${id} is notadded!",
    code: CODES.NOT_INSERTED,
    type: "error",
  }),
  ALREADY_IN_USE: (id) => ({
    message: `This id ${id} is already in use`,
    code: CODES.ALREADY_IN_USE,
    type: "error",
  }),
  REMOVE_OK: (id) => ({
    message: `Moped with id ${id} is removed successfully`,
    code: CODES.REMOVE_OK,
    type: "info",
  }),
  NOT_REMOVED: (id) => ({
    message: `Nothing is removed as no moped found with this Id ${id}, please check the Id`,
    code: CODES.NOT_REMOVED,
    type: "error",
  }),
  UPDATE_OK: (id) => ({
    message: `Info of moped with id${id} updated`,
    code: CODES.UPDATE_OK,
    type: "info",
  }),
  NOT_UPDATED: () => ({
    message: `Data was not updated`,
    code: CODES.NOT_UPDATED,
    type: "error",
  }),
};

module.exports = { CODES, MESSAGES };
