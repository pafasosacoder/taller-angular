import { PaisService } from './../../services/pais.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Pablo',
    apellido: 'Solorzano',
    correo: 'pafasosa@hotmail.com',
    pais: 'ECU',
    genero: ''
  }

  paises: any[] = [];

  constructor( private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe( paises => {
      this.paises = paises;
      console.log(this.paises);
      this.paises.unshift({nombre: '[ Seleccione un pais ]', codigo: ''});
    });
  }

  guardar( forma: NgForm ) {

    if (forma.invalid) {
      Object.values( forma.controls ).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    console.log(forma);
    console.log(forma.value);
  }

}
