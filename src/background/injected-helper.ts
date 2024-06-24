export default function windowChanger() {
  const anotherFunc = (): number => {
    return 42
  }

  // Here's an example where we can reference the window object
  // @ts-ignore
  window.hello = {
    world: "from injected content script",

    coolNumber: anotherFunc()
  }

  // Here's an example where we show you can reference the DOM
  // This console.log will show within the tab you injected into
  console.log(document.getElementsByTagName("html"))
}
