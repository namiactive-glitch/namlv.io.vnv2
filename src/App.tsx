import React, { useState, useEffect } from 'react';
import { 
  ChevronDown,
  ChevronUp,
  PenTool, 
  Video, 
  Sparkles, 
  Clapperboard, 
  Zap, 
  CheckCircle2, 
  PlayCircle,
  ArrowRight,
  ArrowUp,
  Mail,
  Globe,
  Facebook,
  Youtube,
  MessageCircle,
  Key,
  Film,
  Mic,
  Camera,
  Tag,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MODULES = [
  {
    title: "Xưởng Truyện (Story Studio)",
    description: "Sáng tác truyện đa dạng chủ đề: Chủ tịch, Tình cảm, Kinh dị, Nấu ăn...",
    icon: <PenTool className="w-6 h-6" />,
    color: "bg-gradient-to-br from-blue-500 to-cyan-400",
    steps: [
      "Chọn chủ đề truyện mong muốn từ danh sách gợi ý phong phú.",
      "Nhấn \"Gợi ý ý tưởng\" để AI đưa ra các cốt truyện hấp dẫn hoặc tự nhập nội dung.",
      "Quản lý nhân vật: Đặt tên, chọn giới tính và trang phục (mặc định là Cameo).",
      "Phát triển kịch bản chi tiết từng cảnh quay kèm lời thoại và mô tả hành động.",
      "Review toàn bộ prompt ở Bước 3 trước khi xuất file hoặc copy sử dụng."
    ]
  },
  {
    title: "Phân tích Video (Video Analyzer)",
    description: "Tải video lên để AI phân tích thoại, cảnh quay và tự động tạo kịch bản mới.",
    icon: <Video className="w-6 h-6" />,
    color: "bg-gradient-to-br from-orange-500 to-amber-400",
    steps: [
      "Tải video cần phân tích lên hệ thống (Hỗ trợ MP4, WebM, tối đa 20MB).",
      "Nhấn \"PHÂN TÍCH VIDEO\" để AI trích xuất lời thoại và mô tả từng cảnh quay kèm timestamp.",
      "AI sẽ tự động đưa ra cốt truyện (Plot) tổng thể dựa trên nội dung video đã phân tích.",
      "Nhấn \"TẠO KỊCH BẢN\" để AI xây dựng một kịch bản phim mới (chia thành các tập 12s).",
      "Nhấn \"CHIA PROMPT (12S)\" ở mỗi tập để nhận prompt video AI chuyên nghiệp cho cảnh đó."
    ]
  },
  {
    title: "Prompt Đơn (Cinematic)",
    description: "Tạo prompt video AI chuyên nghiệp từ ý tưởng tiếng Việt. Tối ưu cho Jimeng, Luma, Runway.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-gradient-to-br from-orange-600 to-red-500",
    steps: [
      "Nhập ý tưởng video bằng tiếng Việt (ví dụ: Một con rồng bay trên mây).",
      "Chọn nhân vật từ danh sách hoặc thêm mới để giữ tính nhất quán về ngoại hình.",
      "Hệ thống tự động dịch sang tiếng Anh chuyên ngành điện ảnh và tối ưu cấu trúc prompt.",
      "Sử dụng các nút \"Copy\" để lấy prompt và dán vào công cụ tạo video AI của bạn.",
      "Mẹo: Sử dụng nút \"Làm mới\" (RotateCcw) ở thanh menu nếu muốn bắt đầu lại từ đầu."
    ]
  },
  {
    title: "Phim Võ Thuật (Series)",
    description: "Xây dựng kịch bản phim hành động dài tập với logic va chạm vật lý cực mạnh.",
    icon: <Clapperboard className="w-6 h-6" />,
    color: "bg-gradient-to-br from-red-500 to-rose-400",
    steps: [
      "Nhập ý tưởng phim hoặc chọn từ danh sách xu hướng phim võ thuật.",
      "Phát triển kịch bản tổng thể (Outline) cho nhiều tập phim liên kết nhau.",
      "Chia nhỏ từng tập thành các cảnh quay ngắn (khoảng 12 giây mỗi cảnh).",
      "Tạo prompt có tính liên kết (Continuity) giúp nhân vật không bị thay đổi giữa các cảnh.",
      "Kiểm tra kỹ phần \"Cameo\" để đảm bảo trang phục nhân vật đồng nhất."
    ]
  },
  {
    title: "Bán Hàng (Sales Module)",
    description: "Tạo kịch bản video ngắn bán hàng, review sản phẩm theo các mô hình tâm lý khách hàng.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-gradient-to-br from-yellow-500 to-orange-400",
    steps: [
      "Nhập thông tin sản phẩm/dịch vụ chi tiết (Tên, tính năng, lợi ích).",
      "Chọn chủ đề phim (ví dụ: Chủ tịch giả nghèo, Hợp đồng hôn nhân...) để lồng ghép sản phẩm.",
      "AI sẽ tạo kịch bản kịch tính, thu hút người xem từ những giây đầu tiên.",
      "Tùy chỉnh nhân vật và trang phục để phù hợp với thương hiệu của bạn.",
      "Xuất prompt video AI để tạo ra các clip quảng cáo chuyên nghiệp, chi phí thấp."
    ]
  },
  {
    title: "Bán hàng trực tiếp (Direct Sales)",
    description: "Tạo prompt video Jimeng chuyên nghiệp cho bán hàng trực tiếp với thời lượng tùy chỉnh.",
    icon: <Video className="w-6 h-6" />,
    color: "bg-gradient-to-br from-orange-600 to-amber-500",
    steps: [
      "Nhập thông tin sản phẩm chi tiết (Tên, đặc điểm, giá bán).",
      "Chọn vùng miền (Bắc, Trung, Nam) để AI tối ưu giọng điệu và văn hóa.",
      "Chọn phong cách bán hàng (Nói giá ngay, Trải nghiệm thực tế, Bí mật...).",
      "Tùy chỉnh thời lượng video theo bước nhảy 12 giây (12s, 24s, 36s...) để tối ưu cho Jimeng.",
      "Nhấn \"TẠO PROMPT JIMENG\" để nhận 5 phiên bản prompt (Anh, Việt, Trung) chuyên nghiệp."
    ]
  },
  {
    title: "AI THỜI TRANG (Fashion AI)",
    description: "Tạo video thời trang chuyên nghiệp với người mẫu AI và bối cảnh được tối ưu tự động.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-gradient-to-br from-purple-500 to-indigo-400",
    steps: [
      "Chọn phong cách quay phim thời trang (Runway, Studio, Street Style...).",
      "Tùy chỉnh thời lượng video (12s, 24s, 36s...) để tối ưu cho Jimeng.",
      "Nhấn \"PHÂN TÍCH NGƯỜI MẪU\" để AI tự động đề xuất người mẫu và bối cảnh phù hợp.",
      "Kiểm tra và tùy chỉnh thông tin người mẫu, trang phục và môi trường.",
      "Nhấn \"TẠO PROMPT CHI TIẾT\" để nhận 5 phân cảnh trình diễn thời trang đẳng cấp."
    ]
  }
];

const MARKETING_SOLUTIONS = [
  {
    title: "Fchat - Chatbot & Marketing Automation",
    description: "Giải pháp Chatbot tự động phản hồi khách hàng 24/7 trên Fanpage, Zalo, Website.",
    icon: <MessageCircle className="w-8 h-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    btnColor: "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600",
    features: [
      "Tự động trả lời bình luận và tin nhắn",
      "Gửi tin nhắn hàng loạt cho khách hàng cũ",
      "Quản lý đơn hàng và tồn kho thông minh",
      "Tích hợp nhiều kênh bán hàng"
    ],
    link: "https://fchat.vn?ref=namlv"
  },
  {
    title: "Facebook AutoInbox - Gửi tin nhắn hàng loạt",
    description: "Gửi tin nhắn hàng loạt cho khách cũ trên FANPAGE với nội dung chứa quảng cáo kèm ảnh, Link!",
    icon: <Mail className="w-8 h-8" />,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    btnColor: "bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600",
    features: [
      "Gửi tin nhắn hàng loạt cho khách hàng cũ",
      "Nội dung chứa quảng cáo kèm ảnh và Link",
      "Tối ưu hóa tỷ lệ tiếp cận khách hàng",
      "Quản lý chiến dịch gửi tin chuyên nghiệp"
    ],
    link: "https://fbinbox.net/?ref=namlv"
  },
  {
    title: "Zinbox - Giải pháp Marketing Zalo chuyên nghiệp",
    description: "Công cụ hỗ trợ gửi tin nhắn Zalo hàng loạt, quản lý danh sách bạn bè và chăm sóc khách hàng trên nền tảng Zalo hiệu quả.",
    icon: <Zap className="w-8 h-8" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    btnColor: "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600",
    features: [
      "Gửi tin nhắn Zalo hàng loạt",
      "Kết bạn tự động",
      "Chăm sóc khách hàng cũ"
    ],
    link: "https://zinbox.net/?ref=namlv"
  }
];

const VEO3_MODULES = [
  {
    title: "Cài đặt chung & API Key",
    description: "Cấu hình hệ thống và quản lý khóa truy cập Gemini API.",
    icon: <Key className="w-6 h-6" />,
    color: "bg-gradient-to-br from-amber-500 to-yellow-400",
    steps: [
      "Hệ thống yêu cầu Gemini API Key để hoạt động. Bạn có thể nhập một hoặc nhiều Key (mỗi Key một dòng).",
      "Hệ thống tự động xoay vòng Key nếu một Key bị hết hạn hoặc lỗi Quota (429).",
      "Dữ liệu của bạn được lưu trữ cục bộ (LocalStorage), đảm bảo tính riêng tư."
    ],
    noButton: true
  },
  {
    title: "Nhân Hóa (Tạo Kịch bản)",
    description: "Quy trình thiết lập nhân vật và kịch bản chi tiết theo từng phân cảnh.",
    icon: <Film className="w-6 h-6" />,
    color: "bg-gradient-to-br from-orange-500 to-amber-400",
    steps: [
      "Bước 1: Thiết lập nhân vật (Tên, vai trò, giọng đọc). Tối đa 4 nhân vật.",
      "Bước 2: Chọn chủ đề hoặc nhập kịch bản có sẵn. Bạn có thể dùng nút \"Gợi ý\" để AI tìm ý tưởng.",
      "Bước 3: Chọn phong cách hình ảnh (Người thật hoặc Hoạt hình 3D) và cảm xúc lời thoại.",
      "Bước 4: Bấm \"Tạo Kịch bản & Prompt\" để nhận kết quả chi tiết từng cảnh quay."
    ]
  },
  {
    title: "Giọng Đọc (TTS)",
    description: "Chuyển đổi văn bản thành giọng nói tự nhiên với cảm xúc và nhấn nhá.",
    icon: <Mic className="w-6 h-6" />,
    color: "bg-gradient-to-br from-blue-500 to-indigo-400",
    steps: [
      "Nhập văn bản và chọn giọng đọc phù hợp (Nam/Nữ, vùng miền).",
      "Sử dụng \"Style Instruction\" để điều chỉnh cảm xúc, tốc độ và cách nhấn nhá của AI.",
      "Có thể tối ưu hóa hướng dẫn đọc bằng AI để giọng nói tự nhiên hơn.",
      "Tải xuống file âm thanh chất lượng cao để lồng tiếng cho video."
    ]
  },
  {
    title: "ẢNH AI (Vision & Try-On)",
    description: "Phân tích đặc điểm ngoại hình và thử đồ thực tế ảo chuyên nghiệp.",
    icon: <Camera className="w-6 h-6" />,
    color: "bg-gradient-to-br from-emerald-500 to-teal-400",
    steps: [
      "Quét Ảnh: Tải lên ảnh để AI phân tích đặc điểm ngoại hình, trang phục và bối cảnh.",
      "Thử Đồ: Tải lên ảnh người mẫu và sản phẩm để AI tự động \"mặc\" đồ chân thực.",
      "Hệ thống tạo ra nhiều phiên bản khác nhau để bạn dễ dàng lựa chọn.",
      "Kết quả có thể dùng làm Prompt tham chiếu cho các module tạo kịch bản."
    ]
  },
  {
    title: "AFFILIATE VEO3 (Review & Mẹo vặt)",
    description: "Chuyên dụng cho Review sản phẩm không lộ mặt và Mẹo vặt đời sống.",
    icon: <Tag className="w-6 h-6" />,
    color: "bg-gradient-to-br from-rose-500 to-pink-400",
    steps: [
      "Tạo kịch bản review sản phẩm không lộ mặt (Non-Face Review) chuyên nghiệp.",
      "Tạo kịch bản mẹo vặt (Life Hacks) độc đáo, mới lạ từ gợi ý của AI.",
      "Tự động tạo hình ảnh minh họa AI cho từng phân cảnh dựa trên ảnh sản phẩm thật hoặc bối cảnh mẹo vặt.",
      "Hỗ trợ nhiều bố cục kịch bản TikTok/Shorts và phong cách hình ảnh khác nhau."
    ]
  }
];

export default function App() {
  const JIMENG_URL = "https://jimeng.namlv.io.vn/";
  const VEO3_URL = "https://veo3.namlv.io.vn/";
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isJimengOpen, setIsJimengOpen] = useState(false);
  const [isVeo3Open, setIsVeo3Open] = useState(false);

  useEffect(() => {
    if (isJimengOpen) {
      setTimeout(() => {
        document.getElementById('jimeng-content')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isJimengOpen]);

  useEffect(() => {
    if (isVeo3Open) {
      setTimeout(() => {
        document.getElementById('veo3-content')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isVeo3Open]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Purple Bar */}
      <div className="h-1 bg-indigo-600 w-full fixed top-0 z-[60]" />
      
      {/* Sticky Navigation Menu */}
      <nav className="sticky top-1 z-50 bg-blue-600 backdrop-blur-md border-b border-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 gap-2 sm:gap-4">
            <div className="flex bg-white/10 p-1 rounded-2xl gap-1 items-center border border-white/20">
              <button 
                onClick={() => document.getElementById('prompt-ai')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white hover:bg-white/20 transition-all active:scale-95 uppercase tracking-wide"
              >
                <Sparkles className="w-5 h-5" />
                <span className="hidden sm:inline">PROMPT AI</span>
                <span className="sm:hidden">PROMPT</span>
              </button>

              <button 
                onClick={() => document.getElementById('course-ai')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white hover:bg-white/20 transition-all active:scale-95 uppercase tracking-wide"
              >
                <Zap className="w-5 h-5" />
                <span className="hidden sm:inline">KHÓA HỌC AI</span>
                <span className="sm:hidden">KHÓA HỌC</span>
              </button>

              <button 
                onClick={() => document.getElementById('marketing-solutions')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-blue-600 bg-white shadow-lg hover:bg-blue-50 transition-all active:scale-95 uppercase tracking-wide"
              >
                <Zap className="w-5 h-5" />
                <span className="hidden sm:inline">Giải pháp Marketing</span>
                <span className="sm:hidden">MARKETING</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Promotional Banner */}
      <div className="bg-orange-50 border-b border-orange-100 py-3 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider animate-pulse">
            <Zap className="w-3 h-3" />
            HOT DEAL
          </div>
          <p className="text-orange-900 font-bold text-sm sm:text-base">
            Cung cấp tài khoản <span className="text-orange-600 underline decoration-orange-300 underline-offset-4">Capcut, Veo3 giá rẻ</span> liên hệ Nam <a href="tel:0981028794" className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 transition-colors ml-1 shadow-sm">0981028794</a>
          </p>
        </div>
      </div>

      {/* Header/Hero Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Standalone Marketing Solution Section */}
          <div id="marketing-solutions" className="mb-24 scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-4">
                GIẢI PHÁP MARKETING DOANH NGHIỆP
              </h2>
              <p className="text-slate-500 text-xl max-w-3xl mx-auto">
                Tối ưu hóa quy trình bán hàng, tự động hóa chăm sóc khách hàng và tăng trưởng doanh thu với các công cụ hàng đầu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MARKETING_SOLUTIONS.map((solution, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-[2.5rem] shadow-xl border-2 ${solution.borderColor} p-8 flex flex-col h-full transition-all hover:shadow-2xl hover:-translate-y-1`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`${solution.bgColor} ${solution.color} p-4 rounded-2xl shadow-sm`}>
                      {solution.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                      {solution.title}
                    </h3>
                  </div>

                  <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="space-y-4 mb-10 flex-grow">
                    {solution.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-600 leading-snug">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a 
                    href={solution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-white font-bold uppercase tracking-wider transition-all active:scale-95 shadow-lg ${solution.btnColor}`}
                  >
                    Tìm hiểu thêm
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div id="prompt-ai" className="text-center mb-12 scroll-mt-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-4">
              Tạo Prompt Với Các Phân Hệ AI
            </h2>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto">
              Hệ thống tạo prompt chuyên sâu giúp bạn làm chủ các công cụ sáng tạo video AI mạnh mẽ nhất hiện nay.
            </p>
          </div>

          {/* Main Module Selection Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* JIMENG Card */}
            <div 
              className={`bg-white rounded-3xl p-8 border transition-all duration-500 flex flex-col h-full group ${
                isJimengOpen 
                ? 'border-orange-500 shadow-2xl ring-4 ring-orange-50' 
                : 'border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:scale-110 ${isJimengOpen ? 'bg-gradient-to-br from-orange-600 to-red-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'}`}>
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <button 
                    onClick={() => {
                      setIsJimengOpen(!isJimengOpen);
                      setIsVeo3Open(false);
                    }}
                    className="p-2 hover:bg-orange-50 rounded-full transition-colors"
                  >
                    {isJimengOpen ? <ChevronUp className="w-6 h-6 text-orange-600" /> : <ChevronDown className="w-6 h-6 text-slate-400" />}
                  </button>
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase">VIDEO JIMENG</h3>
                  <p className="text-sm font-bold text-orange-600 uppercase tracking-wider">ByteDance AI Video</p>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Giải pháp sáng tạo video AI hàng đầu từ ByteDance, tích hợp công nghệ Seedance 2.0 giúp tạo ra những thước phim điện ảnh chuyên nghiệp.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    { title: "Xưởng Truyện", desc: "Sáng tác truyện đa dạng chủ đề" },
                    { title: "Phân tích Video", desc: "Tự động tạo kịch bản từ video" },
                    { title: "Prompt Đơn", desc: "Tạo prompt video chuyên nghiệp" },
                    { title: "Phim Võ Thuật", desc: "Xây dựng kịch bản phim hành động" },
                    { title: "Bán Hàng", desc: "Tạo kịch bản video review sản phẩm" },
                    { title: "AI THỜI TRANG", desc: "Tạo video người mẫu AI chuyên nghiệp" }
                  ].map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{feature.title}</span>
                        <span className="text-xs text-slate-500">{feature.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => {
                  setIsJimengOpen(!isJimengOpen);
                  setIsVeo3Open(false);
                }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-black text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-200 hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                {isJimengOpen ? 'Thu gọn nội dung' : 'Khám phá các module'}
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isJimengOpen ? '-rotate-90' : ''}`} />
              </button>
            </div>

            {/* VEO3 Card */}
            <div 
              className={`bg-white rounded-3xl p-8 border transition-all duration-500 flex flex-col h-full group ${
                isVeo3Open 
                ? 'border-orange-500 shadow-2xl ring-4 ring-orange-50' 
                : 'border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:scale-110 ${isVeo3Open ? 'bg-gradient-to-br from-orange-600 to-red-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'}`}>
                    <Video className="w-8 h-8" />
                  </div>
                  <button 
                    onClick={() => {
                      setIsVeo3Open(!isVeo3Open);
                      setIsJimengOpen(false);
                    }}
                    className="p-2 hover:bg-orange-50 rounded-full transition-colors"
                  >
                    {isVeo3Open ? <ChevronUp className="w-6 h-6 text-orange-600" /> : <ChevronDown className="w-6 h-6 text-slate-400" />}
                  </button>
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase">VIDEO VEO3</h3>
                  <p className="text-sm font-bold text-orange-600 uppercase tracking-wider">Next-Gen Video AI</p>
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Công cụ tạo video AI thế hệ mới, tối ưu cho việc sản xuất nội dung ngắn, video viral và các chiến dịch quảng cáo mạng xã hội.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    { title: "Cài đặt chung", desc: "Quản lý Gemini API Key" },
                    { title: "Nhân Hóa", desc: "Thiết lập nhân vật và kịch bản" },
                    { title: "Giọng Đọc", desc: "Chuyển văn bản thành giọng nói" },
                    { title: "ẢNH AI", desc: "Phân tích ngoại hình & thử đồ ảo" },
                    { title: "AFFILIATE VEO3", desc: "Review sản phẩm & mẹo vặt" }
                  ].map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-slate-700 font-medium">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{feature.title}</span>
                        <span className="text-xs text-slate-500">{feature.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => {
                  setIsVeo3Open(!isVeo3Open);
                  setIsJimengOpen(false);
                }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-black text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-200 hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                {isVeo3Open ? 'Thu gọn nội dung' : 'Khám phá các module'}
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isVeo3Open ? '-rotate-90' : ''}`} />
              </button>
            </div>
          </div>

          {/* Content Sections - Moved here to be below cards and above course */}
          <div className="space-y-12">
            {/* JIMENG Content */}
            <AnimatePresence>
              {isJimengOpen && (
                <motion.div 
                  id="jimeng-content"
                  initial={{ height: 0, opacity: 0, y: 20 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="overflow-hidden scroll-mt-24"
                >
                  <div className="mb-8 flex items-center gap-4">
                    <div className="h-px flex-grow bg-slate-200"></div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">DANH SÁCH MODULE JIMENG</h3>
                    <div className="h-px flex-grow bg-slate-200"></div>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 p-1 mb-16">
                    {MODULES.map((module, index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group"
                      >
                        <div className="p-8 flex-grow">
                          <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 ${module.color}`}>
                              {module.icon}
                            </div>
                            <div className="bg-slate-50 p-3 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                              <ArrowRight className="w-6 h-6" />
                            </div>
                          </div>

                          <div className="mb-4">
                            <h3 className="text-2xl font-black text-slate-900 leading-tight">{module.title}</h3>
                            <p className="text-sm font-bold text-orange-600 uppercase tracking-wider">Module Chuyên Sâu</p>
                          </div>
                          
                          <p className="text-slate-600 mb-8 leading-relaxed">
                            {module.description}
                          </p>

                          <div className="space-y-4">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                              QUY TRÌNH THỰC HIỆN:
                            </h4>
                            {module.steps.map((step, sIndex) => (
                              <div key={sIndex} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0 mt-0.5">
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <p className="text-slate-700 font-medium leading-snug">
                                  {step}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-8 pt-0">
                          <a 
                            href={JIMENG_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-white font-black text-lg uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-200 active:scale-95 ${module.color.replace('bg-', 'bg-gradient-to-r from-').replace('to-', ' via-').concat(' to-pink-500')}`}
                          >
                            <PlayCircle className="w-6 h-6" />
                            BẮT ĐẦU NGAY
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* VEO3 Content */}
            <AnimatePresence>
              {isVeo3Open && (
                <motion.div 
                  id="veo3-content"
                  initial={{ height: 0, opacity: 0, y: 20 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="overflow-hidden scroll-mt-24"
                >
                  <div className="mb-8 flex items-center gap-4">
                    <div className="h-px flex-grow bg-slate-200"></div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">DANH SÁCH MODULE VEO3</h3>
                    <div className="h-px flex-grow bg-slate-200"></div>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 p-1 mb-16">
                    {VEO3_MODULES.map((module, index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group"
                      >
                        <div className="p-8 flex-grow">
                          <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 ${module.color}`}>
                              {module.icon}
                            </div>
                            <div className="bg-slate-50 p-3 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                              <ArrowRight className="w-6 h-6" />
                            </div>
                          </div>

                          <div className="mb-4">
                            <h3 className="text-2xl font-black text-slate-900 leading-tight">{module.title}</h3>
                            <p className="text-sm font-bold text-orange-600 uppercase tracking-wider">Module Chuyên Sâu</p>
                          </div>
                          
                          <p className="text-slate-600 mb-8 leading-relaxed">
                            {module.description}
                          </p>

                          <div className="space-y-4">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                              QUY TRÌNH THỰC HIỆN:
                            </h4>
                            {module.steps.map((step, sIndex) => (
                              <div key={sIndex} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0 mt-0.5">
                                  <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <p className="text-slate-700 font-medium leading-snug">
                                  {step}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {!module.noButton && (
                          <div className="p-8 pt-0">
                            <a 
                              href={VEO3_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-white font-black text-lg uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-200 active:scale-95 ${module.color.replace('bg-', 'bg-gradient-to-r from-').replace('to-', ' via-').concat(' to-pink-500')}`}
                            >
                              <PlayCircle className="w-6 h-6" />
                              BẮT ĐẦU NGAY
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* New Course Section */}
          <div id="course-ai" className="bg-white rounded-3xl p-8 border border-orange-100 shadow-xl mb-16 relative overflow-hidden group scroll-mt-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150 opacity-50" />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg">
                      <PlayCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight uppercase">
                      Khóa học Xây dựng thương hiệu cá nhân với AI
                    </h3>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Nội dung khóa học xoay quanh việc sử dụng ứng dụng Jimeng và Veo3 để tạo ra video phát triển thương hiệu cá nhân và Affilate sản phẩm không cần mua mẫu.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://zalo.me/g/your_group_link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-4 px-8 rounded-2xl bg-gradient-to-r from-orange-600 to-red-500 text-white font-black text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-200 hover:-translate-y-1 transition-all duration-300 active:scale-95 whitespace-nowrap"
                  >
                    Vào nhóm khóa học
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://zalo.me/0981028794" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-4 px-8 rounded-2xl bg-white border-2 border-orange-500 text-orange-600 font-black text-lg flex items-center justify-center gap-2 shadow-md hover:bg-orange-50 hover:-translate-y-1 transition-all duration-300 active:scale-95 whitespace-nowrap"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Zalo Tư Vấn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-orange-600 p-2 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900">Nam AI Studio</span>
              </div>
              <p className="text-slate-500 leading-relaxed max-w-sm">
                Hệ sinh thái AI tích hợp kịch bản, hình ảnh, giọng nói và tự động hóa Marketing.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-orange-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-orange-400 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Liên kết nhanh</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Hướng dẫn sử dụng</a></li>
                <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Bảng giá dịch vụ</a></li>
                <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Điều khoản & Chính sách</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Thông tin liên hệ</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-500">
                  <MessageCircle className="w-5 h-5 text-orange-600" />
                  <span className="hover:text-orange-600 transition-colors">Zalo hỗ trợ: 0981028794</span>
                </li>
                <li className="flex items-center gap-3 text-slate-500">
                  <Globe className="w-5 h-5 text-orange-600" />
                  <a href="https://namlv.io.vn/" target="_blank" rel="noreferrer" className="hover:text-orange-600 transition-colors">namlv.io.vn</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>© 2026 Nam AI Studio. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-600">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-orange-600 text-white rounded-full shadow-2xl transition-all duration-300 z-50 hover:bg-orange-700 hover:scale-110 active:scale-95 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}
