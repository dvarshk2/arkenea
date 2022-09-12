import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { PeriodicElement } from '../table/table.component';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
 users! : PeriodicElement[] ;
 male : number = 0;
 female : number = 0;
  constructor(private usersService : UsersService) { }

  ngOnInit(): void {
    this.usersService.getData().subscribe((res : HttpResponse<any>) => {
      if(res.body){
        this.users = res.body;
       this.users.forEach(ele => {
        if(ele.gender == 'male'){
          this.male++
        }else{ this.female++ }
       })      
      }
    })
  }

}
