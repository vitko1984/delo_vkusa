export default {

  buttons: {
    signIn: "Войти",
    registration: "Регистрация",
    logout: "Выход"
  },
  labels_fields: {
    labelName: "Имя:",
    labelEmail: "Эл. почта:",
    labelPhone: "Телефон:",
    labelPassword: "Пароль:",
    labelNewPassword: "Новый пароль:",
    labelSMS: "СМС:",
    labelConfirm: "Подтверждение пароля:",
    labelRemember:"Запомнить меня:",
    labelForgotPswd: "Забыли пароль?",
  },
  placeholders_fields: {
    name: "Иван Иванов",
    phone: "+7(000)000 00 00",
    email: "youremail@example.com",
    password: "не менее 6-ти символов",
    sms: "СМС получили? Введите...",
  },
  productTblHeaders: {
	hdr: 'Продукты',
	hdr_link1: 'Загрузить таблицу в БД',
	hdr_link2: 'Добавить строку',
	hdr_link3: 'Очистить таблицу в БД',
	table_hdrs:['Тэг', 'Категория', 'Название', 'Фото', 'Цена', 'Описание', 'Удалить', ], 
  },
  basketTblHeaders: ['Название', 'Цена(руб.)', 'Количество', 'Действия', ],
  reviewTblHeaders: ['Автор', 'Текст', 'Дата', ],
  menuList: [
    {
      name: "Главная",
      path: "/",
    },
    {
      name: "О нас",
      path: "/about",
    },
	{
	  name: "Товары",
	  path: "/goods",
	  submenu: {
	  	"Зефирные корзины": "/baskets",
	  	"Зефирные букеты": "/bouquets",
	  },
	},
    {
      name: "Оплата и доставка",
      path: "/payment"
    },
	{
	  name: "Контакты",
	  path: "/contacts"
	},
  ],
  GalleryData: {
	'Зефир': {
	  'Зефирные корзины': [
		{
		  photo: '20220122_110303.jpg',
		  name: 'Розовый рай',
		  price: 2300.00,
		},
		{
		  photo: '20220206_135546.jpg',
		  name: 'Вдохновение',
		  price: 1700.00,
		},
		{
		  photo: '20220206_140108.jpg',
		  name: 'Мечта',
		  price: 2300.00,
		},
		{
		  photo: '20220206_141302.jpg',
		  name: 'Пион',
		  price: 1700.00,
		},
		{
		  photo: '20220215_162609.jpg',
		  name: 'Роскошь',
		  price: 3000.00,
		},
		{
		  photo: '20220215_174112.jpg',
		  name: 'Весна',
		  price: 1700.00,
		},
		{
		  photo: '20220215_174901.jpg',
		  name: 'Услада',
		  price: 2300.00,
		},
		{
		  photo: '20220215_175613.jpg',
		  name: 'Краса',
		  price: 1700.00,
		},
		{
		  photo: '20220218_124523.jpg',
		  name: 'Счастье',
		  price: 1700.00,
		},
		{
		  photo: '20220218_125217.jpg',
		  name: 'Счастье макси',
		  price: 2300.00,
		}, 
		{
		  photo: '20220226_122354.jpg',
		  name: 'Жемчуг',
		  price: 1700.00,
		},
	  ],
	  'Зефирные букеты': [
		{
		  photo: '20220210_113755.jpg',
		  name: 'Мужской каприз',
		  price: 1200.00,
		},
		{
		  photo: '20220211_130907.jpg',
		  name: 'Мужская слабость',
		  price: 1200.00,
		},
		{
		  photo : '20220215_173005.jpg',
		  name: 'Весенний',
		  price: 1500.00,
		},
		{
		  photo: '20220215_173540.jpg',
		  name: 'Гортензия и розы',
		  price: 1200.00,
		},
		{
	      photo : '20220218_123045.jpg',
		  name: 'Классика',
		  price: 1500.00,
		},
		{
		  photo: '20220218_123340.jpg',
		  name: 'Классический',
		  price: 1500.00,
		},
		{
		  photo: '20220226_113159.jpg',
		  name: 'Нежность',
		  price: 1500.00,
		},
		{
		  photo : '20220303_172319.jpg',
		  name: 'Весенний 2',
		  price: 1500.00,
		},
		{
		  photo: '20220303_172445.jpg',
		  name: 'Классика 2',
		  price: 1500.00,
		},
		{
		  photo: '20220304_183704.jpg',
		  name: 'Весенний 3',
		  price: 1500.00,
		},
		{
		  photo: '20220311_162123.jpg',
		  name: 'Женское счастье',
		  price: 2500.00,
		},
		{
		  photo: '20220311_162150.jpg',
		  name: 'Женское счастье 2',
		  price: 2500.00,
		},
		{
		  photo: '2_5316944739629537248.jpg',
		  name: 'Мужская радость',
		  price: 1200.00,
		},
		{
		  photo: '2_5316944739629537250.jpg',
		  name: 'Брутальный',
		  price: 1200.00,
		},
	  ],
	}, 
	'Торт': {},
  },
  Admin: {},
};
