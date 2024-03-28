import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IUser from 'src/app/interface/user.interface';
import { DemoService } from 'src/app/services/demo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-specific-user',
  templateUrl: './specific-user.component.html',
  styleUrls: ['./specific-user.component.css'],
})
export class SpecificUserComponent implements OnInit {
  ID: number = 0;
  user: IUser | undefined;

  constructor(
    public myService: DemoService,
    myActived: ActivatedRoute,
    private _location: Location
  ) {
    this.ID = myActived.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.myService.getUserByID(this.ID).subscribe({
      next: (res) => {
        this.user = res.data;
        // console.log(res);
      },
    });
  }

  backClicked() {
    this._location.back();
  }
}
