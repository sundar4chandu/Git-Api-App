import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-commit-details',
  templateUrl: './commit-details.page.html',
  styleUrls: ['./commit-details.page.scss'],
})
export class CommitDetailsPage implements OnInit {

  public commit;
  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private platform: Platform,
              private iab: InAppBrowser) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const data = params['commit']
      this.commit = JSON.parse(data);
    })
  }

  goHome() {
    this.navCtrl.navigateRoot(['/home']);
  }

  openUrl(url) {
    if (url) {
      if(this.platform.is('cordova')){
        const browser = this.iab.create(url);
        browser.on('loadstop').subscribe(event => {
          browser.insertCSS({ code: "body{color: red;" });
        });
        browser.close();
      } else {
        window.open(url, '_blank');
      }
    }
  }

}
