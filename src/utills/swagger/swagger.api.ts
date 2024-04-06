import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiAuth() {
  return applyDecorators(
    ApiOperation({
      description: 'Авторизация',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string', minLength: 6 },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Выведет id, email и token авторизации',
    }),
    ApiResponse({ status: 400, description: 'Неверный Email или Пароль.' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}

export function ApiProfile() {
  return applyDecorators(
    ApiOperation({
      description: 'Получение профиля пользователя',
    }),
    ApiResponse({
      status: 200,
      description: 'Успешный запрос',
    }),
    ApiResponse({ status: 401, description: 'Пользователь не авторизован' }),
    ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' }),
  );
}
