function showWelcomeNotification() {
  if (!localStorage.getItem("@gustavoilhamorais#welcomeNotification")) {
    localStorage.setItem("@gustavoilhamorais#welcomeNotification", true);
    const notification = new Notification("New massage from Gus!", {
      body: "Hello, friend! Hope you enjoy the news.",
    });
  }
}

if (Notification.permission === "granted") {
  showWelcomeNotification();
} else if (Notification.permission !== "denied") {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      showWelcomeNotification();
    }
  });
}