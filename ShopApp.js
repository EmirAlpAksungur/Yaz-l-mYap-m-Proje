$(document).ready(function(){
    var kayitAd;
    var kayitSoyad;
    var kayitSifre;
    var kayitEposta;
    var kayitTc;
    var kayitNo;
    var kayitAdres;
    var kayitKullaniciAdi;
    var kayitHesapBilgi;
    var alertMesasge="";
    var anlikKullanici;
    function Kullanici(numara,ad,soyad,sifre,eposta,tc,telno,adres,bakiye,kullaniciAdi,hesapBilgi,beklenenTutar) {
        this.numara = numara,
        this.ad = ad,
        this.soyad = soyad,
        this.sifre = sifre,
        this.eposta = eposta,
        this.tc = tc,
        this.telno = telno,
        this.adres = adres,
        this.bakiye = bakiye,
        this.kullaniciAdi = kullaniciAdi,
        this.hesapBilgi = hesapBilgi,
        this.beklenenTutar = beklenenTutar
    }
    var kullanicilar = [

    ]
    var sayac = 0;
    $('#btn_HesabimVar').click(function(){
        //Kullanıcı Giriş ekranına Yönlendirme
        $('girisYap').show();
        $('kayitOl').hide();
        return false;
    });
    $('#btn_kayitOl').click(function(){
        //Tanımlanan değişkenlerin değerleri doldurulur
        kayitAd = $('#inputAd').val();
        kayitSoyad = $('#inputSoyad').val();
        kayitSifre = $('#inputSifre').val();
        kayitEposta = $('#inputE-posta').val();
        kayitTc = $('#inputTc').val();
        kayitNo = $('#inputNo').val();
        kayitAdres = $('#inputAdres').val();
        kayitKullaniciAdi = $('#inputKullaniciAdi').val();
        if($("input[name='Hesap']:checked").val()== "alici"){
            kayitHesapBilgi = "alici";
        }
        else{
            kayitHesapBilgi = "satici";
        }
        if(bilgiKontrol()){
            KisiKayit();//Kisiler Kaydedilir
        }
        else{
            alert(alertMesasge)
            alertMesasge = "";
        }
        return false;
    });
    function bilgiKontrol(){
        //bilgilerim doluluğu kontol edilir
        var dogruMu = true;
        if(kayitAd == ""){
            //ad dolu mu
            alertMesasge += "Ad Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitSoyad == ""){
             //soyad dolu mu
            alertMesasge+="Soyad Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitSifre == ""){
             //sifre dolu mu
            alertMesasge+="Sifre Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitEposta == ""){
             //eposta dolu mu
            alertMesasge+="Eposta Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitTc == ""){
             //tc dolu mu
            alertMesasge+="Tc Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitNo == ""){
             //numara dolu mu
            alertMesasge+="Numara Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitAdres == ""){
            //adres dolu mu
           alertMesasge+="Adres Kısmını Boş Bırakamazsınız.\n";
           dogruMu = false;
       }
       if(kayitKullaniciAdi == ""){
            //kullanici adı dolu mu
            alertMesasge+="Kullanıcı Adı Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        for(let i=0;i<sayac;i++){
            if(kayitKullaniciAdi==kullanicilar[i].kullaniciAdi){
                alertMesasge+="Kullanıcı adı zaten kullanılıyor.\n";
                dogruMu = false;
            }
        }
        return dogruMu;
    }
    
    function KisiKayit(){
        //kullanıcı kaydı yapılır 
        var kullanici = new Kullanici(sayac,kayitAd,kayitSoyad,kayitSifre,kayitEposta,kayitTc,kayitNo,kayitAdres,"0",kayitKullaniciAdi,kayitHesapBilgi,"0");
        kullanicilar.push(kullanici);
        sayac++;
    }
    var grsKullaniciAdi ;
    var grsSifre;
    //GİRİS
    $(".pswrd-vision").click(function(){
        
        //parola toggle
        if($('.girisPassword').attr('type')=='text'){
            //Parola gizle 
            $('.girisPassword').attr('type', 'password');
            $('.pswrd-close').hide();
            $('.pswrd-open').show();
        }
        else if($('.girisPassword').attr('type')=='password'){
            //Parola göster
            $('.girisPassword').attr('type', 'text');
            $('.pswrd-close').show();
            $('.pswrd-open').hide();
        }
    });
    $('#btn_giris_giris').click(function(){
        grsKullaniciAdi = $('#girisKullanıcıAdı').val();
        grsSifre = $('.girisPassword').val();
        if(grsKullaniciAdi == "admin" && grsSifre == "admin"){
            $('girisYap').hide();
            $('admin').show();
        }
        for(let i=0;i<sayac;i++){
            if(grsKullaniciAdi == kullanicilar[i].kullaniciAdi){
                if(grsSifre == kullanicilar[i].sifre){
                    if(kullanicilar[i].hesapBilgi == "alici"){
                        $('girisYap').hide();
                        $('alici').show();
                    }
                    if(kullanicilar[i].hesapBilgi == "satici"){
                        $('girisYap').hide();
                        $('satici').show();
                    }
                    return false;
                }
                else{
                    
                }
            }
        }
        return false;
    });
    $('#btn_giris_kayitOl').click(function(){
        //Kayit ekranı açılır
        $('girisYap').hide();
        $('kayitOl').show();
        return false;
    });


});