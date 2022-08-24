/**
 * Можно сделать глобально доступным, разместив это
 * внутри `global.d.ts` и удаления ключевого слова `export`
 */

 export interface EndpOutp{
    done?: boolean;
    userid?: string;
    iat?: number;
    body: {
      id?: number;
      uid?: string;
      name?: string;
      email?: string;
      phone?: string;
      amount?: number;
      password?: string;
      created_on?: string;
      updated_on?: string;
      goods?: object[];
      posts?: object[];
      products?: object[];
    };
  }

  export interface DbApi {
    id?: number;
    name?: string;
    uid?: string;
    email?: string;
    phone?: string;
    password?: string;
    action?: string;
    remember?: boolean;
    rating?: number;
    comment?: string;
    productName?: string;
  }
  
  export interface Data  extends DbApi {
    create?: object[];
    products?: object[] | {createMany: {data: object[], skipDuplicates: boolean;}};
  }
  
  export interface Todo {
    uid: string;
    created_at: Date;
    text: string;
    done: boolean;
    pending_delete: boolean;
  }
  
  export interface Store {
    status?: number,
    message?: string,
    redirect?: string,
    authenticated?: boolean,
    event?: string,
    show?: boolean
  }
  
  export interface DataGallery extends DbApi {
    id?: number;
    userId?: number;
    updatedAt?: string;
    tag?: string;
    description?: string; 
    category?: string;
    categoryId?: number;
    photo?: string;
    price?: number | string;
    ratings?:number[];
    amount?: number;
    isCount?: boolean;
    order?: boolean;
    total?: number;
    wish?: string;
  }
  
  export interface Edit extends DataGallery {
    label?: string;
    input?: string;
    textarea?: string;
    default?: number;
    address?: string;
    title?: string;
    posts?: object[];
    basket?: object[];	
  }
  
  export interface Errs {
    name?: string[];
    email?: string[];
    phone?: string[];
  }

  export interface AdminTbl { 
   tag?: {value: string; isEdit: boolean}; 
   category?: {value: string; isEdit: boolean};
   name?: {value: string; isEdit: boolean}; 
   photo?: {value: string; isEdit: boolean}; 
   price?: {value: string; isEdit: boolean}; 
   description?: {value: string; isEdit: boolean}; 
 };
  