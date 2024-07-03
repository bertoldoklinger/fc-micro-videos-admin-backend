import { Entity } from "../../domain/entity";
import { NotFoundError } from "../../domain/errors/not-found.error";
import { Uuid } from "../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityConstructor = {
  entity_id?: Uuid
  name: string
  price: number

}

class StubEntity extends Entity {
  entity_id: Uuid
  name: string
  price: number

  constructor({entity_id,name,price}: StubEntityConstructor) {
    super()
    this.entity_id = entity_id || new Uuid()
    this.name = name
    this.price = price
  }

  toJSON() {
    return {
      entity_id: this.entity_id,
      name: this.name,
      price: this.price
    
    }
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repo: StubInMemoryRepository

  beforeEach(() => {
    repo = new StubInMemoryRepository()
  })

  it('should insert a new entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Product',
      price: 10
    })

    await repo.insert(entity)

    expect(repo.items.length).toBe(1)
    expect(repo.items[0]).toBe(entity)
  });

  it('should bulk insert entities', async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Product 1',
        price: 10
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Product 2',
        price: 20
      })
    ]

    await repo.bulkInsert(entities)

    expect(repo.items.length).toBe(2)
    expect(repo.items).toEqual(entities)
  })

  it('should update an entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Product',
      price: 10
    })

    await repo.insert(entity)

    entity.name = 'Product Updated'
    entity.price = 20

    await repo.update(entity)

    const updatedEntity = await repo.findById(entity.entity_id)

    expect(updatedEntity).toEqual(entity)
  })

  it('should throw an error when updating an entity that does not exist', async () => {
    const entity = new StubEntity({
      name: 'Product',
      price: 10
    })

    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubEntity)
    )
  })

  it('should delete an entity', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Product',
      price: 10
    })

    await repo.insert(entity)

    await repo.delete(entity)

    const deletedEntity = await repo.findById(entity.entity_id)

    expect(deletedEntity).toBeNull()
  })

  it('should throw an error when deleting an entity that does not exist', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Product',
      price: 10
    })

    await expect(repo.delete(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubEntity)
    )
  })

  it('should find an entity by id', async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: 'Product',
      price: 10
    })

    await repo.insert(entity)

    const foundEntity = await repo.findById(entity.entity_id)

    expect(foundEntity).toEqual(entity)
  })

  it('should return null when entity is not found', async () => {
    const entity_id = new Uuid()

    const foundEntity = await repo.findById(entity_id)

    expect(foundEntity).toBeNull()
  })

  it('should find all entities', async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Product 1',
        price: 10
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: 'Product 2',
        price: 20
      })
    ]

    await repo.bulkInsert(entities)

    const foundEntities = await repo.findAll()

    expect(foundEntities).toStrictEqual(entities)
  })
})
