
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    let SvelteElement;
    if (typeof HTMLElement !== 'undefined') {
        SvelteElement = class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            connectedCallback() {
                // @ts-ignore todo: improve typings
                for (const key in this.$$.slotted) {
                    // @ts-ignore todo: improve typings
                    this.appendChild(this.$$.slotted[key]);
                }
            }
            attributeChangedCallback(attr, _oldValue, newValue) {
                this[attr] = newValue;
            }
            $destroy() {
                destroy_component(this, 1);
                this.$destroy = noop;
            }
            $on(type, callback) {
                // TODO should this delegate to addEventListener?
                const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
                callbacks.push(callback);
                return () => {
                    const index = callbacks.indexOf(callback);
                    if (index !== -1)
                        callbacks.splice(index, 1);
                };
            }
            $set() {
                // overridden by instance, if it has props
            }
        };
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/App.svelte generated by Svelte v3.12.1 */

    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	var main, h1, t1, p0, t2, i, t4, t5, hr0, t6, p1, t8, ul, li0, t10, li1, t12, li2, t14, hr1, t15, h2, t17, p2, t19, p3, code0, t21, p4, t23, p5, code1, t25, h3, t27, table, tr0, th0, t28, br0, t29, th1, t31, tr1, td0, t33, td1, t34, br1, t35, tr2, td2, t37, td3, t39, tr3, td4, t41, td5, t43, tr4, td6, t45, td7, t47, p6, t49, p7, t51, footer, a0, t53, a1;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "baelte 🥋";
    			t1 = space();
    			p0 = element("p");
    			t2 = text("Bælte - [ˈbεldə]: Danish for ");
    			i = element("i");
    			i.textContent = "belt";
    			t4 = text(". Helps you keep your pants on.");
    			t5 = space();
    			hr0 = element("hr");
    			t6 = space();
    			p1 = element("p");
    			p1.textContent = "baelte is a CLI tool for svelte that helps you be productive.";
    			t8 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "🔋 Batteries included: You get a test suite out of the box.";
    			t10 = space();
    			li1 = element("li");
    			li1.textContent = "🚀 Scaffold new projects in seconds";
    			t12 = space();
    			li2 = element("li");
    			li2.textContent = "📦 Generate components and tests with one command";
    			t14 = space();
    			hr1 = element("hr");
    			t15 = space();
    			h2 = element("h2");
    			h2.textContent = "How it works";
    			t17 = space();
    			p2 = element("p");
    			p2.textContent = "Install baelte:";
    			t19 = space();
    			p3 = element("p");
    			code0 = element("code");
    			code0.textContent = "curl -LSfs https://japaric.github.io/trust/install.sh | \\\n    sh -s -- --git kennethlarsen/baelte";
    			t21 = space();
    			p4 = element("p");
    			p4.textContent = "And then generate your svelte project like this:";
    			t23 = space();
    			p5 = element("p");
    			code1 = element("code");
    			code1.textContent = "bealte new project-name";
    			t25 = space();
    			h3 = element("h3");
    			h3.textContent = "Available commands";
    			t27 = space();
    			table = element("table");
    			tr0 = element("tr");
    			th0 = element("th");
    			t28 = text("Command");
    			br0 = element("br");
    			t29 = space();
    			th1 = element("th");
    			th1.textContent = "What it does";
    			t31 = space();
    			tr1 = element("tr");
    			td0 = element("td");
    			td0.textContent = "baelte new project-name";
    			t33 = space();
    			td1 = element("td");
    			t34 = text("Scaffolds a new svelte project in \"/project-name\"");
    			br1 = element("br");
    			t35 = space();
    			tr2 = element("tr");
    			td2 = element("td");
    			td2.textContent = "baelte generate component component-name";
    			t37 = space();
    			td3 = element("td");
    			td3.textContent = "Generates a component as well as a component test file with boilerplate";
    			t39 = space();
    			tr3 = element("tr");
    			td4 = element("td");
    			td4.textContent = "yarn dev";
    			t41 = space();
    			td5 = element("td");
    			td5.textContent = "Runs the app in dev mode on localhost:5000";
    			t43 = space();
    			tr4 = element("tr");
    			td6 = element("td");
    			td6.textContent = "yarn test";
    			t45 = space();
    			td7 = element("td");
    			td7.textContent = "Runs the test suite";
    			t47 = space();
    			p6 = element("p");
    			p6.textContent = "If you don't use yarn then npm will also work.";
    			t49 = space();
    			p7 = element("p");
    			p7.textContent = "For more commands on building the project please have a look in package.json";
    			t51 = space();
    			footer = element("footer");
    			a0 = element("a");
    			a0.textContent = "Github";
    			t53 = text(" | ");
    			a1 = element("a");
    			a1.textContent = "Twitter";
    			add_location(h1, file, 8, 2, 412);
    			add_location(i, file, 9, 51, 482);
    			attr_dev(p0, "class", "tag-line");
    			add_location(p0, file, 9, 2, 433);
    			add_location(hr0, file, 10, 2, 531);
    			add_location(p1, file, 11, 2, 540);
    			add_location(li0, file, 14, 4, 621);
    			add_location(li1, file, 15, 4, 694);
    			add_location(li2, file, 16, 4, 743);
    			add_location(ul, file, 13, 2, 612);
    			add_location(hr1, file, 19, 2, 813);
    			add_location(h2, file, 21, 2, 822);
    			add_location(p2, file, 22, 4, 848);
    			add_location(code0, file, 23, 7, 878);
    			add_location(p3, file, 23, 4, 875);
    			add_location(p4, file, 25, 4, 997);
    			add_location(code1, file, 26, 7, 1060);
    			add_location(p5, file, 26, 4, 1057);
    			add_location(h3, file, 28, 2, 1104);
    			add_location(br0, file, 31, 35, 1201);
    			attr_dev(th0, "class", "tg-0lax svelte-164knmw");
    			add_location(th0, file, 31, 8, 1174);
    			attr_dev(th1, "class", "tg-0lax svelte-164knmw");
    			add_location(th1, file, 32, 8, 1219);
    			add_location(tr0, file, 30, 6, 1161);
    			attr_dev(td0, "class", "tg-0lax svelte-164knmw");
    			add_location(td0, file, 35, 8, 1288);
    			add_location(br1, file, 36, 77, 1414);
    			attr_dev(td1, "class", "tg-0lax svelte-164knmw");
    			add_location(td1, file, 36, 8, 1345);
    			add_location(tr1, file, 34, 6, 1275);
    			attr_dev(td2, "class", "tg-0lax svelte-164knmw");
    			add_location(td2, file, 39, 8, 1455);
    			attr_dev(td3, "class", "tg-0lax svelte-164knmw");
    			add_location(td3, file, 40, 8, 1529);
    			add_location(tr2, file, 38, 6, 1442);
    			attr_dev(td4, "class", "tg-0lax svelte-164knmw");
    			add_location(td4, file, 43, 8, 1657);
    			attr_dev(td5, "class", "tg-0lax svelte-164knmw");
    			add_location(td5, file, 44, 8, 1699);
    			add_location(tr3, file, 42, 6, 1644);
    			attr_dev(td6, "class", "tg-0lax svelte-164knmw");
    			add_location(td6, file, 47, 8, 1798);
    			attr_dev(td7, "class", "tg-0lax svelte-164knmw");
    			add_location(td7, file, 48, 8, 1841);
    			add_location(tr4, file, 46, 6, 1785);
    			attr_dev(table, "class", "tg svelte-164knmw");
    			add_location(table, file, 29, 4, 1136);
    			add_location(p6, file, 52, 4, 1916);
    			add_location(p7, file, 53, 4, 1974);
    			attr_dev(main, "class", "stack");
    			add_location(main, file, 7, 0, 389);
    			attr_dev(a0, "href", "https://github.com/kennethlarsen/baelte");
    			add_location(a0, file, 56, 8, 2075);
    			attr_dev(a1, "href", "https://twitter.com/kennethlarsen");
    			add_location(a1, file, 56, 71, 2138);
    			add_location(footer, file, 56, 0, 2067);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			append_dev(main, p0);
    			append_dev(p0, t2);
    			append_dev(p0, i);
    			append_dev(p0, t4);
    			append_dev(main, t5);
    			append_dev(main, hr0);
    			append_dev(main, t6);
    			append_dev(main, p1);
    			append_dev(main, t8);
    			append_dev(main, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t10);
    			append_dev(ul, li1);
    			append_dev(ul, t12);
    			append_dev(ul, li2);
    			append_dev(main, t14);
    			append_dev(main, hr1);
    			append_dev(main, t15);
    			append_dev(main, h2);
    			append_dev(main, t17);
    			append_dev(main, p2);
    			append_dev(main, t19);
    			append_dev(main, p3);
    			append_dev(p3, code0);
    			append_dev(main, t21);
    			append_dev(main, p4);
    			append_dev(main, t23);
    			append_dev(main, p5);
    			append_dev(p5, code1);
    			append_dev(main, t25);
    			append_dev(main, h3);
    			append_dev(main, t27);
    			append_dev(main, table);
    			append_dev(table, tr0);
    			append_dev(tr0, th0);
    			append_dev(th0, t28);
    			append_dev(th0, br0);
    			append_dev(tr0, t29);
    			append_dev(tr0, th1);
    			append_dev(table, t31);
    			append_dev(table, tr1);
    			append_dev(tr1, td0);
    			append_dev(tr1, t33);
    			append_dev(tr1, td1);
    			append_dev(td1, t34);
    			append_dev(td1, br1);
    			append_dev(table, t35);
    			append_dev(table, tr2);
    			append_dev(tr2, td2);
    			append_dev(tr2, t37);
    			append_dev(tr2, td3);
    			append_dev(table, t39);
    			append_dev(table, tr3);
    			append_dev(tr3, td4);
    			append_dev(tr3, t41);
    			append_dev(tr3, td5);
    			append_dev(table, t43);
    			append_dev(table, tr4);
    			append_dev(tr4, td6);
    			append_dev(tr4, t45);
    			append_dev(tr4, td7);
    			append_dev(main, t47);
    			append_dev(main, p6);
    			append_dev(main, t49);
    			append_dev(main, p7);
    			insert_dev(target, t51, anchor);
    			insert_dev(target, footer, anchor);
    			append_dev(footer, a0);
    			append_dev(footer, t53);
    			append_dev(footer, a1);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(main);
    				detach_dev(t51);
    				detach_dev(footer);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
    	return block;
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment.name });
    	}
    }

    const app = new App({
      target: document.body,
      props: {
        name: 'world'
      }
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
