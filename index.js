const { Telegraf, Markup } = require('telegraf')
const mysqlfunc = require('./mysqlfunc.js');
const auth = require('./auth.js');

/* const keyboard = Markup.inlineKeyboard([
  Markup.button.url('❤️', 'http://telegraf.js.org'),
  Markup.button.callback('Delete', 'delete'),
  Markup.button.callback('Обращения', 'showtasks')
])
*/
mysqlfunc.execreq("SELECT * FROM admstruct", function(err,results,fields) {console.log('data from main func:   '+results);});

const keyboard = Markup.inlineKeyboard([
  [Markup.button.callback('Обращения', 'actShowquestions')]
])

const kbInlinesw = Markup.inlineKeyboard([
  Markup.button.switchToCurrentChat('Обращения','0176'+' lfjsd')
])

const kbShowquestions = Markup.inlineKeyboard([
  [Markup.button.callback('В работе', 'showmytasks')],
  [Markup.button.callback('Делегированные', 'showothertasks')],
  [Markup.button.callback('Меню', 'showmenu')]
])

const kbShowstructure = Markup.inlineKeyboard([
  [Markup.button.callback('Приемная мэра города Иркутска', 'showmytasks')],
  [Markup.button.callback('Вице-мэр города Иркутска', 'showmytasks')],
  [Markup.button.callback('Первый заместитель мэра города Иркутска', 'showmytasks')],
  [Markup.button.callback('Аппарат администрации города Иркутска', 'showmytasks')],
  [Markup.button.callback('Комитет по социальной политике и культуре', 'showmytasks')],
  [Markup.button.callback('Комитет городского обустройства', 'showmytasks')],
  [Markup.button.callback('Комитет по градостроительной политике', 'showmytasks')],
  [Markup.button.callback('Комитет по управлению муниципальным имуществом', 'showmytasks')],
  [Markup.button.callback('Комитет по бюджетной политике и финансам', 'showmytasks')],
  [Markup.button.callback('Комитет по управлению Правобережным округом', 'showmytasks')],
  [Markup.button.callback('Комитет по управлению Октябрьским округом', 'showmytasks')],
  [Markup.button.callback('Комитет по управлению Свердловским округом', 'showmytasks')],
  [Markup.button.callback('Комитет по управлению Ленинским округом', 'showmytasks')],
  [Markup.button.callback('Департамент жилищной политики', 'showmytasks')],
  [Markup.button.callback('Комитет по экономике и стратегическому планированию', 'showmytasks')],
  [Markup.button.callback('Управление специального обеспечения', 'showmytasks')],
  [Markup.button.callback('Управление финансового контроля', 'showmytasks')],
  [Markup.button.callback('Аппарат Избирательной комиссии города', 'showmytasks')],
  [Markup.button.callback('Отдел обеспечения безопасности и защиты населения', 'showmytasks')],
  [Markup.button.callback('Меню', 'showmenu')]
])

const kbShowmy = Markup.inlineKeyboard([
  [Markup.button.callback('Все плохо в городе', 'first')],
  [Markup.button.callback('Меню', 'showmenu')]
])

const kbShowother = Markup.inlineKeyboard([
  [Markup.button.callback('Дороги хреновые', 'second')],
  [Markup.button.callback('Дождь надоел', 'third')],
  [Markup.button.callback('Меню', 'showmenu')]
])

const kbShowOkDeleg = Markup.inlineKeyboard([
  Markup.button.callback('Ответить', 'answer'),
  Markup.button.callback('Делегировать', 'delegate')
])

const kbShowDelegList = Markup.inlineKeyboard([
  [Markup.button.callback('Вася', 'delegvasya')],
  [Markup.button.callback('Петя', 'delegpetya')]
])

const kbShowAnswer = Markup.inlineKeyboard([
  Markup.button.callback('Принять', 'secondok'),
  Markup.button.callback('Отклонить', 'secondbad')
])

const kbShownoanswer = Markup.inlineKeyboard([
  Markup.button.callback('Напомнить', 'getalert'),
  Markup.button.callback('Меню', 'showmenu')
])



let chatId = '';
let answid = '';
let isdeleg = false;
let telekey = auth.gettelekey();
const bot = new Telegraf(telekey);
bot.start((ctx) =>  {
	//ctx.deleteMessage()
        ctx.reply('Меню', {parse_mode: 'HTML',...keyboard})
	//ctx.reply('Меню', kbInlinesw)
})

bot.help((ctx) => ctx.reply('Вы нуждаетесь в помощи? 0000 - Ответ на все вопросы!'))

bot.on('message', (ctx) => {
	if (ctx.message.text == 'Меню') {
	ctx.telegram.sendCopy(ctx.message.chat.id, ctx.message, keyboard)
	//chatId = ctx.message.chat.id
	}
	if (answid != '') {
	bot.telegram.sendMessage(ctx.message.chat.id,"Сохраненный ответ на обращение Все плохо в городe: "+ctx.message.text, keyboard);
	answid = '';
	}
})
//bot.action('delete', (ctx) => ctx.deleteMessage())
bot.action('showmenu', (ctx) => {
	ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,'Меню', {parse_mode: 'HTML',...keyboard})
})
bot.action('actShowquestions', (ctx) => {
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,'Обращения', kbShowquestions)
})

bot.action('actShowstructure', (ctx) => {
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,'Структура', kbShowstructure)
})

bot.action('showmytasks', (ctx) => {
	ctx.deleteMessage()
	bot.telegram.sendMessage(ctx.update.callback_query.from.id,'Мои обращения список', kbShowmy)
})

bot.action('showothertasks', (ctx) => {
	ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,'Делегированные обращения', kbShowother)
})


bot.action('first', (ctx) => {
	ctx.deleteMessage()
	bot.telegram.sendMessage(ctx.update.callback_query.from.id,"Все плохо в городе",kbShowOkDeleg);
	})

bot.action('answer', (ctx) => {
	answid = '1';
        ctx.deleteMessage()
        //bot.telegram.sendMessage(ctx.update.callback_query.from.id,"Отвечаем на обращение Все плохо в городe");
        })

bot.action('delegate', (ctx) => {
	isdeleg = true;
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,"Делегируем обращение",kbShowstructure);
        })

bot.action('delegvasya', (ctx) => {
        isdeleg = false;
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,"Обращение Все плохо в городe делегировано Васе", keyboard);
        })

bot.action('delegpetya', (ctx) => {
        isdeleg = false;
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,"Обращение Все плохо в городe делегировано Пете", keyboard);
        })

bot.action('second', (ctx) => {
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,"Обращение Дороги хреновые делегировано: Вася. Ответ: И чо?, ",kbShowAnswer);
        })

bot.action('secondok', (ctx) => {
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,"Обращение Дороги хреновые делегировано: Вася. Ответ: И чо?, принято", keyboard);
        })

bot.action('secondbad', (ctx) => {
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,"Обращение Дороги хреновые делегировано: Вася. Ответ: И чо?, не принято", keyboard);
        })

bot.action('third', (ctx) => {
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,"Обращение Дождь надоел! делегировано: Петя. Ответа нет", kbShownoanswer);
        })

bot.action('getalert', (ctx) => {
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.update.callback_query.from.id,"Обращение Дождь надоел! Напоминание отправлено: Петя.", keyboard);
        })


bot.launch()


//bot.telegram.sendMessage(435177751,"<h1><b>Бля, работает!)</b></h1>");

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
