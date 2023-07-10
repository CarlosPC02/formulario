import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VersionService } from '../services/version.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})

export class VersionComponent implements OnInit {
  versionForm: FormGroup;

  constructor(private _fb: FormBuilder, private _versionService : VersionService, private _dialogRef: MatDialogRef<VersionComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
    this.versionForm = this._fb.group({
      nombre : '',
      version: ''

    });
  }
  ngOnInit(): void {
    this.versionForm.patchValue(this.data);
  }
  onFormSubmit(){
    if(this.versionForm.valid){
      if(this.data){
        this._versionService.updateVersion(this.data._id, this.versionForm.value).subscribe({
          next: (val: any)=>{
            alert('Version Editada!');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          }
        });
      }else{
        this._versionService.createVersion(this.versionForm.value).subscribe({
          next: (val: any)=>{
            alert('Version Creada con exito');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          }
        });
      }
    }
    
  }
}
