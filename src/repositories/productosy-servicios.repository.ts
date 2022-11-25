import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductosyServicios, ProductosyServiciosRelations} from '../models';

export class ProductosyServiciosRepository extends DefaultCrudRepository<
  ProductosyServicios,
  typeof ProductosyServicios.prototype.id,
  ProductosyServiciosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProductosyServicios, dataSource);
  }
}
