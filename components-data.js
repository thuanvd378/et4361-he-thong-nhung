(() => {
  const OFFICIAL = {
    decoupling: "assets/official/ti-decoupling-transient-02.png",
    practicalCap: "assets/official/ti-decoupling-practical-cap-05.png",
    sar: "assets/official/microchip-sar-input-02.png",
    hysteresis: "assets/official/ti-comparator-hysteresis-05.png",
    solenoid: "assets/official/ti-solenoid-config-05.png"
  };

  const sources = {
    adiPassive: "Analog Devices - Basic Linear Design, Chapter 10",
    tiDecoupling: "Texas Instruments - Decoupling Capacitors",
    microchipSar: "Microchip - AN246 SAR ADC Input",
    tiHysteresis: "Texas Instruments - Comparator with Hysteresis Reference Design",
    tiSolenoid: "Texas Instruments - Using Motor Drivers to Drive Solenoids",
    nxpI2c: "NXP - I2C-bus specification UM10204",
    stEsd: "STMicroelectronics - AN5612 ESD protection",
    tiLdo: "Texas Instruments - Fundamentals of Designing with LDOs",
    tiCurrent: "Texas Instruments - Engineer's Guide to Current Sensing",
    onsemiMosfet: "onsemi - AN-9010 MOSFET Basic",
    nexperiaBjt: "Nexperia - BJT Application Handbook"
  };

  const f = (topic, source, stem, correct, why, wrong) => ({
    topic,
    source,
    stem,
    correct,
    why,
    wrong: wrong.map(([text, reason]) => ({ text, reason }))
  });

  const visual = {
    roles: `
      <svg viewBox="0 0 760 360" role="img" aria-label="Các vai trò linh kiện trong mạch nhúng">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#116b5f"></path>
          </marker>
        </defs>
        <rect x="288" y="112" width="184" height="118" rx="8" fill="#e1f0ec" stroke="#116b5f" stroke-width="3"></rect>
        <text x="380" y="154" text-anchor="middle" font-size="25" font-weight="800" fill="#17211f">Vi điều khiển</text>
        <text x="380" y="190" text-anchor="middle" font-size="16" fill="#5e6a66">đọc, xử lý, điều khiển</text>
        <g fill="#fff" stroke="#d8dfda" stroke-width="2">
          <rect x="38" y="46" width="170" height="76" rx="8"></rect>
          <rect x="38" y="238" width="170" height="76" rx="8"></rect>
          <rect x="552" y="46" width="170" height="76" rx="8"></rect>
          <rect x="552" y="238" width="170" height="76" rx="8"></rect>
        </g>
        <text x="123" y="78" text-anchor="middle" font-size="18" font-weight="800">Điện trở</text>
        <text x="123" y="104" text-anchor="middle" font-size="14">đặt mức, hạn dòng</text>
        <text x="123" y="270" text-anchor="middle" font-size="18" font-weight="800">Tụ, cuộn cảm</text>
        <text x="123" y="296" text-anchor="middle" font-size="14">lọc, tích năng lượng</text>
        <text x="637" y="78" text-anchor="middle" font-size="18" font-weight="800">Diode, TVS</text>
        <text x="637" y="104" text-anchor="middle" font-size="14">kẹp áp, bảo vệ</text>
        <text x="637" y="270" text-anchor="middle" font-size="18" font-weight="800">Transistor</text>
        <text x="637" y="296" text-anchor="middle" font-size="14">đóng cắt tải</text>
        <g stroke="#116b5f" stroke-width="3" fill="none" marker-end="url(#arrow)">
          <path d="M210 84 C252 88 258 120 286 140"></path>
          <path d="M210 276 C252 270 258 224 286 202"></path>
          <path d="M550 84 C508 92 500 124 474 142"></path>
          <path d="M550 276 C506 266 500 224 474 202"></path>
        </g>
      </svg>
    `,
    divider: `
      <svg viewBox="0 0 760 360" role="img" aria-label="Cầu phân áp đưa tín hiệu vào ADC">
        <path d="M96 52 H248" stroke="#17211f" stroke-width="4"></path>
        <text x="92" y="45" font-size="18" font-weight="800">Vin</text>
        <path d="M248 52 v42 l-22 12 44 24 -44 24 44 24 -44 24 22 12 v42" fill="none" stroke="#17211f" stroke-width="4"></path>
        <text x="288" y="138" font-size="18" font-weight="800">R1</text>
        <circle cx="248" cy="256" r="6" fill="#116b5f"></circle>
        <path d="M248 256 H470" stroke="#116b5f" stroke-width="4"></path>
        <path d="M248 256 v36 l-22 12 44 24 -44 24" fill="none" stroke="#17211f" stroke-width="4"></path>
        <text x="288" y="324" font-size="18" font-weight="800">R2</text>
        <path d="M248 352 v20 M218 372 h60 M228 384 h40 M238 396 h20" stroke="#17211f" stroke-width="4"></path>
        <rect x="470" y="210" width="176" height="94" rx="8" fill="#e1f0ec" stroke="#116b5f" stroke-width="3"></rect>
        <text x="558" y="252" text-anchor="middle" font-size="23" font-weight="800">ADC</text>
        <text x="558" y="282" text-anchor="middle" font-size="15">đo điện áp tại nút giữa</text>
        <text x="250" y="242" font-size="17" fill="#116b5f" font-weight="800">Vout = Vin nhân R2 / tổng R1 và R2</text>
        <text x="78" y="326" font-size="15" fill="#5e6a66">Nếu R1 và R2 quá lớn, tụ lấy mẫu của ADC nạp chậm.</text>
      </svg>
    `,
    inductor: `
      <svg viewBox="0 0 760 360" role="img" aria-label="Cuộn cảm và dòng hồi tiếp">
        <path class="moving-flow" d="M90 178 H230" stroke="#116b5f" stroke-width="5" stroke-linecap="round"></path>
        <path d="M230 178 c18 -42 52 -42 70 0 c18 42 52 42 70 0 c18 -42 52 -42 70 0 c18 42 52 42 70 0" fill="none" stroke="#17211f" stroke-width="5"></path>
        <path class="moving-flow delay" d="M510 178 H650" stroke="#116b5f" stroke-width="5" stroke-linecap="round"></path>
        <text x="380" y="88" text-anchor="middle" font-size="24" font-weight="800">Cuộn cảm chống thay đổi dòng đột ngột</text>
        <text x="380" y="126" text-anchor="middle" font-size="16" fill="#5e6a66">Khi ngắt tải cảm, năng lượng phải có đường thoát an toàn.</text>
        <rect x="118" y="232" width="524" height="74" rx="8" fill="#fff1cf" stroke="#ead195"></rect>
        <text x="380" y="264" text-anchor="middle" font-size="17" font-weight="800" fill="#9d6500">Công thức cần hiểu bằng lời</text>
        <text x="380" y="291" text-anchor="middle" font-size="15" fill="#5e6a66">Dòng đổi càng nhanh, điện áp trên cuộn cảm càng lớn.</text>
      </svg>
    `,
    diode: `
      <svg viewBox="0 0 760 360" role="img" aria-label="Diode dẫn một chiều và kẹp điện áp">
        <defs>
          <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#116b5f"></path>
          </marker>
        </defs>
        <text x="380" y="54" text-anchor="middle" font-size="25" font-weight="800">Diode giống van một chiều cho dòng điện</text>
        <path d="M130 165 H270" stroke="#17211f" stroke-width="5"></path>
        <path d="M270 112 L270 218 L372 165 z" fill="#e1f0ec" stroke="#17211f" stroke-width="5"></path>
        <path d="M388 112 V218" stroke="#17211f" stroke-width="5"></path>
        <path d="M388 165 H620" stroke="#17211f" stroke-width="5"></path>
        <path class="moving-flow" d="M142 132 H250" stroke="#116b5f" stroke-width="4" marker-end="url(#arr2)"></path>
        <text x="256" y="258" font-size="16" font-weight="800">Dẫn thuận</text>
        <text x="382" y="258" font-size="16" font-weight="800">Chặn ngược</text>
        <rect x="134" y="282" width="492" height="44" rx="8" fill="#fde8e4" stroke="#e3a59c"></rect>
        <text x="380" y="310" text-anchor="middle" font-size="15" fill="#b34338">Không dùng một loại diode cho mọi việc: chỉnh lưu, Schottky, Zener, TVS và flyback có mục tiêu khác nhau.</text>
      </svg>
    `,
    tvs: `
      <svg viewBox="0 0 760 360" role="img" aria-label="TVS đặt gần đầu nối để kẹp xung">
        <text x="380" y="48" text-anchor="middle" font-size="24" font-weight="800">Bảo vệ xung: chặn năng lượng trước khi vào vi điều khiển</text>
        <rect x="70" y="132" width="130" height="86" rx="8" fill="#eef3f0" stroke="#d8dfda"></rect>
        <text x="135" y="170" text-anchor="middle" font-size="18" font-weight="800">Đầu nối</text>
        <path d="M200 175 H338" stroke="#17211f" stroke-width="5"></path>
        <path d="M338 175 v-40 l30 40 -30 40 v-40 h-40" fill="none" stroke="#b34338" stroke-width="5"></path>
        <path d="M338 215 v54 M306 269 h64 M318 282 h40 M330 295 h16" stroke="#17211f" stroke-width="4"></path>
        <path d="M368 175 H558" stroke="#17211f" stroke-width="5"></path>
        <rect x="558" y="126" width="142" height="98" rx="8" fill="#e1f0ec" stroke="#116b5f" stroke-width="3"></rect>
        <text x="629" y="168" text-anchor="middle" font-size="18" font-weight="800">Chân MCU</text>
        <text x="380" y="96" text-anchor="middle" font-size="15" fill="#5e6a66">TVS nên đặt gần đầu nối để dòng xung đi xuống mass bằng đường ngắn.</text>
      </svg>
    `,
    bjtMosfet: `
      <svg viewBox="0 0 760 360" role="img" aria-label="So sánh BJT và MOSFET">
        <text x="380" y="48" text-anchor="middle" font-size="24" font-weight="800">BJT cần dòng điều khiển, MOSFET cần nạp cổng</text>
        <rect x="70" y="96" width="276" height="198" rx="8" fill="#fff" stroke="#d8dfda"></rect>
        <rect x="414" y="96" width="276" height="198" rx="8" fill="#fff" stroke="#d8dfda"></rect>
        <text x="208" y="136" text-anchor="middle" font-size="22" font-weight="800">BJT</text>
        <text x="208" y="174" text-anchor="middle" font-size="16">Dòng nhỏ ở chân nền</text>
        <text x="208" y="202" text-anchor="middle" font-size="16">điều khiển dòng tải lớn hơn</text>
        <path d="M168 244 H248 M208 184 V244 M168 210 L208 244 L248 210" stroke="#17211f" stroke-width="4" fill="none"></path>
        <text x="552" y="136" text-anchor="middle" font-size="22" font-weight="800">MOSFET</text>
        <text x="552" y="174" text-anchor="middle" font-size="16">Điện áp cổng tạo kênh dẫn</text>
        <text x="552" y="202" text-anchor="middle" font-size="16">nhưng cổng có điện dung cần nạp</text>
        <path d="M520 244 H584 M552 182 V244 M506 202 V286 M598 202 V286" stroke="#17211f" stroke-width="4" fill="none"></path>
      </svg>
    `,
    gpio: `
      <svg viewBox="0 0 760 360" role="img" aria-label="GPIO cần trạng thái xác định và bảo vệ">
        <text x="380" y="50" text-anchor="middle" font-size="24" font-weight="800">Chân GPIO không tự hiểu đúng nếu bị thả nổi</text>
        <path d="M166 92 V150 l-18 10 36 20 -36 20 36 20 -18 10 V274" fill="none" stroke="#17211f" stroke-width="4"></path>
        <text x="196" y="170" font-size="17" font-weight="800">Kéo lên</text>
        <path d="M166 92 H166 M130 92 H202" stroke="#17211f" stroke-width="4"></path>
        <text x="108" y="97" font-size="15">Nguồn</text>
        <circle cx="166" cy="274" r="6" fill="#116b5f"></circle>
        <path d="M166 274 H432" stroke="#116b5f" stroke-width="4"></path>
        <rect x="432" y="232" width="180" height="84" rx="8" fill="#e1f0ec" stroke="#116b5f" stroke-width="3"></rect>
        <text x="522" y="270" text-anchor="middle" font-size="20" font-weight="800">Đầu vào MCU</text>
        <path d="M166 274 v44 M140 318 h52" stroke="#17211f" stroke-width="4"></path>
        <text x="106" y="326" font-size="15">Nút nhấn</text>
        <rect x="96" y="22" width="568" height="42" rx="8" fill="#fff1cf" stroke="#ead195"></rect>
        <text x="380" y="49" text-anchor="middle" font-size="15" fill="#9d6500">Khi nút hở, điện trở kéo lên tạo mức 1. Khi nhấn, nút kéo xuống mass tạo mức 0.</text>
      </svg>
    `,
    i2c: `
      <svg viewBox="0 0 760 360" role="img" aria-label="Bus I2C dùng hai dây kéo lên">
        <text x="380" y="48" text-anchor="middle" font-size="24" font-weight="800">Bus hai dây cần điện trở kéo lên</text>
        <path d="M120 128 H650 M120 210 H650" stroke="#116b5f" stroke-width="5"></path>
        <text x="76" y="134" font-size="18" font-weight="800">SDA</text>
        <text x="76" y="216" font-size="18" font-weight="800">SCL</text>
        <g fill="#fff" stroke="#d8dfda" stroke-width="2">
          <rect x="160" y="250" width="116" height="68" rx="8"></rect>
          <rect x="328" y="250" width="116" height="68" rx="8"></rect>
          <rect x="496" y="250" width="116" height="68" rx="8"></rect>
        </g>
        <text x="218" y="289" text-anchor="middle" font-size="16" font-weight="800">MCU</text>
        <text x="386" y="289" text-anchor="middle" font-size="16" font-weight="800">Cảm biến</text>
        <text x="554" y="289" text-anchor="middle" font-size="16" font-weight="800">EEPROM</text>
        <path d="M218 250 V128 M228 250 V210 M386 250 V128 M396 250 V210 M554 250 V128 M564 250 V210" stroke="#17211f" stroke-width="3"></path>
        <path d="M600 128 V88 l-16 -8 32 -16 -32 -16 16 -8 V20 M626 210 V88 l-16 -8 32 -16 -32 -16 16 -8 V20" fill="none" stroke="#17211f" stroke-width="3"></path>
        <text x="650" y="66" font-size="14">điện trở kéo lên</text>
        <text x="380" y="344" text-anchor="middle" font-size="15" fill="#5e6a66">R quá lớn làm cạnh lên chậm; R quá nhỏ làm thiết bị phải kéo dòng lớn.</text>
      </svg>
    `,
    analogChain: `
      <svg viewBox="0 0 760 360" role="img" aria-label="Chuỗi đo analog trước ADC">
        <defs>
          <marker id="arr3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#116b5f"></path>
          </marker>
        </defs>
        <text x="380" y="48" text-anchor="middle" font-size="24" font-weight="800">Đo analog tốt là cả một chuỗi, không chỉ là ADC</text>
        <g fill="#fff" stroke="#d8dfda" stroke-width="2">
          <rect x="54" y="130" width="126" height="74" rx="8"></rect>
          <rect x="230" y="130" width="126" height="74" rx="8"></rect>
          <rect x="406" y="130" width="126" height="74" rx="8"></rect>
          <rect x="582" y="130" width="126" height="74" rx="8"></rect>
        </g>
        <text x="117" y="172" text-anchor="middle" font-size="17" font-weight="800">Cảm biến</text>
        <text x="293" y="164" text-anchor="middle" font-size="17" font-weight="800">Khuếch đại</text>
        <text x="293" y="186" text-anchor="middle" font-size="14">hoặc đệm</text>
        <text x="469" y="172" text-anchor="middle" font-size="17" font-weight="800">Lọc thấp</text>
        <text x="645" y="172" text-anchor="middle" font-size="17" font-weight="800">ADC</text>
        <path d="M180 167 H228 M356 167 H404 M532 167 H580" stroke="#116b5f" stroke-width="4" marker-end="url(#arr3)"></path>
        <rect x="116" y="246" width="528" height="52" rx="8" fill="#eef2fb" stroke="#c9d2e8"></rect>
        <text x="380" y="278" text-anchor="middle" font-size="15" fill="#374a78">Op-amp giúp giảm trở nguồn; bộ lọc chống nhiễu cao tần; tham chiếu quyết định độ tin của kết quả.</text>
      </svg>
    `,
    power: `
      <svg viewBox="0 0 760 360" role="img" aria-label="Nguồn cho hệ nhúng">
        <text x="380" y="48" text-anchor="middle" font-size="24" font-weight="800">Nguồn không chỉ là đủ điện áp</text>
        <g fill="#fff" stroke="#d8dfda" stroke-width="2">
          <rect x="76" y="112" width="176" height="116" rx="8"></rect>
          <rect x="292" y="112" width="176" height="116" rx="8"></rect>
          <rect x="508" y="112" width="176" height="116" rx="8"></rect>
        </g>
        <text x="164" y="150" text-anchor="middle" font-size="21" font-weight="800">LDO</text>
        <text x="164" y="180" text-anchor="middle" font-size="15">êm, đơn giản</text>
        <text x="164" y="204" text-anchor="middle" font-size="15">nhưng nóng khi sụt áp lớn</text>
        <text x="380" y="150" text-anchor="middle" font-size="21" font-weight="800">Buck</text>
        <text x="380" y="180" text-anchor="middle" font-size="15">hiệu suất cao</text>
        <text x="380" y="204" text-anchor="middle" font-size="15">nhưng tạo nhiễu chuyển mạch</text>
        <text x="596" y="150" text-anchor="middle" font-size="21" font-weight="800">Bảo vệ</text>
        <text x="596" y="180" text-anchor="middle" font-size="15">ngược cực, quá dòng</text>
        <text x="596" y="204" text-anchor="middle" font-size="15">quá áp, ESD</text>
        <rect x="124" y="278" width="512" height="46" rx="8" fill="#e1f0ec" stroke="#b8d6cf"></rect>
        <text x="380" y="306" text-anchor="middle" font-size="15" fill="#116b5f">MCU cần nguồn ổn định, reset đúng lúc và tụ đặt gần chân nguồn.</text>
      </svg>
    `,
    thermal: `
      <svg viewBox="0 0 760 360" role="img" aria-label="Đường thoát nhiệt từ chip ra môi trường">
        <text x="380" y="48" text-anchor="middle" font-size="24" font-weight="800">Công suất biến thành nhiệt và phải thoát ra ngoài</text>
        <rect x="310" y="92" width="140" height="80" rx="8" fill="#fde8e4" stroke="#b34338" stroke-width="3"></rect>
        <text x="380" y="137" text-anchor="middle" font-size="20" font-weight="800">Mối nối chip</text>
        <path d="M380 172 V238" stroke="#b34338" stroke-width="6"></path>
        <rect x="250" y="238" width="260" height="48" rx="8" fill="#fff1cf" stroke="#ead195"></rect>
        <text x="380" y="269" text-anchor="middle" font-size="18" font-weight="800">Vỏ linh kiện và mạch in</text>
        <path d="M250 304 H510" stroke="#17211f" stroke-width="5"></path>
        <path d="M250 318 H510" stroke="#17211f" stroke-width="3"></path>
        <text x="380" y="342" text-anchor="middle" font-size="15" fill="#5e6a66">Điện trở nhiệt càng lớn, cùng một công suất sẽ làm nhiệt độ chip tăng càng nhiều.</text>
      </svg>
    `
  };

  const makeSlide = (title, subtitle, paragraphs, options = {}) => ({
    title,
    subtitle,
    paragraphs,
    visualHtml: options.visualHtml || "",
    image: options.image || "",
    imageAlt: options.imageAlt || "",
    keyPoints: options.keyPoints || [],
    source: options.source || "",
    sourceUrl: options.sourceUrl || "",
    selfCheck: options.selfCheck || ""
  });

  const chapters = [
    {
      id: "passive-components",
      title: "1. Linh kiện thụ động trong mạch nhúng",
      subtitle: "Điện trở, tụ điện, cuộn cảm, ferrite bead, dây dẫn, công thức và các lỗi hay gặp.",
      sourceRange: "Mục 1-3 trong tài liệu cấu kiện",
      lessonSlides: [
        makeSlide(
          "Linh kiện thụ động làm gì trong mạch nhúng?",
          "Hãy xem chúng như phần tạo luật giao thông cho tín hiệu và dòng điện.",
          [
            "Vi điều khiển chỉ xử lý được tín hiệu nằm trong giới hạn an toàn. Điện trở, tụ và cuộn cảm giúp tạo mức, giới hạn dòng, lọc nhiễu và tích năng lượng.",
            "Khi làm bài, đừng chỉ gọi tên linh kiện. Hãy hỏi: linh kiện này đang đặt mức, hạn dòng, lọc, bảo vệ hay tạo đường dòng hồi tiếp?"
          ],
          {
            visualHtml: visual.roles,
            keyPoints: ["Điện trở: đặt mức và hạn dòng.", "Tụ: cấp dòng tức thời và lọc nhiễu.", "Cuộn cảm: chống thay đổi dòng đột ngột."],
            source: sources.adiPassive,
            sourceUrl: "https://www.analog.com/media/en/training-seminars/design-handbooks/Basic-Linear-Design/Chapter10.pdf",
            selfCheck: "Bố cục kiểm tra: bốn vai trò đặt quanh MCU, không chồng chữ, mũi tên chỉ về khối xử lý."
          }
        ),
        makeSlide(
          "Điện trở: từ hạn dòng đến cầu phân áp",
          "Điện trở không chỉ làm giảm dòng, nó còn tạo điểm đo cho ADC.",
          [
            "Cầu phân áp biến điện áp lớn thành điện áp nhỏ hơn để ADC đo được. Nhưng nút giữa cầu phân áp không phải nguồn lý tưởng.",
            "Nếu điện trở quá lớn, tụ lấy mẫu bên trong ADC nạp chậm. Kết quả là số đọc có thể thấp hoặc dao động dù công thức phân áp nhìn có vẻ đúng."
          ],
          {
            visualHtml: visual.divider,
            keyPoints: ["Kiểm tra dòng và công suất điện trở.", "Với ADC, cần quan tâm trở kháng nhìn từ nút đo.", "R quá lớn tiết kiệm dòng nhưng dễ sai đo."],
            source: "Microchip AN246 và tài liệu cấu kiện, mục điện trở phân áp vào ADC",
            sourceUrl: "https://ww1.microchip.com/downloads/en/appnotes/00246a.pdf",
            selfCheck: "Bố cục kiểm tra: công thức viết bằng lời, tránh ký hiệu dày đặc, đường tín hiệu vào ADC rõ."
          }
        ),
        makeSlide(
          "Tụ decoupling: bình nước nhỏ đặt sát nơi cần dùng",
          "Local decoupling cấp dòng xung nhanh cho IC, bulk decoupling cấp năng lượng chậm hơn cho cả vùng nguồn.",
          [
            "Khi mạch số chuyển trạng thái, dòng tức thời có thể tăng rất nhanh. Nếu dòng phải đi từ nguồn xa qua đường mạch dài, điện cảm đường mạch làm nguồn tại IC bị sụt hoặc nhiễu.",
            "Tụ nhỏ đặt sát chân nguồn và mass tạo đường dòng ngắn, điện cảm thấp. Tụ lớn hơn thường đặt gần đầu vào nguồn hoặc cụm tải."
          ],
          {
            image: OFFICIAL.decoupling,
            imageAlt: "Trang minh họa tụ decoupling local và bulk của Texas Instruments",
            keyPoints: ["Tụ local đặt sát chân nguồn của IC.", "Đường dòng càng ngắn càng tốt.", "Tụ bulk nạp lại năng lượng cho các tụ local."],
            source: sources.tiDecoupling,
            sourceUrl: "https://www.ti.com/content/dam/videos/external-videos/de-de/9/3816841626001/6313253251112.mp4/subassets/notes-decoupling_capacitors.pdf",
            selfCheck: "Bố cục kiểm tra: hình chính thống rõ, chữ giải thích không đè lên hình."
          }
        ),
        makeSlide(
          "Tụ thật, cuộn cảm và ferrite bead",
          "Ở tần số cao, linh kiện không còn giống mô hình lý tưởng trong sách cơ bản.",
          [
            "Tụ thật có điện trở và điện cảm ký sinh. Vì vậy trở kháng tụ giảm đến một vùng rồi lại tăng ở tần số cao.",
            "Cuộn cảm và ferrite bead dùng để xử lý dòng/nhiễu theo tần số, nhưng phải chọn theo dòng bão hòa, tổn hao và dải tần cần chặn."
          ],
          {
            image: OFFICIAL.practicalCap,
            imageAlt: "Trang minh họa mô hình tụ thực tế của Texas Instruments",
            keyPoints: ["Tụ có ESR và ESL.", "Ferrite bead không phải linh kiện kỳ diệu chặn mọi nhiễu.", "Dây dẫn, trace và connector cũng có ký sinh."],
            source: sources.tiDecoupling,
            sourceUrl: "https://www.ti.com/content/dam/videos/external-videos/de-de/9/3816841626001/6313253251112.mp4/subassets/notes-decoupling_capacitors.pdf",
            selfCheck: "Bố cục kiểm tra: hình official đặt bên trái/phía trên, các ý chính ngắn và không dùng quá nhiều ký hiệu."
          }
        )
      ],
      facts: [
        f("vai trò linh kiện thụ động", sources.adiPassive, "Trong mạch nhúng, điện trở, tụ và cuộn cảm thường được dùng để làm gì?", "Đặt mức tín hiệu, hạn dòng, lọc nhiễu, tích năng lượng và tạo điều kiện an toàn cho IC xử lý tín hiệu.", "Tài liệu cấu kiện mở đầu bằng vai trò đặt mức, giới hạn dòng, lọc/lưu năng lượng và điều hòa tín hiệu.", [
          ["Chỉ dùng để trang trí tài liệu mạch.", "Các linh kiện này quyết định hành vi điện của tín hiệu và nguồn."],
          ["Chỉ xuất hiện trong mạch công suất lớn, không liên quan GPIO hay ADC.", "Chúng xuất hiện cả ở GPIO, ADC, nguồn, giao tiếp và bảo vệ."],
          ["Không ảnh hưởng kết quả đo hay độ ổn định hệ nhúng.", "Giá trị và vị trí linh kiện có thể làm ADC sai, nguồn nhiễu hoặc giao tiếp lỗi."]
        ]),
        f("cầu phân áp", "Tài liệu cấu kiện, mục điện trở phân áp vào ADC", "Cầu phân áp đưa tín hiệu vào ADC có rủi ro gì nếu chọn điện trở quá lớn?", "Trở kháng nguồn nhìn từ nút đo lớn làm tụ lấy mẫu ADC nạp chậm, kết quả đo có thể sai.", "Microchip AN246 nhấn mạnh điện trở nguồn và tụ lấy mẫu tạo mạch RC cần đủ thời gian ổn định.", [
          ["Điện trở càng lớn thì ADC luôn càng chính xác trong mọi trường hợp.", "Điện trở lớn tiết kiệm dòng nhưng tăng trở kháng nguồn và nhạy nhiễu."],
          ["Điện trở lớn chỉ làm LED sáng hơn, không liên quan ADC.", "Với ADC, nó ảnh hưởng thời gian nạp tụ lấy mẫu."],
          ["ADC không có tụ hay mạch lấy mẫu nên không bị ảnh hưởng.", "SAR ADC có tụ lấy mẫu và công tắc bên trong."]
        ]),
        f("điện trở hạn dòng", "Tài liệu cấu kiện, mục điện trở hạn dòng LED", "Khi dùng điện trở hạn dòng LED hoặc optocoupler, ngoài dòng mong muốn cần kiểm tra gì?", "Cần kiểm tra giới hạn dòng của chân điều khiển, sụt áp linh kiện và công suất trên điện trở.", "Điện trở chịu công suất theo dòng và sụt áp, còn GPIO có giới hạn nguồn/hút dòng.", [
          ["Chỉ cần LED sáng là chắc chắn mạch bền.", "LED sáng không đảm bảo GPIO hoặc điện trở không quá tải."],
          ["Không cần điện trở vì GPIO tự giới hạn dòng vô hạn.", "GPIO không phải nguồn dòng lý tưởng."],
          ["Công suất điện trở không bao giờ đáng quan tâm.", "Điện trở quá công suất có thể nóng hoặc hỏng."]
        ]),
        f("pull-up và pull-down", "Tài liệu cấu kiện, mục Pull-up và pull-down", "Điện trở kéo lên/kéo xuống dùng để làm gì?", "Tạo trạng thái mặc định cho tín hiệu khi không có phần tử nào chủ động kéo mức.", "Pull-up kéo về mức cao, pull-down kéo về mức thấp, tránh trạng thái thả nổi.", [
          ["Để làm chân input trôi tự do cho nhạy hơn.", "Input thả nổi dễ đọc sai do nhiễu."],
          ["Chỉ dùng trong mạch nguồn buck, không dùng ở GPIO.", "Pull-up/pull-down rất hay dùng ở GPIO, I2C, nút nhấn."],
          ["Giá trị điện trở không ảnh hưởng nhiễu hay tốc độ cạnh.", "R lớn làm cạnh chậm và nhạy nhiễu; R nhỏ tốn dòng."]
        ]),
        f("tụ decoupling", sources.tiDecoupling, "Tụ decoupling local nên đặt ở đâu?", "Đặt sát chân nguồn và chân mass của IC để cung cấp dòng xung nhanh qua đường có điện cảm thấp.", "TI giải thích local decoupling cung cấp dòng tần số cao và cần đường nối thấp điện cảm.", [
          ["Đặt càng xa IC càng tốt để đường mạch dài hơn.", "Đường dài tăng điện cảm và giảm tác dụng ở xung nhanh."],
          ["Chỉ cần một tụ lớn ở đầu nguồn cho mọi IC.", "Tụ bulk và tụ local có vai trò khác nhau."],
          ["Tụ decoupling chỉ dùng cho mạch analog, không dùng mạch số.", "Mạch số tạo dòng xung rất cần decoupling local."]
        ]),
        f("tụ thực tế", sources.tiDecoupling, "Vì sao tụ thật không phải lúc nào cũng tốt hơn khi tăng tần số?", "Vì tụ có điện trở và điện cảm ký sinh; sau vùng tự cộng hưởng, trở kháng có thể tăng như một cuộn cảm.", "TI mô tả tụ thực có vùng điện dung, vùng điện trở và vùng cảm kháng do ESR/ESL.", [
          ["Tụ thật luôn có trở kháng giảm mãi khi tần số tăng.", "Đó là mô hình tụ lý tưởng, không phải tụ thực."],
          ["ESR và ESL không tồn tại trong tụ thật.", "Tụ thật luôn có ký sinh."],
          ["Tự cộng hưởng không liên quan thiết kế nguồn.", "Nó ảnh hưởng hiệu quả lọc/decoupling ở tần số cao."]
        ]),
        f("lọc RC", "Tài liệu cấu kiện, mục tụ điện và lọc RC", "Tăng hằng số thời gian RC trong mạch lọc thông thấp thường gây đánh đổi gì?", "Giảm nhiễu cao tần tốt hơn nhưng làm tín hiệu đáp ứng chậm hơn.", "Mạch RC có hằng số thời gian càng lớn thì càng làm mượt nhưng càng trễ.", [
          ["Giảm nhiễu mà không bao giờ làm chậm tín hiệu.", "Lọc luôn có đánh đổi giữa băng thông và thời gian đáp ứng."],
          ["Làm tín hiệu biến mất khỏi ADC trong mọi trường hợp.", "Nếu chọn đúng, lọc giúp ADC đọc ổn định hơn."],
          ["Chỉ ảnh hưởng màu dây trên PCB.", "RC ảnh hưởng trực tiếp dạng tín hiệu theo thời gian."]
        ]),
        f("cuộn cảm", "Tài liệu cấu kiện, mục cuộn cảm", "Khi ngắt dòng qua tải cảm như relay, điều gì xảy ra?", "Tải cảm tạo điện áp ngược để cố duy trì dòng; cần đường xả năng lượng an toàn.", "Năng lượng trong cuộn cảm không biến mất tức thời, vì vậy cần diode, TVS, snubber hoặc driver bảo vệ.", [
          ["Dòng qua cuộn cảm về 0 ngay lập tức mà không sinh điện áp.", "Cuộn cảm chống thay đổi dòng đột ngột."],
          ["Điện áp ngược luôn vô hại với transistor.", "Spike có thể phá transistor hoặc MCU."],
          ["Không cần bảo vệ nếu relay nhỏ.", "Relay nhỏ vẫn là tải cảm và vẫn sinh điện áp ngược."]
        ]),
        f("ferrite bead", "Tài liệu cấu kiện, mục ferrite bead", "Ferrite bead trong mạch nhúng thường dùng với mục đích gì?", "Tăng trở kháng với nhiễu cao tần trên đường nguồn hoặc tín hiệu, nhưng phải chọn theo dải tần và dòng.", "Ferrite bead không phải linh kiện lọc mọi nhiễu; đặc tính phụ thuộc tần số và dòng bão hòa.", [
          ["Thay thế được mọi tụ decoupling.", "Ferrite bead thường dùng cùng tụ, không thay toàn bộ decoupling."],
          ["Không cần quan tâm dòng chạy qua bead.", "Dòng lớn có thể làm bead bão hòa hoặc nóng."],
          ["Chặn được cả tín hiệu mong muốn ở mọi tần số mà không ảnh hưởng.", "Nó có đặc tuyến theo tần số nên phải chọn đúng."]
        ]),
        f("trace và connector", "Tài liệu cấu kiện, mục dây dẫn, trace và connector", "Vì sao trace PCB và connector cũng được xem như linh kiện trong thiết kế nhúng?", "Vì chúng có điện trở, điện cảm, điện dung ký sinh và có thể gây sụt áp, ringing, nhiễu hoặc méo tín hiệu.", "Tài liệu nhấn mạnh dây dẫn/trace/connector không lý tưởng, nhất là với dòng xung và tín hiệu nhanh.", [
          ["Vì chúng hoàn toàn lý tưởng nên không cần xét.", "Đường mạch thực có ký sinh."],
          ["Chỉ ảnh hưởng vẻ ngoài PCB.", "Chúng ảnh hưởng hành vi điện."],
          ["Chỉ quan trọng trong mạch không dùng điện.", "Mọi mạch điện thực đều chịu ảnh hưởng đường nối."]
        ])
      ]
    },
    {
      id: "diodes-protection",
      title: "2. Diode và bảo vệ mạch",
      subtitle: "Diode PN, Schottky, Zener, TVS, diode flyback và bảo vệ quá áp.",
      sourceRange: "Mục 4, 8, 16 trong tài liệu cấu kiện",
      lessonSlides: [
        makeSlide("Diode là van một chiều của dòng điện", "Muốn hiểu diode, hãy bắt đầu từ hướng dòng và giới hạn điện áp.", [
          "Diode thường cho dòng đi dễ hơn theo một chiều và chặn chiều ngược. Nhưng mỗi loại diode được tối ưu cho một việc khác nhau.",
          "Trong mạch nhúng, diode hay xuất hiện ở bảo vệ ngược cực, kẹp quá áp, dập xung tải cảm và bảo vệ ESD."
        ], { visualHtml: visual.diode, keyPoints: ["PN diode: chỉnh lưu cơ bản.", "Schottky: sụt áp thấp và nhanh.", "Zener/TVS: làm việc vùng ngược để kẹp áp."], source: "onsemi Zener Theory, TI Ideal Diodes, ST AN5612", sourceUrl: "https://www.st.com/resource/en/application_note/an5612-esd-protection-of-stm32-mcus-and-mpus-stmicroelectronics.pdf", selfCheck: "Hình diode đơn giản, không dùng quá nhiều ký hiệu, phần cảnh báo tách riêng." }),
        makeSlide("Zener và TVS: cùng kẹp áp nhưng không cùng nhiệm vụ", "Zener thường dùng cho mức áp nhỏ/năng lượng thấp; TVS sinh ra để chịu xung nhanh.", [
          "Khi điện áp vượt ngưỡng, diode kẹp dẫn dòng để giữ nút tín hiệu trong vùng an toàn hơn. Năng lượng xung phải đi về mass hoặc nguồn theo đường ngắn.",
          "TVS nên đặt gần đầu nối. Nếu đặt xa, dòng xung vẫn đi sâu vào mạch trước khi bị kẹp."
        ], { visualHtml: visual.tvs, keyPoints: ["Zener không thay TVS trong xung năng lượng lớn.", "TVS có điện dung, ảnh hưởng đường tín hiệu nhanh.", "Đường mass của TVS phải ngắn và rộng."], source: sources.stEsd, sourceUrl: "https://www.st.com/resource/en/application_note/an5612-esd-protection-of-stm32-mcus-and-mpus-stmicroelectronics.pdf", selfCheck: "Mũi dòng xung đi xuống mass rõ, không chồng lên khối MCU." }),
        makeSlide("Diode flyback: đường thoát năng lượng cho tải cảm", "Khi relay hoặc solenoid tắt, dòng cần một đường đi tiếp trong thời gian ngắn.", [
          "Nếu không có đường hồi tiếp, cuộn dây tạo điện áp rất cao trên transistor. Diode flyback cho dòng đi vòng qua cuộn dây để điện áp không vọt quá lớn.",
          "Diode flyback bảo vệ tốt nhưng làm relay nhả chậm hơn. Một số mạch dùng TVS hoặc clamp để nhả nhanh hơn."
        ], { image: OFFICIAL.solenoid, imageAlt: "Trang TI minh họa low-side, high-side và diode freewheel cho solenoid", keyPoints: ["Tải cảm lưu năng lượng.", "Khi tắt cần đường dòng hồi tiếp.", "Tốc độ nhả phụ thuộc cách kẹp áp."], source: sources.tiSolenoid, sourceUrl: "https://www.ti.com/lit/slvae59", selfCheck: "Hình official có mũi dòng freewheel rõ, phần giải thích không phủ lên hình." }),
        makeSlide("Bảo vệ chân IC là bảo vệ theo lớp", "Một linh kiện bảo vệ đơn lẻ hiếm khi đủ cho môi trường xấu.", [
          "Một đường vào từ ngoài thường cần điện trở nối tiếp, phần tử kẹp xung, lọc nhỏ và bố trí layout đúng.",
          "Điện trở series giới hạn dòng vào diode clamp. TVS kẹp xung lớn. Tụ nhỏ lọc nhiễu cao tần. Vị trí đặt quyết định hiệu quả."
        ], { visualHtml: visual.tvs, keyPoints: ["Bảo vệ phải đặt gần nơi xung đi vào.", "Luôn nghĩ đến đường dòng xung.", "Không đổ dòng lớn vào rail nguồn của MCU."], source: "ST AN5612 và tài liệu cấu kiện, mục bảo vệ GPIO", sourceUrl: "https://www.st.com/resource/en/application_note/an5612-esd-protection-of-stm32-mcus-and-mpus-stmicroelectronics.pdf", selfCheck: "Slide nhắc layout và đường dòng, tránh biến bảo vệ thành danh sách tên linh kiện." })
      ],
      facts: [
        f("diode PN", "Tài liệu cấu kiện, mục diode PN", "Diode PN cơ bản thường được hiểu như thế nào trong mạch nhúng?", "Nó dẫn thuận theo một chiều và chặn chiều ngược trong giới hạn cho phép.", "Đây là cách hiểu nền tảng trước khi phân biệt Schottky, Zener, TVS và flyback.", [["Dẫn mạnh như dây nối ở mọi chiều.", "Diode có hướng dẫn ưu tiên và giới hạn điện áp/dòng."], ["Không có sụt áp khi dẫn.", "Diode thực có sụt áp thuận."], ["Không bao giờ nóng.", "Dòng và sụt áp tạo công suất nhiệt."]]),
        f("Schottky", "TI Basics of Ideal Diodes", "Ưu điểm thường gặp của Schottky diode là gì?", "Sụt áp thuận thấp và chuyển mạch nhanh hơn diode PN thông thường.", "Schottky hay dùng trong bảo vệ ngược cực, ORing nguồn và một số mạch tốc độ cao.", [["Dòng rò luôn bằng 0 trong mọi nhiệt độ.", "Schottky thường có dòng rò ngược cao hơn PN."], ["Luôn chịu điện áp ngược cao nhất trong mọi loại diode.", "Phải kiểm tra điện áp ngược định mức."], ["Chỉ dùng làm tụ decoupling.", "Schottky là diode, không phải tụ."]]),
        f("Zener", "onsemi Zener Theory", "Zener diode thường dùng để làm gì?", "Làm phần tử kẹp hoặc tạo mức tham chiếu đơn giản ở vùng đánh thủng ngược, cho năng lượng không quá lớn.", "Zener hoạt động có kiểm soát ở vùng ngược để giữ điện áp quanh một mức.", [["Thay thế mọi TVS trong xung sét lớn.", "Zener nhỏ không được thiết kế để hấp thụ xung năng lượng lớn như TVS chuyên dụng."], ["Dùng để khuếch đại dòng cho relay.", "Zener không phải transistor driver."], ["Chỉ dẫn thuận, không bao giờ dùng vùng ngược.", "Ứng dụng đặc trưng của Zener là vùng ngược."]]),
        f("TVS", sources.stEsd, "TVS diode khác Zener nhỏ ở điểm nào trong bảo vệ mạch?", "TVS được thiết kế để kẹp xung quá áp nhanh và chịu năng lượng xung lớn hơn.", "ST AN5612 và TI surge diode đều dùng TVS cho ESD/surge trên đường vào.", [["TVS chỉ là điện trở kéo lên.", "TVS là diode bảo vệ quá áp."], ["TVS càng xa đầu nối càng tốt.", "TVS nên đặt gần nơi xung đi vào."], ["TVS không có điện dung nên không ảnh hưởng tín hiệu nhanh.", "Điện dung TVS là thông số cần kiểm tra."]]),
        f("diode flyback", sources.tiSolenoid, "Diode flyback song song cuộn relay có nhiệm vụ gì?", "Tạo đường dòng hồi tiếp khi tắt cuộn dây để hạn chế điện áp ngược trên transistor.", "TI solenoid note mô tả dòng cuộn cảm phải freewheel qua diode hoặc đường clamp.", [["Làm relay đóng nhanh hơn trong mọi trường hợp.", "Diode flyback thường làm dòng giảm chậm hơn nên relay nhả chậm hơn."], ["Dùng để đặt mức logic I2C.", "Flyback diode dùng cho tải cảm."], ["Không cần nếu cuộn relay nhỏ.", "Tải cảm nhỏ vẫn sinh xung khi ngắt dòng."]]),
        f("bảo vệ ngược cực", "TI Basics of Ideal Diodes", "Mạch bảo vệ ngược cực nguồn thường dùng linh kiện nào?", "Có thể dùng diode Schottky, MOSFET ideal diode hoặc IC bảo vệ nguồn tùy yêu cầu sụt áp và công suất.", "Diode đơn giản nhưng sụt áp tạo nhiệt; MOSFET giảm tổn hao hơn.", [["Dùng thẳng dây nối tắt không cần bảo vệ.", "Nối ngược cực có thể phá mạch."], ["Chỉ dùng tụ gốm là đủ.", "Tụ không chặn được cực tính ngược kéo dài."], ["Luôn dùng Zener nhỏ nối tiếp nguồn chính.", "Zener không phải giải pháp nối tiếp nguồn thông dụng cho ngược cực."]]),
        f("clamp diode nội", "Tài liệu cấu kiện, mục clamp diode nội", "Khi dựa vào diode clamp nội của MCU, điều gì bắt buộc phải chú ý?", "Phải giới hạn dòng bằng điện trở hoặc mạch ngoài và tránh bơm dòng lớn vào rail nguồn.", "Diode clamp nội chỉ chịu dòng nhỏ, không thay thế TVS cho xung năng lượng lớn.", [["Có thể đổ dòng vô hạn vào chân MCU.", "Dòng clamp vượt giới hạn có thể làm hỏng chip hoặc gây latch-up."], ["Không cần quan tâm rail nguồn.", "Dòng clamp có thể đi vào VDD hoặc GND."], ["Diode nội là bảo vệ surge công nghiệp hoàn chỉnh.", "Nó chỉ là bảo vệ nội bộ mức nhỏ."]]),
        f("ESD", sources.stEsd, "ESD khác quá áp kéo dài ở điểm nào?", "ESD là xung rất nhanh, điện áp cao nhưng thời gian ngắn; quá áp kéo dài có thể thấp hơn nhưng năng lượng lâu hơn.", "Thiết kế bảo vệ phải phân biệt xung nhanh và lỗi kéo dài.", [["ESD luôn là 5 V ổn định trong nhiều phút.", "ESD là xung nhanh."], ["Quá áp kéo dài và ESD luôn dùng cùng một linh kiện duy nhất.", "Có thể cần phối hợp TVS, resistor, fuse, clamp và layout."], ["ESD không liên quan đầu nối ngoài.", "Đầu nối là nơi ESD thường đi vào."]]),
        f("chọn diode", "Tài liệu cấu kiện, mục chọn diode bảo vệ", "Khi chọn diode bảo vệ đường tín hiệu nhanh cần xem thêm thông số gì ngoài điện áp kẹp?", "Điện dung diode, dòng xung, điện áp làm việc, điện áp kẹp và vị trí layout.", "Điện dung lớn có thể làm méo tín hiệu nhanh, TVS phải đúng dải điện áp và đặt đúng chỗ.", [["Chỉ cần diode to nhất là đúng.", "Diode lớn có thể có điện dung lớn và không phù hợp tín hiệu nhanh."], ["Không cần điện áp làm việc.", "TVS phải không dẫn trong điều kiện tín hiệu bình thường."], ["Không cần dòng xung.", "Dòng xung quyết định khả năng chịu năng lượng."]]),
        f("bảo vệ theo lớp", "Tài liệu cấu kiện, mục bảo vệ GPIO", "Vì sao bảo vệ đầu vào thường phối hợp nhiều linh kiện?", "Vì mỗi linh kiện xử lý một phần: hạn dòng, kẹp xung, lọc nhiễu, cách ly hoặc hy sinh trước IC chính.", "Mạch bảo vệ thực tế thường gồm series resistor, TVS/Zener, tụ, diode clamp, buffer hoặc cách ly.", [["Một tầng bảo vệ luôn đủ cho mọi môi trường công nghiệp.", "Môi trường xấu thường cần nhiều tầng."], ["Phối hợp linh kiện chỉ làm bản vẽ mạch đẹp hơn.", "Phối hợp giúp chia năng lượng và giảm rủi ro."], ["Không cần layout nếu đã có TVS.", "Layout quyết định đường dòng xung và hiệu quả bảo vệ."]])
      ]
    },
    {
      id: "transistors-loads",
      title: "3. Transistor và điều khiển tải",
      subtitle: "BJT, transistor số, MOSFET, gate driver, relay, solenoid, motor và LED công suất.",
      sourceRange: "Mục 5-7 trong tài liệu cấu kiện",
      lessonSlides: [
        makeSlide("Transistor là công tắc có điều khiển", "GPIO yếu, tải thật mạnh hơn nhiều; transistor đứng giữa hai thế giới đó.", [
          "BJT dùng dòng điều khiển ở chân nền. MOSFET dùng điện áp tại cổng, nhưng cổng giống một tụ nhỏ cần được nạp và xả.",
          "Câu hỏi thi thường không hỏi tên linh kiện đơn thuần, mà hỏi tại sao GPIO không kéo trực tiếp relay, motor hay LED công suất."
        ], { visualHtml: visual.bjtMosfet, keyPoints: ["BJT cần dòng nền.", "MOSFET cần điện áp cổng đủ và xét điện tích cổng.", "Cả hai đều phải kiểm tra nhiệt."], source: `${sources.nexperiaBjt}; ${sources.onsemiMosfet}`, sourceUrl: "https://www.onsemi.com/download/application-notes/pdf/an-9010.pdf", selfCheck: "So sánh đặt thành hai cột rõ ràng, không lẫn thuật ngữ điều khiển dòng và điều khiển điện áp." }),
        makeSlide("MOSFET logic-level không có nghĩa là cứ 3,3 V là đủ", "Ngưỡng mở chỉ cho biết bắt đầu có dòng nhỏ, không cho biết đã dẫn tốt.", [
          "Thông số cần đọc là điện trở khi dẫn tại điện áp cổng cụ thể. Nếu datasheet chỉ ghi điện trở khi cổng 10 V, không nên giả định GPIO 3,3 V điều khiển tốt.",
          "Dòng tải càng lớn, tổn hao dẫn càng tăng mạnh và làm MOSFET nóng."
        ], { visualHtml: visual.bjtMosfet, keyPoints: ["Đừng dùng ngưỡng mở làm điện áp điều khiển đủ.", "Xem điện trở khi dẫn tại điện áp GPIO.", "Tổn hao dẫn biến thành nhiệt."], source: sources.onsemiMosfet, sourceUrl: "https://www.onsemi.com/download/application-notes/pdf/an-9010.pdf", selfCheck: "Ý chính tránh công thức dày; nhấn vào cách đọc datasheet." }),
        makeSlide("Low-side và high-side cho tải cảm", "Vị trí transistor quyết định dòng đi qua tải như thế nào.",
          ["Low-side đặt công tắc ở phía mass, dễ dùng với N-MOSFET. High-side đặt công tắc phía nguồn, hữu ích khi tải cần nối mass cố định.",
          "Với solenoid hoặc relay, khi tắt transistor cần đường dòng hồi tiếp. Nếu không, điện áp trên công tắc có thể vọt rất cao."],
          { image: OFFICIAL.solenoid, imageAlt: "Trang TI minh họa cấu hình low-side, high-side và diode hồi tiếp", keyPoints: ["Low-side thường dễ điều khiển.", "High-side giữ mass tải ổn định hơn.", "Tải cảm luôn cần đường xả năng lượng."], source: sources.tiSolenoid, sourceUrl: "https://www.ti.com/lit/slvae59", selfCheck: "Hình official rõ dòng drive và freewheel, bố cục slide không che phần hình." }),
        makeSlide("Motor và LED công suất không phải tải hiền", "Dòng khởi động, dòng kẹt và nhiệt là ba thứ dễ bị quên.", [
          "Motor có thể ăn dòng rất lớn lúc khởi động hoặc kẹt trục. Driver motor thường cần giới hạn dòng, bảo vệ quá nhiệt và điều khiển chiều.",
          "LED công suất cần điều khiển dòng, không chỉ đặt điện áp. Nếu nhiệt tăng, đặc tính LED đổi và có thể dẫn đến hỏng."
        ], { visualHtml: visual.thermal, keyPoints: ["Motor cần xét dòng kẹt.", "LED công suất cần điều khiển dòng.", "Công suất cuối cùng thành nhiệt."], source: "TI solenoid/motor driver notes và tài liệu cấu kiện", sourceUrl: "https://www.ti.com/lit/slvae59", selfCheck: "Slide tập trung vào nguy cơ thực tế, sơ đồ nhiệt không chồng chữ." })
      ],
      facts: [
        f("BJT", sources.nexperiaBjt, "BJT khi dùng làm công tắc low-side cần điều kiện gì để tải được kéo tốt?", "Cần đủ dòng base qua điện trở để transistor vào bão hòa theo dòng tải mong muốn.", "BJT là linh kiện điều khiển bằng dòng; base resistor vừa cấp dòng vừa giới hạn dòng từ GPIO.", [["Chỉ cần nối base trực tiếp GPIO không cần điện trở.", "Base-emitter giống mối nối diode, cần hạn dòng."], ["Không cần xét dòng tải.", "Dòng base phải liên hệ với dòng collector."], ["BJT không có sụt áp khi bão hòa.", "BJT bão hòa vẫn có sụt áp và sinh nhiệt."]]),
        f("NPN low-side", "Tài liệu cấu kiện, mục NPN low-side switch", "Trong mạch NPN low-side, tải thường được mắc ở đâu?", "Tải mắc giữa nguồn dương và collector, emitter nối mass, transistor kéo đầu dưới tải xuống mass.", "Đây là cấu hình phổ biến để GPIO điều khiển tải DC nhỏ/vừa.", [["Tải mắc giữa base và GPIO.", "Base chỉ là chân điều khiển."], ["Emitter nối nguồn dương trong mọi low-side NPN.", "Low-side NPN thường emitter về mass."], ["Không cần mass chung giữa GPIO và transistor.", "Tín hiệu base cần mốc tham chiếu."]]),
        f("RET", "Nexperia RET devices whitepaper", "Transistor số hay RET tiện ở điểm nào?", "Tích hợp sẵn điện trở base và điện trở kéo, giúp giảm linh kiện ngoài khi điều khiển từ GPIO.", "RET/digital transistor phù hợp mạch đóng cắt đơn giản, nhưng vẫn phải kiểm tra dòng và công suất.", [["Tự động thay thế mọi MOSFET công suất lớn.", "RET thường dùng tải nhỏ/vừa."], ["Không cần đọc định mức dòng.", "Vẫn có giới hạn dòng/công suất."], ["Không liên quan GPIO.", "RET thường dùng để GPIO điều khiển tải hoặc tín hiệu."]]),
        f("MOSFET", sources.onsemiMosfet, "MOSFET khác BJT ở cách điều khiển chính nào?", "MOSFET chủ yếu được điều khiển bằng điện áp cổng, nhưng cổng có điện dung nên cần dòng nạp/xả khi chuyển mạch.", "MOSFET không cần dòng DC vào cổng như BJT, nhưng cần xét điện tích cổng và tốc độ chuyển mạch.", [["MOSFET luôn cần dòng DC lớn liên tục vào cổng.", "Cổng MOSFET cách điện, dòng DC rất nhỏ."], ["Cổng MOSFET không có điện dung.", "Cổng có điện dung và điện tích cổng."], ["MOSFET không dùng làm công tắc tải.", "MOSFET là công tắc công suất rất phổ biến."]]),
        f("VGS(th)", sources.onsemiMosfet, "VGS(th) của MOSFET có phải điện áp điều khiển đủ để chạy tải không?", "Không; đó chỉ là ngưỡng bắt đầu dẫn dòng nhỏ, phải xem điện trở khi dẫn tại điện áp cổng thực tế.", "Tài liệu cấu kiện nhấn mạnh không dùng VGS(th) để kết luận MOSFET đã mở tốt.", [["Có, cứ vượt VGS(th) là MOSFET chịu được mọi dòng.", "VGS(th) đo ở dòng rất nhỏ."], ["Không cần xem datasheet.", "Phải xem điều kiện đo điện trở khi dẫn."], ["Chỉ cần tên MOSFET có chữ logic là đủ.", "Vẫn phải kiểm tra thông số tại 2,5 V, 3,3 V hoặc 4,5 V."]]),
        f("tổn hao MOSFET", sources.onsemiMosfet, "Tổn hao dẫn của MOSFET khi bật phụ thuộc mạnh vào yếu tố nào?", "Dòng tải và điện trở khi dẫn; dòng tăng làm nhiệt tăng rất nhanh.", "Tổn hao dẫn xấp xỉ theo bình phương dòng nhân điện trở khi dẫn.", [["Chỉ phụ thuộc màu vỏ MOSFET.", "Nhiệt phụ thuộc dòng, điện trở, package và tản nhiệt."], ["Dòng tăng không làm nóng MOSFET.", "Dòng tải tạo công suất."], ["Điện trở khi dẫn không cần quan tâm.", "Đây là thông số chính khi MOSFET làm công tắc."]]),
        f("low-side MOSFET", "Tài liệu cấu kiện, mục Low-side N-MOSFET", "Vì sao N-MOSFET low-side dễ điều khiển bằng GPIO?", "Source nối mass nên điện áp cổng so với source gần bằng mức GPIO, dễ đạt điều kiện mở.", "Low-side N-MOSFET là cấu hình đơn giản cho tải DC khi cho phép tải nối lên nguồn.", [["Vì source luôn bay theo điện áp nguồn cao.", "Đó là khó khăn của high-side N-MOSFET."], ["Vì không cần mass tham chiếu.", "GPIO và source cần mốc chung."], ["Vì MOSFET không có giới hạn dòng.", "Vẫn cần kiểm tra dòng, nhiệt và bảo vệ."]]),
        f("high-side switch", "Tài liệu cấu kiện, mục High-side switch", "High-side switch hữu ích khi nào?", "Khi muốn đóng cắt phía nguồn dương để tải vẫn có mass cố định hoặc để bảo vệ phân phối nguồn.", "High-side có thể dùng P-MOSFET, N-MOSFET kèm driver hoặc IC high-side chuyên dụng.", [["Khi bắt buộc source nối mass như low-side.", "High-side nằm phía nguồn."], ["Khi không cần bảo vệ nguồn.", "High-side switch thường tích hợp bảo vệ."], ["Khi mọi tải đều phải floating mass.", "Một lợi ích là giữ mass tải cố định."]]),
        f("gate driver", "TI Gate Driver Fundamentals", "Gate driver MOSFET giúp gì?", "Nạp/xả cổng nhanh, tạo mức điều khiển phù hợp và giảm tổn hao chuyển mạch trong tải lớn hoặc tần số cao.", "GPIO có dòng yếu; gate lớn hoặc chuyển mạch nhanh cần driver.", [["Luôn làm MOSFET lạnh dù chọn sai linh kiện.", "Driver giúp chuyển mạch nhưng không thay thế chọn MOSFET đúng."], ["Chỉ dùng để đọc ADC.", "Gate driver điều khiển công tắc công suất."], ["Không liên quan điện tích cổng.", "Điện tích cổng là lý do chính cần driver."]]),
        f("relay solenoid", sources.tiSolenoid, "Tải relay/solenoid cần linh kiện bảo vệ nào khi đóng cắt bằng transistor?", "Cần diode flyback, TVS, clamp hoặc driver tích hợp để xử lý năng lượng cuộn dây.", "Tải cảm sinh điện áp ngược khi ngắt dòng.", [["Không cần gì vì cuộn dây là tải thuần trở.", "Cuộn dây là tải cảm."], ["Chỉ cần tăng GPIO drive.", "Vấn đề là năng lượng hồi tiếp khi tắt."], ["Chỉ cần điện trở pull-up I2C.", "Pull-up không xử lý năng lượng cuộn cảm."]]),
        f("motor DC", "Tài liệu cấu kiện, mục DC motor", "Vì sao motor DC thường cần driver chuyên dụng hơn là GPIO kéo trực tiếp?", "Vì motor có dòng khởi động/kẹt lớn, sinh nhiễu và thường cần điều khiển chiều, tốc độ, bảo vệ dòng/nhiệt.", "Motor là tải động và cảm, không phải LED nhỏ.", [["GPIO có thể kéo trực tiếp mọi motor.", "GPIO không chịu được dòng motor."], ["Dòng kẹt motor luôn bằng 0.", "Dòng kẹt thường rất lớn."], ["Motor không sinh nhiễu.", "Chổi than và dòng xung gây nhiễu đáng kể."]]),
        f("LED công suất", "Tài liệu cấu kiện, mục LED công suất", "LED công suất nên điều khiển theo đại lượng nào?", "Theo dòng điện, đồng thời phải quản lý nhiệt.", "Điện áp thuận LED thay đổi theo nhiệt độ; điều khiển điện áp đơn giản có thể làm dòng mất kiểm soát.", [["Theo điện áp cố định bất kể dòng.", "LED là linh kiện nhạy dòng."], ["Không cần tản nhiệt.", "LED công suất có nhiệt đáng kể."], ["Chỉ cần mắc trực tiếp vào GPIO.", "GPIO không cấp được dòng LED công suất."]])
      ]
    },
    {
      id: "gpio-level-isolation",
      title: "4. GPIO, dịch mức và cách ly",
      subtitle: "Pull-up, debounce, open-drain, I2C, level shifting, optocoupler và digital isolator.",
      sourceRange: "Mục 8-9 và 15 trong tài liệu cấu kiện",
      lessonSlides: [
        makeSlide("GPIO cần trạng thái xác định", "Một chân đầu vào bỏ trống giống một cánh cửa không khóa trước nhiễu.", ["Pull-up hoặc pull-down tạo trạng thái mặc định. Với nút nhấn, cần thêm chống nảy để một lần nhấn không bị đọc thành nhiều lần.", "Điện trở series có thể giới hạn dòng lỗi, nhưng cũng làm cạnh tín hiệu chậm hơn nếu kết hợp với điện dung."], { visualHtml: visual.gpio, keyPoints: ["Không để input thả nổi.", "Nút nhấn cần chống nảy.", "Series resistor là bảo vệ đơn giản nhưng có đánh đổi."], source: "Tài liệu cấu kiện, mục GPIO", sourceUrl: "docs/cau-kien-dien-tu-ung-dung-he-thong-nhung.md", selfCheck: "Hình pull-up đọc nút nhấn có trạng thái hở/nhấn rõ, không lẫn với output." }),
        makeSlide("Open-drain và I2C", "Thiết bị chỉ kéo xuống, còn mức cao do điện trở kéo lên tạo ra.", ["Cơ chế open-drain cho phép nhiều thiết bị cùng chia sẻ một đường. Nếu ai kéo xuống, đường ở mức thấp.", "Điện trở kéo lên quá lớn làm cạnh lên chậm. Quá nhỏ làm thiết bị phải hút dòng lớn khi kéo xuống."], { visualHtml: visual.i2c, keyPoints: ["I2C cần hai điện trở kéo lên.", "Điện dung bus làm cạnh lên chậm.", "Chọn R theo tốc độ, điện áp và dòng kéo xuống."], source: sources.nxpI2c, sourceUrl: "https://www.nxp.com/documents/user_manual/UM10204.pdf", selfCheck: "Sơ đồ hai dây và ba thiết bị rõ, chú thích không dùng ký hiệu phức tạp." }),
        makeSlide("Dịch mức không chỉ là chia áp", "Một số tín hiệu một chiều có thể dùng chia áp, nhưng bus hai chiều cần cách khác.", ["Nếu tín hiệu chỉ đi một chiều và tốc độ thấp, cầu phân áp có thể hạ mức áp. Nhưng với I2C, hai chiều và open-drain, thường dùng mạch MOSFET dịch mức hoặc IC chuyên dụng.", "Dịch mức sai có thể làm chân IC quá áp hoặc làm cạnh tín hiệu quá chậm."], { visualHtml: visual.i2c, keyPoints: ["Chia áp chỉ phù hợp một số tín hiệu một chiều.", "Bus hai chiều cần mạch phù hợp.", "Luôn kiểm tra ngưỡng logic hai phía."], source: "Tài liệu cấu kiện, mục level shifting", sourceUrl: "docs/cau-kien-dien-tu-ung-dung-he-thong-nhung.md", selfCheck: "Slide nhấn điều kiện dùng, tránh nói chia áp là lời giải cho mọi trường hợp." }),
        makeSlide("Cách ly: truyền thông tin nhưng không nối điện trực tiếp", "Optocoupler và digital isolator dùng khi hai miền mạch không nên nối mass trực tiếp.", ["Optocoupler truyền bằng ánh sáng, dễ hiểu và cách ly tốt nhưng thường chậm và phụ thuộc tỉ số truyền dòng.", "Digital isolator nhanh hơn, thường dùng điện dung, từ hoặc biến áp vi mô để truyền tín hiệu qua hàng rào cách ly."], { visualHtml: visual.roles, keyPoints: ["Cách ly giúp chống chênh lệch mass và điện áp nguy hiểm.", "Optocoupler cần xét dòng LED và tỉ số truyền.", "Digital isolator phù hợp tốc độ cao hơn."], source: "Vishay Optocoupler CTR và tài liệu cấu kiện", sourceUrl: "https://www.vishay.com/docs/83706/applicationnote45.pdf", selfCheck: "Slide giải thích nguyên lý bằng lời, không trộn quá nhiều thuật ngữ tiếng Anh." })
      ],
      facts: [
        f("floating input", "Tài liệu cấu kiện, mục bảo vệ GPIO", "Vì sao không nên để input GPIO bị thả nổi?", "Vì chân có trở kháng cao nên dễ bị nhiễu kéo lên/xuống ngẫu nhiên, làm phần mềm đọc sai.", "Pull-up hoặc pull-down tạo trạng thái mặc định.", [["Vì floating luôn đọc chính xác hơn.", "Floating dễ sai."], ["Vì floating làm giảm nhiễu tuyệt đối.", "Trở kháng cao thường nhạy nhiễu."], ["Vì chỉ output mới cần mức logic.", "Input cũng cần mức xác định."]]),
        f("series resistor", "Tài liệu cấu kiện, mục điện trở series trên GPIO", "Điện trở series trên GPIO có tác dụng chính nào?", "Giới hạn dòng lỗi và giảm ringing, nhưng có thể làm chậm cạnh tín hiệu.", "Series resistor phối hợp với điện dung tạo RC.", [["Tăng dòng lỗi vào MCU.", "Nó giới hạn dòng."], ["Không có bất kỳ đánh đổi nào.", "Nó có thể làm chậm cạnh."], ["Chỉ dùng để đặt địa chỉ I2C.", "Đó không phải tác dụng chính."]]),
        f("debounce", "Tài liệu cấu kiện, mục debounce nút nhấn", "Chống nảy nút nhấn nhằm tránh lỗi gì?", "Một lần nhấn bị đọc thành nhiều lần do tiếp điểm cơ khí rung.", "Debounce có thể làm bằng RC, phần mềm hoặc Schmitt trigger.", [["Làm nút nhấn tăng điện áp nguồn.", "Debounce xử lý dao động tiếp điểm."], ["Tăng tốc độ I2C.", "Không liên quan I2C."], ["Thay thế mọi bảo vệ ESD.", "Debounce không chịu xung ESD."]]),
        f("open-drain", "Tài liệu cấu kiện, mục open-drain", "Open-drain output khác push-pull thế nào?", "Open-drain chỉ kéo xuống thấp; mức cao cần điện trở kéo lên hoặc nguồn ngoài.", "Cơ chế này cho phép nhiều thiết bị chia sẻ đường bus.", [["Open-drain chủ động kéo cả cao và thấp.", "Đó là push-pull."], ["Không cần pull-up.", "Khi nhả bus cần pull-up tạo mức cao."], ["Không dùng trong I2C.", "I2C dùng open-drain/open-collector."]]),
        f("I2C pull-up", sources.nxpI2c, "Điện trở kéo lên I2C quá lớn gây hậu quả gì?", "Cạnh lên chậm do điện dung bus, có thể vi phạm thời gian rise time.", "NXP UM10204 đưa yêu cầu thời gian lên và liên hệ với điện dung bus.", [["Cạnh lên nhanh vô hạn.", "R lớn làm RC lớn."], ["Dòng sink tăng quá mức khi bus thấp.", "Dòng sink lớn hơn là hậu quả R quá nhỏ."], ["Không ảnh hưởng truyền thông.", "Có thể gây lỗi thời gian bus."]]),
        f("I2C pull-up nhỏ", sources.nxpI2c, "Điện trở kéo lên I2C quá nhỏ gây rủi ro gì?", "Khi bus ở mức thấp, thiết bị phải hút dòng lớn hơn, có thể vượt khả năng và tăng công suất.", "Chọn R phải cân bằng rise time và dòng mức thấp.", [["Cạnh lên luôn chậm hơn.", "R nhỏ làm cạnh lên nhanh hơn nhưng dòng thấp lớn."], ["Không có dòng khi kéo xuống.", "Có dòng từ nguồn qua R vào transistor kéo xuống."], ["Không cần kiểm tra VOL.", "VOL và dòng sink là thông số cần xem."]]),
        f("level shifting", "Tài liệu cấu kiện, mục level shifting", "Cầu phân áp dịch mức phù hợp nhất với loại tín hiệu nào?", "Tín hiệu một chiều, tốc độ không quá cao, đi từ mức cao xuống mức thấp hơn.", "Cầu phân áp không phù hợp chung cho bus hai chiều hoặc tín hiệu cần cạnh rất nhanh.", [["Bus hai chiều tốc độ cao trong mọi trường hợp.", "Cần mạch dịch mức phù hợp hơn."], ["Đường nguồn công suất lớn.", "Cầu phân áp không cấp nguồn tải."], ["Mọi tín hiệu không cần xét trở kháng.", "Trở kháng phân áp ảnh hưởng tốc độ và tải."]]),
        f("MOSFET level shifter", "Tài liệu cấu kiện, mục level shifting", "MOSFET dịch mức hai chiều thường gặp ở bus nào?", "Bus open-drain như I2C.", "Mạch MOSFET nhỏ cho phép hai phía điện áp khác nhau cùng kéo đường xuống.", [["RS-232 điện áp âm/dương trực tiếp.", "RS-232 cần transceiver chuyên dụng."], ["Nguồn motor công suất lớn.", "Dịch mức logic không phải driver motor."], ["Đường AC lưới.", "Không dùng mạch dịch mức logic cho lưới AC."]]),
        f("optocoupler", "Vishay Optocoupler CTR", "Thông số CTR của optocoupler nói lên điều gì?", "Tỉ lệ giữa dòng transistor đầu ra và dòng LED đầu vào trong điều kiện xác định.", "CTR thay đổi theo dòng, nhiệt độ và tuổi thọ nên cần thiết kế dư.", [["Điện áp nguồn tối đa của MCU.", "CTR là tỉ số truyền dòng quang."], ["Tốc độ clock I2C.", "Không phải tốc độ bus."], ["Điện dung tụ decoupling.", "Không liên quan tụ."]]),
        f("digital isolator", "Tài liệu cấu kiện, mục digital isolator", "Digital isolator thường được chọn thay optocoupler khi nào?", "Khi cần cách ly nhưng tốc độ cao hơn, độ trễ nhỏ hơn hoặc đặc tính ổn định hơn.", "Digital isolator dùng cơ chế điện dung/từ/biến áp vi mô thay vì LED quang chậm.", [["Khi chỉ cần một diode flyback.", "Đó là bảo vệ tải cảm."], ["Khi muốn nối mass trực tiếp.", "Mục tiêu là cách ly."], ["Khi tốc độ thấp và giá rẻ là ưu tiên duy nhất.", "Optocoupler thường đơn giản/rẻ hơn cho tốc độ thấp."]]),
        f("buffer", "Tài liệu cấu kiện, mục bảo vệ GPIO", "IC đệm có thể giúp gì cho tín hiệu số?", "Tăng fan-out, định dạng lại mức logic và đôi khi đóng vai trò phần tử hy sinh trước IC chính.", "Buffer không thay thế TVS cho xung năng lượng lớn.", [["Chịu mọi xung surge công nghiệp thay TVS.", "Tác dụng bảo vệ có giới hạn."], ["Luôn biến input thành analog.", "Buffer số giữ logic số."], ["Không ảnh hưởng khả năng tải.", "Fan-out là một lý do dùng buffer."]]),
        f("cách ly mass", "Tài liệu cấu kiện, mục cách ly", "Khi nào cách ly tín hiệu đặc biệt có ích?", "Khi hai miền mạch có chênh lệch mass, nhiễu lớn hoặc điện áp nguy hiểm.", "Cách ly truyền thông tin mà không nối điện trực tiếp.", [["Khi hai mạch đã chung mass sạch và tốc độ rất thấp, luôn bắt buộc.", "Không phải lúc nào cũng cần cách ly."], ["Khi muốn tăng dòng tải motor.", "Cách ly không thay driver công suất."], ["Khi bỏ qua an toàn điện.", "Cách ly thường phục vụ an toàn và chống nhiễu."]])
      ]
    },
    {
      id: "analog-adc-front-end",
      title: "5. Analog front-end, comparator và ADC",
      subtitle: "Op-amp, bộ lọc, comparator có trễ, SAR ADC, nguồn tham chiếu và đo dòng.",
      sourceRange: "Mục 10-13 trong tài liệu cấu kiện",
      lessonSlides: [
        makeSlide("Đường đo analog là một chuỗi", "Cảm biến không nên bị đưa thẳng vào ADC nếu tín hiệu yếu, nhiễu hoặc có trở nguồn cao.", ["Một chuỗi đo cơ bản gồm cảm biến, op-amp đệm hoặc khuếch đại, bộ lọc, ADC và nguồn tham chiếu.", "Mỗi khối làm một việc: đưa tín hiệu vào đúng dải, giảm nhiễu, giảm trở nguồn và giữ thước đo ổn định."], { visualHtml: visual.analogChain, keyPoints: ["Op-amp có thể đệm hoặc khuếch đại.", "Lọc analog chống aliasing.", "Nguồn tham chiếu quyết định thước đo."], source: sources.microchipSar, sourceUrl: "https://ww1.microchip.com/downloads/en/appnotes/00246a.pdf", selfCheck: "Sơ đồ chuỗi trái sang phải rõ, nội dung dành cho người mới học." }),
        makeSlide("SAR ADC có tụ lấy mẫu bên trong", "Đây là lý do trở kháng nguồn không được quá lớn.", ["Khi ADC lấy mẫu, công tắc bên trong nối tín hiệu vào tụ nhỏ. Tụ này phải nạp gần đúng mức điện áp đầu vào trước khi ADC bắt đầu chuyển đổi.", "Nếu nguồn tín hiệu yếu hoặc điện trở phân áp quá lớn, tụ nạp không kịp và kết quả sai."], { image: OFFICIAL.sar, imageAlt: "Trang Microchip AN246 minh họa mô hình đầu vào SAR ADC", keyPoints: ["Tụ lấy mẫu cần thời gian nạp.", "Nguồn trở cao làm tăng thời gian nạp.", "Có thể giảm trở nguồn, thêm buffer hoặc tăng thời gian lấy mẫu."], source: sources.microchipSar, sourceUrl: "https://ww1.microchip.com/downloads/en/appnotes/00246a.pdf", selfCheck: "Hình official rõ mô hình tụ lấy mẫu, giải thích không dùng công thức nặng." }),
        makeSlide("Comparator cần vùng trễ để không rung quanh ngưỡng", "Một ngưỡng duy nhất dễ tạo nhiều lần chuyển mức khi tín hiệu có nhiễu.", ["Hysteresis tạo hai ngưỡng: vượt ngưỡng trên mới đổi một chiều, xuống dưới ngưỡng dưới mới đổi chiều lại.", "Khoảng giữa hai ngưỡng giúp bỏ qua nhiễu nhỏ quanh điểm chuyển."], { image: OFFICIAL.hysteresis, imageAlt: "Trang TI minh họa comparator có hysteresis tạo hai ngưỡng", keyPoints: ["Comparator biến analog thành logic.", "Hysteresis chống nhấp nháy quanh ngưỡng.", "Khoảng trễ phải lớn hơn nhiễu cần bỏ qua."], source: sources.tiHysteresis, sourceUrl: "https://www.ti.com/lit/pdf/tidu020", selfCheck: "Hình official có hai ngưỡng 2,7 V và 2,3 V rõ, bố cục không đè chữ." }),
        makeSlide("Đo dòng bằng shunt", "Đo dòng thực chất là đo sụt áp nhỏ trên một điện trở đã biết.", ["Low-side đo dễ hơn vì gần mass, nhưng làm mass tải bị nâng lên một chút. High-side khó hơn nhưng giữ mass tải sạch hơn.", "Điện trở shunt phải có công suất đủ, sai số thấp và hệ số nhiệt phù hợp."], { visualHtml: visual.analogChain, keyPoints: ["Dòng tạo sụt áp trên shunt.", "Low-side dễ nhưng ảnh hưởng mass tải.", "High-side cần mạch đo chịu common-mode cao."], source: sources.tiCurrent, sourceUrl: "https://www.ti.com/lit/eb/slyy154a/slyy154a.pdf", selfCheck: "Slide diễn giải bằng lời, không lạm dụng ký hiệu." })
      ],
      facts: [
        f("op-amp buffer", sources.microchipSar, "Vì sao thường đặt op-amp buffer trước ADC?", "Để giảm trở kháng nguồn, giúp tụ lấy mẫu ADC nạp nhanh và ổn định hơn.", "Microchip AN246 giải thích nguồn trở và tụ lấy mẫu ảnh hưởng sai số ADC.", [["Để làm ADC chậm hơn cố ý.", "Buffer thường giúp drive ADC tốt hơn."], ["Để thay thế nguồn tham chiếu.", "Buffer tín hiệu và reference là vấn đề khác nhau."], ["Vì ADC không có tụ lấy mẫu.", "SAR ADC có tụ lấy mẫu bên trong."]]),
        f("op-amp thông số", "Tài liệu cấu kiện, mục thông số op-amp", "Khi chọn op-amp cho mạch đo ADC, cần xem những thông số nào?", "Dải điện áp vào, khả năng ra gần rail, băng thông, tốc độ thay đổi, offset, dòng bias, nhiễu và ổn định với tải.", "Op-amp sai thông số có thể bão hòa, chậm, lệch offset hoặc dao động.", [["Chỉ cần op-amp có đủ số chân.", "Thông số điện quyết định mạch đo."], ["Không cần quan tâm điện áp nguồn.", "Nguồn giới hạn dải vào/ra."], ["Offset không ảnh hưởng đo tín hiệu nhỏ.", "Offset có thể là sai số lớn với tín hiệu nhỏ."]]),
        f("gain không đảo", "Tài liệu cấu kiện, mục mạch khuếch đại không đảo", "Mạch khuếch đại không đảo có đặc điểm hữu ích nào?", "Trở kháng vào cao và tín hiệu ra cùng pha với tín hiệu vào.", "Nó hay dùng để khuếch đại tín hiệu cảm biến nhỏ trước ADC.", [["Trở kháng vào luôn bằng 0.", "Không đảo có trở kháng vào cao."], ["Luôn đảo dấu tín hiệu.", "Không đảo giữ cùng pha."], ["Không thể dùng trước ADC.", "Rất thường dùng trước ADC."]]),
        f("anti-alias", "Tài liệu cấu kiện, mục anti-alias filter", "Bộ lọc chống aliasing đặt ở đâu?", "Đặt trước ADC để giảm thành phần tần số cao trước khi lấy mẫu.", "Lọc số sau ADC không sửa được aliasing đã xảy ra.", [["Đặt sau ADC là đủ để sửa mọi aliasing.", "Aliasing phải ngăn trước khi lấy mẫu."], ["Đặt ở chân reset MCU.", "Bộ lọc nằm trên đường tín hiệu analog."], ["Không cần nếu tín hiệu có nhiễu cao tần.", "Nhiễu cao tần càng cần lọc trước ADC."]]),
        f("SAR input", sources.microchipSar, "Điện trở nguồn lớn trước SAR ADC gây lỗi vì cơ chế nào?", "Điện trở nguồn cùng điện trở công tắc và tụ lấy mẫu tạo mạch RC nạp chậm.", "Nếu thời gian lấy mẫu không đủ, tụ chưa đạt mức tín hiệu thật.", [["Làm ADC có thêm nhiều bit hơn.", "Nó gây sai số, không tăng độ phân giải."], ["Không liên quan thời gian lấy mẫu.", "Thời gian lấy mẫu là yếu tố chính."], ["Chỉ ảnh hưởng giao tiếp UART.", "Đây là lỗi analog ADC."]]),
        f("reference", "Tài liệu cấu kiện, mục Reference", "Nguồn tham chiếu ADC quan trọng vì sao?", "Nó là thước đo của ADC; nhiễu, sai số hoặc trôi nhiệt của tham chiếu làm kết quả đo sai.", "Cùng điện áp vào nhưng reference đổi thì mã ADC đổi.", [["Reference chỉ cấp sáng LED.", "Reference xác định dải đo ADC."], ["Càng nhiễu càng tăng độ chính xác.", "Reference cần sạch và ổn định."], ["Không cần nếu dùng ADC 12 bit.", "ADC nhiều bit càng nhạy với reference kém."]]),
        f("ratiometric", "Tài liệu cấu kiện, mục ratiometric measurement", "Đo ratiometric có lợi gì?", "Nếu cảm biến và ADC dùng cùng nguồn tham chiếu, sai số tỷ lệ do nguồn có thể tự triệt một phần.", "Kỹ thuật này hữu ích với cầu đo, load cell, cảm biến điện trở.", [["Cảm biến và ADC phải dùng hai nguồn hoàn toàn không liên quan.", "Ratiometric thường dùng chung excitation/reference."], ["Chỉ dùng cho UART.", "Đây là kỹ thuật đo analog."], ["Luôn thay thế mọi hiệu chuẩn.", "Nó giảm một loại sai số nhưng không bỏ hết sai số."]]),
        f("comparator", sources.tiHysteresis, "Comparator khác op-amp ở ứng dụng chính nào?", "Comparator dùng để quyết định tín hiệu cao hay thấp so với ngưỡng và tạo mức logic.", "Comparator tối ưu cho chuyển trạng thái, không phải khuếch đại tuyến tính liên tục.", [["Dùng comparator như op-amp tuyến tính chính xác trong mọi trường hợp.", "Comparator không được tối ưu cho phản hồi tuyến tính như op-amp."], ["Comparator không cần ngưỡng.", "So sánh luôn cần một mức tham chiếu."], ["Comparator chỉ dùng để lưu dữ liệu.", "Nó là mạch so sánh analog."]]),
        f("hysteresis", sources.tiHysteresis, "Hysteresis trong comparator giải quyết vấn đề gì?", "Tránh output chuyển qua lại nhiều lần khi input nhiễu quanh ngưỡng.", "TI mô tả hysteresis tạo ngưỡng trên và ngưỡng dưới.", [["Làm output nhiễu hơn quanh ngưỡng.", "Mục tiêu là giảm chuyển trạng thái giả."], ["Bỏ luôn mọi ngưỡng so sánh.", "Hysteresis dùng hai ngưỡng."], ["Chỉ dùng cho buck converter.", "Comparator nhiều ứng dụng cần hysteresis."]]),
        f("current shunt", sources.tiCurrent, "Đo dòng bằng shunt dựa trên nguyên lý nào?", "Dòng đi qua điện trở nhỏ tạo sụt áp nhỏ, đo sụt áp đó để suy ra dòng.", "Shunt cần giá trị thấp, công suất đủ và sai số phù hợp.", [["Shunt đo dòng bằng ánh sáng.", "Đó không phải nguyên lý shunt."], ["Shunt càng lớn càng luôn tốt.", "Shunt lớn gây sụt áp và nhiệt."], ["Không cần công suất shunt.", "Dòng qua shunt tạo nhiệt."]]),
        f("low-side sensing", sources.tiCurrent, "Nhược điểm của low-side current sensing là gì?", "Nó đặt shunt ở đường mass nên có thể nâng mass của tải lên so với mass hệ thống.", "Low-side dễ đo nhưng ảnh hưởng ground của tải.", [["Không thể đo bằng mạch đơn giản.", "Low-side thường dễ đo hơn high-side."], ["Không gây sụt áp nào.", "Shunt luôn tạo sụt áp."], ["Luôn giữ mass tải tuyệt đối sạch.", "Mass tải bị nâng lên bởi sụt áp shunt."]]),
        f("high-side sensing", sources.tiCurrent, "High-side current sensing khó hơn vì sao?", "Mạch đo phải xử lý điện áp common-mode cao gần nguồn tải.", "Đổi lại high-side giữ mass tải gần mass hệ thống.", [["Vì shunt nằm dưới mass.", "High-side shunt nằm phía nguồn."], ["Vì không có dòng qua shunt.", "Vẫn đo dòng qua shunt."], ["Vì chỉ dùng được cho tín hiệu số.", "Đây là đo analog."]])
      ]
    },
    {
      id: "power-esd-thermal",
      title: "6. Nguồn, ESD, surge, nhiệt và package",
      subtitle: "LDO, buck converter, decoupling, power-good, bảo vệ nguồn, ESD/surge và quản lý nhiệt.",
      sourceRange: "Mục 14, 16, 17 trong tài liệu cấu kiện",
      lessonSlides: [
        makeSlide("Nguồn trong hệ nhúng phải ổn định và đúng thời điểm", "MCU có thể reset sai hoặc đọc ADC sai nếu nguồn nhiễu, tụ đặt sai hoặc power-good không đúng.", ["LDO đơn giản và ít nhiễu nhưng tổn hao thành nhiệt khi chênh áp lớn. Buck hiệu suất cao hơn nhưng tạo nhiễu chuyển mạch cần layout tốt.", "Reset và power-good giúp MCU chỉ chạy khi nguồn đã đủ tin cậy."], { visualHtml: visual.power, keyPoints: ["LDO êm nhưng nóng.", "Buck hiệu suất cao nhưng nhiễu hơn.", "Power-good/reset bảo vệ trạng thái khởi động."], source: sources.tiLdo, sourceUrl: "https://www.ti.com/lit/ml/slyb232/slyb232.pdf", selfCheck: "Ba khối LDO/Buck/Bảo vệ rõ, không dùng quá nhiều chữ." }),
        makeSlide("Decoupling là một phần của thiết kế nguồn", "Tụ đặt sai vị trí có thể gần như mất tác dụng ở xung nhanh.", ["Tụ local phải tạo vòng dòng ngắn giữa chân nguồn và mass của IC. Tụ bulk cấp năng lượng chậm hơn cho cả cụm mạch.", "Đường mạch dài làm tăng điện cảm, khiến tụ không còn đáp ứng tốt với xung nhanh."], { image: OFFICIAL.decoupling, imageAlt: "Trang TI minh họa mạng decoupling local và bulk", keyPoints: ["Đặt tụ gần chân IC.", "Giảm vòng dòng.", "Tách vai trò local và bulk."], source: sources.tiDecoupling, sourceUrl: "https://www.ti.com/content/dam/videos/external-videos/de-de/9/3816841626001/6313253251112.mp4/subassets/notes-decoupling_capacitors.pdf", selfCheck: "Hình official đọc được, ý giải thích nằm riêng." }),
        makeSlide("ESD, EFT và surge không giống nhau", "Các xung ngoài đời khác nhau về thời gian, năng lượng và đường đi.", ["ESD rất nhanh và thường đi vào qua thao tác con người hoặc đầu nối. Surge có năng lượng lớn hơn, liên quan sét lan truyền hoặc nguồn ngoài.", "Chọn bảo vệ cần biết tín hiệu bình thường, điện áp xung, điện dung cho phép và đường dòng về mass."], { visualHtml: visual.tvs, keyPoints: ["ESD nhanh.", "Surge năng lượng lớn hơn.", "TVS phải đặt đúng vị trí và đúng loại."], source: sources.stEsd, sourceUrl: "https://www.st.com/resource/en/application_note/an5612-esd-protection-of-stm32-mcus-and-mpus-stmicroelectronics.pdf", selfCheck: "Slide phân biệt bằng lời dễ hiểu, không liệt kê tiêu chuẩn rối mắt." }),
        makeSlide("Nhiệt và package quyết định mạch có sống lâu không", "Một linh kiện đúng chức năng vẫn có thể chết vì nóng.", ["Công suất tiêu tán đi từ chip ra vỏ, ra mạch in rồi ra không khí. Package nhỏ có thể không thoát nhiệt đủ cho dòng lớn.", "Khi thiết kế, phải tính công suất, nhiệt độ môi trường, điện trở nhiệt và vùng đồng tản nhiệt."], { visualHtml: visual.thermal, keyPoints: ["Công suất biến thành nhiệt.", "Package ảnh hưởng khả năng thoát nhiệt.", "Nhiệt độ môi trường cao làm biên an toàn giảm."], source: "onsemi MOSFET Basic và tài liệu cấu kiện, mục nhiệt/package", sourceUrl: "https://www.onsemi.com/download/application-notes/pdf/an-9010.pdf", selfCheck: "Đường thoát nhiệt rõ từ chip xuống PCB, không có ký hiệu khó hiểu." })
      ],
      facts: [
        f("LDO", sources.tiLdo, "LDO có ưu điểm và nhược điểm chính nào?", "Đơn giản, nhiễu thấp, nhưng phần chênh áp nhân dòng tải biến thành nhiệt.", "Khi dùng LDO cần xét dropout, dòng tĩnh, độ ổn định với tụ ngoài và công suất nhiệt.", [["Luôn hiệu suất cao như buck ở mọi chênh áp.", "LDO là tuyến tính nên tổn hao lớn khi chênh áp lớn."], ["Không bao giờ cần tụ đầu ra.", "LDO cần tụ theo khuyến nghị để ổn định."], ["Không có dropout voltage.", "Dropout là thông số quan trọng của LDO."]]),
        f("dropout", sources.tiLdo, "Dropout voltage của LDO là gì?", "Mức chênh tối thiểu giữa đầu vào và đầu ra để LDO còn giữ được điện áp ra ổn định.", "Khi Vin quá gần Vout, LDO vào dropout và output sụt.", [["Dòng rò của tụ decoupling.", "Dropout liên quan chênh áp LDO."], ["Điện áp xung ESD.", "Không phải ESD."], ["Tần số clock I2C.", "Không liên quan I2C."]]),
        f("buck", "Tài liệu cấu kiện, mục Buck converter", "Buck converter thường được chọn thay LDO khi nào?", "Khi cần hạ áp với dòng lớn hoặc chênh áp lớn để đạt hiệu suất cao hơn.", "Buck dùng đóng cắt, cuộn cảm và tụ để chuyển năng lượng hiệu quả hơn nhưng nhiễu hơn.", [["Khi muốn mạch đơn giản nhất và dòng rất nhỏ.", "LDO có thể phù hợp hơn."], ["Khi không chấp nhận bất kỳ nhiễu chuyển mạch nào.", "Buck có nhiễu chuyển mạch cần xử lý."], ["Khi đầu ra phải lớn hơn đầu vào.", "Buck là hạ áp."]]),
        f("buck noise", "Tài liệu cấu kiện, mục Buck converter", "Vì sao buck converter cần layout cẩn thận?", "Dòng chuyển mạch nhanh tạo nhiễu và vòng dòng nóng; layout sai gây EMI, ripple và lỗi đo analog.", "Buck có cạnh chuyển mạch nhanh, diode/MOSFET/inductor/capacitor tạo vòng dòng xung.", [["Vì buck không có dòng xung.", "Buck hoạt động bằng chuyển mạch dòng."], ["Vì layout không ảnh hưởng nguồn.", "Layout rất quan trọng trong nguồn switching."], ["Vì chỉ có tín hiệu DC lý tưởng.", "Buck có ripple và xung chuyển mạch."]]),
        f("power-good", sources.tiLdo, "Power-good hoặc reset nguồn có ích gì cho MCU?", "Giữ hoặc báo reset cho đến khi nguồn đủ ổn định để MCU chạy đúng.", "Power-good hoặc undervoltage reset giúp tránh trạng thái logic sai khi nguồn chưa sẵn sàng.", [["Làm MCU chạy trước khi có nguồn.", "Mục tiêu là tránh chạy khi nguồn chưa ổn định."], ["Thay thế mọi tụ decoupling.", "Power-good không cấp dòng xung."], ["Chỉ dùng cho LED trang trí.", "Nó phục vụ trạng thái khởi động hệ thống."]]),
        f("input protection", "Tài liệu cấu kiện, mục reverse polarity và input protection", "Bảo vệ đầu vào nguồn thường phải xét các lỗi nào?", "Ngược cực, quá áp, quá dòng, surge, cắm nóng và năng lượng tải.", "Nguồn ngoài là đường lỗi năng lượng lớn nên cần nhiều lớp bảo vệ.", [["Chỉ cần bảo vệ lỗi chính tả firmware.", "Đây là bảo vệ điện."], ["Không cần cầu chì hay eFuse trong mọi thiết kế.", "Tùy rủi ro có thể cần fuse, PTC, eFuse."], ["Nguồn ngoài luôn sạch tuyệt đối.", "Nguồn ngoài có thể sai cực, nhiễu hoặc surge."]]),
        f("high-side switch", "TI High-Side Switches", "High-side switch/eFuse có thể tích hợp chức năng gì?", "Giới hạn dòng, bảo vệ quá nhiệt, bảo vệ ngắn mạch, báo lỗi và đóng cắt tải phía nguồn.", "IC nguồn thông minh giúp bảo vệ tải và hệ thống tốt hơn transistor rời đơn giản.", [["Chỉ là điện trở cố định.", "Đó là IC/công tắc nguồn."], ["Không liên quan bảo vệ quá dòng.", "Giới hạn dòng là chức năng quan trọng."], ["Chỉ dùng để khuếch đại âm thanh.", "Nó dùng trong phân phối/bảo vệ nguồn."]]),
        f("ESD", sources.stEsd, "TVS bảo vệ ESD nên đặt ở đâu?", "Gần đầu nối hoặc nơi xung đi vào, với đường xuống mass ngắn và thấp cảm.", "Nếu TVS đặt xa, xung vẫn chạy sâu vào mạch.", [["Càng gần MCU sau đường dài càng tốt trong mọi trường hợp.", "Nên chặn xung từ cửa vào."], ["Không cần mass tốt.", "Dòng xung cần đường hồi về mass."], ["Đặt trong phần mềm là đủ.", "ESD là hiện tượng phần cứng."]]),
        f("TVS capacitance", sources.stEsd, "Vì sao phải xem điện dung TVS trên đường tín hiệu nhanh?", "Điện dung lớn có thể làm chậm cạnh, méo tín hiệu hoặc giảm băng thông.", "TVS cho USB, I2C, ADC, GPIO có yêu cầu điện dung khác nhau.", [["Điện dung TVS luôn bằng 0.", "TVS thực có điện dung."], ["Tín hiệu nhanh không bị điện dung ảnh hưởng.", "Điện dung làm tải tín hiệu."], ["Chỉ xem màu package.", "Cần xem datasheet."]]),
        f("thermal", sources.onsemiMosfet, "Tại sao cùng một MOSFET nhưng package khác nhau có thể chịu công suất khác nhau?", "Vì đường thoát nhiệt từ chip ra môi trường khác nhau, điện trở nhiệt và diện tích đồng PCB khác nhau.", "Package và layout quyết định nhiệt độ mối nối khi tiêu tán công suất.", [["Package không ảnh hưởng nhiệt.", "Package ảnh hưởng mạnh."], ["Công suất không tạo nhiệt.", "Công suất tiêu tán biến thành nhiệt."], ["PCB không giúp tản nhiệt.", "Vùng đồng PCB có thể là đường tản nhiệt chính."]]),
        f("junction temperature", "Tài liệu cấu kiện, mục nhiệt/package", "Thông số nhiệt độ mối nối cần kiểm tra vì sao?", "Vì chip hỏng hoặc giảm tuổi thọ nếu nhiệt độ mối nối vượt giới hạn, dù vỏ ngoài chỉ hơi ấm.", "Nhiệt độ bên trong cao hơn nhiệt độ môi trường và vỏ.", [["Chỉ nhiệt độ không khí là đủ.", "Cần ước lượng nhiệt độ mối nối."], ["Nếu chạm tay không nóng thì chắc chắn an toàn.", "Tay không đánh giá chính xác mối nối chip."], ["Không liên quan dòng tải.", "Dòng tải tạo công suất và nhiệt."]]),
        f("decoupling placement", sources.tiDecoupling, "Điều gì quan trọng nhất khi đặt tụ decoupling local?", "Đường nối từ tụ đến chân nguồn và mass của IC phải thật ngắn, vòng dòng nhỏ.", "TI nhấn mạnh local decoupling có điện cảm thấp nhất khi đặt sát IC.", [["Giá trị tụ là yếu tố duy nhất, vị trí không quan trọng.", "Vị trí quyết định điện cảm đường dòng."], ["Đặt tụ ở góc xa PCB để đẹp.", "Xa IC giảm hiệu quả ở tần số cao."], ["Chỉ cần tụ bulk ở đầu vào nguồn.", "Local và bulk có vai trò khác nhau."]])
      ]
    }
  ];

  const normalizeChoices = (choices, seed) => {
    const copy = choices.map((choice, index) => ({ ...choice, originalIndex: index }));
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = (seed + i * 19) % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.map(({ originalIndex, ...choice }) => choice);
  };

  const scrubText = (value) => String(value)
    .replace(/Source nối mass nên điện áp cổng so với source gần bằng mức GPIO, dễ đạt điều kiện mở\./g, "Cực S của N-MOSFET nối mass, nên điện áp giữa cực G và cực S gần bằng mức GPIO; vì vậy GPIO dễ tạo đủ điện áp để mở MOSFET.")
    .replace(/Low-side N-MOSFET là cấu hình đơn giản cho tải DC khi cho phép tải nối lên nguồn\./g, "Cấu hình N-MOSFET kéo xuống mass phù hợp với tải DC khi tải có thể mắc lên nguồn dương.")
    .replace(/Vì source luôn bay theo điện áp nguồn cao\./g, "Vì ở cấu hình MOSFET đóng cắt phía nguồn dương, cực S có thể nâng theo điện áp nguồn; đó là khó khăn của N-MOSFET đóng cắt phía nguồn dương, không phải cấu hình kéo xuống mass.")
    .replace(/Đó là khó khăn của high-side N-MOSFET\./g, "Đó là khó khăn của cấu hình N-MOSFET đóng cắt phía nguồn dương.")
    .replace(/High-side có thể dùng P-MOSFET, N-MOSFET kèm driver hoặc IC high-side chuyên dụng\./g, "Đóng cắt phía nguồn dương có thể dùng P-MOSFET, N-MOSFET kèm driver hoặc IC chuyên dụng.")
    .replace(/GPIO có dòng yếu; gate lớn hoặc chuyển mạch nhanh cần driver\./g, "GPIO có dòng yếu; cực G lớn hoặc yêu cầu chuyển mạch nhanh thường cần driver cổng MOSFET.")
    .replace(/High-side nằm phía nguồn\./g, "Cấu hình đóng cắt phía nguồn dương đặt công tắc ở phía nguồn cấp của tải.")
    .replace(/High-side current sensing khó hơn vì sao\?/g, "Đo dòng phía nguồn dương khó hơn vì sao?")
    .replace(/Mạch đo phải xử lý điện áp common-mode cao gần nguồn tải\./g, "Mạch đo phải xử lý điện áp chế độ chung cao, gần mức nguồn của tải.")
    .replace(/High-side shunt nằm phía nguồn\./g, "Điện trở shunt trong cách đo phía nguồn dương nằm ở phía nguồn cấp của tải.")
    .replace(/Đổi lại high-side giữ mass tải gần mass hệ thống\./g, "Đổi lại, đo dòng phía nguồn dương giữ mass của tải gần mass hệ thống.")
    .replace(/kéo xuống mass thường dễ đo hơn high-side\./g, "Đo dòng phía mass thường dễ đo hơn đo dòng phía nguồn dương.")
    .replace(/GPIO và source cần mốc chung\./g, "GPIO và cực S của MOSFET cần cùng mốc tham chiếu để điện áp giữa cực G và cực S được xác định đúng.")
    .replace(/Emitter nối nguồn dương trong mọi low-side NPN\./g, "Trong mạch NPN kéo xuống mass, cực E không nối nguồn dương; cực E thường nối mass và tải nằm phía cực C.")
    .replace(/Low-side NPN thường emitter về mass\./g, "Mạch NPN kéo xuống mass thường nối cực E về mass.")
    .replace(/Tải mắc giữa nguồn dương và collector, emitter nối mass, transistor kéo đầu dưới tải xuống mass\./g, "Trong mạch NPN kéo xuống mass, tải mắc giữa nguồn dương và cực C; cực E nối mass, transistor kéo đầu dưới tải xuống mass khi dẫn.")
    .replace(/Cần đủ dòng base qua điện trở để transistor vào bão hòa theo dòng tải mong muốn\./g, "Cần cấp đủ dòng vào cực B qua điện trở hạn dòng để transistor vào bão hòa theo dòng tải mong muốn.")
    .replace(/Tích hợp sẵn điện trở base và điện trở kéo, giúp giảm linh kiện ngoài khi điều khiển từ GPIO\./g, "RET tích hợp sẵn điện trở ở cực B và điện trở kéo, nên giảm số linh kiện ngoài khi điều khiển từ GPIO.")
    .replace(/MOSFET chủ yếu được điều khiển bằng điện áp cổng, nhưng cổng có điện dung nên cần dòng nạp\/xả khi chuyển mạch\./g, "MOSFET chủ yếu được điều khiển bằng điện áp ở cực G, nhưng cực G có điện dung nên vẫn cần dòng nạp/xả khi chuyển mạch.")
    .replace(/Nạp\/xả cổng nhanh, tạo mức điều khiển phù hợp và giảm tổn hao chuyển mạch trong tải lớn hoặc tần số cao\./g, "Driver cổng MOSFET giúp nạp/xả cực G nhanh, tạo mức điều khiển phù hợp và giảm tổn hao chuyển mạch khi tải lớn hoặc tần số cao.")
    .replace(/Vì motor có dòng khởi động\/kẹt lớn, sinh nhiễu và thường cần điều khiển chiều, tốc độ, bảo vệ dòng\/nhiệt\./g, "Motor DC có dòng khởi động hoặc dòng kẹt lớn, dễ sinh nhiễu và thường cần điều khiển chiều, tốc độ, bảo vệ dòng hoặc nhiệt.")
    .replace(/ferrite bead/gi, "hạt ferrite")
    .replace(/series resistor/gi, "điện trở nối tiếp")
    .replace(/open-drain/gi, "ngõ ra cực máng hở")
    .replace(/pull-up và pull-down/gi, "điện trở kéo lên và kéo xuống")
    .replace(/floating input/gi, "đầu vào bị treo mức")
    .replace(/debounce/gi, "chống dội phím")
    .replace(/anti-alias/gi, "chống chồng phổ")
    .replace(/High-side switch/g, "Công tắc đóng cắt phía nguồn dương")
    .replace(/high-side switch/gi, "công tắc đóng cắt phía nguồn dương")
    .replace(/high-side sensing/gi, "đo dòng phía nguồn dương")
    .replace(/high-side current sensing/gi, "đo dòng phía nguồn dương")
    .replace(/low-side sensing/gi, "đo dòng phía mass")
    .replace(/N-MOSFET low-side/gi, "N-MOSFET kéo xuống mass")
    .replace(/low-side MOSFET/gi, "MOSFET kéo xuống mass")
    .replace(/low-side/gi, "kéo xuống mass")
    .replace(/NPN low-side/gi, "NPN kéo xuống mass")
    .replace(/gate driver/gi, "driver cổng MOSFET")
    .replace(/level shifting/gi, "chuyển mức logic")
    .replace(/input protection/gi, "bảo vệ đầu vào")
    .replace(/decoupling placement/gi, "vị trí đặt tụ decoupling")
    .replace(/junction temperature/gi, "nhiệt độ mối nối")
    .replace(/thermal/gi, "nhiệt")
    .replace(/reference/gi, "nguồn tham chiếu")
    .replace(/buffer/gi, "mạch đệm")
    .replace(/dropout/gi, "điện áp dropout")
    .replace(/buck noise/gi, "nhiễu của nguồn buck")
    .replace(/buck converter/gi, "nguồn buck")
    .replace(/power-good/gi, "tín hiệu báo nguồn ổn định")
    .replace(/relay solenoid/gi, "relay hoặc cuộn dây solenoid")
    .replace(/motor DC/gi, "động cơ DC")
    .replace(/current shunt/gi, "điện trở shunt đo dòng")
    .replace(/common-mode/gi, "chế độ chung")
    .replace(/high-side/gi, "phía nguồn dương")
    .replace(/ratiometric/gi, "đo theo tỷ lệ nguồn tham chiếu")
    .replace(/comparator/gi, "bộ so sánh")
    .replace(/op-amp/gi, "khuếch đại thuật toán")
    .replace(/package/gi, "vỏ linh kiện")
    .replace(/diode flyback/gi, "diode hồi tiếp cho tải cảm")
    .replace(/\bflyback\b/gi, "hồi tiếp cho tải cảm")
    .replace(/\bfreewheel\b/gi, "hồi tiếp dòng")
    .replace(/\bclamp\b/gi, "kẹp áp")
    .replace(/\bdatasheet\b/gi, "tài liệu dữ liệu linh kiện")
    .replace(/\blayout\b/gi, "bố trí mạch in")
    .replace(/\beFuse\b/g, "cầu chì điện tử")
    .replace(/\bfuse\b/gi, "cầu chì")
    .replace(/\bresistor\b/gi, "điện trở")
    .replace(/\bbuffer\b/gi, "mạch đệm")
    .replace(/\bsource\b/gi, "cực S")
    .replace(/\bgate\b/gi, "cực G")
    .replace(/\bdrain\b/gi, "cực D")
    .replace(/\bemitter\b/gi, "cực E")
    .replace(/\bcollector\b/gi, "cực C")
    .replace(/\bbase\b/gi, "cực B")
    .replace(/base-emitter/gi, "mối nối B-E")
    .replace(/base resistor/gi, "điện trở cực B")
    .replace(/\bdrive\b/gi, "dòng điều khiển")
    .replace(/\bdriver\b/gi, "mạch điều khiển")
    .replace(/\binput\b/gi, "đầu vào")
    .replace(/\boutput\b/gi, "đầu ra")
    .replace(/\bsink\b/gi, "hút dòng")
    .replace(/push-pull/gi, "đẩy-kéo")
    .replace(/open-collector/gi, "ngõ ra cực góp hở")
    .replace(/rise time/gi, "thời gian cạnh lên")
    .replace(/fan-out/gi, "khả năng kéo nhiều đầu vào")
    .replace(/rail nguồn/gi, "đường nguồn")
    .replace(/\brail\b/gi, "đường nguồn")
    .replace(/\bsurge\b/gi, "xung quá áp năng lượng lớn")
    .replace(/switching/gi, "chuyển mạch")
    .replace(/local decoupling/gi, "tụ decoupling đặt cục bộ")
    .replace(/\blocal\b/gi, "cục bộ")
    .replace(/\bbulk\b/gi, "tụ dung lượng lớn")
    .replace(/optocoupler/gi, "bộ ghép quang")
    .replace(/digital isolator/gi, "bộ cách ly số")
    .replace(/\bhardware\b/gi, "phần cứng")
    .replace(/\bsoftware\b/gi, "phần mềm")
    .replace(/\bfirmware\b/gi, "phần mềm nhúng")
    .replace(/driver cổng MOSFET/gi, "mạch điều khiển cổng MOSFET")
    .replace(/Tài liệu cấu kiện,?\s*/gi, "")
    .replace(/mạch điều khiển cổng MOSFET MOSFET/gi, "mạch điều khiển cổng MOSFET")
    .replace(/driver cổng MOSFET MOSFET/gi, "mạch điều khiển cổng MOSFET")
    .replace(/cực B-cực E/gi, "mối nối B-E")
    .replace(/cực B điện trở/gi, "điện trở cực B")
    .replace(/trong tài liệu cấu kiện/gi, "trong mạch nhúng")
    .replace(/tài liệu nhấn mạnh/gi, "điểm cần nhớ là")
    .replace(/\bTI LDO material\s+(nhấn mạnh|mô tả)\s+/gi, "")
    .replace(/\b(Microchip AN246|TI|Analog Devices|onsemi|STMicroelectronics|ST|NXP)\s+(giải thích|mô tả|nhấn mạnh|gợi ý|ghi|nêu)\s+/gi, "")
    .replace(/Lời giải này bám đúng mệnh đề và nguồn tham khảo\./g, "Lời giải này giải thích đúng nguyên nhân kỹ thuật của nhận định.")
    .replace(/^mạch điều khiển/g, "Mạch điều khiển")
    .replace(/\s{2,}/g, " ")
    .trim();

  const scrubChoice = (choice) => ({
    ...choice,
    text: scrubText(choice.text),
    reason: scrubText(choice.reason)
  });

  const topicLabel = (topic) => scrubText(topic);

  const sourceLabel = (chapter) => chapter.title;

  const answerStatement = (stem, answer) =>
    `Với câu hỏi "${scrubText(stem)}", đáp án "${scrubText(answer)}" là phù hợp.`;

  const trueChoiceFrom = (fact) => ({
    text: answerStatement(fact.stem, fact.correct),
    correct: false,
    reason: scrubText(`Phát biểu này đúng vì: ${fact.why}`)
  });

  const pickTrueFacts = (facts, index) => {
    const picked = [];
    const seen = new Set();
    for (let offset = 0; picked.length < 3 && offset < facts.length * 3; offset += 1) {
      const candidate = facts[(index + offset) % facts.length];
      const key = scrubText(candidate.correct).toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        picked.push(candidate);
      }
    }
    return picked;
  };

  const directQuestion = (chapter, fact, index) => ({
    id: `${chapter.id}-n-${index + 1}`,
    type: "Nhận biết",
    source: sourceLabel(chapter),
    topic: fact.topic,
    stem: scrubText(fact.stem),
    choices: normalizeChoices([
      { text: fact.correct, correct: true, reason: fact.why },
      ...fact.wrong.map((item) => ({ text: item.text, correct: false, reason: item.reason }))
    ].map(scrubChoice), index + chapter.id.length)
  });

  const falseStatementQuestion = (chapter, fact, facts, index) => {
    const falseItem = fact.wrong[index % fact.wrong.length];
    const trueFacts = pickTrueFacts(facts, index);
    return {
      id: `${chapter.id}-s-${index + 1}`,
      type: "Chọn phát biểu sai",
      source: sourceLabel(chapter),
      topic: fact.topic,
      stem: `Trong chủ đề "${chapter.title}", phát biểu nào SAI hoặc dễ gây nhầm lẫn?`,
      choices: normalizeChoices([
        { text: answerStatement(fact.stem, falseItem.text), correct: true, reason: `Đây là phát biểu sai. ${falseItem.reason}` },
        ...trueFacts.map(trueChoiceFrom)
      ].map(scrubChoice), index * 3 + chapter.id.length)
    };
  };

  const appliedQuestion = (chapter, fact, index) => ({
    id: `${chapter.id}-a-${index + 1}`,
    type: "Áp dụng",
    source: sourceLabel(chapter),
    topic: fact.topic,
    stem: scrubText(`Khi gặp mạch liên quan đến ${topicLabel(fact.topic)}, cách xử lý nào đúng nhất?`),
    choices: normalizeChoices([
      { text: fact.correct, correct: true, reason: fact.why },
      ...fact.wrong.slice().reverse().map((item) => ({ text: item.text, correct: false, reason: item.reason }))
    ].map(scrubChoice), index * 5 + chapter.id.length)
  });

  const explainQuestion = (chapter, fact, index) => ({
    id: `${chapter.id}-e-${index + 1}`,
    type: "Giải thích",
    source: sourceLabel(chapter),
    topic: fact.topic,
    stem: scrubText(`Vì sao nhận định sau là quan trọng: ${fact.correct}`),
    choices: normalizeChoices([
      { text: fact.why, correct: true, reason: "Lời giải này giải thích đúng nguyên nhân kỹ thuật của nhận định." },
      ...fact.wrong.map((item) => ({ text: item.reason, correct: false, reason: "Đây là lý do dùng để bác bỏ phương án sai, không phải giải thích cho nhận định đúng." }))
    ].map(scrubChoice), index * 7 + chapter.id.length)
  });

  const buildQuestions = (chapter) => {
    const variants = [
      (chapter, fact, facts, index) => directQuestion(chapter, fact, index),
      (chapter, fact, facts, index) => falseStatementQuestion(chapter, fact, facts, index),
      (chapter, fact, facts, index) => appliedQuestion(chapter, fact, index),
      (chapter, fact, facts, index) => explainQuestion(chapter, fact, index)
    ];
    const questions = [];
    let index = 0;
    while (questions.length < 100) {
      const variant = variants[Math.floor(index / chapter.facts.length) % variants.length];
      const fact = chapter.facts[index % chapter.facts.length];
      questions.push(variant(chapter, fact, chapter.facts, index));
      index += 1;
    }
    return questions.map((question, questionIndex) => ({
      ...question,
      number: questionIndex + 1,
      setIndex: Math.floor(questionIndex / 10)
    }));
  };

  window.COMPONENT_QUIZ_DATA = {
    version: "2026-07-06",
    section: {
      id: "cau-kien-trong-nhung",
      title: "Cấu kiện trong nhúng",
      source: "Tổng hợp cấu kiện điện tử ứng dụng trong hệ nhúng",
      hasLessons: true
    },
    chapters: chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      subtitle: chapter.subtitle,
      sourceRange: chapter.sourceRange,
      lessonSlides: chapter.lessonSlides,
      questionCount: 100,
      setSize: 10,
      questions: buildQuestions(chapter)
    }))
  };
})();
