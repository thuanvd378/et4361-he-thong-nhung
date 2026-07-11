(() => {
  const data = window.EMBEDDED_QUIZ_DATA;
  if (!data) return;

  const distractor = (text, reason) => ({ text, reason });
  const pools = {
    "định nghĩa hệ thống nhúng": [
      distractor("Một máy tính đa năng trở thành hệ thống nhúng khi được cài cố định một ứng dụng, dù không tích hợp vào sản phẩm hay điều khiển phần cứng nào.", "Chạy một ứng dụng cố định chưa đủ; hệ nhúng gắn với sản phẩm và nhiệm vụ chuyên biệt cùng các ràng buộc phần cứng."),
      distractor("Mọi mạch điều khiển điện tử đều là hệ thống nhúng, kể cả mạch tương tự không có bộ xử lý hoặc chương trình điều khiển.", "Theo phạm vi môn học, hệ nhúng có năng lực xử lý số và phần mềm hoặc logic điều khiển tương ứng."),
      distractor("Khả năng kết nối mạng là điều kiện phân biệt hệ thống nhúng với máy tính đa năng, còn tính chuyên dụng không phải tiêu chí bắt buộc.", "Nhiều hệ nhúng không nối mạng; nhiệm vụ chuyên biệt mới là đặc trưng cốt lõi."),
    ],
    "cấu trúc điển hình": [
      distractor("Cảm biến và cơ cấu chấp hành có thể trao đổi trực tiếp với ứng dụng mà không cần lõi xử lý, bộ nhớ hoặc lớp giao tiếp phần cứng.", "Dữ liệu cần được thu nhận, xử lý và xuất qua các khối phần cứng cùng phần mềm tương ứng."),
      distractor("Giao tiếp truyền thông là thành phần bắt buộc của mọi hệ nhúng, còn bộ nhớ chỉ cần khi sản phẩm có giao diện người dùng.", "Không phải hệ nào cũng cần truyền thông, nhưng bộ nhớ chương trình và dữ liệu thường là phần nền tảng."),
      distractor("Một cấu trúc có CPU và bộ nhớ đã đầy đủ cho mọi hệ nhúng; nguồn, reset, I/O và khối hỗ trợ không ảnh hưởng khả năng vận hành.", "Hệ thực tế còn cần nguồn, khởi động, I/O và các khối hỗ trợ phù hợp."),
    ],
    "quy trình thiết kế hệ thống nhúng": [
      distractor("Nên cố định kiến trúc phần cứng trước khi hoàn thiện yêu cầu để phần mềm thích nghi với mọi thay đổi còn lại.", "Kiến trúc phải xuất phát từ yêu cầu; cố định quá sớm dễ tạo chi phí sửa đổi lớn."),
      distractor("Kiểm thử riêng phần cứng và riêng phần mềm đủ chứng minh hệ hoàn chỉnh đúng, nên có thể rút ngắn bước tích hợp.", "Lỗi giao tiếp, timing và giả định giữa hai phần chỉ lộ rõ khi tích hợp."),
      distractor("Có thể tối ưu hiệu năng trước, sau đó mới bổ sung yêu cầu năng lượng, độ tin cậy và chi phí ở cuối dự án.", "Các ràng buộc phải được xét từ đầu vì chúng chi phối kiến trúc và linh kiện."),
    ],
    "tính thời gian thực": [
      distractor("Hệ đạt thời gian thực nếu thời gian phản hồi trung bình thấp, dù đôi lúc vượt xa hạn xử lý cho phép.", "Thời gian thực quan tâm việc đáp ứng deadline, không chỉ giá trị trung bình."),
      distractor("Chọn CPU nhanh hơn đủ bảo đảm thời gian thực mà không cần xét ngắt, lập lịch, thời gian chặn hoặc trường hợp xấu nhất.", "Tính dự đoán được của toàn hệ thống mới quyết định khả năng đáp ứng hạn."),
      distractor("Thời gian thực yêu cầu mọi phản hồi có độ trễ bằng nhau; việc đáp ứng trước deadline nhưng có jitter vẫn luôn bị xem là lỗi.", "Mức jitter cho phép phụ thuộc yêu cầu; không phải mọi hệ đòi độ trễ tuyệt đối bằng nhau."),
    ],
    "thiết kế board vi điều khiển thực tế": [
      distractor("Có thể dựa hoàn toàn vào reset và dao động nội của MCU nên không cần kiểm tra nguồn, tụ tách hoặc trạng thái chân lúc khởi động.", "Ngay cả khi dùng khối nội, chất lượng nguồn, decoupling và trạng thái khởi động vẫn phải được kiểm tra."),
      distractor("Mạch nạp và đầu nối chỉ phục vụ giai đoạn phát triển, nên có thể bố trí mà không xét bảo vệ, nhiễu hoặc khả năng bảo trì sản phẩm.", "Các cổng này là đường đi ra ngoài và ảnh hưởng độ tin cậy, ESD cùng khả năng cập nhật."),
      distractor("Nếu sơ đồ nguyên lý đúng logic thì bố trí PCB, đường hồi dòng và vị trí tụ nguồn không làm thay đổi khả năng chạy ổn định.", "Đặc tính ký sinh và đường dòng trên PCB ảnh hưởng trực tiếp nguồn và tín hiệu."),
    ],
    "đánh đổi trong thiết kế": [
      distractor("Tăng hiệu năng xử lý thường đồng thời giảm công suất, giá thành và độ phức tạp nên không cần xác định tiêu chí ưu tiên.", "Các tiêu chí thường xung đột; tăng hiệu năng có thể tăng công suất, nhiệt và chi phí."),
      distractor("Độ tin cậy chỉ phụ thuộc chất lượng linh kiện, không chịu ảnh hưởng của thời gian kiểm thử, dự phòng hoặc thiết kế phần mềm.", "Độ tin cậy là kết quả của cả phần cứng, phần mềm, quy trình và kiểm thử."),
      distractor("Khi sản phẩm đã đáp ứng tính năng, giảm chi phí linh kiện không thể ảnh hưởng năng lượng, sai số hoặc khả năng bảo trì.", "Thay đổi linh kiện thường kéo theo các đánh đổi kỹ thuật khác."),
    ],
    "phân loại theo chức năng": [
      distractor("Có thể phân loại chức năng chủ yếu theo ngôn ngữ lập trình vì hai hệ dùng cùng ngôn ngữ sẽ có cùng yêu cầu vận hành.", "Ngôn ngữ không quyết định nhiệm vụ điều khiển, thời gian thực, mạng hay tính di động."),
      distractor("Một hệ có kết nối mạng không thể đồng thời là hệ điều khiển thời gian thực vì mỗi sản phẩm chỉ thuộc đúng một nhóm chức năng.", "Các nhóm có thể giao nhau; một hệ vừa kết nối mạng vừa điều khiển thời gian thực."),
      distractor("Phân loại theo chức năng dựa vào số chip trên bo mạch, không cần xét nhiệm vụ mà hệ thống thực hiện.", "Tiêu chí là vai trò và hành vi của hệ, không phải số lượng linh kiện."),
    ],
    "đóng gói dữ liệu bằng header": [
      distractor("Mỗi lớp giao thức dùng cùng một phần đầu gói, nên phía nhận chỉ cần đọc một header để xử lý toàn bộ stack.", "Mỗi lớp có thông tin điều khiển và cách xử lý riêng."),
      distractor("Phần đầu gói chỉ phục vụ kiểm tra lỗi; địa chỉ, loại dữ liệu và thứ tự truyền luôn nằm trong payload ứng dụng.", "Header có thể chứa nhiều loại thông tin điều khiển, không chỉ kiểm tra lỗi."),
      distractor("Phía nhận có thể bỏ qua thứ tự tháo header vì thông tin của lớp dưới và lớp trên có cùng ý nghĩa.", "Các lớp phải được xử lý theo đúng thứ tự để chuyển dữ liệu lên stack."),
    ],
    "đặc điểm điển hình của hệ thống nhúng": [
      distractor("Một thiết bị chỉ được xem là hệ nhúng khi đồng thời có thời gian thực cứng, kết nối mạng và nguồn pin.", "Đó là các đặc điểm có thể xuất hiện, không phải điều kiện đồng thời cho mọi hệ."),
      distractor("Tài nguyên hữu hạn chỉ ảnh hưởng hệ nhúng nhỏ; hệ dùng bộ xử lý mạnh không cần cân nhắc bộ nhớ, năng lượng hoặc chi phí.", "Mọi thiết kế đều có giới hạn và mục tiêu sản phẩm cần cân bằng."),
      distractor("Tính chuyên dụng loại trừ khả năng cập nhật phần mềm vì chức năng của sản phẩm phải cố định từ khi sản xuất.", "Hệ chuyên dụng vẫn có thể cập nhật firmware để sửa lỗi hoặc cải tiến trong phạm vi nhiệm vụ."),
    ],
    "mô hình board hệ thống nhúng": [
      distractor("Bus chỉ nối CPU với bộ nhớ; cảm biến, đầu ra và giao tiếp ngoài luôn dùng các đường độc lập không liên quan kiến trúc bo mạch.", "Bus và mạng liên kết có thể kết nối nhiều loại ngoại vi và khối chức năng."),
      distractor("Khối nguồn không thuộc mô hình hệ thống vì chỉ cấp điện, nên không cần xét quan hệ với reset, ADC hoặc tải công suất.", "Nguồn ảnh hưởng trực tiếp độ ổn định và chất lượng của các khối."),
      distractor("Mô hình khối chỉ mô tả vị trí vật lý; hướng truyền dữ liệu và vai trò các giao diện không cần thể hiện.", "Mô hình dùng để hiểu luồng dữ liệu, điều khiển và quan hệ chức năng."),
    ],
    "mô hình triển khai thiết kế": [
      distractor("Mô hình tuyến tính là lựa chọn phù hợp nhất khi yêu cầu thường xuyên thay đổi vì hạn chế phản hồi giúp dự án ổn định hơn.", "Yêu cầu biến động cần vòng lặp và phản hồi sớm hơn."),
      distractor("Phát triển song song phần cứng và phần mềm loại bỏ nhu cầu mô phỏng hoặc giao diện thống nhất giữa hai nhóm.", "Phát triển song song càng cần hợp đồng giao diện và mô hình kiểm thử rõ."),
      distractor("Mô hình lặp chỉ dùng cho phần mềm; phần cứng không thể tạo nguyên mẫu hoặc điều chỉnh sau mỗi vòng đánh giá.", "Phần cứng vẫn có thể phát triển bằng prototype và các vòng tích hợp."),
    ],
    "tính phân tán trong hệ thống nhúng": [
      distractor("Nhiều tác vụ chạy trên một MCU đã tạo thành hệ phân tán vì mỗi tác vụ có ngăn xếp riêng.", "Hệ phân tán có nhiều nút xử lý trao đổi qua giao tiếp, không chỉ nhiều tác vụ trên một lõi."),
      distractor("Các nút phân tán có thể dùng định dạng và thời gian truyền khác nhau vì ứng dụng phía trên tự suy ra dữ liệu nhận được.", "Các nút cần thống nhất giao thức, timing và xử lý lỗi."),
      distractor("Phân tán chức năng làm truyền thông không còn là điểm lỗi vì mỗi nút có thể hoạt động độc lập hoàn toàn.", "Mạng và đồng bộ trở thành phần quan trọng, có thể tạo lỗi toàn hệ."),
    ],
    "mô hình OSI trong truyền thông": [
      distractor("Mỗi lớp OSI phải biết chi tiết phần cứng của mọi lớp dưới để tự điều khiển đường truyền vật lý.", "Phân lớp nhằm che giấu chi tiết và cung cấp dịch vụ qua giao diện."),
      distractor("Số lớp quyết định trực tiếp tốc độ bit; bỏ một lớp sẽ luôn làm đường truyền vật lý nhanh hơn.", "Tốc độ vật lý không suy ra đơn giản từ số lớp mô hình."),
      distractor("Các phần đầu gói chỉ xuất hiện ở lớp ứng dụng, còn lớp liên kết và mạng truyền nguyên payload không thêm thông tin điều khiển.", "Nhiều lớp thêm header riêng để thực hiện nhiệm vụ của lớp đó."),
    ],
    "tính chuyên dụng": [
      distractor("Tính chuyên dụng nghĩa là phần cứng chỉ chạy được một chuỗi lệnh cố định và không thể cập nhật firmware.", "Chuyên dụng nói về nhiệm vụ mục tiêu, không cấm cập nhật cách thực hiện."),
      distractor("Hai sản phẩm dùng cùng MCU có thể dùng chung firmware mà không cần sửa vì tính chuyên dụng nằm hoàn toàn ở phần cứng.", "Firmware còn phụ thuộc cảm biến, I/O, timing và chức năng sản phẩm."),
      distractor("Một hệ có nhiều chế độ vận hành không còn là chuyên dụng vì tính chuyên dụng chỉ cho phép đúng một trạng thái.", "Một sản phẩm chuyên dụng vẫn có thể có nhiều chế độ phục vụ cùng nhóm nhiệm vụ."),
    ],
    "lõi hệ thống": [
      distractor("Lõi hệ thống chỉ được xác định bởi tần số CPU; bộ nhớ, ngoại vi và cấu trúc logic không ảnh hưởng khả năng xử lý.", "Năng lực lõi phụ thuộc kiến trúc và cách kết nối các tài nguyên liên quan."),
      distractor("FPGA không thể làm lõi hệ nhúng vì không thực thi tập lệnh giống vi điều khiển.", "FPGA có thể triển khai logic điều khiển hoặc lõi xử lý mềm."),
      distractor("Chọn cùng một loại lõi cho mọi ứng dụng giúp giảm rủi ro hơn việc xét yêu cầu tín hiệu, năng lượng và sản lượng.", "Loại lõi phải phù hợp yêu cầu; không có lựa chọn tối ưu cho mọi bài toán."),
    ],
    "phân chia phần cứng và phần mềm": [
      distractor("Đưa chức năng sang phần mềm luôn giảm thời gian đáp ứng vì phần mềm dễ thay đổi hơn logic phần cứng.", "Tính linh hoạt không đồng nghĩa tốc độ; phần mềm có overhead thực thi."),
      distractor("Chức năng cần thay đổi sau triển khai nên đặt hoàn toàn trong phần cứng cố định để tránh lỗi cập nhật.", "Phần cứng cố định khó thay đổi; phần mềm thường linh hoạt hơn."),
      distractor("Việc phân chia chỉ ảnh hưởng tổ chức nhóm phát triển, không làm thay đổi năng lượng, chi phí hay khả năng kiểm thử.", "Phân chia tác động trực tiếp kiến trúc và các đánh đổi kỹ thuật."),
    ],
    "độ tin cậy và môi trường làm việc": [
      distractor("Kiểm thử ở điều kiện phòng đủ chứng minh độ tin cậy nếu linh kiện đều hoạt động trong dải điện áp danh định.", "Cần kiểm thử nhiệt độ, nhiễu, rung, sai nối và các điều kiện biên liên quan."),
      distractor("Watchdog và cơ chế phục hồi chỉ cần cho phần mềm thử nghiệm; sản phẩm hoàn thiện không còn nguy cơ treo.", "Lỗi tạm thời và điều kiện môi trường vẫn có thể làm hệ treo khi vận hành."),
      distractor("Tăng độ tin cậy chỉ cần chọn linh kiện đắt hơn, không cần xem xét PCB, nguồn, firmware hoặc quy trình kiểm thử.", "Độ tin cậy phụ thuộc toàn bộ hệ thống và quy trình."),
    ],
    "mô hình lớp của hệ thống nhúng": [
      distractor("Ứng dụng nên truy cập trực tiếp mọi thanh ghi để bỏ overhead, vì lớp driver và middleware không giúp kiểm soát phụ thuộc phần cứng.", "Các lớp giúp cô lập thay đổi, quản lý truy cập và tái sử dụng phần mềm."),
      distractor("Middleware thay thế driver nên có thể điều khiển chân I/O mà không cần lớp phần mềm hệ thống.", "Middleware cung cấp dịch vụ mức cao hơn và vẫn dựa vào driver hoặc hệ điều hành."),
      distractor("Phân lớp yêu cầu mỗi lớp hoạt động độc lập, không được sử dụng dịch vụ của lớp dưới.", "Lớp trên dùng giao diện do lớp dưới cung cấp; mục tiêu là giới hạn phụ thuộc, không loại bỏ quan hệ."),
    ],
    "giao thức và chuẩn truyền thông": [
      distractor("Hai thiết bị dùng cùng mức điện và tốc độ bit có thể trao đổi mà không cần thống nhất khung, thứ tự bit hoặc cơ chế xác nhận.", "Điều kiện điện chưa đủ; hai bên còn phải dùng cùng giao thức và định dạng dữ liệu."),
      distractor("Chuẩn chỉ mô tả đầu nối vật lý, còn mức điện và timing luôn do ứng dụng tự thỏa thuận sau khi kết nối.", "Chuẩn có thể quy định cả đặc tính điện, timing và thủ tục giao tiếp."),
      distractor("Giao thức chỉ cần ở mạng nhiều nút; kết nối điểm-điểm có thể suy ra ý nghĩa từng bit mà không có quy ước chung.", "Ngay cả point-to-point cũng cần thống nhất tốc độ, khung và ý nghĩa dữ liệu."),
    ],
    "bit rate và baud rate": [
      distractor("Baud rate là số byte dữ liệu hữu ích mỗi giây sau khi đã bỏ header và thời gian chờ.", "Baud rate là số ký hiệu trên giây, không phải thông lượng byte hữu ích."),
      distractor("Bit rate và baud rate chỉ khác đơn vị viết; mỗi ký hiệu luôn biểu diễn đúng tám bit dữ liệu.", "Số bit trên ký hiệu phụ thuộc phương pháp mã hóa hoặc điều chế."),
      distractor("Khi mỗi ký hiệu mang nhiều bit, baud rate phải lớn hơn bit rate để truyền đủ thông tin.", "Nếu một ký hiệu mang nhiều bit thì bit rate có thể lớn hơn baud rate."),
    ],
    "đường truyền cân bằng": [
      distractor("Bộ thu cân bằng cộng điện áp hai dây, nên nhiễu đồng pha xuất hiện trên cả hai dây được khuếch đại cùng tín hiệu.", "Bộ thu vi sai lấy hiệu hai dây, nhờ đó giảm thành phần đồng pha."),
      distractor("Chỉ cần dùng hai dây là có truyền cân bằng, dù hai dây có trở kháng và đường đi rất khác nhau.", "Hai nhánh cần có đặc tính tương xứng để nhiễu ghép gần giống nhau."),
      distractor("Truyền cân bằng loại bỏ nhu cầu kiểm soát common-mode vì bộ thu chỉ quan tâm chênh lệch ở mọi điện áp.", "Bộ thu vẫn có dải điện áp common-mode cho phép."),
    ],
    "kiểu kết nối truyền thông": [
      distractor("Point-to-point có nhiều nút cùng chia sẻ bus, nhưng chỉ hai nút được cấp địa chỉ tại một thời điểm.", "Point-to-point là liên kết trực tiếp giữa hai đầu."),
      distractor("Multi-drop không cần cơ chế quyền phát vì mỗi nút dùng một dây dữ liệu riêng tới tất cả nút còn lại.", "Các nút dùng chung đường truyền nên cần quy tắc truy cập hoặc một bộ phát chủ động tại một thời điểm."),
      distractor("Multi-point và point-to-point khác nhau chủ yếu ở tốc độ baud, không phải số nút hoặc cách dùng chung đường truyền.", "Khác biệt nằm ở cấu trúc kết nối và quyền trao đổi giữa các nút."),
    ],
    "truyền đồng bộ và bất đồng bộ": [
      distractor("Truyền bất đồng bộ cần một đường clock riêng liên tục; bit START và STOP chỉ dùng để kiểm tra lỗi.", "Bất đồng bộ thường không truyền clock riêng và dùng START/STOP để đồng bộ khung."),
      distractor("Truyền đồng bộ phải thêm START và STOP cho từng byte, còn clock chỉ dùng khi bus ở trạng thái rỗi.", "Truyền đồng bộ dựa vào clock hoặc cơ chế đồng bộ liên tục, không bắt buộc khung UART."),
      distractor("Hai bên bất đồng bộ có thể dùng tốc độ baud khác đáng kể vì mỗi byte tự chứa đầy đủ thông tin thời gian.", "Tốc độ phải đủ gần nhau để bộ thu lấy mẫu đúng các bit trong khung."),
    ],
    "throughput và bandwidth": [
      distractor("Throughput bằng tốc độ danh nghĩa của đường truyền vì header, ACK và truyền lại không chiếm thời gian trên kênh.", "Phần phụ trội và lỗi làm thông lượng hữu ích thấp hơn tốc độ danh nghĩa."),
      distractor("Bandwidth là số byte ứng dụng nhận thành công trong một giây, còn throughput chỉ mô tả dải tần analog.", "Hai khái niệm đã bị đảo: throughput là kết quả thực tế, bandwidth là khả năng hoặc dải của kênh."),
      distractor("Tăng bandwidth luôn làm throughput tăng cùng tỷ lệ, dù bộ xử lý, giao thức hoặc tỉ lệ lỗi đang là nút thắt.", "Thông lượng có thể bị giới hạn bởi nhiều thành phần ngoài băng thông kênh."),
    ],
    "simplex, half-duplex và full-duplex": [
      distractor("Half-duplex cho phép hai bên phát đồng thời nhưng dùng hai khung khác nhau để tránh xung đột trên cùng đường dây.", "Half-duplex truyền hai chiều luân phiên, không đồng thời."),
      distractor("Full-duplex chỉ cần một chiều vật lý vì phía nhận có thể suy ra dữ liệu phản hồi từ dữ liệu đã phát.", "Full-duplex cần khả năng truyền và nhận đồng thời qua các đường hoặc kênh phù hợp."),
      distractor("Simplex và half-duplex tương đương nếu bên nhận có thể gửi ACK sau mỗi khung.", "Khi bên nhận gửi ACK thì liên kết đã có trao đổi hai chiều luân phiên, không còn simplex thuần túy."),
    ],
    "single-ended và differential": [
      distractor("Single-ended đo chênh lệch giữa hai dây tín hiệu đối nghịch, còn differential đo từng dây so với mass chung.", "Hai khái niệm đã bị đảo vai trò."),
      distractor("Differential chỉ chống nhiễu khi hai dây nhận nhiễu khác nhau hoàn toàn; nhiễu giống nhau sẽ xuất hiện nguyên vẹn ở đầu ra.", "Nhiễu giống nhau là common-mode và có xu hướng bị loại khi lấy hiệu."),
      distractor("Dùng truyền vi sai cho phép bỏ qua dải common-mode và chênh lệch mass vì bộ thu không có giới hạn điện áp đầu vào.", "Bộ thu vi sai vẫn có dải common-mode và giới hạn bảo vệ."),
    ],
    "inter-system và intra-system": [
      distractor("Intra-system là giao tiếp qua mạng giữa các thiết bị độc lập, còn inter-system chỉ dùng giữa các IC trên cùng bo.", "Hai phạm vi đã bị đảo: intra ở trong hệ, inter giữa các hệ."),
      distractor("Giao tiếp trong cùng hệ không cần xét timing hoặc mức điện vì khoảng cách ngắn loại bỏ mọi sai khác phần cứng.", "Khoảng cách ngắn vẫn phải thỏa timing, fan-out và mức logic."),
      distractor("Giao tiếp giữa các hệ có thể dùng trực tiếp mức logic nội bộ mà không cần xét cáp, mass, bảo vệ hoặc chuyển mức.", "Kết nối ra ngoài thường đòi hỏi xử lý các điều kiện điện và môi trường khắt khe hơn."),
    ],
    "DSP, FPGA và ASIC": [
      distractor("DSP phù hợp nhất khi cần triển khai logic song song mức cổng và thay đổi trực tiếp cấu trúc phần cứng trong lúc chạy.", "DSP thực thi chương trình; FPGA mới phù hợp hơn với logic song song có thể cấu hình ở mức phần cứng."),
      distractor("FPGA có chi phí phát triển thấp nhất ở mọi sản lượng vì cấu hình của nó được cố định ngay khi chế tạo như ASIC.", "FPGA cấu hình lại được; ASIC mới có cấu trúc cố định và thường chỉ kinh tế khi sản lượng đủ lớn."),
      distractor("ASIC phù hợp giai đoạn thử nghiệm thuật toán vì có thể cập nhật cấu trúc sau khi sản phẩm đã được chế tạo.", "ASIC khó thay đổi sau chế tạo, nên không phải lựa chọn linh hoạt cho giai đoạn thử nghiệm."),
    ],
    "EMC, phát xạ và miễn nhiễm": [
      distractor("Thiết bị đạt yêu cầu EMC khi không tự treo, dù mức nhiễu phát ra có thể làm thiết bị lân cận hoạt động sai.", "EMC gồm cả giới hạn phát xạ và khả năng miễn nhiễm, không chỉ việc thiết bị tự hoạt động."),
      distractor("Chỉ cần giảm nhiễu phát xạ; khả năng chịu nhiễu bên ngoài không thuộc đánh giá tương thích điện từ.", "Miễn nhiễm trước nhiễu bên ngoài là một nửa quan trọng của EMC."),
      distractor("Một lớp vỏ che chắn đủ để bảo đảm EMC mà không cần kiểm tra cáp, nguồn, khe hở và đường hồi dòng.", "Nhiễu còn có thể đi qua cáp, nguồn và các đường dẫn khác; che chắn không phải giải pháp độc lập."),
    ],
    "IC đệm bảo vệ": [
      distractor("IC đệm làm mọi chân MCU chịu được điện áp ngoài dải nguồn miễn là dòng tải ở trạng thái ổn định đủ nhỏ.", "Điện áp cho phép vẫn bị giới hạn bởi thông số của IC đệm và các phần tử bảo vệ liên quan."),
      distractor("IC đệm tạo cách ly điện hoàn toàn giữa hai miền nguồn giống bộ cách ly số, dù hai phía vẫn dùng chung mass.", "Đệm logic không mặc nhiên tạo cách ly galvanic."),
      distractor("Khi đã có IC đệm, có thể bỏ phần tử kẹp xung ở cổng ngoài vì năng lượng ESD sẽ được hấp thụ trong chân vào đệm.", "IC đệm không thay thế TVS hoặc mạng hạn dòng khi có xung năng lượng lớn."),
    ],
    "NOR Flash và NAND Flash": [
      distractor("NAND Flash thuận lợi hơn NOR cho thực thi mã trực tiếp vì hỗ trợ truy cập ngẫu nhiên từng byte với độ trễ thấp hơn.", "NOR thường thuận lợi hơn cho truy cập ngẫu nhiên và mã khởi động; NAND thiên về lưu trữ theo khối."),
      distractor("NOR Flash có mật độ lưu trữ cao hơn NAND nên là lựa chọn ưu tiên cho dữ liệu dung lượng lớn theo khối.", "NAND thường đạt mật độ cao hơn và phù hợp lưu trữ khối lượng lớn."),
      distractor("Có thể thay trực tiếp NOR bằng NAND mà không thay đổi bộ điều khiển, cơ chế sửa lỗi hoặc cách truy cập dữ liệu.", "Hai công nghệ khác đáng kể về giao tiếp, tổ chức trang/khối và yêu cầu quản lý lỗi."),
    ],
    "RISC và CISC": [
      distractor("Một lõi RISC chắc chắn nhanh hơn lõi CISC nếu có ít loại lệnh hơn, không cần xét CPI, bộ nhớ hay trình biên dịch.", "Hiệu năng phải xét toàn hệ thống và chương trình thực tế, không suy ra chỉ từ số loại lệnh."),
      distractor("CISC không thể dùng đường ống lệnh vì độ dài lệnh biến đổi làm mọi giai đoạn xử lý phải chạy tuần tự.", "CISC vẫn có thể dùng pipeline; phần giải mã phức tạp hơn không đồng nghĩa không thể triển khai."),
      distractor("Mật độ mã là tiêu chí đủ để kết luận mức tiêu thụ năng lượng của một kiến trúc tập lệnh.", "Năng lượng còn phụ thuộc số lệnh thực thi, truy cập nhớ, vi kiến trúc, điện áp và tần số."),
    ],
    "ROM, EPROM và EEPROM": [
      distractor("EPROM và EEPROM đều được xóa điện theo từng byte ngay trên bo mạch nên khác nhau chủ yếu ở dung lượng.", "EPROM truyền thống được xóa bằng tia cực tím, còn EEPROM xóa ghi bằng điện."),
      distractor("EEPROM có tốc độ và độ bền ghi tương đương SRAM nên phù hợp lưu mọi biến thay đổi liên tục khi chương trình chạy.", "EEPROM ghi chậm hơn và có giới hạn chu kỳ ghi, không thay thế RAM cho dữ liệu thay đổi nhanh."),
      distractor("Các loại ROM đều cho phép ứng dụng ghi lại nội dung bằng cùng một lệnh phần mềm trong quá trình vận hành.", "Khả năng lập trình và xóa khác nhau giữa MROM, EPROM, EEPROM và Flash."),
    ],
    "SRAM và DRAM": [
      distractor("DRAM truy cập nhanh hơn SRAM vì mỗi ô nhớ dùng tụ điện và không cần chu kỳ làm tươi.", "DRAM cần làm tươi; SRAM thường nhanh hơn nhờ dùng mạch chốt."),
      distractor("SRAM đạt mật độ cao hơn DRAM vì mỗi bit chỉ cần một transistor và một tụ lưu điện tích.", "Cấu trúc một transistor và một tụ là đặc trưng của DRAM; SRAM dùng nhiều transistor hơn."),
      distractor("Cả SRAM và DRAM đều giữ nguyên dữ liệu khi mất nguồn, khác nhau chủ yếu ở cách định địa chỉ.", "SRAM và DRAM thông thường đều là bộ nhớ bay hơi."),
    ],
    "TVS và Zener": [
      distractor("Chỉ cần chọn điện áp danh định thấp nhất; điện áp kẹp, điện dung và năng lượng xung không ảnh hưởng đường tín hiệu.", "Chọn linh kiện bảo vệ phải xét điện áp làm việc, điện áp kẹp, năng lượng xung và điện dung."),
      distractor("Zener tín hiệu nhỏ hấp thụ ESD tốt hơn TVS chuyên dụng vì có đặc tuyến đánh thủng dùng cho mọi loại xung.", "TVS được tối ưu cho xung nhanh và năng lượng xung; Zener thường không thay thế trực tiếp trong mọi trường hợp."),
      distractor("TVS và Zener có đặc tính động giống nhau nên có thể hoán đổi mà không cần kiểm tra bảng thông số.", "Điện áp kẹp, công suất xung, điện dung và tốc độ đáp ứng có thể khác đáng kể."),
    ],
    "Von Neumann và Harvard": [
      distractor("Kiến trúc Harvard dùng chung một bus cho lệnh và dữ liệu để giảm số lần truy cập bộ nhớ.", "Harvard tách đường hoặc không gian lệnh và dữ liệu."),
      distractor("Von Neumann tránh được nghẽn truy cập vì lõi có thể luôn đọc lệnh và dữ liệu đồng thời trên cùng một bus.", "Dùng chung đường truy cập có thể tạo nghẽn giữa việc lấy lệnh và truy cập dữ liệu."),
      distractor("Hai kiến trúc chỉ khác cách đặt tên vùng nhớ, không ảnh hưởng đường ống lệnh hoặc tổ chức truy cập.", "Cách tổ chức bus và không gian nhớ ảnh hưởng trực tiếp khả năng truy cập song song."),
    ],
    "assembler, linker và loader": [
      distractor("Bộ liên kết dịch cú pháp C thành mã máy, còn trình biên dịch chỉ ghép thư viện vào địa chỉ cuối.", "Trình biên dịch xử lý mã nguồn; bộ liên kết ghép tệp đối tượng và giải quyết tham chiếu."),
      distractor("Bộ nạp giải quyết mọi ký hiệu chưa định nghĩa giữa các tệp sau khi chương trình đã được đưa vào MCU.", "Ký hiệu giữa các tệp phải được giải quyết ở bước liên kết trước khi nạp."),
      distractor("Trình hợp dịch chịu trách nhiệm bố trí toàn bộ tệp đối tượng và thư viện vào bản đồ nhớ cuối cùng.", "Trình hợp dịch tạo mã đối tượng; bộ liên kết mới bố trí các phần và thư viện."),
    ],
    "bootloader": [
      distractor("Có thể kích hoạt ảnh mới ngay khi nhận đủ số byte; kiểm tra toàn vẹn thực hiện sau lần khởi động đầu tiên.", "Ảnh cần được kiểm tra trước khi kích hoạt để tránh khởi động vào firmware hỏng."),
      distractor("Nên xóa ảnh đang chạy trước khi tải ảnh mới để bảo đảm không còn xung đột giữa hai phiên bản.", "Xóa ảnh tốt trước khi xác nhận ảnh mới có thể làm thiết bị mất khả năng phục hồi."),
      distractor("Bootloader chỉ chuyển tiếp giao diện người dùng, còn quyết định ảnh khởi động luôn do ứng dụng chưa chạy thực hiện.", "Bootloader chạy trước ứng dụng và chịu trách nhiệm chọn, kiểm tra hoặc nạp ảnh khởi động."),
    ],
    "bảo vệ dòng cấp và dòng hút": [
      distractor("Có thể nối trực tiếp tải nếu dòng trung bình nhỏ hơn giới hạn chân, dù dòng khởi động vượt giới hạn trong thời gian ngắn.", "Dòng đỉnh và dòng khởi động vẫn có thể làm hỏng chân hoặc gây sụt nguồn."),
      distractor("Chỉ cần kiểm tra giới hạn từng chân; tổng dòng của cổng và toàn vi điều khiển không ảnh hưởng độ an toàn.", "Datasheet thường quy định cả giới hạn từng chân, từng cổng và tổng dòng."),
      distractor("Tầng driver ngoài làm tăng dòng đi qua chân MCU vì toàn bộ dòng tải vẫn phải chạy qua tín hiệu điều khiển.", "Driver tách dòng tải khỏi chân điều khiển; MCU chỉ cấp dòng điều khiển nhỏ."),
    ],
    "bộ nhớ Flash": [
      distractor("Flash cho phép xóa độc lập từng byte nên ghi nhật ký liên tục không gây khuếch đại ghi hoặc mài mòn.", "Flash thường xóa theo trang hoặc khối và có giới hạn chu kỳ ghi xóa."),
      distractor("Số lần ghi xóa không cần quản lý nếu mỗi bản ghi nhỏ hơn một trang bộ nhớ.", "Mài mòn phụ thuộc chu kỳ xóa của trang hoặc khối, không chỉ kích thước bản ghi."),
      distractor("Khi mất nguồn giữa lúc ghi Flash, ô nhớ hoặc cấu trúc dữ liệu luôn trở về giá trị cũ hợp lệ.", "Mất nguồn có thể để lại dữ liệu dở dang, nên cần cơ chế ghi an toàn hoặc phục hồi."),
    ],
    "bộ nhớ chương trình và bộ nhớ dữ liệu": [
      distractor("Mã chương trình nên đặt trong RAM bay hơi để giữ nguyên sau khi tắt nguồn, còn biến tạm nên đặt trong ROM.", "RAM không giữ dữ liệu khi mất nguồn; ROM/Flash phù hợp hơn cho mã chương trình."),
      distractor("Biến thay đổi nhanh nên ghi trực tiếp vào Flash vì Flash có tốc độ ghi và độ bền tương đương RAM.", "Flash ghi chậm hơn và có giới hạn ghi xóa; RAM phù hợp dữ liệu thay đổi khi chạy."),
      distractor("Bộ nhớ chương trình và dữ liệu có cùng yêu cầu về tính bay hơi, tốc độ ghi và số chu kỳ truy cập.", "Hai nhóm có yêu cầu khác nhau về lưu giữ và tốc độ đọc ghi."),
    ],
    "chia áp và kẹp áp cho đầu vào quá mức": [
      distractor("Chỉ cần tính cầu chia ở điện áp danh định; xung quá áp không cần xét nếu điện áp sau chia thấp hơn VCC.", "Xung và trạng thái lỗi có thể vượt khả năng cầu chia, nên vẫn cần xét kẹp và dòng xung."),
      distractor("Diode kẹp có thể nối trực tiếp với nguồn tín hiệu trở kháng thấp vì đường nguồn sẽ hấp thụ dòng mà không bị ảnh hưởng.", "Cần giới hạn dòng kẹp và kiểm tra khả năng hấp thụ của rail nguồn."),
      distractor("Tăng điện trở chia áp đến giá trị rất lớn luôn cải thiện bảo vệ mà không ảnh hưởng ngưỡng, tốc độ hoặc dòng rò.", "Điện trở lớn tương tác với điện dung, dòng rò và trở vào, có thể làm sai mức hoặc chậm tín hiệu."),
    ],
    "chọn cấu trúc mạch bảo vệ đầu vào": [
      distractor("Ưu tiên mạng RC có hằng số thời gian lớn nhất để chặn mọi nhiễu, kể cả khi xung dữ liệu hợp lệ bị suy giảm.", "Mạch bảo vệ phải giữ được băng thông và độ rộng xung hợp lệ."),
      distractor("Dùng một diode Zener đặt xa đầu nối là đủ cho đường ngoài dài, không cần kiểm soát đường xả ESD hoặc dòng kẹp.", "Vị trí, đường xả và hạn dòng quyết định hiệu quả bảo vệ xung."),
      distractor("Chọn IC cách ly cho mọi đầu vào nội bộ ngắn vì cách ly luôn có điện dung thấp và độ trễ nhỏ hơn mạch đệm.", "Cách ly có chi phí, độ trễ và băng thông riêng; không phải lựa chọn mặc định cho mọi đường."),
    ],
    "chọn dây truyền tín hiệu": [
      distractor("Dùng dây đơn và tách xa đường hồi dòng để giảm điện dung, dù diện tích vòng tín hiệu tăng đáng kể.", "Diện tích vòng lớn làm tăng ghép cảm ứng và phát xạ."),
      distractor("Dùng cáp có lớp chắn nhưng để lớp chắn không nối ở bất kỳ đầu nào để tránh mọi dòng trên lớp chắn.", "Lớp chắn cần cách nối phù hợp mới tạo đường dẫn nhiễu hiệu quả."),
      distractor("Đi song song sát dây công suất để hai đường nhận cùng nhiễu và tự triệt tại đầu vào một dây tham chiếu mass.", "Tín hiệu single-ended không tự triệt nhiễu chung; đi gần dây công suất làm tăng ghép."),
    ],
    "compiler và tối ưu hóa": [
      distractor("Mức tối ưu cao phải giữ thứ tự và số lệnh tương ứng từng dòng C, nên không thể làm thay đổi thời điểm truy cập I/O.", "Tối ưu hóa có thể sắp xếp, gộp hoặc loại lệnh nếu ngữ nghĩa ngôn ngữ cho phép."),
      distractor("Nếu chương trình chỉ lỗi ở mức tối ưu cao thì nguyên nhân chắc chắn nằm trong trình biên dịch, không cần kiểm tra hành vi không xác định.", "Lỗi mã, race condition hoặc khai báo thiếu volatile thường chỉ lộ ra khi tối ưu."),
      distractor("Tối ưu kích thước chỉ ảnh hưởng tên ký hiệu gỡ lỗi, không thay đổi bố trí mã hoặc cách sử dụng bộ nhớ.", "Tối ưu kích thước thay đổi mã sinh ra, bố trí và đôi khi cả thời gian thực thi."),
    ],
    "các họ chip nhúng phổ biến": [
      distractor("AVR, STM32 và ESP32 có thể xem là tương đương nếu cùng tần số xung nhịp, vì ngoại vi và kiến trúc không ảnh hưởng lựa chọn.", "Các họ khác nhau về kiến trúc, mức tích hợp, kết nối và miền ứng dụng."),
      distractor("ESP32 chủ yếu là bộ thu phát không dây nên mọi xử lý ứng dụng phải do một MCU ngoài thực hiện.", "ESP32 tích hợp lõi xử lý cùng Wi-Fi/Bluetooth và nhiều ngoại vi."),
      distractor("STM32 là một model chip cố định; biết một cấu hình là đủ suy ra bộ nhớ và ngoại vi của toàn bộ họ.", "STM32 là họ sản phẩm rất rộng với cấu hình và miền ứng dụng khác nhau."),
    ],
    "các loại lõi xử lý": [
      distractor("Lõi có tần số cao nhất là lựa chọn tối ưu vì loại kiến trúc và mức tích hợp không ảnh hưởng thời gian thực hay năng lượng.", "Cần đánh giá kiến trúc, ngoại vi, CPI, năng lượng và yêu cầu ứng dụng."),
      distractor("FPGA và ASIC đều chạy chuỗi lệnh như MCU; khác biệt chính chỉ là dung lượng bộ nhớ chương trình.", "FPGA/ASIC triển khai logic phần cứng, khác cơ bản với lõi thực thi lệnh."),
      distractor("DSP phù hợp hơn MCU cho mọi tác vụ điều khiển đơn giản vì phép toán tín hiệu luôn chiếm toàn bộ thời gian xử lý.", "DSP có lợi cho xử lý tín hiệu chuyên sâu, nhưng không mặc nhiên tối ưu cho mọi điều khiển."),
    ],
    "cáp xoắn": [
      distractor("Xoắn dây làm tăng diện tích vòng hiệu dụng để nhiễu cảm ứng phân bố đều hơn trên toàn chiều dài cáp.", "Xoắn dây làm giảm diện tích các vòng nhỏ và đảo chiều ghép nhiễu liên tiếp."),
      distractor("Cáp xoắn loại bỏ hoàn toàn nhiễu mà không cần bộ thu vi sai, bố trí đường hồi hoặc kiểm tra môi trường truyền.", "Cáp xoắn giảm ghép nhưng không thay thế toàn bộ các biện pháp khác."),
      distractor("Lợi ích chính của cáp xoắn là giảm điện trở DC; khả năng triệt nhiễu không phụ thuộc hình học vòng dây.", "Tác dụng chống nhiễu chủ yếu đến từ hình học vòng và khả năng triệt ghép cảm ứng."),
    ],
    "công suất động và năng lượng": [
      distractor("Tăng tần số luôn rút ngắn thời gian chạy đủ nhiều để năng lượng mỗi nhiệm vụ giảm, dù điện áp và chuyển mạch giữ nguyên.", "Năng lượng phụ thuộc cả công suất tăng theo tần số và thời gian chạy; không thể kết luận một chiều."),
      distractor("Dòng ngủ quyết định toàn bộ thời lượng pin, nên có thể bỏ qua thời gian hoạt động và dòng của ngoại vi khi thức.", "Dòng trung bình phải tính theo thời gian của mọi chế độ và mọi khối hoạt động."),
      distractor("Giảm điện áp không ảnh hưởng giới hạn tần số, ngưỡng ngoại vi hoặc độ ổn định nên có thể áp dụng độc lập.", "Điện áp thấp có thể giới hạn tần số và ảnh hưởng các miền điện hoặc độ ổn định."),
    ],
    "decoupling và nguồn tham chiếu": [
      distractor("Đặt một tụ lớn ở đầu vào nguồn đủ thay thế tụ nhỏ gần từng IC vì đường mạch in không có cảm kháng ở cạnh nhanh.", "Đường mạch có cảm kháng; tụ gần IC mới cấp dòng chuyển mạch cục bộ hiệu quả."),
      distractor("Vref chỉ đặt thang đo danh nghĩa, nên nhiễu trên Vref không xuất hiện trong kết quả ADC nếu Vin ổn định.", "Nhiễu Vref trực tiếp làm thay đổi ngưỡng lượng tử và mã ADC."),
      distractor("Có thể dùng chung đường hồi dòng tải công suất với Vref nếu hai đường cùng nối về một điểm mass trên sơ đồ nguyên lý.", "Trở kháng thực của đường hồi có thể ghép nhiễu tải vào tham chiếu dù cùng tên mass."),
    ],
    "diode kẹp áp": [
      distractor("Diode kẹp tự giới hạn dòng xung nên có thể nối trực tiếp nguồn trở kháng thấp vào chân bảo vệ.", "Diode kẹp cần phần tử hạn dòng hoặc trở nguồn đủ lớn để không quá dòng."),
      distractor("Chọn điện áp dẫn thấp nhất sẽ bảo vệ tốt nhất mà không cần xét dòng rò hoặc làm méo tín hiệu trong dải hợp lệ.", "Điện áp dẫn, dòng rò và điện dung phải phù hợp dải tín hiệu."),
      distractor("Dòng kẹp đưa vào rail nguồn không ảnh hưởng các mạch khác vì bộ nguồn luôn hấp thụ được dòng ngược.", "Rail nguồn có thể bị nâng áp nếu không có đường hấp thụ dòng kẹp."),
    ],
    "firmware nhúng": [
      distractor("Firmware có thể giữ nguyên khi đổi chân và ngoại vi nếu thuật toán ứng dụng không thay đổi.", "Firmware còn chứa lớp truy cập phần cứng, nên đổi bo mạch có thể yêu cầu sửa và kiểm thử lại."),
      distractor("Firmware chỉ quản lý giao diện người dùng; việc đọc cảm biến và điều khiển cơ cấu chấp hành do phần cứng tự quyết định.", "Firmware thường trực tiếp cấu hình và điều khiển cảm biến, I/O cùng cơ cấu chấp hành."),
      distractor("Kiểm thử firmware trên mô phỏng đủ thay thế kiểm thử bo mạch thật vì thời gian và nhiễu phần cứng không ảnh hưởng hành vi.", "Nhiều lỗi chỉ xuất hiện với phần cứng, timing và môi trường thật."),
    ],
    "ghép cảm ứng từ": [
      distractor("Tách đường tín hiệu và đường hồi xa nhau giúp từ thông móc qua hai dây cân bằng hơn và giảm điện áp nhiễu.", "Tách xa làm tăng diện tích vòng và thường tăng ghép cảm ứng."),
      distractor("Ghép cảm ứng chủ yếu do điện áp DC cao; tốc độ thay đổi dòng ở đường gây nhiễu không ảnh hưởng.", "Từ trường biến thiên do di/dt mới là nguyên nhân quan trọng của điện áp cảm ứng."),
      distractor("Tăng diện tích vòng nhận giúp điện áp nhiễu phân bố trên diện tích lớn hơn nên biên độ tại đầu thu giảm.", "Từ thông móc vòng tăng theo diện tích, nên điện áp nhiễu thường tăng."),
    ],
    "ghép điện dung": [
      distractor("Đặt hai đường chạy song song gần nhau làm điện trường khép kín giữa chúng và giảm dòng nhiễu sang đường nhận.", "Gần và song song lâu làm tăng điện dung ký sinh và dòng ghép."),
      distractor("Ghép điện dung chỉ phụ thuộc dòng DC của đường gây nhiễu, không phụ thuộc tốc độ thay đổi điện áp.", "Dòng ghép điện dung tăng theo dv/dt và điện dung ký sinh."),
      distractor("Tăng trở kháng nút nhận làm dòng ghép dễ thoát xuống mass hơn nên điện áp nhiễu giảm.", "Nút trở kháng cao thường nhạy hơn vì cùng dòng ghép tạo điện áp nhiễu lớn hơn."),
    ],
    "grounding và dòng hồi tiếp": [
      distractor("Các điểm mass trên bo mạch có cùng tên nên điện áp của chúng bằng nhau, không cần xét dòng chạy qua đồng mạch in.", "Đường đồng có trở kháng; dòng hồi tạo sụt áp và ghép nhiễu giữa các khối."),
      distractor("Tách đường hồi khỏi đường tín hiệu làm giảm điện dung và vì vậy luôn giảm nhiễu ở mọi tần số.", "Đường hồi xa làm vòng dòng lớn, tăng cảm kháng, phát xạ và ghép từ."),
      distractor("Dòng công suất và tín hiệu analog có thể dùng chung đoạn mass hẹp nếu điểm cuối cùng vẫn nối về cùng nguồn.", "Trở kháng chung làm xung dòng công suất xuất hiện như nhiễu trên tham chiếu analog."),
    ],
    "khởi động an toàn và cập nhật firmware": [
      distractor("Đánh dấu ảnh mới là hợp lệ trước khi ghi để nếu mất nguồn hệ sẽ ưu tiên tiếp tục từ phần ảnh đã có.", "Ảnh chưa hoàn chỉnh không được đánh dấu hợp lệ hoặc chọn khởi động."),
      distractor("Chỉ cần kiểm tra kích thước ảnh; lỗi bit bên trong không ảnh hưởng nếu vector khởi động vẫn đọc được.", "Cần kiểm tra tính toàn vẹn và thường cả tính xác thực của toàn ảnh."),
      distractor("Cơ chế phục hồi không cần thiết nếu bộ nạp khởi động và ứng dụng được biên dịch cùng một công cụ.", "Lỗi truyền, lỗi ghi và mất nguồn vẫn có thể xảy ra độc lập với công cụ build."),
    ],
    "khởi động hệ thống": [
      distractor("Có thể gọi hàm chính trước khi thiết lập ngăn xếp vì trình biên dịch sẽ tạo ngăn xếp sau lần gọi hàm đầu tiên.", "Mã C cần ngăn xếp hợp lệ trước khi gọi hàm và sử dụng biến cục bộ."),
      distractor("Vùng dữ liệu khởi tạo trong RAM tự nhận giá trị từ Flash bằng phần cứng, nên mã startup không cần sao chép.", "Trong nhiều hệ, startup phải sao chép .data và xóa .bss trước khi gọi main."),
      distractor("CPU có thể bắt đầu ở một địa chỉ bất kỳ trong Flash nếu cuối cùng chương trình có chứa hàm main.", "Reset vector hoặc điểm vào xác định nơi CPU bắt đầu thực thi."),
    ],
    "kết hợp nhiều tầng bảo vệ": [
      distractor("Đặt tất cả linh kiện bảo vệ sát chân MCU để năng lượng xung đi qua toàn bộ đường mạch trước khi bị kẹp.", "Phần tử chịu xung đầu tiên nên gần cổng vào để rút ngắn đường xả và giảm năng lượng đi sâu vào bo."),
      distractor("Dùng nhiều tầng có cùng điện áp kẹp và không có phần tử hạn dòng sẽ chia đều năng lượng xung giữa các tầng.", "Phối hợp tầng cần trở kháng và đặc tính kẹp phù hợp; nếu không một phần tử có thể chịu gần như toàn bộ xung."),
      distractor("Một tụ lớn là tầng bảo vệ đủ cho cả quá áp DC, ESD nhanh và chênh lệch mass kéo dài.", "Các loại sự cố khác nhau cần phần tử kẹp, hạn dòng hoặc cách ly phù hợp."),
    ],
    "kỹ thuật tiết kiệm năng lượng": [
      distractor("Giữ CPU chạy vòng lặp chờ ở tần số thấp để tránh thời gian đánh thức, dù khoảng nghỉ dài hơn nhiều thời gian xử lý.", "Với khoảng nghỉ dài, chế độ ngủ và đánh thức bằng sự kiện thường giảm dòng trung bình tốt hơn busy-wait."),
      distractor("Cho CPU ngủ nhưng giữ tất cả ngoại vi và xung nhịp hoạt động để lần đo tiếp theo không cần khởi tạo lại.", "Ngoại vi và clock không dùng vẫn tiêu thụ; cần chỉ giữ các khối thật sự cần cho đánh thức hoặc duy trì trạng thái."),
      distractor("Đánh thức định kỳ với tần suất cao để kiểm tra trạng thái, ngay cả khi phần cứng có thể phát ngắt khi sự kiện xảy ra.", "Polling dày tạo nhiều lần thức không cần thiết; đánh thức bằng ngắt phù hợp hơn khi sự kiện thưa."),
    ],
    "layout analog, digital và công suất": [
      distractor("Tách mặt mass analog thành một đảo không có đường hồi liên tục sẽ ngăn mọi dòng số đi vào vùng analog.", "Khe cắt mass có thể buộc dòng hồi đi vòng lớn và tăng ghép; cần kiểm soát đường hồi thay vì tách tùy ý."),
      distractor("Đặt đường clock sát đầu vào ADC giúp hai tín hiệu có cùng trễ và nhờ đó sai số lấy mẫu giảm.", "Clock cạnh nhanh ghép nhiễu vào đường analog nhạy cảm."),
      distractor("Dòng tải công suất có thể đi chung đường hồi hẹp với Vref nếu tụ lọc nguồn đủ lớn.", "Tụ không loại bỏ sụt áp và ghép qua trở kháng chung của đường hồi."),
    ],
    "lọc RC cho đầu vào": [
      distractor("Chọn hằng số thời gian lớn hơn nhiều độ rộng xung hợp lệ để bảo đảm mọi chuyển mức đều được làm mượt.", "RC quá chậm sẽ làm mất hoặc méo xung hợp lệ."),
      distractor("Tăng tụ lọc chỉ giảm nhiễu, không làm thay đổi thời gian lên xuống hay thời điểm vượt ngưỡng logic.", "Tụ kết hợp với điện trở làm chậm cạnh và thay đổi thời điểm chuyển mức."),
      distractor("Mạch RC giống nhau phù hợp cho nút nhấn và đường clock nhanh miễn là điện áp logic giống nhau.", "Băng thông và độ rộng xung khác nhau đòi hỏi hằng số thời gian khác nhau."),
    ],
    "nhiễu phát xạ": [
      distractor("Tăng tốc độ cạnh giúp tín hiệu rời vùng chuyển mức nhanh hơn nên phổ nhiễu cao tần và phát xạ giảm.", "Cạnh nhanh làm phổ tần rộng hơn và thường tăng phát xạ."),
      distractor("Chỉ cần che chắn phía thu; giảm vòng dòng và nguồn phát trên bo không ảnh hưởng mức phát xạ của thiết bị.", "Giảm nhiễu tại nguồn và đường ghép thường hiệu quả hơn chỉ xử lý phía thu."),
      distractor("Dây dài không ảnh hưởng phát xạ nếu tín hiệu có biên độ logic đúng tại đầu phát.", "Dây dài có thể hoạt động như anten, đặc biệt với cạnh nhanh."),
    ],
    "nhiễu truyền dẫn": [
      distractor("Ưu tiên che chắn vỏ kín mà không cần lọc đường nguồn vì nhiễu đi theo dây sẽ bị vỏ kim loại chặn lại.", "Nhiễu dẫn theo dây cần lọc, tách nguồn hoặc kiểm soát trở kháng chung."),
      distractor("Nối chung thêm nhiều đoạn mass mảnh sẽ giảm trở kháng chung vì mọi đường đều có cùng ký hiệu GND.", "Đường mass dài/mảnh có trở kháng và có thể tạo vòng hoặc ghép nhiễu."),
      distractor("Tăng tụ tại nguồn phát đủ xử lý mọi nhiễu truyền trên dây dài, không cần xét tần số hoặc vị trí lọc.", "Hiệu quả lọc phụ thuộc phổ nhiễu, trở kháng và vị trí linh kiện."),
    ],
    "optocoupler và digital isolator": [
      distractor("Chọn bộ ghép quang chỉ theo điện áp cách ly; băng thông, độ trễ và sự suy giảm theo thời gian không ảnh hưởng tín hiệu số.", "Tốc độ, độ trễ và đặc tính CTR của optocoupler phải phù hợp ứng dụng."),
      distractor("Bộ cách ly số yêu cầu nối chung trực tiếp hai mass để phía nhận có cùng tham chiếu với phía phát.", "Cách ly galvanic nhằm tách hai miền; mỗi phía dùng nguồn và mass riêng."),
      distractor("Optocoupler luôn có độ trễ thấp hơn bộ cách ly số nên phù hợp hơn cho mọi giao tiếp tốc độ cao.", "Nhiều bộ cách ly số có tốc độ và độ trễ tốt hơn optocoupler thông thường."),
    ],
    "phân cấp bộ nhớ": [
      distractor("Dùng toàn bộ nhớ ngoài dung lượng lớn giúp hệ vừa nhanh hơn vừa giảm số chân vì không cần bus truy cập.", "Bộ nhớ ngoài cần bus/chân và thường chậm hơn bộ nhớ gần lõi."),
      distractor("Bộ nhớ gần lõi luôn rẻ hơn trên mỗi bit nên có thể tăng dung lượng mà không ảnh hưởng diện tích chip.", "Bộ nhớ nhanh gần lõi thường đắt và tốn diện tích hơn trên mỗi bit."),
      distractor("Chỉ dung lượng quyết định lựa chọn; độ trễ, năng lượng và băng thông không ảnh hưởng hiệu năng hệ nhúng.", "Phân cấp bộ nhớ là đánh đổi nhiều tiêu chí, không chỉ dung lượng."),
    ],
    "quy trình dịch sang mã máy": [
      distractor("Khi có lỗi không tìm thấy hàm giữa hai tệp, cần sửa cú pháp tiền xử lý vì bộ liên kết không xử lý tham chiếu liên tệp.", "Lỗi ký hiệu liên tệp thường thuộc bước liên kết hoặc cấu hình thư viện."),
      distractor("Có thể nạp từng tệp đối tượng riêng vào MCU; địa chỉ gọi hàm sẽ được CPU tự ghép khi chương trình chạy.", "Địa chỉ và tham chiếu phải được liên kết trước khi tạo ảnh thực thi."),
      distractor("Thư viện được chèn nguyên dạng ở bước tiền xử lý, nên không tham gia bước liên kết.", "Thư viện mã đối tượng được bộ liên kết chọn và ghép vào chương trình."),
    ],
    "shielding": [
      distractor("Lớp chắn không cần nối với điểm tham chiếu nào; chỉ cần vật liệu bao quanh là đủ dẫn nhiễu ra khỏi hệ.", "Cách nối lớp chắn quyết định đường dòng nhiễu và hiệu quả che chắn."),
      distractor("Nối lớp chắn cả hai đầu là lựa chọn đúng cho mọi tần số và mọi hệ, không cần xét vòng mass.", "Cách nối phụ thuộc tần số, cấu trúc hệ và nguy cơ dòng vòng mass."),
      distractor("Che chắn xử lý được nhiễu dẫn theo nguồn nên có thể bỏ lọc tại cổng cáp đi xuyên vỏ.", "Dây đi xuyên lớp chắn vẫn mang nhiễu dẫn; cần xử lý tại điểm xuyên vỏ."),
    ],
    "thiết kế mạch bảo vệ quá áp đơn giản": [
      distractor("Chọn điện trở lớn nhất có thể để hạn dòng, không cần kiểm tra thời gian lên xuống và dòng rò của chân vào.", "Điện trở quá lớn có thể làm sai ngưỡng và chậm tín hiệu."),
      distractor("Chỉ dùng tụ xuống mass để biến mọi quá áp DC và xung dài thành mức logic an toàn.", "Tụ không kẹp được quá áp DC và có thể chỉ làm chậm biến thiên."),
      distractor("Đặt diode kẹp nhưng bỏ điện trở hạn dòng vì diode sẽ tự điều chỉnh dòng theo mức điện áp MCU cho phép.", "Diode kẹp không tự giới hạn dòng; cần trở nguồn hoặc điện trở nối tiếp phù hợp."),
    ],
    "tiền xử lý": [
      distractor("Biên dịch có điều kiện được quyết định sau bước liên kết, nên thay đổi macro không làm thay đổi mã đưa vào compiler.", "Tiền xử lý chạy trước compiler và có thể loại hoặc thêm cả khối mã."),
      distractor("Macro có kiểu dữ liệu và phạm vi như hàm C, nên tham số luôn chỉ được đánh giá một lần.", "Macro là thay thế văn bản và có thể đánh giá tham số nhiều lần nếu viết không cẩn thận."),
      distractor("Tệp tiêu đề được nạp vào MCU lúc chạy; thiếu header không ảnh hưởng quá trình biên dịch.", "Header được chèn ở bước tiền xử lý và cung cấp khai báo cho compiler."),
    ],
    "tối ưu mã trong firmware": [
      distractor("Có thể đưa mọi phép tính ra khỏi vòng lặp nếu biểu thức giống nhau về mặt văn bản, kể cả khi ngắt thay đổi biến liên quan.", "Phép tối ưu chỉ đúng khi giá trị không thay đổi theo cách mà compiler không biết."),
      distractor("Đọc thanh ghi ngoại vi nhiều lần có thể gộp thành một lần như đọc biến RAM thông thường mà không cần khai báo đặc biệt.", "Thanh ghi phần cứng có thể thay đổi ngoài luồng chương trình; cần volatile hoặc cơ chế truy cập phù hợp."),
      distractor("Loại mã không được gọi trong một cấu hình đồng nghĩa đoạn mã đó không bao giờ cần ở các cấu hình build khác.", "Dead code phụ thuộc cấu hình và đường thực thi; cần xác nhận trước khi loại khỏi mọi biến thể."),
    ],
    "vi xử lý và vi điều khiển": [
      distractor("Thiết bị cầm tay nên ưu tiên vi xử lý rời vì thêm nhiều chip ngoài luôn làm giảm năng lượng và kích thước bo.", "Nhiều chip ngoài thường tăng kích thước và năng lượng; MCU tích hợp có lợi cho hệ nhỏ."),
      distractor("Vi điều khiển không thể dùng bộ nhớ hoặc ngoại vi ngoài, nên chỉ phù hợp bài toán không có giao tiếp.", "MCU vẫn có thể mở rộng bộ nhớ và ngoại vi khi cần."),
      distractor("Mức tích hợp không ảnh hưởng lựa chọn; chỉ tần số CPU quyết định chi phí và độ phức tạp hệ thống.", "Mức tích hợp ảnh hưởng số linh kiện, PCB, năng lượng và phần mềm."),
    ],
    "điện trở nối tiếp bảo vệ đầu vào": [
      distractor("Tăng điện trở nối tiếp chỉ làm giảm dòng lỗi, không ảnh hưởng cạnh tín hiệu vì chân vào không có điện dung.", "Điện dung đầu vào kết hợp điện trở tạo RC và làm chậm cạnh."),
      distractor("Điện trở nối tiếp đủ thay thế phần tử kẹp cho mọi xung, miễn là công suất danh định của điện trở không bị vượt.", "Điện trở hạn dòng nhưng không bảo đảm điện áp chân nằm trong giới hạn nếu thiếu đường kẹp."),
      distractor("Giá trị điện trở nên chọn theo dòng hoạt động bình thường, không cần xét dòng xung và ngưỡng logic khi lỗi.", "Cần kiểm tra cả trạng thái bình thường lẫn quá áp và xung."),
    ],
    "đánh giá bộ xử lý": [
      distractor("Chọn bộ xử lý có xung nhịp cao nhất vì mọi kiến trúc thực hiện một lệnh trong cùng số chu kỳ.", "CPI, kiến trúc và loại tải làm hiệu năng khác nhau ở cùng xung nhịp."),
      distractor("MIPS cao hơn đủ chứng minh hệ chạy nhanh hơn, dù tập lệnh và công việc đo khác nhau.", "MIPS không so sánh trực tiếp đáng tin giữa kiến trúc và chương trình khác nhau."),
      distractor("Nếu hiệu năng đáp ứng thì công suất, nhiệt, bộ nhớ và ngoại vi không còn ảnh hưởng quyết định chọn chip.", "Bộ xử lý phải thỏa đồng thời nhiều ràng buộc hệ thống."),
    ],
    "đường truyền nhiễu": [
      distractor("Mọi nhiễu quan sát ở đầu vào đều đi theo dây tín hiệu, nên chỉ cần thêm lọc RC tại chân nhận.", "Nhiễu có thể truyền dẫn, bức xạ, ghép điện dung hoặc ghép cảm ứng."),
      distractor("Một lớp chắn kim loại xử lý đồng thời nhiễu nguồn chung và sụt áp trên đường mass mà không cần thay đổi đấu dây.", "Che chắn không loại bỏ nhiễu truyền dẫn hoặc trở kháng chung."),
      distractor("Chọn linh kiện bảo vệ trước rồi mới xác định đường ghép nhiễu, vì cùng một phần tử có hiệu quả tương đương với mọi cơ chế.", "Cần xác định nguồn và đường truyền để chọn biện pháp phù hợp."),
    ],
  };

  const structurePools = [
    {
      match: /ngưỡng logic/i,
      options: [
        distractor("Có thể dùng một ngưỡng bằng nửa nguồn cho mọi IC vì vùng không xác định được tự động giữ trạng thái trước.", "Ngưỡng phụ thuộc datasheet và vùng không xác định không bảo đảm trạng thái."),
        distractor("Chỉ cần điện áp dương là mức cao; biên độ và lề nhiễu không ảnh hưởng độ tin cậy của đầu vào số.", "Mức cao phải vượt VIH và vẫn cần lề nhiễu phù hợp."),
        distractor("Tín hiệu nằm giữa VIL và VIH được giải mã theo mức gần nhất nên có thể dùng như một vùng logic hợp lệ.", "Vùng giữa các ngưỡng là không xác định và cần tránh."),
      ],
    },
    {
      match: /kéo lên|kéo xuống/i,
      options: [
        distractor("Chọn điện trở kéo càng nhỏ càng tốt để tăng chống nhiễu mà không làm tăng dòng khi đường bị kéo ngược.", "Điện trở nhỏ tăng dòng tiêu thụ và tải cho phần tử kéo."),
        distractor("Điện trở kéo rất lớn làm cạnh lên nhanh hơn vì dòng nạp điện dung đường dây nhỏ hơn.", "Dòng nhỏ làm thời gian nạp điện dung dài hơn và cạnh chậm hơn."),
        distractor("Điện trở kéo chỉ cần cho đầu ra đẩy-kéo; đầu vào công tắc hở tự có mức logic xác định.", "Đầu vào hở có thể thả nổi nếu không có kéo trong hoặc kéo ngoài."),
      ],
    },
    {
      match: /I2C|cực máng hở|đẩy-kéo/i,
      options: [
        distractor("Nhiều đầu ra đẩy-kéo có thể nối chung bus nếu phần mềm dự kiến không đổi mức cùng thời điểm.", "Một sai lệch thời gian có thể làm hai đầu ra tranh chấp và gây quá dòng."),
        distractor("Đầu ra cực máng hở chủ động tạo cả mức cao và thấp nên không cần điện trở kéo lên.", "Open-drain chỉ chủ động kéo thấp; mức cao do điện trở kéo."),
        distractor("Giá trị điện trở kéo chỉ ảnh hưởng dòng DC, không ảnh hưởng thời gian lên của SDA và SCL.", "Điện trở kéo cùng điện dung bus quyết định cạnh lên và tốc độ tối đa."),
      ],
    },
    {
      match: /rơ-le|driver|tải công suất/i,
      options: [
        distractor("Có thể nối cuộn rơ-le trực tiếp nếu dòng trung bình nhỏ, dù dòng hút ban đầu vượt giới hạn chân MCU.", "Dòng đỉnh vẫn có thể gây hỏng hoặc sụt nguồn."),
        distractor("Điện trở nối tiếp với chân MCU có thể thay tầng transistor vì điện trở làm tăng dòng điều khiển cho tải.", "Điện trở chỉ hạn dòng; không khuếch đại khả năng cấp dòng."),
        distractor("Tầng transistor không cần kiểm tra điện áp điều khiển và vùng bão hòa nếu tải chỉ đóng cắt chậm.", "Transistor vẫn cần được điều khiển đủ để chịu dòng tải với tổn hao phù hợp."),
      ],
    },
    {
      match: /chống nảy|phát hiện sự kiện|chốt/i,
      options: [
        distractor("Lấy mẫu nút nhanh hơn sẽ loại nảy vì mọi lần thay đổi trong khoảng nảy được xem là cùng một sự kiện.", "Lấy mẫu nhanh thường ghi nhận nhiều chuyển mức hơn nếu không có thuật toán chống nảy."),
        distractor("Chỉ phát hiện mức hiện tại là đủ tạo một sự kiện cho mỗi lần nhấn, không cần lưu trạng thái trước.", "Phát hiện cạnh hoặc chốt trạng thái cần so sánh với trạng thái trước."),
        distractor("RC chống nảy nên có hằng số thời gian lớn hơn thời gian nhấn ngắn nhất để loại hoàn toàn mọi thay đổi.", "RC quá chậm có thể làm mất lần nhấn hợp lệ."),
      ],
    },
    {
      match: /diode|tải cảm|transistor/i,
      options: [
        distractor("Không cần diode dập nếu nguồn cuộn dây thấp hơn điện áp định mức transistor, vì xung ngắt không thể vượt nguồn.", "Điện áp cảm ứng khi ngắt có thể cao hơn nhiều điện áp nguồn."),
        distractor("Diode dập nên mắc nối tiếp cuộn dây để chặn dòng khi transistor tắt.", "Diode thường mắc song song ngược để tạo đường tuần hoàn cho dòng cuộn dây."),
        distractor("Tụ lớn ở nguồn thay thế hoàn toàn diode dập vì mọi năng lượng cuộn dây sẽ trở về nguồn qua transistor đã tắt.", "Khi transistor tắt cần một đường dòng cụ thể để kẹp xung cảm ứng."),
      ],
    },
    {
      match: /Schmitt|ngưỡng có trễ|hysteresis/i,
      options: [
        distractor("Một ngưỡng duy nhất giúp tín hiệu nhiễu ổn định hơn vì mọi lần cắt ngưỡng đều tạo cùng một trạng thái.", "Một ngưỡng dễ tạo nhiều chuyển mức khi tín hiệu dao động quanh ngưỡng."),
        distractor("Hysteresis làm hai ngưỡng gần nhau hơn để đầu vào nhạy với dao động nhỏ quanh mức chuyển.", "Hysteresis tạo khoảng cách giữa hai ngưỡng để bỏ qua dao động nhỏ."),
        distractor("Schmitt trigger chỉ lọc được nhiễu tần số cao và không hỗ trợ tín hiệu thay đổi chậm.", "Cơ chế ngưỡng trễ đặc biệt hữu ích với tín hiệu chậm hoặc nhiễu quanh ngưỡng."),
      ],
    },
    {
      match: /tốc độ cạnh|đường dây dài/i,
      options: [
        distractor("Chọn cạnh nhanh nhất giúp giảm phản xạ vì tín hiệu đạt mức ổn định trước khi sóng truyền tới cuối dây.", "Cạnh nhanh làm hiệu ứng đường truyền và phản xạ nghiêm trọng hơn."),
        distractor("Cạnh chậm không ảnh hưởng thời điểm lấy mẫu nên phù hợp cả khi chu kỳ clock gần bằng thời gian lên xuống.", "Cạnh quá chậm có thể vi phạm timing và tăng thời gian trong vùng ngưỡng."),
        distractor("Tốc độ cạnh chỉ ảnh hưởng công suất DC, không ảnh hưởng phát xạ hoặc xuyên âm giữa các đường.", "Cạnh nhanh làm tăng thành phần cao tần, phát xạ và ghép nhiễu."),
      ],
    },
  ];

  const conciseCorrectAnswers = {
    "IC đệm bảo vệ": "IC đệm có thể tăng khả năng tải, định dạng mức logic hoặc làm tầng hy sinh, nhưng vẫn cần bảo vệ chuyên dụng trước xung năng lượng lớn.",
    "RISC và CISC": "RISC thiên về lệnh đơn giản và pipeline đều đặn; CISC có lệnh phức tạp hơn, nên phải đánh giá bằng tải thực tế thay vì chỉ dựa vào tên kiến trúc.",
    "SRAM và DRAM": "SRAM nhanh, không cần làm tươi nhưng tốn diện tích; DRAM có mật độ cao hơn nhưng phải làm tươi định kỳ.",
    "Von Neumann và Harvard": "Von Neumann dùng chung đường lệnh và dữ liệu; Harvard tách hai đường để giảm tranh chấp và hỗ trợ truy cập song song.",
    "assembler, linker và loader": "Bộ liên kết ghép tệp đối tượng với thư viện và giải quyết tham chiếu; bộ nạp chỉ đưa ảnh cuối vào bộ nhớ đích.",
    "bộ nhớ Flash": "Flash không bay hơi nhưng xóa theo trang hoặc khối và có giới hạn ghi xóa, nên ghi log liên tục cần quản lý mài mòn.",
    "bộ nhớ chương trình và bộ nhớ dữ liệu": "Mã cần bộ nhớ không bay hơi; biến khi chạy thường cần RAM đọc ghi nhanh, còn cấu hình ít đổi có thể dùng EEPROM hoặc Flash.",
    "chia áp và kẹp áp cho đầu vào quá mức": "Cầu chia xử lý mức danh định; điện trở hạn dòng và phần tử kẹp xử lý xung hoặc trạng thái vượt dải MCU.",
    "chọn cấu trúc mạch bảo vệ đầu vào": "Đầu vào ngoài nên có hạn dòng, TVS gần đầu nối, kẹp mức phù hợp và điện trở kéo để xác định trạng thái.",
    "chọn dây truyền tín hiệu": "Cần chọn cặp xoắn, truyền vi sai hoặc lớp chắn theo chiều dài, tốc độ, môi trường nhiễu và độ nhạy của mạch thu.",
    "firmware nhúng": "Firmware phụ thuộc chân, ngoại vi và timing của bo mạch, nên đổi phần cứng phải kiểm tra và sửa lớp truy cập tương ứng.",
    "khởi động an toàn và cập nhật firmware": "Chỉ kích hoạt ảnh mới sau khi kiểm tra toàn vẹn hoặc chữ ký, đồng thời giữ ảnh tốt hoặc đường phục hồi khi mất nguồn.",
    "khởi động hệ thống": "Sau reset, mã startup đi từ vector xác định, thiết lập ngăn xếp và vùng dữ liệu rồi mới chuyển tới chương trình chính.",
    "kỹ thuật tiết kiệm năng lượng": "Cho hệ ngủ giữa các lần đo, tắt clock ngoại vi không dùng và đánh thức bằng ngắt khi đến kỳ hoặc có sự kiện.",
    "layout analog, digital và công suất": "Tách đường analog nhạy khỏi cạnh số và dòng công suất, giữ đường ngắn và kiểm soát đường hồi dòng liên tục.",
    "nhiễu truyền dẫn": "Nếu nhiễu đi theo nguồn hoặc dây chung, cần lọc, tách nguồn hoặc giảm trở kháng chung ngay trên đường dẫn đó.",
    "optocoupler và digital isolator": "Bộ ghép quang phù hợp tín hiệu chậm; bộ cách ly số thường thích hợp hơn khi cần cách ly với tốc độ và độ trễ tốt hơn.",
    "shielding": "Hiệu quả che chắn phụ thuộc vật liệu, tần số, cách nối lớp chắn và đường dòng nhiễu, không chỉ việc có lớp kim loại.",
    "thiết kế mạch bảo vệ quá áp đơn giản": "Đầu vào chậm vượt dải MCU có thể dùng chia áp hoặc hạn dòng, phần tử kẹp phù hợp và lọc nếu băng thông cho phép.",
    "tối ưu mã trong firmware": "Chỉ tối ưu khi giữ đúng hành vi; biến do ngắt hoặc phần cứng thay đổi phải được khai báo và truy cập theo cơ chế phù hợp.",
    "vi xử lý và vi điều khiển": "Thiết bị nhỏ, ít linh kiện và tiêu thụ thấp thường phù hợp MCU tích hợp bộ nhớ và ngoại vi hơn vi xử lý cần nhiều chip ngoài.",
  };

  const conciseStructureAnswer = (question) => {
    if (/ngưỡng logic/i.test(question.stem)) {
      return "Chỉ bảo đảm mức thấp khi không vượt VIL và mức cao khi đạt ít nhất VIH; vùng giữa hai ngưỡng là không xác định.";
    }
    if (/kéo lên|kéo xuống/i.test(question.stem)) {
      return "Điện trở kéo tạo mức mặc định; giá trị của nó phải cân bằng dòng tiêu thụ, chống nhiễu và thời gian chuyển mức.";
    }
    if (/I2C|cực máng hở|đẩy-kéo/i.test(question.stem)) {
      return "Cực máng hở chỉ kéo thấp, còn điện trở tạo mức cao, nhờ đó nhiều thiết bị chia sẻ bus mà không tranh chấp đẩy-kéo.";
    }
    if (/rơ-le|driver|tải công suất/i.test(question.stem)) {
      return "MCU chỉ điều khiển transistor, MOSFET hoặc IC driver; dòng tải lớn không đi trực tiếp qua chân I/O.";
    }
    if (/chống nảy|phát hiện sự kiện|chốt/i.test(question.stem)) {
      return "Chống nảy loại chuyển mức giả, chốt giữ sự kiện ngắn và phát hiện cạnh tạo đúng một phản ứng cho mỗi thay đổi hợp lệ.";
    }
    if (/diode|tải cảm|transistor/i.test(question.stem)) {
      return "Diode mắc song song ngược với tải cảm tạo đường cho dòng khi ngắt, nhờ đó kẹp xung áp bảo vệ transistor.";
    }
    if (/Schmitt|ngưỡng có trễ|hysteresis/i.test(question.stem)) {
      return "Hai ngưỡng khác nhau theo chiều tăng và giảm giúp tín hiệu nhiễu quanh điểm chuyển không tạo nhiều cạnh giả.";
    }
    if (/tốc độ cạnh|đường dây dài/i.test(question.stem)) {
      return "Chọn cạnh vừa đủ cho timing; cạnh quá nhanh tăng phát xạ và phản xạ, còn cạnh quá chậm có thể vi phạm thời gian lấy mẫu.";
    }
    return null;
  };

  const conciseCorrectAnswer = (question) => {
    if (question.topic === "assembler, linker và loader" && question.bloom === 5) {
      return "Kiểm tra cấu hình liên kết, thư viện được đưa vào và ký hiệu còn thiếu; bộ nạp chưa phải công đoạn xử lý lỗi này.";
    }
    if (question.topic === "cấu trúc mạch I/O") return conciseStructureAnswer(question);
    if (question.topic === "ghép cảm ứng từ") {
      return /giảm nhiễu|cách đi dây/i.test(question.stem)
        ? "Giữ đường đi và hồi gần nhau, giảm diện tích vòng và dùng cặp xoắn để giảm từ thông nhiễu móc vòng."
        : "Nhiễu cảm ứng tăng theo tốc độ biến thiên dòng và diện tích vòng dây bị từ thông móc qua.";
    }
    if (question.topic === "ghép điện dung") {
      return /giảm ghép/i.test(question.stem)
        ? "Tăng khoảng cách, giảm chiều dài song song, kiểm soát tốc độ cạnh và dùng lớp tham chiếu hoặc guard khi phù hợp."
        : "Đường xung nhanh ghép qua điện dung ký sinh sang ADC, mạnh hơn khi hai đường gần và chạy song song lâu.";
    }
    return conciseCorrectAnswers[question.topic] || null;
  };

  const lowLevelReplacements = [
    [/không bao giờ/gi, "được giả định là không thể"],
    [/luôn giống hệt nhau/gi, "có thể xem là tương đương"],
    [/hoàn toàn giống nhau/gi, "có thể xem là tương đương"],
    [/giống hệt/gi, "tương đương về chức năng"],
    [/hoàn toàn/gi, "về cơ bản"],
    [/luôn/gi, "thường"],
    [/mọi/gi, "nhiều"],
    [/\bđều\b/gi, "có thể"],
    [/duy nhất/gi, "chính"],
    [/không cần thiết/gi, "thường không được xem là bắt buộc"],
    [/chỉ cần khi/gi, "chỉ được xem là cần khi"],
    [/chỉ cần/gi, "được xem là đủ nếu chỉ"],
    [/bắt buộc chỉ/gi, "thường chỉ"],
    [/tuyệt đối/gi, "mà không cần xét thêm điều kiện"],
    [/vô hạn/gi, "đủ lớn để có thể bỏ qua giới hạn"],
    [/bị cấm/gi, "thường bị hạn chế"],
    [/không liên quan/gi, "ít ảnh hưởng trực tiếp"],
    [/không ảnh hưởng/gi, "không phải yếu tố chi phối"],
    [/không cần/gi, "có thể bỏ qua"],
    [/tốt nhất/gi, "thường được ưu tiên"],
    [/chỉ là[^,.]*trang trí/gi, "chủ yếu dùng để mô tả hoặc hỗ trợ bố trí"],
    [/trang trí/gi, "mô tả hoặc hỗ trợ bố trí"],
    [/thẩm mỹ/gi, "bố trí cơ khí"],
    [/màu dây/gi, "quy ước đấu dây"],
    [/màu của bo mạch/gi, "vật liệu và bố trí bo mạch"],
    [/độ sáng đèn/gi, "mức dòng của đèn báo"],
    [/tên gọi/gi, "tên chuẩn"],
    [/nghe quen/gi, "được dùng phổ biến"],
    [/phần mềm văn phòng và trò chơi/gi, "nhiều ứng dụng người dùng không liên quan nhiệm vụ chính"],
  ];

  const hardenLowLevelText = (text) => {
    const revised = lowLevelReplacements.reduce(
      (value, [pattern, replacement]) => value.replace(pattern, replacement),
      text
    );
    return revised
      .replace(/thường là là/gi, "thường là")
      .replace(/thường thường/gi, "thường")
      .replace(/có thể chủ yếu dựa vào/gi, "có thể ưu tiên")
      .replace(/có thể dựa về cơ bản vào/gi, "có thể dựa chủ yếu vào")
      .replace(/một dây chính/gi, "một đường dây chính")
      .replace(/một bước chính là/gi, "bước chính là")
      .replace(/^\p{Ll}/u, (letter) => letter.toLocaleUpperCase("vi-VN"));
  };

  const answerLooksLonger = (question) => {
    const correctLength = question.choices.find((choice) => choice.correct).text.length;
    const longestDistractor = Math.max(...question.choices.filter((choice) => !choice.correct).map((choice) => choice.text.length));
    return correctLength > longestDistractor * 1.35;
  };

  const canUseConceptSummary = (question) => {
    if (/phát biểu nào[^?]*(sai|không đúng)|sai hoặc dễ gây nhầm/i.test(question.stem)) return false;
    if (/tổ hợp|vừa đúng số lượng|bao nhiêu|gần giá trị|tính |một .*bit|có mấy/i.test(question.stem)) return false;
    return question.bloom <= 2 && answerLooksLonger(question);
  };

  const firstExplanationSentence = (question) => question.explanation.split(/(?<=[.!?])\s/)[0];

  const keepsOriginalChoiceFormat = (question) => /tổ hợp|vừa đúng số lượng|bao nhiêu|gần giá trị|tính |một .*bit|có mấy/i.test(question.stem);

  const poolForQuestion = (question) => {
    if (question.topic === "cấu trúc mạch I/O") {
      return structurePools.find((item) => item.match.test(question.stem))?.options || [
        distractor("Có thể bỏ qua điện áp, dòng và thời gian tín hiệu nếu chức năng logic trên sơ đồ đã đúng.", "Cấu trúc I/O phải thỏa đồng thời điều kiện điện và timing."),
        distractor("Các khối đệm, kéo mức và bảo vệ không ảnh hưởng tín hiệu vì nằm ngoài lõi xử lý.", "Các khối này trực tiếp quyết định mức điện, dòng và độ tin cậy của I/O."),
        distractor("Một cấu trúc I/O phù hợp cho mọi cảm biến và tải nếu cùng dùng mức nguồn danh định.", "Loại tải, tốc độ, dòng và môi trường nhiễu vẫn khác nhau."),
      ];
    }
    return pools[question.topic];
  };

  const questions = data.chapters.flatMap((chapter) => chapter.questions);
  questions.forEach((question) => {
    if (question.bloom === 1 && /^Khi phân tích thiết kế nhúng,\s*/i.test(question.stem)) {
      question.stem = question.stem
        .replace(/^Khi phân tích thiết kế nhúng,\s*/i, "")
        .replace(/^\p{Ll}/u, (letter) => letter.toLocaleUpperCase("vi-VN"));
    }
    if (question.topic === "assembler, linker và loader" && question.bloom === 5) {
      question.stem = "Một dự án nhiều tệp đối tượng và thư viện báo lỗi ký hiệu chưa được định nghĩa. Đánh giá nào xác định đúng công đoạn cần kiểm tra trước?";
    }
    if (question.bloom >= 4) {
      const pool = poolForQuestion(question);
      if (!pool) throw new Error(`Thiếu phương án nhiễu Bloom cao cho chủ đề: ${question.topic}`);
      const correctAnswer = conciseCorrectAnswer(question);
      if (correctAnswer) question.choices.find((choice) => choice.correct).text = correctAnswer;
      const wrongChoices = question.choices.filter((choice) => !choice.correct);
      wrongChoices.forEach((choice, index) => {
        const replacement = pool[(index + question.number) % pool.length];
        choice.text = hardenLowLevelText(replacement.text);
        choice.reason = replacement.reason;
      });
      return;
    }

    const asksForFalseStatement = /phát biểu nào[^?]*(sai|không đúng)|sai hoặc dễ gây nhầm/i.test(question.stem);
    const lowLevelPool = keepsOriginalChoiceFormat(question) ? null : poolForQuestion(question);
    if (lowLevelPool) {
      if (asksForFalseStatement) {
        const replacement = lowLevelPool[question.number % lowLevelPool.length];
        const selectedAnswer = question.choices.find((choice) => choice.correct);
        selectedAnswer.text = hardenLowLevelText(replacement.text);
        selectedAnswer.reason = replacement.reason;
      } else {
        question.choices.filter((choice) => !choice.correct).forEach((choice, index) => {
          const replacement = lowLevelPool[(index + question.number) % lowLevelPool.length];
          choice.text = hardenLowLevelText(replacement.text);
          choice.reason = replacement.reason;
        });
      }
    }
    if (canUseConceptSummary(question)) {
      question.choices.find((choice) => choice.correct).text = firstExplanationSentence(question);
    }
    question.choices.forEach((choice) => {
      const containsIncorrectClaim = asksForFalseStatement ? choice.correct : !choice.correct;
      if (containsIncorrectClaim) choice.text = hardenLowLevelText(choice.text);
    });
  });

  data.version = "2026-07-13-hardened-distractors";
})();

(() => {
  const data = window.EMBEDDED_QUIZ_DATA;
  if (!data) return;

  const option = (text, reason) => ({ text, reason });
  const scenarioSets = {
    "NOR Flash và NAND Flash": {
      stem: "Một bộ ghi dữ liệu cần lưu dung lượng lớn và chủ yếu đọc, ghi theo từng khối. Loại Flash nào phù hợp hơn?",
      correct: option(
        "Chọn NAND Flash vì loại này có mật độ lưu trữ cao và phù hợp truy cập dữ liệu dung lượng lớn theo khối.",
        "NAND Flash tối ưu cho mật độ và truy cập theo trang hoặc khối, nên thường được dùng cho lưu trữ dung lượng lớn."
      ),
      wrong: [
        option("Chọn NOR Flash vì loại này có mật độ cao hơn NAND và được tối ưu cho dữ liệu lớn theo từng khối.", "NOR thuận lợi cho truy cập ngẫu nhiên và thực thi mã trực tiếp, nhưng thường có mật độ thấp hơn NAND."),
        option("Chọn NOR Flash vì khả năng đọc ngẫu nhiên từng byte đồng nghĩa với tốc độ ghi khối và mật độ đều cao hơn NAND.", "Khả năng đọc ngẫu nhiên của NOR không làm nó có mật độ hoặc hiệu quả ghi khối cao hơn NAND."),
        option("Có thể chọn NOR hoặc NAND mà không cần xét bộ điều khiển, sửa lỗi và đơn vị truy cập vì hai loại có giao diện tương đương.", "NOR và NAND khác đáng kể về cách truy cập, yêu cầu điều khiển và cơ chế quản lý lỗi."),
      ],
    },
    "công suất động và năng lượng": {
      correct: option("Đánh giá đồng thời điện áp, tần số, điện dung chuyển mạch, dòng khi thức và ngủ, cùng thời gian ở từng chế độ.", "Năng lượng phụ thuộc cả mức công suất và thời gian duy trì từng trạng thái; bỏ một nhóm yếu tố có thể dẫn đến lựa chọn sai."),
      wrong: [
        option("Chỉ so sánh tần số cực đại và chọn chip có tần số thấp nhất, vì tần số quyết định toàn bộ năng lượng của thiết bị.", "Ngoài tần số còn có điện áp, tải chuyển mạch, dòng tĩnh, ngoại vi và tỷ lệ thời gian hoạt động."),
        option("Chỉ so sánh dòng ở chế độ ngủ và bỏ qua dòng khi thức, vì thiết bị dùng pin luôn tiêu thụ chủ yếu trong thời gian nghỉ.", "Nếu thiết bị thức đủ lâu hoặc tải khi thức lớn, phần năng lượng hoạt động có thể chiếm ưu thế."),
        option("Chỉ so sánh thời gian hoàn thành một tác vụ và chọn cấu hình nhanh nhất, không cần xét điện áp hay công suất lúc xử lý.", "Hoàn thành nhanh chưa chắc tiêu thụ ít năng lượng nếu công suất trong thời gian chạy tăng quá nhiều."),
      ],
    },
    "SRAM và DRAM": {
      stem: "Một lõi xử lý cần vùng RAM dung lượng nhỏ, độ trễ thấp và không muốn dành chu kỳ để làm tươi. Loại bộ nhớ nào phù hợp hơn?",
      correct: option("Chọn SRAM vì truy cập nhanh và không cần làm tươi, chấp nhận diện tích mỗi bit và chi phí cao hơn DRAM.", "SRAM phù hợp cho vùng nhớ nhỏ, nhanh gần lõi như cache hoặc scratchpad, nơi độ trễ quan trọng hơn mật độ."),
      wrong: [
        option("Chọn DRAM vì ô nhớ một transistor và một tụ cho độ trễ thấp hơn SRAM, đồng thời không cần mạch làm tươi.", "DRAM có mật độ cao nhưng cần làm tươi và thường có độ trễ lớn hơn SRAM."),
        option("Chọn DRAM vì yêu cầu dung lượng nhỏ làm mất lợi thế mật độ của SRAM và khiến SRAM phải làm tươi thường xuyên hơn.", "SRAM không cần làm tươi; dung lượng nhỏ càng phù hợp với việc chấp nhận chi phí diện tích để lấy tốc độ."),
        option("Chọn Flash vì dữ liệu không bay hơi giúp thay thế trực tiếp RAM tốc độ cao trong mọi lần đọc và ghi khi chương trình chạy.", "Flash không thay thế trực tiếp RAM cho truy cập ghi thường xuyên và độ trễ thấp."),
      ],
    },
    "ROM, EPROM và EEPROM": {
      stem: "Thiết bị cần lưu một lượng nhỏ tham số cấu hình, có thể sửa bằng điện ngay trên bo mạch và vẫn giữ khi mất nguồn. Bộ nhớ nào phù hợp hơn?",
      correct: option("Chọn EEPROM vì giữ dữ liệu khi mất nguồn và hỗ trợ xóa, ghi bằng điện ngay trên bo mạch với đơn vị dữ liệu nhỏ.", "EEPROM phù hợp với cấu hình dung lượng nhỏ, ít thay đổi và cần cập nhật tại chỗ."),
      wrong: [
        option("Chọn RAM vì có thể ghi từng byte nhanh và nội dung vẫn được giữ nguyên sau khi ngắt hoàn toàn nguồn cấp.", "RAM bay hơi thông thường mất dữ liệu khi mất nguồn."),
        option("Chọn EPROM vì có thể xóa và ghi lại từng byte bằng phần mềm mà không cần tháo chip hoặc dùng tia cực tím.", "EPROM truyền thống cần tia cực tím để xóa và không thuận tiện cập nhật tại chỗ."),
        option("Chọn ROM lập trình cố định vì ứng dụng có thể sửa từng tham số nhiều lần trong quá trình vận hành bình thường.", "ROM cố định không hỗ trợ ứng dụng cập nhật tham số theo cách đó."),
      ],
    },
    "kỹ thuật tiết kiệm năng lượng": {
      correct: option("Cho nút cảm biến ngủ giữa các lần đo, tắt ngoại vi không dùng và chỉ đánh thức bằng bộ định thời hoặc ngắt sự kiện.", "Nút chỉ tiêu thụ mức cao trong khoảng đo và xử lý ngắn; phần lớn thời gian được đưa về trạng thái tiêu thụ thấp."),
      wrong: [
        option("Cho CPU của nút cảm biến ngủ nhưng giữ toàn bộ ngoại vi và các xung nhịp chạy để không phải khởi tạo lại lần đo sau.", "Ngoại vi và xung nhịp không dùng vẫn tiêu thụ năng lượng trong suốt khoảng nghỉ dài."),
        option("Cho nút cảm biến thức định kỳ với tần suất cao để thăm dò, kể cả khi cảm biến có thể phát ngắt lúc xuất hiện sự kiện.", "Thăm dò dày tạo nhiều lần thức không cần thiết; ngắt phù hợp hơn khi sự kiện thưa."),
        option("Cho nút cảm biến chạy vòng lặp chờ ở tần số thấp trong toàn bộ khoảng nghỉ để loại bỏ thời gian chuyển chế độ ngủ.", "Với khoảng nghỉ dài, năng lượng của vòng lặp chờ thường lớn hơn chi phí vào và ra khỏi chế độ ngủ."),
      ],
    },
    "RISC và CISC": {
      stem: "Khi chọn giữa hai lõi có tổ chức tập lệnh khác nhau cho một sản phẩm nhúng, cách đánh giá nào đáng tin cậy nhất?",
      correct: option("Đo bằng tải công việc đại diện và xét đồng thời thời gian chạy, kích thước mã, truy cập bộ nhớ, công suất và trình biên dịch.", "Tên RISC hay CISC không tự quyết định hiệu quả; kết quả phụ thuộc vi kiến trúc, công cụ và tải thực tế."),
      wrong: [
        option("Chọn lõi có ít loại lệnh hơn vì tập lệnh ngắn hơn luôn tạo thời gian chạy và mức tiêu thụ năng lượng thấp hơn.", "Số loại lệnh không đủ suy ra CPI, số lệnh phải thực hiện, truy cập bộ nhớ hay năng lượng."),
        option("Chọn lõi có lệnh phức tạp hơn vì mỗi lệnh làm được nhiều việc hơn nên tổng số chu kỳ chắc chắn thấp hơn.", "Lệnh phức tạp có thể cần nhiều chu kỳ và hiệu quả còn phụ thuộc cách triển khai cùng trình biên dịch."),
        option("Chỉ so sánh mật độ mã sau khi biên dịch vì chương trình nhỏ hơn đồng nghĩa với tốc độ và công suất đều tốt hơn.", "Mật độ mã là một tiêu chí, nhưng không thay thế phép đo hiệu năng và năng lượng trên tải đại diện."),
      ],
    },
    "các loại lõi xử lý": {
      stem: "Khi chọn loại lõi xử lý cho một sản phẩm nhúng, phương pháp nào phù hợp nhất?",
      correct: option("Đối chiếu yêu cầu điều khiển, xử lý tín hiệu, mức song song, thời gian thực, năng lượng, chi phí và sản lượng với từng loại lõi.", "MCU, DSP, FPGA, ASIC và vi xử lý có thế mạnh khác nhau; lựa chọn phải xuất phát từ yêu cầu của ứng dụng."),
      wrong: [
        option("Chọn loại lõi có tần số danh định cao nhất vì tần số đủ đại diện cho thời gian thực, mức tích hợp và năng lượng của hệ.", "Tần số không phản ánh đầy đủ kiến trúc, ngoại vi, tính xác định, mức song song hay công suất."),
        option("Chọn FPGA cho mọi bài toán vì logic song song có thể cấu hình lại luôn rẻ và tiết kiệm năng lượng hơn MCU hoặc ASIC.", "FPGA có lợi thế riêng nhưng không luôn tối ưu về chi phí, công suất hay độ phức tạp phát triển."),
        option("Chọn MCU cho mọi sản lượng vì phần mềm dễ sửa nên có thể thay thế DSP, FPGA và ASIC mà không đổi hiệu năng.", "Một số tải tín hiệu, song song hoặc sản lượng lớn có thể phù hợp hơn với loại lõi khác."),
      ],
    },
    "assembler, linker và loader": {
      correct: option("Kiểm tra bộ liên kết: thư viện đã đưa vào, thứ tự liên kết và nơi định nghĩa ký hiệu đang bị thiếu.", "Lỗi ký hiệu chưa được định nghĩa xuất hiện khi bộ liên kết không tìm thấy phần định nghĩa trong các tệp đối tượng hoặc thư viện."),
      wrong: [
        option("Kiểm tra bộ nạp trước vì bộ nạp phải tạo mã máy cho từng tệp nguồn rồi mới tìm ký hiệu trong thư viện.", "Bộ nạp đưa ảnh thực thi đã liên kết vào bộ nhớ; nó không giải quyết ký hiệu giữa các tệp nguồn."),
        option("Kiểm tra tiền xử lý trước vì mọi ký hiệu chưa được định nghĩa ở bước liên kết đều bắt nguồn từ macro bị thiếu.", "Macro có thể gây lỗi dịch, nhưng lỗi liên kết thường liên quan phần định nghĩa hàm hoặc biến giữa các mô-đun."),
        option("Kiểm tra trình hợp dịch trước vì trình hợp dịch chịu trách nhiệm ghép mọi tệp đối tượng và thư viện thành ảnh cuối.", "Ghép tệp đối tượng và giải quyết tham chiếu là nhiệm vụ của bộ liên kết."),
      ],
    },
    "khởi động hệ thống": {
      correct: option("Chạy mã khởi động để đặt ngăn xếp, chép vùng dữ liệu khởi tạo và xóa vùng dữ liệu chưa khởi tạo trước khi gọi chương trình chính.", "Môi trường chạy C/C++ cần ngăn xếp và các vùng dữ liệu ở trạng thái xác định trước khi ứng dụng sử dụng chúng."),
      wrong: [
        option("Gọi chương trình chính ngay từ vector khởi động rồi để ứng dụng tự đặt ngăn xếp sau lần gọi hàm đầu tiên.", "Chương trình cần ngăn xếp hợp lệ trước khi gọi hàm hoặc dùng biến cục bộ."),
        option("Chỉ cấu hình ngoại vi giao tiếp trước, còn vùng dữ liệu và ngăn xếp sẽ tự nhận giá trị đúng từ nội dung RAM sau reset.", "RAM sau reset không mặc nhiên có trạng thái mà môi trường chạy yêu cầu."),
        option("Chỉ kiểm tra mã chương trình trong Flash, không cần xử lý RAM vì biến toàn cục được đọc trực tiếp từ ảnh thực thi.", "Biến có giá trị khởi tạo phải được chép vào RAM và vùng chưa khởi tạo phải được thiết lập theo quy ước."),
      ],
    },
    "tối ưu mã trong firmware": {
      correct: option("Khai báo đối tượng phần cứng bằng volatile và dùng cơ chế đồng bộ phù hợp nếu dữ liệu được chia sẻ giữa ngắt với luồng chính.", "volatile buộc mỗi lần truy cập thực sự đọc hoặc ghi đối tượng; đồng bộ vẫn cần thiết cho thao tác nhiều bước hoặc dữ liệu dùng chung."),
      wrong: [
        option("Bỏ volatile và tăng mức tối ưu để trình biên dịch tự nhận biết mọi thay đổi do ngắt hoặc ngoại vi gây ra.", "Trình biên dịch không tự suy ra mọi thay đổi bất đồng bộ nếu mã không biểu đạt điều đó."),
        option("Khai báo biến là const để trình biên dịch giữ nguyên giá trị giữa các lần đọc, tránh thay đổi ngoài ý muốn từ phần cứng.", "const ngăn mã ghi qua tên biến; nó không mô tả dữ liệu có thể đổi bất đồng bộ và còn cho phép giữ giá trị cũ."),
        option("Tắt toàn bộ tối ưu cho cả dự án vì đây là cách duy nhất bảo đảm biến do ngắt cập nhật luôn được đọc đúng.", "Tắt tối ưu không thay thế mô hình truy cập đúng và làm mất nhiều lợi ích hiệu năng, kích thước mã."),
      ],
    },
    "tiền xử lý": {
      correct: option("Dùng biên dịch có điều kiện với macro xác định từng bo mạch, đồng thời giữ giao diện trình điều khiển thống nhất.", "Macro và chỉ thị điều kiện cho phép chọn ánh xạ chân hoặc mô-đun phù hợp ở thời điểm biên dịch."),
      wrong: [
        option("Dùng cùng một hằng số chân cho cả hai bo mạch và để bộ liên kết tự đổi ánh xạ theo phần cứng đang kết nối.", "Bộ liên kết không tự phát hiện bo mạch hay sửa hằng số chân theo phần cứng."),
        option("Tạo hai bản sao toàn bộ mã nguồn rồi sửa độc lập vì tiền xử lý không thể chọn phần mã theo cấu hình bản dựng.", "Biên dịch có điều kiện được thiết kế để chọn mã theo macro cấu hình và giảm trùng lặp."),
        option("Đưa mọi trình điều khiển vào ảnh thực thi rồi chọn bằng loader, kể cả khi bộ nhớ chương trình không đủ chứa cả hai cấu hình.", "Loader không phải cơ chế chung để giải quyết lựa chọn mã lúc biên dịch, và cách này làm tăng kích thước ảnh."),
      ],
    },
    "firmware nhúng": {
      correct: option("Cập nhật ánh xạ chân và lớp truy cập ngoại vi, sau đó kiểm tra lại khởi tạo, thời gian và giao tiếp trên bo mạch mới.", "Firmware phụ thuộc cấu trúc phần cứng; đổi chân hoặc ngoại vi làm thay đổi các thanh ghi, trình điều khiển và giả định thời gian."),
      wrong: [
        option("Giữ nguyên firmware vì cùng thuật toán ứng dụng thì ánh xạ chân và loại ngoại vi không ảnh hưởng mã điều khiển mức thấp.", "Thuật toán có thể giữ nguyên nhưng lớp truy cập phần cứng phải phù hợp bo mạch mới."),
        option("Chỉ đổi tên bo mạch trong thông tin phiên bản vì trình biên dịch sẽ tự suy ra chân và ngoại vi từ sơ đồ nguyên lý.", "Trình biên dịch không tự đọc sơ đồ và thay đổi cấu hình phần cứng."),
        option("Chỉ tăng tần số CPU để bù khác biệt ngoại vi vì tốc độ xử lý có thể thay thế mọi thay đổi về chân và giao thức.", "Tần số CPU không sửa được ánh xạ chân, thanh ghi hay giao thức ngoại vi khác nhau."),
      ],
    },
    "quy trình dịch sang mã máy": {
      correct: option("Dịch hoặc hợp dịch từng tệp thành tệp đối tượng, liên kết chúng với thư viện thành ảnh cuối, rồi nạp ảnh đó vào bộ nhớ đích.", "Đây là chuỗi trách nhiệm chính khi dự án có nhiều mô-đun và thư viện."),
      wrong: [
        option("Nạp từng tệp nguồn trực tiếp vào MCU, sau đó để bộ nạp biên dịch và giải quyết tham chiếu khi thiết bị khởi động.", "MCU thường nhận ảnh máy đã được dịch và liên kết; bộ nạp không thay trình biên dịch và bộ liên kết."),
        option("Liên kết các tệp nguồn trước, sau đó mới biên dịch ảnh đã liên kết và bỏ qua bước tạo tệp đối tượng riêng.", "Thông thường mỗi nguồn được dịch thành đối tượng trước khi bộ liên kết ghép chúng."),
        option("Biên dịch thư viện thành mã máy độc lập rồi nạp vào địa chỉ bất kỳ vì tham chiếu giữa mô-đun không cần được giải quyết.", "Các tham chiếu và bố trí địa chỉ phải được bộ liên kết giải quyết để tạo ảnh nhất quán."),
      ],
    },
    "kết hợp nhiều tầng bảo vệ": {
      correct: option("Đặt phần tử kẹp xung gần đầu nối, thêm phần tử hạn dòng và lọc phù hợp trước khi tín hiệu tới chân MCU.", "Mỗi tầng xử lý một phần nguy cơ: kẹp năng lượng xung, hạn dòng vào mạch và lọc nhiễu còn lại."),
      wrong: [
        option("Chỉ đặt một điện trở kéo tại chân MCU vì điện trở kéo vừa hấp thụ ESD vừa kẹp được điện áp vượt nguồn.", "Điện trở kéo xác định trạng thái logic nhưng không phải phần tử hấp thụ xung ESD năng lượng lớn."),
        option("Chỉ đặt tụ lớn tại chân MCU vì tụ có thể giữ mọi xung quá áp dưới ngưỡng mà không làm chậm tín hiệu hợp lệ.", "Tụ đơn lẻ không bảo đảm kẹp biên độ và giá trị lớn còn có thể làm mất tín hiệu."),
        option("Chỉ dựa vào diode bảo vệ nội của MCU vì diode nội được thiết kế để tiêu tán trực tiếp mọi xung từ cổng ngoài.", "Diode nội có khả năng chịu dòng hạn chế và không nên là tầng bảo vệ duy nhất cho cổng tiếp xúc môi trường."),
      ],
    },
    "TVS và Zener": {
      correct: option("Chọn diode TVS có điện áp làm việc và điện dung phù hợp vì nó được thiết kế đáp ứng nhanh và chịu xung năng lượng lớn.", "TVS chuyên dùng để kẹp xung quá độ; với đường nhanh còn phải chọn loại có điện dung đủ thấp."),
      wrong: [
        option("Chọn Zener công suất nhỏ bất kỳ vì điện áp danh định giống nhau thì khả năng chịu ESD và điện dung cũng tương đương TVS.", "Điện áp danh định không đủ xác định năng lực xung, tốc độ đáp ứng và điện dung ký sinh."),
        option("Chọn tụ điện thay TVS vì tụ luôn kẹp biên độ xung tại một giá trị xác định mà không phụ thuộc năng lượng xung.", "Tụ làm chậm biến thiên nhưng không tạo mức kẹp xác định và có thể bị nạp lên điện áp nguy hiểm."),
        option("Chọn diode chỉnh lưu nối tiếp đường tín hiệu vì cách này dẫn toàn bộ xung ESD xuống mass mà không ảnh hưởng mức logic.", "Diode nối tiếp không tạo đường kẹp xung xuống mass và còn gây sụt áp trên tín hiệu."),
      ],
    },
    "chia áp và kẹp áp cho đầu vào quá mức": {
      correct: option("Dùng cầu chia cho mức ổn định, thêm điện trở hạn dòng và phần tử kẹp phù hợp để xử lý xung hoặc điện áp vượt dự kiến.", "Cầu chia đặt mức danh định; tầng hạn dòng và kẹp bảo vệ khi đầu vào vượt ngoài điều kiện mà cầu chia được tính toán."),
      wrong: [
        option("Chỉ dùng cầu chia tính đúng ở điện áp danh định vì tỷ số chia tự bảo đảm chân MCU an toàn với mọi xung quá độ.", "Cầu chia không tự kẹp điện áp khi đầu vào vượt mức dự kiến và không thay thế bảo vệ xung."),
        option("Chỉ dùng diode kẹp trực tiếp mà không hạn dòng vì diode sẽ hấp thụ mọi dòng từ nguồn ngoài trong thời gian không giới hạn.", "Phần tử kẹp có giới hạn dòng và năng lượng; cần hạn dòng hoặc trở kháng nguồn phù hợp."),
        option("Chỉ dùng điện trở nối tiếp rất lớn vì giảm dòng đồng nghĩa với điện áp chân MCU luôn nằm trong dải logic hợp lệ.", "Điện trở hạn dòng không tự xác định mức điện áp và có thể cùng điện dung đầu vào làm méo tín hiệu."),
      ],
    },
    "chọn cấu trúc mạch bảo vệ đầu vào": {
      correct: option("Kết hợp điện trở hạn dòng, TVS gần đầu nối, phần tử kẹp mức phù hợp và điện trở kéo xác định trạng thái đầu vào.", "Phương án này xử lý xung tại cổng, giới hạn dòng vào mạch và giữ đầu vào không bị thả nổi."),
      wrong: [
        option("Dùng một điện trở kéo lên tại chân MCU vì nó đồng thời hạn dòng ESD, lọc nhiễu và kẹp điện áp vượt nguồn.", "Điện trở kéo chủ yếu tạo mức mặc định, không thay các tầng bảo vệ xung và quá áp."),
        option("Dùng một tụ lớn nối xuống mass tại đầu nối vì tụ vừa bảo vệ ESD vừa bảo toàn mọi cạnh tín hiệu số chậm.", "Tụ không tạo mức kẹp xác định và nếu quá lớn có thể làm chậm hoặc mất cạnh hợp lệ."),
        option("Nối tín hiệu ngoài thẳng vào chân MCU và chỉ bổ sung bảo vệ bằng phần mềm sau khi phát hiện giá trị bất thường.", "Phần mềm không thể ngăn hư hỏng điện xảy ra trước khi CPU đọc được tín hiệu."),
      ],
    },
    "optocoupler và digital isolator": {
      correct: option("Chọn bộ cách ly số có tốc độ dữ liệu và độ trễ phù hợp, đồng thời bố trí nguồn cách ly đúng cho hai miền.", "Bộ cách ly số thường hỗ trợ tốc độ cao và độ trễ ổn định hơn bộ ghép quang thông thường."),
      wrong: [
        option("Tăng dòng LED của bộ ghép quang bất kỳ đến khi đạt tốc độ yêu cầu vì độ trễ sẽ giảm mà không ảnh hưởng tuổi thọ.", "Tăng dòng không bảo đảm đáp ứng tốc độ, có thể vượt định mức và làm giảm tuổi thọ LED."),
        option("Thay bộ ghép quang bằng điện trở nối tiếp vì hạn dòng cũng tạo ra cách ly điện giữa hai miền nguồn.", "Điện trở không tạo cách ly điện; vẫn tồn tại đường dẫn điện trực tiếp giữa hai miền."),
        option("Dùng bộ đệm logic tốc độ cao chung mass vì tốc độ của bộ đệm có thể thay thế yêu cầu cách ly điện.", "Bộ đệm chung mass không phá đường dẫn điện và không giải quyết chênh lệch thế giữa hai miền."),
      ],
    },
    "thiết kế mạch bảo vệ quá áp đơn giản": {
      correct: option("Dùng điện trở hạn dòng, phần tử kẹp có ngưỡng phù hợp và lọc vừa đủ để bảo vệ mà vẫn giữ băng thông tín hiệu cần thiết.", "Mạch phải đồng thời giới hạn điện áp, dòng và không làm sai tín hiệu hợp lệ."),
      wrong: [
        option("Dùng tụ càng lớn càng tốt vì giảm băng thông đến gần bằng không sẽ bảo vệ đầu vào mà vẫn giữ nguyên tín hiệu chậm.", "Tụ quá lớn có thể làm mất chuyển mức hợp lệ và không tự bảo đảm giới hạn điện áp."),
        option("Dùng diode kẹp nhưng bỏ điện trở hạn dòng vì ngưỡng kẹp đúng là đủ bảo đảm diode không quá công suất.", "Dòng và năng lượng qua diode vẫn phải được giới hạn theo định mức."),
        option("Dùng điện trở nối tiếp nhưng bỏ phần tử kẹp vì dòng nhỏ đồng nghĩa với điện áp đầu vào không thể vượt nguồn MCU.", "Điện trở không tự tạo mức kẹp; điện áp vẫn có thể vượt dải cho phép khi đầu vào có trở kháng cao."),
      ],
    },
    "lọc RC cho đầu vào": {
      correct: option("Chọn hằng số thời gian đủ làm suy giảm nhiễu hoặc nảy phím nhưng vẫn nhỏ hơn rõ rệt thời gian xung hợp lệ ngắn nhất.", "Giá trị RC phải cân bằng khả năng lọc với thời gian đáp ứng và ngưỡng chuyển mức của đầu vào."),
      wrong: [
        option("Chọn hằng số thời gian lớn hơn thời gian nhấn ngắn nhất để điện áp không kịp thay đổi trong mọi lần nảy tiếp điểm.", "RC như vậy có thể loại luôn lần nhấn hợp lệ ngắn."),
        option("Chọn điện trở và tụ chỉ theo tích RC vì trở kháng nguồn, dòng rò và ngưỡng logic không ảnh hưởng mức điện áp cuối.", "Cùng hằng số thời gian nhưng giá trị R, C khác nhau có thể chịu tác động khác của dòng rò và tải đầu vào."),
        option("Chọn tụ nhỏ nhất có thể vì mọi giá trị RC đều lọc nảy như nhau nếu phần mềm đọc đầu vào đủ nhanh.", "RC quá nhỏ không làm suy giảm các chuyển mức giả do nảy tiếp điểm."),
      ],
    },
    "decoupling và nguồn tham chiếu": {
      correct: option("Dùng nguồn tham chiếu ổn định, đặt tụ đúng khuyến nghị sát chân Vref và tách đường hồi của Vref khỏi dòng tải xung.", "Vref trực tiếp đặt thang đo ADC; khử nhiễu và đường hồi đúng giúp giảm sai số do nguồn tham chiếu dao động."),
      wrong: [
        option("Dùng chung đường Vref với nguồn tải xung rồi tăng một tụ lớn ở đầu nguồn vì vị trí tụ không ảnh hưởng nhiễu cạnh nhanh.", "Đường mạch có trở kháng ký sinh; tụ xa không thay được tụ cục bộ và dòng tải gây sụt áp chung."),
        option("Bỏ tụ tại Vref và lấy trung bình nhiều mẫu vì xử lý số loại được cả sai số chậm lẫn biến động có tương quan của tham chiếu.", "Lấy trung bình không loại được mọi sai số hệ thống hoặc nhiễu tương quan trên Vref."),
        option("Nối Vref trực tiếp với đường số chuyển mạch để hai điện áp biến thiên cùng nhau và tỷ số ADC tự giữ ổn định.", "Nhiễu số trên tham chiếu đi trực tiếp vào kết quả chuyển đổi và không tự triệt trong mọi điều kiện."),
      ],
    },
    "nhiễu truyền dẫn": {
      correct: option("Xác định đường nguồn mang nhiễu, rồi đặt lọc và tụ khử nhiễu gần điểm xâm nhập hoặc tải nhạy, đồng thời giảm trở kháng chung.", "Nhiễu dẫn phải được xử lý trên chính đường dẫn bằng vị trí lọc và đường hồi phù hợp."),
      wrong: [
        option("Ưu tiên bọc kín vỏ nhưng giữ nguyên đường nguồn vì lớp chắn bên ngoài chặn được cả nhiễu đang truyền dọc theo dây dẫn.", "Che chắn không tự loại nhiễu đã đi vào qua dây nguồn."),
        option("Chỉ tăng một tụ ở nguồn phát dù dây dài vì vị trí của tụ không ảnh hưởng trở kháng đường dẫn tại tần số nhiễu.", "Vị trí và đặc tính của tụ, lọc quyết định hiệu quả tại điểm nhiễu đi vào mạch nhạy."),
        option("Nối thêm các đoạn mass mảnh dùng chung cho tải và mạch đo vì nhiều đường nối cùng ký hiệu GND sẽ luôn giảm sụt áp nhiễu.", "Đường mass mảnh dùng chung có thể tăng trở kháng chung và biến dòng tải thành nhiễu điện áp."),
      ],
    },
    "cáp xoắn": {
      correct: option("Dùng cặp xoắn cho tín hiệu và đường hồi, ưu tiên truyền vi sai nếu giao diện cho phép và giữ cặp xa nguồn dòng biến thiên mạnh.", "Cặp xoắn giảm diện tích vòng và làm nhiễu cảm ứng trên các vòng liên tiếp có xu hướng triệt một phần."),
      wrong: [
        option("Dùng hai dây rời, tách đường tín hiệu xa đường hồi để giảm điện dung giữa chúng dù diện tích vòng tăng lên.", "Diện tích vòng lớn làm tăng ghép cảm ứng từ trong vùng có dòng biến thiên."),
        option("Dùng một dây tín hiệu có tiết diện lớn và lấy vỏ máy làm đường hồi vì điện trở thấp là yếu tố duy nhất quyết định nhiễu cảm ứng.", "Hình học vòng và đường hồi quan trọng; tiết diện lớn không thay thế cặp tín hiệu-hồi gần nhau."),
        option("Dùng cặp xoắn nhưng tháo xoắn trên phần lớn chiều dài để hai dây nhận lượng nhiễu khác nhau và bộ thu dễ phân biệt hơn.", "Tháo xoắn làm tăng diện tích vòng và giảm khả năng nhiễu chung được triệt ở bộ thu vi sai."),
      ],
    },
    "nhiễu phát xạ": {
      correct: option("Định tuyến lại để dây tín hiệu đi xa nguồn nhiễu, giữ đường đi và hồi gần nhau, rồi dùng cặp xoắn hoặc che chắn khi cần.", "Các biện pháp này giảm diện tích vòng nhận, mức trường tác động và nhiễu ghép vào dây dài."),
      wrong: [
        option("Tăng tốc độ cạnh tín hiệu trên dây để thời gian chuyển mức ngắn hơn, nhờ đó phổ cao tần và nhiễu thu được đều giảm.", "Cạnh nhanh thường làm tăng thành phần cao tần và có thể tăng phát xạ, ghép nhiễu."),
        option("Tách đường hồi khỏi dây tín hiệu để tránh nhiễu chung, dù cách này làm vòng dây nhận trường điện từ lớn hơn.", "Diện tích vòng lớn làm tăng điện áp cảm ứng do trường từ biến thiên."),
        option("Chỉ thêm tụ lọc tại đầu thu mà không kiểm tra băng thông vì tụ đủ lớn luôn loại nhiễu và giữ nguyên mọi xung hợp lệ.", "Tụ quá lớn có thể làm mất tín hiệu; trước hết cần giảm ghép và chọn lọc theo băng thông."),
      ],
    },
    shielding: {
      correct: option("Chọn vật liệu và cách nối lớp chắn dựa trên dải tần, kiểu ghép nhiễu, đường dòng trên lớp chắn và nguy cơ vòng mass.", "Che chắn chỉ hiệu quả khi dòng nhiễu có đường trở về được kiểm soát và cấu trúc phù hợp cơ chế ghép."),
      wrong: [
        option("Luôn nối lớp chắn cả hai đầu vì cấu hình này tối ưu ở mọi dải tần và không thể tạo dòng vòng do chênh lệch thế mass.", "Cách nối một hay hai đầu phụ thuộc tần số, hệ thống nối đất và nguy cơ dòng vòng."),
        option("Để lớp chắn không nối với điểm tham chiếu nào vì chỉ cần vật liệu kim loại bao quanh là đủ đưa dòng nhiễu ra khỏi cáp.", "Lớp chắn không có đường dòng phù hợp có thể kém hiệu quả hoặc hoạt động như phần tử ghép nhiễu."),
        option("Chọn lớp chắn chỉ theo độ dày kim loại vì vật liệu, khe hở, đầu nối và tần số không làm thay đổi hiệu quả che chắn.", "Hiệu quả phụ thuộc nhiều yếu tố ngoài độ dày, đặc biệt ở tần số cao và vị trí gián đoạn lớp chắn."),
      ],
    },
    "chọn dây truyền tín hiệu": {
      correct: option("Chọn truyền vi sai trên cặp xoắn, bổ sung lớp chắn nếu môi trường yêu cầu và kiểm tra băng thông cùng cách nối chắn.", "Cặp xoắn và bộ thu vi sai giảm ảnh hưởng nhiễu chung; lớp chắn được cân nhắc theo môi trường và tần số."),
      wrong: [
        option("Chọn dây đơn không che chắn và tách xa đường hồi để giảm điện dung, dù đường truyền đi qua vùng nhiễu mạnh.", "Dây đơn và vòng hồi lớn dễ thu nhiễu điện từ hơn trong đường truyền dài."),
        option("Chọn cáp có lớp chắn nhưng để lớp chắn hở ở cả hai đầu vì vật liệu kim loại tự hấp thụ nhiễu mà không cần đường dòng.", "Lớp chắn cần cách kết nối phù hợp để kiểm soát dòng nhiễu."),
        option("Chọn dây theo tiết diện dẫn điện lớn nhất vì điện trở DC thấp đủ bảo đảm miễn nhiễm, không cần xét tín hiệu vi sai hay băng thông.", "Điện trở DC chỉ là một tiêu chí; ghép nhiễu, trở kháng, hình học và băng thông cũng quan trọng."),
      ],
    },
    "ghép điện dung": {
      correct: option("Tăng khoảng cách, rút ngắn đoạn chạy song song, bố trí lớp tham chiếu liên tục và kiểm soát tốc độ cạnh của đường gây nhiễu.", "Các biện pháp này giảm điện dung ký sinh hoặc giảm dòng nhiễu do điện áp biến thiên ghép sang đường nhận."),
      wrong: [
        option("Đặt hai đường sát nhau và kéo dài đoạn song song để điện trường giữa chúng ổn định hơn, nhờ đó dòng ghép giảm.", "Khoảng cách nhỏ và chiều dài song song lớn làm tăng điện dung ký sinh."),
        option("Tăng trở kháng đầu vào đường nhận vì cùng dòng ghép sẽ tạo điện áp nhiễu nhỏ hơn trên nút có trở kháng lớn.", "Với cùng dòng ghép, trở kháng nút nhận lớn thường tạo điện áp nhiễu lớn hơn."),
        option("Tăng tốc độ cạnh đường gây nhiễu vì thời gian chuyển mức ngắn làm tổng điện tích ghép qua điện dung ký sinh giảm về không.", "Dòng ghép điện dung tăng theo tốc độ biến thiên điện áp; cạnh nhanh thường làm nhiễu lớn hơn."),
      ],
    },
    "đường truyền nhiễu": {
      correct: option("Khoanh vùng lần lượt nguồn nhiễu, đường ghép và mạch bị ảnh hưởng bằng phép đo cùng thử nghiệm thay đổi có kiểm soát.", "Xác định đúng nguồn-đường-victim giúp chọn biện pháp xử lý phù hợp thay vì thay linh kiện ngẫu nhiên."),
      wrong: [
        option("Thêm ngay tụ lớn vào mọi đầu vào vì phần lớn nhiễu đều truyền qua cùng một cơ chế và cần cùng một hằng số lọc.", "Nhiễu có thể dẫn, bức xạ, ghép điện dung hoặc cảm ứng; tụ tùy ý có thể không xử lý đúng đường ghép."),
        option("Bọc kín toàn bộ mạch trước khi đo vì lớp chắn xử lý tương đương nhiễu nguồn, nhiễu mass và nhiễu cảm ứng.", "Che chắn không giải quyết mọi cơ chế, đặc biệt nhiễu dẫn và trở kháng chung."),
        option("Thay mạch đo trước vì mạch bị ảnh hưởng luôn là nguyên nhân phát nhiễu, còn nguồn xung không cần được kiểm tra.", "Cần phân biệt nguồn phát nhiễu và mạch nhạy; thay victim không nhất thiết loại nguồn hay đường ghép."),
      ],
    },
    "ghép cảm ứng từ": {
      correct: option("Đi dây tín hiệu sát đường hồi, giảm diện tích vòng, dùng cặp xoắn và tăng khoảng cách tới cuộn dây hoặc đường dòng xung.", "Điện áp cảm ứng phụ thuộc từ thông móc vòng; giảm diện tích vòng và trường tác động sẽ giảm nhiễu."),
      wrong: [
        option("Tách dây tín hiệu xa đường hồi để từ trường chỉ móc qua một dây, nhờ đó điện áp cảm ứng trên vòng giảm.", "Tách hai dây làm diện tích vòng tăng và thường làm nhiễu cảm ứng lớn hơn."),
        option("Tăng diện tích vòng nhận để từ thông được phân bố trên chiều dài lớn hơn, làm điện áp nhiễu tại đầu thu nhỏ đi.", "Theo định luật cảm ứng, từ thông móc vòng lớn hơn có thể tạo điện áp nhiễu lớn hơn."),
        option("Chỉ giảm điện áp DC của nguồn nhiễu vì ghép cảm ứng không phụ thuộc tốc độ thay đổi dòng hoặc hình học vòng dây.", "Ghép cảm ứng phụ thuộc tốc độ biến thiên dòng, khoảng cách và diện tích vòng."),
      ],
    },
    "layout analog, digital và công suất": {
      correct: option("Tách đường analog nhạy khỏi đường xung và dòng công suất, giữ đường ngắn trên mặt tham chiếu liên tục và kiểm soát đường hồi.", "Bố trí này giảm ghép điện, ghép từ và sụt áp chung gây sai số cho mạch tương tự."),
      wrong: [
        option("Cho đường ADC chạy song song sát PWM để hai tín hiệu có độ trễ tương tự, rồi dùng phần mềm lấy trung bình để loại nhiễu.", "Chạy gần và song song làm tăng ghép điện dung; lấy trung bình không sửa mọi nhiễu đồng bộ với PWM."),
        option("Cắt mặt mass dưới đường analog thành một khe dài để dòng số không đi qua, dù dòng hồi analog phải vòng xa tín hiệu.", "Khe làm gián đoạn đường hồi, tăng diện tích vòng và có thể làm nhiễu lớn hơn."),
        option("Dùng chung một đoạn mass hẹp cho tải xung và Vref vì mọi điểm cùng ký hiệu GND có điện áp tức thời bằng nhau.", "Dòng tải qua trở kháng chung tạo sụt áp và đưa nhiễu vào Vref hoặc mạch đo."),
      ],
    },
    "EMC, phát xạ và miễn nhiễm": {
      correct: option("Giảm nhiễu tại nguồn và đường phát, đồng thời tăng khả năng chịu nhiễu của cổng vào, nguồn, phần mềm và đường hồi dòng.", "Sản phẩm phải đồng thời đáp ứng giới hạn phát xạ và duy trì chức năng khi chịu nhiễu bên ngoài."),
      wrong: [
        option("Chỉ giảm phát xạ vì khi thiết bị phát ít nhiễu thì nó tự động miễn nhiễm với mọi trường và xung từ bên ngoài.", "Phát xạ và miễn nhiễm liên quan nhưng là hai yêu cầu khác nhau, cần biện pháp và phép thử riêng."),
        option("Chỉ tăng miễn nhiễm vì thiết bị hoạt động đúng là đủ, dù nó làm các thiết bị lân cận vượt giới hạn nhiễu cho phép.", "EMC còn yêu cầu không gây nhiễu quá mức cho môi trường."),
        option("Chỉ thêm vỏ kim loại vì vỏ xử lý đồng thời mọi nhiễu dẫn qua cáp, nguồn và mọi lỗi phần mềm khi bị nhiễu.", "Vỏ không thay thế lọc cổng, bố trí đường hồi, bảo vệ nguồn và thiết kế phần mềm phục hồi."),
      ],
    },
    "grounding và dòng hồi tiếp": {
      correct: option("Bố trí để dòng tải xung không dùng chung đoạn hồi trở kháng cao với mạch analog, đồng thời giữ mặt tham chiếu liên tục dưới tín hiệu nhạy.", "Tách đường dòng theo chức năng và kiểm soát nơi chúng gặp nhau giúp giảm sụt áp chung mà không làm đứt đường hồi tín hiệu."),
      wrong: [
        option("Cắt mặt mass thành các đảo tách biệt dưới mọi đường analog vì không có đồng nối thì dòng nhiễu không thể đi vào mạch đo.", "Đường hồi bị gián đoạn buộc dòng đi vòng, làm tăng diện tích vòng và chênh lệch thế không kiểm soát."),
        option("Cho tải xung và Vref dùng chung một đoạn mass hẹp rồi nối về nguồn, vì cùng ký hiệu GND bảo đảm không có sụt áp chung.", "Dòng tải lớn qua trở kháng đoạn chung tạo điện áp nhiễu trực tiếp trên tham chiếu analog."),
        option("Tách đường tín hiệu nhạy khỏi đường hồi của chính nó để giảm điện dung, dù dòng hồi phải tìm đường xa hơn trên bo mạch.", "Đường đi và hồi xa nhau làm tăng vòng dòng, phát xạ và khả năng thu nhiễu."),
      ],
    },
  };

  const questions = data.chapters.flatMap((chapter) => chapter.questions);
  questions.filter((question) => question.bloom === 5).forEach((question) => {
    const set = scenarioSets[question.topic];
    if (!set) throw new Error(`Thiếu bộ phương án theo tình huống Bloom 5: ${question.topic}`);
    if (set.stem) question.stem = set.stem;

    const correctChoice = question.choices.find((choice) => choice.correct);
    correctChoice.text = set.correct.text;
    correctChoice.reason = set.correct.reason;
    question.choices.filter((choice) => !choice.correct).forEach((choice, index) => {
      choice.text = set.wrong[index].text;
      choice.reason = set.wrong[index].reason;
    });
  });

  data.version = "2026-07-13-scenario-aligned-choices";
})();

(() => {
  const data = window.EMBEDDED_QUIZ_DATA;
  if (!data) return;

  const option = (text, reason) => ({ text, reason });
  const replaceChoices = (question, set) => {
    if (set.stem) question.stem = set.stem;
    const correctChoice = question.choices.find((choice) => choice.correct);
    correctChoice.text = set.correct.text;
    correctChoice.reason = set.correct.reason;
    question.choices.filter((choice) => !choice.correct).forEach((choice, index) => {
      choice.text = set.wrong[index].text;
      choice.reason = set.wrong[index].reason;
    });
  };

  const flybackSet = {
    correct: option(
      "Khi transistor ngắt dòng cuộn dây, cuộn dây tạo xung điện áp ngược; diode dập tạo đường cho dòng suy giảm và kẹp xung bảo vệ transistor.",
      "Dòng qua phần tử cảm không thể đổi tức thời. Nếu không có đường dập, điện áp trên transistor có thể tăng vượt định mức."
    ),
    wrong: [
      option("Khi transistor ngắt, cuộn dây ngừng tích trữ năng lượng ngay nên diode chủ yếu được dùng để tăng tốc độ đóng rơ-le.", "Năng lượng từ trường vẫn còn sau thời điểm ngắt và phải được tiêu tán qua một đường dòng phù hợp."),
      option("Diode dập làm giảm dòng điều khiển chân MCU khi transistor đang dẫn, nhờ đó chân MCU không phải cấp dòng cho cuộn dây.", "Dòng cuộn dây đi qua transistor hoặc driver; diode dập chủ yếu dẫn trong giai đoạn transistor vừa ngắt."),
      option("Thiếu diode làm transistor hỏng vì điện áp nguồn DC đi thẳng qua tiếp giáp điều khiển, không liên quan đến tính cảm của cuộn dây.", "Nguy cơ chính là xung áp do cuộn dây chống lại sự thay đổi dòng khi transistor ngắt."),
    ],
  };

  const noisePathSet = {
    correct: option(
      "Xác định nguồn nhiễu, mạch bị ảnh hưởng và đường ghép giữa hai khối bằng phép đo hoặc thử thay đổi từng yếu tố có kiểm soát.",
      "Biết đúng bộ ba nguồn-đường ghép-mạch nhạy mới cho phép chọn lọc, che chắn, bố trí lại hay xử lý nguồn một cách có căn cứ."
    ),
    wrong: [
      option("Thêm ngay bộ lọc RC vào đầu vào mạch đo rồi tăng tụ đến khi số đo ổn định, trước khi xác định dải tần của tín hiệu cần giữ.", "Cách này có thể che triệu chứng hoặc làm mất tín hiệu hợp lệ mà chưa xác định cơ chế nhiễu."),
      option("Bọc lớp chắn quanh mạch đo trước vì nguồn xung chỉ có thể ghép qua trường điện từ, không thể đi theo nguồn hoặc mass chung.", "Nhiễu còn có thể truyền dẫn hoặc đi qua trở kháng chung; che chắn không xử lý mọi đường ghép."),
      option("Thay cảm biến trước vì mạch xuất hiện sai số thường là nguồn tạo nhiễu, còn nguồn xung chỉ ảnh hưởng nếu hai khối nối trực tiếp.", "Mạch có sai số có thể chỉ là khối nhạy; cần đo để phân biệt nguồn và nạn nhân của nhiễu."),
    ],
  };

  const compilerSet = {
    correct: option(
      "Kiểm tra truy cập thanh ghi, biến dùng chung với ngắt, hành vi không xác định và các giả định timing bị lộ khi trình biên dịch sắp xếp lại mã.",
      "Mức tối ưu cao có thể bỏ truy cập không được khai báo đúng, thay đổi thứ tự hợp lệ hoặc làm hành vi không xác định biểu hiện khác."
    ),
    wrong: [
      option("Kết luận trình biên dịch tạo sai mã và tắt tối ưu cho cả dự án trước khi kiểm tra volatile, đồng bộ hoặc hành vi không xác định.", "Tắt tối ưu có thể che lỗi nguồn nhưng không sửa mô hình truy cập sai và không chứng minh lỗi thuộc trình biên dịch."),
      option("Tăng tần số CPU để bù phần lệnh bị trình biên dịch loại bỏ vì khác biệt ở mức tối ưu chủ yếu do hệ xử lý không đủ nhanh.", "Tần số không khôi phục truy cập bị tối ưu bỏ hoặc sửa hành vi không xác định."),
      option("Thêm delay vào mọi vòng lặp để giữ nguyên thứ tự lệnh, vì hàm delay buộc trình biên dịch không được tối ưu các biến xung quanh.", "Delay không thay thế volatile, hàng rào bộ nhớ hay cơ chế đồng bộ đúng và có thể vẫn bị biến đổi."),
    ],
  };

  const preprocessorSet = {
    correct: option(
      "Định nghĩa cấu hình đã làm điều kiện #if hoặc #ifdef đổi kết quả, nên phần mã của trình điều khiển không còn được đưa vào tệp sau tiền xử lý.",
      "Tiền xử lý quyết định khối mã nào được chuyển tiếp cho trình biên dịch dựa trên macro và điều kiện biên dịch."
    ),
    wrong: [
      option("Định nghĩa cấu hình làm bộ liên kết tự xóa trình điều khiển trước bước biên dịch, dù khối mã không nằm trong điều kiện tiền xử lý.", "Bộ liên kết chạy sau khi biên dịch và không trực tiếp xử lý #if hoặc #ifdef trong mã nguồn."),
      option("Định nghĩa cấu hình làm MCU bỏ qua trình điều khiển lúc khởi động, còn ảnh mã máy vẫn chứa nguyên khối mã đã biên dịch.", "Câu hỏi mô tả trình điều khiển biến mất khỏi bản dịch, tức thay đổi xảy ra trước hoặc trong quá trình tạo ảnh."),
      option("Định nghĩa cấu hình chỉ đổi chú thích và tên biến nên trình điều khiển biến mất do trình hợp dịch không nhận ra cú pháp ngôn ngữ C.", "Macro và điều kiện tiền xử lý có thể loại cả khối mã trước khi trình biên dịch hoặc hợp dịch nhận đầu vào."),
    ],
  };

  const overvoltageCriteriaSet = {
    correct: option(
      "Kiểm tra đồng thời điện áp và dòng cực đại tại chân MCU trong trường hợp xấu nhất, cùng ảnh hưởng của mạch bảo vệ lên băng thông tín hiệu.",
      "Mạch chỉ phù hợp khi bảo vệ được chân trong điều kiện lỗi mà vẫn truyền đúng tín hiệu hợp lệ."
    ),
    wrong: [
      option("Ưu tiên điện áp danh định của đầu vào; nếu cầu chia cho mức đúng ở trạng thái ổn định thì không cần tính dòng qua phần tử kẹp.", "Điều kiện xung hoặc quá áp có thể tạo dòng vượt định mức dù mức danh định đã được chia đúng."),
      option("Ưu tiên điện dung lớn nhất có thể vì giảm băng thông luôn làm chân MCU an toàn hơn mà không ảnh hưởng xung hợp lệ.", "Lọc quá mạnh có thể làm mất dữ liệu và tụ không tự tạo mức kẹp điện áp xác định."),
      option("Ưu tiên số lượng linh kiện ít nhất vì mạch có ít phần tử hơn sẽ có điện áp kẹp thấp và chịu năng lượng xung tốt hơn.", "Số linh kiện không trực tiếp quyết định ngưỡng kẹp, dòng, năng lượng chịu đựng hay băng thông."),
    ],
  };

  const questions = data.chapters.flatMap((chapter) => chapter.questions);
  questions.filter((question) => question.bloom === 4).forEach((question) => {
    if (question.id.includes("-flyback-")) replaceChoices(question, flybackSet);
    if (question.id.includes("-noise-paths-")) replaceChoices(question, noisePathSet);
    if (question.id.includes("-compiler-optimization-")) replaceChoices(question, compilerSet);
    if (question.id.includes("-preprocessor-")) replaceChoices(question, preprocessorSet);
    if (question.id.includes("-simple-overvoltage-design-")) replaceChoices(question, overvoltageCriteriaSet);

    if (question.topic === "kỹ thuật tiết kiệm năng lượng") {
      question.choices.forEach((choice) => {
        choice.text = choice.text.replace(/^Cho hệ /, "Cho nút cảm biến ");
      });
    }
    if (question.topic === "các loại lõi xử lý") {
      const answer = question.choices.find((choice) => choice.correct);
      answer.text = "Cần đối chiếu yêu cầu điều khiển, xử lý tín hiệu, mức song song, thời gian thực, năng lượng, chi phí và sản lượng với thế mạnh của từng loại lõi.";
      answer.reason = "Vi xử lý, MCU, DSP, FPGA và ASIC phù hợp các nhóm yêu cầu khác nhau; không thể chọn chỉ từ tên hay tần số lõi.";
    }
    if (question.topic === "chia áp và kẹp áp cho đầu vào quá mức") {
      const answer = question.choices.find((choice) => choice.correct);
      answer.text = "Cầu chia chỉ đặt mức danh định; xung quá độ hoặc đầu vào vượt giá trị dự kiến vẫn có thể làm điện áp và dòng tại chân MCU vượt giới hạn.";
      answer.reason = "Vì vậy cần tính trường hợp xấu nhất và bổ sung hạn dòng, kẹp áp phù hợp thay vì chỉ kiểm tra tỷ số chia danh định.";
    }
    if (question.topic === "nhiễu phát xạ") {
      const answer = question.choices.find((choice) => choice.correct);
      answer.text = "Dây dài và vòng dây lớn dễ hoạt động như phần tử thu trường điện từ; mức nhiễu còn phụ thuộc hướng dây, đường hồi, tần số và khoảng cách tới nguồn nhiễu.";
      answer.reason = "Chiều dài và diện tích vòng làm tăng khả năng ghép trường vào tín hiệu, nhất là khi dây đi gần nguồn chuyển mạch hoặc dòng biến thiên mạnh.";
    }
  });

  data.version = "2026-07-13-question-answer-alignment";
})();
