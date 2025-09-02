import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Settings, Phone, MessageCircle, Save } from "lucide-react";

const Dashboard = () => {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const { toast } = useToast();

  // Load saved settings on component mount
  useEffect(() => {
    const savedNumber = localStorage.getItem("whatsappNumber") || "628994656888";
    const savedMessage = localStorage.getItem("whatsappMessage") || "Halo, saya ingin konfirmasi pesanan dan mendapatkan detail login untuk akun saya.";
    
    setWhatsappNumber(savedNumber);
    setWhatsappMessage(savedMessage);
  }, []);

  const handleSave = () => {
    // Validate phone number (basic Indonesian format)
    if (!whatsappNumber || whatsappNumber.length < 10) {
      toast({
        title: "Error",
        description: "Nomor WhatsApp tidak valid. Pastikan format yang benar.",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem("whatsappNumber", whatsappNumber);
    localStorage.setItem("whatsappMessage", whatsappMessage);

    toast({
      title: "Berhasil!",
      description: "Pengaturan WhatsApp telah disimpan.",
    });

    // Dispatch custom event to notify homepage of changes
    window.dispatchEvent(new CustomEvent("whatsappSettingsUpdated"));
  };

  const handleTestWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen p-4" style={{background: 'var(--gradient-background)'}}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Dashboard Pengaturan
          </h1>
          <p className="text-muted-foreground">
            Kelola pengaturan WhatsApp untuk halaman homepage
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="border-0 shadow-xl" style={{background: 'var(--gradient-card)'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Phone className="w-5 h-5 text-whatsapp" />
                Pengaturan WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number" className="text-foreground">
                  Nomor WhatsApp
                </Label>
                <Input
                  id="whatsapp-number"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="628994656888"
                  className="bg-secondary/50 border-border text-foreground"
                />
                <p className="text-sm text-muted-foreground">
                  Format: 628xxxxxxxxxx (tanpa tanda +)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp-message" className="text-foreground">
                  Pesan Default
                </Label>
                <Textarea
                  id="whatsapp-message"
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  placeholder="Masukkan pesan default yang akan dikirim..."
                  rows={4}
                  className="bg-secondary/50 border-border text-foreground resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Pesan ini akan otomatis terisi ketika pengguna mengklik tombol WhatsApp
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={handleSave}
                  className="flex-1"
                  size="lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Pengaturan
                </Button>
                
                <Button 
                  variant="whatsapp"
                  onClick={handleTestWhatsApp}
                  className="flex-1"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Test WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl" style={{background: 'var(--gradient-card)'}}>
            <CardHeader>
              <CardTitle className="text-foreground">Preview Saat Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
                <p className="text-sm text-muted-foreground">Nomor:</p>
                <p className="text-foreground font-mono">{whatsappNumber || "Belum diatur"}</p>
                
                <p className="text-sm text-muted-foreground pt-2">Pesan:</p>
                <p className="text-foreground">{whatsappMessage || "Belum diatur"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;