// Функция для генерации уникального ID
export function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}