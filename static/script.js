

document.onkeydown = function (e) {
    if (e.key === "F12") {
        e.preventDefault();
    }
};

document.body.oncontextmenu = function (e) {
    e.preventDefault();
};

function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function wx(imageURL) {
    toggleClass(".tc", "active");
    toggleClass(".tc-main", "active");

    var tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
}




document.addEventListener('DOMContentLoaded', function () {


   var themeState = getCookie("themeState") || "Blue"; 
    var svgItems = document.getElementsByTagName("svg");
    var tanChiShe = document.getElementById("tanChiShe");
    var body = document.body;
    function changeSvg(color) {
        for (var i = 0; i < svgItems.length; i++) {
            var paths = svgItems[i].getElementsByTagName("path");
            for (var j = 0; j < paths.length; j++) {
                paths[j].setAttribute("fill", color);
            }
        }
    }
    function changeTheme(theme) {
        if (theme == "Light") {
           themeState = "Light";
            changeSvg("#000000");
            tanChiShe.src = "/static/svg/snake-Light.svg";
            var lightStyles = {
                '--main-bg-color': '#ffffff',
                '--main-text-color': '#000000',
                '--gradient-start': '#607df1',
                '--gradient-middle': '#e0321b',
                '--gradient-end': '#000000',
                '--purple-text-color': '#2b3ce2',
                '--text-bg-color': '#f4f4f4',
                '--icon-bg-color': 'rgb(246 246 246)',
                '--icon-1-hover-color': 'rgb(68, 120, 241)',
                '--icon-2-hover-color': 'rgb(232, 68, 241)',
                '--icon-3-hover-color': 'rgb(179, 206, 0)',
                '--icon-4-hover-color': 'rgb(201, 13, 0)',
                '--icon-5-hover-color': 'rgb(111, 44, 20)',
                '--project-item-bg-color': 'rgb(246 246 246)',
                '--project-item-hover-color': '#eeeeee',
                '--project-item-left-title-color': '#000000',
                '--project-item-left-text-color': '#7e7e7e'
            };
            for (const property in lightStyles) {
                body.style.setProperty(property, lightStyles[property]);
            }

        } else if (theme == "Dark") {
             themeState = "Dark";
            changeSvg("#ffffff");
            tanChiShe.src = "/static/svg/snake-Dark.svg";
            const dackStyles = {
                '--main-bg-color': 'rgb(0, 0, 0)',
                '--main-text-color': '#ffffff',
                '--gradient-start': 'rgb(133, 62, 255)',
                '--gradient-middle': '#f76cc6 30%',
                '--gradient-end': 'rgb(255, 255, 255) 60%',
                '--purple-text-color': 'rgb(115, 19, 206)',
                '--text-bg-color': 'rgb(26, 4, 48)',
                '--icon-bg-color': 'rgb(19 20 24)',
                '--icon-1-hover-color': 'rgb(68, 120, 241)',
                '--icon-2-hover-color': 'rgb(232, 68, 241)',
                '--icon-3-hover-color': 'rgb(179, 206, 0)',
                '--icon-4-hover-color': 'rgb(201, 13, 0)',
                '--icon-5-hover-color': 'rgb(111, 44, 20)',
                '--project-item-bg-color': 'rgb(19 20 24)',
                '--project-item-hover-color': 'rgb(19, 23, 27)',
                '--project-item-left-title-color': 'rgb(255, 255, 255)',
                '--project-item-left-text-color': 'rgb(142, 142, 142)',
                '--footer-text-color': '#646464'
            };

            for (const property in dackStyles) {
                body.style.setProperty(property, dackStyles[property]);
            }
        }else if (theme == "Blue") {
 themeState = "Blue";
            changeSvg("#000000");
            tanChiShe.src = "/static/svg/snake-Light.svg";
            var blueStyles = {
                '--main-bg-color': ' linear-gradient(45deg, #7fb2e5, white)',
                '--main-text-color': '#000000',
                '--gradient-start': '#607df1',
                '--gradient-middle': '#e0321b',
                '--gradient-end': '#000000',
                '--purple-text-color': '#2b3ce2',
                '--text-bg-color': '#f4f4f4',
                '--icon-bg-color': 'rgba(249, 250, 251, 0.6)',
                '--icon-1-hover-color': 'rgb(68, 120, 241)',
                '--icon-2-hover-color': 'rgb(232, 68, 241)',
                '--icon-3-hover-color': 'rgb(179, 206, 0)',
                '--icon-4-hover-color': 'rgb(201, 13, 0)',
                '--icon-5-hover-color': 'rgb(111, 44, 20)',
                '--project-item-bg-color': 'rgba(249, 250, 251, 0.6)',
                '--project-item-hover-color': 'rgba(240, 241, 241, 0.6)',
                '--project-item-left-title-color': '#000000',
                '--project-item-left-text-color': '#7e7e7e'
            };
            for (const property in blueStyles) {
                body.style.setProperty(property, blueStyles[property]);
            }

        }
       setCookie("themeState", theme, 365);
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}
changeTheme(themeState);
   



    const switchCheckbox = document.getElementById('myonoffswitch');
    /*夜间自动打开暗色主题
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 18 || currentHour < 6) {
        switchCheckbox.checked = false;
        changeTheme(1);
    }
  */

switchCheckbox.addEventListener('change', function () {
   if (themeState == "Light"){
       
       changeTheme("Blue");
   }else if(themeState == "Dark"){
    
       changeTheme("Light");
       
   }else if(themeState == "Blue"){
       
       changeTheme("Dark");
   }
});


    var projectItems = document.querySelectorAll(".projectItem");

    function checkProjectItems() {
        for (var i = 0; i < projectItems.length; i++) {
            var projectItem = projectItems[i];
            var projectItemTop = projectItem.getBoundingClientRect().top;

            if (projectItemTop < window.innerHeight * 1.05) {
                projectItem.classList.add("fade-in-visible");
            }
        }
    }

    window.addEventListener("scroll", checkProjectItems);
    window.addEventListener("resize", checkProjectItems);

    checkProjectItems();




});