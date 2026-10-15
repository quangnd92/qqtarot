# Harry Cuteer — Tarot & Cosmic Corner

Bản prototype website frontend bằng HTML, CSS và JavaScript thuần.

## Chạy thử
1. Giải nén file ZIP.
2. Mở `index.html` trực tiếp trên trình duyệt; hoặc chạy server local:
   ```bash
   cd harry_cuteer_tarot_web
   python3 -m http.server 8000
   ```
3. Mở `http://localhost:8000`.

## Có gì trong bản demo?
- Giao diện responsive, pastel hồng/lavender, phong cách celestial.
- 6 lựa chọn: Tarot, Lenormand, thần số học, bản đồ sao, bài trà, Oracle.
- Chủ đề tình cảm, công việc, tài chính, học tập, phát triển bản thân, định hướng.
- Ba gói lấy theo bot hiện tại: 90.000đ / 150.000đ / 250.000đ.
- Form tạo yêu cầu và hộp xem lại trước khi gửi.

## Lưu ý về chức năng
Đây mới là frontend demo. Form chỉ tạo bản xem trước trong trình duyệt, không gửi dữ liệu, không tạo đơn, không thanh toán và chưa kết nối với Telegram bot. Muốn chạy thật cần backend/API, lưu trữ đơn hàng, xác thực, chính sách riêng tư và tích hợp thanh toán phù hợp. Các phần thần số học/bản đồ sao hiện là lựa chọn giao diện, chưa có engine tính toán.

## Bảo mật bot Telegram
File Python nguồn có vẻ chứa bot token ở dạng hard-code. Hãy thu hồi/rotate token đó bằng BotFather ngay, chuyển token sang biến môi trường và tuyệt đối không đưa token vào frontend hoặc repository công khai. ZIP website này không chứa `bot.py` hay token.
