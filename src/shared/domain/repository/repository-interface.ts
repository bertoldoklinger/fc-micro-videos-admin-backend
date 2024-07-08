import { Entity } from "../entity"
import { ValueObject } from "../value-object"
import { SearchParams } from "./search-params"
import { SearchResult } from "./search-result"



export interface IRepositoryInterface<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>

  bulkInsert(entities: E[]): Promise<void>

  update(entity: E): Promise<void>

  delete(entity: E): Promise<void>

  findById(entity_id: EntityId): Promise<E>

  findAll(): Promise<E[]>

  getEntity(): new (...args: any[]) => E
}

export interface ISearchableRepository<E extends Entity, EntityId extends ValueObject,Filter = string, SearchInput = SearchParams<Filter>, SearchOutput = SearchResult> extends IRepositoryInterface<E, EntityId> {
  /*
  * Quais campos estão habilitados para que eu possa fazer a busca.
  */
  sortableFields: string[]
  search(props: SearchInput): Promise<SearchOutput>
}