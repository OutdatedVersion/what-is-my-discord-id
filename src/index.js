const { Client } = require('discord.js')

const discordClient = new Client()

discordClient.on('message', async message => {
    if (message.author.id === discordClient.user.id 
        || message.channel.type !== 'dm') {
        return
    }

    await sendUserID(message.author)
})

discordClient.on('guildMemberAdd', async member => {
    await sendUserID(member.user)
    await member.kick()
})

discordClient.login(process.env.DISCORD_API_TOKEN)

/**
 * Send the provided user their unique Discord ID.
 * 
 * @param {User} user The Discord user
 */
async function sendUserID(user) {
    try {
        await user.send(`:wave: Your Discord ID, which is a unique and constant identifier on the platform, is:`)
        await user.send(user.id)
    }
    catch (ignored) {
        // The Discord API may raise an error, for whatever reason.
        // Typically the message is still delivered though.
    }
}
