// Shared storage for saved character sheets.
// Character details live in localStorage; reference images live in IndexedDB (they're too big for localStorage).
// Everything stays in this browser. Use Export / Import on the Characters page to back up or move to another device.
const CharacterStore = (() => {
  const KEY = 'ether-characters-v1';
  const DB = 'ether-image-studio', STORE = 'character-images';

  function list() {
    try { const a = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(a) ? a : []; } catch (e) { return []; }
  }
  function writeAll(arr) {
    localStorage.setItem(KEY, JSON.stringify(arr)); // throws if storage is full or blocked; callers handle it
  }
  function get(id) { return list().find(c => c.id === id) || null; }
  function upsert(ch) {
    const arr = list(), i = arr.findIndex(c => c.id === ch.id);
    ch.updated = Date.now();
    if (i >= 0) arr[i] = ch; else arr.unshift(ch);
    writeAll(arr);
    return ch;
  }
  function remove(id) { writeAll(list().filter(c => c.id !== id)); return deleteImages(id); }
  const newId = () => 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  // African American reads more reliably to image models as "Black American"
  const heritageWords = h => h === 'African American' ? 'African American (Black American)' : h;

  // The one-paragraph description that goes into image prompts
  function describe(c) {
    if (c.descEdited && c.description) return c.description;
    // Don't repeat the age when the role already starts with it ("young" + "young explorer")
    const age = c.age && c.role && c.role.toLowerCase().startsWith(c.age.toLowerCase() + ' ') ? '' : c.age;
    const role = age === '' && c.age ? c.role.slice(c.age.length + 1) : c.role;
    const lead = [c.age, c.heritage === 'Other' ? c.heritageOther : heritageWords(c.heritage), role].filter(Boolean).join(' ');
    const looks = [c.skin, c.hair, c.eyes, c.build, c.face].filter(Boolean);
    const parts = [];
    let first = c.name ? c.name : '';
    if (lead) first += (first ? ', ' : '') + (/^[aeiou]/i.test(lead) ? 'an ' : 'a ') + lead;
    if (c.pronouns) first += ` (${c.pronouns})`;
    if (looks.length) first += (first ? ' with ' : 'With ') + looks.join(', ');
    if (first) parts.push(first);
    if (c.outfit) parts.push('wearing ' + c.outfit);
    if (c.props) parts.push('with ' + c.props);
    if (c.palette) parts.push('signature colors: ' + c.palette);
    if (c.personality) parts.push(c.personality + ' personality');
    let text = parts.join('; ');
    if (c.notes) text += (text ? '. ' : '') + c.notes.replace(/\.$/, '');
    if (c.kind !== 'creature' && (c.heritage || c.skin)) text += '. Depict them authentically and with dignity, with natural features true to their heritage; no caricature';
    return text.trim();
  }

  // ---------- images (IndexedDB) ----------
  let dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return reject(new Error('no indexedDB'));
      const req = indexedDB.open(DB, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbp;
  }
  async function tx(mode, fn) {
    const d = await db();
    return new Promise((resolve, reject) => {
      const t = d.transaction(STORE, mode), s = t.objectStore(STORE);
      const out = fn(s);
      t.oncomplete = () => resolve(out && 'result' in out ? out.result : undefined);
      t.onerror = () => reject(t.error);
    });
  }
  const getImages = id => tx('readonly', s => s.get(id)).then(v => Array.isArray(v) ? v : []).catch(() => []);
  const setImages = (id, images) => tx('readwrite', s => s.put(images, id));
  const deleteImages = id => tx('readwrite', s => s.delete(id)).catch(() => {});

  // Shrink an uploaded image so dozens of characters fit comfortably in the browser
  function shrink(file, max = 900) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file), img = new Image();
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        resolve(c.toDataURL('image/jpeg', 0.86));
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image')); };
      img.src = url;
    });
  }

  return {list, get, upsert, remove, newId, describe, getImages, setImages, shrink, heritageWords, KEY};
})();
