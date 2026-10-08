import { render } from 'preact'
import { useEffect, useState } from 'preact/hooks'

function Popup() {
  const [ready, setReady] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [saving, setSaving] = useState(false)
  const status = enabled ? 'Sidekick removed' : 'Extension disabled'

  useEffect(() => {
    chrome.storage.local.get({ enabled: true }).then(({ enabled }) => {
      setEnabled(enabled !== false)
      setReady(true)
    })
  }, [])

  async function updateEnabled(nextEnabled: boolean) {
    setSaving(true)

    try {
      await chrome.storage.local.set({ enabled: nextEnabled })
      setEnabled(nextEnabled)
    }
    finally {
      setSaving(false)
    }
  }

  if (!ready) {
    return null
  }

  return (
    <div class="flex flex-col divide-y divide-neutral-800">
      <button
        class={`${enabled ? 'text-green-200' : 'text-neutral-200'} flex w-full cursor-pointer flex-col items-center justify-center gap-2 py-6 hover:bg-neutral-900`}
        type="button"
        disabled={saving}
        onClick={() => updateEnabled(!enabled)}
      >
        <svg class="size-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="m16.56 5.44l-1.45 1.45A5.97 5.97 0 0 1 18 12a6 6 0 0 1-6 6a6 6 0 0 1-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.96 7.96 0 0 0 4 12a8 8 0 0 0 8 8a8 8 0 0 0 8-8c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2" />
        </svg>
        <div class="text-sm font-medium">{status}</div>
      </button>
      <a
        class="flex flex-col gap-1 px-6 py-4 text-xs text-neutral-400 hover:bg-neutral-900"
        href="https://github.com/tobiasdalhof/sidekick-remover"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="flex gap-1 font-medium text-neutral-200">
          <div>GitHub</div>
          <div>↗</div>
        </div>
        <div>View source code and report issues.</div>
      </a>
      <a
        class="flex flex-col gap-1 px-6 py-4 text-xs text-neutral-400 hover:bg-neutral-900"
        href="https://apps.shopify.com/delm?utm_source=sidekick_remover&utm_medium=browser_extension&utm_campaign=delm_promotion&utm_content=popup_footer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="flex gap-1 font-medium text-neutral-200">
          <div>Delm</div>
          <div>↗</div>
        </div>
        <div>Show estimated delivery dates to drive conversions.</div>
      </a>
    </div>
  )
}

render(<Popup />, document.getElementById('app')!)
