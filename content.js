// 設定を適用してMarkdownをHTMLに変換
function convertMarkdownToHTML(content, width, defaultAlt) {
  return content.replace(
    /!\[([^\]]*)\]\((https:\/\/github\.com\/user-attachments\/assets\/[^\)]+)\)/g,
    (match, altText, url) => {
      const alt = altText.trim() || defaultAlt;
      return `<img width="${width}" alt="${alt}" src="${url}">`;
    }
  );
}

// テキストボックスを監視
function observeTextBoxes() {
  const textareas = document.querySelectorAll("textarea");

  textareas.forEach((textarea) => {
    if (!textarea.dataset.imageConverterObserved) {
      textarea.dataset.imageConverterObserved = "true"; // 重複監視を防止
      textarea.addEventListener("input", () => {
        chrome.storage.local.get(["width", "alt"], (data) => {
          const width = data.width || "500";
          const alt = data.alt || "Image";

          const content = textarea.value;
          const updatedContent = convertMarkdownToHTML(content, width, alt);

          if (content !== updatedContent) {
            textarea.value = updatedContent;
          }
        });
      });
    }
  });
}

// ページ全体を監視
const observer = new MutationObserver(() => {
  observeTextBoxes();
});

observer.observe(document.body, { childList: true, subtree: true });
observeTextBoxes();

