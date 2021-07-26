import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { GitApiService } from '../services/git-api.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.page.html',
  styleUrls: ['./commits.page.scss'],
})
export class CommitsPage implements OnInit {

  public commitList;
  public username: string;

  constructor(private gitService: GitApiService,
              private route: ActivatedRoute,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
    this.getRecentCommits();
  }

  async getRecentCommits() {
    await this.presentLoading();
    return this.gitService.getrecentCommits(this.username).then((res: any) => {
      this.commitList = res.items;
      this.loadingCtrl.dismiss();
    }).catch(err => {
      this.loadingCtrl.dismiss();
      const msg = 'Unable to get commits';
      this.presentToast(msg);
    })
  }

  showDetails(item) {
    const params = { commit: JSON.stringify(item) }
    this.navCtrl.navigateForward(['/commit-details'], { queryParams: params });
  }

  async presentLoading() {
    const loader = await this.loadingCtrl.create({ message: 'Loading...' });
    await loader.present();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  refresh(ev) {
    this.getRecentCommits().finally(() => {
      ev.detail.complete();
    });
  }

  goHome() {
    this.navCtrl.navigateRoot(['/home']);
  }

}
