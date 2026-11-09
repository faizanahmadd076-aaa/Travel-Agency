/**
 * PakVistas Expeditions - Modern Envato Graphic-Template Interactive Scripts
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Header Scroll Effects & Mobile Navigation Drawer
     ========================================================================== */
  const siteHeader = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-item');
  const navItems = document.querySelectorAll('.nav-item');
  const backToTopBtn = document.getElementById('back-to-top');

  // Sticky navbar & back-to-top on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    if (scrollPos > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    highlightActiveNav();
  });

  // Mobile menu drawer
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!siteHeader.contains(e.target) && mobileDrawer.classList.contains('open')) {
        mobileToggle.classList.remove('active');
        mobileDrawer.classList.remove('open');
      }
    });
  }

  // Smooth back to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active navigation highlight
  function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollPos > sectionTop && scrollPos <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }


  /* ==========================================================================
     2. Hero Arch Dynamic Scenic Carousel (Subtle Rotation)
     ========================================================================== */
  const dynamicImg = document.getElementById('hero-dynamic-img');
  const dynamicTitle = document.getElementById('hero-dynamic-title');
  const dynamicDesc = document.getElementById('hero-dynamic-desc');

  const heroShowcaseList = [
    {
      img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
      title: 'Hunza & Passu Cones',
      desc: 'Cathedral ridges towering over ancient silk route towns.'
    },
    {
      img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
      title: 'Skardu & Deosai Plains',
      desc: 'High-altitude brown bears, crystal lakes, and the land of giants.'
    },
    {
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      title: 'Fairy Meadows & Nanga Parbat',
      desc: 'Mirror reflections of the 8,126m Killer Mountain from alpine chalets.'
    },
    {
      img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
      title: 'Naran & Saif-ul-Malook',
      desc: 'Fairytales of Prince Saif and rushing waters of River Kunhar.'
    }
  ];

  let heroIdx = 0;
  if (dynamicImg && dynamicTitle && dynamicDesc) {
    setInterval(() => {
      heroIdx = (heroIdx + 1) % heroShowcaseList.length;
      dynamicImg.style.opacity = '0.4';
      dynamicImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        dynamicImg.src = heroShowcaseList[heroIdx].img;
        dynamicTitle.textContent = heroShowcaseList[heroIdx].title;
        dynamicDesc.textContent = heroShowcaseList[heroIdx].desc;
        dynamicImg.style.opacity = '1';
        dynamicImg.style.transform = 'scale(1)';
      }, 350);
    }, 6000);
  }


  /* ==========================================================================
     3. Universal Search Hub Tabs & Form
     ========================================================================== */
  const hubTabs = document.querySelectorAll('.hub-tab-btn');
  const hubForm = document.getElementById('hub-search-form');
  const hubDest = document.getElementById('hub-destination');
  const hubBudget = document.getElementById('hub-budget');
  const hubDate = document.getElementById('hub-date');
  const clientDateInput = document.getElementById('client-date');
  const clientPackageSelect = document.getElementById('client-package');
  const clientBudgetSelect = document.getElementById('client-budget');
  const clientTravelersInput = document.getElementById('client-travelers');

  // Set minimum date to today
  const todayStr = new Date().toISOString().split('T')[0];
  if (hubDate) hubDate.setAttribute('min', todayStr);
  if (clientDateInput) clientDateInput.setAttribute('min', todayStr);

  hubTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      hubTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabType = tab.getAttribute('data-tab');
      if (tabType === 'hotels') {
        const hotelSec = document.getElementById('hotels');
        if (hotelSec) hotelSec.scrollIntoView({ behavior: 'smooth' });
      } else if (tabType === 'custom') {
        const bookSec = document.getElementById('booking');
        if (bookSec) {
          bookSec.scrollIntoView({ behavior: 'smooth' });
          if (clientPackageSelect) clientPackageSelect.value = 'Custom Private Tour';
        }
      }
    });
  });

  if (hubForm) {
    hubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dest = hubDest.value;
      const budget = hubBudget.value;
      const date = hubDate.value;
      const guests = document.getElementById('hub-guests').value;

      // Filter package tabs if budget selected
      if (budget && budget !== 'all') {
        const matchingFilter = document.querySelector(`.filter-pill-btn[data-filter="${budget}"]`);
        if (matchingFilter) matchingFilter.click();
      }

      // Prepopulate booking form
      if (date && clientDateInput) clientDateInput.value = date;
      if (guests && clientTravelersInput) clientTravelersInput.value = guests;

      if (dest && clientPackageSelect) {
        for (let i = 0; i < clientPackageSelect.options.length; i++) {
          const opt = clientPackageSelect.options[i];
          if (dest === 'hunza' && opt.value.toLowerCase().includes('hunza')) {
            clientPackageSelect.selectedIndex = i;
            break;
          } else if (dest === 'skardu' && opt.value.toLowerCase().includes('skardu')) {
            clientPackageSelect.selectedIndex = i;
            break;
          } else if (dest === 'fairymeadows' && opt.value.toLowerCase().includes('fairy')) {
            clientPackageSelect.selectedIndex = i;
            break;
          } else if (dest === 'narankaghan' && opt.value.toLowerCase().includes('naran')) {
            clientPackageSelect.selectedIndex = i;
            break;
          }
        }
      }

      const packagesSection = document.getElementById('packages');
      if (packagesSection) packagesSection.scrollIntoView({ behavior: 'smooth' });
    });
  }


  /* ==========================================================================
     4. Tour Packages Filter Tabs
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.graphic-filter-tabs .filter-pill-btn');
  const categoryPills = document.querySelectorAll('.category-pill-card[data-filter]');
  const tourCards = document.querySelectorAll('.tour-cards-grid .tour-card');

  function applyTourFilter(filterVal) {
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === filterVal) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    tourCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (filterVal === 'all' || cardCat === filterVal) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 15);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 250);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const fVal = btn.getAttribute('data-filter');
      applyTourFilter(fVal);
    });
  });

  categoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const fVal = pill.getAttribute('data-filter');
      if (fVal) {
        applyTourFilter(fVal);
      }
    });
  });


  /* ==========================================================================
     5. Wishlist Heart Button Interactive Toggle
     ========================================================================== */
  const wishlistBtns = document.querySelectorAll('.btn-wishlist');

  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
      }
    });
  });


  /* ==========================================================================
     6. Package & Hotel Card Direct Booking Triggers
     ========================================================================== */
  const bookPackageBtns = document.querySelectorAll('.btn-book-package');
  const bookHotelBtns = document.querySelectorAll('.btn-book-hotel');
  const bookingSection = document.getElementById('booking');
  const clientNotes = document.getElementById('client-notes');
  const clientName = document.getElementById('client-name');

  bookPackageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkg = btn.getAttribute('data-package');
      const budget = btn.getAttribute('data-budget');

      if (clientPackageSelect && pkg) {
        for (let i = 0; i < clientPackageSelect.options.length; i++) {
          if (clientPackageSelect.options[i].value === pkg) {
            clientPackageSelect.selectedIndex = i;
            break;
          }
        }
      }

      if (clientBudgetSelect && budget) {
        if (budget === 'budget') clientBudgetSelect.value = 'Budget-Friendly';
        else if (budget === 'standard') clientBudgetSelect.value = 'Standard Comfort';
        else if (budget === 'luxury') clientBudgetSelect.value = 'Luxury VIP';
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (clientName) clientName.focus();
        }, 600);
      }
    });
  });

  bookHotelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const hotel = btn.getAttribute('data-hotel');

      if (clientPackageSelect) {
        clientPackageSelect.value = 'Custom Private Tour';
      }

      if (clientNotes && hotel) {
        clientNotes.value = `Inquiry regarding room availability and corporate dates for: ${hotel}. Please share discounted rates.`;
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (clientName) clientName.focus();
        }, 600);
      }
    });
  });


  /* ==========================================================================
     7. Live Countdown Timer for Deals Section
     ========================================================================== */
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  if (daysEl && hoursEl && minsEl && secsEl) {
    // Set promo end date to 5 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);
    targetDate.setHours(targetDate.getHours() + 18);

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


  /* ==========================================================================
     8. Interactive Form Validation & Submission
     ========================================================================== */
  const bookingForm = document.getElementById('booking-form');
  const submitBtn = document.getElementById('submit-btn');
  const successModal = document.getElementById('success-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalSummaryBox = document.getElementById('modal-summary-box');

  const inputName = document.getElementById('client-name');
  const inputEmail = document.getElementById('client-email');
  const inputPhone = document.getElementById('client-phone');
  const selectCity = document.getElementById('client-city');
  const selectPackage = document.getElementById('client-package');
  const selectBudget = document.getElementById('client-budget');
  const inputDate = document.getElementById('client-date');
  const inputTravelers = document.getElementById('client-travelers');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Accepts Pakistani format (03xxxxxxxxx, +923xxxxxxxxx, 00923xxxxxxxxx) or 10-14 digit international
  const phoneRegex = /^(\+92|0092|0)?3[0-9]{9}$/;

  function validateField(input, isValid, errorId) {
    const errorEl = document.getElementById(errorId);
    const container = input.closest('.input-container');

    if (!isValid) {
      if (container) container.classList.add('has-error');
      if (errorEl) errorEl.classList.add('visible');
      return false;
    } else {
      if (container) container.classList.remove('has-error');
      if (errorEl) errorEl.classList.remove('visible');
      return true;
    }
  }

  if (inputName) {
    inputName.addEventListener('input', () => {
      validateField(inputName, inputName.value.trim().length >= 3, 'error-name');
    });
  }

  if (inputEmail) {
    inputEmail.addEventListener('input', () => {
      validateField(inputEmail, emailRegex.test(inputEmail.value.trim()), 'error-email');
    });
  }

  if (inputPhone) {
    inputPhone.addEventListener('input', () => {
      const clean = inputPhone.value.replace(/[\s-]/g, '');
      validateField(inputPhone, phoneRegex.test(clean) || clean.length >= 10, 'error-phone');
    });
  }

  if (selectCity) {
    selectCity.addEventListener('change', () => {
      validateField(selectCity, selectCity.value !== '', 'error-city');
    });
  }

  if (selectPackage) {
    selectPackage.addEventListener('change', () => {
      validateField(selectPackage, selectPackage.value !== '', 'error-package');
    });
  }

  if (selectBudget) {
    selectBudget.addEventListener('change', () => {
      validateField(selectBudget, selectBudget.value !== '', 'error-budget');
    });
  }

  if (inputDate) {
    inputDate.addEventListener('change', () => {
      validateField(inputDate, inputDate.value !== '', 'error-date');
    });
  }

  if (inputTravelers) {
    inputTravelers.addEventListener('input', () => {
      validateField(inputTravelers, parseInt(inputTravelers.value, 10) >= 1, 'error-travelers');
    });
  }

  // Instant WhatsApp Button Handler (Direct lead generation)
  const btnInstantWhatsapp = document.getElementById('btn-instant-whatsapp');
  if (btnInstantWhatsapp) {
    btnInstantWhatsapp.addEventListener('click', () => {
      const isNameValid = validateField(inputName, inputName.value.trim().length >= 3, 'error-name');
      const cleanPhone = inputPhone.value.replace(/[\s-]/g, '');
      const isPhoneValid = validateField(inputPhone, phoneRegex.test(cleanPhone) || cleanPhone.length >= 10, 'error-phone');
      const isPackageValid = validateField(selectPackage, selectPackage.value !== '', 'error-package');

      if (!isNameValid || !isPhoneValid || !isPackageValid) {
        const firstErr = bookingForm.querySelector('.input-container.has-error');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const waMsg = encodeURIComponent(
        `*🌟 New Tour Inquiry - PakVistas Expeditions*\n` +
        `----------------------------------------\n` +
        `👤 *Guest Name:* ${inputName.value.trim()}\n` +
        `📞 *Phone:* ${inputPhone.value.trim()}\n` +
        `✉️ *Email:* ${inputEmail.value.trim() || 'Not specified'}\n` +
        `🏙️ *Departure City:* ${selectCity.value || 'Not selected'}\n` +
        `🏔️ *Package:* ${selectPackage.value}\n` +
        `💰 *Budget Tier:* ${selectBudget.value || 'Standard'}\n` +
        `📅 *Travel Date:* ${inputDate.value || 'Flexible'} (${inputTravelers.value} Travelers)\n` +
        `📝 *Special Requests:* ${document.getElementById('client-notes').value.trim() || 'None'}\n` +
        `----------------------------------------\n` +
        `_Direct WhatsApp Lead from PakVistas Booking Portal_`
      );

      window.open(`https://wa.me/923109943462?text=${waMsg}`, '_blank');
    });
  }

  // Booking Form Submission Handler
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(inputName, inputName.value.trim().length >= 3, 'error-name');
      const isEmailValid = validateField(inputEmail, emailRegex.test(inputEmail.value.trim()), 'error-email');

      const cleanPhone = inputPhone.value.replace(/[\s-]/g, '');
      const isPhoneValid = validateField(inputPhone, phoneRegex.test(cleanPhone) || cleanPhone.length >= 10, 'error-phone');

      const isCityValid = validateField(selectCity, selectCity.value !== '', 'error-city');
      const isPackageValid = validateField(selectPackage, selectPackage.value !== '', 'error-package');
      const isBudgetValid = validateField(selectBudget, selectBudget.value !== '', 'error-budget');
      const isDateValid = validateField(inputDate, inputDate.value !== '', 'error-date');
      const isTravelersValid = validateField(inputTravelers, parseInt(inputTravelers.value, 10) >= 1, 'error-travelers');

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isCityValid || !isPackageValid || !isBudgetValid || !isDateValid || !isTravelersValid) {
        const firstErr = bookingForm.querySelector('.input-container.has-error');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Show processing state
      const caption = submitBtn.querySelector('.btn-caption');
      const loader = submitBtn.querySelector('.btn-loader');
      if (caption) caption.style.display = 'none';
      if (loader) loader.style.display = 'inline-flex';
      submitBtn.disabled = true;

      const guestName = inputName.value.trim();
      const guestEmail = inputEmail.value.trim();
      const guestPhone = inputPhone.value.trim();
      const departureCity = selectCity.value;
      const chosenPackage = selectPackage.value;
      const budgetTier = selectBudget.value;
      const travelDate = inputDate.value;
      const travelerCount = inputTravelers.value;
      const specialNotes = (document.getElementById('client-notes').value.trim() || 'None provided');

      // Real email payload to FormSubmit
      const emailPayload = {
        "Guest Name": guestName,
        "Email Address": guestEmail,
        "Phone / WhatsApp": guestPhone,
        "Departure City": departureCity,
        "Selected Package": chosenPackage,
        "Budget Tier": budgetTier,
        "Travel Date": travelDate,
        "Total Travelers": travelerCount,
        "Special Requests": specialNotes,
        "_subject": `New Tour Booking Inquiry from ${guestName} - PakVistas`,
        "_template": "table"
      };

      const waMessage = encodeURIComponent(
        `*🌟 New Tour Inquiry - PakVistas Expeditions*\n` +
        `----------------------------------------\n` +
        `👤 *Guest Name:* ${guestName}\n` +
        `📞 *Phone:* ${guestPhone}\n` +
        `✉️ *Email:* ${guestEmail}\n` +
        `🏙️ *Departure City:* ${departureCity}\n` +
        `🏔️ *Package:* ${chosenPackage}\n` +
        `💰 *Budget Tier:* ${budgetTier}\n` +
        `📅 *Travel Date:* ${travelDate} (${travelerCount} Travelers)\n` +
        `📝 *Special Requests:* ${specialNotes}\n` +
        `----------------------------------------\n` +
        `_Sent via PakVistas Online Booking Form_`
      );

      const mailtoSubject = encodeURIComponent(`New Tour Booking Inquiry - ${guestName}`);
      const mailtoBody = encodeURIComponent(
        `Dear PakVistas Team,\n\n` +
        `I would like to book a tour with the following details:\n\n` +
        `Name: ${guestName}\n` +
        `Phone: ${guestPhone}\n` +
        `Email: ${guestEmail}\n` +
        `Departure City: ${departureCity}\n` +
        `Selected Package: ${chosenPackage}\n` +
        `Budget Tier: ${budgetTier}\n` +
        `Travel Date: ${travelDate}\n` +
        `Number of Travelers: ${travelerCount}\n` +
        `Special Requests: ${specialNotes}\n\n` +
        `Looking forward to hearing from you soon.\n`
      );

      // Check protocol: file:/// vs http://
      const isFileProtocol = window.location.protocol === 'file:';

      if (isFileProtocol) {
        // When browsed as file://, FormSubmit API blocks AJAX.
        // We present the details in the modal, attach WhatsApp & Mailto triggers!
        setTimeout(() => {
          if (modalSummaryBox) {
            modalSummaryBox.innerHTML = `
              <div><strong>Guest Name:</strong> ${escapeHtml(guestName)}</div>
              <div><strong>Phone / WhatsApp:</strong> ${escapeHtml(guestPhone)}</div>
              <div><strong>Email:</strong> ${escapeHtml(guestEmail)}</div>
              <div><strong>Departure City:</strong> ${escapeHtml(departureCity)}</div>
              <div><strong>Tour Package:</strong> ${escapeHtml(chosenPackage)}</div>
              <div><strong>Budget Preference:</strong> ${escapeHtml(budgetTier)}</div>
              <div><strong>Travel Date:</strong> ${escapeHtml(travelDate)} (${travelerCount} Guests)</div>
              <div style="margin-top:0.6rem; padding:0.5rem; background:#ecfdf5; border-radius:6px; color:#065f46; font-size:0.8rem;">
                <strong>💡 Tip:</strong> For automated zero-click emails, run <code>Run-Website.bat</code> in the project folder. You can also forward directly via WhatsApp or Email app below:
              </div>
            `;
          }

          const modalMsg = document.getElementById('modal-message');
          if (modalMsg) {
            modalMsg.innerHTML = `Inquiry prepared for <strong>muhammadfaizanahmad10@gmail.com</strong>! Choose an instant delivery method below:`;
          }

          const modalWaBtn = document.getElementById('modal-whatsapp-direct');
          if (modalWaBtn) {
            modalWaBtn.href = `https://wa.me/923109943462?text=${waMessage}`;
          }

          if (caption) caption.style.display = 'inline-flex';
          if (loader) loader.style.display = 'none';
          submitBtn.disabled = false;

          if (successModal) successModal.classList.add('active');

          // Trigger mailto client
          window.location.href = `mailto:muhammadfaizanahmad10@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

          bookingForm.reset();
          if (inputTravelers) inputTravelers.value = 2;
        }, 500);

      } else {
        // When browsed through a web server (e.g., http://localhost:5500 via Run-Website.bat or deployed online):
        fetch("https://formsubmit.co/ajax/muhammadfaizanahmad10@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(emailPayload)
        })
        .then(res => res.json())
        .then(data => {
          let statusText = `✅ Inquiry emailed successfully to <strong>muhammadfaizanahmad10@gmail.com</strong>!`;
          if (data && data.message && data.message.includes('Activation')) {
            statusText = `⚠️ <strong>One-Time Activation Required:</strong> FormSubmit sent an 'Activate Form' link to <strong>muhammadfaizanahmad10@gmail.com</strong>. Please check your Gmail (Inbox or Spam) and click it once!`;
          }

          const modalMsg = document.getElementById('modal-message');
          if (modalMsg) {
            modalMsg.innerHTML = statusText;
          }

          if (modalSummaryBox) {
            modalSummaryBox.innerHTML = `
              <div><strong>Guest Name:</strong> ${escapeHtml(guestName)}</div>
              <div><strong>Phone / WhatsApp:</strong> ${escapeHtml(guestPhone)}</div>
              <div><strong>Email:</strong> ${escapeHtml(guestEmail)}</div>
              <div><strong>Departure City:</strong> ${escapeHtml(departureCity)}</div>
              <div><strong>Tour Package:</strong> ${escapeHtml(chosenPackage)}</div>
              <div><strong>Budget Preference:</strong> ${escapeHtml(budgetTier)}</div>
              <div><strong>Travel Date:</strong> ${escapeHtml(travelDate)} (${travelerCount} Guests)</div>
            `;
          }

          const modalWaBtn = document.getElementById('modal-whatsapp-direct');
          if (modalWaBtn) {
            modalWaBtn.href = `https://wa.me/923109943462?text=${waMessage}`;
          }

          if (successModal) successModal.classList.add('active');
          bookingForm.reset();
          if (inputTravelers) inputTravelers.value = 2;
        })
        .catch(err => {
          console.warn("Notice:", err);
          // Fallback to mailto
          window.location.href = `mailto:muhammadfaizanahmad10@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        })
        .finally(() => {
          if (caption) caption.style.display = 'inline-flex';
          if (loader) loader.style.display = 'none';
          submitBtn.disabled = false;
        });
      }
    });
  }

  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) successModal.classList.remove('active');
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
  }


  /* ==========================================================================
     9. 4K Drone Tour Video Modal
     ========================================================================== */
  const openVideoBtn = document.getElementById('open-video-btn');
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('close-video-btn');
  const droneIframe = document.getElementById('drone-iframe');

  // Northern Pakistan 4K Drone Video Embed URL
  const videoUrl = 'https://www.youtube.com/embed/6g4dkbfv_d4?autoplay=1';

  if (openVideoBtn && videoModal && droneIframe) {
    openVideoBtn.addEventListener('click', () => {
      droneIframe.src = videoUrl;
      videoModal.classList.add('active');
    });

    if (closeVideoBtn) {
      closeVideoBtn.addEventListener('click', () => {
        droneIframe.src = '';
        videoModal.classList.remove('active');
      });
    }

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        droneIframe.src = '';
        videoModal.classList.remove('active');
      }
    });
  }


  /* ==========================================================================
     10. Testimonials Carousel
     ========================================================================== */
  const reviewTrack = document.getElementById('testimonials-track');
  const prevReviewBtn = document.getElementById('prev-review-btn');
  const nextReviewBtn = document.getElementById('next-review-btn');
  const reviewsDotsWrap = document.getElementById('reviews-dots');
  const reviewCards = document.querySelectorAll('.testimonial-bubble-card');

  let reviewIdx = 0;
  let reviewTimer = null;

  function getVisibleCards() {
    return window.innerWidth <= 992 ? 1 : 2;
  }

  function getMaxReviewIdx() {
    const visible = getVisibleCards();
    return Math.max(0, reviewCards.length - visible);
  }

  function buildDots() {
    if (!reviewsDotsWrap) return;
    reviewsDotsWrap.innerHTML = '';
    const maxIdx = getMaxReviewIdx();

    for (let i = 0; i <= maxIdx; i++) {
      const dot = document.createElement('span');
      dot.classList.add('t-dot');
      if (i === reviewIdx) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToReview(i);
        startReviewTimer();
      });
      reviewsDotsWrap.appendChild(dot);
    }
  }

  function goToReview(idx) {
    const maxIdx = getMaxReviewIdx();
    if (idx > maxIdx) reviewIdx = 0;
    else if (idx < 0) reviewIdx = maxIdx;
    else reviewIdx = idx;

    if (reviewTrack && reviewCards.length > 0) {
      const cardWidth = reviewCards[0].offsetWidth;
      const gap = 32;
      const offset = reviewIdx * (cardWidth + gap);
      reviewTrack.style.transform = `translateX(-${offset}px)`;
    }

    const dots = reviewsDotsWrap ? reviewsDotsWrap.querySelectorAll('.t-dot') : [];
    dots.forEach((dot, i) => {
      if (i === reviewIdx) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  function nextReview() {
    goToReview(reviewIdx + 1);
  }

  function prevReview() {
    goToReview(reviewIdx - 1);
  }

  function startReviewTimer() {
    if (reviewTimer) clearInterval(reviewTimer);
    reviewTimer = setInterval(nextReview, 6000);
  }

  if (reviewTrack && reviewCards.length > 0) {
    buildDots();

    if (nextReviewBtn) {
      nextReviewBtn.addEventListener('click', () => {
        nextReview();
        startReviewTimer();
      });
    }

    if (prevReviewBtn) {
      prevReviewBtn.addEventListener('click', () => {
        prevReview();
        startReviewTimer();
      });
    }

    const sliderWrap = document.querySelector('.testimonials-graphic-slider');
    if (sliderWrap) {
      sliderWrap.addEventListener('mouseenter', () => {
        if (reviewTimer) clearInterval(reviewTimer);
      });
      sliderWrap.addEventListener('mouseleave', startReviewTimer);
    }

    window.addEventListener('resize', () => {
      buildDots();
      goToReview(reviewIdx);
    });

    startReviewTimer();
  }


  /* ==========================================================================
     11. FAQ Accordion
     ========================================================================== */
  const faqCards = document.querySelectorAll('.faq-card');

  faqCards.forEach(card => {
    const headerBtn = card.querySelector('.faq-header');
    if (headerBtn) {
      headerBtn.addEventListener('click', () => {
        const isActive = card.classList.contains('active');

        faqCards.forEach(other => {
          if (other !== card) other.classList.remove('active');
        });

        if (isActive) card.classList.remove('active');
        else card.classList.add('active');
      });
    }
  });


  /* ==========================================================================
     12. Dynamic Copyright Year
     ========================================================================== */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
