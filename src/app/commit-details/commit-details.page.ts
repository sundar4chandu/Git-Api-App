import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-commit-details',
  templateUrl: './commit-details.page.html',
  styleUrls: ['./commit-details.page.scss'],
})
export class CommitDetailsPage implements OnInit {

  public commit;
  constructor(private route: ActivatedRoute,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const data = params['commit']
      this.commit = JSON.parse(data);
    })
  }

  goHome() {
    this.navCtrl.navigateRoot(['/home']);
  }

}
