document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  const header = document.querySelector(".site-header");
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) {
    document.body.classList.add("touch-device");
  }

  window.openVideo = function (url) {
    if (!modal || !frame) return;

    frame.src = url + "?autoplay=1";
    modal.classList.add("active");
  };

  window.closeVideo = function () {
    if (!modal || !frame) return;

    frame.src = "";
    modal.classList.remove("active");
  };

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) window.closeVideo();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && modal.classList.contains("active")) {
      window.closeVideo();
    }
  });

  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  const aboutCard = document.querySelector(".about-card");

  if (aboutCard && "IntersectionObserver" in window) {
    const aboutObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    aboutObserver.observe(aboutCard);
  }

});