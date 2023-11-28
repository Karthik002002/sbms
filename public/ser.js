// const urlB64ToUint8Array = (base64String) => {
//     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     const base64 = (base64String + padding)
//       .replace(/\-/g, "+")
//       .replace(/_/g, "/");
//     const rawData = atob(base64);
//     const outputArray = new Uint8Array(rawData.length);
//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   };

//   const requestNotificationPermission = async () => {
//     const permission = await window.Notification.requestPermission();
//     // value of permission can be 'granted', 'default', 'denied'
//     // granted: user has accepted the request
//     // default: user has dismissed the notification permission popup by clicking on x
//     // denied: user has denied the request.
//     if (permission !== "granted") {
//       throw new Error("Permission not granted for Notification");
//     }
//   };

//   async function checkSubscription() {
//     if ("serviceWorker" in navigator) {
//       try {
//         const registration = await navigator.serviceWorker.register("sw.js");
//         const subscription = await registration.pushManager.getSubscription();
//         const permission = await requestNotificationPermission();
//         console.log(registration);
//         if (subscription) {
//           console.log("Subscription already exists:", subscription);

//         } else {
//           await subscribeUserToPush(registration);
//         }
//       } catch (error) {
//         console.error("Error during service worker registration:", error);
//       }
//     }
//   }

//   async function subscribeUserToPush(registration) {
//     try {
//       const applicationServerKey = urlB64ToUint8Array(
//         "BM-hl4OTmVmVuFXEyygr6Y9aP1je7-CP4ANmeIVRHb4sTXBxpxcZVUi28HuZSq3yPWtj55-lMlWV5fahN9_mutc"
//       );
//       const subscription = await registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: applicationServerKey,
//       });

//     //   await sendSubscriptionToServer(subscription);
//     //   console.log(JSON.stringify(subscription))
//       window.sessionStorage.setItem(
//         "serviceWorker",
//         JSON.stringify(subscription)
//       )

//     } catch (error) {
//       console.error("Error subscribing to push notifications:", error);
//     }
//   }

//   // Call checkSubscription to initiate the process
//   checkSubscription();
