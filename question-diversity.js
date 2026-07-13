(() => {
  const datasets = [window.EMBEDDED_QUIZ_DATA, window.COMPONENT_QUIZ_DATA].filter(Boolean);
  if (!datasets.length) return;

  const bloomLabels = {
    1: "Nhớ",
    2: "Hiểu",
    3: "Vận dụng",
    4: "Phân tích",
    5: "Đánh giá"
  };
  const diversityMeta = new Map();

  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const contextPrefixes = [
    /^voi mot bai toan nhung thuc te /,
    /^trong boi canh he thong nhung /,
    /^trong mot tinh huong thiet ke /,
    /^khi kiem tra lua chon ky thuat /,
    /^khi phan tich thiet ke nhung /,
    /^doi voi mot he thong nhung /,
    /^xet mot he thong nhung /
  ];

  const canonicalStem = (value) => contextPrefixes.reduce(
    (result, prefix) => result.replace(prefix, ""),
    normalize(value)
  );

  const questionSignature = (question) => [
    canonicalStem(question.stem),
    ...question.choices.map((choice) => normalize(choice.text)).sort()
  ].join("|");

  const asksForIncorrectStatement = (question) => (
    /(?:phát biểu|nhận định|phương án) nào (?:là )?sai|không đúng|cần bác bỏ|sai hoặc dễ gây nhầm/i.test(question.stem)
    || /chọn phát biểu sai/i.test(question.type || "")
  );

  const capitalize = (value) => value
    ? value.charAt(0).toLocaleUpperCase("vi-VN") + value.slice(1)
    : value;

  const standaloneReason = (value) => {
    let result = String(value || "").trim()
      .replace(/^Nhận định này sai:\s*/i, "")
      .replace(/^Phát biểu này đúng vì:\s*/i, "")
      .replace(/^Phát biểu này đúng vì\s*/i, "")
      .replace(/^Đây là nguyên nhân kỹ thuật trực tiếp của phát biểu\.?$/i, "Nguyên nhân nằm ở cơ chế vật lý hoặc logic được mô tả trong nhận định")
      .replace(/^Lý do này dùng để bác bỏ một phát biểu sai, không giải thích trực tiếp phát biểu đang hỏi\.?$/i, "Lập luận này chỉ phù hợp với một nhận định khác trong cùng chủ đề")
      .replace(/^Cách này\b/i, "Phương án đó")
      .replace(/^Giá trị này\b/i, "Giá trị được nêu")
      .replace(/^Kết quả này\b/i, "Kết quả được nêu");
    if (!/[.!?]$/.test(result)) result += ".";
    return capitalize(result);
  };

  const shuffleReasonsForDistractors = (question, focusChoice) => {
    const candidates = question.choices
      .filter((choice) => choice !== focusChoice)
      .map((choice) => standaloneReason(choice.reason));
    const unique = [];
    candidates.forEach((candidate) => {
      if (!unique.some((item) => normalize(item) === normalize(candidate))) unique.push(candidate);
    });
    while (unique.length < 3) {
      const fallback = question.choices[unique.length % question.choices.length].text;
      unique.push(`Lập luận này dựa trên nhận định: ${fallback}`);
    }
    return unique.slice(0, 3);
  };

  const misconceptionStem = (question, focusChoice, supportsTrueStatement) => {
    const claim = focusChoice.text.replace(/[.!?]\s*$/, "");
    const topic = question.topic || "chủ đề đang xét";
    if (supportsTrueStatement) {
      if (question.bloom >= 4) {
        return `Khi phân tích ${topic}, có ý kiến muốn bác bỏ nhận định: “${claim}”. Lập luận nào chứng minh nhận định này vẫn phù hợp?`;
      }
      return `Một người học chưa đồng ý với nhận định về ${topic}: “${claim}”. Giải thích nào cho thấy nhận định này là đúng?`;
    }
    if (question.bloom === 5) {
      return `Khi đánh giá một phương án liên quan đến ${topic}, có đề xuất: “${claim}”. Căn cứ nào phù hợp nhất để bác bỏ đề xuất này?`;
    }
    if (question.bloom === 4) {
      return `Khi phân tích ${topic}, một nhóm đưa ra nhận định: “${claim}”. Lập luận nào xác định đúng nguyên nhân nhận định này chưa phù hợp?`;
    }
    if (question.bloom === 3) {
      return `Trong một tình huống áp dụng ${topic}, kỹ thuật viên làm theo nhận định: “${claim}”. Giải thích nào chỉ ra đúng điều cần sửa?`;
    }
    return `Một người học đưa ra nhận định về ${topic}: “${claim}”. Giải thích nào sửa đúng chỗ nhầm lẫn trong nhận định này?`;
  };

  const rewriteAsMisconceptionCheck = (question, duplicateIndex) => {
    const asksIncorrect = asksForIncorrectStatement(question);
    const eligible = asksIncorrect
      ? question.choices.filter((choice) => !choice.correct)
      : question.choices.filter((choice) => !choice.correct);
    const focusChoice = eligible[(duplicateIndex + question.number) % eligible.length];
    const correctText = standaloneReason(focusChoice.reason);
    const distractors = shuffleReasonsForDistractors(question, focusChoice);
    const correctSlot = question.choices.findIndex((choice) => choice.correct);
    const originalChoices = question.choices.map((choice) => ({
      text: choice.text,
      reason: choice.reason
    }));
    let distractorIndex = 0;

    diversityMeta.set(question.id, {
      focusText: focusChoice.text,
      rationale: correctText,
      supportsTrueStatement: asksIncorrect,
      originalChoices,
      correctSlot
    });

    question.stem = misconceptionStem(question, focusChoice, asksIncorrect);
    question.choices.forEach((choice, index) => {
      if (index === correctSlot) {
        choice.text = correctText;
        choice.correct = true;
        choice.reason = `${correctText} Đây là lập luận trực tiếp đối với nhận định được nêu trong câu hỏi.`;
      } else {
        choice.text = distractors[distractorIndex++];
        choice.correct = false;
        choice.reason = "Lập luận này đề cập một khía cạnh khác của chủ đề nhưng không giải quyết trực tiếp nhận định đang được xem xét.";
      }
    });

    if (Number.isInteger(question.bloom) && question.bloom === 1) {
      question.bloom = 2;
      question.type = `Bloom 2 - ${bloomLabels[2]}`;
    } else if (!Number.isInteger(question.bloom) && /nhận biết|chọn phát biểu sai/i.test(question.type || "")) {
      question.type = "Giải thích hiểu nhầm";
    }
    question.explanation = `${correctText} Câu hỏi này tập trung vào việc nhận diện và sửa một hiểu nhầm cụ thể về ${question.topic}.`;
  };

  const numericVariants = {
    "tính mã ADC lý tưởng": [
      {
        stem: "ADC 10 bit dùng Vref = 5,0 V và nhận Vin = 1,25 V. Mã số lý tưởng gần giá trị nào nhất?",
        correct: "256.",
        distractors: ["128.", "512.", "768."],
        explanation: "Với mã từ 0 đến 1023, D ≈ (1,25/5,0) × 1023 = 255,75, làm tròn gần 256."
      },
      {
        stem: "ADC 12 bit dùng Vref = 4,096 V và nhận Vin = 1,024 V. Mã số lý tưởng gần giá trị nào nhất?",
        correct: "1024.",
        distractors: ["512.", "2048.", "3072."],
        explanation: "D ≈ (1,024/4,096) × 4095 = 1023,75, nên mã gần 1024."
      },
      {
        stem: "ADC 8 bit dùng Vref = 3,3 V và nhận Vin = 2,2 V. Mã số lý tưởng gần giá trị nào nhất?",
        correct: "170.",
        distractors: ["85.", "128.", "220."],
        explanation: "D ≈ (2,2/3,3) × 255 = 170."
      }
    ],
    "tính số comparator của Flash ADC": [
      {
        stem: "Một Flash ADC 4 bit lý tưởng cần bao nhiêu bộ so sánh trong cấu trúc cơ bản?",
        correct: "15 bộ so sánh.",
        distractors: ["4 bộ so sánh.", "8 bộ so sánh.", "16 bộ so sánh."],
        explanation: "Flash ADC N bit cần 2^N - 1 bộ so sánh; với N = 4, kết quả là 15."
      },
      {
        stem: "Nếu tăng độ phân giải Flash ADC từ 4 bit lên 5 bit, cấu trúc 5 bit cần bao nhiêu bộ so sánh?",
        correct: "31 bộ so sánh.",
        distractors: ["16 bộ so sánh.", "25 bộ so sánh.", "32 bộ so sánh."],
        explanation: "Với N = 5, số bộ so sánh là 2^5 - 1 = 31."
      },
      {
        stem: "Một Flash ADC 6 bit lý tưởng dùng cấu trúc song song cơ bản. Số bộ so sánh cần dùng là bao nhiêu?",
        correct: "63 bộ so sánh.",
        distractors: ["32 bộ so sánh.", "36 bộ so sánh.", "64 bộ so sánh."],
        explanation: "Số bộ so sánh bằng 2^6 - 1 = 63."
      }
    ],
    "tính sai số lượng tử cực đại": [
      {
        stem: "ADC 10 bit dùng Vref = 5,0 V. Lấy sai số lượng tử cực đại lý tưởng bằng 0,5 LSB, giá trị gần đúng là bao nhiêu?",
        correct: "2,44 mV.",
        distractors: ["1,22 mV.", "4,88 mV.", "9,77 mV."],
        explanation: "1 LSB ≈ 5/1024 = 4,88 mV; sai số cực đại lý tưởng bằng nửa bước, khoảng 2,44 mV."
      },
      {
        stem: "ADC 8 bit dùng Vref = 2,56 V. Sai số lượng tử cực đại lý tưởng, lấy bằng 0,5 LSB, gần giá trị nào nhất?",
        correct: "5 mV.",
        distractors: ["2,5 mV.", "10 mV.", "20 mV."],
        explanation: "1 LSB = 2,56/256 = 10 mV; nửa LSB bằng 5 mV."
      },
      {
        stem: "ADC 12 bit dùng Vref = 4,096 V. Sai số lượng tử cực đại lý tưởng bằng 0,5 LSB gần bao nhiêu?",
        correct: "0,5 mV.",
        distractors: ["0,25 mV.", "1 mV.", "2 mV."],
        explanation: "1 LSB = 4,096/4096 = 1 mV; sai số cực đại lý tưởng bằng 0,5 mV."
      }
    ],
    "tính điện áp trung bình PWM": [
      {
        stem: "PWM có mức cao 5,0 V và tỷ lệ độ rộng xung 25%. Sau bộ lọc thông thấp lý tưởng, điện áp trung bình gần bao nhiêu?",
        correct: "1,25 V.",
        distractors: ["0,80 V.", "2,50 V.", "3,75 V."],
        explanation: "Điện áp trung bình lý tưởng bằng Vhigh × duty = 5,0 × 0,25 = 1,25 V."
      },
      {
        stem: "PWM 3,3 V có tỷ lệ độ rộng xung 60%. Điện áp trung bình lý tưởng sau lọc gần giá trị nào?",
        correct: "1,98 V.",
        distractors: ["1,32 V.", "1,65 V.", "2,64 V."],
        explanation: "Điện áp trung bình bằng 3,3 × 0,60 = 1,98 V."
      },
      {
        stem: "Một đầu ra PWM chuyển giữa 0 V và 12 V với tỷ lệ độ rộng xung 30%. Điện áp trung bình lý tưởng là bao nhiêu?",
        correct: "3,6 V.",
        distractors: ["2,4 V.", "4,0 V.", "8,4 V."],
        explanation: "Điện áp trung bình bằng 12 × 0,30 = 3,6 V."
      }
    ],
    "tính tốc độ lấy mẫu tối thiểu": [
      {
        stem: "Tín hiệu có thành phần tần số cao nhất 2,5 kHz. Theo điều kiện Nyquist cơ bản, tốc độ lấy mẫu tối thiểu là bao nhiêu?",
        correct: "5 kS/s.",
        distractors: ["1,25 kS/s.", "2,5 kS/s.", "10 kS/s."],
        explanation: "Điều kiện Nyquist yêu cầu fs ≥ 2fmax, nên fs tối thiểu bằng 5 kS/s."
      },
      {
        stem: "Một cảm biến tạo tín hiệu có thành phần cao nhất 3 kHz. Tốc độ lấy mẫu tối thiểu theo Nyquist là bao nhiêu?",
        correct: "6 kS/s.",
        distractors: ["1,5 kS/s.", "3 kS/s.", "12 kS/s."],
        explanation: "Tốc độ lấy mẫu tối thiểu bằng hai lần tần số cao nhất: 2 × 3 kHz = 6 kS/s."
      }
    ],
    "tính LSB của ADC": [
      {
        stem: "ADC 10 bit dùng Vref = 5,0 V. Giá trị gần đúng của một bước LSB là bao nhiêu?",
        correct: "4,88 mV.",
        distractors: ["2,44 mV.", "9,77 mV.", "19,53 mV."],
        explanation: "Một LSB xấp xỉ Vref/2^N = 5/1024 = 4,88 mV."
      },
      {
        stem: "ADC 8 bit dùng Vref = 2,56 V. Một bước LSB gần giá trị nào nhất?",
        correct: "10 mV.",
        distractors: ["5 mV.", "20 mV.", "40 mV."],
        explanation: "Một LSB bằng 2,56/256 = 0,01 V, tức 10 mV."
      }
    ]
  };

  const numericCounters = new Map();

  const rewriteNumericQuestion = (question) => {
    const variants = numericVariants[question.topic];
    if (!variants) return false;
    const counter = numericCounters.get(question.topic) || 0;
    const variant = variants[counter % variants.length];
    numericCounters.set(question.topic, counter + 1);
    const correctSlot = question.choices.findIndex((choice) => choice.correct);
    let distractorIndex = 0;
    question.stem = variant.stem;
    question.choices.forEach((choice, index) => {
      if (index === correctSlot) {
        choice.text = variant.correct;
        choice.correct = true;
        choice.reason = variant.explanation;
      } else {
        choice.text = variant.distractors[distractorIndex++];
        choice.correct = false;
        choice.reason = `Giá trị này không thu được khi áp dụng đúng công thức cho dữ kiện ${variant.stem.replace(/\?$/, "").toLocaleLowerCase("vi-VN")}.`;
      }
    });
    question.explanation = variant.explanation;
    question.bloom = 3;
    question.type = `Bloom 3 - ${bloomLabels[3]}`;
    return true;
  };

  const rewriteDuplicateGroups = (data) => {
    const questions = data.chapters.flatMap((chapter) => chapter.questions);
    const groups = new Map();
    questions.forEach((question) => {
      const signature = questionSignature(question);
      if (!groups.has(signature)) groups.set(signature, []);
      groups.get(signature).push(question);
    });

    groups.forEach((group) => {
      if (group.length < 2) return;
      group.slice(1).forEach((question, duplicateIndex) => {
        if (!rewriteNumericQuestion(question)) {
          rewriteAsMisconceptionCheck(question, duplicateIndex);
        }
      });
    });

    data.version = `${data.version || "quiz"}-diverse-v1`;
  };

  const rewriteResidualGroups = (data) => {
    const questions = data.chapters.flatMap((chapter) => chapter.questions);
    const groups = new Map();
    questions.forEach((question) => {
      const signature = questionSignature(question);
      if (!groups.has(signature)) groups.set(signature, []);
      groups.get(signature).push(question);
    });

    groups.forEach((group) => {
      if (group.length < 2) return;
      group.slice(1).forEach((question) => {
        const meta = diversityMeta.get(question.id);
        if (!meta) return;
        const action = meta.supportsTrueStatement ? "bảo vệ" : "bác bỏ";
        question.stem = `Lập luận “${meta.rationale.replace(/[.!?]\s*$/, "")}” trực tiếp dùng để ${action} nhận định nào về ${question.topic}?`;
        let distractorIndex = 0;
        const distractors = meta.originalChoices.filter((choice) => choice.text !== meta.focusText);
        question.choices.forEach((choice, index) => {
          if (index === meta.correctSlot) {
            choice.text = meta.focusText;
            choice.correct = true;
            choice.reason = `${meta.rationale} Vì vậy đây là nhận định được lập luận trong câu hỏi trực tiếp hướng tới.`;
          } else {
            const distractor = distractors[distractorIndex++];
            choice.text = distractor.text;
            choice.correct = false;
            choice.reason = standaloneReason(distractor.reason);
          }
        });
        question.explanation = `${meta.rationale} Cần nối đúng lập luận với chính nhận định mà nó giải thích, thay vì chọn một phát biểu khác chỉ vì cùng chủ đề.`;
      });
    });
  };

  const componentOverrides = {
    "passive-components-e-36": {
      type: "Đánh giá linh kiện",
      stem: "Một hạt ferrite đặt trên đường nguồn mang dòng DC 2 A để giảm nhiễu khoảng 100 MHz. Nhóm thông số nào cần kiểm tra trước khi chọn?",
      correct: "Trở kháng tại dải tần nhiễu, dòng định mức, suy giảm trở kháng khi có dòng DC và tổn hao của linh kiện.",
      distractors: [
        "Chỉ điện trở DC vì trở kháng của hạt ferrite không thay đổi theo tần số hoặc dòng phân cực.",
        "Chỉ màu vỏ và kích thước chữ in vì mọi hạt ferrite cùng kích thước có đặc tính tương đương.",
        "Chỉ điện dung ký sinh vì hạt ferrite được chọn giống hệt một tụ khử nhiễu nguồn."
      ],
      explanation: "Ferrite có đặc tuyến trở kháng theo tần số và có thể suy giảm hiệu quả khi dòng DC lớn. Cần kiểm tra cả dòng, nhiệt và tổn hao."
    },
    "passive-components-w-46": {
      type: "Vận dụng số liệu",
      stem: "Một đường mạch có điện trở tổng 50 mΩ mang dòng 1 A. Sụt áp và công suất tổn hao trên đường mạch gần bằng bao nhiêu?",
      correct: "50 mV và 50 mW.",
      distractors: ["5 mV và 5 mW.", "50 mV và 1 W.", "500 mV và 500 mW."],
      explanation: "V = IR = 1 × 0,05 = 0,05 V; P = I²R = 1² × 0,05 = 0,05 W. Đường đồng thực không phải dây nối lý tưởng."
    },
    "passive-components-w-70": {
      type: "Phân tích tín hiệu",
      stem: "Một cạnh số nhanh bị rung và phản xạ trên đường mạch dài. Biện pháp kiểm tra nào hợp lý nhất trước khi tăng thêm tụ tải?",
      correct: "Kiểm tra trở kháng đường truyền, đường hồi dòng, vị trí tải và khả năng dùng điện trở kết cuối hoặc điện trở nối tiếp tại nguồn.",
      distractors: [
        "Tăng tốc độ cạnh cao hơn vì cạnh nhanh luôn làm phản xạ kết thúc sớm hơn.",
        "Cắt mặt phẳng tham chiếu dưới đường tín hiệu để giảm điện dung mà không ảnh hưởng đường hồi.",
        "Chỉ tăng điện áp logic vì biên độ lớn loại bỏ được mọi phản xạ trên đường dây."
      ],
      explanation: "Rung cạnh trên đường dài liên quan trở kháng và phản xạ. Cần kiểm tra cấu trúc đường truyền cùng đường hồi trước khi thêm tải làm chậm tín hiệu."
    },
    "passive-components-c-53": {
      type: "Phân tích vòng dòng",
      stem: "Đường tín hiệu xung đi trên một khe cắt của mặt phẳng mass. Hệ quả nào dễ xảy ra nhất?",
      correct: "Dòng hồi phải đi vòng quanh khe, làm tăng diện tích vòng, phát xạ và khả năng ghép nhiễu.",
      distractors: [
        "Dòng hồi biến mất nên tín hiệu không còn gây trường điện từ.",
        "Khe mass tự tạo kết cuối đúng trở kháng cho mọi tốc độ cạnh.",
        "Chỉ điện trở DC thay đổi; đường hồi và điện cảm vòng không bị ảnh hưởng."
      ],
      explanation: "Tín hiệu luôn có đường hồi. Khe trên mặt tham chiếu buộc dòng hồi đi xa, làm vòng dòng lớn và chất lượng tín hiệu kém hơn."
    },
    "passive-components-c-61": {
      type: "Vận dụng số liệu",
      stem: "Bộ lọc RC thông thấp có R = 10 kΩ và C = 10 nF. Tần số cắt gần giá trị nào nhất?",
      correct: "1,59 kHz.",
      distractors: ["159 Hz.", "15,9 kHz.", "100 kHz."],
      explanation: "fc = 1/(2πRC) = 1/(2π × 10.000 × 10 nF) ≈ 1,59 kHz."
    },
    "passive-components-e-68": {
      type: "Đánh giá tụ điện",
      stem: "Một tụ khử nhiễu có tần số tự cộng hưởng thấp hơn đáng kể tần số nhiễu cần xử lý. Nhận định nào phù hợp nhất?",
      correct: "Trên vùng tự cộng hưởng, ảnh hưởng điện cảm ký sinh có thể chi phối nên trở kháng không còn giảm như tụ lý tưởng.",
      distractors: [
        "Tụ tiếp tục có trở kháng giảm vô hạn khi tần số tăng nên chắc chắn lọc tốt hơn.",
        "Tần số tự cộng hưởng chỉ ảnh hưởng điện áp DC và không liên quan nhiễu cao tần.",
        "Có thể bỏ qua kích thước vỏ và đường nối vì chúng không góp phần vào điện cảm ký sinh."
      ],
      explanation: "Tụ thực có ESR và ESL. Sau tự cộng hưởng, đặc tính có thể mang tính cảm; cần chọn loại, kích thước và cách bố trí phù hợp dải tần."
    },
    "passive-components-e-76": {
      type: "Vận dụng số liệu",
      stem: "LED có điện áp thuận 2,0 V được cấp từ GPIO 3,3 V và cần dòng khoảng 10 mA. Điện trở hạn dòng lý tưởng gần bao nhiêu?",
      correct: "130 Ω.",
      distractors: ["33 Ω.", "200 Ω.", "330 Ω."],
      explanation: "R = (3,3 - 2,0)/0,01 = 130 Ω. Khi chọn thực tế cần xét dòng GPIO, sai số điện áp thuận và công suất điện trở."
    },
    "passive-components-c-77": {
      type: "Vận dụng số liệu",
      stem: "Một tiếp điểm đầu nối có điện trở 0,2 Ω và mang dòng 2 A. Công suất nhiệt tại tiếp điểm gần bằng bao nhiêu?",
      correct: "0,8 W.",
      distractors: ["0,1 W.", "0,4 W.", "4 W."],
      explanation: "P = I²R = 2² × 0,2 = 0,8 W. Điện trở tiếp xúc nhỏ vẫn có thể gây nóng đáng kể khi dòng lớn."
    },
    "passive-components-c-85": {
      type: "Vận dụng thời gian đáp ứng",
      stem: "Mạch RC có R = 1 kΩ và C = 1 µF. Lấy thời gian xác lập gần đầy đủ xấp xỉ 5τ, tín hiệu cần khoảng bao lâu để ổn định sau một bước điện áp?",
      correct: "5 ms.",
      distractors: ["0,2 ms.", "1 ms.", "50 ms."],
      explanation: "τ = RC = 1 ms; thời gian khoảng 5τ bằng 5 ms. Giá trị này cho thấy lọc mạnh hơn luôn đi kèm phản hồi chậm hơn."
    },
    "diodes-protection-w-46": {
      type: "Phân tích bảo vệ",
      stem: "Một TVS đã kẹp xung tại đầu nối nhưng chân MCU vẫn quá dòng qua diode bảo vệ nội. Tầng bổ sung nào tác động trực tiếp nhất?",
      correct: "Thêm điện trở nối tiếp được tính để giữ dòng qua mạch kẹp của chân trong giới hạn.",
      distractors: [
        "Điện trở kéo lên nhỏ hơn để tăng dòng chạy vào diode bảo vệ nội.",
        "Tụ lớn đặt xa đầu nối nhưng không kiểm tra băng thông tín hiệu.",
        "Bỏ TVS và chỉ dựa vào phần mềm phát hiện mức điện áp bất thường."
      ],
      explanation: "TVS giảm biên độ xung lớn, còn tầng hạn dòng kiểm soát dòng còn lại vào mạch kẹp của chân. Bảo vệ theo lớp phân chia năng lượng giữa các phần tử."
    },
    "diodes-protection-e-76": {
      type: "Vận dụng số liệu",
      stem: "Nguồn 12 V cấp cho Zener 5,1 V qua điện trở để tạo dòng xấp xỉ 5 mA khi chưa có tải. Điện trở lý tưởng gần bao nhiêu?",
      correct: "1,38 kΩ.",
      distractors: ["510 Ω.", "2,4 kΩ.", "3,42 kΩ."],
      explanation: "R = (12 - 5,1)/0,005 = 1.380 Ω. Cần kiểm tra thêm dòng tải, công suất Zener và công suất điện trở."
    },
    "diodes-protection-c-77": {
      type: "Đánh giá kiến trúc",
      stem: "Một tín hiệu công nghiệp đi qua cáp dài, có nhiễu chế độ chung và nguy cơ surge. Phương án bảo vệ theo lớp nào hợp lý nhất?",
      correct: "Kẹp xung gần đầu nối, hạn dòng và lọc phù hợp, sau đó dùng cách ly nếu cần phá chênh lệch mass.",
      distractors: [
        "Chỉ dùng diode bảo vệ nội MCU vì nó xử lý được cả surge và chênh lệch mass.",
        "Chỉ dùng tụ lớn tại chân MCU vì tụ đồng thời tạo cách ly điện và kẹp mức.",
        "Chỉ dùng điện trở kéo vì trạng thái logic xác định đủ ngăn mọi năng lượng xung."
      ],
      explanation: "Mỗi tầng xử lý một cơ chế: kẹp năng lượng, hạn dòng, lọc và cách ly. Cần đặt phần tử theo đường xung và đường hồi thực tế."
    },
    "analog-adc-front-end-w-94": {
      type: "Vận dụng số liệu",
      stem: "Đo dòng phía mass bằng shunt 20 mΩ với dòng tải 5 A. Mốc mass của tải bị nâng lên xấp xỉ bao nhiêu so với mass hệ thống?",
      correct: "100 mV.",
      distractors: ["4 mV.", "25 mV.", "250 mV."],
      explanation: "Vshunt = I × R = 5 × 0,02 = 0,1 V. Đây là nhược điểm quan trọng của đo dòng phía mass."
    },
    "transistors-loads-a-59": {
      type: "Áp dụng",
      stem: "GPIO 3,3 V cần đóng cắt một tải 20 mA, tần số thấp và muốn giảm số điện trở ngoài. Khi nào RET là lựa chọn hợp lý?",
      correct: "Khi định mức dòng, điện áp và công suất của RET đều đáp ứng tải; điện trở tích hợp giúp đơn giản hóa mạch điều khiển.",
      distractors: [
        "Khi tải có dòng khởi động vài chục ampe vì RET thay thế trực tiếp mọi MOSFET công suất.",
        "Khi cần cách ly điện hoàn toàn giữa GPIO và tải vì RET không tạo đường dẫn điện giữa hai phía.",
        "Khi tải là cuộn dây lớn vì điện trở tích hợp trong RET tự hấp thụ toàn bộ năng lượng cảm ứng."
      ],
      explanation: "RET phù hợp mạch đóng cắt nhỏ hoặc vừa khi các định mức được thỏa mãn. Điện trở tích hợp giảm linh kiện ngoài nhưng không biến RET thành linh kiện công suất hay phần tử cách ly."
    },
    "transistors-loads-e-60": {
      type: "Phân tích tình huống",
      stem: "Một rơ-le dùng diode hồi tiếp mắc song song ngược với cuộn dây hoạt động an toàn nhưng nhả chậm. Nguyên nhân nào hợp lý nhất?",
      correct: "Diode kẹp điện áp ở mức thấp nên dòng cuộn dây suy giảm chậm, làm từ trường và lực hút tồn tại lâu hơn.",
      distractors: [
        "Diode làm tăng điện áp nguồn cấp cho cuộn dây trong lúc transistor đang dẫn.",
        "Diode cấp thêm dòng liên tục vào cực điều khiển transistor sau khi GPIO đã tắt.",
        "Diode làm điện trở DC của cuộn dây giảm mạnh nên rơ-le không thể mất từ trường."
      ],
      explanation: "Diode hồi tiếp bảo vệ transistor nhưng tạo đường suy giảm dòng có điện áp kẹp thấp. Nếu cần nhả nhanh hơn có thể cân nhắc TVS hoặc kẹp áp cao hơn, đồng thời kiểm tra định mức transistor."
    },
    "transistors-loads-l-71": {
      type: "Vận dụng số liệu",
      stem: "MOSFET có tổng điện tích cổng Qg = 20 nC và đóng cắt ở 100 kHz. Dòng trung bình tối thiểu chỉ để nạp, xả điện tích cổng xấp xỉ bao nhiêu?",
      correct: "2 mA.",
      distractors: ["0,2 mA.", "20 mA.", "200 mA."],
      explanation: "Dòng trung bình do nạp xả cổng xấp xỉ Qg × f = 20 nC × 100 kHz = 2 mA. Dòng đỉnh để chuyển mạch nhanh có thể lớn hơn nhiều, nên vẫn phải xét mạch điều khiển cổng."
    },
    "transistors-loads-e-84": {
      type: "Vận dụng số liệu",
      stem: "Chuỗi LED công suất có điện áp thuận 9 V, cấp từ nguồn 12 V với dòng 0,35 A qua điện trở hạn dòng. Bỏ qua biến thiên nhiệt, công suất trên điện trở gần bao nhiêu?",
      correct: "1,05 W.",
      distractors: ["0,35 W.", "3,15 W.", "4,20 W."],
      explanation: "Điện trở chịu 12 - 9 = 3 V; công suất P = 3 × 0,35 = 1,05 W. Cần chọn công suất định mức có dự phòng và kiểm tra quản lý nhiệt."
    },
    "transistors-loads-l-95": {
      type: "Phân tích tổn hao",
      stem: "MOSFET dẫn dòng 4 A với RDS(on) = 50 mΩ ở nhiệt độ đang xét. Bỏ qua tổn hao chuyển mạch, công suất dẫn gần bao nhiêu?",
      correct: "0,8 W.",
      distractors: ["0,2 W.", "3,2 W.", "8 W."],
      explanation: "P dẫn = I²R = 4² × 0,05 = 0,8 W. Khi thiết kế thật còn phải xét RDS(on) tăng theo nhiệt độ và tổn hao lúc chuyển mạch."
    },
    "transistors-loads-e-100": {
      type: "Đánh giá nhiệt",
      stem: "Hai MOSFET có cùng điện áp và dòng định mức. Loại A có RDS(on) thấp hơn nhưng điện tích cổng lớn hơn loại B. Kết luận nào phù hợp khi chọn cho mạch PWM?",
      correct: "Phải đánh giá cả tổn hao dẫn và tổn hao chuyển mạch tại tần số thực tế; không thể chọn chỉ từ RDS(on).",
      distractors: [
        "Luôn chọn loại A vì RDS(on) thấp bảo đảm tổng tổn hao thấp ở mọi tần số.",
        "Luôn chọn loại B vì điện tích cổng nhỏ làm tổn hao dẫn bằng không.",
        "Hai loại tương đương nếu cùng dòng định mức, không cần xét mạch điều khiển cổng."
      ],
      explanation: "RDS(on) chi phối tổn hao dẫn, còn điện tích cổng và tốc độ chuyển mạch ảnh hưởng tổn hao động. Tần số PWM và khả năng driver quyết định đánh đổi."
    },
    "gpio-level-isolation-a-59": {
      type: "Vận dụng số liệu",
      stem: "Mạch chống nảy dùng R = 10 kΩ và C = 100 nF. Hằng số thời gian RC gần bằng bao nhiêu?",
      correct: "1 ms.",
      distractors: ["0,1 ms.", "10 ms.", "100 ms."],
      explanation: "τ = RC = 10.000 × 100 nF = 0,001 s, tức 1 ms. Cần so sánh giá trị này với thời gian nảy và độ dài lần nhấn hợp lệ."
    },
    "gpio-level-isolation-e-60": {
      type: "Lựa chọn linh kiện",
      stem: "Hai miền nguồn cần cách ly điện và truyền tín hiệu số 20 Mbit/s với độ trễ ổn định. Phương án nào phù hợp hơn bộ ghép quang thông dụng tốc độ thấp?",
      correct: "Bộ cách ly số có tốc độ dữ liệu, điện áp cách ly và nguồn hai phía phù hợp.",
      distractors: [
        "Điện trở nối tiếp lớn vì hạn dòng cũng tạo cách ly điện hoàn toàn.",
        "Bộ đệm logic dùng chung mass vì tốc độ cao có thể thay thế cách ly.",
        "Diode hồi tiếp vì kẹp xung tải cảm đồng thời truyền được dữ liệu hai chiều."
      ],
      explanation: "Bộ cách ly số dùng ghép điện dung, từ hoặc biến áp vi mô và thường phù hợp hơn khi cần tốc độ cùng độ trễ tốt. Vẫn phải cấp nguồn đúng cho hai miền cách ly."
    },
    "gpio-level-isolation-l-71": {
      type: "Phân tích bus",
      stem: "Trên bus I2C, một thiết bị kéo SDA xuống thấp trong khi thiết bị khác nhả đường dây. Điện áp bus được xác định như thế nào?",
      correct: "SDA ở mức thấp vì ngõ ra cực máng hở chỉ kéo xuống; điện trở kéo lên chỉ tạo mức cao khi mọi thiết bị đều nhả bus.",
      distractors: [
        "SDA ở mức cao vì điện trở kéo lên luôn thắng transistor kéo xuống.",
        "Hai đầu ra đẩy-kéo tranh chấp và tạo mức bằng nửa nguồn trong mọi trường hợp.",
        "SDA ở trạng thái không xác định vì cực máng hở không cho phép nhiều thiết bị dùng chung dây."
      ],
      explanation: "Cấu trúc cực máng hở tạo phép AND theo mức dây: chỉ cần một thiết bị kéo thấp thì bus thấp; bus cao khi không thiết bị nào kéo."
    },
    "gpio-level-isolation-e-84": {
      type: "Đánh giá cách ly",
      stem: "Một cảm biến ở xa có mass lệch so với bo điều khiển và tạo dòng vòng qua cáp tín hiệu. Biện pháp nào xử lý trực tiếp nhất?",
      correct: "Dùng giao tiếp hoặc bộ cách ly phù hợp để phá đường dẫn điện trực tiếp, đồng thời cấp nguồn cách ly nếu cấu trúc yêu cầu.",
      distractors: [
        "Nối thêm một dây mass mảnh song song vì mọi đường mass bổ sung đều loại được chênh lệch thế.",
        "Tăng tần số lấy mẫu để ADC bỏ qua điện áp do dòng vòng gây ra.",
        "Chỉ thêm điện trở kéo lên mạnh hơn tại đầu thu vì điện trở kéo tạo cách ly điện."
      ],
      explanation: "Khi chênh lệch mass và dòng vòng là nguyên nhân, cách ly điện xử lý trực tiếp đường dẫn chung. Cần chọn mức cách ly, tốc độ và nguồn cách ly theo hệ thống."
    },
    "gpio-level-isolation-e-100": {
      type: "Vận dụng số liệu",
      stem: "Bus I2C 3,3 V dùng điện trở kéo lên 1 kΩ. Khi một thiết bị kéo đường dây xuống gần 0 V, dòng hút xấp xỉ bao nhiêu?",
      correct: "3,3 mA.",
      distractors: ["0,33 mA.", "33 mA.", "330 mA."],
      explanation: "Dòng mức thấp xấp xỉ 3,3 V/1 kΩ = 3,3 mA. Điện trở nhỏ giúp cạnh lên nhanh nhưng tăng dòng mà ngõ ra phải hút."
    },
    "analog-adc-front-end-a-59": {
      type: "Vận dụng số liệu",
      stem: "Mạch khuếch đại không đảo có Rg = 10 kΩ và Rf = 20 kΩ. Hệ số khuếch đại điện áp lý tưởng bằng bao nhiêu?",
      correct: "3.",
      distractors: ["0,5.", "2.", "20."],
      explanation: "Độ lợi không đảo Av = 1 + Rf/Rg = 1 + 20/10 = 3."
    },
    "analog-adc-front-end-e-60": {
      type: "Vận dụng số liệu",
      stem: "Điện trở shunt 0,1 Ω mang dòng 2 A. Điện áp rơi và công suất tiêu tán trên shunt gần bằng bao nhiêu?",
      correct: "0,2 V và 0,4 W.",
      distractors: ["0,05 V và 0,1 W.", "0,2 V và 0,2 W.", "2 V và 4 W."],
      explanation: "V = IR = 2 × 0,1 = 0,2 V; P = I²R = 4 × 0,1 = 0,4 W. Phải xét sai số và công suất dự phòng của shunt."
    },
    "analog-adc-front-end-e-84": {
      type: "Lựa chọn mạch đo",
      stem: "Cần đo dòng trên dây nguồn 24 V mà không làm thay đổi mốc mass của tải. Cấu trúc nào phù hợp hơn?",
      correct: "Đặt shunt phía nguồn dương và dùng bộ khuếch đại đo dòng chịu được điện áp chế độ chung tương ứng.",
      distractors: [
        "Đặt shunt phía mass rồi coi sụt áp trên shunt không ảnh hưởng mốc mass tải.",
        "Nối trực tiếp hai đầu shunt 24 V vào ADC 3,3 V vì ADC chỉ đo hiệu điện áp.",
        "Thay shunt bằng điện trở kéo lên GPIO vì điện trở kéo có thể đo dòng tải liên tục."
      ],
      explanation: "Đo phía nguồn dương giữ mass tải gần mass hệ thống nhưng đòi hỏi mạch đo chịu điện áp chế độ chung cao."
    },
    "analog-adc-front-end-e-100": {
      type: "Phân tích sai số ADC",
      stem: "Vin của ADC giữ nguyên nhưng Vref tăng 1%. Bỏ qua các sai số khác, mã ADC thay đổi theo hướng nào?",
      correct: "Mã ADC giảm xấp xỉ 1% vì mã tỷ lệ với Vin/Vref.",
      distractors: [
        "Mã ADC tăng xấp xỉ 1% vì Vref lớn luôn tạo nhiều mã hơn cho cùng Vin.",
        "Mã ADC không đổi vì Vref chỉ ảnh hưởng đầu ra DAC.",
        "Mã ADC về toàn thang vì mọi biến động Vref đều được xem là quá áp đầu vào."
      ],
      explanation: "Với Vin cố định, D tỷ lệ nghịch với Vref. Nguồn tham chiếu dao động trực tiếp gây biến động hệ số tỷ lệ của phép đo."
    },
    "power-esd-thermal-a-59": {
      type: "Đánh giá nguồn",
      stem: "Nguồn 12 V cần tạo 3,3 V ở 0,5 A. Nếu dùng bộ ổn áp tuyến tính lý tưởng hóa, công suất mất trên bộ ổn áp gần bao nhiêu?",
      correct: "4,35 W.",
      distractors: ["0,45 W.", "1,65 W.", "6 W."],
      explanation: "Ploss = (12 - 3,3) × 0,5 = 4,35 W. Mức nhiệt này thường khiến bộ biến đổi buck đáng cân nhắc hơn."
    },
    "power-esd-thermal-e-60": {
      type: "Vận dụng nhiệt",
      stem: "Linh kiện tiêu tán 1,5 W và có điện trở nhiệt từ mối nối tới môi trường 40 °C/W. Bỏ qua các đường tản nhiệt khác, độ tăng nhiệt mối nối gần bao nhiêu?",
      correct: "60 °C.",
      distractors: ["26,7 °C.", "40 °C.", "100 °C."],
      explanation: "Độ tăng nhiệt xấp xỉ P × θJA = 1,5 × 40 = 60 °C. Nhiệt độ mối nối còn bằng nhiệt độ môi trường cộng độ tăng này."
    },
    "power-esd-thermal-e-84": {
      type: "Phân tích bố trí",
      stem: "Một tụ khử nhiễu nguồn đúng giá trị nhưng đặt cách chân nguồn IC bằng đường mạch dài. Vì sao hiệu quả ở cạnh xung nhanh có thể giảm?",
      correct: "Điện cảm và điện trở ký sinh của đường nối làm tăng trở kháng vòng dòng cao tần giữa tụ và IC.",
      distractors: [
        "Khoảng cách làm điện dung danh định của tụ tăng quá cao nên tụ chặn dòng xung.",
        "IC chỉ dùng tụ khi đường mạch dài hơn một bước sóng của tín hiệu số.",
        "Tụ ở xa làm điện áp DC đổi cực nên không còn nối song song với nguồn."
      ],
      explanation: "Tụ khử nhiễu phải tạo vòng cấp dòng xung ngắn, trở kháng thấp. Đường nối dài làm tăng ký sinh và giảm hiệu quả cao tần."
    },
    "power-esd-thermal-l-95": {
      type: "Chọn bảo vệ theo lớp",
      stem: "Đầu vào nguồn 24 V có nguy cơ cắm ngược, quá dòng và xung quá áp. Tổ hợp nào xử lý đúng ba nguy cơ này?",
      correct: "Phần tử chống ngược cực, cầu chì hoặc giới hạn dòng, và TVS có thông số phù hợp đặt theo đường xung dự kiến.",
      distractors: [
        "Một tụ gốm duy nhất vì tụ tự sửa được cực tính và ngắt dòng khi quá tải.",
        "Chỉ dùng cầu chì vì cầu chì phản ứng đủ nhanh để kẹp mọi xung ESD và surge.",
        "Chỉ kiểm tra điện áp bằng phần mềm vì MCU có thể ngăn hư hỏng trước khi nguồn đi vào mạch."
      ],
      explanation: "Mỗi lớp bảo vệ giải quyết một cơ chế khác nhau. Cần phối hợp chống ngược cực, giới hạn năng lượng quá dòng và kẹp xung quá áp."
    },
    "power-esd-thermal-e-100": {
      type: "Đánh giá bảo vệ",
      stem: "Thiết bị 24 V đặt trong môi trường công nghiệp thường xuyên có xung trên đường nguồn. Phương án nào hợp lý nhất ở đầu vào?",
      correct: "Phối hợp cầu chì hoặc giới hạn dòng, chống ngược cực, TVS và lọc; chọn định mức theo điện áp làm việc cùng năng lượng xung.",
      distractors: [
        "Nối thẳng nguồn vào bộ ổn áp rồi xử lý mọi quá áp bằng chương trình giám sát ADC.",
        "Chỉ tăng dung lượng Flash vì bộ nhớ lớn giúp MCU chịu được xung nguồn lâu hơn.",
        "Chỉ thêm điện trở kéo lên đường nguồn vì điện trở kéo xác định được điện áp khi có surge."
      ],
      explanation: "Bảo vệ đầu vào là vấn đề điện và năng lượng xảy ra trước khi phần mềm có thể phản ứng. Cấu trúc phải xử lý từng nguy cơ bằng phần tử phù hợp."
    },
    "power-esd-thermal-n-97": {
      type: "Lựa chọn TVS",
      stem: "Một TVS có điện dung 100 pF làm méo cạnh trên đường dữ liệu tốc độ cao. Cách chọn lại nào hợp lý nhất?",
      correct: "Chọn TVS điện dung thấp hơn nhưng vẫn thỏa điện áp làm việc, điện áp kẹp và khả năng chịu xung yêu cầu.",
      distractors: [
        "Chọn TVS có điện dung lớn hơn để cạnh tín hiệu nhanh hơn mà không cần kiểm tra điện áp kẹp.",
        "Bỏ TVS và nối cổng trực tiếp vào MCU vì đường dữ liệu nhanh không chịu nguy cơ ESD.",
        "Giữ TVS cũ rồi tăng tần số clock vì clock cao có thể bù mọi suy giảm biên dạng tín hiệu."
      ],
      explanation: "Điện dung TVS tải lên đường tín hiệu và có thể làm chậm cạnh. Loại thay thế phải đồng thời thỏa tính toàn vẹn tín hiệu và các định mức bảo vệ."
    }
  };

  const applyComponentOverrides = () => {
    const data = window.COMPONENT_QUIZ_DATA;
    if (!data) return;
    const questions = data.chapters.flatMap((chapter) => chapter.questions);
    Object.entries(componentOverrides).forEach(([id, replacement]) => {
      const question = questions.find((item) => item.id === id);
      if (!question) throw new Error(`Không tìm thấy câu cấu kiện cần thay: ${id}`);
      const correctSlot = question.choices.findIndex((choice) => choice.correct);
      let distractorIndex = 0;
      question.type = replacement.type;
      question.stem = replacement.stem;
      question.explanation = replacement.explanation;
      question.choices.forEach((choice, index) => {
        if (index === correctSlot) {
          choice.text = replacement.correct;
          choice.correct = true;
          choice.reason = replacement.explanation;
        } else {
          choice.text = replacement.distractors[distractorIndex++];
          choice.correct = false;
          choice.reason = "Phương án này không thỏa đúng cơ chế, công thức hoặc ràng buộc đã nêu trong tình huống.";
        }
      });
    });
  };

  const distinctStemOverrides = {
    "tong-quan-he-thong-nhung-typical-features-q037": "Một thiết bị đeo thực hiện nhiệm vụ chuyên dụng, có bộ nhớ nhỏ, dùng pin và phải phản hồi đúng hạn. Phương án nào nhận diện đầy đủ nhóm đặc điểm hệ thống nhúng đang chi phối thiết kế?",
    "tong-quan-he-thong-nhung-distributed-q063": "Một xe có nhiều bộ điều khiển chia nhau đo cảm biến, điều khiển cơ cấu chấp hành và trao đổi qua mạng nội bộ. Phương án nào giải thích đúng vì sao đây là hệ nhúng phân tán?",
    "khai-niem-giao-tiep-inter-intra-q090": "MCU đọc cảm biến qua I2C trên cùng bo mạch, còn bo gửi dữ liệu sang thiết bị khác qua cáp. Phương án nào phân biệt đúng giao tiếp trong hệ và giữa các hệ?",
    "khai-niem-giao-tiep-connection-topology-cnt028": "Khi phân loại liên kết thành điểm-điểm, nhiều điểm nhận trên một đường và nhiều nút có thể trao đổi, phương án nào nêu đủ ba nhóm mà không trộn thêm tiêu chí điện?",
    "khai-niem-giao-tiep-balanced-noise-s046": "Một cặp dây được gọi là cân bằng nhưng hai dây có trở kháng và đường đi rất khác nhau. Nhận định nào về cấu hình này cần bác bỏ?",
    "khai-niem-giao-tiep-bit-baud-lst064": "Khi đánh giá tốc độ một liên kết, tập hợp nào bao quát đủ tốc độ bit, tốc độ ký hiệu, dữ liệu hữu ích và giới hạn băng thông?",
    "giao-tiep-io-co-ban-source-sink-led-lst014": "Trước khi nối LED vào GPIO, nhóm thông tin nào cần được kiểm tra đầy đủ để xác định chiều dòng và bảo vệ chân I/O?",
    "giao-tiep-io-co-ban-pushpull-opendrain-s026": "Nhiều thiết bị cần dùng chung một đường tín hiệu. Phát biểu nào về cách nối đầu ra có thể dẫn đến tranh chấp điện và cần bác bỏ?",
    "giao-tiep-io-co-ban-pull-up-down-q023": "Một công tắc để hở chân đầu vào khi không nhấn. Điện trở kéo lên hoặc kéo xuống có nhiệm vụ chính nào?",
    "giao-tiep-io-co-ban-flyback-s056": "Transistor điều khiển rơ-le thường hỏng đúng lúc ngắt dòng. Nhận định nào phủ nhận sai cơ chế gây hỏng này?",
    "giao-tiep-io-co-ban-analog-input-cnt068": "Một chuỗi thu nhận tương tự cơ bản cần nhận biết những khái niệm nào về so sánh mức, chuyển đổi số, tham chiếu và lấy mẫu?",
    "giao-tiep-io-co-ban-dac-pwm-basic-lst084": "Để tạo mức tương tự từ dữ liệu số bằng DAC hoặc PWM, tập hợp khái niệm nào đầy đủ và cùng thuộc bài toán đầu ra?",
    "giao-tiep-io-co-ban-select-interface-s096": "Bo mạch có nhiều IC tốc độ thấp nhưng ít chân I/O. Khẳng định nào về lựa chọn giao tiếp là quá cứng nhắc và không phù hợp?",
    "bao-ve-cong-io-combined-protection-lst094": "Một đầu vào ngoài cần hạn dòng, giảm nhiễu, kẹp quá áp và giữ mức xác định. Tổ hợp nào hoàn thiện các lớp này mà không thêm chi tiết ngoài yêu cầu?",
    "bao-ve-cong-io-simple-overvoltage-design-s096": "Khi chọn điện trở cho mạch hạn dòng đầu vào, phát biểu nào bỏ qua ảnh hưởng của dòng rò và thời gian chuyển mức?",
    "passive-components-l-39": "Một đường mạch in mang cạnh xung nhanh và dòng đáng kể. Tổ hợp hiệu ứng ký sinh nào cần được tính đến thay vì coi đường đồng là lý tưởng?",
    "passive-components-q-56": "Trong mạch gồm phân áp, LED, lọc nguồn, cuộn cảm và bảo vệ đầu vào, phương án nào liệt kê đúng năm vai trò của linh kiện thụ động?",
    "passive-components-q-80": "Khi rà soát một bo cảm biến, tập hợp nào gồm đủ các vai trò đặt mức, hạn dòng, lọc, tích năng lượng và tạo điều kiện an toàn cho IC?",
    "passive-components-l-87": "Tập hợp chức năng nào của điện trở, tụ và cuộn cảm không lẫn mục đích trang trí hoặc nhận định tách rời GPIO và ADC?",
    "power-esd-thermal-s-2": "Một TVS được đặt gần cổng ngoài nhưng đường xuống mass dài và có điện cảm lớn. Nhận định nào về hiệu quả ESD cần bác bỏ?",
    "diodes-protection-l-39": "Đầu vào công nghiệp cần nhiều tầng bảo vệ. Tổ hợp nào phân đúng vai trò hạn dòng, kẹp xung, lọc, cách ly và tầng hy sinh?",
    "power-esd-thermal-a-19": "Xung ESD đi vào qua đầu nối cáp. Vị trí và cách nối TVS nào tạo đường xả trực tiếp hơn trước khi xung lan vào bo mạch?",
    "power-esd-thermal-q-80": "Một đường xả ESD tốt từ đầu nối qua TVS xuống mass cần đủ bốn đặc điểm nào?",
    "power-esd-thermal-l-63": "Khi bố trí TVS chống ESD, tổ hợp nào mô tả đầy đủ vị trí gần điểm xâm nhập và đường hồi ngắn, thấp cảm?",
    "transistors-loads-q-72": "Trước khi chọn mạch điều khiển động cơ DC, phương án nào liệt kê đủ bảy vấn đề về dòng, nhiễu, điều khiển, bảo vệ và nhiệt?",
    "power-esd-thermal-a-51": "Một tải cần được ngắt ở phía nguồn dương và phải tự bảo vệ khi quá dòng hoặc quá nhiệt. Khối chức năng nào phù hợp nhất?",
    "gpio-level-isolation-q-72": "IC đệm được đặt giữa tín hiệu ngoài và nhiều đầu vào logic. Phương án nào nêu đúng ba vai trò thực tế của tầng đệm?",
    "gpio-level-isolation-l-95": "Điện trở kéo lên I2C bị chọn quá nhỏ. Tổ hợp hệ quả nào đúng khi bus ở mức thấp?",
    "analog-adc-front-end-l-95": "Đối với ADC đo chính xác, tổ hợp nào mô tả đúng vai trò của nguồn tham chiếu cùng ảnh hưởng của nhiễu, sai số và trôi nhiệt?",
    "analog-adc-front-end-q-96": "Một cảm biến có trở kháng nguồn cao nối vào SAR ADC. Phương án nào nêu đủ ba lợi ích chính của mạch đệm khuếch đại thuật toán?",
    "power-esd-thermal-l-71": "Nguồn buck làm phép đo analog dao động theo chu kỳ chuyển mạch. Tổ hợp nào mô tả đầy đủ nguồn nhiễu và hậu quả của bố trí vòng dòng không tốt?",
    "power-esd-thermal-q-72": "Khi đánh giá quá nhiệt, phương án nào nêu đủ ba hậu quả hoặc dấu hiệu cho thấy không thể chỉ sờ vỏ để kết luận mối nối an toàn?",
    "power-esd-thermal-q-96": "Khi so sánh LDO với bộ biến đổi đóng cắt, phương án nào nêu đúng ba đặc điểm về độ đơn giản, nhiễu và nhiệt do chênh áp?"
  };

  const applyDistinctStemOverrides = () => {
    const questions = datasets.flatMap((data) => data.chapters.flatMap((chapter) => chapter.questions));
    Object.entries(distinctStemOverrides).forEach(([id, stem]) => {
      const question = questions.find((item) => item.id === id);
      if (!question) throw new Error(`Không tìm thấy câu cần đổi góc tiếp cận: ${id}`);
      question.stem = stem;
    });
  };

  datasets.forEach(rewriteDuplicateGroups);
  datasets.forEach(rewriteResidualGroups);
  applyComponentOverrides();
  applyDistinctStemOverrides();
})();
