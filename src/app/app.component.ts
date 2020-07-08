import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Camera } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/behavior.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Url } from 'url';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  hide_settings =true;
  hide_signup =false;
  hide_signin=false;
  hide_signout=true;
  img_hide=true;
  fullname: string = "User Unknown";
  status;
  photo;
  url;
  temp;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataservice: DataService,
    private dom:DomSanitizer

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit(): void {
    this.dataservice.data.subscribe(data1 => {
      this.status = data1;
      console.log(this.status);
      if (this.status != null) {
        this.img_hide=false;
        this.setTitleName();
      }
      else {
        this.hide_settings = true;
        this.hide_signup = false;
        this.hide_signin=false;
        this.hide_signout=true;
        this.img_hide=true;
        this.fullname = "User Unknown";
      }

    })
  }

  



  async setTitleName() {
    let a:string = (this.status).split('@', 1);
    const data = await Plugins.Storage.get({ key: a });
    let b =await Plugins.Storage.get({ key: a+ "photo" })
    if(b.value!=null){
      this.temp = await Plugins.Storage.get({ key: a+ 'photo' });
      this.url=  JSON.parse(this.temp.value)  ;
    
    
    

    
      this.photo=this.dom.bypassSecurityTrustResourceUrl(this.url.dataUrl);
    }
    
    this.hide_settings = false;
    this.hide_signup = true;
    this.hide_signin=true;
    this.hide_signout=false;
    this.fullname = (JSON.parse(data.value)).fname + " " + JSON.parse(data.value).lname;
    
  }




  clearStorage() {
    Plugins.Storage.clear();
    this.dataservice.updatedDataSelection(null);
  }

  onClickSignout(){
    this.dataservice.updatedDataSelection(null);
    this.hide_settings = true;
        this.hide_signup = false;
        this.hide_signin=false;
        this.hide_signout=true;
        this.fullname = "User Unknown";
  }
}
