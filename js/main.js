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
        // slider auto item
        createSwiper(".js__autoSlidesContainer", ".js__autoSlide", { 
            slidesPerView: "auto", spaceBetween: 8 
        });
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
        const showBtns = document.querySelectorAll(".js__clickShowMenuMb");
        const subMenu = document.querySelector(".sub-menu");
        
        if (!showBtns.length || !subMenu) return;

        const closeSubMenu = subMenu.querySelector(".js__closeSubMenu");
        const overlay = subMenu.querySelector(".js__overlay");

        // Bắt sự kiện click cho tất cả các nút icon-bar
        showBtns.forEach(btn => {
            btn.onclick = function () {
                subMenu.classList.add("active");
                document.body.style.overflow = "hidden";
            };
        });

        // Sự kiện đóng menu khi click nút close
        if (closeSubMenu) {
            closeSubMenu.onclick = function () {
                subMenu.classList.remove("active");
                document.body.style.overflow = "auto";
            };
        }

        // Sự kiện đóng menu khi click overlay
        if (overlay) {
            overlay.onclick = function () {
                subMenu.classList.remove("active");
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

    // range slider
    function rangeFilterHotel() {
        const uRangeContainers = document.querySelectorAll('.js__uRangeContainer');
        if (uRangeContainers.length === 0) return;

        uRangeContainers.forEach((uRangeContainer) => {
            const minInput = uRangeContainer.querySelector('.js__uRangeInputMin');
            const maxInput = uRangeContainer.querySelector('.js__uRangeInputMax');
            const minDisplay = uRangeContainer.querySelector('.js__uRangeMinDisplay');
            const maxDisplay = uRangeContainer.querySelector('.js__uRangeMaxDisplay');
            const trackBg = uRangeContainer.querySelector('.js__sliderTrack');
            const progressBar = uRangeContainer.querySelector('.js__sliderProgress');

            if (!minInput || !maxInput) return;

            function updateSlider() {
                const val1 = Number(minInput.value) || 0;
                const val2 = Number(maxInput.value) || 0;
                const minLimit = Number(minInput.min) || 0;
                const maxLimit = Number(minInput.max) || 100000000;

                // KÉO TỰ DO 100%: Xác định giá trị cực bé và cực lớn dựa trên vị trí kéo thực tế
                const currentMinVal = Math.min(val1, val2);
                const currentMaxVal = Math.max(val1, val2);

                const range = maxLimit - minLimit;
                if (range <= 0) return;

                const minPercent = ((currentMinVal - minLimit) / range) * 100;
                const maxPercent = ((currentMaxVal - minLimit) / range) * 100;

                // Cập nhật vị trí và độ rộng thanh màu đỏ mượt mà
                if (progressBar) {
                    progressBar.style.left = `${minPercent}%`;
                    progressBar.style.width = `${maxPercent - minPercent}%`;
                }

                // Cập nhật hiển thị số tiền ở 2 góc
                const formatter = new Intl.NumberFormat('vi-VN');
                if (minDisplay) minDisplay.textContent = `${formatter.format(currentMinVal)}đ`;
                if (maxDisplay) maxDisplay.textContent = `${formatter.format(currentMaxVal)}đ`;
            }

            // Tăng tốc và giảm tải xử lý bằng việc dùng Z-Index chủ động khi hover/kéo
            function handleInteraction(activeInput, inactiveInput) {
                activeInput.style.zIndex = '4';
                inactiveInput.style.zIndex = '3';
            }

            minInput.addEventListener('input', () => {
                handleInteraction(minInput, maxInput);
                updateSlider();
            });

            maxInput.addEventListener('input', () => {
                handleInteraction(maxInput, minInput);
                updateSlider();
            });

            // Xử lý click bất kỳ vị trí nào trên thanh track
            if (trackBg) {
                trackBg.addEventListener('mousedown', (e) => {
                    const rect = trackBg.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const totalWidth = rect.width;
                    const clickPercent = Math.max(0, Math.min(1, clickX / totalWidth)); // Giới hạn từ [0, 1]

                    const minLimit = Number(minInput.min) || 0;
                    const maxLimit = Number(minInput.max) || 100000000;
                    const clickedValue = minLimit + clickPercent * (maxLimit - minLimit);

                    const currentVal1 = Number(minInput.value);
                    const currentVal2 = Number(maxInput.value);

                    // Click gần nút nào hơn thì di chuyển nhanh nút đó
                    if (Math.abs(clickedValue - currentVal1) < Math.abs(clickedValue - currentVal2)) {
                        minInput.value = clickedValue;
                        handleInteraction(minInput, maxInput);
                    } else {
                        maxInput.value = clickedValue;
                        handleInteraction(maxInput, minInput);
                    }

                    updateSlider();
                });
            }

            // Xử lý cho các sự kiện bắt đầu tương tác chuột/cảm ứng
            minInput.addEventListener('mousedown', () => handleInteraction(minInput, maxInput));
            maxInput.addEventListener('mousedown', () => handleInteraction(maxInput, minInput));
            minInput.addEventListener('touchstart', () => handleInteraction(minInput, maxInput));
            maxInput.addEventListener('touchstart', () => handleInteraction(maxInput, minInput));

            // Khởi tạo trạng thái ban đầu
            updateSlider();
        });
    }

    // xử lý sự kiện để show full content detail
    function handleShowFullContentDetail() {
        const fullContentContainers = document.querySelectorAll(".js__fullContentContainer");
        
        if(fullContentContainers.length === 0) return 
        
        fullContentContainers.forEach((fullContentContainer)=>{
            
            const fullContentDetail = fullContentContainer.querySelector(".js__fullContentDetail");
            const seeFullContentContainer = fullContentContainer.querySelector(".js__seeFullContentContainer");
            const seeFullContent = fullContentContainer.querySelector(".js__seeFullContent");
            
            seeFullContent.onclick = function() {
                fullContentDetail.classList.add('full');
                seeFullContentContainer.style.display = 'none';
            }
    
            })

    }

    
    // xử lý sự kiện để show popup
    function handleShowPopup() {
        const popupContainers = document.querySelectorAll(".js__popupContainer");
        
        if(popupContainers.length === 0) return 
        
        popupContainers.forEach((popupContainer)=>{
            
            const showPopup = popupContainer.querySelector(".js__showPopup");
            const popupContent = popupContainer.querySelector(".js__popupContent");
            const closePopup = popupContainer.querySelector(".js__closePopup");
            const overlay = popupContainer.querySelector(".js__overlay");
            
            showPopup.onclick = function() {
                popupContent.classList.add('active')
                overlay.classList.add('active')
                document.querySelector("body").style.overflow = "hidden";
                document.querySelector("main").style.zIndex = 10000;
            }
    
            closePopup.onclick = function () {
                document.querySelector("body").style.overflow = "auto";
                document.querySelector("main").style.zIndex = 10;
                popupContent.classList.remove('active')
                overlay.classList.remove('active')
            };
    
            overlay.onclick = function () {
                this.classList.remove("active");
                document.querySelector("body").style.overflow = "auto";
                document.querySelector("main").style.zIndex = 10;
                popupContent.classList.remove('active');
            };

            })

    }

    // xử lý sự kiện add active item khi click vào một danh sách
    function initActiveToggle() {
        const activeLists = document.querySelectorAll('.js__activeList');

        activeLists.forEach(list => {
            list.addEventListener('click', function (e) {
                const item = e.target.closest('.js__activeItem');
                
                if (!item) return;

                const currentActiveItems = list.querySelectorAll('.js__activeItem.active');
                currentActiveItems.forEach(el => el.classList.remove('active'));

                item.classList.add('active');
            });
        });
    }

    // xử lý sự kiện tăng giảm số lượng sản phẩm
    function handleIncremental() {
        const incrementals = document.querySelectorAll('.js__incremental')
        if (incrementals.length === 0) return;

        incrementals.forEach((incremental)=>{
            let deincrement = incremental.querySelector(".js__deincrement");
            let increment = incremental.querySelector(".js__increment");
            let number = incremental.querySelector(".js__numberValue");

            
            let step = 1;
            let max = 100;
            let min = 0;
            let valueInput = 0;
            
            function updateValue(newValue) {
                valueInput = newValue;
                console.log("Current value:", valueInput);
            }
            
            number.oninput = function () {
                number.value = number.value > max ? max : number.value < min ? min : number.value;
                updateValue(number.value);
            };
            
            increment.addEventListener("click", () => {
                if (parseInt(number.value) + step >= max) {
                    number.value = max;
                } else {
                    number.value = parseInt(number.value) + step;
                }
                updateValue(number.value);
            });
            
            deincrement.addEventListener("click", () => {
                if (parseInt(number.value) - step <= min) {
                    number.value = min;
                } else {
                    number.value = parseInt(number.value) - step;
                }
                updateValue(number.value);
            });

        })

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
        rangeFilterHotel();
        handleShowFullContentDetail();
        handleShowPopup();
        initActiveToggle();
        handleIncremental();

        window.addEventListener('scroll', handleWindowScroll);
        window.addEventListener('resize', handleWindowScroll);
        
        // Gọi 1 lần để check trạng thái ban đầu khi load trang
        handleWindowScroll();
    }

    initApp();
});