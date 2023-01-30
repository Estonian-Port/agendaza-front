import { Component, EventEmitter, Output } from '@angular/core'
import { Router } from '@angular/router'
import { UsuarioLogin } from 'src/app/model/Usuario'
import { LoginService } from 'src/app/services/login.service'
import { ErrorMensaje, mostrarErrorConMensaje } from 'src/util/errorHandler'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuarioLogin : UsuarioLogin = new UsuarioLogin('', '')
  errors = []
  errorLogin : ErrorMensaje = new ErrorMensaje(false, '')

  @Output () valorLogin = new EventEmitter<boolean>()

  constructor(private loginService: LoginService, private router : Router) {}

  public async ingresar(){

    this.errorLogin.condicional = false

    try {
      (await this.loginService.login(this.usuarioLogin)).subscribe(
        response =>{
          this.router.navigateByUrl('/')
        },
        err => {
          this.errorLogin.condicional = true
          mostrarErrorConMensaje(this, "")
          this.errors.forEach(error => { this.errorLogin.mensaje = error })
        }
      )
            
    } catch (error) {
      this.errorLogin.condicional = true
      mostrarErrorConMensaje(this, error)
      this.errors.forEach(error => { this.errorLogin.mensaje = error })
    }
  }

  isLogueado(): boolean {
    return this.loginService.getToken() != ""
  }

}



