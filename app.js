// 비포애프터웹앱 — 프론트엔드 UI 프로토타입 (실제 ffmpeg 렌더링 없음, 브라우저 안에서만 동작)

const EFFECTS = [
  { id: 'fade', label: '페이드', cat: '기본', css: { type: 'fade' } },
  { id: 'fadeblack', label: '블랙 페이드', cat: '기본', css: { type: 'fadecolor', color: '#000' } },
  { id: 'fadewhite', label: '화이트 페이드', cat: '기본', css: { type: 'fadecolor', color: '#fff' } },
  { id: 'dissolve', label: '디졸브', cat: '기본', css: { type: 'fade' } },
  { id: 'wipe-right', label: '와이프 →', cat: '와이프', css: { type: 'wipe', dir: 'right' } },
  { id: 'wipe-left', label: '와이프 ←', cat: '와이프', css: { type: 'wipe', dir: 'left' } },
  { id: 'wipe-down', label: '와이프 ↓', cat: '와이프', css: { type: 'wipe', dir: 'down' } },
  { id: 'wipe-up', label: '와이프 ↑', cat: '와이프', css: { type: 'wipe', dir: 'up' } },
  { id: 'slide-right', label: '슬라이드 →', cat: '슬라이드', css: { type: 'slide', dir: 'right' } },
  { id: 'slide-left', label: '슬라이드 ←', cat: '슬라이드', css: { type: 'slide', dir: 'left' } },
  { id: 'slide-down', label: '슬라이드 ↓', cat: '슬라이드', css: { type: 'slide', dir: 'down' } },
  { id: 'slide-up', label: '슬라이드 ↑', cat: '슬라이드', css: { type: 'slide', dir: 'up' } },
  { id: 'circle-open', label: '원형 열림', cat: '도형', css: { type: 'circle' } },
  { id: 'circle-close', label: '원형 닫힘', cat: '도형', css: { type: 'circle' } },
  { id: 'rectcrop', label: '사각 크롭', cat: '도형', css: { type: 'rect' } },
  { id: 'diag', label: '대각선', cat: '도형', css: { type: 'diag' } },
  { id: 'pixelize', label: '픽셀화', cat: '특수', css: { type: 'fade' } },
  { id: 'radial', label: '방사형', cat: '특수', css: { type: 'fade' } },
  { id: 'blur', label: '블러', cat: '특수', css: { type: 'blur' } },
  { id: 'zoomin', label: '줌인', cat: '특수', css: { type: 'zoom' } },
];

const ICONS = {
  fade: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="12" r="6" stroke="#8A8178" stroke-width="1.6"/><circle cx="15" cy="12" r="6" stroke="#8A8178" stroke-width="1.6" opacity="0.5"/></svg>',
  fadeblack: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="#3A332B"/><circle cx="16" cy="9" r="8" fill="#FFFFFF"/></svg>',
  fadewhite: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#8A8178" stroke-width="1.6"/><circle cx="16" cy="9" r="8" fill="#FFFFFF"/></svg>',
  dissolve: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="6" r="1" fill="#8A8178"/><circle cx="10" cy="4" r="1" fill="#8A8178"/><circle cx="15" cy="7" r="1" fill="#8A8178"/><circle cx="19" cy="5" r="1" fill="#8A8178"/><circle cx="4" cy="12" r="1" fill="#8A8178"/><circle cx="9" cy="11" r="1" fill="#8A8178"/><circle cx="14" cy="13" r="1" fill="#8A8178"/><circle cx="19" cy="12" r="1" fill="#8A8178"/><circle cx="6" cy="18" r="1" fill="#8A8178"/><circle cx="11" cy="17" r="1" fill="#8A8178"/><circle cx="16" cy="19" r="1" fill="#8A8178"/></svg>',
  wipe: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><line x1="12" y1="4" x2="12" y2="20" stroke="#8A8178" stroke-width="1.6"/><path d="M13 9l5 3-5 3" stroke="#8A8178" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  slide: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12h14M13 7l5 5-5 5" stroke="#8A8178" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  'circle-open': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill="#8A8178"/><circle cx="12" cy="12" r="8" stroke="#8A8178" stroke-width="1.4" stroke-dasharray="3 3" fill="none"/></svg>',
  'circle-close': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#8A8178" stroke-width="3" fill="none"/></svg>',
  rectcrop: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" stroke="#8A8178" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  diag: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><line x1="4" y1="20" x2="20" y2="4" stroke="#8A8178" stroke-width="1.6"/><path d="M15 4h5v5" stroke="#8A8178" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  pixelize: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="5" height="5" fill="#8A8178"/><rect x="10" y="4" width="5" height="5" fill="#8A8178" opacity="0.65"/><rect x="16" y="4" width="4" height="5" fill="#8A8178" opacity="0.35"/><rect x="4" y="10" width="5" height="5" fill="#8A8178" opacity="0.65"/><rect x="10" y="10" width="5" height="5" fill="#8A8178" opacity="0.35"/></svg>',
  radial: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><g stroke="#8A8178" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="12" x2="12" y2="3"/><line x1="12" y1="12" x2="19" y2="7"/><line x1="12" y1="12" x2="21" y2="14"/><line x1="12" y1="12" x2="16" y2="21"/><line x1="12" y1="12" x2="8" y2="21"/><line x1="12" y1="12" x2="3" y2="14"/><line x1="12" y1="12" x2="5" y2="7"/></g><circle cx="12" cy="12" r="2" fill="#8A8178"/></svg>',
  blur: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 8q3-3 6 0t6 0 6 0M3 16q3-3 6 0t6 0 6 0" stroke="#8A8178" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.7"/></svg>',
  zoomin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3l6 6M21 3l-6 6M3 21l6-6M21 21l-6-6" stroke="#8A8178" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="12" r="3" stroke="#8A8178" stroke-width="1.4" fill="none"/></svg>',
};
function iconFor(effect) {
  if (effect.css.type === 'wipe') return ICONS.wipe;
  if (effect.css.type === 'slide') return ICONS.slide;
  return ICONS[effect.id] || ICONS.fade;
}
const WIPE_ROT = { right: 0, left: 180, down: 90, up: 270 };

// 출력 규격 — 사진은 이 비율에 맞춰 중앙 기준으로 잘린다(center crop)
const RATIOS = {
  '9:16': { label: '쇼츠 · 릴스', w: 1080, h: 1920, css: '9 / 16' },
  '4:5':  { label: '인스타 세로', w: 1080, h: 1350, css: '4 / 5' },
  '1:1':  { label: '정사각',     w: 1080, h: 1080, css: '1 / 1' },
};

// 애프터 사진 보정 강도.
// 참고: 3번 세션(와이케이창호)은 명암 +4% / 채도 +6% 수준이라 실제로는 티가 안 났음 —
// 여기서는 눈에 보이는 수준으로 올리고, 직접 비교해서 고를 수 있게 단계로 뒀다.
const ENHANCE = {
  off:    { label: '보정 없음', filter: 'none', note: '원본 그대로' },
  basic:  { label: '기본',     filter: 'saturate(1.18) contrast(1.10) brightness(1.03)', note: '채도 +18% · 명암 +10% · 밝기 +3%' },
  strong: { label: '강하게',   filter: 'saturate(1.35) contrast(1.20) brightness(1.06)', note: '채도 +35% · 명암 +20% · 밝기 +6%' },
};

const state = {
  outputRatio: '9:16',
  enhanceLevel: 'basic',
  // 'square-blur' = 3번 세션(와이케이창호) 방식: 블러 배경 + 정사각 전면
  // 'fill'        = 사진 한 장이 프레임 전체를 채움
  frameLayout: 'square-blur',
  title: '구갈동 코오롱하늘채 504동 1904호',
  rooms: [
    { id: 1, name: '안방', before: null, after: null },
    { id: 2, name: '', before: null, after: null },
  ],
  nextId: 3,
  selectedRoomId: null,
  selectedWithinEffect: 'dissolve', // 한 방 안: 비포 → 애프터
  selectedRoomEffect: 'fade',       // 방 → 다음 방
  previewMode: 'within',            // 'within' | 'room'
  dragRoomId: null,
  pendingUpload: null, // { roomId, slot }
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function roomHasBoth(room) { return !!(room.before && room.after); }

function renderRooms() {
  const list = $('#roomList');
  list.innerHTML = state.rooms.map(roomTemplate).join('');
  $('#roomCount').textContent = `총 ${state.rooms.length}개 방 · 이미지 ${state.rooms.reduce((n, r) => n + (r.before ? 1 : 0) + (r.after ? 1 : 0), 0)}장 업로드됨`;
}

function dropzoneTemplate(room, slot) {
  const file = room[slot];
  if (file) {
    return `
      <div class="dropzone has-image" data-room-id="${room.id}" data-slot="${slot}">
        <div class="dz-thumb"><img src="${file.url}" alt=""></div>
        <div class="dz-filename">
          <span>${escapeHtml(file.name)}</span>
          <button class="dz-remove" data-action="remove-image" data-room-id="${room.id}" data-slot="${slot}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#B5AA9C" stroke-width="2.2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>`;
  }
  return `
    <div class="dropzone" data-action="pick-file" data-room-id="${room.id}" data-slot="${slot}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7.5 16.5a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.66-1.98A4.5 4.5 0 0 1 17 16.5" stroke="#B5AA9C" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 11v9" stroke="#B5AA9C" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 14l3-3 3 3" stroke="#B5AA9C" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="dz-hint">드래그하거나<br><b>클릭해서 선택</b></div>
    </div>`;
}

function roomTemplate(room) {
  const isPreviewing = room.id === state.selectedRoomId;
  return `
    <div class="room-card${isPreviewing ? ' previewing' : ''}" data-room-id="${room.id}" draggable="true">
      <div class="room-top">
        <div class="drag-handle" title="드래그해서 순서 변경">
          <svg width="12" height="20" viewBox="0 0 16 24" fill="none"><circle cx="5" cy="5" r="1.6" fill="#C9BFB2"/><circle cx="11" cy="5" r="1.6" fill="#C9BFB2"/><circle cx="5" cy="12" r="1.6" fill="#C9BFB2"/><circle cx="11" cy="12" r="1.6" fill="#C9BFB2"/><circle cx="5" cy="19" r="1.6" fill="#C9BFB2"/><circle cx="11" cy="19" r="1.6" fill="#C9BFB2"/></svg>
        </div>
        <div class="room-images">
          ${dropzoneTemplate(room, 'before')}
          ${dropzoneTemplate(room, 'after')}
        </div>
        <button class="delete-room" data-action="delete-room" data-room-id="${room.id}" title="이 방 삭제">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" stroke="#B08A6E" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <div class="room-bottom">
        <div class="drag-handle" style="visibility:hidden;"></div>
        <div class="room-bottom-inner">
          <div class="room-name-field">
            <label>방 이름</label>
            <input type="text" data-action="room-name" data-room-id="${room.id}" placeholder="방 이름 입력 (예: 욕실)" value="${escapeHtml(room.name)}">
          </div>
          ${isPreviewing ? `<div class="previewing-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="#C2703D" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="#C2703D"/></svg>미리보기 중</div>` : ''}
        </div>
        <div style="width:28px;flex-shrink:0;"></div>
      </div>
    </div>`;
}

function renderChips() {
  const wrap = $('#roomChips');
  wrap.innerHTML = state.rooms.map((r) => {
    const ready = roomHasBoth(r);
    const label = r.name || '(이름 없음)';
    if (!ready) return `<button class="chip disabled" disabled>${escapeHtml(label)} (사진 없음)</button>`;
    const sel = r.id === state.selectedRoomId ? ' selected' : '';
    return `<button class="chip${sel}" data-action="select-room" data-room-id="${r.id}">${escapeHtml(label)}</button>`;
  }).join('');
}

function effectLabel(id) {
  const fx = EFFECTS.find((f) => f.id === id);
  return fx ? fx.label : '';
}

function renderFxGrid(gridSelector, selectedId, actionName) {
  const grid = $(gridSelector);
  let lastCat = null;
  let html = '';
  EFFECTS.forEach((fx) => {
    if (fx.cat !== lastCat) { html += `<div class="fx-cat">${fx.cat}</div>`; lastCat = fx.cat; }
    const rot = fx.css.type === 'wipe' ? WIPE_ROT[fx.css.dir] : (fx.css.type === 'slide' ? WIPE_ROT[fx.css.dir] : 0);
    const selected = fx.id === selectedId ? ' selected' : '';
    html += `
      <button class="fx-card${selected}" data-action="${actionName}" data-effect-id="${fx.id}" data-label="${escapeHtml(fx.label)}">
        <div class="fx-check"><svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <span style="display:flex;transform:rotate(${rot}deg);">${iconFor(fx)}</span>
        <span>${escapeHtml(fx.label)}</span>
      </button>`;
  });
  html += `
    <button class="fx-card more" data-action="more-effects">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.4" fill="#8A8178"/><circle cx="12" cy="12" r="1.4" fill="#8A8178"/><circle cx="19" cy="12" r="1.4" fill="#8A8178"/></svg>
      <span>더 보기</span>
    </button>`;
  grid.innerHTML = html;
}

function renderBothFxGrids() {
  renderFxGrid('#fxGrid', state.selectedWithinEffect, 'select-effect');
  renderFxGrid('#roomFxGrid', state.selectedRoomEffect, 'select-room-effect');
}

// 방 목록 순서상 현재 방 다음에 오는, 사진이 다 채워진 방
function getNextReadyRoom(currentId) {
  const idx = state.rooms.findIndex((r) => r.id === currentId);
  if (idx === -1) return null;
  for (let i = idx + 1; i < state.rooms.length; i++) {
    if (roomHasBoth(state.rooms[i])) return state.rooms[i];
  }
  return null;
}

// 지금 미리보기에서 보여줄 두 장 + 라벨 + 효과
function currentPreviewPair() {
  const room = state.rooms.find((r) => r.id === state.selectedRoomId);
  if (!room || !roomHasBoth(room)) return null;

  if (state.previewMode === 'room') {
    const next = getNextReadyRoom(room.id);
    if (!next) return null;
    return {
      fromUrl: room.after.url,
      toUrl: next.before.url,
      fromLabel: `${room.name || '이 방'} 끝`,
      toLabel: `${next.name || '다음 방'} 시작`,
      caption: `${room.name || '방'} → ${next.name || '다음 방'} · ${effectLabel(state.selectedRoomEffect)} 전환`,
      effectId: state.selectedRoomEffect,
      fromIsAfterPhoto: true,   // 현재 방의 애프터 사진
      toIsAfterPhoto: false,    // 다음 방의 비포 사진
    };
  }

  return {
    fromUrl: room.before.url,
    toUrl: room.after.url,
    fromLabel: 'BEFORE',
    toLabel: 'AFTER',
    caption: `${room.name || '방'} · ${effectLabel(state.selectedWithinEffect)} 전환`,
    effectId: state.selectedWithinEffect,
    fromIsAfterPhoto: false,
    toIsAfterPhoto: true,
  };
}

function updatePreviewFrame() {
  const frame = $('#previewFrame');
  const before = $('#pfBefore'), after = $('#pfAfter');
  const pair = currentPreviewPair();

  if (!pair) {
    frame.classList.remove('pf-frame-ready');
    const empty = $('#pfEmpty');
    empty.style.display = 'flex';
    empty.textContent = state.previewMode === 'room'
      ? '방 전환을 보려면 사진이 채워진 방이 2개 이상 필요합니다'
      : '사진을 업로드하면 여기에 미리보기가 표시됩니다';
    before.classList.remove('visible'); after.classList.remove('visible');
    return;
  }

  $('#pfEmpty').style.display = 'none';
  frame.classList.add('pf-frame-ready');
  $('#pfBeforeBg').src = pair.fromUrl; $('#pfBeforeFg').src = pair.fromUrl;
  $('#pfAfterBg').src = pair.toUrl;    $('#pfAfterFg').src = pair.toUrl;
  before.classList.add('visible'); after.classList.add('visible');
  const enhanceOn = state.enhanceLevel !== 'off';
  before.classList.toggle('enhanced', enhanceOn && pair.fromIsAfterPhoto);
  after.classList.toggle('enhanced', enhanceOn && pair.toIsAfterPhoto);
  resetAfterLayer();
  $('#pfTagBefore').textContent = pair.fromLabel;
  $('#pfTagAfter').textContent = pair.toLabel;
  $('#pfTitle').textContent = state.title || '';
  $('#pfCaption').textContent = pair.caption;
  $('#pfProgressFill').style.width = '0%';
}

function resetAfterLayer() {
  const after = $('#pfAfter');
  after.style.transition = 'none';
  after.style.opacity = '0';
  after.style.clipPath = 'none';
  after.style.transform = 'none';
  after.style.filter = 'none';
  // force reflow so the next transition actually animates
  void after.offsetWidth;
}

function playTransition() {
  const pair = currentPreviewPair();
  if (!pair) return;
  const fx = EFFECTS.find((f) => f.id === pair.effectId) || EFFECTS[0];
  const after = $('#pfAfter');
  resetAfterLayer();

  const DUR = 700;
  const clipStart = {
    right: 'inset(0 100% 0 0)', left: 'inset(0 0 0 100%)', down: 'inset(100% 0 0 0)', up: 'inset(0 0 100% 0)',
  };
  const clipEnd = 'inset(0 0 0 0)';
  const translateStart = {
    right: 'translateX(-100%)', left: 'translateX(100%)', down: 'translateY(-100%)', up: 'translateY(100%)',
  };

  switch (fx.css.type) {
    case 'fade':
      after.style.opacity = '0';
      break;
    case 'fadecolor':
      after.style.opacity = '0';
      after.style.filter = `drop-shadow(0 0 0 ${fx.css.color})`;
      break;
    case 'wipe':
      after.style.opacity = '1';
      after.style.clipPath = clipStart[fx.css.dir];
      break;
    case 'slide':
      after.style.opacity = '1';
      after.style.transform = translateStart[fx.css.dir];
      break;
    case 'circle':
      after.style.opacity = '1';
      after.style.clipPath = 'circle(0% at 50% 50%)';
      break;
    case 'rect':
      after.style.opacity = '1';
      after.style.clipPath = 'inset(50% 50% 50% 50%)';
      break;
    case 'diag':
      after.style.opacity = '1';
      after.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
      break;
    case 'blur':
      after.style.opacity = '0';
      after.style.filter = 'blur(18px)';
      break;
    case 'zoom':
      after.style.opacity = '0';
      after.style.transform = 'scale(1.15)';
      break;
  }

  void after.offsetWidth;
  after.style.transition = `opacity ${DUR}ms ease, clip-path ${DUR}ms ease, transform ${DUR}ms ease, filter ${DUR}ms ease`;

  requestAnimationFrame(() => {
    switch (fx.css.type) {
      case 'fade': case 'fadecolor': after.style.opacity = '1'; break;
      case 'wipe': after.style.clipPath = clipEnd; break;
      case 'slide': after.style.transform = 'translate(0,0)'; break;
      case 'circle': after.style.clipPath = 'circle(150% at 50% 50%)'; break;
      case 'rect': after.style.clipPath = 'inset(0 0 0 0)'; break;
      case 'diag': after.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'; break;
      case 'blur': after.style.opacity = '1'; after.style.filter = 'blur(0px)'; break;
      case 'zoom': after.style.opacity = '1'; after.style.transform = 'scale(1)'; break;
    }
  });

  const fill = $('#pfProgressFill');
  fill.style.transition = `width ${DUR}ms linear`;
  fill.style.width = '0%';
  void fill.offsetWidth;
  fill.style.width = '100%';
}

function pickPreviewRoomIfNeeded() {
  const current = state.rooms.find((r) => r.id === state.selectedRoomId);
  if (current && roomHasBoth(current)) return;
  const firstReady = state.rooms.find(roomHasBoth);
  state.selectedRoomId = firstReady ? firstReady.id : null;
}

function applyOutputRatio() {
  const r = RATIOS[state.outputRatio] || RATIOS['9:16'];
  const frame = $('#previewFrame');
  frame.style.aspectRatio = r.css;
  frame.classList.toggle('layout-fill', state.frameLayout === 'fill');

  const layoutNote = state.frameLayout === 'square-blur'
    ? '정사각 전면 + 같은 사진 블러 배경'
    : '사진이 프레임 전체를 채움(중앙 크롭)';
  $('#previewSub').textContent = `${r.label} · ${r.w}×${r.h} — ${layoutNote}`;

  $$('#ratioGroup .ratio-btn').forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.ratio === state.outputRatio);
  });
  $$('#layoutGroup .layout-btn').forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.layout === state.frameLayout);
  });

  const en = ENHANCE[state.enhanceLevel] || ENHANCE.basic;
  frame.style.setProperty('--enhance-filter', en.filter);
  $('#enhanceSub').textContent = `애프터 사진에만 적용 — ${en.note}`;
  $$('#enhanceGroup .enhance-btn').forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.enhance === state.enhanceLevel);
  });
}

function fullRender() {
  applyOutputRatio();
  renderRooms();
  pickPreviewRoomIfNeeded();
  renderChips();
  renderBothFxGrids();
  updatePreviewFrame();
}

// ---- Upload handling ----
function setFile(roomId, slot, file) {
  const room = state.rooms.find((r) => r.id === roomId);
  if (!room || !file || !file.type.startsWith('image/')) return;
  if (room[slot] && room[slot].url) URL.revokeObjectURL(room[slot].url);
  room[slot] = { file, url: URL.createObjectURL(file), name: file.name };
  fullRender();
}
function removeFile(roomId, slot) {
  const room = state.rooms.find((r) => r.id === roomId);
  if (!room || !room[slot]) return;
  URL.revokeObjectURL(room[slot].url);
  room[slot] = null;
  fullRender();
}

// ---- Event delegation ----
document.addEventListener('DOMContentLoaded', () => {
  fullRender();

  $('#titleInput').addEventListener('input', (e) => {
    state.title = e.target.value;
    $('#pfTitle').textContent = state.title;
  });

  $('#addRoomBtn').addEventListener('click', () => {
    state.rooms.push({ id: state.nextId++, name: '', before: null, after: null });
    fullRender();
  });

  function wireFxSearch(inputSelector, gridSelector) {
    $(inputSelector).addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      $$(`${gridSelector} .fx-card:not(.more)`).forEach((card) => {
        const label = (card.dataset.label || '').toLowerCase();
        card.classList.toggle('hidden', q.length > 0 && !label.includes(q));
      });
    });
  }
  wireFxSearch('#fxSearch', '#fxGrid');
  wireFxSearch('#roomFxSearch', '#roomFxGrid');

  $('#ratioGroup').addEventListener('click', (e) => {
    const btn = e.target.closest('.ratio-btn');
    if (!btn) return;
    state.outputRatio = btn.dataset.ratio;
    applyOutputRatio();
  });

  $('#layoutGroup').addEventListener('click', (e) => {
    const btn = e.target.closest('.layout-btn');
    if (!btn) return;
    state.frameLayout = btn.dataset.layout;
    applyOutputRatio();
  });

  $('#enhanceGroup').addEventListener('click', (e) => {
    const btn = e.target.closest('.enhance-btn');
    if (!btn) return;
    state.enhanceLevel = btn.dataset.enhance;
    applyOutputRatio();
    updatePreviewFrame();
  });

  $('#pfPlayBtn').addEventListener('click', playTransition);

  $('#nextStepBtn').addEventListener('click', () => {
    alert('2단계(효과음 · 배경음) 화면은 아직 준비 중입니다.');
  });
  $('#settingsBtn').addEventListener('click', () => {
    alert('설정 화면은 아직 이 프로토타입에 연결되지 않았습니다.');
  });

  // Mobile preview open/close
  const panel = $('#previewPanel'), scrim = $('#previewScrim');
  function openPreview() { panel.classList.add('open'); scrim.classList.add('open'); }
  function closePreview() { panel.classList.remove('open'); scrim.classList.remove('open'); }
  $('#fabPreviewBtn').addEventListener('click', openPreview);
  $('#previewCloseBtn').addEventListener('click', closePreview);
  scrim.addEventListener('click', closePreview);

  // Hidden file input flow
  const hiddenInput = $('#hiddenFileInput');
  hiddenInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && state.pendingUpload) setFile(state.pendingUpload.roomId, state.pendingUpload.slot, file);
    hiddenInput.value = '';
    state.pendingUpload = null;
  });

  // Click delegation (room list)
  $('#roomList').addEventListener('click', (e) => {
    const pick = e.target.closest('[data-action="pick-file"]');
    if (pick) {
      state.pendingUpload = { roomId: Number(pick.dataset.roomId), slot: pick.dataset.slot };
      hiddenInput.click();
      return;
    }
    const remove = e.target.closest('[data-action="remove-image"]');
    if (remove) { e.stopPropagation(); removeFile(Number(remove.dataset.roomId), remove.dataset.slot); return; }
    const del = e.target.closest('[data-action="delete-room"]');
    if (del) {
      const id = Number(del.dataset.roomId);
      const room = state.rooms.find((r) => r.id === id);
      if (room) { if (room.before) URL.revokeObjectURL(room.before.url); if (room.after) URL.revokeObjectURL(room.after.url); }
      state.rooms = state.rooms.filter((r) => r.id !== id);
      fullRender();
    }
  });

  // Input delegation (room name) — direct state update, no full re-render (keeps focus)
  $('#roomList').addEventListener('input', (e) => {
    const nameInput = e.target.closest('[data-action="room-name"]');
    if (!nameInput) return;
    const id = Number(nameInput.dataset.roomId);
    const room = state.rooms.find((r) => r.id === id);
    if (!room) return;
    room.name = nameInput.value;
    renderChips();
    const pair = currentPreviewPair();
    if (pair) {
      $('#pfCaption').textContent = pair.caption;
      $('#pfTagBefore').textContent = pair.fromLabel;
      $('#pfTagAfter').textContent = pair.toLabel;
    }
  });

  // Drag & drop onto dropzones
  $('#roomList').addEventListener('dragover', (e) => {
    const dz = e.target.closest('.dropzone');
    if (dz) { e.preventDefault(); dz.classList.add('drag-active'); }
  });
  $('#roomList').addEventListener('dragleave', (e) => {
    const dz = e.target.closest('.dropzone');
    if (dz) dz.classList.remove('drag-active');
  });
  $('#roomList').addEventListener('drop', (e) => {
    const dz = e.target.closest('.dropzone');
    if (!dz) return;
    e.preventDefault();
    dz.classList.remove('drag-active');
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) setFile(Number(dz.dataset.roomId), dz.dataset.slot, file);
  });

  // Room reorder via drag handle
  $('#roomList').addEventListener('dragstart', (e) => {
    const card = e.target.closest('.room-card');
    if (!card) return;
    // 카드 전체가 draggable이지만, 실제로는 드래그 핸들에서 시작한 경우에만 순서 변경을 허용
    // (그래야 방 이름 입력창 안에서 텍스트를 드래그/선택하는 동작과 충돌하지 않음)
    if (!e.target.closest('.drag-handle')) { e.preventDefault(); return; }
    state.dragRoomId = Number(card.dataset.roomId);
    e.dataTransfer.effectAllowed = 'move';
  });
  $('#roomList').addEventListener('dragover', (e) => {
    const card = e.target.closest('.room-card');
    if (card && state.dragRoomId != null) e.preventDefault();
  });
  $('#roomList').addEventListener('drop', (e) => {
    const card = e.target.closest('.room-card');
    if (!card || state.dragRoomId == null) return;
    const targetId = Number(card.dataset.roomId);
    if (targetId === state.dragRoomId) return;
    const fromIdx = state.rooms.findIndex((r) => r.id === state.dragRoomId);
    const toIdx = state.rooms.findIndex((r) => r.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;
    const [moved] = state.rooms.splice(fromIdx, 1);
    state.rooms.splice(toIdx, 0, moved);
    state.dragRoomId = null;
    fullRender();
  });

  // Chips + effect grid (delegated on the whole panel)
  $('#previewPanel').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-action="select-room"]');
    if (chip) { state.selectedRoomId = Number(chip.dataset.roomId); renderChips(); updatePreviewFrame(); renderRooms(); return; }

    const fxCard = e.target.closest('[data-action="select-effect"]');
    if (fxCard) {
      state.selectedWithinEffect = fxCard.dataset.effectId;
      state.previewMode = 'within';
      renderBothFxGrids();
      updatePreviewFrame();
      playTransition();
      return;
    }

    const roomFxCard = e.target.closest('[data-action="select-room-effect"]');
    if (roomFxCard) {
      state.selectedRoomEffect = roomFxCard.dataset.effectId;
      state.previewMode = 'room';
      renderBothFxGrids();
      updatePreviewFrame();
      playTransition();
      return;
    }
    if (e.target.closest('[data-action="more-effects"]')) {
      alert('더 많은 화면전환 효과는 다음 업데이트에서 추가될 예정입니다.');
    }
  });
});
