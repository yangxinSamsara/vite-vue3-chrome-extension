console.log("this is content file");

const init = () => {
  const addIframe = (id: string, pagePath: string) => {
    const iframe = document.createElement("iframe");
    iframe.id = id;
    iframe.style.cssText = `
      width: 100px;
      height: 200px;
      border: none;
      position: fixed;
      right: 50px;
      bottom: 50px;
      z-index: 10000002;
    `;
    const getContentPage = chrome.runtime.getURL(pagePath);
    iframe.src = getContentPage;
    document.body.appendChild(iframe);
  };
  addIframe("content-start-iframe", "contentPage/index.html");
};

if (window.top === window.self) {
  window.addEventListener("scroll", () => {
    console.log("scroll");
    // 判断iframe是否存在，如果存在，则显示iframe，否则不显示
    const iframe = document.getElementById("content-start-iframe");
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      if (iframe) {
        iframe.style.display = "block";
      } else {
        init();
      }
    } else {
      if (iframe) {
        iframe.style.display = "none";
      }
    }
  });
  window.addEventListener("message", (event) => {
    console.log("event", event);
    if (event.data.action === "scrollToTop") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}
