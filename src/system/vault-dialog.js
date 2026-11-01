export function checkProjectXAccess() {
  const expected = "2000samosa";
  const entered = window.prompt("PROJECT_X VAULT - Enter passcode:", "");
  if (entered === null) return false;
  if (entered.trim().toLowerCase() === expected) {
    return true;
  }
  alert("ACCESS DENIED. Incorrect passcode.");
  return false;
}
