# ET4361 - Hệ thống nhúng và giao tiếp nhúng

<p align="center">
  <img src="assets/official/minh-hoa.png" alt="Minh họa giao diện ôn tập ET4361" width="900">
</p>

Ứng dụng web tĩnh phục vụ ôn tập học phần **ET4361 Hệ thống nhúng và giao tiếp nhúng** của **Đại học Bách Khoa Hà Nội**.

Project này được xây dựng như một bộ study kit nhỏ gọn: mở trực tiếp bằng trình duyệt, học theo chương, làm quiz theo bộ nhỏ, ôn câu sai theo cơ chế lặp lại, và luyện đề mô phỏng có đáp án giải thích.

## Lưu Ý Quan Trọng

Bộ câu hỏi và đề thi trong repo này **chỉ mang tính chất tham khảo, ôn tập, không phải đề đã thi hay đề chính thức**.

Nội dung trong repo không có mục đích dự đoán chính xác đề thi, không thay thế giáo trình, bài giảng, hướng dẫn của học phần, hay yêu cầu từ giảng viên. Khi học, nên đối chiếu lại với tài liệu chính thức của môn học và tự kiểm chứng các nội dung quan trọng.

## Tính Năng Chính

- **Hệ thống nhúng**: học theo các mục của đề cương ôn tập chính thức, từ tổng quan đến phần cứng, phần mềm, I/O, bảo vệ, giao tiếp nâng cao, ADC và EMC.
- **Cấu kiện trong nhúng**: ôn lại các linh kiện, mạch giao tiếp, mạch nguồn, mạch bảo vệ và các kiến thức điện tử ứng dụng gần với hệ thống nhúng.
- **Đề thi**: các bộ đề mô phỏng để luyện tập, gồm trắc nghiệm và câu tự luận tham khảo.
- **Quiz theo bộ nhỏ**: mỗi chương được chia thành nhiều bộ câu hỏi để không phải làm quá dài trong một lần.
- **Lặp lại câu sai**: câu trả lời sai có thể xuất hiện lại sau đó để củng cố trí nhớ.
- **Giải thích đáp án**: mỗi lựa chọn có giải thích vì sao đúng hoặc không phù hợp.
- **Tiến độ cá nhân**: tiến độ được lưu trên trình duyệt của từng người bằng `localStorage`.
- **Light/Dark theme**: có công tắc chuyển giao diện sáng/tối ở thanh trên cùng.
- **Không cần backend**: chỉ cần các file HTML, CSS và JavaScript tĩnh.

## Cách Sử Dụng

### Cách Nhanh Nhất

Mở file `index.html` bằng trình duyệt.

```text
index.html
```

### Chạy Bằng Local Server

Nếu muốn dùng địa chỉ localhost thay vì mở file trực tiếp:

```bash
python -m http.server 8000
```

Sau đó mở:

```text
http://localhost:8000
```

## Cách Học Gợi Ý

1. Bắt đầu từ tab **Hệ thống nhúng**.
2. Chọn từng chương và học theo các bộ câu hỏi nhỏ.
3. Đọc giải thích sau mỗi câu, đặc biệt là các lựa chọn sai.
4. Dùng mục ôn câu sai để lặp lại những kiến thức chưa chắc.
5. Sau khi đã học qua lý thuyết chính, chuyển sang **Cấu kiện trong nhúng** để củng cố phần điện tử ứng dụng.
6. Cuối cùng làm tab **Đề thi** để luyện tốc độ, cách đọc câu hỏi và cách lập luận cho câu tự luận.

## Tiến Độ Và Cache

Tiến độ học tập không nằm trong repo. Ứng dụng lưu tiến độ trong trình duyệt bằng các key:

```text
embedded-quiz-progress-v1
embedded-quiz-active-section
```

Vì vậy:

- Người clone repo mới sẽ bắt đầu với tiến độ trống.
- Việc commit hoặc push source code không làm mất tiến độ đang có trên trình duyệt của máy hiện tại.
- Nếu đổi trình duyệt, đổi máy, xóa dữ liệu website hoặc chạy ở origin khác, tiến độ có thể không còn.
- Có thể dùng nút đặt lại tiến độ trong giao diện nếu muốn học lại từ đầu.

## Nguồn Tham Khảo

Nội dung ôn tập được hệ thống hóa từ bài giảng học phần ET4361 Hệ thống nhúng và giao tiếp nhúng của TS Đào Việt Hùng, kết hợp với các kiến thức điện tử ứng dụng trong hệ thống nhúng và các tài liệu kỹ thuật công khai.

Các tài liệu nguồn trong thư mục `docs/` chỉ được giữ cục bộ để phục vụ quá trình tổng hợp kiến thức, không được đưa lên repo.

## Cấu Trúc Repo

```text
.
├── index.html
├── styles.css
├── app.js
├── embedded-data.js
├── components-data.js
├── exam-data.js
├── assets/
│   └── official/
├── .gitignore
└── README.md
```

Trong đó:

- `index.html`: file vào ứng dụng.
- `styles.css`: giao diện và responsive layout.
- `app.js`: logic render, điều hướng, chấm quiz, lưu tiến độ.
- `embedded-data.js`: ngân hàng câu hỏi phần Hệ thống nhúng, được chia theo các mục 1.1 đến 2.5 của đề cương ôn tập.
- `components-data.js`: nội dung phần Cấu kiện trong nhúng, gồm bài giảng và quiz.
- `exam-data.js`: các bộ đề mô phỏng và gợi ý câu tự luận.
- `assets/official/`: ảnh minh họa dùng trong bài giảng.
- `README.md`: mô tả repo, cách dùng, phạm vi nội dung và lưu ý.

## Phạm Vi Nội Dung

Phần **Hệ thống nhúng** và **Đề thi** hiện bám các mục chính của đề cương ôn tập:

- tổng quan hệ thống nhúng: định nghĩa, đặc điểm, phân loại, cấu trúc, mô hình và quy trình thiết kế;
- phần cứng nhúng: bộ xử lý, bộ nhớ, I/O, bus, ngoại vi và vấn đề năng lượng;
- phần mềm nhúng: firmware, quy trình dịch, tối ưu mã, driver, hệ điều hành nhúng, middleware, ứng dụng, bootloader và khởi động hệ thống;
- khái niệm giao tiếp: protocol, standard, đồng bộ/bất đồng bộ, inter/intra-system, kiểu kết nối, single-ended/differential, simplex/half-duplex/full-duplex và tốc độ truyền;
- giao tiếp I/O cơ bản: đầu vào số, đầu ra số, analog I/O, DAC, PWM và chọn ngoại vi theo ràng buộc thiết kế;
- bảo vệ cổng I/O: ESD, quá áp, hạn dòng, diode clamp, TVS, Zener, optocoupler, digital isolator và thiết kế bảo vệ đơn giản;
- giao tiếp nâng cao: UART, RS-232, RS-485, SPI, I2C, ADC, sai số ADC, lấy mẫu, Vref, lọc, oversampling, DAC và PWM;
- Signal Integrity và EMC: nguồn nhiễu, đường truyền nhiễu, shielding, grounding, cáp xoắn, layout analog/digital/công suất và giảm nhiễu.

Phần **Cấu kiện trong nhúng** là nội dung bổ trợ để ôn lại các kiến thức điện tử ứng dụng gần với môn học:

- transistor, MOSFET, relay, diode, op-amp, comparator;
- bảo vệ cổng vào ra, ESD, clamp, diode flyback;
- nguồn, lọc nguồn, decoupling, reset, watchdog và chống nhiễu;

Tab **Đề thi** cung cấp các đề tham khảo để luyện trắc nghiệm và tự luận.

## Cách Cập Nhật Nội Dung

Khi muốn bổ sung câu hỏi:

1. Sửa file data tương ứng: `embedded-data.js`, `components-data.js` hoặc `exam-data.js`.
2. Giữ câu hỏi rõ ràng, hỏi trực tiếp vào kiến thức, không hỏi kiểu "trong slide này" nếu giao diện không hiện slide hoặc hình đó.
3. Mỗi câu nên có đáp án đúng và giải thích cho từng lựa chọn.
4. Nếu nội dung có ký hiệu như `<`, `<=`, `<->`, có thể để nguyên trong text; ứng dụng đã escape khi render.
5. Mở lại ứng dụng và kiểm tra luồng làm bài trước khi commit.

## Kiểm Tra Nhanh

Có thể kiểm tra lỗi cú pháp JavaScript bằng:

```bash
node --check app.js
node --check embedded-data.js
node --check components-data.js
node --check exam-data.js
```

## Ghi Chú Về Repo Sạch

Thư mục `tmp/`, `docs/`, cache render/OCR, log và các file nguồn lớn không được đưa vào Git. Repo chỉ nên chứa những file cần thiết để chạy ứng dụng và nội dung đã được đóng gói trong các file data của app.
