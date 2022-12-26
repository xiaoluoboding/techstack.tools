export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const URL = `https://get-metafy.netlify.app/.netlify/functions/api?url=${query.url}`

  console.log(query.url)
  let [res, message] = [null, null]

  const response = await fetch(URL, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })

  res = await response.json()
  // console.log(res)

  event.res.setHeader('Content-Type', 'application/json')

  return {
    data: res,
    error: !!message,
    message
  }
})
