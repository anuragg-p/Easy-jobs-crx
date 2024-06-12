import cssText from "data-text:~style.css"

import { CountButton } from "~features/count-button"

import "~style.css"

import Options from "./options.tsx"

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-[400px] plasmo-w-[400px]">
      <Options />
    </div>
  )
}

export default IndexPopup
