const els = {
    canvas: document.getElementById("zenoCanvas"),
    start: document.getElementById("startBtn"),
    pause: document.getElementById("pauseBtn"),
    reset: document.getElementById("resetBtn"),
    lead: document.getElementById("lead"),
    vA: document.getElementById("vA"),
    vT: document.getElementById("vT"),
    leadOut: document.getElementById("leadOut"),
    vAOut: document.getElementById("vAOut"),
    vTOut: document.getElementById("vTOut"),
    showMarkers: document.getElementById("markersToggle"),
    showTrail: document.getElementById("trailToggle"),
    timeOut: document.getElementById("timeOut"),
    aOut: document.getElementById("aOut"),
    tOut: document.getElementById("tOut"),
    mOut: document.getElementById("mOut"),
};

const ctx = els.canvas.getContext("2d");
const DPR = Math.min(2, window.devicePixelRatio || 1);

const state = {
    running: false,
    lastTs: null,
    t: 0,
    xA: 0,
    xT: 200,
    markers: [],
    W: els.canvas.width,
    H: els.canvas.height,
    trail: [],
};

const cfg = {
    get d0() { return +els.lead.value; },
    get vA() { return +els.vA.value; },
    get vT() { return +els.vT.value; },
    get showMarkers() { return els.showMarkers.checked; },
    get showTrail() { return els.showTrail.checked; },
};

const fmt = (n, f=2) => n.toFixed(f);

function resizeCanvas() {
    const cssW = els.canvas.clientWidth;
    const cssH = els.canvas.clientHeight || els.canvas.height;
    const newW = Math.round(cssW * DPR);
    const newH = Math.round(cssH * DPR);
    if (newW && newH && (newW !== state.W || newH !== state.H)) {
        state.W = els.canvas.width = newW;
        state.H = els.canvas.height = newH;
    }
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function reset() {
    state.running = false;
    state.lastTs = null;
    state.t = 0;
    state.xA = 0;
    state.xT = cfg.d0;
    state.markers = [cfg.d0];
    state.trail = [];
    updateReadout();
    draw(true);
}

function start() {
    if (!state.running) {
        state.running = true;
        requestAnimationFrame(loop);
    }
}

function pause() { state.running = false; }

function loop(ts) {
    if (!state.running) return;
    if (!state.lastTs) state.lastTs = ts;
    const dt = (ts - state.lastTs) / 1000;
    state.lastTs = ts;

    state.t += dt;
    state.xA += cfg.vA * dt;
    state.xT += cfg.vT * dt;

    if (cfg.showTrail) {
        state.trail.push({ xA: state.xA, xT: state.xT });
        if (state.trail.length > 300) state.trail.shift();
    } else {
        state.trail.length = 0;
    }

    const lastMarker = state.markers[state.markers.length - 1];
    if (state.xA >= lastMarker) {
        state.markers.push(state.xT);
        if (state.markers.length > 1000) state.markers.shift();
    }

    updateReadout();
    draw();

    requestAnimationFrame(loop);
}

[els.lead, els.vA, els.vT].forEach(inp => {
    inp.addEventListener("input", () => {
        els.leadOut.textContent = els.lead.value;
        els.vAOut.textContent = els.vA.value;
        els.vTOut.textContent = els.vT.value;
        const wasRunning = state.running;
        reset();
        if (wasRunning) start();
    });
});

els.start.addEventListener("click", start);
els.pause.addEventListener("click", pause);
els.reset.addEventListener("click", reset);
els.showMarkers.addEventListener("change", () => draw(true));
els.showTrail.addEventListener("change", () => draw(true));

function draw(clearAll=false) {
    const { W, H } = state;
    ctx.clearRect(0, 0, W, H);
    drawTrack();

    if (cfg.showMarkers) {
        ctx.save();
        ctx.strokeStyle = "rgba(245, 158, 11, 0.9)";
        ctx.fillStyle = "rgba(245, 158, 11, 0.85)";
        ctx.lineWidth = 2 * DPR;
        state.markers.forEach((mx, i) => {
            const x = mx * DPR;
            ctx.beginPath();
            ctx.moveTo(x, H * 0.26);
            ctx.lineTo(x, H * 0.74);
            ctx.stroke();
            if (i % 2 === 0) {
                ctx.beginPath();
                ctx.arc(x, H * 0.5, 3.5 * DPR, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        ctx.restore();
    }

    if (cfg.showTrail && state.trail.length) {
        ctx.save();
        ctx.lineWidth = 2 * DPR;
        ctx.strokeStyle = "rgba(96,165,250,0.25)";
        ctx.beginPath();
        state.trail.forEach((p, i) => {
            const x = p.xA * DPR;
            const y = H * 0.35;
            if (!i) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        ctx.strokeStyle = "rgba(248,113,113,0.25)";
        ctx.beginPath();
        state.trail.forEach((p, i) => {
            const x = p.xT * DPR;
            const y = H * 0.65;
            if (!i) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.restore();
    }

    drawRunner(state.xA * DPR, H * 0.35, "#60a5fa", "A");
    drawRunner(state.xT * DPR, H * 0.65, "#f87171", "T");
}

function drawTrack() {
    const { W, H } = state;
    const y1 = H * 0.35;
    const y2 = H * 0.65;

    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, "rgba(255,255,255,0.06)");
    grad.addColorStop(1, "rgba(255,255,255,0.02)");

    ctx.save();
    ctx.lineWidth = 3 * DPR;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath(); ctx.moveTo(0, y1); ctx.lineTo(W, y1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, y2); ctx.lineTo(W, y2); ctx.stroke();
    ctx.fillStyle = grad;
    ctx.fillRect(0, y1 - 26 * DPR, W, (y2 - y1) + 52 * DPR);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1 * DPR;
    for (let x = 0; x <= W; x += 100 * DPR) {
        ctx.beginPath(); ctx.moveTo(x, y1 - 32 * DPR); ctx.lineTo(x, y2 + 32 * DPR); ctx.stroke();
    }
    ctx.restore();
}

function drawRunner(x, y, color, label) {
    const r = 12 * DPR;
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 10 * DPR;
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "white";
    ctx.font = `${12 * DPR}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(label, x, y - 18 * DPR);
    ctx.restore();
}

function updateReadout() {
    els.timeOut.textContent = `${fmt(state.t, 2)}s`;
    els.aOut.textContent = `${Math.round(state.xA)} px`;
    els.tOut.textContent = `${Math.round(state.xT)} px`;
    els.mOut.textContent = `${state.markers.length - 1}`;
}

reset();
draw(true);
