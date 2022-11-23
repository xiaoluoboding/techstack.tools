import satori from 'satori'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const shareTechArrayBuffer = fs.readFileSync(
    path.resolve('./public/ShareTech-Regular.ttf')
  )

  const svg = await satori(
    {
      type: 'div',
      props: {
        children: {
          type: 'div',
          props: {
            tw: 'flex flex-col bg-white p-8 rounded-2xl',
            children: [
              {
                type: 'div',
                props: {
                  children: query.title,
                  tw: 'text-4xl text-center'
                }
              },
              {
                type: 'div',
                props: {
                  children: [
                    {
                      type: 'label',
                      props: {
                        children: `#${query.issue}`,
                        tw: 'text-2xl'
                      }
                    },
                    {
                      type: 'strong',
                      props: {
                        children: 'Tech Stack Collection',
                        tw: 'text-2xl'
                      }
                    }
                  ],
                  tw: 'flex w-full justify-between mt-12'
                }
              }
            ]
          }
        },
        style: {
          backgroundImage: 'linear-gradient(135deg, #8b5cf6,  #c4b5fd)'
        },
        tw: 'flex text-slate-800 px-8 py-12 font-900 rounded-lg'
      }
    },
    {
      width: 640,
      height: 360,
      fonts: [
        {
          name: 'ShareTech',
          data: shareTechArrayBuffer,
          weight: 400,
          style: 'normal'
        }
      ]
    }
  )

  event.res.setHeader('Content-Type', 'image/svg+xml')
  event.res.setHeader('Cache-Control', 's-maxage=86400')

  return svg
})
