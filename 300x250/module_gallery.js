// GALLERY SUB-ROUTINES

preloadScripts.push('style_gallery2.css');

function module_gallery(obj, num) {
    this.obj = obj;
    this.num = num;
    this.large = true;

    this.gallery = obj.photos;
    this.galleryTimer;
    this.gIndex = 0;
    this.galleryLen;
    this.currentSlide = 1;
    this.slideshow = true;


    EventBus.addEventListener("AUTO_GALLERY", function(){

        if(this.gallery.length && this.slideshow)
        {
            if(this.gallery.length < 3)
                this.galleryLen = this.gallery.length;
            else
                this.galleryLen = 3;

            this.autoGallery();
        }

    }, this);

    EventBus.addEventListener("KILL_SLIDESHOW", function(){
        this.killMiniSlideShow();
    }, this);
}

module_gallery.prototype.createModule = function() {

    var self = this;
    var mod_size = ( this.large ? "mod_large" : "mod_reg" );

    var parent = document.getElementById('modules');

    var container = document.createElement('div');
        container.className = 'abs btn mod '+mod_size+' mod_small border';

    var wrapper = document.createElement('div');
        wrapper.className = 'wrapper rel animate peek';

    var poster = document.createElement('img');
        poster.className = 'poster abs';

    var slideshow = document.createElement('div');
        slideshow.id = 'mini_ss_'+this.num;
        slideshow.className = 'mini-slideshow abs animate';

    var cta = document.createElement('div');
        cta.className = 'cta_regular abs';

    var title = document.createElement('span');
        title.className = 'rel mod_name';

    cta.appendChild(title);
    wrapper.appendChild(poster);
    wrapper.appendChild(slideshow);
    wrapper.appendChild(cta);
    container.appendChild(wrapper);
    
    container.getElementsByClassName('poster')[0].src = getURL(this.obj.bg);
    container.id = 'module_'+this.num;
    container.style.border = '1px solid '+config.global.border;
    container.getElementsByClassName('mod_name')[0].innerHTML = this.obj.mod_name;
    
    parent.appendChild(container);

    // PEEKABLE
    if(!this.obj.active)
        modulePeek.push( wrapper );

    // SETUP LISTENERS
    container.onclick = function(e) {
        self.toggle(1);
    }

}

module_gallery.prototype.createTab = function() {

    var self = this;

    var parent = document.getElementById('subcontainer');

    var container = document.createElement('div');
        container.id = 'tab_'+this.num;
        container.className = 'abs animate tab tab_'+this.obj.tab_class;

    var bg = document.createElement('img');
        bg.className = 'background abs btn';
        bg.src = getURL(config.global.tab.bg);

    var slidecontainer = document.createElement('div');
        slidecontainer.className = 'slides abs'

    var wrapper = document.createElement('div');
        wrapper.className = 'wrapper abs';

    var bn = document.createElement('div');
        bn.className = 'btn_next btn abs fa fa-angle-right prevnext animate';

    var bp = document.createElement('div');
        bp.className = 'btn_prev btn abs fa fa-angle-left prevnext animate';

    var close = document.createElement('div');
        close.className = 'close_tab abs btn';

    var header = document.createElement('div');
        header.className = 'tab_header abs btn';
        
    wrapper.appendChild(bn);
    wrapper.appendChild(bp);
    container.appendChild(bg);
    container.appendChild(slidecontainer);
    container.appendChild(wrapper);
    container.appendChild(header);
    container.appendChild(close);
    parent.appendChild(container);

    // SETUP LISTENERS
    bg.onclick = function(e) {
        Enabler.exit('Background');
    }

    header.onclick = function(e) {
        Enabler.exit('Header');
    }

    close.onclick = function(e){
        self.toggle(0);
    };

    bp.onclick = function(e){
        self.prevnext(0);
    }

    bn.onclick = function(e){
        self.prevnext(1);
    }

};

module_gallery.prototype.toggle = function(bool)
{
    var self = this;

    if(bool)
    {
        this.killMiniSlideShow();
        toggleSpinner(1);

        loadImage([ getURL(self.gallery[0][0]) ], function(e){
            addClass(document.getElementById('tab_'+self.num), 'active');
            toggleSpinner(0);
            Enabler.counter('Open Gallery Module', true);
            self.loadSlide(0, true);
        });

        EventBus.dispatch("KILL_SLIDESHOW", window);
    }
    else
    {
        Enabler.counter('Close Gallery Module', true);
        removeClass(document.getElementById('tab_'+this.num), 'active');
        setTimeout(function(){
             document.getElementById('tab_'+self.num).getElementsByClassName('slides')[0].innerHTML = "";
        }, 500);

    }
}

module_gallery.prototype.prevnext = function(bool) {

    var self = this;
    var nextslide;
    var right = false;

    if(activeButtons)
    {
        toggleSpinner(1);

        if(!bool) {

            right = true;

            if(self.currentSlide <= 0)
            {
                nextslide = self.gallery.length - 1;
            }
            else
            {
                nextslide = self.currentSlide-1
            }

            Enabler.counter('Gallery: Previous Slide', true);
        }
        else
        {
            if(self.currentSlide >= self.gallery.length-1 )
            {
                nextslide = 0;
            }
            else
            {
                nextslide = self.currentSlide+1
            }

            Enabler.counter('Gallery: Next Slide', true);
        }

        loadImage([getURL(self.gallery[nextslide][0])], function(e){
            toggleSpinner(0);
            self.loadSlide(nextslide, false, right);
        });

        addClass(document.getElementById('tab_'+this.num).getElementsByClassName('btn_prev')[0], 'disabled');
        addClass(document.getElementById('tab_'+this.num).getElementsByClassName('btn_next')[0], 'disabled');
    }
};

module_gallery.prototype.loadSlide = function(num, bool, arg)
{

    var self = this;

    activeButtons = false;

    if(num != this.currentSlide || bool)
    {

        trace(num);

        var classfrom;
        var oldSlide;

        if(arg)
            classfrom = 'slide_right';
        else
            classfrom = 'slide_left';


        if(bool)
        {
            classfrom = null;
            addClass(document.getElementById('tab_'+this.num).getElementsByClassName('btn_prev')[0], 'disabled');
        }
        else
            oldSlide = document.getElementById('tab_'+this.num).getElementsByClassName('slide_'+this.currentSlide)[0];

        this.currentSlide = num;

        var parent = document.getElementById('tab_'+this.num).getElementsByClassName('slides')[0];

        var slide = document.createElement('div');
            slide.className = 'slide abs animate slide_'+this.currentSlide;
            slide.style.backgroundImage = "url("+getURL(config.global.tab.bg)+")";

        var img = document.createElement('img');
            img.src = getURL(this.gallery[this.currentSlide][0]);
            img.className = 'abs adj';
            slide.appendChild(img);

        // if( gallery[this.currentSlide].length === 1 )
        // {
        //     img.style.height = '434px';
        // }
        // else
        // {

            var wrapper = document.createElement('div');
                wrapper.className = 'slide_infowrapper abs';
                slide.appendChild(wrapper);

            var index = document.createElement('div');
                //index.innerHTML = "slide "+( this.currentSlide+1 )+"/"+gallery.length;
                index.innerHTML = "slide "+( this.currentSlide + 1 )+"/"+(this.gallery.length);
                index.className = 'text_slide rel lato';
                wrapper.appendChild(index);

            var title = document.createElement('div');
                title.className = 'text_title rel lato';
                title.innerHTML = this.gallery[this.currentSlide][1];
                wrapper.appendChild(title);

            var info = document.createElement('div');
                info.className = 'text_info rel lato';
                info.innerHTML = this.gallery[this.currentSlide][2];
                wrapper.appendChild(info);

            // var attr = document.createElement('div');
            //     attr.className = 'text_attr rel lato btn';
            //     attr.innerHTML = this.gallery[this.currentSlide][3];
            //     wrapper.appendChild(attr);

        // }

        // attr.onclick = function(e) {
        //     Enabler.exitOverride('Gallery', self.obj.cta);
        // }

        parent.appendChild(slide);

        setTimeout(function(){
            if(oldSlide) addClass(oldSlide, classfrom);
        }, 100);

        setTimeout(function(){
            removeClass(document.getElementById('tab_'+self.num).getElementsByClassName('btn_prev')[0], 'disabled');
            removeClass(document.getElementById('tab_'+self.num).getElementsByClassName('btn_next')[0], 'disabled');

            if(oldSlide)
            {
                removeClass(oldSlide, 'forcetop');
                oldSlide.parentNode.removeChild(oldSlide);
            }

            addClass(slide, 'forcetop');

            //if(self.currentSlide === 0)
            //    addClass(document.getElementById('tab_'+self.num).getElementsByClassName('btn_prev')[0], 'disabled');

            //if(self.currentSlide === self.gallery.length-1)
            //    addClass(document.getElementById('tab_'+self.num).getElementsByClassName('btn_next')[0], 'disabled');

            activeButtons = true;

        }, 500);

        var link = info.getElementsByClassName('link')[0];
        trace(link);

        if(link)
        {
            link.onclick = function() {
                //Enabler.counter('Tips Link', true)
                Enabler.exit("GALLERY_TIPS_" + this.id.charAt(10) + "_CLICK");
            }
        }
    }
}

module_gallery.prototype.autoGallery = function()
{
    var self = this;
    
    this.galleryTimer = setTimeout(function(){
        clearTimeout(self.galleryTimer);

        loadImage([getURL(self.gallery[self.gIndex][0])], function(){

                 
            var el = document.createElement('img');
                el.className = 'abs animate mslide';
                el.style.opacity = 0;
                el.src = getURL(self.gallery[self.gIndex][0]);
                el.style.width = document.getElementById('module_'+self.num).offsetWidth + 'px'
                document.getElementById('mini_ss_'+self.num).appendChild(el);

            setTimeout(function(){
                el.style.top = ( ( (el.offsetHeight - document.getElementById('module_'+self.num).offsetHeight ) / 2 ) * -1 )+ 'px';
            }, 10);
                
            setTimeout(function(){
                el.style.opacity = 1;
            }, 50);

            trace(self.gIndex);
            self.gIndex++;


            if(self.gIndex < self.galleryLen) {
                self.galleryTimer = setTimeout( function(){
                    self.autoGallery();
                }, 800);
            } else {
                self.galleryTimer = setTimeout( function(){
                    self.killMiniSlideShow();
                }, 3000);
            }
        });
    }, 3000);
}

module_gallery.prototype.killMiniSlideShow = function()
{
    if(this.slideshow) {
        
        clearTimeout(this.galleryTimer);

        var tms = document.getElementById('mini_ss_'+this.num);
            tms.style.opacity = 0;

        setTimeout(function(){
            tms.parentNode.removeChild(tms);
        }, 1000);
    }
    this.slideshow = false;
}

