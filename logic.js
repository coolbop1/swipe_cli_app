const mongoose = require('mongoose');
const dotenv =  require('dotenv');
const {getinfo} =  require('./getcard');
dotenv.config();

const secrete = process.env.secretekey;




module.exports = {
    sendcard : cardDetails => {
    	let carddetail = cardDetails;
        async function fullinfo(){
        	try{
        	let info = await getinfo(secrete,carddetail);
        	console.log(info);
        	}catch(e){
        		console.log(e)
        	}
        }
        fullinfo();
        
    }
}