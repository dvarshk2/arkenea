import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/shared/services/users.service';
import { PeriodicElement } from '../table/table.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
@ViewChild('picker') picker! : ElementRef;
editForm! : FormGroup;

  constructor(private usersService : UsersService, 
              private dialogRef: MatDialogRef<EditUserComponent>,
               @Inject(MAT_DIALOG_DATA) public data:PeriodicElement,
               private responsive : BreakpointObserver) { }

  ngOnInit(): void {
    this.createForm();
    this.patchFormData();
    // console.log(this.data);
    this.responsive.observe(Breakpoints.HandsetLandscape).subscribe(result => {
      if(result.matches){
        console.log(`Matches HandsetLandscape screen`);
        
      }
    })
  }
  onSubmit(){
    this.dialogRef.close({event:'edit data',data:this.editForm.value});
    this.editForm.reset();   
  }

  createForm(){
    this.editForm = new FormGroup({
      name : new FormControl(''),
      email : new FormControl(''),
      address : new FormControl(''),
      gender: new FormControl(''),
      dateOfBirth: new FormControl('')
    })
  }

  patchFormData(){
    this.editForm.patchValue({
      name : this.data.name,
      email : this.data.email,
      address :this.data.address,
      gender:this.data.gender,
      dateOfBirth:this.data.dateOfBirth 
    })
  }

}
