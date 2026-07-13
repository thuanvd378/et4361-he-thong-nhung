(() => {
  const embedded = window.EMBEDDED_QUIZ_DATA;
  if (!embedded) return;

  const replaceTerms = (value, rules) => rules.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    String(value || "")
  );

  // Các tên này được giữ theo cách viết trong giáo trình hoặc cách gọi kỹ thuật phổ biến.
  const commonRules = [
    [/ngăn bộ nạp khởi động nhầm/giu, "ngăn Bootloader khởi động nhầm"],
    [/bộ nạp hệ thống/giu, "System Bootloader"],
    [/bộ nạp tự xây dựng/giu, "Custom Bootloader"],
    [/bộ nạp tùy biến/giu, "Custom Bootloader"],
    [/bộ nạp riêng/giu, "Custom Bootloader"],
    [/bộ nạp khởi động/giu, "Bootloader"],
    [/tệp đối tượng/giu, "Object File"],
    [/mã đối tượng/giu, "Object Code"],
    [/tệp thực thi/giu, "Executable File"],
    [/tệp tiêu đề/giu, "Header File"],
    [/tệp mã nguồn/giu, "Source File"],
    [/tệp nguồn/giu, "Source File"],
    [/mã nguồn/giu, "Source Code"],
    [/mã máy/giu, "Machine Code"],
    [/mã hợp ngữ/giu, "Assembly Code"],
    [/tệp hợp ngữ/giu, "Assembly File"],
    [/hợp ngữ/giu, "Assembly"],
    [/trình hợp dịch/giu, "Assembler"],
    [/bộ liên kết/giu, "Linker"],
    [/trình liên kết/giu, "Linker"],
    [/trình biên dịch/giu, "Compiler"],
    [/các thư viện/giu, "các Library"],
    [/thư viện/giu, "Library"],
    [/ký hiệu chưa được định nghĩa/giu, "Undefined Symbol"],
    [/tham chiếu chưa được giải quyết/giu, "Unresolved Reference"],
    [/lỗi không tìm thấy tham chiếu/giu, "lỗi Undefined Reference"],
    [/lỗi lỗi Undefined Reference/giu, "lỗi Undefined Reference"],
    [/bán song công/giu, "Half-duplex"],
    [/song công toàn phần/giu, "Full-duplex"],
    [/đơn công/giu, "Simplex"],
    [/bit bắt đầu/giu, "Start bit"],
    [/bit dừng/giu, "Stop bit"],
    [/bit chẵn lẻ/giu, "Parity bit"],
    [/tỷ lệ độ rộng xung/giu, "Duty Cycle"],
    [/tốc độ bit/giu, "Bit rate"],
    [/tốc độ baud/giu, "Baud rate"],
    [/thông lượng/giu, "Throughput"],
    [/băng thông/giu, "Bandwidth"],
    [/độ trễ/giu, "Latency"],
    [/truyền một dây tham chiếu mass/giu, "Single-ended"],
    [/một dây tham chiếu mass/giu, "Single-ended"],
    [/cực máng hở/giu, "Open-drain"],
    [/cực góp hở/giu, "Open-collector"],
    [/collector hở/giu, "Open-collector"],
    [/đẩy-kéo/giu, "Push-pull"],
    [/trở kháng cao/giu, "High-impedance"],
    [/vi sai/giu, "Differential"],
    [/bộ giám sát treo hệ thống/giu, "Watchdog Timer"],
    [/trình phục vụ ngắt/giu, "ISR (Interrupt Service Routine)"],
    [/bộ định thời/giu, "Timer"],
    [/cạnh lên/giu, "Rising Edge"],
    [/cạnh xuống/giu, "Falling Edge"],
    [/mã khởi động/giu, "Startup Code"],
    [/vectơ khởi động lại/giu, "Reset Vector"],
    [/vectơ khởi động/giu, "Reset Vector"],
    [/bảng vectơ ngắt/giu, "Interrupt Vector Table"],
    [/bảng vectơ/giu, "Vector Table"],
    [/vectơ/giu, "Vector"],
    [/con trỏ ngăn xếp chính \(MSP\)/giu, "MSP (Main Stack Pointer)"],
    [/con trỏ ngăn xếp chính MSP/giu, "MSP (Main Stack Pointer)"],
    [/con trỏ ngăn xếp chính/giu, "MSP (Main Stack Pointer)"],
    [/ngăn xếp chính MSP/giu, "MSP (Main Stack Pointer)"],
    [/ngăn xếp chính/giu, "Main Stack Pointer"],
    [/tệp liên kết/giu, "Linker Script"],
    [/bit cầu chì/giu, "Fuse Bit"],
    [/thanh ghi dự phòng/giu, "Backup Register"],
    [/bộ nhớ hệ thống/giu, "System Memory"],
    [/ảnh thực thi/giu, "Executable Image"],
    [/tín hiệu khởi động lại/giu, "tín hiệu Reset"],
    [/\breset\b/giu, "Reset"],
    [/\bfirmware\b/giu, "Firmware"],
    [/\bbootloader\b/giu, "Bootloader"],
    [/\bcompiler\b/giu, "Compiler"],
    [/\bassembler\b/giu, "Assembler"],
    [/\blinker\b/giu, "Linker"],
    [/\bloader\b/giu, "Loader"],
    [/\bpreprocessing\b/giu, "Preprocessing"],
    [/\bmiddleware\b/giu, "Middleware"],
    [/\bprocess\b/giu, "Process"],
    [/\btask\b/giu, "Task"],
    [/\bthread\b/giu, "Thread"],
    [/\bkernel\b/giu, "Kernel"],
    [/\bmetadata\b/giu, "Metadata"],
    [/\bhardware layer\b/giu, "Hardware Layer"],
    [/\bstart bit\b/giu, "Start bit"],
    [/\bstop bit\b/giu, "Stop bit"],
    [/\bparity bit\b/giu, "Parity bit"],
    [/\bduty cycle\b/giu, "Duty Cycle"],
    [/\bbit rate\b/giu, "Bit rate"],
    [/\bbaud rate\b/giu, "Baud rate"],
    [/\bthroughput\b/giu, "Throughput"],
    [/\bbandwidth\b/giu, "Bandwidth"],
    [/\blatency\b/giu, "Latency"],
    [/\bhalf-duplex\b/giu, "Half-duplex"],
    [/\bfull-duplex\b/giu, "Full-duplex"],
    [/\bsimplex\b/giu, "Simplex"],
    [/\bchip select\b/giu, "Chip Select"],
    [/\bsingle-ended\b/giu, "Single-ended"],
    [/\bdifferential\b/giu, "Differential"],
    [/\bpush-pull\b/giu, "Push-pull"],
    [/\bopen-drain\b/giu, "Open-drain"],
    [/\bopen-collector\b/giu, "Open-collector"],
    [/\bhigh-impedance\b/giu, "High-impedance"]
  ];

  const softwareRules = [
    [/lớp phần mềm ứng dụng/giu, "Application Software Layer"],
    [/lớp phần mềm hệ thống/giu, "System Software Layer"],
    [/lớp phần mềm trung gian/giu, "Middleware Layer"],
    [/lớp trình điều khiển thiết bị/giu, "Device Driver Layer"],
    [/lớp hệ điều hành/giu, "Operating System Layer"],
    [/trình điều khiển thiết bị/giu, "Device Driver"],
    [/phần mềm trung gian/giu, "Middleware"],
    [/phần mềm ứng dụng/giu, "Application Software"],
    [/phần mềm hệ thống/giu, "System Software"],
    [/phần mềm nhúng/giu, "Firmware"],
    [/hệ điều hành nhúng/giu, "Embedded OS"],
    [/hệ điều hành/giu, "OS"],
    [/nhân nguyên khối/giu, "Monolithic Kernel"],
    [/vi nhân/giu, "Microkernel"],
    [/nhân hệ điều hành/giu, "Kernel"],
    [/lời gọi hệ thống/giu, "System Call"],
    [/không gian người dùng/giu, "User Space"],
    [/không gian nhân/giu, "Kernel Space"],
    [/bộ lập lịch/giu, "Scheduler"],
    [/lập lịch/giu, "Scheduling"],
    [/trình điều khiển/giu, "Driver"],
    [/giai đoạn tiền xử lý/giu, "giai đoạn Preprocessing"],
    [/bước tiền xử lý/giu, "bước Preprocessing"],
    [/chỉ thị tiền xử lý/giu, "Preprocessor Directive"],
    [/định nghĩa tiền xử lý/giu, "Preprocessor Definition"],
    [/bộ tiền xử lý/giu, "Pre-processor"],
    [/Tiền xử lý xử lý/gu, "Pre-processor xử lý"],
    [/tiền xử lý/giu, "Preprocessing"],
    [/hàm chính/giu, "main()"],
    [/vùng dữ liệu khởi tạo/giu, "vùng .data"],
    [/vùng biến chưa khởi tạo/giu, "vùng .bss"],
    [/ngăn xếp/giu, "Stack"],
    [/vùng đống/giu, "vùng Heap"]
  ];

  const osRules = [
    [/các tiến trình/giu, "các Process"],
    [/tiến trình/giu, "Process"],
    [/các tác vụ/giu, "các Task"],
    [/tác vụ/giu, "Task"],
    [/các luồng/giu, "các Thread"],
    [/luồng/giu, "Thread"]
  ];

  const toolchainRules = [
    [/bộ nạp/giu, "Loader"],
    [/bản chương trình cuối/giu, "Final Program Image"],
    [/bản chương trình/giu, "Program Image"],
    [/ảnh chương trình/giu, "Program Image"],
    [/ảnh đã liên kết/giu, "Linked Image"],
    [/ảnh cuối/giu, "Final Image"],
    [/bản đồ nhớ/giu, "Memory Map"]
  ];

  const bootloaderRules = [
    [/bộ nạp Blue Pill/giu, "Bootloader trên Blue Pill"],
    [/vùng bộ nạp/giu, "Bootloader Region"],
    [/chế độ bộ nạp/giu, "Bootloader Mode"],
    [/bộ nạp/giu, "Bootloader"],
    [/cập nhật trong ứng dụng/giu, "IAP (In-Application Programming)"],
    [/ảnh phần mềm/giu, "Firmware Image"],
    [/ảnh ứng dụng/giu, "Application Image"],
    [/ảnh chương trình/giu, "Program Image"],
    [/ảnh thực thi/giu, "Executable Image"],
    [/ảnh hưởng/giu, "tác động"],
    [/(?<![\p{L}\p{N}_])ảnh(?![\p{L}\p{N}_])/giu, "Firmware Image"],
    [/vùng metadata/giu, "Metadata Region"],
    [/trang metadata/giu, "Metadata Page"],
    [/vùng ứng dụng/giu, "Application Region"],
    [/vùng ảnh/giu, "Image Slot"],
    [/một khối Flash vật lý/giu, "một Physical Flash Bank"],
    [/cùng khối vật lý/giu, "cùng Physical Bank"],
    [/ngân hàng Flash vật lý/giu, "Physical Flash Bank"],
    [/ngân hàng vật lý/giu, "Physical Bank"],
    [/ngân hàng Flash/giu, "Flash Bank"],
    [/ngân hàng/giu, "Bank"],
    [/các trang Flash/giu, "các Flash Page"],
    [/trang Flash/giu, "Flash Page"],
    [/trang (?=\d)/giu, "Page "],
    [/(?<![\p{L}\p{N}_])trang(?![\p{L}\p{N}_])/giu, "Page"],
    [/giá trị đánh dấu/giu, "Magic Number"],
    [/tệp nhị phân/giu, "Binary File"],
    [/tệp `\.ld`/giu, "Linker Script `.ld`"],
    [/khởi động lại bằng phần mềm/giu, "Software Reset"],
    [/khởi động lại mềm/giu, "Soft Reset"],
    [/khởi động lại cứng/giu, "Hard Reset"],
    [/khởi động lại/giu, "Reset"],
    [/hủy cấu hình/giu, "De-init"]
  ];

  const flashGeometryRules = [
    [/các khối Flash/giu, "các Flash Sector"],
    [/khối Flash/giu, "Flash Sector"],
    [/các khối/giu, "các Sector"],
    [/khối/giu, "Sector"],
    [/các trang/giu, "các Page"],
    [/mỗi trang/giu, "mỗi Page"],
    [/trang/giu, "Page"]
  ];

  const dataBlockRules = [
    [/các khối/giu, "các data block"],
    [/mỗi khối/giu, "mỗi data block"],
    [/từng khối/giu, "từng data block"],
    [/khối/giu, "data block"]
  ];

  const spiRules = [
    [/tín hiệu chọn chip/giu, "tín hiệu Chip Select (CS)"],
    [/đường chọn chip/giu, "đường Chip Select (CS)"],
    [/chân chọn chip/giu, "chân Chip Select (CS)"],
    [/chọn chip/giu, "Chip Select (CS)"]
  ];

  const masterSlaveRules = [
    [/thiết bị chủ/giu, "Master"],
    [/thiết bị tớ/giu, "Slave"],
    [/bên chủ/giu, "Master"],
    [/bên tớ/giu, "Slave"],
    [/chủ-tớ/giu, "Master-Slave"],
    [/từ chủ tới tớ/giu, "từ Master tới Slave"],
    [/từ tớ tới chủ/giu, "từ Slave tới Master"],
    [/từ chủ ra tớ/giu, "từ Master ra Slave"],
    [/từ tớ về chủ/giu, "từ Slave về Master"],
    [/do chủ tạo/giu, "do Master tạo"],
    [/số tớ/giu, "số Slave"],
    [/mỗi tớ/giu, "mỗi Slave"],
    [/một tớ/giu, "một Slave"],
    [/nhiều tớ/giu, "nhiều Slave"],
    [/\bmaster\b/giu, "Master"],
    [/\bslave\b/giu, "Slave"]
  ];

  const contextFor = (question, chapterId, sourceQuestion) => {
    const source = sourceQuestion || question;
    const context = [source.id, source.topic, source.stem, source.coverage, chapterId]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("vi");
    return {
      software: chapterId === "phan-mem-nhung" || /^phan-mem-nhung-/.test(source.id || ""),
      toolchain: /assembler-linker|assembler, linker và loader|build-pipeline|source-machine|quy trình dịch|mã nguồn và mã máy|tệp đối tượng/.test(context),
      bootloader: Boolean(source.coverage) || /bootloader|secure-boot|safe-update|bộ nạp khởi động|khởi động an toàn và cập nhật/.test(context),
      os: /hệ điều hành|embedded-os|middleware|kernel|process|thread|lập lịch/.test(context),
      spi: /(^|[^a-z])spi([^a-z]|$)/.test(context),
      serialBus: /(^|[^a-z])(spi|i2c)([^a-z]|$)/.test(context),
      flashGeometry: /sector-vs-page|page-calculation|sector-strategy|bluepill-map|page-address-calculation/.test(context),
      dataBlock: /block-transfer-error-flow/.test(context)
    };
  };

  const normalizeText = (value, context) => {
    let result = replaceTerms(value, commonRules);
    if (context.software) result = replaceTerms(result, softwareRules);
    if (context.os) result = replaceTerms(result, osRules);
    if (context.toolchain) result = replaceTerms(result, toolchainRules);
    if (context.bootloader) result = replaceTerms(result, bootloaderRules);
    if (context.flashGeometry) result = replaceTerms(result, flashGeometryRules);
    if (context.dataBlock) result = replaceTerms(result, dataBlockRules);
    if (context.spi) result = replaceTerms(result, spiRules);
    if (context.serialBus) result = replaceTerms(result, masterSlaveRules);
    return result;
  };

  const normalizeQuestion = (question, chapterId, sourceQuestion) => {
    const context = contextFor(question, chapterId, sourceQuestion);
    ["stem", "explanation", "topic"].forEach((field) => {
      if (typeof question[field] === "string") question[field] = normalizeText(question[field], context);
    });
    question.choices?.forEach((choice) => {
      if (typeof choice.text === "string") choice.text = normalizeText(choice.text, context);
      if (typeof choice.reason === "string") choice.reason = normalizeText(choice.reason, context);
    });
  };

  const sourceQuestions = new Map();
  embedded.chapters.forEach((chapter) => {
    chapter.questions.forEach((question) => sourceQuestions.set(question.id, { question, chapterId: chapter.id }));
  });
  embedded.chapters.forEach((chapter) => {
    chapter.questions.forEach((question) => normalizeQuestion(question, chapter.id));
  });

  window.EXAM_QUIZ_DATA?.exams?.forEach((exam) => {
    exam.questions.forEach((question) => {
      const source = sourceQuestions.get(question.sourceQuestionId);
      normalizeQuestion(question, source?.chapterId || "", source?.question);
    });

    if (exam.essay) {
      const essayContextText = JSON.stringify(exam.essay).toLocaleLowerCase("vi");
      const essayContext = {
        software: /phần mềm|firmware|compiler|assembler|linker|loader|hệ điều hành/.test(essayContextText),
        toolchain: /compiler|assembler|linker|loader|tệp đối tượng|mã nguồn|mã máy/.test(essayContextText),
        bootloader: /bootloader|bộ nạp khởi động|khởi động an toàn/.test(essayContextText),
        os: /hệ điều hành|middleware|kernel|process|thread|lập lịch/.test(essayContextText),
        spi: /(^|[^a-z])spi([^a-z]|$)/.test(essayContextText),
        serialBus: /(^|[^a-z])(spi|i2c)([^a-z]|$)/.test(essayContextText),
        flashGeometry: /sector|page|khối flash|trang flash/.test(essayContextText),
        dataBlock: /data block|khối dữ liệu/.test(essayContextText)
      };
      const normalizeEssay = (value) => {
        if (typeof value === "string") return normalizeText(value, essayContext);
        if (Array.isArray(value)) return value.map(normalizeEssay);
        if (value && typeof value === "object") {
          Object.keys(value).forEach((key) => { value[key] = normalizeEssay(value[key]); });
        }
        return value;
      };
      normalizeEssay(exam.essay);
    }
  });
})();
