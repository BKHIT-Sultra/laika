// ==========================================================
// CONFIG.JS - Konfigurasi API Laika (VERSI FINAL & SEMPURNA)
// ==========================================================

// Gunakan URL Web App terbaru Anda yang menggunakan akun Gmail pribadi
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxG3fphRu1THzwoBNFF7ll5mfa8l-xaNKZ5BbmS-d7jk26-B_BLLFJeUmI5xzTUGPP5/exec";

async function fetchGasAPI(action, payload = null) {
    try {
        let response;
        
        // JIKA ADA PAYLOAD (Login, Simpan, Edit, Hapus) -> Gunakan POST
        if (payload !== null) {
            response = await fetch(GAS_API_URL, {
                method: 'POST',
                body: JSON.stringify({ 
                    action: action, 
                    payload: payload 
                }),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8' 
                }
            });
        } 
        // JIKA TIDAK ADA PAYLOAD (Load Tabel, Load Dashboard) -> Gunakan GET
        else {
            const getUrl = GAS_API_URL + "?action=" + encodeURIComponent(action);
            response = await fetch(getUrl);
        }

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
        
    } catch (error) {
        console.error("Gagal fetch ke GAS:", error);
        if (error.message.includes('Failed to fetch')) {
            throw new Error("Tidak bisa terhubung ke server. Pastikan URL Web App benar dan internet stabil.");
        }
        throw error;
    }
}
