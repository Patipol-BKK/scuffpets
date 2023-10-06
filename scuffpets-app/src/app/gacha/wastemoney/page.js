import { PageLayout } from './page-layout.js'

// Import for checking local gacha pool data
import fs from 'fs'
import { fetchGoogleSheets } from './fetch-sheet.js'


export default function Page() {

  // If local gacha pool data doesn't exist, fetch from google sheets and save as pool.json
  // Webserver needs reloading bc the .json file is read using import
  if (!fs.existsSync(process.env.GACHA_POOL_PATH)) {
      console.log('Gacha pool does not exist, fetching from Google Sheets...')
      fetchGoogleSheets()
  }

  return (
    <PageLayout />
    )
}