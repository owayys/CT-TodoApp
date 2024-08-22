export interface RepositoryPort<Entity> {
    insert(entity: Entity): Promise<void>;
    findOneById(id: string): Promise<Entity>;
    findAll(): Promise<Entity[]>;
    delete(id: string): Promise<boolean>;
}
