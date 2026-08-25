<script setup lang="ts">
import { ref } from 'vue';
import { BookService } from '@/services/BookService.js';
import type { CreateBookDTO } from '@/dtos/CreateBookDTO.js';

const form = ref({
  title: '',
  category: '',
  price: 0,
  stock: 0,
});
const successMessage = ref('');

function submitForm() {
  const newBook: CreateBookDTO = {
    title: form.value.title,
    category: form.value.category,
    price: form.value.price,
    stock: form.value.stock,
  };

  BookService.createBook(newBook);
  successMessage.value = 'Book created successfully!';
  form.value = { title: '', category: '', price: 0, stock: 0 };
}
</script>

<template>
  <section class="max-w-2xl mx-auto py-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-8">Create a New Book</h2>
    <form class="bg-white rounded-lg shadow-md p-8 space-y-6" @submit.prevent="submitForm">
      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="title">Title</label>
        <input v-model="form.title" type="text" name="title" id="title" 
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" 
          required placeholder="Book Title" />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="category">Category</label>
        <input v-model="form.category" type="text" name="category" id="category" 
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" 
          required placeholder="Category" />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="price">Price</label>
        <input v-model.number="form.price" type="number" min="0" id="price" 
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" 
          required placeholder="0.00" />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-2" for="stock">Stock</label>
        <input v-model.number="form.stock" type="number" min="0" id="stock" 
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300" 
          required placeholder="0" />
      </div>

      <div class="pt-4">
        <button type="submit" 
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition">
          Create Book
        </button>
      </div>

      <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
    </form>
  </section>
</template>
