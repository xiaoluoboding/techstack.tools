export const getBase64Image = (url: string): Promise<string> => {
  const img = new Image()
  // img.setAttribute("crossOrigin", 'anonymous');
  img.crossOrigin = 'anonymous'
  img.src = url
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL())
    }
    img.onerror = (error) => {
      reject(error)
    }
  })
}

export function isMobile(): boolean {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ]

  return toMatch.some((toMatchItem: RegExp) => {
    return navigator.userAgent.match(toMatchItem)
  })
}
