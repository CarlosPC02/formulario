import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UrlComponent } from './url/url.component';
import { VersionComponent } from './version/version.component';
import { UrlService } from './services/url.service';
import { VersionService } from './services/version.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'interfaz';
  
  displayedColumnsUrl: string[] = ['_id', 'nombre', 'url', 'fecha', 'action'];
  dataSourceUrl!: MatTableDataSource<any>;

  displayedColumnsVersion: string[] = ['_id', 'nombre', 'version', 'fecha', 'action'];
  dataSourceVersion!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _urlService: UrlService, private _versionService: VersionService){
  }

  ngOnInit(): void {
    this.getUrlList();
    this.getVersionList();
  }

  abrirFormUrl(){
    const dialogRef = this._dialog.open(UrlComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getUrlList();
        }
      }
    })
  }

  getUrlList(){
    this._urlService.getUrlList().subscribe({
      next: (res) =>{
        this.dataSourceUrl = new MatTableDataSource(res);
        this.dataSourceUrl.sort = this.sort;
        this.dataSourceUrl.paginator = this.paginator;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  applyFilterUrl(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUrl.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceUrl.paginator) {
      this.dataSourceUrl.paginator.firstPage();
    }
  }

  deleteUrl(id: String){
    this._urlService.deleteUrl(id).subscribe({
      next:(res)=>{
        alert('Url Eliminada!')
        this.getUrlList();
      },
      error: console.log,
    });
  }

  abrirEditFormUrl(data: any){
    this._dialog.open(UrlComponent, {
      data, 
    });
  }


  /////////////////////////////////

  abrirFormVersion(){
    const dialogRef = this._dialog.open(VersionComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getVersionList();
        }
      }
    })
  }

  getVersionList(){
    this._versionService.getVersionList().subscribe({
      next: (res) =>{
        this.dataSourceVersion = new MatTableDataSource(res);
        this.dataSourceVersion.sort = this.sort;
        this.dataSourceVersion.paginator = this.paginator;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  applyFilterVersion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVersion.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceVersion.paginator) {
      this.dataSourceVersion.paginator.firstPage();
    }
  }

  deleteVersion(id: String){
    this._versionService.deleteVersion(id).subscribe({
      next:(res)=>{
        alert('Version Eliminada!')
        this.getVersionList();
      },
      error: console.log,
    });
  }

  abrirEditFormVersion(data: any){
    this._dialog.open(VersionComponent, {
      data, 
    });
  }



  



}
