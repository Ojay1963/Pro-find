let initialized = false
let deferredPrompt = null
let isInstalled = false
const listeners = new Set()
const INSTALLED_FLAG_KEY = 'profind_app_installed'

const detectIos = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent)
const detectStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || Boolean(window.navigator.standalone)
const readInstalledFlag = () => localStorage.getItem(INSTALLED_FLAG_KEY) === '1'
const writeInstalledFlag = () => localStorage.setItem(INSTALLED_FLAG_KEY, '1')

const emit = () => {
  const snapshot = getInstallState()
  listeners.forEach((listener) => listener(snapshot))
}

export const getInstallState = () => ({
  canPrompt: Boolean(deferredPrompt),
  isInstalled,
  isIos: typeof window !== 'undefined' ? detectIos() : false
})

export const initInstallPrompt = () => {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  isInstalled = detectStandalone() || readInstalledFlag()
  if (isInstalled) writeInstalledFlag()

  window.addEventListener('beforeinstallprompt', (event) => {
    if (isInstalled) return
    event.preventDefault()
    deferredPrompt = event
    emit()
  })

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    isInstalled = true
    writeInstalledFlag()
    emit()
  })
}

export const subscribeInstallState = (listener) => {
  initInstallPrompt()
  listeners.add(listener)
  listener(getInstallState())
  return () => listeners.delete(listener)
}

export const promptInstall = async () => {
  if (!deferredPrompt) return { status: 'unavailable' }
  deferredPrompt.prompt()
  const choice = await deferredPrompt.userChoice
  if (choice?.outcome === 'accepted') {
    deferredPrompt = null
  }
  emit()
  return { status: choice?.outcome === 'accepted' ? 'accepted' : 'dismissed' }
}
