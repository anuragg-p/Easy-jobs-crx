import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*", "https://chatgpt.com/*"]
}

window.addEventListener("load", () => {
  // const textarea = document.getElementById("prompt-textarea")
  // // console.log(textarea)
  // if (textarea) {
  //   // textarea.value = "Testing"
  //   setTimeout(() => {
  //     //@ts-ignore
  //     textarea.value = "Testing"
  //   }, 3000)
  //   //@ts-ignore
  //   textarea.value = "Testing"
  //   if (false) {
  //     const event = new Event("input", {
  //       bubbles: true,
  //       cancelable: true
  //     })
  //     textarea.dispatchEvent(event)
  //   }
  //   console.log("here is text area", textarea)
  // }
  // console.log(
  //   "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
  // )
})
