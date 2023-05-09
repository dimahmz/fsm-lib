
export const setCookie= (name, value, days) => {

  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + days)

  const cookieValue = encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/; SameSite=Lax'

  document.cookie = name + '=' + cookieValue
}

export const removeCookie = (name) => {

  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

}

export const getCookie = (name) => {
    const cookies = document.cookie.split('; ')
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split('=')
      if (cookieName === name) {
        return decodeURIComponent(cookieValue)
      }
    }
    return null;
}