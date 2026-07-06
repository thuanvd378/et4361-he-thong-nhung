(() => {
  const f = (topic, source, stem, correct, why, wrong) => ({
    topic,
    source,
    stem,
    correct,
    why,
    wrong: wrong.map(([text, reason]) => ({ text, reason }))
  });

  const chapters = [
    {
      id: "tong-quan-thiet-ke",
      title: "Giới thiệu về hệ thống nhúng",
      subtitle: "Định nghĩa, đặc điểm, mô hình, quy trình, trade-off và tiêu chuẩn.",
      sourceRange: "Slide 11-33",
      facts: [
        f("định nghĩa hệ thống nhúng", "Slide 11", "Hệ thống nhúng được hiểu đúng nhất là gì?", "Một hệ thống máy tính ứng dụng có bộ xử lý, được nhúng vào sản phẩm hoặc hệ lớn hơn để thực hiện nhiệm vụ chuyên biệt.", "Slide 11 phân biệt hệ thống nhúng với PC, laptop hay siêu máy tính: nó vẫn có xử lý/tính toán nhưng không phải máy tính đa năng.", [
          ["Một máy tính đa năng có thể chạy mọi loại phần mềm như desktop hoặc laptop.", "Desktop/laptop là ví dụ slide dùng để phân biệt với hệ thống nhúng."],
          ["Một thiết bị chỉ gồm mạch điện tương tự, không cần bộ xử lý.", "Theo slide, hệ thống nhúng có ứng dụng các bộ xử lý."],
          ["Một hệ thống chỉ được gọi là nhúng nếu luôn kết nối Internet.", "Kết nối Internet không phải điều kiện định nghĩa hệ thống nhúng."]
        ]),
        f("ranh giới với máy tính đa năng", "Slide 11", "Điểm phân biệt quan trọng giữa hệ thống nhúng và PC/laptop là gì?", "Hệ thống nhúng thường phục vụ một chức năng cụ thể trong sản phẩm, còn PC/laptop là máy tính đa năng.", "Slide 11 gạch chéo PC/laptop/server để nhấn mạnh hệ thống nhúng không phải nhóm máy tính đa năng này.", [
          ["Hệ thống nhúng không bao giờ có CPU.", "Ngược lại, bộ xử lý là thành phần cốt lõi của hệ thống nhúng."],
          ["PC/laptop không có phần mềm, còn hệ thống nhúng có phần mềm.", "PC/laptop cũng có phần mềm; khác biệt chính là tính đa năng và mục tiêu sử dụng."],
          ["Chỉ kích thước vật lý quyết định một hệ có phải hệ thống nhúng hay không.", "Kích thước thường nhỏ/gọn nhưng không phải tiêu chí định nghĩa duy nhất."]
        ]),
        f("tính chuyên dụng", "Slide 12", "Đặc điểm 'chuyên dụng' của hệ thống nhúng nghĩa là gì?", "Hệ thống được thiết kế cho chức năng riêng, ví dụ bộ điều khiển máy giặt không dùng thay bộ điều khiển đèn giao thông.", "Slide 12 nêu chuyên dụng là đặc điểm điển hình: hệ thống nhúng không thay thế lẫn nhau một cách tùy tiện.", [
          ["Một hệ thống nhúng phải thay thế được mọi hệ nhúng khác nếu cùng dùng MCU.", "Cùng dùng MCU không làm hai hệ có cùng chức năng, mạch ngoài hay firmware."],
          ["Chuyên dụng nghĩa là luôn chỉ có đúng một linh kiện điện tử.", "Chuyên dụng nói về nhiệm vụ hệ thống, không phải số linh kiện."],
          ["Chuyên dụng nghĩa là không cần thiết kế firmware.", "Firmware là phần điều khiển hành vi phần cứng trong hệ nhúng."]
        ]),
        f("ràng buộc hiệu năng và tài nguyên", "Slide 12", "Vì sao thiết kế hệ thống nhúng thường phải cân nhắc hiệu năng, bộ nhớ, chi phí và năng lượng?", "Vì phần cứng và phần mềm thường bị giới hạn tài nguyên, nên không thể chọn cấu hình tùy ý như một hệ máy tính lớn.", "Slide 12 nêu hiệu năng/tài nguyên hạn chế là đặc điểm điển hình của hệ thống nhúng.", [
          ["Vì hệ thống nhúng luôn có tài nguyên dư thừa nên phải dùng hết.", "Tài nguyên giới hạn mới là lý do phải cân nhắc."],
          ["Vì hệ thống nhúng không có yêu cầu năng lượng.", "Năng lượng là một tiêu chí quan trọng, nhất là thiết bị dùng pin."],
          ["Vì chỉ phần mềm quan trọng, phần cứng không ảnh hưởng.", "Thiết kế nhúng luôn liên quan chặt giữa phần cứng và phần mềm."]
        ]),
        f("real-time", "Slide 12", "Cách hiểu nào đúng về tính real-time trong hệ thống nhúng?", "Real-time là kiểm soát được thời gian đáp ứng và bảo đảm phản hồi trong giới hạn đã biết trước, không nhất thiết là ngay lập tức.", "Slide 12 nhấn mạnh real-time không đồng nghĩa với 'càng nhanh càng tốt' mà là đáp ứng đúng hạn.", [
          ["Real-time nghĩa là mọi phản hồi phải tức thời bằng 0 giây.", "Yêu cầu thật là đáp ứng trong hạn thời gian xác định."],
          ["Real-time chỉ liên quan đến giao diện đẹp hay xấu.", "Real-time liên quan hành vi thời gian của hệ thống."],
          ["Real-time chỉ cần nếu hệ thống có Internet.", "Yêu cầu thời gian có thể xuất hiện trong điều khiển, đo lường, an toàn, không phụ thuộc Internet."]
        ]),
        f("độ tin cậy và môi trường", "Slide 12", "Vì sao các hệ thống như ô tô, máy bay, y tế thường yêu cầu độ tin cậy cao?", "Vì lỗi của hệ nhúng trong các môi trường đó có thể ảnh hưởng trực tiếp đến an toàn, vận hành hoặc tính mạng.", "Slide 12 nêu ví dụ máy bay, ô tô cho yêu cầu độ tin cậy và khả năng chịu môi trường.", [
          ["Vì hệ thống càng nguy hiểm thì càng không cần kiểm thử.", "Các hệ rủi ro cao càng cần kiểm thử, tiêu chuẩn và thiết kế tin cậy."],
          ["Vì độ tin cậy chỉ là vấn đề thẩm mỹ sản phẩm.", "Độ tin cậy liên quan khả năng hoạt động đúng và an toàn."],
          ["Vì hệ nhúng trong ô tô không bao giờ hoạt động trong môi trường khắc nghiệt.", "Ô tô có rung, nhiệt, nhiễu điện và điều kiện vận hành phức tạp."]
        ]),
        f("tính phân tán", "Slide 12", "Tính phân tán của hệ thống nhúng được hiểu như thế nào?", "Nhiều hệ nhúng có thể được phân chia theo chức năng và kết nối với nhau để tạo thành một hệ lớn hơn.", "Slide 12 nêu hệ thống nhúng thường phân tán theo chức năng.", [
          ["Phân tán nghĩa là mỗi hệ nhúng hoàn toàn không bao giờ giao tiếp.", "Các hệ phân tán thường phải kết nối và phối hợp."],
          ["Phân tán nghĩa là tất cả chức năng phải nằm trong một chip duy nhất.", "Phân tán là chia chức năng, không gom tất cả vào một chip."],
          ["Phân tán chỉ là một kiểu bố trí giao diện người dùng.", "Đây là đặc điểm kiến trúc hệ thống, không chỉ giao diện."]
        ]),
        f("thị trường hệ thống nhúng", "Slide 13", "Nhóm nào là ví dụ đúng về thị trường có nhiều thiết bị nhúng?", "Ô tô, điện tử tiêu dùng, điều khiển công nghiệp, y tế, mạng truyền thông và tự động hóa văn phòng.", "Các lĩnh vực này đều dùng nhiều thiết bị chuyên dụng có xử lý, cảm biến, điều khiển hoặc truyền thông.", [
          ["Chỉ có máy tính để bàn và siêu máy tính.", "Đây là nhóm máy tính đa năng, không phải ví dụ chính của thị trường nhúng trong slide."],
          ["Chỉ có thiết bị không dùng điện.", "Hệ thống nhúng là hệ có điện tử và xử lý."],
          ["Chỉ có thiết bị chơi game cầm tay, không có công nghiệp hay y tế.", "Slide nêu cả công nghiệp, y tế, mạng, văn phòng và nhiều nhóm khác."]
        ]),
        f("hệ thống nhúng trong ô tô", "Slide 14", "Điều gì đúng về hệ thống nhúng trong xe hiện đại?", "Một xe có thể chứa nhiều hệ nhúng chuyên trách như ABS, túi khí, điều khiển động cơ, gạt nước, cửa kính, điều hòa.", "Xe hiện đại thường có nhiều bộ điều khiển nhúng chuyên trách, không phải một bộ xử lý làm mọi việc.", [
          ["Một xe hiện đại chỉ có đúng một bộ xử lý làm mọi việc.", "Xe hiện đại thường có nhiều module/hệ nhúng chuyên trách."],
          ["Chỉ đèn pha mới cần hệ nhúng, ABS và túi khí không cần.", "ABS và túi khí là các hệ nhúng quan trọng về an toàn."],
          ["Số hệ nhúng trong xe cao cấp luôn bằng 0 vì xe dùng cơ khí.", "Slide ghi xe cao cấp có thể có 100+ hệ nhúng."]
        ]),
        f("phân loại theo chức năng", "Slide 15", "Khi phân loại hệ thống nhúng theo chức năng, tiêu chí chính là gì?", "Nhìn vào nhiệm vụ chính như thu thập/lưu trữ/biểu diễn dữ liệu, truyền thông, xử lý tín hiệu, giám sát, điều khiển hoặc giao diện chuyên dụng.", "Slide 15 chia hệ thống nhúng theo chức năng thực hiện.", [
          ["Chỉ dựa vào màu sắc vỏ thiết bị.", "Màu vỏ không phải tiêu chí chức năng."],
          ["Chỉ dựa vào hãng sản xuất chip.", "Hãng chip có thể liên quan lựa chọn phần cứng nhưng không phải phân loại chức năng hệ thống."],
          ["Chỉ dựa vào ngôn ngữ lập trình firmware.", "Ngôn ngữ lập trình không quyết định chức năng chính của hệ thống."]
        ]),
        f("data collection/storage/representation", "Slide 15", "Nhóm 'Data collection / Storage / Representation' phù hợp nhất với nhiệm vụ nào?", "Thu thập, lưu trữ và biểu diễn dữ liệu, ví dụ máy ảnh số.", "Nhóm chức năng này tập trung vào việc lấy dữ liệu từ thế giới thực, lưu lại và trình bày ở dạng có thể sử dụng.", [
          ["Chỉ đóng cắt tải công suất AC.", "Đóng cắt tải là hướng điều khiển/driver, không phải thu thập và biểu diễn dữ liệu."],
          ["Chỉ thay đổi giao thức mạng ở tầng vật lý.", "Đó gần hơn với truyền thông dữ liệu."],
          ["Chỉ tối ưu kiểu dáng vỏ cơ khí.", "Kiểu dáng không phải nhiệm vụ dữ liệu chính."]
        ]),
        f("data communication", "Slide 15", "Router không dây thuộc nhóm chức năng nào của hệ thống nhúng?", "Data communication, tức truyền thông dữ liệu.", "Router không dây có nhiệm vụ chính là nhận, xử lý và chuyển tiếp dữ liệu giữa các thiết bị/mạng.", [
          ["Monitoring y tế.", "Monitoring tập trung theo dõi trạng thái/sinh hiệu, không phải chức năng chính của router."],
          ["Application specific user interface.", "Giao diện chuyên biệt là một nhóm khác."],
          ["Data storage thuần túy.", "Router chủ yếu truyền thông dữ liệu, không phải lưu trữ dữ liệu là nhiệm vụ chính."]
        ]),
        f("cấu trúc điển hình", "Slide 16", "Cấu trúc điển hình của hệ thống nhúng gồm các khối nào?", "System core, memory, embedded firmware, input ports/sensors, output ports/actuators, communication interface và các IC/hệ con hỗ trợ.", "Một hệ nhúng thực tế thường có lõi xử lý, bộ nhớ, firmware và các khối vào/ra để tương tác với môi trường.", [
          ["Chỉ gồm màn hình và bàn phím, không có xử lý.", "System core và memory là các khối trung tâm."],
          ["Chỉ gồm phần mềm ứng dụng, không cần phần cứng.", "Phần cứng là nền tảng bắt buộc của hệ nhúng."],
          ["Chỉ gồm nguồn điện, không có I/O.", "I/O là cầu nối giữa hệ nhúng và môi trường."]
        ]),
        f("system core", "Slide 16", "System core trong hệ thống nhúng có thể là nhóm phần tử nào?", "FPGA, ASIC, DSP, SoC, microprocessor hoặc microcontroller tùy yêu cầu ứng dụng.", "Slide 16 liệt kê nhiều dạng lõi xử lý, không chỉ CPU truyền thống.", [
          ["Chỉ có thể là màn hình LCD.", "LCD là thiết bị hiển thị, không phải lõi xử lý."],
          ["Chỉ có thể là pin nguồn.", "Nguồn cấp không phải system core."],
          ["Chỉ có thể là cáp truyền thông.", "Cáp/giao tiếp hỗ trợ truyền dữ liệu, không phải lõi xử lý."]
        ]),
        f("kiến trúc board hệ thống", "Slide 17", "Trong kiến trúc board hệ thống nhúng, bus có vai trò gì?", "Bus là đường kết nối chung giúp processor, memory, input và output trao đổi dữ liệu.", "Bus tạo đường truyền dữ liệu/địa chỉ/điều khiển để các khối trên board phối hợp với nhau.", [
          ["Bus chỉ là vỏ nhựa bên ngoài board.", "Bus là đường kết nối dữ liệu/tín hiệu."],
          ["Bus chỉ dùng để trang trí tài liệu thiết kế.", "Bus có vai trò truyền dữ liệu giữa các khối."],
          ["Bus thay thế hoàn toàn bộ nhớ.", "Bus kết nối đến bộ nhớ chứ không thay thế chức năng lưu trữ."]
        ]),
        f("điện thoại di động phức tạp", "Slide 18", "Vì sao điện thoại di động được xem là một hệ nhúng phức tạp?", "Nó kết hợp nhiều miền chức năng như analog baseband, RF, ARM control, DSP, giao diện, nguồn và quản lý năng lượng.", "Điện thoại không chỉ là một MCU đơn lẻ mà là hệ nhiều khối phần cứng/phần mềm phối hợp.", [
          ["Điện thoại chỉ có một LED và một nút nhấn.", "Điện thoại có nhiều khối như RF, DSP, ARM, nguồn, codec, display."],
          ["Khối nguồn không liên quan đến hệ nhúng.", "Power management là một phần quan trọng của điện thoại và nhiều hệ nhúng phức tạp."],
          ["RF và baseband luôn nằm ngoài mọi hệ nhúng.", "Chúng là các miền chức năng trong ví dụ điện thoại."]
        ]),
        f("board 8051", "Slide 19", "Khi thiết kế một board 8051/MCU thực tế, ngoài vi điều khiển thường cần thêm các khối hỗ trợ nào?", "Ngoài vi điều khiển còn cần nguồn, reset, clock, hiển thị, giao tiếp RS-232 và mạch phụ trợ.", "Một board MCU chạy được cần các khối tối thiểu như cấp nguồn, tạo xung clock, reset, giao tiếp và mạch kết nối ngoại vi.", [
          ["Chỉ cần vẽ một chip MCU là đủ cho mọi board chạy được.", "Board thực tế cần nguồn, clock, reset, giao tiếp và ngoại vi."],
          ["Không cần mạch nguồn ổn áp.", "Board thực tế cần nguồn ổn định và tụ lọc phù hợp."],
          ["Không cần clock hoặc reset cho vi điều khiển.", "Slide có mạch thạch anh 11.059 MHz và mạch reset."]
        ]),
        f("mô hình lớp", "Slide 20", "Trong mô hình lớp của hệ thống nhúng, lớp nào là bắt buộc?", "Hardware Layer là lớp bắt buộc; System Software Layer và Application Software Layer có thể tùy chọn.", "Slide 20 ghi rõ Hardware Layer (Required), hai lớp phần mềm là Optional.", [
          ["Application Software Layer luôn bắt buộc trong mọi hệ nhúng.", "Slide ghi Application Software Layer là tùy chọn."],
          ["System Software Layer luôn bắt buộc như hardware.", "Slide ghi System Software Layer là tùy chọn."],
          ["Không lớp nào bắt buộc vì hệ nhúng chỉ là ý tưởng.", "Phần cứng là nền tảng bắt buộc."]
        ]),
        f("mô hình OSI", "Slide 21", "Mô hình OSI giúp hiểu vấn đề nào?", "Giúp hiểu truyền thông theo tầng, từ Application xuống Physical và qua môi trường truyền.", "OSI là mô hình phân tầng giúp tách trách nhiệm của ứng dụng, vận chuyển, mạng, liên kết dữ liệu và lớp vật lý.", [
          ["Giúp tính dòng qua LED trực tiếp.", "Tính dòng LED thuộc mạch I/O, không phải mục tiêu chính của OSI."],
          ["Giúp thay thế hoàn toàn firmware.", "OSI là mô hình phân tầng truyền thông, không thay thế firmware."],
          ["Chỉ dùng để mô tả màu sắc giao diện.", "OSI mô tả các lớp truyền thông."]
        ]),
        f("data và header", "Slide 22", "Khi dữ liệu đi xuống các lớp giao thức, điều gì xảy ra?", "Mỗi lớp có thể thêm header riêng để đóng gói dữ liệu; phía nhận đọc và loại bỏ header tương ứng.", "Đóng gói theo lớp giúp mỗi tầng thêm thông tin điều khiển của tầng đó rồi phía nhận bóc tách theo chiều ngược lại.", [
          ["Dữ liệu luôn bị xóa hoàn toàn ở mỗi lớp.", "Dữ liệu được đóng gói thêm thông tin điều khiển, không bị xóa."],
          ["Header chỉ là phần trang trí không có thông tin.", "Header chứa thông tin điều khiển/phục vụ giao thức."],
          ["Physical layer luôn tự hiểu dữ liệu ứng dụng mà không cần lớp khác.", "Mỗi lớp xử lý phần trách nhiệm của mình."]
        ]),
        f("quy trình thiết kế", "Slide 23", "Luồng tổng quát trong thiết kế/phát triển hệ thống nhúng bắt đầu từ đâu?", "Bắt đầu từ requirement specification, sau đó system design, hardware/software partitioning, phát triển firmware/hardware/cơ khí, tích hợp và kiểm thử.", "Slide 23 trình bày quy trình nhiều nhánh và hội tụ vào kiểm thử toàn hệ thống.", [
          ["Bắt đầu bằng bán sản phẩm rồi mới viết yêu cầu.", "Đặc tả yêu cầu là bước đầu trong slide."],
          ["Chỉ cần viết firmware, không cần phần cứng hay cơ khí.", "Slide có các nhánh firmware, hardware và mechanical."],
          ["Không cần kiểm thử tích hợp.", "Hardware and firmware integration và total system testing là các bước quan trọng."]
        ]),
        f("hardware/software partitioning", "Slide 23", "Bước hardware/software partitioning quyết định điều gì?", "Quyết định chức năng nào hiện thực bằng phần cứng và chức năng nào hiện thực bằng phần mềm/firmware.", "Slide 23 đặt bước này ngay sau system design vì nó ảnh hưởng sâu đến kiến trúc hệ thống.", [
          ["Quyết định màu nền slide báo cáo.", "Đây là quyết định kiến trúc kỹ thuật, không phải trình bày."],
          ["Chỉ quyết định loại dây nguồn.", "Nó quyết định phân chia chức năng giữa phần cứng và phần mềm."],
          ["Chỉ dùng sau khi sản phẩm đã hoàn thiện.", "Bước này nằm sớm trong quy trình thiết kế."]
        ]),
        f("mô hình triển khai", "Slide 24", "Vì sao không có một mô hình triển khai thiết kế luôn tốt nhất?", "Vì lựa chọn phụ thuộc yêu cầu, rủi ro, phản hồi, thời gian, chi phí và độ phức tạp hệ thống.", "Slide 24 nêu Big-bang, Code-and-fix, Waterfall, Spiral và các mô hình khác, kèm câu hỏi 'mô hình nào tốt nhất?'.", [
          ["Vì mọi dự án nhúng đều giống hệt nhau.", "Sự khác nhau giữa dự án là lý do không có mô hình duy nhất tốt nhất."],
          ["Vì không cần kế hoạch trong mọi trường hợp.", "Một số mô hình cần kế hoạch rõ ràng, ví dụ waterfall/spiral."],
          ["Vì chỉ big-bang được phép dùng.", "Slide liệt kê nhiều mô hình triển khai khác nhau."]
        ]),
        f("trade-off", "Slide 25", "Tam giác trade-off trong thiết kế hệ thống nhúng nhấn mạnh điều gì?", "Không thể tối ưu đồng thời kế hoạch, chất lượng và tính năng mà không đánh đổi tài nguyên, thời gian hoặc rủi ro.", "Slide 25 dùng tam giác bất khả thi với Kế hoạch, Chất lượng, Tính năng.", [
          ["Thêm tính năng luôn không ảnh hưởng thời gian hay chất lượng.", "Thêm tính năng thường kéo theo đánh đổi."],
          ["Rút ngắn kế hoạch luôn làm chất lượng tăng chắc chắn.", "Rút ngắn kế hoạch có thể tăng rủi ro chất lượng hoặc phải giảm tính năng."],
          ["Trade-off chỉ liên quan màu vẽ trang trí.", "Trade-off là nguyên tắc quyết định trong thiết kế."]
        ]),
        f("vai trò tiêu chuẩn", "Slide 26", "Tiêu chuẩn trong thiết kế hệ nhúng nhằm mục tiêu chính nào?", "Đảm bảo hệ thống hoạt động đúng và tương thích với các thành phần/liên quan ngay từ thiết kế.", "Slide 26 nêu tiêu chuẩn giúp khả năng hoạt động và tương thích qua nhiều lớp.", [
          ["Để mọi nhà sản xuất làm thiết bị không cần tương thích.", "Chuẩn giúp tương tác giữa thiết bị của các bên."],
          ["Chỉ để làm tài liệu dài hơn.", "Tiêu chuẩn có vai trò kỹ thuật, pháp lý và liên vận hành."],
          ["Chỉ áp dụng cho vỏ hộp, không áp dụng phần mềm hay truyền thông.", "Slide cho thấy tiêu chuẩn trải qua hardware, system software và application."]
        ]),
        f("chuẩn theo thị trường", "Slide 27-32", "Nhận định nào đúng về tiêu chuẩn theo thị trường trong hệ thống nhúng?", "Mỗi lĩnh vực như consumer electronics, medical, industrial, networking, automotive có thể có chuẩn riêng về an toàn, tương thích, truyền thông hoặc chất lượng.", "Các slide 27-32 đưa nhiều ví dụ như JavaTV, DVB-MHP, FDA, IEEE 1073, IEC 60204-1, TCP/IP, Ethernet, Bluetooth, ISO 9000.", [
          ["Tất cả lĩnh vực luôn dùng đúng một tiêu chuẩn duy nhất.", "Mỗi thị trường có yêu cầu và chuẩn riêng."],
          ["Thiết bị y tế không cần tiêu chuẩn an toàn.", "Slide nêu FDA, Medical Devices Directive và IEEE 1073."],
          ["Networking không có chuẩn nào liên quan phần mềm/hardware.", "Slide nêu TCP/IP, PPP, IEEE 802.3 Ethernet và cellular."]
        ])
      ]
    },
    {
      id: "phan-cung-nhung",
      title: "Phần cứng nhúng",
      subtitle: "Bộ xử lý, bộ nhớ, cổng I/O, bus và bảo vệ phần cứng.",
      sourceRange: "Slide 37-87",
      facts: [
        f("vai trò bộ xử lý", "Slide 39", "Bộ xử lý trong phần cứng nhúng có vai trò chính nào?", "Là lõi quan trọng nhất, xử lý lệnh và dữ liệu, thường có một master và có thể có các slave phụ.", "Slide 39 gọi bộ xử lý là lõi quan trọng nhất của phần cứng nhúng.", [
          ["Chỉ dùng để trang trí board mạch.", "Bộ xử lý thực hiện lệnh và xử lý dữ liệu."],
          ["Không liên quan firmware hay bộ nhớ.", "Firmware, memory và core phối hợp chặt trong hệ nhúng."],
          ["Luôn chỉ có slave, không có master.", "Slide nêu luôn có bộ xử lý chính master và có thể có slave."]
        ]),
        f("các dạng system core", "Slide 38-39", "System core trong hệ nhúng có thể thuộc các dạng nào?", "Microprocessor, microcontroller, DSP, FPGA, ASIC hoặc SoC tùy bài toán.", "Slide 38-39 liệt kê nhiều dạng core, cho thấy không chỉ có MCU.", [
          ["Chỉ có thể là vi điều khiển 8 bit.", "Core có thể là uP, uC, DSP, FPGA, ASIC, SoC."],
          ["Chỉ có thể là bộ nhớ Flash.", "Flash là bộ nhớ, không phải core xử lý."],
          ["Chỉ có thể là mạch reset.", "Reset là mạch phụ trợ, không phải lõi xử lý."]
        ]),
        f("phân loại bộ xử lý", "Slide 41", "Các tiêu chí nào thường dùng để phân loại bộ xử lý trong hệ nhúng?", "Số bit, chức năng/loại chip, tập lệnh, cấu trúc bộ nhớ và cách đánh địa chỉ byte.", "Các tiêu chí này cho biết bộ xử lý thuộc kiểu nào và phù hợp với cách tổ chức bộ nhớ/chương trình ra sao.", [
          ["Chỉ dựa vào màu package IC.", "Package không phải nhóm tiêu chí kiến trúc."],
          ["Chỉ dựa vào giá mua ngoài thị trường.", "Giá có thể quan trọng khi chọn chip nhưng không phải tiêu chí phân loại kiến trúc chính."],
          ["Chỉ dựa vào tên người lập trình firmware.", "Không liên quan phân loại bộ xử lý."]
        ]),
        f("microprocessor và microcontroller", "Slide 42", "Khác biệt cốt lõi giữa microprocessor và microcontroller là gì?", "Microprocessor chủ yếu là CPU và cần ngoại vi ngoài; microcontroller tích hợp CPU, RAM, ROM/Flash, timer, interrupt và I/O trên chip.", "Slide 42 so sánh uP là đơn vị phụ thuộc, uC là đơn vị tự chứa cho nhiều chức năng cơ bản.", [
          ["Microcontroller luôn không có I/O.", "MCU thường có nhiều I/O tích hợp."],
          ["Microprocessor luôn tích hợp mọi ngoại vi như timer, UART, RAM, Flash.", "Đó gần hơn với mô tả MCU."],
          ["Hai khái niệm hoàn toàn giống nhau trong mọi tiêu chí.", "Slide so sánh nhiều khác biệt về tích hợp, mục tiêu, I/O và năng lượng."]
        ]),
        f("mục tiêu của MCU", "Slide 42", "Vì sao microcontroller thường phù hợp với nhiều ứng dụng nhúng nhỏ/gọn?", "Vì tích hợp nhiều ngoại vi và bộ nhớ, có nhiều tính năng tiết kiệm năng lượng, giảm linh kiện ngoài.", "Slide 42 nhấn mạnh MCU là đơn vị tự chứa và có built-in I/O, low-power features.", [
          ["Vì MCU bắt buộc cần rất nhiều chip ngoài mới hoạt động cơ bản.", "MCU tích hợp nhiều khối cơ bản trên chip."],
          ["Vì MCU luôn tiêu thụ nhiều điện hơn mọi microprocessor.", "Slide nêu MCU có nhiều tính năng tiết kiệm năng lượng hơn."],
          ["Vì MCU không thể dùng cho hệ nhúng.", "MCU là lựa chọn rất phổ biến trong hệ nhúng."]
        ]),
        f("DSP", "Slide 43", "DSP nổi bật ở điểm nào so với bộ xử lý thông thường?", "DSP tối ưu cho audio, video, truyền thông và tính toán tín hiệu, có phần cứng hỗ trợ như nhân, tích chập, FFT, DMA.", "Slide 43 nêu DSP có thể nhanh hơn 2-3 lần trong các tác vụ xử lý tín hiệu nhờ phần cứng chuyên dụng.", [
          ["DSP chỉ dùng để lưu dữ liệu như ROM.", "DSP là bộ xử lý, không phải bộ nhớ."],
          ["DSP không phù hợp tính toán tín hiệu.", "Xử lý tín hiệu là mục tiêu chính của DSP."],
          ["DSP luôn chậm hơn vì mọi thuật toán chỉ chạy bằng giấy.", "Slide nêu DSP dùng phần cứng hỗ trợ nên nhanh trong tác vụ phù hợp."]
        ]),
        f("RISC và CISC", "Slide 44", "Đặc điểm nào phù hợp với RISC trong so sánh của slide?", "Tập lệnh ít hơn, lệnh đơn giản độ dài cố định, thao tác chủ yếu trên thanh ghi, dễ pipeline và thường có nhiều thanh ghi.", "Slide 44 so sánh RISC với CISC theo số lệnh, pipeline, thanh ghi, load/store và độ dài lệnh.", [
          ["RISC có lệnh độ dài biến đổi và logic giải mã rất phức tạp như CISC.", "Đó là đặc trưng gần CISC hơn."],
          ["RISC luôn thao tác trực tiếp trên bộ nhớ với mọi lệnh.", "RISC thường chỉ load/store thao tác bộ nhớ."],
          ["RISC không thể pipeline.", "Slide nêu RISC có instruction pipelining."]
        ]),
        f("Von-Neumann và Harvard", "Slide 46-47", "Khác biệt chính giữa Von-Neumann và Harvard là gì?", "Von-Neumann dùng chung đường/bộ nhớ cho lệnh và dữ liệu; Harvard tách bus/bộ nhớ lệnh và dữ liệu.", "Slide 46-47 mô tả single shared bus của Von-Neumann và separate buses của Harvard.", [
          ["Harvard dùng chung một bus duy nhất cho instruction và data.", "Đó là mô tả Von-Neumann."],
          ["Von-Neumann luôn có hai bus riêng cho lệnh và dữ liệu.", "Von-Neumann dùng shared bus."],
          ["Hai kiến trúc chỉ khác tên gọi, không khác cách tổ chức bộ nhớ.", "Khác biệt nằm ở tổ chức bộ nhớ và đường truyền lệnh/dữ liệu."]
        ]),
        f("endian", "Slide 48", "Little-endian được mô tả như thế nào?", "Byte thấp hơn được lưu ở địa chỉ thấp hơn.", "Trong little-endian, byte ít quan trọng hơn của một giá trị nhiều byte nằm ở địa chỉ thấp hơn.", [
          ["Byte thấp hơn lưu ở địa chỉ cao hơn.", "Đó là mô tả big-endian."],
          ["Endian chỉ ảnh hưởng màu dây trên PCB.", "Endian ảnh hưởng cách lưu giá trị nhiều byte trong bộ nhớ/truyền dữ liệu."],
          ["Endian không cần quan tâm khi đọc dump bộ nhớ hay giao tiếp giữa kiến trúc khác nhau.", "Slide nhấn mạnh cần biết endian để ghép byte đúng thứ tự."]
        ]),
        f("đánh giá bộ xử lý", "Slide 50", "Các tiêu chí nào thường dùng để đánh giá bộ xử lý trong hệ nhúng?", "Kiến trúc, xung nhịp, CPI, MIPS và công suất tiêu thụ.", "Đánh giá processor nhúng cần xét cả hiệu năng tính toán lẫn năng lượng, không chỉ tên thương mại.", [
          ["Chỉ số lượng ảnh quảng cáo của hãng.", "Không phải tiêu chí kỹ thuật."],
          ["Chỉ tên thương mại của board phát triển.", "Tên board không đủ để đánh giá processor."],
          ["Chỉ màu của chip.", "Không liên quan hiệu năng hay công suất."]
        ]),
        f("công suất và xung nhịp", "Slide 50", "Quan hệ giữa điện áp/tần số và công suất gợi ý điều gì khi chọn processor nhúng?", "Tăng điện áp lõi hoặc tần số thường làm công suất và dòng tiêu thụ tăng, nên phải cân bằng hiệu năng và năng lượng.", "Trong hệ nhúng, tăng hiệu năng thường kéo theo chi phí năng lượng/nhiệt nên cần chọn mức xử lý vừa đủ cho bài toán.", [
          ["Tăng tần số luôn làm công suất giảm về 0.", "Xu hướng thường ngược lại: tần số/điện áp cao hơn làm tiêu thụ tăng."],
          ["Công suất không liên quan lựa chọn processor nhúng.", "Công suất là tiêu chí quan trọng trong hệ nhúng."],
          ["MIPS/CPI luôn so sánh máy móc được giữa mọi kiến trúc.", "Các chỉ số này chỉ có ý nghĩa khi đặt trong bối cảnh kiến trúc và workload."],
        ]),
        f("họ MCU Microchip", "Slide 51", "Nhóm MCU 8-bit phổ biến của Microchip gồm gì?", "8051/AT89, PIC10/PIC12/PIC16/PIC18 và AVR như ATtiny, ATmega, ATxmega.", "Đây là các họ MCU 8-bit phổ biến trong các bài toán nhúng nhỏ/gọn.", [
          ["Chỉ gồm x86 Core i5.", "x86 Core i5 không thuộc nhóm MCU 8-bit Microchip."],
          ["Chỉ gồm FPGA công nghiệp.", "Slide đang nói MCU Microchip."],
          ["Chỉ gồm DRAM và NVRAM.", "Đó là công nghệ bộ nhớ, không phải MCU."]
        ]),
        f("lựa chọn MCU TI", "Slide 52", "Khi chọn MCU Texas Instruments, nên bắt đầu từ yếu tố nào?", "Bắt đầu từ miền ứng dụng như general purpose, real-time control, industrial sensing, communications, automotive hoặc high performance.", "Mỗi họ MCU thường được định vị cho một nhóm ứng dụng, nên cần xuất phát từ yêu cầu bài toán trước khi chọn chip.", [
          ["Chỉ chọn theo chữ cái đầu của tên chip.", "Cần định hướng theo ứng dụng và yêu cầu kỹ thuật."],
          ["Mọi dòng TI đều có cùng định vị ứng dụng.", "Các họ có định vị rất khác nhau."],
          ["Chỉ chọn theo màu/nhãn marketing, không cần hiểu ứng dụng.", "Tên gọi hay màu phân nhóm không thay thế tiêu chí kỹ thuật."]
        ]),
        f("on-chip và off-chip memory", "Slide 61", "So sánh đúng giữa on-chip và off-chip memory là gì?", "On-chip thường nhỏ nhưng nhanh, off-chip thường lớn hơn nhưng chậm và phức tạp hơn do bus ngoài.", "Slide 61 nêu L1/L2 on-chip nhanh hơn và external L3 lớn hơn nhưng truy cập nhiều chu kỳ hơn.", [
          ["Off-chip luôn nhanh hơn on-chip vì nằm xa hơn.", "Xa core và qua bus ngoài thường làm chậm hơn."],
          ["On-chip luôn có dung lượng hàng trăm Mbyte trong MCU nhỏ.", "Slide nêu on-chip thường nhỏ, ví dụ hàng chục/hàng trăm kbyte."],
          ["Bộ nhớ ngoài không ảnh hưởng số chân hay năng lượng.", "Off-chip tăng số chân, bus ngoài, năng lượng và độ phức tạp."]
        ]),
        f("bộ nhớ chương trình và dữ liệu", "Slide 62", "Bộ nhớ chương trình trong hệ nhúng thường cần đặc tính nào?", "Không bay hơi để giữ chương trình sau khi mất điện, nên thường dùng ROM/Flash/EEPROM.", "Slide 62 phân loại code memory ROM và read/write memory RAM.", [
          ["Phải mất dữ liệu ngay khi tắt nguồn.", "Bộ nhớ chương trình cần giữ firmware."],
          ["Chỉ dùng DRAM vì DRAM không cần refresh.", "DRAM cần refresh và là RAM volatile."],
          ["Không liên quan firmware.", "Firmware thường nằm trong vùng bộ nhớ chương trình."]
        ]),
        f("ROM matrix", "Slide 63-64", "Trong ROM matrix, địa chỉ và output buffer có vai trò gì?", "Địa chỉ được giải mã để chọn hàng nhớ; output buffer ba trạng thái cho phép IC chia sẻ bus dữ liệu.", "Slide 63-64 mô tả address decoder, memory cell, D7-D0 và 3-state output buffers.", [
          ["Address decoder dùng để cấp nguồn cho LED 7 đoạn.", "Nó chọn hàng nhớ trong ma trận ROM."],
          ["Output buffer ba trạng thái luôn kéo bus xuống thấp.", "Ba trạng thái cho phép high-impedance khi IC không được chọn."],
          ["ROM đọc/ghi tùy ý như RAM trong khi chạy bình thường.", "ROM dùng lưu dữ liệu/chương trình cố định hoặc lập trình theo loại."]
        ]),
        f("các loại ROM", "Slide 65-67", "So sánh đúng EPROM và EEPROM là gì?", "EPROM xóa bằng tia cực tím qua cửa sổ; EEPROM xóa/ghi bằng điện.", "Slide 65-67 mô tả EPROM dùng floating gate và xóa bằng UV, EEPROM xóa bằng điện.", [
          ["EPROM xóa bằng lệnh điện trực tiếp trong mạch giống EEPROM.", "Slide nêu EPROM cần tia cực tím."],
          ["EEPROM chỉ ghi được một lần duy nhất.", "Ghi một lần là OTP/PROM, không phải EEPROM."],
          ["MROM linh hoạt nhất cho số lượng nhỏ.", "Slide nêu MROM không linh hoạt và đắt với số lượng nhỏ."]
        ]),
        f("Flash memory", "Slide 69-72", "Đặc điểm nào đúng về Flash memory trong bài?", "Flash là biến thể EEPROM dùng floating-gate transistor, tổ chức block/page, có giới hạn chu kỳ ghi/xóa và gồm NAND/NOR.", "Slide 69-72 nêu Flash phổ biến, có NAND/NOR, xóa theo block và số lần ghi/xóa hữu hạn.", [
          ["Flash ghi/xóa vô hạn nên có thể ghi liên tục một ô mãi mãi.", "Flash có giới hạn chu kỳ ghi/xóa."],
          ["Flash không liên quan EEPROM hay floating gate.", "Slide nêu Flash là biến thể EEPROM với floating-gate transistor."],
          ["Flash chỉ dùng làm dây truyền dữ liệu.", "Flash là bộ nhớ lưu trữ."]
        ]),
        f("NAND và NOR Flash", "Slide 70-71", "Nhận định nào đúng về NAND Flash và NOR Flash?", "NAND thường có mật độ cao, phù hợp lưu trữ khối lớn; NOR thuận tiện hơn cho truy cập ngẫu nhiên và firmware/boot code.", "Slide 70-71 so sánh cấu trúc NAND và NOR, nhấn mạnh mật độ NAND và khả năng đọc trực tiếp của NOR.", [
          ["NAND luôn tốt nhất cho thực thi mã trực tiếp ở mọi trường hợp.", "NOR thường phù hợp hơn cho firmware/boot code cần đọc trực tiếp."],
          ["NOR chỉ dùng cho thẻ nhớ dung lượng lớn vì rẻ nhất.", "Lưu trữ khối lớn thường là thế mạnh NAND."],
          ["Hai loại hoàn toàn giống nhau về cấu trúc cell nối dây.", "Slide mô tả cấu trúc NAND dạng chuỗi và NOR truy cập song song hơn."]
        ]),
        f("SRAM, DRAM, NVRAM", "Slide 73-76", "So sánh nào đúng giữa SRAM và DRAM?", "SRAM dùng mạch chốt 6 transistor, nhanh và không cần refresh; DRAM dùng transistor + tụ, mật độ cao hơn nhưng cần refresh.", "Slide 73-75 nêu SRAM nhanh hơn, đắt hơn, mật độ thấp hơn; DRAM chậm hơn do refresh.", [
          ["DRAM không cần refresh vì dùng mạch chốt hồi tiếp.", "DRAM lưu bằng điện tích trên tụ nên cần refresh."],
          ["SRAM dùng một tụ và một transistor giống DRAM.", "SRAM cell điển hình dùng 6 MOSFET."],
          ["NVRAM luôn mất dữ liệu ngay khi mất nguồn.", "NVRAM dùng nguồn dự phòng/pin để giữ dữ liệu."]
        ]),
        f("I/O cơ bản", "Slide 77", "Cổng vào/ra trong hệ nhúng dùng để làm gì?", "Đưa dữ liệu vào hoặc lấy dữ liệu ra khỏi mạch nhúng, gồm input, output và bidirectional.", "Slide 77 định nghĩa I/O là phương tiện liên kết bộ xử lý với thế giới bên ngoài.", [
          ["Chỉ để tăng kích thước PCB.", "I/O có chức năng trao đổi dữ liệu/tín hiệu."],
          ["Không liên quan cảm biến hay actuator.", "Input thường nối cảm biến/nút; output điều khiển hiển thị/actuator."],
          ["Chỉ có output, không có input hay hai chiều.", "Slide nêu ba loại input, output, bidirectional."]
        ]),
        f("input pull-up/pull-down", "Slide 78", "Mạch pull-up đọc nút nhấn hoạt động như thế nào?", "Khi công tắc hở, điện trở kéo chân input lên logic 1; khi nhấn, chân nối GND và đọc logic 0.", "Slide 78 minh họa pull-up và pull-down để tránh input trôi mức.", [
          ["Khi hở, chân input chắc chắn tự biết mức dù không có kéo lên/kéo xuống.", "Không có kéo, input có thể floating và đọc sai."],
          ["Pull-up luôn làm chân đọc 0 khi nút hở.", "Pull-up kéo về VCC, thường đọc 1 khi hở."],
          ["Bàn phím ma trận 4x4 cần 16 chân riêng bắt buộc.", "Slide nêu ma trận 4x4 chỉ cần 8 đường hàng/cột."]
        ]),
        f("output LED", "Slide 79", "Khi điều khiển LED từ chân MCU, điều gì luôn cần chú ý?", "Cần điện trở hạn dòng và kiểm tra dòng source/sink tối đa của chân MCU.", "Slide 79 minh họa LED active high/active low với điện trở khoảng 200 ohm và cảnh báo giới hạn dòng.", [
          ["Có thể nối LED trực tiếp không cần điện trở trong mọi trường hợp.", "LED cần hạn dòng để tránh hỏng LED hoặc MCU."],
          ["Source và sink không bao giờ có giới hạn.", "Dòng source/sink tối đa là giới hạn phần cứng."],
          ["LED 7 đoạn không cần biết common-anode hay common-cathode.", "Loại chung quyết định mức logic điều khiển."]
        ]),
        f("bus nối tiếp và song song", "Slide 81-85", "So sánh đúng giữa bus nối tiếp và bus song song trong phần cứng nhúng là gì?", "Bus nối tiếp tiết kiệm chân hơn nhưng thường chậm hơn; bus song song truyền nhiều bit cùng lúc nhưng tốn nhiều chân và đường PCB.", "Slide 81-85 trình bày I2C, SPI, 1-Wire, UART và bus song song với RD/WR/CS.", [
          ["Bus song song luôn chỉ cần một dây duy nhất.", "Bus song song dùng nhiều đường dữ liệu, địa chỉ và điều khiển."],
          ["I2C không cần SCL/SDA.", "I2C dùng hai đường SCL và SDA với pull-up."],
          ["SPI không cần chọn slave khi nhiều slave dạng sao.", "Mỗi slave thường cần SS/CS riêng."]
        ]),
        f("bảo vệ phần cứng I/O", "Slide 86", "Vì sao bảo vệ I/O và bus là vấn đề quan trọng?", "Chân IC dễ hỏng bởi quá áp, quá dòng, nhiễu xung, sai mức logic; bảo vệ thường kết hợp lọc, hạn dòng, TVS, diode kẹp và cách ly.", "Slide 86 nêu tốc độ, mức điện áp, dòng sink/source, giảm nhiễu và bảo vệ quá áp.", [
          ["Chân I/O luôn chịu được mọi kV và mọi dòng tải.", "Chân MCU có giới hạn điện áp/dòng rất nhỏ so với môi trường ngoài."],
          ["Chỉ cần một tụ là bảo vệ được mọi loại lỗi.", "Thực tế thường cần nhiều lớp bảo vệ tùy đường nhiễu và năng lượng xung."],
          ["Optocoupler không có tác dụng cách ly.", "Optocoupler truyền tín hiệu bằng ánh sáng để cách ly điện."]
        ])
      ]
    },
    {
      id: "phan-mem-nhung",
      title: "Phần mềm nhúng",
      subtitle: "Firmware, chuỗi dịch, tối ưu mã, driver, OS, task/thread và middleware.",
      sourceRange: "Slide 90-118",
      facts: [
        f("firmware", "Slide 91", "Firmware trong hệ thống nhúng là gì?", "Phần mềm nhúng được lưu trong bộ nhớ và chạy trên system core để điều phối cảm biến, xử lý, actuator, truyền thông và IC hỗ trợ.", "Slide 91 đặt Embedded Firmware trong cấu trúc hệ nhúng và chỉ vào vùng memory/core.", [
          ["Một loại vỏ hộp cơ khí của sản phẩm.", "Firmware là phần mềm, không phải cơ khí."],
          ["Một chuẩn điện áp RS-232.", "Firmware không phải chuẩn truyền thông điện."],
          ["Phần mềm hoàn toàn không phụ thuộc phần cứng.", "Trong hệ nhúng, firmware gắn chặt với phần cứng cụ thể."]
        ]),
        f("mã nguồn và mã máy", "Slide 92", "Quan hệ đúng giữa mã nguồn, assembly và mã máy là gì?", "Người lập trình viết C/C++ hoặc assembly; compiler/assembler chuyển thành mã máy nhị phân/hex để bộ xử lý thực thi.", "Slide 92 minh họa mã C, assembly ARM, mã hex/binary và nạp chạy trên microprocessor.", [
          ["CPU trực tiếp hiểu mọi câu lệnh C như văn bản.", "CPU thực thi mã máy, không đọc C trực tiếp."],
          ["Assembly không liên quan quá trình dịch.", "Assembly có thể là kết quả compiler và được assembler chuyển thành object/mã máy."],
          ["Mã máy chỉ dùng để in tài liệu.", "Mã máy là dạng CPU thực thi."]
        ]),
        f("chuỗi dịch", "Slide 93", "Thứ tự khái quát trong chuỗi dịch từ source code đến executable là gì?", "Pre-processor, compiler, assembler, linker/loader, kèm header files, object files và library files.", "Slide 93 vẽ luồng Source Code -> Pre-processor -> Compiler -> Assembler -> Linker/Loader -> Executable File.", [
          ["Linker luôn chạy trước preprocessor.", "Slide đặt linker/loader ở cuối chuỗi."],
          ["Header files chỉ dùng sau khi executable đã chạy.", "Header được preprocessor xử lý trong giai đoạn đầu."],
          ["Object files là file ảnh giao diện.", "Object files là kết quả trung gian sau assembler trước liên kết."]
        ]),
        f("preprocessor", "Slide 94", "Preprocessor trong C làm nhiệm vụ nào?", "Tiền xử lý mã nguồn như include header, thay macro, chọn đoạn mã theo điều kiện trước khi compiler dịch.", "Slide 94 liệt kê #include, #define, #define MACRO(), #ifdef, #if.", [
          ["Tối ưu layout PCB.", "Preprocessor làm việc trên mã nguồn."],
          ["Chỉ nạp firmware vào Flash.", "Loader/nạp firmware thuộc giai đoạn khác."],
          ["Thực thi chương trình trên CPU đích.", "Preprocessor chạy trong quá trình build, không phải runtime trên CPU đích."]
        ]),
        f("biên dịch có điều kiện", "Slide 95", "Trong firmware, #ifdef/#ifndef thường dùng để làm gì?", "Bật/tắt driver, chọn chân, chip, board, peripheral hoặc chế độ debug/release theo cấu hình build.", "Slide 95 mô tả tiền xử lý có điều kiện và ứng dụng trong mã nhúng.", [
          ["Để thay đổi vật lý chân chip sau khi hàn.", "Preprocessor chỉ chọn mã nguồn, không thay đổi phần cứng đã hàn."],
          ["Để mọi nhánh mã luôn cùng được biên dịch.", "Biên dịch có điều kiện chọn nhánh phù hợp."],
          ["Để đo điện áp analog trực tiếp.", "Đó là việc của ADC/mạch đo, không phải preprocessor."]
        ]),
        f("compiler và tối ưu", "Slide 97", "Compiler optimization có ý nghĩa gì trong hệ nhúng?", "Có thể tạo mã nhanh hơn hoặc nhỏ hơn, ảnh hưởng tốc độ, bộ nhớ và năng lượng nhưng cần kiểm tra đúng chức năng.", "Slide 97 và 101 nhấn mạnh tối ưu mã nguồn trong phần mềm nhúng.", [
          ["Tối ưu luôn không bao giờ thay đổi hành vi quan sát được ở hệ nhúng.", "Với volatile, I/O, ngắt, tối ưu sai giả định có thể gây lỗi."],
          ["Tối ưu chỉ liên quan font chữ trong IDE.", "Tối ưu là biến đổi mã để cải thiện hiệu năng/kích thước."],
          ["Tối ưu không liên quan bộ nhớ chương trình.", "Mã nhỏ hơn giúp tiết kiệm Flash/ROM."]
        ]),
        f("assembler listing", "Slide 98", "Assembler listing sau biên dịch giúp ích gì?", "Giúp xem mã C được chuyển thành các lệnh assembly nào, hỗ trợ phân tích tối ưu và debug mức thấp.", "Slide 98 minh họa mã nguồn C và assembler listing sau biên dịch.", [
          ["Chỉ để trang trí tài liệu nguồn.", "Assembler listing liên quan mã máy/assembly."],
          ["Không thể dùng để hiểu compiler tạo code gì.", "Mục đích chính là quan sát kết quả dịch mức thấp."],
          ["Là file thư viện hình ảnh.", "Nó là dạng liệt kê mã assembly."]
        ]),
        f("linker và loader", "Slide 99-100", "Linker/loader trong hệ nhúng có vai trò nào?", "Linker gom object file và thư viện thành file cuối; loader hoặc công cụ nạp đưa chương trình vào bộ nhớ thực thi/Flash.", "Slide 99-100 mô tả assembler, linker/loader và nạp firmware.", [
          ["Linker dùng để tạo tín hiệu PWM trực tiếp.", "PWM là chức năng phần cứng/timer, không phải linker."],
          ["Loader luôn là cảm biến nhiệt độ.", "Loader là công cụ/giai đoạn nạp hoặc đưa chương trình vào bộ nhớ."],
          ["Library files không thể tham gia liên kết.", "Slide nêu linker/loader dùng library files."]
        ]),
        f("tối ưu mã nguồn", "Slide 101", "Mục tiêu của tối ưu mã nguồn trong firmware là gì?", "Giảm thời gian chạy, giảm dung lượng mã hoặc giảm năng lượng trong khi vẫn giữ đúng chức năng.", "Slide 101 giới thiệu tối ưu mã nguồn trong phần mềm nhúng.", [
          ["Làm mã dài hơn vô hạn để chạy nhanh hơn.", "Tối ưu thường tìm cân bằng tốc độ/kích thước."],
          ["Bỏ qua kiểm chứng vì tối ưu luôn đúng.", "Tối ưu cần kiểm thử để bảo đảm không đổi chức năng mong muốn."],
          ["Chỉ có tác dụng trong phần mềm máy tính để bàn, không có trong nhúng.", "Slide đặt tối ưu trong ngữ cảnh nhúng."]
        ]),
        f("dead code", "Slide 102", "Loại bỏ dead code là gì?", "Xóa hoặc không sinh mã cho đoạn lệnh không bao giờ được thực thi hoặc không ảnh hưởng kết quả.", "Loại bỏ dead code giúp giảm mã thừa và tránh giữ lại logic không còn tác dụng.", [
          ["Xóa mọi driver đang dùng.", "Dead code là mã không dùng/không ảnh hưởng, không phải mã cần thiết."],
          ["Thêm vòng lặp vô hạn không cần thiết.", "Điều đó tăng mã/thời gian, ngược mục tiêu tối ưu."],
          ["Luôn xóa cả mã xử lý ngắt vì ít chạy.", "Mã ít chạy vẫn không phải dead code nếu cần trong tình huống ngắt."]
        ]),
        f("loại bỏ subexpression", "Slide 103", "Tối ưu subexpression trong ví dụ a + b nhằm mục tiêu gì?", "Tránh tính lại cùng biểu thức nhiều lần bằng cách lưu kết quả trung gian nếu các biến không đổi.", "Slide 103 minh họa tính x = a + b rồi dùng lại cho y = x + c.", [
          ["Tính cùng biểu thức càng nhiều lần càng tiết kiệm năng lượng.", "Tính lặp vô ích làm tăng thời gian/năng lượng."],
          ["Có thể dùng lại kết quả dù a hoặc b đã thay đổi.", "Nếu toán hạng thay đổi, dùng lại kết quả cũ sẽ sai."],
          ["Subexpression là linh kiện điện tử.", "Đây là khái niệm tối ưu biểu thức trong mã."]
        ]),
        f("loop optimization", "Slide 104", "Đưa phép gán không phụ thuộc vòng lặp ra ngoài vòng lặp có lợi gì?", "Giảm số lần thực hiện lệnh, ví dụ từ 100 lần xuống 1 lần nếu không đổi logic.", "Slide 104 minh họa a = 10 được đưa ra trước vòng for.", [
          ["Luôn được phép với mọi thanh ghi ngoại vi volatile.", "Trong nhúng phải cẩn thận với volatile, I/O, ngắt và phần cứng."],
          ["Làm tăng số lần thực thi lệnh cố định.", "Mục tiêu là giảm số lần thực thi."],
          ["Chỉ thay đổi giao diện, không liên quan CPU.", "Nó ảnh hưởng lệnh CPU thực hiện."]
        ]),
        f("device driver", "Slide 105", "Device driver trong hệ nhúng là gì?", "Mã nguồn trực tiếp giao tiếp, khởi tạo và quản lý phần cứng nhúng cho các lớp phần mềm cao hơn.", "Slide 105 gọi driver là phần cơ bản nhất và không thể thiếu trong phần mềm nhúng.", [
          ["Một thiết bị cơ khí để xoay vít.", "Trong ngữ cảnh này driver là phần mềm điều khiển phần cứng."],
          ["Một lớp ứng dụng web không chạm phần cứng.", "Driver nằm gần hardware hơn ứng dụng."],
          ["Một tiêu chuẩn truyền thông vật lý như RS-485.", "Driver là mã điều khiển thiết bị, không phải chuẩn truyền thông."]
        ]),
        f("architecture-specific driver", "Slide 106", "Architecture-specific driver điều khiển loại phần cứng nào?", "Phần cứng tích hợp trong bộ xử lý như timer, interrupt controller, GPIO nội, UART/SPI/I2C tích hợp.", "Slide 106 phân loại architecture-specific driver là phụ thuộc kiến trúc.", [
          ["Luôn điều khiển mọi thiết bị ngoài theo cách độc lập chip.", "Đó gần hơn với generic driver."],
          ["Chỉ điều khiển màu nền app.", "Driver này điều khiển phần cứng tích hợp."],
          ["Không phụ thuộc kiến trúc xử lý.", "Tên gọi đã nhấn mạnh phụ thuộc kiến trúc."]
        ]),
        f("generic driver", "Slide 106", "Generic driver trong slide được hiểu như thế nào?", "Driver điều khiển phần cứng trên bo mạch, có thể giống nhau một phần ở nhiều mạch khác nhau, ví dụ I2C, Ethernet, hiển thị.", "Slide 106 đối chiếu generic driver với architecture-specific driver.", [
          ["Chỉ dành cho thanh ghi CPU nội bộ.", "Đó là architecture-specific driver."],
          ["Luôn không cần giao tiếp phần cứng.", "Generic driver vẫn điều khiển phần cứng."],
          ["Không thể tái sử dụng chút nào giữa các board.", "Slide nêu có thể giống nhau một phần hoặc nhiều phần ở nhiều mạch."]
        ]),
        f("vòng đời phần cứng", "Slide 106-107", "Driver không chỉ đọc/ghi dữ liệu vì còn phải quản lý gì?", "Quản lý vòng đời thiết bị như install, startup, enable, acquire/release, shutdown, disable và uninstall.", "Slide 106-107 liệt kê trạng thái phần cứng và chức năng chính của driver.", [
          ["Driver chỉ là một hàm printf.", "Driver có nhiều nhiệm vụ quản lý phần cứng."],
          ["Driver không liên quan khởi tạo thiết bị.", "Hardware startup là chức năng chính."],
          ["Driver không cần kiểm soát truy cập tài nguyên chung.", "Acquire/release quan trọng khi nhiều task cùng dùng tài nguyên."]
        ]),
        f("hệ điều hành nhúng", "Slide 108", "Mục đích của hệ điều hành nhúng là gì?", "Cung cấp dịch vụ nền, lớp trừu tượng, quản lý tài nguyên và giúp phát triển middleware/ứng dụng dễ hơn.", "Slide 108 định nghĩa OS nhúng là hệ thống thư viện phần mềm cung cấp dịch vụ nền.", [
          ["Thay thế toàn bộ phần cứng nên không cần driver.", "OS thường làm việc trực tiếp hoặc qua driver với phần cứng."],
          ["Chỉ là một hình nền đồ họa.", "OS cung cấp dịch vụ hệ thống."],
          ["Luôn không cần trong bất kỳ hệ nhúng nào.", "OS có thể tùy chọn tùy độ phức tạp hệ thống."]
        ]),
        f("BSP", "Slide 108", "Board Support Package (BSP) nằm trong quan hệ nào?", "BSP thường nằm giữa OS và driver/phần cứng để hỗ trợ một bo mạch cụ thể.", "Slide 108 vẽ BSP dưới OS và trên Device Drivers trong một mô hình.", [
          ["BSP là thuật toán mã hóa dữ liệu người dùng.", "BSP là gói hỗ trợ bo mạch."],
          ["BSP luôn nằm trên ứng dụng cuối cùng.", "Về vai trò kiến trúc, BSP nằm thấp hơn OS và gần hardware."],
          ["BSP không liên quan board cụ thể.", "Tên và vai trò của BSP gắn với bo mạch cụ thể."]
        ]),
        f("kernel", "Slide 109", "Kernel trong hệ điều hành nhúng quản lý các nhóm tài nguyên nào?", "Quản lý process/task, bộ nhớ và I/O thông qua driver hoặc lớp I/O.", "Slide 109 liệt kê process management, memory management và I/O management.", [
          ["Chỉ quản lý màu sắc nút bấm.", "Kernel quản lý tài nguyên hệ thống."],
          ["Không liên quan process/task.", "Process management là nhiệm vụ chính."],
          ["Không liên quan bộ nhớ.", "Memory management là nhiệm vụ chính."]
        ]),
        f("monolithic OS", "Slide 109-110", "Đặc điểm của monolithic OS là gì?", "Nhiều dịch vụ và driver nằm chung trong kernel, đường đi xử lý ngắn nhưng lõi lớn và lỗi driver có thể ảnh hưởng toàn hệ thống.", "Slide 109-110 mô tả monolithic kernel gồm file I/O, memory, process, I/O drivers, memory drivers, interrupt drivers.", [
          ["Kernel chỉ giữ memory và process, mọi driver tách ngoài.", "Đó gần hơn với microkernel."],
          ["Không có driver nào trong kernel.", "Slide monolithic có I/O drivers, memory drivers, interrupt drivers trong kernel."],
          ["Không có nhược điểm về lõi lớn.", "Slide nêu nhược điểm là lõi lớn và lỗi có thể ảnh hưởng toàn hệ thống."]
        ]),
        f("layered OS", "Slide 111", "Mô hình layered OS tổ chức hệ điều hành như thế nào?", "Chia thành các lớp, lớp trên dùng dịch vụ lớp dưới, giúp rõ trách nhiệm nhưng có thể tạo overhead nếu đi qua nhiều lớp.", "Slide 111 minh họa 6 lớp từ processor allocation đến operator.", [
          ["Tất cả chức năng trộn vào một khối không phân tầng.", "Đó không phải layered."],
          ["Lớp trên không bao giờ phụ thuộc lớp dưới.", "Layered dựa trên dịch vụ của lớp dưới."],
          ["Layered chỉ là tên một loại ADC.", "Đây là mô hình hệ điều hành."]
        ]),
        f("microkernel", "Slide 112", "Microkernel/client-server OS có xu hướng thiết kế nào?", "Giữ kernel tối thiểu, thường giữ quản lý memory/process và tách driver/dịch vụ ra ngoài lõi.", "Slide 112 vẽ Microkernel với Memory Management, Process Management và Device Drivers tách ngoài.", [
          ["Nhét toàn bộ driver và middleware vào kernel lớn.", "Đó gần monolithic hơn."],
          ["Không có khái niệm driver.", "Driver vẫn có, nhưng thường được tách khỏi lõi microkernel."],
          ["Chỉ dùng để điều khiển LED 7 đoạn.", "Đây là mô hình OS tổng quát."]
        ]),
        f("process/task/thread", "Slide 113-115", "Phân biệt task/process và thread đúng nhất là gì?", "Task/process đóng gói ngữ cảnh thực thi riêng; thread là luồng nhỏ trong task, có register riêng nhưng chia sẻ tài nguyên/bộ nhớ của task.", "Slide 113-115 mô tả task có stack/register riêng, thread trong cùng task chia sẻ memory.", [
          ["Thread trong cùng task luôn có bộ nhớ hoàn toàn riêng như process độc lập.", "Slide nêu thread chia sẻ tài nguyên của task."],
          ["Task không có trạng thái thực thi hay stack.", "Task/process gồm mã, trạng thái, register, stack, vùng nhớ."],
          ["Multitasking nghĩa là chỉ có một tác vụ duy nhất trong mọi thời điểm và hệ thống.", "Đó là unitasking; multitasking có nhiều task cùng tồn tại/lập lịch."]
        ]),
        f("middleware", "Slide 116", "Middleware trong hệ nhúng là gì?", "Phần mềm hệ thống không phải kernel, driver hay ứng dụng; làm trung gian giữa ứng dụng với OS/driver hoặc giữa các ứng dụng.", "Middleware cung cấp dịch vụ trung gian như giao tiếp, lưu trữ, giao thức hoặc framework để ứng dụng không phải làm việc trực tiếp với mọi chi tiết thấp.", [
          ["Chính là kernel ở mức thấp nhất.", "Middleware không phải nhân hệ điều hành."],
          ["Chính là device driver.", "Middleware không phải driver."],
          ["Chính là phần cứng nguồn.", "Middleware là phần mềm hệ thống."]
        ]),
        f("phần mềm ứng dụng", "Slide 117", "Phần mềm ứng dụng trong hệ nhúng có đặc điểm nào?", "Định nghĩa chức năng/mục đích sản phẩm, tương tác nhiều với người dùng và chạy trên lớp phần mềm hệ thống.", "Slide 117 đặt Application Software Layer ở trên System Software và Hardware.", [
          ["Ứng dụng luôn tự quản lý trực tiếp mọi thanh ghi phần cứng, không qua lớp nào.", "Ứng dụng thường dựa vào system software, OS, middleware và driver."],
          ["Ứng dụng không liên quan mục đích sản phẩm.", "Slide nêu ứng dụng định nghĩa chức năng và mục đích hệ thống."],
          ["Ứng dụng nằm dưới hardware layer.", "Ứng dụng nằm trên cùng trong mô hình lớp."]
        ])
      ]
    },
    {
      id: "iot",
      title: "Internet of Things",
      subtitle: "Định nghĩa, lợi ích, thiết bị, gateway, kết nối, platform, cloud và xu thế.",
      sourceRange: "Slide 119-147",
      facts: [
        f("lịch sử IoT", "Slide 122", "Ai thường được ghi nhận là người dùng cụm từ Internet of Things vào năm 1999?", "Kevin Ashton.", "Kevin Ashton thường được gắn với mốc sử dụng cụm từ Internet of Things trong bối cảnh nhận dạng/kết nối đối tượng vật lý.", [
          ["Alan Turing vào năm 1950.", "Turing quan trọng trong lịch sử máy tính, nhưng không phải mốc IoT 1999 này."],
          ["Elon Musk vào năm 2015.", "2015 trong timeline liên quan Tesla Auto Pilot, không phải đặt thuật ngữ IoT."],
          ["Tim Berners-Lee vào năm 1989.", "Slide không gắn thuật ngữ IoT với mốc này."]
        ]),
        f("định nghĩa IoT", "Slide 123", "Định nghĩa IoT nhấn mạnh điều gì?", "Mạng lưới các đối tượng vật lý được trang bị cảm biến, phần cứng/phần mềm xử lý và kết nối để trao đổi dữ liệu qua Internet.", "IoT gắn đối tượng vật lý với cảm biến, xử lý và kết nối dữ liệu, không chỉ là một phần mềm độc lập.", [
          ["Chỉ là một phần mềm văn phòng chạy offline.", "IoT gắn với đối tượng vật lý và kết nối dữ liệu."],
          ["Chỉ là mạng máy tính giữa các laptop đa năng.", "IoT mở rộng tới các vật thể/thiết bị vật lý."],
          ["Không cần cảm biến, xử lý hay kết nối.", "Các thành phần này được nêu trong định nghĩa slide."]
        ]),
        f("IoT không chỉ là cảm biến", "Slide 123", "Một hệ HVAC IoT đầy đủ thường gồm những thành phần nào ngoài cảm biến đơn lẻ?", "Một hệ IoT có dashboard, gateway, server, cảm biến, actuator, điều khiển và có thể dùng nguồn dữ liệu ngoài như dự báo thời tiết.", "Hệ IoT thực tế thường có nhiều lớp: thu thập dữ liệu, truyền qua gateway, xử lý/lưu trữ, hiển thị và điều khiển cơ cấu chấp hành.", [
          ["IoT chỉ là một cảm biến đơn lẻ không có xử lý dữ liệu.", "Ví dụ HVAC có nhiều khối phối hợp."],
          ["IoT không bao giờ có actuator.", "Slide có Actuators Network và sprinkler."],
          ["IoT không thể dùng dữ liệu bên ngoài.", "Ví dụ dùng weather forecast provider qua API."]
        ]),
        f("IoE, M2M và IoT", "Slide 123", "Điểm nào đúng khi phân biệt IoT với M2M/IoE?", "IoT tập trung vào các đối tượng vật lý được liên kết qua mạng; M2M là giao tiếp giữa thiết bị cùng loại; IoE mở rộng tới people, process, data và things.", "Ba khái niệm này khác nhau về phạm vi: M2M hẹp hơn, IoT tập trung vào things, IoE mở rộng sang cả people/process/data.", [
          ["M2M và IoT luôn đồng nghĩa tuyệt đối trong mọi phạm vi.", "Chúng có phần giao nhau nhưng không đồng nghĩa tuyệt đối."],
          ["IoE hẹp hơn IoT và chỉ gồm cảm biến.", "IoE mở rộng people, process, data và things."],
          ["Web of Things không liên quan kiến trúc/phong cách phần mềm.", "Slide mô tả Web of Things theo kiến trúc/mẫu lập trình cho vật thể đời thực trên web."]
        ]),
        f("lợi ích IoT", "Slide 124", "Các lợi ích của IoT thường trải trên những nhóm nào?", "Hiệu quả, an toàn, xã hội, môi trường, cải tiến, kinh doanh thông minh, tuân thủ, lợi nhuận và năng suất.", "IoT có thể tạo lợi ích kỹ thuật, vận hành, kinh doanh, xã hội và môi trường chứ không chỉ một mặt.", [
          ["Chỉ có một lợi ích duy nhất là tăng màu sắc giao diện.", "IoT có nhiều lợi ích kỹ thuật, kinh doanh, xã hội và môi trường."],
          ["IoT luôn làm con người tiếp xúc nhiều hơn với môi trường độc hại.", "Slide nêu lợi ích an toàn là giảm tiếp xúc với môi trường độc hại."],
          ["IoT không liên quan phân tích dữ liệu kinh doanh.", "Slide nêu kinh doanh thông minh hơn nhờ phân tích dữ liệu."]
        ]),
        f("ứng dụng IoT 2020", "Slide 125", "Trong thống kê Top 10 IoT Application areas 2020, nhóm nào đứng đầu?", "Manufacturing / Industrial với khoảng 22% dự án Enterprise IoT.", "Manufacturing/Industrial là nhóm nổi bật nhất trong thống kê này, phản ánh vai trò lớn của IoT trong công nghiệp.", [
          ["Buildings với 80%.", "Buildings không đứng đầu trong thống kê này."],
          ["Agriculture với 60%.", "Agriculture khoảng 4%."],
          ["Other với 90%.", "Other khoảng 3%."]
        ]),
        f("IoT không chỉ smart home", "Slide 125-126", "Bài học quan trọng từ các nhóm ứng dụng IoT là gì?", "IoT xuất hiện mạnh trong công nghiệp, vận tải, năng lượng, bán lẻ, đô thị, y tế, chuỗi cung ứng, nông nghiệp và môi trường, không chỉ smart home.", "Slide 125-126 liệt kê nhiều lĩnh vực ứng dụng IoT.", [
          ["IoT chỉ có bóng đèn thông minh trong gia đình.", "Slide nêu nhiều lĩnh vực doanh nghiệp và hạ tầng."],
          ["IoT không dùng trong công nghiệp.", "Manufacturing/Industrial là nhóm ứng dụng rất quan trọng của IoT."],
          ["IoT không liên quan năng lượng hay giao thông.", "Slide có Energy và Transportation/Mobility."]
        ]),
        f("bốn thành phần IoT", "Slide 128", "Một hệ thống IoT gồm 4 thành phần cơ bản nào?", "Thiết bị/cảm biến, kết nối, nền tảng xử lý dữ liệu và giao diện người dùng.", "Slide 128 nêu rõ bốn thành phần và luồng thu thập -> truyền -> xử lý -> hiển thị/ra quyết định.", [
          ["Chỉ có màn hình người dùng.", "Giao diện chỉ là một trong bốn thành phần."],
          ["Chỉ có cảm biến và không có kết nối.", "Kết nối là thành phần vô cùng quan trọng."],
          ["Chỉ có cloud mà không có thiết bị biên.", "Thiết bị/cảm biến là nơi thu thập dữ liệu."]
        ]),
        f("sensor và actuator", "Slide 129", "Cặp sensor - actuator trong IoT có vai trò thế nào?", "Sensor chuyển thay đổi vật lý thành tín hiệu điện; actuator chuyển lệnh điều khiển thành hành động/chuyển động vật lý.", "Slide 129 nêu cảm biến phát hiện môi trường và cơ cấu chấp hành thực hiện tác động vật lý.", [
          ["Sensor luôn là phần tử tạo chuyển động cơ khí.", "Đó là vai trò actuator."],
          ["Actuator chỉ đo nhiệt độ và không tác động ra môi trường.", "Đo nhiệt độ là vai trò sensor."],
          ["Hai khối không liên quan điều khiển vòng kín.", "Ví dụ sprinkler cho thấy sensor, control center và actuator phối hợp."]
        ]),
        f("IoT gateway", "Slide 130", "IoT gateway có vai trò chính nào?", "Làm trung gian giữa thiết bị IoT và hệ xử lý, hỗ trợ nhiều giao thức, lọc/xử lý dữ liệu, giảm độ trễ, tăng bảo mật và kéo dài pin thiết bị.", "Slide 130 liệt kê các lợi ích của gateway.", [
          ["Gateway luôn loại bỏ hoàn toàn nhu cầu bảo mật.", "Gateway có thể tăng bảo mật nhưng không thay thế toàn bộ bảo mật hệ thống."],
          ["Gateway chỉ là dây nguồn thụ động.", "Gateway là thiết bị trung gian có xử lý/giao thức."],
          ["Gateway chỉ làm tăng độ trễ và không xử lý dữ liệu.", "Slide nêu gateway có thể lọc/xử lý cục bộ và giảm độ trễ."]
        ]),
        f("chọn thiết bị IoT", "Slide 131", "Khi chọn thiết bị IoT, chỉ nhìn giá có đủ không?", "Không; cần xét độ chính xác thu thập, xử lý/lưu trữ, pin, OTA, ổn định, chuẩn kết nối, khả năng thay thế, thời gian sản xuất và pháp lý.", "Slide 131 nhấn mạnh nhiều tiêu chí chọn thiết bị IoT.", [
          ["Chỉ cần chọn thiết bị rẻ nhất, bỏ qua pin và OTA.", "Pin và OTA là tiêu chí quan trọng."],
          ["Không cần quan tâm hợp quy/hợp chuẩn khi vận chuyển.", "Slide nêu cần chú ý quy định cơ quan quản lý."],
          ["Thiết bị IoT không cần ổn định vì thay rất dễ.", "Slide nêu thay thiết bị có thể phức tạp, ví dụ đồng hồ điện/nước."]
        ]),
        f("đánh đổi kết nối IoT", "Slide 132", "Ba đặc tính kết nối IoT luôn phải đánh đổi là gì?", "Phạm vi kết nối, băng thông và điện năng tiêu thụ.", "Slide 132 nêu không có kết nối tốt nhất cho mọi bài toán, phải cân theo range, bandwidth, power.", [
          ["Màu anten, kích thước logo và font chữ.", "Đó không phải đặc tính kết nối trong slide."],
          ["Chỉ có băng thông, không cần năng lượng.", "Điện năng là yếu tố lớn với thiết bị pin."],
          ["Chỉ có phạm vi, không cần tốc độ dữ liệu.", "Băng thông cũng là tiêu chí quyết định."]
        ]),
        f("nhóm kết nối IoT", "Slide 132", "Nhóm LPWA có đặc điểm gì?", "Phạm vi rộng, băng thông thấp và điện năng tiêu thụ thấp; ví dụ LoRa, Sigfox, NB-IoT, LTE-M.", "LPWA phù hợp khi thiết bị cần truyền ít dữ liệu, đi xa và tiết kiệm pin.", [
          ["Phạm vi hẹp, băng thông cực lớn, tiêu thụ cao như video nội bộ.", "Đó không phải mô tả LPWA."],
          ["Chỉ gồm Wi-Fi và Bluetooth.", "Wi-Fi/Bluetooth thuộc nhóm kết nối tầm ngắn hơn, không phải LPWA điển hình."],
          ["Chỉ gồm 5G và vệ tinh băng thông lớn.", "5G/vệ tinh nằm ở nhóm phạm vi rộng, băng thông lớn, tiêu thụ cao hơn."]
        ]),
        f("LPWA", "Slide 133", "LPWA phù hợp với kiểu thiết bị IoT nào?", "Thiết bị gửi ít dữ liệu, cần phạm vi vài km, băng thông khoảng 20-350 kbps, tiêu thụ thấp và pin có thể tới 10 năm.", "LPWA phù hợp với các bài toán như công tơ thông minh, nông nghiệp, theo dõi tài sản và đô thị thông minh, nơi dữ liệu nhỏ nhưng cần đi xa và tiết kiệm pin.", [
          ["Thiết bị cần stream video 4K liên tục.", "LPWA băng thông thấp, không phù hợp video lớn."],
          ["Thiết bị luôn cắm điện và cần băng thông Wi-Fi cao.", "LPWA nhắm tới low power, dữ liệu nhỏ."],
          ["Thiết bị không cần phạm vi xa.", "LPWA nổi bật ở phạm vi rộng."]
        ]),
        f("NB-IoT, LoRaWAN, Sigfox", "Slide 134", "Điểm nào đúng khi so sánh NB-IoT, LoRaWAN và Sigfox?", "NB-IoT dựa trên hệ sinh thái cellular/licensed; Sigfox giới hạn số lượng và kích thước bản tin mạnh hơn; cả ba thuộc nhóm LPWA.", "Ba công nghệ này đều phục vụ truyền xa, dữ liệu nhỏ và tiết kiệm năng lượng, nhưng khác nhau về hạ tầng mạng, băng tần và giới hạn bản tin.", [
          ["Sigfox luôn cho gửi dữ liệu không giới hạn kích thước và số lượng.", "Sigfox thường bị giới hạn mạnh hơn về số lượng và kích thước bản tin."],
          ["NB-IoT không liên quan cellular.", "NB-IoT thuộc hệ sinh thái LTE/cellular."],
          ["LoRaWAN là Wi-Fi 11ax.", "LoRaWAN là LPWA, không phải Wi-Fi."]
        ]),
        f("cellular IoT", "Slide 135", "Cellular IoT phù hợp khi nào?", "Khi cần hạ tầng diện rộng, quản lý bởi nhà mạng và triển khai số lượng lớn; 2G/3G dần được thay bằng NB-IoT, LTE-Cat 1/4, 5G.", "Slide 135 nói về số lượng kết nối cellular IoT và xu hướng module giảm giá.", [
          ["Khi chỉ cần nối hai chip cách nhau vài cm trên cùng PCB.", "Đó là bài toán intra-board như I2C/SPI hơn là cellular."],
          ["Khi không có nhà mạng hoặc hạ tầng diện rộng nào.", "Cellular dựa vào hạ tầng mạng di động."],
          ["Khi mọi thiết bị phải truyền bằng dây song song.", "Cellular là kết nối không dây diện rộng."]
        ]),
        f("5G trong IoT", "Slide 136", "5G thúc đẩy IoT nhờ các khả năng nào?", "Tốc độ rất cao, độ trễ rất thấp và mật độ kết nối rất lớn.", "Slide 136 nêu 5G tạo dịch vụ mới trong công nghiệp, giao thông, y tế, đô thị thông minh.", [
          ["Chỉ vì 5G làm thiết bị không cần nguồn.", "Slide không nêu 5G loại bỏ nhu cầu nguồn."],
          ["Vì 5G chỉ dùng cho điện thoại nghe gọi.", "Slide nêu nhiều ứng dụng IoT ngoài điện thoại."],
          ["Vì 5G luôn có độ trễ cao hơn mọi công nghệ cũ.", "Slide nhấn mạnh độ trễ siêu thấp."]
        ]),
        f("kết nối vệ tinh", "Slide 137", "Kết nối vệ tinh trong IoT có vai trò gì?", "Mở rộng kết nối tới vùng không có hạ tầng mặt đất, hỗ trợ thiết bị di chuyển toàn cầu và làm backhaul cho hệ IoT khác.", "Slide 137 nêu HTS, LEO/MEO, direct/indirect-to-satellite và satellite backhaul.", [
          ["Chỉ dùng trong phạm vi vài cm trên board.", "Vệ tinh là kết nối diện rộng/toàn cầu."],
          ["Không thể hỗ trợ backhaul.", "Slide nêu vệ tinh cung cấp đường truyền backhaul."],
          ["Luôn cần dây đồng trực tiếp từ cảm biến tới vệ tinh.", "Slide có direct và indirect qua gateway, không phải dây đồng."]
        ]),
        f("Wi-Fi trong IoT", "Slide 138", "Wi-Fi phù hợp với ứng dụng IoT nào?", "Ứng dụng cần băng thông lớn trong phạm vi cục bộ, ví dụ camera, thiết bị gia đình, gateway hoặc thiết bị có nguồn ổn định.", "Slide 138 nêu Wi-Fi phổ biến, 11ax cải thiện mật độ, tốc độ, tương thích và hiệu quả điện.", [
          ["Thiết bị pin gửi vài byte mỗi ngày ở vùng xa không có Wi-Fi.", "LPWA/cellular có thể phù hợp hơn."],
          ["Thiết bị không cần băng thông nhưng cần phạm vi hàng chục km.", "Wi-Fi là kết nối cục bộ hơn."],
          ["Không bao giờ dùng được cho IoT.", "Slide trình bày Wi-Fi như công nghệ kết nối IoT phổ biến."]
        ]),
        f("Bluetooth/BLE", "Slide 139", "Bluetooth/BLE trong IoT phù hợp nhất với kiểu kết nối nào?", "Phạm vi hẹp, băng thông thấp, tiêu thụ thấp cho thiết bị cá nhân, wearable, cảm biến gần người dùng và nhà thông minh.", "Slide 139 nêu Bluetooth phổ biến trên thiết bị cá nhân và Bluetooth 5.0/BLE với data rate/range cải thiện.", [
          ["Kết nối vệ tinh xuyên đại dương.", "Bluetooth là phạm vi ngắn."],
          ["Backbone mạng lõi nhà mạng 5G.", "Bluetooth không phải mạng lõi diện rộng."],
          ["Truyền video công nghiệp băng thông cực lớn qua nhiều km.", "Bluetooth/BLE không phù hợp kiểu yêu cầu này."]
        ]),
        f("IoT platform", "Slide 140", "IoT platform được ví như gì và làm gì?", "Được ví như bộ não của hệ IoT, hỗ trợ quản lý thiết bị/kết nối, giao tiếp dữ liệu, phân tích dữ liệu, bảo mật và tích hợp dịch vụ.", "Slide 140 định nghĩa platform IoT là phần mềm hỗ trợ kết nối mọi thiết bị trong hệ thống.", [
          ["Chỉ là một cảm biến nhiệt độ.", "Platform là lớp phần mềm/hạ tầng xử lý và quản lý."],
          ["Không liên quan bảo mật hay xác thực.", "Slide nêu platform cung cấp bảo mật và xác thực."],
          ["Chỉ lưu file offline không kết nối thiết bị.", "Platform kết nối phần cứng và ứng dụng khai thác dữ liệu."]
        ]),
        f("các lớp platform", "Slide 141", "Các loại nền tảng trong IoT platform gồm những nhóm nào?", "Connectivity Platforms, Device Management Platforms, IaaS/Cloud Backend, Application Enablement Platforms và Advanced Analytics Platforms.", "Slide 141 phân rã nền tảng IoT thành 5 platform type và các thành phần như OTA, IoT hubs, storage, digital twins, AI/ML.", [
          ["Chỉ có một tầng duy nhất là giao diện màu đỏ.", "Slide nêu nhiều tầng chức năng."],
          ["Device Management không liên quan OTA.", "Slide có OTA firmware updates trong Device management."],
          ["Advanced Analytics chỉ để kéo dây nguồn.", "Advanced analytics dùng streaming analytics, AI/Machine learning."]
        ]),
        f("Edge - Platform - Enterprise", "Slide 142", "Kiến trúc Edge - Platform - Enterprise phân vai như thế nào?", "Edge gần thiết bị vật lý; Platform xác thực, nhận/xử lý/lưu/phân tích dữ liệu; Enterprise biến dữ liệu thành nghiệp vụ, dashboard và workflow.", "Cách chia này giúp tách phần gần thiết bị, phần xử lý nền tảng và phần nghiệp vụ/doanh nghiệp.", [
          ["Edge là nơi duy nhất lưu mọi dữ liệu doanh nghiệp và không có platform.", "Platform và Enterprise có vai trò riêng."],
          ["Enterprise không liên quan dashboard hay workflow.", "Slide có Data Visualization, Line of Business System và Workflow Process(es)."],
          ["Platform chỉ là dây nối thụ động.", "Platform có gateway service, stream processing, data persistence, analytics, policy, orchestration."]
        ]),
        f("cloud trong IoT", "Slide 143", "Ưu điểm và lo ngại khi dùng cloud trong IoT là gì?", "Cloud giúp giảm chi phí hạ tầng, trả theo nhu cầu, mở rộng và xử lý dữ liệu lớn; lo ngại gồm quyền sở hữu dữ liệu, sự cố và độ trễ.", "Slide 143 liệt kê ưu điểm và một số lo ngại của cloud.", [
          ["Cloud luôn không có độ trễ và không bao giờ sự cố.", "Slide nêu độ trễ và sự cố là lo ngại."],
          ["Cloud không giúp mở rộng hay xử lý dữ liệu lớn.", "Đó là các ưu điểm được nêu."],
          ["Dùng cloud luôn loại bỏ mọi câu hỏi về sở hữu dữ liệu.", "Quyền sở hữu dữ liệu là một lo ngại."]
        ]),
        f("chọn platform IoT", "Slide 144", "Khi chọn IoT platform cần xét các yếu tố nào?", "Ổn định, mở rộng/linh hoạt, năng lực nhà cung cấp, giá/kinh doanh, bảo mật, time-to-market, phân tích dữ liệu, quyền dữ liệu và cam kết nhà cung cấp.", "Slide 144 liệt kê các yếu tố chọn nền tảng platform IoT.", [
          ["Chỉ chọn theo logo đẹp.", "Chọn platform là quyết định kỹ thuật và kinh doanh."],
          ["Không cần xét quyền sở hữu dữ liệu.", "Slide nêu phân tích dữ liệu và quyền sở hữu dữ liệu."],
          ["Không cần xét bảo mật.", "Bảo mật là một yếu tố trong slide."]
        ]),
        f("xu thế IoT", "Slide 145-146", "Xu thế IoT toàn cầu giai đoạn gần đây là gì?", "Chi tiêu và số kết nối IoT toàn cầu tăng nhanh; APAC nổi bật về tăng trưởng chi tiêu và dự báo hơn 27 tỷ kết nối IoT vào năm 2025.", "Xu thế chung là IoT tiếp tục tăng về số kết nối, chi tiêu và mức độ ứng dụng trong doanh nghiệp.", [
          ["IoT đang biến mất hoàn toàn khỏi thị trường.", "Các chỉ dấu chính cho thấy IoT vẫn tăng trưởng về chi tiêu và kết nối."],
          ["Năm 2025 dự báo chỉ còn 27 thiết bị IoT.", "Slide nêu hơn 27 tỷ kết nối, không phải 27 thiết bị."],
          ["Cellular IoT không đóng vai trò nào trong tăng trưởng.", "Slide 146 nêu cellular IoT là phần quan trọng trong tăng trưởng kết nối."]
        ])
      ]
    },
    {
      id: "giao-tiep-so",
      title: "Một số khái niệm và giao tiếp vào ra số cơ bản",
      subtitle: "Khái niệm truyền thông, đầu vào số, bảo vệ, đầu ra số và driver công suất.",
      sourceRange: "Slide 149-171",
      facts: [
        f("protocol và standard", "Slide 150", "Protocol khác standard truyền thông ở điểm nào?", "Protocol là bộ quy tắc giao tiếp; standard là bộ quy tắc được chính thức hóa để nhiều bên cùng tuân thủ và tương thích.", "Slide 150 phân biệt giao thức có thể do bất kỳ ai xây dựng, còn chuẩn do tổ chức uy tín chính thức hóa.", [
          ["Protocol luôn phải do ISO ban hành mới tồn tại.", "Protocol có thể theo chuẩn hoặc không theo chuẩn."],
          ["Standard không giúp tương thích thiết bị.", "Mục tiêu của standard là đảm bảo tương tác giữa thiết bị các hãng."],
          ["Protocol chỉ nói về màu dây.", "Protocol gồm cú pháp, ngữ nghĩa, đồng bộ, khôi phục lỗi, v.v."]
        ]),
        f("đồng bộ và bất đồng bộ", "Slide 151", "Truyền đồng bộ và bất đồng bộ khác nhau thế nào?", "Đồng bộ dùng clock và truyền theo khung/khối liên tục; bất đồng bộ dùng start/stop bit, truyền từng byte/ký tự và có khoảng nghỉ.", "Slide 151 so sánh synchronous nhanh/đơn giản/đắt với asynchronous chậm/phức tạp hơn/rẻ.", [
          ["Bất đồng bộ luôn truyền kèm clock riêng.", "Bất đồng bộ không truyền clock riêng, dùng start/stop bit."],
          ["Đồng bộ không dùng clock.", "Đồng bộ dùng xung nhịp clock."],
          ["Start bit là đặc trưng của truyền đồng bộ khối liên tục.", "Start/stop bit là đặc trưng bất đồng bộ."]
        ]),
        f("inter-system và intra-system", "Slide 152", "Inter-system và intra-system được phân biệt như thế nào?", "Inter-system là truyền thông giữa các thiết bị; intra-system là truyền thông giữa các linh kiện trên cùng mạch/hệ thống.", "Slide 152 nêu UART/RS-232/RS-422/RS-485/USB là ví dụ inter, SPI/I2C/CAN là ví dụ intra.", [
          ["I2C giữa IC trên cùng board là inter-system điển hình.", "Slide xem I2C giữa linh kiện trên mạch là intra-system."],
          ["RS-232 giữa PC và board là intra-system.", "Đó là giao tiếp giữa thiết bị ngoài và hệ nhúng, thuộc inter-system."],
          ["Hai khái niệm chỉ khác tốc độ bit.", "Khác biệt là phạm vi thiết bị trong/ngoài hệ."]
        ]),
        f("kiểu kết nối", "Slide 153", "Multi-point khác multi-drop ở điểm nào?", "Multi-drop có 1 bên truyền và nhiều bên nhận; multi-point có nhiều bên truyền và nhiều bên nhận trên cùng bus.", "Slide 153 minh họa point-to-point, multi-drop và multi-point bằng driver/receiver.", [
          ["Multi-point chỉ có đúng một receiver và một driver.", "Đó là point-to-point."],
          ["Multi-drop luôn có nhiều driver cùng phát.", "Multi-drop trong slide là một driver, nhiều receiver."],
          ["Multi-point không cần quản lý xung đột bus.", "Nhiều bên có thể truyền nên cần cơ chế quản lý quyền truyền."]
        ]),
        f("single-ended và differential", "Slide 154", "Tín hiệu differential/balanced có đặc điểm gì?", "Dùng hai dây mang tín hiệu ngược pha; bộ thu lấy hiệu hai tín hiệu nên chống nhiễu tốt hơn single-ended.", "Slide 154-155 mô tả differential là balanced line/signal và giảm nhiễu common-mode.", [
          ["Chỉ dùng một dây tín hiệu so với ground.", "Đó là single-ended."],
          ["Hai dây differential mang tín hiệu cùng pha giống hệt nhau.", "Hai tín hiệu giống nhau nhưng ngược pha."],
          ["Differential luôn kém chống nhiễu hơn single-ended trên dây dài.", "Slide nêu differential/balanced chống nhiễu tốt hơn."]
        ]),
        f("balanced wiring", "Slide 155", "Vì sao balanced wiring giảm nhiễu đồng pha?", "Nhiễu tác động gần giống nhau lên hai dây; bộ thu vi sai lấy hiệu nên thành phần nhiễu chung bị triệt bớt.", "Slide 155 minh họa unbalanced output lẫn nhiễu và balanced output sạch hơn.", [
          ["Bộ thu cộng hai nhiễu lại để tăng nhiễu.", "Bộ thu vi sai lấy hiệu tín hiệu."],
          ["Nhiễu chỉ tác động lên một dây trong mọi môi trường.", "Nhiễu common-mode thường tác động gần giống lên cả hai dây."],
          ["Balanced wiring không liên quan RS-485/CAN.", "Đây là cơ sở của nhiều chuẩn vi sai như RS-485, CAN."]
        ]),
        f("communication mode", "Slide 156", "Full-duplex nghĩa là gì?", "Hai bên có thể truyền theo hai chiều đồng thời.", "Slide 156 phân biệt simplex một chiều, half-duplex hai chiều luân phiên và full-duplex hai chiều cùng lúc.", [
          ["Chỉ truyền một chiều vĩnh viễn.", "Đó là simplex."],
          ["Hai chiều nhưng không đồng thời.", "Đó là half-duplex."],
          ["Không có truyền dữ liệu.", "Full-duplex vẫn là chế độ truyền thông."]
        ]),
        f("rate", "Slide 157", "Baud rate khác bit rate ở điểm nào?", "Baud rate là số ký hiệu mỗi giây; bit rate là số bit mỗi giây, một ký hiệu có thể mang một hoặc nhiều bit tùy mã hóa.", "Slide 157 nêu baud là symbol rate, đơn vị Bd; bit rate là bit/s.", [
          ["Baud rate luôn đồng nghĩa B/s byte mỗi giây.", "B/s thường là byte/s, khác bit/s và Bd."],
          ["Throughput là tốc độ tối đa lý thuyết của kênh.", "Throughput là lượng dữ liệu truyền thành công thực tế."],
          ["Bandwidth luôn nhỏ hơn tốc độ thực tế đạt được.", "Bandwidth thường là khả năng tối đa, lớn hơn tốc độ chọn/đạt thực tế."]
        ]),
        f("đầu vào số", "Slide 160", "Khi cấu hình chân IC là đầu vào số, logic 0/1 phụ thuộc vào gì?", "Phụ thuộc các ngưỡng điện áp VIL và VIH của IC, cần xem datasheet.", "Slide 160 nêu VIL là điện áp tối đa vẫn nhận thấp, VIH là điện áp tối thiểu nhận cao.", [
          ["Luôn phụ thuộc cảm giác của người lập trình.", "Ngưỡng logic là thông số điện trong datasheet."],
          ["Mọi IC có cùng ngưỡng bất kể công nghệ và nguồn.", "Ngưỡng phụ thuộc từng IC."],
          ["Chỉ cần đo màu dây tín hiệu.", "Logic được xác định bởi điện áp so với ngưỡng."]
        ]),
        f("floating input", "Slide 161", "Vì sao input floating dễ gây lỗi?", "Vì chân không có nguồn kéo xác định nên trạng thái có thể dao động hoặc bị nhiễu làm đọc sai.", "Slide 161 nêu floating/high impedance chỉ đọc trạng thái chân, dòng vào rất nhỏ nhưng nếu không kéo lên/xuống thì không ổn định.", [
          ["Floating luôn tự tạo logic 1 ổn định.", "Không có kéo lên/kéo xuống thì trạng thái không xác định."],
          ["Floating luôn là cách tốt nhất cho nút nhấn cơ khí.", "Nút nhấn cần trạng thái xác định và debounce."],
          ["Floating làm chân không bao giờ bị nhiễu.", "Chân trở kháng cao dễ bị ảnh hưởng bởi nhiễu."]
        ]),
        f("pull-up và pull-down", "Slide 161", "Pull-up/pull-down nội trong IC có tác dụng gì?", "Tạo trạng thái mặc định cho input khi không có nguồn tín hiệu chủ động bên ngoài.", "Slide 161 nêu pull-up kéo lên VCC, pull-down kéo xuống GND qua điện trở vài kOhm đến hàng chục kOhm.", [
          ["Tạo dòng vô hạn phá hủy IC.", "Điện trở nội giới hạn dòng ở mức nhỏ."],
          ["Chỉ dùng cho output công suất lớn.", "Pull-up/pull-down là cấu hình input mặc định."],
          ["Không ảnh hưởng trạng thái khi nguồn ngoài hở.", "Mục đích chính là xác lập trạng thái khi hở."]
        ]),
        f("filter, latch, debounce, event", "Slide 161", "Tính năng debounce trên đầu vào số dùng để làm gì?", "Chống một lần nhấn/nhả phím bị đọc thành nhiều lần do rung tiếp điểm cơ khí.", "Slide 161 liệt kê debounce cùng filter, latch, event và hysteresis.", [
          ["Tăng điện áp nguồn lên gấp đôi.", "Debounce xử lý rung tiếp điểm, không tăng nguồn."],
          ["Đọc xung rất hẹp bằng cách giữ sự kiện.", "Đó là chức năng latch."],
          ["Phát hiện sườn lên/xuống để tạo ngắt.", "Đó là event detection."]
        ]),
        f("hysteresis", "Slide 162", "Schmitt trigger/hysteresis giúp ích khi nào?", "Khi tín hiệu vào nhiễu hoặc biến thiên chậm quanh ngưỡng, hai ngưỡng upper/lower giúp output không chuyển trạng thái liên tục.", "Slide 162 minh họa không hysteresis tạo nhiều glitch, có hysteresis tạo logic sạch hơn.", [
          ["Khi muốn output dao động càng nhiều càng tốt.", "Hysteresis nhằm giảm dao động giả."],
          ["Khi tín hiệu luôn là DC sạch tuyệt đối và không cần ngưỡng.", "Tác dụng rõ nhất với tín hiệu nhiễu/cạnh chậm."],
          ["Khi muốn bỏ hoàn toàn mọi ngưỡng logic.", "Hysteresis dùng hai ngưỡng thay vì một."]
        ]),
        f("bảo vệ đầu vào số", "Slide 163", "Hai nhóm nguy cơ chính cần bảo vệ ở đầu vào số là gì?", "Quá áp đầu vào kéo dài và xung nhiễu năng lượng cao/thời gian ngắn như ESD, đóng cắt tải cảm, sét lan truyền.", "Slide 163 nêu chống quá áp và chống xung nhiễu.", [
          ["Chỉ bảo vệ chống lỗi chính tả trong code.", "Đây là bảo vệ điện cho chân IC."],
          ["Chỉ bảo vệ khi điện áp thấp hơn 0 V đúng 1 mV.", "Slide nói cả quá áp vài V/chục V và xung kV."],
          ["Không cần bảo vệ nếu dây tín hiệu dài.", "Dây dài càng dễ thu nhiễu/xung."]
        ]),
        f("điện trở nối tiếp", "Slide 163", "Điện trở nối tiếp đầu vào giúp gì và có nhược điểm gì?", "Giới hạn dòng vào mạch bảo vệ/chân IC, nhưng có thể làm chậm cạnh do tạo RC với tụ ký sinh input.", "Slide 163 nêu R vài kOhm có tác dụng rõ nhưng có thể giảm tốc độ chuyển mạch.", [
          ["Làm tăng vô hạn tốc độ cạnh tín hiệu.", "R với tụ ký sinh tạo lọc thông thấp làm chậm cạnh."],
          ["Không giới hạn dòng quá áp.", "Giới hạn dòng là tác dụng chính."],
          ["Luôn phù hợp mọi tín hiệu tốc độ cao mà không cần tính toán.", "Tín hiệu nhanh cần xét ảnh hưởng RC."]
        ]),
        f("diode clamp, TVS, Zener", "Slide 164", "Mạch diode clamp/TVS/Zener bảo vệ input theo nguyên tắc nào?", "Kẹp điện áp về vùng an toàn và cần điện trở/đường thoát dòng để dòng qua phần tử bảo vệ không vượt giới hạn.", "Slide 164 nhấn mạnh diode clamp cần giới hạn dòng; xung năng lượng lớn nên dùng TVS chuyên dụng.", [
          ["Diode clamp tự biến mọi quá áp thành vô hại dù dòng vô hạn.", "Nếu không giới hạn dòng, diode/IC vẫn có thể hỏng."],
          ["TVS chỉ dùng để lưu chương trình.", "TVS là diode bảo vệ quá áp/xung."],
          ["Zener không thể kẹp điện áp.", "Zener là một phần tử kẹp điện áp thường dùng."]
        ]),
        f("optocoupler và digital isolator", "Slide 165", "Khi nào nên cân nhắc optocoupler hoặc digital isolator cho đầu vào số?", "Khi cần cách ly điện giữa miền ngoài và MCU để chống điện áp nguy hiểm, chênh lệch mass hoặc nhiễu; digital isolator phù hợp tốc độ cao hơn optocoupler thường.", "Slide 165 nêu optocoupler đơn giản nhưng thường tốt ở tốc độ thấp; digital isolator cho tần số cao hơn.", [
          ["Khi muốn nối chung trực tiếp mọi mass nhiễu vào MCU.", "Cách ly nhằm tránh nối điện trực tiếp."],
          ["Khi cần truyền tốc độ cao nhưng vẫn dùng optocoupler chậm bất kể giới hạn.", "Slide gợi ý digital isolator cho tốc độ cao hơn."],
          ["Optocoupler truyền tín hiệu bằng dây đồng trực tiếp qua hai miền.", "Optocoupler truyền qua ánh sáng."]
        ]),
        f("IC đệm", "Slide 166", "IC đệm trong bảo vệ đầu vào số có thể đóng vai trò gì?", "Là phần tử hy sinh và cải thiện fan-out/tốc độ, nhưng tác dụng bảo vệ hạn chế và không thay thế bảo vệ chuyên dụng.", "Slide 166 mô tả IC đệm trạng thái logic ra giống vào, dòng vào nhỏ, fan-out lớn.", [
          ["IC đệm bảo vệ được mọi xung năng lượng lớn như sét mà không cần TVS.", "Slide nêu tác dụng bảo vệ hạn chế."],
          ["IC đệm luôn đảo trạng thái logic.", "Slide mô tả trạng thái ra giống trạng thái vào."],
          ["IC đệm không thể cải thiện fan-out.", "Fan-out lớn là một đặc điểm được nêu."]
        ]),
        f("đầu ra CMOS", "Slide 167", "Đầu ra số CMOS có thể có những trạng thái nào?", "Logic 0, logic 1 và trạng thái thả nổi/high-Z khi cả hai MOSFET output đều OFF.", "Slide 167 nêu output CMOS có nhiều trạng thái hơn chỉ 0 và 1.", [
          ["Chỉ có duy nhất trạng thái logic 1.", "Output có thể 0, 1 hoặc high-Z."],
          ["High-Z nghĩa là output chủ động kéo lên VCC rất mạnh.", "High-Z là trở kháng cao, không chủ động kéo lên/xuống."],
          ["Cả hai MOSFET cùng ON là trạng thái bình thường mong muốn.", "Cả hai ON có thể gây ngắn mạch VCC-GND."]
        ]),
        f("sink và source current", "Slide 167", "I_sink và I_source của chân output nghĩa là gì?", "I_sink là dòng chân hút khi kéo tải xuống GND; I_source là dòng chân cấp ra khi kéo tải lên VCC.", "Slide 167 ghi dòng output CMOS có thể hàng chục mA tùy IC và I_sink(max) xấp xỉ I_source(max) trong nhiều trường hợp.", [
          ["I_sink là dòng từ pin cấp nguồn vào sạc.", "Trong ngữ cảnh output, sink là hút dòng qua chân xuống GND."],
          ["I_source là dòng hấp thụ vào chân khi output thấp.", "Source là cấp dòng ra khi output cao."],
          ["Không cần kiểm tra giới hạn dòng vì CMOS chịu vô hạn.", "Vẫn phải xem datasheet và không kéo tải lớn trực tiếp."]
        ]),
        f("kiểu mạch output", "Slide 168", "Open-drain/open-collector output có đặc điểm gì?", "Chỉ chủ động kéo xuống thấp; khi transistor OFF thì output hở, cần điện trở kéo lên hoặc tải nối nguồn ngoài để có mức cao.", "Slide 168 mô tả open-drain/open-collector và các ứng dụng wired-AND, chuyển mức, tải nguồn ngoài.", [
          ["Luôn chủ động kéo lên VCC bằng transistor phía trên.", "Đó là push-pull/CMOS output, không phải open-drain."],
          ["Không thể dùng nhiều output chung một đường trong mọi trường hợp.", "Open-drain phù hợp kiểu wired-AND nếu thiết kế đúng."],
          ["Không cần pull-up mà vẫn tự lên cao chắc chắn.", "Khi OFF, output hở nên cần pull-up/tải."]
        ]),
        f("driver tải công suất lớn", "Slide 169", "Vì sao không nên dùng chân MCU đóng cắt trực tiếp tải công suất lớn?", "Chân MCU chỉ chịu dòng/áp nhỏ; tải thực tế có thể cần dòng lớn, áp cao, AC, cách ly, bảo vệ quá dòng/quá nhiệt hoặc điều khiển chiều/PWM.", "Slide 169 nêu MCU chỉ nên sinh tín hiệu điều khiển, tầng driver chịu công suất.", [
          ["Chân MCU luôn chịu trực tiếp được động cơ, relay và lưới AC.", "Đây là lỗi nguy hiểm; cần driver/cách ly."],
          ["Driver chỉ là tên khác của dây nối tắt.", "Driver là mạch trung gian đóng/cắt tải phù hợp."],
          ["Tải cảm không bao giờ tạo xung ngược.", "Relay/solenoid cần diode flyback hoặc mạch dập xung."]
        ]),
        f("relay và diode flyback", "Slide 170", "Vì sao cuộn relay DC cần diode flyback hoặc mạch dập xung?", "Khi ngắt dòng, cuộn cảm tạo xung điện áp ngược có thể phá transistor/driver; diode cung cấp đường dòng hồi tiếp để dập xung.", "Slide 170 minh họa relay với transistor và diode song song cuộn relay.", [
          ["Diode flyback dùng để làm relay sáng như LED.", "Nó bảo vệ khi ngắt tải cảm."],
          ["Cuộn relay là tải thuần trở không tạo xung.", "Cuộn relay là tải cảm."],
          ["Không cần bảo vệ transistor khi đóng cắt cuộn cảm.", "Xung ngược có thể hỏng transistor/driver."]
        ]),
        f("triac", "Slide 170", "Triac phù hợp nhất với loại tải nào trong mạch điều khiển bằng MCU?", "Tải AC như đèn, heater hoặc một số motor AC, thường kích qua optotriac để cách ly MCU với lưới AC.", "Triac thường dùng cho tải AC vì cơ chế dẫn/tắt của nó phù hợp dòng xoay chiều hơn tải DC thông thường.", [
          ["Đóng cắt DC theo cách thông thường trong mọi trường hợp.", "Triac cần dòng giảm dưới dòng giữ để tắt, nên không phù hợp DC thông thường."],
          ["Đọc cảm biến nhiệt độ analog trực tiếp.", "Triac là phần tử đóng cắt công suất AC."],
          ["Thay thế hoàn toàn mọi điện trở hạn dòng LED.", "Không liên quan điều khiển LED nhỏ trực tiếp."]
        ]),
        f("IC driver chuyên dụng", "Slide 171", "IC driver chuyên dụng như DRV103/DRV8873-Q1 có thể tích hợp gì ngoài đóng cắt dòng?", "Bảo vệ quá nhiệt/quá dòng, PWM, delay, oscillator, flyback, status flag, current sense/regulation, H-bridge và báo lỗi nFAULT.", "Slide 171 minh họa DRV103 và DRV8873-Q1 với nhiều khối bảo vệ/điều khiển.", [
          ["Chỉ là một transistor rời không có bảo vệ nào.", "Slide cho thấy IC driver tích hợp nhiều chức năng."],
          ["H-bridge không thể điều khiển chiều động cơ DC.", "H-bridge cho phép điều khiển chiều và tốc độ động cơ DC."],
          ["nFAULT là chân cấp nguồn chính cho tải.", "nFAULT là tín hiệu báo lỗi về MCU."]
        ])
      ]
    },
    {
      id: "adc-dac",
      title: "Giao tiếp vào ra tương tự cơ bản",
      subtitle: "Đầu vào tương tự, sai số ADC, lọc, layout, oversampling, DAC và PWM.",
      sourceRange: "Slide 173-220",
      facts: [
        f("analog input", "Slide 174", "Chân đầu vào tương tự Ain thường có hai kiểu sử dụng nào?", "Làm đầu vào comparator analog hoặc đầu vào ADC để chuyển điện áp analog thành mã số.", "Slide 174 mô tả comparator so sánh điện áp và ADC chuyển điện áp sang bit nhị phân.", [
          ["Chỉ dùng để cấp nguồn VCC.", "Ain là đầu vào tín hiệu tương tự, không phải chân nguồn."],
          ["Chỉ dùng để xuất PWM.", "PWM là đầu ra số mô phỏng analog sau lọc, không phải Ain."],
          ["Không thể dùng với cảm biến.", "ADC thường đọc điện áp cảm biến như nhiệt độ, ánh sáng, áp suất."]
        ]),
        f("comparator analog", "Slide 174", "Analog comparator tạo output kiểu gì?", "Tạo tín hiệu số cho biết đầu vào lớn hơn hay nhỏ hơn ngưỡng/tham chiếu.", "Slide 174 mô tả comparator có Vref và selectable hysteresis.", [
          ["Tạo mã nhị phân nhiều bit biểu diễn toàn dải đo như ADC.", "Comparator chỉ so sánh và cho output logic."],
          ["Luôn cần bộ nhớ Flash ngoài.", "Comparator là mạch so sánh điện áp."],
          ["Không thể dùng hysteresis.", "Slide minh họa selectable hysteresis."]
        ]),
        f("công thức ADC và LSB", "Slide 175", "Mức lượng tử VQ hay 1 LSB của ADC N bit được tính như thế nào?", "VQ = VFS / 2^N.", "Slide 175 nêu ADC N bit chia dải đo thành 2^N mức và 1 LSB là bước điện áp nhỏ nhất theo lý thuyết.", [
          ["VQ = VFS * 2^N.", "Công thức đúng là chia cho 2^N."],
          ["VQ không phụ thuộc số bit N.", "Tăng N làm số mức tăng và LSB giảm."],
          ["VQ chỉ là tốc độ truyền UART.", "VQ là mức lượng tử điện áp ADC."]
        ]),
        f("số mức ADC", "Slide 175-177", "ADC N bit chia dải đo thành bao nhiêu mức rời rạc?", "2^N mức.", "Slide 175-177 dùng ví dụ ADC 3 bit có 8 mã từ 000 đến 111.", [
          ["N mức.", "ADC N bit có 2^N tổ hợp mã."],
          ["2N mức.", "Số mã nhị phân là 2^N, không phải 2N."],
          ["Luôn đúng 10 mức bất kể N.", "Số mức phụ thuộc số bit."]
        ]),
        f("single-ended và differential ADC", "Slide 176-178", "ADC single-ended và differential khác nhau thế nào?", "Single-ended đo điện áp một chân so với GND; differential đo hiệu giữa hai chân và có thể biểu diễn giá trị âm/dương tùy mã.", "Slide 176-178 minh họa single-ended 0..FS và differential -FS..+FS.", [
          ["Single-ended luôn đo hiệu giữa hai chân.", "Đó là differential."],
          ["Differential chỉ đo được điện áp dương so với GND.", "Differential đo hiệu hai đầu vào và có thể có miền âm/dương."],
          ["Không cần đọc datasheet để biết mã ADC differential.", "Slide nhắc cần biết kiểu mã như offset binary/two's complement."]
        ]),
        f("MUX và PGA", "Slide 176", "MUX và PGA trong ADC tích hợp thường dùng để làm gì?", "MUX chọn chân ADC cần đo; PGA chọn hệ số khuếch đại trước khi vào ADC.", "Slide 176 nêu ADC trong IC nhúng có thể lập trình MUX, PGA và cấu hình đầu vào.", [
          ["MUX dùng để tạo xung clock UART.", "MUX chọn kênh tín hiệu."],
          ["PGA dùng để xóa Flash.", "PGA là programmable gain amplifier."],
          ["PGA chỉ làm giảm mọi tín hiệu về 0.", "PGA điều chỉnh hệ số khuếch đại."]
        ]),
        f("SAR ADC", "Slide 179", "Nguyên lý SAR ADC là gì?", "Thử dần từng bit bằng SAR, DAC nội và comparator để xấp xỉ điện áp vào rồi xuất kết quả số.", "Slide 179 mô tả comparator, SAR, DAC phản hồi và digital output.", [
          ["Dùng 2^N - 1 comparator song song cho mọi ngưỡng.", "Đó là flash ADC."],
          ["SAR ADC không dùng comparator nào.", "SAR dùng comparator để so sánh Vin với điện áp DAC."],
          ["Không phổ biến trong MCU.", "Slide nêu SAR thông dụng và thường tích hợp trong IC nhúng."]
        ]),
        f("flash ADC", "Slide 179", "Flash ADC rất nhanh nhưng có nhược điểm gì?", "Cần khoảng 2^N - 1 comparator, nên tốn diện tích, công suất và chi phí khi N tăng.", "Slide 179 minh họa ADC song song 3 bit dùng 7 comparator.", [
          ["Càng tăng số bit càng giảm số comparator về 1.", "Số comparator tăng rất nhanh theo 2^N - 1."],
          ["Flash ADC luôn rẻ và nhỏ nhất với độ phân giải cao.", "Nhược điểm là tốn diện tích/công suất/chi phí."],
          ["Flash ADC không thể nhanh.", "Nó rất nhanh vì nhiều comparator làm việc đồng thời."]
        ]),
        f("điện áp tham chiếu", "Slide 180", "Vref ảnh hưởng thế nào tới kết quả ADC?", "Vref là giới hạn đo/cơ sở so sánh; nếu Vref thay đổi, cùng Ain có thể cho Dout khác.", "Slide 180 nêu Dout = (VAin / VRef) * (2^N - 1).", [
          ["Vref không ảnh hưởng kết quả.", "Công thức có Vref ở mẫu số."],
          ["Vref chỉ là dây GND.", "Vref là điện áp chuẩn cho ADC."],
          ["Vref càng nhiễu càng tốt cho đo chính xác.", "Vref cần chính xác và ổn định."]
        ]),
        f("độ phân giải và ENOB", "Slide 180-181", "Vì sao số bit danh định cao chưa chắc cho phép đo chính xác hơn?", "Vì nhiễu và sai số có thể làm độ phân giải hiệu dụng thấp hơn, các bit thấp không đáng tin nếu nhiễu lớn.", "Slide 180-181 nhắc ENOB và cảnh báo độ phân giải cao chỉ có ý nghĩa khi nhiễu/sai số đủ nhỏ.", [
          ["Chỉ cần N lớn thì mọi sai số tự biến mất.", "Sai số mạch, nhiễu và Vref vẫn giới hạn đo."],
          ["ADC 12 bit luôn chính xác tuyệt đối.", "Độ phân giải không đồng nghĩa accuracy tuyệt đối."],
          ["Nhiễu không liên quan ADC.", "Nhiễu có thể che mất các bit thấp."]
        ]),
        f("sai số lượng tử", "Slide 182-183", "Sai số lượng tử tối đa của ADC lý tưởng là bao nhiêu?", "Khoảng 0,5 LSB.", "ADC lý tưởng làm tròn giá trị analog về mức mã gần nhất, nên sai số lượng tử tối đa xấp xỉ nửa bước lượng tử.", [
          ["Luôn bằng 100 LSB.", "Với ADC lý tưởng, sai số lượng tử tối đa khoảng 0,5 LSB."],
          ["Luôn bằng 0 vì ADC lý tưởng không lượng tử hóa.", "Bản chất lượng tử hóa vẫn tạo sai số."],
          ["Không phụ thuộc LSB.", "Sai số lượng tử được đo theo LSB."]
        ]),
        f("tốc độ lấy mẫu", "Slide 184", "Điều kiện Nyquist trong slide yêu cầu tốc độ lấy mẫu thế nào?", "fs >= 2 lần tần số tối đa của tín hiệu Ain.", "Slide 184 ghi fs >= 2 * tần số tối đa của Ain.", [
          ["fs <= một nửa tần số tín hiệu tối đa.", "Điều này dễ gây aliasing."],
          ["fs không liên quan aliasing.", "Lấy mẫu quá chậm gây aliasing."],
          ["Chỉ cần lấy một mẫu cho mọi tín hiệu động.", "Tín hiệu thay đổi cần lấy mẫu đủ nhanh."]
        ]),
        f("sample-and-hold", "Slide 184, 198-200", "Vì sao nội trở nguồn tín hiệu ảnh hưởng kết quả ADC?", "Tụ sample-and-hold cần thời gian nạp; nguồn trở cao làm tụ nạp chậm, nếu chưa ổn định khi chuyển đổi thì kết quả sai.", "Slide 184 và 198-200 mô tả mạch lấy/giữ mẫu, RC và thời gian nạp theo số bit ADC.", [
          ["Nội trở nguồn càng cao thì tụ nạp càng nhanh vô hạn.", "RC lớn làm nạp chậm."],
          ["Sample-and-hold không có tụ điện.", "Slide mô tả chuyển mạch và tụ lấy mẫu."],
          ["Không cần thời gian lấy mẫu nếu ADC nhiều bit.", "Nhiều bit thường càng cần settling chính xác hơn."]
        ]),
        f("các sai số ADC", "Slide 185", "Các sai số nội tại ADC được liệt kê gồm gì?", "Offset error EO, gain error EG, differential linearity error DLE/DNL, integral linearity error ILE/INL và total unadjusted error TUE.", "Slide 185 liệt kê các nhóm sai số do bản thân bộ ADC.", [
          ["Chỉ có sai số chính tả trong datasheet.", "Slide liệt kê các sai số đo lường điện."],
          ["Chỉ có baud rate error.", "Baud rate thuộc truyền thông UART, không phải sai số ADC nội tại."],
          ["Không có sai số nào nếu ADC tích hợp trong MCU.", "ADC tích hợp vẫn có sai số."]
        ]),
        f("offset error", "Slide 186", "Offset error EO là gì và ảnh hưởng mạnh ở vùng nào?", "Sai lệch tại bước nhảy đầu tiên/zero-scale, có thể bù phần mềm và ảnh hưởng đáng kể khi Ain nhỏ.", "Slide 186 mô tả EO làm đặc tuyến bị dịch gần gốc.", [
          ["Sai lệch chỉ xuất hiện ở mã cuối khi EO = 0.", "Đó gần gain error hơn."],
          ["Không thể bù bằng phần mềm trong mọi trường hợp.", "Slide nêu EO có thể được bù dễ dàng bằng phần mềm."],
          ["Chỉ ảnh hưởng khi Ain rất lớn.", "Offset ảnh hưởng tương đối mạnh khi Ain nhỏ."]
        ]),
        f("gain và full-scale error", "Slide 187-188", "Gain error và full-scale error liên hệ thế nào?", "Gain error là sai lệch độ dốc/cuối thang khi EO = 0; full-scale error = EO + EG.", "Slide 187-188 nêu gain error ảnh hưởng mạnh khi Ain lớn và công thức Full-scale error = EO + EG.", [
          ["Full-scale error = EO - EG luôn đúng.", "Full-scale error được tính theo tổng offset error và gain error, tức EO + EG."],
          ["Gain error là sai lệch tại bước nhảy đầu tiên.", "Đó là offset/zero-scale error."],
          ["Hiệu chuẩn offset luôn loại bỏ mọi gain error.", "Hiệu chuẩn offset chưa đủ nếu độ dốc đặc tuyến vẫn sai, nên gain error vẫn còn."]
        ]),
        f("DNL/DLE", "Slide 189", "DLE/DNL mô tả điều gì?", "Sai lệch độ rộng từng bước code thực tế so với 1 LSB lý tưởng.", "Slide 189 nêu DLE là sai lệch cực đại giữa độ rộng bước nhảy thực tế và 1 LSB.", [
          ["Sai lệch toàn bộ đặc tuyến so với đường thẳng nối đầu-cuối.", "Đó là ILE/INL."],
          ["Sai số do baud UART không khớp.", "DNL thuộc tuyến tính ADC."],
          ["Không thể gây missing code.", "DNL quá xấu có thể gây missing code."]
        ]),
        f("INL/ILE", "Slide 190", "ILE/INL mô tả điều gì?", "Sai lệch cực đại của các mức bậc thang so với đường thẳng nối bậc đầu và bậc cuối trong thực tế.", "Slide 190 định nghĩa Integral linearity error, còn gọi INL.", [
          ["Sai lệch độ rộng từng bước riêng lẻ so với 1 LSB.", "Đó là DNL/DLE."],
          ["Sai số do relay không có diode.", "Không liên quan relay."],
          ["Một loại chuẩn truyền thông vi sai.", "INL là sai số tuyến tính ADC."]
        ]),
        f("TUE", "Slide 191", "Total unadjusted error TUE hữu ích ở điểm nào?", "Cho biết sai số tổng thể chưa hiệu chỉnh, giúp đánh giá nhanh độ lệch thực tế có thể gặp khi không calibration.", "Slide 191 đặt TUE trong nhóm sai số ADC cần đọc datasheet.", [
          ["TUE là tốc độ truyền tối đa của SPI.", "TUE là thông số sai số ADC."],
          ["TUE luôn bằng 0 với mọi ADC.", "Sai số tổng chưa hiệu chỉnh thường khác 0."],
          ["TUE chỉ dùng cho thiết kế cơ khí vỏ hộp.", "TUE dùng trong đánh giá đo lường ADC."]
        ]),
        f("precision và accuracy", "Slide 192", "Phân biệt precision và accuracy trong đo lường ADC như thế nào?", "Precision nói về độ lặp lại/độ chụm; accuracy nói về độ gần với giá trị đúng.", "Slide 192 là phần đọc thêm về precision và accuracy trong sai số đo.", [
          ["Precision và accuracy luôn đồng nghĩa tuyệt đối.", "Chúng là hai khái niệm khác nhau."],
          ["Đo rất chụm nhưng lệch xa giá trị thật vẫn gọi là accuracy cao.", "Đó là precision cao nhưng accuracy thấp."],
          ["Accuracy chỉ phụ thuộc màu PCB.", "Accuracy phụ thuộc sai số hệ thống, calibration, Vref, ADC và mạch."]
        ]),
        f("code-transition noise", "Slide 193", "Code-transition noise/input-referred noise gây hiện tượng gì?", "Khi input gần biên chuyển mã, nhiễu làm kết quả ADC nhảy giữa các code lân cận.", "Slide 193 đọc thêm về code-transition noise.", [
          ["Làm UART đổi từ full-duplex sang simplex.", "Đây là nhiễu kết quả ADC, không phải mode UART."],
          ["Không bao giờ làm code ADC dao động.", "Tên gọi cho thấy nhiễu tại vùng chuyển mã."],
          ["Chỉ xảy ra ở LED 7 đoạn.", "Hiện tượng thuộc ADC."]
        ]),
        f("nhiễu Vref", "Slide 195, 203-204", "Nhiễu điện áp tham chiếu ảnh hưởng ADC thế nào?", "Vref là thước đo của ADC; nhiễu hoặc drift Vref làm kết quả Dout nhiễu/lệch, nên cần nguồn tham chiếu sạch, lọc và decoupling tốt.", "Slide 195 và 203-204 nhấn mạnh cải thiện nguồn và ví dụ IC tham chiếu REF50xx.", [
          ["Vref càng nhiễu càng tăng accuracy.", "Vref cần ổn định để đo chính xác."],
          ["Vref không tham gia công thức ADC.", "Công thức Dout có Vref."],
          ["Không cần tụ lọc hay layout nguồn analog.", "Slide có phần cải thiện nguồn cho ADC."]
        ]),
        f("dải động và ratiometric", "Slide 205, 208", "Vì sao nên tận dụng dải động ADC và có thể dùng đo ratiometric?", "Tín hiệu nên chiếm gần dải ADC để tăng độ phân giải hữu ích; nếu cảm biến và ADC dùng cùng excitation/Vref, biến thiên nguồn có thể được triệt theo tỉ lệ.", "Slide 205 nêu dùng Vref làm excitation cho cầu đo; slide 208 nêu chọn Vref/khuếch đại/trừ DC để tận dụng dải động.", [
          ["Để tín hiệu chỉ chiếm 1% thang đo cho chính xác hơn.", "Chiếm ít thang đo làm mất độ phân giải hữu ích."],
          ["Ratiometric nghĩa là Vref và cảm biến hoàn toàn độc lập.", "Ratiometric dùng chung tham chiếu/excitation để giảm sai số tỷ lệ."],
          ["Không bao giờ được khuếch đại tín hiệu nhỏ trước ADC.", "Slide nêu nếu điện áp vào nhỏ cần khuếch đại."]
        ]),
        f("lọc analog và lọc số", "Slide 206-207", "Lọc analog trước ADC và lọc số sau ADC khác nhau thế nào?", "Lọc analog giảm nhiễu tần số cao trước khi lấy mẫu và chống aliasing; lọc số làm mượt dữ liệu sau ADC nhưng không sửa được aliasing đã xảy ra.", "Slide 206 nêu lọc tương tự trước ADC và lọc số sau ADC; slide 207 ví dụ lấy trung bình.", [
          ["Lọc số sau ADC luôn loại bỏ được aliasing đã xảy ra.", "Aliasing cần được xử lý trước lấy mẫu bằng lọc analog phù hợp."],
          ["Lấy trung bình không có nhược điểm.", "Slide nêu lấy trung bình tạo độ trễ và làm chậm đáp ứng."],
          ["Lọc analog chỉ dùng sau khi số hóa.", "Lọc analog đặt ở đầu vào Ain trước ADC."]
        ]),
        f("layout ADC", "Slide 209", "Vì sao layout quan trọng với mạch ADC?", "Cùng schematic có thể cho chất lượng khác nhau do crosstalk, EMI, vòng hồi dòng, guard trace, khoảng cách trace, ground plane và nguồn nhiễu.", "Slide 209 liệt kê tách trace, guard trace, góc 45 độ, giảm vòng dòng, guard ring.", [
          ["Layout không thể ảnh hưởng chất lượng analog.", "Slide kết luận layout là một phần thiết kế mạch đo."],
          ["Đường tín hiệu nhạy nên luôn chạy sát đường gây nhiễu dài nhất.", "Slide khuyến nghị tách khoảng cách và guard."],
          ["Vòng dòng hồi tiếp càng lớn càng miễn nhiễu.", "Vòng lớn dễ thu nhiễu từ trường."]
        ]),
        f("oversampling", "Slide 210", "Oversampling kết hợp nhiễu nhẹ/dither và lấy trung bình có thể giúp gì?", "Có thể tăng độ phân giải hiệu dụng, ví dụ thêm 1 bit nếu điều kiện nhiễu và xử lý phù hợp.", "Slide 210 mô tả oversampling + nhiễu nhẹ + lấy trung bình giúp tăng độ phân giải hiệu dụng.", [
          ["Luôn thay thế được thiết kế analog tốt.", "Slide nhắc oversampling không thay thế analog tốt."],
          ["Nếu hoàn toàn không có nhiễu/dither và code không đổi thì chắc chắn tăng độ phân giải.", "Slide lưu ý khi không có dao động qua biên code thì khó suy ra phần dưới LSB."],
          ["Nhiễu càng lớn vô hạn càng tốt.", "Nhiễu quá lớn chỉ làm kết quả nhiễu hơn."]
        ]),
        f("DAC", "Slide 211-212", "DAC thực hiện chức năng gì?", "Biến đổi số sang tương tự; một số tạo mức analog, dãy số theo thời gian tạo tín hiệu analog, phụ thuộc giá trị số và tham chiếu.", "Slide 211 nêu DAC là đầu ra tương tự, ngược chức năng ADC; slide 212 nêu trọng số bit MSB/LSB.", [
          ["Biến đổi điện áp analog thành mã nhị phân.", "Đó là chức năng của ADC, còn DAC đi theo chiều ngược lại: từ giá trị số tạo ra mức tương tự."],
          ["Chỉ dùng để đọc nút nhấn số.", "DAC tạo mức/tín hiệu analog."],
          ["Không có độ phân giải hay sai số.", "DAC cũng có độ phân giải, tốc độ, accuracy, tuyến tính và sai số."]
        ]),
        f("DAC điện trở trọng số", "Slide 213-215", "Nhược điểm lớn của DAC dùng điện trở trọng số là gì?", "Khi số bit cao, cần tỉ lệ điện trở rất rộng như 2^(n-1), khó hoặc không thực hiện được chính xác.", "Slide 215 nêu 8 bit cần tỉ lệ 128 lần, 16 bit cần 32768 lần.", [
          ["Chỉ cần hai giá trị R và 2R cho mọi bit.", "Đó là ưu điểm của R-2R, không phải điện trở trọng số."],
          ["Càng nhiều bit càng dễ matching điện trở vô hạn.", "Tỉ lệ điện trở lớn làm khó chế tạo."],
          ["Không dùng op-amp cộng dòng.", "Slide 213 minh họa op-amp cộng dòng theo trọng số."]
        ]),
        f("DAC R-2R", "Slide 216-219", "DAC thang R-2R khắc phục nhược điểm gì?", "Chỉ dùng hai giá trị điện trở R và 2R để tạo trọng số nhị phân, dễ chế tạo/matching hơn điện trở trọng số.", "Slide 216-219 chứng minh R-2R tạo các trọng số b1/2, b2/4, ... bn/2^n.", [
          ["Cần dải điện trở từ R đến 32768R cho 16 bit.", "R-2R chỉ cần R và 2R."],
          ["Không phụ thuộc độ chính xác điện trở.", "Chất lượng vẫn phụ thuộc matching điện trở."],
          ["Không tạo trọng số nhị phân.", "Thevenin trong slide chứng minh trọng số nhị phân."]
        ]),
        f("PWM tạo analog", "Slide 220", "PWM tạo mức analog sau lọc theo nguyên lý nào?", "Tạo xung vuông tần số cao với duty cycle thay đổi; lọc thông thấp lấy giá trị trung bình, ví dụ 50% duty cho khoảng 0,5 Vdd.", "Slide 220 nêu PWMA = duty * Vdd và lọc RC có fc = 1/(2*pi*R*C).", [
          ["PWM tức thời đã là điện áp analog mượt không cần lọc.", "PWM tức thời chỉ có hai mức GND/Vdd, cần lọc nếu muốn analog mượt."],
          ["Duty cycle không ảnh hưởng giá trị trung bình.", "Giá trị trung bình tỷ lệ duty cycle."],
          ["PWM không thể tạo bằng timer MCU.", "Slide nêu PWM dễ tạo bằng timer MCU."]
        ])
      ]
    },
    {
      id: "nhieu-truyen-thong-bao-mat",
      title: "Nhiễu, giao tiếp theo chuẩn truyền thông cơ bản và bảo mật",
      subtitle: "Đường truyền nhiễu, UART/RS-232/RS-485, SPI, I2C và bảo mật thiết kế.",
      sourceRange: "Slide 221-252",
      facts: [
        f("nguồn nhiễu", "Slide 221", "Các nguồn nhiễu trong hệ nhúng có thể đến từ đâu?", "Tự nhiên như sét, thiết bị/trạm phát sóng, lưới 50 Hz/100 Hz, thiết bị điện tử khác và chính mạch/linh kiện trong hệ.", "Slide 221 liệt kê nhiều nguồn nhiễu từ ngoài và trong mạch.", [
          ["Chỉ đến từ lỗi chính tả trong firmware.", "Nhiễu ở đây là nhiễu điện/tín hiệu."],
          ["Chỉ có một nguồn duy nhất là màn hình LCD.", "Slide nêu nhiều nguồn khác nhau."],
          ["Không thể phát sinh từ chính mạch điện.", "Slide nêu bản thân mạch và linh kiện cũng có thể là nguồn nhiễu."]
        ]),
        f("đường truyền nhiễu", "Slide 221", "Ba con đường chính để nhiễu truyền từ A tới B là gì?", "Truyền dẫn conduction, phát xạ radiated và ghép coupling gồm điện dung/điện cảm.", "Slide 221 mô tả conduction path, radiation và coupled path.", [
          ["Chỉ qua Bluetooth.", "Bluetooth là công nghệ truyền thông, không phải phân loại đường nhiễu chính trong slide."],
          ["Chỉ qua màu vỏ thiết bị.", "Không liên quan đường truyền nhiễu."],
          ["Chỉ qua compiler optimization.", "Tối ưu code không phải đường truyền nhiễu điện."]
        ]),
        f("giảm nhiễu truyền dẫn", "Slide 222", "Với nhiễu truyền dẫn, giải pháp thường dùng là gì?", "Cách ly bằng cáp quang, optocoupler, digital isolator, biến áp cách ly; lọc tín hiệu/nguồn và dùng nguồn độc lập khi cần.", "Slide 222 phân nhóm giải pháp theo đường truyền nhiễu.", [
          ["Tăng độ dài dây không giới hạn.", "Dây dài có thể tăng nhiễu, không phải giải pháp chung."],
          ["Bỏ mọi bộ lọc nguồn/tín hiệu.", "Bộ lọc là giải pháp được nêu."],
          ["Nối tất cả mass nhiễu trực tiếp vào input nhạy.", "Cách ly/lọc thường nhằm giảm đường nhiễu chung."]
        ]),
        f("giảm nhiễu phát xạ", "Slide 222", "Với nhiễu phát xạ, có thể xử lý ở hai phía nào?", "Ở nguồn phát: tối ưu mạch/layout và che chắn; ở phía thu: che chắn mạch nhạy, dùng dây shield và rút ngắn dây.", "Slide 222 chia giải pháp phía phát và phía thu.", [
          ["Chỉ có thể xử lý bằng đổi font chữ tài liệu.", "Nhiễu phát xạ cần xử lý điện từ/layout/shield."],
          ["Không thể che chắn phần mạch nhạy.", "Slide nêu che chắn phần mạch nhạy cảm."],
          ["Dây càng dài càng luôn giảm phát xạ thu được.", "Slide gợi ý rút ngắn độ dài dây."]
        ]),
        f("coupling", "Slide 222", "Ghép điện dung và ghép cảm ứng nên giảm bằng cách nào?", "Ghép điện dung: che chắn, tăng khoảng cách, giảm song song, giảm dU/dt; ghép cảm ứng: xoắn dây, balanced line/signal, giảm dI/dt.", "Slide 222 liệt kê biện pháp cho capacitive và inductive coupling.", [
          ["Ghép điện dung chỉ phụ thuộc dI/dt.", "Ghép điện dung mạnh khi dU/dt lớn."],
          ["Ghép cảm ứng chỉ phụ thuộc dU/dt.", "Ghép cảm ứng mạnh khi dI/dt lớn."],
          ["Xoắn dây làm tăng diện tích vòng lớn nhất có thể.", "Xoắn dây giúp giảm diện tích vòng và triệt bớt nhiễu cảm ứng."]
        ]),
        f("cáp xoắn", "Slide 223", "Vì sao cáp xoắn giảm nhiễu cảm ứng?", "Xoắn dây giảm diện tích vòng và làm điện áp nhiễu ở các vòng liên tiếp có dấu ngược nhau, tự triệt tiêu một phần.", "Slide 223 giải thích inductive coupling và tác dụng của twisted pair.", [
          ["Xoắn dây làm diện tích vòng tín hiệu tăng vô hạn.", "Nó làm từng vòng nhỏ hơn."],
          ["Các vòng liên tiếp luôn cộng nhiễu cùng dấu.", "Slide nêu chúng bị đảo chiều nên nhiễu có xu hướng triệt tiêu."],
          ["Cáp xoắn chỉ để đẹp, không có tác dụng điện từ.", "Tác dụng giảm nhiễu cảm ứng là nội dung chính của slide."]
        ]),
        f("câu hỏi thiết kế nhiễu", "Slide 224", "Khi thiết kế chống nhiễu, cần đặt câu hỏi ở các lớp nào?", "Mạch đo, truyền dẫn tín hiệu, độ dài dây/guarding, bố trí khối mạch, shielding và các yếu tố hệ thống cụ thể.", "Slide 224 tổng hợp bài học thiết kế từ nhiễu và truyền dẫn tín hiệu.", [
          ["Chỉ hỏi xem PCB có màu gì.", "Màu PCB không phải lớp kỹ thuật chính."],
          ["Không cần xét layout hay vị trí khối mạch.", "Slide nêu vị trí và bố trí khối rất quan trọng."],
          ["Không cần xét dây có shield hay xoắn.", "Slide nêu chọn dây trần/shield/xoắn/xoắn có shield tùy môi trường."]
        ]),
        f("nhóm chuẩn truyền thông", "Slide 226", "Các chuẩn truyền thông có dây trong phần này gồm nhóm nào?", "UART, RS-232, RS-422, RS-485, SPI và I2C.", "Slide 226 chia có dây và không dây, với có dây gồm UART/RS và SPI/I2C.", [
          ["Chỉ gồm NB-IoT và LoRa.", "NB-IoT/LoRa được nêu trong nhóm thường gặp IoT không dây."],
          ["Chỉ gồm Wi-Fi và 5G.", "Đó là nhóm không dây băng thông lớn."],
          ["Không có SPI/I2C.", "Slide liệt kê SPI và I2C."]
        ]),
        f("UART", "Slide 227", "UART là gì trong truyền thông nối tiếp của hệ nhúng?", "Universal Asynchronous Receiver-Transmitter, một khối phần cứng truyền/nhận dữ liệu nối tiếp từng bit, không hẳn là protocol hoàn chỉnh.", "Slide 227 nhấn mạnh UART là hardware unit và thực hiện chuyển đổi song song-nối tiếp/nối tiếp-song song.", [
          ["Một chuẩn điện áp vi sai đường dài như RS-485.", "UART là khối phần cứng logic; RS-485 là chuẩn điện/truyền dẫn."],
          ["Một bộ nhớ Flash.", "UART là khối truyền thông."],
          ["Một giao thức đồng bộ có clock riêng bắt buộc.", "UART là asynchronous, không truyền clock riêng."]
        ]),
        f("khung UART", "Slide 227, 229", "Khung truyền UART điển hình gồm những phần nào?", "Idle, start bit logic 0, data bits, parity tùy chọn và stop bit logic 1.", "Slide 227 và 229 mô tả receiver phát hiện start bit rồi lấy mẫu theo Delta t/baud.", [
          ["Chỉ gồm địa chỉ I2C và ACK.", "Đó là cơ chế I2C, không phải khung UART."],
          ["Không có start bit nên receiver tự đoán lúc bắt đầu.", "Start bit báo bắt đầu khung truyền."],
          ["Stop bit luôn logic 0 trong ví dụ UART thông thường.", "Stop bit của khung UART điển hình ở mức logic 1."]
        ]),
        f("baud UART", "Slide 227, 229", "Vì sao baud receiver phải khớp baud transmitter trong UART?", "Vì receiver lấy mẫu đều đặn sau start bit theo khoảng Delta t tính từ baud; sai baud có thể đọc lệch bit.", "Slide 227 nêu Delta t tính từ baud và baud receiver phải bằng transmitter.", [
          ["UART truyền clock riêng nên baud không cần khớp.", "UART không đồng bộ, không truyền clock."],
          ["Receiver chỉ lấy mẫu một lần ở cuối file.", "Receiver lấy mẫu ở tâm từng bit."],
          ["Baud chỉ là tên dây ground.", "Baud là tốc độ ký hiệu/truyền trong UART."]
        ]),
        f("cấu trúc UART", "Slide 228", "Vì sao UART có thể full-duplex?", "Vì có hai thanh ghi dịch độc lập cho truyền và nhận, cùng bộ đệm TX/RX riêng.", "Slide 228 mô tả transmit shift register và receive shift register độc lập.", [
          ["Vì chỉ có một dây dùng chung không phân hướng.", "UART full-duplex thường có TX và RX riêng."],
          ["Vì CPU phải tự dịch từng bit bằng phần mềm mọi lúc.", "Việc dịch bit được phần cứng UART thực hiện tự động."],
          ["Vì không có thanh ghi đệm nào.", "Slide nêu mỗi thanh ghi dịch có bộ nhớ đệm."]
        ]),
        f("dây UART", "Slide 229", "Kết nối UART full-duplex cơ bản thường cần những dây nào?", "TX, RX và GND; TX bên này nối RX bên kia và ngược lại.", "Slide 229 nêu 3 dây cho full-duplex, 2 dây cho half-duplex.", [
          ["Chỉ cần SDA và SCL với ACK.", "Đó là đặc trưng của I2C; UART cơ bản dùng TX/RX và cần chung mốc GND."],
          ["Không cần chung mốc GND ở UART TTL thông thường.", "Slide vẽ RX, TX, GND giữa hai UART."],
          ["TX nối TX và RX nối RX trong mọi trường hợp.", "UART điểm-điểm thường nối chéo TX-RX."]
        ]),
        f("RS-232 và UART", "Slide 230-231", "Quan hệ giữa UART TTL và RS-232 là gì?", "UART tạo dữ liệu nối tiếp mức logic TTL; cần IC chuyển mức như MAX232 để thành tín hiệu RS-232 dương/âm và đảo mức.", "Slide 230-231 so sánh TTL 0/5 V với RS-232 khoảng +/- và hình MAX232.", [
          ["Có thể nối trực tiếp chân MCU 3.3 V vào cổng RS-232 dương/âm mà không chuyển mức.", "Điều này có thể hỏng hoặc không hoạt động; cần chuyển mức."],
          ["RS-232 dùng cùng mức 0 V/5 V không đảo với TTL.", "RS-232 dùng điện áp dương/âm và logic đảo so với TTL."],
          ["MAX232 là ADC nhiều bit.", "MAX232 là IC chuyển mức UART TTL <-> RS-232."]
        ]),
        f("mức điện áp RS-232", "Slide 230", "Mức logic RS-232 trong slide được mô tả như thế nào?", "Logic 0 là điện áp dương phía truyền khoảng +5 V đến +15 V; logic 1 là điện áp âm khoảng -5 V đến -15 V.", "Slide 230 nêu phía nhận có ngưỡng +3..+15 cho 0 và -3..-15 cho 1.", [
          ["Logic 1 luôn là +5 V giống TTL.", "RS-232 logic 1 là mức âm trong slide."],
          ["RS-232 không có lề nhiễu.", "Slide nêu lề nhiễu ví dụ 2 V."],
          ["RS-232 chỉ dùng tín hiệu vi sai A/B.", "RS-232 là single-ended, không phải RS-485."]
        ]),
        f("hạn chế RS-232", "Slide 233", "Nhược điểm của RS-232 là gì?", "Chỉ hỗ trợ 1 transmitter/1 receiver, khoảng cách ngắn, tốc độ càng cao khoảng cách càng giảm và cần điện áp/IC chuyển mức chuyên dụng.", "Slide 233 giải thích lý do có RS-422/RS-485.", [
          ["Hỗ trợ multi-point mạnh như RS-485.", "RS-232 chỉ point-to-point."],
          ["Truyền xa 1200 m ở tốc độ rất cao trong mọi điều kiện.", "Slide nêu ví dụ 15 m ở 19.2 kb/s."],
          ["Không cần IC chuyển mức khi nối với MCU TTL.", "Thường cần chuyển mức như MAX232."]
        ]),
        f("RS-422/RS-485", "Slide 234", "Vì sao RS-422/RS-485 phù hợp hơn RS-232 cho môi trường nhiễu/khoảng cách xa?", "Chúng dùng tín hiệu differential trên cặp cáp xoắn, có độ nhạy phía nhận tốt và hỗ trợ khoảng cách lớn hơn.", "Slide 234 so sánh RS-232/423 single-ended với RS-422/485 differential và cáp tối đa 1200 m.", [
          ["Vì RS-422/485 luôn single-ended như RS-232.", "Bảng ghi RS-422/485 là differential."],
          ["Vì không cần dây cáp nào.", "Chúng dùng cặp cáp xoắn cho mỗi tín hiệu."],
          ["Vì độ nhạy receiver kém hơn nhiều và không chống nhiễu.", "Bảng nêu độ nhạy khoảng +/-0.2 V cho RS-422/485."]
        ]),
        f("RS-485 multi-point", "Slide 235-236", "Mạng RS-485 nhiều điểm cần chú ý điều gì?", "Các node chia sẻ cặp dây A/B qua transceiver, hai đầu bus có điện trở kết thúc và cần quản lý quyền phát để tránh nhiều node truyền đồng thời.", "Slide 235-236 minh họa bus RS-485 với RT, transceiver và Master/Client.", [
          ["Mọi node được phép phát cùng lúc không bao giờ xung đột.", "Bus nhiều điểm cần quản lý quyền truyền."],
          ["Không cần transceiver vì MCU TTL tự phát differential A/B.", "Transceiver chuyển logic nội bộ thành tín hiệu vi sai."],
          ["Điện trở kết thúc luôn đặt ở giữa mọi node ngẫu nhiên.", "Slide minh họa RT ở hai đầu đường truyền."]
        ]),
        f("SPI", "Slide 237", "SPI có các tín hiệu cơ bản nào?", "SCLK, MOSI, MISO và CS/SS.", "Slide 237 định nghĩa SPI là Serial Peripheral Interface, đồng bộ, full-duplex, master-slave.", [
          ["SDA, SCL và ACK là tín hiệu chính của SPI.", "Đó là cách mô tả bus I2C; SPI dùng SCLK, MOSI, MISO và CS/SS."],
          ["A và B vi sai là tín hiệu chính của SPI.", "Đó là kiểu bus RS-485/CAN hơn."],
          ["SPI không cần clock.", "SPI là đồng bộ và có SCLK."]
        ]),
        f("nguyên lý SPI", "Slide 237", "Mỗi xung SCLK trong SPI làm gì?", "Master dịch 1 bit ra MOSI và nhận 1 bit từ MISO; slave được chọn cũng dịch/nhận tương ứng.", "Slide 237 mô tả hai thanh ghi dịch trao đổi một bit mỗi xung clock.", [
          ["Chỉ gửi địa chỉ 7 bit và ACK.", "Đó là cơ chế I2C."],
          ["Không có dữ liệu hai chiều.", "SPI full-duplex với MOSI và MISO."],
          ["Slave tự tạo clock chính trong cấu hình thường.", "Master tạo SCLK."]
        ]),
        f("mode SPI", "Slide 238-239", "CPOL và CPHA trong SPI xác định điều gì?", "CPOL xác định mức idle của clock; CPHA xác định cạnh dùng để lấy mẫu và cạnh dùng để đổi/dịch bit.", "Slide 238-239 mô tả 4 mode SPI theo CPOL/CPHA.", [
          ["CPOL là địa chỉ 7 bit của slave.", "Địa chỉ 7 bit thuộc I2C, không phải CPOL."],
          ["CPHA là điện trở pull-up của bus.", "CPHA là pha clock."],
          ["Hai thiết bị SPI không cần cùng mode.", "Sai mode có thể đọc lệch bit hoặc lấy mẫu khi dữ liệu chưa ổn định."]
        ]),
        f("đặc điểm SPI", "Slide 240", "Đặc điểm nào đúng về SPI?", "Tốc độ cao, dễ dùng, full-duplex, phù hợp kết nối ngắn/intra-board, nhưng cần nhiều dây, không có ACK và không có phát hiện lỗi trong bản chất chuẩn.", "Slide 240 liệt kê ưu/nhược điểm SPI.", [
          ["SPI luôn có ACK bắt buộc sau mỗi byte như I2C.", "SPI không có ACK trong bản chất chuẩn."],
          ["SPI là differential để truyền rất xa.", "Slide nêu SPI dùng TTL, single-ended, không truyền xa tốt."],
          ["SPI dùng địa chỉ slave trên bus thay vì CS/SS.", "Slave được chọn qua đường chip select/slave select."]
        ]),
        f("I2C", "Slide 241", "I2C có các đặc điểm cơ bản nào?", "Truyền nối tiếp đồng bộ, half-duplex, hỗ trợ multi-master/multi-slave, dùng hai dây SCL và SDA dạng open-drain/open-collector với điện trở kéo lên.", "Slide 241 mô tả bus I2C hai dây và pull-up R1/R2 lên VCC.", [
          ["I2C cần MOSI, MISO, SCLK và SS riêng cho từng slave.", "Đó là nhóm tín hiệu của SPI; I2C dùng hai đường SCL/SDA dạng open-drain với điện trở kéo lên."],
          ["I2C push-pull mạnh cả cao và thấp trên bus.", "I2C dùng open-drain/open-collector và pull-up."],
          ["I2C không có clock.", "I2C có SCL."]
        ]),
        f("START/STOP I2C", "Slide 242", "START và STOP trong I2C được tạo khi nào?", "START khi SDA chuyển cao xuống thấp trong lúc SCL cao; STOP khi SDA chuyển thấp lên cao trong lúc SCL cao.", "Slide 242 mô tả START, REPEATED START và STOP trên SDA/SCL.", [
          ["START là khi SCL thấp và SDA không đổi.", "Slide định nghĩa START lúc SDA xuống trong khi SCL cao."],
          ["STOP là khi SDA xuống thấp trong lúc SCL cao.", "Đó là START, không phải STOP."],
          ["Dữ liệu SDA được phép đổi tùy ý khi SCL cao trong truyền bit thường.", "Trong truyền bit, SDA ổn định khi SCL cao, đổi khi SCL thấp."]
        ]),
        f("khung I2C", "Slide 243-244", "Mỗi khối truyền cơ bản I2C gồm những phần nào?", "START, 7 bit địa chỉ slave, 1 bit R/W, ACK, các byte dữ liệu mỗi byte kèm ACK, byte cuối NACK và STOP hoặc REPEATED START.", "Slide 243-244 mô tả khung 9 bit gồm 8 bit địa chỉ/hướng hoặc data và 1 ACK.", [
          ["Không có ACK trong I2C.", "I2C có ACK sau địa chỉ và sau mỗi byte dữ liệu."],
          ["Không có bit R/W.", "Bit R/W xác định đọc hay ghi."],
          ["Luôn chỉ truyền đúng một bit dữ liệu.", "I2C truyền theo byte và có thể nhiều byte liên tiếp."]
        ]),
        f("EEPROM I2C", "Slide 245-246", "Vì sao đọc 1 byte EEPROM I2C thường cần pha dummy write?", "Để đặt con trỏ địa chỉ ô nhớ bằng cách ghi địa chỉ word trước, rồi REPEATED START và đọc dữ liệu.", "Slide 246 mô tả đọc 1 byte gồm dummy write gửi device address write, word address high/low, sau đó read.", [
          ["Dummy write dùng để xóa toàn bộ EEPROM trước khi đọc.", "Mục đích là đặt địa chỉ ô nhớ cần đọc."],
          ["Đọc EEPROM không cần gửi địa chỉ ô nhớ.", "Cần gửi word address trước khi đọc địa chỉ cụ thể."],
          ["Sau byte cuối master gửi ACK để đọc không dừng.", "Ví dụ đọc 1 byte: host gửi NACK để báo không đọc tiếp."]
        ]),
        f("SPI và I2C", "Slide 247", "So sánh thực tế giữa SPI và I2C như thế nào?", "SPI nhanh, full-duplex, ít cơ chế phản hồi nhưng tốn dây/SS; I2C ít dây, có địa chỉ và ACK, multi-master nhưng chậm hơn và half-duplex.", "Slide 247 bảng so sánh số dây, tốc độ, ACK, master, khung và chế độ truyền.", [
          ["I2C luôn nhanh hơn SPI và full-duplex.", "Slide nêu I2C chậm hơn và half-duplex."],
          ["SPI chỉ cần 2 dây cho nhiều slave và có ACK bắt buộc.", "SPI thường cần 4+ dây và không có ACK."],
          ["I2C không có địa chỉ slave.", "I2C dùng địa chỉ slave."]
        ]),
        f("bảo mật hệ nhúng", "Slide 249", "Bảo mật trong thiết kế hệ nhúng gồm các hướng chính nào?", "Bảo vệ thiết kế mạch/hardware, bảo vệ mã nguồn/firmware/software và bảo vệ dữ liệu/information.", "Slide 249 nêu ba lớp bảo mật, trong đó phần hardware và mã nguồn được nhấn mạnh.", [
          ["Chỉ cần đặt mật khẩu Wi-Fi là đủ cho mọi hệ nhúng.", "Bảo mật còn gồm phần cứng, firmware và dữ liệu."],
          ["Không cần bảo vệ thiết kế mạch.", "Slide 250 dành riêng cho bảo vệ mạch điện."],
          ["Không cần bảo vệ mã nguồn.", "Slide 251 dành riêng cho bảo vệ mã nguồn."]
        ]),
        f("bảo vệ thiết kế mạch", "Slide 250", "Mục đích và kỹ thuật bảo vệ thiết kế mạch điện là gì?", "Chống sao chép/làm giả/ăn cắp công nghệ/chỉnh sửa; dùng mạch nhiều lớp/ẩn, IC khả trình, IC đặc biệt, xóa mã linh kiện, cơ chế kiểm tra toàn vẹn phần cứng.", "Slide 250 liệt kê mục đích và kỹ thuật bảo vệ mạch.", [
          ["Công khai mọi đường tín hiệu giả là cách bảo vệ duy nhất.", "Bảo vệ có thể dùng đường giả, định tuyến lắt léo và che giấu tín hiệu thật."],
          ["Không thể dùng firmware để kiểm tra can thiệp phần cứng.", "Slide nêu đưa vào mã nguồn cơ chế hỏi-đáp/đo thông số mạch."],
          ["Bảo vệ mạch chỉ nhằm làm PCB đẹp hơn.", "Mục tiêu là chống sao chép, làm giả, ăn cắp công nghệ, chỉnh sửa."]
        ]),
        f("bảo vệ mã nguồn", "Slide 251", "Các kỹ thuật bảo vệ mã nguồn/firmware trong slide gồm gì?", "Kích hoạt lock bộ nhớ chương trình nếu chip hỗ trợ và đưa quy trình kích hoạt đặc biệt để chip copy không hoạt động dù có mã.", "Slide 251 nêu bảo vệ mã nguồn nhằm chống sao chép, làm giả, ăn cắp công nghệ và chỉnh sửa tính năng gốc.", [
          ["Không bao giờ dùng cơ chế khóa bộ nhớ chương trình.", "Slide nêu kích hoạt lock nếu chip hỗ trợ."],
          ["Firmware copy luôn phải hoạt động trên mọi phần cứng giả.", "Slide nêu cơ chế kích hoạt để chip copy không hoạt động."],
          ["Bảo vệ mã nguồn chỉ để tăng tốc ADC.", "Mục tiêu là chống sao chép/chỉnh sửa hoạt động."]
        ])
      ]
    }
  ];

  const normalizeChoices = (choices, seed) => {
    const copy = choices.map((choice, index) => ({ ...choice, originalIndex: index }));
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = (seed + i * 17) % (i + 1);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.map(({ originalIndex, ...choice }) => choice);
  };

  const scrubText = (value) => String(value)
    .replace(/Slide\s+\d+(?:\s*[-–]\s*\d+)?(?:\s*,\s*\d+)*/g, "Bài học")
    .replace(/\b[Ss]lide\b/g, "bài học")
    .replace(/tài liệu markdown/gi, "kiến thức đã học")
    .replace(/file markdown/gi, "tài liệu học")
    .replace(/theo bài học/gi, "theo kiến thức đã học")
    .replace(/trong bài học/gi, "")
    .replace(/trong bài(?=[\s?.])/gi, "")
    .replace(/ trong ví dụ bài học/gi, " trong ví dụ")
    .replace(/nội dung chính của bài học/gi, "ý chính cần nắm")
    .replace(/định nghĩa bài học/gi, "định nghĩa IoT")
    .replace(/ theo kiến thức đã học/gi, "")
    .replace(/Các bài học\s+\d+(?:\s*[-–]\s*\d+)?\s+(nêu|đưa|ghi|mô tả|minh họa|trình bày|liệt kê|nhấn mạnh|cho thấy|giải thích|định nghĩa|phân rã|so sánh|đặt|vẽ|kết luận)\s+/gi, "")
    .replace(/\bBài học (nêu|dùng|ghi|mô tả|minh họa|trình bày|liệt kê|nhấn mạnh|cho thấy|giải thích|định nghĩa|phân rã|so sánh|đặt|vẽ|kết luận) /g, "")
    .replace(/\bbài học (nêu|dùng|ghi|mô tả|minh họa|trình bày|liệt kê|nhấn mạnh|cho thấy|giải thích|định nghĩa|phân rã|so sánh|đặt|vẽ|kết luận) /g, "")
    .replace(/\bBài học(?:\s+và\s+\d+)?\s+/g, "")
    .replace(/\bbài học(?:\s+và\s+\d+)?\s+/g, "")
    .replace(/được nhắc\s*\./gi, "là ví dụ quan trọng.")
    .replace(/đưa bonus về/gi, "")
    .replace(/gạch chéo PC\/laptop\/server để nhấn mạnh/gi, "phân biệt PC/laptop/server để nhấn mạnh")
    .replace(/\s{2,}/g, " ")
    .trim();

  const scrubStem = (value) => scrubText(value)
    .replace("Bài học automotive cho thấy điều gì về hệ thống nhúng trong xe hiện đại?", "Điều gì đúng về hệ thống nhúng trong xe hiện đại?")
    .replace("bài học automotive cho thấy điều gì về hệ thống nhúng trong xe hiện đại?", "Điều gì đúng về hệ thống nhúng trong xe hiện đại?")
    .replace(/ trong bài(?=\?|$)/g, "")
    .replace("Một router không dây trong bài học được dùng để minh họa nhóm chức năng nào?", "Router không dây là ví dụ phù hợp nhất cho nhóm chức năng nào của hệ thống nhúng?")
    .replace("Đặc điểm nào phù hợp với RISC trong so sánh của bài học?", "Đặc điểm nào phù hợp với RISC?")
    .replace("Little-endian trong bài học được mô tả như thế nào?", "Little-endian được mô tả như thế nào?")
    .replace("Các tiêu chí nào được dùng để đánh giá bộ xử lý trong bài học?", "Các tiêu chí nào thường dùng để đánh giá bộ xử lý trong hệ nhúng?")
    .replace("Nhóm MCU 8-bit phổ biến của Microchip trong bài học gồm gì?", "Nhóm MCU 8-bit phổ biến của Microchip gồm gì?")
    .replace("Khi chọn MCU Texas Instruments theo kiến thức đã học, nên bắt đầu từ yếu tố nào?", "Khi chọn MCU Texas Instruments, nên bắt đầu từ yếu tố nào?")
    .replace("Generic driver trong bài học được hiểu như thế nào?", "Generic driver được hiểu như thế nào?")
    .replace("Ai được bài học nhắc tới là người dùng cụm từ Internet of Things vào năm 1999?", "Ai thường được nhắc tới là người dùng cụm từ Internet of Things vào năm 1999?")
    .replace("Ví dụ HVAC IoT trong bài học cho thấy điều gì?", "Ví dụ HVAC IoT cho thấy điều gì?")
    .replace("Điểm nào đúng khi phân biệt IoT với M2M/IoE theo hình trong bài học?", "Điểm nào đúng khi phân biệt IoT với M2M/IoE?")
    .replace("Các lợi ích của IoT trong bài học trải trên những nhóm nào?", "Các lợi ích của IoT trải trên những nhóm nào?")
    .replace("Nhóm LPWA trong bài học có đặc điểm gì?", "Nhóm LPWA có đặc điểm gì?")
    .replace("Các bài học xu thế IoT cho thấy điều gì?", "Các xu thế IoT cho thấy điều gì?")
    .replace("Điều kiện Nyquist trong bài học yêu cầu tốc độ lấy mẫu thế nào?", "Điều kiện Nyquist yêu cầu tốc độ lấy mẫu thế nào?")
    .replace("Mức logic RS-232 trong bài học được mô tả như thế nào?", "Mức logic RS-232 thường được mô tả như thế nào?")
    .replace("Các kỹ thuật bảo vệ mã nguồn/firmware trong bài học gồm gì?", "Các kỹ thuật bảo vệ mã nguồn/firmware gồm gì?")
    .replace("Mô hình OSI trong bài giúp hiểu vấn đề nào?", "Mô hình OSI giúp hiểu vấn đề nào?")
    .replace("Định nghĩa IoT trong bài nhấn mạnh điều gì?", "Định nghĩa IoT nhấn mạnh điều gì?");

  const scrubChoice = (choice) => ({
    ...choice,
    text: scrubText(choice.text),
    reason: scrubText(choice.reason)
  });

  const sourceLabel = (chapter) => chapter.title;

  const trueChoiceFrom = (fact) => ({
    text: scrubText(fact.correct),
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
    stem: scrubStem(fact.stem),
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
        { text: falseItem.text, correct: true, reason: `Đây là phát biểu sai. ${falseItem.reason}` },
        ...trueFacts.map(trueChoiceFrom)
      ].map(scrubChoice), index * 3 + chapter.id.length)
    };
  };

  const appliedQuestion = (chapter, fact, index) => ({
    id: `${chapter.id}-a-${index + 1}`,
    type: "Áp dụng",
    source: sourceLabel(chapter),
    topic: fact.topic,
    stem: `Khi gặp tình huống liên quan đến ${fact.topic}, cách hiểu hoặc xử lý nào phù hợp nhất?`,
    choices: normalizeChoices([
      { text: fact.correct, correct: true, reason: fact.why },
      ...fact.wrong.slice().reverse().map((item) => ({ text: item.text, correct: false, reason: item.reason }))
    ].map(scrubChoice), index * 5 + chapter.id.length)
  });

  const conceptQuestion = (chapter, fact, index) => ({
    id: `${chapter.id}-m-${index + 1}`,
    type: "Tổng hợp",
    source: sourceLabel(chapter),
    topic: fact.topic,
    stem: `Nhận định nào đúng nhất về ${fact.topic}?`,
    choices: normalizeChoices([
      { text: fact.correct, correct: true, reason: fact.why },
      ...fact.wrong.map((item) => ({ text: item.text, correct: false, reason: item.reason }))
    ].map(scrubChoice), index * 7 + chapter.id.length)
  });

  const buildQuestions = (chapter) => {
    const variants = [
      (fact, index) => directQuestion(chapter, fact, index),
      (fact, index) => falseStatementQuestion(chapter, fact, chapter.facts, index),
      (fact, index) => appliedQuestion(chapter, fact, index),
      (fact, index) => conceptQuestion(chapter, fact, index)
    ];
    const questions = [];
    let index = 0;
    while (questions.length < 100) {
      const variant = variants[Math.floor(index / chapter.facts.length) % variants.length];
      const fact = chapter.facts[index % chapter.facts.length];
      questions.push(variant(fact, index));
      index += 1;
    }
    return questions.map((question, questionIndex) => ({
      ...question,
      number: questionIndex + 1,
      setIndex: Math.floor(questionIndex / 10)
    }));
  };

  const baseChapter = (id) => chapters.find((chapter) => chapter.id === id);
  const slideStart = (fact) => Number((fact.source.match(/Slide\s+(\d+)/) || [0, 0])[1]);
  const factsInRange = (chapterId, from, to) => baseChapter(chapterId).facts.filter((fact) => {
    const slide = slideStart(fact);
    return slide >= from && slide <= to;
  });

  const originalChapters = [
    {
      id: "gioi-thieu-he-thong-nhung",
      title: "1. Giới thiệu về hệ thống nhúng",
      subtitle: "Định nghĩa, phân loại, cấu trúc và mô hình, quy trình thiết kế, tiêu chuẩn trong thiết kế hệ nhúng.",
      sourceRange: "Slide 8-34",
      facts: baseChapter("tong-quan-thiet-ke").facts
    },
    {
      id: "phan-cung-nhung",
      title: "2. Phần cứng nhúng",
      subtitle: "Bộ xử lý, bộ nhớ, cổng vào/ra, bus và bảo vệ phần cứng nhúng.",
      sourceRange: "Slide 35-87",
      facts: baseChapter("phan-cung-nhung").facts
    },
    {
      id: "phan-mem-nhung",
      title: "3. Phần mềm nhúng",
      subtitle: "Firmware, quy trình dịch, tối ưu mã, trình điều khiển, hệ điều hành nhúng, middleware và ứng dụng.",
      sourceRange: "Slide 88-118",
      facts: baseChapter("phan-mem-nhung").facts
    },
    {
      id: "iot-va-xu-the-phat-trien",
      title: "4. Giới thiệu về IoT và xu thế phát triển",
      subtitle: "Tổng quan IoT, thành phần hệ thống IoT, thiết bị, gateway, kết nối, platform, cloud và xu thế.",
      sourceRange: "Slide 119-147",
      facts: baseChapter("iot").facts
    },
    {
      id: "mot-so-khai-niem",
      title: "5. Một số khái niệm",
      subtitle: "Protocol, standard, đồng bộ/bất đồng bộ, inter/intra-system, kiểu kết nối, single-ended/differential, mode và rate.",
      sourceRange: "Slide 149-157",
      facts: factsInRange("giao-tiep-so", 149, 157)
    },
    {
      id: "giao-tiep-vao-ra-so-co-ban",
      title: "6. Giao tiếp vào ra số cơ bản",
      subtitle: "Đầu vào số, bảo vệ đầu vào số, đầu ra số và driver cho tải công suất lớn.",
      sourceRange: "Slide 158-171",
      facts: factsInRange("giao-tiep-so", 158, 171)
    },
    {
      id: "giao-tiep-vao-ra-tuong-tu-co-ban",
      title: "7. Giao tiếp vào ra tương tự cơ bản",
      subtitle: "Đầu vào tương tự, ADC, cải thiện chất lượng ADC, DAC, PWM, nhiễu và truyền dẫn tín hiệu.",
      sourceRange: "Slide 172-224",
      facts: [
        ...baseChapter("adc-dac").facts,
        ...factsInRange("nhieu-truyen-thong-bao-mat", 221, 224)
      ]
    },
    {
      id: "giao-tiep-theo-chuan-truyen-thong-co-ban",
      title: "8. Giao tiếp theo chuẩn truyền thông cơ bản",
      subtitle: "UART, RS-232, RS-422, RS-485, SPI, I2C và so sánh các chuẩn truyền thông cơ bản.",
      sourceRange: "Slide 225-247",
      facts: factsInRange("nhieu-truyen-thong-bao-mat", 225, 247)
    },
    {
      id: "bao-mat-trong-thiet-ke-he-nhung",
      title: "9. Bảo mật trong thiết kế hệ nhúng",
      subtitle: "Bảo vệ thiết kế mạch điện, bảo vệ mã nguồn/firmware/software và bảo vệ dữ liệu.",
      sourceRange: "Slide 248-252",
      facts: factsInRange("nhieu-truyen-thong-bao-mat", 248, 252)
    }
  ];

  window.EMBEDDED_QUIZ_DATA = {
    version: "2026-07-06",
    section: {
      id: "he-thong-nhung",
      title: "Hệ thống nhúng",
      source: "Bài giảng Hệ thống nhúng và giao tiếp nhúng đã hệ thống hóa"
    },
    chapters: originalChapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      subtitle: chapter.subtitle,
      sourceRange: chapter.sourceRange,
      questionCount: 100,
      setSize: 10,
      questions: buildQuestions(chapter)
    }))
  };
})();
