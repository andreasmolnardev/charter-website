document.addEventListener("DOMContentLoaded", () => {
    const galleries = document.querySelectorAll(".boat .gallery");
    galleries.forEach(gallery => {
      const images = gallery.querySelectorAll("img[data-index]");
      const leftArrow = gallery.querySelector("span.arrow-left");
      const rightArrow = gallery.querySelector("span.arrow-right");
      const transitionDuration = 300;
      if (images.length < 2) {
        if (leftArrow) leftArrow.style.display = "none";
        if (rightArrow) rightArrow.style.display = "none";
        return;
      }
      gallery.style.position = "relative";
      images.forEach(img => {
        img.style.position = "absolute";
        img.style.top = 0;
        img.style.left = 0;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.transition = `transform ${transitionDuration}ms ease, opacity ${transitionDuration}ms ease`;
        img.style.opacity = parseInt(img.dataset.index, 10) === 0 ? "1" : "0";
      });
      let currentIndex = 0;
      function updateArrows() {
        if (leftArrow) leftArrow.style.display = currentIndex > 0 ? "flex" : "none";
        if (rightArrow) rightArrow.style.display = currentIndex < images.length - 1 ? "flex" : "none";
      }
      updateArrows();
      function transitionTo(newIndex, direction) {
        if (newIndex < 0 || newIndex >= images.length) return;
        const currentImg = images[currentIndex];
        const nextImg = images[newIndex];
        const offset = direction === "left" ? "-100%" : "100%";
        nextImg.style.transition = "none";
        nextImg.style.transform = `translateX(${offset})`;
        nextImg.style.opacity = "0";
        nextImg.style.zIndex = "2";
        nextImg.getBoundingClientRect();
        nextImg.style.transition = `transform ${transitionDuration}ms ease, opacity ${transitionDuration}ms ease`;
        currentImg.style.transition = `transform ${transitionDuration}ms ease, opacity ${transitionDuration}ms ease`;
        nextImg.style.transform = "translateX(0)";
        nextImg.style.opacity = "1";
        const currentOffset = direction === "left" ? "100%" : "-100%";
        currentImg.style.transform = `translateX(${currentOffset})`;
        currentImg.style.opacity = "0";
        setTimeout(() => {
          currentImg.style.transition = "none";
          currentImg.style.transform = "translateX(0)";
          currentImg.style.opacity = "0";
          nextImg.style.zIndex = "1";
          currentIndex = newIndex;
          updateArrows();
        }, transitionDuration);
      }
      if (leftArrow) {
        leftArrow.addEventListener("click", () => {
          if (currentIndex > 0) transitionTo(currentIndex - 1, "left");
        });
      }
      if (rightArrow) {
        rightArrow.addEventListener("click", () => {
          if (currentIndex < images.length - 1) transitionTo(currentIndex + 1, "right");
        });
      }
    });
  });
  

  document.getElementById("garda").addEventListener('click', () => {
    window.location.href = "./gardasee-boot-mieten"
  })