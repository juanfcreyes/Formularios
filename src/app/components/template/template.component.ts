import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
      .ng-invalid.ng-touched:not(form) {
        border: 1px solid red;
      }
      fomr.ng-invalid input.ng-invalid:not(form) {
        border: 1px solid red;
      }
    `
  ]
})
export class TemplateComponent implements OnInit {

  usuario:object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    genero: 'Hombre',
    acepta: false
  };
  
  paises = [
    {
      codigo: "ECU",
      nombre: "Ecuador"
    },
    {
      codigo: "ESP",
      nombre: "España"
    }
  ]
  
  sexos:string[] = ["Hombre","Mujer","Otros"]
  
  constructor() { }

  ngOnInit() {
  }

  guardar(forma:NgForm){
    
    console.log('Formulario Posteado');
    console.log(forma);
    console.log(forma.value);
    console.log(forma.valid);
  }
}
