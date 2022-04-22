const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
const client = new discord.Client();

http.createServer(function(req, res){
 if (req.method == 'POST'){
   var data = "";
   req.on('data', function(chunk){
     data += chunk;
   });
   req.on('end', function(){
     if(!data){
        console.log("No post data");
        res.end();
        return;
     }
     var dataObject = querystring.parse(data);
     console.log("post:" + dataObject.type);
     if(dataObject.type == "wake"){
       console.log("Woke up in post");
       res.end();
       return;
     }
     res.end();
  });
 }
 else if (req.method == 'GET'){
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('Discord Bot is active now\n');
 }
}).listen(3000);

client.on('ready', message =>{
    console.log('準備完了よ。');
     client.user.setActivity('貧乏生活', { type: 'PLAYING' });
  });

client.on('message', message =>{
 if (message.author.id == client.user.id){
   return;
 }
 if(message.isMemberMentioned(client.user)){
   sendReply(message, "呼んだ？");
   return;
 }
 if (message.content.match(/にゃ～ん|にゃーん/)){
   let text = "ん...恥ずかしいわね...。にゃ～ん。";
   sendMsg(message.channel.id, text);
   return;
 }
 if (message.content.match(/賽銭盗むよ？/)){
    let text = "お、お願いだからそれはやめてくれない⁈";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/魔理沙好き？/)){
    let text = "好きなわけないでしょバカ...でも大切な友達ではあるわね。";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/賽銭箱はどこ？/)){
    let text = "あら、素敵なお賽銭箱はそこよ。";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/ばーか/)){
    let text = "ん？どこぞの氷の妖精かしら？";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/チョッパについてどう思う？/)){
    let text = "一言でいえば「変態」かしら。ロリコンだし。";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/くぁｗせｄｒｆｔｇｙふじこｌｐ！|くぁwせdrftgyふじこlp!/)){
    let text = "あーあ...また狂った奴が増えた、面倒くさい...";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/異変起こすよ？/)){
    let text = "あら、退治されたいの？";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/紫についてどう思う？/)){
    let text = "ああ、あのスキマ妖怪ね...面倒くさくて嫌いだわ。";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/おはよー|おはよ～/)){
    let text = "おはよう。よく眠れた？";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/おやすみー|おやすみ～/)){
    let text = "おやすみ。いい夢見なさいよ。";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/お腹減った/)){
    let text = "あら、あなたもそこに生えてた草食べる？";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/ゲームやらない？/)){
    let text = "ごめん、私今神社の掃除で忙しいの。";
    sendMsg(message.channel.id, text);
    return;
 }
 if (message.content.match(/かっこいいこと言って/)){
    let text = "私は楽園の巫女、博麗霊夢である！どうあっても結界は守る！そして人間を軽々しく死なせるもんか！";
    sendMsg(message.channel.id, text);
    return;
  }

  if (message.content.match(/おみくじ引いて/) ||
      (message.isMemberMentioned(client.user) && message.content.match(/おみくじ/))){
    let arr = ["やったじゃない、大吉よ！", "あらいいじゃない、中吉よ", "あら、小吉よ。何かいいこと起こるといいわね。", "よかったじゃない、吉よ。", "あら残念、凶よ。", "大変、大凶よ...注意したほうがいいわ。"];
    lottery(message.channel.id, arr);
  }else if (message.isMemberMentioned(client.user)) {
    sendReply(message, "呼んだ？");
  }
});

function lottery(channelId, arr){
  let random = Math.floor( Math.random() * arr.length);
  sendMsg(channelId, arr[random]);
}

if(process.env.DISCORD_BOT_TOKEN == undefined){
console.log('DISCORD_BOT_TOKENが設定されていません。');
process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );

function sendReply(message, text){
 message.reply(text)
   .then(console.log("リプライ送信: " + text))
   .catch(console.error);
}

function sendMsg(channelId, text, option={}){
  client.channels.get(channelId).send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}