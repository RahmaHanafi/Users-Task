import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IUser from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-specific-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  ID: number = 0;
  user: IUser | undefined;
  isLoading: boolean = true;

  constructor(
    public myService: UserService,
    myActived: ActivatedRoute,
    private _location: Location
  ) {
    this.ID = myActived.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.myService.getUserByID(this.ID).subscribe({
      next: (res) => {
        this.user = res.data;
        this.isLoading = false;
      },
    });
  }
  backClicked() {
    this._location.back();
  }
}
