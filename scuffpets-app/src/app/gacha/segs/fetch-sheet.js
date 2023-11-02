import axios from 'axios'
import fs from 'fs';
import util  from 'util'

const defaultImage = 'https://images-ext-2.discordapp.net/external/8yASqYbZYWRCIK_14U-tZwCglJZ7DGNrWB94DASuRTk/https/cdn.discordapp.com/emojis/955646373246672966.png?width=160&height=160'

function findGachaImage(dir, name) {
  var extensions = ['.png', '.jpg', '.jpeg', '.webp']
  for (var idx = 0; idx < extensions.length; idx++) {
    var fullPath = dir.concat('/', name, extensions[idx])
    if (fs.existsSync(fullPath)) {
      return fullPath.slice(8)
    }
  }
  console.log("U DONE FUCKED UP IN src\\app\\gacha\\wastemoney\\fetch-sheet.js:findGachaImage: Image for ".concat(name," not found"))
  return defaultImage
}

// Fetch data from google sheets
export async function fetchGoogleSheets() {
  const SHEET_ID = process.env.GACHA_SHEET_ID
  const SHEET_NAME = 'gachas'
  const API_KEY = process.env.SHEET_API_KEY
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`

  // Get sheet values
  axios.get(url)
  .then(function (response) {
      // Handle fetch success
      var sheetResponse = response.data.values
      
      var oneStars = []
      var twoStars = []
      var threeStars = []
      var fourStars = []
      var fiveStars = []

      // Append characters to their star ratings list
      // ***Currently no character imgs yet, using a placeholder atm***
      for (var idx = 1; idx < sheetResponse.length; idx++) {
        var characterData = sheetResponse[idx].slice(0, 4)
        var formattedCharacterData = {
          name: characterData[0],
          numStars: characterData[3],
          type1: characterData[1],
          type2: characterData[2],
          imgLink: findGachaImage('./public/imgs/gachapics', characterData[0])
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

      // Save character list as a local file
      fs.writeFile(process.env.GACHA_POOL_PATH, JSON.stringify(pool), (err) => {
          if (err) console.log('Error writing file:', err)
      })
  })
}