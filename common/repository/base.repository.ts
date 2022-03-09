import { Repository } from 'typeorm';

export default class BaseRepository<T>{
    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public async getAll(filter: object = {}): Promise<T[] | object> {
        try {
            const data = await this.entity.find({
                where: {
                    ...filter,
                }
            })
            return {
                data
            }
        } catch (error) {
            throw error;
        }
    }
}
