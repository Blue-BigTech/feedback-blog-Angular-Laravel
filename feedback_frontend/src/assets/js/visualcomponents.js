function dropDownBTN() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

let leftCollapsed = false;
function collapseLeft() {
  if(!leftCollapsed) {
    document.getElementById('leftSidebarNavsContainer').style.minWidth = '300px';
    //document.getElementById('leftSidebarContainer').style.borderRight = 'none';
    //document.getElementById('openLeftSideBtn').style.color = "#fff";
    document.getElementById('openLeftSideBtn').classList.add('toggledLeftSide');
    document.getElementById('leftSideOverview').style.width = '0';
    document.getElementById('leftSideShop').style.width = '0';
    leftOverviewBool = false;
    leftShopBool = false;
    leftCollapsed = true;
  } else {
    document.getElementById('leftSidebarNavsContainer').style.minWidth = '0px';
    //document.getElementById('openLeftSideBtn').style.color = "#8f8f8f";
    document.getElementById('openLeftSideBtn').classList.remove('toggledLeftSide');
    document.getElementById('leftSideOverview').style.width = '0';
    document.getElementById('leftSideShop').style.width = '0';
    leftOverviewBool = false;
    leftShopBool = false;
    leftCollapsed = false;
  }
}

let rightCollapsed = false;
function collapseRight() {
  if(!rightCollapsed) {
    document.getElementById('rightSidebarNavsContainer').style.display = 'block';
    document.getElementById('rightSidebarContainer').style.background = '#000';
    document.getElementById('collapseRightBtn').style.transform = 'rotateY(180deg)';
    rightCollapsed = true;
  } else {
    document.getElementById('rightSidebarNavsContainer').style.display = 'none';
    document.getElementById('rightSidebarContainer').style.background = '#161616';
    document.getElementById('collapseRightBtn').style.transform = 'rotateY(0deg)';
    rightCollapsed = false;
  }
}


function openTabs(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("inv-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("inv-tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" inv-tabsideLeft-active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " inv-tabsideLeft-active";
}

function scrollwithNextBox(id) {
  let x = window.scrollY + document.querySelector('#leftSideMenuTop').getBoundingClientRect().top; // Y
  console.log(x);

  document.querySelector('#'+id).style.marginTop = x-36+'px';
  document.querySelector('#leftSideMenuTop').style.marginTop = '0px';
}

function scrollwithNextBoxDetails(id) {
  let x = window.scrollY + document.querySelector('#leftSideDetailsTop').getBoundingClientRect().top; // Y
  console.log(x);

  document.querySelector('#'+id).style.marginTop = x-36+'px';
  document.querySelector('#leftSideDetailsTop').style.marginTop = '0px';
}


function fullScreenBox() {
  let id = localStorage.getItem('selectedPane');
  console.log('11111',id);
  if (document.getElementById(id)) {
    document.getElementById(id).requestFullscreen();
    console.log('11111',id);
  }/* else if (document.getElementById(id).webkitRequestFullscreen)
  document.getElementById(id).webkitRequestFullscreen();
    console.log('2222',id);
  } else if (document.getElementById(id).msRequestFullscreen) {
  document.getElementById(id).msRequestFullscreen();
    console.log('33333',id);
  }*/
}

function fullScreenPane() {
  let x = localStorage.getItem('selectedPane');
  let box = document.getElementById(x)
  box.style.zIndex = "1000100";
  box.style.top = "0";
  box.style.left = "0";
  box.style.right = "0";
  box.style.bottom = "0";
  box.style.position = "fixed";
}


let leftOverviewBool = false;
function toggleOverview() {
  if(!leftOverviewBool) {
    document.getElementById('leftSideOverview').style.width = 'calc(100vw - 348px)';
    document.getElementById('leftSideShop').style.width = '0';
    document.getElementById('leftSidebarNavsContainer').style.minWidth = '0';
    leftOverviewBool = true;
    leftShopBool = false;
    leftCollapsed = false;
  } else {
    document.getElementById('leftSideOverview').style.width = '0';
    leftOverviewBool = false;
  }
}

let leftShopBool = false;
function toggleShop() {
  if(!leftShopBool) {
    document.getElementById('leftSideOverview').style.width = '0';
    document.getElementById('leftSideShop').style.width = 'calc(100vw - 348px)';
    document.getElementById('leftSidebarNavsContainer').style.minWidth = '0';
    leftShopBool = true;
    leftOverviewBool = false;
    leftCollapsed = false;
  } else {
    document.getElementById('leftSideShop').style.width = '0';
    leftShopBool = false;
  }
}
