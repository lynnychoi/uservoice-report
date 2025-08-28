export const colors = {
  // Brand colors
  primary: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed", // Main brand color
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },
  
  // Neutral colors
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Semantic colors
  success: {
    50: "#ecfdf5",
    100: "#d1fae5",
    500: "#10b981",
    700: "#047857",
    900: "#064e3b",
  },
  
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    500: "#f59e0b",
    700: "#b45309",
    900: "#78350f",
  },
  
  error: {
    50: "#fef2f2",
    100: "#fecaca",
    500: "#ef4444",
    700: "#b91c1c",
    900: "#7f1d1d",
  },
  
  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    500: "#3b82f6",
    700: "#1d4ed8",
    900: "#1e3a8a",
  },

  // Special colors
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
} as const

export type ColorToken = typeof colors