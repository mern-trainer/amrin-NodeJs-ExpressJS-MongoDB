const storageKey = "___access_token___"

export const storage = {
    set: (token) => localStorage.setItem(storageKey, token),
    get: () => localStorage.getItem(storageKey) || null,
    remove: () => localStorage.removeItem(storageKey)
}