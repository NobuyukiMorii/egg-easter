function getEasterDate(year) {
  // Anonymous Gregorian algorithm
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function updateCountdown() {
  const el = document.getElementById("countdown");
  if (!el) return;

  const now = new Date();
  const year = now.getFullYear();
  let easter = getEasterDate(year);

  if (now > easter) {
    const endOfDay = new Date(easter);
    endOfDay.setHours(23, 59, 59, 999);
    if (now <= endOfDay) {
      el.textContent = "Today is Easter!";
      return;
    }
    easter = getEasterDate(year + 1);
  }

  const diff = easter - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days === 0) {
    el.textContent = `Easter in ${hours}h ${minutes}m ${seconds}s`;
  } else {
    el.textContent = `Easter in ${days} days ${hours}h ${minutes}m ${seconds}s`;
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
