const navItems = document.querySelectorAll(".nav-item");
const bullet = document.querySelector(".bullet");

const firstIcon = navItems[0].querySelector(".icon-item");
firstIcon.style.zIndex = "99";
firstIcon.style.transform = "translateY(-150%)";

navItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    const dataIndex = item.getAttribute("data-index");

    bullet.style.setProperty("--bullet-index", dataIndex);

    navItems.forEach((navItem, idx) => {
      const icon = navItem.querySelector(".icon-item");
      icon.style.zIndex = "";
      icon.style.transform = "";
    });

    const icon = item.querySelector(".icon-item");
    icon.style.zIndex = "99";
    icon.style.transform = "translateY(-150%)";
  });
});
Ï;
