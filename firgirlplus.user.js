// ==UserScript==
// @name         Fitgirl+
// @namespace    fitgirlPlus
// @version      0.1
// @description  Adding personal touches and improvements to Fitgirl.site
// @author       DoesntMatter
// @match        https://fitgirl-repacks.site/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fitgirl-repacks.site
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    //Cause why not...
    let d = document;

    //Rework site wording... a little bit, im not trying to be an ahole i promise, just to be concise and to the point, this also saves space in some cases ;)
    let menuItem40173 = d.querySelectorAll('.menu-item-40173 > a'), //"Popular Repacks" to "Popular"
        menuItem1531 = d.querySelectorAll('.menu-item-1531 > a'), //"All My Repacks, A-Z" to "All (A-Z)"
        menuItem1707 = d.querySelectorAll('.menu-item-1707 > a'), //"Repack Troubleshooting" to "Troubleshooting"
        menuItem40101 = d.querySelectorAll('.menu-item-40101 > a'), //"Top 50 Repacks of the Month" to "Top 50 (Month)"
        menuItem40169 = d.querySelectorAll('.menu-item-40169 > a'), //"Top 150 Repacks of The Year" to "Top 150 (Year)"
        menuItem27870 = d.querySelectorAll('.menu-item-27870 > a'), //"Games with my personal Pink Paw Award" to "Pink Paw Awards"
        menuItem19963 = d.querySelectorAll('.menu-item-19963 > a'), //"Switch Emulated Repacks" to "Switch Emulated"
        menuItem19960 = d.querySelectorAll('.menu-item-19960 > a'); //"PS3 Emulated Repacks" to "PS3 Emulated"

    d.querySelector('#custom_html-2 > h1').innerHTML = 'RSS FEED';
    d.querySelector('#custom_html-2 > div').innerHTML = 'Get the latest updates automatically via: <a href="http://fitgirl-repacks.site/feed/"><b>RSS FEED</b></a>';
    d.querySelector('#blog_subscription-2 > h1').innerHTML = 'SUBSCRIBE';
    d.querySelector('#subscribe-text > p').innerHTML = 'Subscribe and receive new post notifications via email';
    d.querySelector('#custom_html-4 > h1').innerHTML = 'PLAY MY OST';
    d.querySelector('#block-2 > div > h2').innerHTML = "Week's Popular Repacks";
    d.querySelector('#block-6 > div > div > h2').innerHTML = "Today's Popular"
    d.querySelector('#custom_html-4 > div > p').innerHTML = `Regular Games
                                                             <iframe src="https://www.youtube.com/embed/72QAAOaYW2M" allowfullscreen="" width="100%" frameborder="0"></iframe>
                                                             Japanese Games
                                                             <iframe src="https://www.youtube.com/embed/IFzUTKsrbN8" allowfullscreen="" width="100%" frameborder="0"></iframe>`;

    //Move the No Request Banner to the top of all the pages, maybe people will learn no to ask this way
    let noRequests = d.querySelector('#post-36778 > div > div:nth-child(4) > p:nth-child(7)');
    let bannerParent = d.querySelector('#main-content');
    let banner = d.createElement('div');
    banner.setAttribute('class', 'banner');
    banner.innerHTML = 'DO NOT ASK FOR ANY PARTICULAR REPACKS IN COMMENTS. I NEVER SERVE REQUESTS.';

    //Trying to remove the original banner that was buried below, but if its not there move on
    try {
       noRequests.remove();
    } catch(err) {
       console.log('No Old Banner Found');
    }

    bannerParent.prepend(banner);

    //Move Todays Popular repack list from footer to side bar alignside with the Weeks repacks, seems more consistent them being right after another on the side bar
    let todaysPopularData = d.querySelector('#block-6 > div > div > div').innerHTML;
    let todaysPopular = d.createElement('aside');
    todaysPopular.setAttribute('class', 'widget widget_block');
    todaysPopular.innerHTML = `<div class="jetpack_top_posts_widget">
                                  <h2 class="widgettitle">Todays's Popular Repacks</h2>
                                  <div class="widgets-grid-layout no-grav">
                                     ${todaysPopularData}
                                  </div>
                               </div>`;
    let rightSideBar = d.querySelector('#content-sidebar');
    rightSideBar.insertBefore(todaysPopular, rightSideBar.children[1]);

    //Get all images and filter to the ones for torrent data from torrent-stats per post, as its an image its getting the global image shadow styles, and it wasnt pretty.
    let allImages = Array.from(d.querySelectorAll("img")).map((img) => {
        if (img.src.includes('torrent-stats')) {
           img.style.boxShadow = 'none';
           img.style.pointerEvents = "none";

        }
    });

    //Remove unnecesary info from footer now that i was moved to the right side
    d.querySelector('#supplementary').remove()

    // Cute signature :)
    d.querySelector('#colophon > div > a').innerHTML = 'Proudly powered by WordPress and blissfully populated by FitGirl'

    //General text rework for all the menu items above, looping casue they all have 2 instances at the site this way both change at the same time
    menuItem40173.forEach((e) => {
        e.innerText = 'Popular';
    });

    menuItem1531.forEach((e) => {
        e.innerText = 'All (A-Z)';
    });

    menuItem1707.forEach((e) => {
        e.innerText = 'Troubleshooting';
    });

    menuItem40101.forEach((e) => {
        e.innerText = 'Top 50 (Month)';
    });

    menuItem40169.forEach((e) => {
        e.innerText = 'Top 150 (Year)';
    });

    menuItem27870.forEach((e) => {
        e.innerText = 'Pink Paw Awards';
    });

    menuItem19963.forEach((e) => {
        e.innerText = 'Switch Emulated';
    });

    menuItem19960.forEach((e) => {
        e.innerText = 'PS3 Emulated';
    });


//-------------------
// Styles begin here!
// NOTE: Most likely more can be done or cleaner, for now its funcional, annotated all changes
//-------------------

    GM_addStyle(`

/* Center the site and remove dark background and other site globals*/

body {
   max-width: max-content;
   margin: auto;
   background-color: #f5f5f5 !important;
   box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

/* Fix crypto table width */
table {
   table-layout: fixed;
}

/* Add cute transition effect and small shadows to all images to make them pop a bit*/

img {
   transition: all 1s ease;
   box-shadow: rgba(0, 0, 0, 1) 0px 3px 8px;
}

img:hover {
   transform: scale(1.1);
}

/* No Requets banner relocation and adding bit of responsiveness*/

.banner {
   color: #ff0000;
   margin-top: 12px;
   margin-left: 230px;
   padding: 10px;
   width: 670px;
   text-align: center;
   font-weight: bold;
   border-radius: 10px;
   box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

@media screen and (max-width: 1235px) {
    .banner {
        width: 400px;
    }
}

@media screen and (max-width: 1008px) {
    .banner {
        margin-left: 20px;
    }
}

@media screen and (max-width: 768px) {
    .banner {
        display: none;
    }
}


/* Lighten up the website side bars and nav bars */

#secondary {
   /*background-color: #333333 !important;*/
   background-image: linear-gradient(to top, rgba(51,51,51,0), rgba(51,51,51,1), rgba(51,51,51,1), rgba(51,51,51,1), rgba(51,51,51,1), rgba(51,51,51,1), rgba(51,51,51,1), rgba(51,51,51,1));
   padding-top: 10px;
   padding-left: 15px;
   border-bottom-right-radius: 15px;
}

.site-header {
   background-color: #333333 !important;
}

.content-sidebar {
   /*background-color: #333333 !important;*/
   padding: 5px;
   border
}

.widget-grid-view-image > a {
   padding-right: 5px;
   padding-bottom: 5px;
}

/* Search button and bar adjustments and rounding */

.search-toggle {
   transition: all 1s ease;
   border-radius: 25px;
   height: 40px;
   width: 40px;
   margin-top: 4px;
   margin-right: 5px;
}

.search-toggle:before {
   margin-top: 10px;
}

.search-toggle:hover {
   transform: scale(1.1);
}

.search-box {
   border-radius: 10px;
   width: 255px;
   float: right;
   margin-right: 5px;
   margin-top: 10px;
}

@media screen and (min-width: 673px) {
    .search-box .search-field {
        width: 100%;
    }
}

/* Logo adjustments */

.site-title {
   font-size: 24px;
   font-weight: 900;
   margin-left: -10px;
}

/* Increase font of the Nav menu */

.site-navigation {
   font-size: 13px;
   font-weight: bold;
}

/* Move search button when site compresses and hamburger appears */

@media screen and (max-width: 782px) {
    .search-toggle {
        margin-right: 20px !important;
    }
}

@media screen and (max-width: 672px) {
    .search-toggle {
        margin-right: 40px !important;
    }
}

@media screen and (min-width: 783px) {
    .primary-navigation a {
        display: inline-block;
        padding: 0 6px;
        white-space: nowrap;
    }
}

/* Adjust center content column so it doesnt overlap the side bar on the right */

@media screen and (min-width: 1080px) {
    .site-content, .site-main .widecolumn {
        margin-left: 180px;
    }
}

/* Remove the black bar after the side bar is finished as its being gracefully fadeout to merge with the center content*/

@media screen and (min-width: 1008px) {
    .site:before {
        display: none;
        background-color: #fff;
    }

/* Fix side bar and top bar menus, make them blow out and rounded, submenus the same but reverse */

@media screen and (min-width: 1008px) {
    #secondary .menu-item-40173 > a,
    #secondary .menu-item-1531 > a,
    #secondary .menu-item-1532 > a,
    #secondary .menu-item-1533 > a,
    #secondary .menu-item-1534 > a,
    #secondary .menu-item-1707 > a {
       border-bottom-left-radius: 25px;
       border-top-left-radius: 25px;
    }
}

#secondary .menu-item-40173 > ul, #secondary .menu-item-40101 > a, #secondary .menu-item-1531 > ul, #secondary .menu-item-27870 > a  {
   border-top-right-radius: 10px;
}

#secondary .menu-item-40173 > ul, #secondary .menu-item-40169 > a, #secondary .menu-item-1531 > ul, #secondary .menu-item-19960 > a  {
   border-bottom-right-radius: 10px;
}

#menu-item-40173 > ul, #menu-item-40169 > a, #menu-item-1531 > ul, #menu-item-19960 > a {
   border-bottom-right-radius: 10px;
   border-bottom-left-radius: 10px;
}

/* Fix site description below logo to be more readable*/

.site-description {
   margin: 0px -15px 10px 0;
   text-align: justify;
}

/* Widget titles bigger and widgets more compact*/

.widget {
   margin-bottom: 25px;
}

.widget-title {
   font-size: 16px !important;
}

/* Primary sidebar below navigation adjustments more centered and allow for more space to be used */

.primary-sidebar {
   margin-right: -15px;
}

/* Round up Donate button */

#lbjoin2 {
   border-radius: 25px !important;
}

/* Match Subscribe button to Donate as best possible */

.wp-block-button__link{
   font-size: 18px !important;
   padding: 5px !important;
   font-weight: 500;
   text-transform: capitalize;
   width: 180px;
}

#subscribe-email input {
    width: 100%;
}

/* Separate aside widgets */

aside {
   border-bottom: 1px solid rgba(255, 255, 255, 0.2);
   padding-bottom: 25px;
}

aside > h1 {
   text-align: center;
}

/* Reset FG image with request for support, make it more centered and visible */

#block-4 > center > a > img {
   box-shadow: none;
   width: 70%;
   margin-top: 30px !important;
   margin-left: 20px !important;
}

/* Make swiper buttons visible as they are overlapping the images */

.swiper-button-next, .swiper-button-prev{
   color: #f887ff !important;
   display: block !important;
   top: 90% !important;
   --swiper-navigation-size: 20px;
}

/* Repeated style accross all articles that was breaking the centering of the posts */

.hentry {
   margin-right: 0 !important;
   margin-left: 0 !important;
   max-width: 85% !important;
   margin-left: 28px !important;
}

/* Fix entry headers being too large and overlapping side bar on the right*/

.entry-header, .entry-content{
   margin-right: 0 !important;
   padding-right: 0 !important;
}

/* Center spoiler drop downs*/

.su-spoiler {
   width: 97% !important;
}

/* Center widget caption text */

.jetpack_top_posts_widget {
   text-align: center;
}

/* Footer fixes */

.site-info, .site-footer {
   text-align: center;
}

    `);

    //Just checking that this script is working
    console.log('Is it pretty yet?');

})();
