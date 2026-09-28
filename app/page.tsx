 "use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Instagram, Pause, Play, Volume2 } from "lucide-react";
import { artist } from "@/data/artist";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title span", { y: 120, opacity: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" });
      gsap.from(".hero-subtitle", { opacity: 0, y: 30, delay: 0.7, duration: 1 });
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element as HTMLElement, {
          opacity: 0, y: 70, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: element as HTMLElement, start: "top 85%" }
        });
      });
      gsap.to(".hero-image", {
        yPercent: 15, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".marquee-track", {
        xPercent: -30, ease: "none",
        scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 1 }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  function toggleTrack(index: number) {
    const track = artist.music[index];
    if (!audioRef.current) audioRef.current = new Audio(track.audio);
    const audio = audioRef.current;
    if (playing === index) {
      audio.pause();
      setPlaying(null);
      return;
    }
    audio.pause();
    audio.src = track.audio;
    audio.play().then(() => setPlaying(index)).catch(() => setPlaying(null));
    audio.onended = () => setPlaying(null);
  }

  return (
    <main ref={pageRef}>
      <nav className="navbar">
        <a href="#" className="logo">ZH.</a>
        <div className="nav-links">
          <a href="#about">About</a><a href="#music">Music</a><a href="#videos">Videos</a><a href="#contact">Contact</a>
        </div>
        <a href={artist.instagram} target="_blank" rel="noreferrer" className="nav-social"><Instagram size={18} /></a>
      </nav>

      <section className="hero">
        <div className="hero-image-wrap">
          <img src="/hero.svg" alt="Zidaan Haneef" className="hero-image" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <p className="eyebrow">ARTIST • SINGER • PERFORMER</p>
          <h1 className="hero-title"><span>ZIDAAN</span><span>HANEEF</span></h1>
          <p className="hero-subtitle">{artist.tagline}</p>
          <div className="hero-actions">
            <a href="#music" className="button light"><Play size={15} fill="currentColor" />Listen</a>
            <a href="#videos" className="button outline">Watch</a>
          </div>
        </div>
        <div className="scroll-indicator"><ArrowDown size={18} /><span>SCROLL</span></div>
      </section>

      <section className="marquee"><div className="marquee-track">
        <span>MUSIC</span><span>•</span><span>VOICE</span><span>•</span><span>LIVE</span><span>•</span><span>ART</span><span>•</span><span>MUSIC</span><span>•</span><span>VOICE</span>
      </div></section>

      <section id="about" className="section about">
        <div className="section-number">01</div>
        <div className="about-grid">
          <div><p className="label reveal">ABOUT THE ARTIST</p><h2 className="big-heading reveal">A voice,<br />a feeling,<br />a moment.</h2></div>
          <div className="about-copy reveal">
            <p>{artist.bio}</p>
            <a href={artist.instagram} target="_blank" rel="noreferrer" className="text-link">Follow on Instagram <ArrowUpRight size={18} /></a>
          </div>
        </div>
      </section>

      <section id="music" className="section music">
        <div className="section-header reveal"><div><span className="section-number">02</span><p className="label">MUSIC</p></div><h2>Listen.</h2></div>
        <div className="music-grid">
          {artist.music.map((track, index) => (
            <article className="music-card reveal" key={track.title}>
              <div className="music-cover"><img src={track.cover} alt={track.title} /><button className="play-button" onClick={() => toggleTrack(index)} aria-label="Play track">{playing === index ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}</button></div>
              <div className="music-info"><div><span>0{index + 1}</span><h3>{track.title}</h3><p>{track.artist}</p></div><Volume2 size={18} /></div>
            </article>
          ))}
        </div>
      </section>

      <section id="videos" className="section videos">
        <div className="section-header reveal"><div><span className="section-number">03</span><p className="label">PERFORMANCE</p></div><h2>Watch.</h2></div>
        <div className="video-grid">
          {artist.videos.map((video, index) => (
            <article className="video-card reveal" key={video.title}>
              <div className="video-image"><img src={video.thumbnail} alt={video.title} /><div className="video-overlay"><button aria-label="Video placeholder"><Play size={24} fill="currentColor" /></button></div><span className="video-number">0{index + 1}</span></div>
              <div className="video-title"><h3>{video.title}</h3><ArrowUpRight size={18} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section gallery">
        <div className="section-header reveal"><div><span className="section-number">04</span><p className="label">MOMENTS</p></div><h2>Off stage.</h2></div>
        <div className="gallery-grid">
          {artist.gallery.map((image, index) => <div className={`gallery-item gallery-${index + 1}`} key={image}><img src={image} alt={`Zidaan moment ${index + 1}`} /></div>)}
        </div>
      </section>

      <section id="contact" className="booking">
        <div className="booking-inner">
          <p className="label">BOOKINGS • COLLABORATIONS • LIVE</p>
          <h2>Let's make<br />some noise.</h2>
          <a href={`https://wa.me/${artist.contact.whatsapp}`} target="_blank" rel="noreferrer" className="booking-button">Get in touch <ArrowUpRight size={20} /></a>
        </div>
      </section>

      <footer>
        <div className="footer-logo">ZIDAAN<br />HANEEF</div>
        <div className="footer-links"><a href={artist.instagram} target="_blank" rel="noreferrer">Instagram</a><a href="#">Spotify</a><a href="#">YouTube</a><a href={`mailto:${artist.contact.email}`}>Email</a></div>
        <p>© {new Date().getFullYear()} Zidaan Haneef</p>
      </footer>
    </main>
  );
}