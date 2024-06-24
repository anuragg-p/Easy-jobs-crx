export const wait = async (time: number) => {
  return new Promise((resolve, reject) => setTimeout(() => resolve(0), time))
}

export const execPromptAsync = async (
  prompt: string = "No Prompts supplied"
) => {
  let response: {
    success: boolean
    data: Array<string>
    errorLogs: Array<string>
    successLogs: Array<string>
  } = {
    success: false,
    data: [],
    errorLogs: [],
    successLogs: []
  }

  enum SELECTOR {
    QUERY_SELECTOR = "querySelector",
    QUERY_SELCTOR_ALL = "querySelectorAll",
    ELEMENT_BY_ID = "elementById",
    ELEMENT_BY_CLASS_NAME = "elementByClassName"
  }

  const SELECTOR_PROMPT_RESPONSE =
    "div.markdown.prose.w-full.break-words.dark\\:prose-invert.dark"
  const SELECTOR_SEND_BUTTON = 'button[data-testid="fruitjuice-send-button"]'
  const SELECTOR_STOP_BUTTON = 'button[data-testid="fruitjuice-stop-button"]'

  try {
    const promptResponseElements = document.querySelectorAll(
      SELECTOR_PROMPT_RESPONSE
    )
    const noOfElementsBeforePrompt = promptResponseElements?.length

    const getElement = (type: SELECTOR, selector: string, tag: string = "") => {
      let element
      switch (type) {
        case SELECTOR.QUERY_SELCTOR_ALL:
          element = document.querySelectorAll(selector)
          break
        case SELECTOR.QUERY_SELECTOR:
          element = document.querySelector(selector)
          break
        case SELECTOR.ELEMENT_BY_CLASS_NAME:
          element = document.getElementsByClassName(selector)
          break
        case SELECTOR.ELEMENT_BY_ID:
          element = document.getElementById(selector)
          break
      }
      if (!element) {
        throw new Error(
          `Element with selector: ${selector} not found, tag: ${tag}`
        )
      }
      return element
    }

    const textarea = getElement(
      SELECTOR.ELEMENT_BY_ID,
      "prompt-textarea",
      "TEXT AREA"
    )
    const sendButton = getElement(
      SELECTOR.QUERY_SELECTOR,
      SELECTOR_SEND_BUTTON,
      "SELECTOR SEND BUTTON"
    )

    if (textarea && sendButton) {
      //@ts-ignore
      textarea.value = prompt
      //@ts-ignore
      const event = new Event("input", { bubbles: true, cancelable: true })
      textarea.dispatchEvent(event)
      //@ts-ignore
      sendButton.click()
    } else {
      throw new Error("Textarea or button not found!")
    }

    const extractAndLogLastDivText = (document: Document) => {
      const promptResponseElements = getElement(
        SELECTOR.QUERY_SELCTOR_ALL,
        SELECTOR_PROMPT_RESPONSE,
        "PROMPT RESPONSE"
      )
      if (promptResponseElements.length === 0) {
        console.log("No div elements found with the specified classes.")
        return
      }
      const lastDiv = promptResponseElements[promptResponseElements.length - 1]
      function extractTextNodes(element) {
        let texts = []
        function recurseThroughDOM(node) {
          if (node.nodeType === 3) {
            const textContent = node.textContent.trim()
            if (textContent) {
              texts.push(textContent)
            }
          }
          node.childNodes.forEach((child) => recurseThroughDOM(child))
        }
        recurseThroughDOM(element)
        return texts
      }
      const textArray = extractTextNodes(lastDiv)
      return textArray
    }

    const loadComplete = new Promise((resolve) => {
      let intervalId = setInterval(() => {
        const updatedElements = getElement(
          SELECTOR.QUERY_SELCTOR_ALL,
          SELECTOR_PROMPT_RESPONSE,
          "PROMPT RESPONSE"
        )
        if (
          updatedElements.length === noOfElementsBeforePrompt + 1 &&
          //We will not be checking error here
          document.querySelector(SELECTOR_STOP_BUTTON) == null
        ) {
          clearInterval(intervalId)
          const textArray = extractAndLogLastDivText(window.document)
          resolve(
            //@ts-ignore
            (response = JSON.stringify({
              ...(response || {}),
              success: true,
              data: textArray
            }))
          )
        }
      }, 500)

      setTimeout(() => {
        clearInterval(intervalId)
        resolve(JSON.stringify(response))
      }, 10000)
    })

    await loadComplete
    return JSON.stringify(response)
  } catch (e) {
    console.log("⏩ e:", e)
    response.errorLogs.push(e?.message)
    return JSON.stringify(response)
  }
}

export const getChromeTabId = (url: string): any => {
  chrome.tabs.query({ url }, (tabs) => {
    if (tabs?.length > 0) {
      return tabs[0].id
    } else {
      return false
    }
  })
}

export const getElementsWithAClass = (document: Document, selector: string) => {
  const elements = document.querySelectorAll(selector)
  if (elements.length === 0) {
    console.log("No div elements found with the specified classes.")
    return
  }

  return elements
}

export const extractAndLogLastDivText = (document: Document) => {
  const selector =
    "div.markdown.prose.w-full.break-words.dark\\:prose-invert.dark"
  const divs = document.querySelectorAll(selector)
  if (divs.length === 0) {
    console.log("No div elements found with the specified classes.")
    return
  }
  const lastDiv = divs[divs.length - 1]
  function extractTextNodes(element) {
    let texts = []
    function recurseThroughDOM(node) {
      if (node.nodeType === 3) {
        const textContent = node.textContent.trim()
        if (textContent) {
          texts.push(textContent)
        }
      }
      node.childNodes.forEach((child) => recurseThroughDOM(child))
    }
    recurseThroughDOM(element)
    return texts
  }
  const textArray = extractTextNodes(lastDiv)
  return textArray
}

function updateTextInNestedElements(element) {
  if (element.hasChildNodes()) {
    element.childNodes.forEach((child) => updateTextInNestedElements(child))
  } else if (
    element.nodeType === Node.TEXT_NODE &&
    element.textContent.trim().length > 0
  ) {
    const textContent = element.textContent
    const regex = /help:\s*(.*?)\s*;/

    if (regex.test(textContent)) {
      console.log(`Original Text: '${textContent}'`)
      const newText = textContent.replace(regex, "wow it works!")
      element.textContent = newText
      console.log(`Updated Text: '${newText}'`)
    }
  }
}

function processActiveElement() {
  const activeElement = document.activeElement
  function updateTextInNestedElements(element) {
    if (element.hasChildNodes()) {
      element.childNodes.forEach((child) => updateTextInNestedElements(child))
    } else if (
      element.nodeType === Node.TEXT_NODE &&
      element.textContent.trim().length > 0
    ) {
      const textContent = element.textContent
      const regex = /help:\s*(.*?)\s*;/

      if (regex.test(textContent)) {
        console.log(`Original Text: '${textContent}'`)
        const newText = textContent.replace(regex, "wow it works!")
        element.textContent = newText
        console.log(`Updated Text: '${newText}'`)
      }
    }
  }

  updateTextInNestedElements(activeElement)
}

setInterval(processActiveElement, 500)

function runTextUpdater_2() {
  function updateTextInNestedElements(element) {
    if (element.hasChildNodes()) {
      element.childNodes.forEach((child) => updateTextInNestedElements(child))
    } else if (
      element.nodeType === Node.TEXT_NODE &&
      element.textContent.trim().length > 0
    ) {
      const textContent = element.textContent
      const regex = /help:\s*(.*?)\s*;/

      if (regex.test(textContent)) {
        console.log(`Original Text: '${textContent}'`)
        const newText = textContent.replace(regex, "wow it works!")
        element.textContent = newText
        console.log(`Updated Text: '${newText}'`)
      }
    }
  }

  function processActiveElement() {
    const activeElement = document.activeElement
    console.log(activeElement)
    updateTextInNestedElements(activeElement)
  }

  return setInterval(processActiveElement, 500)
}

function runTextUpdater() {
  function updateTextInNestedElements(element) {
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      const value = element.value
      const regex = /help:\s*(.*?)\s*;/

      if (regex.test(value)) {
        console.log(`Original Value: '${value}'`)
        const newValue = value.replace(regex, "wow it works!")
        element.value = newValue
        console.log(`Updated Value: '${newValue}'`)
      }
    } else if (element.hasChildNodes()) {
      element.childNodes.forEach((child) => updateTextInNestedElements(child))
    } else if (
      element.nodeType === Node.TEXT_NODE &&
      element.textContent.trim().length > 0
    ) {
      const textContent = element.textContent
      const regex = /help:\s*(.*?)\s*;/

      if (regex.test(textContent)) {
        console.log(`Original Text: '${textContent}'`)
        const newText = textContent.replace(regex, "wow it works!")
        element.textContent = newText
        console.log(`Updated Text: '${newText}'`)
      }
    }
  }

  function processActiveElement() {
    const activeElement = document.activeElement
    console.log(`Processing active element:`, activeElement)
    updateTextInNestedElements(activeElement)
  }

  return setInterval(processActiveElement, 500)
}

const intervalId = runTextUpdater()
