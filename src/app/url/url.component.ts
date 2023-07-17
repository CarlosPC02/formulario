import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UrlService } from '../services/url.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss']
})
export class UrlComponent implements OnInit {
  urlForm: FormGroup;

  constructor(private _coreService: CoreService, private _fb: FormBuilder, private _urlService : UrlService, private _dialogRef: MatDialogRef<UrlComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
    this.urlForm = this._fb.group({
      nombre : '',
      url: ''

    });
  }
  ngOnInit(): void {
    this.urlForm.patchValue(this.data);
    
  }



  onFormSubmit(){
    if(this.urlForm.valid){
      if(this.data){
        this._urlService.updateUrl(this.data._id, this.urlForm.value).subscribe({
          next: (val: any)=>{
            this._coreService.openSnackBar('Url Editada!');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          }
        });
      }else{
        this._urlService.createUrl(this.urlForm.value).subscribe({
          next: (val: any)=>{
            this._coreService.openSnackBar('Url Creada con exito!');
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
