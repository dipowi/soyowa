import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MessageCircle } from "lucide-react";

const Index = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "628994656888";
    const message = "Halo, saya ingin konfirmasi pesanan dan mendapatkan detail login untuk akun saya.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background: 'var(--gradient-background)'}}>
      <div className="w-full max-w-[730px] animate-fade-in">
        <Card className="border-0 shadow-2xl" style={{background: 'var(--gradient-card)'}}>
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <CheckCircle className="w-16 h-16 text-success animate-pulse-success" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Pemesanan Berhasil!
            </h1>
            
            {/* Thank you message */}
            <p className="text-lg text-muted-foreground mb-8">
              Terima kasih atas kepercayaan Anda.
            </p>

            {/* Confirmation message */}
            <p className="text-foreground mb-12 leading-relaxed">
              Pesanan Anda telah berhasil kami konfirmasi dan akan segera diproses.
            </p>

            {/* Activation Instructions */}
            <div className="bg-secondary/50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Untuk Aktivasi Akun:
              </h2>
              
              <div className="space-y-3 text-muted-foreground">
                <p>• Silakan lakukan konfirmasi pesanan dengan menghubungi tim kami melalui WhatsApp.</p>
                <p>• Kirimkan alamat email yang Anda gunakan untuk checkout di Lynk.id</p>
                <p>• Detail login dan panduan penggunaan akan kami kirimkan melalui WhatsApp</p>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button 
              variant="whatsapp" 
              size="lg" 
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto px-8 py-6 text-lg font-semibold"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Hubungi WhatsApp
            </Button>

            {/* Help text */}
            <p className="text-sm text-muted-foreground mt-6">
              Kami siap membantu jika Anda memiliki pertanyaan lebih lanjut.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
