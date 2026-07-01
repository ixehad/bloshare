<?php
/**
 * Plugin Name:       Bloshare – AI Summarize & Social Share
 * Plugin URI:        https://github.com/ixehad/bloshare
 * Description:       Adds "Summarize with AI" buttons (ChatGPT, Claude, Perplexity, Grok, Google) and social share buttons (Facebook, X, WhatsApp, LinkedIn, Telegram, Pinterest) to blog posts. Fully configurable — no coding required.
 * Version:           1.0.0
 * Requires at least: 5.6
 * Requires PHP:      7.2
 * Author:            Jehadul Islam
 * Author URI:        https://github.com/ixehad
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bloshare
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // No direct access.
}

define( 'BLS_VERSION', '1.2.0' );
define( 'KAS_PATH', plugin_dir_path( __FILE__ ) );
define( 'BLS_URL', plugin_dir_url( __FILE__ ) );

require_once KAS_PATH . 'includes/class-bls-settings.php';
require_once KAS_PATH . 'includes/class-bls-render.php';
require_once KAS_PATH . 'includes/class-bls-loader.php';

/**
 * Boot the plugin.
 */
function bls_init_plugin() {
    BLS_Settings::instance();
    BLS_Loader::instance();
}
add_action( 'plugins_loaded', 'bls_init_plugin' );

/**
 * Default options set on activation (only if not already present,
 * so re-activating, or upgrading from an earlier version of this
 * plugin, never wipes a site's existing configuration).
 */
function bls_activate_plugin() {
    if ( false === get_option( 'bls_settings' ) ) {
        update_option( 'bls_settings', BLS_Settings::defaults() );
    }
}
register_activation_hook( __FILE__, 'bls_activate_plugin' );
