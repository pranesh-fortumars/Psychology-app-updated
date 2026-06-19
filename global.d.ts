
declare module '@expo/vector-icons' {
    export const Ionicons: any;
    export const MaterialIcons: any;
    export const FontAwesome: any;
}

declare module 'expo-router' {
    export const useRouter: () => any;
    export const usePathname: () => string;
    export const useLocalSearchParams: () => any;
    export const Link: any;
    export const Stack: any;
    export const Tabs: any;
    export const router: any;
    export type Href = string | object;
}

declare module 'expo-web-browser' {
    export const openBrowserAsync: (url: string, options?: any) => Promise<any>;
    export const WebBrowserPresentationStyle: {
        UNDEFINED: 0,
        FULL_SCREEN: 1,
        PAGE_SHEET: 2,
        FORM_SHEET: 3,
        CURRENT_CONTEXT: 4,
        OVER_FULL_SCREEN: 5,
        OVER_CURRENT_CONTEXT: 6,
        AUTOMATIC: 7,
    };
}
