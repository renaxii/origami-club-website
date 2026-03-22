import { mount } from 'svelte';
import HomePage from './pages/HomePage.svelte';
import GalleryPage from './pages/GalleryPage.svelte';

const target = document.getElementById('app');

if (target) {
  const path = window.location.pathname;
  const isGalleryPage = path.endsWith('/gallery.html') || path.endsWith('/gallery');
  const Component = isGalleryPage ? GalleryPage : HomePage;

  mount(Component, { target });
}
