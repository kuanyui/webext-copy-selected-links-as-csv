import { TypedMsg } from "./common";


async function copyLinks(tabId?: number): Promise<any> {
    if (tabId === undefined) { return }
    const tmsg: TypedMsg = { type: 'copySelectedLinks' }
    const sending = browser.tabs.sendMessage(tabId, tmsg)
    try {
        const res = await sending
    } catch (err) {
        console.error(err)
    }
}


browser.browserAction.onClicked.addListener(function (tab) {
    copyLinks(tab.id)
})


