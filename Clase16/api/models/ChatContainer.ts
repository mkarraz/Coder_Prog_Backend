import { Message, NewMessage } from '../interfaces'
import { sqliteOption } from '../../DB/configDB'
import { Knex } from 'knex'

class ChatContainer {
    private db: Knex
    private table: string

    constructor(options: any, table: string) {
        this.db = require('knex')(options)
        this.table = table/* Nombre tabla */
        this.createTableIfNotExists()
    }

    private async createTableIfNotExists(): Promise<void> {
        if (!(await this.db.schema.hasTable(this.table))) {/* Si la tabla existe la elimina */
            try {
                await this.db.schema.createTableIfNotExists(this.table, (table) => {/* Crea la tabla this.table */
                    table.increments('id').primary();/* 'id' es nuestro primary key, cuyo valor se incrementará solo. */
                    table.string('email');
                    table.string('message');
                    table.string('time');
                    table.string('dateString');
                })
            } catch (error) {
                console.error(error)
            }
        }
    }

    public addMessage = async ({ email, message }: NewMessage): Promise<void> => {
        const date = new Date()
        const time = date.toLocaleTimeString()
        const dateString = date.toLocaleDateString('es-AR')

        await this.db.insert({ email, message, time, dateString }).into(this.table)
    }

    public async getAllMessages(): Promise<Message[]> {
        const messages: Message[] = await this.db.select('*').from(this.table)
        return messages
    }
}

export default new ChatContainer(sqliteOption, 'chat')