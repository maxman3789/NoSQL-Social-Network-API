// researched tips on populating data https://stackoverflow.com/questions/2805613/creating-populating-javascript-custom-object
// https://stackoverflow.com/questions/21076460/how-to-convert-a-string-to-objectid-in-nodejs-mongodb-native-driver
// https://www.mongodb.com/community/forums/t/mongodb-nodejs-driver-objectid-tostring-acts-as-objectid-valueof-and-vice-versa/129147

const ObjectId = require('mongodb').ObjectId;

const reactions = ["happy", "mad", "sad", "glad", "lively", "shocked"];

const userData = [
  {
    "_id": ObjectId("62030f6c64fba167d8adc058"),
    "username": "Mike",
    "email": "Mike@gmail.com",
    "thoughts": [
      ObjectId("62030f6c64fba167d8adc052"),
      ObjectId("62030f6c64fba167d8adc053")
    ],
    "friends": [
      ObjectId("62030f6c64fba167d8adc05c"),
      ObjectId("62030f6c64fba167d8adc05b")
    ]
  },
  {
    "_id": ObjectId("62030f6c64fba167d8adc059"),
    "username": "Jeff",
    "email": "Jeff@gmail.com",
    "thoughts": [
      ObjectId("62030f6c64fba167d8adc054")
    ],
    "friends": [
      ObjectId("62030f6c64fba167d8adc05c")
    ]
  },
  {
    "_id": ObjectId("62030f6c64fba167d8adc05a"),
    "username": "Matt",
    "email": "Matt@gmail.com",
    "thoughts": [
      ObjectId("62030f6c64fba167d8adc055")
    ],
    "friends": [
      ObjectId("62030f6c64fba167d8adc05c")
    ]
  },
  {
    "_id": ObjectId("62030f6c64fba167d8adc05b"),
    "username": "Sam",
    "email": "Sam@gmail.com",
    "thoughts": [],
    "friends": [
      ObjectId("62030f6c64fba167d8adc058")
    ]
  },
  {
    "_id": ObjectId("62030f6c64fba167d8adc05c"),
    "username": "James",
    "email": "James@gmail.com",
    "thoughts": [
      ObjectId("62030f6c64fba167d8adc056")
    ],
    "friends": [
      ObjectId("62030f6c64fba167d8adc058"),
      ObjectId("62030f6c64fba167d8adc059"),
      ObjectId("62030f6c64fba167d8adc05a")
    ]
  }
]

const thoughtData = [
  {
    "_id": ObjectId("62030f6c64fba167d8adc052"),
    "thoughtText": "It's hot today",
    "username": "Mike",
    "reactions": reactions[0]
  },
  {
    "_id": ObjectId("62030f6c64fba167d8adc053"),
    "thoughtText": "Someone turn on the fan please",
    "username": "Mike",
    "reactions": reactions[1]
  },
  {
    "_id": ObjectId("62030f6c64fba167d8adc054"),
    "thoughtText": "I want to go the zoo",
    "username": "Jeff",
    "reactions": reactions[2]
  },
  {
    "_id": ObjectId("62030f6c64fba167d8adc055"),
    "thoughtText": "Howdy",
    "username": "Matt",
    "reactions": reactions[3]
  },
  {
    "_id": ObjectId("62030f6c64fba167d8adc056"),
    "thoughtText": "Time to finish this",
    "username": "James",
    "reactions": reactions[4]
  }
]

module.exports = { userData, thoughtData };