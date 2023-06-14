let loadCheck;setTimeout(() => {if(!loadCheck) {toast('Game crash', 'The game has taken more than 1 second to load. It\'s likely that an error has occured, causing either a partial or full game crash. Feel free to contact us if you see this.', 'red', true, false, false, false, () => openDialog(...dialog.clearsave),'Delete Save Data',);}}, 1000);const mcContainer = dom('mouse_confetti');const elInfoDropdown= dom('info_dropdown');const mainCarrot= dom("main_carrot");const elMainPrestigePotential = dom("main_prestige_potential");const elPrestigePotential = dom('prestige_potential');const Basic_Info= dom("Basic_Info");const elCarrotCount = dom("Carrot_Count");const elClickSpeed= dom("click_speed");const elCPC = dom("cpc");const elCPS = dom("cps");const elCashCount = dom("cash_count");const elGoldenCarrotCount = dom("golden_carrot_count");const elTips= dom("Tip");const elCharacterUpCost = {bill:dom("UpBillCost"),belle: dom("UpBelleCost"),greg:dom("UpGregCost")};const elCharacterLevel = {bill:dom("Bill_lvl"),belle: dom("Belle_lvl"),greg:dom("Greg_lvl") };const elToolPrices = document.querySelectorAll('.tool_price');const elMainProgressContainer = dom('main_progress_container');const elMainProgressBar = dom('main_progress_bar');const elGregProgress = dom("Greg_Progress");const elCharles = {debug: dom("charles_debug"),prices: {improveWorkingConditions: dom("ImproveWorkingConditions"),betterHoes: dom("BetterHoes"),decreaseWages:dom("DecreaseWages"),},shop: {improveWorkingConditions: dom("ImproveWorkingConditions_button"),betterHoes: dom("BetterHoes_button"),decreaseWages:dom("DecreaseWages_button"),}};const tomeEffect = {iwc: dom('iwc_effect'),bh:dom('bh_effect'),dww: dom('dww_effect'),};const tomeCount = {iwc: dom('iwc_count'),bh:dom('bh_count'),dww: dom('dww_count'),};const elFunTipsSlider = dom("FunTipsSlider");const elFunTipsSlider_label = dom("FunTipsSliderLabel");const elEnableKeybinds = dom('enable_keybinds');const elEnableSounds = dom('enableSounds');const elEnableMusic = dom('enableMusic');const elEnableCarrotSounds = dom('enableCarrotSounds');const elVolumeMaster = dom('volume_master');const elVolumeMaster_label = dom('volume_master_percent');const volumeMasterDropdown = dom('volume_master_dropdown');const vmImage = dom('volume_master_img');const vmdImage = dom('volume_master_dropdown_img');const elEnableMainProgress = dom('enableMainProgress');class Player{constructor(data_version,carrots,cpc,cps,equippedHoes,cash,clickSpeedRecord,fallingConsecRecord,trinket_completion,pages,golden_carrots,prestige_potential,prestige_potential_cap,prestige_available,prestige,characters,achievements, internal,themes,cosmetics,new_theme,new_cosmetic,flags){this.data_version=data_version;this.carrots=carrots;this.cpc=cpc;this.cps=cps;this.equippedHoes=equippedHoes;this.cash=cash;this.clickSpeedRecord=clickSpeedRecord;this.fallingConsecRecord=fallingConsecRecord;this.trinket_completion=trinket_completion;this.pages=pages;this.golden_carrots=golden_carrots;this.prestige_potential=prestige_potential;this.prestige_potential_cap=prestige_potential_cap;this.prestige_available=prestige_available;this.prestige=prestige;this.characters=characters;this.achievements=achievements;this.internal=internal;this.themes=themes;this.cosmetics=cosmetics;this.new_theme=new_theme;this.new_cosmetic=new_cosmetic;this.flags=flags;}}class statsTracker{constructor(carrots,click_carrots,idle_carrots,bonus_carrots,cash,falling_carrots_grabbed,golden_carrots,prestige_count,clicks,hoes,tomes_bought,trinkets_complete,boosts_used) {this.carrots=carrots;this.click_carrots=click_carrots;this.idle_carrots= idle_carrots;this.bonus_carrots=bonus_carrots;this.cash=cash;this.falling_carrots_grabbed=falling_carrots_grabbed;this.golden_carrots=golden_carrots;this.prestige_count=prestige_count;this.clicks=clicks;this.hoes=hoes;this.tomes_bought=tomes_bought;this.trinkets_complete=trinkets_complete;this.boosts_used=boosts_used;}}class Character{constructor(nickname, img) {this.nickname=nickname;this.img=img;}}class Farmer extends Character{constructor(nickname,img,lvl,lvlupPrice,scaling,Hoes){super(nickname,img);this.lvl=lvl;this.lvlupPrice=lvlupPrice;this.scaling=scaling;this.Hoes=Hoes;}}class Blacksmith extends Character{constructor(nickname,img,lvl,lvlupPrice,scaling,Hoes,HoePrices,crafting){super(nickname,img);this.lvl=lvl;this.lvlupPrice=lvlupPrice;this.scaling=scaling;this.Hoes=Hoes;this.HoePrices=HoePrices;this.crafting=crafting;}}class Scholar extends Character{constructor(nickname, img){super(nickname,img);}}const playerPrestigeTemplate = {carrots: 0,click_carrots: 0,idle_carrots: 0,bonus_carrots: 0,falling_carrots_grabbed: 0,clicks: 0,hoes: {crafted: [0, 0, 0, 0, 0, 0],craftedTotal: 0,},boosts_used: 0,};
const default_player = new Player(16,0, 1, 0, 0, 0, 0, 0, '0/0', 0, 0, 0, 0, false, clone(playerPrestigeTemplate), {bill:true}, {}, 0, ['theme_dark','theme_light',"theme_oled"], {'bundle': ['default'],'farmable': ['default'],'bill': ['default'],'belle':['default'],'greg': ['default'],'charles':['default'], 'carl': ['default'], 'jared':['default'],'tools':['default'],}, false, false, {})
default_player.lifetime = new statsTracker(0,0,0,0,0,0,0,0,0,{crafted: [0, 0, 0, 0, 0, 0],craftedTotal: 0},0,0,0);const toolScaling = [false, 0.024,0.021,0.019,0.018,0.03,];const tool_craft_speed = [0.06,0.03,0.01,0.009,0.007,0.005,];const Default_Boomer_Bill = new Farmer("bill", './assets/characters/Bill.png',1, 100,[ { min: 1, modifier: 0.11},{ min: 75,modifier: 0.13},{ min: 100, modifier: 0.09},{ min: 300, modifier: 0.08},{ min: 500, modifier: 0.065 },],[0,0,0,0,0,0],);const Default_Belle_Boomerette = new Farmer("belle", './assets/characters/Belle.png',0, 200,[ { min: 0, modifier: 0.058 },{ min: 100, modifier: 0.11},{ min: 125, modifier: 0.07},{ min: 200, modifier: 0.08},],[0,0,0,0,0,0],);const Default_Gregory = new Blacksmith("greg", './assets/characters/Greg.png',0, 5000,[ { min: 0, modifier: 0.17706 },{ min: 25,modifier: 0.1874},{ min: 50,modifier: 0.227 },{ min: 75,modifier: 0.284 },{ min: 100, modifier: 0.409 },{ min: 125, modifier: 0.25},],[0,0,0,0,0,0],[15000,750000,55000000,9000000000,5000000000000,25000000000000000],false,);class tome {constructor(value=0,price=1,max=25000){this.value=value;this.price=price;this.max=max;}priceQuery(amount=1, sendNewPrice=false){if(typeof(amount)!=="number") return console.error("amount needs to be a number");if(this.value+amount>=this.max && sendNewPrice==false){console.error(); return "∞"}let valueDummy = this.value;let target = valueDummy+amount;let sum = this.price;let newPrice = this.price;let scaling = 1.001;for(let i=0;i<amount+10;i++){if(valueDummy>99) scaling = 1.01;else if(valueDummy>375) scaling = 1.003;else if(valueDummy>1000)scaling = 1.00101;newPrice=Math.ceil(newPrice*scaling);if(target===valueDummy+1) break;sum+=newPrice;valueDummy+=1;}if(sendNewPrice) return newPrice;else return sum;} add(amount=1){if(typeof(amount)!=="number") return console.error("amount needs to be a number");if(this.value+amount>this.max) return toast("Can not purchase", `There are only ${this.max} tomes containing knowledge on this subejct`, '', false, true);let price = this.priceQuery(amount)
if(player.golden_carrots < price) return; player.golden_carrots -= price;this.value += amount;this.price = this.priceQuery(amount,true);player.lifetime.tomes_bought += amount; recalculateCarrotsPer();recalculatePrices();updateCharlesShop();updateCPC();updateGC();mouseConfetti([3, 8], ccWhite);}}const Default_Charles = new Scholar("charles",'./assets/characters/Charles.png',)
Default_Charles.improveWorkingConditions=new tome (0,1,22025);Default_Charles.decreaseWages=new tome(0,1,22025);Default_Charles.betterHoes=new tome(0,1,22025);class carlListing {constructor(price=1, currency='cash', available=false, bought=false) {this.price = price;this.currency = currency;this.available = available;this.bought = bought;}}const Default_Carl = {nickname: "carl",img: './assets/characters/Carl.png',shop: {theme: {'theme_classic': new carlListing(16, undefined, true),'theme_bw': new carlListing(6),'theme_terminal': new carlListing(12),'theme_chatapp':new carlListing(5),'theme_camo':new carlListing(3),'theme_original':new carlListing(54),'theme_red':new carlListing(5),'theme_green': new carlListing(5),'theme_blue': new carlListing(5),'theme_grey': new carlListing(12, undefined, true),},cosmetic: {'bundle/cookie': new carlListing(16),'bundle/xmas': new carlListing(25),'bundle/plumber': new carlListing(16),'bundle/developer_art': new carlListing(4),  
            'farmable/pixel_carrot': new carlListing(8),'farmable/pixel_golden_carrot': new carlListing(10),'farmable/blockgame_potato': new carlListing(5),'farmable/pineapple': new carlListing(20),'farmable/ascii_color': new carlListing(2),'farmable/ascii': new carlListing(2),    'farmable/alien_carrot': new carlListing(3),
            'farmable/demon_carrot': new carlListing(3),
            'farmable/ghost_carrot': new carlListing(3),
            'farmable/rainbow_carrot': new carlListing(3),

            
            'bill/biker_bill': new carlListing(5),
            'bill/dollar_bill': new carlListing(10),
            'bill/fancy_bill': new carlListing(40),
            'bill/business_bill': new carlListing(5),

            
            'greg/safety_greg': new carlListing(12),
            
            
            'carl/joker_carl': new carlListing(8),

            
            'tools/fertilizer': new carlListing(5),
        }
    },
    order: [],
}
const Default_Jared = {
    
    name: "Jared",
    nickname: "Jared",
    img: './assets/characters/Jared.png',

    
    data: {
        'mp3_player': {
            available: true,
            level: 0,
            value: false,
        },
        'clickrate': {
            available: true,
            level: 0,
            value: 2,
        },
        'level_up_discount': {
            available: true,
            level: 0,
            value: 100,
        },
        'belle_bonus': {
            available: true,
            level: 0,
            value: 0,
        },
        
        
        
        
        
        'tool_slots': {
            available: true,
            level: 0,
            value: 0,
        },
        'greg_speed': {
            available: true,
            level: 0,
            value: 1,
        },
        'greg_min_start': {
            available: true,
            level: 0,
            value: 100,
        },
        'falling_bonus': {
            available: true,
            level: 0,
            value: 0,
        },
        'page_bonus': {
            available: true,
            level: 0,
            value: 1,
        },
        'magic_keyboard': {
            available: true,
            level: 0,
            value: false,
        },
        
        
        
        
        
        
        
        
        
        
    },
}


function hireJared() {
    if(player.characters['jared'] !== 'ready') {
        if(player.characters['jared']) populateJared();
        else return; 
    }
    const hireCost = 10000000;
    if(player.carrots < hireCost) return toast(...toasts.error_jared_hire_cost); 
    player.carrots -= hireCost;
    player.characters['jared'] = true;
    populateJared();
    toast(...toasts.notice_trinkets);
}


const chars = [ 'bill', 'belle', 'greg', 'charles', 'carl', 'jared' ];
const defaultChar = {
    'bill':    Default_Boomer_Bill,
    'belle':   Default_Belle_Boomerette,
    'greg':    Default_Gregory,
    'charles': Default_Charles,
    'carl':    Default_Carl,
    'jared':   Default_Jared,
}


function carlItemsAvailable() {
    let c = 0;
    for(let [key, value] of Object.entries(Default_Carl.shop.theme)) if(Carl.shop.theme[key].available) c++; 
    for(let [key, value] of Object.entries(Default_Carl.shop.cosmetic)) if(Carl.shop.cosmetic[key].available) c++; 
    return c;
}


function carlShopQuery(type, item) {
    try { return Carl.shop?.[type]?.[item].available || Carl.shop?.[type]?.[item].bought; }
    catch (error) { console.warn('carlShopQuery: invalid query- item or type not found'); }
}


var player           = localStorage.getObject("player")  || clone(default_player);
var Boomer_Bill      = localStorage.getObject("Bill")    || clone(Default_Boomer_Bill);
var Belle_Boomerette = localStorage.getObject("Belle")   || clone(Default_Belle_Boomerette);
var Gregory          = localStorage.getObject("Greg")    || clone(Default_Gregory);
var saved_Charles    = localStorage.getObject("Charles") || clone(Default_Charles);
var Carl             = localStorage.getObject("Carl")    || clone(Default_Carl);
var Jared            = localStorage.getObject("Jared")   || clone(Default_Jared);
const levelable = [Boomer_Bill, Belle_Boomerette, Gregory];


Charles=new Scholar(saved_Charles.nickname,saved_Charles.img);
Charles.improveWorkingConditions=new tome (saved_Charles.improveWorkingConditions.value,saved_Charles.improveWorkingConditions.price,22025);
Charles.decreaseWages=new tome(saved_Charles.decreaseWages.value,saved_Charles.decreaseWages.price,22025);
Charles.betterHoes=new tome(saved_Charles.betterHoes.value,saved_Charles.betterHoes.price,22025);


const saveList = {
    "player":    player,
    "Bill":      Boomer_Bill,
    "Belle":     Belle_Boomerette,
    "Greg":      Gregory,
    "Charles":   Charles,
    "Carl":      Carl,
    "Jared":     Jared,
}
const saveListKeys = Object.keys(saveList);
var preventSaveGame = false;

function saveGame() {
    if(preventSaveGame || player.flags['cookies_accepted'] !== true) return;
    
    for(let i = 0; i < saveListKeys.length; i++) {
        let key = saveListKeys[i];
        let obj = saveList[key];
        localStorage.setObject(key, obj);
    }
}


var autosave = 
setInterval(() => {
    saveGame();
}, 5000);


window.addEventListener('beforeunload', () => { saveGame(); });







function optionSoundsDisable(state) {
    elEnableMusic.disabled = !state;
    elEnableCarrotSounds.disabled = !state;
    if(!state) stopMusic(); 
}

function volumeSliderHandler(event=false) {
    let v = event ? event.srcElement.value : settings.master_volume * 100;
    volumeMasterDropdown.value = v;
    elVolumeMaster.value = v;
    elVolumeMaster_label.value = v;
    vmImage.src = vmdImage.src = v !== 0 && vmdImage.src !== './assets/icons/volume.svg' ? './assets/icons/volume.svg' : './assets/icons/mute.svg';
    volume = v / 100;
    if(music !== undefined) music.volume = volume;
    settings.master_volume = volume;
    saveSettings();
}

function fillSettingsPage() {
    document.querySelectorAll('[data-option]').forEach(element => element.checked = settings?.[element.id]); 
    document.querySelectorAll('[data-option-slider]').forEach(element => element.value = settings?.[element.dataset.optionSlider]); 

    optionSoundsDisable(settings.enableSounds);
    volumeSliderHandler();
    eInnerText(elVolumeMaster_label, `${settings.master_volume * 100}%`);
    volume = settings.master_volume;

    
    if(settings.autosave_interval !== default_settings.autosave_interval) {
        clearInterval(autosave);
        autosave = setInterval(() => { saveGame(); }, settings.autosave_interval * 1000);
    }

    optionSoundsDisable(settings.enableSounds);
}

function saveSettings() {
    if(player.flags['cookies_accepted']) localStorage.setObject("settings", settings);
}

function resetSettings() {
    settings = clone(default_settings);
    saveSettings();
    fillSettingsPage();
}


const keybinds_default = {
    key_carrot:         'Spacebar',
    key_multibuy:       'Shift',
    key_bill_lvlup:     '1',
    key_belle_lvlup:    '2',
    key_greg_lvlup:     '3',
    key_craft_0:        '4',
    key_craft_1:        '5',
    key_craft_2:        '6',
    key_craft_3:        '7',
    key_craft_4:        '8',
    key_craft_5:        '9',
    key_full_numbers:   'F',
    key_cleartoasts:    'X',
    key_tips_menu:      'H',
    key_prestige:       'P',
    key_inventory:      'E',
    key_themes:         'Not set',
    key_cosmetics:      'Not set',
    key_pane_achievements: 'A',
    key_pane_statistics:   'S',
    key_pane_settings:     'D',
}
keybinds_default['keys'] = Object.keys(keybinds_default);


const default_settings = {
    notificationLength: 6,      
    enable_keybinds: true,     
    autosave_interval: 5,

    tutorial_messages: true,    
    carl_shop_toasts: true,     
    cosmetic_auto_equip: false, 

    master_volume: 0.8,         
    enableSounds: true,         
    enableMusic: false,         
    enableCarrotSounds: false,  

    full_numbers: false,        
    enableMainProgress: true,   
    confetti_effects: true,     

    
    theme: 'theme_dark',        
    cosmetics: {
        farmable: 'default',
        bill:     'default',
        belle:    'default',
        greg:     'default',
        charles:  'default',
        carl:     'default',
        jared:    'default',
        tools:    'default',
    },
    openpanel: null,            
    show_nav: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)), 
    cosmetics_grid: true,       
    achievements_grid: false,   
    compact_achievements: false,
    fun_tip_percentage: 40,     

    keybinds: keybinds_default, 
}

var settings;
if(localStorage.getObject("settings") !== null) {
    
    console.log('[Settings] SETTINGS localStorage object found!');
    settings = localStorage.getObject('settings');
} else {
    
    console.log('[Settings] No localStorage object found, creating...');
    resetSettings();
}
function clearSave() {
    preventSaveGame = true;
    ClearLocalStorage();
}

const multibuy = [1,10,100]; 
var mbsel      = 0;          

function multibuySpin() {
    mbsel = (mbsel+1) % multibuy.length;

    
    characterPrices();
    characterButtons();
    updateAllTools();
    updateToolPrices();
    updateCharlesShop();
    eInnerText(dom("multibuy"), multibuy[mbsel] + "x");

    
    if(player.flags['tutorial_multibuy'] !== true) {
        toast(...toasts.tutorial_multibuy);
        player.flags['tutorial_multibuy'] = true;
    }
}
function ClearLocalStorage(disableReload) {
    console.log('Clearing local storage');
    window.scrollTo(0, 0);
    
    localStorage.clear();
    if(disableReload) return;
    location.reload();
}
function r(max) { return Math.floor(Math.random() * max); }
function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function style(element, classname, state) {
    state ? element.classList.add(classname) : element.classList.remove(classname);
}
var clickSpeed = 0;
var clickSpeedBest = 0;
var clickArray = [];


function earnCarrots(amount, type, useMousePos = false) {
    player.carrots += amount; 

    
    player.prestige.carrots += amount;
    player.lifetime.carrots += amount;
    player.prestige[`${type}_carrots`] += amount;
    player.lifetime[`${type}_carrots`] += amount;

    
    carrotCount();
    characterButtons();
    updateAllTools();

    
    if(type === 'bonus') popupHandler(useMousePos, DisplayRounded(amount, 1), 'falling');
}


function earnCash(amount, type) {
    popupHandler((type === 'bonus'), amount, 'cash');
    player.cash += amount;
    player.lifetime.cash += amount;
    cashCount(true);
}


var hold = {
    active: false,
    delay:  undefined,
    clock:  undefined,
}
mainCarrot.addEventListener('mousedown',  e => { holdStart(); });
mainCarrot.addEventListener('touchstart', e => { e.stopImmediatePropagation(); holdStart(); });
 
function holdStart(useMousePos = true, method=0) {
    clearTimeout(hold.delay);
    hold.active = true;
    hold.delay = setTimeout(() => {
        clearInterval(hold.clock)
        hold.clock = setInterval(() => {
            if(document.hidden) return clearInterval(hold.clock);
            carrotClick(false, useMousePos, method);
        }, 1000 / (Jared.data.clickrate.value || 2));
    }, 250);
}
function holdStop() {
    hold.active = false;
    clearTimeout(hold.delay);
    clearInterval(hold.clock);
}
mainCarrot.addEventListener('mouseup', () => { holdStop(); });
mainCarrot.addEventListener('mouseout', event => {
    if(!hold.active || clickMethod === 1) return;
    let obstruct = event.relatedTarget; 
    if(obstruct.classList.contains('falling_carrot')) return obstruct.click();
    holdStop();
});
mainCarrot.addEventListener('touchend', () => { holdStop(); });
mainCarrot.addEventListener('touchcancel', () => { holdStop(); });
window.onblur = () => { holdStop(); }




mainCarrot.addEventListener('touchstart', event => { carrotClick(event, true, 2) });
mainCarrot.addEventListener('click', event => { carrotClick(event) });

var clickMethod = -1; 
var clickMethodTimer;

function carrotClick(event, useMousePos=true, source=0) {
    if(clickMethod === -1) { 
        clickMethod = source;
        clearTimeout(clickMethodTimer);
        clickMethodTimer = setTimeout(() => clickMethod = -1, 1000);
    }
    if(
        (clickMethod !== source && clickMethod !== -1 && !Jared.data.magic_keyboard.value) ||
        (source === 2 && clickMethod === 2)
    ) return;

    
    earnCarrots(player.cpc, 'click');
    player.prestige.clicks++;
    player.lifetime.clicks++;
    fallingConsecutive = 0;
    cpsbuff = 5; 

    
    carrotCount();
    popupHandler(useMousePos, DisplayRounded(Math.floor(player.cpc,2), 1, 10000, unitsShort));
    mouseConfetti([0, 2], ccCarrot, 200, 5);
    clickSpeedHandler(true); 
    fallingCarrot(); 

    if(settings.enableCarrotSounds) randomSound('crunch', 95); 
}


var fallingCarrotPromiser = 0;
var fallingID = 0;
var fallingConsecutive = 0;
const fallingCarrotsArea = dom('fallingCarrotsArea');

function fallingCarrot() {
    let roll = Math.ceil((Math.random() * 100)); 
    let rollchance = boostEffects['fc_chance']; 
    if(roll > rollchance) return; 

    
    let type = 'carrot';
    
    if(Math.ceil(Math.random() * 100) <= (2 / rollchance)) type = 'boost'; 
    else if(Math.ceil(Math.random() * 100) <= (6 / rollchance)) type = 'cash'; 

    
    let amount;
    if(type === 'carrot') {
        
        
        let rewardVariation = (Math.ceil((Math.random() * 1500)) + 500) / 100;
        rewardVariation *= ((Jared.data.falling_bonus.value / 100) + 1) || 1;
        amount = Math.round(player.cpc * rewardVariation);
    } else if(type === 'cash') {
        let max = 5; 
        let min = 5; 
        if(player.lifetime.carrots >= 1000000000000000)   { min = 12; max = 12; }
        else if(player.lifetime.carrots >= 1000000000000) { min =  8; }
        else if(player.lifetime.carrots >= 1000000000)    { max =  8; }
        amount = Math.ceil((Math.random() * max)) + min;
    } else if(type === 'boost') {
        
        let boostroll = Math.ceil(Math.random() * 100);
        console.log(boostroll);
        if(boostroll <= 35 && boostEffects['fc_chance'] === 1) amount = 'fc_10x'; 
        else if(boostroll <= 70 && boostEffects['cpc'] === 1) amount = 'cpc_2x' 
        else if(boostEffects['cpc'] === 1) amount = 'cpc_5x' 
        else return;
    }
    var element = document.createElement("img");
    let image = type === 'carrot' ? cosmetics.farmable[settings.cosmetics.farmable].image
        : type === 'cash' ? './assets/cash.png' : './assets/boosts/falling.png';
    element.setAttribute('src', image);
    element.classList.add('falling_carrot');
    if(type === 'boost') element.classList.add('falling_boost');
    if(Math.round(Math.random())) element.classList.add('mirror');
    element.id = fallingID;
    fallingID++;

    
    let catchfunc = () => { catchCarrot(element.id, type, amount); };
    element.addEventListener('mouseup', catchfunc);
    element.addEventListener('touchend', catchfunc);
    let randomX = Math.floor((Math.random() * 324)); 
    element.style.left = randomX + "px";

    
    fallingCarrotsArea.append(element);
    let time = type === 'boost' ? 6000 : 2600;
    setTimeout(() => { if(dom(element.id) !== null) dom(element.id).remove(); }, time);

   
    function catchCarrot(id, type, amount) {
        dom(id).remove();
        fallingConsecutive++;
        if(fallingConsecutive > player.fallingConsecRecord || player.fallingConsecRecord === undefined) {
            player.fallingConsecRecord = fallingConsecutive;
        }

        if(type === 'carrot') {
            if(player.flags['hardcore']) amount *= -1;
            player.prestige.falling_carrots_grabbed++;
            player.lifetime.falling_carrots_grabbed++;
            earnCarrots(amount, 'bonus', true);
            mouseConfetti([6, 8], ccCarrot, 300);
        } else if(type === 'cash') {
            earnCash(amount, 'bonus');
            mouseConfetti([8, 10], ccGold, 300);
        } else if(type === 'boost') {
            useBoost(amount);
            popupHandler(true, boosts[amount].name, 'boost');
            mouseConfetti([14, 16], ['white', '#cd72da', '#fffd89'], 340, 3);
        }

        clickSpeedHandler(true);
        fallingCarrot(); 
    }
}
const elPrestigeStats = dom('this_prestige_stats');


function carrotCount() {
    count = settings.full_numbers !== true ? DisplayRounded(Math.floor(player.carrots), 3, 1000000) : numCommas(Math.floor(player.carrots));
    eInnerText(elCarrotCount, count);
}

function cashCount(flash = true) {
    eInnerText(elCashCount, numCommas(player.cash));
    if(characterQuery('carl')) updateCarlsShop();
    if(characterQuery('jared')) updateJaredsShop();

    
    if(flash !== true) return;
    dom('list_cash').classList.add('flash_cash');
    setTimeout(() => { dom('list_cash').classList.remove('flash_cash'); }, 2000);
}

function characterPrices() {
    
    for(character of levelable) {
        eInnerText(elCharacterUpCost[character.nickname], DisplayRounded(getLevelPrice(character, character.lvl, multibuy[mbsel]).toFixed(0), 1, 10000)); 
        elCharacterLevel[character.nickname].value = numCommas(character.lvl); 
    }

    
    let gl = Gregory.lvl;
    let gnext = `Next tool at ${gl === 0 ? 1 : (gl + (25 - gl % 25))}`;
    if(gl >= (Gregory.Hoes.length-1) * 25) gnext = '';
    dom('greg_next').innerText = gnext;
}

function updateCPC(specific=false) {
    let cpc;
    let cps;

    
    if(!specific || specific === 'cpc') {
        cpc = DisplayRounded(Math.floor(player.cpc),2);
        eInnerText(elCPC, cpc);
    }

    
    if(!specific || specific === 'cps') {
        
        let star = '';
        if(cpsbuff === 0 || Jared.data.belle_bonus.value === 0 || player.cps === 0 || boostEffects['cps'] !== 1) {
            cps = player.cps;
        } else {
            cps = player.cps * ((Jared.data.belle_bonus.value / 100) + 1) || 0;
            star = '*';
        }
        cps = DisplayRounded(Math.floor(cps),2) + star;
        eInnerText(elCPS, cps);
    }
}

function characterButtons() {
    for(i in levelable) {
        let character = levelable[i];
        let state  = (player.carrots < character.lvlupPrice);
        if(mbsel != 0) state = (player.carrots < getLevelPrice(character, character.lvl, multibuy[mbsel]).toFixed(0));
        style(dom(`${character.nickname}_level_up`), 'grayedout', state);
    }
}
function updateToolPrices() {
    elToolPrices.forEach(element => {
        let type = Number(element.dataset.toolId);
        eInnerText(element,`${DisplayRounded(toolCost(type, multibuy[mbsel]), 1, undefined, undefined, true)}`/* : '---'*/);
    });
}

function updateCharlesShop() {
    
    style(elCharles.shop.improveWorkingConditions, 'cant_afford', (Charles.improveWorkingConditions.priceQuery(multibuy[mbsel]) >= player.golden_carrots));
    style(elCharles.shop.betterHoes, 'cant_afford', (Charles.betterHoes.priceQuery(multibuy[mbsel]) >= player.golden_carrots));
    style(elCharles.shop.decreaseWages, 'cant_afford', (Charles.decreaseWages.priceQuery(multibuy[mbsel]) >= player.golden_carrots));

    
    if(Charles.improveWorkingConditions.priceQuery(multibuy[mbsel])>99999){
        eInnerText(elCharles.prices.improveWorkingConditions, `${DisplayRounded(Charles.improveWorkingConditions.priceQuery(multibuy[mbsel]),2)} Golden Carrots`);
    }else{
        eInnerText(elCharles.prices.improveWorkingConditions, `${numCommas(Charles.improveWorkingConditions.priceQuery(multibuy[mbsel]))} Golden Carrots`);
    }
    if(Charles.betterHoes.priceQuery(multibuy[mbsel])>99999){
        eInnerText(elCharles.prices.betterHoes, `${DisplayRounded(Charles.betterHoes.priceQuery(multibuy[mbsel]),2)} Golden Carrots`);
    }else{
        eInnerText(elCharles.prices.betterHoes, `${numCommas(Charles.betterHoes.priceQuery(multibuy[mbsel]))} Golden Carrots`);
    }
    if(Charles.decreaseWages.priceQuery(multibuy[mbsel])>99999){
        eInnerText(elCharles.prices.decreaseWages, `${DisplayRounded(Charles.decreaseWages.priceQuery(multibuy[mbsel]),2)} Golden Carrots`);
    }else{
        eInnerText(elCharles.prices.decreaseWages, `${numCommas(Charles.decreaseWages.priceQuery(multibuy[mbsel]))} Golden Carrots`);
    }

    
    eInnerText(tomeEffect.iwc, `+${Charles.improveWorkingConditions.value * 10}%`);
    eInnerText(tomeEffect.bh,  `+${Charles.betterHoes.value}%`);
    eInnerText(tomeEffect.dww, `-${(decreaseWagesEffects()*100).toFixed(2)}%`);
    eInnerText(tomeCount.iwc, `Owned: ${numCommas(Charles.improveWorkingConditions.value)}`);
    eInnerText(tomeCount.bh,  `Owned: ${numCommas(Charles.betterHoes.value)}`);
    eInnerText(tomeCount.dww, `Owned: ${numCommas(Charles.decreaseWages.value)}`);
    
    
    style(dom('charles_box'), 'glowing', (
        Charles.improveWorkingConditions.price <= player.golden_carrots
        || Charles.betterHoes.price <= player.golden_carrots
        || Charles.decreaseWages.price <= player.golden_carrots
    ));

    
    eInnerText(elCharles.debug,
        `${Math.floor(Charles.improveWorkingConditions.value)}%\n
        BH: ${Math.floor(Charles.betterHoes.value)}%\n
        DWW: ${(decreaseWagesEffects()*100).toFixed(2)}%`);
}


function updateGC() {
    if(player.lifetime.prestige_count < 1 && player.golden_carrots < 1) return;
    eInnerText(elGoldenCarrotCount, DisplayRounded(player.golden_carrots, 2));
}

var carlShopData = {};

function updateCarlsShop() {
    let keys = Object.keys(carlShopData);
    for(let sd = 0; sd < keys.length; sd++) {
        let element = dom(`carl_shop_${keys[sd]}`);
        if(element === null) continue;
        let price = carlShopData[keys[sd]];
        style(element, 'cant_afford', (player.cash < price));
    }
}

function updateJaredsShop() {
    let keys = jaredShop.keys;
    for(i = 0; i < keys.length; i++) {
        let key = keys[i];
        var element = dom(`jared_shop_${keys[i]}`);
        if(!Jared.data[key].available || element === null) continue;
        let price = jaredShop[key].price[Jared.data[key].level];
        style(element, 'cant_afford', (player.cash < price));
    }

}

function showPrestigeStats() {
    elPrestigeStats.classList.add('unremove');
}
const elPageCount = dom('page_count');

function pagesCount(flash=true) {
    elPageCount.innerText = numCommas(player.pages);

    
    if(flash !== true) return;
    dom('list_pages').classList.add('flash_white');
    setTimeout(() => { dom('list_pages').classList.remove('flash_white'); }, 4000);
}
const elMainIcon = dom('main_icon');

function updateMainIcon() {
    if(achieveQuery('all_achievements')) {
        elMainIcon.src   = './assets/medal_spin.gif';
        elMainIcon.title = '100% Completion';
    }
    
    else if(achieveQuery('all_normal_achievements')) {
        elMainIcon.src   = './assets/medal_silver_transparent.gif';
        elMainIcon.title = 'All normal achievements complete';
    }
    
    else if(achieveQuery('50_percent_achievements')) {
        elMainIcon.src   = './assets/medal_bronze_transparent.gif';
        elMainIcon.title = '50% Completion';
    }
    
    else if(achieveQuery('1_prestige')) {
        elMainIcon.src   = './assets/theme/pixel_golden_carrot.png';
        elMainIcon.title = 'Prestiged';
    }
    
    else {
        elMainIcon.src   = './assets/pixel_carrot_32x.png';
        elMainIcon.title = 'Carrot Clicker';
    }
}
const elPrestigeMenuGCCount = dom('prestige_menu_gc_count');
const elPrestigeMenuTPCount = dom('prestige_menu_tp_count');
const elPrestigeMenuTPBonus = dom('menu_tome_bonus');

function updatePrestigeMenu() {
    eInnerText(elPrestigeMenuGCCount, DisplayRounded(player.golden_carrots));
    eInnerText(elPrestigeMenuTPCount, numCommas(player.pages));
    eInnerText(elPrestigeMenuTPBonus, `+${Math.round(player.pages * (Jared.data.page_bonus.value || 1))}%`);
    eInnerText(elPrestigePotential, DisplayRounded(player.prestige_potential.toFixed(0),2));
}

setInterval(clickSpeedHandler, 1000);

function clickSpeedHandler(clicked = false) {
    if(clicked) clickArray.push(Date.now());

    
    for(let i = 0; i < clickArray.length; i++) {
        if(clickArray[i] < Date.now() - 3000) {
            
            if(clickArray.length != 1) clickArray.splice(i, i);
            else clickArray = [];
        };
    }

    clickSpeed = Math.floor(clickArray.length / 3); 
    if(clickSpeedBest < clickSpeed) clickSpeedBest = clickSpeed;
    if(clickSpeedBest > player.clickSpeedRecord) player.clickSpeedRecord = clickSpeedBest; 
    if(clickSpeed === 0) clickSpeedBest = 0; 

    
    eInnerText(elClickSpeed, `${clickSpeed}/${clickSpeedBest} clicks per second`);
}
var cpsbuff = 0;
var cpsInterval = setInterval(carrotsPerSecond, 100);
function carrotsPerSecond() {
    let cps = player.cps;
    if(cps <= 0) return;
    if(cpsbuff != 0) {
        cps *= ((Jared.data.belle_bonus.value / 100) + 1) || 1;
        cpsbuff--;
    }
    earnCarrots(cps/10, 'idle');
    carrotCount();
    if(Jared.data.belle_bonus.value) updateCPC(); 
}

function createPriceArray(character, totalItems){
    let priceArray = new Array;
    let modifier = 0;
    let scaling = defaultChar[character.nickname].scaling;
    let dw_modifier = 1 - decreaseWagesEffects(); 
    priceArray.push(defaultChar[character.nickname].lvlupPrice*((Jared.data.level_up_discount.value || 100)/100));
    let originalIvalue = 1;
    if(character==Boomer_Bill){
        priceArray.push(defaultChar[character.nickname].lvlupPrice*((Jared.data.level_up_discount.value || 100)/100));
        originalIvalue = 2;
    }
    for(let i=originalIvalue; i<totalItems;i++){
        for(let si = scaling.length-1; si >= 0; si--) {
            let item = scaling[si];
            if(i >= item.min) {
                modifier = 1 + item.modifier;
                break;
            }
        }
       priceArray.push(dw_modifier * Math.floor(priceArray[i-1] * modifier));
    }
    return priceArray;
}
function getLevelPrice(character=Boomer_Bill, level=1, amount=1) {
    const priceArray = createPriceArray(character,level+amount);
    let sum = 0;
    for(i=level;i<level+amount;i++){ sum+=priceArray[i];}
    return sum;
}
function levelUp(character=Boomer_Bill, amount=1) {
    if(!characterQuery(character.nickname)) return;
    let price = getLevelPrice(character, character.lvl, amount);
    if(player.carrots >= price) {
        player.carrots -= price; 
        character.lvl += amount;
        character.lvlupPrice = getLevelPrice(character, character.lvl); 
        recalculateCarrotsPer(character);
        carrotCount();
        characterPrices();
        characterButtons();
        updateCPC();
        updateAllTools();
        mouseConfetti([2, 3], ccGold);
    }
}
function prestige() {
    console.log('Prestiging...');
    if(player.prestige_potential < 1) {
        console.warn('Insufficient prestige potential');
        return toast('Cannot Prestige', 'Insufficient prestige potential. Try again later.');
    }
    window.scrollTo(0, 0);
    clearInterval(cpsInterval);
    player.prestige = clone(playerPrestigeTemplate);
    player.golden_carrots += player.prestige_potential;
    player.lifetime.golden_carrots += player.prestige_potential;
    player.lifetime.prestige_count += 1;
    clearInterval(craftingInterval);
    setTimeout(updateCraftingBar, 90);
    [
        Boomer_Bill.lvlupPrice,
        Belle_Boomerette.lvlupPrice,
        Gregory.lvlupPrice
    ] = [
        clone(Default_Boomer_Bill.lvlupPrice),
        clone(Default_Belle_Boomerette.lvlupPrice),
        clone(Default_Gregory.lvlupPrice),
    ];
    [
        Boomer_Bill.lvl,
        Belle_Boomerette.lvl,
        Gregory.lvl
    ] = [
        clone(Default_Boomer_Bill.lvl),
        clone(Default_Belle_Boomerette.lvl),
        clone(Default_Gregory.lvl),
    ];
    for(i=0;i<6;i++){
        Boomer_Bill.Hoes[i] = 0;
        Belle_Boomerette.Hoes[i] = 0;
        Gregory.Hoes[i]=0;
        Gregory.HoePrices[i] = Default_Gregory.HoePrices[i];
    }
    player.equippedHoes=0;
    player.carrots = 0;
    cpsInterval = setInterval(carrotsPerSecond, 100);
    tips.tracker=0;
    saveGame();
    if(player.lifetime.prestige_count === 1) {
        let toaster = toast(...toasts.tutorial_charles, () => { closeToast(toaster); }, "Got it");
    }
    recalculateCarrotsPer();
    calculatePrestigePotential();
    seeButton('prestige');
    carrotCount();
    characterPrices();
    characterButtons();
    updateCharlesShop();
    showPrestigeStats();
    setTimeout(() => { characterInfo('charles') }, 100);
}

 function calculateCarrots(character) {
    let SixToolBonus = Math.floor(character.Hoes[5]/10*Math.floor(Math.pow(character.Hoes[0]*character.Hoes[1]*character.Hoes[2]*character.Hoes[3]*character.Hoes[4],0.3))) || 1;
    let betterHoes=1+Charles.betterHoes.value/100 
    let iwcBonus=0.1;
    let iwc = (Charles.improveWorkingConditions.value*iwcBonus)+1;
    
    let modifier = 10;
    let cpHoes = (1*betterHoes*(character.Hoes[0]) + 1);
    for(let i = 1; i < character.Hoes.length; i++) {
        let toolValue = (modifier*betterHoes*character.Hoes[i]);
        cpHoes += toolValue;
        modifier *= 10;
    }
    
    
    let boosted = 1;
    if(character === Boomer_Bill) boosted = boostEffects.cpc;
    else if(character === Belle_Boomerette) boosted = boostEffects.cps;

    
    return character.lvl * SixToolBonus * iwc * boosted * (cpHoes>0 ? cpHoes:1);
}
function recalculateCarrotsPer() {
    player.cpc = calculateCarrots(Boomer_Bill);
    player.cps = calculateCarrots(Belle_Boomerette);
    calculatePrestigePotential();
    updateCPC();
}
function calculatePrestigePotential() {
    let pageValue = (Jared.data.page_bonus.value || 1) / 100;
    let defaultPotential = player.cpc*player.cps;
    let characterLevelMultiplier = Boomer_Bill.lvl+Belle_Boomerette.lvl+Gregory.lvl;
    let tomePageBonus = 1 + (player.pages * pageValue);
    function BalancedLevelModifer() { return Boomer_Bill.lvl>=Belle_Boomerette.lvl ? Belle_Boomerette.lvl/Boomer_Bill.lvl : Boomer_Bill.lvl/Belle_Boomerette.lvl; }

    player.prestige_potential= Math.floor(Math.pow((defaultPotential * characterLevelMultiplier * tomePageBonus * BalancedLevelModifer())/10000000000,0.4));

    
    if(!settings.full_numbers) eInnerText(elMainPrestigePotential, DisplayRounded(player.prestige_potential.toFixed(0),2));
    else eInnerText(elMainPrestigePotential, numCommas(player.prestige_potential.toFixed(0)));

    if(menuState.prestige) eInnerText(elPrestigePotential, DisplayRounded(player.prestige_potential.toFixed(0),2));
    if(
        (player.lifetime.golden_carrots === 0 && player.prestige_potential >= 20)
        || (player.lifetime.golden_carrots != 0 && player.prestige_potential > player.lifetime.golden_carrots)
    ) dom('prestige_menu_button').classList.add('glowing');
    else dom('prestige_menu_button').classList.remove('glowing');

    return player.prestige_potential;
}
function decreaseWagesEffects(){ return Charles.decreaseWages.value ? Math.pow(Math.log(Charles.decreaseWages.value+100),0.5)-2.146 : 0; }
function toolCost(type=0, amount=1, mode="query") {
    var originalPrice = Gregory.HoePrices[type];
    let newPrice = 0;
    let scaling = toolScaling[type] || 0.02
    
    for(j = 0; j < amount; j++) {
        newPrice+=originalPrice;
        originalPrice+=(scaling*originalPrice);
    }

    if(mode=="apply") Gregory.HoePrices[type] = originalPrice;
    return newPrice;
}

function toolImg(type) { return cosmetics['tools'][settings.cosmetics.tools][type]; }
function gregLevelTest(type, return_min=false) {
    let needed = type >= 1 ? (type*25) : 1;
    return return_min ? needed : (Gregory.lvl >= needed);
}
var currently_crafting = 0;
var craftingInterval;
function createTool(type=0, amount=1, progress=0, intended_character=false) {
    if(!characterQuery('greg')) return "Greg is not unlocked yet"; 
    if(currently_crafting === 1) return "Tool is already being crafted"; 
    if(!gregLevelTest(type)) { 
        let required = type >= 1 ? (type*25) : 1;
        return toast("Unable to craft", `Greg is too inexperienced. He must be at least level ${required} to create this tool`, '', false, true);
    }
    if(Gregory.lvl === 0 || Gregory.Hoes[type]+amount-1 >= Gregory.lvl+Jared.data.tool_slots.value) return toast("Insufficient upgrades", "You must upgrade Greg to hold more tools of that type", '', false, true);
    let price = toolCost(type, amount);
    if(price * ((Jared.data.greg_min_start.value || 100) / 100) > player.carrots && progress === 0) return 
    if(currently_crafting != false) return;
    currently_crafting=true;
    toolCost(type,amount,"apply"); 
    if(settings.enableMainProgress) elMainProgressContainer.classList.add('status_tidbit_in');
    dom('main_progress_image').src = toolImg(type);
    dom('greg_progress_image').src = toolImg(type);
    dom('greg_crafting_info').classList.remove('inactive');
    dom('greg_crafting_info').title = 'Crafting...';
    let interval = 1000 / (Jared.data.greg_speed.value * 10);
    craftingInterval = setInterval(frame, interval);
    function frame() { progress < price ? craft() : whenDone(); }
    function craft() {
        let normalAdjustment = Math.floor(tool_craft_speed[type] * player.carrots); 
        let inThreeFrames = progress+(3*Math.floor(tool_craft_speed[type] * player.carrots)); 
        let adjust = inThreeFrames>=price ? normalAdjustment : 0.3*normalAdjustment; 
        progress += adjust;
        player.carrots -= adjust;
        Gregory.crafting = [type, amount, progress]; 
        carrotCount();
        characterButtons();
        elGregProgress.style.width = `${Math.ceil(100*(progress/price))}%`;
        if(settings.enableMainProgress) {
            elMainProgressBar.style.opacity = '1';
            elMainProgressBar.style.width  = `${Math.ceil(100*(progress/price))}%`;
        }
    }
    function whenDone() {
        clearInterval(craftingInterval);
        player.carrots+=progress-price;
        progress = 0;
        Gregory.Hoes[type] += amount;
        currently_crafting = 0;
        player.prestige.hoes.crafted[type] += amount;
        player.prestige.hoes.craftedTotal  += amount;
        player.lifetime.hoes.crafted[type] += amount;
        player.lifetime.hoes.craftedTotal  += amount;
        Gregory.crafting = false;
        if(intended_character) equipTool(intended_character, type, amount);
        setTimeout(updateCraftingBar, 90);
    }
}
function updateCraftingBar(){
    elGregProgress.style.width = "0%"; 
    if(settings.enableMainProgress) elMainProgressBar.style.width = "0%"; 
    elMainProgressContainer.classList.remove('status_tidbit_in');
    dom('greg_crafting_info').classList.add('inactive');
    dom('greg_crafting_info').title = 'Idle';
    updateAllTools(); 
    updateToolPrices();
}

function equipTool(character=Boomer_Bill, type=0, amount=1){
    if(!characterQuery('greg') || !characterQuery(character.nickname)) return "Character not unlocked"; 
    if(Gregory.Hoes[type] < amount) {
        if(Gregory.Hoes[type] > 0) amount = Gregory.Hoes[type]; 
        else if(Jared.data.magic_keyboard.value) createTool(type, amount, 0, character); 
        return; 
    };
    if(character.Hoes[type]+amount-1>=Gregory.lvl+Jared.data.tool_slots.value) {
        currently_crafting = 0;
        return toast("Insufficient upgrades", "You must upgrade Greg to hold more tools of that type", '', false, true);
    }
    player.equippedHoes  += amount;
    character.Hoes[type] += amount;
    Gregory.Hoes[type]   -= amount;
    recalculateCarrotsPer();
    updateCPC();
    updateAllTools();
}
function updateAllTools() {
    for(i = 0; i < 6; i++) {
        updateTool(Boomer_Bill, i);
        updateTool(Belle_Boomerette, i);
        updateTool(Gregory, i);
    }
    function updateTool(character, type) {
        let nick = character.nickname;
        let count = dom(`${nick}_tool_${type}_number`);
        let img = dom(`${nick}_tool_${type}`);
        if(nick === 'bill' || nick === 'belle') {
            let glowState = (Gregory.Hoes[type] >= 1 && character.Hoes[type] != Gregory.lvl+Jared.data.tool_slots.value);
            style(img, 'glowing', glowState);
            style(img, 'blackedout', !glowState);
        }
        else if(nick === 'greg') {
            if(gregLevelTest(type) && toolCost(type, multibuy[mbsel]) * ((Jared.data.greg_min_start.value / 100) || 1) <= player.carrots) {
                img.classList.remove('blackedout');
                img.classList.remove('grayedout');
                eInnerText(count, '');
            }
            else if(gregLevelTest(type)) {
                img.classList.add('grayedout');
                img.classList.remove('blackedout');
            }
            else img.classList.add('blackedout');
        }
        if(character.Hoes[type] === Gregory.lvl + Jared.data.tool_slots.value && Gregory.lvl != 0) {
            
            eInnerText(count, `x${character.Hoes[type]}`);
            img.classList.remove('blackedout');
            img.classList.remove('grayedout');
            count.classList.add('toolfull');
        }
        else if(character.Hoes[type] >= 1) {
            count.classList.remove('toolfull');
            img.classList.remove('blackedout');
            img.classList.remove('grayedout');
            eInnerText(count, `x${character.Hoes[type]}`);
        } else {
            count.classList.remove('toolfull');
            eInnerText(count, '');
        }
    }
}
function seeButton(button='prestige') {
    if(button === 'prestige') {
        updateGC();
        dom("prestige-section").classList.add('visible');
        dom('prestige_menu_button').disabled = false;
        dom('prestige_menu_button').setAttribute('data-tooltip', 'Prestige');
        dom('prestige_menu_button_img').src = `./assets/icons/pixel_carrot_white.png`; 
    } else if(button === 'hardmode') {
        dom('difficulty_menu_button').classList.remove('hidden');
        dom('difficulty_menu_button').classList.remove('position_absolute');
    }
}
const elStatistics = dom('statistics');
const statsNumbers = {
    
    prestige_carrots:            dom('prestige_carrots'),
    prestige_carrots_clicked:    dom('prestige_carrots_clicked'),
    prestige_carrots_idled:      dom('prestige_carrots_idled'),
    prestige_carrots_bonus:      dom('prestige_carrots_bonus'),
    prestige_clicks:             dom('prestige_clicks'),
    prestige_falling_carrots_grabbed: dom('prestige_falling_carrots_grabbed'),
    prestige_boosts_used:        dom('prestige_boosts_used'),
    prestige_hoes_crafted_total: dom('prestige_hoes_crafted_total'),
    prestige_hoes_crafted_0:     dom('prestige_hoes_crafted_0'),
    prestige_hoes_crafted_1:     dom('prestige_hoes_crafted_1'),
    prestige_hoes_crafted_2:     dom('prestige_hoes_crafted_2'),
    prestige_hoes_crafted_3:     dom('prestige_hoes_crafted_3'),
    prestige_hoes_crafted_4:     dom('prestige_hoes_crafted_4'),
    prestige_hoes_crafted_5:     dom('prestige_hoes_crafted_5'),

    
    lifetime_carrots:                 dom('lifetime_carrots'),
    lifetime_carrots_clicked:         dom('lifetime_carrots_clicked'),
    lifetime_carrots_idled:           dom('lifetime_carrots_idled'),
    lifetime_carrots_bonus:           dom('lifetime_carrots_bonus'),
    lifetime_golden_carrots:          dom('lifetime_golden_carrots'),
    lifetime_golden_carrots_spent:    dom('lifetime_golden_carrots_spent'),
    lifetime_prestige:                dom('lifetime_prestige'),
    lifetime_cash:                    dom('lifetime_cash'),
    lifetime_cash_spent:              dom('lifetime_cash_spent'),
    lifetime_clicks:                  dom('lifetime_clicks'),
    lifetime_falling_carrots_grabbed: dom('lifetime_falling_carrots_grabbed'),
    lifetime_boosts_used:             dom('lifetime_boosts_used'),
    lifetime_hoes_crafted_total:      dom('lifetime_hoes_crafted_total'),
    lifetime_hoes_crafted_0:          dom('lifetime_hoes_crafted_0'),
    lifetime_hoes_crafted_1:          dom('lifetime_hoes_crafted_1'),
    lifetime_hoes_crafted_2:          dom('lifetime_hoes_crafted_2'),
    lifetime_hoes_crafted_3:          dom('lifetime_hoes_crafted_3'),
    lifetime_hoes_crafted_4:          dom('lifetime_hoes_crafted_4'),
    lifetime_hoes_crafted_5:          dom('lifetime_hoes_crafted_5'),
    lifetime_clickspeedrecord:        dom('lifetime_clickspeedrecord'),

    stat_themes:                      dom('stat_themes'),
    stat_cosmetics:                   dom('stat_cosmetics'),
    stat_trinkets:                    dom('stat_trinkets'),

    stat_achievements:                dom('stat_achievements'),
}

function loadStatistics() {
    
    statsNumbers.prestige_carrots.innerText                 = DisplayRounded(player.prestige.carrots.toFixed(0));
    statsNumbers.prestige_carrots_clicked.innerText         = DisplayRounded(player.prestige.click_carrots.toFixed(0));
    statsNumbers.prestige_carrots_idled.innerText           = DisplayRounded(player.prestige.idle_carrots.toFixed(0));
    statsNumbers.prestige_carrots_bonus.innerText           = DisplayRounded(player.prestige.bonus_carrots.toFixed(0));
    statsNumbers.prestige_clicks.innerText                  = numCommas(player.prestige.clicks);
    statsNumbers.prestige_falling_carrots_grabbed.innerText = numCommas(player.prestige.falling_carrots_grabbed);
    statsNumbers.prestige_boosts_used.innerText             = numCommas(player.prestige.boosts_used);
    statsNumbers.prestige_hoes_crafted_total.innerText      = numCommas(player.prestige.hoes.craftedTotal);
    statsNumbers.prestige_hoes_crafted_0.innerText          = numCommas(player.prestige.hoes.crafted[0]);
    statsNumbers.prestige_hoes_crafted_1.innerText          = numCommas(player.prestige.hoes.crafted[1]);
    statsNumbers.prestige_hoes_crafted_2.innerText          = numCommas(player.prestige.hoes.crafted[2]);
    statsNumbers.prestige_hoes_crafted_3.innerText          = numCommas(player.prestige.hoes.crafted[3]);
    statsNumbers.prestige_hoes_crafted_4.innerText          = numCommas(player.prestige.hoes.crafted[4]);
    statsNumbers.prestige_hoes_crafted_5.innerText          = numCommas(player.prestige.hoes.crafted[5]);

    
    statsNumbers.lifetime_carrots.innerText                 = DisplayRounded(player.lifetime.carrots.toFixed(0));
    statsNumbers.lifetime_carrots_clicked.innerText         = DisplayRounded(player.lifetime.click_carrots.toFixed(0)) ;
    statsNumbers.lifetime_carrots_idled.innerText           = DisplayRounded(player.lifetime.idle_carrots.toFixed(0));
    statsNumbers.lifetime_carrots_bonus.innerText           = DisplayRounded(player.lifetime.bonus_carrots.toFixed(0));

    statsNumbers.lifetime_golden_carrots.innerText          = numCommas(player.lifetime.golden_carrots);
    statsNumbers.lifetime_golden_carrots_spent.innerText    = numCommas(player.lifetime.golden_carrots - player.golden_carrots);
    statsNumbers.lifetime_prestige.innerText                = numCommas(player.lifetime.prestige_count);
    
    statsNumbers.lifetime_cash.innerText                    = numCommas(player.lifetime.cash);
    statsNumbers.lifetime_cash_spent.innerText              = numCommas(player.lifetime.cash - player.cash);
    statsNumbers.lifetime_clicks.innerText                  = numCommas(player.lifetime.clicks);
    statsNumbers.lifetime_falling_carrots_grabbed.innerText = numCommas(player.lifetime.falling_carrots_grabbed);
    statsNumbers.lifetime_boosts_used.innerText             = numCommas(player.lifetime.boosts_used);
    statsNumbers.lifetime_hoes_crafted_total.innerText      = player.lifetime.hoes.craftedTotal;
    statsNumbers.lifetime_hoes_crafted_0.innerText          = player.lifetime.hoes.crafted[0];
    statsNumbers.lifetime_hoes_crafted_1.innerText          = player.lifetime.hoes.crafted[1];
    statsNumbers.lifetime_hoes_crafted_2.innerText          = player.lifetime.hoes.crafted[2];
    statsNumbers.lifetime_hoes_crafted_3.innerText          = player.lifetime.hoes.crafted[3];
    statsNumbers.lifetime_hoes_crafted_4.innerText          = player.lifetime.hoes.crafted[4];
    statsNumbers.lifetime_hoes_crafted_5.innerText          = player.lifetime.hoes.crafted[5];
    statsNumbers.lifetime_clickspeedrecord.innerText        = player.clickSpeedRecord;

    statsNumbers.stat_themes.innerText = `${Object.keys(player.themes).length - 3}/${Object.keys(themes).length - 3} (${percentage(Object.keys(player.themes).length - 3, Object.keys(themes).length - 3).toFixed(0)}%)`;
    statsNumbers.stat_cosmetics.innerText =  `${playerCosmeticsCount()}/${totalCosmetics} (${percentage(playerCosmeticsCount(), totalCosmetics).toFixed(0)}%)`;
    statsNumbers.stat_trinkets.innerText = `${player.trinket_completion} (${percentage(...player.trinket_completion.split('/')).toFixed(0)}%)`;
    let unlockedAchievements = Object.keys(player.achievements);
    achievementProgress(statsNumbers.stat_achievements);
}
var statsInterval;
var tips = default_tips;
try { tips.seen = localStorage.getObject('tips_seen') || tips.seen; }
catch (error) { console.error(error); }
var tipInterval = setInterval(() => {tipchange()}, 15000);
function tipchange() {
    if(menuOpen()) return;
    clearInterval(tipInterval);
    tipInterval = setInterval(() => {tipchange()}, 15000);
    if(player.equippedHoes > 0 || player.prestige.carrots > 100000 && tips.tracker === 0) tips.tracker = 1; 
    else if(player.prestige.carrots > 1000000 && tips.tracker === 1) tips.tracker = 2; 
    else if(player.prestige.carrots > 1000000000 && tips.tracker === 2) tips.tracker = 3; 
    if(tips.tracker > tips.best) tips.best = tips.tracker; 
    if(Math.random < 0.15) tips.tracker = Math.floor(Math.random() * tips.tracker); 
    tips.type = Math.random() < settings.fun_tip_percentage / 100 ? "fun" : "real"; 
    let type = tips.type === "fun" ? 'fun_' : '';
    type += tl[tips.tracker];
    tips.number = Math.floor(Math.random() * tips[type].length); 
    elTips.innerText = tips[type][tips.number];
    if(tips.seen[type][tips.number] != true) {
        tips.seen[type][tips.number] = true;
        if(player.flags['cookies_accepted']) localStorage.setObject('tips_seen', tips.seen);
    }
    tipsHTMLupdate = true;
}
const elBoosts = dom('boosts');
const elNoPowers = dom('no_powers');
var boostsActive = {}
var boostEffects = {
    'cpc': 1,
    'cps': 1,
    'fc_chance': 1,
}
var boostID = 0;
function useBoost(boost = 'cpc_2x') {
    let id = boostID;
    const item = boosts?.[boost];
    if(item === undefined) return;
    if(boostEffects[item.type] != 1) return toast('', 'You may only have one active boost of that type', '', false, true);
    let time_ms = item.time * 1000;
    let target_time = Date.now() + time_ms;
    let html = boostHTML(id, item);
    elBoosts.innerHTML += html;
    boostsActive[id] = {
        name: boost,
        timer: setInterval(() => { timer(id, target_time); }, 1000),
    };
    timer(id, target_time); 
    boostID++;
    updateBoostEffects(item);
    elNoPowers.classList.add('remove');
    player.lifetime.boosts_used++;
    player.prestige.boosts_used++;
    function timer(id, target_time) {
        let now = Date.now();
        let remaining_ms = target_time - now;
        let hours = Math.floor(remaining_ms / (1000 * 60 * 60));
        let minutes = Math.floor((remaining_ms % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remaining_ms % (1000 * 60)) / 1000);
        if(seconds.toString().length === 1) { seconds = `0${seconds}`; }
        
        if(hours != 0) {
            hours = `${hours}:`;
            if(minutes.toString().length === 1) { minutes = `0${minutes}`; }
        } else hours = '';
        dom(`time_boost_${id}`).innerText = `${hours}${minutes}:${seconds}`;
        if(remaining_ms > 0) return
        endBoost(id);
    }

    function boostHTML(id, item) {
        return `
        <div class="power_item tooltip_area" id="boost_${id}">
            <img src="${item.img}" alt="Cancel boost" onclick="endBoost(${id})" role="button" tabindex="0">
            <span class="boost_multiplier">x${item.multiplier}</span>
            <span id="time_boost_${id}" class="secondary_text">-:--</span>
            <div class="shop_tooltip">
                ${item.name}
                <p class="secondary_text">${item.desc}</p>
            </div>
        </div>`
    }
}
function endBoost(id) {
    const item = boosts[boostsActive[id].name];
    updateBoostEffects(item, 1);
    clearInterval(boostsActive[id].timer);
    delete boostsActive[id];
    dom(`boost_${id}`).remove();
    if(Object.keys(boostsActive).length != 0) return;
    elNoPowers.classList.remove('remove');
}
function updateBoostEffects(item, reset=false) {
    boostEffects[item.type] = reset || item.multiplier;
    switch (item.type) {
        case 'cpc':
        case 'cps':
            recalculateCarrotsPer()
            break;
    }
}

