import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private authService: AuthService) { }

  ngOnInit(
    
  ) {
    this.usuario = new UsuarioModel();
   }

  onSubmit(form: NgForm) {
    
    if ( form.invalid) { return; }

    Swal.fire({
      icon: 'info',
      text: 'Espere por favor...',
      allowOutsideClick: false}
    );


    this.authService.nuevoUsuario(this.usuario).subscribe(data => {
      console.log(data);
      Swal.close();

      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }

    }, (err) => {
      Swal.fire({
        title: 'Ocurrio un error',
        icon: 'error',
        text: err.error.error.message,
        allowOutsideClick: true}
      );
      console.log(err);
    });
  }


}
