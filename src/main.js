const main = () => {
  const values = getChannelsMessages().map(msg => {
    // TODO: Make sure these values are appropriate
    return [
      msg.client_msg_id,
      msg.type,
      msg.text,
      msg.user,
      msg.ts,
      msg.reply_count || 0,
      msg.reply_users_count || 0
    ]
  })
  writeSheet(values)
}
