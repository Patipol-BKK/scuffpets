// Import for checking local gacha pool data
import fs from 'fs'
import { fetchGoogleSheets } from '../wastemoney/fetch-sheet.js'

// Updates the local pool whenever this page is accessed
export default function Page() {
  fetchGoogleSheets()
}