document.addEventListener("DOMContentLoaded", function () {
    // Cache phần tử dùng chung
    const backTop = document.querySelector("#back-top");

    // 1. Xử lý chuyển tab
    function handleChangeTab() {
        const changeTabs = document.querySelectorAll('.js__changeTab');
        if (!changeTabs.length) return;

        changeTabs.forEach((changeTab) => {
            const tabs = changeTab.querySelectorAll(".js__tabItem");
            const panes = changeTab.querySelectorAll(".js__tabPane");

            tabs.forEach((tab, index) => {
                tab.onclick = function () {
                    const pane = panes[index]; // Đã thêm 'const' để tránh ô nhiễm global scope
                    if (!pane) return;

                    const activeTab = changeTab.querySelector('.js__tabItem.active');
                    const activePane = changeTab.querySelector('.js__tabPane.active');

                    if (activeTab) activeTab.classList.remove('active');
                    if (activePane) activePane.classList.remove('active');

                    this.classList.add('active');
                    pane.classList.add('active');
                };
            });
        });
    }

    // 2. Xử lý video tỉ lệ 16:9
    function handleVideo_16x9() {
        const video169s = document.querySelectorAll(".js__video169");
        if (!video169s.length) return;

        video169s.forEach((video169) => {
            const videos = video169.querySelectorAll("iframe");
            videos.forEach((video) => {
                const w = video.offsetWidth;
                video.style.height = (w * 9) / 16 + "px";
            });
        });
    }

    // 3. Xử lý collapse / accordion
    function handleCollapse() {
        const collapseContainers = document.querySelectorAll('.js__collapseContainer');
        if (!collapseContainers.length) return;

        let activeItem = null;

        collapseContainers.forEach((container) => {
            const collapseBtn = container.querySelector('.js__collapse');
            if (!collapseBtn) return;

            collapseBtn.onclick = function () {
                if (activeItem === container) {
                    container.classList.remove('active');
                    activeItem = null;
                } else {
                    if (activeItem) {
                        activeItem.classList.remove('active');
                    }
                    container.classList.add('active');
                    activeItem = container;
                }
            };
        });
    }

    // 4. Hàm helper khởi tạo Swiper an toàn
    function createSwiper(containerSelector, slideClass, customConfig = {}) {
        const containers = document.querySelectorAll(containerSelector);
        if (!containers.length || typeof Swiper === 'undefined') return;

        containers.forEach((item) => {
            const slider = item.querySelector(slideClass);
            if (!slider) return;

            const next = item.querySelector(".swiper-button-next");
            const prev = item.querySelector(".swiper-button-prev");
            const pagi = item.querySelector(".swiper-pagination");

            const defaultConfig = {
                slidesPerView: 1,
                spaceBetween: 10,
                slidesPerGroup: 1,
                navigation: {
                    nextEl: next || null,
                    prevEl: prev || null,
                },
                pagination: {
                    el: pagi || null,
                    clickable: true,
                },
            };

            new Swiper(slider, Object.assign(defaultConfig, customConfig));
        });
    }

    function initSliders() {
        // Slider 1 item
        createSwiper(".js__oneSlidesContainer", ".js__oneSlide");

        // Slider 2 items
        createSwiper(".js__twoSlidesContainer", ".js__twoSlide", {
            slidesPerView: 1.2,
            spaceBetween: 15,
            breakpoints: {
                768: { slidesPerView: 1.2 },
                1024: { slidesPerView: 2, spaceBetween: 24 }
            }
        });
        // Slider 3 items
        createSwiper(".js__threeSlidesContainer", ".js__threeSlide", {
            slidesPerView: 2,
            spaceBetween: 15,
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3, spaceBetween: 24 }
            }
        });
        // Slider 3 items secondary
        createSwiper(".js__threeSecondarySlidesContainer", ".js__threeSecondarySlide", {
            slidesPerView: 1.3,
            spaceBetween: 15,
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3, spaceBetween: 24 }
            }
        });

        // Slider 4 items
        createSwiper(".js__fourSlidesContainer", ".js__fourSlide", {
            slidesPerView: 2,
            spaceBetween: 15,
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4, spaceBetween: 15 }
            }
        });

        // Slider 5 items
        createSwiper(".js__fiveSlidesContainer", ".js__fiveSlide", {
            slidesPerView: 2,
            spaceBetween: 0,
            breakpoints: {
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5, spaceBetween: 10 }
            }
        });
        // Slider 5 secondary items
        createSwiper(".js__fiveSecondarySlidesContainer", ".js__fiveSecondarySlide", {
            slidesPerView: 2.5,
            spaceBetween: 20,
            breakpoints: {
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5, spaceBetween: 24 }
            }
        });
    }

    // 5. Xử lý More Menu
    function handleMoreMenu() {
        const navbarMoreIcon = document.querySelector('.js__navbarMoreIcon');
        const navbarMoreContent = document.querySelector('.js__navbarMoreContent');

        if (!navbarMoreIcon || !navbarMoreContent) return;

        navbarMoreIcon.onclick = function () {
            this.classList.toggle('active');
            navbarMoreContent.classList.toggle('active');
        };
    }


     // Xử lý sự kiện scroll navbar mb
    function handleNavbarMb() {
        const navbarMb = document.querySelector(".js__navbarMenuMb");
        if (!navbarMb) return;

        const container = navbarMb.querySelector(".js__navbarMb");
        const scrollBtn = navbarMb.querySelector(".js__navbarIcon");

        let scrollAmount = 0;
        let scrollPosition = 0;

        scrollBtn.addEventListener("click", function () {
            const scrollDistance = 100;
            scrollAmount = scrollPosition + scrollDistance;
            scrollAmount = Math.min(
                scrollAmount,
                container.scrollWidth - container.clientWidth
            );
            container.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            });
            scrollPosition = scrollAmount;
        });
    }
    // 6. Xử lý Search Desktop
    function handleShowSearchDesk() {
        const searchIconDesk = document.querySelector('.js__searchIconDesk');
        const searchContentDesk = document.querySelector('.js__searchContentDesk');
        const searchInputDesk = document.querySelector('.js__searchInputDesk');

        if (!searchIconDesk || !searchContentDesk || !searchInputDesk) return;

        searchIconDesk.onclick = function () {
            const isActive = searchContentDesk.classList.contains('active');
            if (isActive) {
                searchContentDesk.classList.remove('active');
                searchInputDesk.value = '';
            } else {
                searchContentDesk.classList.add('active');
                searchInputDesk.focus();
            }
        };
    }

    // 7. Xử lý Sub Menu Mobile
    function handleShowSubMenu() {
        const subMenu = document.querySelector(".js__clickShowMenuMb");
        if (!subMenu) return;

        const closeSubMenu = document.querySelector(".js__closeSubMenu");
        const overlay = document.querySelector(".js__overlay");
        const parentBox = subMenu.parentElement;

        if (!parentBox) return;

        subMenu.onclick = function () {
            parentBox.classList.add("active");
            document.body.style.overflow = "hidden";
        };

        if (closeSubMenu) {
            closeSubMenu.onclick = function () {
                parentBox.classList.remove("active");
                document.body.style.overflow = "auto";
            };
        }

        if (overlay) {
            overlay.onclick = function () {
                parentBox.classList.remove("active");
                document.body.style.overflow = "auto";
            };
        }
    }

    // 8. Xử lý Dropdown Submenu
    function handleShowDropdownSubMenu() {
        const dropdownSubMenu = document.querySelectorAll(".js__dropDown");
        if (!dropdownSubMenu.length) return;

        dropdownSubMenu.forEach((item) => {
            const parent = item.parentElement;
            if (!parent || !parent.parentElement) return;

            const nextEle = parent.parentElement.querySelector(".js__listSubMenu");
            if (!nextEle) return;

            item.onclick = function () {
                parent.classList.toggle("active");
                if (nextEle.style.maxHeight) {
                    nextEle.style.maxHeight = null;
                } else {
                    nextEle.style.maxHeight = nextEle.scrollHeight + "px";
                }
            };
        });
    }

    // 9. Xử lý Search Mobile
    function handleShowSearchMb() {
        const searchMbs = document.querySelectorAll(".js__searchMb");
        if (!searchMbs.length) return;

        searchMbs.forEach((searchMb) => {
            const formSearchMb = document.querySelector(".js__formSearchMb");
            if (!formSearchMb) return;

            const closeSearchMb = document.querySelector(".js__closeSearchMb");
            const focusElement = formSearchMb.querySelector(".js__focusSearchMb");

            searchMb.onclick = function () {
                const isActive = formSearchMb.classList.contains("active");
                formSearchMb.classList.add("active");
                if (focusElement) {
                    focusElement.focus();
                    if (isActive) focusElement.value = "";
                }
            };

            if (closeSearchMb) {
                closeSearchMb.onclick = function () {
                    formSearchMb.classList.remove("active");
                    if (focusElement) focusElement.value = "";
                };
            }
        });
    }

    // 10. Xử lý Sticky Header
    function handleStickyHeader() {
        const stickyHeaderPC = document.querySelector(".js__stickyHeader");
        if (stickyHeaderPC) {
            stickyHeaderPC.classList.toggle("sticky", window.scrollY > 300);
        }
    }

    // 11. Xử lý Back To Top
    function handleBackTop() {
        if (!backTop) return;

        backTop.onclick = function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }

    function handleBackTopVisibility() {
        if (!backTop) return;
        
        const isScrolled = (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300);
        backTop.style.opacity = isScrolled ? "1" : "0";
        backTop.style.visibility = isScrolled ? "visible" : "hidden";
    }

    // Event scroll/resize
    function handleWindowScroll() {
        handleStickyHeader();
        handleBackTopVisibility();
    }

    // Khởi tạo ứng dụng
    function initApp() {
        handleMoreMenu();
        handleShowSearchDesk();
        handleShowSubMenu();
        handleShowDropdownSubMenu();
        handleShowSearchMb();
        handleNavbarMb();
        handleVideo_16x9();
        initSliders();
        handleCollapse();
        handleBackTop();
        handleChangeTab();

        window.addEventListener('scroll', handleWindowScroll);
        window.addEventListener('resize', handleWindowScroll);
        
        // Gọi 1 lần để check trạng thái ban đầu khi load trang
        handleWindowScroll();
    }

    initApp();
});