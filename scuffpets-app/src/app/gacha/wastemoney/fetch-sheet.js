import axios from 'axios'
import { promises as fs } from 'fs';
import util  from 'util'

const readFile = util.promisify(fs.readFile);

// Fetch data from google sheets
export async function fetchGoogleSheets() {
  // Google Sheets API consts
  const SHEET_ID = process.env.GACHA_SHEET_ID
  const SHEET_NAME = 'gachas'
  const API_KEY = process.env.SHEET_API_KEY
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`

  // image loading consts
  const IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];
  const IMAGE_PATH = ['/img/gachapics/']
  const ERROR_IMAGE = 'https://images-ext-2.discordapp.net/external/8yASqYbZYWRCIK_14U-tZwCglJZ7DGNrWB94DASuRTk/https/cdn.discordapp.com/emojis/955646373246672966.png?width=160&height=160'

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
          imgLink: ERROR_IMAGE
        }

        IMAGE_FORMATS.forEach(function (imgFormat) {
          const path = IMAGE_PATH + formattedCharacterData.name + imgFormat;
          fs.exists(path, (exists) => {
            if (exists) {
              if (formattedCharacterData.imgLink != ERROR_IMAGE) {
                console.log("U DONE FUCKED UP IN src\\app\\gacha\\wastemoney\\fetch-sheet.js:fetchGoogleSheets: duplicate images for %s", formattedCharacterData.name);
              }
              formattedCharacterData.imgLink = path;
            }
          })
        });
        if (formattedCharacterData.imgLink === ERROR_IMAGE) {
          console.log("U DONE FUCKED UP IN src\\app\\gacha\\wastemoney\\fetch-sheet.js:fetchGoogleSheets: no image for %s", formattedCharacterData.name);
        }

        switch (characterData[3]) {
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