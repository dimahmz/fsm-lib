import { redirect } from "react-router-dom"
import SLEEP from '../sleep.js'

export async function destroy({ params }) {
  await SLEEP(2000)
  console.log(params)
  return redirect("/")
}
