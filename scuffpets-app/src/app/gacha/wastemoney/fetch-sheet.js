import axios from 'axios'
import fs from 'fs'

export async function fetchGoogleSheets() {
  const SHEET_ID = process.env.GACHA_SHEET_ID
  const SHEET_NAME = 'gachas'
  const API_KEY = process.env.SHEET_API_KEY
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`

  // Get sheet values
  axios.get(url)
  .then(function (response) {
      // Handle success
      var sheetResponse = response.data.values
      
      var oneStars = []
      var twoStars = []
      var threeStars = []
      var fourStars = []
      var fiveStars = []
      for (var idx = 1; idx < sheetResponse.length; idx++) {
        var characterData = sheetResponse[idx].slice(0, 4)
        var formattedCharacterData = {
          name: characterData[0],
          numStars: characterData[3],
          type1: characterData[1],
          type2: characterData[2],
          imgLink: undefined
        }
        switch(characterData[3]) {
          case '1':
            oneStars.push(formattedCharacterData)
            break
          case '2':
            twoStars.push(formattedCharacterData)
            break
          case '3':
            threeStars.push(formattedCharacterData)
            break
          case '4':
            fourStars.push(formattedCharacterData)
            break
          case '5':
            fiveStars.push(formattedCharacterData)
            break
          default:
            console.log("U DONE FUCKED UP IN src\\app\\gacha\\wastemoney\\fetch-sheet.js:fetchPool: numStars was %d", characterData[3]);
        }
      }

      var pool = {
        oneStars: oneStars,
        twoStars: twoStars,
        threeStars: threeStars,
        fourStars: fourStars,
        fiveStars: fiveStars
      }
      console.log(oneStars)

      fs.writeFile(process.env.GACHA_POOL_PATH, JSON.stringify(pool), (err) => {
          if (err) console.log('Error writing file:', err)
      })
  })
}

export function getPool(callback) {
  fs.readFile(process.env.GACHA_POOL_PATH, 'utf8', (err, jsonString) => {
      if (err) {
          return
      }
      try {
          const pool = JSON.parse(jsonString)
          callback(pool)
  } catch(err) {
          console.log('Error parsing JSON string:', err)
      }
  })
}