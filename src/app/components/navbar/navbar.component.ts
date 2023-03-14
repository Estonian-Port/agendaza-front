import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router : Router, private agendaService : AgendaService, private location: Location) { }

  ngOnInit(): void {}

  logout(){
    this.loginService.logout()
    this.router.navigateByUrl('/login')
  }

  saveEvento(){
    this.router.navigateByUrl('/saveEvento')
  }

  volverAgendas(){
    this.agendaService.removeEmpresaId()
    this.router.navigateByUrl('/')
  }

  isAgenda(): boolean {
    return "/agenda" == this.location.path()
  }

  isLogin(): boolean{
    return this.loginService.getToken() != null
  }

  isInAgenda(): boolean{
    return this.agendaService.getEmpresaId() != ""
  }

  isSaveEvento() : boolean{
    return "/saveEvento" == this.location.path()
  }

  isConfiguracion() : boolean{
    return "/configuracion" == this.location.path()
  }

  isAbm() : boolean{
    return "/abm" == this.location.path().substring(0,4)
  }

  nuevoAbm(){
    this.router.navigateByUrl('/save' + this.location.path().substring(4, this.location.path().length + 1))
  }

  volverCalendario(){
    this.router.navigateByUrl('/agenda')
  }

  configuracion(){
    this.router.navigateByUrl('/configuracion')
  }
}
