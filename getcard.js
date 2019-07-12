const md5 = require('md5');
const CryptoJS = require('crypto-js');
const forge    = require('node-forge');
const utf8     = require('utf8');
const dotenv =  require('dotenv');
dotenv.config();
const publickey = process.env.publickey;
const fetch = require("node-fetch");
console.log(publickey)
module.exports ={
	getinfo: (secret,data)=>{
		let secrets = secret;
		data.amount = 100;
		data.suggested_auth = "PIN"; 
		let datas = data;
		return new Promise((resolve,reject)=>{
			getKey(secrets,datas);
			function getKey(seckey,carddata){
    var keymd5 = md5(seckey);
    var keymd5last12 = keymd5.substr(-12);

    var seckeyadjusted = seckey.replace('FLWSECK-', '');
    var seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12);

    let newsecret = seckeyadjustedfirst12 + keymd5last12;
    encrypt(newsecret, JSON.stringify(carddata))
}


function encrypt(key, text)
{
    var cipher   = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(key));
    cipher.start({iv:''});
    cipher.update(forge.util.createBuffer(text, 'utf-8'));
    cipher.finish();
    var encrypted = cipher.output;
    fetchinfo(forge.util.encode64(encrypted.getBytes()))
}
function fetchinfo(datakey){
	fetch("https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge",{
		//fetch("http://staging1flutterwave.co:8080/pwc/rest/card/mvva/cardenquiry",{
		method:"POST",
		headers:{"Content-Type":"application/json; charset=UTF-8"},
		body:JSON.stringify({PBFPubKey: publickey, client: datakey, alg: "3DES-24"
		})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if(data.status == "success"){
			resolve(data);
		}else{
			reject(data);
		}
	})
	.catch((e)=>reject(e))
	
}

			
		})
	}
}