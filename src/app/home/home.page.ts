import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { GitApiService } from '../services/git-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public username: string = '';
  public users;

  constructor(private gitService: GitApiService,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {}

  searchUser(){
    if(this.username){
      this.gitService.searchUser(this.username).then((res:any) => {
        console.log(res);
        this.users = res.items
      }).catch(err => {
        this.toastCtrl.create({
          message: 'Something went wrong',
          duration: 3000,
          position: 'top'
        }).then(toast => toast.present());
      })
    }
  }

  getRecentCommits(name?){
    let params = {};
    if(name) params = {username : name}
    this.navCtrl.navigateForward(['/commits'], {queryParams: params});
    this.users = undefined;
    this.username = '';
  }

}
