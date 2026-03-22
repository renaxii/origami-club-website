<script>
  import { fade, fly } from 'svelte/transition';
  import ScrollProgress from '../components/ScrollProgress.svelte';
  import SiteHeader from '../components/SiteHeader.svelte';
  import SiteFooter from '../components/SiteFooter.svelte';
  import { galleryItems } from '../data/galleryItems.js';

  const links = [
    { href: '/', label: 'home', active: false },
    { href: '#about', label: 'about', active: false },
    { href: '/gallery', label: 'gallery', active: false },
    { href: '#join', label: 'join us', active: false }
  ];

  const previewItems = galleryItems.slice(0, 3);

  let submitting = false;
  let formMessage = '';

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) {
      return;
    }

    submitting = true;
    formMessage = '';

    const form = event.currentTarget;

    try {
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        formMessage = "🌿 thanks for joining! we'll be in touch soon.";
        form.reset();
      } else {
        formMessage = '❌ something went wrong. please try again later.';
      }
    } catch (err) {
      formMessage = '❌ network error. please try again later.';
      console.error(err);
    } finally {
      submitting = false;
    }
  }
</script>

<ScrollProgress />
<SiteHeader {links} />

<main class="home-page-main">
  <section id="hero">
    <div class="container">
      <h2 in:fade={{ duration: 450 }}>leland origami club</h2>
      <p in:fade={{ delay: 80, duration: 450 }}>discover the art of origami and create something beautiful</p>
    </div>
  </section>

  <section id="about">
    <div class="container">
      <h2>about our club</h2>
      <div class="about-content">
        <p>welcome to the origami club!</p>
        <p>fold paper into art - from simple cranes to intricate designs.</p>
        <p>no experience needed, just curiosity.</p>

        <div class="meeting-info">
          <div class="info-card" in:fly={{ y: 12, duration: 360 }}>
            <h3>when</h3>
            <p>tuesdays<br />1:02–1:32 pm</p>
          </div>
          <div class="info-card" in:fly={{ y: 12, duration: 360, delay: 70 }}>
            <h3>where</h3>
            <p>sportsfolio</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="gallery">
    <div class="container">
      <h2>our creations</h2>
      <p class="gallery-subtitle">recent folds by our members</p>

      <div class="gallery-grid">
        {#each previewItems as item, index (item.name)}
          <div
            class="gallery-item"
            in:fly={{ y: 20, duration: 420, delay: index * 60 }}
          >
            <img src={item.image} alt={item.name} loading="lazy" />
            <div class="overlay"><p>{item.name}</p></div>
          </div>
        {/each}
      </div>

      <div class="show-more-container">
        <a href="/gallery" class="show-more-btn">see full gallery →</a>
      </div>
    </div>
  </section>

  <section id="join">
    <div class="container">
      <h2>join our club</h2>
      <p class="join-subtitle">interested in folding with us?</p>

      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        class="contact-form"
        id="form"
        autocomplete="off"
        onsubmit={handleSubmit}
      >
        <input type="hidden" name="access_key" value="2b3128b8-9dca-41c1-931f-997d1e220151" />
        <input type="hidden" name="subject" value="Origami Club Signup" />
        <input type="checkbox" name="botcheck" style="display:none" />

        <div class="form-group">
          <label for="name">name</label>
          <input id="name" type="text" name="name" autocomplete="off" required />
        </div>

        <div class="form-group">
          <label for="email">email</label>
          <input id="email" type="email" name="email" autocomplete="off" required />
        </div>

        <button class="submit-btn" class:loading={submitting} disabled={submitting}>
          {submitting ? 'sending...' : 'join the club'}
        </button>
        <p class="form-message">{formMessage}</p>
      </form>

      <div class="social-buttons">
        <a href="https://linktr.ee/lelandorigami" class="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Linktree">
          <i class="fas fa-link"></i>
        </a>

        <a href="https://instagram.com/lelandorigami" class="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>

        <a href="https://discord.gg/PkvPx3NABZ" class="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Discord">
          <i class="fab fa-discord"></i>
        </a>

        <a href="https://github.com/serena-ni/origami-club-website" class="social-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </div>
  </section>
</main>

<SiteFooter />
