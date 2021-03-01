import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  constructor( private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login( form: NgForm) {
    if ( form.invalid) { return; }

    Swal.fire({
      icon: 'info',
      text: 'Espere por favor...',
      allowOutsideClick: false}
    );

    this.authService.login(this.usuario).subscribe(resp  => {
      console.log(resp);
      Swal.close();

      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    }, (err) => {
        Swal.fire({
          title: 'Ocurrio un error',
          icon: 'error',
          text: err.error.error.message,
          allowOutsideClick: true}
        );
        console.log(err.error.error.message);

    });
  }

}
