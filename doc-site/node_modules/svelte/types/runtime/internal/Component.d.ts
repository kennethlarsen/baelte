interface T$$ {
    dirty: null;
    ctx: null | any;
    bound: any;
    update: () => void;
    callbacks: any;
    after_update: any[];
    props: any;
    fragment: null | any;
    not_equal: any;
    before_update: any[];
    context: Map<any, any>;
    on_mount: any[];
    on_destroy: any[];
}
export declare function bind(component: any, name: any, callback: any): void;
export declare function mount_component(component: any, target: any, anchor: any): void;
export declare function destroy_component(component: any, detaching: any): void;
export declare function init(component: any, options: any, instance: any, create_fragment: any, not_equal: any, prop_names: any): void;
export declare let SvelteElement: any;
export declare class SvelteComponent {
    $$: T$$;
    $destroy(): void;
    $on(type: any, callback: any): () => void;
    $set(): void;
}
export {};
