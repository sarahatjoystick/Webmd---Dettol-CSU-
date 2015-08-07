function module_facebook(obj, num) {
    this.obj = obj;
    this.num = num;
    this.large = false;
}

module_facebook.prototype.createModule = function() {

    var self = this;
    var mod_size = ( this.large ? "mod_large" : "mod_reg" );

    var parent = document.getElementById('subcontainer');

    var container = document.createElement('div');
        container.id = 'module_'+this.num;
        container.style.border = '1px solid '+config.global.border;
        container.className = 'rel btn mod '+mod_size+' mod_small border';

    var wrapper = document.createElement('div');
        wrapper.className = 'wrapper rel animate peek';

    var poster = document.createElement('img');
        poster.className = 'poster abs';
        poster.src = getURL(this.obj.bg);

    var cta = document.createElement('div');
        cta.className = 'cta_regular abs';

    var title = document.createElement('span');
        title.className = 'rel mod_name';
        title.innerHTML = this.obj.mod_name;

    cta.appendChild(title);
    wrapper.appendChild(poster);
    wrapper.appendChild(cta);
    container.appendChild(wrapper);
    parent.appendChild(container);

    // PEEKABLE
    if(!this.obj.active)
        modulePeek.push( wrapper );

    // SETUP LISTENERS
    container.onclick = function(e) {
        //self.toggle(1);
        Enabler.exitOverride('Facebook', self.obj.exit);
    }

}

module_facebook.prototype.createTab = function() {

    var self = this;

    var parent = document.getElementById('subcontainer');

    var container = document.createElement('div');
        container.id = 'tab_'+this.num;
        container.className = 'abs animate tab tab_'+this.obj.tab_class;
        
    // var bg = document.createElement('img');
    //     bg.className = 'background abs btn';
    //     bg.src = getURL(config.global.tab.bg);

    var content = document.createElement('div');
        content.className = 'abs animate content';

    // var wrapper = document.createElement('div');
    //     wrapper.className = 'wrapper abs';

    var close = document.createElement('div');
        close.className = 'close_tab fa fa-times-circle-o abs btn';
        close.style.color = config.global.tab.close_color;

    var header = document.createElement('div');
        header.className = 'tab_header abs btn';
    
    //content.appendChild(wrapper);
    // container.appendChild(bg);
    container.appendChild(content);
    container.appendChild(header);
    container.appendChild(close);
    parent.appendChild(container);

    // // SETUP LISTENERS
    // bg.onclick = function(e) {
    //     Enabler.exitOverride('Background', config.global.intro.exit);
    // }

    header.onclick = function(e) {
        Enabler.exitOverride('Header', config.global.header.exit);
    }

    close.onclick = function(e){
        self.toggle(0);
    };
};

module_facebook.prototype.toggle = function(bool) {
    if(bool)
    {
        addClass(document.getElementById('tab_'+this.num), 'active');
        Enabler.counter('Open module_facebook Module', true);
        EventBus.dispatch("KILL_SLIDESHOW", window);
    }
    else
    {
        removeClass(document.getElementById('tab_'+this.num), 'active');
        Enabler.counter('Close module_facebook Module', true);
    }
};

