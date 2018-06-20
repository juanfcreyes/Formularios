import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {
  
  forma:FormGroup;
  
  usuario:object = {
    nombreCompleto: {
      nombre: '',
      apellido: ''
    },
    correo: '',
    pasatiempos: [''],
    password1: '',
    password2: '',
    username: ''
  }

  constructor() { 
    
    this.forma = new FormGroup({
      
      'nombreCompleto': new FormGroup({
        
        'nombre': new FormControl('', [Validators.required,Validators.minLength(2)]),
        
        'apellido': new FormControl('', [Validators.required, this.noHerrera ])
        
      }),
      
      'correo': new FormControl('', 
                                [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" )]),
      
      'pasatiempos': new FormArray([
        new FormControl('', [Validators.required])
      ]),
      
      'username': new FormControl('', [Validators.required], this.esisteUsuario),
    
      'password1': new FormControl('', [Validators.required]),
      
      'password2': new FormControl('')
      
    });
    
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);
    
    this.forma.setValue( this.usuario );
    
    this.forma.controls['password1'].valueChanges
      .subscribe( data => {
        if(data !== this.forma.controls['password2'].value ){
           this.forma.controls['password2'].status = "INVALID";
           this.forma.controls['password2'].errors ={'noIguales':true};
        }
      });
    
    this.forma.controls['password2'].statusChanges
      .subscribe( data => console.log (data));
  }

  ngOnInit() {
  }
  
  agregarPasatiempo() {
    
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', [Validators.required])
    )
  }
  
  noHerrera(control: FormControl): { [s:string]:boolean } {
    if( control.value === "herrera" ) {
      return {
        noHerrera:true
      };
    }
    return null;
  }
  
  noIgual(control: FormControl): { [s:string]:boolean } {
    
    let forma: any = this;
    
    if( control.value !== forma.controls['password1'].value ) {
      return {
        noIguales:true
      };
    }
    return null;
    
  }

  
  esisteUsuario(control: FormControl): Promise<any>|Observable<any>  {
    
   let promesa = new Promise(
    ( resolve, reject ) => {
      setTimeout( () => {
        if( control.value === "strider") {
          resolve ( {existe:true} )
        } else {
            resolve(null);
        }
      }, 3000)
    }
   )
   
   return promesa;
  }
  
  

  guardar() {
    console.log(this.forma.value);
    console.log(this.forma);
    
//    this.forma.reset({
//      nombreCompleto: {
//        nombre: '',
//        apellido: ''
//      },
//      correo: ''
//    });
    
  }
}
