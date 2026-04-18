import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, Phone, Mail, MapPin, Instagram, Facebook, ChevronRight, Play, MessageCircle } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if(el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative font-sans text-primary-900 bg-primary-50">
      
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-primary-50/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="cursor-pointer flex items-center gap-3" onClick={() => scrollTo('home')}>
            {/* Sử dụng class mix-blend-multiply để làm trong suốt nền vàng nhạt của ảnh logo nếu nó không phải là PNG trong suốt */}
            <img src="/logo.png" alt="Ú Cake Logo" className="h-12 w-auto md:h-14 mix-blend-multiply" />
            <span className="text-2xl font-serif font-bold text-primary-900 tracking-tight mt-1">Ú Cake</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium text-primary-800">
            <button onClick={() => scrollTo('home')} className="hover:text-primary-500 transition-colors">Trang chủ</button>
            <button onClick={() => scrollTo('about')} className="hover:text-primary-500 transition-colors">Câu chuyện</button>
            <button onClick={() => scrollTo('menu')} className="hover:text-primary-500 transition-colors">Bộ sưu tập</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-primary-500 transition-colors">Liên hệ</button>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-primary-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-primary-100 flex flex-col items-center justify-center space-y-8 text-xl uppercase tracking-widest font-serif font-medium text-primary-900 md:hidden"
          >
            <button onClick={() => scrollTo('home')} className="hover:text-primary-500 transition-colors">Trang chủ</button>
            <button onClick={() => scrollTo('about')} className="hover:text-primary-500 transition-colors">Câu chuyện</button>
            <button onClick={() => scrollTo('menu')} className="hover:text-primary-500 transition-colors">Bộ sưu tập</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-primary-500 transition-colors">Liên hệ</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex border-b border-primary-200 overflow-hidden">
        {/* Left pane details */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 relative z-10 bg-primary-50/50 backdrop-blur-xs lg:backdrop-blur-none lg:bg-transparent">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left pt-20"
          >
            <motion.p variants={fadeIn} className="text-sm uppercase tracking-widest text-primary-600 mb-6 font-semibold">
              Tiệm bánh thủ công cao cấp
            </motion.p>
            <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-serif font-light mb-8 leading-[0.9] text-primary-900">
              Vị ngọt <br/> 
              <span className="italic text-primary-600">tinh tế,</span> <br/>
              Khó quên.
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg text-primary-800 mb-10 max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
              Ú Cake mang đến những chiếc bánh được tạo nên từ nguyên liệu hảo hạng nhất, chăm chút từng chi tiết để tạo nên trải nghiệm trọn vẹn.
            </motion.p>
            <motion.button variants={fadeIn} onClick={() => scrollTo('menu')} className="inline-flex items-center space-x-3 border border-primary-800 text-primary-900 rounded-full py-4 px-8 uppercase tracking-widest text-xs font-semibold hover:bg-primary-900 hover:text-primary-50 transition-all duration-300">
              <span>Khám phá Menu</span>
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        </div>
        {/* Right pane image */}
        <div className="absolute inset-0 lg:relative lg:w-1/2 h-full z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000&auto=format&fit=crop" 
            alt="Delicious Cake" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary-900/20 lg:bg-transparent"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-primary-100 relative">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Image/Video Placeholder */}
            <motion.div variants={fadeIn} className="relative aspect-[3/4] lg:aspect-square clip-oval w-full max-w-md mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1621236378699-8597fb842b58?q=80&w=1000&auto=format&fit=crop" 
                alt="Baking Process"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors hover:bg-black/40 group cursor-pointer">
                <div className="w-20 h-20 bg-primary-50/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-900 group-hover:scale-110 transition-transform">
                  <Play size={32} className="ml-1" />
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div variants={fadeIn} className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-primary-900 leading-tight">
                Hơn cả một chiếc bánh, <br/>đó là <span className="italic text-primary-600">nghệ thuật</span>
              </h2>
              <div className="w-16 h-px bg-primary-400 mx-auto lg:mx-0 mb-8"></div>
              <p className="mb-6 text-primary-800 leading-relaxed font-light">
                Ra đời với niềm đam mê sâu sắc dành cho thế giới ngọt ngào, Ú Cake luôn đặt tiêu chuẩn cao nhất cho từng nguyên liệu. Từ bơ Pháp thượng hạng, socola nguyên chất đến trái cây tươi tuyển chọn mỗi ngày.
              </p>
              <p className="text-primary-800 leading-relaxed font-light mb-10">
                Chúng tôi hi vọng mỗi miếng bánh không chỉ thỏa mãn vị giác, mà còn là một khoảnh khắc của sự nuông chiều bản thân, của những niềm vui sẻ chia cùng người thân yêu.
              </p>
              <div className="flex items-center gap-6 justify-center lg:justify-start">
                  <div className="text-center">
                    <span className="block text-3xl font-serif text-primary-900">5+</span>
                    <span className="text-xs uppercase tracking-widest text-primary-600 mt-1 block">Năm kinh nghiệm</span>
                  </div>
                  <div className="w-px h-12 bg-primary-300"></div>
                  <div className="text-center">
                    <span className="block text-3xl font-serif text-primary-900">100%</span>
                    <span className="text-xs uppercase tracking-widest text-primary-600 mt-1 block">Tươi mỗi ngày</span>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu Collection */}
      <section id="menu" className="py-24 lg:py-32 bg-primary-50 border-y border-primary-200">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <p className="text-sm uppercase tracking-widest text-primary-600 mb-4 font-semibold">Must Try</p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary-900">Bộ Sưu Tập Nổi Bật</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Panna Cotta", desc: "Đủ vị trái cây tươi: Dâu, Chanh dây, Việt quất, Kiwi, Xoài, Đào, Dưa lưới.", price: "15.000đ / cái", img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800&auto=format&fit=crop" },
              { name: "Tart Trứng", desc: "Vỏ xốp giòn rụm, nhân kem trứng béo ngậy nướng vàng xém.", price: "15K/1 cái • 40K/3 cái • 60K/5 cái", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800&auto=format&fit=crop" },
              { name: "Tiramisu", desc: "Truyền thống, Dâu, Xoài chanh dây, Đào, Oreo, Matcha, Khoai môn, Nho, Việt quất.", price: "50K - 55K / cái", img: "https://images.unsplash.com/photo-1586040140378-b5634cb4c8cb?q=80&w=800&auto=format&fit=crop" },
              { name: "Bông Lan Trứng Muối", desc: "Bánh cup nhỏ mềm xốp, phủ sốt béo ngậy và chà bông thơm lừng.", price: "15K/cái • 50K/hộp", img: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=800&auto=format&fit=crop" },
              { name: "Mousse", desc: "Trái cây: Dâu tây, Chanh dây, Bơ, Xoài, Nhãn, Việt quất, Dưa lưới.", price: "50.000đ / hộp", img: "https://images.unsplash.com/photo-1550468407-1d89e7cdfbab?q=80&w=800&auto=format&fit=crop" },
              { name: "Flangato", desc: "Bánh Flan mềm mịn kết hợp cà phê thơm lức, ngọt đắng cân bằng.", price: "45.000đ / cái", img: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?q=80&w=800&auto=format&fit=crop" },
              { name: "Sữa chua (Yogurt)", desc: "Sữa chua nhà làm sánh mịn, ngọt dịu thanh mát cực tốt cho sức khỏe.", price: "10.000đ / hủ", img: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?q=80&w=800&auto=format&fit=crop" },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-t-[40px] rounded-b-md aspect-[4/5] bg-primary-200 mb-6">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">{item.name}</h3>
                  <p className="text-sm font-light text-primary-800 mb-4 px-4">{item.desc}</p>
                  <span className="text-lg font-serif italic text-primary-600">{item.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button className="border-b-2 border-primary-800 pb-2 text-sm uppercase tracking-widest font-semibold hover:text-primary-600 hover:border-primary-600 transition-colors">
              Xem toàn bộ menu
            </button>
          </div>
        </div>
      </section>

      {/* Note / Banner Section */}
      <section className="py-24 bg-primary-800 text-primary-50 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight max-w-4xl mx-auto">
          "Nhận thiết kế bánh kem theo yêu cầu cho các dịp đặc biệt: Sinh nhật, Kỷ niệm, Cưới hỏi..."
        </h2>
        <p className="text-primary-200 uppercase tracking-widest text-sm font-medium">Đặt bánh trước ít nhất 24 tiếng để được phục vụ chu đáo nhất</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32 bg-primary-100">
        <div className="container mx-auto px-6 md:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-light text-primary-900 mb-8">
                Đặt bánh & <br/> <span className="italic text-primary-600">Liên hệ với chúng tôi</span>
              </h2>
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary-600 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-primary-900 uppercase tracking-widest text-sm mb-1">Địa chỉ</h4>
                    <p className="text-primary-800 font-light">76 Mạc Thanh Đạm, Long Điền<br/>TP. Hồ Chí Minh</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-primary-600 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-primary-900 uppercase tracking-widest text-sm mb-1">Hotline / Zalo</h4>
                    <p className="text-primary-800 font-light">0796 500 409</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-primary-600 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-primary-900 uppercase tracking-widest text-sm mb-1">Email</h4>
                    <p className="text-primary-800 font-light">hello@ucake.com</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-primary-900 text-sm mb-4">Kết nối với Ú Cake</h4>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/people/%C3%9A-Cake/61577435911102/" className="w-12 h-12 rounded-full border border-primary-300 flex justify-center items-center hover:bg-primary-900 hover:text-white transition-colors text-primary-800">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-primary-50 p-8 md:p-12 rounded-2xl shadow-sm border border-primary-200"
            >
              <h3 className="text-2xl font-serif text-primary-900 mb-6">Gửi yêu cầu tới tiệm</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary-800 mb-2 font-semibold">Tên của bạn</label>
                  <input type="text" className="w-full bg-transparent border-b border-primary-300 py-3 text-primary-900 focus:outline-none focus:border-primary-600 transition-colors" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary-800 mb-2 font-semibold">Số điện thoại</label>
                  <input type="tel" className="w-full bg-transparent border-b border-primary-300 py-3 text-primary-900 focus:outline-none focus:border-primary-600 transition-colors" placeholder="09xx xxx xxx" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary-800 mb-2 font-semibold">Loại bánh / Ghi chú</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-primary-300 py-3 text-primary-900 focus:outline-none focus:border-primary-600 transition-colors resize-none" placeholder="Bạn muốn đặt bánh cho dịp gì?"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary-900 text-primary-50 text-sm uppercase tracking-widest font-semibold py-4 rounded-md hover:bg-primary-800 transition-colors shadow-lg">
                  Gửi yêu cầu
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-primary-200 py-12 text-center border-t border-primary-800">
        <div className="font-serif text-3xl mb-4 text-primary-50">Ú Cake</div>
        <p className="text-sm font-light opacity-80">&copy; {new Date().getFullYear()} Ú Cake Bakery. Bản quyền thuộc về Tiệm bánh Ú Cake.</p>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {/* Facebook Button */}
        <a 
          href="https://m.me/61577435911102" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0084FF] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform overflow-visible group"
        >
          <Facebook size={24} className="relative z-10" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out relative z-10 font-medium pl-0 group-hover:pl-3">
            Chat Facebook
          </span>
        </a>

        {/* Zalo Button */}
        <a 
          href="https://zalo.me/0796500409" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0068ff] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform overflow-visible group"
        >
          <MessageCircle size={24} className="relative z-10" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out relative z-10 font-medium pl-0 group-hover:pl-3">
            Chat Zalo
          </span>
        </a>

        {/* Hotline Button */}
        <a 
          href="tel:0796500409" 
          className="bg-[#e05a5a] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform overflow-visible group relative"
        >
          <span className="absolute inset-0 rounded-full bg-[#e05a5a] animate-ping opacity-75"></span>
          <Phone size={24} className="relative z-10 animate-bounce" style={{animationDuration: '2s'}} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out relative z-10 font-medium pl-0 group-hover:pl-3">
            Gọi món ngay
          </span>
        </a>
      </div>

    </div>
  );
}
