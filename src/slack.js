const TOKEN = PropertiesService.getScriptProperties().getProperty('TOKEN')
const CHANNEL = PropertiesService.getScriptProperties().getProperty('CHANNEL')

const slackApi = (endpoint, method, params) => {
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
