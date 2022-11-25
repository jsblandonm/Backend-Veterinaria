import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProductosyServicios} from '../models';
import {ProductosyServiciosRepository} from '../repositories';

export class ProductosyServiciosController {
  constructor(
    @repository(ProductosyServiciosRepository)
    public productosyServiciosRepository : ProductosyServiciosRepository,
  ) {}

  @post('/productosy-servicios')
  @response(200, {
    description: 'ProductosyServicios model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductosyServicios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosyServicios, {
            title: 'NewProductosyServicios',
            exclude: ['id'],
          }),
        },
      },
    })
    productosyServicios: Omit<ProductosyServicios, 'id'>,
  ): Promise<ProductosyServicios> {
    return this.productosyServiciosRepository.create(productosyServicios);
  }

  @get('/productosy-servicios/count')
  @response(200, {
    description: 'ProductosyServicios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductosyServicios) where?: Where<ProductosyServicios>,
  ): Promise<Count> {
    return this.productosyServiciosRepository.count(where);
  }

  @get('/productosy-servicios')
  @response(200, {
    description: 'Array of ProductosyServicios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductosyServicios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductosyServicios) filter?: Filter<ProductosyServicios>,
  ): Promise<ProductosyServicios[]> {
    return this.productosyServiciosRepository.find(filter);
  }

  @patch('/productosy-servicios')
  @response(200, {
    description: 'ProductosyServicios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosyServicios, {partial: true}),
        },
      },
    })
    productosyServicios: ProductosyServicios,
    @param.where(ProductosyServicios) where?: Where<ProductosyServicios>,
  ): Promise<Count> {
    return this.productosyServiciosRepository.updateAll(productosyServicios, where);
  }

  @get('/productosy-servicios/{id}')
  @response(200, {
    description: 'ProductosyServicios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductosyServicios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductosyServicios, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductosyServicios>
  ): Promise<ProductosyServicios> {
    return this.productosyServiciosRepository.findById(id, filter);
  }

  @patch('/productosy-servicios/{id}')
  @response(204, {
    description: 'ProductosyServicios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosyServicios, {partial: true}),
        },
      },
    })
    productosyServicios: ProductosyServicios,
  ): Promise<void> {
    await this.productosyServiciosRepository.updateById(id, productosyServicios);
  }

  @put('/productosy-servicios/{id}')
  @response(204, {
    description: 'ProductosyServicios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productosyServicios: ProductosyServicios,
  ): Promise<void> {
    await this.productosyServiciosRepository.replaceById(id, productosyServicios);
  }

  @del('/productosy-servicios/{id}')
  @response(204, {
    description: 'ProductosyServicios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productosyServiciosRepository.deleteById(id);
  }
}
