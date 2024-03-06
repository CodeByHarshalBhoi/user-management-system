import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css'],
})
export class UserAddEditComponent implements OnInit{
  empForm: FormGroup;
  roles: string[] = ['Admin', 'User'];
  constructor(
    private formGroup: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any 
    ) {
    this.empForm = this.formGroup.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      role: '',
    });
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data)
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data){
        console.log(this.empForm.value);
        this.userService.editUser(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee Update');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          },
        })
      }else{
        console.log(this.empForm.value);
        this.userService.addUser(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee add successfully');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          },
        })
      }
 ;
    }
  }
}
