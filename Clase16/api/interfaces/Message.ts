import { NewMessage } from './NewMessage'

export interface Message extends NewMessage {
    time: string
    dateString: string
}