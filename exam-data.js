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
    "Không yêu cầu học thuộc model chip cụ thể hoặc các con số minh họa ngoài phạm vi cần nhớ.",
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
    "title": "Thiết kế nút đo cảm biến dùng MCU",
    "prompt": "Trình bày thiết kế mức khối cho một nút đo cảm biến dùng vi điều khiển: phần cứng chính, firmware, lựa chọn bộ nhớ, giao tiếp, năng lượng và kiểm thử.",
    "expected": [
      "Nêu lõi xử lý, bộ nhớ, nguồn, reset, clock, cảm biến, output hoặc giao tiếp.",
      "Giải thích firmware đọc cảm biến, xử lý, truyền dữ liệu và quản lý lỗi.",
      "Phân tích lựa chọn MCU, RAM/Flash và ngoại vi theo yêu cầu.",
      "Đề cập tiết kiệm năng lượng bằng sleep, duty cycle hoặc tắt ngoại vi.",
      "Nêu kiểm thử tích hợp phần cứng và firmware."
    ],
    "rubric": [
      "2 điểm: cấu trúc phần cứng hợp lý.",
      "2 điểm: luồng firmware rõ.",
      "2 điểm: lựa chọn bộ nhớ và ngoại vi đúng.",
      "2 điểm: năng lượng và độ tin cậy.",
      "2 điểm: kiểm thử và rủi ro."
    ]
  },
  {
    "title": "Phân tích lựa chọn bộ xử lý",
    "prompt": "So sánh vi xử lý, vi điều khiển, DSP, FPGA và ASIC trong một bài toán nhúng. Nêu tiêu chí chọn và ví dụ tình huống nên ưu tiên từng loại.",
    "expected": [
      "Phân biệt mức tích hợp của vi xử lý và vi điều khiển.",
      "Nêu DSP cho xử lý tín hiệu, FPGA cho logic song song cấu hình được, ASIC cho tối ưu cố định số lượng lớn.",
      "Phân tích tiêu chí tốc độ, năng lượng, chi phí, linh hoạt và sản lượng.",
      "Không sa vào học thuộc model cụ thể.",
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
    "title": "Quy trình build và khởi động firmware",
    "prompt": "Mô tả từ mã nguồn tới firmware chạy trên MCU, sau đó trình bày vai trò startup code và bootloader trong khởi động/cập nhật hệ thống.",
    "expected": [
      "Nêu tiền xử lý, compiler, assembler, linker/loader.",
      "Giải thích object, thư viện và image cuối.",
      "Trình bày reset/vector, stack, data/BSS và chuyển tới chương trình chính.",
      "Nêu bootloader kiểm tra, nạp, cập nhật hoặc nhảy tới ứng dụng.",
      "Phân tích rủi ro cập nhật lỗi và cơ chế phục hồi."
    ],
    "rubric": [
      "2 điểm: quy trình dịch.",
      "2 điểm: vai trò công cụ.",
      "2 điểm: startup.",
      "2 điểm: bootloader.",
      "2 điểm: cập nhật an toàn."
    ]
  },
  {
    "title": "Thiết kế input số chống nhiễu",
    "prompt": "Một nút nhấn hoặc cảm biến số nối với MCU qua dây dài trong môi trường nhiễu. Hãy đề xuất mạch và cấu hình phần mềm để đọc ổn định.",
    "expected": [
      "Dùng pull-up hoặc pull-down để tránh thả nổi.",
      "Cân nhắc lọc RC, Schmitt trigger hoặc hysteresis.",
      "Có chống nảy bằng phần cứng hoặc phần mềm.",
      "Bảo vệ quá áp/ESD bằng điện trở, TVS/diode kẹp khi cần.",
      "Đọc datasheet về ngưỡng logic và giới hạn dòng."
    ],
    "rubric": [
      "2 điểm: trạng thái mặc định.",
      "2 điểm: chống nhiễu/chống nảy.",
      "2 điểm: bảo vệ điện.",
      "2 điểm: cấu hình firmware.",
      "2 điểm: phân tích giới hạn."
    ]
  },
  {
    "title": "Thiết kế bảo vệ quá áp cho cổng I/O",
    "prompt": "Đề xuất mạch bảo vệ đơn giản cho một tín hiệu số chậm có mức cao lớn hơn điện áp MCU. Giải thích vai trò từng linh kiện và các đánh đổi.",
    "expected": [
      "Đưa tín hiệu về vùng điện áp an toàn bằng chia áp hoặc giới hạn dòng.",
      "Dùng diode clamp, TVS hoặc Zener phù hợp để kẹp quá áp.",
      "Có điện trở nối tiếp để giới hạn dòng.",
      "Có thể thêm lọc RC nếu tín hiệu chậm và nhiễu.",
      "Phân tích ảnh hưởng tới tốc độ cạnh, lề nhiễu và năng lượng xung."
    ],
    "rubric": [
      "2 điểm: mạch cơ bản.",
      "2 điểm: vai trò linh kiện.",
      "2 điểm: bảo vệ ESD/quá áp.",
      "2 điểm: đánh đổi timing.",
      "2 điểm: tiêu chí chọn linh kiện."
    ]
  },
  {
    "title": "Chọn UART, RS-232, RS-485, SPI hoặc I2C",
    "prompt": "Cho các yêu cầu khác nhau về khoảng cách, số thiết bị, tốc độ, số chân và môi trường nhiễu. Trình bày cách chọn giữa UART/RS-232/RS-485, SPI và I2C.",
    "expected": [
      "Phân biệt inter-system và intra-system.",
      "Nêu UART TTL và RS-232 cần chuyển mức.",
      "Nêu RS-485 cho đường dài/nhiễu/nhiều nút.",
      "Nêu SPI nhanh nhưng nhiều dây, I2C ít dây có địa chỉ và ACK.",
      "Kết luận theo ràng buộc thiết kế thay vì chọn theo tên quen."
    ],
    "rubric": [
      "2 điểm: phân biệt chuẩn.",
      "2 điểm: tiêu chí khoảng cách/nhiễu.",
      "2 điểm: tốc độ/số chân.",
      "2 điểm: số thiết bị/topology.",
      "2 điểm: lập luận lựa chọn."
    ]
  },
  {
    "title": "Phân tích phép đo ADC",
    "prompt": "Một hệ nhúng đo điện áp cảm biến bằng ADC. Trình bày công thức cơ bản, độ phân giải, sai số, lấy mẫu và các cách cải thiện chất lượng đo.",
    "expected": [
      "Nêu 2^N mức, LSB và quan hệ với Vref.",
      "Giải thích sai số lượng tử và giới hạn khoảng nửa LSB với ADC lý tưởng.",
      "Nêu Nyquist và sample-and-hold.",
      "Phân biệt nhiễu/sai số ADC với sai số mạch ngoài.",
      "Đề xuất Vref ổn định, lọc, hiệu chuẩn, giảm trở nguồn, layout tốt và lấy trung bình khi phù hợp."
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
    "title": "Signal Integrity và EMC cho đường cảm biến",
    "prompt": "Một dây cảm biến dài chạy gần tải công suất và đường PWM. Phân tích các đường nhiễu có thể xảy ra và đề xuất biện pháp giảm nhiễu.",
    "expected": [
      "Nêu truyền dẫn, phát xạ, ghép điện dung và ghép cảm ứng.",
      "Phân tích dU/dt, dI/dt, vòng dòng và dây dài.",
      "Đề xuất xoắn dây, vi sai, shield, lọc, cách ly hoặc tăng khoảng cách.",
      "Đề cập grounding, dòng hồi tiếp, tách analog/digital/công suất.",
      "Liên hệ EMC: giảm phát xạ và tăng miễn nhiễm."
    ],
    "rubric": [
      "2 điểm: nhận diện đường nhiễu.",
      "2 điểm: phân tích nguyên nhân.",
      "2 điểm: biện pháp dây/cáp.",
      "2 điểm: layout/grounding.",
      "2 điểm: EMC tổng thể."
    ]
  },
  {
    "title": "Thiết kế nút đo cảm biến dùng MCU - biến thể 9",
    "prompt": "Trình bày thiết kế mức khối cho một nút đo cảm biến dùng vi điều khiển: phần cứng chính, firmware, lựa chọn bộ nhớ, giao tiếp, năng lượng và kiểm thử. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Nêu lõi xử lý, bộ nhớ, nguồn, reset, clock, cảm biến, output hoặc giao tiếp.",
      "Giải thích firmware đọc cảm biến, xử lý, truyền dữ liệu và quản lý lỗi.",
      "Phân tích lựa chọn MCU, RAM/Flash và ngoại vi theo yêu cầu.",
      "Đề cập tiết kiệm năng lượng bằng sleep, duty cycle hoặc tắt ngoại vi.",
      "Nêu kiểm thử tích hợp phần cứng và firmware."
    ],
    "rubric": [
      "2 điểm: cấu trúc phần cứng hợp lý.",
      "2 điểm: luồng firmware rõ.",
      "2 điểm: lựa chọn bộ nhớ và ngoại vi đúng.",
      "2 điểm: năng lượng và độ tin cậy.",
      "2 điểm: kiểm thử và rủi ro."
    ]
  },
  {
    "title": "Phân tích lựa chọn bộ xử lý - biến thể 10",
    "prompt": "So sánh vi xử lý, vi điều khiển, DSP, FPGA và ASIC trong một bài toán nhúng. Nêu tiêu chí chọn và ví dụ tình huống nên ưu tiên từng loại. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Phân biệt mức tích hợp của vi xử lý và vi điều khiển.",
      "Nêu DSP cho xử lý tín hiệu, FPGA cho logic song song cấu hình được, ASIC cho tối ưu cố định số lượng lớn.",
      "Phân tích tiêu chí tốc độ, năng lượng, chi phí, linh hoạt và sản lượng.",
      "Không sa vào học thuộc model cụ thể.",
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
    "title": "Quy trình build và khởi động firmware - biến thể 11",
    "prompt": "Mô tả từ mã nguồn tới firmware chạy trên MCU, sau đó trình bày vai trò startup code và bootloader trong khởi động/cập nhật hệ thống. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Nêu tiền xử lý, compiler, assembler, linker/loader.",
      "Giải thích object, thư viện và image cuối.",
      "Trình bày reset/vector, stack, data/BSS và chuyển tới chương trình chính.",
      "Nêu bootloader kiểm tra, nạp, cập nhật hoặc nhảy tới ứng dụng.",
      "Phân tích rủi ro cập nhật lỗi và cơ chế phục hồi."
    ],
    "rubric": [
      "2 điểm: quy trình dịch.",
      "2 điểm: vai trò công cụ.",
      "2 điểm: startup.",
      "2 điểm: bootloader.",
      "2 điểm: cập nhật an toàn."
    ]
  },
  {
    "title": "Thiết kế input số chống nhiễu - biến thể 12",
    "prompt": "Một nút nhấn hoặc cảm biến số nối với MCU qua dây dài trong môi trường nhiễu. Hãy đề xuất mạch và cấu hình phần mềm để đọc ổn định. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Dùng pull-up hoặc pull-down để tránh thả nổi.",
      "Cân nhắc lọc RC, Schmitt trigger hoặc hysteresis.",
      "Có chống nảy bằng phần cứng hoặc phần mềm.",
      "Bảo vệ quá áp/ESD bằng điện trở, TVS/diode kẹp khi cần.",
      "Đọc datasheet về ngưỡng logic và giới hạn dòng."
    ],
    "rubric": [
      "2 điểm: trạng thái mặc định.",
      "2 điểm: chống nhiễu/chống nảy.",
      "2 điểm: bảo vệ điện.",
      "2 điểm: cấu hình firmware.",
      "2 điểm: phân tích giới hạn."
    ]
  },
  {
    "title": "Thiết kế bảo vệ quá áp cho cổng I/O - biến thể 13",
    "prompt": "Đề xuất mạch bảo vệ đơn giản cho một tín hiệu số chậm có mức cao lớn hơn điện áp MCU. Giải thích vai trò từng linh kiện và các đánh đổi. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Đưa tín hiệu về vùng điện áp an toàn bằng chia áp hoặc giới hạn dòng.",
      "Dùng diode clamp, TVS hoặc Zener phù hợp để kẹp quá áp.",
      "Có điện trở nối tiếp để giới hạn dòng.",
      "Có thể thêm lọc RC nếu tín hiệu chậm và nhiễu.",
      "Phân tích ảnh hưởng tới tốc độ cạnh, lề nhiễu và năng lượng xung."
    ],
    "rubric": [
      "2 điểm: mạch cơ bản.",
      "2 điểm: vai trò linh kiện.",
      "2 điểm: bảo vệ ESD/quá áp.",
      "2 điểm: đánh đổi timing.",
      "2 điểm: tiêu chí chọn linh kiện."
    ]
  },
  {
    "title": "Chọn UART, RS-232, RS-485, SPI hoặc I2C - biến thể 14",
    "prompt": "Cho các yêu cầu khác nhau về khoảng cách, số thiết bị, tốc độ, số chân và môi trường nhiễu. Trình bày cách chọn giữa UART/RS-232/RS-485, SPI và I2C. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Phân biệt inter-system và intra-system.",
      "Nêu UART TTL và RS-232 cần chuyển mức.",
      "Nêu RS-485 cho đường dài/nhiễu/nhiều nút.",
      "Nêu SPI nhanh nhưng nhiều dây, I2C ít dây có địa chỉ và ACK.",
      "Kết luận theo ràng buộc thiết kế thay vì chọn theo tên quen."
    ],
    "rubric": [
      "2 điểm: phân biệt chuẩn.",
      "2 điểm: tiêu chí khoảng cách/nhiễu.",
      "2 điểm: tốc độ/số chân.",
      "2 điểm: số thiết bị/topology.",
      "2 điểm: lập luận lựa chọn."
    ]
  },
  {
    "title": "Phân tích phép đo ADC - biến thể 15",
    "prompt": "Một hệ nhúng đo điện áp cảm biến bằng ADC. Trình bày công thức cơ bản, độ phân giải, sai số, lấy mẫu và các cách cải thiện chất lượng đo. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Nêu 2^N mức, LSB và quan hệ với Vref.",
      "Giải thích sai số lượng tử và giới hạn khoảng nửa LSB với ADC lý tưởng.",
      "Nêu Nyquist và sample-and-hold.",
      "Phân biệt nhiễu/sai số ADC với sai số mạch ngoài.",
      "Đề xuất Vref ổn định, lọc, hiệu chuẩn, giảm trở nguồn, layout tốt và lấy trung bình khi phù hợp."
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
    "title": "Signal Integrity và EMC cho đường cảm biến - biến thể 16",
    "prompt": "Một dây cảm biến dài chạy gần tải công suất và đường PWM. Phân tích các đường nhiễu có thể xảy ra và đề xuất biện pháp giảm nhiễu. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Nêu truyền dẫn, phát xạ, ghép điện dung và ghép cảm ứng.",
      "Phân tích dU/dt, dI/dt, vòng dòng và dây dài.",
      "Đề xuất xoắn dây, vi sai, shield, lọc, cách ly hoặc tăng khoảng cách.",
      "Đề cập grounding, dòng hồi tiếp, tách analog/digital/công suất.",
      "Liên hệ EMC: giảm phát xạ và tăng miễn nhiễm."
    ],
    "rubric": [
      "2 điểm: nhận diện đường nhiễu.",
      "2 điểm: phân tích nguyên nhân.",
      "2 điểm: biện pháp dây/cáp.",
      "2 điểm: layout/grounding.",
      "2 điểm: EMC tổng thể."
    ]
  },
  {
    "title": "Thiết kế nút đo cảm biến dùng MCU - biến thể 17",
    "prompt": "Trình bày thiết kế mức khối cho một nút đo cảm biến dùng vi điều khiển: phần cứng chính, firmware, lựa chọn bộ nhớ, giao tiếp, năng lượng và kiểm thử. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Nêu lõi xử lý, bộ nhớ, nguồn, reset, clock, cảm biến, output hoặc giao tiếp.",
      "Giải thích firmware đọc cảm biến, xử lý, truyền dữ liệu và quản lý lỗi.",
      "Phân tích lựa chọn MCU, RAM/Flash và ngoại vi theo yêu cầu.",
      "Đề cập tiết kiệm năng lượng bằng sleep, duty cycle hoặc tắt ngoại vi.",
      "Nêu kiểm thử tích hợp phần cứng và firmware."
    ],
    "rubric": [
      "2 điểm: cấu trúc phần cứng hợp lý.",
      "2 điểm: luồng firmware rõ.",
      "2 điểm: lựa chọn bộ nhớ và ngoại vi đúng.",
      "2 điểm: năng lượng và độ tin cậy.",
      "2 điểm: kiểm thử và rủi ro."
    ]
  },
  {
    "title": "Phân tích lựa chọn bộ xử lý - biến thể 18",
    "prompt": "So sánh vi xử lý, vi điều khiển, DSP, FPGA và ASIC trong một bài toán nhúng. Nêu tiêu chí chọn và ví dụ tình huống nên ưu tiên từng loại. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Phân biệt mức tích hợp của vi xử lý và vi điều khiển.",
      "Nêu DSP cho xử lý tín hiệu, FPGA cho logic song song cấu hình được, ASIC cho tối ưu cố định số lượng lớn.",
      "Phân tích tiêu chí tốc độ, năng lượng, chi phí, linh hoạt và sản lượng.",
      "Không sa vào học thuộc model cụ thể.",
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
    "title": "Quy trình build và khởi động firmware - biến thể 19",
    "prompt": "Mô tả từ mã nguồn tới firmware chạy trên MCU, sau đó trình bày vai trò startup code và bootloader trong khởi động/cập nhật hệ thống. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Nêu tiền xử lý, compiler, assembler, linker/loader.",
      "Giải thích object, thư viện và image cuối.",
      "Trình bày reset/vector, stack, data/BSS và chuyển tới chương trình chính.",
      "Nêu bootloader kiểm tra, nạp, cập nhật hoặc nhảy tới ứng dụng.",
      "Phân tích rủi ro cập nhật lỗi và cơ chế phục hồi."
    ],
    "rubric": [
      "2 điểm: quy trình dịch.",
      "2 điểm: vai trò công cụ.",
      "2 điểm: startup.",
      "2 điểm: bootloader.",
      "2 điểm: cập nhật an toàn."
    ]
  },
  {
    "title": "Thiết kế input số chống nhiễu - biến thể 20",
    "prompt": "Một nút nhấn hoặc cảm biến số nối với MCU qua dây dài trong môi trường nhiễu. Hãy đề xuất mạch và cấu hình phần mềm để đọc ổn định. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Dùng pull-up hoặc pull-down để tránh thả nổi.",
      "Cân nhắc lọc RC, Schmitt trigger hoặc hysteresis.",
      "Có chống nảy bằng phần cứng hoặc phần mềm.",
      "Bảo vệ quá áp/ESD bằng điện trở, TVS/diode kẹp khi cần.",
      "Đọc datasheet về ngưỡng logic và giới hạn dòng."
    ],
    "rubric": [
      "2 điểm: trạng thái mặc định.",
      "2 điểm: chống nhiễu/chống nảy.",
      "2 điểm: bảo vệ điện.",
      "2 điểm: cấu hình firmware.",
      "2 điểm: phân tích giới hạn."
    ]
  },
  {
    "title": "Thiết kế bảo vệ quá áp cho cổng I/O - biến thể 21",
    "prompt": "Đề xuất mạch bảo vệ đơn giản cho một tín hiệu số chậm có mức cao lớn hơn điện áp MCU. Giải thích vai trò từng linh kiện và các đánh đổi. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Đưa tín hiệu về vùng điện áp an toàn bằng chia áp hoặc giới hạn dòng.",
      "Dùng diode clamp, TVS hoặc Zener phù hợp để kẹp quá áp.",
      "Có điện trở nối tiếp để giới hạn dòng.",
      "Có thể thêm lọc RC nếu tín hiệu chậm và nhiễu.",
      "Phân tích ảnh hưởng tới tốc độ cạnh, lề nhiễu và năng lượng xung."
    ],
    "rubric": [
      "2 điểm: mạch cơ bản.",
      "2 điểm: vai trò linh kiện.",
      "2 điểm: bảo vệ ESD/quá áp.",
      "2 điểm: đánh đổi timing.",
      "2 điểm: tiêu chí chọn linh kiện."
    ]
  },
  {
    "title": "Chọn UART, RS-232, RS-485, SPI hoặc I2C - biến thể 22",
    "prompt": "Cho các yêu cầu khác nhau về khoảng cách, số thiết bị, tốc độ, số chân và môi trường nhiễu. Trình bày cách chọn giữa UART/RS-232/RS-485, SPI và I2C. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Phân biệt inter-system và intra-system.",
      "Nêu UART TTL và RS-232 cần chuyển mức.",
      "Nêu RS-485 cho đường dài/nhiễu/nhiều nút.",
      "Nêu SPI nhanh nhưng nhiều dây, I2C ít dây có địa chỉ và ACK.",
      "Kết luận theo ràng buộc thiết kế thay vì chọn theo tên quen."
    ],
    "rubric": [
      "2 điểm: phân biệt chuẩn.",
      "2 điểm: tiêu chí khoảng cách/nhiễu.",
      "2 điểm: tốc độ/số chân.",
      "2 điểm: số thiết bị/topology.",
      "2 điểm: lập luận lựa chọn."
    ]
  },
  {
    "title": "Phân tích phép đo ADC - biến thể 23",
    "prompt": "Một hệ nhúng đo điện áp cảm biến bằng ADC. Trình bày công thức cơ bản, độ phân giải, sai số, lấy mẫu và các cách cải thiện chất lượng đo. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Nêu 2^N mức, LSB và quan hệ với Vref.",
      "Giải thích sai số lượng tử và giới hạn khoảng nửa LSB với ADC lý tưởng.",
      "Nêu Nyquist và sample-and-hold.",
      "Phân biệt nhiễu/sai số ADC với sai số mạch ngoài.",
      "Đề xuất Vref ổn định, lọc, hiệu chuẩn, giảm trở nguồn, layout tốt và lấy trung bình khi phù hợp."
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
    "title": "Signal Integrity và EMC cho đường cảm biến - biến thể 24",
    "prompt": "Một dây cảm biến dài chạy gần tải công suất và đường PWM. Phân tích các đường nhiễu có thể xảy ra và đề xuất biện pháp giảm nhiễu. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Nêu truyền dẫn, phát xạ, ghép điện dung và ghép cảm ứng.",
      "Phân tích dU/dt, dI/dt, vòng dòng và dây dài.",
      "Đề xuất xoắn dây, vi sai, shield, lọc, cách ly hoặc tăng khoảng cách.",
      "Đề cập grounding, dòng hồi tiếp, tách analog/digital/công suất.",
      "Liên hệ EMC: giảm phát xạ và tăng miễn nhiễm."
    ],
    "rubric": [
      "2 điểm: nhận diện đường nhiễu.",
      "2 điểm: phân tích nguyên nhân.",
      "2 điểm: biện pháp dây/cáp.",
      "2 điểm: layout/grounding.",
      "2 điểm: EMC tổng thể."
    ]
  },
  {
    "title": "Thiết kế nút đo cảm biến dùng MCU - biến thể 25",
    "prompt": "Trình bày thiết kế mức khối cho một nút đo cảm biến dùng vi điều khiển: phần cứng chính, firmware, lựa chọn bộ nhớ, giao tiếp, năng lượng và kiểm thử. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Nêu lõi xử lý, bộ nhớ, nguồn, reset, clock, cảm biến, output hoặc giao tiếp.",
      "Giải thích firmware đọc cảm biến, xử lý, truyền dữ liệu và quản lý lỗi.",
      "Phân tích lựa chọn MCU, RAM/Flash và ngoại vi theo yêu cầu.",
      "Đề cập tiết kiệm năng lượng bằng sleep, duty cycle hoặc tắt ngoại vi.",
      "Nêu kiểm thử tích hợp phần cứng và firmware."
    ],
    "rubric": [
      "2 điểm: cấu trúc phần cứng hợp lý.",
      "2 điểm: luồng firmware rõ.",
      "2 điểm: lựa chọn bộ nhớ và ngoại vi đúng.",
      "2 điểm: năng lượng và độ tin cậy.",
      "2 điểm: kiểm thử và rủi ro."
    ]
  },
  {
    "title": "Phân tích lựa chọn bộ xử lý - biến thể 26",
    "prompt": "So sánh vi xử lý, vi điều khiển, DSP, FPGA và ASIC trong một bài toán nhúng. Nêu tiêu chí chọn và ví dụ tình huống nên ưu tiên từng loại. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Phân biệt mức tích hợp của vi xử lý và vi điều khiển.",
      "Nêu DSP cho xử lý tín hiệu, FPGA cho logic song song cấu hình được, ASIC cho tối ưu cố định số lượng lớn.",
      "Phân tích tiêu chí tốc độ, năng lượng, chi phí, linh hoạt và sản lượng.",
      "Không sa vào học thuộc model cụ thể.",
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
    "title": "Quy trình build và khởi động firmware - biến thể 27",
    "prompt": "Mô tả từ mã nguồn tới firmware chạy trên MCU, sau đó trình bày vai trò startup code và bootloader trong khởi động/cập nhật hệ thống. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Nêu tiền xử lý, compiler, assembler, linker/loader.",
      "Giải thích object, thư viện và image cuối.",
      "Trình bày reset/vector, stack, data/BSS và chuyển tới chương trình chính.",
      "Nêu bootloader kiểm tra, nạp, cập nhật hoặc nhảy tới ứng dụng.",
      "Phân tích rủi ro cập nhật lỗi và cơ chế phục hồi."
    ],
    "rubric": [
      "2 điểm: quy trình dịch.",
      "2 điểm: vai trò công cụ.",
      "2 điểm: startup.",
      "2 điểm: bootloader.",
      "2 điểm: cập nhật an toàn."
    ]
  },
  {
    "title": "Thiết kế input số chống nhiễu - biến thể 28",
    "prompt": "Một nút nhấn hoặc cảm biến số nối với MCU qua dây dài trong môi trường nhiễu. Hãy đề xuất mạch và cấu hình phần mềm để đọc ổn định. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Dùng pull-up hoặc pull-down để tránh thả nổi.",
      "Cân nhắc lọc RC, Schmitt trigger hoặc hysteresis.",
      "Có chống nảy bằng phần cứng hoặc phần mềm.",
      "Bảo vệ quá áp/ESD bằng điện trở, TVS/diode kẹp khi cần.",
      "Đọc datasheet về ngưỡng logic và giới hạn dòng."
    ],
    "rubric": [
      "2 điểm: trạng thái mặc định.",
      "2 điểm: chống nhiễu/chống nảy.",
      "2 điểm: bảo vệ điện.",
      "2 điểm: cấu hình firmware.",
      "2 điểm: phân tích giới hạn."
    ]
  },
  {
    "title": "Thiết kế bảo vệ quá áp cho cổng I/O - biến thể 29",
    "prompt": "Đề xuất mạch bảo vệ đơn giản cho một tín hiệu số chậm có mức cao lớn hơn điện áp MCU. Giải thích vai trò từng linh kiện và các đánh đổi. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Đưa tín hiệu về vùng điện áp an toàn bằng chia áp hoặc giới hạn dòng.",
      "Dùng diode clamp, TVS hoặc Zener phù hợp để kẹp quá áp.",
      "Có điện trở nối tiếp để giới hạn dòng.",
      "Có thể thêm lọc RC nếu tín hiệu chậm và nhiễu.",
      "Phân tích ảnh hưởng tới tốc độ cạnh, lề nhiễu và năng lượng xung."
    ],
    "rubric": [
      "2 điểm: mạch cơ bản.",
      "2 điểm: vai trò linh kiện.",
      "2 điểm: bảo vệ ESD/quá áp.",
      "2 điểm: đánh đổi timing.",
      "2 điểm: tiêu chí chọn linh kiện."
    ]
  },
  {
    "title": "Chọn UART, RS-232, RS-485, SPI hoặc I2C - biến thể 30",
    "prompt": "Cho các yêu cầu khác nhau về khoảng cách, số thiết bị, tốc độ, số chân và môi trường nhiễu. Trình bày cách chọn giữa UART/RS-232/RS-485, SPI và I2C. Có thể giả định thêm ràng buộc cụ thể về chi phí, năng lượng, nhiễu hoặc khả năng cập nhật firmware để lập luận rõ hơn.",
    "expected": [
      "Phân biệt inter-system và intra-system.",
      "Nêu UART TTL và RS-232 cần chuyển mức.",
      "Nêu RS-485 cho đường dài/nhiễu/nhiều nút.",
      "Nêu SPI nhanh nhưng nhiều dây, I2C ít dây có địa chỉ và ACK.",
      "Kết luận theo ràng buộc thiết kế thay vì chọn theo tên quen."
    ],
    "rubric": [
      "2 điểm: phân biệt chuẩn.",
      "2 điểm: tiêu chí khoảng cách/nhiễu.",
      "2 điểm: tốc độ/số chân.",
      "2 điểm: số thiết bị/topology.",
      "2 điểm: lập luận lựa chọn."
    ]
  }
];

  const byChapter = new Map((embedded?.chapters || []).map((chapter) => [chapter.id, chapter]));

  const rotateChoices = (choices, seed) => {
    const copy = choices.map((choice) => ({ ...choice }));
    const shift = copy.length ? seed % copy.length : 0;
    return copy.slice(shift).concat(copy.slice(0, shift));
  };

  const pick = (chapter, examIndex, count, used) => {
    const questions = chapter?.questions || [];
    const result = [];
    if (!questions.length) return result;
    let cursor = (examIndex * 13 + chapter.id.length) % questions.length;
    let guard = 0;
    while (result.length < count && guard < questions.length * 3) {
      const q = questions[cursor % questions.length];
      const key = q.id;
      if (!used.has(key)) {
        used.add(key);
        result.push(q);
      }
      cursor += 17;
      guard += 1;
    }
    return result;
  };

  const buildExam = (examIndex) => {
    const used = new Set();
    const picked = BLUEPRINT.recipe.flatMap(([chapterId, count]) => pick(byChapter.get(chapterId), examIndex, count, used));
    const questions = picked.map((question, index) => ({
      id: `de-${String(examIndex + 1).padStart(2, "0")}-q${String(index + 1).padStart(2, "0")}`,
      type: question.type,
      source: question.source,
      topic: question.topic,
      bloom: question.bloom,
      outline: question.outline,
      stem: question.stem,
      choices: rotateChoices(question.choices, examIndex + index)
    }));
    return {
      id: `de-${String(examIndex + 1).padStart(2, "0")}`,
      title: `Đề tham khảo ${String(examIndex + 1).padStart(2, "0")}`,
      focus: "Bám đề cương chính thức: hệ thống nhúng, phần cứng, phần mềm, I/O, bảo vệ, giao tiếp nâng cao, ADC và EMC.",
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
