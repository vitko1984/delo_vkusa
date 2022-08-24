import { json as json$1 } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { api } from '../../../_db-api';
import type {  Edit } from '$lib/types';

interface DataPost  extends Edit {
    create?: object[];
    categories?: object[];
    tags?: object[];
    content?: object[];
    envelope?: Edit[];
  };
  
export const DELETE:RequestHandler = async ({request, params}) => {
const req_data: DataPost = await request.json();  
  if (params.uid === 'row_clear') {
    try {
      console.log('*ServerClearUID*');
      const reqObj = {where: {name: req_data.tag}, data: {categories: {update: {where: {name: req_data.category}, data: {products: {deleteMany: [{photo: req_data.photo}]}}}}}, select: {id: true, name: true, categories: {select: {id: true, name: true, products: {select: {id: true, name: true, photo: true, price: true, description: true}}}}}};
      const dlt = await api('tag', 'update', reqObj);
      console.log('ClearRow: ', dlt.body);
      const tag = dlt.body.name;
      for (const s of dlt.body.categories) {
        const category = s.name;
        if (s.products.length === 0) await api('category', 'delete', {where: {name: category}, });
        if (s.products.length === 0 && dlt.body.categories.length === 1) await api('tag', 'delete', {where: {name: tag}, });///
      };
      return json$1({
  tbl: dlt.body,
  status: 200,
  msg: 'Строка успешно удалена из БД.',
});
    } catch(e) {
      console.log('Ошибка БД: ', e.name);
      console.log('Сообщение об ошибке: ', e.message);	  
    };
  };    
};