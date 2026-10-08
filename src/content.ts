(() => {
  const style = document.createElement('style')
  style.textContent = `
    [data-polaris-frame-global-ribbon="true"] {
      display: none !important;
    }
  `

  function setEnabled(enabled: boolean) {
    if (!enabled) {
      style.remove()
      return
    }
    if (!style.isConnected) {
      document.documentElement.append(style)
    }
  }

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
      setEnabled(changes.enabled.newValue !== false)
    }
  })

  chrome.storage.local.get({ enabled: true }).then(({ enabled }) => {
    setEnabled(enabled !== false)
  })
})()
