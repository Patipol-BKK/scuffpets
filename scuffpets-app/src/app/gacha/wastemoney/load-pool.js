import fs from 'fs'

export function checkLocalPool() {
  if (!fs.existsSync(process.env.GACHA_POOL_PATH)) {
      console.log('Gacha pool does not exist, fetching from Google Sheets...')
      fetchGoogleSheets()
  }
}