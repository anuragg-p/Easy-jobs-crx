import AuthForm from "~components/AuthForm"

import "./style.css"

import useFirebaseUser from "~firebase/useFirebaseUser"
import { execPromptAsync } from "~scripts"
import { urlMatchingPatterns } from "~utils/general"

export default function Options() {
  const { user, isLoading, onLogin, onLogout } = useFirebaseUser()

  const logout = async (e: any) => {
    console.log("Clicked on logout")
    e.preventDefault()
    try {
      await onLogout()
    } catch (error: any) {
      console.log(error.message)
    }
  }

  function receiveText(resultsArray) {
    const parsedResponse = JSON.parse(JSON.parse(resultsArray[0]?.result))
    const data = parsedResponse?.data || []
    const errorLogs = parsedResponse?.errorLogs
    console.log("⏩ data:", data)
    console.log("⏩ errorLogs:", errorLogs)
  }

  const executePrompt = async (prompt: string = "Tell me a joke") => {
    chrome.tabs.query({ url: urlMatchingPatterns.openAi }, async (tabs) => {
      if (tabs?.length > 0) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            func: execPromptAsync,
            args: [prompt]
          },
          receiveText
        )
      } else {
        console.log("No tabs match the specified criteria.")
      }
    })
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-10">
      <div className="text-white flex flex-col space-y-10 items-center justify-center">
        {/* {!user && <AuthForm />} */}
        {/* {user && <div>You're signed in! Woo</div>} */}
        {/* {user && ( */}
        {/*   <div */}
        {/*     className="w-[40px] h-[20px] hover:cursor-pointer border" */}
        {/*     onClick={logout}> */}
        {/*     Signout */}
        {/*   </div> */}
        {/* )} */}
        <div>Hello world</div>
        <div
          className="hover:cursor-pointer "
          onClick={() => executePrompt("Tell me a joke")}>
          Execute script
        </div>
        <a
          href={`chrome-extension://iilodikalfhbmdecocpjbjbhellifoof/tabs/info.html`}
          target="_blank">
          Click here to get info
        </a>
      </div>
    </div>
  )
}
