let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text }) => {
  function no(number){
    return number.replace(/\s/g,'').replace(/([@+-])/g,'')
  }

  var hl = []
  hl[0] = text.split(',')[0]
  hl[0] = no(hl[0]) + "@s.whatsapp.net"
  hl[1] = text.split(',')[1]
  hl[1] = parseInt(hl[1].replace(/([.])/g,''))

  global.DATABASE.data.users[hl[0]].exp += hl[1]
  conn.reply(m.chat,`*[ CHEAT MONEY ]*\n\nBerhasil memberikan uang sebesar Rp. ${hl[1].toLocaleString()} kepada *@${hl[0].split('@')[0]}*.`,m,{ contextInfo: { mentionedJid: [hl[0]] } })
  conn.reply(hl[0],`*[ CHEAT MONEY ]*\n\nBerhasil memberikan uang sebesar Rp. ${hl[1].toLocaleString()} kepada *@${hl[0].split('@')[0]}*.`,m,{ contextInfo: { mentionedJid: [hl[0]] } }) 

}
handler.help = ['cheat *days*']
handler.tags = ['owner']
handler.command = /^(cheat)$/i
handler.owner = true
handler.mods = false
handler.premium = false
// handler.group = true
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler