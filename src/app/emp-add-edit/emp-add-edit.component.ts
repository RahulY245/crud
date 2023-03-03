
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreServiceService } from '../core/core-service.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup;

  education: string[] = [
    'matric',
    'diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];

  constructor(
    private _fb: FormBuilder,
    private _empServices: EmployeeService,
    private _dialogref: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private core:CoreServiceService

  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data){
        this._empServices.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
           
            this.core.openSnackBar('empolyee updated Sucessfully')
            this._dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }else{
        this._empServices.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
           
            this.core.openSnackBar('empolyee added Sucessfully')
            this._dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
      // console.log(this.empForm.value)
     
    }
  }
}
