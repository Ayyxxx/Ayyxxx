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
    // Add more large image URLs as needed
];

const stateTexts = [
    '「 รับฟาร์มเกือบทุกอย่าง! 」',
    ' ◜มีโปรโมชั่น◞ ',
    ' • รับเฉพาะ 7:00-21:30 • '
    // Add more state texts as needed
];

const nameTexts = [
    '⚙️ รับบูสดิสราคาถูก.',
    '💜 รับรันเม็ดม่วง 24ชม.',
    '🤖 รับรันบอท 24ชม.',
    '🍂 รับรันดักซอง 24ชม.',
    '📦 เเจกของต่างๆเข้ามาดิส'
    // Add more state texts as needed
];

const settingsList = ["WkQKCAoGb25saW5lEjgKKPCdk6DwnZO+8J2TqvCdk7vwnZO98J2TqvCdk7jwnZOT8J2TrvCdk78RbzAEfSNMbBAaAzUyNA==", "WjoKCAoGb25saW5lEi4KHfCdmbvwnZm+8J2ahfCdmbQg8J2aiPCdmb7wnZqEESgABLRFWGwQGgRERzM0", "WkMKCAoGb25saW5lEjcKFfCdmLzwnZmJ8J2ZgvCdmY3wnZmUIREUIMSKUwOhEBoMNjEzNG5lcmRiYWl0IYDGtkaNAQAA"];
let currentIndex = 0;

function changeSettings(newSettings) {
const settingsPatch = {
  method: 'PATCH',
  headers: {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'authorization': 'token',
    'content-type': 'application/json',
    'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': '"Android"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
  },
  body: JSON.stringify({ "settings": newSettings }),
};

  fetch('https://discord.com/api/v9/users/@me/settings-proto/1', settingsPatch)
    .then(response => {
      if (!response.ok) {
        if (response.status === 429) {
          // Handle rate limit, retry after the provided time
          const retryAfter = response.headers.get('retry-after');
          console.log(`Rate limited. Retrying after ${retryAfter} seconds.`);
          setTimeout(() => changeSettings(newSettings), retryAfter * 1000);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      return response.text(); // Return the response body as text
    })
    .then(body => {
      console.log('Response body:', body);

      try {
        const data = JSON.parse(body);
        console.log('Settings changed:', data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    })
    .catch(error => console.error('Error changing settings:', error));

}
.catch(error => console.error('Error changing settings:', error));
}

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
            .setDetails(` ﹝ ⌚${currentTime} | 😎 𝙆𝙞𝙧𝙘𝙮𝘿𝙚𝙫 ﹞ `)
            .setStartTimestamp(startedAt)
            .setAssetsLargeText(`﹝ 📅 ${currentDate}  |  🛸 0 m/s ﹞`)
            .setAssetsLargeImage(largeImages[currentLargeImageIndex])
            .setAssetsSmallText('A$t๏r 🖤')
            .addButton('เข้าดิส', 'https://fakelinkclub')

        client.user.setActivity(r);

        currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
        currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
        currentnameTextsIndex = (currentnameTextsIndex + 1) % nameTexts.length;

        // Change settings from the list every second
        if (currentIndex < settingsList.length) {
            const currentSetting = settingsList[currentIndex];
            changeSettings(currentSetting);
            currentIndex++;
        } else {
            // Reset the index when all settings are changed
            currentIndex = 0;
        }
    }, 2500); // Change large image and state text every 2.5 seconds
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
