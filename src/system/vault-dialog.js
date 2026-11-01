import { ShowDialogWindow } from "../shared/components/dialog-window.js";
import { ICONS } from "../config/icons.js";

/**
 * Prompts user for the Project X vault password.
 * Returns Promise<boolean> (true if unlocked or correct password entered)
 */
export function checkProjectXAccess() {
  if (window._projectXUnlocked) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const container = document.createElement("div");
    container.style.padding = "10px";
    container.style.fontSize = "12px";

    const promptText = document.createElement("p");
    promptText.style.margin = "0 0 10px 0";
    promptText.innerHTML = "<b>CONFIDENTIAL - RESTRICTED ACCESS</b><br>This directory is protected by Rahul's custom encryption layer.<br>Enter the security passcode:";
    container.appendChild(promptText);

    const input = document.createElement("input");
    input.type = "password";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";
    input.style.padding = "4px";
    input.style.marginBottom = "8px";
    input.placeholder = "Enter passcode...";
    container.appendChild(input);

    const hintText = document.createElement("div");
    hintText.style.fontSize = "11px";
    hintText.style.color = "#555";
    hintText.style.fontStyle = "italic";
    hintText.textContent = "Hint: [Year world ends in Y2K] + [favorite canteen snack from mom's email]";
    container.appendChild(hintText);

    let dialogWin = null;

    const handleSuccess = () => {
      window._projectXUnlocked = true;
      if (dialogWin) dialogWin.close();
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("clue-discovered", {
            detail: {
              id: "clue-project-x",
              title: "Vault Breached: Unlocked Project X",
            },
          })
        );
      }
      resolve(true);
    };

    const handleFail = () => {
      if (dialogWin) dialogWin.close();
      ShowDialogWindow({
        title: "Access Denied",
        text: "INCORRECT PASSCODE!\nAccess to Project X denied.\nCheck passwords.txt and mom_email_draft.txt for the clue.",
        icons: ICONS.warning,
        buttons: [{ label: "OK", action: (w) => w.close() }],
      });
      resolve(false);
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (input.value.trim().toLowerCase() === "2000samosa") {
          handleSuccess();
        } else {
          handleFail();
        }
      }
    });

    dialogWin = ShowDialogWindow({
      title: "Enter Project X Passcode",
      content: container,
      modal: true,
      buttons: [
        {
          label: "Unlock",
          isDefault: true,
          action: () => {
            if (input.value.trim().toLowerCase() === "2000samosa") {
              handleSuccess();
            } else {
              handleFail();
            }
          },
        },
        {
          label: "Cancel",
          action: (w) => {
            w.close();
            resolve(false);
          },
        },
      ],
    });

    setTimeout(() => input.focus(), 100);
  });
}
