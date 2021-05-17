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
    function Urun(urunNo,urunAd,urunAdet,urunFiyat,urunOnay,urunEkleyenId){
        this.urunNo = urunNo,
        this.urunAd = urunAd,
        this.urunAdet = urunAdet,
        this.urunFiyat = urunFiyat,
        this.urunOnay = urunOnay,
        this.urunEkleyenId = urunEkleyenId
    }
    var urunler = [

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
            adminPanelPBK();
            adminUrunYazdir();
        }
        for(let i=0;i<sayac;i++){
            if(grsKullaniciAdi == kullanicilar[i].kullaniciAdi){
                if(grsSifre == kullanicilar[i].sifre){
                    if(kullanicilar[i].hesapBilgi == "alici"){
                        $('girisYap').hide();
                        $('alici').show();
                        aliciUrunYazdir();
                        saticiEkranDüzenle(i);
                        anlikKullanici = i;
                    }
                    if(kullanicilar[i].hesapBilgi == "satici"){
                        $('girisYap').hide();
                        $('satici').show();
                        saticiEkranDüzenle(i);
                        anlikKullanici = i;
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

    //GENEL 
    $('.Cikis').click(function(){
        $('kayitOl').show();
        $('alici').hide();
        $('satici').hide();
        $('admin').hide();
    });

    //satici ekranı
    var saticiUrunAd;
    var saticiUrunAdet;
    var saticiUrunFiyat;
    var urunSayac = 0;
    function saticiEkranDüzenle(i){
        $('.para').val(kullanicilar[i].bakiye);
    }
    $('#btn_urun_ekle').click(function(){
        saticiUrunAd = $('#inputUrunAd').val();
        saticiUrunAdet = $('#inputUrunMiktar').val();
        saticiUrunFiyat = $('#inputUrunFiyat').val();
        if(urunKontrol()){
            urunEkle();
        }
        else{
            alert(alertMesasge);
            alertMesasge = "";
        }
        return false;
    });
    function urunKontrol(){
        var dogruMu = true;
        if(saticiUrunAd == ""){
            //ad dolu mu
            alertMesasge += "Urun ad Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(saticiUrunAdet == ""){
             //soyad dolu mu
            alertMesasge+="Urun adet Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(saticiUrunFiyat == ""){
             //sifre dolu mu
            alertMesasge+="Urun Fiyat Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        return dogruMu;
    }
    function urunEkle(){
        var urun = new Urun(urunSayac,saticiUrunAd,saticiUrunAdet,saticiUrunFiyat,"Onaylanmadı",anlikKullanici);
        urunler.push(urun);
        console.log(urunler);
        urunSayac++;
    }
    //admin panel
    function adminUrunYazdir(){
        $('#adminTable').find("tr:gt(0)").remove();
        for(k=0;k<urunSayac;k++){
            if(urunler[k].urunOnay == "Onaylanmadı")
            $('#adminTable').append('<tr><td>'+urunler[k].urunNo+'</td><td>'+urunler[k].urunAd
            +'</td><td>'+urunler[k].urunAdet+'</td><td>'+urunler[k].urunFiyat+'</td><td>'+urunler[k].urunOnay+'</td></tr>');
        } 
    }
    
    $('#btn_admin_onay').click(function(){
        let urunKod = parseInt($('#adminOnayUrunId').val());
        urunler[urunKod].urunOnay = "Onaylandı";
        adminUrunYazdir();
        aliciUrunYazdir();
    });
    var paraBekleyenKullanici = [];
    function adminPanelPBK(){
        $('#adminPBKTable').find("tr:gt(0)").remove();
        for(k=0;k<paraBekleyenKullanici.length;k++){
            $('#adminPBKTable').append('<tr><td>'+kullanicilar[paraBekleyenKullanici[k]].numara+'</td><td>'+
            kullanicilar[paraBekleyenKullanici[k]].kullaniciAdi+'</td><td>'+kullanicilar[paraBekleyenKullanici[k]].beklenenTutar+'</td></tr>');
        } 
    }
    $('#btn_admin_kullanici_onay').click(function(){
        for(k=0;k<paraBekleyenKullanici.length;k++){
            if(paraBekleyenKullanici[k]==$('#adminOnayKullaniciId').val()){
                kullanicilar[paraBekleyenKullanici[k]].bakiye =parseInt(kullanicilar[paraBekleyenKullanici[k]].bakiye)+parseInt(kullanicilar[paraBekleyenKullanici[k]].beklenenTutar);
                paraBekleyenKullanici.splice(k,1)
                adminPanelPBK();
            }
        }

    });
    //alici
    function aliciUrunYazdir(){
        $('#aliciTable').find("tr:gt(0)").remove();
        for(k=0;k<urunSayac;k++){
            if(urunler[k].urunOnay == "Onaylandı")
            $('#aliciTable').append('<tr><td>'+urunler[k].urunNo+'</td><td>'+urunler[k].urunAd
            +'</td><td>'+urunler[k].urunAdet+'</td><td>'+urunler[k].urunFiyat+'</td></tr>');
        } 
    }
    $('#ParaYatir').click(function(){
        alert("Talebiniz Alınmıştır En Yakın Zamanda İşleminiz Gerçekleşecektir.");
        kullanicilar[anlikKullanici].beklenenTutar = $('#yatirmakIstenenTutar').val();
        paraBekleyenKullanici.push(anlikKullanici);
        adminPanelPBK();//admin panel para beklyen kullanici yazdir
        return false;
    });
    $('#btn_satin_al').click(function(){
        if(adetKontrol()){
            if(fiyatKontrol()){
                satisiGerceklestir();
            }
        }
        return false;
    });
    function fiyatKontrol(){
        var toplamFiyat = 0;
        var donulecekDeger = true;
        toplamFiyat = parseInt(parseInt($('#aliciUrunAdet').val()))*parseInt(urunler[parseInt($('#aliciUrunId').val())].urunFiyat);
        if(toplamFiyat > kullanicilar[anlikKullanici].bakiye){
            donulecekDeger = false
        }
        return donulecekDeger;
    }
    function adetKontrol(){
        var donulecekDeger = true;
        if(parseInt($('#aliciUrunAdet').val())>urunler[parseInt($('#aliciUrunId').val())].urunAdet){
            donulecekDeger = false;    
        }
        return donulecekDeger;
    }
    function satisiGerceklestir(){
        urunler[parseInt($('#aliciUrunId').val())].urunAdet = parseInt(urunler[parseInt($('#aliciUrunId').val())].urunAdet)-parseInt($('#aliciUrunAdet').val())
        kullanicilar[anlikKullanici].bakiye =parseInt(parseInt(kullanicilar[anlikKullanici].bakiye)-(parseInt(parseInt($('#aliciUrunAdet').val()))*parseInt(urunler[parseInt($('#aliciUrunId').val())].urunFiyat)));
        saticiEkranDüzenle(anlikKullanici);
        aliciUrunYazdir();
        kullanicilar[urunler[parseInt($('#aliciUrunId').val())].urunEkleyenId].bakiye =
        parseInt(parseInt(kullanicilar[urunler[parseInt($('#aliciUrunId').val())].urunEkleyenId].bakiye)+(parseInt(parseInt($('#aliciUrunAdet').val()))*parseInt(urunler[parseInt($('#aliciUrunId').val())].urunFiyat)));
    }

});