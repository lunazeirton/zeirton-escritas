'use strict';
const categorias = {artigos:'Artigos',escritas:'Escritas',opinioes:'Opiniões',livros:'Livros'};
const items = Array.isArray(window.PUBLICACOES) ? window.PUBLICACOES : [];
const el = id => document.getElementById(id);
function safeURL(value){if(!value)return null;try{const u=new URL(value,location.href);return ['http:','https:','file:'].includes(u.protocol)?u.href:null}catch{return null}}
function label(n){return n===1?'1 publicação':`${n} publicações`}
function node(tag,text,cls){const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n}
function render(){
 let route;try{route=decodeURIComponent(location.hash.slice(1))||'inicio'}catch{route='inicio'}
 const article=route.startsWith('ler/')?items.find(p=>String(p.id)===route.slice(4)):null;
 const category=article?article.categoria:route;
 document.body.classList.toggle('reading-view',!!article);
 el('home-banner').hidden=!!article||!!categorias[route];
 document.querySelectorAll('nav a').forEach(a=>{if(a.hash==='#'+category)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 document.querySelector('.masthead').hidden=!!article;el('collection').hidden=!!article;el('reader').hidden=!article;
 if(article){
  document.title=`${article.titulo} | Zeirton Luna`;el('reading-title').textContent=article.titulo;el('reading-meta').textContent=categorias[article.categoria]||'';el('back').href='#'+article.categoria;
  el('reading-credit').textContent=article.imagemCredito||'';el('reading-credit').hidden=!article.imagemCredito;
  const image=safeURL(article.imagem);el('reading-visual').classList.toggle('is-empty',!image);el('reading-image').hidden=!image;if(image){el('reading-image').src=image;el('reading-image').alt=article.imagemAlt||''}else el('reading-image').removeAttribute('src');
  el('reading-body').replaceChildren(...(Array.isArray(article.paragrafos)?article.paragrafos:[]).map(p=>node('p',p)));
  const file=safeURL(article.arquivo);el('download').hidden=!file;if(file)el('download').href=file;else el('download').removeAttribute('href');
 }else{
  const valid=categorias[route];const selected=valid?items.filter(p=>p.categoria===route):items;
  document.title=valid?`${valid} | Zeirton Luna`:'Zeirton Luna';el('page-title').replaceChildren();if(valid)el('page-title').textContent=valid;else el('page-title').textContent='Zeirton Luna';
  el('eyebrow').textContent=valid?'Zeirton Luna':'Artigos, escritas, opiniões e livros';el('collection-title').textContent=valid?valid:'Todas as publicações';el('total').textContent=label(selected.length);el('empty').hidden=selected.length>0;
  el('entries').replaceChildren(...selected.map(p=>{const card=node('article',null,'entry');const img=safeURL(p.imagem);if(img){const i=node('img');i.src=img;i.alt=p.imagemAlt||'';i.loading='lazy';card.append(i)}card.append(node('small',categorias[p.categoria]||''));const h=node('h3'),a=node('a',p.titulo);a.href='#ler/'+encodeURIComponent(p.id);h.append(a);card.append(h);if(p.resumo)card.append(node('p',p.resumo));return card}));
 }
}
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0);el('conteudo').focus({preventScroll:true})});render();
