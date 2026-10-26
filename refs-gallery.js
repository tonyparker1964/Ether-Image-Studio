// "My saved references": one gallery of every reference image saved in this browser.
// Used on the Characters page and in the studio. Needs characters-store.js.
const RefGallery = (() => {
  const css = `
.rg-head{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:10px 0}
.rg-head input{flex:1;min-width:160px}
.rg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
.rg-card{background:var(--es-card,#fff);border-radius:14px;overflow:hidden;box-shadow:inset 0 0 0 1px var(--es-line,#ddd);display:flex;flex-direction:column}
.rg-card img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;cursor:zoom-in;background:var(--es-field,#eee)}
.rg-meta{padding:8px 10px 4px}
.rg-meta b{display:block;font-size:14px;line-height:1.25}
.rg-meta small{display:block;font-size:12px;color:var(--es-sub,#666)}
.rg-acts{display:flex;flex-wrap:wrap;gap:4px;padding:4px 8px 10px}
.rg-acts button,.rg-acts select{font-size:12px;min-height:30px;padding:4px 10px;border-radius:980px;width:auto}
.rg-acts select{background:var(--es-field,#eee);border:0}
.rg-empty{color:var(--es-sub,#666);font-size:14px;padding:12px 0}
.rg-view{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.86);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:20px}
.rg-view img{max-width:100%;max-height:calc(100% - 70px);border-radius:12px}
.rg-view .rg-bar{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;color:#fff;font-size:14px}
.rg-view button{background:rgba(255,255,255,.14);color:#fff;border:0;border-radius:980px;padding:8px 16px;min-height:40px;cursor:pointer}
`;
  const style = document.createElement('style'); style.textContent = css; document.head.append(style);

  const pretty = s => s.replace(/-/g, ' ').replace(/^./, c => c.toUpperCase());
  function defaultLabel(key) {
    const c = CharacterStore.get(key);
    if (c) return {name: c.name || 'Untitled', sub: 'Saved character', charId: c.id};
    if (key === 'studio:ether') return {name: 'Ether', sub: 'Studio'};
    if (key === 'studio:element') return {name: 'Element', sub: 'Studio'};
    if (key.startsWith('studio:scene:')) return {name: pretty(key.slice(13)), sub: 'Studio preset'};
    return {name: pretty(key), sub: ''};
  }
  async function copyImage(src) {
    const img = new Image(); img.src = src; await img.decode();
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; c.getContext('2d').drawImage(img, 0, 0);
    const blob = await new Promise(r => c.toBlob(r, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
  }
  function download(src, name) {
    const a = document.createElement('a'); a.href = src; a.download = name.replace(/[^\w-]+/g, '-').toLowerCase() + '.jpg';
    document.body.append(a); a.click(); a.remove();
  }

  // opts: {label(key) -> {name, sub}, extra(item) -> [nodes], status(msg), onChange()}
  function mount(root, opts = {}) {
    const label = k => (opts.label && opts.label(k)) || defaultLabel(k);
    const say = m => opts.status ? opts.status(m) : null;
    const head = document.createElement('div'); head.className = 'rg-head';
    const search = document.createElement('input'); search.type = 'search'; search.placeholder = 'Search references by name'; search.setAttribute('aria-label', 'Search references');
    const count = document.createElement('span'); count.className = 'note'; count.style.fontSize = '13px';
    head.append(search, count);
    const grid = document.createElement('div'); grid.className = 'rg-grid';
    root.replaceChildren(head, grid);
    let items = [];

    function viewer(start) {
      let i = start;
      const v = document.createElement('div'); v.className = 'rg-view'; v.setAttribute('role', 'dialog'); v.setAttribute('aria-label', 'Reference image');
      const img = document.createElement('img'); const bar = document.createElement('div'); bar.className = 'rg-bar';
      const cap = document.createElement('span');
      const btn = (t, fn) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.onclick = e => { e.stopPropagation(); fn(); }; return b; };
      const show = () => { const it = items[i]; img.src = it.src; img.alt = it.name; cap.textContent = `${it.name} · ${i + 1} of ${items.length}`; };
      const close = () => { v.remove(); removeEventListener('keydown', key); };
      const key = e => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') { i = (i + 1) % items.length; show(); } if (e.key === 'ArrowLeft') { i = (i - 1 + items.length) % items.length; show(); } };
      bar.append(btn('‹ Prev', () => { i = (i - 1 + items.length) % items.length; show(); }), cap, btn('Next ›', () => { i = (i + 1) % items.length; show(); }),
        btn('Copy', () => copyImage(items[i].src).then(() => say('Image copied. Paste it into your image tool.')).catch(() => say('This browser won\'t copy images. Use Download.'))),
        btn('Download', () => download(items[i].src, items[i].name + '-reference')), btn('Close', close));
      v.append(img, bar); v.onclick = e => { if (e.target === v) close(); };
      addEventListener('keydown', key); document.body.append(v); show();
    }

    async function render() {
      const entries = await CharacterStore.allImages();
      items = [];
      entries.forEach(({key, images}) => { const l = label(key); images.forEach((src, idx) => items.push({key, idx, src, ...l, main: idx === 0})); });
      items.sort((a, b) => a.name.localeCompare(b.name) || a.idx - b.idx);
      const q = search.value.trim().toLowerCase();
      const shown = items.filter(it => !q || (it.name + ' ' + it.sub).toLowerCase().includes(q));
      count.textContent = items.length ? `${items.length} image${items.length === 1 ? '' : 's'}` : '';
      if (!items.length) {
        const e = document.createElement('div'); e.className = 'rg-empty';
        e.textContent = 'No saved references yet. Add a reference sheet to a character and it will show up here.';
        grid.replaceChildren(e); return;
      }
      grid.replaceChildren(...shown.map(it => {
        const card = document.createElement('div'); card.className = 'rg-card';
        const img = document.createElement('img'); img.src = it.src; img.alt = it.name + ' reference'; img.loading = 'lazy';
        img.onclick = () => viewer(items.indexOf(it));
        const meta = document.createElement('div'); meta.className = 'rg-meta';
        const n = document.createElement('b'); n.textContent = it.name;
        const s = document.createElement('small'); s.textContent = [it.sub, it.main ? 'Main sheet' : `Image ${it.idx + 1}`].filter(Boolean).join(' · ');
        meta.append(n, s);
        const acts = document.createElement('div'); acts.className = 'rg-acts';
        const b = (t, fn, title) => { const x = document.createElement('button'); x.type = 'button'; x.textContent = t; if (title) x.title = title; x.onclick = fn; acts.append(x); return x; };
        b('Copy', () => copyImage(it.src).then(() => say('Image copied. Paste it into your image tool.')).catch(() => say('This browser won\'t copy images. Use Download.')));
        b('Download', () => download(it.src, it.name + '-reference'));
        (opts.extra ? opts.extra(it) : []).forEach(n => acts.append(n));
        let armed = 0;
        const del = b('Delete', async () => {
          if (Date.now() - armed > 4000) { armed = Date.now(); del.textContent = 'Tap again'; setTimeout(() => del.textContent = 'Delete', 4000); return; }
          await CharacterStore.removeImage(it.key, it.idx); say(`Deleted a reference from ${it.name}.`);
          render(); opts.onChange && opts.onChange(it);
        });
        del.style.color = 'var(--es-warn,#d70015)';
        card.append(img, meta, acts); return card;
      }));
      if (!shown.length) { const e = document.createElement('div'); e.className = 'rg-empty'; e.textContent = 'No references match.'; grid.append(e); }
    }
    search.oninput = render;
    addEventListener('storage', e => { if (e.key === CharacterStore.KEY) render(); });
    render();
    return {refresh: render};
  }
  return {mount};
})();
