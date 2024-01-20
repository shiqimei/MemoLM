import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const API_BASE = 'https://openapi.wolai.com/v1'

async function getAccessToken() {
  const body = {
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET
  }
  const resp = await fetch(`${API_BASE}/token`, {
    method: 'POST',
    body: JSON.stringify(body)
  })
  const { data } = await resp.json()
  return data
}

async function getBlocks(token) {
  const BLOCK_ID = process.env.BLOCK_ID
  const resp = await fetch(`${API_BASE}/blocks/${BLOCK_ID}/children`, {
    headers: {
      Authorization: token
    }
  })
  const { data } = await resp.json()
  return data
}

async function getBlock(token, id) {
  const resp = await fetch(`${API_BASE}/blocks/${id}`, {
    headers: {
      Authorization: token
    }
  })
  const { data } = await resp.json()
  return data
}

async function main() {
  const { app_token } = await getAccessToken()
  const blocks = await getBlocks(app_token)

  const notes = []
  for (const block of blocks.slice(0, 3)) {
    const { children } = block
    for (const id of children.ids) {
      const child = await getBlock(app_token, id)
      switch (child.type) {
        case 'text': {
          const [{ title }] = child.content
          notes.push({
            id: child.id,
            type: child.type,
            cotent: title,
            created_at: child.created_at
          })
          break
        }
        case 'image':
        case 'video': {
          notes.push({
            id: child.id,
            type: child.type,
            content: child.media.download_url,
            created_at: child.created_at
          })
          break
        }
      }
    }
  }
  console.log(notes)
}

main()
