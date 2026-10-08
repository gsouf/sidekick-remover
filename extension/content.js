(()=>{let e=document.createElement(`style`);e.textContent=`
    [data-polaris-frame-global-ribbon="true"] {
      display: none !important;
    }
  `;function t(t){if(!t){e.remove();return}e.isConnected||document.documentElement.append(e)}chrome.storage.onChanged.addListener(e=>{e.enabled&&t(e.enabled.newValue!==!1)}),chrome.storage.local.get({enabled:!0}).then(({enabled:e})=>{t(e!==!1)})})();