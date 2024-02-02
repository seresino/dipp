
import root from '../root.svelte';
import { set_building } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	track_server_fetches: false,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <!-- Load d3.js -->\n    <script src=\"https://d3js.org/d3.v4.js\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js\"></script>\n    <link\n      rel=\"stylesheet\"\n      href=\"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css\"\n    />\n    " + head + "\n    <style>\n      * {\n        box-sizing: border-box;\n        border-width: 2px;\n        padding: 0px;\n        margin: 0px;\n        transition-duration: 200ms;\n      }\n      body {\n        background-image: url(\"/images/background-gradient.png\");\n        background-size: cover;\n        background-position: center;\n      }\n      html {\n        font-family: Helvetica Neue;\n        font-weight: 300;\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n        -webkit-text-size-adjust: 100%;\n      }\n      a {\n        text-decoration: none;\n        color: black;\n      }\n      h1,\n      h2,\n      h3,\n      p {\n        margin: 0;\n      }\n      button {\n        border: none;\n        cursor: pointer;\n        background-color: transparent;\n      }\n      button:disabled {\n        display: none;\n      }\n      div {\n        display: flex;\n      }\n      form {\n        display: flex;\n        flex-direction: column;\n      }\n      .circular-button {\n        position: absolute;\n        top: 10px;\n        width: 40px;\n        z-index: 1000;\n      }\n      .circular-button img {\n        object-fit: cover;\n        width: 80px;\n      }\n      .back {\n        left: 10px;\n      }\n      .home {\n        right: 50px;\n      }\n\n      /* dashboard/module section */\n      .dashboard-container {\n        position: relative;\n        font-weight: 400;\n      }\n      .dashboard-container img {\n        width: 1020px;\n        max-width: 100%;\n      }\n      .dashboard-contents {\n        width: 100%;\n        flex-direction: column;\n        justify-content: space-between;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        padding: 20px 30px 40px 30px;\n      }\n      .top-text {\n        flex-direction: row;\n        justify-content: space-between;\n        margin-bottom: auto;\n        font-size: 38px;\n        padding: 10px;\n      }\n      .bottom-text {\n        margin-top: auto;\n        padding: 10px;\n        font-size: 28px;\n      }\n      .module-top-button {\n        flex-direction: column;\n        align-items: center;\n        margin-bottom: auto;\n      }\n      .module-info-pill {\n        flex-direction: row;\n        align-items: center;\n        justify-content: center;\n        border: solid black;\n        border-radius: 50px;\n        padding: 20px 20px 20px 40px;\n        font-size: 14px;\n      }\n      .module-info-button {\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        justify-content: center;\n        text-decoration: none;\n      }\n      .module-info-text {\n        padding: 0 20px 0 10px;\n      }\n\n      /* progress section */\n      .progress-container {\n        position: relative;\n        flex-direction: row;\n        align-items: center;\n        justify-content: space-between;\n        width: 980px;\n        max-width: 97%;\n        border-radius: 20px;\n        border: solid #d6c4be;\n        background-color: #fae3e4;\n        padding: 20px;\n      }\n      .progress-section {\n        flex-direction: row;\n        align-items: center;\n        justify-content: space-between;\n      }\n      .progress-text {\n        font-size: 20px;\n        padding: 0 10px;\n        text-wrap: nowrap;\n      }\n      .progress-bar {\n        flex-direction: row;\n        align-items: center;\n        justify-content: space-between;\n        width: 278px;\n        height: 23px;\n        max-width: 20vw;\n        background: black;\n        border-radius: 38px;\n        padding: 0 10px 0 10px;\n      }\n      .progress-pill {\n        width: 4.44px;\n        height: 9.05px;\n        background: #b5b5b5;\n        border-radius: 38px;\n      }\n      .modules-bar {\n        flex-direction: row;\n        align-items: center;\n        justify-content: space-between;\n        width: 248px;\n        height: 23px;\n        max-width: 18vw;\n        background: black;\n        border-radius: 38px;\n        padding: 0 10px 0 10px;\n      }\n      .modules-pill {\n        width: 61px;\n        max-width: 4vw;\n        height: 4px;\n        background: #b5b5b5;\n        border-radius: 10px;\n      }\n      .activity-bar {\n        flex-direction: row;\n        align-items: center;\n        justify-content: space-evenly;\n        width: 598px;\n        height: 39px;\n        background: black;\n        border-radius: 38px;\n        padding: 0 10px 0 10px;\n      }\n      .activity-pill {\n        width: 159px;\n        height: 7px;\n        background: #b5b5b5;\n        border-radius: 10px;\n      }\n\n      /* triplet section */\n      .triplet-container {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));\n        width: 1056px;\n        max-width: 100%;\n      }\n      .padding {\n        padding: 0 1vw;\n      }\n      .pop-up {\n        position: relative;\n        width: 1000px;\n        max-width: 100%;\n        min-height: 70vh;\n        border-radius: 10px;\n        padding: 100px 5vw 50px 5vw;\n      }\n      .pop-up-content {\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n      }\n      .center {\n        align-items: center;\n      }\n      .left {\n        align-items: left;\n      }\n      .white-text {\n        color: white;\n      }\n      .white {\n        background-color: white;\n      }\n      .light {\n        background-color: #5db3e5;\n      }\n      .medium {\n        background-color: #639fc9;\n      }\n      .dark {\n        background-color: #168ace;\n      }\n      .pill {\n        width: 113px;\n        height: 48.11px;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        background: white;\n        border-radius: 38px;\n        border: solid #168ace;\n        font-weight: 500;\n        word-wrap: break-word;\n      }\n      .form-button {\n        cursor: pointer;\n        border-radius: 20px;\n        border: none;\n        width: 101px;\n        height: 39px;\n        background: #f3f3f3;\n      }\n      .form-button input:hover {\n        opacity: 0.7;\n      }\n\n      /* mobile */\n      @media (max-width: 768px) {\n        .day {\n          font-size: 24px;\n        }\n        .dashboard-image {\n          display: none;\n        }\n        .dashboard-container {\n          width: 1056px;\n          max-width: 90%;\n          border-radius: 20px;\n          padding: 10px;\n          margin-bottom: 20px;\n        }\n        .dashboard-colour {\n          background-color: #5db3e5;\n          border: solid #168ace;\n        }\n        .module-colour {\n          background-color: white;\n          border: solid #d5d5d5;\n        }\n        .dashboard-contents {\n          position: static;\n          padding: 0;\n        }\n        .day-pill {\n          width: 100%;\n          max-width: 220px;\n          height: 80%;\n          max-height: 80px;\n        }\n        .module-pill {\n          margin-left: 10%;\n          width: 70%;\n          max-width: 200px;\n          height: 50%;\n          max-height: 80px;\n        }\n        .module-pill-text {\n          font-size: 20px;\n        }\n        .triplet-container {\n          grid-template-columns: 1fr;\n        }\n        .progress-bar {\n          display: none;\n        }\n        .modules-bar {\n          display: none;\n        }\n        .activity-bar {\n          display: none;\n        }\n        .bottom-text {\n          display: none;\n        }\n        .progress-text {\n          padding: 0 5px;\n        }\n        .progress-container {\n          max-width: 90%;\n        }\n      }\n    </style>\n  </head>\n  <body data-sveltekit-preload-data=\"hover\">\n    <div style=\"display: contents\">" + body + "</div>\n  </body>\n</html>\n",
		error: ({ status, message }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n\t\t\t\t\tUbuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "12abpuh"
};

export function get_hooks() {
	return {};
}

export { set_assets, set_building, set_private_env, set_public_env };
