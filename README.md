# 📝 Todo App - Frontend

A simple and elegant Todo App built with Vue.js. This is the frontend interface for managing tasks with features like create, read, update, and delete (CRUD). It communicates with a Lavarevel backend API to persist data.

## 🚀 Live Preview

> Add a link here if deployed (e.g. Vercel/Netlify)  
> _Example_: [View Live](https://todo-app-marcos-es-henke.vercel.app)

## ⚙️ Tech Stack

**Frontend:**

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Axios](https://axios-http.com/)
- [Vee Validate](https://vee-validate.logaretm.com/)
- [Yup](https://github.com/jquense/yup)
- [Vue Toast Notification](https://vue-toast-notification.maronato.dev/)

**Dev Tools:**

- [Prettier](https://prettier.io/) for code formatting
- [@vitejs/plugin-vue](https://vitejs.dev/guide/features.html#vue)

## 📁 Project Structure

- **`src/`**
  - **`assets/`** → Contains static files such as images, icons, and global CSS styles.
  - **`components/`** → Houses reusable Vue components
  - **`helpers/`** → Contains utility functions and helper methods used across the application.
  - **`layouts/`** → Defines layout components (e.g., navigation bar, sidebar, page wrapper).
  - **`router/`** → Manages Vue Router configurations for handling application routes.
  - **`services/`** → API-related functions and integrations using Axios (e.g., fetching and updating tasks).
  - **`views/`** → Defines the main pages of the application (e.g., Home.vue, TodoList.vue, About.vue).
  - **`main.js`** → The entry point where Vue is initial

## ⚙️ How to Run Locally

1. **Clone this repository:**

```bash
git clone https://github.com/marcoshenke/todo-app-frontend.git
cd todo-app-frontend

// Install dependencies:
npm install

// Run the app:
npm run dev
```

✅ Features

- List all task
- Add new task
- Edit task title and description
- Delete task
- Basic routing (Home/About)
- API integration with Axios
- Responsive design

📌 Future Improvements

- Support for deadlines and priorities
- Unit and integration testing
- Drag and drop task reordering
- progress bar to track task progress
