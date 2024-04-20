import React from 'react'
import Standard from '@/components/Standard'


declare global {
  interface Window {
    BeforeInstallPromptEvent: any;
  }
}
function Try() {

  const handleInstallClick = () => {
   // ...
console.log("install button clicked");
   if ("serviceWorker" in navigator) {
    console.log("service worker is available");
     window.addEventListener("beforeinstallprompt", (event: any) => {
        console.log("beforeinstallprompt fired");
       event.preventDefault();
       const installPromptEvent = event as any;
       installPromptEvent.prompt();
       installPromptEvent.userChoice.then(
         (choiceResult: { outcome: string }) => {
           if (choiceResult.outcome === "accepted") {
             console.log("User accepted the install prompt");
           } else {
             console.log("User dismissed the install prompt");
           }
         }
       );
     });
   }
 };

  return (
    <>
      {/* <Standard name="ksjf" /> */}
      <button id="installApp" onClick={handleInstallClick}>Install</button>
    </>
  );
}

export default Try