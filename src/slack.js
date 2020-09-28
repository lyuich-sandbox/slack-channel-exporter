const TOKEN = PropertiesService.getScriptProperties().getProperty('TOKEN')
const CHANNEL = PropertiesService.getScriptProperties().getProperty('CHANNEL')

// Merge messages in conversations.history and conversations.replies
const getChannelsMessages = () => {
  const history = getConversationsHistory()

  const replies = history.messages
    .filter(msg => {
      return !(msg.thread_ts == null)
    })
    // NOTE: V8 runtime is needed to use flatMap()
    .flatMap(msg => {
      return getConversationsReplies(msg.thread_ts).messages.filter(msg => {
        // Remove parent messages to avoid duplication
        return !(msg.ts === msg.thread_ts)
      })
    })

  const messages = history.messages.concat(replies)

  return messages.sort((a, b) => {
    return b.ts - a.ts
  })
}

// Slack Conversations API

const getConversationsHistory = () => {
  const endpoint = 'conversations.history'
  const method = 'GET'
  return fetchSlackApi(endpoint, method)
}

const getConversationsReplies = ts => {
  const endpoint = 'conversations.replies'
  const method = 'GET'
  const params = { ts: ts }
  return fetchSlackApi(endpoint, method, params)
}

// Slack API Base

const fetchSlackApi = (endpoint, method, params) => {
  const baseUrl = 'https://slack.com/api'
  const baseParams = {
    token: TOKEN,
    channel: CHANNEL
  }
  const headers = { 'Content-Type': 'application/json' }

  const urlParams = Object.entries({ ...baseParams, ...params })
    .map(([key, val]) => `${key}=${val}`)
    .join('&')

  const url = `${baseUrl}/${endpoint}?${urlParams}`

  const options = {
    method: method,
    headers: headers
  }

  const response = UrlFetchApp.fetch(url, options)
  return JSON.parse(response)
}
