const urlB64ToUint8Array = base64String => {
  const padding     = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64      = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData     = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
const saveSubscription = async subscription => {
  const SERVER_URL = 'https://api.gustavoilhamorais.com.br/save-subscription';
  const response = await fetch(SERVER_URL, {
    method: 'post',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json()
}
self.addEventListener('activate', async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array('BDAF6f9WypTVn2kMEbaD6vVnjbI8Kc2MZQIwAvHrfkgUpW4WFNHKv9PB4vFganDuFX87y8Xup_Tg3ou3iQY-eX8')
    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    await saveSubscription(subscription)
  } catch (err) {
    console.log('Error', err)
  }
})
self.addEventListener('push', function(event) {
  console.log(event);
  if (event.data) {
    console.log('Push event!! ', event.data.text())
    showLocalNotification('Yolo', event.data.text(), self.registration)
  } else {
    console.log('Push event but no data')
  }
})
const showLocalNotification = (title, body, swRegistration) => {
  const options = { body }
  swRegistration.showNotification(title, options)
}