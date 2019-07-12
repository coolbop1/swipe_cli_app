const program = require("commander");
const { prompt } = require ("inquirer");
const { sendcard } = require('./logic');









 const questions = [{
    type : 'input',
    name : 'cardno',
    message : 'Enter card number ...'
 },
 {
    type : 'input',
    name : 'cvv',
    message : 'Enter cvv'
 },
 {
    type : 'input',
    name : 'expirymonth',
    message : 'Enter expiry month '
 },
 {
    type : 'input',
    name : 'expiryyear',
    message : 'Enter expiry year '
 },
 {
    type : 'input',
    name : 'pin',
    message : 'Enter pin '
 }]

 program
 .action(() => {
 prompt(questions).then(answers =>
    sendcard(answers));
});

program.parse(process.argv);