/**
 * AJAX Helper - Emlak Portalı
 * Tüm AJAX işlemleri için ortak yardımcı fonksiyonlar
 */

const AjaxHelper = {
    // API Base URL
    API_BASE: "http://localhost:5095/api",

    /**
     * GET İsteği
     * @param {string} endpoint - API endpoint (örn: "/Properties")
     * @param {function} onSuccess - Başarı callback
     * @param {function} onError - Hata callback
     * @param {boolean} includeAuth - Token ekle
     */
    get: function(endpoint, onSuccess, onError, includeAuth = true) {
        let config = {
            url: this.API_BASE + endpoint,
            type: "GET",
            dataType: "json",
            success: onSuccess,
            error: function(xhr, status, error) {
                console.error("AJAX GET Hatası:", error);
                if (onError) onError(xhr, status, error);
            }
        };

        if (includeAuth) {
            config.headers = {
                "Authorization": "Bearer " + localStorage.getItem("token")
            };
        }

        $.ajax(config);
    },

    /**
     * POST İsteği
     * @param {string} endpoint - API endpoint
     * @param {object} data - Gönderilecek veri
     * @param {function} onSuccess - Başarı callback
     * @param {function} onError - Hata callback
     */
    post: function(endpoint, data, onSuccess, onError) {
        $.ajax({
            url: this.API_BASE + endpoint,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: onSuccess,
            error: function(xhr, status, error) {
                console.error("AJAX POST Hatası:", error);
                if (onError) onError(xhr, status, error);
            }
        });
    },

    /**
     * PUT İsteği
     * @param {string} endpoint - API endpoint
     * @param {object} data - Gönderilecek veri
     * @param {function} onSuccess - Başarı callback
     * @param {function} onError - Hata callback
     */
    put: function(endpoint, data, onSuccess, onError) {
        $.ajax({
            url: this.API_BASE + endpoint,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: onSuccess,
            error: function(xhr, status, error) {
                console.error("AJAX PUT Hatası:", error);
                if (onError) onError(xhr, status, error);
            }
        });
    },

    /**
     * DELETE İsteği
     * @param {string} endpoint - API endpoint
     * @param {function} onSuccess - Başarı callback
     * @param {function} onError - Hata callback
     */
    delete: function(endpoint, onSuccess, onError) {
        $.ajax({
            url: this.API_BASE + endpoint,
            type: "DELETE",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: onSuccess,
            error: function(xhr, status, error) {
                console.error("AJAX DELETE Hatası:", error);
                if (onError) onError(xhr, status, error);
            }
        });
    },

    /**
     * Alert göster (Bootstrap Alert)
     * @param {string} type - "success", "danger", "warning", "info"
     * @param {string} message - Mesaj
     * @param {string} elementId - Alert div ID'si (opsiyonel)
     */
    showAlert: function(type, message, elementId = "actionAlert") {
        const alertEl = $("#" + elementId);
        alertEl.removeClass("d-none")
            .removeClass("alert-success alert-danger alert-warning alert-info")
            .addClass("alert-" + type)
            .text(message)
            .fadeIn();

        // 4 saniye sonra kaybolan
        setTimeout(() => {
            alertEl.fadeOut(300, function() {
                $(this).addClass("d-none");
            });
        }, 4000);
    },

    /**
     * Loading spinner göster
     * @param {string} elementId - Hedef element ID'si
     * @param {string} message - Mesaj (opsiyonel)
     */
    showLoader: function(elementId, message = "Yükleniyor...") {
        let html = `
            <div class="text-center py-4">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2 text-muted mb-0">${message}</p>
            </div>
        `;
        $("#" + elementId).html(html);
    },

    /**
     * Token kontrol
     */
    checkToken: function() {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/Account/Login";
            return false;
        }
        return true;
    },

    /**
     * JWT Payload'ını decode et
     */
    decodeToken: function(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (err) {
            console.error("Token decode hatası:", err);
            return null;
        }
    }
};

// Token varsa URL'i API config'e göre ayarla
$(document).ready(function() {
    if (!localStorage.getItem("token")) {
        // Token yoksa login'e yönlendir (admin sayfaları için)
        if (window.location.pathname.includes("/Admin/")) {
            window.location.href = "/Account/Login";
        }
    }
});
