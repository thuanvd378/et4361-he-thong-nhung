(() => {
  const embedded = window.EMBEDDED_QUIZ_DATA;
  const components = window.COMPONENT_QUIZ_DATA;

  const SOURCE = {
    inference: "Ma trận đề mô phỏng theo kiến thức môn học",
    esp32: "ESP32 ADC",
    localEmbedded: "Kiến thức hệ thống nhúng",
    localComponents: "Kiến thức cấu kiện trong nhúng"
  };

  const sourceDatasets = [embedded, components].filter(Boolean);

  const bySection = (sectionId) => sourceDatasets.find((data) => data.section.id === sectionId);

  const collectQuestions = (sectionId, chapterIds) => {
    const data = bySection(sectionId);
    if (!data) return [];
    return data.chapters
      .filter((chapter) => chapterIds.includes(chapter.id))
      .flatMap((chapter) => chapter.questions.map((question) => ({ data, chapter, question })));
  };

  const pickFromPool = (pool, seed, count, used) => {
    const picked = [];
    if (!pool.length) return picked;
    let cursor = (seed * 17 + 11) % pool.length;
    let guard = 0;
    while (picked.length < count && guard < pool.length * 3) {
      const item = pool[cursor % pool.length];
      const key = `${item.data.section.id}:${item.question.id}`;
      if (!used.has(key)) {
        used.add(key);
        picked.push(item);
      }
      cursor += 23;
      guard += 1;
    }
    return picked;
  };

  const rotateChoices = (choices, seed) => {
    const copy = choices.map((choice) => ({ ...choice }));
    const shift = seed % copy.length;
    return copy.slice(shift).concat(copy.slice(0, shift));
  };

  const makeCopiedQuestion = (item, examId, number) => ({
    id: `${examId}-q${String(number).padStart(2, "0")}`,
    type: item.question.type,
    source: item.chapter.title,
    topic: item.question.topic,
    stem: item.question.stem,
    choices: item.question.choices.map((choice) => ({ ...choice })),
    originalId: item.question.id,
    sourceSection: item.data.section.id,
    sourceChapter: item.chapter.id
  });

  const custom = (id, type, source, topic, stem, correct, why, wrong) => ({
    id,
    type,
    source,
    topic,
    stem,
    choices: [
      { text: correct, correct: true, reason: why },
      ...wrong.map(([text, reason]) => ({ text, correct: false, reason }))
    ]
  });

  const esp32Questions = [
    custom(
      "esp32-adc-vref",
      "ESP32",
      SOURCE.esp32,
      "ESP32 ADC",
      "Vì sao đọc ADC trên ESP32 thường cần hiệu chuẩn nếu muốn suy ra điện áp tương đối chính xác?",
      "Vì điện áp tham chiếu danh định khoảng 1100 mV nhưng giá trị thật giữa các chip có thể lệch đáng kể.",
      "Vref danh định khoảng 1100 mV nhưng giá trị thật giữa các chip có thể lệch đáng kể, nên cần calibration khi muốn đổi mã ADC sang điện áp tin cậy.",
      [
        ["Vì ADC ESP32 không phải SAR ADC.", "ESP32 có các ADC SAR, vấn đề chính ở đây là sai lệch tham chiếu và nhiễu."],
        ["Vì mọi chân GPIO đều tự giới hạn chính xác ở 5 V.", "ADC không được hiểu là chân chịu 5 V; phải bảo vệ và đưa tín hiệu về đúng dải."],
        ["Vì hiệu chuẩn làm tăng số bit vật lý của ADC.", "Hiệu chuẩn cải thiện quy đổi điện áp, không biến phần cứng thành ADC nhiều bit hơn."]
      ]
    ),
    custom(
      "esp32-adc2-wifi",
      "ESP32",
      SOURCE.esp32,
      "ADC2 và Wi-Fi",
      "Một mạch ESP32 vừa bật Wi-Fi vừa cần đo cảm biến analog ổn định. Lựa chọn nào an toàn hơn?",
      "Ưu tiên dùng kênh ADC1 và tránh phụ thuộc ADC2 khi Wi-Fi đang chạy.",
      "ADC2 dùng chung tài nguyên với Wi-Fi trên ESP32, nên thao tác đọc ADC2 có thể lỗi hoặc không ổn định khi Wi-Fi hoạt động.",
      [
        ["Dùng ADC2 vì Wi-Fi làm ADC2 chính xác hơn.", "Wi-Fi không làm ADC2 chính xác hơn; nó còn chia sẻ tài nguyên với ADC2."],
        ["Chỉ cần đổi baud rate UART là ADC2 hết xung đột.", "Baud rate UART không giải quyết tranh chấp phần cứng giữa Wi-Fi và ADC2."],
        ["Không cần quan tâm ADC1 hay ADC2 vì cả hai luôn độc lập.", "Trên ESP32, ADC2 có ràng buộc đặc biệt khi Wi-Fi hoạt động."]
      ]
    ),
    custom(
      "esp32-adc-noise",
      "ESP32",
      SOURCE.esp32,
      "Giảm nhiễu ADC",
      "Biện pháp nào hợp lý để giảm dao động kết quả ADC trên ESP32?",
      "Đặt tụ bypass nhỏ ở chân ADC khi phù hợp và lấy nhiều mẫu để lọc trung bình.",
      "Tụ nhỏ ở đầu vào ADC giúp giảm nhiễu cao tần, còn multisampling/lấy trung bình giúp kết quả bớt dao động.",
      [
        ["Tăng xung nhịp CPU sẽ tự làm ADC hết nhiễu.", "Nhiễu ADC liên quan nguồn, layout, tín hiệu vào và cách lấy mẫu."],
        ["Bỏ mass chung giữa cảm biến và ESP32.", "Thiếu mốc tham chiếu chung thường làm phép đo sai hoặc trôi."],
        ["Luôn dùng điện trở phân áp rất lớn để tiết kiệm dòng.", "Trở nguồn quá lớn có thể làm tụ lấy mẫu ADC nạp chậm và kết quả sai."]
      ]
    ),
    custom(
      "esp32-adc-raw",
      "ESP32",
      SOURCE.esp32,
      "Mã ADC",
      "Kết luận nào đúng khi thấy ESP32 trả về mã ADC 12 bit từ 0 đến 4095?",
      "Đó là mã số hóa thô; để suy ra điện áp đáng tin cậy còn phải xét attenuation, Vref, hiệu chuẩn, nhiễu và mạch đầu vào.",
      "Mã ADC 12 bit chỉ là giá trị thô; độ tin cậy khi đổi sang điện áp còn phụ thuộc calibration, nhiễu, attenuation và mạch đầu vào.",
      [
        ["Mã 4095 luôn đồng nghĩa đúng 5 V ở chân ADC.", "Dải ADC phụ thuộc attenuation và giới hạn chân, không phải mặc định 5 V."],
        ["Mã ADC thô đã loại bỏ hết sai số nguồn tham chiếu.", "Sai số Vref là một lý do cần calibration."],
        ["Có 4096 mức nên phép đo luôn chính xác tuyệt đối.", "Độ phân giải danh định khác với độ chính xác thực tế."]
      ]
    )
  ];

  const trapQuestions = [
    custom(
      "trap-half-duplex",
      "Bẫy khái niệm",
      SOURCE.localEmbedded,
      "Half-duplex",
      "Nhận định nào đúng về half-duplex trong truyền thông nhúng?",
      "Hai phía có thể truyền và nhận nhưng không truyền đồng thời theo hai chiều tại cùng một thời điểm.",
      "Simplex, half-duplex và full-duplex khác nhau ở khả năng truyền một chiều, truyền hai chiều luân phiên hoặc truyền hai chiều đồng thời.",
      [
        ["Half-duplex nghĩa là chỉ truyền được một chiều vĩnh viễn.", "Đó gần với simplex, không phải half-duplex."],
        ["Half-duplex luôn cần nhiều dây hơn full-duplex.", "Số dây tùy chuẩn; ví dụ một số bus half-duplex dùng ít dây hơn."],
        ["Half-duplex đồng nghĩa với bất đồng bộ.", "Đồng bộ/bất đồng bộ là vấn đề clock, không phải chiều truyền."]
      ]
    ),
    custom(
      "trap-i2c-pullup",
      "Bẫy cấu kiện",
      SOURCE.localComponents,
      "I2C pull-up",
      "Vì sao I2C cần điện trở kéo lên thay vì để thiết bị tự đẩy mức cao kiểu push-pull?",
      "Vì I2C dùng ngõ ra open-drain/open-collector; thiết bị kéo xuống mức thấp, còn mức cao do điện trở kéo lên tạo ra.",
      "Cơ chế open-drain cho phép nhiều thiết bị chung bus và tránh xung đột khi một thiết bị kéo thấp.",
      [
        ["Vì I2C chỉ truyền một chiều từ master sang slave.", "I2C có truyền hai chiều trên bus, nhưng không đồng thời như full-duplex."],
        ["Vì pull-up làm bus luôn nhanh hơn mọi cấu hình push-pull.", "Pull-up quá lớn làm cạnh lên chậm; quá nhỏ làm dòng kéo xuống lớn."],
        ["Vì SDA và SCL là hai đường nguồn nuôi cảm biến.", "SDA/SCL là đường tín hiệu, không phải đường cấp nguồn chính."]
      ]
    ),
    custom(
      "trap-rs485-uart",
      "Bẫy giao tiếp",
      SOURCE.localEmbedded,
      "UART và RS-485",
      "Quan hệ nào đúng giữa UART TTL và RS-485?",
      "UART tạo khung bit logic; RS-485 là lớp điện vi sai cần transceiver để truyền xa và chống nhiễu tốt hơn.",
      "UART xử lý khung bit ở mức logic; muốn truyền theo chuẩn điện RS-485 cần transceiver để tạo cặp tín hiệu vi sai.",
      [
        ["RS-485 là tên khác của SPI khi chạy dây dài.", "RS-485 là lớp vật lý vi sai, không phải SPI."],
        ["UART TTL nối thẳng ra đường RS-485 mà không cần transceiver.", "RS-485 cần mạch transceiver chuyển từ logic UART sang tín hiệu vi sai."],
        ["RS-485 luôn full-duplex với đúng hai dây.", "Mạng RS-485 hai dây thường vận hành half-duplex."]
      ]
    ),
    custom(
      "trap-adc-divider",
      "Bẫy analog",
      SOURCE.localComponents,
      "Cầu phân áp vào ADC",
      "Cầu phân áp đo pin bằng ADC bị đọc thấp và dao động sau khi chuyển kênh. Nguyên nhân nào rất đáng nghi?",
      "Tổng trở Thevenin của cầu phân áp quá lớn làm tụ lấy mẫu ADC không nạp kịp trong thời gian lấy mẫu.",
      "Nguyên nhân kỹ thuật là trở nguồn, tụ lấy mẫu của ADC và thời gian settling không đủ làm điện áp trên tụ chưa kịp đạt giá trị thật.",
      [
        ["Do I2C thiếu địa chỉ 7 bit.", "Đây là vấn đề đầu vào analog, không phải địa chỉ I2C."],
        ["Do UART đang full-duplex.", "Chiều truyền UART không giải thích việc tụ ADC nạp chậm."],
        ["Do DAC R-2R luôn làm sai ADC.", "DAC R-2R không phải nguyên nhân mặc định trong mạch đo pin."]
      ]
    )
  ];

  const pools = {
    core: [
      ...collectQuestions("he-thong-nhung", ["gioi-thieu-he-thong-nhung", "phan-cung-nhung", "phan-mem-nhung", "iot-va-xu-the-phat-trien"])
    ],
    hardwareSoftware: [
      ...collectQuestions("he-thong-nhung", ["phan-cung-nhung", "phan-mem-nhung", "iot-va-xu-the-phat-trien"])
    ],
    digitalIo: collectQuestions("he-thong-nhung", ["giao-tiep-vao-ra-so-co-ban"]),
    analogIo: collectQuestions("he-thong-nhung", ["giao-tiep-vao-ra-tuong-tu-co-ban"]),
    protocols: collectQuestions("he-thong-nhung", ["mot-so-khai-niem", "giao-tiep-theo-chuan-truyen-thong-co-ban"]),
    security: collectQuestions("he-thong-nhung", ["bao-mat-trong-thiet-ke-he-nhung"]),
    components: collectQuestions("cau-kien-trong-nhung", [
      "passive-components",
      "diodes-protection",
      "transistors-loads",
      "gpio-level-isolation",
      "analog-adc-front-end",
      "power-esd-thermal"
    ])
  };

  const essayTemplates = [
    {
      title: "Nút đo môi trường dùng ESP32",
      prompt: "Thiết kế ở mức khối một nút đo nhiệt độ, độ ẩm và điện áp pin dùng ESP32, gửi dữ liệu lên gateway. Trình bày phần cứng, firmware, giao tiếp, xử lý ADC và biện pháp giảm nhiễu.",
      expected: ["Chọn ADC1 khi dùng Wi-Fi, có phân áp pin và bảo vệ đầu vào.", "Nêu sampling, calibration, averaging hoặc lọc số.", "Tách nguồn analog, decoupling, mass và đường tín hiệu hợp lý.", "Mô tả firmware theo vòng lặp hoặc task: đọc cảm biến, xử lý, truyền, ngủ tiết kiệm năng lượng.", "Nêu lỗi/rủi ro: ADC2 với Wi-Fi, trở nguồn quá lớn, nhiễu nguồn, bảo mật truyền dữ liệu."],
      rubric: ["2 điểm: sơ đồ khối phần cứng hợp lý.", "2 điểm: xử lý ADC đúng bản chất.", "2 điểm: giao tiếp và firmware rõ.", "2 điểm: chống nhiễu, nguồn, bảo vệ.", "2 điểm: phân tích rủi ro và cách kiểm thử."]
    },
    {
      title: "Mạng RS-485 nhiều cảm biến",
      prompt: "Một bộ điều khiển cần đọc nhiều cảm biến đặt xa trong môi trường nhiễu. Hãy đề xuất kiến trúc dùng UART/RS-485, giải thích half-duplex, termination, chống nhiễu và cách firmware điều phối bus.",
      expected: ["Phân biệt UART logic và RS-485 lớp điện vi sai.", "Giải thích mạng hai dây thường half-duplex, cần điều khiển hướng truyền.", "Có termination ở hai đầu bus và chú ý bias nếu cần.", "Trình bày khung hỏi-đáp, địa chỉ node, timeout, kiểm tra lỗi.", "Nêu bảo vệ ESD/surge, cách ly hoặc common ground theo bối cảnh."],
      rubric: ["2 điểm: chọn chuẩn và sơ đồ bus.", "2 điểm: half-duplex và điều khiển hướng.", "2 điểm: lớp vật lý và chống nhiễu.", "2 điểm: giao thức phần mềm.", "2 điểm: bảo vệ và debug."]
    },
    {
      title: "Điều khiển relay và tải cảm",
      prompt: "Thiết kế mạch để MCU điều khiển relay hoặc solenoid. Nêu linh kiện cần có, dòng năng lượng khi tắt tải, bảo vệ GPIO và các lỗi thường gặp.",
      expected: ["Dùng transistor/MOSFET/driver, không kéo tải trực tiếp từ GPIO.", "Có diode flyback, TVS hoặc clamp phù hợp cho tải cảm.", "Có điện trở cổng/base, pull-down nếu cần, nguồn tải riêng đủ dòng.", "Phân tích dòng hồi tiếp và ảnh hưởng tốc độ nhả relay.", "Nêu kiểm tra nhiệt, công suất, mass và nhiễu gây reset MCU."],
      rubric: ["2 điểm: mạch công tắc đúng.", "2 điểm: bảo vệ tải cảm.", "2 điểm: bảo vệ GPIO và nguồn.", "2 điểm: giải thích quá trình hoạt động.", "2 điểm: lỗi và kiểm thử."]
    },
    {
      title: "So sánh SPI và I2C cho ngoại vi",
      prompt: "Một hệ nhúng có màn hình, EEPROM và cảm biến. Hãy so sánh SPI và I2C, chọn chuẩn cho từng ngoại vi và giải thích các đánh đổi về dây, tốc độ, địa chỉ, ACK, pull-up và nhiễu.",
      expected: ["SPI nhanh, full-duplex, cần SCLK/MOSI/MISO/CS.", "I2C ít dây, có địa chỉ và ACK, open-drain cần pull-up.", "Chọn SPI cho màn hình tốc độ cao, I2C cho EEPROM/cảm biến chậm nếu phù hợp.", "Nêu ảnh hưởng điện dung bus, pull-up, chiều dài dây.", "Có cách debug: mode SPI, địa chỉ I2C, ACK, logic analyzer."],
      rubric: ["2 điểm: nêu đúng tín hiệu.", "2 điểm: so sánh mode truyền.", "2 điểm: chọn ứng dụng hợp lý.", "2 điểm: cấu kiện phụ trợ.", "2 điểm: lỗi và debug."]
    },
    {
      title: "Đầu vào ADC cho cảm biến analog",
      prompt: "Thiết kế đầu vào ADC cho cảm biến analog yếu và nhiễu. Trình bày vai trò op-amp, lọc RC, nguồn tham chiếu, thời gian lấy mẫu và layout.",
      expected: ["Op-amp buffer/khuếch đại giúp giảm trở nguồn và đưa tín hiệu vào đúng dải.", "Lọc analog chống nhiễu và aliasing trước ADC.", "Nguồn tham chiếu là thước đo, cần ổn định và sạch.", "Xét tụ lấy mẫu, thời gian settling và trở kháng nguồn.", "Layout tránh đường xung nhanh, tách nguồn analog phù hợp."],
      rubric: ["2 điểm: chuỗi analog front-end.", "2 điểm: ADC sample-and-hold.", "2 điểm: nguồn tham chiếu.", "2 điểm: lọc và layout.", "2 điểm: sai số và calibration."]
    },
    {
      title: "Thiết kế nút nhấn và LED công suất",
      prompt: "Một board có nút nhấn người dùng và LED công suất điều khiển bằng PWM. Hãy thiết kế vào/ra số, debounce, bảo vệ chân MCU, driver LED và các lưu ý về nhiệt.",
      expected: ["Nút nhấn có pull-up/pull-down và debounce phần cứng hoặc phần mềm.", "GPIO cần điện trở series hoặc bảo vệ nếu đi ra ngoài board.", "LED công suất cần driver dòng hoặc MOSFET phù hợp, không cấp trực tiếp từ GPIO.", "PWM điều chỉnh độ sáng nhưng dòng và nhiệt vẫn phải kiểm soát.", "Có decoupling, đường dòng tải tách khỏi đường tín hiệu nhạy."],
      rubric: ["2 điểm: input nút nhấn.", "2 điểm: output và driver.", "2 điểm: PWM đúng.", "2 điểm: nhiệt và công suất.", "2 điểm: bảo vệ và layout."]
    },
    {
      title: "Bảo mật firmware thiết bị IoT",
      prompt: "Nêu các lớp bảo mật cần nghĩ tới khi thiết kế thiết bị IoT: bảo vệ mạch, bảo vệ firmware, bảo vệ dữ liệu và cập nhật phần mềm.",
      expected: ["Bảo vệ cổng debug, chống đọc firmware nếu nền tảng hỗ trợ.", "Xác thực firmware, kiểm tra tính toàn vẹn và cập nhật an toàn.", "Mã hóa hoặc bảo vệ dữ liệu nhạy cảm.", "Bảo vệ phần cứng trước can thiệp và ESD/surge.", "Nêu trade-off chi phí, hiệu năng, khả năng bảo trì."],
      rubric: ["2 điểm: lớp phần cứng.", "2 điểm: firmware/boot.", "2 điểm: dữ liệu/truyền thông.", "2 điểm: cập nhật và khóa.", "2 điểm: đánh đổi thực tế."]
    },
    {
      title: "Gateway IoT và cloud",
      prompt: "Phân tích kiến trúc edge, gateway, platform/cloud cho một hệ thống giám sát. Nêu vai trò từng lớp, dữ liệu đi như thế nào và điểm cần kiểm soát về độ tin cậy.",
      expected: ["Edge gần cảm biến/chấp hành, thu và xử lý ban đầu.", "Gateway gom dữ liệu, chuyển giao thức và có thể lọc hoặc buffer.", "Platform/cloud lưu trữ, phân tích, dashboard và cảnh báo.", "Nêu lỗi mạng, mất gói, đồng bộ thời gian, bảo mật.", "Có chiến lược retry, cache, watchdog và kiểm tra trạng thái."],
      rubric: ["2 điểm: phân lớp đúng.", "2 điểm: luồng dữ liệu.", "2 điểm: độ tin cậy.", "2 điểm: bảo mật.", "2 điểm: ví dụ triển khai."]
    },
    {
      title: "Nguồn cho mạch nhúng",
      prompt: "Thiết kế nguồn cho MCU, cảm biến analog và tải motor nhỏ. So sánh LDO/buck, decoupling, power-good/reset và cách tránh nhiễu motor làm sai ADC.",
      expected: ["Buck hiệu suất cao nhưng nhiễu; LDO êm hơn nhưng nóng khi chênh áp lớn.", "Tụ local sát chân IC và tụ bulk cho cụm tải.", "Tách/định tuyến dòng motor khỏi analog.", "Power-good/reset giúp MCU khởi động khi nguồn ổn định.", "Nêu diode/TVS/fuse hoặc bảo vệ đảo cực nếu nguồn ngoài."],
      rubric: ["2 điểm: chọn kiến trúc nguồn.", "2 điểm: decoupling.", "2 điểm: chống nhiễu ADC.", "2 điểm: reset/power-good.", "2 điểm: bảo vệ và nhiệt."]
    },
    {
      title: "Đọc EEPROM I2C",
      prompt: "Giải thích quá trình ghi và đọc một byte từ EEPROM I2C. Nêu START, địa chỉ, ACK, repeated START, pull-up và các lỗi debug thường gặp.",
      expected: ["Nêu START/STOP hoặc repeated START đúng.", "Có địa chỉ thiết bị, bit đọc/ghi và ACK/NACK.", "Giải thích vì sao bus cần pull-up.", "Nêu điện dung bus và chọn giá trị pull-up.", "Debug bằng kiểm tra địa chỉ, dây SDA/SCL, nguồn, logic analyzer."],
      rubric: ["2 điểm: khung truyền.", "2 điểm: ACK và repeated START.", "2 điểm: pull-up.", "2 điểm: giới hạn bus.", "2 điểm: debug."]
    }
  ];

  while (essayTemplates.length < 30) {
    const base = essayTemplates[essayTemplates.length % 10];
    const index = essayTemplates.length + 1;
    essayTemplates.push({
      title: `${base.title} - biến thể ${Math.floor(index / 10) + 1}`,
      prompt: `${base.prompt} Bổ sung thêm một phương án kiểm thử nhanh tại phòng thí nghiệm và một lỗi đánh lừa dễ gặp trong đề thi.`,
      expected: [...base.expected, "Có phương án đo/kiểm chứng bằng đồng hồ, oscilloscope hoặc logic analyzer.", "Chỉ ra một nhầm lẫn khái niệm dễ gặp và bác bỏ rõ ràng."],
      rubric: base.rubric
    });
  }

  const focusLabels = [
    "ADC, ESP32 và nguồn nhiễu",
    "Half-duplex, UART/RS-485 và bus công nghiệp",
    "I2C, SPI và cấu kiện phụ trợ",
    "GPIO, driver tải và bảo vệ",
    "Kiến trúc IoT, firmware và bảo mật",
    "Analog front-end, DAC/PWM và sai số đo"
  ];

  const buildExam = (index) => {
    const examNumber = index + 1;
    const examId = `exam-${String(examNumber).padStart(2, "0")}`;
    const used = new Set();
    const recipe = [
      ["core", 4],
      ["hardwareSoftware", 5],
      ["digitalIo", 3],
      ["analogIo", 4],
      ["protocols", 5],
      ["security", 2],
      ["components", 4]
    ];

    const copied = recipe.flatMap(([poolName, count], bucketIndex) =>
      pickFromPool(pools[poolName], examNumber * (bucketIndex + 3), count, used)
    );

    const customPool = [
      esp32Questions[index % esp32Questions.length],
      esp32Questions[(index + 2) % esp32Questions.length],
      trapQuestions[index % trapQuestions.length]
    ];

    const copiedQuestions = copied.map((item, questionIndex) => makeCopiedQuestion(item, examId, questionIndex + 1));
    const customQuestions = customPool.map((question, customIndex) => ({
      ...question,
      id: `${examId}-q${String(copiedQuestions.length + customIndex + 1).padStart(2, "0")}`,
      choices: rotateChoices(question.choices, examNumber + customIndex)
    }));

    const questions = [...copiedQuestions, ...customQuestions].map((question, questionIndex) => ({
      ...question,
      number: questionIndex + 1
    }));

    return {
      id: examId,
      title: `Đề mô phỏng ${String(examNumber).padStart(2, "0")}`,
      focus: focusLabels[index % focusLabels.length],
      durationMinutes: 60,
      mcqCount: questions.length,
      essayPoints: 10,
      source: SOURCE.inference,
      questions,
      essay: essayTemplates[index]
    };
  };

  window.EXAM_QUIZ_DATA = {
    version: "2026-07-06",
    section: {
      id: "de-thi",
      title: "Đề thi",
      source: "Ma trận đề mô phỏng từ bài giảng và cấu kiện ứng dụng"
    },
    assumptions: [
      "Đề mô phỏng ưu tiên kiến thức trong bài giảng đã được hệ thống hóa.",
      "Trắc nghiệm có một phần cấu kiện điện tử ứng dụng trong mạch nhúng.",
      "Các câu bẫy tập trung vào nhầm lẫn ADC/DAC, UART/RS-485, SPI/I2C, half-duplex/full-duplex, pull-up/open-drain, nguồn nhiễu và bảo vệ GPIO.",
      "Câu tự luận thiên về thiết kế hoặc phân tích một hệ nhúng nhỏ thay vì học thuộc định nghĩa rời rạc."
    ],
    blueprint: [
      { label: "Bài giảng hệ thống nhúng", percent: 72 },
      { label: "Cấu kiện trong mạch nhúng", percent: 14 },
      { label: "ESP32 và tình huống thực tế", percent: 7 },
      { label: "Bẫy khái niệm tổng hợp", percent: 7 }
    ],
    exams: Array.from({ length: 30 }, (_, index) => buildExam(index))
  };
})();
