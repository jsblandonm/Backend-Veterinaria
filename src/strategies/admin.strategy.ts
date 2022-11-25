import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {Request} from 'express';
import parseBearerToken from 'parse-bearer-token';
import { AutenticacionService } from '../services';


export class EstrategiaAdminitrador implements AuthenticationStrategy{
  name = 'Administrador';

  constructor(@service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService
  ){}

  async authenticate(request: Request) : Promise<UserProfile |undefined> {
    const token = parseBearerToken(request);
    if (token) {
      const datos = this.servicioAutenticacion.validarTokenJWT(token);
      if (datos) {
        const perfil : UserProfile = Object.assign({
          nombre : datos.data.nombre,
          apellido : datos.data.apellido
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("El token no es correcto");
      }
    } else {
      throw new HttpErrors[401]("El token no vino incluido en el usuario");
    }

  }
}
