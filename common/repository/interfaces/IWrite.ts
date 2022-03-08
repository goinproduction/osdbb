export interface IWrite<T> {
    find(item: T): Promise<T[]>;
    findOne(id: string): Promise<T>;
}