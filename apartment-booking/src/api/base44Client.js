// Это временная реализация для тестирования
// Когда у вас будет настоящий сервер, замените этот файл

// Создаём несколько тестовых квартир
const mockApartments = [
  {
    id: "1",
    title: "Уютная студия в центре",
    description: "Современная квартира с прекрасным видом на город. Идеально подходит для одного или двух человек.",
    address: "ул. Пушкина, д. 10, Москва",
    price_per_night: 5000,
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    is_available: true,
    amenities: ["Wi-Fi", "ТВ", "Кондиционер"],
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
  },
  {
    id: "2",
    title: "Просторные апартаменты",
    description: "Роскошная квартира для семейного отдыха с тремя спальнями и современной кухней.",
    address: "Невский проспект, д. 25, Санкт-Петербург",
    price_per_night: 12000,
    bedrooms: 3,
    bathrooms: 2,
    max_guests: 6,
    is_available: true,
    amenities: ["Wi-Fi", "ТВ", "Кондиционер", "Парковка"],
    image_url: "https://images.unsplash.com/photo-1502672260066-6bc35f0af07e?w=800"
  },
  {
    id: "3",
    title: "Элитная квартира с видом",
    description: "Премиальное жильё в историческом центре города.",
    address: "Тверская улица, д. 15, Москва",
    price_per_night: 18000,
    bedrooms: 2,
    bathrooms: 2,
    max_guests: 4,
    is_available: true,
    amenities: ["Wi-Fi", "ТВ", "Кондиционер", "Парковка"],
    image_url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800"
  }
];

// Массив для хранения бронирований
const mockBookings = [];

// Экспортируем объект, имитирующий работу с API
export const base44 = {
  entities: {
    Apartment: {
      // Получить список всех квартир
      list: async (sortOrder) => {
        // Имитируем задержку сети
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockApartments;
      },
      // Найти квартиру по параметрам
      filter: async (params) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockApartments.filter(apt => apt.id === params.id);
      }
    },
    Booking: {
      // Получить список всех бронирований
      list: async (sortOrder) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockBookings;
      },
      // Создать новое бронирование
      create: async (bookingData) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newBooking = {
          ...bookingData,
          id: Date.now().toString(),
          created_date: new Date().toISOString()
        };
        mockBookings.push(newBooking);
        return newBooking;
      }
    }
  }
};