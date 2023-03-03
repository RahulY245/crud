import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreServiceService {

  constructor(private _snackBar: MatSnackBar) { }
  openSnackBar(massage:any,action:any='ok') {
    this._snackBar.open(massage,action ,{
      duration:  1000,
      verticalPosition:'top'
    });
  }

}
