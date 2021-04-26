import { TypedMsg } from "./common";

browser.runtime.onMessage.addListener((_ev: any) => {
    const ev = _ev as TypedMsg
    if (ev.type === 'copySelectedLinks') {
        copySelectedLinksIntoClipboard()
    }
})

function copySelectedLinksIntoClipboard() {
    const links = getLinksFromSelection()
    if (links === null) { return }
    const formatted: string = links.map(x => `${x.href}`).join('\n')
    if (location.protocol !== 'https:') {
        alert('Note: due to the security limit of browser, only HTTPS page can copy text. Aborted.')
    } else {
        navigator.clipboard.writeText(formatted)
        alert(`${links.length} link${links.length ? 's' : ''} copied!`)
    }
}

interface Link {
    text: string
    href: string
}

function getLinksFromSelection(): Link[] | null {
    const selection = window.getSelection()
    const fin: Link[] = []
    if (!selection) {
        alert('Please select text first!')
        return null
    }
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0)
        var div = document.createElement('DIV')
        div.appendChild(range.cloneContents())
        var links = div.getElementsByTagName("A")
        for (var i = 0; i < links.length; i++) {
            const a = links[i] as HTMLLinkElement
            fin.push({
                href: a.href,
                text: a.innerText,
            })
        }
    }
    if (fin.length === 0) {
        alert('No link found in selection area.')
        return null
    }
    return fin
}