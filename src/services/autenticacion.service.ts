import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from "../repositories";
const generador = require ('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository
  ) {}

  generarClave() {
    const Contrasena = generador(8,false);
    return Contrasena;
  }

  cifrarClave(contrasena: string){
    const claveCifrada = cryptoJS.MD5(contrasena).toString();
    return claveCifrada;
  }

  identificarUsuario(usuario : string, contrasena : string){
    try {
      const persona = this.usuarioRepository.findOne({where: {correo : usuario, contrasena : contrasena}});
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (persona){
        return persona;
      }
      return false;
    } catch{
      return false;
    }
  }

  generarTokenJWT(usuario : Usuario){
    const token = jwt.sign({
      data: {
        id : usuario.id,
        correo : usuario.correo,
        nombre : usuario.nombre,
      }
    },
    Llaves.contrasenaJWT)
    return token;
  }

  validarTokenJWT(token : string){
    try {
      const datos = jwt.verify(token, Llaves.contrasenaJWT)
      return datos;
    } catch{
      return false;
    }
  }
}
