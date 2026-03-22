<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import ScrollProgress from '../components/ScrollProgress.svelte';
  import SiteHeader from '../components/SiteHeader.svelte';
  import SiteFooter from '../components/SiteFooter.svelte';
  import { galleryItems } from '../data/galleryItems.js';

  const links = [
    { href: '/', label: 'home', active: false },
    { href: '/#about', label: 'about', active: false },
    { href: '/#gallery', label: 'gallery', active: false },
    { href: '/#join', label: 'join us', active: false }
  ];

  let sort = 'recent';
  let currentIndex = 0;
  let galleryRefs = [];

  $: sortedItems = [...galleryItems].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    switch (sort) {
      case 'recent':
        return dateB - dateA;
      case 'oldest':
        return dateA - dateB;
      case 'easy':
        return a.difficulty - b.difficulty;
      case 'hard':
        return b.difficulty - a.difficulty;
      default:
        return 0;
    }
  });

  $: if (currentIndex >= sortedItems.length) {
    currentIndex = 0;
  }

  $: galleryRefs = [];

  function highlightItem(index) {
    currentIndex = index;

    if (galleryRefs[index]) {
      galleryRefs[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function handleKeydown(event) {
    if (isMobile() || sortedItems.length === 0) {
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      currentIndex = (currentIndex + 1) % sortedItems.length;
      highlightItem(currentIndex);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      currentIndex = (currentIndex - 1 + sortedItems.length) % sortedItems.length;
      highlightItem(currentIndex);
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<ScrollProgress />
<SiteHeader {links} />

<main class="gallery-page-main">
  <section id="gallery" class="gallery-page-section">
    <div class="container">
      <h2 in:fade={{ duration: 400 }}>full gallery</h2>
      <p class="gallery-subtitle" in:fade={{ delay: 70, duration: 400 }}>all creations throughout the year</p>

      <div class="sort-container" in:fade={{ delay: 120, duration: 400 }}>
        <label for="sort">sort by:</label>
        <select id="sort" class="sort-select" bind:value={sort}>
          <option value="recent">most recent</option>
          <option value="oldest">least recent</option>
          <option value="easy">easy -&gt; hard</option>
          <option value="hard">hard -&gt; easy</option>
        </select>
      </div>

      <div class="gallery-grid">
        {#each sortedItems as item, index (item.name + item.date)}
          <div
            class="gallery-item"
            class:keyboard-focus={index === currentIndex}
            bind:this={galleryRefs[index]}
            in:fly={{ y: 18, duration: 420, delay: index * 45 }}
          >
            <img src={item.image} alt={item.name} loading="lazy" />
            <div class="overlay"><p>{item.name}</p></div>
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>

<SiteFooter />
