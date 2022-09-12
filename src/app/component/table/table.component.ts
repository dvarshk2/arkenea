
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/shared/services/users.service';
import { DialogComponent } from '../dialog/dialog.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['check','name','email','gender','address','dateOfBirth','delete'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);

  baseUrl : string ="http://localhost:3000/users";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog : MatDialog,
              private usersService : UsersService,
              private http : HttpClient,
              ){}

  ngOnInit(): void {
    this.getUsers();
  }
  ngAfterViewInit() {
    
  }

  getUsers(){
    this.usersService.getData().subscribe((res : HttpResponse<any>) => {
      if(res.body.length){
        this.dataSource =new MatTableDataSource<any>(res.body);
        this.dataSource.paginator = this.paginator;
      }

    })
  }

  deleteUser(user : any){
    let dialogRef = this.dialog.open(DialogComponent, {data : {name: user.name}});
    dialogRef.afterClosed().subscribe(result => {
    if(result === 'true'){          
      this.dataSource.filteredData.forEach((ele, index) => {
      if(ele.id === user.id){
        this.dataSource.filteredData.splice(index, 1);
      }
    })
    this.dataSource =new MatTableDataSource<any>(this.dataSource.filteredData) ;
    this.dataSource.paginator = this.paginator;
      }
    })     
  }
  userEdit(element : PeriodicElement){
    let editRef = this.dialog.open(EditUserComponent, {data: element});
    editRef.afterClosed().subscribe(result => {
    if(result && result.data){
      result.data.id = element.id;
      this.usersService.updateUser(element.id, result.data).subscribe((res : PeriodicElement) => {
        this.dataSource.filteredData.forEach((ele, index) => {
          if(ele.id === res.id){
           
            this.dataSource.filteredData[index] = res;
          }
        })
        this.dataSource =new MatTableDataSource<any>(this.dataSource.filteredData) ;
    this.dataSource.paginator = this.paginator;
      })
    }
    })
  }
  isAllSelected() {
    const numSelected = this.selection?.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}

export interface PeriodicElement {
  name?: string;
  email?:string;
  address? : string;
  gender?: string;
  dateOfBirth? : string;
  id?: any;
}

