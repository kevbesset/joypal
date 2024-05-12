export function getFromStorage(storageKey: string) {
  const localItem = localStorage.getItem(storageKey);

  if (!localItem) return null;

  const item = JSON.parse(localItem);

  if (item.expiration) {
    const now = Date.now();

    if (now > item.expiration) {
      return deleteFromStorage(storageKey);
    }
  }

  return item.value;
}

export function setFromStorage(
  storageKey: string,
  value: unknown,
  expiration?: number
) {
  const now = Date.now();

  const item = {
    value,
    expiration: expiration && now + expiration,
  };

  localStorage.setItem(storageKey, JSON.stringify(item));
}

export function deleteFromStorage(storageKey: string) {
  localStorage.removeItem(storageKey);

  return null;
}
