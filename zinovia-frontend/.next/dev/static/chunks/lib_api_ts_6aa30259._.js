(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API client for backend communication
 * Update BASE_URL when backend is deployed
 */ __turbopack_context__.s([
    "healthCheck",
    ()=>healthCheck,
    "submitContactForm",
    ()=>submitContactForm,
    "subscribeNewsletter",
    ()=>subscribeNewsletter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
async function submitContactForm(data) {
    try {
        const response = await fetch(`${BASE_URL}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(errorData.message || "Failed to submit contact form");
        }
        return await response.json();
    } catch (error) {
        console.error("Contact form submission error:", error);
        throw error;
    }
}
async function subscribeNewsletter(data) {
    try {
        const response = await fetch(`${BASE_URL}/newsletter/subscribe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(errorData.message || "Failed to subscribe");
        }
        return await response.json();
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        throw error;
    }
}
async function healthCheck() {
    try {
        const response = await fetch(`${BASE_URL}/health`, {
            method: "GET"
        });
        return response.ok;
    } catch  {
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_api_ts_6aa30259._.js.map