const mineflayer = require('mineflayer')

const config = { 
  host: "localhost", //mc.hahota.fun eg
  port: 25565, //server port (leave it as is unless you know what you're doing!)
  username: "glitchdotcom", //username only for cracked/offline mode servers, email for premium
  // password: "password123", //only for premium
  version: false //version of the server (false = auto detect)
}

//mineflayer.multiple = (bot, constructor) => {
//  const { Worker, isMainThread, workerData } = require('worker_threads')
//  if (isMainThread) {
//    const threads = []
//    for (const i in bot) {
 //     threads.push(new Worker(__filename, { workerData: bots[i] }))
 //   }
 // } else {
  //  constructor(workerData)
 // }
// }

const bot = mineflayer.createBot({ //creates a new bot from the config above
  host: config.host, //imported from config
  port: config.port, //imported from config
  username: config.username, //imported from config
  // password: config.password, //imported from config
  version: config.version //imported from config
});

// const bot = []
// for (let i = 0; i < 1; i++) { // edit the 10 number to define the amount of bots
//  bots.push({ username: `StresserBot${i}` })
 //}

//mineflayer.multiple(bot, ({ username }) => {
//  const bot = mineflayer.createBot({
 //   host: config.host,
  //  port:config.port,
   // username: username,
    // passwd: config.password
  //  version: config.version
   //     })
// });
console.log("Connecting...") //logs "Connecting..." into the console

StartBot() 

function StartBot() { //created StartBot function

bot.on("move", () => { //triggers when the bot moves

  bot.setControlState("jump", true); //continuously jumps
  setTimeout(() => { //sets a delay
    bot.setControlState("jump", false); //stops jumping
  }, 1000); //delay time

  setTimeout(() => { //sets a delay
    bot.setControlState("forward", true); //continuously walks forward
    setTimeout(() => { //sets a delay
      bot.setControlState("forward", false); //stops walking forward
    }, 500); //delay time
  }, 1000); //delay time

  setTimeout(() => { //sets a delay
    bot.setControlState("back", true); //continuously walks backwards
    setTimeout(() => { //sets a delay
      bot.setControlState("back", false); //stops walking backwards
    }, 500); //delay time
  }, 2000); //delay time

  setTimeout(() => { //sets a delay
    bot.setControlState("right", true); //continuously walks right
    setTimeout(() => { //sets a delay
      bot.setControlState("right", false); //stops walking right
    }, 2000); //delay time
  }, 500); //delay time

  setTimeout(() => { //sets a delay
    bot.setControlState("left", true); //continuously walks lefz
    setTimeout(() => { //sets a delay
      bot.setControlState("left", false); //stops walking left
    }, 2000); //delay time
  }, 500); //delay time
});

bot.on("error", err => console.log(err)); //triggers when there's an error and logs it into the console

bot.on("login", () => { //triggers when the bot joins the server
console.log(bot.username + " is online") //logs the username of the bot when the bot is online
});
bot.on("end", () => { //triggers when the bot leaves/gets kicked
console.log("The bot disconnected, reconnecting...") //says "The bot disconnected, reconnecting... in console
StartBot() //calls the StartBot function (runs everything inside it)
});
}