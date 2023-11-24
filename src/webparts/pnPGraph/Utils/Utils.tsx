import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es')
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export function date_TO_String(date_Object:Date) {
    return moment(date_Object).format('DD/MM/YYYY HH:mm');
 }