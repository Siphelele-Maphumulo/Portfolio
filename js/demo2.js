/**
 * demo2.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
    // From https://davidwalsh.name/javascript-debounce-function.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    class Slideshow {
        constructor(el) {
            this.DOM = {};
            this.DOM.el = el;
            this.settings = {
                animation: {
                    slides: {
                        duration: 600,
                        easing: 'easeOutQuint'
                    },
                    shape: {
                        duration: 300,
                        easing: { in: 'easeOutQuad', out: 'easeOutQuad' }
                    }
                },
                frameFill: '#111'
            }
            this.init();
        }
        init() {
            this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slides > .slide'));
            this.slidesTotal = this.DOM.slides.length;
            this.DOM.nav = this.DOM.el.querySelector('.slidenav');
            this.DOM.nextCtrl = this.DOM.nav.querySelector('.slidenav__item--next');
            this.DOM.prevCtrl = this.DOM.nav.querySelector('.slidenav__item--prev');
            this.current = 0;
            this.createFrame();
            this.initEvents();
        }
        createFrame() {
            this.rect = this.DOM.el.getBoundingClientRect();
            this.frameSize = this.rect.width / 12;
            this.paths = {
                initial: this.calculatePath('initial'),
                final: this.calculatePath('final')
            };
            this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.DOM.svg.setAttribute('class', 'shape');
            this.DOM.svg.setAttribute('width', '100%');
            this.DOM.svg.setAttribute('height', '100%');
            this.DOM.svg.setAttribute('viewbox', `0 0 ${this.rect.width} ${this.rect.height}`);
            this.DOM.svg.innerHTML = `<path fill="${this.settings.frameFill}" d="${this.paths.initial}"/>`;
            this.DOM.el.insertBefore(this.DOM.svg, this.DOM.nav);
            this.DOM.shape = this.DOM.svg.lastElementChild;
        }
        updateFrame() {
            this.paths.initial = this.calculatePath('initial');
            this.paths.final = this.calculatePath('final');
            this.DOM.svg.setAttribute('viewbox', `0 0 ${this.rect.width} ${this.rect.height}`);
            this.DOM.shape.setAttribute('d', this.isAnimating ? this.paths.final : this.paths.initial);
        }
        calculatePath(path = 'initial') {
            if (path === 'initial') {
                return `M 0,0 0,${this.rect.height} ${this.rect.width},${this.rect.height} ${this.rect.width},0 0,0 Z M 0,0 ${this.rect.width},0 ${this.rect.width},${this.rect.height} 0,${this.rect.height} Z`;
            } else {
                return {
                    next: `M 0,0 0,${this.rect.height} ${this.rect.width},${this.rect.height} ${this.rect.width},0 0,0 Z M ${this.frameSize},${this.frameSize} ${this.rect.width-this.frameSize},${this.frameSize/2} ${this.rect.width-this.frameSize},${this.rect.height-this.frameSize/2} ${this.frameSize},${this.rect.height-this.frameSize} Z`,
                    prev: `M 0,0 0,${this.rect.height} ${this.rect.width},${this.rect.height} ${this.rect.width},0 0,0 Z M ${this.frameSize},${this.frameSize/2} ${this.rect.width-this.frameSize},${this.frameSize} ${this.rect.width-this.frameSize},${this.rect.height-this.frameSize} ${this.frameSize},${this.rect.height-this.frameSize/2} Z`
                }
            }
        }
        initEvents() {
            this.DOM.nextCtrl.addEventListener('click', () => this.navigate('next'));
            this.DOM.prevCtrl.addEventListener('click', () => this.navigate('prev'));

            window.addEventListener('resize', debounce(() => {
                this.rect = this.DOM.el.getBoundingClientRect();
                this.updateFrame();
            }, 20));

            document.addEventListener('keydown', (ev) => {
                const keyCode = ev.keyCode || ev.which;
                if (keyCode === 37) {
                    this.navigate('prev');
                } else if (keyCode === 39) {
                    this.navigate('next');
                }
            });
        }
        navigate(dir = 'next') {
            if (this.isAnimating) return false;
            this.isAnimating = true;

            const animateShapeIn = anime({
                targets: this.DOM.shape,
                duration: this.settings.animation.shape.duration,
                easing: this.settings.animation.shape.easing.in,
                d: dir === 'next' ? this.paths.final.next : this.paths.final.prev
            });

            const animateSlides = () => {
                return new Promise((resolve, reject) => {
                    const currentSlide = this.DOM.slides[this.current];
                    anime({
                        targets: currentSlide,
                        duration: this.settings.animation.slides.duration,
                        easing: this.settings.animation.slides.easing,
                        translateX: dir === 'next' ? -1 * this.rect.width : this.rect.width,
                        complete: () => {
                            currentSlide.classList.remove('slide--current');
                            resolve();
                        }
                    });

                    this.current = dir === 'next' ?
                        this.current < this.slidesTotal - 1 ? this.current + 1 : 0 :
                        this.current > 0 ? this.current - 1 : this.slidesTotal - 1;

                    const newSlide = this.DOM.slides[this.current];
                    newSlide.classList.add('slide--current');
                    anime({
                        targets: newSlide,
                        duration: this.settings.animation.slides.duration,
                        easing: this.settings.animation.slides.easing,
                        translateX: [dir === 'next' ? this.rect.width : -1 * this.rect.width, 0]
                    });

                    const newSlideImg = newSlide.querySelector('.slide__img');
                    newSlideImg.style.transformOrigin = dir === 'next' ? '-10% 50%' : '110% 50%';
                    anime.remove(newSlideImg);
                    anime({
                        targets: newSlideImg,
                        duration: this.settings.animation.slides.duration * 4,
                        easing: 'easeOutElastic',
                        elasticity: 350,
                        scale: [1.2, 1],
                        rotate: [dir === 'next' ? 4 : -4, 0]
                    });

                    anime({
                        targets: [newSlide.querySelector('.slide__title'), newSlide.querySelector('.slide__desc'), newSlide.querySelector('.slide__link')],
                        duration: this.settings.animation.slides.duration,
                        easing: this.settings.animation.slides.easing,
                        delay: (t, i, total) => dir === 'next' ? i * 100 + 750 : (total - i - 1) * 100 + 750,
                        translateY: [dir === 'next' ? 300 : -300, 0],
                        rotate: [15, 0],
                        opacity: [0, 1]
                    });
                });
            };

            const animateShapeOut = () => {
                anime({
                    targets: this.DOM.shape,
                    duration: this.settings.animation.shape.duration,
                    delay: 150,
                    easing: this.settings.animation.shape.easing.out,
                    d: this.paths.initial,
                    complete: () => this.isAnimating = false
                });
            }

            animateShapeIn.finished.then(animateSlides).then(animateShapeOut);
        }
    };

    new Slideshow(document.querySelector('.slideshow'));
    imagesLoaded('.slide__img', { background: true }, () => document.body.classList.remove('loading'));
};

'use strict';

/**
 * Demo.
 */
var demo = (function(window, undefined) {

    /**
     * Enum of CSS selectors.
     */
    var SELECTORS = {
        pattern: '.pattern',
        card: '.card',
        cardImage: '.card__image',
        cardClose: '.card__btn-close',
    };

    /**
     * Enum of CSS classes.
     */
    var CLASSES = {
        patternHidden: 'pattern--hidden',
        polygon: 'polygon',
        polygonHidden: 'polygon--hidden'
    };

    /**
     * Map of svg paths and points.
     */
    var polygonMap = {
        paths: null,
        points: null
    };

    /**
     * Container of Card instances.
     */
    var layout = {};

    /**
     * Initialise demo.
     */
    function init() {

        // For options see: https://github.com/qrohlf/Trianglify
        var pattern = Trianglify({
            width: window.innerWidth,
            height: window.innerHeight,
            cell_size: 120,
            variance: 1,
            stroke_width: 0.5,
            color_function: function(x, y) {
                return '#7cc576';
            }
        }).svg(); // Render as SVG.

        _mapPolygons(pattern);

        _bindCards();
    };

    /**
     * Store path elements, map coordinates and sizes.
     * @param {Element} pattern The SVG Element generated with Trianglify.
     * @private
     */
    function _mapPolygons(pattern) {

        // Append SVG to pattern container.
        $(SELECTORS.pattern).append(pattern);

        // Convert nodelist to array,
        // Used `.childNodes` because IE doesn't support `.children` on SVG.
        polygonMap.paths = [].slice.call(pattern.childNodes);

        polygonMap.points = [];

        polygonMap.paths.forEach(function(polygon) {

            // Hide polygons by adding CSS classes to each svg path (used attrs because of IE).
            $(polygon).attr('class', CLASSES.polygon + ' ' + CLASSES.polygonHidden);

            var rect = polygon.getBoundingClientRect();

            var point = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };

            polygonMap.points.push(point);
        });

        // All polygons are hidden now, display the pattern container.
        $(SELECTORS.pattern).removeClass(CLASSES.patternHidden);
    };

    /**
     * Bind Card elements.
     * @private
     */
    function _bindCards() {

        var elements = $(SELECTORS.card);

        $.each(elements, function(card, i) {

            var instance = new Card(i, card);

            layout[i] = {
                card: instance
            };

            var cardImage = $(card).find(SELECTORS.cardImage);
            var cardClose = $(card).find(SELECTORS.cardClose);

            $(cardImage).on('click', _playSequence.bind(this, true, i));
            $(cardClose).on('click', _playSequence.bind(this, false, i));
        });
    };

    /**
     * Create a sequence for the open or close animation and play.
     * @param {boolean} isOpenClick Flag to detect when it's a click to open.
     * @param {number} id The id of the clicked card.
     * @param {Event} e The event object.
     * @private
     *
     */
    function _playSequence(isOpenClick, id, e) {

        var card = layout[id].card;

        // Prevent when card already open and user click on image.
        if (card.isOpen && isOpenClick) return;

        // Create timeline for the whole sequence.
        var sequence = new TimelineLite({ paused: true });

        var tweenOtherCards = _showHideOtherCards(id);

        if (!card.isOpen) {
            // Open sequence.

            sequence.add(tweenOtherCards);
            sequence.add(card.openCard(_onCardMove), 0);

        } else {
            // Close sequence.

            var closeCard = card.closeCard();
            var position = closeCard.duration() * 0.8; // 80% of close card tween.

            sequence.add(closeCard);
            sequence.add(tweenOtherCards, position);
        }

        sequence.play();
    };

    /**
     * Show/Hide all other cards.
     * @param {number} id The id of the clcked card to be avoided.
     * @private
     */
    function _showHideOtherCards(id) {

        var TL = new TimelineLite;

        var selectedCard = layout[id].card;

        for (var i in layout) {

            var card = layout[i].card;

            // When called with `openCard`.
            if (card.id !== id && !selectedCard.isOpen) {
                TL.add(card.hideCard(), 0);
            }

            // When called with `closeCard`.
            if (card.id !== id && selectedCard.isOpen) {
                TL.add(card.showCard(), 0);
            }
        }

        return TL;
    };

    /**
     * Callback to be executed on Tween update, whatever a polygon
     * falls into a circular area defined by the card width the path's
     * CSS class will change accordingly.
     * @param {Object} track The card sizes and position during the floating.
     * @private
     */
    function _onCardMove(track) {

        var radius = track.width / 2;

        var center = {
            x: track.x,
            y: track.y
        };

        polygonMap.points.forEach(function(point, i) {

            if (_detectPointInCircle(point, radius, center)) {
                $(polygonMap.paths[i]).attr('class', CLASSES.polygon);
            } else {
                $(polygonMap.paths[i]).attr('class', CLASSES.polygon + ' ' + CLASSES.polygonHidden);
            }
        });
    }

    /**
     * Detect if a point is inside a circle area.
     * @private
     */
    function _detectPointInCircle(point, radius, center) {

        var xp = point.x;
        var yp = point.y;

        var xc = center.x;
        var yc = center.y;

        var d = radius * radius;

        var isInside = Math.pow(xp - xc, 2) + Math.pow(yp - yc, 2) <= d;

        return isInside;
    };

    // Expose methods.
    return {
        init: init
    };

})(window);

// Kickstart Demo.
window.onload = demo.init;