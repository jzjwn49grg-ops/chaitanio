const people=[['Sofia','SO'],['Alejandro','AL'],['Camila','CA'],['Diego','DI'],['Valentina','VA'],['Javi','JA'],['Laura','LA'],['Andrés','AN']];
const events=[['Rumba Latina','Salsa · Reggaetón · Bachata','Sala Eclipse','Hoy · 22:00','1,2 km','Madrid','noche'],['Tech House Night','Tech House · Deep House','La Cúpula','Sáb · 23:00','1,8 km','Barcelona','noche'],['Urban Vibes','Reggaetón · Trap · Dembow','Sala Capitol','Hoy · 23:30','2,3 km','Valencia','noche'],['Neon Party','House · Techno · Electro','Sala Sonar','Mañana · 00:00','3,1 km','Málaga','noche'],
 ['Brunch & Beats','Brunch · Música · Terraza','Terraza Mar','Dom · 12:00','1,5 km','Málaga','día'],
 ['Plan al Sol','Chiringuito · Amigos · Música','Costa Lounge','Sáb · 16:00','2,0 km','Valencia','día']];
const msgs=[['Valentina','¿Nos vemos en la fiesta? 😉','10:24'],['Javi','Nos vemos allí, bro! 🎧','09:58'],['Laura','Qué tal?? 🥰','09:42'],['Sofia','Vamos a la rumba? 🔥','08:36'],['Andrés','Jajaja perfecto! 😎','Ayer'],['Camila','Te agregué, un placer! 👋','Ayer'],['Diego','Nos vemos luego! 🎉','Ayer']];
function avatar(n){return `<div class="avatar">${n}</div>`}
let selectedCity='Todas';
let selectedTimeFilter='Todos';
let accountType='personal';
let personalProfile={name:'Ivan',handle:'@chaitanio',bio:'Good vibes, better people 💜'};
try{accountType=localStorage.getItem('chaitanio_account_type')||'personal';}catch(_e){}
function changeCity(city){selectedCity=city;const note=document.getElementById('city-note');if(note)note.textContent=city==='Todas'?'Explorando eventos de toda España · Demo':`Explorando ${city} · Contenido de demostración`;renderEvents();}
function renderEvents(){let filtered=events.filter(e=>selectedCity==='Todas'||e[5]===selectedCity);if(selectedTimeFilter==='Hoy')filtered=filtered.filter(e=>e[3].startsWith('Hoy'));else if(selectedTimeFilter==='Mañana')filtered=filtered.filter(e=>e[3].startsWith('Mañana'));else if(selectedTimeFilter==='Este fin de semana')filtered=filtered.filter(e=>/Sáb|Dom/.test(e[3]));const el=document.getElementById('event-list');if(el)el.innerHTML=filtered.map(e=>{const i=events.indexOf(e);return `<button class="event-list-card event-button" onclick="openEvent(${i})"><div class="event-img"></div><div><span class="tag">${e[6]==='día'?'Plan de día':'Fiesta'}</span><h3>${e[0]}</h3><p>${e[1]}</p><p>⌖ ${e[2]} · ${e[5]}</p><p>◷ ${e[3]}</p></div></button>`}).join('')||'<p class="muted">Todavía no hay eventos de demostración para esta ciudad.</p>';}
function render(){
 document.getElementById('stories').innerHTML=people.slice(0,6).map((p,i)=>`<div class="story"><div class="story-avatar">${p[1]}</div>${['Tu historia','Fiesta','Amigos','Eventos','Hoy','Música'][i]}</div>`).join('');
 document.getElementById('people').innerHTML=people.slice(0,4).map((p,i)=>`<button class="person person-btn" onclick="openPerson(${i})">${avatar(p[1])}<div>${p[0]}</div><small><span class="online"></span>${i+1},${i+2} km</small></button>`).join('');
 document.getElementById('suggested').innerHTML=people.slice(4).map((p,i)=>`<button class="person person-btn" onclick="openPerson(${i+4})">${avatar(p[1])}<div>${p[0]}</div><small>Conocido</small></button>`).join('');
 document.getElementById('featured').innerHTML=events.slice(0,2).map((e,i)=>card(e,i)).join('');
 renderEvents();
 document.getElementById('chat-list').innerHTML=msgs.map((m,i)=>`<button class="chat-item chat-button" onclick="openChat(${i})">${avatar(m[0].slice(0,2).toUpperCase())}<div class="chat-text"><strong>${m[0]}</strong><p>${m[1]}</p></div><div class="time">${m[2]}${i<4?'<br><span class="badge">'+(i+1)+'</span>':''}</div></button>`).join('');
}
function card(e,i){return `<button class="event-card event-button" onclick="openEvent(${i})"><div class="event-img"></div><div class="event-body"><span class="tag">${e[6]==='día'?'Plan de día':'Fiesta'}</span><h3>${e[0]}</h3><p>${e[3]} · ${e[4]}</p><p>${e[2]} · ${e[5]}</p></div></button>`}
function showScreen(name){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); const target=document.getElementById('screen-'+name);if(target)target.classList.add('active');document.querySelectorAll('.bottom-nav button[data-screen]').forEach(b=>b.classList.toggle('active',b.dataset.screen===name));window.scrollTo(0,0)}
function openCreate(){document.getElementById('create-modal').classList.remove('hidden')}
function filterEventsByTime(filter,button){selectedTimeFilter=filter;document.querySelectorAll('.chips button').forEach(b=>b.classList.remove('selected'));if(button)button.classList.add('selected');renderEvents()}
function cycleEventFilter(){const filters=['Todos','Hoy','Mañana','Este fin de semana'];const next=filters[(filters.indexOf(selectedTimeFilter)+1)%filters.length];filterEventsByTime(next,[...document.querySelectorAll('.chips button')].find(b=>b.textContent===next))}
function openSearch(){const q=prompt('¿Qué quieres buscar: evento, local o persona?');if(!q)return;const found=events.find(e=>e.join(' ').toLowerCase().includes(q.toLowerCase()));if(found){showScreen('events');openEvent(events.indexOf(found));return}const personIndex=people.findIndex(p=>p[0].toLowerCase().includes(q.toLowerCase()));if(personIndex>=0){openPerson(personIndex);return}alert('No encontramos “'+q+'” en el contenido de demostración.')}
function showNotifications(){alert('No tienes notificaciones nuevas en esta demo.')}
function showAccountChooser(){showScreen('account')}
function setAccountType(type){accountType=type;try{localStorage.setItem('chaitanio_account_type',type)}catch(_e){};const out=document.getElementById('account-feedback');if(out)out.textContent='Tipo de cuenta seleccionado: '+(type==='personal'?'Personal':'Empresario')+'.';if(type==='business')showScreen('business');else showScreen('profile')}
function editPersonalProfile(){const name=prompt('¿Cómo quieres que aparezca tu nombre?',personalProfile.name);if(name===null)return;const bio=prompt('Escribe una breve descripción para tu perfil:',personalProfile.bio);if(bio===null)return;personalProfile.name=name.trim()||'Usuario';personalProfile.bio=bio.trim();const title=document.querySelector('#screen-profile .profile-card h1'),handle=document.querySelector('#screen-profile .profile-card .handle'),desc=document.querySelector('#screen-profile .profile-card p:last-child');if(title)title.textContent=personalProfile.name;if(desc)desc.textContent='“'+personalProfile.bio+'”';if(handle)handle.textContent='@'+personalProfile.name.toLowerCase().replace(/[^a-z0-9_]/g,'');}
function showFavorites(){alert('Tus favoritos aparecerán aquí cuando guardes eventos o perfiles. Esta función está pendiente de conectar.')}
function showSettings(){alert('Ajustes de demostración: privacidad, notificaciones y seguridad se configurarán en la versión con cuentas reales.')}
function showHelp(){alert('Ayuda CHAITANIO: esta es una demo local. Para soporte real añadiremos un centro de ayuda y contacto.')}

function closeCreate(){document.getElementById('create-modal').classList.add('hidden')}
function openEvent(i){const e=events[i];document.getElementById('screen-event-detail').innerHTML=`<header class="page-head"><button class="back" onclick="showScreen('events')">‹</button><h1>Detalle del evento</h1><button class="filter">♡</button></header><div class="detail-hero"><div class="event-img"></div></div><span class="tag">${e[0]==='Tech House Night'?'Tech House':'Fiesta'}</span><h2>${e[0]}</h2><p class="muted">${e[1]}</p><div class="detail-info"><div>◷<b>${e[3]}</b></div><div>⌖<b>${e[2]}</b></div><div>◎<b>${e[4]}</b></div></div><div class="detail-section"><h3>Sobre el evento</h3><p>Descubre gente, música y buenas vibras. Guarda este evento para tenerlo siempre a mano.</p></div><button class="primary-btn" onclick="reserveEvent('${e[0]}')">🎟️ Conseguir entrada</button>`;showScreen('event-detail')}
function reserveEvent(name){showScreen('tickets');const select=document.getElementById('ticket-event');if(select){const match=[...select.options].find(o=>o.text===name);if(match)select.value=match.value;}switchTicketTab('buy');const feedback=document.getElementById('ticket-feedback');if(feedback)feedback.textContent='Has elegido '+name+'. Selecciona la cantidad y reserva una entrada de prueba.';}
function openPerson(i){const p=people[i];document.getElementById('screen-person-detail').innerHTML=`<header class="page-head"><button class="back" onclick="showScreen('home')">‹</button><h1>Perfil</h1><button class="filter">•••</button></header><div class="person-detail"><div class="avatar huge">${p[1]}</div><h2>${p[0]}</h2><p class="muted">Cerca de ti · Le gusta salir y descubrir nuevos eventos.</p><button class="primary-btn" onclick="alert('Solicitud enviada (modo demo).')">＋ Añadir a amigos</button><button class="secondary-btn" onclick="openChatByName('${p[0]}')">💬 Enviar mensaje</button></div>`;showScreen('person-detail')}
function openChat(i){openChatByName(msgs[i][0])}
function openChatByName(name){document.getElementById('screen-chat-detail').innerHTML=`<header class="page-head"><button class="back" onclick="showScreen('chat')">‹</button><h1>${name}</h1><span class="online-dot"></span></header><div class="conversation"><div class="bubble received">¡Hola! 👋</div><div class="bubble sent">¡Qué tal! ¿Vas a algún evento hoy?</div><div class="bubble received">Sí, quizá a Rumba Latina 🔥</div></div><form class="message-box" onsubmit="sendMessage(event)"><input id="message-input" placeholder="Escribe un mensaje…" autocomplete="off"><button>➤</button></form>`;showScreen('chat-detail')}
function sendMessage(e){e.preventDefault();const input=document.getElementById('message-input');if(!input.value.trim())return;const c=document.querySelector('.conversation');c.insertAdjacentHTML('beforeend',`<div class="bubble sent">${escapeText(input.value)}</div>`);input.value='';c.scrollTop=c.scrollHeight}
function reserveCreated(){const title=document.getElementById('new-event-title').value.trim();if(!title){alert('Escribe el nombre del evento primero.');return}const city=selectedCity==='Todas'?'Madrid':selectedCity;events.unshift([title,'Evento creado por la comunidad','Por confirmar','Próximamente','—',city,'noche']);document.getElementById('new-event-title').value='';closeCreate();renderEvents();render();showScreen('events');alert('“'+title+'” se ha añadido a la lista de esta demo. Todavía no se ha publicado en internet.');}

const livePlaces = [
  {name:'Sala Eclipse',title:'Preparando la Rumba Latina',viewers:128,live:true},
  {name:'La Cúpula',title:'Prueba de sonido · Tech House',viewers:76,live:true},
  {name:'Sala Capitol',title:'Próximo evento: Urban Vibes',viewers:0,live:false}
];
let demoPosts = [];
let businessProfile = {name:'', description:''};
function renderLives(){
  const makeLive=(l,i)=>`<button class="live-card" onclick="openLive(${i})"><div class="live-thumb"><span class="${l.live?'live-pill':'soon-pill'}">${l.live?'● EN DIRECTO':'PRÓXIMAMENTE'}</span><strong>♫</strong></div><div class="live-copy"><b>${l.name}</b><span>${l.title}</span><small>${l.live?'👁 '+l.viewers+' viendo':'Activa el aviso del local'}</small></div></button>`;
  const list=document.getElementById('live-list'); if(list) list.innerHTML=livePlaces.map(makeLive).join('');
  const home=document.getElementById('home-live-list'); if(home) home.innerHTML=livePlaces.slice(0,2).map(makeLive).join('');
}
function openLive(i){const l=livePlaces[i];alert(l.live?`${l.name}: ${l.title}\\n\\nVista de demostración: el reproductor real se conectará a un servicio de vídeo en directo en una fase posterior.`:`${l.name} todavía no está en directo.`);}
function publishPost(){
  const text=document.getElementById('post-text').value.trim(), file=document.getElementById('post-media').files[0];
  if(!text&&!file){document.getElementById('post-feedback').textContent='Escribe algo o selecciona una foto o vídeo antes de publicar.';return;}
  demoPosts.unshift({text:text||'📸 Contenido compartido',fileName:file?file.name:''});
  document.getElementById('post-text').value='';document.getElementById('post-media').value='';
  document.getElementById('post-feedback').textContent='Publicado en esta demostración. Aún no se ha subido a internet.';
  renderPosts();renderAdmin();
}
function renderPosts(){const feed=document.getElementById('post-feed');if(!feed)return;feed.innerHTML=demoPosts.map(p=>`<article class="post-card"><b>Tu publicación</b><p>${escapeText(p.text)}</p>${p.fileName?`<small>Archivo seleccionado: ${escapeText(p.fileName)}</small>`:''}</article>`).join('');}
function escapeText(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function saveBusiness(){businessProfile.name=document.getElementById('business-name').value.trim();businessProfile.description=document.getElementById('business-description').value.trim();document.getElementById('business-feedback').textContent=businessProfile.name?`Datos guardados localmente para ${businessProfile.name}. Demo sin servidor.`:'Escribe el nombre del local para guardar los datos de prueba.';}
function startLive(){document.getElementById('business-feedback').textContent='Live preparado en modo demostración. Para emitir de verdad habrá que integrar vídeo en directo, permisos de cámara/micrófono y moderación.';}
function renderAdmin(){const u=document.getElementById('admin-users'),p=document.getElementById('admin-posts'),r=document.getElementById('admin-reports');if(u)u.textContent='8';if(p)p.textContent=String(demoPosts.length);if(r)r.textContent='0';}

render();renderLives();renderPosts();renderAdmin();showScreen('home');


// Entradas y cobros: flujo interactivo de demostración, sin transacciones reales.
const DEMO_STORAGE_KEY='chaitanio_demo_tickets_v7';
function loadTicketDemo(){try{const saved=JSON.parse(localStorage.getItem(DEMO_STORAGE_KEY)||'{}');return{tickets:Array.isArray(saved.tickets)?saved.tickets:[],refunds:Array.isArray(saved.refunds)?saved.refunds:[],scans:Array.isArray(saved.scans)?saved.scans:[],permissions:saved.permissions&&typeof saved.permissions==='object'?saved.permissions:{checkin:true,sales:false,refunds:false}};}catch(_e){return{tickets:[],refunds:[],scans:[],permissions:{checkin:true,sales:false,refunds:false}};}}
const savedTicketDemo=loadTicketDemo();
let demoTickets=savedTicketDemo.tickets, demoRefunds=savedTicketDemo.refunds, demoScans=savedTicketDemo.scans, demoPermissions=savedTicketDemo.permissions;
function saveTicketDemo(){try{localStorage.setItem(DEMO_STORAGE_KEY,JSON.stringify({tickets:demoTickets,refunds:demoRefunds,scans:demoScans,permissions:demoPermissions}));}catch(_e){/* Storage may be unavailable in restricted browsing. */}}
function switchTicketTab(tab,button){['buy','my','manage'].forEach(t=>{const e=document.getElementById('ticket-'+t);if(e)e.classList.toggle('hidden',t!==tab)});document.querySelectorAll('.ticket-tabs button').forEach(b=>b.classList.remove('selected'));if(button)button.classList.add('selected');else{const bs=[...document.querySelectorAll('.ticket-tabs button')];const i={buy:0,my:1,manage:2}[tab];if(bs[i])bs[i].classList.add('selected')}if(tab==='my')renderMyTickets();if(tab==='manage')renderTicketManagement()}
function updateTicketTotal(){const q=Number(document.getElementById('ticket-quantity')?.value||1),e=document.getElementById('ticket-total');if(e)e.textContent=(q*15).toLocaleString('es-ES',{style:'currency',currency:'EUR'})}
function createDemoTicket(){const eventName=document.getElementById('ticket-event').value,q=Number(document.getElementById('ticket-quantity').value||1),method=document.querySelector('input[name="payment-method"]:checked')?.value||'Bizum',group='CH-'+Math.random().toString(36).slice(2,8).toUpperCase();for(let i=0;i<q;i++)demoTickets.unshift({id:group+(q>1?'-'+(i+1):''),event:eventName,amount:15,status:'Activa',method,created:new Date().toLocaleDateString('es-ES')});document.getElementById('ticket-feedback').textContent=`Reserva de prueba creada: ${q} entrada(s) para ${eventName}. Pago elegido: ${method}. No se ha realizado ningún cobro.`;renderTicketManagement();saveTicketDemo()}
function renderMyTickets(){const el=document.getElementById('my-ticket-list');if(!el)return;el.innerHTML=demoTickets.length?demoTickets.map(t=>`<article class="ticket-card"><div><span class="tag">${escapeText(t.status)}</span><h3>${escapeText(t.event)}</h3><p>${escapeText(t.id)} · ${t.amount.toFixed(2).replace('.',',')} €</p><small>Pago seleccionado: ${escapeText(t.method)} · ${escapeText(t.created)}</small></div><div class="ticket-qr" aria-label="Código QR ilustrativo">${qrPattern(t.id)}</div><button class="secondary-btn" onclick="requestDemoRefund('${t.id}')">Solicitar devolución</button></article>`).join(''):'<p class="muted">Todavía no tienes entradas de prueba. Puedes crear una en la pestaña Comprar.</p>'}
function qrPattern(seed){let n=0;for(const c of seed)n=(n*31+c.charCodeAt(0))>>>0;let cells='';for(let i=0;i<81;i++){n=(n*1664525+1013904223)>>>0;cells+=`<i class="${(n>>>28)&1?'dark':''}"></i>`}return `<span class="qr-grid">${cells}</span><small>QR DEMO</small>`}
function requestDemoRefund(id){const t=demoTickets.find(x=>x.id===id);if(!t||t.status!=='Activa'){alert('Esta entrada no está disponible para solicitar una devolución.');return}t.status='Devolución solicitada';demoRefunds.unshift({id,event:t.event,status:'Pendiente'});renderMyTickets();renderTicketManagement();saveTicketDemo();alert('Solicitud registrada en la demo. No se ha enviado dinero ni se ha iniciado una devolución real.')}
function renderTicketManagement(){const c=document.getElementById('ticket-count'),r=document.getElementById('ticket-refund-count'),s=document.getElementById('ticket-scan-count');if(c)c.textContent=String(demoTickets.length);if(r)r.textContent=String(demoRefunds.filter(x=>x.status==='Pendiente').length);if(s)s.textContent=String(demoScans.length);const el=document.getElementById('refund-list');if(el)el.innerHTML=demoRefunds.length?demoRefunds.map(x=>`<article class="refund-row"><div><b>${escapeText(x.event)}</b><small>${escapeText(x.id)} · ${escapeText(x.status)}</small></div><button class="secondary-btn" onclick="resolveDemoRefund('${x.id}')">Marcar revisada</button></article>`).join(''):'<p class="muted">No hay solicitudes de devolución.</p>'}
function resolveDemoRefund(id){const r=demoRefunds.find(x=>x.id===id);if(!r)return;r.status='Revisada (demo)';renderTicketManagement();saveTicketDemo()}
function saveDemoPermissions(){demoPermissions={checkin:document.getElementById('perm-checkin').checked,sales:document.getElementById('perm-sales').checked,refunds:document.getElementById('perm-refunds').checked};document.getElementById('permission-feedback').textContent='Permisos guardados en este navegador para la demo. En producción deben verificarse en el servidor.';saveTicketDemo()}
function validateDemoTicket(){const code=document.getElementById('scan-code').value.trim(),out=document.getElementById('scan-feedback');if(!code){out.textContent='Introduce el código de una entrada.';return}if(!demoPermissions.checkin){out.textContent='Acceso denegado: el permiso de control de acceso está desactivado.';return}const t=demoTickets.find(x=>x.id.toLowerCase()===code.toLowerCase());if(!t){out.textContent='Código no encontrado en esta sesión de demostración.';return}if(t.status!=='Activa'){out.textContent=`Entrada no válida: estado ${t.status}.`;return}t.status='Validada';demoScans.push(t.id);out.textContent=`Entrada válida para ${t.event}. Código ${t.id} marcado como utilizado en esta demo.`;renderMyTickets();renderTicketManagement();saveTicketDemo()}


// CHAITANIO v8: interfaz de registro/inicio de sesión de demostración.
let authMode = 'register';
function switchAuthMode(mode){
  authMode = mode === 'login' ? 'login' : 'register';
  const title=document.getElementById('auth-title');
  const nameLabel=document.getElementById('auth-name-label');
  const nameInput=document.getElementById('auth-name');
  const password=document.getElementById('auth-password');
  const submit=document.getElementById('auth-submit');
  const register=document.getElementById('auth-tab-register');
  const login=document.getElementById('auth-tab-login');
  if(title)title.textContent=authMode==='register'?'Crear tu cuenta':'Bienvenido de nuevo';
  if(nameLabel)nameLabel.hidden=authMode==='login';
  if(nameInput)nameInput.required=authMode==='register';
  if(password)password.autocomplete=authMode==='login'?'current-password':'new-password';
  if(submit)submit.textContent=authMode==='register'?'Crear cuenta de prueba':'Entrar en modo demostración';
  if(register)register.classList.toggle('selected',authMode==='register');
  if(login)login.classList.toggle('selected',authMode==='login');
  const feedback=document.getElementById('auth-feedback');
  if(feedback)feedback.textContent='Modo demostración: no se creará una cuenta real ni se enviarán tus datos a un servidor.';
}
function submitDemoAuth(event){
  event.preventDefault();
  const email=document.getElementById('auth-email').value.trim();
  const password=document.getElementById('auth-password').value;
  const name=document.getElementById('auth-name').value.trim();
  const type=document.getElementById('auth-type').value;
  const feedback=document.getElementById('auth-feedback');
  if(!email||password.length<8||(authMode==='register'&&!name)){
    feedback.textContent='Revisa los campos: correo válido, contraseña de al menos 8 caracteres y nombre para registrarte.';
    return;
  }
  if(authMode==='register'){
    personalProfile.name=name;
    try{localStorage.setItem('chaitanio_demo_profile',JSON.stringify({name,email,type}));}catch(_e){}
    feedback.textContent='Formulario de registro completado en la demo. La cuenta aún no existe en un servidor y no se ha guardado la contraseña.';
  }else{
    feedback.textContent='Formulario validado en la demo. No hay autenticación real ni una cuenta de servidor con la que iniciar sesión.';
  }
  if(type==='business')setAccountType('business');
  else if(authMode==='register')setAccountType('personal');
}
