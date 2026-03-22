<script>
  import { onMount } from 'svelte';
  import favicon from '../../images/assets/favicon.png';

  let { links = [] } = $props();
  let headerEl;

  function updateHeaderHeight() {
    if (!headerEl) {
      return;
    }

    document.documentElement.style.setProperty('--header-height', `${headerEl.offsetHeight}px`);
  }

  function handleNavClick(event, href) {
    if (!href.startsWith('#')) {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();

    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  onMount(() => {
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  });

</script>

<header bind:this={headerEl}>
  <nav>
    <div class="nav-container">
      <div class="logo-container">
        <img src={favicon} class="logo-img" alt="Leland Origami Club logo" />
        <h1 class="logo">leland origami club</h1>
      </div>
      <ul class="nav-links">
        {#each links as link}
          <li>
            <a
              href={link.href}
              class:active={link.active}
              onclick={(event) => handleNavClick(event, link.href)}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
</header>
