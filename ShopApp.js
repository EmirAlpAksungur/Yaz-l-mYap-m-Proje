$(document).ready(function(){
    var kayitAd;//Kulanıcı Kayitta Ad için kullanılan input
    var kayitSoyad;//Kulanıcı Kayitta soyad için kullanılan input
    var kayitSifre;//Kulanıcı Kayitta sifre için kullanılan input
    var kayitEposta;//Kulanıcı Kayitta eposta için kullanılan input
    var kayitTc;//Kulanıcı Kayitta tc için kullanılan input
    var kayitNo;//Kulanıcı Kayitta no için kullanılan input
    var kayitAdres;//Kulanıcı Kayitta adres için kullanılan input
    var kayitKullaniciAdi;//Kulanıcı Kayitta kullanici adı için kullanılan input
    var kayitHesapBilgi;//Kulanıcı Kayitta hesap bilgisi için kullanılan input
    var alertMesasge="";//alert mesajlarını bunun içinde toplayıp yazdırırız
    var anlikKullanici;//İşlem yapan kullanıcıyı tespit için kullanılır
    function Kullanici(numara,ad,soyad,sifre,eposta,tc,telno,adres,bakiye,kullaniciAdi,hesapBilgi,beklenenTutar,beklenenBirim) {
        //Kullanıcı eklerken gerekli bilgilerin alınmasını kolaylaştıran construter
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
        this.beklenenTutar = beklenenTutar,
        this.beklenenBirim = beklenenBirim,
        this.alinacaklarList = []
    }
    function Rapor(Tarih,AliciAdi,SaticiAdi,UrunAd,SatisMiktari,BirimFiyat){//Raporun oluşturulması için kullanılan cosntrıcter
        this.Tarih = Tarih,
        this.AliciAdi = AliciAdi,
        this.SaticiAdi = SaticiAdi,
        this.UrunAd = UrunAd,
        this.SatisMiktari = SatisMiktari,
        this.BirimFiyat = BirimFiyat
    }
    var raporlar = [];
    function Alinacaklar(alinacakUrunAd,alinacakUrunAdet,alinacakUrunFiyat){//alınacak ürünlerin tutulmasını kolaylaştıran constructer
        this.alinacakUrunAd=alinacakUrunAd;
        this.alinacakUrunAdet=alinacakUrunAdet;
        this.alinacakUrunFiyat=alinacakUrunFiyat;
    }
    var kullanicilar = [] //kullanıcı bilgilerinin tuttulur
    function Urun(urunNo,urunAd,urunAdet,urunFiyat,urunOnay,urunEkleyenId){
        //urun eklerken gerekli bilgilerin alınmasını kolaylaştıran construter
        this.urunNo = urunNo,
        this.urunAd = urunAd,
        this.urunAdet = urunAdet,
        this.urunFiyat = urunFiyat,
        this.urunOnay = urunOnay,
        this.urunEkleyenId = urunEkleyenId
    }
    var urunler = []//ürün bilgilerinin tuttulur
    var sayac = 0;//kullanıcı sayısıın takibi için kullanılan sayaç
    var muhasebeKullaniciBakiye = 0;
    $('#btn_HesabimVar').click(function(){
        //Kullanıcı Giriş ekranına Yönlendirme
        sayfaGecis($('girisYap'));
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
        if($("input[name='Hesap']:checked").val()== "alici"){//Kullanıcının Alıcı mı Satıcı mı oldduğu tespit edilir
            kayitHesapBilgi = "alici";
        }
        else{
            kayitHesapBilgi = "satici";
        }
        if(bilgiKontrol()){
            KisiKayit();//Kisiler Kaydedilir
        }
        else{
            alert(alertMesasge)//hata varsa mesaj yazdırılır
            alertMesasge = "";
        }
        return false;
    });
    function bilgiKontrol(){
        //bilgilerim doluluğu kontol edilir
        var dogruMu = true;
        if(kayitAd == ""){//ad dolu mu
            alertMesasge += "Ad Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitSoyad == ""){ //soyad dolu mu
            alertMesasge+="Soyad Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitSifre == ""){//sifre dolu mu
            alertMesasge+="Sifre Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitEposta == ""){//eposta dolu mu
            alertMesasge+="Eposta Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitTc == ""){
             //tc dolu mu
            alertMesasge+="Tc Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitNo == ""){//numara dolu mu
            alertMesasge+="Numara Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(kayitAdres == ""){//adres dolu mu
           alertMesasge+="Adres Kısmını Boş Bırakamazsınız.\n";
           dogruMu = false;
       }
       if(kayitKullaniciAdi == ""){//kullanici adı dolu mu
            alertMesasge+="Kullanıcı Adı Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        for(let i=0;i<sayac;i++){//Aynı İsimden birden fazla kullanıcı kabul edilmez
            if(kayitKullaniciAdi==kullanicilar[i].kullaniciAdi){
                alertMesasge+="Kullanıcı adı zaten kullanılıyor.\n";
                dogruMu = false;
            }
        }
        return dogruMu;
    }
    
    function KisiKayit(){
        //kullanıcı kaydı yapılır 
        var kullanici = new Kullanici(sayac,kayitAd,kayitSoyad,kayitSifre,kayitEposta,kayitTc,kayitNo,kayitAdres,"0",kayitKullaniciAdi,kayitHesapBilgi,"0","TL");
        kullanicilar.push(kullanici);
        sayac++;
    }

    var grsKullaniciAdi ;//giris ekranında kullanıcı adı inputunun verisinin tutulduğu değişken
    var grsSifre;//giris ekranında sifre inputunun verisinin tutulduğu değişken
    //GİRİS
    $(".pswrd-vision").click(function(){
        //parolanın görünür veya gizli olmasını sağlar
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
        //kullanıcı girişi
        grsKullaniciAdi = $('#girisKullanıcıAdı').val();// gerekli bilgiler inputlardan değişkenlere aktarılır
        grsSifre = $('.girisPassword').val();
        if(grsKullaniciAdi == "admin" && grsSifre == "admin"){//ilk önce kullanıcının admin olup olmadığı kontrol edilir
            sayfaGecis($('admin'));
            adminPanelPBK();
            adminUrunYazdir();
        }
        if(grsKullaniciAdi == "Muhasebeci" && grsSifre == "Muhasebeci"){
            alert(muhasebeKullaniciBakiye);
        }
        for(let i=0;i<sayac;i++){//kullanıcı adı tüm kullanıcılar arasında aranır
            if(grsKullaniciAdi == kullanicilar[i].kullaniciAdi){
                if(grsSifre == kullanicilar[i].sifre){//kullanıcı adı bulunduktan sonra sifre karsılastırması yapılır ve hesaba girilir
                    if(kullanicilar[i].hesapBilgi == "alici"){
                        sayfaGecis($('alici'));//alici hesabına giriş yapılrı
                        aliciUrunYazdir();
                        saticiEkranDüzenle(i);
                        anlikKullanici = i;
                    }
                    if(kullanicilar[i].hesapBilgi == "satici"){//satıcı hesabına giriş yapılır
                        sayfaGecis($('satici'));
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
        sayfaGecis($('kayitOl'));
        return false;
    });
    //satici ekranı
    var saticiUrunAd;//eklenen urunun adının tutulduğu değişken
    var saticiUrunAdet;//eklenen urunun adedinin tutulduğu değişken
    var saticiUrunFiyat;//eklenen urunun fiyatının tutulduğu değişken
    var urunSayac = 0;//urun sayısının bilinmesi e gerekli ürüne erişim için kullanılan sayaç
    function saticiEkranDüzenle(i){
        $('.para').val(kullanicilar[i].bakiye);//satıcının ve alıcının parasını ekrada yazdırır
    }
    $('#btn_urun_ekle').click(function(){
        //urun ekleme butonu
        saticiUrunAd = $('#inputUrunAd').val();//gerekli bilgiler inputlardan alınıp değişkenlere aktarılır
        saticiUrunAdet = $('#inputUrunMiktar').val();
        saticiUrunFiyat = $('#inputUrunFiyat').val();
        if(urunKontrol()){//urunde bilgiler kontrol edilir ve sorun yoksa urun eklenme functionu çağrılır
            urunEkle();
        }
        else{
            alert(alertMesasge);//eğer hata varsa hata ekrana verilir
            alertMesasge = "";
        }
        return false;
    });
    function urunKontrol(){//ürün eklerken bilgilerin boş olmaması için kontrol edilir
        var dogruMu = true;
        if(saticiUrunAd == ""){
            //urun ad dolu mu
            alertMesasge += "Urun ad Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(saticiUrunAdet == ""){
             //urun adet dolu mu
            alertMesasge+="Urun adet Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        if(saticiUrunFiyat == ""){
             //urun fiyat dolu mu
            alertMesasge+="Urun Fiyat Kısmını Boş Bırakamazsınız.\n";
            dogruMu = false;
        }
        return dogruMu;
    }
    function urunEkle(){
        //urun eklenir
       saticiUrunFiyat = parseFloat(saticiUrunFiyat)+parseFloat(parseFloat(saticiUrunFiyat)/100)
        var urun = new Urun(urunSayac,saticiUrunAd,saticiUrunAdet,saticiUrunFiyat,"Onaylanmadı",anlikKullanici);//urun oluşturulur
        urunler.push(urun);
        urunSayac++;
    }
    //admin panel
    function adminUrunYazdir(){
        //admin paneli için onaylanmamış ürünler admin ekranına yazdırılır
        $('#adminTable').find("tr:gt(0)").remove();
        for(k=0;k<urunSayac;k++){
            if(urunler[k].urunOnay == "Onaylanmadı")
            $('#adminTable').append('<tr><td>'+urunler[k].urunNo+'</td><td>'+urunler[k].urunAd
            +'</td><td>'+urunler[k].urunAdet+'</td><td>'+(((urunler[k].urunFiyat)*100)/101)+'</td><td>'+urunler[k].urunOnay+'</td></tr>');
        } 
    }
    
    $('#btn_admin_onay').click(function(){
        //adminin seçtiği ürünleri onaylaması için gerekli fonksionlar
        let urunKod = parseInt($('#adminOnayUrunId').val());
        urunler[urunKod].urunOnay = "Onaylandı";//seçilen ürün onaylanır
        adminUrunYazdir();//ve admin ürünleri güncellenir
        aliciUrunYazdir();//sonra alıcı ürünleri gücellenir
    });
    var paraBekleyenKullanici = [];//para beklenen kullanıcılar burada tutulr
    function adminPanelPBK(){
        //admin paneline pra bekleyen kullanıclılar yazdırılır
        $('#adminPBKTable').find("tr:gt(0)").remove();
        for(k=0;k<paraBekleyenKullanici.length;k++){
            $('#adminPBKTable').append('<tr><td>'+kullanicilar[paraBekleyenKullanici[k]].numara+'</td><td>'+
            kullanicilar[paraBekleyenKullanici[k]].kullaniciAdi+'</td><td>'+kullanicilar[paraBekleyenKullanici[k]].beklenenTutar+'</td><td>'+kullanicilar[paraBekleyenKullanici[k]].beklenenBirim+'</td></tr>');
        } 
    }
    function paraEkle(){
        for(k=0;k<paraBekleyenKullanici.length;k++){
            if(paraBekleyenKullanici[k]==$('#adminOnayKullaniciId').val()){//doğru kullanıcı bulunur ve hesabına para aktarılır
                var carpilacakDeger;
                var eklenecekTutar;
                var beklenenTutar = kullanicilar[paraBekleyenKullanici[k]].beklenenTutar;
                var eklenecekBakiye =parseFloat(kullanicilar[paraBekleyenKullanici[k]].bakiye);
                if(kullanicilar[paraBekleyenKullanici[k]].beklenenBirim == "Dolar"){//para birimi konrol edilir
                    var gecici = k;
                    console.log(parseFloat(carpilacakDeger));
                    $.getJSON("https://finans.truncgil.com/today.json",function(veri){//jsondan anlık para tutarı çekilir
                        carpilacakDeger = veri.USD.Satış;
                        eklenecekTutar = parseFloat(beklenenTutar) * parseFloat(carpilacakDeger);
                        eklenecekBakiye = parseFloat(eklenecekBakiye) + parseFloat(eklenecekTutar);
                        kullanicilar[parseInt(paraBekleyenKullanici[gecici])].bakiye = eklenecekBakiye;//para bakiyeye aktarılur
                        paraBekleyenKullanici.splice(gecici,1)//kullanıcı para bekleyenler arasından çıkartılır
                    });
                 }
                 else if(kullanicilar[paraBekleyenKullanici[k]].beklenenBirim == "Euro"){//para birimi konrol edilir
                    var gecici = k;
                    $.getJSON("https://finans.truncgil.com/today.json",function(veri){//jsondan anlık para tutarı çekilir
                        carpilacakDeger = veri.EUR.Satış;
                        eklenecekTutar = parseFloat(beklenenTutar) * parseFloat(carpilacakDeger);
                        eklenecekBakiye = parseFloat(eklenecekBakiye) + parseFloat(eklenecekTutar);
                        kullanicilar[parseInt(paraBekleyenKullanici[gecici])].bakiye = parseFloat(eklenecekBakiye);//para bakiyeye aktarılur
                        paraBekleyenKullanici.splice(gecici,1)//kullanıcı para bekleyenler arasından çıkartılır
                    });
                 }
                 else if(kullanicilar[paraBekleyenKullanici[k]].beklenenBirim == "GBP"){//para birimi konrol edilir
                    var gecici = k;
                    $.getJSON("https://finans.truncgil.com/today.json",function(veri){//jsondan anlık para tutarı çekilir
                        carpilacakDeger = veri.GBP.Satış;
                        eklenecekTutar = parseFloat(beklenenTutar) * parseFloat(carpilacakDeger);
                        eklenecekBakiye = parseFloat(eklenecekBakiye) + parseFloat(eklenecekTutar);
                        kullanicilar[parseInt(paraBekleyenKullanici[gecici])].bakiye = parseFloat(eklenecekBakiye);//para bakiyeye aktarılur
                        paraBekleyenKullanici.splice(gecici,1)//kullanıcı para bekleyenler arasından çıkartılır

                    });
                 }
            }
        }
    }
    $('.raporOlustur').click(function(){
        var sayac = 1;
        var msg = "";//doldurulmak için msg box oluşturuur
        raporlar.forEach(function(rapor){
            if(rapor.AliciAdi.numara == anlikKullanici){// gerekli bilgiler burada yazılır
               msg += "Sayac:"+sayac
                    +"\nSatıldığı Gün:"+(rapor.Tarih.getDay()+20)+"."+(rapor.Tarih.getMonth()+1)+"."+rapor.Tarih.getFullYear()
                    +"\nAlıcı Adı:"+rapor.AliciAdi.kullaniciAdi
                    +"\nSatıcı Adı:"+rapor.SaticiAdi.kullaniciAdi
                    +"\nSatılan Urun Adı:"+rapor.UrunAd
                    +"\nSatılan Urun Miktari:"+rapor.SatisMiktari
                    +"\nBirim Fiyat:"+rapor.BirimFiyat;
                    sayac++;
            }
            else if(rapor.SaticiAdi.numara == anlikKullanici){// gerekli bilgiler burada yazılır
                msg+="Sayac:"+sayac
                    +"\nSatıldığı Gün:"+(rapor.Tarih.getDay()+20)+"."+(rapor.Tarih.getMonth()+1)+"."+rapor.Tarih.getFullYear()
                    +"\nAlıcı Adı:"+rapor.AliciAdi.kullaniciAdi
                    +"\nSatıcı Adı:"+rapor.SaticiAdi.kullaniciAdi
                    +"\nSatılan Urun Adı:"+rapor.UrunAd
                    +"\nSatılan Urun Miktari:"+rapor.SatisMiktari
                    +"\nBirim Fiyat:"+rapor.BirimFiyat;
                    sayac++;
            }
            else{
                msg += "Daha önce satışınız bulunmamakta";
            }
        });
        alert(msg);//mesaj ekrana yazılır

    });
    $('#btn_admin_kullanici_onay').click(function(){//adminin para bekleyen kullanıcının parasın onaylamasına yararyan fonksityonalr
        paraEkle();
        setTimeout(function(){
            adminPanelPBK();//admin paneli güncellenir
        },1000)
       

    });
    //alici
    function aliciUrunYazdir(){//alıcının ürünleri yazdırılır
        $('#aliciTable').find("tr:gt(0)").remove();
        for(k=0;k<urunSayac;k++){
            if(urunler[k].urunOnay == "Onaylandı")//ürünün onaylı olduğu kontrol edilir
            $('#aliciTable').append('<tr><td>'+urunler[k].urunNo+'</td><td>'+urunler[k].urunAd
            +'</td><td>'+urunler[k].urunAdet+'</td><td>'+(((urunler[k].urunFiyat)*100)/101)+'</td></tr>');
        } 
    }
    function paraYatir(){
        kullanicilar[anlikKullanici].beklenenTutar = $('#yatirmakIstenenTutar').val();//yatırmak isteği tutar kullanıcı bilgilerine eklenir
        paraBekleyenKullanici.push(anlikKullanici);//para bekleyen kullanıcılar listesine eklenir
        adminPanelPBK();//admin panel para beklyen kullanici yazdir
        alert("Talebiniz Alınmıştır En Yakın Zamanda İşleminiz Gerçekleşecektir.");
    }
    $('#ParaYatir').click(function(){//alıcının hesabına para yatırmak istediğinin oluştuğu yer
        var gecici = true;
        paraBekleyenKullanici.forEach(function(bekleyenKulanici){
            if(bekleyenKulanici==anlikKullanici){
                alert("Zaten Bekleyen Bir işleminiz Var");
                gecici = false;
            }
        });
        if($("input[name='paraTur']:checked").val()=="Dolar"){//para türü kontrol edilir
            if(gecici){
                kullanicilar[anlikKullanici].beklenenBirim = "Dolar";
                paraYatir();
            }
        }
        else if($("input[name='paraTur']:checked").val()=="Euro"){//para türü kontrol edilir
            if(gecici){
                kullanicilar[anlikKullanici].beklenenBirim = "Euro";
                paraYatir();
            }
        }
        else if($("input[name='paraTur']:checked").val()=="TL"){//para türü kontrol edilir
            if(gecici){
                kullanicilar[anlikKullanici].beklenenBirim = "TL";
                paraYatir();
            }
        }
        else if($("input[name='paraTur']:checked").val()=="GBP"){//para türü kontrol edilir
            if(gecici){
                kullanicilar[anlikKullanici].beklenenBirim = "GBP";
                paraYatir();
            }
        }
        else{
            alert("Para Birimi Seciniz")
            return false;
        }        
        return false;
    });
    $('#btn_satin_al').click(function(){
        var result = confirm("KDV li birim fiyat :" + urunler[parseInt($('#aliciUrunId').val())].urunFiyat + "Satın alım işlemine devam edilsin mi ?");
            if (result) {
            if(adetKontrol()){//ilk önce yeterli adet kontrolü yapılır
                if(fiyatKontrol(parseFloat(parseFloat($('#aliciUrunAdet').val())),parseFloat(urunler[parseInt($('#aliciUrunId').val())].urunFiyat),anlikKullanici)){//sonra paranın yetip yetmediği kontrol edilir
                    satisiGerceklestir(parseFloat($('#aliciUrunId').val()),parseFloat($('#aliciUrunAdet').val()),anlikKullanici);//satisin gerçekleşeceği fonksiyon çağrılır
                }
            }
        }
        //satın alma işlemi gerçekleştirilecek fonksiyonlar
        
        return false;
    });
    $('#btn_urunAyir').click(function(){
        //kullanıcının ayırmak istediği ürün sisteme kayıt edilir
        var alinacakUrunad = $('#urunayirUrunAd').val();
        var alinacakUrunkilo = $('#urunayirUrunKilo').val();
        var alinacakUrunfiyat = $('#urunayirUrunFiyat').val();
        var alinacaklar = new Alinacaklar(alinacakUrunad,alinacakUrunkilo,alinacakUrunfiyat);
        kullanicilar[anlikKullanici].alinacaklarList.push(alinacaklar);
        return false;        
    });
    setInterval(function(){
        //kullanıcıların ayırmış olduğu ürünler belli sürelerde kontrol edilir ve doğru eşleşmelerde satılır
        kullanicilar.forEach(function(kullanan){
            kullanan.alinacaklarList.forEach(function(alinacakliste){
                ayrilanUrunVarMi(alinacakliste,alinacakliste.alinacakUrunAd,parseFloat(alinacakliste.alinacakUrunAdet),parseFloat(alinacakliste.alinacakUrunFiyat),kullanan);
            });
            console.log(kullanan);
        });
    },60000);
    function ayrilanUrunVarMi(alinacakliste,ad,kilo,fiyat,kullanan){
        var ayrilanurunSayac = 0;
        urunler.forEach(function(){//ayrılan ürünün ürünlerde olup olmadığını kontol etmek için tüm ürünler döndürülür
            if((urunler[ayrilanurunSayac].urunAd==ad)&&(urunler[ayrilanurunSayac].urunOnay ==  "Onaylandı")){//adı ve ürünün onay durumu kontrol edilir
                if((parseFloat(urunler[ayrilanurunSayac].urunAdet)>=parseFloat(kilo))&&(parseFloat(urunler[ayrilanurunSayac].urunFiyat)<=parseFloat(fiyat))){ //aranan fiyatta olup olmadığı ve yeterli kilo olup olmadığı kontrol edilir  
                    console.log("kullanan.numara"+kullanan.numara);
                    if(fiyatKontrol(parseFloat(kilo),parseFloat(urunler[ayrilanurunSayac].urunFiyat),kullanan.numara)){//alıcının yeterli parası olup olmadığı kontol edilir
                        satisiGerceklestir(parseFloat(urunler[ayrilanurunSayac].urunNo),parseFloat(kilo),kullanan.numara);//satış gerçekleştirilir
                        alinacakliste.alinacakUrunAd = null;//bidaha alınmaması için ürün bilgileri boşaltılır
                        alinacakliste.alinacakUrunAdet = null;
                        alinacakliste.alinacakUrunFiyat = null;
                        return;
                    }
                }
            }
            ayrilanurunSayac++;
        });
    }
    function fiyatKontrol(adet,fiyat,alici){
        //alıcının parası alacağı ürüne yetip yetmediği kontorl edilir
        var toplamFiyat = 0;
        var donulecekDeger = true;
        console.log("alici"+alici);
        toplamFiyat = adet*fiyat;//gerekli tutar hesaplanır
        if(toplamFiyat > kullanicilar[parseInt(alici)].bakiye){//alıcının parasının yeterliliği kontrol edilir
            donulecekDeger = false
        }
        return donulecekDeger;
    }
    function adetKontrol(){
        //adet kontrolü yapılır üolmayan ürünlerin satışı engellenir
        var donulecekDeger = true;
        if(parseFloat($('#aliciUrunAdet').val())>urunler[parseFloat($('#aliciUrunId').val())].urunAdet){
            donulecekDeger = false;    
        }
        return donulecekDeger;
    }
    function raporOlustur(satici,alici,urunAd,urunAdet,birimFiyat){
        var tarih=new Date();
        var rapor = new Rapor(tarih,alici,satici,urunAd,urunAdet,birimFiyat)//rapor oluştuulur
        raporlar.push(rapor)
    }
    function satisiGerceklestir(urunId,urunAdet,alici){
        //satış gerçekleştirilir
        urunler[urunId].urunAdet =
        parseFloat(urunler[urunId].urunAdet)-urunAdet;//yeni ürün sayısı güncellenir
        kullanicilar[alici].bakiye =
        parseFloat(parseFloat(kullanicilar[alici].bakiye)-(parseFloat(urunAdet)*parseFloat(urunler[urunId].urunFiyat)));//alıcı parası güncellenir
        saticiEkranDüzenle(alici);
        aliciUrunYazdir();
        kullanicilar[urunler[urunId].urunEkleyenId].bakiye =
        parseFloat(parseFloat(kullanicilar[urunler[urunId].urunEkleyenId].bakiye)+(parseFloat(urunAdet)*(parseFloat(urunler[urunId].urunFiyat)-parseFloat(urunler[urunId].urunFiyat)/101)));//satıcının parası güncellenir
        muhasebeKullaniciBakiye+=(parseFloat(parseFloat(urunAdet)*parseFloat(urunler[urunId].urunFiyat)/101));//muhasabeci kazanç
        raporOlustur(kullanicilar[urunler[urunId].urunEkleyenId],kullanicilar[alici],urunler[urunId].urunAd,urunAdet,parseFloat(urunler[urunId].urunFiyat)-parseFloat(urunler[urunId].urunFiyat)/101);
    }
    //GENEL 
    $('.Cikis').click(function(){
        sayfaGecis($('girisYap'));
    });
    function sayfaGecis(sayfa){
        //sayfa geçişleri kontrol edilir
        $('kayitOl').hide();
        $('girisYap').hide();
        $('alici').hide();
        $('satici').hide();
        $('admin').hide();
        sayfa.show();
    }

});