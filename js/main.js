/* ----------------- Toggle Navbar------------------*/
const navToggler =document.querySelector(".nav-toggler");
navToggler.addEventListener("click", (e)=>{
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
})
function hideSection(){
    document.querySelector("section.active").classList.toggle("fade-out")
}
function toggleNavbar(){
    document.querySelector(".header").classList.toggle("active")
}

/* ----------------- Active Section ------------------*/
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("link-item") && e.target.hash !== ""){
        // active overlay to prevent mulitple clicks
        document.querySelector(".overlay").classList.add("active")
        navToggler.classList.add("hide");
        const hash = e.target.hash;
        if(e.target.classList.contains("nav-item")){
            toggleNavbar();
        } 
        else {
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(() =>{
            document.querySelector("section.active").classList.remove("active","fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide")
            document.querySelector(".overlay").classList.remove("active")
        },500);
    }
});



/* ----------------- About Tabs ------------------*/
// Selecting elements from the DOM
// In tabsContainer, it indicates which tab is currently selected. (only tab)
// In aboutSection, it controls which content section is visible. (content)
const tabsContainer = document.querySelector(".about-tabs"), // Selects the container that holds the tabs
      aboutSection = document.querySelector(".about-section"); // Selects the section related to the tabs

// Adding an event listener to the tabs container for click events
tabsContainer.addEventListener("click", (e) => {
    // Checking if the clicked element is a tab item and is not already active
    if (e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
        // Removing the 'active' class from the currently active tab
        //button selection
        tabsContainer.querySelector(".active").classList.remove("active");
        // Adding the 'active' class to the clicked tab (e.target)
        e.target.classList.add("active");

        // Retrieving the 'data-target' attribute value of the clicked tab
        // This should correspond to the ID of the content to display

        //content selection
        const target = e.target.getAttribute("data-target");
        // Removing the 'active' class from the currently displayed content
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        // Adding the 'active' class to the content element whose ID matches the 'data-target' value
        // This makes the corresponding content visible
        aboutSection.querySelector(target).classList.add("active");
    }
});

/* ----------------- Portfolio Item Details Popup------------------*/
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("view-project-btn")){
        togglePortfolioPopup();
        document.querySelector(".portfolio-popup").scrollTo(0,0)
        console.log(e.target.parentElement)
        portfolioItemDetails(e.target.parentElement);
    }
})
function togglePortfolioPopup(){
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling")
    document.querySelector(".main").classList.toggle("fade-out")
}
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

// hide popup when clicking outside of it
document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("pp-inner")){
        togglePortfolioPopup();
    }
})

function portfolioItemDetails(portfolioItem){
    document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML = portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}

