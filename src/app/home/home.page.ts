import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public commitList;

  constructor(private gitService: GitApiService,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {}


  getRecentCommits(name?){
    let params = {};
    if(name) params = {username : name}
    this.navCtrl.navigateForward(['/commits'], {queryParams: params});
  }

}
