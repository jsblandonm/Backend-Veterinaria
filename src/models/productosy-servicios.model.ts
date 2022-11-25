import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductosyServicios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;


  constructor(data?: Partial<ProductosyServicios>) {
    super(data);
  }
}

export interface ProductosyServiciosRelations {
  // describe navigational properties here
}

export type ProductosyServiciosWithRelations = ProductosyServicios & ProductosyServiciosRelations;
