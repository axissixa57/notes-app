// Dispatcher по своей сути является event-системой. Он траслирует события и регистрирует колбэки.
// В сущности, Диспетчер — это менеджер всего этого процесса. Это центральный узел вашего приложения. 
// Диспетчер получает на вход действия и рассылает эти действия (и связанные с ними данные) зарегистрированным обработчикам.

import { Dispatcher } from 'flux';

export default new Dispatcher();