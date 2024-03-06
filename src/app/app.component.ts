import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserService } from './services/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'user-management-system';
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'role',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private matDialog: MatDialog, private userService: UserService) {}
  ngOnInit() {
    this.getUserList();
  }

  openAndEditForm() {
    const dialogRef = this.matDialog.open(UserAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(res)=>{

        if(res){
          this.getUserList()
        }
      }
    })
  }

  getUserList() {
    this.userService.getUser().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        alert('Deleted Successful....');
        this.getUserList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  openEditForm(data:any) {
    const dialogRef = this.matDialog.open(UserAddEditComponent,{
      data:data, 
    });
    dialogRef.afterClosed().subscribe({
      next:(res)=>{

        if(res){
          this.getUserList()
        }
      }
    })
  }
}
