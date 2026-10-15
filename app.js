const readingDetails = {
  tarot: {title:"Tarot", description:"Hãy chia sẻ điều bạn đang băn khoăn. Một trải bài tốt bắt đầu từ câu hỏi đúng — không cần phải thật hoàn hảo, chỉ cần chân thật với chính mình."},
  lenormand: {title:"Lenormand", description:"Kể về tình huống cụ thể bạn muốn soi chiếu. Lenormand tập trung vào biểu tượng và cách các lá bài kết nối với nhau."},
  numerology: {title:"Thần số học", description:"Bắt đầu từ ngày sinh và điều bạn muốn hiểu về bản thân. Phần tính toán thần số học có thể được bổ sung khi kết nối backend."},
  birthchart: {title:"Bản đồ sao", description:"Để lập bản đồ sao chính xác cần ngày sinh, giờ sinh và nơi sinh. Bạn có thể chia sẻ câu chuyện trước, rồi bổ sung thông tin sau."},
  tea: {title:"Bài trà", description:"Chậm lại một chút và kể điều bạn muốn khám phá. Hình ảnh biểu tượng được dùng như chất liệu cho trí tưởng tượng và sự chiêm nghiệm."},
  oracle: {title:"Oracle", description:"Chọn một chủ đề đang ở trong tâm trí bạn. Oracle mang đến lời nhắc gợi mở để bạn tự suy ngẫm, không đưa ra phán quyết."}
};

const cards = [...document.querySelectorAll(".reading-card")];
const title = document.getElementById("formTitle");
const description = document.getElementById("formDescription");
const form = document.getElementById("readingForm");
const dialog = document.getElementById("confirmDialog");
let selectedReading = "tarot";
let currentOrderId = "";

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));
}

cards.forEach(card => card.addEventListener("click", () => {
  cards.forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");
  selectedReading = card.dataset.reading;
  title.textContent = readingDetails[selectedReading].title;
  description.textContent = readingDetails[selectedReading].description;
  document.getElementById("experience").scrollIntoView({behavior:"smooth", block:"center"});
}));

document.querySelectorAll("[data-scroll]").forEach(button => button.addEventListener("click", () => {
  document.querySelector(button.dataset.scroll)?.scrollIntoView({behavior:"smooth"});
}));

document.querySelectorAll("[data-package]").forEach(button => button.addEventListener("click", () => {
  const select = document.getElementById("package");
  const wanted = button.dataset.package;
  const matchingOption = [...select.options].find(option => option.value === wanted || option.textContent.includes(wanted.split(" — ")[0]));
  if (matchingOption) select.value = matchingOption.value;
  document.getElementById("experience").scrollIntoView({behavior:"smooth", block:"center"});
}));

const nav = document.getElementById("mainNav");
document.getElementById("menuToggle").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const readingName = readingDetails[selectedReading]?.title || "Tarot";
  document.getElementById("previewContent").innerHTML = `
    <p><b>Hệ thống:</b> ${escapeHTML(readingName)}</p>
    <p><b>Chủ đề:</b> ${escapeHTML(data.get("topic"))}</p>
    <p><b>Gói:</b> ${escapeHTML(data.get("package"))}</p>
    <p><b>Tên gọi:</b> ${escapeHTML(data.get("contact"))}</p>
    <p><b>Câu chuyện:</b><br>${escapeHTML(data.get("story")).replace(/\n/g,"<br>")}</p>`;
  document.getElementById("previewStep").hidden = false;
  document.getElementById("paymentStep").hidden = true;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else alert("Bản xem trước đã sẵn sàng. Hãy mở bằng trình duyệt hiện đại để dùng đầy đủ các bước.");
});

document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
document.getElementById("editRequest").addEventListener("click", () => dialog.close());

document.getElementById("continuePayment").addEventListener("click", () => {
  const data = new FormData(form);
  const packageText = String(data.get("package") || "");
  const amount = packageText.match(/[\d.]+đ/);
  currentOrderId = "DEMO-" + Date.now().toString(36).toUpperCase();
  document.getElementById("paymentReading").textContent = readingDetails[selectedReading]?.title || "Tarot";
  document.getElementById("paymentTopic").textContent = data.get("topic") || "—";
  document.getElementById("paymentPackage").textContent = packageText;
  document.getElementById("paymentAmount").textContent = amount ? amount[0] : "Vui lòng kiểm tra gói";
  document.getElementById("demoOrderId").textContent = currentOrderId;
  document.getElementById("paymentTransferNote").textContent = currentOrderId;
  document.getElementById("receiptFile").value = "";
  document.getElementById("receiptStatus").textContent = "";
  document.getElementById("receiptSuccess").hidden = true;
  document.getElementById("previewStep").hidden = true;
  document.getElementById("paymentStep").hidden = false;
});

document.getElementById("backToPreview").addEventListener("click", () => {
  document.getElementById("paymentStep").hidden = true;
  document.getElementById("previewStep").hidden = false;
});

document.getElementById("copyTransferNote").addEventListener("click", async () => {
  const note = document.getElementById("paymentTransferNote").textContent;
  try {
    await navigator.clipboard.writeText(note);
    document.getElementById("copyTransferNote").textContent = "Đã sao chép ✓";
  } catch {
    window.prompt("Sao chép nội dung chuyển khoản:", note);
  }
});

document.getElementById("receiptFile").addEventListener("change", event => {
  const file = event.target.files && event.target.files[0];
  document.getElementById("receiptStatus").textContent = file
    ? `Đã chọn: ${file.name}. Chưa tải lên máy chủ.`
    : "";
  document.getElementById("receiptSuccess").hidden = true;
});

document.getElementById("demoSubmitReceipt").addEventListener("click", () => {
  const file = document.getElementById("receiptFile").files[0];
  if (!file) {
    document.getElementById("receiptStatus").textContent = "Hãy chọn ảnh biên lai để thử bước này.";
    return;
  }
  document.getElementById("receiptStatus").textContent = "Đã ghi nhận lựa chọn tệp trong giao diện demo.";
  document.getElementById("receiptSuccess").hidden = false;
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
