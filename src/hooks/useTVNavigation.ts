import { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';

export const useTVNavigation = () => {
  const { playAudioCue, activePage, setActivePage, setIsAlexaListening, isAlexaListening } = useApp();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // If user is currently typing in an input or textarea, let default input behavior happen
    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

    if (e.key === 'Escape' || e.key === 'Backspace' || e.key === 'GoBack') {
      if (!isTyping) {
        e.preventDefault();
        playAudioCue('click');
        if (isAlexaListening) {
          setIsAlexaListening(false);
          return;
        }
        if (activePage !== 'home' && activePage !== 'splash' && activePage !== 'auth') {
          setActivePage('home');
        }
      }
      return;
    }

    if (e.key === 'a' || e.key === 'A') {
      if (!isTyping && (e.ctrlKey || e.altKey || !['INPUT', 'TEXTAREA'].includes(activeEl?.tagName || ''))) {
        e.preventDefault();
        setIsAlexaListening(!isAlexaListening);
        playAudioCue('alexa');
        return;
      }
    }

    const focusables = Array.from(
      document.querySelectorAll<HTMLElement>('.tv-focusable:not([disabled])')
    ).filter(el => el.offsetParent !== null); // only visible elements

    if (!focusables.length) return;

    const currentIndex = focusables.findIndex(el => el === activeEl || el.contains(activeEl));

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      if (isTyping && ['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        return; // Allow cursor movement inside input
      }

      e.preventDefault();
      playAudioCue('click');

      if (currentIndex === -1) {
        focusables[0]?.focus();
        return;
      }

      const currentRect = focusables[currentIndex].getBoundingClientRect();
      let bestNext: HTMLElement | null = null;
      let minDistance = Infinity;

      for (let i = 0; i < focusables.length; i++) {
        if (i === currentIndex) continue;
        const targetRect = focusables[i].getBoundingClientRect();

        let isCandidate = false;
        if (e.key === 'ArrowRight') {
          isCandidate = targetRect.left >= currentRect.left + 5 && Math.abs(targetRect.top - currentRect.top) < 180;
        } else if (e.key === 'ArrowLeft') {
          isCandidate = targetRect.right <= currentRect.right - 5 && Math.abs(targetRect.top - currentRect.top) < 180;
        } else if (e.key === 'ArrowDown') {
          isCandidate = targetRect.top >= currentRect.top + 5;
        } else if (e.key === 'ArrowUp') {
          isCandidate = targetRect.bottom <= currentRect.bottom - 5;
        }

        if (isCandidate) {
          const dx = (targetRect.left + targetRect.width / 2) - (currentRect.left + currentRect.width / 2);
          const dy = (targetRect.top + targetRect.height / 2) - (currentRect.top + currentRect.height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDistance) {
            minDistance = dist;
            bestNext = focusables[i];
          }
        }
      }

      if (bestNext) {
        bestNext.focus();
        bestNext.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      } else {
        // Fallback sequential index stepping if spatial layout is ambiguous
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          const next = focusables[(currentIndex + 1) % focusables.length];
          next.focus();
          next.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          const prev = focusables[(currentIndex - 1 + focusables.length) % focusables.length];
          prev.focus();
          prev.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    } else if (e.key === 'Enter') {
      if (!isTyping && activeEl instanceof HTMLElement) {
        playAudioCue('select');
      }
    }
  }, [activePage, isAlexaListening, playAudioCue, setActivePage, setIsAlexaListening]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
