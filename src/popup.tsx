import cssText from "data-text:~style.css"

import { CountButton } from "~features/count-button"

import "~style.css"

import Options from "./options"

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center h-[400px] w-[400px]">
      <Options />
    </div>
  )
}

export default IndexPopup
