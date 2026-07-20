"use strict";

/* Personaliza esta fecha con el inicio oficial de la relación. */
const RELATIONSHIP_START = "2026-05-23T17:30:00-05:00";
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function createStars() {
  const sky = $("#ambient-stars");
  if (!sky) return;
  for (let index = 0; index < 42; index += 1) {
    const star = document.createElement("i");
    star.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${Math.random() * 5}s;`;
    sky.append(star);
  }
}

function addMonths(date, months) {
  const result = new Date(date);
  const expected = result.getMonth() + months;
  result.setMonth(expected);
  if (result.getMonth() !== ((expected % 12) + 12) % 12) result.setDate(0);
  return result;
}

function elapsedParts(start, now) {
  let years = now.getFullYear() - start.getFullYear();
  let cursor = addMonths(start, years * 12);
  if (cursor > now) { years -= 1; cursor = addMonths(start, years * 12); }
  let months = (now.getFullYear() - cursor.getFullYear()) * 12 + now.getMonth() - cursor.getMonth();
  cursor = addMonths(cursor, months);
  if (cursor > now) { months -= 1; cursor = addMonths(cursor, -1); }
  let remaining = Math.max(0, now - cursor);
  const days = Math.floor(remaining / 86400000); remaining -= days * 86400000;
  const hours = Math.floor(remaining / 3600000); remaining -= hours * 3600000;
  const minutes = Math.floor(remaining / 60000); remaining -= minutes * 60000;
  return { years, months, days, hours, minutes, seconds: Math.floor(remaining / 1000) };
}

function setupCounter() {
  const target = $("#relationship-counter");
  const start = new Date(RELATIONSHIP_START);
  if (!target || Number.isNaN(start.getTime())) return;
  const labels = { years:"años", months:"meses", days:"días", hours:"horas", minutes:"minutos", seconds:"segundos" };
  const render = () => {
    target.innerHTML = Object.entries(elapsedParts(start, new Date()))
      .map(([unit, value]) => `<span><b>${value}</b><i>${labels[unit]}</i></span>`).join("");
  };
  render(); window.setInterval(render, 1000);
}

function setupMusic() {
  const audio = $("#background-music"); const button = $(".sound-toggle");
  if (!audio || !button) return;
  const setState = (playing) => {
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", playing ? "Pausar música" : "Reproducir música");
    $(".sound-toggle__label", button).textContent = playing ? "Pausar música" : "Reproducir música";
    button.classList.toggle("is-playing", playing);
  };
  button.addEventListener("click", async () => { if (!audio.paused) { audio.pause(); return; } try { await audio.play(); } catch { setState(false); } });
  audio.addEventListener("play", () => setState(true)); audio.addEventListener("pause", () => setState(false));
  audio.addEventListener("error", () => { button.hidden = true; });
}

function setupLightbox() {
  const dialog = $("#lightbox"), image = $("#lightbox-image"), close = $(".lightbox__close");
  if (!dialog || !image || !close) return;
  const cards = $$(".gallery-card");
  const caption = $("#lightbox-caption");
  let activeIndex = 0;
  const show = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    const card = cards[activeIndex];
    image.src = card.dataset.image;
    image.alt = card.dataset.alt || "Recuerdo juntos";
    if (caption) caption.textContent = card.dataset.caption || "";
  };
  cards.forEach((card, index) => card.addEventListener("click", () => { show(index); dialog.showModal(); }));
  close.addEventListener("click", () => dialog.close());
  $(".lightbox__arrow--previous", dialog)?.addEventListener("click", () => show(activeIndex - 1));
  $(".lightbox__arrow--next", dialog)?.addEventListener("click", () => show(activeIndex + 1));
  dialog.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") show(activeIndex - 1); if (event.key === "ArrowRight") show(activeIndex + 1); });
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
}

function setupStoryControls() {
  const video = $("#love-video"), player = $("#premium-player"), playerStart = $("#player-start");
  $("#begin-story")?.addEventListener("click", () => $("#chapter-2").scrollIntoView({ behavior:"smooth" }));
  const play = async () => { try { await video?.play(); } catch { /* Native controls remain available. */ } };
  playerStart?.addEventListener("click", play);
  const toggle = $("#video-toggle"), progress = $("#video-progress"), time = $("#video-time"), mute = $("#video-mute"), fullscreen = $("#video-fullscreen");
  const formatTime = (value) => {
    const seconds = Number.isFinite(value) ? Math.floor(value) : 0;
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  };
  const renderTime = () => {
    if (!video || !time || !progress) return;
    progress.value = video.duration ? String((video.currentTime / video.duration) * 100) : "0";
    time.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
  };
  const renderPlayState = () => {
    if (!video || !toggle) return;
    const playing = !video.paused;
    toggle.textContent = playing ? "Ⅱ" : "▶";
    toggle.setAttribute("aria-label", playing ? "Pausar video" : "Reproducir video");
  };
  toggle?.addEventListener("click", () => { if (video?.paused) play(); else video?.pause(); });
  progress?.addEventListener("input", () => { if (video?.duration) video.currentTime = (Number(progress.value) / 100) * video.duration; });
  mute?.addEventListener("click", () => { if (!video) return; video.muted = !video.muted; mute.textContent = video.muted ? "×" : "⌁"; mute.setAttribute("aria-label", video.muted ? "Activar sonido del video" : "Silenciar video"); });
  fullscreen?.addEventListener("click", () => { if (player?.requestFullscreen) player.requestFullscreen(); });
  video?.addEventListener("loadedmetadata", renderTime);
  video?.addEventListener("timeupdate", renderTime);
  video?.addEventListener("play", () => { playerStart?.setAttribute("hidden", ""); player?.classList.add("is-playing"); renderPlayState(); });
  video?.addEventListener("pause", renderPlayState);
  video?.addEventListener("ended", () => $("#chapter-9").scrollIntoView({ behavior:"smooth" }));
  $("#open-final")?.addEventListener("click", () => { const finale = $("#finale"); finale?.setAttribute("aria-hidden", "false"); finale?.classList.add("is-open"); document.body.classList.add("finale-open"); });
}

function setupScrollReveals() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const chapters = $$(".chapter");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    chapters.forEach((chapter) => chapter.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });
  chapters.forEach((chapter) => observer.observe(chapter));
}

document.addEventListener("DOMContentLoaded", () => { createStars(); setupCounter(); setupMusic(); setupLightbox(); setupStoryControls(); setupScrollReveals(); });
