(() => {
  const embedded = window.EMBEDDED_QUIZ_DATA;
  const BLUEPRINT = {
  "version": "2026-07-09-official-outline",
  "section": {
    "id": "de-thi",
    "title": "Đề thi",
    "source": "Lưu ý : Bộ câu hỏi này chỉ mang tính chất tham khảo, ôn tập, không phải đề đã thi hay chính thức"
  },
  "blueprint": [
    {
      "label": "1.1 Tổng quan hệ thống nhúng",
      "percent": 12
    },
    {
      "label": "1.2 Phần cứng nhúng",
      "percent": 18
    },
    {
      "label": "1.3 Phần mềm nhúng",
      "percent": 15
    },
    {
      "label": "2.1 Khái niệm giao tiếp",
      "percent": 10
    },
    {
      "label": "2.2 Giao tiếp I/O cơ bản",
      "percent": 12
    },
    {
      "label": "2.3 Bảo vệ cổng I/O",
      "percent": 10
    },
    {
      "label": "2.4 Giao tiếp nhúng nâng cao",
      "percent": 15
    },
    {
      "label": "2.5 Signal Integrity và EMC",
      "percent": 8
    }
  ],
  "assumptions": [
    "Các đề chỉ phục vụ ôn tập tham khảo, không phải đề đã thi hoặc đề chính thức.",
    "Nội dung bám các mục 1.1 đến 2.5 của đề cương ôn tập và kiến thức đã hệ thống hóa.",
    "Không yêu cầu học thuộc mã chip cụ thể hoặc các con số minh họa ngoài phạm vi cần nhớ.",
    "Câu tự luận có gợi ý đáp án để tự luyện lập luận, không phải mục nộp chấm."
  ],
  "recipe": [
    [
      "tong-quan-he-thong-nhung",
      5
    ],
    [
      "phan-cung-nhung",
      7
    ],
    [
      "phan-mem-nhung",
      6
    ],
    [
      "khai-niem-giao-tiep",
      4
    ],
    [
      "giao-tiep-io-co-ban",
      5
    ],
    [
      "bao-ve-cong-io",
      4
    ],
    [
      "giao-tiep-nhung-nang-cao",
      6
    ],
    [
      "signal-integrity-emc",
      3
    ]
  ]
};
  const ESSAYS = [
  {
    "title": "Thiết kế nút đo cảm biến dùng vi điều khiển",
    "prompt": "Trình bày thiết kế mức khối cho một nút đo cảm biến dùng vi điều khiển: phần cứng chính, phần mềm nhúng, lựa chọn bộ nhớ, giao tiếp, năng lượng và kiểm thử.",
    "expected": [
      "Nêu lõi xử lý, bộ nhớ, nguồn, mạch khởi động lại, xung nhịp, cảm biến, đầu ra hoặc giao tiếp.",
      "Giải thích phần mềm nhúng đọc cảm biến, xử lý, truyền dữ liệu và quản lý lỗi.",
      "Phân tích lựa chọn vi điều khiển, RAM, bộ nhớ Flash và ngoại vi theo yêu cầu.",
      "Đề cập tiết kiệm năng lượng bằng chế độ ngủ, giảm chu kỳ hoạt động hoặc tắt ngoại vi khi không dùng.",
      "Nêu kiểm thử tích hợp phần cứng và phần mềm nhúng."
    ],
    "rubric": [
      "2 điểm: cấu trúc phần cứng hợp lý.",
      "2 điểm: luồng phần mềm nhúng rõ.",
      "2 điểm: lựa chọn bộ nhớ và ngoại vi đúng.",
      "2 điểm: năng lượng và độ tin cậy.",
      "2 điểm: kiểm thử và rủi ro."
    ]
  },
  {
    "title": "Phân tích lựa chọn bộ xử lý",
    "prompt": "So sánh vi xử lý, vi điều khiển, bộ xử lý tín hiệu số DSP, mảng logic lập trình được FPGA và mạch tích hợp chuyên dụng ASIC trong một bài toán nhúng. Nêu tiêu chí chọn và ví dụ tình huống nên ưu tiên từng loại.",
    "expected": [
      "Phân biệt mức tích hợp của vi xử lý và vi điều khiển.",
      "Nêu DSP cho xử lý tín hiệu, FPGA cho logic song song cấu hình được, ASIC cho tối ưu cố định số lượng lớn.",
      "Phân tích tiêu chí tốc độ, năng lượng, chi phí, linh hoạt và sản lượng.",
      "Không sa vào học thuộc mã linh kiện cụ thể.",
      "Kết luận theo yêu cầu ứng dụng."
    ],
    "rubric": [
      "2 điểm: phân biệt đúng khái niệm.",
      "2 điểm: ưu nhược điểm.",
      "2 điểm: tiêu chí chọn.",
      "2 điểm: ví dụ tình huống.",
      "2 điểm: lập luận cân bằng."
    ]
  },
  {
    "title": "Quy trình dịch và khởi động phần mềm nhúng",
    "prompt": "Mô tả quá trình từ mã nguồn tới phần mềm nhúng chạy trên vi điều khiển, sau đó trình bày vai trò của mã khởi động và bộ nạp khởi động trong khởi động hoặc cập nhật hệ thống.",
    "expected": [
      "Nêu các bước tiền xử lý, biên dịch, hợp dịch, liên kết và nạp chương trình.",
      "Giải thích tệp đối tượng, thư viện và bản chương trình cuối cùng.",
      "Trình bày vector khởi động, ngăn xếp, vùng dữ liệu, vùng BSS và bước chuyển tới chương trình chính.",
      "Nêu bộ nạp khởi động kiểm tra, nạp, cập nhật hoặc nhảy tới ứng dụng.",
      "Phân tích rủi ro cập nhật lỗi và cơ chế phục hồi."
    ],
    "rubric": [
      "2 điểm: quy trình dịch.",
      "2 điểm: vai trò công cụ.",
      "2 điểm: mã khởi động.",
      "2 điểm: bộ nạp khởi động.",
      "2 điểm: cập nhật an toàn."
    ]
  },
  {
    "title": "Thiết kế đầu vào số chống nhiễu",
    "prompt": "Một nút nhấn hoặc cảm biến số nối với vi điều khiển qua dây dài trong môi trường nhiễu. Hãy đề xuất mạch và cấu hình phần mềm để đọc ổn định.",
    "expected": [
      "Dùng điện trở kéo lên hoặc kéo xuống để tránh trạng thái thả nổi.",
      "Cân nhắc lọc RC, cổng Schmitt hoặc ngưỡng có trễ.",
      "Có chống nảy bằng phần cứng hoặc phần mềm.",
      "Bảo vệ quá áp và phóng tĩnh điện bằng điện trở, diode TVS hoặc diode kẹp khi cần.",
      "Tra bảng thông số của linh kiện về ngưỡng logic và giới hạn dòng."
    ],
    "rubric": [
      "2 điểm: trạng thái mặc định.",
      "2 điểm: chống nhiễu/chống nảy.",
      "2 điểm: bảo vệ điện.",
      "2 điểm: cấu hình phần mềm nhúng.",
      "2 điểm: phân tích giới hạn."
    ]
  },
  {
    "title": "Thiết kế bảo vệ quá áp cho cổng I/O",
    "prompt": "Đề xuất mạch bảo vệ đơn giản cho một tín hiệu số chậm có mức cao lớn hơn điện áp cho phép của vi điều khiển. Giải thích vai trò từng linh kiện và các đánh đổi.",
    "expected": [
      "Đưa tín hiệu về vùng điện áp an toàn bằng chia áp hoặc giới hạn dòng.",
      "Dùng diode kẹp, diode TVS hoặc diode Zener phù hợp để kẹp quá áp.",
      "Có điện trở nối tiếp để giới hạn dòng.",
      "Có thể thêm lọc RC nếu tín hiệu chậm và nhiễu.",
      "Phân tích ảnh hưởng tới tốc độ cạnh, lề nhiễu và năng lượng xung."
    ],
    "rubric": [
      "2 điểm: mạch cơ bản.",
      "2 điểm: vai trò linh kiện.",
      "2 điểm: bảo vệ phóng tĩnh điện và quá áp.",
      "2 điểm: đánh đổi thời gian tín hiệu.",
      "2 điểm: tiêu chí chọn linh kiện."
    ]
  },
  {
    "title": "Chọn UART, RS-232, RS-485, SPI hoặc I2C",
    "prompt": "Cho các yêu cầu khác nhau về khoảng cách, số thiết bị, tốc độ, số chân và môi trường nhiễu. Trình bày cách chọn giữa UART/RS-232/RS-485, SPI và I2C.",
    "expected": [
      "Phân biệt giao tiếp trong cùng hệ thống và giao tiếp giữa các hệ thống.",
      "Nêu UART mức TTL và RS-232 cần chuyển mức điện áp.",
      "Nêu RS-485 phù hợp hơn cho đường dài, môi trường nhiễu hoặc nhiều nút.",
      "Nêu SPI nhanh nhưng nhiều dây, I2C ít dây hơn và có địa chỉ cùng bit xác nhận.",
      "Kết luận theo ràng buộc thiết kế thay vì chọn theo tên quen."
    ],
    "rubric": [
      "2 điểm: phân biệt chuẩn.",
      "2 điểm: tiêu chí khoảng cách và nhiễu.",
      "2 điểm: tốc độ và số chân.",
      "2 điểm: số thiết bị và cấu trúc nối.",
      "2 điểm: lập luận lựa chọn."
    ]
  },
  {
    "title": "Phân tích phép đo ADC",
    "prompt": "Một hệ nhúng đo điện áp cảm biến bằng ADC. Trình bày công thức cơ bản, độ phân giải, sai số, lấy mẫu và các cách cải thiện chất lượng đo.",
    "expected": [
      "Nêu 2^N mức, bước lượng tử LSB và quan hệ với điện áp tham chiếu Vref.",
      "Giải thích sai số lượng tử và giới hạn khoảng nửa LSB với ADC lý tưởng.",
      "Nêu điều kiện Nyquist và mạch lấy mẫu-giữ.",
      "Phân biệt nhiễu hoặc sai số của ADC với sai số từ mạch ngoài.",
      "Đề xuất điện áp tham chiếu ổn định, lọc, hiệu chuẩn, giảm trở nguồn, bố trí mạch in tốt và lấy trung bình khi phù hợp."
    ],
    "rubric": [
      "2 điểm: công thức/độ phân giải.",
      "2 điểm: sai số.",
      "2 điểm: lấy mẫu.",
      "2 điểm: mạch ngoài.",
      "2 điểm: cải thiện."
    ]
  },
  {
    "title": "Toàn vẹn tín hiệu và EMC cho đường cảm biến",
    "prompt": "Một dây cảm biến dài chạy gần tải công suất và đường PWM. Phân tích các đường nhiễu có thể xảy ra và đề xuất biện pháp giảm nhiễu.",
    "expected": [
      "Nêu nhiễu dẫn, nhiễu phát xạ, ghép điện dung và ghép cảm ứng.",
      "Phân tích tốc độ thay đổi điện áp, tốc độ thay đổi dòng điện, vòng dòng và dây dài.",
      "Đề xuất xoắn dây, truyền vi sai, lớp che chắn, lọc, cách ly hoặc tăng khoảng cách.",
      "Đề cập nối mass, dòng hồi tiếp, tách vùng tương tự, vùng số và vùng công suất.",
      "Liên hệ EMC: giảm phát xạ và tăng miễn nhiễm."
    ],
    "rubric": [
      "2 điểm: nhận diện đường nhiễu.",
      "2 điểm: phân tích nguyên nhân.",
      "2 điểm: biện pháp dây/cáp.",
      "2 điểm: bố trí mạch in và nối mass.",
      "2 điểm: EMC tổng thể."
    ]
  },
  {
    "title": "Thiết kế nút đo cảm biến dùng vi điều khiển - biến thể 9",
    "prompt": "Trình bày thiết kế mức khối cho một nút đo cảm biến dùng vi điều khiển: phần cứng chính, phần mềm nhúng, lựa chọn bộ nhớ, giao tiếp, năng lượng và kiểm thử. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Nêu lõi xử lý, bộ nhớ, nguồn, mạch khởi động lại, xung nhịp, cảm biến, đầu ra hoặc giao tiếp.",
      "Giải thích phần mềm nhúng đọc cảm biến, xử lý, truyền dữ liệu và quản lý lỗi.",
      "Phân tích lựa chọn vi điều khiển, RAM, bộ nhớ Flash và ngoại vi theo yêu cầu.",
      "Đề cập tiết kiệm năng lượng bằng chế độ ngủ, giảm chu kỳ hoạt động hoặc tắt ngoại vi khi không dùng.",
      "Nêu kiểm thử tích hợp phần cứng và phần mềm nhúng."
    ],
    "rubric": [
      "2 điểm: cấu trúc phần cứng hợp lý.",
      "2 điểm: luồng phần mềm nhúng rõ.",
      "2 điểm: lựa chọn bộ nhớ và ngoại vi đúng.",
      "2 điểm: năng lượng và độ tin cậy.",
      "2 điểm: kiểm thử và rủi ro."
    ]
  },
  {
    "title": "Phân tích lựa chọn bộ xử lý - biến thể 10",
    "prompt": "So sánh vi xử lý, vi điều khiển, bộ xử lý tín hiệu số DSP, mảng logic lập trình được FPGA và mạch tích hợp chuyên dụng ASIC trong một bài toán nhúng. Nêu tiêu chí chọn và ví dụ tình huống nên ưu tiên từng loại. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Phân biệt mức tích hợp của vi xử lý và vi điều khiển.",
      "Nêu DSP cho xử lý tín hiệu, FPGA cho logic song song cấu hình được, ASIC cho tối ưu cố định số lượng lớn.",
      "Phân tích tiêu chí tốc độ, năng lượng, chi phí, linh hoạt và sản lượng.",
      "Không sa vào học thuộc mã linh kiện cụ thể.",
      "Kết luận theo yêu cầu ứng dụng."
    ],
    "rubric": [
      "2 điểm: phân biệt đúng khái niệm.",
      "2 điểm: ưu nhược điểm.",
      "2 điểm: tiêu chí chọn.",
      "2 điểm: ví dụ tình huống.",
      "2 điểm: lập luận cân bằng."
    ]
  },
  {
    "title": "Quy trình dịch và khởi động phần mềm nhúng - biến thể 11",
    "prompt": "Mô tả quá trình từ mã nguồn tới phần mềm nhúng chạy trên vi điều khiển, sau đó trình bày vai trò của mã khởi động và bộ nạp khởi động trong khởi động hoặc cập nhật hệ thống. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Nêu các bước tiền xử lý, biên dịch, hợp dịch, liên kết và nạp chương trình.",
      "Giải thích tệp đối tượng, thư viện và bản chương trình cuối cùng.",
      "Trình bày vector khởi động, ngăn xếp, vùng dữ liệu, vùng BSS và bước chuyển tới chương trình chính.",
      "Nêu bộ nạp khởi động kiểm tra, nạp, cập nhật hoặc nhảy tới ứng dụng.",
      "Phân tích rủi ro cập nhật lỗi và cơ chế phục hồi."
    ],
    "rubric": [
      "2 điểm: quy trình dịch.",
      "2 điểm: vai trò công cụ.",
      "2 điểm: mã khởi động.",
      "2 điểm: bộ nạp khởi động.",
      "2 điểm: cập nhật an toàn."
    ]
  },
  {
    "title": "Thiết kế đầu vào số chống nhiễu - biến thể 12",
    "prompt": "Một nút nhấn hoặc cảm biến số nối với vi điều khiển qua dây dài trong môi trường nhiễu. Hãy đề xuất mạch và cấu hình phần mềm để đọc ổn định. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Dùng điện trở kéo lên hoặc kéo xuống để tránh trạng thái thả nổi.",
      "Cân nhắc lọc RC, cổng Schmitt hoặc ngưỡng có trễ.",
      "Có chống nảy bằng phần cứng hoặc phần mềm.",
      "Bảo vệ quá áp và phóng tĩnh điện bằng điện trở, diode TVS hoặc diode kẹp khi cần.",
      "Tra bảng thông số của linh kiện về ngưỡng logic và giới hạn dòng."
    ],
    "rubric": [
      "2 điểm: trạng thái mặc định.",
      "2 điểm: chống nhiễu/chống nảy.",
      "2 điểm: bảo vệ điện.",
      "2 điểm: cấu hình phần mềm nhúng.",
      "2 điểm: phân tích giới hạn."
    ]
  },
  {
    "title": "Thiết kế bảo vệ quá áp cho cổng I/O - biến thể 13",
    "prompt": "Đề xuất mạch bảo vệ đơn giản cho một tín hiệu số chậm có mức cao lớn hơn điện áp cho phép của vi điều khiển. Giải thích vai trò từng linh kiện và các đánh đổi. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Đưa tín hiệu về vùng điện áp an toàn bằng chia áp hoặc giới hạn dòng.",
      "Dùng diode kẹp, diode TVS hoặc diode Zener phù hợp để kẹp quá áp.",
      "Có điện trở nối tiếp để giới hạn dòng.",
      "Có thể thêm lọc RC nếu tín hiệu chậm và nhiễu.",
      "Phân tích ảnh hưởng tới tốc độ cạnh, lề nhiễu và năng lượng xung."
    ],
    "rubric": [
      "2 điểm: mạch cơ bản.",
      "2 điểm: vai trò linh kiện.",
      "2 điểm: bảo vệ phóng tĩnh điện và quá áp.",
      "2 điểm: đánh đổi thời gian tín hiệu.",
      "2 điểm: tiêu chí chọn linh kiện."
    ]
  },
  {
    "title": "Chọn UART, RS-232, RS-485, SPI hoặc I2C - biến thể 14",
    "prompt": "Cho các yêu cầu khác nhau về khoảng cách, số thiết bị, tốc độ, số chân và môi trường nhiễu. Trình bày cách chọn giữa UART/RS-232/RS-485, SPI và I2C. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Phân biệt giao tiếp trong cùng hệ thống và giao tiếp giữa các hệ thống.",
      "Nêu UART mức TTL và RS-232 cần chuyển mức điện áp.",
      "Nêu RS-485 phù hợp hơn cho đường dài, môi trường nhiễu hoặc nhiều nút.",
      "Nêu SPI nhanh nhưng nhiều dây, I2C ít dây hơn và có địa chỉ cùng bit xác nhận.",
      "Kết luận theo ràng buộc thiết kế thay vì chọn theo tên quen."
    ],
    "rubric": [
      "2 điểm: phân biệt chuẩn.",
      "2 điểm: tiêu chí khoảng cách và nhiễu.",
      "2 điểm: tốc độ và số chân.",
      "2 điểm: số thiết bị và cấu trúc nối.",
      "2 điểm: lập luận lựa chọn."
    ]
  },
  {
    "title": "Phân tích phép đo ADC - biến thể 15",
    "prompt": "Một hệ nhúng đo điện áp cảm biến bằng ADC. Trình bày công thức cơ bản, độ phân giải, sai số, lấy mẫu và các cách cải thiện chất lượng đo. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Nêu 2^N mức, bước lượng tử LSB và quan hệ với điện áp tham chiếu Vref.",
      "Giải thích sai số lượng tử và giới hạn khoảng nửa LSB với ADC lý tưởng.",
      "Nêu điều kiện Nyquist và mạch lấy mẫu-giữ.",
      "Phân biệt nhiễu hoặc sai số của ADC với sai số từ mạch ngoài.",
      "Đề xuất điện áp tham chiếu ổn định, lọc, hiệu chuẩn, giảm trở nguồn, bố trí mạch in tốt và lấy trung bình khi phù hợp."
    ],
    "rubric": [
      "2 điểm: công thức/độ phân giải.",
      "2 điểm: sai số.",
      "2 điểm: lấy mẫu.",
      "2 điểm: mạch ngoài.",
      "2 điểm: cải thiện."
    ]
  },
  {
    "title": "Toàn vẹn tín hiệu và EMC cho đường cảm biến - biến thể 16",
    "prompt": "Một dây cảm biến dài chạy gần tải công suất và đường PWM. Phân tích các đường nhiễu có thể xảy ra và đề xuất biện pháp giảm nhiễu. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Nêu nhiễu dẫn, nhiễu phát xạ, ghép điện dung và ghép cảm ứng.",
      "Phân tích tốc độ thay đổi điện áp, tốc độ thay đổi dòng điện, vòng dòng và dây dài.",
      "Đề xuất xoắn dây, truyền vi sai, lớp che chắn, lọc, cách ly hoặc tăng khoảng cách.",
      "Đề cập nối mass, dòng hồi tiếp, tách vùng tương tự, vùng số và vùng công suất.",
      "Liên hệ EMC: giảm phát xạ và tăng miễn nhiễm."
    ],
    "rubric": [
      "2 điểm: nhận diện đường nhiễu.",
      "2 điểm: phân tích nguyên nhân.",
      "2 điểm: biện pháp dây/cáp.",
      "2 điểm: bố trí mạch in và nối mass.",
      "2 điểm: EMC tổng thể."
    ]
  },
  {
    "title": "Thiết kế nút đo cảm biến dùng vi điều khiển - biến thể 17",
    "prompt": "Trình bày thiết kế mức khối cho một nút đo cảm biến dùng vi điều khiển: phần cứng chính, phần mềm nhúng, lựa chọn bộ nhớ, giao tiếp, năng lượng và kiểm thử. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Nêu lõi xử lý, bộ nhớ, nguồn, mạch khởi động lại, xung nhịp, cảm biến, đầu ra hoặc giao tiếp.",
      "Giải thích phần mềm nhúng đọc cảm biến, xử lý, truyền dữ liệu và quản lý lỗi.",
      "Phân tích lựa chọn vi điều khiển, RAM, bộ nhớ Flash và ngoại vi theo yêu cầu.",
      "Đề cập tiết kiệm năng lượng bằng chế độ ngủ, giảm chu kỳ hoạt động hoặc tắt ngoại vi khi không dùng.",
      "Nêu kiểm thử tích hợp phần cứng và phần mềm nhúng."
    ],
    "rubric": [
      "2 điểm: cấu trúc phần cứng hợp lý.",
      "2 điểm: luồng phần mềm nhúng rõ.",
      "2 điểm: lựa chọn bộ nhớ và ngoại vi đúng.",
      "2 điểm: năng lượng và độ tin cậy.",
      "2 điểm: kiểm thử và rủi ro."
    ]
  },
  {
    "title": "Phân tích lựa chọn bộ xử lý - biến thể 18",
    "prompt": "So sánh vi xử lý, vi điều khiển, bộ xử lý tín hiệu số DSP, mảng logic lập trình được FPGA và mạch tích hợp chuyên dụng ASIC trong một bài toán nhúng. Nêu tiêu chí chọn và ví dụ tình huống nên ưu tiên từng loại. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Phân biệt mức tích hợp của vi xử lý và vi điều khiển.",
      "Nêu DSP cho xử lý tín hiệu, FPGA cho logic song song cấu hình được, ASIC cho tối ưu cố định số lượng lớn.",
      "Phân tích tiêu chí tốc độ, năng lượng, chi phí, linh hoạt và sản lượng.",
      "Không sa vào học thuộc mã linh kiện cụ thể.",
      "Kết luận theo yêu cầu ứng dụng."
    ],
    "rubric": [
      "2 điểm: phân biệt đúng khái niệm.",
      "2 điểm: ưu nhược điểm.",
      "2 điểm: tiêu chí chọn.",
      "2 điểm: ví dụ tình huống.",
      "2 điểm: lập luận cân bằng."
    ]
  },
  {
    "title": "Quy trình dịch và khởi động phần mềm nhúng - biến thể 19",
    "prompt": "Mô tả quá trình từ mã nguồn tới phần mềm nhúng chạy trên vi điều khiển, sau đó trình bày vai trò của mã khởi động và bộ nạp khởi động trong khởi động hoặc cập nhật hệ thống. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Nêu các bước tiền xử lý, biên dịch, hợp dịch, liên kết và nạp chương trình.",
      "Giải thích tệp đối tượng, thư viện và bản chương trình cuối cùng.",
      "Trình bày vector khởi động, ngăn xếp, vùng dữ liệu, vùng BSS và bước chuyển tới chương trình chính.",
      "Nêu bộ nạp khởi động kiểm tra, nạp, cập nhật hoặc nhảy tới ứng dụng.",
      "Phân tích rủi ro cập nhật lỗi và cơ chế phục hồi."
    ],
    "rubric": [
      "2 điểm: quy trình dịch.",
      "2 điểm: vai trò công cụ.",
      "2 điểm: mã khởi động.",
      "2 điểm: bộ nạp khởi động.",
      "2 điểm: cập nhật an toàn."
    ]
  },
  {
    "title": "Thiết kế đầu vào số chống nhiễu - biến thể 20",
    "prompt": "Một nút nhấn hoặc cảm biến số nối với vi điều khiển qua dây dài trong môi trường nhiễu. Hãy đề xuất mạch và cấu hình phần mềm để đọc ổn định. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Dùng điện trở kéo lên hoặc kéo xuống để tránh trạng thái thả nổi.",
      "Cân nhắc lọc RC, cổng Schmitt hoặc ngưỡng có trễ.",
      "Có chống nảy bằng phần cứng hoặc phần mềm.",
      "Bảo vệ quá áp và phóng tĩnh điện bằng điện trở, diode TVS hoặc diode kẹp khi cần.",
      "Tra bảng thông số của linh kiện về ngưỡng logic và giới hạn dòng."
    ],
    "rubric": [
      "2 điểm: trạng thái mặc định.",
      "2 điểm: chống nhiễu/chống nảy.",
      "2 điểm: bảo vệ điện.",
      "2 điểm: cấu hình phần mềm nhúng.",
      "2 điểm: phân tích giới hạn."
    ]
  },
  {
    "title": "Thiết kế bảo vệ quá áp cho cổng I/O - biến thể 21",
    "prompt": "Đề xuất mạch bảo vệ đơn giản cho một tín hiệu số chậm có mức cao lớn hơn điện áp cho phép của vi điều khiển. Giải thích vai trò từng linh kiện và các đánh đổi. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Đưa tín hiệu về vùng điện áp an toàn bằng chia áp hoặc giới hạn dòng.",
      "Dùng diode kẹp, diode TVS hoặc diode Zener phù hợp để kẹp quá áp.",
      "Có điện trở nối tiếp để giới hạn dòng.",
      "Có thể thêm lọc RC nếu tín hiệu chậm và nhiễu.",
      "Phân tích ảnh hưởng tới tốc độ cạnh, lề nhiễu và năng lượng xung."
    ],
    "rubric": [
      "2 điểm: mạch cơ bản.",
      "2 điểm: vai trò linh kiện.",
      "2 điểm: bảo vệ phóng tĩnh điện và quá áp.",
      "2 điểm: đánh đổi thời gian tín hiệu.",
      "2 điểm: tiêu chí chọn linh kiện."
    ]
  },
  {
    "title": "Chọn UART, RS-232, RS-485, SPI hoặc I2C - biến thể 22",
    "prompt": "Cho các yêu cầu khác nhau về khoảng cách, số thiết bị, tốc độ, số chân và môi trường nhiễu. Trình bày cách chọn giữa UART/RS-232/RS-485, SPI và I2C. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Phân biệt giao tiếp trong cùng hệ thống và giao tiếp giữa các hệ thống.",
      "Nêu UART mức TTL và RS-232 cần chuyển mức điện áp.",
      "Nêu RS-485 phù hợp hơn cho đường dài, môi trường nhiễu hoặc nhiều nút.",
      "Nêu SPI nhanh nhưng nhiều dây, I2C ít dây hơn và có địa chỉ cùng bit xác nhận.",
      "Kết luận theo ràng buộc thiết kế thay vì chọn theo tên quen."
    ],
    "rubric": [
      "2 điểm: phân biệt chuẩn.",
      "2 điểm: tiêu chí khoảng cách và nhiễu.",
      "2 điểm: tốc độ và số chân.",
      "2 điểm: số thiết bị và cấu trúc nối.",
      "2 điểm: lập luận lựa chọn."
    ]
  },
  {
    "title": "Phân tích phép đo ADC - biến thể 23",
    "prompt": "Một hệ nhúng đo điện áp cảm biến bằng ADC. Trình bày công thức cơ bản, độ phân giải, sai số, lấy mẫu và các cách cải thiện chất lượng đo. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Nêu 2^N mức, bước lượng tử LSB và quan hệ với điện áp tham chiếu Vref.",
      "Giải thích sai số lượng tử và giới hạn khoảng nửa LSB với ADC lý tưởng.",
      "Nêu điều kiện Nyquist và mạch lấy mẫu-giữ.",
      "Phân biệt nhiễu hoặc sai số của ADC với sai số từ mạch ngoài.",
      "Đề xuất điện áp tham chiếu ổn định, lọc, hiệu chuẩn, giảm trở nguồn, bố trí mạch in tốt và lấy trung bình khi phù hợp."
    ],
    "rubric": [
      "2 điểm: công thức/độ phân giải.",
      "2 điểm: sai số.",
      "2 điểm: lấy mẫu.",
      "2 điểm: mạch ngoài.",
      "2 điểm: cải thiện."
    ]
  },
  {
    "title": "Toàn vẹn tín hiệu và EMC cho đường cảm biến - biến thể 24",
    "prompt": "Một dây cảm biến dài chạy gần tải công suất và đường PWM. Phân tích các đường nhiễu có thể xảy ra và đề xuất biện pháp giảm nhiễu. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Nêu nhiễu dẫn, nhiễu phát xạ, ghép điện dung và ghép cảm ứng.",
      "Phân tích tốc độ thay đổi điện áp, tốc độ thay đổi dòng điện, vòng dòng và dây dài.",
      "Đề xuất xoắn dây, truyền vi sai, lớp che chắn, lọc, cách ly hoặc tăng khoảng cách.",
      "Đề cập nối mass, dòng hồi tiếp, tách vùng tương tự, vùng số và vùng công suất.",
      "Liên hệ EMC: giảm phát xạ và tăng miễn nhiễm."
    ],
    "rubric": [
      "2 điểm: nhận diện đường nhiễu.",
      "2 điểm: phân tích nguyên nhân.",
      "2 điểm: biện pháp dây/cáp.",
      "2 điểm: bố trí mạch in và nối mass.",
      "2 điểm: EMC tổng thể."
    ]
  },
  {
    "title": "Thiết kế nút đo cảm biến dùng vi điều khiển - biến thể 25",
    "prompt": "Trình bày thiết kế mức khối cho một nút đo cảm biến dùng vi điều khiển: phần cứng chính, phần mềm nhúng, lựa chọn bộ nhớ, giao tiếp, năng lượng và kiểm thử. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Nêu lõi xử lý, bộ nhớ, nguồn, mạch khởi động lại, xung nhịp, cảm biến, đầu ra hoặc giao tiếp.",
      "Giải thích phần mềm nhúng đọc cảm biến, xử lý, truyền dữ liệu và quản lý lỗi.",
      "Phân tích lựa chọn vi điều khiển, RAM, bộ nhớ Flash và ngoại vi theo yêu cầu.",
      "Đề cập tiết kiệm năng lượng bằng chế độ ngủ, giảm chu kỳ hoạt động hoặc tắt ngoại vi khi không dùng.",
      "Nêu kiểm thử tích hợp phần cứng và phần mềm nhúng."
    ],
    "rubric": [
      "2 điểm: cấu trúc phần cứng hợp lý.",
      "2 điểm: luồng phần mềm nhúng rõ.",
      "2 điểm: lựa chọn bộ nhớ và ngoại vi đúng.",
      "2 điểm: năng lượng và độ tin cậy.",
      "2 điểm: kiểm thử và rủi ro."
    ]
  },
  {
    "title": "Phân tích lựa chọn bộ xử lý - biến thể 26",
    "prompt": "So sánh vi xử lý, vi điều khiển, bộ xử lý tín hiệu số DSP, mảng logic lập trình được FPGA và mạch tích hợp chuyên dụng ASIC trong một bài toán nhúng. Nêu tiêu chí chọn và ví dụ tình huống nên ưu tiên từng loại. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Phân biệt mức tích hợp của vi xử lý và vi điều khiển.",
      "Nêu DSP cho xử lý tín hiệu, FPGA cho logic song song cấu hình được, ASIC cho tối ưu cố định số lượng lớn.",
      "Phân tích tiêu chí tốc độ, năng lượng, chi phí, linh hoạt và sản lượng.",
      "Không sa vào học thuộc mã linh kiện cụ thể.",
      "Kết luận theo yêu cầu ứng dụng."
    ],
    "rubric": [
      "2 điểm: phân biệt đúng khái niệm.",
      "2 điểm: ưu nhược điểm.",
      "2 điểm: tiêu chí chọn.",
      "2 điểm: ví dụ tình huống.",
      "2 điểm: lập luận cân bằng."
    ]
  },
  {
    "title": "Quy trình dịch và khởi động phần mềm nhúng - biến thể 27",
    "prompt": "Mô tả quá trình từ mã nguồn tới phần mềm nhúng chạy trên vi điều khiển, sau đó trình bày vai trò của mã khởi động và bộ nạp khởi động trong khởi động hoặc cập nhật hệ thống. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Nêu các bước tiền xử lý, biên dịch, hợp dịch, liên kết và nạp chương trình.",
      "Giải thích tệp đối tượng, thư viện và bản chương trình cuối cùng.",
      "Trình bày vector khởi động, ngăn xếp, vùng dữ liệu, vùng BSS và bước chuyển tới chương trình chính.",
      "Nêu bộ nạp khởi động kiểm tra, nạp, cập nhật hoặc nhảy tới ứng dụng.",
      "Phân tích rủi ro cập nhật lỗi và cơ chế phục hồi."
    ],
    "rubric": [
      "2 điểm: quy trình dịch.",
      "2 điểm: vai trò công cụ.",
      "2 điểm: mã khởi động.",
      "2 điểm: bộ nạp khởi động.",
      "2 điểm: cập nhật an toàn."
    ]
  },
  {
    "title": "Thiết kế đầu vào số chống nhiễu - biến thể 28",
    "prompt": "Một nút nhấn hoặc cảm biến số nối với vi điều khiển qua dây dài trong môi trường nhiễu. Hãy đề xuất mạch và cấu hình phần mềm để đọc ổn định. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Dùng điện trở kéo lên hoặc kéo xuống để tránh trạng thái thả nổi.",
      "Cân nhắc lọc RC, cổng Schmitt hoặc ngưỡng có trễ.",
      "Có chống nảy bằng phần cứng hoặc phần mềm.",
      "Bảo vệ quá áp và phóng tĩnh điện bằng điện trở, diode TVS hoặc diode kẹp khi cần.",
      "Tra bảng thông số của linh kiện về ngưỡng logic và giới hạn dòng."
    ],
    "rubric": [
      "2 điểm: trạng thái mặc định.",
      "2 điểm: chống nhiễu/chống nảy.",
      "2 điểm: bảo vệ điện.",
      "2 điểm: cấu hình phần mềm nhúng.",
      "2 điểm: phân tích giới hạn."
    ]
  },
  {
    "title": "Thiết kế bảo vệ quá áp cho cổng I/O - biến thể 29",
    "prompt": "Đề xuất mạch bảo vệ đơn giản cho một tín hiệu số chậm có mức cao lớn hơn điện áp cho phép của vi điều khiển. Giải thích vai trò từng linh kiện và các đánh đổi. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Đưa tín hiệu về vùng điện áp an toàn bằng chia áp hoặc giới hạn dòng.",
      "Dùng diode kẹp, diode TVS hoặc diode Zener phù hợp để kẹp quá áp.",
      "Có điện trở nối tiếp để giới hạn dòng.",
      "Có thể thêm lọc RC nếu tín hiệu chậm và nhiễu.",
      "Phân tích ảnh hưởng tới tốc độ cạnh, lề nhiễu và năng lượng xung."
    ],
    "rubric": [
      "2 điểm: mạch cơ bản.",
      "2 điểm: vai trò linh kiện.",
      "2 điểm: bảo vệ phóng tĩnh điện và quá áp.",
      "2 điểm: đánh đổi thời gian tín hiệu.",
      "2 điểm: tiêu chí chọn linh kiện."
    ]
  },
  {
    "title": "Chọn UART, RS-232, RS-485, SPI hoặc I2C - biến thể 30",
    "prompt": "Cho các yêu cầu khác nhau về khoảng cách, số thiết bị, tốc độ, số chân và môi trường nhiễu. Trình bày cách chọn giữa UART/RS-232/RS-485, SPI và I2C. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật phần mềm nhúng để lập luận rõ hơn.",
    "expected": [
      "Phân biệt giao tiếp trong cùng hệ thống và giao tiếp giữa các hệ thống.",
      "Nêu UART mức TTL và RS-232 cần chuyển mức điện áp.",
      "Nêu RS-485 phù hợp hơn cho đường dài, môi trường nhiễu hoặc nhiều nút.",
      "Nêu SPI nhanh nhưng nhiều dây, I2C ít dây hơn và có địa chỉ cùng bit xác nhận.",
      "Kết luận theo ràng buộc thiết kế thay vì chọn theo tên quen."
    ],
    "rubric": [
      "2 điểm: phân biệt chuẩn.",
      "2 điểm: tiêu chí khoảng cách và nhiễu.",
      "2 điểm: tốc độ và số chân.",
      "2 điểm: số thiết bị và cấu trúc nối.",
      "2 điểm: lập luận lựa chọn."
    ]
  }
];

  const byChapter = new Map((embedded?.chapters || []).map((chapter) => [chapter.id, chapter]));
  const CALCULATION_CHAPTER_ID = "giao-tiep-nhung-nang-cao";

  const rotateChoices = (choices, seed) => {
    const copy = choices.map((choice) => ({ ...choice }));
    const shift = copy.length ? seed % copy.length : 0;
    return copy.slice(shift).concat(copy.slice(0, shift));
  };

  const lowerFirstText = (value) => {
    const text = String(value || "");
    if (/^(ADC|PWM|DAC|UART|SPI|I2C|RS-|MCU|CPU|TVS|ESD|DNL|INL|TUE|LSB|Vref|Vin|Flash)\b/.test(text)) return text;
    return text.replace(/^\p{Lu}/u, (ch) => ch.toLocaleLowerCase("vi-VN"));
  };

  const foldForContext = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0111/g, "d")
    .replace(/\u0110/g, "D")
    .toLowerCase();

  const contextLead = (value) => {
    const flat = foldForContext(value);
    if (flat.startsWith("khi phan tich")) return "khi phan tich";
    if (flat.startsWith("trong mot tinh huong")) return "trong mot tinh huong";
    if (flat.startsWith("voi mot bai toan")) return "voi mot bai toan";
    if (flat.startsWith("khi kiem tra")) return "khi kiem tra";
    if (flat.startsWith("trong boi canh")) return "trong boi canh";
    return flat.split(" ").slice(0, 4).join(" ");
  };

  const pickContextPrefix = (prefixes, stem, seed) => {
    const flatStem = foldForContext(stem);
    const hasLead = (lead) => new RegExp(`(^|[,\\s])${lead}\\s`).test(flatStem);
    for (let offset = 0; offset < prefixes.length; offset += 1) {
      const prefix = prefixes[(seed + offset) % prefixes.length];
      const flatPrefix = foldForContext(prefix);
      if (flatPrefix.startsWith("khi ") && hasLead("khi")) continue;
      if (flatPrefix.startsWith("trong ") && hasLead("trong")) continue;
      if (flatPrefix.startsWith("voi ") && hasLead("voi")) continue;
      const lead = contextLead(prefix);
      if (lead && !flatStem.includes(lead)) return prefix;
    }
    return prefixes[seed % prefixes.length];
  };

  const stripFinalPunctuation = (value) => String(value || "").replace(/[.!?]\s*$/, "");

  const examQuestionKey = (question) => [question.stem, ...question.choices.map((choice) => choice.text)]
    .join("|")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  const contextualizedExamQuestion = (question, seed) => {
    const prefixes = [
      "Trong một tình huống thiết kế tương tự",
      "Khi đặt vào bối cảnh kiểm tra hệ nhúng",
      "Với cùng mảng kiến thức kỹ thuật",
      "Ở một phương án thiết kế khác",
      "Khi rà soát lại lựa chọn kỹ thuật",
      "Xét trong một ngữ cảnh kỹ thuật khác",
      "Với một biến thể yêu cầu tương tự",
      "Trong cách đặt vấn đề khác",
      "Ở cùng nội dung nhưng tình huống khác",
      "Xét trên một phương án triển khai khác"
    ];
    const stem = stripFinalPunctuation(question.stem);
    const ending = /\?\s*$/.test(question.stem) ? "?" : ".";
    const prefix = pickContextPrefix(prefixes, stem, seed);
    return {
      ...question,
      stem: `${prefix}, ${lowerFirstText(stem)}${ending}`
    };
  };

  const pick = (chapter, examIndex, count, used) => {
    const questions = chapter?.questions || [];
    const result = [];
    if (!questions.length) return result;
    const stride = 37;
    const scheduledCount = (index) => {
      const base = BLUEPRINT.recipe.find(([chapterId]) => chapterId === chapter.id)?.[1] || count;
      if (index < 13 && chapter.id === "tong-quan-he-thong-nhung") return base - 1;
      if (index < 13 && chapter.id === "signal-integrity-emc") return base + 1;
      return base;
    };
    const pickedCount = (index) => scheduledCount(index) - (chapter.id === CALCULATION_CHAPTER_ID ? 1 : 0);
    let cursor = Array.from({ length: examIndex }, (_, index) => pickedCount(index))
      .reduce((sum, value) => sum + value, 0);
    let guard = 0;
    while (result.length < count && guard < questions.length * 2) {
      const index = (chapter.id.length + cursor * stride) % questions.length;
      const q = questions[index];
      const key = q.id;
      if (!used.has(key)) {
        used.add(key);
        result.push(q);
      }
      cursor += 1;
      guard += 1;
    }
    return result;
  };

  const pickCalculation = (chapter, examIndex, used) => {
    const questions = (chapter?.questions || []).filter((question) => question.id.includes("-calc-"));
    if (!questions.length) return [];
    const start = (examIndex * 7) % questions.length;
    for (let offset = 0; offset < questions.length; offset += 1) {
      const question = questions[(start + offset) % questions.length];
      if (!used.has(question.id)) {
        used.add(question.id);
        return [question];
      }
    }
    return [];
  };

  const buildExam = (examIndex) => {
    const used = new Set();
    const picked = [];
    const recipe = BLUEPRINT.recipe.map(([chapterId, count]) => {
      if (examIndex < 13 && chapterId === "tong-quan-he-thong-nhung") return [chapterId, count - 1];
      if (examIndex < 13 && chapterId === "signal-integrity-emc") return [chapterId, count + 1];
      return [chapterId, count];
    });
    for (const [chapterId, count] of recipe) {
      const chapter = byChapter.get(chapterId);
      if (chapterId === CALCULATION_CHAPTER_ID) {
        const calculation = pickCalculation(chapter, examIndex, used);
        picked.push(...calculation);
        picked.push(...pick(chapter, examIndex, count - calculation.length, used));
      } else {
        picked.push(...pick(chapter, examIndex, count, used));
      }
    }
    const questions = picked.map((question, index) => {
      const baseExamQuestion = {
        id: `de-${String(examIndex + 1).padStart(2, "0")}-q${String(index + 1).padStart(2, "0")}`,
        sourceQuestionId: question.id,
        type: question.type,
        source: question.source,
        topic: question.topic,
        bloom: question.bloom,
        outline: question.outline,
        explanation: question.explanation,
        stem: question.stem,
        choices: rotateChoices(question.choices, examIndex + index)
      };
      return baseExamQuestion;
    });
    return {
      id: `de-${String(examIndex + 1).padStart(2, "0")}`,
      title: `Đề tham khảo ${String(examIndex + 1).padStart(2, "0")}`,
      focus: "Phạm vi ôn tập: hệ thống nhúng, phần cứng, phần mềm, I/O, bảo vệ, giao tiếp nâng cao, ADC và EMC.",
      duration: "Tham khảo",
      durationMinutes: 60,
      mcqCount: questions.length,
      essayPoints: 10,
      questions,
      essay: ESSAYS[examIndex % ESSAYS.length]
    };
  };

  window.EXAM_QUIZ_DATA = {
    version: BLUEPRINT.version,
    section: BLUEPRINT.section,
    blueprint: BLUEPRINT.blueprint,
    assumptions: BLUEPRINT.assumptions,
    note: "Lưu ý : Bộ câu hỏi này chỉ mang tính chất tham khảo, ôn tập, không phải đề đã thi hay chính thức",
    exams: Array.from({ length: 30 }, (_, index) => buildExam(index))
  };
})();
