(() => {
  const data = window.EMBEDDED_QUIZ_DATA;
  if (!data || data.version === "2026-07-12-outline-aligned") return;

  const bloomLabels = {
    1: "Nhớ",
    2: "Hiểu",
    3: "Vận dụng",
    4: "Phân tích",
    5: "Đánh giá"
  };
  const choice = (text, correct, reason) => ({ text, correct, reason });
  const chapter = (id) => data.chapters.find((item) => item.id === id);

  const revise = (chapterId, number, changes) => {
    const question = chapter(chapterId)?.questions.find((item) => item.number === number);
    if (!question) throw new Error(`Không tìm thấy câu ${number} của ${chapterId}.`);
    Object.assign(question, changes);
    if (changes.bloom) question.type = `Bloom ${changes.bloom} - ${bloomLabels[changes.bloom]}`;
  };

  const append = (chapterId, additions) => {
    const target = chapter(chapterId);
    const numberStart = target.questions.length + 1;
    const finalSet = Math.max(...target.questions.map((item) => item.setIndex));
    additions.forEach((item, index) => {
      target.questions.push({
        ...item,
        number: numberStart + index,
        setIndex: finalSet,
        type: `Bloom ${item.bloom} - ${bloomLabels[item.bloom]}`
      });
    });
    target.questionCount = target.questions.length;
  };

  // 1.2: bus là nội dung nhớ/hiểu trong ma trận đề cương.
  revise("phan-cung-nhung", 43, {
    bloom: 2,
    stem: "So sánh cơ bản giữa bus nối tiếp và bus song song được mô tả đúng nhất bởi phương án nào?"
  });
  revise("phan-cung-nhung", 80, {
    bloom: 2,
    stem: "Phát biểu nào thể hiện đúng ưu điểm và hạn chế cơ bản của bus nối tiếp so với bus song song?"
  });

  // 1.3: mô hình hệ điều hành nhúng chỉ yêu cầu nhớ và hiểu.
  revise("phan-mem-nhung", 7, {
    bloom: 2,
    stem: "Phát biểu nào mô tả đúng khác biệt cơ bản giữa nhân nguyên khối và vi nhân?"
  });
  revise("phan-mem-nhung", 32, {
    bloom: 2,
    stem: "Đặc điểm nào mô tả đúng sự khác nhau cơ bản giữa nhân nguyên khối và vi nhân?"
  });
  revise("phan-mem-nhung", 75, {
    bloom: 2,
    stem: "Cách hiểu nào phù hợp nhất về hai mô hình nhân nguyên khối và vi nhân trong hệ điều hành nhúng?"
  });
  [7, 32, 75].forEach((number) => {
    const question = chapter("phan-mem-nhung").questions.find((item) => item.number === number);
    const answer = question.choices.find((item) => item.correct);
    answer.text = "Nhân nguyên khối đặt nhiều dịch vụ trong nhân hệ điều hành; vi nhân giữ phần lõi nhỏ và đưa nhiều dịch vụ ra ngoài nhân.";
    answer.reason = "Điểm khác biệt cơ bản là mức độ dịch vụ được đặt trong nhân hệ điều hành; vi nhân hướng đến nhân nhỏ hơn và tách nhiều dịch vụ ra ngoài.";
  });

  // 2.2: câu Bloom 4 đều là phân tích cấu trúc mạch I/O, không phải hỏi
  // riêng chức năng I/O số hay chọn giao tiếp ngoại vi.
  const io = chapter("giao-tiep-io-co-ban");
  io.questions
    .filter((item) => item.bloom === 4 && item.number !== 90)
    .forEach((item) => {
      item.topic = "cấu trúc mạch I/O";
    });
  [16, 17].forEach((number) => {
    io.questions.find((item) => item.number === number).topic = "cấu trúc mạch I/O";
  });
  revise("giao-tiep-io-co-ban", 90, {
    bloom: 2,
    stem: "Khi chọn giữa GPIO, ADC, PWM, I2C, SPI và UART cho một ngoại vi, nhóm ràng buộc nào cần được xem xét?"
  });
  append("giao-tiep-io-co-ban", [
    {
      id: "giao-tiep-io-co-ban-interface-constraints-q101",
      bloom: 1,
      outline: "2.2",
      source: "2.2 Giao tiếp I/O cơ bản",
      topic: "chọn giao tiếp ngoại vi theo ràng buộc",
      stem: "Khi chọn giao tiếp giữa vi điều khiển và một ngoại vi, tập hợp nào gồm các ràng buộc thiết kế cần xem xét?",
      choices: [
        choice("Số chân cần dùng, tốc độ yêu cầu, khoảng cách, môi trường nhiễu và số thiết bị cần kết nối.", true, "Đây là các ràng buộc thực tế ảnh hưởng trực tiếp đến việc chọn GPIO, ADC, PWM, I2C, SPI hay UART."),
        choice("Màu của bo mạch, tên hãng sản xuất và kích thước chữ in trên nhãn linh kiện.", false, "Các yếu tố này không quyết định đặc tính điện hoặc khả năng giao tiếp của ngoại vi."),
        choice("Chỉ phiên bản hệ điều hành của máy tính dùng để lập trình vi điều khiển.", false, "Máy tính phát triển có thể ảnh hưởng công cụ lập trình, nhưng không phải ràng buộc chính để chọn giao tiếp phần cứng."),
        choice("Chỉ số lượng câu lệnh của chương trình ứng dụng, không cần xét đường dây hay thiết bị ngoài.", false, "Giao tiếp phần cứng phụ thuộc rõ ràng vào đường truyền, ngoại vi và các ràng buộc điện hoặc thời gian.")
      ]
    }
  ]);

  // 2.3: ESD được kiểm tra ở mức nhớ/hiểu. Các câu chọn giải pháp bảo vệ
  // vẫn là trắc nghiệm, không yêu cầu tự vẽ hay tự thiết kế mạch.
  [3, 60, 93].forEach((number) => {
    revise("bao-ve-cong-io", number, {
      bloom: 2,
      stem: "Nhận định nào đúng về nguy cơ phóng tĩnh điện tại cổng tín hiệu nối ra bên ngoài thiết bị?"
    });
  });

  append("phan-cung-nhung", [
    {
      id: "phan-cung-nhung-average-current-q101",
      bloom: 3,
      outline: "1.2",
      source: "1.2 Phần cứng nhúng",
      topic: "vấn đề năng lượng",
      stem: "Một thiết bị hoạt động trong 2 giây với dòng 20 mA và ngủ trong 98 giây với dòng 0,20 mA. Bỏ qua dòng của các mạch khác, dòng trung bình trong chu kỳ 100 giây gần giá trị nào nhất?",
      choices: [
        choice("0,20 mA.", false, "Giá trị này chỉ là dòng ở chế độ ngủ, chưa tính phần thời gian thiết bị hoạt động."),
        choice("0,60 mA.", true, "Dòng trung bình là (20 x 2 + 0,20 x 98) / 100 = 0,596 mA, xấp xỉ 0,60 mA."),
        choice("2,00 mA.", false, "Kết quả này không thực hiện trung bình theo thời gian của hai chế độ hoạt động."),
        choice("20,0 mA.", false, "Đây là dòng khi hoạt động liên tục, trong khi thiết bị ngủ phần lớn chu kỳ.")
      ]
    },
    {
      id: "phan-cung-nhung-energy-wh-q102",
      bloom: 3,
      outline: "1.2",
      source: "1.2 Phần cứng nhúng",
      topic: "vấn đề năng lượng",
      stem: "Một nút nhúng dùng nguồn 3,3 V, dòng trung bình 15 mA và hoạt động liên tục trong 2 giờ. Bỏ qua tổn hao bộ nguồn, năng lượng tiêu thụ gần giá trị nào nhất?",
      choices: [
        choice("9,9 mWh.", false, "Giá trị này nhỏ hơn kết quả đúng mười lần."),
        choice("99 mWh.", true, "Công suất trung bình là 3,3 V x 0,015 A = 0,0495 W; nhân 2 giờ được 0,099 Wh, tức 99 mWh."),
        choice("0,99 Wh.", false, "Giá trị này lớn hơn kết quả đúng mười lần."),
        choice("9,9 Wh.", false, "Giá trị này lớn hơn kết quả đúng một trăm lần.")
      ]
    }
  ]);

  append("phan-mem-nhung", [
    {
      id: "phan-mem-nhung-build-workflow-q101",
      bloom: 3,
      outline: "1.3",
      source: "1.3 Phần mềm nhúng",
      topic: "quy trình dịch sang mã máy",
      stem: "Một dự án có hai tệp mã nguồn C và một thư viện đã biên dịch. Trình tự nào phù hợp để tạo chương trình nhúng cuối cùng?",
      choices: [
        choice("Bộ nạp đọc trực tiếp mã C, sau đó bộ liên kết tạo các tệp đối tượng và trình biên dịch nạp chương trình vào MCU.", false, "Bộ nạp không dịch mã C, còn bộ liên kết nhận các tệp đối tượng và thư viện chứ không tạo chúng từ mã nguồn C."),
        choice("Tiền xử lý và biên dịch từng tệp nguồn thành tệp đối tượng, dùng bộ liên kết ghép các tệp đối tượng với thư viện thành tệp thực thi, rồi nạp tệp đó vào hệ đích.", true, "Đây là cách áp dụng đúng vai trò của tiền xử lý, trình biên dịch hoặc hợp dịch, bộ liên kết và bước nạp chương trình."),
        choice("Bộ liên kết chạy trước để biến thư viện thành mã C, sau đó bộ tiền xử lý tạo chương trình thực thi trực tiếp.", false, "Bộ liên kết không chuyển thư viện thành mã C, còn bộ tiền xử lý không sinh tệp thực thi hoàn chỉnh."),
        choice("Trình biên dịch nạp thẳng từng tệp nguồn vào RAM đích; không cần tệp đối tượng hay bộ liên kết khi có thư viện.", false, "Nhiều tệp nguồn và thư viện cần được liên kết để giải quyết các tham chiếu trước khi tạo chương trình cuối cùng.")
      ]
    },
    {
      id: "phan-mem-nhung-startup-memory-q102",
      bloom: 3,
      outline: "1.3",
      source: "1.3 Phần mềm nhúng",
      topic: "bộ nạp khởi động và khởi động hệ thống",
      stem: "Sau khi reset, chương trình có biến khởi tạo cần nằm trong RAM và biến toàn cục chưa khởi tạo phải bắt đầu bằng 0. Trước khi gọi hàm chính, mã khởi động cần làm gì?",
      choices: [
        choice("Gọi ngay hàm chính để chương trình tự tạo ngăn xếp và tự xóa mọi vùng nhớ cần thiết.", false, "Hàm chính giả định môi trường chạy đã được chuẩn bị; ngăn xếp và các vùng dữ liệu phải được khởi tạo trước đó."),
        choice("Thiết lập ngăn xếp, chép dữ liệu khởi tạo từ bộ nhớ không bay hơi sang RAM, xóa vùng biến chưa khởi tạo rồi mới gọi hàm chính.", true, "Đây là các nhiệm vụ cốt lõi của mã khởi động để môi trường thực thi C/C++ có trạng thái xác định."),
        choice("Xóa toàn bộ bộ nhớ Flash rồi gọi hàm chính để tránh dùng dữ liệu cũ.", false, "Flash thường chứa mã chương trình và dữ liệu khởi tạo; xóa Flash sẽ làm chương trình không thể chạy."),
        choice("Chỉ bật ngoại vi giao tiếp và bỏ qua việc khởi tạo RAM vì RAM luôn giữ đúng dữ liệu sau reset.", false, "Nội dung RAM không phải lúc nào cũng thỏa điều kiện chương trình cần, nhất là với vùng biến chưa khởi tạo.")
      ]
    },
    {
      id: "phan-mem-nhung-safe-update-q103",
      bloom: 3,
      outline: "1.3",
      source: "1.3 Phần mềm nhúng",
      topic: "bộ nạp khởi động và khởi động hệ thống",
      stem: "Thiết bị hỗ trợ cập nhật phần mềm từ xa và có thể mất nguồn giữa chừng. Sau khi nhận xong ảnh mới, bước nào cần thực hiện trước khi khởi động ảnh đó?",
      choices: [
        choice("Đánh dấu ảnh mới là hợp lệ ngay khi nhận byte cuối cùng để rút ngắn thời gian cập nhật.", false, "Việc truyền đủ số byte chưa chứng minh ảnh không bị lỗi hoặc bị hỏng do gián đoạn truyền."),
        choice("Kiểm tra tính toàn vẹn và tính hợp lệ của ảnh mới, chỉ kích hoạt sau khi kiểm tra thành công và vẫn giữ đường phục hồi an toàn.", true, "Bộ nạp khởi động cần tránh khởi động một ảnh lỗi và nên giữ được khả năng phục hồi khi cập nhật thất bại."),
        choice("Xóa ngay ảnh cũ trước khi kiểm tra ảnh mới để giải phóng bộ nhớ càng sớm càng tốt.", false, "Làm vậy có thể khiến thiết bị không còn ảnh chạy được nếu ảnh mới không hợp lệ."),
        choice("Bỏ qua mọi kiểm tra vì mã đã được tạo bởi cùng một dự án phần mềm.", false, "Lỗi truyền, lỗi ghi Flash hoặc mất nguồn vẫn có thể làm ảnh phần mềm hỏng.")
      ]
    }
  ]);

  append("signal-integrity-emc", [
    {
      id: "signal-integrity-emc-loop-area-q101",
      bloom: 3,
      outline: "2.5",
      source: "2.5 Signal Integrity và EMC",
      topic: "ghép cảm ứng từ",
      stem: "Hai cách đi dây chịu cùng từ trường biến thiên. Nếu diện tích vòng dòng hồi tiếp được giảm từ 24 cm² xuống 6 cm², còn các điều kiện khác không đổi, điện áp nhiễu cảm ứng xấp xỉ còn bao nhiêu so với ban đầu?",
      choices: [
        choice("Còn một nửa.", false, "Diện tích giảm theo tỉ lệ 6/24, không phải 1/2."),
        choice("Còn một phần tư.", true, "Với cùng từ trường và tốc độ biến thiên, điện áp cảm ứng tỉ lệ với diện tích vòng; 6/24 = 1/4."),
        choice("Không đổi vì chỉ có chiều dài dây mới ảnh hưởng nhiễu cảm ứng.", false, "Diện tích vòng dòng hồi tiếp là yếu tố quan trọng đối với ghép cảm ứng từ."),
        choice("Tăng gấp bốn vì các dây nằm gần nhau hơn.", false, "Giảm diện tích vòng làm giảm từ thông móc vòng, nên xu hướng là giảm nhiễu cảm ứng.")
      ]
    },
    {
      id: "signal-integrity-emc-conducted-noise-q102",
      bloom: 3,
      outline: "2.5",
      source: "2.5 Signal Integrity và EMC",
      topic: "nhiễu truyền dẫn",
      stem: "Một bo điều khiển bị nhiễu chủ yếu qua đường nguồn 24 V dùng chung với tải đóng cắt, không phải do bức xạ qua không gian. Biện pháp đầu tiên nào tác động trực tiếp nhất vào đường truyền nhiễu này?",
      choices: [
        choice("Bổ sung lọc phù hợp trên đường nguồn, tụ tách nguồn gần tải và kiểm soát đường hồi dòng chung.", true, "Nhiễu đang truyền dẫn theo nguồn chung, nên lọc nguồn, tách nguồn và giảm trở kháng chung là các biện pháp trực tiếp."),
        choice("Chỉ bọc toàn bộ vỏ thiết bị bằng kim loại mà không xử lý đường nguồn.", false, "Che chắn hữu ích với nhiễu bức xạ, nhưng không xử lý trực tiếp nhiễu truyền theo dây nguồn chung."),
        choice("Tăng tần số xung nhịp của vi điều khiển để tín hiệu số mạnh hơn.", false, "Tăng tần số có thể làm nhiễu phát xạ nặng hơn và không loại bỏ nhiễu dẫn vào theo nguồn."),
        choice("Chỉ tăng độ sáng đèn báo để dễ quan sát trạng thái của bo điều khiển.", false, "Đèn báo không làm thay đổi đường truyền hoặc biên độ nhiễu trên nguồn.")
      ]
    },
    {
      id: "signal-integrity-emc-long-cable-q103",
      bloom: 3,
      outline: "2.5",
      source: "2.5 Signal Integrity và EMC",
      topic: "chọn dây truyền tín hiệu",
      stem: "Cảm biến phải nối bằng dây dài qua khu vực có dòng đóng cắt lớn. Phương án đi dây nào phù hợp hơn để giảm nguy cơ thu nhiễu?",
      choices: [
        choice("Đi dây đơn lẻ, tách xa đường hồi dòng để giảm số lượng dây trong bó cáp.", false, "Tách xa đường hồi dòng làm diện tích vòng lớn hơn, dễ thu nhiễu cảm ứng hơn."),
        choice("Dùng cặp dây xoắn hoặc truyền vi sai khi phù hợp, giữ đường hồi dòng gần đường tín hiệu và tránh đi song song lâu với đường công suất.", true, "Các biện pháp này giảm diện tích vòng, giảm nhiễu đồng pha và giảm ghép từ với đường công suất."),
        choice("Đi dây tín hiệu song song sát với dây cấp cho tải công suất để hai dây cùng chiều dài.", false, "Đi song song lâu gần đường công suất làm tăng ghép cảm ứng và ghép điện dung."),
        choice("Tăng tốc độ cạnh tín hiệu hết mức để nhiễu không kịp tác động.", false, "Cạnh quá nhanh có thể làm phát xạ và phản xạ tăng, không phải biện pháp chống nhiễu tổng quát.")
      ]
    }
  ]);

  data.version = "2026-07-12-outline-aligned";
})();
