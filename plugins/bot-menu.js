let fs = require ('fs')
let handler  = async (m, { conn, usedPrefix: _p }) => {
  try {
    let pp = './src/avatar_contact.png'
	  pp = await conn.getProfilePicture(global.conn.user.jid)

    let exp = format(global.DATABASE.data.users[m.sender].exp)
    let limit = format(global.DATABASE.data.users[m.sender].limit)
    let name = conn.getName(m.sender)
    let d = new Date
    let locale = 'id'
    let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
    let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = format(Object.keys(global.DATABASE._data.users).length)
    let tags = {
      'info': 'INFO BOT',
      'xp': 'MONEY & LIMIT',
      'premium': 'PREMIUM',
      'game': 'GAME',
      'gabut': 'JADIAN',
      'sticker': 'STICKER',
      'creator': 'CREATOR',
      'logo': 'LOGO',
      'images' : 'IMAGES',
      'data' : 'SEARCHING',
      'tools': 'TOOLS',
      'information': 'INFORMATION',
      'fun': 'FUN',
      'tag': 'TAGS',
      'audio': 'AUDIO',
      'islam': 'ISLAM',
      'text': 'RANDOM TEXT',
      'downloader': 'DOWNLOADER',
      'group tools' : 'GROUP TOOLS',
      'group admin': 'GROUP ADMIN',
      'owner': 'OWNER'
    }
    for (let plugin of Object.values(global.plugins))
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!tag in  tags) tags[tag] = tag
    let help = Object.values(global.plugins).map(plugin => {
      return {
        help: plugin.help,
        tags: plugin.tags,
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let menu of help)
        if (menu.tags && menu.tags.includes(tag))
          if (menu.help) groups[tag].push(menu)
    }

    var update = "\n\n*UPDATE FITUR*\n- Audio menu\n- Sider = tidak aktif > 10 Hari\n- Sticker WM (.swm - premium only)\n- Tidak Aktif 10 hari ? Hapus Data\n- Anti Penjajah (.antipenjajah)\n- Member Spam ? Auto Close GC"

    conn.menu = conn.menu ? conn.menu : {}
    // let before = conn.menu.before || `*${conn.getName(conn.user.jid)} BOT*\n\nHai, %name!\n*%exp XP | %limit Limit*\n*%week, %date [%time]*\n_Uptime: %uptime_\n%totalreg User in database\n%readmore`
    let before = conn.menu.before || `Hai *%name*\nSaldo Rp. %exp (%limit Limit)\nTotal User : %totalreg\n\n❏ Bingung dengan bot ? Ketik *.help*\n❏ Upgrade premium ? Ketik *.infopremium*\n❏ Invite bot ke GC ? Ketik *.sewabot*\n❏ Gak aktif > 10 hari ? Hapus data${update}\n\nInfo Bot:\nIG: https://instagram.com/loadingtomastah\nTele: https://t.me/loadingtomastah\n\n%readmore`
    let header = conn.menu.header || '╔═ ✪〘 %category 〙✪'
    let body   = conn.menu.body   || '║ ❖ %cmd%islimit'
    let footer = conn.menu.footer || '╚════════════════\n'
    let after  = conn.menu.after  || conn.user.jid == global.conn.user.jid ? '' : `\nPowered by https://wa.me/${global.conn.user.jid.split`@`[0]}`
    let _text  = before + '\n'
    for (let tag in groups) {
      _text += header.replace(/%category/g, tags[tag]) + '\n'
      for (let menu of groups[tag]) {
        for (let help of menu.help)
          _text += body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? ' (L)' : '')  + '\n'
      }
      _text += footer + '\n'
    }
    _text += after
    text =  typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime,
      exp, limit, name, weton, week, date, time, totalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    conn.sendFile(m.chat, pp, 'logo.jpg', text.trim(), { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net', fromMe: false }, message: { "imageMessage": { "mimetype": "image/jpeg", "caption": "PART OF LTM BOT", "jpegThumbnail": fs.readFileSync(`./media/images/thumb.jpg`)} } }, m, { contextInfo: { mentionedJid: [m.sender] } })
    // conn.sendFile(m.chat,pp,'profile.jpg', text.trim(), m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['info']
handler.command = /^(menu)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 350

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

// format mata uang
const format = num => {
  const n = String(num),
        p = n.indexOf('.')
  return n.replace(
      /\d(?=(?:\d{3})+(?:\.|$))/g,
      (m, i) => p < 0 || i < p ? `${m},` : m
  )
}