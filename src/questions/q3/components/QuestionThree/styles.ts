import type { CSSProperties } from "react";

const gap = 16;
const base: CSSProperties = {
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    color: "#fff",
};

export const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "#f6f7fb",
        padding: 24,
        boxSizing: "border-box",
        fontFamily: "Inter, system-ui, Arial, sans-serif",
    },
    container: { width: 920, display: "flex", flexDirection: "column", gap },
    row: { display: "flex", gap },
    col: { display: "flex", flexDirection: "column", gap },
    box: base,
    cardShadow: { boxShadow: "0 2px 10px rgba(0,0,0,.08)" },
    boxHeader: { ...base, height: 64, background: "#36c9da" },
    hero: { height: 160, background: "#d9c8ef", color: "#3d3061" },
    sidebar: { height: 240, background: "#98c46a", color: "#2b3c14" },
    main: { height: 260, background: "#ffb54b", color: "#6a4300" },
    extra: { height: 140, background: "#8e8e8e" },
    relatedImages: { height: 120, background: "#59c2a2" },
    relatedPosts: { height: 120, background: "#f4a8bb", color: "#6b2030" },
    footer: { height: 68, background: "#f59d0c" },
} as const;