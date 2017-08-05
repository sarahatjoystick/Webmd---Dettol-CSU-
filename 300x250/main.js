var version = '1.0';
var activeButtons = true;
var modulePeek = [];
var peeked = 0;
var mobile = false;

var preloadModules = [];
var preloadScripts = [];

var listeners = {
    twitter: [],
    video: [],
    locator: [],
    gallery: []
}

document.getElementById('border').style.border = '1px solid '+config.global.border;

function init() {

    trace(version);

    loadImage([
        getURL(config.global.intro.bg),
        getURL(config.global.header.bg),
        getURL(config.global.footer.bg),
        getURL(config.global.tab.bg)
    ], loadModules);
}

function backup() {
    document.getElementById('container').style.opacity = 1;
    document.getElementById('loader').style.display = 'none';
    
    var backup = document.getElementById('backup')
        backup.src = getURL(config.global.intro.bg);
        backup.onclick = function(e) { Enabler.exit('Background'); }
}

function loadModules() {

    
    if(config.module.length)
    {
        for(var i = 0; i < config.module.length; i++)
            preloadModules.push(config.module[i].file);

        loadFile(uniq(preloadModules), loadSecondaryScripts);
    }
    else
    {
        loadSecondaryScripts();
    }

}

function loadSecondaryScripts() {

    if(preloadScripts.length)
        loadFile(uniq(preloadScripts), adStart);
    else
        adStart();
}

function adStart() {

    var backup = document.getElementById('backup')
        backup.src = getURL(config.global.intro.bg);
        backup.onclick = function(e) {
            Enabler.exit('Background');
        }

    var header = document.getElementById('header');
        header.src = getURL(config.global.header.bg);
        header.onclick = function(e) {
            Enabler.exit('Header');
        }

    var subheader = document.getElementById('subheader');
        subheader.onclick = function(e) {
            Enabler.exit('Header');
        }

    // var footer = document.getElementById('footer').getElementsByClassName('background')[0];
    //     footer.src = getURL(config.global.footer.bg);
    //     footer.style.border = '1px solid '+config.global.border;
    //     footer.onclick = function(e) {
    //         Enabler.exitOverride('Footer', config.global.footer.exit);
    //     }
    
    document.getElementById('container').style.opacity = 1;

    for(var i = 0; i < config.module.length; i++)
    {
        var m = config.module[i].file.split('.')[0];

        this["module_"+i] = new window[m]( config.module[i], i );
        this["module_"+i].createModule();
        this["module_"+i].createTab();
    }

    // INTRO ANIMATION (?)

    toggleSpinner(0);

    setTimeout(function(){
        removeClass(document.getElementById('header'), 'start');
    }, 1000);

    setTimeout(function(){
        removeClass(document.getElementById('subcontainer'), 'start');
    }, 1900);

    // SETUP PEEK

    if(modulePeek.length)
    setTimeout(togglePeek, 3000);
}

function toggleSpinner(bool)
{
    if(bool)
    {
        document.getElementById('loader').style.visibility = 'visible';
        addClass(document.getElementById('loader'), 'active');
    }
    else
    {
        removeClass(document.getElementById('loader'), 'active');
        setTimeout(function(){
            document.getElementById('loader').style.visibility = 'hidden';
        }, 500)
    }
}

function togglePeek()
{
    var delay = 3000;

    if(peeked <= 2)
    {
        for(var i = 1; i < modulePeek.length + 1; i++) {
            autoPeek(modulePeek[i - 1], 'active', 1000 * i);

            if(peeked === 2 && i === modulePeek.length)
            {
                setTimeout(function(){
                    EventBus.dispatch("AUTO_GALLERY", window);
                }, ( modulePeek.length * 1000 ))
            }
            else
                setTimeout(togglePeek, ( modulePeek.length * 1000 ) + delay);
        }

        peeked++;
    }
}

function autoPeek(obj, cl, num)
{
    setTimeout(function(){

        addClass(obj, cl)

        setTimeout(function(){
            if(!isMobile()) removeClass(obj, cl);
        }, 1000)
    }, num)
}

