import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
      private service: UserService,
      private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(async params => {
      await this.service.findOne(params.id)
    });
  }


  async ngOnInit() {

  }

}
