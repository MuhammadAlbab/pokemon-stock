const PREFIX = "poke_";

export function setItem(key: string, data: object[]) {
  let formattedData = JSON.stringify(data);
  localStorage.setItem(PREFIX + key, formattedData);
}

export function removeItem(key: string) {
  localStorage.removeItem(PREFIX + key);
}

export function getItem(key: string) {
  let data: any = localStorage.getItem(PREFIX + key);
  if (data !== null) {
    return JSON.parse(data);
  }
  return null;
}
