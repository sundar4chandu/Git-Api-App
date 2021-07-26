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
  private pageNumber: number = 1;
  public totalCount;
  private isRefresh: boolean = false;
  private showLoading: boolean = true;
  public backToTop: boolean = false;

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
    if(this.showLoading) await this.presentLoading();
    return this.gitService.getrecentCommits(this.username, this.pageNumber).then((res: any) => {
      console.log(res);
      if(this.isRefresh){
        this.commitList = undefined;
        this.isRefresh = false;
      }
      if (this.commitList && this.commitList.length > 1) {
        this.commitList = this.commitList.concat(res.items);
      } else {
      this.commitList = res.items;
        this.totalCount = res.total_count;
      }
      if(this.showLoading) this.loadingCtrl.dismiss();
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
    this.pageNumber = 1;
    this.isRefresh = true;
    this.showLoading = true;
    this.getRecentCommits().finally(() => {
      ev.detail.complete();
    });
  }

  goHome() {
    this.navCtrl.navigateRoot(['/home']);
  }

  loadData(event) {
    if (this.totalCount > this.commitList.length && this.commitList.length <= 100) {
      this.pageNumber++;
      this.showLoading = false;
      this.getRecentCommits().finally(() => {
        console.log('Done');
        event.target.complete();
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.totalCount == this.commitList.length || this.commitList.length >= 100) {
          event.target.disabled = true;
          this.showLoading = true;
        }
      })
    } else if(this.totalCount == this.commitList.length){
      event.target.complete();
      event.target.disabled = true;
      this.showLoading = true;
    }
  }
}
