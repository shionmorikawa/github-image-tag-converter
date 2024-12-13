document.addEventListener("DOMContentLoaded", () => {
  const widthInput = document.getElementById("width");
  const altInput = document.getElementById("alt");
  const saveButton = document.getElementById("save");
  const statusMessage = document.getElementById("status");

  // 既存の設定を読み込んでフォームに反映
  chrome.storage.local.get(["width", "alt"], (data) => {
    if (chrome.runtime.lastError) {
      console.error("Error retrieving settings:", chrome.runtime.lastError);
      return;
    }

    // デフォルト値を適用
    widthInput.value = data.width || "500";
    altInput.value = data.alt || "Image";
  });

  // 保存ボタンがクリックされたときの処理
  saveButton.addEventListener("click", () => {
    const width = widthInput.value.trim();
    const alt = altInput.value.trim();

    // 保存するデータを作成
    const settings = {
      width: width || "500", // デフォルト値を使用
      alt: alt || "Image",
    };

    // chrome.storage.local に保存
    chrome.storage.local.set(settings, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving settings:", chrome.runtime.lastError);
        return;
      }

      // 保存成功メッセージを表示
      statusMessage.textContent = "Settings saved!";
      statusMessage.style.display = "block";

      setTimeout(() => {
        statusMessage.style.display = "none";
      }, 2000);

      console.log("Settings saved:", settings); // デバッグ用ログ
    });
  });
});
