const mineflayer = require('mineflayer')
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { GoalInvert, GoalFollow } = require('mineflayer-pathfinder').goals

mineflayer.multiple = (bots, constructor) => {
  const { Worker, isMainThread, workerData } = require('worker_threads')
  if (isMainThread) {
    const threads = []
    for (const i in bots) {
      threads.push(new Worker(__filename, { workerData: bots[i] }))
    }
  } else {
    constructor(workerData)
  }
}

const bots = []
for (let i = 0; i < 10; i++) {
  bots.push({ username: `NotThisNaameAgain${i}` })
}

mineflayer.multiple(bots, ({ username }) => {
  const bot = mineflayer.createBot({
      host: 'localhost', // optional
      port: 25565,       // optional
      password: '12345678',          // online-mode=true servers
     username 
    })

  bot.loadPlugin(pathfinder)

  bot.once('spawn', () => {
    const mcData = require('minecraft-data')(bot.version)

    // This kills your pc
    const defaultMove = new Movements(bot, mcData)
    defaultMove.allowFreeMotion = true

    bot.on('path_update', (results) => {
      console.log('[' + username + '] I can get there in ' + results.path.length + ' moves. Calc ' + results.time.toFixed(2) + ' ms.')
    })

    bot.on('goal_reached', (goal) => {
      console.log('[' + username + '] Here I am !')
    })

    bot.on('chat', (username, message) => {

      if (username === bot.username) return

      const target = bot.players[username].entity
      if (message === 'follow') {
        bot.pathfinder.setMovements(defaultMove)
        bot.pathfinder.setGoal(new GoalFollow(target, 5), true)
      } else if (message === 'avoid') {
        bot.pathfinder.setMovements(defaultMove)
        bot.pathfinder.setGoal(new GoalInvert(new GoalFollow(target, 5)), true)
      } else if (message === 'stop') {
        bot.pathfinder.setGoal(null)
      }
    })
  })
})
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))
