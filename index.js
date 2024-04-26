const pupe = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require("fs")
const { Webhook,MessageBuilder  } = require('discord-webhook-node');





pupe.use(StealthPlugin())

async function start(name,pas){
    var offen;
    var Item = " ";



    const browser = await pupe.launch({
        headless:false,
        slowMo: 250,
    });
    console.log("---------------------------"+name+"---------------------------")
    const page = await browser.newPage();
    await page.goto("https://key-drop.com/de/daily-case");
    await page.waitForSelector("#app-root > header > div.flex.h-\\[4\\.125rem\\].items-center.gap-4.bg-navy-750.px-3.sm\\:gap-6.md\\:mb-3.md\\:h-\\[5rem\\].md\\:pl-5.md\\:pr-0.lg\\:h-\\[5\\.625rem\\].xxl\\:gap-9 > div.flex.items-center.gap-3.self-stretch.md\\:gap-6.order-5.ml-auto > a");
    const url = await page.evaluate(() =>{
        return document.querySelector("#app-root > header > div.flex.h-\\[4\\.125rem\\].items-center.gap-4.bg-navy-750.px-3.sm\\:gap-6.md\\:mb-3.md\\:h-\\[5rem\\].md\\:pl-5.md\\:pr-0.lg\\:h-\\[5\\.625rem\\].xxl\\:gap-9 > div.flex.items-center.gap-3.self-stretch.md\\:gap-6.order-5.ml-auto > a").href
       
    })
    await page.goto(url);
    console.log(name+": redirct to Steam")
    await page.type("#responsive_page_template_content > div.page_content > div:nth-child(1) > div > div > div > div._3jLIHRG2NdD0C8kOi-cxzl > div > form > div:nth-child(1) > input",name); 
    await page.type("#responsive_page_template_content > div.page_content > div:nth-child(1) > div > div > div > div._3jLIHRG2NdD0C8kOi-cxzl > div > form > div:nth-child(2) > input",pas)
    await page.click("#responsive_page_template_content > div.page_content > div:nth-child(1) > div > div > div > div._3jLIHRG2NdD0C8kOi-cxzl > div > form > div._14fsnp12JwkJ28EVtQXPty > button");
    await page.waitForNavigation();
    await page.click("#imageLogin")
    console.log(name+": logtin from steam")
    //check for promo
    await page.waitForSelector("#app-root > header > div.flex.h-\\[4\\.125rem\\].items-center.gap-4.bg-navy-750.px-3.sm\\:gap-6.md\\:mb-3.md\\:h-\\[5rem\\].md\\:pl-5.md\\:pr-0.lg\\:h-\\[5\\.625rem\\].xxl\\:gap-9 > div.flex.items-center.gap-3.self-stretch.md\\:gap-6.order-5.ml-auto > div.flex.items-center.justify-center.rounded-l-2xl")
    const promo = await page.evaluate(() =>{
        if(null == document.querySelector("#app-root > header > div.flex.h-\\[4\\.125rem\\].items-center.gap-4.bg-navy-750.px-3.sm\\:gap-6.md\\:mb-3.md\\:h-\\[5rem\\].md\\:pl-5.md\\:pr-0.lg\\:h-\\[5\\.625rem\\].xxl\\:gap-9 > div.flex.items-center.gap-3.self-stretch.md\\:gap-6.order-5.ml-auto > div.flex.items-center.justify-center.rounded-l-2xl > a > div")){
            return true;
        }else{
            return false;
        }
    })
    if(promo){
        await page.click("#app-root > header > div.flex.h-\\[4\\.125rem\\].items-center.gap-4.bg-navy-750.px-3.sm\\:gap-6.md\\:mb-3.md\\:h-\\[5rem\\].md\\:pl-5.md\\:pr-0.lg\\:h-\\[5\\.625rem\\].xxl\\:gap-9 > div.flex.items-center.gap-2.sm\\:gap-4.xxl\\:gap-6 > button.order-2.hidden.items-center.justify-center.py-4.text-\\[\\#77FF9D\\].transition-colors.duration-200.hover\\:text-\\[\\#ADFFC4\\].md\\:flex")
        await page.type("#headlessui-dialog-panel-6 > div.shrink-1.custom-scrollbar.modal-scrollbar.relative.h-full.grow.overflow-x-clip.overflow-y-scroll.transition-opacity.duration-200 > div > div > div > div > div.relative.z-10.rounded-xl.bg-navy-750.md\\:p-5 > div > div > input","PGYDCPV5")
        await page.click("#headlessui-dialog-panel-6 > div.shrink-1.custom-scrollbar.modal-scrollbar.relative.h-full.grow.overflow-x-clip.overflow-y-scroll.transition-opacity.duration-200 > div > div > div > div > div.relative.z-10.rounded-xl.bg-navy-750.md\\:p-5 > div > button");
        await page.click("#headlessui-dialog-panel-6 > div.shrink-0 > div > button.ml-auto.grid.w-14.place-content-center.bg-navy-600.transition-colors.duration-200.hover\\:bg-navy-550.hover\\:text-white")
        console.log(name+": Put Promo-code in")
    }
    await page.hover("#main-view > div.hide-scrollbar.container.relative.snap-x.snap-mandatory.overflow-x-auto > ul > li:nth-child(1)");
    console.log(name+": checking Timer")
    const can = await page.evaluate(() =>{
        return document.querySelector("#main-view > div.hide-scrollbar.container.relative.snap-x.snap-mandatory.overflow-x-auto > ul > li:nth-child(1) > button > div > span").innerText
    })
    if(can == "KOSTENLOSE TÄGLICHE KISTE ÖFFNEN"){
        await page.click("#main-view > div.hide-scrollbar.container.relative.snap-x.snap-mandatory.overflow-x-auto > ul > li:nth-child(1) > button > div > div > canvas");
        console.log(name+": Kiste wurde geöfnet")
        Item = await page.evaluate(() =>{
            return document.querySelector("#main-view > div.hide-scrollbar.container.relative.snap-x.snap-mandatory.overflow-x-auto > ul > li:nth-child(1) > button > div > div > div > span").innerText;
        })
        offen = true;
    }else{
        console.log(name+": Kann nicht geöfnet werden")
        offen = false;
        item = "Nichts"
    }
    
    await page.waitForSelector("#app-root > header > div.flex.h-\\[4\\.125rem\\].items-center.gap-4.bg-navy-750.px-3.sm\\:gap-6.md\\:mb-3.md\\:h-\\[5rem\\].md\\:pl-5.md\\:pr-0.lg\\:h-\\[5\\.625rem\\].xxl\\:gap-9 > div.flex.items-center.gap-3.self-stretch.md\\:gap-6.order-5.ml-auto > div.hidden.items-center.self-stretch.md\\:flex > div > div.flex.h-full.items-center.gap-x-3.lg\\:bg-\\[\\#1F1F27\\].lg\\:pl-4.lg\\:pr-4 > div.hidden.xl\\:block > div > span > span.absolute.right-0");
    const values = await page.evaluate(() =>{
       const skin = document.querySelector("#app-root > header > div.flex.h-\\[4\\.125rem\\].items-center.gap-4.bg-navy-750.px-3.sm\\:gap-6.md\\:mb-3.md\\:h-\\[5rem\\].md\\:pl-5.md\\:pr-0.lg\\:h-\\[5\\.625rem\\].xxl\\:gap-9 > div.flex.items-center.gap-3.self-stretch.md\\:gap-6.order-5.ml-auto > div.hidden.items-center.self-stretch.md\\:flex > div > div.flex.h-full.items-center.gap-x-3.lg\\:bg-\\[\\#1F1F27\\].lg\\:pl-4.lg\\:pr-4 > div.hidden.xl\\:block > div > span > span.absolute.right-0").innerText
       const coins = document.querySelector("#app-root > header > div.flex.h-\\[4\\.125rem\\].items-center.gap-4.bg-navy-750.px-3.sm\\:gap-6.md\\:mb-3.md\\:h-\\[5rem\\].md\\:pl-5.md\\:pr-0.lg\\:h-\\[5\\.625rem\\].xxl\\:gap-9 > div.flex.items-center.gap-3.self-stretch.md\\:gap-6.order-5.ml-auto > div.hidden.items-center.self-stretch.md\\:flex > div > div.hidden.flex-col.gap-1.lg\\:flex > a:nth-child(1) > span > span > span.absolute.right-0").innerText
       const euro = document.querySelector("#app-root > header > div.flex.h-\\[4\\.125rem\\].items-center.gap-4.bg-navy-750.px-3.sm\\:gap-6.md\\:mb-3.md\\:h-\\[5rem\\].md\\:pl-5.md\\:pr-0.lg\\:h-\\[5\\.625rem\\].xxl\\:gap-9 > div.flex.items-center.gap-3.self-stretch.md\\:gap-6.order-5.ml-auto > div.hidden.items-center.self-stretch.md\\:flex > div > div.hidden.items-center.gap-x-3.md\\:flex > div:nth-child(2) > p.text-base.font-semibold.tabular-nums.leading-none.text-green-100 > span > span.absolute.right-0").innerText

        return "Skin-value: "+skin+" | Coins: "+coins+" | Euro: "+euro

    });


    await page.close()
    console.log(name+": closing Browser")
    await browser.close();
    senddiscordmsg(name,values,offen,Item)
    console.log("---------------------------["+values+"]---------------------------")
}



async function senddiscordmsg(name,msg,offen,Item){
    const hook = new Webhook("https://discord.com/api/webhooks/1233439411014996068/QytBo1GVef1fn1RuPDnXUne-zZQT-X0X5qMaybbmRLl9y6qgdAibH6Cbi8ZsFjC6S8OV");
    const embed = new MessageBuilder()
    .setTitle(name)
    .setAuthor(name, 'https://avatars.cloudflare.steamstatic.com/0b22679a06fe80b2317898005c02589740d394e4_full.jpg')
    .addField('Kisteoffen', offen)
    .addField('Geöfnetes Item', Item)
    .setColor('#00b0f4')
    .setThumbnail('https://avatars.cloudflare.steamstatic.com/0b22679a06fe80b2317898005c02589740d394e4_full.jpg')
    .setDescription(msg)
    .setTimestamp();

hook.send(embed);
}




async function starttask(){
    const file = fs.readFileSync("accout.txt","utf8")
    const accouts = file.split("\n");
    for(const acc of accouts){
        const a = acc.replace("\r","").split(":")
        await start(a[0],a[1]);
    }
    
}
starttask();

