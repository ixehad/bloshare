document.addEventListener('DOMContentLoaded', function () {

    // ── Enable/disable dimming ────────────────────────────────────────────
    function wireEnableToggle(checkboxId, fieldsId) {
        var cb = document.getElementById(checkboxId);
        var fields = document.getElementById(fieldsId);
        if (!cb || !fields) return;

        function applyState() {
            if (cb.checked) {
                fields.style.opacity = '';
                fields.style.pointerEvents = '';
            } else {
                fields.style.opacity = '0.45';
                fields.style.pointerEvents = 'none';
            }
        }

        cb.addEventListener('change', applyState);
        applyState();
    }

    wireEnableToggle('bls-ai-enabled',     'bls-ai-fields');
    wireEnableToggle('bls-social-enabled', 'bls-social-fields');

    // ── Button shape live preview ─────────────────────────────────────────
    var shapeSelect = document.querySelector('select[name="bls_settings[button_shape]"]');
    if (shapeSelect) {
        shapeSelect.addEventListener('change', function () {
            var previews = document.querySelectorAll('#bls-preview-ai .bls-row, #bls-preview-social .bls-row');
            previews.forEach(function (row) {
                row.classList.remove('bls-shape-pill', 'bls-shape-rounded', 'bls-shape-square');
                row.classList.add('bls-shape-' + shapeSelect.value);
            });
        });
    }

    // ── Button style live preview (AI) ────────────────────────────────────
    var aiStyleSelect = document.querySelector('select[name="bls_settings[ai_button_style]"]');
    if (aiStyleSelect) {
        aiStyleSelect.addEventListener('change', function () {
            updateButtonStyle('#bls-preview-ai', aiStyleSelect.value);
        });
    }

    // ── Button style live preview (Social) ───────────────────────────────
    var socialStyleSelect = document.querySelector('select[name="bls_settings[social_button_style]"]');
    if (socialStyleSelect) {
        socialStyleSelect.addEventListener('change', function () {
            updateButtonStyle('#bls-preview-social', socialStyleSelect.value);
        });
    }

    function updateButtonStyle(containerSel, newStyle) {
        var btns = document.querySelectorAll(containerSel + ' .bls-btn');
        btns.forEach(function (btn) {
            btn.classList.remove('bls-btn-style-text', 'bls-btn-style-icon', 'bls-btn-style-icon_text');
            btn.classList.add('bls-btn-style-' + newStyle);
        });
    }

    // ── Copy link checkbox (social preview) ──────────────────────────────
    var copyLinkCb = document.querySelector('input[name="bls_settings[show_copy_link]"]');
    if (copyLinkCb) {
        copyLinkCb.addEventListener('change', function () {
            var copyBtn = document.querySelector('#bls-preview-social .bls-btn-copy');
            if (copyBtn) copyBtn.style.display = copyLinkCb.checked ? '' : 'none';
        });
    }
});
