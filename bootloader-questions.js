(() => {
  const data = window.EMBEDDED_QUIZ_DATA;
  const chapter = data?.chapters?.find((item) => item.id === "phan-mem-nhung");
  if (!chapter) return;

  const bloomLabels = {
    1: "Nhớ",
    2: "Hiểu",
    3: "Vận dụng",
    4: "Phân tích",
    5: "Đánh giá"
  };

  let questionSequence = 0;
  const makeQuestion = ({ id, bloom, topic, stem, options, correct, whyWrong, explanation, coverage }) => {
    const choices = options.map((text, index) => ({
      text,
      correct: index === correct,
      reason: index === correct
        ? explanation
        : `Phương án này chưa đúng vì ${whyWrong[index]}`
    }));
    const targetCorrectIndex = questionSequence % choices.length;
    const rotation = (correct - targetCorrectIndex + choices.length) % choices.length;
    questionSequence += 1;
    return {
      id,
      type: `Bloom ${bloom} - ${bloomLabels[bloom]}`,
      source: "1.3 Phần mềm nhúng - Chuyên đề Bootloader",
      topic,
      bloom,
      outline: "1.3",
      stem,
      choices: choices.slice(rotation).concat(choices.slice(0, rotation)),
      explanation,
      coverage
    };
  };

  const definitions = [
    {
      bloom: 1,
      topic: "khái niệm bộ nạp khởi động",
      coverage: "definition",
      stem: "Mô tả nào xác định đúng bộ nạp khởi động trong một hệ thống nhúng?",
      options: [
        "Một chương trình nhỏ chạy đầu tiên sau khi thiết bị khởi động lại, quyết định cập nhật phần mềm hay chuyển quyền điều khiển sang ứng dụng.",
        "Một mạch logic tổ hợp chỉ tạo tín hiệu khởi động lại và không thực thi mã trong bộ nhớ.",
        "Một trình biên dịch chạy trên vi điều khiển để dịch mã nguồn C mỗi khi thiết bị được cấp nguồn.",
        "Một trình điều khiển ngoại vi chỉ được ứng dụng gọi sau khi hàm chính đã bắt đầu chạy."
      ],
      correct: 0,
      whyWrong: {
        1: "mạch tạo tín hiệu khởi động lại là phần cứng, còn bộ nạp khởi động là phần mềm thực thi sau khởi động lại",
        2: "mã nguồn thường đã được dịch và liên kết trước khi nạp; bộ nạp khởi động không dịch mã C trên thiết bị",
        3: "bộ nạp khởi động chạy trước ứng dụng và có phạm vi nhiệm vụ rộng hơn một trình điều khiển ngoại vi"
      },
      explanation: "Bộ nạp khởi động là chương trình nhỏ được thực thi sớm nhất sau khi thiết bị khởi động lại. Nó kiểm tra điều kiện vào chế độ cập nhật, nhận hoặc kiểm tra ảnh phần mềm khi cần, rồi chuyển quyền điều khiển tới ứng dụng hợp lệ."
    },
    {
      bloom: 2,
      topic: "trình tự hoạt động của bộ nạp khởi động",
      coverage: "three-steps",
      stem: "Ba công việc cốt lõi của bộ nạp khởi động được sắp xếp hợp lý theo thứ tự nào?",
      options: [
        "Chuyển ngay sang ứng dụng, kiểm tra điều kiện cập nhật, sau đó mới thiết lập chế độ khởi động.",
        "Thiết lập chế độ khởi động, kiểm tra điều kiện lựa chọn và định tuyến luồng thực thi sang cập nhật hoặc ứng dụng.",
        "Xóa toàn bộ Flash, thiết lập chế độ khởi động và chờ vô hạn dữ liệu từ mọi giao tiếp.",
        "Khởi tạo giao diện ứng dụng, biên dịch ảnh phần mềm và định tuyến nguồn cấp cho vi điều khiển."
      ],
      correct: 1,
      whyWrong: {
        0: "chuyển sang ứng dụng trước sẽ làm mất cơ hội kiểm tra điều kiện vào chế độ cập nhật",
        2: "không được xóa toàn bộ Flash ở mỗi lần khởi động và cũng không nhất thiết phải chờ vô hạn",
        3: "bộ nạp khởi động không biên dịch ảnh phần mềm và không định tuyến nguồn cấp"
      },
      explanation: "Trình tự tổng quát là chuẩn bị chế độ hoạt động ban đầu, đọc điều kiện kích hoạt, rồi rẽ nhánh: ở lại nhận phần mềm mới hoặc chuẩn bị và nhảy tới ứng dụng. Thứ tự này bảo đảm yêu cầu cập nhật được phát hiện trước khi ứng dụng chiếm quyền điều khiển."
    },
    {
      bloom: 4,
      topic: "bộ nạp hệ thống và bộ nạp tự xây dựng",
      coverage: "system-vs-custom",
      stem: "Một thiết bị phải luôn có đường cứu hộ không thể bị ứng dụng ghi đè, nhưng kênh cứu hộ chỉ cần các giao tiếp do nhà sản xuất hỗ trợ. Lựa chọn nào phù hợp nhất?",
      options: [
        "Đặt bộ nạp tự xây dựng trong cùng vùng Flash có thể xóa như ứng dụng và cho phép ứng dụng ghi đè vùng đó.",
        "Chỉ dùng cơ chế cập nhật trong ứng dụng vì ứng dụng vẫn luôn chạy được khi chính nó bị ghi hỏng.",
        "Dùng bộ nạp hệ thống được nhà sản xuất ghi sẵn trong ROM và kích hoạt theo cấu hình chân khởi động quy định.",
        "Lưu duy nhất ảnh ứng dụng trong RAM để nội dung vẫn còn nguyên sau khi tháo nguồn."
      ],
      correct: 2,
      whyWrong: {
        0: "vùng Flash có thể bị xóa không đáp ứng yêu cầu đường cứu hộ bất biến",
        1: "ứng dụng hỏng có thể không còn khả năng thực thi cơ chế cập nhật trong ứng dụng",
        3: "RAM thông thường mất dữ liệu khi tháo nguồn và không phải nơi lưu ảnh cứu hộ lâu dài"
      },
      explanation: "Bộ nạp hệ thống nằm trong ROM do nhà sản xuất nạp sẵn nên không bị phần mềm người dùng xóa. Đổi lại, cách kích hoạt và các giao tiếp UART, USB, CAN, I2C hoặc SPI khả dụng phụ thuộc từng dòng vi điều khiển."
    },
    {
      bloom: 3,
      topic: "cập nhật trong ứng dụng",
      coverage: "iap",
      stem: "Một thiết bị đang chạy nhận ảnh phần mềm mới qua mạng, ghi ảnh đó vào vùng Flash tạm rồi khởi động lại để bộ nạp xác thực và đổi sang ảnh mới. Cơ chế nào đang được áp dụng?",
      options: [
        "Bộ nạp hệ thống trong ROM được kích hoạt trực tiếp bằng chân BOOT ở mọi gói dữ liệu.",
        "Cập nhật trong ứng dụng, trong đó ứng dụng nhận dữ liệu trước và bộ nạp hoàn tất việc lựa chọn ảnh sau khi khởi động lại.",
        "Khởi động lạnh không có bộ nạp, trong đó CPU thực thi đồng thời cả hai ảnh từ một địa chỉ.",
        "Nạp qua bộ gỡ lỗi, trong đó máy chủ mạng điều khiển trực tiếp cổng SWD của từng thiết bị."
      ],
      correct: 1,
      whyWrong: {
        0: "tình huống mô tả ứng dụng đang chạy nhận dữ liệu, không phải mỗi gói lại đổi chân BOOT để vào ROM",
        2: "hai ảnh không thể cùng bắt đầu tại một địa chỉ và vẫn cần logic lựa chọn ảnh",
        3: "dữ liệu được ứng dụng nhận qua mạng chứ không phải một bộ gỡ lỗi nối trực tiếp"
      },
      explanation: "Đây là cập nhật trong ứng dụng: ứng dụng đang chạy tải ảnh mới vào vùng khác, sau đó thiết bị khởi động lại. Bộ nạp kiểm tra trạng thái, tính toàn vẹn và quyết định kích hoạt hoặc hoán đổi ảnh."
    },
    {
      bloom: 2,
      topic: "hỗ trợ bộ nạp theo họ vi điều khiển",
      coverage: "processor-comparison",
      stem: "Tổ hợp nhận định nào phù hợp với sự khác nhau giữa các họ vi điều khiển về bộ nạp khởi động?",
      options: [
        "Mọi AVR đều có bộ nạp hệ thống trong ROM; ARM Cortex-M không thể dời bảng vectơ; ESP32 chỉ có một tầng khởi động.",
        "ARM Cortex-M thường có bộ nạp hệ thống; AVR thường dùng vùng bộ nạp trong Flash cùng bit cầu chì; ESP32 có chuỗi khởi động nhiều tầng.",
        "MSP430 không có cơ chế nạp khởi động; mọi 8051 cũ đều có bộ nạp USB trong ROM; RISC-V dùng một chuẩn duy nhất.",
        "Mọi họ vi điều khiển dùng cùng địa chỉ Flash, cùng chân kích hoạt và cùng giao thức cập nhật."
      ],
      correct: 1,
      whyWrong: {
        0: "AVR điển hình không có bộ nạp ROM hiện đại, ARM Cortex-M có VTOR và ESP32 có chuỗi nhiều tầng",
        2: "MSP430 có BSL, nhiều 8051 cũ thiếu bộ nạp hệ thống và hỗ trợ RISC-V phụ thuộc nhà sản xuất",
        3: "địa chỉ, chân và giao thức khởi động khác nhau theo kiến trúc và nhà sản xuất"
      },
      explanation: "Khả năng bộ nạp phụ thuộc nền tảng. ARM Cortex-M thường có bộ nạp trong bộ nhớ hệ thống và thuận lợi cho bộ nạp tùy biến nhờ VTOR; AVR thường dựa vào vùng Flash cùng BOOTSZ/BOOTRST; ESP32 sử dụng chuỗi khởi động nhiều tầng."
    },
    {
      bloom: 4,
      topic: "vị trí bộ nạp trên AVR và ARM",
      coverage: "avr-arm-placement",
      stem: "Vì sao việc đặt bộ nạp ở cuối Flash trên AVR và ở đầu Flash trên nhiều hệ ARM có thể đều đúng?",
      options: [
        "Vì CPU luôn quét tuần tự toàn bộ Flash và tự tìm chuỗi ký tự có tên Bootloader.",
        "Vì vị trí thực tế không ảnh hưởng; mọi bộ xử lý đều bắt đầu tại địa chỉ ngẫu nhiên sau khởi động lại.",
        "Vì AVR có thể dùng bit BOOTRST để chuyển điểm khởi động tới vùng cuối Flash, còn hệ ARM thường bắt đầu ở đầu Flash rồi bộ nạp tự rẽ nhánh.",
        "Vì AVR chỉ thực thi từ RAM còn ARM chỉ thực thi từ EEPROM nên vị trí Flash chỉ mang tính minh họa."
      ],
      correct: 2,
      whyWrong: {
        0: "CPU không tìm chương trình theo tên mà bắt đầu từ điểm vào do kiến trúc và cấu hình xác định",
        1: "điểm vào sau khởi động lại là xác định, không ngẫu nhiên",
        3: "cả hai kiến trúc đều có thể thực thi mã từ Flash theo cơ chế của mình"
      },
      explanation: "Trên AVR, vùng bộ nạp thường ở cuối Flash và bit cầu chì BOOTRST điều hướng điểm khởi động tới đó. Trên nhiều ARM Cortex-M, CPU lấy vectơ ở đầu Flash, vì vậy bộ nạp tùy biến thường chiếm vùng đầu và quyết định khi nào nhảy sang ứng dụng đã dời địa chỉ."
    },
    {
      bloom: 1,
      topic: "bit cầu chì bộ nạp AVR",
      coverage: "avr-fuses",
      stem: "Trên AVR, nhóm bit cầu chì nào lần lượt quy định kích thước vùng bộ nạp và lựa chọn khởi động vào vùng đó?",
      options: [
        "BOOTSZ0/BOOTSZ1 quy định kích thước, còn BOOTRST lựa chọn điểm khởi động vào vùng bộ nạp.",
        "BOOTRST quy định kích thước, còn BOOTSZ0/BOOTSZ1 chỉ đặt tốc độ UART.",
        "VTOR quy định kích thước, còn MSP lựa chọn điểm khởi động vào vùng bộ nạp.",
        "BOOT0/BOOT1 quy định kích thước, còn CRC32 lựa chọn điểm khởi động."
      ],
      correct: 0,
      whyWrong: {
        1: "vai trò của BOOTRST và BOOTSZ đã bị hoán đổi, đồng thời BOOTSZ không đặt tốc độ UART",
        2: "VTOR và MSP là các khái niệm của Cortex-M, không phải bit cầu chì phân vùng AVR",
        3: "BOOT0/BOOT1 thuộc cơ chế chọn chế độ khởi động của STM32, còn CRC không chọn điểm vào"
      },
      explanation: "Hai bit BOOTSZ chọn kích thước vùng Boot Flash, còn BOOTRST cấu hình để vectơ khởi động lại đi vào vùng bộ nạp. Cấu hình sai có thể khiến CPU không bắt đầu ở chương trình mong muốn."
    },
    {
      bloom: 3,
      topic: "kích hoạt bộ nạp hệ thống STM32F1",
      coverage: "boot-pins",
      stem: "Muốn Blue Pill STM32F103 khởi động vào bộ nạp hệ thống trong bộ nhớ ROM, cần đặt hai chân chọn chế độ như thế nào trước khi khởi động lại?",
      options: [
        "BOOT0 = 0 và BOOT1 = 0.",
        "BOOT0 = 1 và BOOT1 = 0.",
        "BOOT0 = 0 và BOOT1 = 1.",
        "BOOT0 = 1 và BOOT1 = 1 trong mọi trường hợp."
      ],
      correct: 1,
      whyWrong: {
        0: "cấu hình này chọn khởi động thông thường từ Main Flash",
        2: "đây không phải cấu hình được dùng để vào bộ nạp hệ thống trong ví dụ Blue Pill",
        3: "không thể kết luận cấu hình này luôn vào bộ nạp hệ thống và nó không khớp ví dụ đã cho"
      },
      explanation: "Trong cấu hình Blue Pill được trình bày, BOOT0 ở mức 1 và BOOT1 ở mức 0 ánh xạ bộ nhớ hệ thống chứa bộ nạp ROM vào không gian khởi động. Sau khi nạp xong thường phải trả BOOT0 về 0 để chạy ứng dụng từ Flash."
    },
    {
      bloom: 3,
      topic: "kích hoạt bằng nút nhấn",
      coverage: "button-trigger",
      stem: "Một Blue Pill dùng PA0 làm nút yêu cầu cập nhật. Hành vi nào thực hiện đúng bộ nạp có điều kiện?",
      options: [
        "Chỉ đọc PA0 sau khi ứng dụng đã chạy ổn định rồi xóa vùng bộ nạp nếu nút được giữ.",
        "Đọc PA0 sớm trong bộ nạp; nếu nút được giữ thì ở lại chờ cập nhật, nếu không thì kiểm tra và nhảy sang ứng dụng.",
        "Luôn chờ vô hạn ở bộ nạp, còn PA0 chỉ thay đổi tốc độ nháy đèn trạng thái.",
        "Dùng PA0 để thay thế bảng vectơ ngắt và coi mọi mức điện áp là một địa chỉ hàm."
      ],
      correct: 1,
      whyWrong: {
        0: "điều kiện phải được kiểm tra trước khi chuyển quyền cho ứng dụng và không được dùng để xóa bộ nạp",
        2: "chờ vô hạn làm thiết bị không tự chạy ứng dụng khi người dùng không yêu cầu cập nhật",
        3: "mức logic GPIO chỉ là điều kiện rẽ nhánh, không thay thế bảng vectơ hay địa chỉ hàm"
      },
      explanation: "Bộ nạp phải cấu hình và đọc GPIO đủ sớm. Trạng thái nhấn giữ PA0 là điều kiện ở lại chế độ cập nhật; trạng thái còn lại dẫn tới bước xác thực ứng dụng và chuyển quyền điều khiển."
    },
    {
      bloom: 5,
      topic: "kích hoạt theo thời gian chờ",
      coverage: "timeout-trigger",
      stem: "Thiết bị không có nút cập nhật và phải tự chạy ứng dụng sau tối đa 2 giây, nhưng vẫn cho phép máy tính yêu cầu nạp qua UART lúc vừa cấp nguồn. Chính sách nào phù hợp nhất?",
      options: [
        "Bộ nạp lắng nghe UART trong cửa sổ 2 giây; có khung lệnh hợp lệ thì ở lại cập nhật, hết thời gian thì xác thực và chạy ứng dụng.",
        "Bộ nạp chờ UART vô hạn ở mọi lần cấp nguồn để không bao giờ bỏ lỡ một byte dữ liệu.",
        "Bộ nạp nhảy sang ứng dụng ngay lập tức rồi mới quay lại đọc những byte UART đã mất.",
        "Bộ nạp xóa ứng dụng khi bắt đầu cửa sổ 2 giây để dành chỗ cho dữ liệu có thể không đến."
      ],
      correct: 0,
      whyWrong: {
        1: "chờ vô hạn vi phạm yêu cầu tự chạy ứng dụng trong hai giây",
        2: "sau khi đã chuyển quyền, bộ nạp không còn trực tiếp lắng nghe và những byte đầu có thể bị bỏ lỡ",
        3: "xóa ảnh hợp lệ trước khi có yêu cầu và ảnh mới là không an toàn"
      },
      explanation: "Cửa sổ lắng nghe có thời hạn cân bằng khả năng cập nhật và thời gian khởi động. Chỉ một yêu cầu có cấu trúc hợp lệ mới giữ thiết bị ở bộ nạp; nếu không có yêu cầu, bộ nạp tiếp tục kiểm tra ảnh hiện tại rồi nhảy sang ứng dụng."
    },
    {
      bloom: 4,
      topic: "dấu hiệu yêu cầu cập nhật trong RAM",
      coverage: "noinit",
      stem: "Ứng dụng ghi một giá trị đặc biệt vào RAM rồi khởi động lại bằng phần mềm để yêu cầu vào bộ nạp, nhưng giá trị luôn trở về 0 trước khi bộ nạp kiểm tra. Nguyên nhân và cách sửa phù hợp nhất là gì?",
      options: [
        "Mã khởi động đã xóa vùng biến chưa khởi tạo; đặt biến đánh dấu vào vùng `.noinit` để tránh bước xóa tự động.",
        "UART chưa nhận đủ byte; đặt biến vào vùng mã chỉ đọc để UART tự ghi lại khi khởi động.",
        "Flash bị khóa; xóa toàn bộ vùng ứng dụng trước khi ghi giá trị đặc biệt vào RAM.",
        "Con trỏ ngăn xếp quá lớn; chuyển giá trị đặc biệt sang chân BOOT0 nhưng vẫn đọc như một biến RAM."
      ],
      correct: 0,
      whyWrong: {
        1: "lỗi xảy ra do quá trình khởi tạo RAM, không do số byte UART và vùng mã chỉ đọc không phải biến RAM ghi được",
        2: "khóa Flash không làm biến RAM về 0 và xóa ứng dụng là hành động nguy hiểm không liên quan",
        3: "chân BOOT0 là tín hiệu phần cứng, không thể được xử lý như biến RAM giữ qua khởi động lại"
      },
      explanation: "Reset_Handler thường xóa vùng `.bss`, nên một biến toàn cục chưa khởi tạo sẽ mất dấu hiệu. Đặt biến trong section `.noinit` bằng thuộc tính của trình biên dịch giữ nó ngoài bước khởi tạo đó; bộ nạp vẫn phải kiểm tra đúng giá trị đặc biệt để tránh kích hoạt nhầm."
    },
    {
      bloom: 4,
      topic: "thanh ghi dự phòng",
      coverage: "backup-register",
      stem: "Một dấu hiệu yêu cầu cập nhật phải tồn tại qua khởi động lại mềm và khởi động lại cứng; khi tháo nguồn chính, dấu hiệu chỉ cần tồn tại nếu có pin CR2032. Nơi lưu nào phù hợp nhất?",
      options: [
        "Biến cục bộ trên ngăn xếp của ứng dụng.",
        "Thanh ghi dự phòng thuộc miền RTC, chẳng hạn BKP->DR1, với miền dự phòng được cấp bởi VBAT.",
        "Thanh ghi dữ liệu UART chỉ có hiệu lực khi ngoại vi đang bật xung nhịp.",
        "Một biến `.bss` thông thường được mã khởi động xóa ở mỗi lần khởi động."
      ],
      correct: 1,
      whyWrong: {
        0: "ngăn xếp không phải vùng lưu bền qua quá trình khởi động lại",
        2: "thanh ghi dữ liệu ngoại vi không được thiết kế làm bộ nhớ trạng thái dự phòng",
        3: "biến `.bss` sẽ bị xóa nên không đáp ứng yêu cầu giữ dấu hiệu"
      },
      explanation: "Thanh ghi BKP nằm trong miền nguồn dự phòng của RTC, giữ được nội dung qua các dạng khởi động lại. Khi nguồn chính mất, nội dung chỉ tiếp tục tồn tại nếu chân VBAT còn được cấp, ví dụ bởi pin CR2032."
    },
    {
      bloom: 3,
      topic: "lệnh yêu cầu cập nhật từ ứng dụng",
      coverage: "protocol-trigger",
      stem: "Thiết bị đang chạy ứng dụng nhận lệnh `GO_TO_BOOTLOADER` qua Bluetooth. Trình tự nào cho phép chuyển sang bộ nạp đáng tin cậy hơn?",
      options: [
        "Ứng dụng ghi dấu hiệu được thống nhất vào vùng giữ qua khởi động lại rồi yêu cầu khởi động lại; bộ nạp đọc, xóa dấu hiệu và ở lại chế độ cập nhật.",
        "Ứng dụng gọi trực tiếp một địa chỉ bất kỳ trong vùng bộ nạp mà không dọn ngoại vi, ngắt hoặc ngăn xếp.",
        "Ứng dụng xóa bảng vectơ của chính mình rồi tiếp tục chạy cho tới khi mất nguồn.",
        "Ứng dụng đổi tốc độ Bluetooth và giả định CPU sẽ tự ánh xạ lại vùng Flash."
      ],
      correct: 0,
      whyWrong: {
        1: "nhảy trực tiếp khi trạng thái ngoại vi, ngắt và ngăn xếp chưa được chuẩn hóa dễ gây lỗi khó kiểm soát",
        2: "xóa bảng vectơ làm mất khả năng chạy an toàn mà không tạo cơ chế chuyển quyền hợp lệ",
        3: "thay đổi tốc độ giao tiếp không tự thay đổi ánh xạ bộ nhớ hoặc điểm thực thi"
      },
      explanation: "Lệnh giao thức nên được chuyển thành một dấu hiệu có giá trị xác định, sau đó thực hiện khởi động lại để CPU đi qua đường khởi động chuẩn. Bộ nạp kiểm tra và xóa dấu hiệu nhằm tránh lặp lại chế độ cập nhật ở những lần khởi động sau."
    },
    {
      bloom: 3,
      topic: "định tuyến sau khi khởi động",
      coverage: "routing-flow",
      stem: "Bộ nạp không nhận được yêu cầu cập nhật và ảnh ứng dụng đã hợp lệ. Bước tiếp theo nào đúng đối với STM32F103?",
      options: [
        "Nạp con trỏ ngăn xếp chính từ từ đầu tiên của vùng ứng dụng, lấy địa chỉ Reset_Handler từ từ tiếp theo rồi chuyển quyền sau khi dọn trạng thái cần thiết.",
        "Gọi hàm chính của ứng dụng bằng tên ký hiệu vì bộ nạp luôn giữ nguyên bảng ký hiệu của trình liên kết.",
        "Xóa trang đầu ứng dụng để CPU tự tìm một điểm vào mới ở trang kế tiếp.",
        "Chép toàn bộ ứng dụng từ Flash sang thanh ghi dự phòng rồi thực thi trực tiếp tại đó."
      ],
      correct: 0,
      whyWrong: {
        1: "trên thiết bị, bộ nạp chuyển bằng địa chỉ máy chứ không tra tên ký hiệu như trong mã nguồn",
        2: "trang đầu chứa vectơ thiết yếu; xóa nó sẽ làm ảnh không hợp lệ",
        3: "thanh ghi dự phòng chỉ chứa lượng dữ liệu rất nhỏ và không phải vùng thực thi ảnh ứng dụng"
      },
      explanation: "Trên Cortex-M, hai từ đầu bảng vectơ ứng dụng cung cấp giá trị MSP và địa chỉ Reset_Handler. Bộ nạp phải kiểm tra chúng, dọn ngoại vi và ngắt, đặt MSP rồi gọi địa chỉ Reset_Handler bằng con trỏ hàm."
    },
    {
      bloom: 2,
      topic: "giao tiếp của bộ nạp hệ thống",
      coverage: "system-interfaces",
      stem: "Nhận định nào phân biệt đúng giao tiếp nạp của bộ nạp hệ thống với cổng gỡ lỗi?",
      options: [
        "Bộ nạp hệ thống có thể hỗ trợ UART, USB, CAN, I2C hoặc SPI tùy chip; JTAG/SWD là giao tiếp gỡ lỗi và nạp theo cơ chế khác.",
        "Bộ nạp hệ thống bắt buộc chỉ dùng JTAG/SWD và không thể nhận dữ liệu qua bất kỳ ngoại vi nối tiếp nào.",
        "Mọi chip hỗ trợ đồng thời toàn bộ UART, USB, CAN, I2C và SPI với cùng chân và cùng giao thức.",
        "Khi dùng bộ nạp hệ thống, thiết bị không cần cấu hình chế độ khởi động vì ROM luôn chiếm quyền thực thi."
      ],
      correct: 0,
      whyWrong: {
        1: "bộ nạp ROM thường tận dụng ngoại vi giao tiếp, còn JTAG/SWD là cổng gỡ lỗi riêng",
        2: "danh sách giao tiếp thực tế phụ thuộc dòng chip, không phải chip nào cũng có đủ",
        3: "phải có điều kiện chọn bộ nhớ hệ thống hoặc chế độ bộ nạp; nếu không thiết bị thường chạy Main Flash"
      },
      explanation: "Bộ nạp hệ thống dùng các ngoại vi mà nhà sản xuất đã cài trong ROM, có thể là UART, USB, CAN, I2C hoặc SPI. JTAG và SWD thuộc hạ tầng gỡ lỗi/nạp trực tiếp, không đồng nghĩa với giao thức bộ nạp hệ thống."
    },
    {
      bloom: 2,
      topic: "các loại bộ nạp cập nhật",
      coverage: "basic-ab-ota",
      stem: "Ghép nào đúng giữa kiến trúc cập nhật và đặc trưng chính của nó?",
      options: [
        "Cơ bản: một ảnh và rủi ro cao hơn khi ghi đè; A/B: giữ hai ảnh để quay lại; OTA: nhận cập nhật từ xa và cần quản lý trạng thái phục hồi.",
        "Cơ bản: luôn có hai ngân hàng vật lý; A/B: chỉ có một ảnh; OTA: bắt buộc dùng cáp gỡ lỗi tại chỗ.",
        "Cơ bản: không cần kiểm tra lỗi; A/B: không cần metadata; OTA: không cần cơ chế khôi phục mạng.",
        "Cơ bản, A/B và OTA chỉ khác tên gọi, còn phân vùng, luồng cập nhật và mức an toàn hoàn toàn giống nhau."
      ],
      correct: 0,
      whyWrong: {
        1: "các đặc trưng đã bị đảo ngược và cập nhật từ xa không phụ thuộc cáp gỡ lỗi tại chỗ",
        2: "cả ba vẫn cần kiểm tra tính toàn vẹn, còn A/B và OTA đặc biệt cần metadata quản lý",
        3: "chúng khác rõ về số ảnh, cách nhận dữ liệu, khả năng quay lại và độ phức tạp"
      },
      explanation: "Kiến trúc cơ bản tiết kiệm Flash nhưng dễ mất ảnh khi ghi đè. A/B dành hai vùng ảnh để duy trì bản tốt và quay lại. OTA thêm đường truyền từ xa, metadata, quản lý phiên bản và phương án phục hồi khi mạng hoặc nguồn bị gián đoạn."
    },
    {
      bloom: 5,
      topic: "mục tiêu thiết kế bộ nạp",
      coverage: "purposes",
      stem: "Một cảm biến được lắp ở vị trí khó tiếp cận, cần cập nhật từ xa, phát hiện dữ liệu truyền hỏng và vẫn hoạt động nếu mất nguồn lúc cập nhật. Bộ yêu cầu nào nên được ưu tiên?",
      options: [
        "Nhận ảnh qua giao tiếp từ xa, kiểm tra CRC, lưu trạng thái cập nhật và giữ ảnh tốt hoặc đường phục hồi.",
        "Ghi đè ngay ảnh đang chạy, bỏ CRC để giảm thời gian và đánh dấu thành công trước khi nhận dữ liệu.",
        "Chỉ tăng tốc độ xung nhịp; tốc độ CPU cao tự loại bỏ lỗi truyền và lỗi mất nguồn.",
        "Loại bỏ metadata và bộ nạp để ứng dụng chưa hợp lệ tự quyết định cách khởi động."
      ],
      correct: 0,
      whyWrong: {
        1: "đánh dấu sớm và ghi đè ảnh tốt tạo nguy cơ thiết bị không còn phần mềm chạy được",
        2: "tốc độ CPU không thay thế kiểm tra dữ liệu hay chiến lược chịu mất nguồn",
        3: "ảnh chưa hợp lệ không thể được tin cậy để điều phối quá trình khởi động và phục hồi"
      },
      explanation: "Các ràng buộc dẫn trực tiếp tới bốn năng lực: cập nhật không cần bộ nạp tại chỗ, phát hiện lỗi bằng CRC, ghi nhận trạng thái hoàn tất và chống mất khả năng khởi động bằng ảnh dự phòng hoặc chế độ cứu hộ."
    },
    {
      bloom: 1,
      topic: "phân vùng bộ nhớ bộ nạp",
      coverage: "partition-definition",
      stem: "Phân vùng bộ nhớ cho bộ nạp tự xây dựng có ý nghĩa chính nào?",
      options: [
        "Chia Flash thành các vùng địa chỉ cố định cho bộ nạp, metadata và ứng dụng để mỗi phần có giới hạn xóa, ghi và liên kết rõ ràng.",
        "Tự động tăng dung lượng Flash vật lý mỗi khi ảnh ứng dụng lớn hơn dự kiến.",
        "Cho phép mọi vùng dùng cùng địa chỉ bắt đầu mà không cần cơ chế ánh xạ.",
        "Chuyển toàn bộ mã sang RAM để không còn phải quan tâm tới trang hoặc khối Flash."
      ],
      correct: 0,
      whyWrong: {
        1: "phân vùng chỉ phân bổ dung lượng hiện có, không tạo thêm Flash vật lý",
        2: "các vùng chồng địa chỉ sẽ ghi đè lẫn nhau nếu không có ánh xạ phần cứng chuyên dụng",
        3: "ảnh vẫn phải được lưu không bay hơi và thao tác xóa/ghi Flash vẫn cần tuân theo đơn vị phần cứng"
      },
      explanation: "Phân vùng là quyết định thiết kế về địa chỉ bắt đầu và kích thước của từng khu vực. Nó bảo vệ bộ nạp, dành chỗ cho metadata, xác định nơi liên kết ứng dụng và ngăn thao tác cập nhật xóa nhầm vùng khác."
    },
    {
      bloom: 4,
      topic: "chiến lược khối và trang Flash",
      coverage: "sector-vs-page",
      stem: "Vì sao cùng một bộ nạp 8 KB có thể dễ bố trí trên STM32F1 hơn trên một STM32F4 có các khối Flash đầu tiên không bằng nhau?",
      options: [
        "STM32F1 chia Flash thành các trang bằng nhau nên có thể cấp đúng tám trang 1 KB; với khối không đều, phải làm tròn theo ranh giới khối và có thể lãng phí dung lượng.",
        "STM32F1 cho phép xóa từng byte còn STM32F4 chỉ cho phép xóa toàn bộ chip ở mọi cấu hình.",
        "STM32F1 không cần vùng ứng dụng nên toàn bộ Flash luôn dành cho bộ nạp.",
        "Khối Flash không đều giúp mọi kích thước bộ nạp vừa khít mà không cần xem địa chỉ."
      ],
      correct: 0,
      whyWrong: {
        1: "STM32F1 vẫn xóa theo trang chứ không xóa riêng từng byte, còn STM32F4 có thể xóa theo khối",
        2: "STM32F1 vẫn cần dành phần lớn Flash cho ứng dụng",
        3: "kích thước không đều làm việc làm tròn theo ranh giới khó hơn, không bảo đảm vừa khít"
      },
      explanation: "Blue Pill có 64 trang bằng nhau, mỗi trang 1 KB, nên 8 KB tương ứng chính xác trang 0 đến 7. Với kiến trúc khối không đều, bộ nạp phải chiếm trọn các khối được xóa độc lập, làm phần dư trong khối có thể không dùng hiệu quả."
    },
    {
      bloom: 3,
      topic: "tính toán số trang Flash",
      coverage: "page-calculation",
      stem: "Blue Pill có 64 KB Flash chia thành các trang 1 KB. Nếu dành 8 KB cho bộ nạp và 1 KB cho metadata, ứng dụng bắt đầu ở trang nào và còn tối đa bao nhiêu KB?",
      options: [
        "Trang 8 và 56 KB.",
        "Trang 9 và 55 KB.",
        "Trang 9 và 56 KB.",
        "Trang 10 và 54 KB."
      ],
      correct: 1,
      whyWrong: {
        0: "trang 8 đã được dành cho metadata nên ứng dụng không thể bắt đầu tại đó",
        2: "64 - 8 - 1 bằng 55 KB, không phải 56 KB",
        3: "không có yêu cầu bỏ thêm trang 9; ứng dụng có thể bắt đầu ngay sau metadata"
      },
      explanation: "Bộ nạp dùng trang 0-7, metadata dùng trang 8, nên ứng dụng bắt đầu ở trang 9. Dung lượng còn lại là 64 - 8 - 1 = 55 KB, tương ứng trang 9-63."
    },
    {
      bloom: 5,
      topic: "chọn vị trí bộ nạp theo khối Flash",
      coverage: "sector-strategy",
      stem: "Một vi điều khiển có các khối Flash đầu nhỏ và các khối sau rất lớn. Bộ nạp chỉ cần ít dung lượng, còn ứng dụng cần tối đa hóa không gian. Phương án phân vùng nào hợp lý nhất?",
      options: [
        "Đặt bộ nạp trong số khối nhỏ đầu tiên vừa đủ chứa mã và dành các khối lớn cho ứng dụng.",
        "Đặt bộ nạp vào khối lớn nhất chỉ để đơn giản hóa địa chỉ, dù phần lớn khối bị bỏ trống.",
        "Cho bộ nạp và ứng dụng dùng chung một khối xóa mà không có giới hạn để cập nhật phần nào cũng được.",
        "Bỏ qua ranh giới khối vì thao tác xóa Flash không ảnh hưởng dữ liệu còn lại trong cùng khối."
      ],
      correct: 0,
      whyWrong: {
        1: "cách này lãng phí một khối lớn và thu hẹp dung lượng ứng dụng không cần thiết",
        2: "xóa để cập nhật một phần có thể phá hỏng phần còn lại khi chúng dùng chung đơn vị xóa",
        3: "xóa Flash tác động cả khối hoặc trang nên ranh giới phần cứng là ràng buộc bắt buộc"
      },
      explanation: "Khi khối có kích thước không đều, bộ nạp nhỏ nên chiếm các khối nhỏ ở đầu Flash. Thiết kế phải làm tròn kích thước vùng theo đơn vị xóa để cập nhật ứng dụng không bao giờ phải xóa khối chứa bộ nạp."
    },
    {
      bloom: 4,
      topic: "ngân hàng Flash vật lý và vùng A/B logic",
      coverage: "logical-vs-physical-bank",
      stem: "Phát biểu nào phân tích đúng sự khác nhau giữa hai ngân hàng Flash vật lý và hai vùng ảnh A/B được chia bằng phần mềm trên một Flash đơn?",
      options: [
        "Hai cách luôn cho phép ứng dụng chạy từ một nửa trong khi ghi nửa kia với hiệu năng hoàn toàn giống nhau.",
        "Hai vùng logic vẫn giúp giữ ảnh dự phòng nhưng thường phải dừng ứng dụng và chạy bộ nạp để ghi; hai ngân hàng vật lý độc lập có thể hỗ trợ đọc một ngân hàng khi ghi ngân hàng kia.",
        "Hai ngân hàng vật lý chỉ là hai tên tệp trong cùng trang, còn hai vùng logic là hai chip Flash độc lập.",
        "Hai vùng logic tự động tạo thanh ghi hoán đổi địa chỉ phần cứng dù vi điều khiển không hỗ trợ."
      ],
      correct: 1,
      whyWrong: {
        0: "Flash đơn thường không cho vừa thực thi vừa ghi cùng khối vật lý, trong khi phần cứng hai ngân hàng có thể hỗ trợ tốt hơn",
        2: "khái niệm đã bị đảo ngược: ngân hàng vật lý là cấu trúc phần cứng, vùng logic là phân chia địa chỉ",
        3: "phân vùng phần mềm không tự tạo tính năng hoán đổi địa chỉ của phần cứng"
      },
      explanation: "A/B logic vẫn tăng an toàn vì giữ hai ảnh, nhưng trên Flash một ngân hàng việc ghi thường diễn ra trong bộ nạp khi ứng dụng đã dừng. Phần cứng hai ngân hàng độc lập có thể cho phép đọc-thực thi và ghi đồng thời, đổi lại chi phí và độ phức tạp cao hơn."
    },
    {
      bloom: 4,
      topic: "giới hạn Flash một ngân hàng",
      coverage: "single-bank-limit",
      stem: "Một MCU chỉ có một khối Flash vật lý nhưng được chia thành vùng ảnh A và B. Vì sao ứng dụng thường phải dừng khi nạp ảnh vào vùng còn trống?",
      options: [
        "Vì trên nhiều Flash một ngân hàng, CPU không thể đồng thời lấy lệnh từ Flash và thực hiện thao tác ghi trên cùng khối vật lý.",
        "Vì UART chỉ hoạt động khi mọi mã ứng dụng đã bị xóa khỏi cả hai vùng.",
        "Vì metadata không thể tồn tại cùng lúc với hai ảnh trong cùng một không gian địa chỉ.",
        "Vì bộ nạp bắt buộc phải được thực thi từ pin dự phòng thay vì từ bộ nhớ."
      ],
      correct: 0,
      whyWrong: {
        1: "UART không yêu cầu xóa cả hai ảnh và việc xóa ảnh tốt sẽ phá cơ chế dự phòng",
        2: "metadata có thể được đặt ở một trang riêng bên cạnh hai vùng ảnh",
        3: "pin dự phòng chỉ có thể duy trì miền nguồn nhỏ, không phải nơi thực thi bộ nạp"
      },
      explanation: "Bộ điều khiển Flash một ngân hàng thường bận trong thời gian xóa hoặc ghi, nên CPU không thể tiếp tục lấy lệnh bình thường từ cùng Flash. Thiết kế chuyển sang bộ nạp, dừng ứng dụng và ghi vùng trống theo trình tự kiểm soát."
    },
    {
      bloom: 2,
      topic: "các vùng chính trong Flash",
      coverage: "main-regions",
      stem: "Cách phân công nào đúng cho ba vùng chính của một bộ nạp tự xây dựng?",
      options: [
        "Vùng bộ nạp chứa logic và trình điều khiển; vùng metadata chứa dấu hiệu, phiên bản, CRC; vùng ứng dụng chứa chương trình chức năng chính.",
        "Vùng bộ nạp chỉ chứa dữ liệu cảm biến; metadata chứa toàn bộ mã ứng dụng; vùng ứng dụng chỉ chứa số CRC.",
        "Cả ba vùng cùng chứa một bản sao giống hệt để có thể xóa đồng thời mà không cần kiểm tra.",
        "Metadata thay thế hoàn toàn bảng vectơ, ngăn xếp và mã thực thi của ứng dụng."
      ],
      correct: 0,
      whyWrong: {
        1: "vai trò các vùng bị hoán đổi và metadata không đủ để chứa toàn bộ ứng dụng",
        2: "các vùng có nhiệm vụ khác nhau và xóa đồng thời sẽ làm mất khả năng phục hồi",
        3: "metadata chỉ mô tả trạng thái ảnh, không thay thế cấu trúc thực thi của ảnh"
      },
      explanation: "Vùng bộ nạp chứa mã điều phối cùng trình điều khiển UART/Flash/GPIO; metadata là sổ trạng thái nhỏ; vùng ứng dụng chiếm phần lớn dung lượng để chứa firmware. Tách biệt giúp bảo vệ mã khởi động và cập nhật ứng dụng độc lập."
    },
    {
      bloom: 3,
      topic: "vai trò metadata",
      coverage: "metadata-fields",
      stem: "Bộ nạp cần biết ảnh đã nạp hoàn tất chưa, ảnh thuộc phiên bản nào và nội dung có bị lỗi không. Bộ ba trường metadata nào đáp ứng trực tiếp ba nhu cầu đó?",
      options: [
        "Giá trị đánh dấu hợp lệ, số phiên bản và mã CRC của ảnh.",
        "Tốc độ UART, trạng thái nút nhấn và độ sáng đèn báo.",
        "Con trỏ ngăn xếp hiện tại, bộ đếm chương trình hiện tại và nhiệt độ CPU.",
        "Tên tệp mã nguồn, phiên bản trình biên dịch và màu của bo mạch."
      ],
      correct: 0,
      whyWrong: {
        1: "các giá trị này phục vụ giao tiếp hoặc giao diện, không chứng minh ảnh hoàn tất và toàn vẹn",
        2: "đây là trạng thái chạy tạm thời, không mô tả phiên bản và tính toàn vẹn của ảnh lưu",
        3: "các thông tin xây dựng này không đủ để bộ nạp xác nhận nội dung Flash tại thời điểm khởi động"
      },
      explanation: "Giá trị đánh dấu cho biết quá trình nạp đã hoàn tất theo giao thức, số phiên bản hỗ trợ lựa chọn hoặc chống nạp lùi, còn CRC cho phép tính lại trên vùng ứng dụng và phát hiện dữ liệu bị thay đổi hoặc ghi lỗi."
    },
    {
      bloom: 4,
      topic: "dời bảng vectơ ngắt",
      coverage: "vtor",
      stem: "Ứng dụng STM32F103 đặt tại 0x08002400 chạy được mã nền nhưng phát sinh HardFault ngay khi có ngắt. Lỗi cấu hình nào có khả năng nhất?",
      options: [
        "Ứng dụng chưa đặt SCB->VTOR về 0x08002400 nên CPU vẫn tìm trình phục vụ ngắt trong bảng vectơ của bộ nạp.",
        "Ứng dụng chưa đổi BOOT0 lên mức 1 nên mọi lệnh ngắt bị chuyển thành thao tác xóa Flash.",
        "Metadata chưa chứa tên hàm ngắt dạng chuỗi nên CPU không thể tìm ký hiệu trong mã nguồn.",
        "CRC của bộ nạp chưa được chép vào thanh ghi UART trước mỗi lần ngắt."
      ],
      correct: 0,
      whyWrong: {
        1: "BOOT0 chọn chế độ khởi động khi reset, không ánh xạ từng ngắt của ứng dụng đang chạy",
        2: "CPU lấy địa chỉ ngắt từ bảng vectơ máy, không tra tên hàm dạng chuỗi trong metadata",
        3: "CRC và UART không quyết định địa chỉ bảng vectơ ngắt"
      },
      explanation: "Khi ứng dụng đã dời khỏi đầu Flash, bảng vectơ của nó cũng nằm tại địa chỉ mới. Gán VTOR bằng địa chỉ bắt đầu ứng dụng khiến các ngoại lệ và ngắt tra đúng bảng; nếu bỏ qua, CPU có thể nhảy vào địa chỉ thuộc bộ nạp và gây HardFault."
    },
    {
      bloom: 4,
      topic: "dọn ngoại vi trước khi nhảy",
      coverage: "deinit-peripherals",
      stem: "Bộ nạp dùng UART, bộ định thời và cấu hình xung nhịp riêng. Vì sao phải hủy cấu hình các khối này trước khi nhảy sang ứng dụng?",
      options: [
        "Để ứng dụng bắt đầu từ trạng thái phần cứng có thể dự đoán, tránh ngắt treo, cờ còn tồn tại hoặc giả định xung nhịp không khớp.",
        "Để xóa vĩnh viễn các ngoại vi khỏi vi điều khiển và giải phóng thêm dung lượng Flash.",
        "Để buộc ứng dụng dùng đúng tốc độ UART của bộ nạp trong mọi phiên bản.",
        "Để CRC của ảnh tự động đổi thành giá trị mới sau mỗi lần khởi động."
      ],
      correct: 0,
      whyWrong: {
        1: "hủy khởi tạo chỉ đưa thanh ghi về trạng thái phù hợp, không xóa phần cứng hay tăng Flash",
        2: "ứng dụng có quyền cấu hình ngoại vi theo nhu cầu riêng và không nên bị buộc giữ cấu hình bộ nạp",
        3: "dọn ngoại vi không làm thay đổi nội dung ảnh hay CRC lưu trong metadata"
      },
      explanation: "Bộ nạp và ứng dụng là hai chương trình độc lập nhưng dùng chung phần cứng. Nếu bộ nạp để lại bộ định thời, UART, nguồn ngắt hoặc cây xung hoạt động, ứng dụng có thể nhận ngắt trước khi sẵn sàng hoặc tính sai thời gian; vì vậy cần hủy khởi tạo có kiểm soát."
    },
    {
      bloom: 3,
      topic: "vô hiệu hóa ngắt khi chuyển quyền",
      coverage: "disable-irq",
      stem: "Trong thời điểm bộ nạp đang đổi MSP và chuẩn bị gọi Reset_Handler của ứng dụng, thao tác nào ngăn một ngắt chen vào giữa quá trình chuyển quyền?",
      options: [
        "Gọi `__disable_irq()` trước khi đổi trạng thái, sau đó để mã khởi động ứng dụng thiết lập vectơ và bật lại ngắt đúng lúc.",
        "Tăng tốc độ UART để trình phục vụ ngắt hoàn thành trước khi MSP thay đổi.",
        "Xóa CRC trong metadata để mọi ngắt bị phần cứng bỏ qua.",
        "Đặt BOOT0 ở mức 1 trong khi CPU đang chạy để khóa tức thời mọi ngắt."
      ],
      correct: 0,
      whyWrong: {
        1: "tốc độ UART không ngăn các nguồn ngắt khác chen vào khoảnh khắc nhạy cảm",
        2: "CRC chỉ dùng kiểm tra ảnh, không điều khiển cho phép ngắt toàn cục",
        3: "BOOT0 được lấy mẫu cho lựa chọn khởi động và không phải mặt nạ ngắt đang chạy"
      },
      explanation: "Vô hiệu hóa ngắt toàn cục tạo một đoạn chuyển quyền nguyên tử: không trình phục vụ ngắt nào chạy khi MSP, VTOR và bối cảnh thực thi đang thay đổi. Ứng dụng chỉ bật lại ngắt sau khi đã thiết lập môi trường của mình."
    },
    {
      bloom: 3,
      topic: "tệp liên kết của bộ nạp",
      coverage: "boot-linker",
      stem: "Với Blue Pill dành 8 KB đầu Flash cho bộ nạp, khai báo vùng nhớ nào trong tệp liên kết của bộ nạp là phù hợp?",
      options: [
        "FLASH ORIGIN = 0x08000000, LENGTH = 8K; RAM ORIGIN = 0x20000000, LENGTH = 20K.",
        "FLASH ORIGIN = 0x08002400, LENGTH = 55K; RAM ORIGIN = 0x08000000, LENGTH = 8K.",
        "FLASH ORIGIN = 0x1FFFF000, LENGTH = 64K; RAM ORIGIN = 0x40022000, LENGTH = 20K.",
        "FLASH ORIGIN = 0x20000000, LENGTH = 20K; RAM ORIGIN = 0x08000000, LENGTH = 64K."
      ],
      correct: 0,
      whyWrong: {
        1: "0x08002400 là địa chỉ ứng dụng và RAM không nằm ở 0x08000000",
        2: "0x1FFFF000 là bộ nhớ hệ thống ROM còn 0x40022000 là vùng thanh ghi điều khiển Flash",
        3: "địa chỉ Flash và RAM đã bị hoán đổi"
      },
      explanation: "Bộ nạp tùy biến chiếm 8 KB từ đầu Main Flash tại 0x08000000. STM32F103C8 trong ví dụ có 20 KB RAM bắt đầu ở 0x20000000; giới hạn LENGTH giúp trình liên kết báo lỗi nếu mã bộ nạp vượt vùng được cấp."
    },
    {
      bloom: 3,
      topic: "tệp liên kết của ứng dụng",
      coverage: "app-linker",
      stem: "Sau vùng bộ nạp 8 KB và metadata 1 KB trên Blue Pill, cấu hình FLASH nào đúng cho tệp liên kết của ứng dụng?",
      options: [
        "ORIGIN = 0x08002000, LENGTH = 56K.",
        "ORIGIN = 0x08002400, LENGTH = 55K.",
        "ORIGIN = 0x08000000, LENGTH = 55K.",
        "ORIGIN = 0x20002400, LENGTH = 55K."
      ],
      correct: 1,
      whyWrong: {
        0: "0x08002000 là trang metadata nên ứng dụng bắt đầu tại đó sẽ ghi đè thông tin quản lý",
        2: "địa chỉ này chồng lên vùng bộ nạp ở đầu Flash",
        3: "0x20002400 thuộc không gian RAM chứ không phải Main Flash trong sơ đồ"
      },
      explanation: "Sau 8 KB bộ nạp, địa chỉ là 0x08002000; dành thêm một trang 1 KB metadata đưa điểm đầu ứng dụng tới 0x08002400. Dung lượng còn lại là 55 KB nên cả ORIGIN lẫn LENGTH phải được sửa trong tệp `.ld`."
    },
    {
      bloom: 1,
      topic: "bảng vectơ ứng dụng",
      coverage: "msp-first-word",
      stem: "Từ 32 bit đầu tiên tại địa chỉ bắt đầu ảnh ứng dụng Cortex-M chứa giá trị nào?",
      options: [
        "Giá trị khởi tạo cho con trỏ ngăn xếp chính MSP.",
        "Địa chỉ bộ nạp hệ thống trong ROM.",
        "Mã CRC32 của toàn bộ ảnh ứng dụng.",
        "Tốc độ baud mặc định của UART cập nhật."
      ],
      correct: 0,
      whyWrong: {
        1: "địa chỉ ROM hệ thống không phải phần tử đầu của bảng vectơ ứng dụng",
        2: "CRC thường nằm trong metadata hoặc gói cập nhật, không thay thế giá trị MSP",
        3: "tốc độ UART là cấu hình giao tiếp, không phải phần tử đầu bảng vectơ"
      },
      explanation: "Theo định dạng bảng vectơ Cortex-M, từ tại offset 0 là giá trị MSP ban đầu. Bộ nạp đọc và kiểm tra giá trị này trước khi đặt ngăn xếp cho ứng dụng."
    },
    {
      bloom: 1,
      topic: "bảng vectơ ứng dụng",
      coverage: "reset-handler-second-word",
      stem: "Từ 32 bit tại offset +4 của ảnh ứng dụng Cortex-M được dùng để làm gì khi bộ nạp chuyển quyền?",
      options: [
        "Làm địa chỉ Reset_Handler của ứng dụng để bộ nạp gọi qua con trỏ hàm.",
        "Làm kích thước trang Flash để phần cứng tự xóa toàn bộ vùng ứng dụng.",
        "Làm giá trị BOOT0 ảo nhằm thay đổi chân phần cứng.",
        "Làm mật khẩu UART được truyền ngược về máy tính."
      ],
      correct: 0,
      whyWrong: {
        1: "kích thước trang do phần cứng quy định và không lưu tại offset +4 của ảnh",
        2: "một từ trong Flash không thể thay đổi trực tiếp mức chân BOOT0",
        3: "offset +4 là vectơ khởi động lại, không phải trường xác thực giao tiếp"
      },
      explanation: "Phần tử thứ hai của bảng vectơ là địa chỉ hàm xử lý khởi động lại. Sau khi đặt MSP và dọn trạng thái, bộ nạp ép giá trị này thành con trỏ hàm rồi chuyển quyền thực thi."
    },
    {
      bloom: 3,
      topic: "kiểm tra con trỏ ngăn xếp ứng dụng",
      coverage: "msp-range",
      stem: "Bộ nạp Blue Pill đọc từ đầu ảnh ứng dụng được giá trị MSP = 0x10001000. Kết luận nào phù hợp trước khi nhảy?",
      options: [
        "Có thể nhảy vì mọi địa chỉ khác 0 đều là con trỏ ngăn xếp hợp lệ.",
        "Không nên nhảy vì giá trị không nằm trong vùng RAM 0x20000000 đến 0x20005000 của STM32F103C8.",
        "Có thể nhảy nếu CRC của riêng trang metadata bằng 0, không cần kiểm tra vùng RAM.",
        "Phải chép giá trị này vào BOOT0 để phần cứng tự hiệu chỉnh địa chỉ."
      ],
      correct: 1,
      whyWrong: {
        0: "MSP phải trỏ vào RAM hợp lệ và có căn chỉnh phù hợp, không chỉ cần khác 0",
        2: "CRC metadata không biến một địa chỉ ngoài RAM thành ngăn xếp hợp lệ",
        3: "BOOT0 là chân chọn chế độ khởi động, không hiệu chỉnh MSP"
      },
      explanation: "Với 20 KB RAM bắt đầu ở 0x20000000, biên trên là 0x20005000. Giá trị 0x10001000 nằm ngoài miền đó nên ảnh hoặc bảng vectơ không hợp lệ; nhảy vào có thể gây lỗi ngay khi dùng ngăn xếp."
    },
    {
      bloom: 1,
      topic: "bản đồ Flash STM32F103C8",
      coverage: "bluepill-map",
      stem: "Blue Pill có 64 KB Flash, dành 8 KB cho Bootloader và 1 KB cho metadata. Ánh xạ địa chỉ nào đúng cho ba vùng chính?",
      options: [
        "Bộ nạp 0x08000000-0x08001FFF; metadata bắt đầu 0x08002000; ứng dụng bắt đầu 0x08002400.",
        "Ứng dụng bắt đầu 0x08000000; bộ nạp bắt đầu 0x08002400; metadata nằm trong RAM.",
        "Bộ nạp bắt đầu 0x1FFFF000; metadata bắt đầu 0x40022000; ứng dụng bắt đầu 0x20000000.",
        "Cả ba vùng đều bắt đầu 0x08000000 và chỉ được phân biệt bằng tên tệp."
      ],
      correct: 0,
      whyWrong: {
        1: "cách này đảo vị trí bộ nạp và ứng dụng, đồng thời metadata trong ví dụ nằm ở Flash",
        2: "các địa chỉ này lần lượt thuộc System Memory, thanh ghi Flash và RAM, không phải ba phân vùng Main Flash",
        3: "ba vùng cùng địa chỉ sẽ chồng lấn và ghi đè lẫn nhau"
      },
      explanation: "Tám trang đầu chiếm 0x08000000 đến 0x08001FFF. Trang 8 bắt đầu 0x08002000 và dài 0x400 byte. Vì vậy trang 9, cũng là đầu ứng dụng, bắt đầu ở 0x08002400."
    },
    {
      bloom: 3,
      topic: "tính địa chỉ trang Flash",
      coverage: "page-address-calculation",
      stem: "Mỗi trang Flash của STM32F103C8 dài 0x400 byte và trang 0 bắt đầu ở 0x08000000. Địa chỉ bắt đầu của trang 12 là bao nhiêu?",
      options: [
        "0x08000C00.",
        "0x08003000.",
        "0x08004800.",
        "0x08012000."
      ],
      correct: 1,
      whyWrong: {
        0: "0xC00 chỉ bằng ba trang 0x400, không phải mười hai trang",
        2: "0x4800 tương ứng mười tám trang 0x400",
        3: "địa chỉ này vượt xa độ lệch cần tính cho trang 12"
      },
      explanation: "Độ lệch của trang 12 là 12 × 0x400 = 0x3000. Cộng với 0x08000000 thu được 0x08003000. Cách tính này cũng giải thích vì sao trang 9 bắt đầu tại 0x08002400."
    },
    {
      bloom: 3,
      topic: "tính dung lượng ứng dụng",
      coverage: "capacity-calculation",
      stem: "Nếu bộ nạp Blue Pill tăng từ 8 KB lên 12 KB nhưng metadata vẫn dùng 1 KB, dung lượng tối đa còn lại cho một ứng dụng trong Flash 64 KB là bao nhiêu?",
      options: [
        "51 KB.",
        "52 KB.",
        "53 KB.",
        "55 KB."
      ],
      correct: 0,
      whyWrong: {
        1: "phương án này mới trừ 12 KB mà chưa trừ 1 KB metadata",
        2: "phương án này thiếu thêm 2 KB so với tổng vùng đã dành",
        3: "55 KB chỉ đúng khi bộ nạp vẫn là 8 KB và metadata là 1 KB"
      },
      explanation: "Dung lượng ứng dụng bằng tổng Flash trừ mọi vùng dành riêng: 64 - 12 - 1 = 51 KB. Việc tăng bộ nạp luôn phải đi kèm cập nhật ORIGIN/LENGTH và kiểm tra ảnh ứng dụng còn vừa vùng mới."
    },
    {
      bloom: 2,
      topic: "các vùng nhớ đặc biệt STM32F103",
      coverage: "special-memory-map",
      stem: "Ghép địa chỉ và chức năng nào đúng đối với các vùng nhớ đặc biệt của STM32F103?",
      options: [
        "0x1FFFF000: bộ nhớ hệ thống chứa bộ nạp ROM; 0x1FFFF800: Option Bytes; 0x40022000: vùng thanh ghi điều khiển Flash.",
        "0x1FFFF000: RAM ứng dụng; 0x1FFFF800: vùng ảnh A; 0x40022000: bảng vectơ ngắt.",
        "0x1FFFF000: metadata người dùng; 0x1FFFF800: UART; 0x40022000: bộ nạp tùy biến.",
        "Cả ba địa chỉ đều là các trang liên tiếp trong Main Flash 64 KB."
      ],
      correct: 0,
      whyWrong: {
        1: "RAM bắt đầu ở 0x20000000, vùng ảnh A thuộc Main Flash và bảng vectơ không nằm trong vùng thanh ghi Flash",
        2: "các chức năng được gán không đúng loại vùng nhớ và ngoại vi",
        3: "0x1FFFxxxx thuộc khối thông tin hệ thống còn 0x40022000 thuộc không gian ngoại vi"
      },
      explanation: "System Memory là ROM chỉ đọc do nhà sản xuất nạp sẵn, Option Bytes chứa cấu hình phần cứng mức thấp, còn 0x40022000 là địa chỉ cơ sở các thanh ghi giao diện Flash. Không vùng nào trong ba địa chỉ này là phân vùng ứng dụng tùy ý."
    },
    {
      bloom: 4,
      topic: "kiểm tra CRC khi khởi động",
      coverage: "crc-flow",
      stem: "Metadata chứa giá trị đánh dấu hợp lệ và CRC đã lưu, nhưng CRC tính lại trên vùng ứng dụng không khớp. Bộ nạp nên xử lý thế nào?",
      options: [
        "Bỏ qua sai lệch vì giá trị đánh dấu đã đủ chứng minh ảnh không bị hỏng.",
        "Từ chối nhảy vào ảnh, giữ hoặc chuyển sang chế độ cập nhật và chỉ đánh dấu hợp lệ sau khi có một ảnh kiểm tra thành công.",
        "Sửa CRC đã lưu thành giá trị vừa tính mà không xác minh nguồn gốc của sai lệch rồi khởi động ảnh.",
        "Chỉ kiểm tra từ MSP; nếu MSP nằm trong RAM thì mọi byte mã còn lại mặc nhiên đúng."
      ],
      correct: 1,
      whyWrong: {
        0: "giá trị đánh dấu chỉ mô tả trạng thái quy trình, không phát hiện mọi lỗi bit trong ảnh",
        2: "ghi đè CRC tham chiếu sẽ che giấu lỗi truyền hoặc lỗi Flash thay vì xác nhận ảnh mong đợi",
        3: "MSP hợp lệ không chứng minh phần mã và dữ liệu còn lại toàn vẹn"
      },
      explanation: "Điều kiện nhảy phải đồng thời thỏa trạng thái hoàn tất và kiểm tra nội dung. CRC sai cho thấy ảnh hiện tại khác ảnh đã được chấp nhận, nên bộ nạp không được chuyển quyền mà phải chờ nạp lại hoặc dùng ảnh dự phòng hợp lệ."
    },
    {
      bloom: 4,
      topic: "mất kết nối khi cập nhật",
      coverage: "interrupted-update",
      stem: "Quá trình nạp ảnh qua UART bị ngắt khi mới ghi được một nửa vùng ứng dụng. Thiết kế nào ngăn bộ nạp khởi động nhầm ảnh dở dang?",
      options: [
        "Ghi giá trị đánh dấu thành công trước khi xóa trang đầu để bộ nạp biết quá trình đã bắt đầu.",
        "Chỉ ghi CRC và giá trị đánh dấu hợp lệ sau khi nhận đủ ảnh và kiểm tra thành công; lúc khởi động, thiếu hoặc sai các giá trị này thì ở lại chế độ nạp.",
        "Giữ nguyên giá trị đánh dấu cũ dù nội dung vùng ứng dụng đã bị ghi một phần.",
        "Bỏ metadata và dựa vào việc địa chỉ Reset_Handler khác 0 để kết luận ảnh hoàn chỉnh."
      ],
      correct: 1,
      whyWrong: {
        0: "đánh dấu thành công trước khi hoàn tất làm trạng thái metadata nói sai thực tế",
        2: "dấu hiệu cũ có thể khiến bộ nạp coi ảnh bị ghi dở là hợp lệ",
        3: "một địa chỉ khác 0 có thể vẫn tồn tại trong ảnh dở dang và không chứng minh toàn bộ ảnh đúng"
      },
      explanation: "Trạng thái hợp lệ phải là thao tác cam kết cuối cùng. Trước khi ghi, bộ nạp xóa hoặc đặt trạng thái đang cập nhật; sau khi nhận đủ và CRC đúng mới ghi CRC cùng giá trị đánh dấu thành công, nhờ đó mất nguồn giữa chừng luôn để lại trạng thái không được phép khởi động."
    },
    {
      bloom: 3,
      topic: "mã hóa ảnh cập nhật",
      coverage: "decrypt-before-write",
      stem: "Ảnh `.bin` được mã hóa trên máy tính để hạn chế đọc trộm nội dung. Trình tự xử lý nào phù hợp tại thiết bị?",
      options: [
        "Bộ nạp nhận dữ liệu, giải mã bằng khóa và thuật toán đã chọn, ghi nội dung hợp lệ vào Flash rồi kiểm tra tính toàn vẹn trước khi kích hoạt.",
        "Bộ nạp ghi nguyên dữ liệu mã hóa vào địa chỉ ứng dụng và CPU tự giải mã từng lệnh dù không có phần cứng hỗ trợ.",
        "Bộ nạp bỏ kiểm tra CRC vì dữ liệu đã mã hóa thì không thể bị lỗi trên đường truyền.",
        "Ứng dụng chưa chạy tự tải khóa từ chính vùng ảnh đang bị ghi đè rồi sửa bộ nạp ROM."
      ],
      correct: 0,
      whyWrong: {
        1: "CPU không mặc nhiên thực thi ảnh mã hóa nếu kiến trúc không có cơ chế giải mã khi lấy lệnh",
        2: "mã hóa bảo mật nội dung không loại bỏ lỗi truyền; vẫn cần kiểm tra toàn vẹn",
        3: "ứng dụng chưa chạy không thể điều phối cập nhật và bộ nạp ROM không thể bị sửa bởi phần mềm người dùng"
      },
      explanation: "Trong mô hình của chuyên đề, ảnh được mã hóa trước khi truyền và bộ nạp giải mã trước khi ghi vào vùng thực thi. Mã hóa và CRC giải quyết hai mục tiêu khác nhau: bảo mật nội dung và phát hiện dữ liệu sai."
    },
    {
      bloom: 3,
      topic: "cập nhật phần mềm qua UART",
      coverage: "uart-flash-flow",
      stem: "Sau khi nhận lệnh nạp hợp lệ qua UART, thứ tự thao tác Flash nào hợp lý cho bộ nạp STM32F1?",
      options: [
        "Mở khóa Flash, xóa đúng các trang đích, lập trình dữ liệu nhị phân theo đơn vị cho phép, kiểm tra kết quả rồi khóa hoặc kết thúc phiên ghi.",
        "Lập trình dữ liệu trước, sau đó xóa các trang vừa ghi để bảo đảm chúng sạch.",
        "Xóa cả vùng bộ nạp, metadata và ứng dụng rồi chờ máy tính gửi lại mọi thành phần.",
        "Chỉ gọi hàm UART; phần cứng Flash tự suy ra địa chỉ và tự kiểm tra CRC mà không cần logic bộ nạp."
      ],
      correct: 0,
      whyWrong: {
        1: "Flash phải được xóa trước khi lập trình và xóa sau sẽ phá dữ liệu vừa ghi",
        2: "xóa bộ nạp làm mất chính chương trình đang thực hiện cập nhật và phá đường cứu hộ",
        3: "UART chỉ vận chuyển dữ liệu; bộ nạp phải quản lý địa chỉ, xóa, ghi và kiểm tra"
      },
      explanation: "HAL_FLASH_Unlock cho phép sửa Flash, HAL_FLASHEx_Erase xóa các trang ứng dụng cần thiết và HAL_FLASH_Program ghi dữ liệu. Bộ nạp phải giới hạn địa chỉ trong vùng ứng dụng, kiểm tra lỗi từng bước và xác thực toàn ảnh trước khi đánh dấu hợp lệ."
    },
    {
      bloom: 4,
      topic: "bộ nạp có điều kiện qua GPIO",
      coverage: "project-button-analysis",
      stem: "Trong dự án dùng PA0 để giữ thiết bị ở bộ nạp, lỗi nào khiến thiết bị đôi khi tự vào chế độ cập nhật dù người dùng không nhấn nút?",
      options: [
        "Đầu vào PA0 bị thả nổi hoặc chưa ổn định khi đọc sớm, không có điện trở kéo và xử lý chống dội phù hợp.",
        "Ứng dụng đặt VTOR đúng bằng địa chỉ bắt đầu của chính nó.",
        "Tệp liên kết giới hạn bộ nạp trong đúng 8 KB Flash.",
        "Bộ nạp kiểm tra CRC sau khi nhận đủ ảnh."
      ],
      correct: 0,
      whyWrong: {
        1: "đặt VTOR đúng giúp ngắt ứng dụng hoạt động, không làm GPIO tự đổi mức khi khởi động",
        2: "giới hạn đúng vùng Flash ngăn chồng lấn và không tạo mức ngẫu nhiên trên chân",
        3: "kiểm tra CRC sau khi nhận đủ ảnh không quyết định trạng thái nút ở đầu quá trình"
      },
      explanation: "Điều kiện GPIO được đọc rất sớm nên chân phải có mức mặc định xác định bằng kéo lên hoặc kéo xuống phù hợp. Nút cơ còn có thể dội; thiết kế nên lấy mẫu ổn định hoặc lọc trong khoảng ngắn trước khi quyết định ở lại bộ nạp."
    },
    {
      bloom: 5,
      topic: "chuyển từ ứng dụng về bộ nạp",
      coverage: "app-to-boot-evaluation",
      stem: "Ứng dụng cần chuyển sang chế độ cập nhật từ lệnh UART mà không có người bấm nút. Phương án nào đáng tin cậy hơn cho sản phẩm?",
      options: [
        "Xác thực lệnh, ghi dấu hiệu một lần vào vùng giữ qua khởi động lại, đóng phiên giao tiếp rồi khởi động lại để bộ nạp xử lý dấu hiệu.",
        "Nhảy ngay vào giữa một hàm ghi Flash của bộ nạp và giữ nguyên toàn bộ ngắt đang hoạt động của ứng dụng.",
        "Ghi đè Reset_Handler của ứng dụng bằng byte đầu tiên nhận được rồi tiếp tục chạy.",
        "Đặt mọi vùng Flash thành có thể ghi từ mọi mã và bỏ kiểm tra nguồn phát lệnh."
      ],
      correct: 0,
      whyWrong: {
        1: "nhảy vào giữa hàm phá quy ước gọi và mang theo trạng thái ngoại vi, ngắt không xác định",
        2: "sửa bảng vectơ trước khi có ảnh hợp lệ dễ làm thiết bị mất khả năng khởi động",
        3: "cho phép ghi không kiểm soát tạo rủi ro hỏng bộ nạp và cập nhật trái phép"
      },
      explanation: "Khởi động lại đưa CPU và mã khởi động qua luồng chuẩn, còn dấu hiệu có kiểm soát truyền ý định từ ứng dụng sang bộ nạp. Xác thực lệnh và xóa dấu hiệu sau khi dùng giúp tránh kích hoạt trái phép hoặc lặp vô hạn."
    },
    {
      bloom: 3,
      topic: "trình tự cập nhật A/B",
      coverage: "ab-update-sequence",
      stem: "Thiết bị đang chạy ảnh A và nhận ảnh B mới. Trình tự nào đúng cho cập nhật A/B?",
      options: [
        "Xóa A, đánh dấu B hoạt động, sau đó mới bắt đầu nhận dữ liệu B.",
        "Ghi B vào vùng không hoạt động, kiểm tra toàn vẹn B, cập nhật metadata chọn B cho lần khởi động sau và vẫn giữ A để phục hồi.",
        "Ghi xen kẽ từng byte vào A và B để hai ảnh luôn giống nhau trong suốt quá trình.",
        "Đổi cờ sang B trước, còn CRC và dữ liệu B sẽ được bổ sung sau lần khởi động đầu tiên."
      ],
      correct: 1,
      whyWrong: {
        0: "xóa ảnh đang chạy trước khi B hợp lệ làm mất bản phục hồi",
        2: "ghi xen kẽ có thể phá cả ảnh tốt và không tạo một ảnh hoàn chỉnh độc lập",
        3: "chọn B trước khi hoàn tất khiến mất nguồn có thể khởi động vào ảnh dở dang"
      },
      explanation: "Nguyên tắc A/B là không đụng tới ảnh tốt trong khi nhận ảnh mới. Chỉ sau khi B được ghi đủ và kiểm tra thành công, metadata mới được cam kết để chọn B; A tiếp tục đóng vai trò quay lại nếu B không khởi động tốt."
    },
    {
      bloom: 4,
      topic: "quay lại ảnh cũ",
      coverage: "rollback",
      stem: "Ảnh B vượt qua CRC nhưng sau khi khởi động không gửi được tín hiệu xác nhận hoạt động trong số lần thử cho phép. Bộ nạp A/B nên làm gì?",
      options: [
        "Tiếp tục thử B vô hạn vì CRC đúng chứng minh mọi chức năng của ứng dụng đều đúng.",
        "Đánh dấu lần thử thất bại, quay lại ảnh A đã biết hoạt động và giữ trạng thái chẩn đoán trong metadata.",
        "Xóa cả A và B để bảo đảm hai vùng có cùng trạng thái.",
        "Bỏ qua metadata và chọn ngẫu nhiên một địa chỉ Reset_Handler ở mỗi lần khởi động."
      ],
      correct: 1,
      whyWrong: {
        0: "CRC chỉ chứng minh dữ liệu không đổi, không chứng minh ứng dụng chạy đúng trên phần cứng",
        2: "xóa cả hai ảnh loại bỏ mọi đường phục hồi",
        3: "lựa chọn ngẫu nhiên không bảo đảm địa chỉ hợp lệ và phá tính xác định của khởi động"
      },
      explanation: "Cơ chế quay lại cần một tiêu chí xác nhận sau khởi động, chẳng hạn ứng dụng đánh dấu đã hoạt động ổn định. Nếu không xác nhận sau số lần giới hạn, bộ nạp coi B không đạt và chọn lại A, dù CRC của B vẫn đúng."
    },
    {
      bloom: 3,
      topic: "hai tệp liên kết cho ảnh A/B",
      coverage: "dual-linker",
      stem: "Vì sao cùng một mã nguồn ứng dụng cho vùng A tại 0x08002400 và vùng B tại 0x08009000 thường cần hai cấu hình tệp liên kết?",
      options: [
        "Mỗi ảnh phải được liên kết với địa chỉ bắt đầu và bảng vectơ đúng vùng sẽ chạy; chỉ chép nguyên ảnh đã liên kết cho A sang B có thể để lại địa chỉ tuyệt đối sai.",
        "Hai tệp liên kết làm tăng gấp đôi dung lượng Flash vật lý mà không thay đổi phần cứng.",
        "Tệp liên kết thứ hai chỉ dùng đổi tốc độ UART và không liên quan địa chỉ mã.",
        "Mỗi tệp liên kết tạo một loại CPU khác nhau nên ảnh A và B không thể dùng cùng mã nguồn."
      ],
      correct: 0,
      whyWrong: {
        1: "tệp liên kết chỉ bố trí mã trong dung lượng có sẵn, không tạo thêm phần cứng",
        2: "nhiệm vụ chính của cấu hình này là địa chỉ ORIGIN/LENGTH và bố trí section",
        3: "hai ảnh vẫn nhắm cùng CPU và có thể xây dựng từ cùng mã nguồn"
      },
      explanation: "Ảnh thực thi chứa bảng vectơ và có thể chứa tham chiếu địa chỉ phụ thuộc vị trí. Liên kết riêng cho từng ORIGIN bảo đảm mã, dữ liệu chỉ đọc và bảng vectơ phù hợp địa chỉ vùng A hoặc B mà bộ nạp sẽ chọn."
    },
    {
      bloom: 3,
      topic: "địa chỉ hai vùng ảnh Blue Pill",
      coverage: "ab-addresses",
      stem: "Trong ví dụ A/B logic trên Blue Pill, metadata cho biết vùng A bắt đầu tại 0x08002400 và vùng B tại 0x08009000. Nếu cờ chọn B và ảnh B hợp lệ, bộ nạp phải lấy MSP và Reset_Handler ở đâu?",
      options: [
        "MSP tại 0x08009000 và Reset_Handler tại 0x08009004.",
        "MSP tại 0x08002400 và Reset_Handler tại 0x08009000.",
        "MSP tại 0x08002000 và Reset_Handler tại 0x08002004.",
        "MSP tại 0x20000000 và Reset_Handler tại 0x40022000."
      ],
      correct: 0,
      whyWrong: {
        1: "MSP và Reset_Handler phải thuộc cùng bảng vectơ của ảnh được chọn",
        2: "0x08002000 là vùng metadata, không phải đầu ảnh B",
        3: "đây là địa chỉ RAM và thanh ghi Flash, không phải hai phần tử bảng vectơ ảnh B"
      },
      explanation: "Mỗi ảnh Cortex-M bắt đầu bằng bảng vectơ riêng. Khi chọn B, từ tại địa chỉ đầu B cung cấp MSP và từ kế tiếp ở offset +4 cung cấp Reset_Handler; VTOR cũng phải được đặt về đầu vùng B."
    },
    {
      bloom: 5,
      topic: "lựa chọn kiến trúc cập nhật",
      coverage: "architecture-evaluation",
      stem: "Blue Pill 64 KB phải chạy ứng dụng 50 KB và chỉ cần cập nhật tại bàn kỹ thuật qua UART. Kiến trúc nào khả thi và hợp lý hơn với phân vùng 8 KB bộ nạp, 1 KB metadata?",
      options: [
        "Một vùng ứng dụng 55 KB cùng kiểm tra CRC và chế độ nạp lại; không cố chia A/B vì hai ảnh 50 KB không thể cùng nằm trong dung lượng còn lại.",
        "Chia A/B, mỗi vùng 55 KB, vì phân vùng logic tự làm tổng Flash tăng lên 119 KB.",
        "Bỏ giới hạn vùng bộ nạp để ứng dụng tự ghi đè mã đang thực thi khi cần cập nhật.",
        "Lưu ảnh thứ hai 50 KB trong một thanh ghi dự phòng được cấp bởi pin CR2032."
      ],
      correct: 0,
      whyWrong: {
        1: "phân vùng không làm tăng dung lượng vật lý và hai ảnh 50 KB không vừa 55 KB còn lại",
        2: "cho phép ghi đè bộ nạp phá đường khởi động và cứu hộ",
        3: "thanh ghi dự phòng chỉ lưu vài từ trạng thái, không chứa được ảnh hàng chục KB"
      },
      explanation: "Sau bộ nạp và metadata chỉ còn 55 KB, vừa một ảnh 50 KB nhưng không đủ hai ảnh. Với cập nhật có người thao tác tại chỗ, kiến trúc một ảnh có CRC và khả năng nạp lại qua UART là lựa chọn khả thi; muốn A/B phải giảm ảnh hoặc chọn phần cứng nhiều Flash hơn."
    },
    {
      bloom: 2,
      topic: "hỗ trợ bộ nạp trên các kiến trúc khác",
      coverage: "other-architectures",
      stem: "Nhận định nào đúng về hỗ trợ bộ nạp khởi động trên MSP430, RISC-V và các họ 8051 cũ?",
      options: [
        "MSP430 có cơ chế BSL; hỗ trợ trên RISC-V phụ thuộc nhà sản xuất; nhiều 8051 cũ không có sẵn bộ nạp hệ thống hiện đại nên bộ nạp tùy biến khó triển khai hơn.",
        "Cả ba luôn dùng chung bộ nạp ROM, cùng địa chỉ, cùng chân kích hoạt và cùng giao thức USB.",
        "RISC-V bắt buộc có BSL của MSP430, còn 8051 cũ luôn có hai ngân hàng Flash vật lý độc lập.",
        "MSP430 không thể nạp lại phần mềm, RISC-V chỉ khởi động từ RAM và 8051 chỉ thực thi mã do máy tính truyền trực tiếp."
      ],
      correct: 0,
      whyWrong: {
        1: "hỗ trợ phụ thuộc kiến trúc và nhà sản xuất, không có một cấu hình USB chung cho cả ba",
        2: "BSL là tên cơ chế gắn với MSP430 trong bảng so sánh và 8051 cũ không mặc nhiên có Flash hai ngân hàng",
        3: "ba mô tả tuyệt đối này đều không phản ánh khả năng khởi động và nạp chương trình thực tế của các họ"
      },
      explanation: "Bảng so sánh nhấn mạnh rằng không thể suy diễn một cơ chế chung cho mọi lõi. MSP430 có BSL, hệ RISC-V thay đổi theo hãng cung cấp chip, còn nhiều biến thể 8051 cũ thiếu bộ nạp hệ thống nên muốn tự cập nhật phải tự xây dựng nhiều phần hơn."
    },
    {
      bloom: 5,
      topic: "lựa chọn bộ nạp tự xây dựng",
      coverage: "custom-bootloader-tradeoff",
      stem: "Sản phẩm phải cập nhật từ thẻ nhớ hoặc Bluetooth, dùng định dạng gói riêng và giải mã ảnh trước khi ghi. Lựa chọn nào phù hợp nhất?",
      options: [
        "Xây dựng bộ nạp riêng trong vùng Flash được bảo vệ, chấp nhận phải tự quản lý kích thước, trình điều khiển, phân vùng và cơ chế phục hồi.",
        "Chỉ dựa vào bộ nạp ROM của nhà sản xuất và giả định nó tự hỗ trợ mọi giao tiếp, định dạng gói cùng thuật toán giải mã tùy ý.",
        "Bỏ bộ nạp và để ảnh chưa được xác thực tự ghi đè chương trình đang chạy từ cùng địa chỉ.",
        "Đưa toàn bộ logic cập nhật vào Option Bytes để không cần mã, RAM hoặc trình điều khiển ngoại vi."
      ],
      correct: 0,
      whyWrong: {
        1: "bộ nạp ROM chỉ có tập giao tiếp và giao thức cố định do nhà sản xuất cài sẵn",
        2: "ảnh chưa xác thực không thể là thành phần tin cậy để tự thay thế mã đang chạy",
        3: "Option Bytes chỉ lưu một số cấu hình phần cứng mức thấp, không chứa hệ thống cập nhật hoàn chỉnh"
      },
      explanation: "Bộ nạp tự xây dựng linh hoạt hơn bộ nạp hệ thống: có thể thêm thẻ nhớ, Bluetooth, giao thức riêng và giải mã. Đổi lại, người thiết kế chịu trách nhiệm bảo vệ vùng bộ nạp, giữ mã vừa phân vùng, kiểm thử mất nguồn và xây dựng đường cứu hộ."
    },
    {
      bloom: 4,
      topic: "xử lý lỗi trong quá trình nhận ảnh",
      coverage: "block-transfer-error-flow",
      stem: "Trong lúc bộ nạp nhận ảnh theo từng khối, một khối không vượt qua kiểm tra hợp lệ. Cách xử lý nào phù hợp với lưu đồ cập nhật an toàn?",
      options: [
        "Không cam kết ảnh mới; chuyển sang nhánh xử lý lỗi như yêu cầu truyền lại hoặc hủy phiên, đồng thời giữ trạng thái cho phép nạp lại.",
        "Bỏ qua khối lỗi, ghép các khối còn lại và đánh dấu ảnh hoàn tất để giảm thời gian.",
        "Nhảy ngay vào vùng ứng dụng một phần để ứng dụng tự suy đoán các byte còn thiếu.",
        "Xóa bộ nạp và metadata nhằm làm mọi vùng có cùng trạng thái chưa xác định."
      ],
      correct: 0,
      whyWrong: {
        1: "thiếu một khối làm ảnh sai cấu trúc hoặc sai CRC và không được đánh dấu hoàn tất",
        2: "ảnh một phần không phải môi trường tin cậy để phục hồi dữ liệu còn thiếu",
        3: "xóa bộ nạp và metadata loại bỏ chính cơ chế cứu hộ mà nhánh lỗi cần duy trì"
      },
      explanation: "Lưu đồ chỉ ghi khối và tiến tới khối tiếp theo khi dữ liệu hợp lệ. Khi kiểm tra thất bại, bộ nạp đi vào phương án dự phòng: truyền lại, hủy phiên hoặc chờ nạp mới; trạng thái hợp lệ chỉ được cam kết sau khi toàn bộ ảnh hoàn tất và vượt qua kiểm tra cuối."
    },
    {
      bloom: 5,
      topic: "thiết kế luồng bộ nạp hoàn chỉnh",
      coverage: "end-to-end-flow",
      stem: "Phương án nào mô tả đầy đủ nhất một lần khởi động an toàn của bộ nạp STM32F103 có cập nhật qua UART?",
      options: [
        "Khởi tạo tối thiểu; kiểm tra nút hoặc dấu hiệu; nếu cập nhật thì nhận, xóa/ghi đúng vùng và xác thực; nếu chạy ứng dụng thì kiểm tra metadata, CRC, MSP; sau đó dọn ngoại vi, tắt ngắt, đặt VTOR/MSP và gọi Reset_Handler.",
        "Khởi tạo mọi ngoại vi; xóa ứng dụng ở mỗi lần cấp nguồn; nhận một byte bất kỳ rồi gọi địa chỉ byte đó chỉ ra.",
        "Chạy ứng dụng trước; nếu ứng dụng lỗi thì quay ngược thời gian để bộ nạp kiểm tra CRC đã bị bỏ qua.",
        "Chỉ kiểm tra nút; mọi ảnh có hai từ đầu khác 0 đều được chạy mà không cần giới hạn địa chỉ hoặc metadata."
      ],
      correct: 0,
      whyWrong: {
        1: "xóa ở mỗi lần khởi động và gọi địa chỉ không được xác thực đều gây mất an toàn",
        2: "bộ nạp phải quyết định trước khi chuyển quyền và không thể khôi phục một bước kiểm tra đã bỏ qua theo cách đó",
        3: "hai từ khác 0 không đủ chứng minh ảnh hoàn chỉnh, MSP hợp lệ hay mã toàn vẹn"
      },
      explanation: "Luồng đúng kết hợp cả quyết định chế độ, quy trình ghi có giới hạn, kiểm tra ảnh và chuyển quyền sạch. Mỗi bước chặn một nhóm lỗi riêng: kích hoạt nhầm, ghi đè vùng cấm, ảnh dở dang, vectơ sai và trạng thái ngắt/ngoại vi còn sót."
    }
  ];

  const replacementIds = [
    "phan-mem-nhung-bootloader-q003",
    "phan-mem-nhung-secure-boot-q010",
    "phan-mem-nhung-secure-boot-q019",
    "phan-mem-nhung-bootloader-cnt028",
    "phan-mem-nhung-bootloader-q037",
    "phan-mem-nhung-secure-boot-lst044",
    "phan-mem-nhung-secure-boot-q053",
    "phan-mem-nhung-bootloader-q062",
    "phan-mem-nhung-bootloader-q071",
    "phan-mem-nhung-secure-boot-cnt078",
    "phan-mem-nhung-secure-boot-q087",
    "phan-mem-nhung-bootloader-s096"
  ];

  replacementIds.forEach((id, index) => {
    const current = chapter.questions.find((question) => question.id === id);
    if (!current) throw new Error(`Không tìm thấy câu Bootloader cần thay: ${id}`);
    const revised = makeQuestion({ ...definitions[index], id });
    Object.assign(current, revised, { number: current.number, setIndex: current.setIndex });
  });

  let nextNumber = Math.max(...chapter.questions.map((question) => question.number || 0)) + 1;
  definitions.slice(replacementIds.length).forEach((definition, index) => {
    const setCounts = Array.from({ length: 10 }, (_, setIndex) => ({
      setIndex,
      count: chapter.questions.filter((question) => question.setIndex === setIndex).length
    }));
    const setIndex = setCounts.sort((a, b) => a.count - b.count || a.setIndex - b.setIndex)[0].setIndex;
    chapter.questions.push({
      ...makeQuestion({
        ...definition,
        id: `phan-mem-nhung-bootloader-official-q${String(nextNumber).padStart(3, "0")}`
      }),
      number: nextNumber,
      setIndex
    });
    nextNumber += 1;
  });

  chapter.questionCount = chapter.questions.length;
  data.version = "2026-07-13-bootloader-official-scope";
})();
