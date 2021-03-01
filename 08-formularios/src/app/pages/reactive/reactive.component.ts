import { ValidadoresService } from './../../services/validadores.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  get pasatiempos () {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return pass1 === pass2 ? false : true;
  }


  forma: FormGroup;
  constructor(private fb: FormBuilder,
    private validador: ValidadoresService) {
    this.crearForma();
    this.cargarDataAlFormulario();
  }
  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Fabian',
      apellido: 'Sarmiento',
      correo: 'fabian@gmail.com',
      direccion: {
        distrito: 'Ontario',
        ciudad: 'Ottawa'
      }
    });
  }

  crearForma() {
    this.forma = this.fb.group({
      nombre: ['Pablo', [Validators.required, Validators.minLength(5)]],
      apellido: ['Sarmiento', [Validators.required, this.validador.noSolorzano]],
      correo: ['abc@abc.com', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validador.existeUsuario ],
      pass1: ['', Validators.required ],
      pass2: ['', Validators.required ],
      direccion: this.fb.group ({
        distrito: ['', Validators.required ],
        ciudad  : ['', Validators.required ]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validador.passwordsIguales('pass1', 'pass2')
    });

  }

  ngOnInit(): void {
  }

  guardar() {
    console.log(this.forma);

    if (this.forma.invalid) {
      return Object.values( this.forma.controls ).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    this.forma.reset();

  }

  agregarPasatiempo() {
    this.pasatiempos.push( this.fb.control('') );
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

}
