const renderTipForMobileBrowsers = () => document.querySelector("#tip").innerHTML = "<p>Press & Hold</p>";
if(window.matchMedia("(any-hover: none)").matches) renderTipForMobileBrowsers();