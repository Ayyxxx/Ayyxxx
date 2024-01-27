const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1199262650912219146/1199270818274869278/7bde30a066c2e80b.gif?ex=65c1eefc&is=65af79fc&hm=de2645a9b516429600db0552213605962b99c3acd7537ff3cfc92ae76ed7b07f&=',
    // Add more large image URLs as needed
];

const stateTexts = [
    '「 𝙽𝙸𝙶𝙷𝚃 𝙸𝙽 𝚃𝙷𝙴 𝚂𝙺𝚈 」',
    '「 𝚃𝙷𝙴 𝙾𝙽𝙻𝚈 𝙻𝙸𝙵𝙴 」',
    '「 𝙹𝙾𝙸𝙽 𝙳𝙸𝚂𝙲𝙾𝚁𝙳 」',
    // Add more state texts as needed
];

let currentStateIndex = 0; // Index to track the current state text

let currentLargeImageIndex = 0;

app.get('/', (req, res) => res.send('ทำงานเรียบร้อยแล้ว'))
app.listen(port, () =>
    console.log(`Your app is listening at http://localhost:${port}`)
);

client.on("ready", async () => {
    var startedAt = Date.now();
    console.log(`${client.user.username} เม็ดม่วงทำงานเรียบร้อยแล้ว !`);

    setInterval(() => {
        const currentTime = getCurrentTime();
        const currentDate = getCurrentDate();

        const r = new Discord.RichPresence()
            .setApplicationId('1121867777867788309')
            .setType('STREAMING')
            .setState(stateTexts[currentStateIndex])
            .setName('۞ 𝙰𝚂𝚃𝚁𝙾 𝙵𝙰𝙼')
            .setDetails(` ﹝ ⌚${currentTime} | 🖤 Ka  Ting - 𝓐$t๏r ﹞ `)
            .setStartTimestamp(startedAt)
            .setAssetsLargeText(`﹝ 📅 ${currentDate}  |  🛸 0 m/s ﹞`)
            .setAssetsLargeImage(largeImages[currentLargeImageIndex])
            .setAssetsSmallText('A$t๏r 🖤')
            .addButton('🆔 Ting-𝓐$t๏r 👻  🛜', 'https://wetv.vip/th')
            .addButton('🔱 👑  A$t๏r  👑 🔱', 'https://www.twitch.tv/discord')

        client.user.setActivity(r);

      currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
      currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
    }, 1000); // Change large image and state text every 1 second
});

function getCurrentDate() {
    const a = new Date(Date.now());
    const c = { timeZone: "Asia/Bangkok", day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = a.toLocaleDateString("en-US", c);
    const [month, day, year] = formattedDate.split('/');
    return `${day}/${month}/${year}`;
}

function getCurrentTime() {
    const a = new Date(Date.now());
    const c = { timeZone: "Asia/Bangkok", hour: "numeric", minute: "numeric", hour12: false };
    return a.toLocaleTimeString("th-TH", c);
}

client.login(process.env.token);
