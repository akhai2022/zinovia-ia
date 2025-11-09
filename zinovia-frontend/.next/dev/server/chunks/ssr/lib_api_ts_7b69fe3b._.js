module.exports = [
"[project]/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
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
}),
];

//# sourceMappingURL=lib_api_ts_7b69fe3b._.js.map