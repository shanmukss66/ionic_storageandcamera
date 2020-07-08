import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/behavior.service';
import { Plugins, CameraResultType, CameraSource, Camera } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  status;
  a;
  edit_details={};
  split_email: string;
  image;
  reactive_signup = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required)
  })
  photo: SafeResourceUrl
  converter: string;
  constructor(private dataservice: DataService, private sanitizer: DomSanitizer, private router: Router, private storageservice: StorageService) { }

 ngOnInit() {
    this.dataservice.data.subscribe(data1 => {
      this.status = data1;
      this.a = this.status;
      
     
      if (this.status != null) {
       this.getStorageDetails();
      }


    })
  }
  onclickSubmit() {

    

    this.edit_details = {

      email: this.reactive_signup.get('email').value,
      lname: this.reactive_signup.get('lname').value,
      fname: this.reactive_signup.get('fname').value,
      password: this.reactive_signup.get('password').value,
      phone: this.reactive_signup.get('phone').value,
      gender: this.reactive_signup.get('gender').value,

    }
    this.converter = JSON.stringify(this.edit_details);
    this.loadStorage();
    

  }
  async getStorageDetails(){
    this.split_email = (this.a).split('@', 1);
      const data = await Plugins.Storage.get({ key: this.split_email });
       
      this.reactive_signup.setValue({
        fname: JSON.parse(data.value).fname,
        lname: JSON.parse(data.value).lname,
        phone: JSON.parse(data.value).phone,
        email: JSON.parse(data.value).email,
        password: JSON.parse(data.value).password,
        gender: JSON.parse(data.value).gender


      })
      
   }

   loadStorage() {
     if(this.split_email!=this.reactive_signup.get('email').value){
      Plugins.Storage.set({ key: (this.reactive_signup.get('email').value).split('@',1), value: this.converter });
      Plugins.Storage.set({ key: (this.reactive_signup.get('email').value).split('@',1)+"photo", value: JSON.stringify(this.image) });
     }
     else{
      Plugins.Storage.set({ key: this.split_email, value: this.converter });
      Plugins.Storage.set({ key: this.split_email+"photo", value: JSON.stringify(this.image) });
      console.log('hello');
      
      
     }
   

    this.router.navigate(['/signin']);
  }
  async clickPicture() {
    this.image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    })
    this.split_email = this.status.split('@', 1);
    console.log(this.split_email);



    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(this.image && this.image.dataUrl);

    

  }

  
}
