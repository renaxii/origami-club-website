<script>
  import { onMount } from 'svelte';

  let progress = 0;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  onMount(() => {
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  });
</script>

<div id="scroll-progress" style={`width: ${progress}%;`}></div>
