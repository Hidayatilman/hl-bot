let fetch = require('node-fetch')

let handler = async(m, { conn, args, usedPrefix, command }) => {
  fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/blackpink.txt').then(res => res.text()).then(body => {
    let randomkpop = body.split('\n')
    let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
    conn.sendFile(m.chat, randomkpopx, '', '', m)
  }).catch(() => {
    conn.reply(m.chat, `*[ FITUR ERROR ]*\n\nFitur ${command} sedang tidak bisa di gunakan`, m)
  })

}

handler.help = ['blackpinkrandom']
handler.tags = ['images']
handler.command = /^(blackpinkrandom)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 1000
handler.limit = true

module.exports = handler