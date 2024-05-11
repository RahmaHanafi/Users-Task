import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import IUser from 'src/app/model/user.interface';

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
    this.myService
      .getUserByID(this.ID)
      .pipe(
        catchError((err) => throwError(() => err)),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        this.user = res.data;
      });
  }
  backClicked() {
    this._location.back();
  }
}
