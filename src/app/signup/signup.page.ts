import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Plugins, CameraResultType, CameraSource, Camera } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signup_details = {};
  split_email;
  converter;
  reactive_signup = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    con_password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required)
  })
  constructor(private router: Router, private storageservice: StorageService) { }

  ngOnInit() {

  }
  onclickSubmit() {
    this.split_email = (this.reactive_signup.get('email').value).split('@', 1);

    this.signup_details = {

      email: this.reactive_signup.get('email').value,
      lname: this.reactive_signup.get('lname').value,
      fname: this.reactive_signup.get('fname').value,
      password: this.reactive_signup.get('password').value,
      phone: this.reactive_signup.get('phone').value,
      gender: this.reactive_signup.get('gender').value,

    }

    this.converter = JSON.stringify(this.signup_details);
    this.loadStorage();

  }
  loadStorage() {
    Plugins.Storage.set({ key: this.split_email, value: this.converter });

    this.router.navigate(['/signin']);
  }

}
