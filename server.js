import express from 'express'
import dotenv from 'dotenv'
import routes from './routes.js'
import Discord from 'discord.js'
import botCommands from './commands/index.js'

dotenv.config()

const app = express()
app.use(routes)
app.use(express.static('./public'))

const bot = new Discord.Client()
bot.commands = new Discord.Collection()

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key])
})

const TOKEN = process.env.BOT_TOKEN

bot.login(TOKEN)

bot.on('ready', () => {
    console.info(`> Logged in as ${bot.user.tag}!`)
})

bot.on('message', msg => {
    const command = msg.content.split(/ +/).shift().toLowerCase()

    if(!bot.commands.has(command)){
        return
    }

    try {
        bot.commands.get(command).execute(msg)
    } 
    catch (error) {
        console.error(error)
        msg.reply('Ocorreu um erro ao executar o comando!')
    }
})