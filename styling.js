const elBody=document.querySelector("body"),bonusVisualArea=dom("bonusVisualArea"),clickingArea=dom("clicking_area");var mouseX=0,mouseY=0,toastID=0,toastsList={},bonusID=0,menuState={dialog:!1,character:!1,theme:!1,cosmetic:!1,keybinds:!1,prestige:!1,tips:!1,credits:!1},achieveHTMLupdate=!0,tipsHTMLupdate=!0,themesHTMLupdate=!0,cosmeticHTMLupdate=!0;const overlay=dom("overlay"),elDialog={title:dom("dialog_title"),desc:dom("dialog_desc"),buttons:{container:dom("dialog_buttons"),accept:dom("dialog_button_accept"),cancel:dom("dialog_button_cancel")}},toastContainer=dom("toast_container"),toastsClear=dom("toasts_clear"),themeMenu=dom("theme_menu"),cosmeticMenu=dom("cosmetic_menu"),themesList=dom("themes_list"),cosmeticsList=dom("cosmetics_list"),cosmList={farmable:dom("farmable_cosmetics"),bill:dom("bill_cosmetics"),bell:dom("belle_cosmetics"),greg:dom("greg_cosmetics"),charles:dom("charles_cosmetics"),carl:dom("carl_cosmetics")},prestigeMenu=dom("prestige_menu"),tipsMenu=dom("tips_menu"),confettiColors=["red","blue","cyan","purple","yellow"],ccGold=["goldenrod","yellow","white","#e1cfa4","#dcb276","#be7e4e"],ccWhite=["white"],ccCarrot=["#ed9645","#c3580d","#de5a01","#974810"];function mouseConfetti(e=[5,5],o=confettiColors,n=150,c=4,t=!1){if(settings.confetti_effects||t){var s=r(e[1]-e[0]+1)+e[0]-1;for(i=0;i<s;i++){var l=o[r(o.length)];let e=r(360),t=r(100)-50;var d=r(4)+c;let s=r(32*n/150)+24*n/150;var m=r(n)+n;let a=document.createElement("div");a.classList.add("small_confetti"),a.style.top=mouseY+"px",a.style.left=mouseX+"px",a.style.backgroundColor=l,a.style.width=d+"px",a.style.height=d+"px",a.style.transitionDuration=m+"ms",a.style.transform=`skewX(${t}deg) rotate(${e}deg)`,mcContainer.append(a),setTimeout(()=>{a.style.transform=`skewX(${t}deg) rotate(${e}deg) translateY(${s}px)`},20),setTimeout(()=>{a.remove()},m)}}}function randomSound(e,t=0){Math.floor(100*Math.random())<t||(t=Math.floor(7*Math.random())+1,playSound(`crunch${t}.flac`))}function buttonSound(){settings.enableSounds&&playSound("click.flac")}function openDialog(e,t,s,a,i){openMenu("dialog"),e&&eInnerText(elDialog.title,e),t&&eInnerText(elDialog.desc,t),s&&eInnerText(elDialog.buttons.accept,s),a&&elDialog.buttons.accept.classList.add(a),i&&(elDialog.buttons.accept.onclick=i),elDialog.buttons.accept.focus()}function closeDialog(e=0){overlay.className="",elBody.classList.remove("overflow_hidden"),buttonSound(),menuState.dialog&&(menuState.dialog=!1,eInnerText(elDialog.title,"Dialog Title"),eInnerText(elDialog.desc,"Dialog description"),elDialog.buttons.accept.classList.remove(...elDialog.buttons.accept.classList),elDialog.buttons.accept.onclick=closeDialog,eInnerText(elDialog.buttons.accept,"OK")),menuState.dialog&&(menuState.dialog=!1),menuState.character&&(dom(menuState.character+"_box").classList.remove("show_info"),menuState.character=!1);for([key,value]of Object.entries(menuState))menuState[key]=!1;dom("main").ariaHidden=!1,document.querySelectorAll('#main *[tabindex="-1"], #main button, #main input, #main select, #main a, #main textarea').forEach(e=>{e.tabIndex=0})}function toast(e="",s="",a="",i=!1,o=!1,n=!1,c=!1,l=!1,r="Done"){var d=e.toUpperCase().includes("TUTORIAL")||e.toUpperCase().includes("CARROT CLICKER");if(!d||settings.tutorial_messages){void 0!==toastsList[toastID-1]&&toastsList[toastID-1].includes("replace")&&closeToast(toastID-1,!1);var m=document.createElement("div");m.id="toast"+toastID;let t=""+toastID;if(n){var u=achievements[n];let e=!1;u.image&&void 0!==u.image||(e=!0),m.classList="toast achievement_item"+(!0!==u.hide_list?"":" achievement_secret")+(!1!==u.style?" style_"+u.style:""),m.innerHTML=`
<!-- Close button -->
<span class="toast_close" role="button" tabindex="0" onclick="closeToast(${toastID})">X</span>
<!-- Details -->
<div class="achievement_details flex">
    <img src="${e?"./assets/achievements/missing.png":u.image}" alt="${u.name}" id="${n}_img" class="achievement_img" title="${u.name}">
    <div>
        <a href="#${n}" class="link_styling white" onclick="panelChange('achievements-panel')"><h3>${u.name}</h3></a>
    </div>
</div>`}else m.classList="toast background_"+a,m.innerHTML=`
${""!==e&&e&&void 0!==e?`<h3>${e}</h3>`:""}
${c?"":`<span class="toast_close" onclick="closeToast(${toastID})">X</span>`}
${""!==s&&s&&void 0!==s?`<p>${s}</p>`:""}
`,!1!==l&&((n=document.createElement("button")).onclick=l,n.innerText=r,m.append(n)),d&&((u=document.createElement("p")).innerText="Disable tutorial messages",u.className="secondary_text link_styling center",u.role="button",u.tabIndex="0",u.style.margin="0",u.onclick=()=>{var e;e=t,settings.tutorial_messages=!1,dom("tutorial_messages").checked=!1,saveSettings(),closeToast(e,!1),toast("","Tutorial messages disabled. They can be reenabled in settings.")},m.append(u));return toastContainer.prepend(m),toastsList[t]=o?"replace":t,toastsList[t]+=c?"_noclose":"",toastID++,2<Object.keys(toastsList).length&&toastsClear.classList.add("visible"),i||setTimeout(()=>{closeToast(t)},1e3*settings.notificationLength),t}}function closeToast(e,t=!0){JSON.stringify(toastsList[e]);var s=dom("toast"+e);Object.keys(toastsList).length<=2&&toastsClear.classList.remove("visible"),t&&null!==s?(s.classList.add("toast_out"),setTimeout(()=>{s.remove()},300)):null!==s&&s.remove(),delete toastsList[e]}function clearToasts(e=!1){for(entry in toastsList){var t=toastsList[entry];void 0!==t&&t.includes("noclose")&&!0!==e||closeToast(entry)}}var currentPanel="achievements-panel";const tripane=dom("tripane"),infoPanel=dom("stats-panel"),achievementsPanel=dom("achievements-panel"),settingsPanel=dom("settings-panel"),infoTab=dom("stats-panel-button"),achievementsTab=dom("achievements-panel-button"),settingsTab=dom("settings-panel-button");function panelChange(e){currentPanel===e||menuOpen()||(currentPanel=e,infoTab.classList.remove("activetab"),achievementsTab.classList.remove("activetab"),settingsTab.classList.remove("activetab"),infoPanel.classList.remove("unremove"),achievementsPanel.classList.remove("unremove"),settingsPanel.classList.remove("unremove"),dom(e+"-button").classList.add("activetab"),dom(e).classList.add("unremove"),settings.openpanel=e,saveSettings(),buttonSound(),"achievements-panel"===e&&achieveHTMLupdate&&populateAchievements(),"stats-panel"===e?statsInterval=setInterval(()=>{loadStatistics()},1e3):clearInterval(statsInterval))}function popupHandler(e=!0,t,s="carrot"){var a=document.createElement("div"),[i,o]=[d()+mouseX,d()+mouseY],n=mainCarrot.getBoundingClientRect(),c=d()+(n.left+(n.right-n.left)/2),n=d()+n.bottom-12,e=(e?(a.style.left=i+"px",a.style.top=o+"px"):(a.style.left=c+"px",a.style.top=n+"px"),a.classList.add("clickvisual"),a.id="bonus"+bonusID,"-"===t[0]?"":"+");e||a.classList.add("clickvisual_negative");let l="";l="carrot"===s||"falling"===s?e+t:"cash"===s?"⚬"+t:t,a.classList.add("clickvisual_"+s),a.innerText=l,bonusVisualArea.append(a);var r=dom("bonus"+bonusID);function d(){return Math.floor(10*Math.random()-5)}setTimeout(()=>{r.remove()},2e3),bonusID<100?bonusID+=1:bonusID=0}function themeSwitcher(){openMenu("theme"),newIndicator(!1,"theme"),populateThemeList()}function closeThemeSwitcher(e=!1){themeMenu.classList.remove("visible"),e||overlay.classList.remove("visible")}var creditInterval,uncollapseNeeded=!1;function cosmeticSwitcher(e=!1){characterQuery("carl")&&(openMenu("cosmetic"),newIndicator(!1,"cosmetic"),e?(document.querySelectorAll(".cosmetic_collapse").forEach(e=>{e.open=!1}),dom("collapse_"+e).open=!0,uncollapseNeeded=!0):uncollapseNeeded&&(uncollapseNeeded=!1,document.querySelectorAll(".cosmetic_collapse").forEach(e=>{e.open=!0})),populateCosmeticsList())}function closeCosmeticSwitcher(e=!1){cosmeticMenu.classList.remove("visible"),e||overlay.classList.remove("visible")}function openMenu(e){closeDialog(),overlay.classList.add("visible"),overlay.classList.add("show_"+e),elBody.classList.add("overflow_hidden"),dom("main").ariaHidden=!0,document.querySelectorAll('#main *[tabindex="-1"], #main button, #main input, #main select, #main a, #main textarea').forEach(e=>{e.tabIndex=-1}),menuState[e]=!0,buttonSound()}function openPrestigeMenu(){player.prestige_available&&(openMenu("prestige"),updatePrestigeMenu())}function openTipsMenu(){populateTipsMenu(),openMenu("tips")}const elTipsList=dom("tips_list");function populateTipsMenu(){if(tipsHTMLupdate){tipsHTMLupdate=!1;let s="";var e=player.flags.all_tips?tl.length-1:tips.best;for(let t=0;t<=e+.5;t+=.5){var a=Math.floor(t);let e="";var i=""+(e=t%1!=0?"fun_":e)+tl[a],o=tips[i];for("fun_"!==e&&(s+=`<h3>${capitalizeFL(i.split("_").join(" "))}</h3>`),ii=0;ii<o.length;ii++)tips.seen[i][ii]||player.flags.all_tips?s+=`<p class="tip_item${"fun_"===e?" fun":""}"><span class="tip_number">${ii+1}</span>${o[ii]}</p>`:s+=`<p class="tip_item secondary_text${"fun_"===e?" fun":""}"><span class="tip_number">${ii+1}</span>???</p>`}elTipsList.innerHTML=s}}function setCosmetic(e,t,s=!1){s||"default"===t||setCosmetic(e,"default",!0);s=settings.cosmetics[e];let a=cosmetics[e][t];switch(e){case"bundle":for(i=0;i<cosmeticsKeys.length;i++){var o=cosmeticsKeys[i];"bundle"!==o&&(a[o]?setCosmetic(o,a[o]):setCosmetic(o,"default"))}break;case"farmable":a.image&&(mainCarrot.src=a.image),a.farmable?c(a.farmable):c("Carrot"),"pixel"===a.render_type?mainCarrot.classList.add("render_pixelated"):mainCarrot.classList.remove("render_pixelated");break;case"tools":for(hi=0;hi<Default_Gregory.HoePrices.length;hi++)a[hi]&&document.querySelectorAll(".tool_"+hi).forEach(e=>{e.src=a[hi]});break;default:if(!characterQuery(e))return;a.image&&(dom(e+"_avatar").src=a.image),a.rename&&eInnerText(dom(e+"_name"),a.rename)}settings.cosmetics[e]=t,saveSettings();var[t,s,n=!1]=[e,t,s];function c(t){document.querySelectorAll(".farmable_name").forEach(e=>{e.innerText=t+"s"})}s=dom(t+`_cosmetic_${s}_checkmark`),null!==(t=dom(t+`_cosmetic_${n}_checkmark`))&&t.classList.add("opacity0"),null!==s&&s.classList.remove("opacity0")}function populateThemeList(){if(themesHTMLupdate){themesHTMLupdate=!1;var t="";for(let e=0;e<themesKeys.length;e++){var s,a=themesKeys[e],i=themes[a];isUnlocked("theme",a)?(s=!1!==i.image?i.image:"./assets/Carrot Clicker.png",t+=`
<div class="theme_item flex" title="${i.name}" onclick="setTheme('${a}')" tabindex="0" role="button">
    <img src="${s}" alt="img" class="theme_preview" id="theme" loading="lazy">
    <div>
        <h3>${i.name}</h3>
        <p class="secondary_text">${i.desc}</p>
    </div>
    <div class="theme_checkbox">
        <img src="./assets/checkmark.svg" alt="Selected" class="theme_checkmark${settings.theme===a?"":" opacity0"}" id="${a+"_checkmark"}">
    </div>
</div>
`):t+=`
    <div class="theme_item flex achievement_locked" title="Locked" tabindex="0" role="button">
        <img src="./assets/locked_transparent.png" alt="img" class="theme_preview">
        <div>
            <h3>???</h3>
            <p class="secondary_text">Locked</p>
        </div>
    </div>
    `}themesList.innerHTML=t}}const cosmeticsView=dom("cosmetics_view");function cosmeticsGridMode(){let t=cosmeticsView.value;document.querySelectorAll(".cosmetics_mini").forEach(e=>{style(e,"cosmetics_grid","grid"===t)}),settings.cosmetics_grid="list"!==t,saveSettings()}function populateCosmeticsList(t="all"){if("all"===t){if(cosmeticHTMLupdate){cosmeticHTMLupdate=!1;for(let e=0;e<cosmeticsKeys.length;e++)populateCosmeticsList(cosmeticsKeys[e]);setTimeout(()=>{let e=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),t=(655<e?e=591:e-=64,84),s=(e<=460&&(t=84),Math.floor(e/t));for(i=0;i<cosmeticsKeys.length;i++){var a=dom("collapse_"+cosmeticsKeys[i]).querySelectorAll(".cosmetic_item");let t=1;a.forEach(e=>{t>s/2&&e.classList.add("desc_fit"),t<s?t++:t=1})}},50)}}else{var s="",a=cosmetics[t];for(let e=0;e<a.keys.length;e++){var o,n=a.keys[e],c=a[n];isUnlocked("cosmetic",n,t)?(o=c.hasOwnProperty("preview")?c.preview:c.hasOwnProperty("image")?c.image:"./assets/Carrot Clicker.png",s+=`
<div class="theme_item cosmetic_item flex" title="${c.name}" onclick="setCosmetic('${t}', '${n}')" id="${t}_cosmetic_${n}" tabindex="0" role="button">
    <img src="${o}" alt="img" class="theme_preview" id="cosmetic_${n}">
    <div class="description">
        <h3>${c.name}</h3>
        <p class="secondary_text">${c.desc}</p>
    </div>
    <div class="theme_checkbox">
        <img src="./assets/checkmark.svg" alt="Selected" class="theme_checkmark${"default"===n?"":" opacity0"}" id="${t}_cosmetic_${n}_checkmark">
    </div>
</div>
`):c.hidden||(s+=`
    <div class="theme_item cosmetic_item flex achievement_locked" title="Locked" tabindex="0" role="button">
        <img src="./assets/locked_transparent.png" alt="img" class="theme_preview" id="cosmetic_${n}" loading="lazy">
        <div class="description">
            <h3>???</h3>
            <p class="secondary_text">Locked</p>
        </div>
    </div>
    `)}dom(t+"_cosmetics").innerHTML=s}}cosmeticsView.addEventListener("input",()=>{cosmeticsGridMode()});const elAchievementsList=dom("achievements_list"),elAchievementFilter=dom("achievement_filter");function populateAchievements(e=!1){if(achieveHTMLupdate){achieveHTMLupdate=!1,achievementProgress();const d=dom("achievement_filter").value;var t,s="";if(e)return void 0===achievements?.[e]?console.warn(`populateAchievements(): [${e}] is not a valid achievement`):(t=(new DOMParser).parseFromString(a(e),"text/html").body.firstChild,void(e=document.getElementById(e)).parentNode.replaceChild(t,e));for(let e=0;e<achievementsKeys.length;e++)s+=a(achievementsKeys[e]);function a(e){var s="",a=achievements[e],i=achieveQuery(e);if(a.internal||"unlocked"===d&&!i||"locked"===d&&i||"challenge"===d&&"challenge"!==a.style||"secret"===d&&!0!==a.hide_list||a.hide_list&&!i)return"";if(!1!==a.reward){let t="";if(Array.isArray(a.reward))for(let e=0;e<a.reward.length;e++){var o=a.reward[e];t+=r(o,i)}else("string"==typeof a.reward||a.reward instanceof String)&&(n=a.reward,t+=r(n,i));s=`<div class="rewards_list">${t}</div>`}else s="";var n=!1!==a.pages&&null!==a.pages?`<div class="achieve_pages secondary_text">+${a.pages} pages</div>`:"",t=i||!0!==a.hide_name?a.name:"???",c=i||!0!==a.hide_desc?a.desc:"???",l=a.image||"./assets/achievements/missing.png",l=i||!a.hide_image?l:"./assets/achievements/locked.png";return`
<div
    id="${e}"
    class="achievement_item 
    ${i?"":"achievement_locked"}
    ${!0!==a.hide_list?"":" achievement_secret"}
    ${!1!==a.style?" style_"+a.style:""}"
>
    <!-- Details -->
    <div class="achievement_details flex">
        ${n}
        <img
            src="${l}"
            alt="${t}"
            id="${e}_img"
            class="achievement_img"
            loading="lazy"
        >
        <div>
            <h2>${t}</h2>
            <p class="secondary_text">${c}</p>
        </div>
    </div>
    ${s}
</div>
`;function r(e,t){let[s,a]="string"==typeof e||e instanceof String?e.split(":"):["function",e];let i,o,n="";return"function"===s||"shop"===s?"":(t?"theme"===s?(i=themes[a].name,o=themes[a].image):"cosmetic"===s?([e,a]=a.split("/"),i=cosmetics[e][a].name,o=cosmetics[e][a].image||cosmetics[e][a].preview):"character"===s&&(i=capitalizeFL(a),o=defaultChar[a].img):(i="Locked",o="./assets/gift.png"),"cash"===s&&(o="./assets/piggy_bank.png",i=a+" coins",s="",n="rcash"),`
    <div class="reward flex ${n}">
        <img src="${o}" alt="${i}" class="reward_img">
        <div>
            <h4>${i}</h4>
            <p class="secondary_text">
                ${capitalizeFL(s)}
            </p>
        </div>
    </div>
    `)}}""===s&&("unlocked"===d?s='<center><img src="./assets/theme/pixel_carrot.png" class="footer_carrot"><br/><p class="secondary_text">No achievements yet. :(</p></center>':"locked"===d?s=`<center><img src="./assets/piggy_bank.png" class="footer_carrot"><p class="secondary_text">You've unlocked every achievement- great job!</p></center>`:"secret"===d&&(s=`<center><img src="./assets/easter_egg.png" class="footer_carrot pointer" onclick="mouseConfetti([24,24], confettiColors, 300)"><p class="secondary_text">Don't tell anyone, but: you don't have any secret achievements.<br/>Secret achievements don't appear in the list until unlocked and<br/> they don't count towards your completion percentage.</p></center>`)),elAchievementsList.innerHTML=s,setTimeout(()=>{achieveGridAdjust()},50)}}function achieveGridAdjust(){let e=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);e=1166<e?1102:dom("achievements_list").offsetWidth;let t=Math.floor(e/68);var s=1;document.querySelectorAll("#achievements_list .achievement_item").forEach(e=>{s>Math.ceil(t/2)?e.classList.add("desc_fit"):e.classList.remove("desc_fit"),s<t?s++:s=1})}function achievementProgress(e=dom("achievement_progress")){var t=Object.keys(player.achievements);eInnerText(e,`${t.length-player.internal}/${achievementsKeys.length-hiddenAchievements} (${Math.round(percentage(Object.keys(player.achievements).length,achievementsKeys.length-hiddenAchievements))}%)`)}function setTheme(e){var t=themes[e].accent||"#312e2e",s=settings.theme,[t,e=!1]=([...elBody.classList].forEach(e=>{e.includes("theme")&&elBody.classList.remove(e)}),elBody.classList.add(e),dom("theme_color").content=t,settings.theme=e,saveSettings(),[e,s]);t=dom(t+"_checkmark"),e&&dom(e+"_checkmark")&&(dom(e+"_checkmark").classList.add("opacity0"),t)&&t.classList.remove("opacity0")}function characterInfo(e="bill",t=void 0){if(!0!==characterQuery(e))return toast("This feature isn't available yet.","Progress through the game to unlock this.",void 0,!1,!0);var s=dom(e+"_box");s.classList.contains("show_info")||t===!1?(s.classList.remove("show_info"),closeDialog()):(openMenu(),s.classList.add("show_info"),menuState.character=e)}elAchievementFilter.addEventListener("change",()=>{achieveHTMLupdate=!0,populateAchievements()});const elCredits=dom("credits");function startCredits(e=!1){e&&closeToast(e),openMenu("credits"),elCredits.scrollTop=0,clearInterval(creditInterval),creditInterval=setInterval(()=>{elCredits.scrollTop+=1,elCredits.scrollHeight-elCredits.scrollTop===elCredits.clientHeight&&clearInterval(creditInterval)},30)}elCredits.addEventListener("wheel",()=>{clearInterval(creditInterval)});const elKeybindsMenu=dom("keybinds_menu"),elKeybindsBlurb=dom("keybinds_blurb");let keyBlurbText=elKeybindsBlurb.innerHTML;function keybindsMenu(){openMenu("keybinds");var e=elEnableKeybinds.checked;style(elKeybindsBlurb,"color_red",!e),elKeybindsBlurb.innerText=e?keyBlurbText:"Warning: Keybinds are currently disabled in settings."}const carlShop=dom("carl_shop");function populateCarl(){let e="";carlShopData={};for(var[t,s]of Object.entries(Carl.shop.theme)){var a,i,o;s.available&&!s.bought&&(carlShopData[t]=s.price,i=(a=themes[t]).image,o=a.desc,e+=u(t,"theme",a.name,i,s.price,o))}for(var[n,c]of Object.entries(Carl.shop.cosmetic)){var l,r,d,m;c.available&&!c.bought&&(carlShopData[n]=c.price,[l,r]=n.split("/"),d=(r=cosmetics[l][r]).image||r.preview,m=r.desc,e+=u(n,l+" Cosmetic",r.name,d,c.price,m))}function u(e,t,s,a,i,o){return`
<div class="tooltip_area">
    <div id="carl_shop_${e}" class="shop_item flex" onclick="buyCarl('${t}', '${e}')" tabindex="0" role="button">
        <img src="${a}" alt="" class="shop_img" loading="lazy">
        <div class="info">
            <b>${s}</b>
            <p class="secondary_text">${capitalizeFL(t)}</p>

            <div class="shop_price">
                <span class="secondary_text">Cost: </span><span class="color_cash">⚬</span> ${i}
            </div>
        </div>
    </div>

    <div class="shop_tooltip">${o}</div>
</div>`}""===e&&(e=`
<p class="padding-5px secondary_text center" style="padding: 5px;">
    That's all for now. Complete more achievements for more things to buy!
</p>`),carlShop.innerHTML=e,cashCount(!1),updateCarlsShop()}function populateJared(t=!1){if(!0===characterQuery("jared")){var s=dom("jared_shop");let e="";var a,o=jaredShop.keys;if(t)return void 0===jaredShop?.[t]?console.warn(`populateJared(): [${t}] is not a valid trinket`):(a=(new DOMParser).parseFromString(c(t),"text/html").body.firstChild,void(t=document.getElementById("jared_shop_container_"+t)).parentNode.replaceChild(a,t));for(i=0;i<o.length;i++){var n=o[i];e+=c(n)}function c(a){var i=jaredShop[a],o=Jared.data?.[a];if(o.available&&void 0!==o){var n=i.img||"./assets/achievements/missing.png";let e="";for(si=1;si<=i.price.length;si++){var c=o.level>=si?"filled":"";e+=`<div class="segment ${c}"></div>`}var l=i.price[o.level]||"✓ Done";let t="",s="complete";"✓ Done"!==l&&(t='<span class="secondary_text">Cost: </span><span class="color_cash">⚬</span> ',s="");var r="string"==typeof o.value?o.value:i.written.split("@").join(o.value);return`
<div id="jared_shop_container_${a}" class="tooltip_area">
    <div id="jared_shop_${a}" class="shop_item ${s}" onclick="buyTrinket('${a}')" tabindex="0" role="button">
        <img src="${n}" alt="" class="shop_img" loading="lazy">
        <div class="info">
            <b>${i.name}</b>
            <div class="segment_bar darker_bg_color">${e}</div>
            <div class="shop_value secondary_text">${r}</div>
            <div class="shop_price">${t}${l}</div>
        </div>
    </div>
    <div class="shop_tooltip">${i.desc}</div>
</div>`}}s.innerHTML=e,e+=`
<p class="secondary_text center" style="padding: 4px; margin-top: 8px;">
    Thanks for stopping by!
</p>`,cashCount(!1)}}function newIndicator(e,t){(player["new_"+t]=e)?(e=document.querySelectorAll(".new_indicator_"+t),document.querySelector(`.new_indicator_${t} > .new_indicator`)||e.forEach(e=>{e.innerHTML+='<div class="new_indicator">NEW</div>'})):document.querySelectorAll(`.new_indicator_${t} > .new_indicator`).forEach(e=>e.remove())}function achieveCompactMode(e){style(elAchievementsList,"compact",e)}function achieveGridMode(e){style(elAchievementsList,"achieve_grid",e),achieveGridAdjust()}!function(){function e(e){var t,s;"touchstart"===(e=e||window.event).type||"touchmove"===e.type||"touchend"===e.type||"touchcancel"===e.type?(s=(s=void 0===e.originalEvent?e:e.originalEvent).touches[0]||s.changedTouches[0],mouseX=Number(s.pageX.toFixed(0)),mouseY=Number(s.pageY.toFixed(0))):(null===e.pageX&&null!==e.clientX&&"mousedown"===e.type||"mouseup"===e.type||"mousemove"===e.type||"mouseover"===e.type||"mouseout"==e.type||"mouseenter"==e.type||"mouseleave"==e.type)&&(t=(s=e.target&&e.target.ownerDocument||document).documentElement,s=s.body,e.pageX=e.clientX+(t&&t.scrollLeft||s&&s.scrollLeft||0)-(t&&t.clientLeft||s&&s.clientLeft||0),e.pageY=e.clientY+(t&&t.scrollTop||s&&s.scrollTop||0)-(t&&t.clientTop||s&&s.clientTop||0),mouseX=e.pageX,mouseY=e.pageY)}document.onmousemove=e,document.ontouchstart=e,document.ontouchmove=e}();