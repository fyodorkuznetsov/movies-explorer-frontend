export const HEADER_ALLOWER_PATH_LIST = [
  '/',
  '/movies',
  '/profile',
  '/saved-movies',
];
export const FOOTER_ALLOWED_PATH_LIST = [
  '/',
  '/movies',
  '/saved-movies',
];
export const MAIN_API_BASE_URL = 'https://api.smith-movies.students.nomoredomains.monster';
export const FILMS_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const FILMS_IMAGES_DOMAIN = 'https://api.nomoreparties.co';
export const REGISTER_ERRORS = {
  404: 'Страница по указанному запросу не найдена',
  409: 'Пользователь с таким email уже существует',
  500: 'На сервере произошла ошибка',
  default: 'При регистрации пользователя произошла ошибка',
};
export const LOGIN_ERRORS = {
  401: 'Неверный логин или пароль',
  404: 'Страница по указанному запросу не найдена',
  500: 'На сервере произошла ошибка',
  default: 'При авторизации произошла ошибка',
};
export const LOGOUT_ERRORS = {
  404: 'Страница по указанному запросу не найдена',
  500: 'На сервере произошла ошибка',
  default: 'Ошибка выхода из профиля пользователя',
};
export const PROFILE_ERRORS = {
  404: 'Страница по указанному запросу не найдена',
  409: 'Пользователь с таким email уже существует',
  500: 'На сервере произошла ошибка',
  default: 'При обновлении профиля произошла ошибка',
};
export const MOVIES_ERRORS = {
  400: 'Переданы некорректные данные для сохранения фильма',
  404: 'Страница по указанному запросу не найдена',
  default: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};
export const SHORT_MAX_FILM_DURATION = 40;

export const MEDIUM_WINDOW_RESOLUTION = 768;
export const MIN_WINDOW_RESOLUTION = 480;

export const MAX_RESOLUTION_PAGE_ELEMENT_COUNT = 12;
export const MAX_RESOLUTION_LOAD_MORE = 3;
export const MEDIUM_RESOLUTION_PAGE_ELEMENT_COUNT = 8;
export const MEDIUM_RESOLUTION_LOAD_MORE = 2;
export const MIN_RESOLUTION_PAGE_ELEMENT_COUNT = 5;
export const MIN_RESOLUTION_LOAD_MORE = 1;
