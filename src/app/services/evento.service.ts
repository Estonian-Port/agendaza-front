import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { REST_SERVER_URL } from 'src/util/configuration';
import { Evento, EventoBuscarFecha, EventoCatering, EventoExtra, EventoHora, EventoJSON, EventoPago, EventoVer } from '../model/Evento';
import { FechaForm } from '../model/FechaForm';
import { GenericItem } from '../model/GenericItem';
import { Cliente, Usuario, UsuarioJSON } from '../model/Usuario';
import { AgendaService } from './agenda.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  eventoId : number = 0

  constructor(private httpClient : HttpClient, private agendaService : AgendaService, private loginService : LoginService) { }

  async getAllEventoByEmpresaId() {
    const listaItem$ = this.httpClient.get<EventoJSON[]>(REST_SERVER_URL + '/getAllEventoByEmpresaId/' + this.agendaService.getEmpresaId())
    const listaItem = await lastValueFrom(listaItem$)
    return listaItem.map((evento) => Evento.fromJson(evento))
  }

  async buscarClientePorDni(dni : number){
    const usuario$ = this.httpClient.put<Cliente>(REST_SERVER_URL + '/getUsuarioByDni', dni)
    return await lastValueFrom(usuario$)
  }

  async buscarClientePorEmail(email : string){
    const usuario$ = this.httpClient.put<Cliente>(REST_SERVER_URL + '/getUsuarioByEmail', email)
    return await lastValueFrom(usuario$)
  }

  async buscarClientePorCelular(celular : number){
    const usuario$ = this.httpClient.put<Cliente>(REST_SERVER_URL + '/getUsuarioByCelular', celular)
    return await lastValueFrom(usuario$)
  }

  async save(evento: Evento) {
    evento.empresaId = this.agendaService.getEmpresaId()
    evento.encargadoId = await this.loginService.getUsuarioId()
    const item$ = this.httpClient.post<Evento>(REST_SERVER_URL + '/saveEvento', evento)
    return await lastValueFrom(item$)
  }

  delete(id: number) {
    return this.httpClient.delete<GenericItem>(REST_SERVER_URL + '/deleteEvento/' + id)
  }

  async getAllEstado() {
    const listaItem$ = this.httpClient.get<string[]>(REST_SERVER_URL + '/getAllEstado')
    return await lastValueFrom(listaItem$)
  }

  async getEventoPago() {
    const evento$ = this.httpClient.get<EventoPago>(REST_SERVER_URL + '/getEventoPago/' + this.eventoId)
    return await lastValueFrom(evento$)
  }

  async getEventoExtra() {
    const evento$ = this.httpClient.get<EventoExtra>(REST_SERVER_URL + '/getEventoExtra/' + this.eventoId)
    return await lastValueFrom(evento$)
  }

  async getEventoCatering() {
    const evento$ = this.httpClient.get<EventoCatering>(REST_SERVER_URL + '/getEventoCatering/' + this.eventoId)
    return await lastValueFrom(evento$)
  }

  async getEventoHora() {
    const evento$ = this.httpClient.get<EventoHora>(REST_SERVER_URL + '/getEventoHora/' + this.eventoId)
    return await lastValueFrom(evento$)
  }

  async getEventoVer() {
    const evento$ = this.httpClient.get<EventoVer>(REST_SERVER_URL + '/getEventoVer/' + this.eventoId)
    return await lastValueFrom(evento$)
  }

  async editEventoHora(eventoHora : EventoHora) {
    const item$ = this.httpClient.post<EventoHora>(REST_SERVER_URL + '/editEventoHora', eventoHora)
    return await lastValueFrom(item$)
  }

  async getListaEventoByDiaAndEmpresaId(fecha : FechaForm) {
    const eventoBuscarFecha = new EventoBuscarFecha(this.agendaService.getEmpresaId(), new Date(fecha.year, fecha.mes, fecha.dia), new Date())
    const item$ = this.httpClient.put<Array<string>>(REST_SERVER_URL + '/getListaEventoByDiaAndEmpresaId', eventoBuscarFecha)
    return await lastValueFrom(item$)
  }

  async horarioDisponible(evento : Evento){
    const eventoBuscarFecha = new EventoBuscarFecha(this.agendaService.getEmpresaId(), new Date(evento.inicio), new Date(evento.fin))
    const item$ = this.httpClient.put<boolean>(REST_SERVER_URL + '/horarioDisponible', eventoBuscarFecha)
    return await lastValueFrom(item$)  }

}
