const puppeteer = require('puppeteer');
const fs = require('fs');
const yargs = require('yargs').argv;
(async function(){
  try {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(yargs.url || 'https://www.google.com');
    const paragraphs = await page.evaluate((selector,prop,propKey) => {
      const filters = {
        getAttribute:(el,key)=>el.getAttribute(key),
        textContent:(el,key)=>el.textContent,
        innerHTML:(el)=>el.innerHTML,
        html:(el,key)=>el.innerHTML,
      };
      var els = document.querySelectorAll(selector);
      var content = [];
      const filter = filters[prop] || filters.textContent;
      for(var p of els){
        content.push(filter(p,propKey))
      }
      return content;
    },yargs.selector || 'p',
    yargs.property||'textContent',
    yargs.propertyKey);
    if (yargs.output){
      fs.writeFileSync(yargs.output,paragraphs.join('\n'));
    }else {
      console.log(paragraphs.join('\n'));
    }
    browser.close();
    
  }catch(err){
    console.log(err);
  }
}());