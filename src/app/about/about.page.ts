import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor() { }

  async ngOnInit() {
    const data = await Plugins.Storage.get({ key: 'Name' });
    alert(data.value);
  }
}
