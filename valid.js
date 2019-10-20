const fetch = require('node-fetch');
const fs = require('async-file');
const readlineSync = require('readline-sync');
const chalk = require('chalk');

// const email = "erzaganteng@gmail.com";
const checking = (email) => new Promise((resolve, reject) => {

    fetch(`https://api.twitter.com/i/users/email_available.json?email=${email}`, {
        method: 'GET',
        headers: {
            "authorization": `Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA`,
            "Origin": `https://twitter.com`,
            "Referer": "https://twitter.com/i/flow/signup",
            "Sec-Fetch-Mode": "cors",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36",
            "x-csrf-token": "ab07b56686b83e0c165ba917731a0927",
            "x-guest-token": "1185937517071060992",
            "x-twitter-active-user": "yes",
            "x-twitter-client-language": "en"
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});

// checking()




(async () => {
	console.log(chalk.yellow('Twitter Valid Email Checker'));
    console.log(chalk.yellow('Powered by Easy to Learn'));
    console.log("")
    const file = await readlineSync.question(chalk.yellow('Input your file: '));
    
    const akun = await fs.readFile(file, 'utf8');
    let listemail = [];
	await listemail.push(akun.toString().replace(/\r\n|\r|\n/g, " ").split(" "));
    if(listemail[0].length > 0) {
        console.log(chalk.yellow('Total checking '+listemail[0].length+' accounts'));
        console.log(chalk.yellow("Please wait boss, this may take a few minutes..."))
        console.log("")
	    for (var i = 0; i < listemail[0].length; i++) {
        
            const akunn = listemail[0][i];
	    const pecah = akunn.split('|');
	    const email = pecah[0];
        const check = await checking(email);
        if(check.taken === true){
            console.log(chalk.red(`${email} ${check.msg}`));
            const badlist = await fs.appendFile('registered.txt',`${email}\n`, function (err) {
                if (err) throw err;
                console.log('Failed to save list, boss!');});
        }else{
            console.log(chalk.green(`${email} ${check.msg}`));
            const goodlist = await fs.appendFile('notRegistered.txt',`${email}\n`, function (err) {
                if (err) throw err;
                console.log('Failed to save list, boss!');});
        }
        
        
	   }
    } else {
    	console.log("File doesn't exist");
    }
})();