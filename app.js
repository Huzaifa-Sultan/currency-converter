import inquirer from "inquirer";
import chalk from "chalk";
//currency converter API link
let apilink = "https://v6.exchangerate-api.com/v6/6026714b4958eafe8feec362/latest/PKR";
//fetching data
let fetchdata = async (data) => {
    let fetchdata = await fetch(data);
    let res = await fetchdata.json();
    return res.conversion_rates;
};
let data = await fetchdata(apilink);
//object to array
let countries = Object.keys(data);
//user input first country
let firstcountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting From",
    choices: countries,
});
//first country money
let usermoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `please enter the amount in ${chalk.greenBright.bold(firstcountry.name)}`,
});
//convert country
let secondcountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting To",
    choices: countries,
});
//conversion rate
let cnv = `https://v6.exchangerate-api.com/v6/6026714b4958eafe8feec362/pair/${firstcountry.name}/${secondcountry.name}`;
//fetching data for conversion rata
let cnvdata = async (data) => {
    let cnvdata = await fetch(data);
    let res = await cnvdata.json();
    return res.conversion_rates;
};
let conversionRate = await cnvdata(cnv);
let convertedRate = usermoney.rupee * conversionRate;
console.log(`your ${chalk.bold.greenBright(firstcountry.name)}  ${chalk.bold.greenBright(usermoney.rupee)} in ${chalk.bold.greenBright(secondcountry.name)} is ${chalk.bold.greenBright(convertedRate)}`);
