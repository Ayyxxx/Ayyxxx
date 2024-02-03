const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;
const token = process.env['token']

const largeImages = [
    'https://media.discordapp.net/attachments/1200611878213255218/1200658300866416720/oreki-hyouka.gif?ex=65c6fb2e&is=65b4862e&hm=cdf67ce20c2fd8a3dd338e4439752ea74dbc7d4e374bd5de306cf7929b5ddb92&=&width=576&height=614'
    'https://media.discordapp.net/attachments/1201892625008037981/1203332655509413998/aaaaaaaa.gif?ex=65d0b5dd&is=65be40dd&hm=3b8f63f7ab215bd43ddfd6bf94d900d559562d9539be4f61e3c61686e2bdc944&='
    'https://media.discordapp.net/attachments/1203321276320579605/1203330064884830218/venusxcv-aesthetic.gif?ex=65d0b374&is=65be3e74&hm=0e5ec9f902627a1497aa1ba1c306d8909bce793514df6582d5417155cf7250cf&='
    // Add more large image URLs as needed
];

const stateTexts = [
    '「 รับฟาร์มเกือบทุกอย่าง! 」',
    ' ◜มีโปรโมชั่น◞ ',
    ' • รับทุกเวลาถ้าตอบ • '
    // Add more state texts as needed
];

const nameTexts = [
    '「 รับฟาร์มเกือบทุกอย่าง! 」',
    ' ◜มีโปรโมชั่น◞ ',
    ' • รับทุกเวลาถ้าตอบ • '
    // Add more state texts as needed
];


let currentStateIndex = 0; // Index to track the current state text

let currentLargeImageIndex = 0;

let currentnameTextsIndex = 0;

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
            .setName(nameTexts[currentnameTextsIndex])
            .setDetails(` ﹝ ⌚${currentTime} | 🍥 ${client.user.username} ﹞ `)
            .setStartTimestamp(startedAt)
            .setAssetsLargeText(`﹝ 📅 ${currentDate}  |  🛸 0 m/s ﹞`)
            .setAssetsLargeImage(largeImages[currentLargeImageIndex])
            .setAssetsSmallText('A$t๏r 🖤')
            .addButton('ดิสร้าน', 'https://discord.gg/4zFn3euv')

        client.user.setActivity(r);

        currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
        currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
        currentnameTextsIndex = (currentnameTextsIndex + 1) % nameTexts.length;
    }, 2500); // Change large image and state text every 1 second
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
